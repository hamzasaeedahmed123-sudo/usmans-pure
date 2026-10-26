"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  BadgeCheck,
  ChevronRight,
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

const GRAIN_PILLS = [
  "Whole Wheat",
  "Oats",
  "Barley",
  "Jowar (Sorghum)",
  "Bajra (Pearl Millet)",
  "Kala Chana",
  "Flaxseeds",
  "Fenugreek (Methi)",
];

const GALLERY_IMAGES = [
  {
    src: "/images/products/multigrain-diet.jpg",
    alt: "Usman's Pure Multigrain Flour 100% Stone-Ground Packaging",
    label: "Studio Pouch",
  },
  {
    src: "/images/products/multigrain-flagship-family.jpg",
    alt: "Healthy Family Enjoying Fresh Multigrain Roti at Dining Table",
    label: "Family Lifestyle",
  },
];

const WHATSAPP_PHONE = "923008472910";

export function FlagshipFeaturedProduct() {
  const { addItem, openCart } = useCart();
  const [selectedPack, setSelectedPack] = useState<PackOption>(PACK_OPTIONS[1]); // default to 5kg
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(
      {
        id: "prod-multigrain-flagship",
        name: "Multigrain Diet & Diabetic Care Flour",
        pack: selectedPack.weight,
        price: selectedPack.price,
        image: GALLERY_IMAGES[0].src,
      },
      quantity
    );

    // Provide instant visual micro-interaction & open cart
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
            image: GALLERY_IMAGES[0].src,
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
      className="relative w-full bg-gradient-to-b from-[#FAF7F2] via-[#F4ECE1]/60 to-[#FAF7F2] py-12 md:py-20 border-b border-stone-200/80 overflow-hidden"
    >
      {/* Decorative ambient grain aura */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ================= COLUMN 1: VISUAL SHOWCASE (LEFT) ================= */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Main Image Frame - Clean & Uncluttered (No text covering packaging) */}
            <div className="relative w-full max-w-[500px] aspect-square sm:aspect-[4/3] lg:aspect-square bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-stone-200/90 flex items-center justify-center overflow-hidden group">
              
              {/* Authentic Artisan Packaging Seal (Real Food Brand Style) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181310] text-[#F5EFE6] border border-[#C5A059]/60 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
                <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase font-sans">
                  100% Pathar Ki Chakki &bull; Zero Maida
                </span>
              </div>

              {/* Active Product Image */}
              <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[380px] transition-transform duration-500 group-hover:scale-[1.03]">
                <Image
                  src={GALLERY_IMAGES[activeImageIdx].src}
                  alt={GALLERY_IMAGES[activeImageIdx].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              {/* Verified Fresh Milled Stamp (Bottom Right) */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18392B]/95 text-white backdrop-blur-md shadow-md border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9.5px] font-bold tracking-wider uppercase font-mono">
                  COLD-MILLED &lt;40&deg;C
                </span>
              </div>
            </div>

            {/* Thumbnail switcher between Pouch & Family Table */}
            <div className="flex items-center gap-3 mt-4">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={img.label}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    activeImageIdx === idx
                      ? "bg-[#1E1510] text-white border-[#1E1510] shadow-sm scale-105"
                      : "bg-white/90 text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                  aria-label={`View ${img.label}`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ================= COLUMN 2: INFORMATION & BENEFITS (RIGHT) ================= */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-950 text-xs font-bold tracking-wide w-fit mb-4 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>⭐ HAR MAA KI PEHLI PASAND • GHAR KE DASTARKHWAN KE LIYE</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-[1.25] mb-3">
              Kash Rozana Ki Roti Sirf Pait Na Bhare, Balke Parivaar Ki Sehat Bhi Banaye
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
              Pathar ki chakki pe pisa asli qudrati anaj—bina chemical bleaching aur bina maida. Walidain ki sugar, bacchon ki haddiyon aur parivaar ke dastarkhwan ke liye narm phulka roti jo har niwala sehatmand banaye.
            </p>

            {/* 2x2 Key Health Benefits Grid - 4 Desi Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              
              {/* Pillar 1: Walidain Ki Fikar */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACB]/90 shadow-2xs">
                <div className="flex flex-col items-center justify-center shrink-0 w-8 pt-0.5">
                  <span className="font-serif text-base font-bold text-[#8B3A22] leading-none">01</span>
                  <span className="w-3 h-0.5 bg-[#8B3A22]/30 mt-1 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      Walidain Ki Fikar
                    </h4>
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black tracking-wider uppercase bg-[#18392B] text-[#88D4A6] font-mono">
                      SUGAR CONTROL
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                    Diabetic &amp; BP Friendly, pait par halka aur khane ke baad sugar spike se pak.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Bacchon Ki Nashonuma */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACB]/90 shadow-2xs">
                <div className="flex flex-col items-center justify-center shrink-0 w-8 pt-0.5">
                  <span className="font-serif text-base font-bold text-[#8B3A22] leading-none">02</span>
                  <span className="w-3 h-0.5 bg-[#8B3A22]/30 mt-1 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      Bacchon Ki Nashonuma
                    </h4>
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black tracking-wider uppercase bg-[#3E2514] text-[#E5B888] font-mono">
                      MAZBOOT HADDIYAN
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                    Asli chana, jowar aur bajray ka qudrati fiber &amp; minerals bacchon ki haddiyan mazboot kare.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Maa Ki Tasalli */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACB]/90 shadow-2xs">
                <div className="flex flex-col items-center justify-center shrink-0 w-8 pt-0.5">
                  <span className="font-serif text-base font-bold text-[#8B3A22] leading-none">03</span>
                  <span className="w-3 h-0.5 bg-[#8B3A22]/30 mt-1 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      Maa Ki Tasalli
                    </h4>
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black tracking-wider uppercase bg-[#4A3218] text-[#E8C88A] font-mono">
                      ZERO MAIDA
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                    100% Maida-Free Pure Whole Grain, zero factory chemical bleach aur zero milawat.
                  </p>
                </div>
              </div>

              {/* Pillar 4: Narm Phulka Guarantee */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DACB]/90 shadow-2xs">
                <div className="flex flex-col items-center justify-center shrink-0 w-8 pt-0.5">
                  <span className="font-serif text-base font-bold text-[#8B3A22] leading-none">04</span>
                  <span className="w-3 h-0.5 bg-[#8B3A22]/30 mt-1 rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                      Narm Phulka Guarantee
                    </h4>
                    <span className="px-1.5 py-0.5 rounded text-[8.5px] font-black tracking-wider uppercase bg-[#18392B] text-[#88D4A6] font-mono">
                      NARM ROTI
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                    Subah se shaam tak narm phulka roti jo har umar ke afrad asani se hazam karein.
                  </p>
                </div>
              </div>

            </div>

            {/* 8 Traditional Grains Pills */}
            <div className="mb-6">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Crafted With 8 Nutrient-Dense Grains:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {GRAIN_PILLS.map((grain) => (
                  <span
                    key={grain}
                    className="text-[11px] font-medium bg-[#ECE5DA] text-stone-800 px-2.5 py-1 rounded-full border border-stone-300/60"
                  >
                    {grain}
                  </span>
                ))}
              </div>
            </div>

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
              
              {/* Stepper Quantity Counter (48px Touch Target) */}
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
      </div>
    </section>
  );
}
