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

// Hardcoded exactly 3 products for homepage showcase: 2 Flour products + 1 Herbal Tea
export const HOMEPAGE_3_PRODUCTS: FeaturedProductItem[] = [
  FEATURED_5_PRODUCTS[0], // Basic Whole Wheat Flour (Flour)
  FEATURED_5_PRODUCTS[1], // FENUGREEK Plus (Flour)
  FEATURED_5_PRODUCTS[2], // Chamomile Tea (Herbal Tea)
];

export function ProductCatalog() {
  const { addItem, openCart } = useCart();

  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    "prod-1": "5kg",
    "prod-4": "5kg",
    "prod-2": "50g",
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

  // Strictly hardcoded to exactly 3 products: 2 Flour products and 1 Herbal Tea
  const displayedProducts = HOMEPAGE_3_PRODUCTS;

  return (
    <section id="featured-products" className="relative py-14 sm:py-24 bg-[#FAF9F5] transition-colors duration-700 ease-in-out overflow-hidden">
      {/* Organic Botanical Watermark Accents in Section Background */}
      <BotanicalWatermark
        type="wheat"
        className="absolute top-10 -left-12 w-[420px] h-[420px]"
        opacity={0.16}
        size={420}
      />
      <BotanicalWatermark
        type="herbal"
        className="absolute bottom-10 -right-12 w-[420px] h-[420px]"
        opacity={0.18}
        size={420}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* Editorial Section Heading with Brand Logo opposite title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-2">
              Artisanal Milling
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-serif text-[#2C2A29] leading-snug">
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

        {/* Clean Header Bar with Direct Link to Dedicated Shop Page */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-200/70 pb-4 mb-6 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#145330] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-[#2C2A29] uppercase tracking-wider">
              Featured Staples (2 Pure Flours &bull; 1 Herbal Tea)
            </span>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B3A22] hover:text-[#2C2A29] transition-colors self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </div>

        {/* Product Responsive Grid - Strict 2 Columns on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-2 gap-3 p-3 sm:p-0 sm:gap-6 md:grid-cols-3">
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
                  {/* Edge-to-edge floating layout with soft rounded corners */}
                  <div className="relative aspect-[4/5] w-full bg-[#F5F2EB] overflow-hidden rounded-2xl p-0">
                    <Link href={product.detailUrl} className="absolute inset-0" aria-label={product.title}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B3A22] bg-[#FAF9F5]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full pointer-events-none shadow-2xs">
                      Sale
                    </span>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden sm:flex absolute bottom-0 inset-x-0 py-3 bg-[#2C2A29]/90 text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.16em] items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out cursor-pointer"
                    >
                      <Eye className="w-4 h-4" strokeWidth={1.5} /> Quick View
                    </button>
                  </div>

                  {/* Text Container with Luxury Typography */}
                  <div className="pt-3 sm:pt-4 flex flex-col">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B3A22] truncate block">
                      {product.categoryBadge}
                    </span>

                    <Link href={product.detailUrl}>
                      <h3 className="mt-1 font-serif text-sm sm:text-base md:text-lg font-bold text-[#2C2A29] leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] group-hover:text-[#8B3A22] transition-colors duration-200">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Clean 1-line everyday benefit */}
                    <p className="mt-1 text-xs sm:text-sm text-[#5E5852] font-normal leading-relaxed line-clamp-1">
                      {product.highlight}
                    </p>

                    {/* Pack size — minimal touch-friendly toggles */}
                    <div className="mt-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                      {product.packOptions.map((opt) => (
                        <button
                          key={opt.size}
                          onClick={() =>
                            setSelectedPacks((prev) => ({ ...prev, [product.id]: opt.size }))
                          }
                          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-transform active:scale-95 duration-150 cursor-pointer shrink-0 ${
                            currentSize === opt.size
                              ? "bg-[#4A3525] text-white shadow-xs font-bold"
                              : "bg-[#F5F2EB] text-[#2C2A29] hover:bg-[#EFEBE4]"
                          }`}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>

                    {/* Price & Strikethrough */}
                    <div className="mt-2.5 sm:mt-3 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                      <span className="text-base sm:text-xl font-extrabold font-sans text-[#2C2A29]">
                        Rs {currentOption.price.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm font-normal font-sans text-stone-400 line-through ml-1">
                        Rs {currentOption.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prominent Minimalist Buttons with Active Touch Scale */}
                <div className="mt-3 sm:mt-4 grid grid-cols-1 min-[440px]:grid-cols-2 gap-2">
                  <Link
                    href={product.detailUrl || "/products"}
                    className="py-2 sm:py-2.5 px-3 rounded-xl border border-stone-200/90 hover:border-stone-400 bg-transparent hover:bg-[#F5F2EB] text-[#2C2A29] text-xs sm:text-sm font-semibold transition-transform active:scale-95 duration-150 cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5E5852]" />
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(product, currentOption, e)}
                    className={`py-2.5 sm:py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-1.5 transition-transform active:scale-95 duration-150 cursor-pointer shadow-xs ${
                      isAdded
                        ? "bg-[#145330] text-white"
                        : "bg-[#2C2A29] hover:bg-[#4A3525] text-[#FAF9F5]"
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

        {/* Bottom CTA to Dedicated Shop Page */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-3">
          <Link
            href="/products"
            className="group cursor-pointer inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#2C2A29] hover:bg-[#4A3525] active:scale-95 text-[#FAF9F5] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
          <p className="text-xs text-[#5E5852] leading-relaxed text-center">
            Showing 3 essentials (2 Pure Flours &bull; 1 Herbal Tea) &bull; Explore full catalog on our shop page
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
                  quality={85}
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
