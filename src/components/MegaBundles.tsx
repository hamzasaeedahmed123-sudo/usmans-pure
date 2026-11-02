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
    <section className="py-14 sm:py-24 bg-[#FAF7F2] text-[#1E1510] border-b border-[#1E1510]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-xl">
            <span className="eyebrow mb-2">Lifestyle Value Combos</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#1E1510] tracking-tight">
              Curated Wellness <em className="italic font-normal text-[#8B3A22]">Bundles</em>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-sm text-[#6B5D52] max-w-sm sm:text-right">
              Save up to ₨800 on carefully paired lifestyle bundles with nationwide Cash on Delivery (Free over ₨10,000).
            </p>
            <Link href="/bundles" className="link-lux text-xs mt-1">
              <span>Explore All Bundles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {bundles.map((bundle) => {
            const isAdded = addedIds[bundle.id];
            return (
              <article
                key={bundle.id}
                className="bg-[#F6F1E9] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Edge-to-edge image showcase - touches top, left, right edges */}
                  <div className="w-full aspect-[4/3] relative p-0 overflow-hidden bg-stone-100">
                    <Link href={`/bundles/${bundle.slug}`} className="block w-full h-full relative" aria-label={bundle.title}>
                      <Image
                        src={bundle.image}
                        alt={bundle.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        quality={100}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold font-sans bg-amber-100/95 text-amber-900 border border-amber-200/60 shadow-2xs z-10 backdrop-blur-xs">
                      Save Rs {bundle.savings}
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-5 pb-0 sm:pb-0">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8B3A22] truncate block mb-0.5 sm:mb-1">
                      {bundle.badge}
                    </span>

                    <Link href={`/bundles/${bundle.slug}`}>
                      <h3 className="text-xs sm:text-lg font-serif font-bold text-stone-900 group-hover:text-[#8B3A22] transition-colors leading-tight sm:leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.75rem]">
                        {bundle.title}
                      </h3>
                    </Link>

                    {/* Included Items Summary */}
                    <p className="mt-0.5 sm:mt-1.5 text-[11px] sm:text-sm text-stone-700 line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-relaxed font-medium">
                      {bundle.includedTags.join(" • ")}
                    </p>

                    <div className="flex items-baseline gap-1 sm:gap-2 font-sans mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#1E1510]/10 flex-wrap">
                      <span className="text-sm sm:text-2xl font-extrabold text-stone-900 tracking-tight font-sans">
                        Rs {bundle.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] sm:text-sm font-medium text-stone-400 line-through font-sans">
                        Rs {bundle.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-5 pt-2 sm:pt-4 flex flex-col gap-1.5 sm:gap-2">
                  <button
                    onClick={(e) => handleAddBundle(bundle, e)}
                    className={`w-full py-2 sm:py-3 px-2 sm:px-3 text-[11px] sm:text-sm font-bold tracking-wide rounded-lg sm:rounded-xl min-h-[36px] sm:min-h-[48px] flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-ambient ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add to Cart
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
