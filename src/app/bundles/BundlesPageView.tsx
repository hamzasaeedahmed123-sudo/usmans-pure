"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { DietConsultationBanner } from "@/components/DietConsultationBanner";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";
import {
  ChevronRight,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";

export function BundlesPageView() {
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1510] flex flex-col justify-between selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3.5 flex items-center gap-2 text-xs text-[#6B5D52]">
            <Link href="/" className="hover:text-[#8B3A22] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/products" className="hover:text-[#8B3A22] transition-colors">
              Store
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-medium text-[#1E1510]">Curated Wellness Bundles</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#1E1510]/10 overflow-hidden">
          {/* Subtle Organic Background Watermarks */}
          <BotanicalWatermark
            type="herbal"
            className="absolute -top-12 -right-12 w-96 h-96 sm:w-[500px] sm:h-[500px]"
            opacity={0.35}
            size={500}
          />
          <BotanicalWatermark
            type="wheat"
            className="absolute -bottom-16 -left-16 w-80 h-80 sm:w-96 sm:h-96"
            opacity={0.25}
            size={400}
          />

          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center relative z-10">
            <span className="eyebrow mb-3">Pantry &amp; Family Packs</span>
            <h1 className="text-4xl sm:text-6xl font-serif text-[#1E1510] leading-tight">
              Curated Value <em className="italic font-normal text-[#8B3A22]">Bundles</em>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#6B5D52] max-w-2xl mx-auto leading-relaxed">
              Carefully paired by our master millers. Each value pack combines fresh stone-ground flours with pure herbal teas and spices to give your family wholesome nutrition at bundle savings of up to ₨800.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#6B5D52]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#EFE7DB] text-[#1E1510] font-medium tracking-wide">
                <Truck className="w-3.5 h-3.5 text-[#8B3A22]" /> Free Doorstep COD Available
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#EFE7DB] text-[#1E1510] font-medium tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B3A22]" /> 100% Lab-Verified Purity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#EFE7DB] text-[#1E1510] font-medium tracking-wide">
                <Heart className="w-3.5 h-3.5 text-[#8B3A22]" /> Includes Daily Usage Schedule
              </span>
            </div>
          </div>
        </section>

        {/* 3-Column Editorial Grid Section */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {LUXURY_BUNDLES.map((bundle) => {
                const isAdded = addedIds[bundle.id];
                return (
                  <article
                    key={bundle.id}
                    className="group relative flex flex-col justify-between bg-[#F6F1E9] rounded-2xl p-3 md:p-5 shadow-ambient hover:shadow-ambient transition-all duration-300"
                  >
                    <div>
                      {/* Image showcase - Full width aspect 4/3, uncropped and centered */}
                      <div className="w-full aspect-[4/3] relative flex items-center justify-center p-3 overflow-hidden rounded-t-2xl sm:rounded-2xl bg-stone-50/50 border border-[#1E1510]/5 mb-3 sm:mb-4">
                        <Link
                          href={`/bundles/${bundle.slug}`}
                          className="block w-full h-full relative flex items-center justify-center"
                          aria-label={bundle.title}
                        >
                          <Image
                            src={bundle.image}
                            alt={bundle.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="w-full h-full object-contain max-h-56 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>

                        {/* Saving / Discount Badge */}
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold font-sans bg-amber-100 text-amber-900 border border-amber-200/60 shadow-2xs z-10">
                          Save Rs {bundle.savings}
                        </span>
                      </div>

                      {/* Bundle Information */}
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8B3A22] truncate block mb-1">
                          {bundle.badge}
                        </span>

                        <Link href={`/bundles/${bundle.slug}`}>
                          <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-[#8B3A22] transition-colors duration-200">
                            {bundle.title}
                          </h2>
                        </Link>

                        {/* Included Items Summary */}
                        <p className="mt-1.5 text-xs sm:text-sm text-stone-700 line-clamp-2 leading-relaxed font-medium">
                          {bundle.includedTags.join(" • ")}
                        </p>

                        {/* Pricing Line */}
                        <div className="flex items-baseline gap-2 font-sans mt-3 pt-2 sm:pt-3 border-t border-[#1E1510]/10 flex-wrap">
                          <span className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-sans">
                            Rs {bundle.price.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-stone-400 line-through font-sans">
                            Rs {bundle.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Call to Actions */}
                    <div className="mt-3 sm:mt-4 pt-1 flex flex-col gap-2">
                      <button
                        onClick={(e) => handleAddBundle(bundle, e)}
                        className={`w-full py-3 px-3 text-sm font-bold tracking-wide rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-ambient ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9]"
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
                        className="text-center text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-900 transition-colors py-1.5"
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

        {/* Free Diet Consultation Banner */}
        <DietConsultationBanner />
      </main>

      <StoreFooter />
    </div>
  );
}
