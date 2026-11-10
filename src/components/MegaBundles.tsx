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
    <section className="bg-white text-[#2C2A29] relative overflow-hidden py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-baseline justify-between mb-6 sm:mb-8 pb-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-normal text-[#2C2A29] tracking-tight">
            Curated Wellness Bundles
          </h2>
          <Link
            href="/bundles"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Flat, borderless product grid (grid-cols-2 for mobile, grid-cols-4 for desktop/tablet) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-10 md:grid-cols-4">
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

                  {/* Tiny minimalist circular/pill-shaped red badge */}
                  {discountPercent > 0 && (
                    <span className="absolute top-2 right-2 z-10 bg-red-600 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded-full pointer-events-none shadow-xs">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Text and details below image */}
                <div className="pt-2 sm:pt-2.5 flex flex-col text-left">
                  <Link href={`/bundles/${bundle.slug}`}>
                    <h3 className="text-sm md:text-base font-normal text-[#2C2A29] leading-snug line-clamp-2 hover:text-[#145330] transition-colors tracking-tight">
                      {bundle.title}
                    </h3>
                  </Link>

                  {/* Price display: sale price on the left, original crossed-out on the right */}
                  <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm md:text-base font-normal text-[#2C2A29]">
                      Rs {bundle.price.toLocaleString()}
                    </span>
                    {bundle.originalPrice > bundle.price && (
                      <span className="text-xs text-stone-400 line-through font-normal">
                        Rs {bundle.originalPrice.toLocaleString()}
                      </span>
                    )}
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
