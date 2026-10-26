"use client";

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
            className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xs mb-2 shrink-0 transition-transform active:scale-95 cursor-pointer"
            aria-label="Direct WhatsApp Ordering"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41c-1.42 0-2.8-.37-4.03-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.25-4.49c0-4.54 3.7-8.24 8.24-8.24zm4.84 11.64c-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.59.13-.18.26-.68.85-.83 1.03-.15.18-.31.2-.57.07-.26-.13-1.1-.41-2.09-1.3-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.59-1.43-.81-1.96-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.3 1.02 2.55 1.16 2.74.15.18 2 3.05 4.84 4.28.68.29 1.21.46 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31z" />
            </svg>
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
