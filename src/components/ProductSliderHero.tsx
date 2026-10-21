"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  Check,
  X,
  Award,
  Layers,
  Leaf,
  Info,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";

// Fluid animation easing matching exact Shakky liquid-slider reference
const FLUID_EASE = [0.83, 0, 0.17, 1] as const;

export interface SlideData {
  id: number;
  categoryName: string;
  categoryTag: string;
  theme: "amber" | "green" | "terracotta";
  themeKey: "amber" | "green" | "terracotta";
  kineticLine1: string;
  kineticLine2: string;
  productName: string;
  productTagline: string;
  description: string;
  image: string;
  packOptions: Array<{ size: string; price: string; isDefault?: boolean }>;
  badges: string[];
  bgGradient: string;
  textColor: string;
  kineticColor: string;
  accentBtn: string;
  pillBg: string;
  learnMoreDetails: {
    origin: string;
    milling: string;
    shelfLife: string;
    labTested: string;
    certifications: string[];
  };
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    categoryName: "Chakki Atta",
    categoryTag: "100% Stone-Ground Whole Grain",
    theme: "amber",
    themeKey: "amber",
    kineticLine1: "MULTIGRAIN",
    kineticLine2: "FLOUR",
    productName: "Premium Chakki Multigrain Flour",
    productTagline: "100% Stone-Ground Whole Wheat • Zero Maida • Zero Bleach",
    description:
      "Crafted from 9 nutrient-dense ancient grains stone-milled in traditional chakki stone mills under 40°C. Preserves 100% natural bran, wheat germ, and vital dietary fiber for diabetic wellness and family health.",
    image: "/atta-bag.png",
    packOptions: [
      { size: "5kg", price: "$16.50" },
      { size: "10kg", price: "$29.99", isDefault: true },
    ],
    badges: ["100% Stone Ground", "High Natural Fiber", "Zero Adulteration"],
    bgGradient: "from-[#F7EFE1] via-[#EADBCA] to-[#DEC6A6]",
    textColor: "text-[#3B2411]",
    kineticColor: "text-[#3B2411]/[0.10]",
    accentBtn: "bg-[#3E2613] hover:bg-[#28170A] text-[#FAF5EC]",
    pillBg: "bg-[#FAF4EA]/80 border-[#DFC9A9]/90 text-[#3B2411]",
    learnMoreDetails: {
      origin: "Single-source organic wheat & millets from certified family farms",
      milling: "Cold chakki stone-grinding at <40°C preserving vitamins & minerals",
      shelfLife: "90 days (100% chemical & preservative free)",
      labTested: "Tested for zero heavy metals, zero pesticides, zero maida adulteration",
      certifications: ["ISO 22000 Certified", "100% Whole Grain Council", "Non-GMO Verified"],
    },
  },
  {
    id: 1,
    categoryName: "Herbal Teas",
    categoryTag: "Wild Botanical Restoration",
    theme: "green",
    themeKey: "green",
    kineticLine1: "HERBAL",
    kineticLine2: "TEAS",
    productName: "Pure Organic Herbal Tea",
    productTagline: "Crimson Rosella & Mediterranean Olive Leaf Infusion",
    description:
      "A soothing artisanal restorative infusion of sun-dried crimson wild rosella calyces, hand-harvested Mediterranean olive leaves, and aromatic whole chamomile flowers. 100% caffeine-free daily antioxidant detox.",
    image: "/tea-pouch.png",
    packOptions: [
      { size: "100g Stand-up Pouch", price: "$14.00", isDefault: true },
      { size: "20 Pyramid Bags", price: "$18.50" },
    ],
    badges: ["100% Caffeine Free", "Antioxidant Rich", "Pure Botanical Detox"],
    bgGradient: "from-[#E6F5ED] via-[#D1EBDC] to-[#A2D8BA]",
    textColor: "text-[#08301A]",
    kineticColor: "text-[#08301A]/[0.10]",
    accentBtn: "bg-[#0C3B20] hover:bg-[#072513] text-[#F0FBF4]",
    pillBg: "bg-[#F2FAF5]/80 border-[#B7E2CB]/90 text-[#08301A]",
    learnMoreDetails: {
      origin: "Highland organic botanical reserves & wild-crafted olive groves",
      milling: "Sun-dried whole petals and leaves gently coarse-cut by hand",
      shelfLife: "18 months in airtight UV-protective kraft pouch",
      labTested: "100% caffeine-free verified, non-irradiated, zero artificial flavors",
      certifications: ["USDA Organic Certified", "EU Bio Organic", "Fair Trade"],
    },
  },
  {
    id: 2,
    categoryName: "Organic Spices",
    categoryTag: "Cold Stone-Pounded Royal Spices",
    theme: "terracotta",
    themeKey: "terracotta",
    kineticLine1: "ORGANIC",
    kineticLine2: "SPICES",
    productName: "Pure Hand-Pounded Spices",
    productTagline: "Kashmiri Chili & Royal Whole Masalas",
    description:
      "Sun-ripened Kashmiri red chilies and royal whole spices cold-pounded in traditional stone mortars without friction heat. Locks in natural volatile essential oils with zero artificial dyes, zero lead chromate, and zero starch fillers.",
    image: "/spices-jar.png",
    packOptions: [
      { size: "100g Glass Jar", price: "$12.50", isDefault: true },
      { size: "200g Pouch", price: "$22.00" },
    ],
    badges: ["Cold Stone-Pounded", "Zero Sudan Dyes", "Pure Essential Oils"],
    bgGradient: "from-[#9C321C] via-[#812411] to-[#5C1407]",
    textColor: "text-[#FFF5ED]",
    kineticColor: "text-[#FFF5ED]/[0.10]",
    accentBtn: "bg-[#FFF5ED] hover:bg-[#FFE8DA] text-[#6E1C0D]",
    pillBg: "bg-[#671A0B]/80 border-[#B84E37]/80 text-[#FFF5ED]",
    learnMoreDetails: {
      origin: "Kashmiri valleys & Malabar coastal organic spice estates",
      milling: "Slow stone-pounding without friction heat to lock in volatile aroma",
      shelfLife: "12 months in amber glass jar and nitrogen-sealed pouch",
      labTested: "Tested for zero Sudan dyes, zero starch fillers, zero lead chromate",
      certifications: ["Spice Board of India Pure Grade", "100% Natural Certified"],
    },
  },
];

const AUTO_SLIDE_DURATION = 4000; // 4-second auto-cycle

export function ProductSliderHero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [direction, setDirection] = useState<number>(1);

  const currentSlide = SLIDES[currentSlideIndex];

  // Reset pack selection when slide changes
  useEffect(() => {
    const defaultIdx = currentSlide.packOptions.findIndex((o) => o.isDefault);
    setSelectedPackIndex(defaultIdx >= 0 ? defaultIdx : 0);
  }, [currentSlideIndex, currentSlide]);

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

  // Auto slide loop
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

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

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const selectedPack = currentSlide.packOptions[selectedPackIndex] || currentSlide.packOptions[0];

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none flex flex-col">
      {/* Liquid Sliding Background Layers (Spans full viewport including behind Header) */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`bg-${currentSlide.id}`}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              opacity: 0,
              x: dir > 0 ? "8%" : "-8%",
              scale: 1.04,
            }),
            center: {
              opacity: 1,
              x: "0%",
              scale: 1,
            },
            exit: (dir: number) => ({
              opacity: 0,
              x: dir > 0 ? "-8%" : "8%",
              scale: 0.98,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.95, ease: FLUID_EASE }}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgGradient}`}
        />
      </AnimatePresence>

      {/* Ambient Radial Glow Lighting Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute top-[10%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-white/40 blur-[130px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-black/15 blur-[140px]" />
      </div>

      {/* Dynamic Header Component (Unpinned at natural top) */}
      <Header theme={currentSlide.themeKey} />

      {/* Main Hero Section */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center pt-2 pb-8 sm:pt-4 sm:pb-12 overflow-hidden">

        {/* Subtle Kinetic Background Typography (Atmospheric depth) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`kinetic-${currentSlide.id}`}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  opacity: 0,
                  x: dir > 0 ? 120 : -120,
                  scale: 0.95,
                }),
                center: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  x: dir > 0 ? -120 : 120,
                  scale: 1.05,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.95, ease: FLUID_EASE }}
              className="flex flex-col items-center justify-center w-full leading-[0.8] tracking-tighter text-center select-none"
            >
              <span
                className={`font-black uppercase tracking-tight ${currentSlide.kineticColor} text-[clamp(4rem,14vw,12rem)]`}
              >
                {currentSlide.kineticLine1}
              </span>
              <span
                className={`font-black uppercase tracking-tight ${currentSlide.kineticColor} text-[clamp(4rem,14vw,12rem)] mt-1 sm:mt-2`}
              >
                {currentSlide.kineticLine2}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Foreground Content Stage */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          
          {/* Top Category Switcher Tabs: Instantly explains the 3 product categories */}
          <div className="pure-categories-wrapper hidden md:flex items-center justify-center sm:justify-start gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1">
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider opacity-70 mr-1">
              Pure Categories:
            </span>
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx, idx > currentSlideIndex ? 1 : -1)}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? currentSlide.accentBtn + " shadow-md scale-105"
                      : "bg-white/50 hover:bg-white/80 border border-white/70 text-stone-800"
                  }`}
                >
                  <span>0{idx + 1}.</span>
                  <span>{slide.categoryName}</span>
                </button>
              );
            })}
          </div>

          {/* Grid Stage: Clear Value Proposition (Left) + Floating Cutout Product (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Clear Store Explanation & High-Converting Product Details */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${currentSlide.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.65, ease: FLUID_EASE }}
                  className={`${currentSlide.textColor}`}
                >
                  {/* Category & Brand Tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs">
                      Usman&apos;s Pure Products
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-black/10 border border-black/15">
                      {currentSlide.categoryTag}
                    </span>
                  </div>

                  {/* Clear Product Headline */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] mb-2">
                    {currentSlide.productName}
                  </h1>

                  {/* Subtitle / Key Differentiator */}
                  <p className="text-sm sm:text-base font-bold opacity-85 mb-3">
                    {currentSlide.productTagline}
                  </p>

                  {/* Clear Human-Friendly Description: Explains what it is & why it's healthy */}
                  <p className="text-xs sm:text-sm leading-relaxed opacity-80 max-w-xl mb-5">
                    {currentSlide.description}
                  </p>

                  {/* Trust Badges Row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentSlide.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/55 border border-white/80 shadow-2xs flex items-center gap-1"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>

                  {/* Pack Selector & Transparent Price Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 pt-3 border-t border-black/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold opacity-75">Select Pack:</span>
                      <div className="flex gap-1.5">
                        {currentSlide.packOptions.map((opt, idx) => (
                          <button
                            key={opt.size}
                            onClick={() => setSelectedPackIndex(idx)}
                            className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                              selectedPackIndex === idx
                                ? currentSlide.accentBtn + " shadow-sm"
                                : "bg-white/50 hover:bg-white/80 border border-white/70"
                            }`}
                          >
                            {opt.size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1.5 pl-2">
                      <span className="text-xs opacity-75 font-semibold">Price:</span>
                      <span className="text-2xl sm:text-3xl font-black tracking-tight">
                        {selectedPack.price}
                      </span>
                    </div>
                  </div>

                  {/* Primary Call to Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`cursor-pointer py-3.5 px-6 sm:px-8 rounded-2xl font-bold text-xs sm:text-sm tracking-wide shadow-lg transition duration-200 flex items-center justify-center gap-2.5 ${currentSlide.accentBtn}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Basket!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart ({selectedPack.price})</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setDetailsModalOpen(true)}
                      className="cursor-pointer py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm border border-white/80 bg-white/50 hover:bg-white/80 shadow-xs transition flex items-center gap-2"
                      title="View Lab Testing Reports & Sourcing"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Lab Specifications</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Floating Borderless Product Packaging Cutout */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={`product-${currentSlide.id}`}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      opacity: 0,
                      x: dir > 0 ? 120 : -120,
                      scale: 0.84,
                      rotate: dir > 0 ? 3 : -3,
                    }),
                    center: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      rotate: 0,
                    },
                    exit: (dir: number) => ({
                      opacity: 0,
                      x: dir > 0 ? -120 : 120,
                      scale: 0.84,
                      rotate: dir > 0 ? -3 : 3,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.9, ease: FLUID_EASE }}
                  className="relative cursor-pointer group flex items-center justify-center"
                >
                  {/* Gentle Floating Breathing Physics */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.8,
                      ease: "easeInOut",
                    }}
                    className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.32)] drop-shadow-[0_45px_65px_rgba(0,0,0,0.18)]"
                  >
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.productName}
                      fill
                      priority
                      sizes="(max-width: 640px) 260px, (max-width: 1024px) 380px, 480px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom Trust Ribbon */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold opacity-80">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-800" />
              <span>100% Certified Organic Farms</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-800" />
              <span>Traditional Cold Chakki Stone-Milling</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-800" />
              <span>Tested for Zero Chemicals & Zero Adulteration</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-stone-800" />
              <span>100% Purity Money-Back Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Purity & Lab Certificate Modal */}
      <AnimatePresence>
        {detailsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: FLUID_EASE }}
              className="w-full max-w-lg rounded-3xl bg-white border border-stone-200 p-6 sm:p-7 shadow-2xl text-stone-900"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">{currentSlide.productName}</h3>
                    <p className="text-xs text-stone-500 font-medium">Authenticity & Lab Specifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-700" /> Sourcing Origin
                  </div>
                  <p className="mt-1 text-stone-600 leading-relaxed">
                    {currentSlide.learnMoreDetails.origin}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-700" /> Traditional Crafting & Milling
                  </div>
                  <p className="mt-1 text-stone-600 leading-relaxed">
                    {currentSlide.learnMoreDetails.milling}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Lab Purity Verification
                  </div>
                  <p className="mt-1 text-stone-600 leading-relaxed">
                    {currentSlide.learnMoreDetails.labTested}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="font-bold text-stone-700 block mb-2">Recognized Accreditations:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentSlide.learnMoreDetails.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="cursor-pointer px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition"
                >
                  Close Specifications
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
