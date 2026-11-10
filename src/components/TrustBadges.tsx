import { Wheat, ShieldCheck, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface TrustBadgesProps {
  className?: string;
  wrapperClassName?: string;
}

export function TrustBadges({ className = "", wrapperClassName = "" }: TrustBadgesProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      {/* Neat 2x2 Grid on Mobile Devices, 4 Columns on Desktop */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-6 px-3 sm:px-4 md:px-6 mx-auto max-w-6xl ${className}`}
      >
        {/* Card 1: Freshly Milled Chakki Atta */}
        <div className="bg-[#F5F2EB]/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-[#EFEBE4] transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center mb-2.5 shadow-xs">
            <Wheat className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight leading-snug">
            Freshly Milled Chakki Atta
          </h4>
          <p className="text-[11px] sm:text-xs text-[#5E5852] font-medium mt-1 leading-relaxed">
            100% Traditional Stone Ground
          </p>
        </div>

        {/* Card 2: Zero Maida & Zero Chemicals */}
        <div className="bg-[#F5F2EB]/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-[#EFEBE4] transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center mb-2.5 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#145330]" strokeWidth={2} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight leading-snug">
            Zero Maida &amp; 0% Bleach
          </h4>
          <p className="text-[11px] sm:text-xs text-[#5E5852] font-medium mt-1 leading-relaxed">
            100% Whole Grains Bran Intact
          </p>
        </div>

        {/* Card 3: Cash on Delivery Available */}
        <div className="bg-[#F5F2EB]/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-[#EFEBE4] transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center mb-2.5 shadow-xs">
            <Truck className="w-5 h-5 text-[#4A3525]" strokeWidth={2} />
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight leading-snug">
            Cash on Delivery Available
          </h4>
          <p className="text-[11px] sm:text-xs text-[#5E5852] font-medium mt-1 leading-relaxed">
            Delivered to Doorstep Across Pakistan
          </p>
        </div>

        {/* Card 4: Direct WhatsApp Support */}
        <div className="bg-[#F5F2EB]/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:bg-[#EFEBE4] transition-all duration-200">
          <a
            href="https://wa.me/923129996658"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center mb-2.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
            aria-label="Direct WhatsApp Support"
          >
            <WhatsAppIcon className="w-5 h-5" variant="official" />
          </a>
          <h4 className="text-xs sm:text-sm font-bold text-[#2C2A29] tracking-tight leading-snug">
            Direct WhatsApp Support
          </h4>
          <p className="text-[11px] sm:text-xs text-[#5E5852] font-medium mt-1 leading-relaxed">
            +92 312 9996658
          </p>
        </div>
      </div>
    </div>
  );
}
