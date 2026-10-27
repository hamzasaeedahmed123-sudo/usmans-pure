"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCart } from "@/context/CartContext";
import {
  ChevronRight,
  ShieldCheck,
  Check,
  ShoppingBag,
  Truck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Award,
  Wheat,
} from "lucide-react";

interface DoctorProductPackOption {
  size: string;
  price: number;
  originalPrice: number;
}

interface DoctorProduct {
  id: string;
  title: string;
  problemTag: string;
  easyBenefit: string;
  simplePoints: string[];
  image: string;
  detailUrl: string;
  checkoutUrl: string;
  packOptions: DoctorProductPackOption[];
}

const DOCTOR_PRODUCTS: DoctorProduct[] = [
  {
    id: "prod-3",
    title: "Fat2Fuel Advance Multigrain Flour",
    problemTag: "WEIGHT CARE & NATURAL FIBER",
    easyBenefit: "Rich in slow-digesting dietary fiber to keep you full and energized for hours.",
    simplePoints: [
      "High natural dietary fiber for prolonged satiety",
      "Stone-ground whole grains — Zero Maida",
      "Keeps you active and energized throughout the day",
    ],
    image: "/images/products/prod-3.jpg",
    detailUrl: "/product/prod-3",
    checkoutUrl: "/checkout?product=prod-3",
    packOptions: [
      { size: "5kg", price: 1150, originalPrice: 1500 },
      { size: "10kg", price: 2150, originalPrice: 2900 },
    ],
  },
  {
    id: "prod-4",
    title: "FENUGREEK Plus – Diabetic Care Flour",
    problemTag: "DIABETIC CARE & BALANCED DIET",
    easyBenefit: "Formulated with roasted fenugreek, barley, and whole wheat for steady digestion.",
    simplePoints: [
      "Low-glycemic whole grains with complex carbohydrates",
      "Made with real roasted methi seeds (pleasant, mild taste)",
      "Soft, nutritious rotis that the whole family can enjoy",
    ],
    image: "/images/products/prod-4.png",
    detailUrl: "/product/prod-4",
    checkoutUrl: "/checkout?product=prod-4",
    packOptions: [
      { size: "5kg", price: 1200, originalPrice: 1500 },
      { size: "10kg", price: 2300, originalPrice: 3000 },
    ],
  },
  {
    id: "prod-7",
    title: "Olive Leaf Cardiac Herbal Infusion",
    problemTag: "HERBAL WELLNESS & RELAXATION",
    easyBenefit: "A traditional herbal brew naturally caffeine-free and rich in olive plant polyphenols.",
    simplePoints: [
      "Gentle traditional herbal infusion",
      "Naturally 100% Caffeine-Free",
      "Rich in natural antioxidants and plant polyphenols",
    ],
    image: "/images/products/prod-7.jpg",
    detailUrl: "/product/prod-7",
    checkoutUrl: "/checkout?product=prod-7",
    packOptions: [
      { size: "50g", price: 700, originalPrice: 1000 },
      { size: "100g", price: 1300, originalPrice: 1800 },
    ],
  },
  {
    id: "prod-13",
    title: "Pure Lakadong High-Curcumin Turmeric",
    problemTag: "TRADITIONAL WELLNESS SPICE",
    easyBenefit: "Single-origin Lakadong turmeric with naturally high curcumin, stone-ground with zero color additives.",
    simplePoints: [
      "High natural curcumin (7%+) for daily wellness",
      "Ideal for traditional golden milk or daily cooking",
      "Tested zero lead, zero fake yellow dye, zero fillers",
    ],
    image: "/images/spices-product.jpg",
    detailUrl: "/product/prod-13",
    checkoutUrl: "/checkout?product=prod-13",
    packOptions: [
      { size: "100g", price: 450, originalPrice: 600 },
      { size: "200g", price: 800, originalPrice: 1100 },
    ],
  },
];

const CLINICAL_FAQS = [
  {
    q: "How does stone-ground Chakki flour differ from commercial roller-mill flour?",
    a: "Commercial industrial roller mills operate at high speeds, stripping away the delicate wheat germ oils and nutritious outer bran. Usman's Pure traditional stone-ground chakkis rotate slowly at low temperatures (<40°C), preserving the full living germ, natural dietary fiber, and authentic grain flavor.",
  },
  {
    q: "Can the entire family eat FENUGREEK Plus flour, or only individuals managing blood sugar?",
    a: "FENUGREEK Plus is a wholesome whole-grain flour enriched with roasted fenugreek seeds and barley. It is mild, flavorful, and beneficial for the entire family. Non-diabetic family members benefit from its high prebiotic fiber, digestive support, and sustained fullness.",
  },
  {
    q: "What is the best way to consume Fat2Fuel Multigrain Flour for daily wellness?",
    a: "Use Fat2Fuel flour for your everyday rotis. Because of its dense soluble fiber and roasted barley-oat composition, it digests slowly and provides steady energy without heavy post-meal lethargy. Pair with home-cooked curries, lentils, and fresh salads.",
  },
  {
    q: "How do I brew Olive Leaf Herbal Infusion?",
    a: "Steep 1 teaspoon (approx 2 grams) in 250ml of freshly boiled water for 6 to 8 minutes. Drink warm. It has a mild, earthy herbal taste and is naturally 100% caffeine-free, making it a soothing evening cup.",
  },
];

export function DoctorsChoicePageView() {
  const { addItem, openCart } = useCart();
  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    "prod-3": "5kg",
    "prod-4": "5kg",
    "prod-7": "50g",
    "prod-13": "100g",
  });

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const handleAddToCart = (product: DoctorProduct, option: DoctorProductPackOption, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    addItem(
      {
        id: product.id,
        name: product.title,
        pack: option.size,
        price: option.price,
        image: product.image,
      },
      1
    );
    openCart();

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1510] flex flex-col justify-between selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3.5 flex items-center gap-2 text-xs text-[#6B5D52]">
            <Link href="/" className="hover:text-[#8B3A22] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/products" className="hover:text-[#8B3A22] transition-colors">
              Store
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-medium text-[#1E1510]">Dietary Care &amp; Whole Grain Wellness</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header Section */}
        <section className="relative py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#1E1510]/10 overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-2 -left-10 w-[380px] h-[380px] pointer-events-none -z-0"
            opacity={0.2}
            size={380}
          />
          <BotanicalWatermark
            type="herbal"
            className="absolute -bottom-10 -right-10 w-[420px] h-[420px] pointer-events-none -z-0"
            opacity={0.22}
            size={420}
          />

          <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18281E] text-[#E5B869] text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 shadow-xs">
              <Wheat className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>Nutrition-Focused &bull; Stone-Ground Quality</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1E1510] leading-[1.08] tracking-tight">
              Wholesome Grain Blends <br className="hidden sm:inline" />
              <em className="italic font-normal text-[#8B3A22]">For Balanced Living</em>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#5A4E45] max-w-3xl mx-auto font-light leading-relaxed">
              Wholesome stone-ground grains, ancient seeds, and pure botanicals formulated to provide sustained natural fiber, steady digestion, and honest nutrition.
            </p>

            {/* Clinical Trust Strip */}
            <div className="mt-10 pt-8 border-t border-[#1E1510]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#4A3F37] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Stone-Ground Whole Grains</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Zero Maida or Chemical Bleach</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Cold Stone-Milled &lt;40&deg;C</span>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Advisory Philosophy Box */}
        <section className="py-12 bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="p-8 sm:p-10 rounded-sm bg-[#F0EBE1] border border-[#1E1510]/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B3A22]">
                Whole Grains &amp; Nutrition Philosophy
              </span>
              <p className="mt-3 text-base sm:text-lg text-[#2E241E] font-serif italic leading-relaxed">
                &ldquo;Real grain nutrition starts with stone milling. Modern roller milling strips the living germ and protective bran fiber from grain, creating fast starches. By cold stone-milling unbleached grains with wholesome botanicals like roasted fenugreek, barley, and high-curcumin turmeric, we preserve the complex fiber and vital nutrients as nature intended.&rdquo;
              </p>

              <div className="mt-6 pt-5 border-t border-[#1E1510]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-[#6B5D52]">
                  <span className="font-semibold text-[#1E1510]">Usman&apos;s Pure Nutrition Team</span>
                  <span>&bull;</span>
                  <span>Traditional Milling &amp; Dietary Wellness</span>
                </div>

                <a
                  href="https://wa.me/923008472910?text=Hello%2C%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20flour%20blend."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-xs cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" variant="official" />
                  <span>Ask Our Team</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Roster Section — Clean 2-Column Luxury Magazine Cards */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="eyebrow">Dietary Care Roster</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-[#1E1510]">
                Nutrient-Rich <em className="italic font-normal text-[#8B3A22]">Essentials</em>
              </h2>
              <p className="mt-3 text-sm text-[#6B5D52]">
                Carefully balanced whole-grain blends formulated with roasted barley, fenugreek, and ancient seeds for daily nutrition.
              </p>
            </div>

            {/* 2-Column Grid on Mobile, Scaling up to 4-Columns on Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {DOCTOR_PRODUCTS.map((product) => {
                const currentSize = selectedPacks[product.id] || product.packOptions[0].size;
                const currentOption =
                  product.packOptions.find((o) => o.size === currentSize) || product.packOptions[0];
                const isAdded = addedIds[product.id];

                return (
                  <article
                    key={product.id}
                    className="flex flex-col rounded-xl sm:rounded-2xl bg-white border border-[#1E1510]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 justify-between"
                  >
                    {/* Top Photograph Container */}
                    <div className="relative w-full aspect-[4/5] bg-[#FAF7F2] p-2 sm:p-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                      {/* Problem Tag on Image Badge */}
                      <span className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-[#18281E]/95 text-[#E5B869] backdrop-blur-xs shadow-xs max-w-[90%] truncate">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E5B869] shrink-0" />
                        <span className="truncate">{product.problemTag}</span>
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Product Title */}
                        <Link href={product.detailUrl}>
                          <h3 className="text-xs sm:text-base md:text-lg font-serif text-[#1E1510] hover:text-[#8B3A22] transition-colors leading-snug font-bold line-clamp-2 min-h-[2.25rem] sm:min-h-[2.75rem]">
                            {product.title}
                          </h3>
                        </Link>

                        {/* 2. Easy 1-Line Benefit */}
                        <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs font-bold text-[#8B3A22] leading-snug line-clamp-2">
                          {product.easyBenefit}
                        </p>

                        {/* 3. Simple Bullet Points (visible on tablet/desktop) */}
                        <ul className="hidden sm:block mt-3 space-y-1.5">
                          {product.simplePoints.slice(0, 2).map((point, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs text-stone-700 leading-snug">
                              <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2.5} />
                              <span className="font-medium line-clamp-1">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing, Packaging Toggles & CTA Action Area */}
                      <div className="mt-3 pt-2.5 border-t border-[#1E1510]/10">
                        {/* Packaging Toggle */}
                        <div className="flex items-center justify-between gap-1 mb-2.5">
                          <span className="text-[10px] font-semibold text-[#6B5D52] uppercase tracking-wider">
                            Pack:
                          </span>
                          <div className="flex items-center gap-1">
                            {product.packOptions.map((opt) => (
                              <button
                                key={opt.size}
                                onClick={() =>
                                  setSelectedPacks((prev) => ({ ...prev, [product.id]: opt.size }))
                                }
                                className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                                  currentSize === opt.size
                                    ? "bg-[#1E1510] text-[#FAF7F2] border-[#1E1510]"
                                    : "bg-stone-50 text-[#6B5D52] border-stone-200 hover:border-stone-400"
                                }`}
                              >
                                {opt.size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price & Primary CTA */}
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm sm:text-base font-bold text-[#1E1510]">
                              ₨ {currentOption.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] sm:text-xs text-[#6B5D52]/60 line-through">
                              ₨ {currentOption.originalPrice.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1.5 mt-2.5">
                            <button
                              onClick={(e) => handleAddToCart(product, currentOption, e)}
                              className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs ${
                                isAdded ? "btn-lux-terra" : "btn-lux"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" /> Added
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                                </>
                              )}
                            </button>

                            <Link
                              href={`${product.checkoutUrl}&pack=${currentOption.size}&qty=1`}
                              className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#8B3A22] hover:bg-[#A0452C] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors text-center"
                            >
                              <Truck className="w-3 h-3" />
                              <span>Order COD</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Clinical FAQ / Doctor Q&A Section */}
        <section className="py-16 sm:py-20 bg-[#F5EFE6] border-t border-[#1E1510]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="eyebrow">Medical &amp; Nutritional Clarity</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-[#1E1510]">
                Frequently Asked <em className="italic font-normal text-[#8B3A22]">Clinical Questions</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-start max-w-6xl mx-auto w-full px-4">
              {CLINICAL_FAQS.map((faq, index) => {
                const isOpen = !!openFaqs[index];
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-white border border-[#1E1510]/10 overflow-hidden transition-all duration-200 shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }))}
                      className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-sm sm:text-base font-medium cursor-pointer hover:bg-stone-50"
                    >
                      <span className="font-serif text-sm sm:text-base font-medium text-[#1E1510] leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8B3A22] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed text-stone-600 border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Nutrition Guidance / WhatsApp Consultation Strip */}
        <section className="py-16 bg-[#18281E] text-[#F9F6F0] relative overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none -z-0"
            opacity={0.15}
            size={400}
          />
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
            <Wheat className="w-10 h-10 text-[#E5B869] mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F9F6F0]">
              Need Help Choosing the Right Flour for Your Diet?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#D5CEBF] font-light max-w-2xl mx-auto">
              Our nutrition team is here to guide you on grain compositions, high-fiber flour blends, and meal suggestions for your family&apos;s lifestyle goals.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/923008472910?text=Hello%20Usman's%20Pure,%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20flour%20and%20dietary%20blends%20for%20my%20family."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                <span>WhatsApp Grain Guidance (Free)</span>
              </a>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>Browse All 17 Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
