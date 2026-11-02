"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  ChevronRight,
  ChevronDown,
  Search,
  HelpCircle,
  ShieldCheck,
  Truck,
  ArrowRight,
  Wheat,
  CheckCircle2,
} from "lucide-react";

import { FAQS_DATA, FaqItem } from "@/data/faqs";

type CategoryFilter = "all" | "flours" | "clinical" | "teas" | "sourcing" | "orders";

export function FaqsPageView() {
  const [faqs, setFaqs] = useState<FaqItem[]>(FAQS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(data.faqs);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(
    () => [
      { key: "all" as const, label: "All Questions", count: faqs.length },
      { key: "flours" as const, label: "Flours & Grains", count: faqs.filter((f) => f.category === "flours").length },
      { key: "clinical" as const, label: "Clinical Wellness", count: faqs.filter((f) => f.category === "clinical").length },
      { key: "teas" as const, label: "Herbal Teas", count: faqs.filter((f) => f.category === "teas").length },
      { key: "sourcing" as const, label: "Sourcing & Purity", count: faqs.filter((f) => f.category === "sourcing").length },
      { key: "orders" as const, label: "Orders & Delivery", count: faqs.filter((f) => f.category === "orders").length },
    ],
    [faqs]
  );

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {};
    faqs.forEach((faq) => {
      allOpen[faq.id] = true;
    });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query) ||
        faq.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1510] flex flex-col justify-between selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[#6B5D52]">
            <Link href="/" className="hover:text-[#8B3A22] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-[#1E1510]">Frequently Asked Questions</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Main FAQ Section Wrapper with Natural Wheat Field Background & Semi-Transparent Readability Overlay */}
        <div
          className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{ backgroundImage: "url('/images/backgrounds/wheat-field-backplate.jpg')" }}
        >
          {/* Semi-transparent Organic Overlay for pristine readability and high-end feel */}
          <div className="w-full bg-[#FAF9F5]/88 backdrop-blur-sm">
            {/* Hero Header Area */}
            <section className="relative py-14 sm:py-20 border-b border-stone-200/60 overflow-hidden">
              <BotanicalWatermark
                type="wheat"
                className="absolute top-0 -left-10 w-[380px] h-[380px] pointer-events-none -z-0"
                opacity={0.15}
                size={380}
              />
              <BotanicalWatermark
                type="herbal"
                className="absolute -bottom-10 -right-10 w-[420px] h-[420px] pointer-events-none -z-0"
                opacity={0.16}
                size={420}
              />

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18281E] text-[#E5B869] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
                  <HelpCircle className="w-3.5 h-3.5" />
                  HELP &amp; KNOWLEDGE BASE
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1510] tracking-tight leading-tight">
                  Frequently Asked Questions
                </h1>

                <p className="mt-4 text-base sm:text-lg text-stone-700 max-w-2xl mx-auto font-light leading-relaxed">
                  Everything you need to know about our cold chakki milling, diabetic &amp; diet flours, herbal teas, and door-to-door delivery.
                </p>

                {/* Live Search Input */}
                <div className="mt-8 max-w-xl mx-auto relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by keyword (e.g., chakki mill, diabetes, delivery, maida)..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/90 border border-stone-300/80 text-sm text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden focus:border-[#8B3A22] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700 p-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Content Section with Category Tabs & Accordion */}
            <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Quick Filter Category Tabs */}
              <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedCategory === cat.key
                          ? "bg-[#1E1510] text-[#FAF7F2]"
                          : "bg-[#F5F2EB]/90 text-stone-700 hover:bg-[#FAF9F5] border border-stone-300/60"
                      }`}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  ))}
                </div>

                {/* Quick Expand/Collapse toggles */}
                <div className="flex items-center gap-3 text-xs text-[#8B3A22] font-semibold">
                  <button
                    onClick={expandAll}
                    className="hover:underline cursor-pointer"
                  >
                    Expand All
                  </button>
                  <span className="text-stone-300">•</span>
                  <button
                    onClick={collapseAll}
                    className="hover:underline cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Results count label */}
              <div className="text-xs text-stone-600 mb-6 flex items-center justify-between">
                <span>
                  Showing <strong>{filteredFaqs.length}</strong> of 20 verified questions
                </span>
                {searchQuery && (
                  <span>
                    Matching keyword: &ldquo;<strong>{searchQuery}</strong>&rdquo;
                  </span>
                )}
              </div>

              {/* Accordion List - Container-Free Flat 2-Column Balanced Grid */}
              {filteredFaqs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 items-start max-w-6xl mx-auto w-full">
                  {filteredFaqs.map((faq) => {
                    const isOpen = !!openIds[faq.id];
                    return (
                      <article
                        key={faq.id}
                        className="border-b border-stone-300/70 pb-5 transition-colors"
                      >
                        <button
                          onClick={() => toggleAccordion(faq.id)}
                          className="w-full text-left py-1 text-sm sm:text-base font-medium flex items-start justify-between gap-3 cursor-pointer focus:outline-hidden hover:text-[#8B3A22] transition-colors"
                          aria-expanded={isOpen}
                        >
                          <div className="space-y-1 flex-1 pr-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B3A22]">
                              {faq.categoryLabel} &bull; Q{faq.id}
                            </span>
                            <h3 className="font-serif text-sm sm:text-base text-[#1E1510] leading-snug font-bold">
                              {faq.q}
                            </h3>
                          </div>

                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 mt-0.5 ${
                              isOpen
                                ? "rotate-180 bg-[#1E1510] text-white"
                                : "bg-stone-200/60 text-stone-700 hover:text-stone-900"
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </button>

                        {/* Smooth Accordion Body - Sits flat directly on overlay */}
                        {isOpen && (
                          <div className="pt-2 text-stone-700 text-xs sm:text-sm leading-relaxed animate-fade-in">
                            <p>{faq.a}</p>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl bg-[#F5F2EB]/90 border border-stone-200 p-8">
                  <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    No matching questions found
                  </h3>
                  <p className="text-sm text-stone-600 mt-1 max-w-sm mx-auto">
                    Try searching with a different term, or chat directly with our nutritionists on WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-4 px-5 py-2.5 rounded-full bg-[#1E1510] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Bottom WhatsApp / Direct Assistance Action Box */}
              <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#F5F2EB]/90 border border-stone-300/60 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="max-w-xl">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-1">
                    Still Have Questions?
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1510]">
                    Chat Directly with Our Team on WhatsApp
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#5A4E45] leading-relaxed">
                    Have specific flour inquiries or custom order requirements? Our team responds within minutes to help you select the exact blend for your family.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                  <a
                    href="https://wa.me/923129996658?text=Hello%20Usman%27s%20Pure%2C%20I%20have%20a%20question%20regarding%20your%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-stone-200/40 border border-stone-300/80 text-[#1E1510] text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                  >
                    <span>Contact Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
