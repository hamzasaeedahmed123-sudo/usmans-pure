import { Wheat, ShieldCheck, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface TrustBadgesProps {
  className?: string;
  wrapperClassName?: string;
}

export function TrustBadges({ className = "", wrapperClassName = "" }: TrustBadgesProps) {
  return (
    <div className={`w-full bg-[#FAF9F5] ${wrapperClassName}`}>
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-6 px-3 sm:px-6 mx-auto max-w-6xl ${className}`}
      >
        {/* Card 1: Freshly Milled Chakki Atta */}
        <div className="text-center flex flex-col items-center justify-start p-4 sm:p-5 rounded-2xl bg-[#F2EDE4]/60 border border-stone-200/60 transition-all hover:bg-[#F2EDE4]/90">
          <div className="w-10 h-10 rounded-full bg-[#8B3A22]/10 flex items-center justify-center mb-2.5 shrink-0">
            <Wheat className="w-5 h-5 text-[#8B3A22]" strokeWidth={1.75} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight text-center leading-tight">
            Freshly Milled Chakki Atta
          </h4>
          <p className="text-[11px] sm:text-xs text-[#6B5D52] font-medium text-center mt-1 leading-snug">
            Cold Milled Below 40°C
          </p>
        </div>

        {/* Card 2: Zero Maida & Zero Chemicals */}
        <div className="text-center flex flex-col items-center justify-start p-4 sm:p-5 rounded-2xl bg-[#F2EDE4]/60 border border-stone-200/60 transition-all hover:bg-[#F2EDE4]/90">
          <div className="w-10 h-10 rounded-full bg-[#1E3A2F]/10 flex items-center justify-center mb-2.5 shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#1E3A2F]" strokeWidth={1.75} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight text-center leading-tight">
            Zero Maida &amp; 0% Bleach
          </h4>
          <p className="text-[11px] sm:text-xs text-[#6B5D52] font-medium text-center mt-1 leading-snug">
            100% Whole Grains Bran Intact
          </p>
        </div>

        {/* Card 3: Cash on Delivery Available */}
        <div className="text-center flex flex-col items-center justify-start p-4 sm:p-5 rounded-2xl bg-[#F2EDE4]/60 border border-stone-200/60 transition-all hover:bg-[#F2EDE4]/90">
          <div className="w-10 h-10 rounded-full bg-[#3E2B1D]/10 flex items-center justify-center mb-2.5 shrink-0">
            <Truck className="w-5 h-5 text-[#3E2B1D]" strokeWidth={1.75} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight text-center leading-tight">
            Doorstep Cash on Delivery
          </h4>
          <p className="text-[11px] sm:text-xs text-[#6B5D52] font-medium text-center mt-1 leading-snug">
            Direct Across All Pakistan
          </p>
        </div>

        {/* Card 4: Direct WhatsApp Support */}
        <div className="text-center flex flex-col items-center justify-start p-4 sm:p-5 rounded-2xl bg-[#F2EDE4]/60 border border-stone-200/60 transition-all hover:bg-[#F2EDE4]/90">
          <a
            href="https://wa.me/923129996658"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center mb-2.5 shrink-0 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Direct WhatsApp Support"
          >
            <WhatsAppIcon className="w-5 h-5" variant="official" />
          </a>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight text-center leading-tight">
            Direct WhatsApp Support
          </h4>
          <p className="text-[11px] sm:text-xs text-[#6B5D52] font-medium text-center mt-1 leading-snug">
            +92 312 9996658
          </p>
        </div>
      </div>
    </div>
  );
}
