"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { TrustBadges } from "@/components/TrustBadges";
import { PRODUCTS, Product } from "@/data/products";
import { useStoreData } from "@/context/StoreDataContext";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Check,
  Eye,
  X,
  Search,
  ArrowUpDown,
  ChevronRight,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export function ProductsPageView() {
  const { addItem, openCart } = useCart();
  const { products: storeProducts } = useStoreData();
  const allCatalogProducts = storeProducts && storeProducts.length > 0 ? storeProducts : PRODUCTS;

  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<"all" | "flours" | "teas">(() => {
    if (paramCategory === "flours") return "flours";
    if (paramCategory === "teas") return "teas";
    return "all";
  });

  useEffect(() => {
    if (paramCategory === "flours" || paramCategory === "teas" || paramCategory === "all") {
      setSelectedCategory(paramCategory);
    }
  }, [paramCategory]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = useCallback((product: Product, e?: React.MouseEvent) => {
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
  }, [addItem, openCart]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allCatalogProducts
      .filter((p) => {
        const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
        const matchesSearch =
          !query ||
          p.title.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
        return 0;
      });
  }, [allCatalogProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#FAF9F5] border-b border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">All Products</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Banner with Dynamic Category Background Theming */}
        <div
          className="text-white py-12 sm:py-16 border-b border-stone-800 transition-all duration-500 ease-in-out relative overflow-hidden"
          style={
            selectedCategory === "flours"
              ? { backgroundColor: "#4D3817" }
              : selectedCategory === "teas"
              ? { backgroundColor: "#172A1C" }
              : {
                  background: "linear-gradient(135deg, #4D3817 0%, #17281D 100%)",
                }
          }
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#E5B869] mb-2">
                All Collections
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FAF7F2]">
                All Pure Products
              </h1>
              <p className="mt-3 text-[#D5CEBF] text-sm sm:text-base leading-relaxed font-light">
                Wholesome Pure Chakki Flours and pure organic herbal teas. 100% natural, chemical-free, and dispatches nationwide with Cash on Delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/60 sticky top-20 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-[#1E1510] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:bg-white border border-stone-200/70"
                  }`}
                >
                  All Essentials
                </button>
                <button
                  onClick={() => setSelectedCategory("flours")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "flours"
                      ? "bg-[#4D3817] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:bg-white border border-stone-200/70"
                  }`}
                >
                  Flour
                </button>
                <button
                  onClick={() => setSelectedCategory("teas")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "teas"
                      ? "bg-[#172A1C] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:bg-white border border-stone-200/70"
                  }`}
                >
                  Herbal Teas
                </button>
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search product..."
                    className="w-full pl-9 pr-3 py-2 rounded-full bg-white/80 border border-stone-200/80 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="pl-3.5 pr-8 py-2 rounded-full bg-white/80 border border-stone-200/80 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 transition appearance-none cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid - Borderless Flat Organic Brand Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-transparent p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-stone-800">No products found</h3>
              <p className="text-xs text-stone-500 mt-1">Try resetting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#1E1510] text-[#F6F1E9] text-[11px] font-medium hover:bg-[#8B3A22] transition cursor-pointer uppercase tracking-[0.18em] duration-200 ease-out shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => {
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

                      {/* Dr Nazish Affan vibrant red pill badge */}
                      {discountPercent > 0 && (
                        <span className="absolute top-2.5 right-2.5 z-10 bg-[#DC2626] text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full pointer-events-none shadow-xs tracking-wider">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Text and details below image with Dr Nazish Affan layout */}
                    <div className="mt-4 sm:mt-5 flex flex-col text-center">
                      <Link href={`/product/${product.id}`}>
                        <h2 className="text-sm sm:text-base font-normal text-[#121212] leading-snug line-clamp-2 hover:underline transition-colors tracking-normal">
                          {product.title}
                        </h2>
                      </Link>

                      {/* Price display: crisp dark sale price & subtle crossed-out original */}
                      <div className="mt-1.5 flex items-baseline justify-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-[#121212] tracking-tight">
                          Rs {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs sm:text-sm text-stone-400 line-through font-normal">
                            Rs {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Dr. Nazish Affan Signature Button: 16px radius, 1px dark border, distinct bottom drop-shadow */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="mt-3.5 w-full max-w-[180px] sm:max-w-[200px] mx-auto py-2.5 px-4 rounded-[16px] bg-white border border-[#121212] text-[#121212] hover:bg-stone-50 text-xs sm:text-sm font-normal tracking-wide shadow-[0_4px_6px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
                      >
                        {addedIds[product.id] ? "Added to cart ✓" : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
