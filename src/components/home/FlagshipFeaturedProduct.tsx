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
      className="relative w-full overflow-hidden bg-[#F3EDE2] border-t border-[#E2D5C3] border-b border-[#E2D5C3]"
    >
      {/* 1. Subtle Low-Opacity Radial Ambient Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 3. Bottom-Left: Authentic Watercolor Botanical Leaf Graphic (from user reference) */}
      <div
        className="absolute left-0 bottom-0 pointer-events-none select-none z-0 w-[380px] sm:w-[520px] md:w-[640px] lg:w-[720px] h-[340px] sm:h-[460px] md:h-[540px] -translate-x-10 translate-y-8 sm:translate-y-6"
        aria-hidden="true"
      >
        <Image
          src="/images/watermarks/leaves-free-img.png"
          alt=""
          fill
          sizes="(max-width: 768px) 380px, (max-width: 1200px) 640px, 720px"
          className="object-contain object-left-bottom opacity-60"
        />
      </div>

      {/* Subtle Warm Ambient Radial Glow Behind Left Product Area */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================= COLUMN 1: BLENDED PACKAGING & HERITAGE SEAL (LEFT) ================= */}
        <div className="lg:col-span-5 flex justify-center relative">
          
          {/* Main Image Frame - Prominent, Larger Premium Card */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[480px] aspect-square bg-[#FAF7F0] border border-[#E5DAC8] shadow-md rounded-3xl p-6 sm:p-8 flex items-center justify-center">
            
            {/* Authentic Heritage Trust Seal Stamp */}
            <div className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-20 pointer-events-none select-none -rotate-6">
              <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-[#1E3A2F] text-[#F3E3DA] p-1.5 shadow-md border-2 border-dashed border-[#D4A373]/70 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite]">
                  <path
                    id="sealPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-bold uppercase tracking-[0.2em] fill-[#D4A373]">
                    <textPath href="#sealPath" startOffset="0%">
                      • 90% STONE GROUND • TAAZA CHAKKI ATTA • ZERO MAIDA
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A373]" strokeWidth={2} />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white mt-0.5">
                    KHALIS
                  </span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[410px]">
              <Image
                src={PRODUCT_IMAGE}
                alt="Usman's Pure Multigrain Flour 90% Stone-Ground Packaging"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: AUTHENTIC FAMILY STORY & BENEFITS (RIGHT) ================= */}
        <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Brand Heritage Tagline */}
            <span className="text-xs font-bold text-[#8B3A22] uppercase tracking-wider mb-2 block font-sans">
              ⭐ Har Ammi Ki Pehli Pasand &bull; Asli Chakki Atta
            </span>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E3A2F] tracking-tight leading-[1.25] mb-3">
              Kash Rozana Ki Roti Sirf Pait Na Bhare, Balke Poore Ghar Ki Sehat Bhi Banaye
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
              Pathar ki chakki pe pisa asli qudrati anaj—bina chemical bleaching aur bina kisi maiday ke. Buzurgo ki sugar ka khayal, bacchon ki taaqat aur ghar ke dastarkhwan ke liye Ammi ke haath ki narm phulka roti jo har niwala sehatmand banaye.
            </p>

            {/* 3 Natural Desi Family Points */}
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3">
                <Wheat className="w-4 h-4 text-[#8B3A22] shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-bold">Ammi Abbu Aur Buzurgo Ke Liye:</strong>{" "}
                  Low GI anaj jo sugar aur pait ke bhari-pan ko control mein rakhe.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#8B3A22] shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-bold">Bacchon Ki Sehat Aur Taaqat:</strong>{" "}
                  Sabut anaj ka qudrati iron aur calcium jo bacchon ki sehat aur haddiyon ki taaqat ke liye zaroori hai.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8B3A22] shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-bold">Ammi Ki Tasalli:</strong>{" "}
                  90% pathar ki chakki ka pisa hua, bina kisi maiday ke khalis chakki atta aur narm phulka roti.
                </p>
              </div>
            </div>

            {/* 8 Traditional Grains Single Elegant Sentence */}
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              <span className="font-semibold text-stone-800">8 Khalis Anaj:</span>{" "}
              Gandum, Jau, Jowar, Bajra, Kala Chana, Oats, Alsi (Flaxseeds) aur Methi Dana.
            </p>

            {/* Pack Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                  Select Pack Size:
                </span>
                <span className="text-xs font-bold text-emerald-800">
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
                          ? "bg-[#1E1510] text-white border-[#1E1510] shadow-md ring-2 ring-[#8B3A22]/20"
                          : "bg-white text-stone-800 border-stone-300 hover:border-stone-400"
                      }`}
                    >
                      <div className="text-xs font-bold truncate">
                        {pack.weight}
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-sm font-extrabold">
                          ₨{pack.price.toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] line-through ${
                            isSelected ? "text-stone-400" : "text-stone-400"
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
              <div className="flex items-center justify-between bg-white border border-stone-300 rounded-2xl px-3 py-1.5 shrink-0 h-12 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-stone-900 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary CTA: Add To Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 px-6 rounded-2xl bg-[#8B3A22] hover:bg-[#722F1B] active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
                className="h-12 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                <span>Order on WhatsApp</span>
              </a>

            </div>

            {/* Purity Guarantee Footer Assurance */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-500 font-medium mt-4 pt-3 border-t border-stone-200/80">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                <span>Doorstep Cash on Delivery (All Pakistan)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Fresh Stone-Ground Every Morning</span>
              </div>
              <Link
                href="/flour"
                className="ml-auto inline-flex items-center gap-0.5 text-[#8B3A22] font-bold hover:underline"
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
