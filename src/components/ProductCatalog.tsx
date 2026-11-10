"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Check,
  Eye,
  X,
  ArrowRight,
} from "lucide-react";

import { useStoreData } from "@/context/StoreDataContext";
import { useCart } from "@/context/CartContext";

export interface FeaturedPackOption {
  size: string;
  price: number;
  originalPrice: number;
}

export interface FeaturedProductItem {
  id: string;
  title: string;
  category: "flours" | "teas";
  categoryBadge: string;
  highlight: string;
  image: string;
  detailUrl: string;
  checkoutUrl: string;
  packOptions: FeaturedPackOption[];
  description: string;
}

export const FEATURED_5_PRODUCTS: FeaturedProductItem[] = [
  // 1. PURE CHAKKI FLOURS (5 Products)
  {
    id: "prod-1",
    title: "Basic – Flour For General Health",
    category: "flours",
    categoryBadge: "Flour",
    highlight: "Natural Everyday Whole Wheat Flour",
    image: "/images/products/prod-1.jpg",
    detailUrl: "/product/prod-1",
    checkoutUrl: "/checkout?product=prod-1",
    description:
      "natural everyday whole wheat flour. Rich in fiber and essential nutrients for better digestion and all-day energy. Free from artificial chemicals.",
    packOptions: [
      { size: "5kg", price: 1200, originalPrice: 1500 },
      { size: "10kg", price: 2350, originalPrice: 2950 },
    ],
  },
  {
    id: "prod-4",
    title: "FENUGREEK Plus – Flour for Good Diabetic Control",
    category: "flours",
    categoryBadge: "Flour",
    highlight: "Natural Diabetic Support & Blood Sugar Control",
    image: "/images/products/prod-4.jpg",
    detailUrl: "/product/prod-4",
    checkoutUrl: "/checkout?product=prod-4",
    description:
      "Specially formulated for diabetic patients. Contains natural ingredients that help control blood sugar levels and promote a healthy lifestyle.",
    packOptions: [
      { size: "5kg", price: 1200, originalPrice: 1500 },
      { size: "10kg", price: 2350, originalPrice: 2950 },
    ],
  },
  {
    id: "prod-3",
    title: "Fat2Fuel Advance Multigrain Flour",
    category: "flours",
    categoryBadge: "Flour",
    highlight: "Weight Loss & Metabolism Boost",
    image: "/images/products/prod-3.jpg",
    detailUrl: "/product/prod-3",
    checkoutUrl: "/checkout?product=prod-3",
    description:
      "Excellent multigrain flour for weight loss and fitness maintenance. Boosts metabolism and helps convert body fat into energy to keep you active.",
    packOptions: [
      { size: "5kg", price: 1150, originalPrice: 1500 },
      { size: "10kg", price: 2250, originalPrice: 2900 },
    ],
  },
  {
    id: "prod-5",
    title: "Giggly Grains - Multigrain Blend",
    category: "flours",
    categoryBadge: "Flour",
    highlight: "Immunity Boost for Kids (Rich in Fiber & Nutrients)",
    image: "/images/products/prod-5.jpg",
    detailUrl: "/product/prod-5",
    checkoutUrl: "/checkout?product=prod-5",
    description:
      "A wholesome multigrain blend specially formulated for kids' healthy growth and strong immunity. Rich in dietary fiber, natural calcium, and essential nutrients.",
    packOptions: [
      { size: "2 lbs", price: 1100, originalPrice: 1400 },
      { size: "4 lbs", price: 2150, originalPrice: 2750 },
    ],
  },
  {
    id: "prod-6",
    title: "Nutra Prime - 100% Gluten Free Flour",
    category: "flours",
    categoryBadge: "Flour",
    highlight: "100% Gluten Free (Rich in Fiber & Nutrients)",
    image: "/images/products/prod-6.jpg",
    detailUrl: "/product/prod-6",
    checkoutUrl: "/checkout?product=prod-6",
    description:
      "Specially crafted 100% gluten-free multigrain flour packed with essential fiber, natural vitamins, and minerals. Safe and wholesome for sensitive diets.",
    packOptions: [
      { size: "2 lbs", price: 1350, originalPrice: 1650 },
      { size: "4 lbs", price: 2600, originalPrice: 3200 },
    ],
  },

  // 2. ORGANIC HERBAL TEAS (5 Products)
  {
    id: "prod-2",
    title: "Chamomile Tea",
    category: "teas",
    categoryBadge: "Herbal Tea",
    highlight: "For Restful Sleep & Stress Relief",
    image: "/images/products/prod-2.jpg",
    detailUrl: "/product/prod-2",
    checkoutUrl: "/checkout?product=prod-2",
    description:
      "Enjoy a calming cup of pure Chamomile tea. Perfect for relaxing your mind, reducing anxiety, and promoting deep, restful sleep.",
    packOptions: [
      { size: "50g", price: 800, originalPrice: 1000 },
      { size: "100g", price: 1500, originalPrice: 1900 },
    ],
  },
  {
    id: "prod-8",
    title: "Olive Leaf Tea",
    category: "teas",
    categoryBadge: "Herbal Tea",
    highlight: "Immunity & Heart Health",
    image: "/images/products/prod-8.jpg",
    detailUrl: "/product/prod-8",
    checkoutUrl: "/checkout?product=prod-8",
    description:
      "Rich in natural antioxidants, this tea supports cardiovascular health, boosts the immune system, and helps you stay active naturally.",
    packOptions: [
      { size: "50g", price: 850, originalPrice: 1100 },
      { size: "100g", price: 1600, originalPrice: 2100 },
    ],
  },
  {
    id: "prod-9",
    title: "Oregano Tea",
    category: "teas",
    categoryBadge: "Herbal Tea",
    highlight: "Digestive & Respiratory Support",
    image: "/images/products/prod-9.jpg",
    detailUrl: "/product/prod-9",
    checkoutUrl: "/checkout?product=prod-9",
    description:
      "A traditional herbal remedy excellent for soothing digestion, clearing respiratory pathways, and providing natural antibacterial benefits.",
    packOptions: [
      { size: "50g", price: 850, originalPrice: 1100 },
      { size: "100g", price: 1600, originalPrice: 2100 },
    ],
  },
  {
    id: "prod-10",
    title: "Persian Rose Delight",
    category: "teas",
    categoryBadge: "Herbal Tea",
    highlight: "Mood Booster & Glowing Skin",
    image: "/images/products/prod-10.jpg",
    detailUrl: "/product/prod-10",
    checkoutUrl: "/checkout?product=prod-10",
    description:
      "A fragrant and luxurious rose tea blend that helps relieve stress, uplifts your mood, and promotes healthy, radiant skin.",
    packOptions: [
      { size: "50g", price: 950, originalPrice: 1200 },
      { size: "100g", price: 1800, originalPrice: 2300 },
    ],
  },
  {
    id: "prod-11",
    title: "Rosella Tea",
    category: "teas",
    categoryBadge: "Herbal Tea",
    highlight: "Rich in Vitamin C & Antioxidants",
    image: "/images/products/prod-11.jpg",
    detailUrl: "/product/prod-11",
    checkoutUrl: "/checkout?product=prod-11",
    description:
      "A tart and refreshing herbal drink packed with Vitamin C. Great for supporting healthy blood pressure and naturally detoxifying the body.",
    packOptions: [
      { size: "50g", price: 850, originalPrice: 1100 },
      { size: "100g", price: 1600, originalPrice: 2100 },
    ],
  },
];

// Preserved for backwards compatibility
export const HOMEPAGE_3_PRODUCTS: FeaturedProductItem[] = [
  FEATURED_5_PRODUCTS[0],
  FEATURED_5_PRODUCTS[1],
  FEATURED_5_PRODUCTS[5],
];

export function ProductCatalog() {
  const { addItem, openCart } = useCart();
  const { products: storeProducts } = useStoreData();

  // Category filter state: "all" displays all storefront products front and center
  const [categoryFilter, setCategoryFilter] = useState<"all" | "flours" | "teas">("all");

  // Sync with store database if updated
  const allProductsList = useMemo(() => {
    return FEATURED_5_PRODUCTS.map((prod) => {
      const match = storeProducts?.find((p) => p.id === prod.id);
      if (!match) return prod;
      return {
        ...prod,
        title: match.title || prod.title,
        image: match.image || prod.image,
      };
    });
  }, [storeProducts]);

  // Dynamic pack selection state for all catalog products
  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    FEATURED_5_PRODUCTS.forEach((p) => {
      if (p.packOptions && p.packOptions.length > 0) {
        initial[p.id] = p.packOptions[0].size;
      }
    });
    return initial;
  });

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<FeaturedProductItem | null>(null);

  const handleAddToCart = (product: FeaturedProductItem, option: FeaturedPackOption, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    addItem(
      {
        id: product.id,
        name: product.title,
        pack: option.size,
        price: option.price,
        image: product.image,
      },
      1
    );
    openCart();

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Render all storefront products front and center on the main homepage
  const displayedProducts = useMemo(() => {
    if (categoryFilter === "flours") {
      return allProductsList.filter((p) => p.category === "flours");
    }
    if (categoryFilter === "teas") {
      return allProductsList.filter((p) => p.category === "teas");
    }
    return allProductsList;
  }, [allProductsList, categoryFilter]);

  return (
    <section id="featured-products" className="relative py-12 sm:py-20 bg-white transition-colors duration-700 ease-in-out overflow-hidden">
      {/* Pure clean background with strictly zero leaf watermarks or patterns behind products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        
        {/* Editorial Section Heading with Brand Logo opposite title - Preserved completely */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-2 font-sans">
              Artisanal Milling
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-serif text-[#2C2A29] leading-snug font-bold">
              Freshly Milled Whole Wheat Flour &amp; Multi-Grain Blends
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 max-w-sm shrink-0">
            <Link
              href="/"
              className="inline-block transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
              aria-label="Usman's Pure Products"
            >
              <Image
                src="/logo.png"
                alt="Usman's Pure Products"
                width={240}
                height={68}
                className="w-auto h-10 sm:h-12 md:h-14 object-contain object-left md:object-right"
                priority
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#5E5852] leading-relaxed md:text-right">
              Pure milled chakki flours and whole-leaf herbal infusions &mdash; made slowly, the way nature intended.
            </p>
          </div>
        </div>

        {/* Clean Luxury Category Filter Bar & Direct Store Link */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4 mb-6 sm:mb-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setCategoryFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                categoryFilter === "all"
                  ? "bg-[#2C2A29] text-[#FAF9F5] shadow-xs"
                  : "bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50"
              }`}
            >
              All Products ({allProductsList.length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("flours")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                categoryFilter === "flours"
                  ? "bg-[#4A3525] text-white shadow-xs"
                  : "bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50"
              }`}
            >
              Stone-Ground Flours ({allProductsList.filter((p) => p.category === "flours").length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("teas")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                categoryFilter === "teas"
                  ? "bg-[#145330] text-white shadow-xs"
                  : "bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50"
              }`}
            >
              Organic Herbal Teas ({allProductsList.filter((p) => p.category === "teas").length})
            </button>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B3A22] hover:text-[#2C2A29] transition-colors self-start sm:self-auto shrink-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </div>

        {/* Borderless Minimalist Product Grid - Floating Content Directly on Pure White Canvas */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {displayedProducts.map((product) => {
            const defaultOption = product.packOptions?.[0] || { price: 0, originalPrice: 0 };
            const price = defaultOption.price;
            const originalPrice = defaultOption.originalPrice;
            const discountPercent = originalPrice > price
              ? Math.round(((originalPrice - price) / originalPrice) * 100)
              : 0;

            return (
              <article
                key={product.id}
                id={product.id}
                className="group flex flex-col justify-start bg-transparent border-0 shadow-none p-0"
              >
                {/* 1. Soft Mint-Green Rounded Square Container */}
                <div className="relative aspect-square w-full bg-[#EBF4EE] rounded-2xl sm:rounded-3xl overflow-hidden p-3 sm:p-4 flex items-center justify-center">
                  <Link
                    href={product.detailUrl}
                    className="absolute inset-0 z-0 flex items-center justify-center"
                    aria-label={product.title}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={85}
                      loading="lazy"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* 2. Tiny Minimalist Red Circular Pill Badge at Top-Right */}
                  {discountPercent > 0 && (
                    <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] sm:text-[11px] font-bold tracking-tight shadow-xs pointer-events-none">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* 3. Below Image: ONLY Product Title (clean, thin font) and Price */}
                <div className="pt-2.5 sm:pt-3 flex flex-col text-left">
                  <Link href={product.detailUrl}>
                    <h3 className="font-sans text-xs sm:text-sm font-normal text-[#2C2A29] leading-snug line-clamp-2 hover:text-[#145330] transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    {originalPrice > price && (
                      <span className="text-[11px] sm:text-xs text-stone-400 line-through font-normal">
                        Rs {originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-medium text-black">
                      Rs {price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA to Dedicated Shop Page */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-3">
          <Link
            href="/products"
            className="group cursor-pointer inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#2C2A29] hover:bg-[#4A3525] active:scale-95 text-[#FAF9F5] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs"
          >
            <span>Explore All Products &amp; Bundles</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
          <p className="text-xs text-[#5E5852] leading-relaxed text-center">
            Showing all {allProductsList.length} pure staples (5 Pure Flours &bull; 5 Herbal Teas) &bull; 100% Khalis &amp; Freshly Milled
          </p>
        </div>
      </div>

      {/* Quick View Modal with Pure White Image Container */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-8 relative shadow-ambient animate-in fade-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="sticky top-0 float-right -mt-2 -mr-2 sm:mt-0 sm:mr-0 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer z-50 shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square w-full rounded-xl bg-white overflow-hidden p-2 m-0 flex items-center justify-center border border-stone-100">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  sizes="320px"
                  quality={85}
                  loading="lazy"
                  className="w-full h-full object-contain p-0 m-0"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.18em] bg-white text-[#8B3A22] shadow-2xs">
                  Sale
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B3A22]">
                  {quickViewProduct.categoryBadge}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C2A29] mt-1">
                  {quickViewProduct.title}
                </h3>

                <div className="text-xs text-[#145330] font-semibold mt-1">
                  ✓ {quickViewProduct.highlight}
                </div>

                {/* Pack Selection in Modal */}
                <div className="mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Select Packaging:
                  </div>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.packOptions.map((opt) => (
                      <button
                        key={opt.size}
                        type="button"
                        onClick={() =>
                          setSelectedPacks((prev) => ({ ...prev, [quickViewProduct.id]: opt.size }))
                        }
                        className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                          (selectedPacks[quickViewProduct.id] || quickViewProduct.packOptions[0].size) === opt.size
                            ? "bg-[#4A3525] text-white"
                            : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        {opt.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modal Price */}
                {(() => {
                  const size = selectedPacks[quickViewProduct.id] || quickViewProduct.packOptions[0].size;
                  const opt = quickViewProduct.packOptions.find((o) => o.size === size) || quickViewProduct.packOptions[0];
                  return (
                    <div className="flex items-baseline gap-3 mt-4">
                      <span className="text-2xl font-bold text-[#2C2A29]">
                        Rs {opt.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-stone-400 line-through">
                        Rs {opt.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  );
                })()}

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      const size = selectedPacks[quickViewProduct.id] || quickViewProduct.packOptions[0].size;
                      const opt = quickViewProduct.packOptions.find((o) => o.size === size) || quickViewProduct.packOptions[0];
                      handleAddToCart(quickViewProduct, opt);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#2C2A29] hover:bg-[#4A3525] text-[#FAF9F5] flex items-center justify-center gap-2 transition cursor-pointer text-center uppercase tracking-wider duration-200 ease-out active:scale-95 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  <Link
                    href={quickViewProduct.detailUrl}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition text-center bg-transparent border border-stone-300 text-[#2C2A29] hover:bg-stone-100 uppercase tracking-wider duration-200 ease-out active:scale-95"
                  >
                    Full Details &amp; Nutritional Facts &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
