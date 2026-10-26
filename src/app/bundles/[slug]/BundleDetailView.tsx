"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { getBundleBySlug, LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  ChevronRight,
  Check,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Clock,
  ChevronDown,
  RotateCcw,
  ArrowRight,
  PackageCheck,
  HeartHandshake,
} from "lucide-react";

interface BundleDetailViewProps {
  slug: string;
}

export function BundleDetailView({ slug }: BundleDetailViewProps) {
  const bundle = getBundleBySlug(slug) || LUXURY_BUNDLES[0];
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("nutrition");
  const [quantity, setQuantity] = useState(1);

  const totalPrice = bundle.price * quantity;
  const totalOriginal = bundle.originalPrice * quantity;
  const totalSavings = bundle.savings * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const current = parseInt(cartEl.innerText || "0", 10) + quantity;
      cartEl.innerText = current.toString();
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? "" : id));
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Usman's Pure Products, I would like to order the "${bundle.title}" (₨${bundle.price.toLocaleString()} bundle special) on Cash on Delivery with free shipping. Please confirm delivery details.`
  );

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
            <Link href="/bundles" className="hover:text-[#8B3A22] transition-colors">
              Wellness Bundles
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-medium text-[#1E1510] truncate max-w-xs sm:max-w-md">
              {bundle.title}
            </span>
          </div>
        </div>

        <TickerMarquee />

        {/* Split-Screen Bundle Composition & Purchase Section */}
        <section className="relative py-12 sm:py-20 overflow-hidden border-b border-[#1E1510]/10">
          {/* Subtle Organic Background Watermarks */}
          <BotanicalWatermark
            type="herbal"
            className="absolute top-10 right-0 w-[450px] h-[450px]"
            opacity={0.30}
            size={450}
          />
          <BotanicalWatermark
            type="wheat"
            className="absolute bottom-10 left-0 w-[420px] h-[420px]"
            opacity={0.22}
            size={420}
          />

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Pack Composition & Visual Preview */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                {/* Main Hero Pack Image */}
                <div
                  className={`relative aspect-[4/3] w-full ${bundle.tint} rounded-sm overflow-hidden flex items-center justify-center p-8`}
                >
                  <Image
                    src={bundle.image}
                    alt={bundle.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-6 shadow-product"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-[2px] bg-[#1E1510] text-[#F6F1E9] text-[10px] font-medium tracking-[0.2em] uppercase">
                      Save ₨{bundle.savings}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[2px] bg-[#FAF7F2]/90 backdrop-blur-xs text-[#8B3A22] text-[10px] font-medium tracking-widest uppercase">
                      100% Organic &bull; Zero Additives
                    </span>
                  </div>

                  <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-[#6B5D52] font-medium bg-[#FAF7F2]/80 px-2 py-0.5 rounded-[2px]">
                    Authentic Pack Preview
                  </span>
                </div>

                {/* Bundle Component Preview Thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  {bundle.whatsInTheBox.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#F6F1E9] rounded-sm flex flex-col justify-between border border-[#1E1510]/5"
                    >
                      <span className="tag-quiet text-[#8B3A22] truncate mb-1">
                        Item {idx + 1}
                      </span>
                      <h4 className="text-xs font-serif font-bold text-[#1E1510] line-clamp-2 leading-snug">
                        {item.name}
                      </h4>
                      <p className="mt-2 text-[10px] text-[#6B5D52] font-medium">
                        {item.size}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Trust Credentials Box */}
                <div className="p-4 bg-[#EFE7DB]/60 rounded-sm flex items-center justify-between gap-4 text-xs text-[#1E1510]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Lab-tested 0% heavy metals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8B3A22] shrink-0" />
                    <span>Doorstep COD across Pakistan</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Pricing & What's In The Box */}
              <div className="lg:col-span-6 flex flex-col">
                <span className="tag-quiet text-[#8B3A22]">{bundle.badge}</span>

                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1510] leading-tight">
                  {bundle.title}
                </h1>

                <p className="mt-3 text-sm sm:text-base text-[#6B5D52] leading-relaxed">
                  {bundle.subtitle}
                </p>

                {/* Price Display */}
                <div className="mt-6 p-5 bg-[#F6F1E9] rounded-xl flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline flex-wrap">
                    <span className="text-3xl sm:text-4xl font-bold font-sans text-stone-900 tracking-tight">
                      Rs {totalPrice.toLocaleString()}
                    </span>
                    <span className="text-base font-medium font-sans text-stone-400 line-through ml-3">
                      Rs {totalOriginal.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200/60 text-xs font-bold font-sans shadow-2xs">
                      Save Rs {totalSavings.toLocaleString()}
                    </span>
                    <div className="text-[10px] text-[#6B5D52] mt-1">
                      Includes nationwide COD
                    </div>
                  </div>
                </div>

                {/* What's in the Box Checklist */}
                <div className="mt-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#1E1510] mb-3 flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-[#8B3A22]" />
                    <span>What&apos;s Included In This Box:</span>
                  </h3>
                  <div className="space-y-3">
                    {bundle.whatsInTheBox.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white rounded-sm border border-[#1E1510]/8 flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-sm font-serif font-bold text-[#1E1510]">
                              {item.name}
                            </h4>
                            <span className="text-[10px] font-medium text-[#8B3A22] shrink-0">
                              {item.size}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[#6B5D52] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="mt-8 pt-6 border-t border-[#1E1510]/10 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-[#1E1510]/20 rounded-[3px] bg-white px-3 py-2 gap-4">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-sm font-medium hover:text-[#8B3A22] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-sm font-medium hover:text-[#8B3A22] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 ${isAdded ? "btn-lux-terra" : "btn-lux"} py-3.5`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Basket
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" /> Add Bundle to Cart — ₨{totalPrice.toLocaleString()}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct WhatsApp COD Order Button */}
                  <a
                    href={`https://wa.me/923008472910?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-[3px] bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors duration-200 shadow-xs text-center cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                    <span>Order via WhatsApp (Cash on Delivery)</span>
                  </a>

                  {/* Instant Checkout Link */}
                  <Link
                    href={`/checkout?bundle=${bundle.id}&qty=${quantity}`}
                    className="self-center link-lux mt-2"
                  >
                    <span>Instant Doorstep COD Checkout &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Synergy Section: How It Works Together */}
        <section className="py-16 sm:py-24 bg-[#F6F1E9] border-b border-[#1E1510]/10 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="eyebrow mb-2">Nutritional Chemistry</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1510] tracking-tight">
                {bundle.synergy.headline}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#6B5D52] leading-relaxed">
                {bundle.synergy.description}
              </p>
            </div>

            {/* Daily Routine Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bundle.synergy.routineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF7F2] rounded-sm flex flex-col justify-between border border-[#1E1510]/5 shadow-ambient"
                >
                  <div>
                    <div className="flex items-center justify-between text-[#8B3A22] text-[10px] font-medium tracking-widest uppercase mb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {step.time}
                      </span>
                      <span>Step 0{idx + 1}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#1E1510] leading-snug">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-xs text-[#6B5D52] leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1E1510]/10 flex items-center gap-2 text-[10px] font-medium text-emerald-800">
                    <Check className="w-3.5 h-3.5" /> Clinical Synergy Active
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Accordion Section */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#1E1510]/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="eyebrow mb-2">Transparency &amp; Usage</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1510]">
                Frequently Verified Inquiries
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#6B5D52]">
                Detailed clinical specs, lab purity assays, and preparation instructions for this pack.
              </p>
            </div>

            <div className="space-y-4">
              {bundle.accordions.map((acc) => {
                const isOpen = openAccordion === acc.id;
                return (
                  <div
                    key={acc.id}
                    className="bg-[#F6F1E9] rounded-sm overflow-hidden border border-[#1E1510]/5 transition-colors"
                  >
                    <button
                      onClick={() => toggleAccordion(acc.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EFE7DB]/60 transition-colors"
                    >
                      <span className="text-base sm:text-lg font-serif font-bold text-[#1E1510]">
                        {acc.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8B3A22] transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-[#6B5D52] leading-relaxed border-t border-[#1E1510]/5 pt-4">
                        {acc.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other Wellness Bundles Recommendation Section */}
        <section className="py-16 sm:py-20 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="eyebrow">Explore More</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1510] mt-1">
                  Other Wellness Combinations
                </h2>
              </div>
              <Link href="/bundles" className="link-lux self-start sm:self-auto">
                <span>View All 4 Bundles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {LUXURY_BUNDLES.filter((b) => b.id !== bundle.id)
                .slice(0, 3)
                .map((other) => (
                  <Link
                    key={other.id}
                    href={`/bundles/${other.slug}`}
                    className="p-3 sm:p-5 bg-[#F6F1E9] rounded-2xl group hover:shadow-ambient transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[4/3] relative flex items-center justify-center p-3 overflow-hidden rounded-xl sm:rounded-2xl bg-stone-50/50 border border-[#1E1510]/5 mb-3 sm:mb-4">
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-contain max-h-56 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold font-sans bg-amber-100 text-amber-900 border border-amber-200/60 shadow-2xs z-10">
                        Save Rs {other.savings}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-serif font-bold text-[#1E1510] group-hover:text-[#8B3A22] transition-colors line-clamp-1">
                        {other.title}
                      </h4>
                      <div className="flex items-baseline gap-2 font-sans mt-2.5 pt-2 border-t border-[#1E1510]/10 flex-wrap">
                        <span className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-sans">
                          Rs {other.price.toLocaleString()}
                        </span>
                        <span className="text-sm font-medium text-stone-400 line-through font-sans">
                          Rs {other.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
