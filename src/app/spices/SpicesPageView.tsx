"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { PRODUCTS, Product } from "@/data/products";
import {
  ShoppingBag,
  Check,
  Eye,
  X,
  ChevronRight,
  Truck,
  Award,
  Leaf,
} from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";

export function SpicesPageView() {
  const spiceProducts = PRODUCTS.filter((p) => p.category === "spices");
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
    <div className="min-h-screen bg-[#FAF3EF] text-stone-900 transition-colors duration-700 ease-in-out flex flex-col justify-between">
      <Header isSolid theme="terracotta" />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#FAF3EF]/90 backdrop-blur-xs border-b border-[#ECCDC3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-600">
            <Link href="/" className="hover:text-[#9E3E26] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/products" className="hover:text-[#9E3E26] transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">Cold Stone-Pounded Organic Spices</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-[#731E0D] via-[#5C1607] to-[#400E04] text-white py-14 sm:py-20 border-b border-stone-800 overflow-hidden">
          {/* Subtle Organic Whole Spices Watermark */}
          <BotanicalWatermark
            type="spices"
            className="absolute -top-12 -right-12 w-96 h-96"
            opacity={0.14}
            size={420}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                Zero Sudan Dyes &bull; Zero Lead Chromate
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
                Cold Stone-Pounded Organic Spices
              </h1>
              <p className="mt-3 text-[#FDECE5] text-sm sm:text-base leading-relaxed">
                Hand-pounded in traditional stone mortars without friction heat. Preserves volatile essential oils, natural pigments, and aroma. Tested 90% free of artificial red dyes, chalk powders, and starch fillers.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Cold stone-pounded without friction heat",
                  "Tested zero Sudan red dyes & zero heavy metals",
                  "High natural volatile essential oil retention",
                  "Sealed in UV-proof aroma-lock glass jars",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 text-amber-200"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid Section with Botanical Spices Background Graphics */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          {/* Organic Spices Watermark in Page Background */}
          <BotanicalWatermark
            type="spices"
            className="absolute top-10 right-0 w-[420px] sm:w-[560px] h-[360px] sm:h-[480px] translate-x-16 opacity-35"
            size={560}
          />
          <BotanicalWatermark
            type="spices"
            className="absolute bottom-16 left-0 w-[380px] sm:w-[500px] h-[320px] sm:h-[420px] -translate-x-16 opacity-25"
            size={500}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ECCDC3]">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Pure Stone-Pounded Spices</h2>
                <p className="text-xs text-stone-500">Showing {spiceProducts.length} pure cold-pounded spices</p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-[#9E3E26] hover:text-stone-900 transition flex items-center gap-1"
              >
                <span>View All Store Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {spiceProducts.map((product) => {
                const isAdded = addedIds[product.id];
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-sm border border-[#ECCDC3]/80 hover:border-[#9E3E26]/60 shadow-xs hover:shadow-ambient transition-all duration-300 overflow-hidden"
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
                              : "bg-[#1E1510] hover:bg-[#8D2D1B] text-[#F6F1E9]"
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

        {/* Spice Sourcing & Quality Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-stone-200">
          <div className="bg-white rounded-sm p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-[#8D2D1B]">
                  WHY OUR SPICES ARE DIFFERENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-2">
                  The Danger of Commercial Spices
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Commercial market spices are ground in high-speed pulverizers that exceed 80°C, scorching volatile essential oils and evaporating natural aroma. To cut costs and fake freshness, manufacturers routinely mix toxic artificial red dyes (Sudan Red), lead chromate, chalk powder, and sawdust.
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    "Cold stone-pounded in traditional mortars without heat",
                    "Certified zero artificial food coloring or chemical brighteners",
                    "Aroma-lock glass jars preserve pungency for up to 12 months",
                  ].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-stone-800">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video rounded-sm overflow-hidden bg-stone-50 flex items-center justify-center p-6">
                <Image
                  src="/spices-jar.png"
                  alt="Usman's Pure Spices"
                  fill
                  sizes="400px"
                  className="object-contain p-4"
                />
              </div>
            </div>
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
                    className="w-full py-3 px-4 rounded-md text-sm font-medium bg-[#1E1510] hover:bg-[#8D2D1B] text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-ambient text-center"
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
