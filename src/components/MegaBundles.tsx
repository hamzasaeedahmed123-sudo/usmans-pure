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
    <section className="py-14 sm:py-24 bg-white text-[#2C2A29] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6 border-b border-stone-100 pb-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-2 font-sans">
              Lifestyle Value Combos
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#2C2A29] tracking-tight font-bold">
              Curated Wellness <em className="italic font-normal text-[#8B3A22]">Bundles</em>
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="text-sm text-[#5E5852] max-w-sm sm:text-right leading-relaxed font-light">
              Carefully paired lifestyle bundles with nationwide Cash on Delivery.
            </p>
            <Link href="/bundles" className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-950 transition-colors mt-1">
              <span>Explore All Bundles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Strict 2 Columns on Mobile Devices, 4 Columns on Desktop - Borderless Minimalist */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4">
          {bundles.map((bundle) => {
            const discountPercent = bundle.originalPrice > bundle.price
              ? Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)
              : 0;

            return (
              <article
                key={bundle.id}
                className="group flex flex-col justify-start bg-transparent border-0 shadow-none p-0"
              >
                {/* 1. Soft Mint-Green Rounded Square Container */}
                <div className="relative aspect-square w-full bg-[#EBF4EE] rounded-2xl sm:rounded-3xl overflow-hidden p-3 sm:p-4 flex items-center justify-center">
                  <Link
                    href={`/bundles/${bundle.slug}`}
                    className="absolute inset-0 z-0 flex items-center justify-center"
                    aria-label={bundle.title}
                  >
                    <Image
                      src={bundle.image}
                      alt={bundle.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      quality={85}
                      loading="lazy"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* 2. Tiny Minimalist Red Circular Pill Badge at Top-Right */}
                  {discountPercent > 0 && (
                    <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] sm:text-[11px] font-bold tracking-tight shadow-xs pointer-events-none">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* 3. Below Image: ONLY Product Title (clean, thin font) and Price */}
                <div className="pt-2.5 sm:pt-3 flex flex-col text-left">
                  <Link href={`/bundles/${bundle.slug}`}>
                    <h3 className="font-sans text-xs sm:text-sm font-normal text-[#2C2A29] leading-snug line-clamp-2 hover:text-[#145330] transition-colors">
                      {bundle.title}
                    </h3>
                  </Link>

                  <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    {bundle.originalPrice > bundle.price && (
                      <span className="text-[11px] sm:text-xs text-stone-400 line-through font-normal">
                        Rs {bundle.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-medium text-black">
                      Rs {bundle.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
