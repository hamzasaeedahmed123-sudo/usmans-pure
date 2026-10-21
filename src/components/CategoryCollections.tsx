"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";

interface CategoryCollectionsProps {
  onSelectCategory?: (cat: "all" | "flours" | "spices" | "teas") => void;
}

export function CategoryCollections({ onSelectCategory }: CategoryCollectionsProps = {}) {
  const collections = [
    {
      id: "flour",
      title: "Traditional Whole Wheat & Multigrain Diet Atta",
      subtitle: "Weight Loss, Diabetic Care & Kids Nutrition",
      itemCount: "5 Specialized Blends",
      image: "/images/products/prod-3.jpg",
      badge: "Pure Chakki Flour",
      href: "/flour",
      watermark: "wheat" as const,
    },
    {
      id: "spices",
      title: "Cold-Pounded Desi Spices (Mirch, Haldi, Dhania)",
      subtitle: "Kashmiri Chili, Turmeric & Whole Garam Masala",
      itemCount: "6 Pure Spices",
      image: "/images/spices-product.jpg",
      badge: "Traditional Spices",
      href: "/spices",
      watermark: "spices" as const,
    },
    {
      id: "herbals",
      title: "Pure Caffeine-Free Herbal Teas",
      subtitle: "Rosella, Chamomile, Olive Leaf & Wild Botanicals",
      itemCount: "6 Pure Infusions",
      image: "/images/products/prod-9.jpg",
      badge: "Herbal Infusions",
      href: "/herbals",
      watermark: "herbal" as const,
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 transition-colors duration-700 ease-in-out border-b border-stone-300/60 overflow-hidden bg-[#FAF7F2]">
      {/* Background Watermark Accents */}
      <BotanicalWatermark
        type="wheat"
        className="absolute -top-12 -left-12 w-[420px] h-[420px]"
        opacity={0.18}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute -bottom-12 -right-12 w-[420px] h-[420px]"
        opacity={0.20}
        size={420}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Our Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
            100% pure stone-ground chakki atta, freshly milled grains, and authentic organic spices. Delivered fresh to your home across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {collections.map((item, index) => {
            const isFullWidthMobile = index === 2;

            return (
              <Link
                key={item.id}
                id={item.id}
                data-ambient-theme={item.id}
                href={item.href}
                className={`group relative rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md transition duration-500 flex flex-col justify-end p-5 sm:p-6 md:p-8 w-full max-w-full min-h-[320px] sm:min-h-[360px] md:h-96 ${
                  isFullWidthMobile
                    ? "col-span-1 sm:col-span-2 md:col-span-1"
                    : "col-span-1"
                }`}
              >
                {/* Product Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="brightness-100 contrast-100 object-cover w-full h-full transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Soft, Subtle Bottom Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-transparent z-10 pointer-events-none"
                />

                {/* Top Badge positioned at top-left */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-stone-800 shadow-sm backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Card Content Block positioned cleanly at bottom */}
                <div className="relative z-20 text-white w-full">
                  <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-300 mb-1">
                    {item.itemCount}
                  </div>
                  <h3 className="font-serif font-bold tracking-tight text-white mb-1.5 text-lg sm:text-xl md:text-2xl leading-snug group-hover:text-amber-200 transition line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 mb-3 leading-relaxed max-w-sm">
                    {item.subtitle}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition duration-300">
                    <span>Explore {item.id === "flour" ? "Flour Range" : item.id === "spices" ? "Spices Range" : "Herbal Teas"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
