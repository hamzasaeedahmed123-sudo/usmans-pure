"use client";

import React from "react";
import Link from "next/link";
import { useStoreData } from "@/context/StoreDataContext";
import { Sparkles, ArrowRight, Flame } from "lucide-react";

export function SalePromoBanner() {
  const { cmsContent } = useStoreData();
  const sale = cmsContent?.saleBanner;
  const customBanners = cmsContent?.customBanners?.filter((b) => b.enabled) || [];

  if (!sale?.enabled && customBanners.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10 py-6 px-4 max-w-7xl mx-auto w-full">
      {/* Main Flash Sale Banner */}
      {sale?.enabled && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2A1F17] via-[#541B10] to-[#2A1F17] text-white p-6 sm:p-8 shadow-xl border border-amber-900/40 mb-4">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{sale.badgeTitle || "Flash Sale"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 tracking-tight leading-snug">
                {sale.discountTag || "Special Limited Discount"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                {sale.subtext}
              </p>
            </div>

            <Link
              href={sale.link || "/products"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-102 shadow-lg shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>{sale.buttonText || "Shop Flash Sale"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Any Custom Storefront Promo Banners configured in CMS */}
      {customBanners.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customBanners.map((banner) => (
            <div
              key={banner.id}
              className="p-5 sm:p-6 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                  {banner.badge}
                </span>
                <h4 className="text-lg font-serif font-bold text-amber-100">{banner.title}</h4>
                <p className="text-xs font-semibold text-amber-400 mt-0.5">{banner.discountTag}</p>
                <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">{banner.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-800 flex justify-end">
                <Link
                  href={banner.link || "/products"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
                >
                  <span>{banner.buttonText || "Explore"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
