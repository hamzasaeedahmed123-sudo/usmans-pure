"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { DietConsultationBanner } from "@/components/DietConsultationBanner";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";
import { useCart } from "@/context/CartContext";
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
  const { addItem, openCart } = useCart();
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
    addItem(
      {
        id: bundle.id,
        name: bundle.title,
        pack: "Curated Bundle",
        price: bundle.price,
        image: bundle.image,
      },
      1
    );
    openCart();
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
              Carefully paired by our master millers. Each value pack combines FRESHLY MILLED flours with pure herbal teas to give your family wholesome nutrition at bundle savings of up to ₨800.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#6B5D52]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#EFE7DB] text-[#1E1510] font-medium tracking-wide">
                <Truck className="w-3.5 h-3.5 text-[#8B3A22]" /> Free Doorstep COD Available
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#EFE7DB] text-[#1E1510] font-medium tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B3A22]" /> Lab-Verified Purity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#EFE7DB] text-[#1E1510] font-medium tracking-wide">
                <Heart className="w-3.5 h-3.5 text-[#8B3A22]" /> Includes Daily Usage Schedule
              </span>
            </div>
          </div>
        </section>

        {/* 3-Column Editorial Grid Section - Strict 2 Columns on Mobile - Borderless Minimalist */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
            {/* 3-Column Editorial Grid Section - Strict 2 Columns on Mobile - Borderless Minimalist with Luxury Whitespace */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16 lg:grid-cols-3">
              {bundles.map((bundle) => {
                const discountPercent = bundle.originalPrice > bundle.price
                  ? Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)
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
                          sizes="(max-width: 768px) 50vw, 25vw"
                          quality={85}
                          className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </Link>

                      {/* Tiny minimalist circular/pill-shaped red badge */}
                      {discountPercent > 0 && (
                        <span className="absolute top-2 right-2 z-10 bg-red-600 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded-full pointer-events-none shadow-xs tracking-wider">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Text and details below image */}
                    <div className="mt-4 sm:mt-5 flex flex-col text-center">
                      <Link href={`/bundles/${bundle.slug}`}>
                        <h2 className="text-sm md:text-base font-normal text-stone-800 leading-snug line-clamp-2 hover:text-[#145330] transition-colors tracking-normal">
                          {bundle.title}
                        </h2>
                      </Link>

                      {/* Price display: bold prominent sale price & subtle crossed-out original, center-aligned */}
                      <div className="mt-2 flex items-baseline justify-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-semibold text-stone-800">
                          Rs {bundle.price.toLocaleString()}
                        </span>
                        {bundle.originalPrice > bundle.price && (
                          <span className="text-xs sm:text-sm text-stone-400 line-through font-normal">
                            Rs {bundle.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Delicate Pill-shaped Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddBundle(bundle, e)}
                        className="mt-3.5 w-full max-w-[170px] sm:max-w-[190px] mx-auto py-2 sm:py-2.5 px-4 rounded-full bg-white border border-stone-300 hover:border-stone-400 text-stone-800 hover:bg-stone-50 text-xs sm:text-sm font-normal tracking-wide shadow-xs hover:shadow-sm active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
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

        {/* Free Diet Consultation Banner */}
        <DietConsultationBanner />
      </main>

      <StoreFooter />
    </div>
  );
}
