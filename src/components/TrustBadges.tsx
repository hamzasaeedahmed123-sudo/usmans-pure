"use client";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface TrustBadgesProps {
  className?: string;
  wrapperClassName?: string;
}

export function TrustBadges({ className = "", wrapperClassName = "" }: TrustBadgesProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EBE4D8] py-4 px-2 sm:py-5 sm:px-4 md:px-6 bg-white border border-[#EBE4D8] rounded-xl md:rounded-2xl mx-auto max-w-6xl shadow-xs gap-y-4 sm:gap-y-0 ${className}`}
      >
        {/* Card 1: 100% Khalis Chakki Atta */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8C6D46] to-[#54361C] text-[#FAF5EC] flex flex-col items-center justify-center shadow-xs border border-[#C5A059]/40 mb-2 shrink-0">
            <span className="text-[12px] font-black leading-none font-serif">100%</span>
            <span className="text-[7px] font-bold uppercase tracking-tighter text-[#E5D2BA] mt-0.5">CHAKKI</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            100% Khalis Chakki Atta
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Freshly Stone-Ground Daily
          </p>
        </div>

        {/* Card 2: Zero Maida & Zero Chemicals */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1E5D38] to-[#0E381C] text-[#D4F0DF] flex flex-col items-center justify-center shadow-xs border border-[#48A36C]/40 mb-2 shrink-0">
            <span className="text-[12px] font-black leading-none font-serif">0%</span>
            <span className="text-[7px] font-bold uppercase tracking-tighter text-[#A3D2B7] mt-0.5">MAIDA</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Zero Maida &amp; 0% Bleach
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            100% Whole Grains Bran Intact
          </p>
        </div>

        {/* Card 3: Cash on Delivery Available */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2D241E] to-[#18110D] text-[#E5D2BA] flex flex-col items-center justify-center shadow-xs border border-[#8C6D46]/40 mb-2 shrink-0">
            <span className="text-[11px] font-black leading-none font-sans tracking-tight">COD</span>
            <span className="text-[7px] font-bold uppercase tracking-tighter text-[#C2A37E] mt-0.5">PAKISTAN</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Cash on Delivery Available
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Delivered to Doorstep
          </p>
        </div>

        {/* Card 4: Direct WhatsApp Support */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <a
            href="https://wa.me/923008472910"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 mb-2 shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer drop-shadow-sm flex items-center justify-center"
            aria-label="Direct WhatsApp Ordering"
          >
            <WhatsAppIcon className="w-11 h-11" variant="official" />
          </a>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Direct WhatsApp Support
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            +92 300 8472910
          </p>
        </div>
      </div>
    </div>
  );
}
