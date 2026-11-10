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
import { useCart } from "@/context/CartContext";
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
  const { addItem, openCart } = useCart();
  const categoryMeta: {
    [key: string]: {
      title: string;
      categoryKey: "flours" | "teas";
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
        "Cold-milling at <40°C",
        "Formulated for Weight Care & Diabetic Nutrition",
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
    addItem(
      {
        id: product.id,
        name: product.title,
        pack: `Standard Pack (${product.weight})`,
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

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header
        isSolid
        theme={currentMeta.categoryKey === "flours" ? "amber" : "green"}
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

          {/* Strict 2-Column Grid on Mobile, Scaling to 4 on Desktop - Borderless Minimalist with Luxury Whitespace */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16 md:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product) => {
              const discountPercent = product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-start bg-transparent border-none shadow-none p-0"
                >
                  {/* Floating image container on flat white canvas with no borders or bounding boxes */}
                  <div className="relative aspect-square w-full bg-transparent overflow-hidden flex items-center justify-center">
                    <Link
                      href={`/product/${product.id}`}
                      className="absolute inset-0 z-0 flex items-center justify-center"
                      aria-label={product.title}
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                        quality={85}
                        loading="lazy"
                        className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Tiny minimalist circular/pill-shaped red badge */}
                    {discountPercent > 0 && (
                      <span className="absolute top-2 right-2 z-10 bg-red-600 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded-full pointer-events-none shadow-xs tracking-wider">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Text and details below image */}
                  <div className="mt-4 sm:mt-5 flex flex-col text-center">
                    <Link href={`/product/${product.id}`}>
                      <h2 className="text-sm md:text-base font-normal text-stone-800 leading-snug line-clamp-2 hover:text-[#145330] transition-colors tracking-normal">
                        {product.title}
                      </h2>
                    </Link>

                    {/* Price display: bold prominent sale price & subtle crossed-out original, center-aligned */}
                    <div className="mt-2 flex items-baseline justify-center gap-2 flex-wrap">
                      <span className="text-base sm:text-lg font-semibold text-stone-800">
                        Rs {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs sm:text-sm text-stone-400 line-through font-normal">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Delicate Pill-shaped Add to Cart Button */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="mt-3.5 w-full max-w-[170px] sm:max-w-[190px] mx-auto py-2 sm:py-2.5 px-4 rounded-full bg-white border border-stone-300 hover:border-stone-400 text-stone-800 hover:bg-stone-50 text-xs sm:text-sm font-normal tracking-wide shadow-xs hover:shadow-sm active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
                    >
                      {addedIds[product.id] ? "Added to cart ✓" : "Add to cart"}
                    </button>
                  </div>
                </article>
              );
            })}
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
              <div className="relative aspect-square w-full rounded-xl bg-stone-100 overflow-hidden p-0 m-0 flex items-center justify-center">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  sizes="320px"
                  quality={85}
                  className="w-full h-full object-cover p-0 m-0"
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
