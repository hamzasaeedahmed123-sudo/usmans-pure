"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const [selectedCategory, setSelectedCategory] = useState<"all" | "flours" | "teas" | "spices">("all");
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
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200">
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
              : selectedCategory === "spices"
              ? { backgroundColor: "#3D1614" }
              : {
                  background: "linear-gradient(135deg, #4D3817 0%, #17281D 50%, #3D1815 100%)",
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
                Wholesome stone-ground chakki flours, pure organic herbal teas, and cold stone-pounded royal spices. 100% natural, chemical-free, and dispatches nationwide with Cash on Delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border-b border-stone-200 sticky top-20 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-[#1E1510] text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setSelectedCategory("flours")}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "flours"
                      ? "bg-[#4D3817] text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Diet &amp; Chakki Flours
                </button>
                <button
                  onClick={() => setSelectedCategory("teas")}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "teas"
                      ? "bg-[#172A1C] text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Organic Herbal Teas
                </button>
                <button
                  onClick={() => setSelectedCategory("spices")}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "spices"
                      ? "bg-[#3D1614] text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Pure Spices
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
                    className="w-full pl-9 pr-3 py-2 rounded-md bg-stone-50 border border-stone-200 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 transition"
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
                    className="pl-3 pr-8 py-2 rounded-md bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 transition appearance-none cursor-pointer"
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

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-sm p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-stone-800">No products found</h3>
              <p className="text-xs text-stone-500 mt-1">Try resetting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2.5 rounded-[3px] bg-[#1E1510] text-[#F6F1E9] text-[11px] font-medium hover:bg-[#8B3A22] transition cursor-pointer uppercase tracking-[0.18em] duration-200 ease-out"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product) => {
                const isAdded = addedIds[product.id];
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-sm shadow-xs hover:shadow-ambient transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Box */}
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

                    {/* Info */}
                    <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                          {product.weight}
                        </div>
                        <Link href={`/product/${product.id}`}>
                          <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900 leading-snug line-clamp-2 hover:text-amber-800 transition min-h-[2.75rem]">
                            {product.title}
                          </h2>
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
