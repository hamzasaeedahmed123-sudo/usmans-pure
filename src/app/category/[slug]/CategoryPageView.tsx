"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { TrustBadges } from "@/components/TrustBadges";
import { PRODUCTS, Product } from "@/data/products";
import {
  ShoppingBag,
  Check,
  Eye,
  X,
  ChevronRight,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

interface CategoryViewProps {
  slug: string;
}

export function CategoryPageView({ slug }: CategoryViewProps) {
  const categoryMeta: {
    [key: string]: {
      title: string;
      categoryKey: "flours" | "teas" | "spices";
      badge: string;
      description: string;
      highlights: string[];
    };
  } = {
    flours: {
      title: "Traditional Whole Wheat & Multigrain Diet Atta",
      categoryKey: "flours",
      badge: "Pure Chakki Flour",
      description:
        "Slow-milled in traditional chakki stones under 40°C to keep natural wheat germ, bran, and vitamin E intact. Zero maida, zero bleaching agents, and zero preservatives.",
      highlights: [
        "Cold stone-milling at <40°C",
        "Formulated for Weight Loss & Diabetic Sugar Management",
        "Preserves 100% Natural Dietary Fiber",
        "Pliable, aromatic rotis that stay soft for hours",
      ],
    },
    teas: {
      title: "Pure Caffeine-Free Herbal Teas",
      categoryKey: "teas",
      badge: "Herbal Infusions",
      description:
        "Saaf suthri qudrati bootiyan aur phool jinhein bina kisi chemical ya artificial rang ke mehfooz kiya gaya hai. Zehni sukoon, behtar hazmay aur pur-sukoon neend ke liye behtareen kehwa.",
      highlights: [
        "Naturally 100% Caffeine-Free",
        "Whole Dried Flower & Leaf Calyces",
        "Zero Artificial Flavors or Added Colors",
        "Packed in Freshness-Sealed Pouches",
      ],
    },
    spices: {
      title: "Cold-Pounded Desi Spices (Mirch, Haldi, Dhania)",
      categoryKey: "spices",
      badge: "Traditional Spices",
      description:
        "Whole pure spices slow-pounded on stone mortars at cold temperatures. Retains 100% natural aroma, flavor, and color without artificial dyes.",
      highlights: [
        "Cold Stone-Pounded (<35°C processing)",
        "Zero Dyes, Lead Chromate or Sawdust Fillers",
        "Aroma-Locked Sealed Containers",
        "Direct Certified Farm Sourcing",
      ],
    },
  };

  const currentMeta = categoryMeta[slug];
  if (!currentMeta) {
    return notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === currentMeta.categoryKey);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("usman-add-to-cart", {
          detail: {
            product: {
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              category: product.category,
            },
            packSize: product.weight,
            price: product.price,
            quantity: 1,
          },
        })
      );
    }
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header
        isSolid
        theme={
          currentMeta.categoryKey === "flours"
            ? "amber"
            : currentMeta.categoryKey === "spices"
            ? "terracotta"
            : "green"
        }
      />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/products" className="hover:text-amber-800 transition">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">{currentMeta.title}</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Category Hero Banner */}
        <div
          className={`py-12 sm:py-16 text-white border-b ${
            currentMeta.categoryKey === "flours"
              ? "bg-[#1E1510] border-stone-800"
              : "bg-emerald-950 border-emerald-900"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                {currentMeta.badge}
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
                {currentMeta.title}
              </h1>
              <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
                {currentMeta.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {currentMeta.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-md bg-white/10 border border-white/15 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" /> {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">Available Products</h2>
              <p className="text-xs text-stone-500">Showing {categoryProducts.length} items</p>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-amber-800 hover:text-amber-900 transition flex items-center gap-1"
            >
              <span>View All Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {categoryProducts.map((product) => {
              const isAdded = addedIds[product.id];
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-sm shadow-xs hover:shadow-ambient transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full aspect-square bg-stone-50 overflow-hidden p-2 sm:p-4 border-b border-stone-100 flex items-center justify-center">
                    <Link href={`/product/${product.id}`} className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] bg-[#F6F1E9] text-[#8B3A22]">
                        Sale
                      </span>
                    </div>

                    <div className="hidden sm:flex absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 justify-center">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="w-full py-2 px-3 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-ambient hover:bg-[#1E1510] hover:text-white transition flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                        {product.weight}
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 leading-snug line-clamp-2 hover:text-amber-800 transition min-h-[2.75rem]">
                          {product.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 sm:mt-5 sm:pt-4 border-t border-stone-100 flex flex-col gap-2.5">
                      <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-lg sm:text-xl font-extrabold font-sans text-stone-900">
                          {product.priceFormatted}
                        </span>
                        <span className="text-sm font-normal font-sans text-stone-500 line-through ml-1.5">
                          {product.originalPriceFormatted}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full py-3 px-3 text-sm font-bold tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer min-h-[48px] shadow-ambient ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-stone-50/60 border-t border-stone-200 py-6 md:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustBadges />
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-ambient overflow-hidden p-5 sm:p-8 max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="sticky top-0 float-right -mt-2 -mr-2 sm:mt-0 sm:mr-0 p-2.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition cursor-pointer z-50 shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square w-full rounded-sm bg-stone-50 p-6 flex items-center justify-center">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  sizes="320px"
                  className="object-contain p-4"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] text-xs font-medium uppercase bg-[#F6F1E9] text-[#8B3A22]">
                  {quickViewProduct.discountBadge}
                </span>
              </div>

              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-amber-800">
                  {quickViewProduct.categoryLabel} • {quickViewProduct.weight}
                </span>
                <h3 className="text-xl font-semibold text-stone-900 mt-1">
                  {quickViewProduct.title}
                </h3>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-semibold text-stone-900">
                    {quickViewProduct.priceFormatted}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    {quickViewProduct.originalPriceFormatted}
                  </span>
                </div>

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                  <Link
                    href={`/checkout?product=${quickViewProduct.id}&pack=standard&qty=1`}
                    className="w-full py-3 px-4 rounded-[3px] text-[11px] font-medium bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] flex items-center justify-center gap-2 transition cursor-pointer text-center uppercase tracking-[0.18em] duration-200 ease-out"
                  >
                    <Truck className="w-4 h-4 text-amber-400" /> Order Now — Cash on Delivery ({quickViewProduct.priceFormatted})
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-md text-xs font-bold border border-stone-300 hover:bg-stone-100 text-stone-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Basket
                    </button>

                    <Link
                      href={`/product/${quickViewProduct.id}`}
                      className="flex-1 py-2.5 px-3 rounded-[3px] text-[11px] font-medium flex items-center justify-center gap-1 transition text-center bg-transparent border border-[#1E1510]/25 text-[#1E1510] hover:border-[#1E1510] hover:bg-[#1E1510] hover:text-[#F6F1E9] uppercase tracking-[0.18em] transition-colors duration-200 ease-out"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <StoreFooter />
    </div>
  );
}
