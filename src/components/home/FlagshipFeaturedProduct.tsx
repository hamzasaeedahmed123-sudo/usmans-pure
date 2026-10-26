"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  BadgeCheck,
  ChevronRight,
  Wheat,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface PackOption {
  id: string;
  label: string;
  weight: string;
  price: number;
  originalPrice: number;
  savings: string;
  isPopular?: boolean;
}

const PACK_OPTIONS: PackOption[] = [
  {
    id: "2.5kg",
    label: "2.5 Kg (Trial Pouch)",
    weight: "2.5kg",
    price: 650,
    originalPrice: 800,
    savings: "Save ₨150",
  },
  {
    id: "5kg",
    label: "5 Kg (Family Pack)",
    weight: "5kg",
    price: 1200,
    originalPrice: 1500,
    savings: "Save ₨300 • Best Value",
    isPopular: true,
  },
  {
    id: "10kg",
    label: "10 Kg (Pantry Saver)",
    weight: "10kg",
    price: 2300,
    originalPrice: 2900,
    savings: "Save ₨600",
  },
];

const PRODUCT_IMAGE = "/images/products/multigrain-diet.jpg";
const WHATSAPP_PHONE = "923008472910";

export function FlagshipFeaturedProduct() {
  const { addItem, openCart } = useCart();
  const [selectedPack, setSelectedPack] = useState<PackOption>(PACK_OPTIONS[1]); // default to 5kg
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(
      {
        id: "prod-multigrain-flagship",
        name: "Multigrain Diet & Diabetic Care Flour",
        pack: selectedPack.weight,
        price: selectedPack.price,
        image: PRODUCT_IMAGE,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    openCart();

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("usman-add-to-cart", {
          detail: {
            id: "prod-multigrain-flagship",
            name: "Multigrain Diet & Diabetic Care Flour",
            pack: selectedPack.weight,
            price: selectedPack.price,
            image: PRODUCT_IMAGE,
            quantity,
          },
        })
      );
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Salam, I want to order Multigrain Diet Flour (${selectedPack.label}) - Qty: ${quantity}. Please confirm delivery details.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`;

  return (
    <section
      id="flagship-product"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#0C2417] via-[#143B28] to-[#0A1F14] text-[#F9F6F0] border-t border-[#D4A373]/30 border-b border-[#081810] shadow-2xl"
    >
      {/* 1. Warm Golden & Emerald Radial Ambient Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-400/15 via-emerald-600/10 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. Top-Right: Soft Muted Wheat Stalk SVG Motif in Warm Gold */}
      <div
        className="absolute top-4 right-4 w-40 md:w-56 opacity-20 pointer-events-none select-none z-0 text-[#E5B869]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M100 250 C100 180, 100 120, 100 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Wheat kernels & awns */}
          <path d="M100 120 C90 110, 80 115, 85 125 C95 130, 100 120, 100 120 Z" fill="currentColor" />
          <path d="M100 120 C110 110, 120 115, 115 125 C105 130, 100 120, 100 120 Z" fill="currentColor" />
          <path d="M100 100 C90 90, 80 95, 85 105 C95 110, 100 100, 100 100 Z" fill="currentColor" />
          <path d="M100 100 C110 90, 120 95, 115 105 C105 110, 100 100, 100 100 Z" fill="currentColor" />
          <path d="M100 80 C90 70, 80 75, 85 85 C95 90, 100 80, 100 80 Z" fill="currentColor" />
          <path d="M100 80 C110 70, 120 75, 115 85 C105 90, 100 80, 100 80 Z" fill="currentColor" />
          <path d="M100 60 C90 50, 80 55, 85 65 C95 70, 100 60, 100 60 Z" fill="currentColor" />
          <path d="M100 60 C110 50, 120 55, 115 65 C105 70, 100 60, 100 60 Z" fill="currentColor" />
          <path d="M100 40 C90 30, 80 35, 85 45 C95 50, 100 40, 100 40 Z" fill="currentColor" />
          <path d="M100 40 C110 30, 120 35, 115 45 C105 50, 100 40, 100 40 Z" fill="currentColor" />
          <path d="M100 20 C95 10, 105 10, 100 20 Z" fill="currentColor" />
          {/* Delicate wheat awns (whiskers) */}
          <path d="M85 125 L60 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 125 L140 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 105 L55 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 105 L145 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 85 L55 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 85 L145 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 65 L60 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 65 L140 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M100 20 L100 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Bottom-Left: Subtle Organic Grain / Wheat Watermark in Warm Gold */}
      <div
        className="absolute bottom-4 left-4 w-36 md:w-48 opacity-20 pointer-events-none select-none z-0 text-[#E5B869]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M30 170 C60 140, 100 110, 160 40"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M70 125 C65 110, 50 105, 45 115 C55 125, 70 125, 70 125 Z"
            fill="currentColor"
          />
          <path
            d="M85 110 C95 95, 110 95, 112 105 C102 115, 85 110, 85 110 Z"
            fill="currentColor"
          />
          <path
            d="M105 85 C100 70, 85 65, 80 75 C90 85, 105 85, 105 85 Z"
            fill="currentColor"
          />
          <path
            d="M125 68 C135 55, 150 55, 152 65 C142 75, 125 68, 125 68 Z"
            fill="currentColor"
          />
          <path
            d="M150 45 C155 30, 170 30, 172 38 C165 48, 150 45, 150 45 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Warm Ambient Radial Glow Behind Left Product Area */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Left-side Subtle Organic Wheat Stalks Watermark */}
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 w-48 lg:w-64 opacity-20 pointer-events-none select-none -z-10 text-[#E5B869]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M100 250 C100 180, 100 120, 100 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M100 120 C90 110, 80 115, 85 125 C95 130, 100 120, 100 120 Z" fill="currentColor" />
          <path d="M100 120 C110 110, 120 115, 115 125 C105 130, 100 120, 100 120 Z" fill="currentColor" />
          <path d="M100 100 C90 90, 80 95, 85 105 C95 110, 100 100, 100 100 Z" fill="currentColor" />
          <path d="M100 100 C110 90, 120 95, 115 105 C105 110, 100 100, 100 100 Z" fill="currentColor" />
          <path d="M100 80 C90 70, 80 75, 85 85 C95 90, 100 80, 100 80 Z" fill="currentColor" />
          <path d="M100 80 C110 70, 120 75, 115 85 C105 90, 100 80, 100 80 Z" fill="currentColor" />
          <path d="M100 60 C90 50, 80 55, 85 65 C95 70, 100 60, 100 60 Z" fill="currentColor" />
          <path d="M100 60 C110 50, 120 55, 115 65 C105 70, 100 60, 100 60 Z" fill="currentColor" />
          <path d="M100 40 C90 30, 80 35, 85 45 C95 50, 100 40, 100 40 Z" fill="currentColor" />
          <path d="M100 40 C110 30, 120 35, 115 45 C105 50, 100 40, 100 40 Z" fill="currentColor" />
          <path d="M100 20 C95 10, 105 10, 100 20 Z" fill="currentColor" />
          <path d="M85 125 L60 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 125 L140 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 105 L55 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 105 L145 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 85 L55 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 85 L145 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 65 L60 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M115 65 L140 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M100 20 L100 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* ================= COLUMN 1: BLENDED PACKAGING & HERITAGE SEAL (LEFT) ================= */}
        <div className="md:col-span-5 flex justify-center relative">
          
          {/* Main Image Frame - Premium Artisan Showcase Card */}
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px] aspect-square bg-gradient-to-b from-[#FAF7F0] to-[#F2E8DC] border-2 border-[#E5B869]/40 shadow-2xl rounded-3xl p-6 flex items-center justify-center">
            
            {/* Authentic Heritage Trust Seal Stamp */}
            <div className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-20 pointer-events-none select-none -rotate-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0E2A1E] text-[#F9F6F0] p-1.5 shadow-xl border-2 border-dashed border-[#E5B869] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite]">
                  <path
                    id="sealPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-bold uppercase tracking-[0.2em] fill-[#E5B869]">
                    <textPath href="#sealPath" startOffset="0%">
                      • 100% STONE GROUND • TAAZA CHAKKI ATTA • ZERO MAIDA
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5B869]" strokeWidth={2} />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white mt-0.5">
                    KHALIS
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px]">
              <Image
                src={PRODUCT_IMAGE}
                alt="Usman's Pure Multigrain Flour 100% Stone-Ground Packaging"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: AUTHENTIC FAMILY STORY & BENEFITS (RIGHT) ================= */}
        <div className="md:col-span-7 flex flex-col justify-center">
            
            {/* Brand Heritage Tagline */}
            <span className="text-xs font-bold text-[#E5B869] uppercase tracking-wider mb-2 block font-sans">
              ⭐ Har Ammi Ki Pehli Pasand &bull; Asli Chakki Atta
            </span>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F9F6F0] tracking-tight leading-[1.25] mb-3">
              Kash Rozana Ki Roti Sirf Pait Na Bhare, Balke Poore Ghar Ki Sehat Bhi Banaye
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#D5CEBF] font-light leading-relaxed mb-6">
              Pathar ki chakki pe pisa asli qudrati anaj—bina chemical bleaching aur bina kisi maiday ke. Buzurgo ki sugar ka khayal, bacchon ki taaqat aur ghar ke dastarkhwan ke liye Ammi ke haath ki narm phulka roti jo har niwala sehatmand banaye.
            </p>

            {/* 3 Natural Desi Family Points */}
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3">
                <Wheat className="w-4 h-4 text-[#E5B869] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-xs sm:text-sm text-[#C8D6CD] leading-relaxed">
                  <strong className="text-white font-bold">Ammi Abbu Aur Buzurgo Ke Liye:</strong>{" "}
                  Low GI anaj jo sugar aur pait ke bhari-pan ko control mein rakhe.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#E5B869] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-xs sm:text-sm text-[#C8D6CD] leading-relaxed">
                  <strong className="text-white font-bold">Bacchon Ki Sehat Aur Taaqat:</strong>{" "}
                  Sabut anaj ka qudrati iron aur calcium jo bacchon ki sehat aur haddiyon ki taaqat ke liye zaroori hai.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E5B869] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-xs sm:text-sm text-[#C8D6CD] leading-relaxed">
                  <strong className="text-white font-bold">Ammi Ki Tasalli:</strong>{" "}
                  100% pathar ki chakki ka pisa hua, bina kisi maiday ke khalis chakki atta aur narm phulka roti.
                </p>
              </div>
            </div>

            {/* 8 Traditional Grains Single Elegant Sentence */}
            <p className="text-xs sm:text-sm text-[#D5CEBF] mb-6 leading-relaxed">
              <span className="font-semibold text-[#E5B869]">8 Khalis Anaj:</span>{" "}
              Gandum, Jau, Jowar, Bajra, Kala Chana, Oats, Alsi (Flaxseeds) aur Methi Dana.
            </p>

            {/* Pack Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#E5B869] uppercase tracking-wide">
                  Select Pack Size:
                </span>
                <span className="text-xs font-bold text-[#34D399]">
                  {selectedPack.savings}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {PACK_OPTIONS.map((pack) => {
                  const isSelected = selectedPack.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPack(pack)}
                      className={`relative p-3 rounded-2xl text-left border transition-all cursor-pointer min-h-[58px] flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#E5B869] text-[#0A1F14] border-[#E5B869] shadow-lg ring-2 ring-[#E5B869]/50"
                          : "bg-[#0E271B]/90 text-white border-[#215037] hover:border-[#E5B869]/60 hover:bg-[#143B27]"
                      }`}
                    >
                      <div className={`text-xs font-bold truncate ${isSelected ? "text-[#0A1F14]" : "text-[#F9F6F0]"}`}>
                        {pack.weight}
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className={`text-sm font-extrabold ${isSelected ? "text-[#0A1F14]" : "text-white"}`}>
                          ₨{pack.price.toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] line-through ${
                            isSelected ? "text-[#0A1F14]/70" : "text-stone-400"
                          }`}
                        >
                          ₨{pack.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Action CTAs Group */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              
              {/* Stepper Quantity Counter */}
              <div className="flex items-center justify-between bg-[#0E271B] border border-[#215037] rounded-2xl px-3 py-1.5 shrink-0 h-12 shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#E5B869] hover:bg-[#153D2A] transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#E5B869] hover:bg-[#153D2A] transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary CTA: Add To Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 px-6 rounded-2xl bg-[#C85A32] hover:bg-[#B34B25] active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {isAdded ? "Added to Cart!" : `Add To Cart • ₨${(selectedPack.price * quantity).toLocaleString()}`}
                </span>
              </button>

              {/* Secondary CTA: Order on WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                <span>Order on WhatsApp</span>
              </a>

            </div>

            {/* Purity Guarantee Footer Assurance */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#A3B8AD] font-medium mt-4 pt-3 border-t border-[#215037]/70">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>Doorstep Cash on Delivery (All Pakistan)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Fresh Stone-Ground Every Morning</span>
              </div>
              <Link
                href="/flour"
                className="ml-auto inline-flex items-center gap-0.5 text-[#E5B869] hover:text-[#F3D08C] font-bold hover:underline"
              >
                <span>View All Flours</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

        </div>
      </section>
    );
  }
