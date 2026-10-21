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
      color: "from-amber-950/85 via-stone-900/60 to-transparent",
      watermark: "wheat" as const,
    },
    {
      id: "spices",
      title: "Cold-Pounded Desi Spices (Mirch, Haldi, Dhania)",
      subtitle: "Kashmiri Chili, Turmeric & Whole Garam Masala",
      itemCount: "6 Pure Spices",
      image: "/spices-jar.png",
      badge: "Traditional Spices",
      href: "/spices",
      color: "from-[#661D0F]/90 via-stone-900/60 to-transparent",
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
      color: "from-emerald-950/85 via-stone-900/60 to-transparent",
      watermark: "herbal" as const,
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 transition-colors duration-700 ease-in-out border-b border-stone-300/60 overflow-hidden">
      {/* Background Watermark Accents */}
      <BotanicalWatermark
        type="wheat"
        className="absolute -top-12 -left-12 w-[420px] h-[420px]"
        opacity={0.30}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute -bottom-12 -right-12 w-[420px] h-[420px]"
        opacity={0.35}
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
          {collections.map((item, index) => {
            const isFullWidthMobile = index === 2;

            return (
              <Link
                key={item.id}
                id={item.id}
                data-ambient-theme={item.id}
                href={item.href}
                className={`group relative rounded-2xl border border-stone-200/50 overflow-hidden cursor-pointer shadow-ambient hover:shadow-ambient transition duration-500 bg-stone-900 flex flex-col justify-end p-4 sm:p-5 md:p-8 w-full max-w-full ${
                  isFullWidthMobile
                    ? "col-span-2 md:col-span-1 min-h-[220px] sm:min-h-[240px] md:h-96 items-center text-center md:items-start md:text-left"
                    : "col-span-1 min-h-[280px] sm:min-h-[320px] md:h-96 items-start text-left"
                }`}
              >
                {/* Botanical Watermark in card background */}
                <BotanicalWatermark
                  type={item.watermark}
                  className={`absolute z-10 pointer-events-none transition-opacity duration-300 ${
                    isFullWidthMobile
                      ? "top-2 right-3 sm:top-4 sm:right-6 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 opacity-20 sm:opacity-30"
                      : "top-3 right-3 sm:top-5 sm:right-5 w-20 h-20 sm:w-28 sm:h-28 md:w-44 md:h-44 opacity-20 sm:opacity-30"
                  }`}
                  opacity={0.3}
                  size={200}
                />

                {/* Product Background Image */}
                <div className="absolute inset-0 bg-stone-950/20 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={isFullWidthMobile ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 33vw"}
                    className={`object-contain transition duration-700 group-hover:scale-105 ${
                      isFullWidthMobile
                        ? "p-2 sm:p-4 md:p-6 opacity-75 group-hover:opacity-90"
                        : "p-3 sm:p-6 opacity-85 group-hover:opacity-100"
                    }`}
                  />
                </div>

                {/* Crisp High-Contrast Linear Gradient Backing */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent z-10"
                />

                {/* Top Badge positioned at the top with clean margin */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#8B3A22] shadow-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Card Content Block below / with strict z-indexing */}
                <div
                  className={`relative z-20 text-white ${
                    isFullWidthMobile
                      ? "flex flex-col items-center md:items-start text-center md:text-left max-w-md md:max-w-none"
                      : "w-full"
                  }`}
                >
                  <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-300 mb-1">
                    {item.itemCount}
                  </div>
                  <h3
                    className={`font-serif font-bold tracking-tight text-white mb-1.5 group-hover:text-amber-200 transition ${
                      isFullWidthMobile
                        ? "text-lg sm:text-xl md:text-2xl"
                        : "text-base sm:text-lg md:text-2xl leading-snug line-clamp-2"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2 mb-2.5 sm:mb-3 leading-relaxed max-w-sm">
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
