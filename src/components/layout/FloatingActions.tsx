"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export function FloatingActions() {
  const { totalCount, toggleCart, isOpen } = useCart();
  const pathname = usePathname();

  // Hide completely on checkout and admin routes
  if (pathname === "/checkout" || pathname?.startsWith("/admin")) {
    return null;
  }

  const isCart = pathname === "/cart";

  const whatsappHref =
    "https://wa.me/923008472910?text=Assalam-o-Alaikum%20Usman's%20Pure%20Products!%20I%20have%20an%20inquiry%20about%20your%20pure%20chakki%20flours%20and%20spices.";

  return (
    <div
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col gap-2.5 sm:gap-3 items-end transition-opacity duration-200 ${
        isOpen ? "hidden opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Floating Quick Actions"
    >
      {/* Button 1: Shopping Cart Drawer Toggle (Hidden on cart page) */}
      {!isCart && (
        <div className="relative group">
          <button
            type="button"
            onClick={toggleCart}
            className="relative w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B3A22]/50"
            aria-label={`View pure basket (${totalCount} items)`}
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />

            {/* Dynamic Item Badge Count */}
            {totalCount > 0 && (
              <span
                id="floating-cart-badge"
                className="absolute -top-1 -right-1 bg-[#8B3A22] text-white text-[11px] font-black rounded-full min-w-5 h-5 px-1 flex items-center justify-center border-2 border-white shadow-md animate-pulse"
              >
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </button>

          {/* Hover Tooltip */}
          <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded bg-[#1E1510] text-[#F6F1E9] text-[11px] font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            Pure Basket ({totalCount})
          </span>
        </div>
      )}

      {/* Button 2: WhatsApp Live Support */}
      <div className="relative group">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
          aria-label="Chat with Usman's Pure Products on WhatsApp"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41c-1.42 0-2.8-.37-4.03-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.25-4.49c0-4.54 3.7-8.24 8.24-8.24zm4.84 11.64c-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.59.13-.18.26-.68.85-.83 1.03-.15.18-.31.2-.57.07-.26-.13-1.1-.41-2.09-1.3-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.59-1.43-.81-1.96-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.3 1.02 2.55 1.16 2.74.15.18 2 3.05 4.84 4.28.68.29 1.21.46 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31z" />
          </svg>

          {/* Subtle online pulse indicator */}
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white border-2 border-[#25D366] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
          </span>
        </a>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded bg-[#1E1510] text-[#F6F1E9] text-[11px] font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          WhatsApp Support
        </span>
      </div>
    </div>
  );
}
