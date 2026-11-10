"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  BadgeCheck,
  ChevronRight,
  Wheat,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function FlagshipFeaturedProduct() {
  return (
    <section
      id="flagship-product"
      className="relative w-full overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* ================= COLUMN 1: FAMILY DINNER TABLE VISUAL (LEFT) ================= */}
        <div className="lg:col-span-6 flex items-center justify-center relative border-none shadow-none p-0 m-0">
          <div className="relative w-full flex items-center justify-center border-none shadow-none p-0 m-0">
            {/* Authentic Heritage Trust Seal Stamp */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-6 z-20 pointer-events-none select-none -rotate-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1E3A2F] text-[#F3E3DA] p-1.5 shadow-md border-2 border-dashed border-[#D4A373]/70 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite]">
                  <path
                    id="sealPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-bold uppercase tracking-[0.2em] fill-[#D4A373]">
                    <textPath href="#sealPath" startOffset="0%">
                      • ASLI &amp; KHALIS • TAAZA CHAKKI ATTA • ZERO MAIDA
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A373]" strokeWidth={2} />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white mt-0.5">
                    KHALIS
                  </span>
                </div>
              </div>
            </div>

            {/* Wholesome Family Dinner Table Visual with Grandmother, Parents & Children */}
            <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                src="/images/products/family-dinner-table.jpg"
                alt="Happy Pakistani family enjoying wholesome dinner with Usman's Pure Chakki Atta"
                width={1200}
                height={896}
                priority
                quality={90}
                className="w-full h-auto object-cover max-h-[480px] md:max-h-[560px] select-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
              />
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: AUTHENTIC FAMILY STORY & BENEFITS (RIGHT) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          
          {/* Brand Heritage Tagline */}
          <span className="text-xs font-bold text-[#8B3A22] uppercase tracking-wider mb-2 block font-sans">
            ⭐ Har Ammi Ki Pehli Pasand &bull; Asli Chakki Atta
          </span>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E3A2F] tracking-tight leading-[1.25] mb-3">
            Kash Rozana Ki Roti Sirf Pait Na Bhare, Balke Poore Ghar Ki Sehat Bhi Banaye
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
            Khalis aur asli qudrati anaj bina kisi chemical bleaching ke aur bina kisi maiday ke. Buzurgo ki sugar ka khayal, bacchon ki taaqat aur ghar ke dastarkhwan ke liye Ammi ke haath ki narm phulka roti jo har niwala sehatmand banaye.
          </p>

          {/* 3 Natural Desi Family Points */}
          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <Wheat className="w-4 h-4 text-[#8B3A22] shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <strong className="text-stone-900 font-bold">Ammi Abbu Aur Buzurgo Ke Liye:</strong>{" "}
                Low GI anaj jo sugar aur pait ke bhari-pan ko control mein rakhe.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#8B3A22] shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <strong className="text-stone-900 font-bold">Bacchon Ki Sehat Aur Taaqat:</strong>{" "}
                Sabut anaj ka qudrati iron aur calcium jo bacchon ki sehat aur haddiyon ki taaqat ke liye zaroori hai.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#8B3A22] shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <strong className="text-stone-900 font-bold">Ghar Ki Tasalli:</strong>{" "}
                100% khalis aur taaza pisa hua, bina kisi maiday ke khalis chakki atta aur narm phulka roti.
              </p>
            </div>
          </div>

          {/* 8 Traditional Grains Single Elegant Sentence */}
          <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
            <span className="font-semibold text-stone-800">8 Khalis Anaj:</span>{" "}
            Gandum, Jau, Jowar, Bajra, Kala Chana, Oats, Alsi (Flaxseeds) aur Methi Dana.
          </p>

          {/* Action CTAs & Trust Badges */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="#featured-products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2C2A29] hover:bg-[#4A3525] active:scale-95 text-[#FAF9F5] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>Explore Fresh Chakki Flours</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                <span>Nationwide COD</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Khalis</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
