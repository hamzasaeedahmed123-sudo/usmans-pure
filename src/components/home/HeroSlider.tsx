"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar, SlideTheme } from "@/components/Navbar";
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
  bgColor: string;
  announcementBg: string;
  activePillClass: string;
  backdropImage: string;
  textColor: string;
  giantTextColor: string;
  giantTextClass: string;
  image: string;
  floating: [string, string];
  detailUrl: string;
  altText: string;
}

export const CATEGORY_PILLS = [
  {
    id: "flour",
    label: "01. Chakki Atta",
    slideIndex: 0,
    activeClass: "bg-[#2A1F17] text-white shadow-md border border-[#3D2B1F]",
  },
  {
    id: "herbals",
    label: "02. Oregano Tea",
    slideIndex: 1,
    activeClass: "bg-[#0E381C] text-white shadow-md border border-[#145330]",
  },
];

export const SLIDES: HeroSlide[] = [
  {
    id: "flour",
    tag: "Taaza Chakki Atta",
    title: "MULTIGRAIN",
    subtitle: "FLOUR",
    fullTitle: "Usman's Pure Multigrain Flour",
    benefit: "Ghar ke dastarkhwan ke liye narm phulka roti — chakki ka qudrati fiber, bina kisi maiday ke.",
    miniStats: ["Weight Management", "Zero Maida", "Chakki Ground"],
    price: "Rs 2,450",
    originalPrice: "Rs 2,950",
    weight: "2 LBS (900g)",
    bgColor: "#FAF9F5",
    announcementBg: "#2A1F17", // Deep Roasted Brown
    activePillClass: "bg-[#2A1F17] text-white shadow-md border border-[#3D2B1F]",
    backdropImage: "/images/hero/flour-backdrop.jpg",
    textColor: "#3B291A",
    giantTextColor: "#3B291A",
    giantTextClass: "text-[#3B291A] font-black opacity-95",
    image: "/images/hero/hero-flour-product.png",
    floating: ["/images/hero/wheat-1.png", "/images/hero/wheat-2.png"],
    detailUrl: "/flour",
    altText: "Usman's Pure Multigrain Flour with golden dried wheat stalks and grains",
  },
  {
    id: "herbals",
    tag: "Desi Herbal Qehwa",
    title: "OREGANO",
    subtitle: "TEA",
    fullTitle: "Usman's Oregano Tea",
    benefit: "Rozmarrah ke sukoon, hazmay aur immunity ke liye asli qudrati oregano leaves aur herbal arq ka qehwa.",
    miniStats: ["100% Qudrati", "Digestive Health", "Immunity Booster"],
    price: "Rs 850",
    originalPrice: "Rs 1,100",
    weight: "50g Jar",
    bgColor: "#EAF4EE",
    announcementBg: "#0E381C", // Deep Forest Green
    activePillClass: "bg-[#0E381C] text-white shadow-md border border-[#145330]",
    backdropImage: "/images/hero/herbal-flatlay-bg.jpg",
    textColor: "#FAF9F5",
    giantTextColor: "#FAF9F5",
    giantTextClass: "text-[#FAF9F5] font-black opacity-95",
    image: "/images/hero/hero-tea-product.png",
    floating: ["/images/hero/chamomile.png", "/images/hero/leaf.png"],
    detailUrl: "/herbals",
    altText: "Usman's Oregano Tea jar with fresh oregano leaves and wooden scoop",
  },
];

const AUTO_SLIDE_DURATION = 4000; // Strictly advance every 4 seconds without stopping

export function HeroSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const { cmsContent } = useStoreData();
  const { setActiveTheme } = useAmbientTheme();

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
    setActiveTheme(rawSlide.id as "flour" | "herbals");
  }, [rawSlide.id, setActiveTheme]);

  // Navigation handlers
  const goToSlide = useCallback((newIndex: number, newDir: number = 1) => {
    setDirection(newDir);
    setCurrentSlideIndex(newIndex);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlideIndex + 1) % SLIDES.length, 1);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlideIndex - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [currentSlideIndex, goToSlide]);

  // Auto-slide 4-second continuous timer (cycling: Flour -> Herbals -> Flour)
  // Re-runs and resets timer whenever currentSlideIndex changes (e.g. manual pill click)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, currentSlideIndex]);

  // Preload upcoming slides' background and product images in the background to eliminate image lag
  useEffect(() => {
    if (typeof window === "undefined") return;

    const idleCallback =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ||
      ((cb: () => void) => setTimeout(cb, 100));

    const handle = idleCallback(() => {
      SLIDES.forEach((slide) => {
        const bg = new window.Image();
        bg.src = slide.backdropImage;
        const prod = new window.Image();
        prod.src = slide.image;
        slide.floating.forEach((floatSrc) => {
          if (floatSrc) {
            const fl = new window.Image();
            fl.src = floatSrc;
          }
        });
      });
    });

    return () => {
      const cancelIdle = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cancelIdle && typeof handle === "number") {
        cancelIdle(handle);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Add to cart handler
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsAdded(true);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("usman-add-to-cart", {
          detail: {
            id: currentSlide.id,
            name: currentSlide.fullTitle,
            pack: currentSlide.weight,
            price: parseInt(currentSlide.price.replace(/[^0-9]/g, ""), 10),
            image: currentSlide.image,
            quantity: 1,
          },
        })
      );
    }

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const category = currentSlide.id === "herbals" ? "teas" : "flours";
      window.location.href = `/products?category=${category}`;
    }
  };

  return (
    <motion.section
      animate={{ backgroundColor: currentSlide.bgColor }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="relative w-full h-[100dvh] min-h-[600px] max-h-[1080px] overflow-hidden select-none flex flex-col justify-between"
      style={{ color: currentSlide.textColor }}
    >
      {/* 1. Dynamic Top Announcement Bar (Sync with Active Slide using Framer Motion 0.6s) */}
      <AnnouncementBar customBg={currentSlide.announcementBg} />

      {/* 2. Full-Screen 16:9 Organic Texture Backdrop Layer with Smooth Cross-Fade */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`backdrop-${currentSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none z-0 transform-gpu will-change-transform"
        >
          <Image
            src={currentSlide.backdropImage}
            alt="Organic Texture Backdrop"
            fill
            priority
            quality={85}
            className="object-cover object-center mix-blend-multiply"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* 3. Top Header & Navbar: Dynamic Slide-Synced Theme & Collision-Free Layout */}
      <Navbar
        slideIndex={currentSlideIndex}
        slideTheme={currentSlide.id as SlideTheme}
        tag={currentSlide.tag}
      />

      {/* 4. Top Category Switcher Pills: Prominently displayed in hero header section (Strictly hidden on mobile, md:flex on desktop/tablet) */}
      <div className="pure-categories-wrapper hidden md:flex max-md:!hidden relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-1.5 sm:pt-2 items-center justify-center shrink-0">
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 767px) {
            .pure-categories-wrapper {
              display: none !important;
              visibility: hidden !important;
              height: 0 !important;
              max-height: 0 !important;
              overflow: hidden !important;
              pointer-events: none !important;
            }
          }
        `}} />
        <div className="hidden md:flex max-md:!hidden flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/35 backdrop-blur-md border border-white/50 px-3.5 sm:px-5 py-1.5 rounded-full shadow-xs">
          <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase opacity-75 text-stone-900 select-none">
            PURE CATEGORIES:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = pill.slideIndex === currentSlideIndex;
              return (
                <button
                  key={pill.id}
                  onClick={() => goToSlide(pill.slideIndex, pill.slideIndex > currentSlideIndex ? 1 : -1)}
                  aria-label={`Switch to ${pill.label}`}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer shadow-xs ${
                    isActive
                      ? pill.activeClass
                      : "bg-white/40 text-stone-800 hover:bg-white/70 backdrop-blur-md border border-white/50"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Main Hero Stage (Desktop: 2-Column Text & Product Layout | Mobile: Vertically Stacked with Product Below) */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-full px-4 sm:px-6 lg:px-12 py-3 md:py-6 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* MOBILE VIEW (< md): Vertical Stack with Headline/Price Top, Product Below  */}
        {/* ========================================================================= */}
        <div className="md:hidden relative w-full h-full flex flex-col items-center justify-center py-2 z-10 overflow-hidden px-2 max-w-md mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`mobile-stage-${currentSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="relative w-full flex flex-col items-center justify-center transform-gpu will-change-transform"
            >
              {/* 1. Eyebrow Tag */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 shadow-2xs backdrop-blur-md transition-colors ${
                  currentSlide.id === "herbals"
                    ? "bg-black/50 text-[#FAF9F5] border border-white/40 drop-shadow-md"
                    : "bg-white/80 border border-stone-200/70 text-stone-800"
                }`}
              >
                🌱 {currentSlide.tag}
              </span>

              {/* 2. Headline Title (White / Cream with drop-shadow on busy backdrops) */}
              <h1
                className={`text-2xl sm:text-3xl font-serif font-black tracking-tight leading-tight text-center mb-1.5 transition-colors ${
                  currentSlide.id === "herbals"
                    ? "text-[#FAF9F5] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]"
                    : "text-stone-900"
                }`}
              >
                {currentSlide.fullTitle}
              </h1>

              {/* 3. Description / Benefit (Light cream with drop-shadow on busy backdrops) */}
              <p
                className={`text-xs sm:text-sm text-center font-medium leading-snug line-clamp-2 max-w-xs mb-3 transition-colors ${
                  currentSlide.id === "herbals"
                    ? "text-[#FAF9F5] drop-shadow-[0_1px_5px_rgba(0,0,0,0.85)]"
                    : "text-stone-700"
                }`}
              >
                {currentSlide.benefit}
              </p>

              {/* 4. Price & CTAs Row (with generous mb-5 to mb-6 spacing below) */}
              <div className="flex flex-wrap items-center justify-center gap-2 w-full mb-5 sm:mb-6 pointer-events-auto">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md shadow-xs border border-white/70 text-stone-900 shrink-0">
                  <span className="text-xs sm:text-sm font-bold">{currentSlide.price}</span>
                  {currentSlide.originalPrice && (
                    <span className="text-[11px] text-stone-500 line-through">
                      {currentSlide.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="py-2 px-3.5 rounded-lg text-xs font-bold bg-[#1C1613] text-white hover:bg-black transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Added!</span>
                    </>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleLearnMore}
                  className="py-2 px-3 rounded-lg text-xs font-semibold border border-stone-300 hover:border-stone-500 bg-white/80 hover:bg-white transition-all text-stone-800 cursor-pointer shrink-0"
                >
                  <span>Learn More</span>
                </button>
              </div>

              {/* 5. Isolated Product Image Placed Below CTAs */}
              <div className="relative w-full flex items-center justify-center pointer-events-none my-1">
                {/* Floor shadow */}
                <div className="absolute -bottom-1 inset-x-12 h-4 rounded-full bg-black/20 blur-md pointer-events-none -z-10" />

                <div className="relative w-full flex items-center justify-center">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.altText}
                    width={450}
                    height={450}
                    priority
                    quality={85}
                    sizes="(max-width: 768px) 320px, 450px"
                    className={`w-auto mx-auto object-contain drop-shadow-md select-none ${
                      currentSlide.id === "herbals"
                        ? "max-h-[250px] sm:max-h-[280px]"
                        : "max-h-[260px] sm:max-h-[290px]"
                    }`}
                  />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP/LAPTOP VIEW (md:grid): 2-Column Layout (Text Left | Product Right) */}
        {/* ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 md:items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 gap-8 lg:gap-12 w-full h-full relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`desktop-left-${currentSlide.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col justify-center text-left max-w-xl z-10"
            >
              {/* Eyebrow Tag */}
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit mb-3.5 shadow-2xs backdrop-blur-md transition-colors ${
                  currentSlide.id === "herbals"
                    ? "bg-black/50 text-[#FAF9F5] border border-white/40 drop-shadow-md"
                    : "bg-white/75 border border-stone-300/70 text-stone-900"
                }`}
              >
                🌱 {currentSlide.tag}
              </div>

              {/* Large Headline */}
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-[1.12] mb-3.5 transition-colors ${
                  currentSlide.id === "herbals"
                    ? "text-[#FAF9F5] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]"
                    : "text-stone-900"
                }`}
              >
                {currentSlide.fullTitle}
              </h1>

              {/* Brief Description */}
              <p
                className={`text-sm lg:text-base leading-relaxed font-medium max-w-lg mb-4.5 transition-colors ${
                  currentSlide.id === "herbals"
                    ? "text-[#FAF9F5] drop-shadow-[0_1px_5px_rgba(0,0,0,0.85)]"
                    : "text-stone-700"
                }`}
              >
                {currentSlide.benefit}
              </p>

              {/* Bullet Points / Mini Stats */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {currentSlide.miniStats.map((stat, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-2xs transition-colors ${
                      currentSlide.id === "herbals"
                        ? "bg-black/40 border border-white/30 text-[#FAF9F5] drop-shadow-sm"
                        : "bg-white/75 border border-stone-200/80 text-stone-900"
                    }`}
                  >
                    ✓ {stat}
                  </span>
                ))}
              </div>

              {/* Price & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/85 backdrop-blur-md shadow-xs border border-white/80 text-stone-900 shrink-0">
                  <span className="text-base lg:text-lg font-black text-stone-900">{currentSlide.price}</span>
                  {currentSlide.originalPrice && (
                    <span className="text-xs text-stone-500 line-through">{currentSlide.originalPrice}</span>
                  )}
                  <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md ml-1">{currentSlide.weight}</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-5 rounded-xl text-sm font-bold bg-[#1C1613] text-white hover:bg-black transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  {isAdded ? (
                    <>
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Added!</span>
                    </>
                  ) : (
                    <span>Add to Cart</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleLearnMore}
                  className="py-2.5 px-4 rounded-xl text-sm font-semibold border border-stone-300 hover:border-stone-500 bg-white/75 hover:bg-white transition-all text-stone-900 cursor-pointer shadow-xs"
                >
                  <span>Learn More</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Column: Prominent Isolated Product Visual */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`desktop-right-${currentSlide.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: "spring", stiffness: 260, damping: 24 },
              }}
              exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.3 } }}
              className="relative w-full h-full min-h-[380px] max-h-[500px] flex items-center justify-center p-2"
            >
              {/* Natural Floor Drop Shadow */}
              <div className="absolute bottom-4 inset-x-12 h-6 rounded-full bg-black/15 blur-lg pointer-events-none -z-10" />

              {/* Product Visual Container with 3D Spring Hover Interaction */}
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.altText}
                  width={700}
                  height={700}
                  priority
                  quality={85}
                  sizes="(max-width: 1024px) 50vw, 650px"
                  className={`w-auto object-contain select-none drop-shadow-md ${
                    currentSlide.id === "herbals"
                      ? "max-h-[440px] lg:max-h-[490px]"
                      : "max-h-[430px] lg:max-h-[470px]"
                  }`}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 5. Bottom Controls Dock (Left: Weight Badge + Pause Button | Center: Pagination Dots | Right: Prev/Next Buttons) */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-4 sm:pb-6 flex items-center justify-between gap-4">
        {/* Left Controls: Weight Pill + Single Pause Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-white/80 backdrop-blur-md shadow-xs border border-white/70 text-stone-900 transition-transform">
            <span>{currentSlide.weight}</span>
          </div>

          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? "Pause auto-slide" : "Resume auto-slide"}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs border ${
              isPlaying
                ? "bg-white/80 hover:bg-white text-stone-900 border-white/70 shadow-sm"
                : "bg-black/40 hover:bg-black/60 text-white border-white/30"
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
        </div>

        {/* Center: Pagination Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx, idx > currentSlideIndex ? 1 : -1)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-7 sm:w-8 bg-current shadow-xs"
                    : "w-2 bg-current/40 hover:bg-current/75"
                }`}
              />
            );
          })}
        </div>

        {/* Right: Prev & Next Navigation Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/45 hover:bg-white text-stone-900 backdrop-blur-md flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/45 hover:bg-white text-stone-900 backdrop-blur-md flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>

    </motion.section>
  );
}

export default HeroSlider;
