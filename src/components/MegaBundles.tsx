"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";
import { ArrowRight } from "lucide-react";

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
    <section className="bg-white text-stone-900 relative overflow-hidden py-16 sm:py-24 px-4 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-baseline justify-between mb-8 sm:mb-12 pb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600 block mb-1.5 font-sans">
              Exclusive Value
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-normal text-[#121212] tracking-tight">
              Curated Wellness Bundles
            </h2>
          </div>
          <Link
            href="/bundles"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase text-stone-500 hover:text-stone-900 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Flat, borderless product grid with generous luxury spacing */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16 md:grid-cols-4">
          {bundles.map((bundle) => {
            const discountPercent =
              bundle.originalPrice > bundle.price
                ? Math.round(
                    ((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100
                  )
                : 0;

            return (
              <article
                key={bundle.id}
                className="group flex flex-col justify-start bg-transparent border-none shadow-none p-0"
              >
                {/* Floating image container on flat white canvas with no borders or bounding boxes */}
                <div className="relative aspect-square w-full bg-transparent overflow-hidden flex items-center justify-center">
                  <Link
                    href={`/bundles/${bundle.slug}`}
                    className="absolute inset-0 z-0 flex items-center justify-center"
                    aria-label={bundle.title}
                  >
                    <Image
                      src={bundle.image}
                      alt={bundle.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      quality={85}
                      loading="lazy"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* Dr Nazish Affan vibrant red pill badge */}
                  {discountPercent > 0 && (
                    <span className="absolute top-2.5 right-2.5 z-10 bg-[#DC2626] text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full pointer-events-none shadow-xs tracking-wider">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Text and details below image with Dr Nazish Affan layout */}
                <div className="mt-4 sm:mt-5 flex flex-col text-center">
                  <Link href={`/bundles/${bundle.slug}`}>
                    <h3 className="text-sm sm:text-base font-normal text-[#121212] leading-snug line-clamp-2 hover:underline transition-colors tracking-normal">
                      {bundle.title}
                    </h3>
                  </Link>

                  {/* Price display: crisp dark sale price & subtle crossed-out original */}
                  <div className="mt-1.5 flex items-baseline justify-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-[#121212] tracking-tight">
                      Rs {bundle.price.toLocaleString()}
                    </span>
                    {bundle.originalPrice > bundle.price && (
                      <span className="text-xs sm:text-sm text-stone-400 line-through font-normal">
                        Rs {bundle.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Dr. Nazish Affan Signature Button: 16px radius, 1px dark border, distinct bottom drop-shadow */}
                  <button
                    type="button"
                    onClick={(e) => handleAddBundle(bundle, e)}
                    className="mt-3.5 w-full max-w-[180px] sm:max-w-[200px] mx-auto py-2.5 px-4 rounded-[16px] bg-white border border-[#121212] text-[#121212] hover:bg-stone-50 text-xs sm:text-sm font-normal tracking-wide shadow-[0_4px_6px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
                  >
                    {addedIds[bundle.id] ? "Added to cart ✓" : "Add to cart"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
