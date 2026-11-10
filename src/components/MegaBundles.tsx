"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";
import { Check, ShoppingBag, ArrowRight, Truck } from "lucide-react";

export function MegaBundles() {
  const [bundles, setBundles] = useState<LuxuryBundle[]>(LUXURY_BUNDLES);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch("/api/bundles")
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.bundles) && data.bundles.length > 0) {
          setBundles(data.bundles);
        }
      })
      .catch(() => {});
  }, []);

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
    <section className="py-14 sm:py-24 bg-[#FAF9F5] text-[#2C2A29] border-b border-stone-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-2">
              Lifestyle Value Combos
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#2C2A29] tracking-tight">
              Curated Wellness <em className="italic font-normal text-[#8B3A22]">Bundles</em>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-sm text-[#5E5852] max-w-sm sm:text-right leading-relaxed">
              Save up to ₨800 on carefully paired lifestyle bundles with nationwide Cash on Delivery (Free over ₨10,000).
            </p>
            <Link href="/bundles" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B3A22] hover:text-[#2C2A29] transition-colors mt-1">
              <span>Explore All Bundles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Strict 2 Columns on Mobile Devices, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 gap-3 p-3 sm:p-0 sm:gap-6 lg:grid-cols-4">
          {bundles.map((bundle) => {
            const isAdded = addedIds[bundle.id];
            return (
              <article
                key={bundle.id}
                className="bg-[#F5F2EB] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-2xs"
              >
                <div>
                  {/* Edge-to-edge floating image showcase */}
                  <div className="w-full aspect-[4/3] relative p-0 overflow-hidden bg-white rounded-t-2xl">
                    <Link href={`/bundles/${bundle.slug}`} className="block w-full h-full relative" aria-label={bundle.title}>
                      <Image
                        src={bundle.image}
                        alt={bundle.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        quality={85}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold font-sans bg-[#FAF9F5]/90 text-[#8B3A22] shadow-2xs z-10 backdrop-blur-xs">
                      Save Rs {bundle.savings}
                    </span>
                  </div>

                  <div className="p-3 sm:p-5 pb-0 sm:pb-0">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8B3A22] truncate block mb-1">
                      {bundle.badge}
                    </span>

                    <Link href={`/bundles/${bundle.slug}`}>
                      <h3 className="text-sm sm:text-lg font-serif font-bold text-[#2C2A29] group-hover:text-[#8B3A22] transition-colors leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
                        {bundle.title}
                      </h3>
                    </Link>

                    {/* Included Items Summary */}
                    <p className="mt-1 text-xs sm:text-sm text-[#5E5852] line-clamp-1 sm:line-clamp-2 leading-relaxed font-normal">
                      {bundle.includedTags.join(" • ")}
                    </p>

                    <div className="flex items-baseline gap-1.5 sm:gap-2 font-sans mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-stone-200/60 flex-wrap">
                      <span className="text-base sm:text-2xl font-extrabold text-[#2C2A29] tracking-tight font-sans">
                        Rs {bundle.price.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-stone-400 line-through font-sans">
                        Rs {bundle.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 pt-3 sm:pt-4 flex flex-col gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => handleAddBundle(bundle, e)}
                    className={`w-full py-2.5 sm:py-3 px-3 text-xs sm:text-sm font-bold tracking-wide rounded-xl min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 transition-transform active:scale-95 duration-150 cursor-pointer shadow-xs ${
                      isAdded
                        ? "bg-[#145330] text-white"
                        : "bg-[#2C2A29] hover:bg-[#4A3525] text-[#FAF9F5]"
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
                    className="text-center text-[10px] sm:text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors py-0.5 sm:py-1"
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
