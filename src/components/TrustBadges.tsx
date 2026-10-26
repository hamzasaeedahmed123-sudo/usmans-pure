"use client";

import { Wheat, BadgeCheck, Truck, MessageCircle } from "lucide-react";

interface TrustBadgesProps {
  className?: string;
  wrapperClassName?: string;
}

export function TrustBadges({ className = "", wrapperClassName = "" }: TrustBadgesProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EBE4D8]/80 py-4 px-2 sm:py-5 sm:px-4 md:px-6 bg-white/95 border border-[#EBE4D8] rounded-xl md:rounded-2xl mx-auto max-w-6xl shadow-2xs gap-y-4 sm:gap-y-0 ${className}`}
      >
        {/* Card 1: 100% Khalis Chakki Atta */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5EFE6] border border-[#E5DACB] text-[#7A4E2D] flex items-center justify-center mb-2 shadow-2xs shrink-0">
            <Wheat className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            100% Khalis Chakki Atta
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Freshly Stone-Ground
          </p>
        </div>

        {/* Card 2: Zero Maida & Zero Chemicals */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EBF5EF] border border-[#CDE5D6] text-[#1E6B3A] flex items-center justify-center mb-2 shadow-2xs shrink-0">
            <BadgeCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Zero Maida &amp; Zero Chemicals
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            100% Whole Grains
          </p>
        </div>

        {/* Card 3: Cash on Delivery Available */}
        <div className="px-2 sm:px-3 text-center flex flex-col items-center justify-start h-full pt-1 sm:pt-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F7F4EE] border border-[#E8E2D6] text-[#8C6D46] flex items-center justify-center mb-2 shadow-2xs shrink-0">
            <Truck className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
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
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E8F5EB] border border-[#CCE8D2] text-[#127038] flex items-center justify-center mb-2 shadow-2xs shrink-0">
            <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Direct WhatsApp Support
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Quick Orders &amp; Help
          </p>
        </div>
      </div>
    </div>
  );
}
