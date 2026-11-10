"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Check, ShoppingBag } from "lucide-react";
import { useAmbientTheme } from "@/components/theme/AmbientThemeWrapper";
import { useStoreData } from "@/context/StoreDataContext";

export interface HeroSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  fullTitle: string;
  benefit: string;
  miniStats: string[];
  price: string;
  originalPrice?: string;
  weight: string;
  backdropImage: string;
  productImage?: string;
  themeCategory: "flour" | "herbals";
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  altText: string;
}

export const SLIDES: HeroSlide[] = [
  {
    id: "flour",
    tag: "🌱 100% Stone-Ground Purity • Zero Maida",
    title: "Cold-Milled Chakki Atta",
    subtitle: "Stone-Ground Whole Wheat",
    fullTitle: "Taaza Whole Wheat Chakki Atta",
    benefit:
      "Freshly stone-ground below 40°C in traditional hygienic chakkis. Preserves living wheat germ, dietary fiber, and natural minerals for soft, fragrant phulka roti.",
    miniStats: ["100% Whole Grain", "Zero Bleaching", "Live Germ Intact"],
    price: "₨ 1,200",
    originalPrice: "₨ 1,500",
    weight: "5 Kg Family Pack",
    backdropImage: "/images/backgrounds/wheat-field-backplate.jpg",
    productImage: "/images/hero/hero-chakki-flour.png",
    themeCategory: "flour",
    primaryCtaText: "Shop Chakki Atta",
    primaryCtaUrl: "/flour",
    secondaryCtaText: "Explore All Flours",
    secondaryCtaUrl: "/products?category=flours",
    altText: "Usman's Pure stone-ground chakki flour with natural wheat fields and sheaves",
  },
  {
    id: "herbals",
    tag: "🌿 100% Wild Organic Harvest • Whole Leaf",
    title: "Hand-Harvested Herbal Qehwa",
    subtitle: "Wild Oregano & Chamomile",
    fullTitle: "Artisanal Whole-Leaf Oregano & Herbal Tea",
    benefit:
      "Hand-selected whole oregano leaves, calming chamomile blossoms & pure mountain flora. Naturally caffeine-free digestive tonic and tranquil evening relaxation in every cup.",
    miniStats: ["100% Natural Leaves", "Caffeine-Free", "Digestive Balance"],
    price: "₨ 850",
    originalPrice: "₨ 1,100",
    weight: "50g Artisanal Jar",
    backdropImage: "/images/hero/herbal-flatlay-bg.jpg",
    productImage: "/images/hero/hero-tea-product.png",
    themeCategory: "herbals",
    primaryCtaText: "Shop Herbal Teas",
    primaryCtaUrl: "/herbals",
    secondaryCtaText: "View Tea Blends",
    secondaryCtaUrl: "/products?category=teas",
    altText: "Artisanal herbal tea with whole leaves, dried chamomile, and wooden scoop",
  },
  {
    id: "diabetic",
    tag: "🌾 Clinically Formulated • Low Glycemic Index",
    title: "Diabetic Care & Metabolic Grains",
    subtitle: "Fenugreek Plus & Barley",
    fullTitle: "FENUGREEK Plus Diabetic Support Flour",
    benefit:
      "Doctor-formulated low-GI blend enriched with whole barley, roasted methi dana, and soluble dietary fiber to gently moderate blood sugar spikes and sustain day-long vitality.",
    miniStats: ["Low-GI Certified", "Methi & Jau Enriched", "Slow Digesting"],
    price: "₨ 1,200",
    originalPrice: "₨ 1,500",
    weight: "5 Kg Diabetic Pack",
    backdropImage: "/images/products/prod-4-kitchen.jpg",
    productImage: "/images/products/prod-4.png",
    themeCategory: "flour",
    primaryCtaText: "Order Diabetic Atta",
    primaryCtaUrl: "/doctors-choice",
    secondaryCtaText: "Dietary Guidance",
    secondaryCtaUrl: "/doctors-choice",
    altText: "FENUGREEK Plus flour package with wholesome grains in a clean rustic kitchen",
  },
  {
    id: "bundles",
    tag: "✨ Monthly Household Pantry • Save Up to ₨800",
    title: "Curated Organic Lifestyle Bundles",
    subtitle: "Complete Family Nutrition",
    fullTitle: "Usman's Pure Household Wellness Kit",
    benefit:
      "Everything your home needs: stone-ground chakki flour, specialized multigrain blends, and restorative herbal teas in one economical pantry bundle with free doorstep delivery.",
    miniStats: ["Save Up To ₨800", "Free Delivery Nationwide", "Cash on Delivery"],
    price: "₨ 2,450",
    originalPrice: "₨ 3,250",
    weight: "Complete Household Bundle",
    backdropImage: "/images/hero/flour-backdrop.jpg",
    productImage: "/images/products/flagship-man-product-merged.png",
    themeCategory: "flour",
    primaryCtaText: "Shop Mega Bundles",
    primaryCtaUrl: "/bundles",
    secondaryCtaText: "Explore Value Packs",
    secondaryCtaUrl: "/bundles",
    altText: "Curated organic bundle including whole wheat flour, multigrain, and herbal tea",
  },
];

const AUTO_SLIDE_DURATION = 5000;

export function HeroSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const { setActiveTheme } = useAmbientTheme();
  const { cmsContent } = useStoreData();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const rawSlide = SLIDES[currentSlideIndex];
  const slideCms = cmsContent?.heroSlides?.[rawSlide.id as keyof typeof cmsContent.heroSlides];
  const currentSlide = {
    ...rawSlide,
    title: slideCms?.title || rawSlide.title,
    subtitle: slideCms?.subtitle || rawSlide.subtitle,
    fullTitle: slideCms?.fullTitle || rawSlide.fullTitle,
    benefit: slideCms?.benefit || rawSlide.benefit,
    price: slideCms?.price || rawSlide.price,
    weight: slideCms?.weight || rawSlide.weight,
  };

  // Sync ambient theme with active slide
  useEffect(() => {
    setActiveTheme(currentSlide.themeCategory);
  }, [currentSlide.themeCategory, setActiveTheme]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlideIndex((index + SLIDES.length) % SLIDES.length);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlideIndex + 1);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlideIndex - 1);
  }, [currentSlideIndex, goToSlide]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide, currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for smooth mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPlaying(false);
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -45) {
        nextSlide();
      } else if (touchDeltaX > 45) {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsPlaying(true);
  };

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent, slide: HeroSlide) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("usman-add-to-cart", {
          detail: {
            id: slide.id,
            name: slide.fullTitle,
            pack: slide.weight,
            price: parseInt(slide.price.replace(/[^0-9]/g, ""), 10) || 1200,
            image: slide.productImage || slide.backdropImage,
            quantity: 1,
          },
        })
      );
    }

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <section
      aria-label="Featured Organic Hero Carousel"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full aspect-[4/5] min-[440px]:aspect-[1/1] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[500px] sm:min-h-[540px] md:min-h-[580px] max-h-[720px] overflow-hidden select-none bg-[#1C1613] text-[#FAF9F5]"
    >
      {/* Zero Layout Shift Sliding Track */}
      <div
        className="flex w-full h-full transition-all duration-700 ease-in-out will-change-transform transform-gpu"
        style={{
          transform: `translate3d(-${currentSlideIndex * 100}%, 0, 0)`,
        }}
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;

          return (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 flex items-center overflow-hidden"
              aria-hidden={!isActive}
            >
              {/* Atmospheric Background Photography Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.backdropImage}
                  alt={slide.altText}
                  fill
                  priority={index === 0}
                  quality={88}
                  sizes="100vw"
                  className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Luxury Atmospheric Scrim Gradient for 100% Typography Contrast */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30 sm:bg-gradient-to-r sm:from-black/90 sm:via-black/60 sm:to-black/25 z-10"
                  aria-hidden="true"
                />

                {/* Subtle warm organic ambient radial glow */}
                <div
                  className="absolute -top-24 -left-24 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none z-10"
                  aria-hidden="true"
                />
              </div>

              {/* Main Content Grid: Balanced Typography & Artisanal Product Showcase */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 flex flex-col justify-end sm:justify-center h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                  
                  {/* Left Column: Atmospheric Typography Overlay */}
                  <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left max-w-2xl">
                    {/* Eyebrow Tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/25 text-[#FAF9F5] shadow-xs mb-2.5 sm:mb-3.5">
                      <span>{slide.tag}</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#FAF9F5] leading-tight sm:leading-snug mb-2 sm:mb-3 drop-shadow-md">
                      {slide.title}
                    </h2>

                    {/* Benefit / Description */}
                    <p className="text-xs sm:text-sm lg:text-base text-stone-200 font-normal leading-relaxed mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-none max-w-xl drop-shadow-xs">
                      {slide.benefit}
                    </p>

                    {/* Mini Stats / Quality Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {slide.miniStats.map((stat, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF9F5] shadow-2xs"
                        >
                          ✓ {stat}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & Interactive CTA Row */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 w-full">
                      {/* Price Pill */}
                      <div className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#2C2A29] shadow-sm shrink-0">
                        <span className="text-xs sm:text-sm font-black">{slide.price}</span>
                        {slide.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-stone-500 line-through">
                            {slide.originalPrice}
                          </span>
                        )}
                        <span className="text-[10px] sm:text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full ml-0.5">
                          {slide.weight}
                        </span>
                      </div>

                      {/* Primary CTA */}
                      <Link
                        href={slide.primaryCtaUrl}
                        className="py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-xs sm:text-sm font-bold bg-[#FAF9F5] text-[#2C2A29] hover:bg-white shadow-md active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>{slide.primaryCtaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* Quick Add To Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, slide)}
                        className="py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-full text-xs sm:text-sm font-semibold bg-white/15 hover:bg-white/25 text-[#FAF9F5] backdrop-blur-md border border-white/30 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        {isAdded && isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Artisanal Product Visual Accent (Hidden on very small mobile, visible on tablet/desktop) */}
                  {slide.productImage && (
                    <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 items-center justify-center relative p-4">
                      {/* Floor shadow */}
                      <div className="absolute -bottom-2 inset-x-8 h-8 rounded-full bg-black/40 blur-xl pointer-events-none -z-10" />

                      <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center transform transition-transform duration-700 hover:scale-105">
                        <Image
                          src={slide.productImage}
                          alt={slide.altText}
                          width={440}
                          height={440}
                          priority={index === 0}
                          quality={85}
                          className="w-auto max-h-[340px] xl:max-h-[380px] object-contain drop-shadow-2xl select-none"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sleek Navigation Controls Dock (Bottom Right on Desktop, Bottom Center on Mobile) */}
      <div className="absolute bottom-3 sm:bottom-6 inset-x-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between pointer-events-auto">
          
          {/* Left: Auto-play Pause / Play indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
              className="w-8 h-8 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 text-[#FAF9F5] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              {isPlaying ? (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <span className="text-[11px] font-semibold text-stone-300 uppercase tracking-widest hidden md:inline">
              {currentSlideIndex + 1} / {SLIDES.length}
            </span>
          </div>

          {/* Center: Sleek Modern Pagination Dots */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {SLIDES.map((_, idx) => {
              const isCurrent = idx === currentSlideIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    isCurrent
                      ? "w-8 sm:w-10 bg-[#FAF9F5] shadow-md"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              );
            })}
          </div>

          {/* Right: Prev / Next Sleek Glass Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 text-[#FAF9F5] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 text-[#FAF9F5] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
