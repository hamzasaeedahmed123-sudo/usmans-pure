import { CheckCircle2, Truck, Wheat, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function DietConsultationBanner() {
  return (
    <section className="py-12 sm:py-20 bg-emerald-950 text-white relative overflow-hidden border-b border-emerald-900">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 sm:mb-2">
              Chakki Fresh Quality
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight !text-white leading-tight">
              Fresh Atta &amp; Grain Inquiries
            </h2>

            <p className="mt-2.5 sm:mt-4 text-emerald-100/90 text-xs sm:text-base leading-relaxed">
              Looking for specific wheat, diabetic-friendly multigrain flour, or custom orders? Message us directly on WhatsApp.
            </p>

            {/* Checklist */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[
                "90% whole wheat with zero maida or preservatives",
                "Custom multigrain blends for diet and sugar management",
                "Freshly ground on your order for maximum taste and fiber",
                "Fast home delivery with Cash on Delivery",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA Button */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/923008472910?text=Hi%20Usman's%20Pure,%20I%20would%20like%20to%20order%20fresh%20stone-ground%20flour%20and%20pure%20spices."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-ambient shadow-amber-400/20 active:scale-98"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" variant="monochrome" />
                <span>Order or Ask on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-300 font-medium">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Freshly Ground &bull; Cash on Delivery Nationwide</span>
              </div>
            </div>
          </div>

          {/* Right Image/Card Preview (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-emerald-900/50 border border-emerald-800/80 p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-ambient">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-5 border-b border-emerald-800/60">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-ambient shrink-0">
                  <Wheat className="w-6 h-6 text-stone-950" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">From Our Chakki To Your Kitchen</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-300">Traditional Chakki Process</p>
                </div>
              </div>

              {/* Horizontal Snap Slider on Mobile / Stacked on Tablet & Desktop */}
              <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-3 pb-2 no-scrollbar md:flex-col md:space-y-3.5 md:overflow-visible">
                <div className="min-w-[78%] sm:min-w-[260px] md:min-w-0 snap-center p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                      <Wheat className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </span>
                    <h5 className="text-xs font-bold text-white">Choose Your Flour &amp; Spices</h5>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 mt-1 pl-8 leading-relaxed">
                    Pick your regular atta, multigrain blend, or spices.
                  </p>
                </div>

                <div className="min-w-[78%] sm:min-w-[260px] md:min-w-0 snap-center p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </span>
                    <h5 className="text-xs font-bold text-white">Fresh Stone Grinding</h5>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 mt-1 pl-8 leading-relaxed">
                    We grind pure grains slowly to keep all natural bran and nutrients.
                  </p>
                </div>

                <div className="min-w-[78%] sm:min-w-[260px] md:min-w-0 snap-center p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                      <Truck className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </span>
                    <h5 className="text-xs font-bold text-white">Direct Delivery</h5>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 mt-1 pl-8 leading-relaxed">
                    Packed clean and delivered straight to your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
