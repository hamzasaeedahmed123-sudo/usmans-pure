import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Wheat } from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";

export function DoctorsChoiceBanner() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#18281E] text-[#F9F6F0] overflow-hidden">
      {/* Botanical Watermark Accents */}
      <BotanicalWatermark
        type="wheat"
        className="absolute top-0 -left-12 w-[420px] h-[420px] pointer-events-none -z-0"
        opacity={0.12}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute -bottom-10 -right-12 w-[460px] h-[460px] pointer-events-none -z-0"
        opacity={0.14}
        size={460}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Left Text Block */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 text-[#E5B869] text-[11px] font-semibold uppercase tracking-[0.18em] mb-5">
              <Wheat className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Dietary Care &bull; Whole Grain Nutrition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif !text-[#FAF7F0] leading-[1.12]">
              Looking for Diabetic-Friendly &amp; Weight-Care Flours?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#D5CEBF] font-light leading-relaxed">
              Explore traditional stone-ground multigrain blends rich in natural fiber, complex carbohydrates, and wholesome ancient grains that keep you satisfied longer.
            </p>

            {/* Quick Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#E8DFD0]">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[#E5B869]" strokeWidth={2} />
                Stone-Ground Chakki
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
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3.5 shrink-0">
            <Link
              href="/doctors-choice"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-[#E5B869] hover:bg-[#F2C97C] text-[#18281E] text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center group"
            >
              <span>Explore Dietary Care Range</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>

            <a
              href="https://wa.me/923008472910?text=Hello%2C%20I%20would%20like%20guidance%20regarding%20diabetic%20and%20diet%20flours."
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
