"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { PRODUCTS, Product } from "@/data/products";
import {
  ShoppingBag,
  Check,
  ChevronRight,
  Truck,
  ShieldCheck,
  Star,
  Award,
  Wheat,
  CheckCircle2,
  Plus,
  Minus,
  PenLine,
  X,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";
import { useStoreData } from "@/context/StoreDataContext";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface ProductDetailViewProps {
  id: string;
}

export function ProductDetailView({ id }: ProductDetailViewProps) {
  const { addItem, openCart } = useCart();
  const { products: storeProducts, reviews, addReview } = useStoreData();
  const product = storeProducts.find((p) => p.id === id) || PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState<"standard" | "large">("standard");
  const [isAdded, setIsAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("overview");

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [revName, setRevName] = useState("");
  const [revCity, setRevCity] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState("");
  const [revSuccess, setRevSuccess] = useState(false);
  const [revError, setRevError] = useState<string | null>(null);

  // Filter published reviews matching product
  const publishedReviews = reviews.filter((r) => r.status === "Published");
  const productSpecificReviews = publishedReviews.filter(
    (r) =>
      r.product.toLowerCase().includes(product.title.toLowerCase()) ||
      product.title.toLowerCase().includes(r.product.toLowerCase())
  );
  const reviewsToDisplay =
    productSpecificReviews.length > 0 ? productSpecificReviews : publishedReviews.slice(0, 4);

  const handleWriteReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revText.trim()) {
      setRevError("Please enter your name and review message.");
      return;
    }
    setRevError(null);
    addReview({
      name: revName.trim(),
      city: revCity.trim() || "Pakistan",
      product: product.title,
      rating: revRating,
      review: revText.trim(),
      verified: false,
      status: "Pending",
    });
    setRevSuccess(true);
    setTimeout(() => {
      setRevSuccess(false);
      setIsReviewModalOpen(false);
      setRevName("");
      setRevCity("");
      setRevText("");
    }, 2200);
  };

  const toggleSection = (sec: string) => {
    setOpenSection((prev) => (prev === sec ? null : sec));
  };

  const packMultiplier = selectedPack === "large" ? 1.85 : 1;
  const unitPrice = Math.round(product.price * packMultiplier);
  const originalUnitPrice = Math.round(product.originalPrice * packMultiplier);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);
    const packLabel = selectedPack === "large" ? "Family Double Pack" : `Standard Pack (${product.weight})`;
    addItem(
      {
        id: product.id,
        name: product.title,
        pack: packLabel,
        price: unitPrice,
        image: product.image,
      },
      quantity
    );
    openCart();
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between selection:bg-[#8B3A22]/20 selection:text-stone-900">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-stone-900 transition font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link href="/products" className="hover:text-stone-900 transition font-medium">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link
              href={
                product.category === "flours"
                  ? "/category/flours"
                  : product.category === "teas"
                  ? "/category/teas"
                  : "/category/spices"
              }
              className="hover:text-stone-900 transition font-medium"
            >
              {product.categoryLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="font-semibold text-stone-900 truncate">{product.title}</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Product Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-white rounded-md shadow-xs border border-stone-200/80 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Photograph Container */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-md bg-[#FAF7F2] overflow-hidden flex items-center justify-center border border-stone-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-contain p-4 hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] bg-[#FAF7F2]/95 backdrop-blur-xs text-[#8B3A22] border border-[#8B3A22]/20 shadow-xs">
                    Sale &bull; 100% Pure
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-stone-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Zero Maida &amp; Fillers
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Wheat className="w-4 h-4 text-amber-700" strokeWidth={1.75} />
                    Stone-Ground
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-stone-700" />
                    0% Preservatives
                  </span>
                </div>
              </div>

              {/* Right Product Controls & Clear Typography */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B3A22]">
                      {product.categoryLabel}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock &bull; Fresh Batch
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-stone-900 tracking-tight leading-snug">
                    {product.title}
                  </h1>

                  {/* Rating Strip */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-stone-800">
                      {product.rating} &bull; {product.reviewCount} Verified Household Reviews
                    </span>
                  </div>

                  {/* Price Row */}
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-stone-900">
                      ₨ {unitPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-stone-400 line-through">
                      ₨ {originalUnitPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800">
                      Save ₨ {(originalUnitPrice - unitPrice).toLocaleString()}
                    </span>
                  </div>

                  {/* Body Copy */}
                  <p className="mt-4 text-base md:text-lg text-stone-700 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Benefits Checklist */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm font-medium text-stone-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pack Selector */}
                  <div className="mt-6 pt-6 border-t border-stone-200">
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-stone-800 mb-3">
                      Select Packaging Format:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                      <button
                        onClick={() => setSelectedPack("standard")}
                        className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                          selectedPack === "standard"
                            ? "border-stone-900 bg-[#1E1510] text-white shadow-sm ring-1 ring-stone-900"
                            : "border-stone-300 bg-stone-50 text-stone-800 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold uppercase tracking-wider">
                          Standard Pack ({product.weight})
                        </div>
                        <div className="text-base font-bold mt-1">₨ {product.price.toLocaleString()}</div>
                      </button>

                      <button
                        onClick={() => setSelectedPack("large")}
                        className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                          selectedPack === "large"
                            ? "border-stone-900 bg-[#1E1510] text-white shadow-sm ring-1 ring-stone-900"
                            : "border-stone-300 bg-stone-50 text-stone-800 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                          <span>Family Double Pack</span>
                          <span className="text-[10px] text-emerald-300 font-semibold">Save More</span>
                        </div>
                        <div className="text-base font-bold mt-1">
                          ₨ {Math.round(product.price * 1.85).toLocaleString()}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="mt-6 space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between sm:justify-start border border-stone-300 rounded-md bg-stone-50 px-3 py-2 w-full sm:w-auto gap-4">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-8 h-8 rounded bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer transition"
                        >
                          -
                        </button>
                        <span className="text-base font-bold text-stone-900 min-w-[24px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-8 h-8 rounded bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Primary Order Now Button */}
                      <Link
                        href={`/checkout?product=${product.id}&pack=${selectedPack}&qty=${quantity}`}
                        className="flex-1 py-4 px-6 rounded-md text-xs font-bold bg-[#1E1510] hover:bg-[#8B3A22] text-[#F9F6F0] flex items-center justify-center gap-2 transition-colors cursor-pointer text-center uppercase tracking-[0.16em] shadow-sm"
                      >
                        <Truck className="w-4 h-4 text-amber-400" />
                        <span>Order Cash on Delivery (₨ {totalPrice.toLocaleString()})</span>
                      </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Secondary Add to Cart */}
                      <button
                        onClick={handleAddToCart}
                        className={`flex-1 py-3 px-5 rounded-md text-xs font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition cursor-pointer border ${
                          isAdded
                            ? "bg-emerald-700 border-emerald-700 text-white"
                            : "bg-white hover:bg-stone-100 border-stone-300 text-stone-900"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added to Basket
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-stone-600" /> Add to Basket
                          </>
                        )}
                      </button>

                      {/* WhatsApp COD Order */}
                      <a
                        href={`https://wa.me/923008472910?text=Hello%20Usman's%20Pure,%20I%20want%20to%20order%20${encodeURIComponent(
                          product.title
                        )}%20(${selectedPack}%20x%20${quantity}%20=%20₨${totalPrice})%20with%20Cash%20on%20Delivery.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-5 rounded-md text-xs font-bold uppercase tracking-[0.14em] bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 transition shadow-xs"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                        <span>Order via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            COLLAPSIBLE PRODUCT DETAILS ACCORDION DROPDOWNS
            ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <div className="border border-stone-200/90 rounded-2xl bg-white shadow-xs overflow-hidden divide-y divide-stone-200/80">
            {/* 1. PRODUCT OVERVIEW ACCORDION */}
            <div className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("overview")}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50/80 transition-colors cursor-pointer"
                aria-expanded={openSection === "overview"}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#8B3A22]" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Product Overview
                  </h2>
                </div>
                <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-900 transition shrink-0 ml-4">
                  {openSection === "overview" ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openSection === "overview" && (
                <div className="px-6 pb-6 pt-1 text-stone-700 leading-relaxed space-y-3 text-sm sm:text-base border-t border-stone-100">
                  <p>
                    {product.description ||
                      "Proprietary cold-milled blend of traditional whole grains. Helps maintain prolonged fullness, prevents insulin spikes, and turns stored fat into everyday sustained energy."}
                  </p>
                  <p>
                    Milled in traditional stone chakkis under 40°C. We guarantee zero maida mixing, zero chemical bleaching, and zero synthetic preservatives. Freshly packed in UV-shielded packaging to preserve aroma and living nutrients.
                  </p>
                </div>
              )}
            </div>

            {/* 2. HEALTH BENEFITS / USAGE ACCORDION */}
            <div className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("benefits")}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50/80 transition-colors cursor-pointer"
                aria-expanded={openSection === "benefits"}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Health Benefits / Usage
                  </h2>
                </div>
                <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-900 transition shrink-0 ml-4">
                  {openSection === "benefits" ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openSection === "benefits" && (
                <div className="px-6 pb-6 pt-1 text-stone-700 leading-relaxed space-y-4 text-sm sm:text-base border-t border-stone-100">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Low Glycemic Index (&lt;50):</strong> Slow carb breakdown prevents insulin spikes.</li>
                    <li><strong>High Dietary Fiber (18g/100g):</strong> Keeps you full for 5+ hours and promotes digestion.</li>
                    <li><strong>Cold Stone Milled (&lt;40°C):</strong> Natural wheat germ, bran, and enzymes intact.</li>
                    {product.benefits?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="pt-2 text-xs sm:text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200/60">
                    <p className="font-bold text-stone-900 mb-1">Recommended Usage Guide:</p>
                    <p><strong>For Flours / Rotis:</strong> Knead with lukewarm water and let rest for 15 minutes before rolling for extra softness.</p>
                    <p className="mt-1"><strong>For Teas:</strong> Steep 1 teaspoon in 90°C hot water for 4–5 minutes. Strain and enjoy pure without additives.</p>
                  </div>
                </div>
              )}
            </div>

            {/* 3. STORAGE & PURITY GUARANTEE ACCORDION */}
            <div className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("storage")}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50/80 transition-colors cursor-pointer"
                aria-expanded={openSection === "storage"}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Storage &amp; Purity Guarantee
                  </h2>
                </div>
                <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 hover:text-stone-900 transition shrink-0 ml-4">
                  {openSection === "storage" ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openSection === "storage" && (
                <div className="px-6 pb-6 pt-1 text-stone-700 leading-relaxed space-y-3 text-sm sm:text-base border-t border-stone-100">
                  <p>
                    <strong>Storage Instructions:</strong> Store in a cool, dry place inside an airtight container away from moisture and direct sunlight. Because our flours and spices contain zero preservatives or chemical anti-caking agents, using an airtight jar preserves their farm-fresh aroma for up to 6 months.
                  </p>
                  <p>
                    <strong>Freshness &amp; Satisfaction Guarantee:</strong> We stand behind the absolute purity of every single batch. If you are not completely satisfied with our texture, milling quality, or flavor, contact us within 14 days for a replacement or full refund.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Verified Household Customer Reviews Section */}
        <section className="bg-[#FAF7F2] py-14 sm:py-16 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B3A22]">
                    Verified Household Reviews
                  </span>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-stone-700">4.9 / 5.0 Rating</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                  What Families Say About <em className="italic font-normal text-[#8B3A22]">{product.title}</em>
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>+ Write a Review</span>
                </button>
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B3A22] hover:text-stone-900 transition-colors py-2"
                >
                  <span>All Reviews</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {reviewsToDisplay.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-md p-5 border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center text-amber-400">
                        {[...Array(r.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {r.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          <BadgeCheck className="w-3 h-3 text-emerald-600" />
                          Verified Buyer
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-bold text-[#8B3A22] uppercase tracking-wider mb-2 truncate">
                      {r.product}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                      &ldquo;{r.review}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900">{r.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {r.city} • {r.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Write a Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              {revSuccess ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">Thank You!</h3>
                  <p className="text-xs text-stone-600 mt-2">
                    Your review for {product.title} has been submitted and will be verified by our admin team.
                  </p>
                </div>
              ) : (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B3A22] block mb-1">
                    Verified Customer Voice
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Write a Review for {product.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Share your experience with aroma, freshness, cooking results, or health benefits.
                  </p>

                  {revError && (
                    <div className="mt-3 p-2.5 rounded bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{revError}</span>
                    </div>
                  )}

                  <form onSubmit={handleWriteReview} className="mt-4 space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          placeholder="e.g. Fatima Zahra"
                          className="w-full px-3 py-2 text-xs rounded border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:border-[#8B3A22] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">City / Location</label>
                        <input
                          type="text"
                          value={revCity}
                          onChange={(e) => setRevCity(e.target.value)}
                          placeholder="e.g. Lahore, Punjab"
                          className="w-full px-3 py-2 text-xs rounded border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:border-[#8B3A22] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setRevRating(s)}
                            className="p-1 cursor-pointer transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                s <= revRating ? "fill-amber-400 text-amber-400" : "fill-stone-200 text-stone-200"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-stone-600 ml-2">{revRating} of 5 Stars</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Review Feedback *</label>
                      <textarea
                        rows={3}
                        required
                        value={revText}
                        onChange={(e) => setRevText(e.target.value)}
                        placeholder="Tell others how this product worked for your family..."
                        className="w-full px-3 py-2 text-xs rounded border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:border-[#8B3A22] focus:bg-white"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setIsReviewModalOpen(false)}
                        className="px-4 py-2 rounded text-xs font-bold text-stone-600 hover:bg-stone-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded bg-[#1E1510] hover:bg-[#8B3A22] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Submit for Verification
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        <section className="bg-white py-16 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B3A22]">
                  Complementary Selection
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
                  Other Pure Essentials You May Like
                </h3>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#8B3A22] transition-colors"
              >
                <span>Explore All 17 Products</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-[#FAF7F2] rounded-md p-3 md:p-4 border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/product/${rel.id}`} className="block">
                      <div className="relative aspect-square w-full rounded bg-white overflow-hidden mb-2.5 border border-stone-200/60">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-xs text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#8B3A22]">
                          Sale
                        </span>
                      </div>

                      <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8B3A22] mb-1">
                        {rel.categoryLabel}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 group-hover:text-[#8B3A22] transition min-h-[34px] sm:min-h-[38px] leading-snug">
                        {rel.title}
                      </h4>
                    </Link>

                    <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-stone-900">{rel.priceFormatted}</span>
                      <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                        {rel.originalPriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/60">
                    <Link
                      href={`/product/${rel.id}`}
                      className="w-full py-2 px-2 rounded bg-[#1E1510] hover:bg-[#8B3A22] text-[#F9F6F0] text-xs font-bold flex items-center justify-center gap-1 transition text-center uppercase tracking-wider min-h-[38px]"
                    >
                      <span>View Pure Item</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky Mobile Order Bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 z-30 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-11 h-11 rounded bg-stone-100 border border-stone-200 shrink-0 overflow-hidden">
              <Image src={product.image} alt={product.title} fill sizes="44px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 truncate">{product.title}</div>
              <div className="text-xs font-bold text-emerald-800">₨ {totalPrice.toLocaleString()}</div>
            </div>
          </div>
          <Link
            href={`/checkout?product=${product.id}&pack=${selectedPack}&qty=${quantity}`}
            className="py-2.5 px-4 rounded bg-[#1E1510] hover:bg-[#8B3A22] text-[#F9F6F0] text-xs font-bold shrink-0 flex items-center gap-1.5 uppercase tracking-wider transition-colors"
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Order (COD)</span>
          </Link>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
