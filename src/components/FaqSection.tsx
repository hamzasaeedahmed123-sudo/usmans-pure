"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, Wheat, CheckCircle2 } from "lucide-react";
import { FAQS_DATA } from "@/data/faqs";

export function FaqSection() {
  // Keep first question open by default for immediate preview
  const [openIds, setOpenIds] = useState<Record<number, boolean>>({ 1: true, 6: true });

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Display top 8 representative questions on the home page across all categories
  const featuredFaqs = FAQS_DATA.slice(0, 8);

  return (
    <section
      id="faqs"
      className="scroll-mt-24 py-16 sm:py-20 bg-[#FAF7F2] border-t border-b border-[#1E1510]/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B3A22]/10 border border-[#8B3A22]/20 text-[#8B3A22] text-[11px] font-semibold uppercase tracking-[0.18em] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Sawaal Jawab &bull; Verified Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1510] font-bold tracking-tight">
            Frequently Asked <em className="italic font-normal text-[#8B3A22]">Questions</em>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Real answers about our traditional stone chakki milling, zero maida guarantee, diabetic care flours, and nationwide home delivery.
          </p>
        </div>

        {/* 2-Column Balanced Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 items-start">
          {featuredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-stone-200/80 shadow-2xs overflow-hidden transition-all duration-200 hover:border-stone-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left py-3.5 px-4 sm:px-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-stone-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 flex-1 pr-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B3A22]">
                      {faq.categoryLabel}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base text-[#1E1510] leading-snug font-semibold">
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border border-stone-200 mt-0.5 ${
                      isOpen
                        ? "rotate-180 bg-[#1E3A2F] text-white border-[#1E3A2F]"
                        : "bg-[#FAF7F2] text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-stone-100 text-stone-600 text-xs sm:text-sm leading-relaxed bg-[#FAF7F2]/30 animate-in fade-in duration-200 font-sans">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Link to Full FAQ Knowledge Base */}
        <div className="mt-10 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152a22] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
          >
            <span>View All 20 Verified Questions &amp; Answers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://wa.me/923008472910?text=Salam%20Usman's%20Pure,%20I%20have%20a%20question%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold transition"
          >
            <span>Ask a Question on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
