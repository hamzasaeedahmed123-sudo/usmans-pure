"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Check,
  Eye,
  X,
  ArrowRight,
} from "lucide-react";

import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { useAmbientTheme } from "@/components/theme/AmbientThemeWrapper";
import { useCart } from "@/context/CartContext";

interface FeaturedPackOption {
  size: string;
  price: number;
  originalPrice: number;
}

interface FeaturedProductItem {
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

interface ProductCatalogProps {
  activeFilter?: "all" | "flours" | "teas";
  setActiveFilter?: (filter: "all" | "flours" | "teas") => void;
}

export function ProductCatalog({ activeFilter: externalFilter, setActiveFilter: externalSetFilter }: ProductCatalogProps = {}) {
  const { addItem, openCart } = useCart();
  const [internalFilter, setInternalFilter] = useState<"all" | "flours" | "teas">("all");
  const currentFilter = externalFilter ?? internalFilter;
  const setFilter = externalSetFilter ?? setInternalFilter;
  const { setActiveTheme } = useAmbientTheme();

  const handleFilterChange = (filter: "all" | "flours" | "teas") => {
    setFilter(filter);
    if (filter === "flours") setActiveTheme("flour");
    else if (filter === "teas") setActiveTheme("herbals");
    else setActiveTheme("default");
  };

  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    "prod-1": "5kg",
    "prod-4": "5kg",
    "prod-3": "5kg",
    "prod-2": "50g",
    "prod-7": "50g",
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

  const displayedProducts =
    currentFilter === "all"
      ? FEATURED_5_PRODUCTS
      : FEATURED_5_PRODUCTS.filter((p) => p.category === currentFilter);

  return (
    <section id="featured-products" className="relative py-20 sm:py-28 transition-colors duration-700 ease-in-out overflow-hidden">
      {/* Organic Botanical Watermark Accents in Section Background */}
      <BotanicalWatermark
        type="wheat"
        className="absolute top-10 -left-12 w-[420px] h-[420px]"
        opacity={0.22}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute bottom-10 -right-12 w-[420px] h-[420px]"
        opacity={0.28}
        size={420}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Editorial Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <span className="eyebrow">Handcrafted Organic Essentials</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1510] leading-[1.1]">
              Freshly Milled Whole Wheat Flour &amp; Multi-Grain Blends
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[#6B5D52] leading-relaxed">
            Pure milled chakki flours and whole-leaf herbal infusions &mdash; made slowly, the way nature intended.
          </p>
        </div>

        {/* Category Ambient Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {[
            { id: "all", label: "All Essentials" },
            { id: "flours", label: "Pure Chakki Flours" },
            { id: "teas", label: "Herbal Teas" },
          ].map((tab) => {
            const isSelected = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border whitespace-nowrap ${
                  isSelected
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : "bg-white/80 hover:bg-white text-stone-700 border-stone-200/80 hover:border-stone-400"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 gap-y-8 md:gap-y-14">
          {displayedProducts.map((product) => {
            const isAdded = addedIds[product.id];
            const currentSize = selectedPacks[product.id] || product.packOptions[0].size;
            const currentOption =
              product.packOptions.find((o) => o.size === currentSize) || product.packOptions[0];
            const themeCategory = product.category === "flours" ? "flour" : "herbals";

            return (
              <article
                key={product.id}
                id={product.id}
                data-ambient-theme={themeCategory}
                className="group relative flex flex-col justify-between"
              >
                <div>
                  {/* Full natural packaging shoot photograph */}
                  <div className="relative aspect-[4/5] w-full bg-[#EFEAE2] overflow-hidden rounded-xl p-0">
                    <Link href={product.detailUrl} className="absolute inset-0" aria-label={product.title}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        quality={100}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-xs font-bold uppercase tracking-wider text-[#8B3A22] bg-[#F6F1E9]/95 backdrop-blur-xs px-2 py-0.5 rounded-sm pointer-events-none shadow-2xs">
                      Sale
                    </span>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden sm:flex absolute bottom-0 inset-x-0 py-3 bg-[#1E1510]/90 text-[#F6F1E9] text-xs font-bold uppercase tracking-[0.16em] items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out cursor-pointer"
                    >
                      <Eye className="w-4 h-4" strokeWidth={1.5} /> Quick View
                    </button>
                  </div>

                  {/* Text */}
                  <div className="pt-2.5 sm:pt-4 flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B3A22] truncate block">{product.categoryBadge}</span>

                    <Link href={product.detailUrl}>
                      <h3 className="mt-1 font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-[#8B3A22] transition-colors duration-200">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Clean 1-line everyday benefit */}
                    <p className="mt-1 text-xs sm:text-sm text-stone-700 font-medium line-clamp-1">{product.highlight}</p>

                    {/* Pack size — clear touch-friendly toggles */}
                    <div className="mt-2.5 flex items-center gap-2 overflow-x-auto">
                      {product.packOptions.map((opt) => (
                        <button
                          key={opt.size}
                          onClick={() =>
                            setSelectedPacks((prev) => ({ ...prev, [product.id]: opt.size }))
                          }
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors duration-200 cursor-pointer border ${
                            currentSize === opt.size
                              ? "bg-stone-900 text-white border-stone-900"
                              : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>

                    {/* Price & Strikethrough */}
                    <div className="mt-2.5 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-lg sm:text-xl font-extrabold font-sans text-stone-900">
                        Rs {currentOption.price.toLocaleString()}
                      </span>
                      <span className="text-sm font-normal font-sans text-stone-500 line-through ml-1.5">
                        Rs {currentOption.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <button
                    onClick={(e) => handleAddToCart(product, currentOption, e)}
                    className={`w-full py-3 px-3 text-sm font-bold tracking-wide rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-ambient ${
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
              </article>
            );
          })}
        </div>

        {/* View All Products */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <Link href="/products" className="btn-lux group">
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          <p className="text-xs text-[#6B5D52]">
            10 pure milled flours &amp; herbal teas
          </p>
        </div>
      </div>

      {/* Quick View Modal */}
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
              <div className="relative aspect-square w-full rounded-xl bg-stone-100 overflow-hidden p-0 m-0 flex items-center justify-center">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  sizes="320px"
                  quality={100}
                  loading="lazy"
                  className="w-full h-full object-cover p-0 m-0"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] text-xs font-medium uppercase tracking-[0.18em] bg-[#F6F1E9]/95 text-[#8B3A22] backdrop-blur-xs">
                  Sale
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  {quickViewProduct.categoryBadge}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                  {quickViewProduct.title}
                </h3>

                <div className="text-xs text-emerald-800 font-medium mt-1">
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
                        onClick={() =>
                          setSelectedPacks((prev) => ({ ...prev, [quickViewProduct.id]: opt.size }))
                        }
                        className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                          (selectedPacks[quickViewProduct.id] || quickViewProduct.packOptions[0].size) === opt.size
                            ? "bg-[#1E1510] text-white"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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
                      <span className="text-2xl font-bold text-stone-900">
                        ₨ {opt.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-stone-400 line-through">
                        ₨ {opt.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  );
                })()}

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      const size = selectedPacks[quickViewProduct.id] || quickViewProduct.packOptions[0].size;
                      const opt = quickViewProduct.packOptions.find((o) => o.size === size) || quickViewProduct.packOptions[0];
                      handleAddToCart(quickViewProduct, opt);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 px-4 rounded-[3px] text-[11px] font-medium bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] flex items-center justify-center gap-2 transition cursor-pointer text-center uppercase tracking-[0.18em] duration-200 ease-out"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Basket
                  </button>

                  <Link
                    href={quickViewProduct.detailUrl}
                    className="w-full py-2.5 px-3 rounded-[3px] text-[11px] font-medium flex items-center justify-center gap-1 transition text-center bg-transparent border border-[#1E1510]/25 text-[#1E1510] hover:border-[#1E1510] hover:bg-[#1E1510] hover:text-[#F6F1E9] uppercase tracking-[0.18em] transition-colors duration-200 ease-out"
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
