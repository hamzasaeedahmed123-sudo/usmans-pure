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
    <section className="py-12 sm:py-20 bg-[#FAF9F5] text-[#2C2A29] border-b border-stone-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-xl">
            <span className="eyebrow mb-2">Lifestyle Value Combos</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#2C2A29] tracking-tight">
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

        {/* Strict 2-Column Mobile Grid, Edge-to-Edge Floating Cards */}
        <div className="grid grid-cols-2 gap-3 p-3 sm:p-0 sm:gap-6 lg:grid-cols-4">
          {bundles.map((bundle) => {
            const isAdded = addedIds[bundle.id];
            return (
              <article
                key={bundle.id}
                className="group relative flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Floating Image Frame: Soft rounded-2xl on #FAF9F5 */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden rounded-2xl bg-[#F2EDE4]/70 p-0">
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
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold font-sans bg-[#FAF9F5]/90 text-[#8B3A22] border border-stone-200/60 shadow-2xs z-10 backdrop-blur-xs pointer-events-none">
                      Save Rs {bundle.savings}
                    </span>
                  </div>

                  <div className="pt-2.5 sm:pt-3.5 flex flex-col">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8B3A22] truncate block mb-0.5 sm:mb-1">
                      {bundle.badge}
                    </span>

                    <Link href={`/bundles/${bundle.slug}`}>
                      <h3 className="text-xs sm:text-base font-serif font-bold text-[#2C2A29] group-hover:text-[#8B3A22] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {bundle.title}
                      </h3>
                    </Link>

                    {/* Included Items Summary */}
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-[#6B5D52] line-clamp-1 sm:line-clamp-2 leading-relaxed font-normal">
                      {bundle.includedTags.join(" • ")}
                    </p>

                    <div className="flex items-baseline gap-1 sm:gap-2 font-sans mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-stone-200/60 flex-wrap">
                      <span className="text-sm sm:text-xl font-extrabold text-[#2C2A29] tracking-tight font-sans">
                        Rs {bundle.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] sm:text-xs font-medium text-[#6B5D52] line-through font-sans">
                        Rs {bundle.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 flex flex-col gap-1 sm:gap-1.5">
                  <button
                    onClick={(e) => handleAddBundle(bundle, e)}
                    className={`w-full py-2 sm:py-2.5 px-2.5 text-xs sm:text-sm font-bold tracking-wide rounded-xl sm:rounded-2xl min-h-[38px] sm:min-h-[44px] flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 transition-transform ${
                      isAdded
                        ? "bg-[#1E3A2F] text-white"
                        : "bg-[#2C2A29] hover:bg-[#1E3A2F] text-[#FAF9F5]"
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
                    className="text-center text-[10px] sm:text-xs font-semibold text-[#6B5D52] hover:text-[#2C2A29] transition-colors py-0.5"
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
