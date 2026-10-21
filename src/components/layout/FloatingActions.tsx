"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const { totalCount, toggleCart, isOpen } = useCart();
  const pathname = usePathname();

  // Hide completely on checkout and admin routes
  if (pathname === "/checkout" || pathname?.startsWith("/admin")) {
    return null;
  }

  const isCart = pathname === "/cart";

  const whatsappHref =
    "https://wa.me/923000000000?text=Assalam-o-Alaikum%20Usman's%20Pure%20Products!%20I%20have%20an%20inquiry%20about%20your%20pure%20chakki%20flours%20and%20spices.";

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
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />

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
