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

const PRODUCT_IMAGE = "/images/products/flagship-man-product-merged.png";
const WHATSAPP_PHONE = "923129996658";

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
      className="relative w-full overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================= COLUMN 1: SEAMLESS MERGED VISUAL (LEFT) ================= */}
        <div className="lg:col-span-6 flex items-center justify-center relative border-none shadow-none p-0 m-0">
          <div className="relative w-full flex items-center justify-center border-none shadow-none p-0 m-0">
            {/* Authentic Heritage Trust Seal Stamp - Floating Naturally Without Card Box */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-6 z-20 pointer-events-none select-none -rotate-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1E3A2F] text-[#F3E3DA] p-1.5 shadow-md border-2 border-dashed border-[#D4A373]/70 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite]">
                  <path
                    id="sealPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-bold uppercase tracking-[0.2em] fill-[#D4A373]">
                    <textPath href="#sealPath" startOffset="0%">
                      • ASLI &amp; KHALIS • TAAZA CHAKKI ATTA • ZERO MAIDA
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

            {/* Continuous, Borderless Merged Visual: Kitchen Setup on Left & Gesturing Man on Right */}
            <Image
              src="/images/products/flagship-man-product-merged.png"
              alt="Usman's Pure Products Multigrain Flour & Organic Ingredients"
              width={1200}
              height={896}
              priority
              quality={85}
              className="w-full h-auto object-contain max-h-[500px] md:max-h-[600px] mix-blend-multiply select-none pointer-events-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
            />
          </div>
        </div>

        {/* ================= COLUMN 2: AUTHENTIC FAMILY STORY & BENEFITS (RIGHT) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-center">
            
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
              Khalis aur asli qudrati anaj bina kisi chemical bleaching ke aur bina kisi maiday ke. Buzurgo ki sugar ka khayal, bacchon ki taaqat aur ghar ke dastarkhwan ke liye Ammi ke haath ki narm phulka roti jo har niwala sehatmand banaye.
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
                  <strong className="text-stone-900 font-bold">Ghar Ki Tasalli:</strong>{" "}
                  100% khalis aur taaza pisa hua, bina kisi maiday ke khalis chakki atta aur narm phulka roti.
                </p>
              </div>
            </div>

            {/* 8 Traditional Grains Single Elegant Sentence */}
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              <span className="font-semibold text-stone-800">8 Khalis Anaj:</span>{" "}
              Gandum, Jau, Jowar, Bajra, Kala Chana, Oats, Alsi (Flaxseeds) aur Methi Dana.
            </p>

            {/* Pack Size Selector — Mobile-Optimized Grid with Brand Styling */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                  Select Pack Size:
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {selectedPack.savings}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {PACK_OPTIONS.map((pack) => {
                  const isSelected = selectedPack.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      onClick={() => setSelectedPack(pack)}
                      className={`relative p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-left border transition-transform active:scale-95 duration-150 cursor-pointer min-h-[64px] flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#FAF5EE] text-[#2C2A29] border-2 border-[#8B3A22] shadow-sm ring-2 ring-[#8B3A22]/15"
                          : "bg-white text-[#2C2A29] border border-stone-200/90 hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-xs font-bold ${isSelected ? "text-[#8B3A22]" : "text-stone-800"}`}>
                          {pack.weight}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A22]" />
                        )}
                      </div>
                      <div className="flex flex-col min-[390px]:flex-row min-[390px]:items-baseline gap-0.5 min-[390px]:gap-1.5 mt-1">
                        <span className="text-xs min-[390px]:text-sm font-extrabold text-stone-900 whitespace-nowrap">
                          ₨{pack.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-stone-400 line-through whitespace-nowrap">
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
                className="flex-1 h-12 px-6 rounded-2xl bg-[#8B3A22] hover:bg-[#722F1B] active:scale-95 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-transform duration-150 flex items-center justify-center gap-2 cursor-pointer"
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
                className="h-12 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-transform duration-150 flex items-center justify-center gap-2 cursor-pointer shrink-0"
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
                <span>Freshly Milled</span>
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
