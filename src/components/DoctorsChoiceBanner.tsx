import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Wheat, Sparkles } from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";

const MARQUEE_PILLS = [
  { label: "Our Story", href: "/about" },
  { label: "Pure Process", href: "/flour" },
  { label: "Zero Chemicals", href: "/doctors-choice" },
  { label: "Cold Stone Milled", href: "/flour" },
  { label: "Doctor Recommended", href: "/doctors-choice" },
  { label: "100% Whole Grain", href: "/flour" },
  { label: "Diabetic-Friendly", href: "/doctors-choice" },
  { label: "Zero Preservatives", href: "/products" },
  { label: "Organic Herbal Teas", href: "/herbals" },
  { label: "Nationwide COD", href: "/checkout" },
];

export function DoctorsChoiceBanner() {
  return (
    <section className="relative bg-[#18281E] text-[#F9F6F0] overflow-hidden pb-16 sm:pb-24">
      {/* 1. Animated Wavy Divider exactly at top boundary where white meets dark green */}
      <div
        className="w-full overflow-hidden leading-none relative pointer-events-none select-none -mt-px"
        aria-hidden="true"
      >
        <div className="relative w-full h-10 sm:h-16 md:h-20 overflow-hidden">
          {/* Depth Wave Layer (Subtle secondary translucent liquid flow at 22s) */}
          <div className="absolute inset-0 w-[200%] min-w-[200%] h-full flex animate-flowing-wave-slow opacity-30">
            <svg
              className="w-1/2 h-full shrink-0"
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FAF9F5"
                d="M 0,0 L 0,25 C 90,45 270,5 360,25 C 450,45 630,5 720,25 C 810,45 990,5 1080,25 C 1170,45 1350,5 1440,25 L 1440,0 Z"
              />
            </svg>
            <svg
              className="w-1/2 h-full shrink-0"
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FAF9F5"
                d="M 0,0 L 0,25 C 90,45 270,5 360,25 C 450,45 630,5 720,25 C 810,45 990,5 1080,25 C 1170,45 1350,5 1440,25 L 1440,0 Z"
              />
            </svg>
          </div>

          {/* Primary Front Wave Layer (Continuous flowing liquid wave at 14s) */}
          <div className="absolute inset-0 w-[200%] min-w-[200%] h-full flex animate-flowing-wave">
            <svg
              className="w-1/2 h-full shrink-0"
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FAF9F5"
                d="M 0,0 L 0,35 C 90,5 270,65 360,35 C 450,5 630,65 720,35 C 810,5 990,65 1080,35 C 1170,5 1350,65 1440,35 L 1440,0 Z"
              />
            </svg>
            <svg
              className="w-1/2 h-full shrink-0"
              viewBox="0 0 1440 70"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FAF9F5"
                d="M 0,0 L 0,35 C 90,5 270,65 360,35 C 450,5 630,65 720,35 C 810,5 990,65 1080,35 C 1170,5 1350,65 1440,35 L 1440,0 Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Continuous Scrolling Pill Buttons (Infinite Marquee sliding right-to-left) */}
      <div className="relative w-full overflow-hidden py-4 sm:py-5 z-10 border-b border-emerald-900/40 mb-10 sm:mb-14">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-[#18281E] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-[#18281E] to-transparent z-10" />

        <div className="flex w-max gap-3 sm:gap-4 animate-marquee hover:[animation-play-state:paused] will-change-transform no-scrollbar">
          {/* First set of pill buttons */}
          {MARQUEE_PILLS.map((pill, idx) => (
            <Link
              key={`pill-1-${idx}`}
              href={pill.href}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap bg-[#24422E]/80 hover:bg-[#2F573C] text-[#A7F3D0] hover:text-white border border-[#34D399]/35 hover:border-[#6EE7B7]/80 shadow-xs transition-all active:scale-95 duration-200 cursor-pointer backdrop-blur-xs group"
            >
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse shrink-0 group-hover:scale-125 transition-transform" />
              <span>{pill.label}</span>
            </Link>
          ))}

          {/* Duplicate set for seamless continuous marquee loop */}
          {MARQUEE_PILLS.map((pill, idx) => (
            <Link
              key={`pill-2-${idx}`}
              href={pill.href}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap bg-[#24422E]/80 hover:bg-[#2F573C] text-[#A7F3D0] hover:text-white border border-[#34D399]/35 hover:border-[#6EE7B7]/80 shadow-xs transition-all active:scale-95 duration-200 cursor-pointer backdrop-blur-xs group"
            >
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse shrink-0 group-hover:scale-125 transition-transform" />
              <span>{pill.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Botanical Watermark Accents */}
      <BotanicalWatermark
        type="wheat"
        className="absolute top-20 -left-12 w-[420px] h-[420px] pointer-events-none -z-0"
        opacity={0.1}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute -bottom-10 -right-12 w-[460px] h-[460px] pointer-events-none -z-0"
        opacity={0.12}
        size={460}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10">
          {/* Left Text Block */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 text-[#E5B869] text-[11px] font-semibold uppercase tracking-[0.18em] mb-4">
              <Wheat className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Dietary Care &bull; Whole Grain Nutrition</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif !text-[#FAF7F0] leading-snug">
              Looking for Diabetic-Friendly &amp; Weight-Care Flours?
            </h2>

            <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-[#D5CEBF] font-light leading-relaxed">
              Explore FRESHLY MILLED multigrain blends rich in natural fiber, complex carbohydrates, and wholesome ancient grains that keep you satisfied longer.
            </p>

            {/* Quick Trust Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#E8DFD0]">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[#E5B869]" strokeWidth={2} />
                Pure Chakki Milling
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5B869]" strokeWidth={2} />
                High Dietary Fiber
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <Wheat className="w-4 h-4 text-[#E5B869]" strokeWidth={2} />
                Zero Maida &amp; Fillers
              </span>
            </div>
          </div>

          {/* Right CTA Action Area */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3.5 shrink-0 w-full lg:w-auto">
            <Link
              href="/doctors-choice"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#E5B869] hover:bg-[#F2C97C] text-[#18281E] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center group"
            >
              <span>Explore Dietary Care Range</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>

            <a
              href="https://wa.me/923129996658?text=Hello%2C%20I%20would%20like%20guidance%20regarding%20diabetic%20and%20diet%20flours."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#D5CEBF] hover:text-[#E5B869] underline underline-offset-4 decoration-[#E5B869]/40 transition-colors"
            >
              Have flour questions? Ask us on WhatsApp &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
