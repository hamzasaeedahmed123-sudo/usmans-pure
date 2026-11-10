"use client";

import { useState, useRef, useMemo } from "react";
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
  ChevronLeft,
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
  const [addedCatalogIds, setAddedCatalogIds] = useState<Record<string, boolean>>({});
  const [openSection, setOpenSection] = useState<string | null>("overview");

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [revName, setRevName] = useState("");
  const [revCity, setRevCity] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState("");
  const [revSuccess, setRevSuccess] = useState(false);
  const [revError, setRevError] = useState<string | null>(null);

  // Gallery images with fallback to PRODUCTS definition
  const defaultProduct = PRODUCTS.find((p) => p.id === id);
  const galleryImages: string[] =
    product?.images && product.images.length > 0
      ? product.images
      : defaultProduct?.images && defaultProduct.images.length > 0
      ? defaultProduct.images
      : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    const nextIdx = (index + galleryImages.length) % galleryImages.length;
    setActiveImageIndex(nextIdx);
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: nextIdx * width,
        behavior: "smooth",
      });
    }
  };

  const handlePrevImage = () => {
    scrollToImage(activeImageIndex - 1);
  };

  const handleNextImage = () => {
    scrollToImage(activeImageIndex + 1);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const width = e.currentTarget.clientWidth;
    if (width > 0) {
      const idx = Math.round(e.currentTarget.scrollLeft / width);
      if (idx !== activeImageIndex && idx >= 0 && idx < galleryImages.length) {
        setActiveImageIndex(idx);
      }
    }
  };

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

  const handleAddCatalogProduct = (item: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedCatalogIds((prev) => ({ ...prev, [item.id]: true }));
    addItem(
      {
        id: item.id,
        name: item.title,
        pack: item.weight || "Standard Pack",
        price: item.price,
        image: item.image,
      },
      1
    );
    openCart();
    setTimeout(() => {
      setAddedCatalogIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const isFlour = product.category === "flours";
  const backdropImage = isFlour
    ? "/images/backgrounds/wheat-field-backplate.jpg"
    : "/images/backgrounds/herbal-garden-backplate.jpg";

  // Full catalog products: remove category filter and display all products
  const fullCatalogProducts = useMemo(() => {
    const sourceList = storeProducts && storeProducts.length > 0 ? storeProducts : PRODUCTS;
    return sourceList.map((item) => {
      const fallback = PRODUCTS.find((p) => p.id === item.id);
      return {
        ...fallback,
        ...item,
      };
    });
  }, [storeProducts]);

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between selection:bg-[#8B3A22]/20 selection:text-stone-900 overflow-x-hidden">
      <Header isSolid theme="amber" />

        <main className="flex-1 bg-white">
          {/* Breadcrumb Navigation - Sits directly on pure white canvas */}
          <div className="bg-white">
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
                    : "/category/teas"
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

          {/* Ultra-Minimalist Flat Organic Showcase: Sits directly on bg-white without boxed containers or borders */}
          <section className="relative py-6 sm:py-10 lg:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
                {/* ================= COLUMN 1: IMAGE GALLERY (LEFT) ================= */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  {/* Main Product Image: Completely flat on pure white with NO background container, NO borders, and NO shadows */}
                  <div className="relative w-full aspect-square max-h-[500px] bg-transparent border-none shadow-none p-0 group select-none flex items-center justify-center">
                    {/* Native snap carousel for mobile touch swipe & desktop navigation */}
                    <div
                      ref={carouselRef}
                      onScroll={handleScroll}
                      className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full h-full p-0 bg-transparent"
                    >
                      {galleryImages.map((img, idx) => (
                        <div
                          key={img}
                          className="snap-center min-w-full w-full h-full shrink-0 relative p-2 flex items-center justify-center bg-transparent"
                        >
                          <Image
                            src={img}
                            alt={`${product.title} - View ${idx + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            quality={90}
                            priority={idx === 0}
                            className="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows for Sliding */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          aria-label="Previous image"
                          className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-sm flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
                        >
                          <ChevronLeft className="w-5 h-5 text-stone-800" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          aria-label="Next image"
                          className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-sm flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
                        >
                          <ChevronRight className="w-5 h-5 text-stone-800" />
                        </button>
                      </>
                    )}

                    {/* Slide Indicators / Dots */}
                    {galleryImages.length > 1 && (
                      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                        {galleryImages.map((_, idx) => (
                          <span
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              activeImageIndex === idx
                                ? "w-5 bg-stone-900"
                                : "w-1.5 bg-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Previews: Floating naturally with NO borders and NO background blocks */}
                  {galleryImages.length > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-3 w-full bg-transparent">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => scrollToImage(idx)}
                          aria-label={`View picture ${idx + 1}`}
                          className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-transparent p-0 transition-all cursor-pointer ${
                            activeImageIndex === idx
                              ? "opacity-100 scale-105"
                              : "opacity-40 hover:opacity-80"
                          }`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 56px, 64px"
                            quality={75}
                            className="w-full h-full object-contain"
                          />
                          {activeImageIndex === idx && (
                            <span className="absolute -bottom-1 inset-x-2 h-0.5 bg-stone-900 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Trust Badges: Floating directly on pure white canvas */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-600 font-medium bg-transparent">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                      Zero Maida &amp; Fillers
                    </span>
                    <span className="text-stone-300">&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" strokeWidth={1.75} />
                      Pure Chakki Milled
                    </span>
                    <span className="text-stone-300">&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700" />
                      0% Preservatives
                    </span>
                  </div>
                </div>

                {/* ================= COLUMN 2: PRODUCT DETAILS & CONTROLS (RIGHT) ================= */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-5 sm:space-y-6">
                  <div>
                    {/* Category Label & Clean Stock Indicator (No Boxed Container) */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#8B3A22]">
                        {product.categoryLabel}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-xs font-medium text-emerald-700">
                        In Stock &bull; Fresh Batch
                      </span>
                    </div>

                    {/* Product Title: Clean, Prominent Typography Floating on White */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                      {product.title}
                    </h1>

                    {/* Rating Strip */}
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-stone-600 font-medium">
                        {product.rating} &bull; {product.reviewCount} Verified Household Reviews
                      </span>
                    </div>

                    {/* Price Row: Soft deep charcoal price & clean strike-through */}
                    <div className="mt-4 flex flex-wrap items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 tracking-tight">
                        Rs {unitPrice.toLocaleString()}
                      </span>
                      {originalUnitPrice > unitPrice && (
                        <span className="text-sm sm:text-base text-stone-400 line-through font-normal">
                          Rs {originalUnitPrice.toLocaleString()}
                        </span>
                      )}
                      {originalUnitPrice > unitPrice && (
                        <span className="text-[11px] font-semibold text-white bg-red-600 px-2 py-0.5 rounded-full shadow-xs tracking-wider">
                          Save Rs {(originalUnitPrice - unitPrice).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Body Copy */}
                    <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                      {product.description}
                    </p>

                    {/* Benefits Checklist Floating on White Canvas */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm font-normal text-stone-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span className="leading-snug">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Variant Selectors: Minimalist text options with clean bottom underline (NO thick bordered boxes) */}
                    <div className="mt-6 pt-3">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                        Select Packaging Format:
                      </label>
                      <div className="flex flex-wrap items-center gap-5 sm:gap-8">
                        <button
                          type="button"
                          onClick={() => setSelectedPack("standard")}
                          className={`pb-1.5 text-left transition-all cursor-pointer border-b-2 flex flex-col ${
                            selectedPack === "standard"
                              ? "border-stone-800 text-stone-800 font-semibold"
                              : "border-transparent text-stone-500 hover:text-stone-800 font-normal"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Standard Pack ({product.weight})</span>
                            {selectedPack === "standard" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-800 shrink-0" />
                            )}
                          </div>
                          <span className={`text-base mt-0.5 ${selectedPack === "standard" ? "font-bold text-stone-800" : "text-stone-600"}`}>
                            Rs {product.price.toLocaleString()}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPack("large")}
                          className={`pb-1.5 text-left transition-all cursor-pointer border-b-2 flex flex-col ${
                            selectedPack === "large"
                              ? "border-stone-800 text-stone-800 font-semibold"
                              : "border-transparent text-stone-500 hover:text-stone-800 font-normal"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Family Double Pack</span>
                            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded-full">
                              Save More
                            </span>
                            {selectedPack === "large" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-800 shrink-0" />
                            )}
                          </div>
                          <span className={`text-base mt-0.5 ${selectedPack === "large" ? "font-bold text-stone-800" : "text-stone-600"}`}>
                            Rs {Math.round(product.price * 1.85).toLocaleString()}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Quantity & Actions: Pill-shaped buttons matching luxury aesthetic */}
                    <div className="mt-7 space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Quantity Selector - Pill with delicate border */}
                        <div className="flex items-center justify-between sm:justify-start border border-stone-300 rounded-full bg-white px-4 py-2 w-full sm:w-auto gap-4 shadow-xs">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-6 h-6 flex items-center justify-center text-stone-700 font-bold hover:text-stone-900 transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-stone-800 min-w-[20px] text-center">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-6 h-6 flex items-center justify-center text-stone-700 font-bold hover:text-stone-900 transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Primary Order Now Button */}
                        <Link
                          href={`/checkout?product=${product.id}&pack=${selectedPack}&qty=${quantity}`}
                          className="flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-medium bg-[#2C2A29] hover:bg-[#4A3525] active:scale-95 text-white flex items-center justify-center gap-2 transition-transform cursor-pointer text-center tracking-wide shadow-xs"
                        >
                          <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Order Cash on Delivery (Rs {totalPrice.toLocaleString()})</span>
                        </Link>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Secondary Add to Cart - White pill with delicate border & ultra-soft shadow */}
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className={`flex-1 py-2.5 sm:py-3 px-5 rounded-full text-xs sm:text-sm font-normal tracking-wide flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-stone-300 hover:border-stone-400 shadow-xs hover:shadow-sm ${
                            isAdded
                              ? "bg-[#145330] border-[#145330] text-white"
                              : "bg-white hover:bg-stone-50/80 text-stone-800"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" /> Added to Basket
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4 text-stone-700" /> Add to Basket
                            </>
                          )}
                        </button>

                        {/* WhatsApp COD Order */}
                        <a
                          href={`https://wa.me/923129996658?text=Hello%20Usman's%20Pure,%20I%20want%20to%20order%20${encodeURIComponent(
                            product.title
                          )}%20(${selectedPack}%20x%20${quantity}%20=%20Rs${totalPrice})%20with%20Cash%20on%20Delivery.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 sm:py-3 px-5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center gap-2 transition-transform shadow-xs"
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
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="border-t border-b border-stone-200/80 divide-y divide-stone-200/70">
            {/* 1. PRODUCT OVERVIEW ACCORDION */}
            <div className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("overview")}
                className="w-full py-5 flex items-center justify-between text-left hover:text-[#8B3A22] transition-colors cursor-pointer"
                aria-expanded={openSection === "overview"}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#8B3A22]" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Product Overview
                  </h2>
                </div>
                <div className="w-7 h-7 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-700 hover:text-stone-900 transition shrink-0 ml-4">
                  {openSection === "overview" ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openSection === "overview" && (
                <div className="pb-6 pt-1 text-stone-700 leading-relaxed space-y-3 text-sm sm:text-base">
                  <p>
                    {product.description ||
                      "Proprietary cold-milled blend of traditional whole grains. Helps maintain prolonged fullness, prevents insulin spikes, and turns stored fat into everyday sustained energy."}
                  </p>
                  <p>
                    Milled in traditional hygienic chakkis under 40°C. We guarantee zero maida mixing, zero chemical bleaching, and zero synthetic preservatives. Freshly packed in UV-shielded packaging to preserve aroma and living nutrients.
                  </p>
                </div>
              )}
            </div>

            {/* 2. HEALTH BENEFITS / USAGE ACCORDION */}
            <div className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("benefits")}
                className="w-full py-5 flex items-center justify-between text-left hover:text-[#8B3A22] transition-colors cursor-pointer"
                aria-expanded={openSection === "benefits"}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Health Benefits / Usage
                  </h2>
                </div>
                <div className="w-7 h-7 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-700 hover:text-stone-900 transition shrink-0 ml-4">
                  {openSection === "benefits" ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openSection === "benefits" && (
                <div className="pb-6 pt-1 text-stone-700 leading-relaxed space-y-4 text-sm sm:text-base">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Low Glycemic Index (&lt;50):</strong> Slow carb breakdown prevents insulin spikes.</li>
                    <li><strong>High Dietary Fiber (18g/100g):</strong> Keeps you full for 5+ hours and promotes digestion.</li>
                    <li><strong>Cold Milled (&lt;40°C):</strong> Natural wheat germ, bran, and enzymes intact.</li>
                    {product.benefits?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="pt-2 text-xs sm:text-sm text-stone-700 bg-stone-50 border border-stone-100 p-4 rounded-xl">
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
                className="w-full py-5 flex items-center justify-between text-left hover:text-[#8B3A22] transition-colors cursor-pointer"
                aria-expanded={openSection === "storage"}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                    Storage &amp; Purity Guarantee
                  </h2>
                </div>
                <div className="w-7 h-7 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-700 hover:text-stone-900 transition shrink-0 ml-4">
                  {openSection === "storage" ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              {openSection === "storage" && (
                <div className="pb-6 pt-1 text-stone-700 leading-relaxed space-y-3 text-sm sm:text-base">
                  <p>
                    <strong>Storage Instructions:</strong> Store in a cool, dry place inside an airtight container away from moisture and direct sunlight. Because our flours and teas contain zero preservatives or artificial chemicals, using an airtight jar preserves their farm-fresh aroma for up to 6 months.
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
        <section className="py-14 sm:py-16 border-t border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Write a Review</span>
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
                  className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center text-amber-400">
                        {[...Array(r.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {r.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
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

                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
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

        {/* Explore Our Complete Range Section (Full Catalog, Borderless Minimalist Grid) */}
        <section className="py-12 sm:py-16 bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-10 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-1.5 font-sans">
                  Artisanal &bull; 100% Pure
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                  Explore Our Complete Range
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-normal">
                All {fullCatalogProducts.length} Pure Staples (Chakki Flours &amp; Herbal Teas)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16 md:grid-cols-4">
              {fullCatalogProducts.map((item) => {
                const discountPercent =
                  item.originalPrice > item.price
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : 0;

                return (
                  <article
                    key={item.id}
                    className="group flex flex-col justify-start bg-transparent border-none shadow-none p-0"
                  >
                    {/* Floating image container on flat white canvas */}
                    <div className="relative aspect-square w-full bg-transparent overflow-hidden flex items-center justify-center">
                      <Link
                        href={`/product/${item.id}`}
                        className="absolute inset-0 z-0 flex items-center justify-center"
                        aria-label={item.title}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
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
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-sm sm:text-base font-normal text-[#121212] leading-snug line-clamp-2 hover:underline transition-colors tracking-normal">
                          {item.title}
                        </h3>
                      </Link>

                      {/* Price display: crisp dark sale price & subtle crossed-out original */}
                      <div className="mt-1.5 flex items-baseline justify-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-[#121212] tracking-tight">
                          Rs {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs sm:text-sm text-stone-400 line-through font-normal">
                            Rs {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Dr. Nazish Affan Signature Button: 16px radius, 1px dark border, distinct bottom drop-shadow */}
                      <button
                        type="button"
                        onClick={(e) => handleAddCatalogProduct(item, e)}
                        className="mt-3.5 w-full max-w-[180px] sm:max-w-[200px] mx-auto py-2.5 px-4 rounded-[16px] bg-white border border-[#121212] text-[#121212] hover:bg-stone-50 text-xs sm:text-sm font-normal tracking-wide shadow-[0_4px_6px_rgba(0,0,0,0.15)] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
                      >
                        {addedCatalogIds[item.id] ? "Added to cart ✓" : "Add to cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sticky Mobile Order Bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200/80 p-3 z-30 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-11 h-11 rounded-lg bg-stone-100/80 shrink-0 overflow-hidden">
              <Image src={product.image} alt={product.title} fill sizes="44px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 truncate">{product.title}</div>
              <div className="text-xs font-bold text-emerald-800">₨ {totalPrice.toLocaleString()}</div>
            </div>
          </div>
          <Link
            href={`/checkout?product=${product.id}&pack=${selectedPack}&qty=${quantity}`}
            className="py-2.5 px-4 rounded-xl bg-[#1E1510] hover:bg-[#8B3A22] text-[#F9F6F0] text-xs font-bold shrink-0 flex items-center gap-1.5 uppercase tracking-wider transition-colors"
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
