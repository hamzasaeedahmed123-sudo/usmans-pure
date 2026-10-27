"use client";

import Image from "next/image";
import { Check, X, Wheat } from "lucide-react";

export function ChakkiProcessStory() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
            Traditional Milling Science
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Why Cold Stone-Chakki Milling Matters
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Not all flour is created equal. Learn why modern commercial mills ruin flour nutrition, and how our low-speed stone chakki restores real food vitality.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Usman's Pure Stone Chakki */}
          <div className="rounded-sm bg-white border-2 border-emerald-600/40 p-6 sm:p-8 shadow-ambient relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
              <div>
                <span className="tag-quiet">
                  Our Method
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 mt-2">
                  Usman&apos;s Cold Stone Chakki
                </h3>
              </div>
              <div className="w-12 h-12 rounded-sm bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Wheat className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Cold Temperature (<40°C)",
                  desc: "Slow stone rotation ensures heat never denatures vital wheat proteins or burns living enzymes.",
                },
                {
                  title: "90% Whole Grain (Germ & Bran Intact)",
                  desc: "Natural grain oils, vitamin E, and essential dietary fiber remain completely intact in every roti.",
                },
                {
                  title: "Zero Chemical Bleach & Zero Preservatives",
                  desc: "Pure natural color, honest grain aroma, and completely free of benzoyl peroxide or potassium bromate.",
                },
                {
                  title: "High Satiety & Low Glycemic Impact",
                  desc: "Digests slowly, keeping your family full for hours without rapid glucose spikes.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-900">{item.title}</h4>
                    <p className="text-[14px] text-stone-700 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial Industrial Mills */}
          <div className="rounded-sm bg-stone-100/80 p-6 sm:p-8 shadow-sm relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                  Commercial Factories
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-700 mt-2">
                  High-Speed Roller Mills
                </h3>
              </div>
              <div className="w-12 h-12 rounded-sm bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <X className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Scorching High Heat (80°C - 95°C)",
                  desc: "High-speed steel rollers cook the grain during friction, destroying heat-sensitive vitamins and antioxidants.",
                },
                {
                  title: "Germ & Bran Stripped Away",
                  desc: "Valuable germ and bran are stripped off to sell separately as bran animal feed or oil.",
                },
                {
                  title: "Chemical Bleaching & Anti-Caking Agents",
                  desc: "Industrial additives and chalk powders added to make flour appear artificially white and extend warehouse shelf life.",
                },
                {
                  title: "Rapid Blood Sugar Spikes & Fatigue",
                  desc: "Acts almost like pure starch in the bloodstream, triggering insulin surges and persistent hunger.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-800">{item.title}</h4>
                    <p className="text-[14px] text-stone-700 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
