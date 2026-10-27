"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { ChakkiProcessStory } from "@/components/ChakkiProcessStory";
import { PRODUCTS, Product } from "@/data/products";
import {
  ShoppingBag,
  Check,
  Eye,
  X,
  ChevronRight,
  Truck,
} from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";

export function FlourPageView() {
  const flourProducts = PRODUCTS.filter((p) => p.category === "flours");
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
    <div className="min-h-screen bg-[#F7F3EB] text-stone-900 transition-colors duration-700 ease-in-out flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#F7F3EB]/90 backdrop-blur-xs border-b border-[#E8DFD1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-600">
            <Link href="/" className="hover:text-[#8C6D46] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/products" className="hover:text-[#8C6D46] transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">Stone-Ground Chakki Flours</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Banner */}
        <div className="relative bg-[#1E1510] text-white py-14 sm:py-20 border-b border-stone-800 overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute -top-12 -right-12 w-96 h-96"
            opacity={0.14}
            size={420}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                90% Stone-Ground Whole Grain
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
                Stone-Ground Chakki Flours
              </h1>
              <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
                Milled slowly under 40°C in natural stone chakkis to preserve living vitamins, natural wheat germ, and dietary fiber. Zero maida mixing, zero chemical bleaching agents, and zero preservatives.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Cold stone-milling at <40°C",
                  "Formulated for Weight Loss & Diabetic Glucose Control",
                  "Preserves 90% Natural Dietary Fiber",
                  "Pliable, soft rotis that stay fresh all day",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-md bg-white/10 border border-white/15 flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid Section */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-10 right-0 w-[420px] sm:w-[560px] h-[360px] sm:h-[480px] translate-x-16 opacity-35"
            size={560}
          />
          <BotanicalWatermark
            type="wheat"
            className="absolute bottom-16 left-0 w-[380px] sm:w-[500px] h-[320px] sm:h-[420px] -translate-x-16 opacity-25 -scale-x-100"
            size={500}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DFD1]">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900">Specialized Flour Blends</h2>
                <p className="text-xs text-stone-500">Showing {flourProducts.length} whole grain products</p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#8C6D46] hover:text-stone-900 transition flex items-center gap-1"
              >
                <span>View All Store Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {flourProducts.map((product) => {
                const isAdded = addedIds[product.id];
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-sm border border-[#E8DFD1]/80 hover:border-[#8C6D46]/60 shadow-xs hover:shadow-ambient transition-all duration-300 overflow-hidden"
                  >
                    <BotanicalWatermark
                      type="wheat"
                      className="absolute -bottom-4 -right-4 w-44 h-44 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                      opacity={0.35}
                      size={200}
                    />

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

                    <div className="p-3 md:p-5 flex-1 flex flex-col justify-between relative z-10">
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
        </section>

        {/* Traditional Milling Comparison */}
        <ChakkiProcessStory />

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
      </main>

      <StoreFooter />
    </div>
  );
}
