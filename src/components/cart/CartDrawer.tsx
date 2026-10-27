"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    totalCount,
    deliveryFee,
    finalTotal,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const freeShippingThreshold = 10000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const generateWhatsAppLink = () => {
    const itemsList = items
      .map(
        (i) =>
          `• ${i.name} (${i.pack}) x ${i.quantity} = Rs ${(i.price * i.quantity).toLocaleString()}`
      )
      .join("%0A");

    const text = `Assalam-o-Alaikum Usman's Pure Products,%0A%0AI would like to place an order from my Pure Basket:%0A%0A${itemsList}%0A%0A*Subtotal:* Rs ${subtotal.toLocaleString()}%0A*Delivery Charges:* ${
      deliveryFee === 0 ? "FREE Nationwide" : `Rs ${deliveryFee}`
    }%0A*Final Total:* Rs ${finalTotal.toLocaleString()}%0A%0APlease confirm availability and delivery details. JazakAllah!`;

    return `https://wa.me/923008472910?text=${text}`;
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-[#1E1510]/55 backdrop-blur-[3px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        aria-label="Shopping Cart Drawer"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md h-[100dvh] max-h-[100dvh] bg-[#FAF7F2] shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#1E1510]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1E1510] text-[#F6F1E9] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#1E1510] leading-tight">
                Your Pure Basket
              </h2>
              <span className="text-[11px] text-[#6B5D52] font-medium">
                {totalCount} {totalCount === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#F2EDE4] border-b border-[#1E1510]/10 text-xs">
          {amountToFreeShipping === 0 ? (
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Congratulations! Your order qualifies for FREE Delivery!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-[#6B5D52] text-[11px] font-medium mb-1.5">
                <span>
                  Add <strong className="text-[#8B3A22] font-bold">Rs {amountToFreeShipping.toLocaleString()}</strong> more for <strong className="text-emerald-700">FREE Delivery</strong>
                </span>
                <span className="font-bold text-[#1E1510]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2D8C9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#1E1510]/10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EFE7DB] text-[#8B3A22] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#1E1510]">
                Your Pure Basket is Empty
              </h3>
              <p className="text-xs text-[#6B5D52] mt-1.5 max-w-xs leading-relaxed">
                Add fresh stone-ground flours, cold-pounded spices, or organic herbal teas to begin.
              </p>
              <Link
                href="/products"
                onClick={closeCart}
                className="mt-6 px-6 py-2.5 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.pack}`} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                {/* Product Thumbnail */}
                <div className="relative w-18 h-18 rounded-md bg-white border border-[#1E1510]/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="72px"
                    className="object-contain p-1"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1E1510] line-clamp-1 leading-snug">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id, item.pack)}
                        className="text-stone-400 hover:text-rose-600 transition p-2 min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer -mr-1"
                        title="Remove item"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#EFE7DB] text-[#6B5D52] mt-1">
                      {item.pack}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-[#1E1510]">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </span>

                    {/* Quantity Selector (+ / - / remove) */}
                    <div className="flex items-center border border-[#1E1510]/20 rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.pack, -1)}
                        className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-[#1E1510] hover:bg-stone-100 transition rounded-l cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 sm:w-7 text-center text-xs font-bold text-[#1E1510]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.pack, 1)}
                        className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-[#1E1510] hover:bg-stone-100 transition rounded-r cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pricing Summary & Actions Footer */}
        {items.length > 0 && (
          <div className="z-50 relative bg-white border-t border-[#1E1510]/10 p-4 pb-6 shadow-lg space-y-3.5 sm:space-y-4 shrink-0">
            {/* Price breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#6B5D52]">
                <span>Basket Subtotal</span>
                <span className="font-bold text-[#1E1510]">
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-[#6B5D52]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-500" />
                  <span>Delivery Charges</span>
                </span>
                <span className="font-bold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">Free Nationwide</span>
                  ) : (
                    <span>Rs {deliveryFee.toLocaleString()}</span>
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-[#1E1510]/10 flex justify-between items-baseline">
                <span className="text-sm font-serif font-bold text-[#1E1510]">
                  Final Total
                </span>
                <span className="text-lg sm:text-xl font-black text-[#8B3A22]">
                  Rs {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Primary Action: Proceed to Checkout */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 px-4 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors uppercase tracking-[0.18em] duration-200 ease-out shadow-sm text-center"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary Action: Quick Order on WhatsApp */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-[3px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition duration-200 shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                <span>Quick Order on WhatsApp</span>
              </a>
            </div>

            {/* Trust note */}
            <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-[#6B5D52]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cash on Delivery Across Pakistan • 90% Purity Certified</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
