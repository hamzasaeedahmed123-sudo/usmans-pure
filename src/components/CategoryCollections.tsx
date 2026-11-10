"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Check, Wheat, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface CategoryCollectionsProps {
  onSelectCategory?: (cat: "all" | "flours" | "teas") => void;
}

export function CategoryCollections({ onSelectCategory }: CategoryCollectionsProps = {}) {
  const { addItem, openCart } = useCart();
  const [activeTab, setActiveTab] = useState<"flours" | "teas">("flours");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Dynamic tab activation via custom event triggered by "Learn More" in Product Grid / Hero
  useEffect(() => {
    const handleTabEvent = (e: Event) => {
      const customEvent = e as CustomEvent<"flours" | "teas">;
      if (customEvent.detail === "flours" || customEvent.detail === "teas") {
        setActiveTab(customEvent.detail);
        if (onSelectCategory) {
          onSelectCategory(customEvent.detail);
        }
      }
    };

    window.addEventListener("setCollectionTab", handleTabEvent);
    return () => window.removeEventListener("setCollectionTab", handleTabEvent);
  }, [onSelectCategory]);

  const handleTabChange = (tab: "flours" | "teas") => {
    setActiveTab(tab);
    if (onSelectCategory) {
      onSelectCategory(tab);
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    addItem(
      {
        id: product.id,
        name: product.title,
        pack: product.weight,
        price: product.price,
        image: product.image,
      },
      1
    );
    openCart();

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const flourProducts = PRODUCTS.filter((p) => p.category === "flours");
  const teaProducts = PRODUCTS.filter((p) => p.category === "teas");
  const currentProducts = activeTab === "flours" ? flourProducts : teaProducts;

  return (
    <section
      id="our-collection"
      className="relative py-12 sm:py-20 transition-colors duration-700 ease-in-out border-b border-stone-200/60 overflow-hidden bg-[#FAF9F5] scroll-mt-20"
    >
      {/* Background Botanical Watermark Accents */}
      <BotanicalWatermark
        type="wheat"
        className="absolute -top-12 -left-12 w-[420px] h-[420px]"
        opacity={0.14}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute -bottom-12 -right-12 w-[420px] h-[420px]"
        opacity={0.16}
        size={420}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8B3A22]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3A22]">
                Certified Artisanal Milling
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2C2A29] tracking-tight leading-snug">
              Our Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B5D52] max-w-md leading-relaxed md:text-right">
            FRESHLY MILLED whole grain flours and 100% pure whole-leaf herbal teas. Slow cold milled below 40&deg;C, delivered fresh to your doorstep across Pakistan.
          </p>
        </div>

        {/* Dynamic Category Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 sm:mb-10 border-b border-stone-200/80 pb-4">
          <div className="inline-flex flex-col min-[480px]:flex-row p-1.5 rounded-2xl bg-stone-200/60 border border-stone-300/60 shadow-inner w-full sm:w-auto gap-1">
            <button
              type="button"
              id="tab-flours"
              onClick={() => handleTabChange("flours")}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "flours"
                  ? "bg-white text-[#2C2A29] shadow-sm scale-[1.01]"
                  : "text-stone-600 hover:text-[#2C2A29] hover:bg-white/40"
              }`}
            >
              <Wheat className="w-4 h-4 text-[#8B3A22] shrink-0" strokeWidth={2} />
              <span>Pure Chakki Flours (5 Blends)</span>
            </button>

            <button
              type="button"
              id="tab-teas"
              onClick={() => handleTabChange("teas")}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "teas"
                  ? "bg-white text-[#2C2A29] shadow-sm scale-[1.01]"
                  : "text-stone-600 hover:text-[#2C2A29] hover:bg-white/40"
              }`}
            >
              <Leaf className="w-4 h-4 text-[#1E3A2F] shrink-0" strokeWidth={2} />
              <span>Herbal Teas &amp; Infusions (5 Blends)</span>
            </button>
          </div>

          <div className="text-xs text-[#6B5D52] font-medium hidden md:flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>
              Showing {currentProducts.length} {activeTab === "flours" ? "Stone-Ground Flours" : "Pure Herbal Infusions"}
            </span>
          </div>
        </div>

        {/* Dynamic Products Grid - Strict 2-Column on Mobile, Floating Edge-to-Edge Cards */}
        <div className="grid grid-cols-2 gap-3 p-3 sm:p-0 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentProducts.map((product) => {
            const isAdded = addedIds[product.id];

            return (
              <article
                key={product.id}
                className="group relative flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Floating Product Image Frame: Soft rounded-2xl, no box borders */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F2EDE4]/70 p-0">
                    <Link href={`/product/${product.id}`} className="absolute inset-0" aria-label={product.title}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Discount / Category Badge */}
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 bg-[#FAF9F5]/90 backdrop-blur-md text-[#8B3A22] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs pointer-events-none">
                      {product.weight}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="pt-2.5 sm:pt-3.5 flex flex-col">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B3A22] truncate block">
                      {product.categoryLabel}
                    </span>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="mt-0.5 sm:mt-1 font-serif font-bold text-[#2C2A29] text-xs sm:text-base group-hover:text-[#8B3A22] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="mt-1 text-[11px] sm:text-xs text-[#6B5D52] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="mt-2 sm:mt-2.5 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm sm:text-lg font-extrabold text-[#2C2A29]">
                        ₨ {product.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#6B5D52] line-through">
                        ₨ {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Minimalist Full-Width CTA Button with Active Scale */}
                <div className="mt-2.5 sm:mt-3 flex flex-col gap-1 sm:gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`w-full py-2 sm:py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide min-h-[36px] sm:min-h-[42px] flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 transition-transform ${
                      isAdded
                        ? "bg-[#1E3A2F] text-white"
                        : "bg-[#2C2A29] hover:bg-[#1E3A2F] text-[#FAF9F5]"
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
                    href={`/product/${product.id}`}
                    className="w-full text-center py-0.5 text-[10px] sm:text-xs font-semibold text-[#6B5D52] hover:text-[#2C2A29] transition-colors"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Purity Guarantee Footer Pill */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-[#F2EDE4]/80 border border-stone-200/70 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#2C2A29]">
                100% Traditional Stone Cold-Milling Guarantee
              </div>
              <div className="text-xs text-[#6B5D52]">
                Zero maida, zero synthetic additives, and zero high-speed heat degradation.
              </div>
            </div>
          </div>

          <Link
            href={activeTab === "flours" ? "/category/flours" : "/category/teas"}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B3A22] hover:text-[#2C2A29] transition-colors"
          >
            <span>Browse All {activeTab === "flours" ? "Flour Blends" : "Herbal Teas"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
