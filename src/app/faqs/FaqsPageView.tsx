"use client";

import { useState, useMemo } from "react";
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

interface FaqItem {
  id: number;
  category: "flours" | "clinical" | "spices" | "sourcing" | "orders";
  categoryLabel: string;
  q: string;
  a: string;
}

const FAQS_DATA: FaqItem[] = [
  // Category: Stone Chakki & Flours
  {
    id: 1,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "How does your traditional stone chakki differ from commercial roller flour mills?",
    a: "Commercial roller mills operate at high speeds (>90°C), burning away delicate wheat germ oils, bran fiber, and vital micronutrients. Our traditional heavy stone chakkis rotate slowly at strictly under 40°C, preserving 100% live enzymes, vitamin E, and natural dietary fiber.",
  },
  {
    id: 2,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "Do you mix maida (white refined flour) or bran fillers in your chakki atta?",
    a: "Absolutely zero. We guarantee 100% pure whole wheat. No maida, no bran stripping, and no chemical bleaching agents like benzoyl peroxide or chlorine dioxide.",
  },
  {
    id: 3,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "How long does freshly stone-ground chakki flour stay fresh?",
    a: "Because our flour contains live wheat germ with natural, cold-preserved oils and zero synthetic preservatives, we recommend consuming it within 30 to 45 days. Store in a cool, dry place in an airtight container.",
  },
  {
    id: 4,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "Why are rotis made with your whole grain flour slightly darker in color?",
    a: "Commercial flour uses chemical bleaching to look artificially white. Natural unbleached stone-ground wheat retains the dark outer bran and germ layers, resulting in a healthy, rich golden-brown wholesome roti with superior aroma.",
  },
  {
    id: 5,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "Is your flour easy to knead and roll into soft rotis?",
    a: "Yes. Because of the fine stone-grinding process, simply knead with lukewarm water, let the dough rest for 10–15 minutes, and your rotis will remain remarkably soft, pliable, and puffy throughout the day.",
  },

  // Category: Clinical Wellness & Doctor's Choice
  {
    id: 6,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "Can non-diabetic family members safely eat FENUGREEK Plus flour?",
    a: "Yes, absolutely. FENUGREEK Plus is a wholesome multi-grain flour infused with organic methi seeds and soluble galactomannan fiber. It supports healthy digestion and prevents sluggish sugar crashes in anyone, making it a great daily staple for the entire family.",
  },
  {
    id: 7,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "How does Fat2Fuel Multigrain Flour help with weight management?",
    a: "It blends roasted barley, whole oats, chickpeas, flaxseed, and chia seeds. With a very low glycemic index (<50) and 18g dietary fiber per 100g, it blunts insulin spikes and prolongs feelings of fullness for over 5 hours, curbing unnecessary cravings naturally.",
  },
  {
    id: 8,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "How quickly can I expect results with Fat2Fuel or Diabetic flours?",
    a: "Many customers notice lighter digestion and reduced post-meal lethargy within 3 to 5 days. For blood sugar stabilization (lower post-prandial spikes) and metabolic weight shifts, consistent use for 2 to 3 weeks yields visible, documented improvements.",
  },
  {
    id: 9,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "Is Olive Leaf Tea safe for people on blood pressure medication?",
    a: "Olive leaf naturally contains oleuropein, which supports healthy arterial dilation. While safe as a whole-food beverage, we advise consulting your doctor if you take clinical antihypertensives, as natural pressure improvements may allow medication adjustments under physician supervision.",
  },
  {
    id: 10,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "What makes your Lakadong Turmeric different from market haldi?",
    a: "Standard commercial turmeric contains only 2% to 3% curcumin and is often mixed with starch or lead chromate dye. Our single-origin Lakadong rhizomes are lab-verified to contain over 7% active bio-available curcumin, cold-pounded without friction heat.",
  },

  // Category: Spices, Teas & Storage
  {
    id: 11,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "Why do you cold-pound spices instead of modern pulverizing?",
    a: "High-velocity pulverizers generate excessive heat that vaporizes the volatile essential oils that give spices their deep aroma and therapeutic properties. Slow cold-pounding retains maximum essential aroma and authentic pungency.",
  },
  {
    id: 12,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "Are there added colors or preservatives in your Kashmiri Chili Powder?",
    a: "Never. Our Kashmiri chili powder is 100% pure sun-dried whole pods stone-ground without Sudan dyes, artificial food colors, or added salt.",
  },
  {
    id: 13,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "How should I prepare and brew Rosella Ruby & Chamomile Tea?",
    a: "Steep 1 teaspoon of whole dried blossoms or leaves in 90°C hot water for 4–5 minutes in a covered cup. Strain and sip warm, or chill with a slice of lemon for a refreshing iced antioxidant drink.",
  },
  {
    id: 14,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "How are your herbal teas packaged to prevent moisture damage?",
    a: "All herbal teas and infusions are packed in UV-shielded, moisture-barrier food-grade amber jars or multi-layer sealed kraft pouches with resealable zip-locks.",
  },

  // Category: Sourcing, Purity & Verification
  {
    id: 15,
    category: "sourcing",
    categoryLabel: "Sourcing & Purity",
    q: "Where do you source your grains and botanicals?",
    a: "We partner directly with smallholder certified farms across Punjab, Khyber Pakhtunkhwa, and high-altitude regions that follow regenerative, pesticide-conscious, and natural farming traditions.",
  },
  {
    id: 16,
    category: "sourcing",
    categoryLabel: "Sourcing & Purity",
    q: "Do you perform third-party lab testing for purity?",
    a: "Yes, every seasonal batch undergoes rigorous independent lab analysis to verify zero adulterants, zero heavy metals, and zero artificial coloring agents.",
  },

  // Category: Orders, Shipping & Guarantees
  {
    id: 17,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "Do you offer Cash on Delivery (COD) across Pakistan?",
    a: "Yes, we provide reliable Cash on Delivery service to all major cities, towns, and postal areas across Pakistan.",
  },
  {
    id: 18,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "What is your typical delivery timeframe?",
    a: "Orders are freshly milled and dispatched within 24 hours. Delivery takes 2 to 3 business days for major metropolitan areas (Karachi, Lahore, Islamabad/Rawalpindi) and 3 to 5 days for other regions.",
  },
  {
    id: 19,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "What is your 14-Day Money Back Guarantee?",
    a: "If you are genuinely dissatisfied with the aroma, freshness, or texture of our products, contact our support desk within 14 days of receiving your order for an immediate hassle-free replacement or refund.",
  },
  {
    id: 20,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "Can I speak directly with your team before placing an order?",
    a: "Yes, you can click our WhatsApp button anytime to discuss your specific dietary preferences, flour recommendations, or family order requirements with our team for free.",
  },
];

type CategoryFilter = "all" | "flours" | "clinical" | "spices" | "sourcing" | "orders";

const CATEGORIES: { key: CategoryFilter; label: string; count: number }[] = [
  { key: "all", label: "All Questions", count: 20 },
  { key: "flours", label: "Flours & Grains", count: 5 },
  { key: "clinical", label: "Clinical Wellness", count: 5 },
  { key: "spices", label: "Spices & Teas", count: 4 },
  { key: "sourcing", label: "Sourcing & Purity", count: 2 },
  { key: "orders", label: "Orders & Delivery", count: 4 },
];

export function FaqsPageView() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<number, boolean>>({});

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {};
    FAQS_DATA.forEach((faq) => {
      allOpen[faq.id] = true;
    });
    setOpenIds(allOpen);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
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

        {/* Hero Section */}
        <section className="relative py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#1E1510]/10 overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-0 -left-10 w-[380px] h-[380px] pointer-events-none -z-0"
            opacity={0.18}
            size={380}
          />
          <BotanicalWatermark
            type="herbal"
            className="absolute -bottom-10 -right-10 w-[420px] h-[420px] pointer-events-none -z-0"
            opacity={0.2}
            size={420}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18281E] text-[#E5B869] text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              HELP &amp; KNOWLEDGE BASE
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1510] tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#5A4E45] max-w-2xl mx-auto font-light leading-relaxed">
              Everything you need to know about our stone chakki milling, diabetic &amp; diet flours, cold-pounded spices, and door-to-door delivery.
            </p>

            {/* Live Search Input */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword (e.g., stone chakki, diabetes, delivery, maida)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-md bg-white border border-[#1E1510]/15 text-sm text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden focus:border-[#8B3A22] shadow-xs transition-colors"
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
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.key
                      ? "bg-[#1E1510] text-[#FAF7F2] shadow-xs"
                      : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80"
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
          <div className="text-xs text-[#6B5D52] mb-6 flex items-center justify-between">
            <span>
              Showing <strong>{filteredFaqs.length}</strong> of 20 verified questions
            </span>
            {searchQuery && (
              <span>
                Matching keyword: &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </span>
            )}
          </div>

          {/* Accordion List - 2-Column Balanced Grid */}
          {filteredFaqs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-start max-w-6xl mx-auto w-full">
              {filteredFaqs.map((faq) => {
                const isOpen = !!openIds[faq.id];
                return (
                  <article
                    key={faq.id}
                    className="rounded-xl bg-white border border-[#1E1510]/10 overflow-hidden shadow-2xs transition-all duration-200 hover:border-[#1E1510]/20"
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left py-3.5 px-4 text-sm sm:text-base font-medium flex items-start justify-between gap-3 cursor-pointer focus:outline-hidden hover:bg-stone-50"
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
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border border-stone-200 mt-0.5 ${
                          isOpen
                            ? "rotate-180 bg-[#1E1510] text-white border-[#1E1510]"
                            : "bg-[#FAF7F2] text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {/* Smooth Accordion Body */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-stone-100 text-stone-600 text-xs sm:text-sm leading-relaxed bg-[#FAF7F2]/40 animate-fade-in">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-md border border-stone-200 p-8">
              <HelpCircle className="w-10 h-10 text-stone-300 mx-auto mb-3" />
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
                className="mt-4 px-4 py-2 rounded-md bg-[#1E1510] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom WhatsApp / Direct Assistance Action Box */}
          <div className="mt-14 p-8 sm:p-10 rounded-sm bg-[#F0EBE1] border border-[#1E1510]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
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
                href="https://wa.me/923008472910?text=Hello%20Usman%27s%20Pure%2C%20I%20have%20a%20question%20regarding%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white hover:bg-stone-50 border border-[#1E1510]/15 text-[#1E1510] text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>Contact Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
