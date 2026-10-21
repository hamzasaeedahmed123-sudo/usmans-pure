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
    label: "02. Herbal Teas",
    slideIndex: 1,
    activeClass: "bg-[#0E381C] text-white shadow-md border border-[#145330]",
  },
  {
    id: "spices",
    label: "03. Organic Spices",
    slideIndex: 2,
    activeClass: "bg-[#541B10] text-white shadow-md border border-[#8D2D1B]",
  },
];

export const SLIDES: HeroSlide[] = [
  {
    id: "flour",
    tag: "100% Stone-Ground",
    title: "MULTIGRAIN",
    subtitle: "FLOUR",
    fullTitle: "Chakki Multigrain Flour",
    benefit: "Cold-milled under 40°C with 100% vital dietary fiber & zero maida.",
    miniStats: ["100% Purity", "Cold-Milled", "Zero Maida"],
    price: "Rs 2,450",
    weight: "10kg",
    bgColor: "#E5D2BA",
    announcementBg: "#2A1F17", // Deep Roasted Brown
    activePillClass: "bg-[#2A1F17] text-white shadow-md border border-[#3D2B1F]",
    backdropImage: "/images/hero/flour-backdrop.jpg",
    textColor: "#3B291A",
    giantTextColor: "#3B291A",
    giantTextClass: "text-[#3B291A] font-black opacity-95",
    image: "/images/hero/multigrain-flour.png",
    floating: ["/images/hero/wheat-1.png", "/images/hero/wheat-2.png"],
    detailUrl: "/flour",
    altText: "Chakki Stone-Ground Multigrain Flour 10kg",
  },
  {
    id: "herbals",
    tag: "Pure Botanical",
    title: "HERBAL",
    subtitle: "TEAS",
    fullTitle: "Organic Herbal Tea",
    benefit: "Hand-harvested blossoms & olive leaf for daily caffeine-free detox.",
    miniStats: ["100% Botanical", "Caffeine-Free", "Whole Leaf"],
    price: "Rs 1,250",
    weight: "250g",
    bgColor: "#A3D2B7",
    announcementBg: "#0E381C", // Deep Forest Green
    activePillClass: "bg-[#0E381C] text-white shadow-md border border-[#145330]",
    backdropImage: "/images/hero/herbal-flatlay-bg.jpg",
    textColor: "#0A3317",
    giantTextColor: "#0A3317",
    giantTextClass: "text-[#0A3317] font-black opacity-95",
    image: "/images/hero/herbal-tea-v2.png",
    floating: ["/images/hero/chamomile.png", "/images/hero/leaf.png"],
    detailUrl: "/herbals",
    altText: "Artisanal Pure Organic Herbal Tea 250g",
  },
  {
    id: "spices",
    tag: "Cold Stone-Pounded",
    title: "ORGANIC",
    subtitle: "SPICES",
    fullTitle: "Organic Spices",
    benefit: "Slow stone-pounded aroma lock with zero dyes and zero additives.",
    miniStats: ["Zero Sudan Dyes", "Cold-Pounded", "Aroma-Lock"],
    price: "Rs 950",
    weight: "500g",
    bgColor: "#A73E24",
    announcementBg: "#541B10", // Deep Terracotta Rust
    activePillClass: "bg-[#541B10] text-white shadow-md border border-[#8D2D1B]",
    backdropImage: "/images/hero/spices-fluid-bg.jpg",
    textColor: "#FFF2E5",
    giantTextColor: "#FFF2E5",
    giantTextClass: "text-[#FFF2E5] font-black opacity-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]",
    image: "/images/hero/spices-jar-v2.png",
    floating: ["/images/hero/cinnamon.png", "/images/hero/star-anise.png"],
    detailUrl: "/spices",
    altText: "Cold Stone-Pounded Organic Spices 500g",
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
    setActiveTheme(rawSlide.id as "flour" | "herbals" | "spices");
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

  // Auto-slide 4-second continuous timer (cycling: Flour -> Herbals -> Spices -> Flour)
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

  return (
    <motion.section
      animate={{ backgroundColor: currentSlide.bgColor }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden select-none flex flex-col justify-between"
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

      {/* 5. Main Hero Stage (Desktop: Layered 3D Swirl & Backdrop | Mobile: Detached Vertical Flow with Zero Overlap) */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-full px-2 sm:px-6 py-1 md:py-2 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* MOBILE VIEW (< md): Detached 3-Tier Vertical Flow with Zero Overlap       */}
        {/* ========================================================================= */}
        <div className="md:hidden relative w-full h-full flex flex-col justify-between py-1 z-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`mobile-stage-${currentSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="relative w-full h-full flex flex-col transform-gpu will-change-transform"
            >
              {/* Upper Tier: Giant Category Title Cleanly Placed in Upper Canvas */}
              <div className="w-full text-center px-4 pt-1 sm:pt-2 shrink-0 z-10 select-none">
                <h1
                  style={{ color: currentSlide.giantTextColor }}
                  className={`text-[11vw] sm:text-[9.5vw] font-black tracking-tight leading-none text-center max-w-full px-2 select-none ${currentSlide.giantTextClass}`}
                >
                  <span className="block">{currentSlide.title}</span>
                  <span className="block text-[9vw] sm:text-[7.5vw] font-black tracking-tight mt-0.5">{currentSlide.subtitle}</span>
                </h1>
              </div>

              {/* Center Tier: Main Product Pouch Shifted Upward (top-[34%] -translate-y-1/2) to Guarantee Zero Card Overlap */}
              <div className="absolute top-[34%] -translate-y-1/2 inset-x-0 flex items-center justify-center max-h-[32vh] sm:max-h-[36vh] pointer-events-none z-10">
                {/* Natural Soft Radial Drop-Shadow at Base */}
                <div className="absolute -bottom-2 inset-x-14 h-4 rounded-full bg-black/20 blur-md pointer-events-none -z-10" />

                {/* Product Glow Aura */}
                <div
                  className="absolute inset-4 rounded-full blur-xl opacity-35 pointer-events-none -z-10"
                  style={{ backgroundColor: currentSlide.bgColor }}
                />

                {/* Main Product Cutout Image with Gentle Idle Float Animation */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 0.8, -0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative w-full h-[30vh] sm:h-[34vh] max-h-[32vh] sm:max-h-[36vh] flex items-center justify-center pointer-events-none transform-gpu will-change-transform"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.altText}
                    fill
                    sizes="(max-width: 768px) 60vw, 400px"
                    quality={85}
                    className="object-contain p-1 mix-blend-multiply max-h-[32vh] sm:max-h-[36vh] w-auto drop-shadow-md"
                    priority
                  />
                </motion.div>

                {/* Floating Element 1 (Upper Left) */}
                {currentSlide.floating[0] && (
                  <motion.div
                    animate={{ y: [-4, 4, -4], rotate: [-4, 4, -4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1 left-4 w-11 h-11 pointer-events-none z-20 transform-gpu will-change-transform"
                  >
                    <Image
                      src={currentSlide.floating[0]}
                      alt="ingredient"
                      fill
                      sizes="44px"
                      className="object-contain mix-blend-multiply"
                    />
                  </motion.div>
                )}

                {/* Floating Element 2 (Lower Right) */}
                {currentSlide.floating[1] && (
                  <motion.div
                    animate={{ y: [4, -4, 4], rotate: [4, -4, 4] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-1 right-4 w-11 h-11 pointer-events-none z-20 transform-gpu will-change-transform"
                  >
                    <Image
                      src={currentSlide.floating[1]}
                      alt="ingredient"
                      fill
                      sizes="44px"
                      className="object-contain mix-blend-multiply"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (md:flex): Preserved 3D Layering Behind Product Pouch       */}
        {/* ========================================================================= */}
        <div className="hidden md:flex relative items-center justify-center w-full h-full">
          {/* Giant Back-Text: Liquid Horizontal Sliding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 max-w-full overflow-hidden">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={`text-desk-${currentSlide.id}`}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? "85%" : "-85%",
                    opacity: 0,
                    scale: 0.96,
                  }),
                  center: {
                    x: "0%",
                    opacity: 0.9,
                    scale: 1,
                    transition: {
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? "-85%" : "85%",
                    opacity: 0,
                    scale: 0.96,
                    transition: {
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-full flex flex-col items-center justify-center text-center px-2 overflow-hidden transform-gpu will-change-transform"
              >
                <h1
                  style={{ color: currentSlide.giantTextColor }}
                  className={`text-[10vw] sm:text-[12vw] md:text-[120px] lg:text-[150px] font-black tracking-tight text-center leading-none select-none px-2 max-w-full overflow-hidden ${currentSlide.giantTextClass} drop-shadow-xs`}
                >
                  <span className="block max-w-full truncate">{currentSlide.title}</span>
                  <span className="block mt-1 sm:mt-2 max-w-full truncate">{currentSlide.subtitle}</span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Product Showcase with Spring Scale-in */}
          <div className="relative z-10 flex items-center justify-center w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`prod-desk-${currentSlide.id}`}
                initial={{ scale: 0.8, opacity: 0, y: 25 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                  },
                }}
                exit={{
                  scale: 0.82,
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.35, ease: "easeInOut" },
                }}
                className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[460px] flex items-center justify-center transform-gpu will-change-transform"
              >
                {/* Natural Soft Radial Drop-Shadow at Base */}
                <div className="absolute -bottom-4 inset-x-8 sm:inset-x-12 h-7 rounded-full bg-black/20 blur-lg pointer-events-none -z-10" />

                {/* Product Glow Aura */}
                <div
                  className="absolute inset-4 rounded-full blur-2xl opacity-30 pointer-events-none -z-10"
                  style={{ backgroundColor: currentSlide.bgColor }}
                />

                {/* Main Product Cutout Image with 3D Spring Hover Interaction & Dynamic Drop Shadow */}
                <motion.div
                  whileHover={{ y: -12, scale: 1.03, rotate: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative w-full h-full flex items-center justify-center cursor-pointer transition-[filter] duration-300 ease-out [filter:drop-shadow(0_15px_25px_rgba(0,0,0,0.12))] hover:[filter:drop-shadow(0_30px_45px_rgba(0,0,0,0.25))] transform-gpu will-change-transform"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.altText}
                    fill
                    sizes="(max-width: 768px) 60vw, 400px"
                    quality={85}
                    className="object-contain p-2 mix-blend-multiply select-none"
                    priority
                  />
                </motion.div>

                {/* Floating Element 1 (Upper Left / Bobbing Float Animation, zero box artifacts) */}
                {currentSlide.floating[0] && (
                  <motion.div
                    animate={{
                      y: [-8, 8, -8],
                      rotate: [-4, 5, -4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-4 -left-6 sm:-top-8 sm:-left-12 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none z-20 transform-gpu will-change-transform"
                  >
                    <Image
                      src={currentSlide.floating[0]}
                      alt="floating ingredient"
                      fill
                      sizes="112px"
                      className="object-contain mix-blend-multiply"
                    />
                  </motion.div>
                )}

                {/* Floating Element 2 (Lower Right / Delayed Bobbing Float Animation, zero box artifacts) */}
                {currentSlide.floating[1] && (
                  <motion.div
                    animate={{
                      y: [8, -8, 8],
                      rotate: [4, -5, 4],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                    className="absolute -bottom-4 -right-6 sm:-bottom-8 sm:-right-12 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none z-20 transform-gpu will-change-transform"
                  >
                    <Image
                      src={currentSlide.floating[1]}
                      alt="floating ingredient"
                      fill
                      sizes="112px"
                      className="object-contain mix-blend-multiply"
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 5. Bottom Controls Dock (Left: Weight + Pause with Info Card directly above, Center: Add to Cart + Learn More + Dots) */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-5 sm:pb-7 flex flex-col gap-3">
        {/* Floating Product Info Card: Scaled up 10%, Full Title (No Truncation), No Price Tag */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-card-${currentSlide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-3 sm:gap-3.5 md:gap-4 backdrop-blur-md bg-white/35 border border-white/45 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-4.5 shadow-xl w-[92%] max-w-[360px] md:max-w-[420px] absolute bottom-[90px] sm:bottom-[100px] md:bottom-[110px] lg:bottom-[120px] left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 z-20 pointer-events-auto transform-gpu will-change-transform"
          >
            {/* Left 3-Badge Stack: Scaled up & Vertically Centered */}
            <div className="flex flex-col gap-1.5 border-r border-white/30 pr-2.5 md:pr-3.5 shrink-0 self-center">
              {currentSlide.miniStats.map((stat, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-tight bg-white/45 text-stone-900 border border-white/50 whitespace-nowrap shadow-2xs text-center"
                >
                  {stat}
                </span>
              ))}
            </div>

            {/* Product Thumbnail: Scaled up & Vertically Centered */}
            <div className="relative w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/45 backdrop-blur-sm p-1 shrink-0 flex items-center justify-center shadow-inner self-center">
              <Image
                src={currentSlide.image}
                alt={currentSlide.fullTitle}
                fill
                className="object-contain p-0.5 md:p-1"
                sizes="(max-width: 640px) 48px, 56px"
              />
            </div>

            {/* Full Product Title (No Truncation) & Description - Price Tag Removed */}
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <h3 className="text-lg md:text-xl font-bold text-stone-900 tracking-tight whitespace-normal leading-snug">
                {currentSlide.fullTitle}
              </h3>
              <p className="text-xs md:text-sm text-stone-800/90 leading-snug mt-1 font-medium whitespace-normal">
                {currentSlide.benefit}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          
          {/* Left Controls: Weight Pill + Single Pause Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Weight Pill Badge */}
            <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-white/80 backdrop-blur-md shadow-xs border border-white/70 text-stone-900 transition-transform">
              <span>{currentSlide.weight}</span>
            </div>

            {/* Single Clean Round Pause Button (Toggles Auto-Slide) */}
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

          {/* Center Dock: Add to Cart & Learn More with Pagination Dots right beneath (Shifted right on desktop to prevent card collision) */}
          <div className="flex flex-col items-center gap-2 md:translate-x-10 lg:translate-x-14">
            {/* Center Pill: Hidden on Mobile, Only Visible on Desktop/Tablet */}
            <div className="hidden md:flex items-center gap-2.5 sm:gap-3 bg-white/45 backdrop-blur-md border border-white/65 rounded-2xl py-1.5 px-3 sm:py-2 sm:px-4 shadow-lg">
              {/* Formatted Price */}
              <span className="text-xs sm:text-sm font-black px-1 text-current">
                {currentSlide.price}
              </span>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-bold bg-[#1C1613] text-white hover:bg-black transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
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

              {/* Learn More Button */}
              <Link
                href={currentSlide.detailUrl}
                className="py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold border border-current/30 hover:bg-white/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Learn More</span>
              </Link>
            </div>

            {/* Pagination Dots right beneath the capsule dock */}
            <div className="flex items-center gap-1.5 pt-0.5">
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
          </div>

          {/* Right Spacer / Prev & Next Controls */}
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

        </div>
      </footer>

      {/* Invisible Background Preloaders for Instant Slide Switching */}
      <div className="hidden" aria-hidden="true">
        {SLIDES.map((slide, idx) => {
          if (idx === currentSlideIndex) return null;
          return (
            <React.Fragment key={`preload-${slide.id}`}>
              <Image
                src={slide.backdropImage}
                alt=""
                width={1920}
                height={1080}
                quality={85}
                priority
              />
              <Image
                src={slide.image}
                alt=""
                width={400}
                height={400}
                quality={85}
                priority
              />
            </React.Fragment>
          );
        })}
      </div>
    </motion.section>
  );
}

export default HeroSlider;
