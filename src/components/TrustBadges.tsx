import { Wheat, ShieldCheck, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface TrustBadgesProps {
  className?: string;
  wrapperClassName?: string;
}

export function TrustBadges({ className = "", wrapperClassName = "" }: TrustBadgesProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6 px-3 sm:px-4 md:px-6 mx-auto max-w-6xl ${className}`}
      >
        {/* Card 1: Freshly Milled Chakki Atta */}
        <div className="text-center flex flex-col items-center justify-start h-full">
          <Wheat className="w-6 h-6 text-[#8C6D46] mb-2 shrink-0" strokeWidth={1.75} />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Freshly Milled Chakki Atta
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-1 leading-tight">
            Freshly Milled
          </p>
        </div>

        {/* Card 2: Zero Maida & Zero Chemicals */}
        <div className="text-center flex flex-col items-center justify-start h-full">
          <ShieldCheck className="w-6 h-6 text-[#1E5D38] mb-2 shrink-0" strokeWidth={1.75} />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Zero Maida &amp; 0% Bleach
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-1 leading-tight">
            100% Whole Grains Bran Intact
          </p>
        </div>

        {/* Card 3: Cash on Delivery Available */}
        <div className="text-center flex flex-col items-center justify-start h-full">
          <Truck className="w-6 h-6 text-[#54361C] mb-2 shrink-0" strokeWidth={1.75} />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Cash on Delivery Available
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-1 leading-tight">
            Delivered to Doorstep
          </p>
        </div>

        {/* Card 4: Direct WhatsApp Support */}
        <div className="text-center flex flex-col items-center justify-start h-full">
          <a
            href="https://wa.me/923129996658"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 shrink-0 transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="Direct WhatsApp Support"
          >
            <WhatsAppIcon className="w-6 h-6" variant="official" />
          </a>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Direct WhatsApp Support
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-1 leading-tight">
            +92 312 9996658
          </p>
        </div>
      </div>
    </div>
  );
}
