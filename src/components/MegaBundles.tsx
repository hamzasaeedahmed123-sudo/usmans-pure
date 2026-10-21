"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";
import { Check, ShoppingBag, ArrowRight, Truck } from "lucide-react";

export function MegaBundles() {
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddBundle = (bundle: LuxuryBundle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [bundle.id]: true }));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("usman-add-to-cart", {
          detail: {
            product: {
              id: bundle.id,
              title: bundle.title,
              image: bundle.image,
              price: bundle.price,
              category: "bundles",
            },
            packSize: "Value Kit",
            price: bundle.price,
            quantity: 1,
          },
        })
      );
    }
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [bundle.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] text-[#1E1510] border-b border-[#1E1510]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <span className="eyebrow mb-2">Lifestyle Value Combos</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1E1510] tracking-tight">
              Curated Wellness <em className="italic font-normal text-[#8B3A22]">Bundles</em>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-sm text-[#6B5D52] max-w-sm sm:text-right">
              Save up to ₨800 on carefully paired lifestyle bundles with free nationwide doorstep delivery.
            </p>
            <Link href="/bundles" className="link-lux text-xs mt-1">
              <span>Explore All 4 Bundles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {LUXURY_BUNDLES.map((bundle) => {
            const isAdded = addedIds[bundle.id];
            return (
              <article
                key={bundle.id}
                className="bg-[#F6F1E9] rounded-2xl p-3 md:p-5 flex flex-col justify-between shadow-ambient hover:shadow-ambient transition-all duration-300 group"
              >
                <div>
                  {/* Image showcase - Full width aspect 4/3, uncropped and centered */}
                  <div className="w-full aspect-[4/3] relative flex items-center justify-center p-3 overflow-hidden rounded-t-2xl sm:rounded-2xl bg-stone-50/50 border border-[#1E1510]/5 mb-3 sm:mb-4">
                    <Link href={`/bundles/${bundle.slug}`} className="block w-full h-full relative flex items-center justify-center" aria-label={bundle.title}>
                      <Image
                        src={bundle.image}
                        alt={bundle.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                        className="w-full h-full object-contain max-h-56 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                      />
                    </Link>
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold font-sans bg-amber-100 text-amber-900 border border-amber-200/60 shadow-2xs z-10">
                      Save Rs {bundle.savings}
                    </span>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8B3A22] truncate block mb-1">
                    {bundle.badge}
                  </span>

                  <Link href={`/bundles/${bundle.slug}`}>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-[#8B3A22] transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
                      {bundle.title}
                    </h3>
                  </Link>

                  {/* Included Items Summary */}
                  <p className="mt-1.5 text-xs sm:text-sm text-stone-700 line-clamp-2 leading-relaxed font-medium">
                    {bundle.includedTags.join(" • ")}
                  </p>

                  <div className="flex items-baseline gap-2 font-sans mt-3 pt-2 sm:pt-3 border-t border-[#1E1510]/10 flex-wrap">
                    <span className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-sans">
                      Rs {bundle.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-stone-400 line-through font-sans">
                      Rs {bundle.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 pt-1 flex flex-col gap-2">
                  <button
                    onClick={(e) => handleAddBundle(bundle, e)}
                    className={`w-full py-3 px-3 text-sm font-bold tracking-wide rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-ambient ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </>
                    )}
                  </button>

                  <Link
                    href={`/bundles/${bundle.slug}`}
                    className="text-center text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-900 transition-colors py-1.5"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
