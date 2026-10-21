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
      subtitle: "Weight Loss, Diabetic Care & Kids Nutrition with 100% vital dietary fiber.",
      image: "/images/products/prod-3.jpg",
      badge: "Pure Chakki Flour",
      href: "/flour",
      watermark: "wheat" as const,
    },
    {
      id: "spices",
      title: "Cold-Pounded Desi Spices (Mirch, Haldi, Dhania)",
      subtitle: "Kashmiri Chili, Turmeric & Whole Garam Masala milled under 40°C.",
      image: "/images/spices-product.jpg",
      badge: "Traditional Spices",
      href: "/spices",
      watermark: "spices" as const,
    },
    {
      id: "herbals",
      title: "Pure Caffeine-Free Herbal Teas",
      subtitle: "Rosella, Chamomile, Olive Leaf & Wild Botanicals for daily natural detox.",
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

      <div className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Our Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
            100% pure stone-ground chakki atta, freshly milled grains, and authentic organic spices. Delivered fresh to your home across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-4 max-w-7xl mx-auto">
          {collections.map((item) => {
            return (
              <Link
                key={item.id}
                id={item.id}
                data-ambient-theme={item.id}
                href={item.href}
                className="group rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Product Image Frame (100% Uncluttered Photography) */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md text-stone-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs border border-stone-200/80">
                    {item.badge}
                  </span>
                </div>

                {/* Dedicated Card Content Area Below Image */}
                <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl group-hover:text-[#8B3A22] transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B3A22] group-hover:translate-x-1.5 transition-transform duration-300 pt-3 border-t border-stone-100">
                    <span>Explore {item.id === "flour" ? "Flours" : item.id === "spices" ? "Spices" : "Teas"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8B3A22]" />
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
