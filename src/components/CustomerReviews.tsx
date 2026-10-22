"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  PenLine,
  X,
  Upload,
  Check,
  Camera,
  AlertCircle,
} from "lucide-react";
import { useStoreData, Review, DEFAULT_REVIEWS } from "@/context/StoreDataContext";

interface LightboxPhotoData {
  url: string;
  product: string;
  author: string;
  city: string;
  rating?: number;
}

export function CustomerReviews() {
  const { reviews, addReview } = useStoreData();
  const publishedReviews = reviews.filter((r) => r.status === "Published");
  const displayReviews: Review[] = publishedReviews.length > 0 ? publishedReviews : DEFAULT_REVIEWS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<LightboxPhotoData | null>(null);

  // Modal Form State
  const [modalRating, setModalRating] = useState(5);
  const [modalName, setModalName] = useState("");
  const [modalCity, setModalCity] = useState("");
  const [modalProduct, setModalProduct] = useState("Fat2Fuel Advance Multigrain Flour");
  const [modalReview, setModalReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalTouched, setModalTouched] = useState(false);

  // Responsive slide step: 1 card on mobile, 2 on tablet, 3 on desktop
  const totalSlides = displayReviews.length;

  useEffect(() => {
    if (isHovered || isModalOpen || lightboxPhoto) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, isModalOpen, lightboxPhoto, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalTouched(true);

    const isNameValid = modalName.trim() !== "";
    const isCityValid = modalCity.trim() !== "";
    const isReviewValid = modalReview.trim() !== "";

    if (!isNameValid || !isCityValid || !isReviewValid) {
      const missing: string[] = [];
      if (!isNameValid) missing.push("Full Name");
      if (!isCityValid) missing.push("City");
      if (!isReviewValid) missing.push("Review Message");

      setModalError(`Name, City, and Review message are required (missing: ${missing.join(", ")}).`);
      return;
    }

    setModalError(null);

    // Save directly to StoreDataContext & Admin Panel as Pending
    addReview({
      name: modalName.trim(),
      city: modalCity.trim(),
      product: modalProduct,
      rating: modalRating,
      review: modalReview.trim(),
      verified: false,
      status: "Pending",
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setModalName("");
      setModalCity("");
      setModalReview("");
      setModalTouched(false);
    }, 2200);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#1E1510]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header with CTAs next to Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="eyebrow">Verified Customer Stories</span>
              <span className="text-[#1E1510]/20">&bull;</span>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-stone-700">4.9 / 5.0 Rating</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1510] leading-tight">
              Loved by 50,000+ <em className="italic font-normal text-[#8B3A22]">Homes</em>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B5D52]">
              Real experiences from families across Pakistan who upgraded to 100% pure stone-ground chakki flour.
            </p>
          </div>

          {/* Action CTAs Next to Heading */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer shadow-xs"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>+ Write a Review</span>
            </button>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8B3A22] hover:text-[#1E1510] transition-colors py-2 px-2"
            >
              <span>View All Verified Stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {displayReviews.map((r) => (
                <div
                  key={r.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2.5"
                  style={{ minWidth: "100%" }}
                >
                  <div className="bg-white rounded-sm border border-[#1E1510]/10 p-5 sm:p-6 h-full flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300">
                    <div>
                      {/* Top Bar: Stars + Verified Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center text-amber-500">
                          {[...Array(r.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        {r.verified && (
                          <span className="tag-quiet !text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-xs font-semibold">
                            Verified Buyer
                          </span>
                        )}
                      </div>

                      {/* Product Tag */}
                      <div className="text-xs sm:text-sm font-bold text-[#8B3A22] uppercase tracking-wider mb-2 truncate">
                        {r.product}
                      </div>

                      {/* Review Quote text */}
                      <p className="text-[15px] sm:text-base text-stone-800 leading-relaxed font-normal">
                        &ldquo;{r.review || (r as any).text}&rdquo;
                      </p>

                      {/* Customer Photo Gallery Row */}
                      {r.photos && r.photos.length > 0 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-1 scrollbar-thin">
                          {r.photos.map((photoUrl, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() =>
                                setLightboxPhoto({
                                  url: photoUrl,
                                  product: r.product,
                                  author: r.name,
                                  city: r.city,
                                  rating: r.rating,
                                })
                              }
                              className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-stone-200 cursor-pointer hover:opacity-90 shrink-0 shadow-2xs group focus:outline-hidden"
                              aria-label={`View photo from ${r.name}`}
                            >
                              <Image
                                src={photoUrl}
                                alt={`${r.name} meal photo`}
                                fill
                                sizes="(max-width: 768px) 80px, 96px"
                                className="w-20 h-20 md:w-24 md:h-24 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                                <Camera className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Reviewer Meta */}
                    <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1E1510] text-[#FAF7F2] font-serif text-sm font-bold flex items-center justify-center shrink-0">
                          {r.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-1.5 truncate">
                            <span>{r.name}</span>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </div>
                          <div className="text-xs sm:text-sm text-stone-600 truncate mt-0.5">
                            {r.city} &bull; {r.date}
                          </div>
                        </div>
                      </div>
                      <Quote className="w-5 h-5 text-stone-300 shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {displayReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === i
                      ? "w-6 h-1.5 bg-[#8B3A22]"
                      : "w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Review"
                className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Review Submission Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-xl border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="sticky top-0 float-right -mt-2 -mr-2 sm:mt-0 sm:mr-0 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer z-50 shadow-xs"
              aria-label="Close review dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-stone-900">Thank You!</h3>
                <p className="mt-2 text-sm text-stone-600">
                  Your review has been submitted successfully and will be published after verification.
                </p>
              </div>
            ) : (
              <div>
                <span className="eyebrow">Share Your Experience</span>
                <h3 className="mt-1 text-2xl font-serif text-stone-900">Write a Customer Review</h3>
                <p className="mt-1 text-xs text-stone-600">
                  Help other Pakistani families discover authentic, pure stone-ground foods.
                </p>

                <form onSubmit={handleModalSubmit} noValidate className="mt-5 space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Overall Rating:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setModalRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= modalRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-semibold text-stone-700">
                        {modalRating === 5
                          ? "5 Stars (Excellent)"
                          : modalRating === 4
                          ? "4 Stars (Very Good)"
                          : `${modalRating} Stars`}
                      </span>
                    </div>
                  </div>

                  {/* Product Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Product Purchased:
                    </label>
                    <select
                      value={modalProduct}
                      onChange={(e) => setModalProduct(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    >
                      <option value="Fat2Fuel Advance Multigrain Flour">
                        Fat2Fuel Advance Multigrain Flour (Weight Loss)
                      </option>
                      <option value="FENUGREEK Plus Diabetic Flour">
                        FENUGREEK Plus Diabetic-Care Flour
                      </option>
                      <option value="Basic Stone-Ground Chakki Flour">
                        Basic Stone-Ground Whole Wheat Atta
                      </option>
                      <option value="Giggly Grains Kids Immunity Flour">
                        Giggly Grains (Kids Immunity Flour)
                      </option>
                      <option value="NutraPrime Gluten-Free Flour">
                        NutraPrime Gluten-Free Multigrain Flour
                      </option>
                      <option value="Rosella Ruby Herbal Tea">
                        Rosella Ruby Herbal Tea (Hibiscus)
                      </option>
                      <option value="Chamomile & Mint Relax Tea">
                        Chamomile &amp; Mint Relax Tea
                      </option>
                      <option value="Olive Leaf Cardiac Herbal Tea">
                        Olive Leaf Cardiac Herbal Tea
                      </option>
                      <option value="Pure Lakadong High-Curcumin Turmeric">
                        Pure Lakadong Turmeric (&gt;7% Curcumin)
                      </option>
                      <option value="Hand-Pounded Kashmiri Red Chili">
                        Hand-Pounded Kashmiri Red Chili
                      </option>
                    </select>
                  </div>

                  {/* Review Text (Mandatory) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                        Your Experience / Story: <span className="text-[#8B3A22]">*</span>
                      </label>
                      <span className="text-[10px] font-semibold text-[#8B3A22]">Required</span>
                    </div>
                    <textarea
                      rows={3}
                      value={modalReview}
                      onChange={(e) => {
                        setModalReview(e.target.value);
                        if (modalError && e.target.value.trim() && modalName.trim() && modalCity.trim()) {
                          setModalError(null);
                        }
                      }}
                      placeholder="How did this product help your health, cooking, or family digestion?"
                      className={`w-full px-3 py-2 text-xs rounded border bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                        modalTouched && modalReview.trim() === ""
                          ? "border-rose-400 bg-rose-50/20"
                          : "border-stone-300"
                      }`}
                    />
                    {modalTouched && modalReview.trim() === "" && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">Review message is required.</p>
                    )}
                  </div>

                  {/* Name & City (Mandatory) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                          Your Name: <span className="text-[#8B3A22]">*</span>
                        </label>
                        <span className="text-[10px] font-semibold text-[#8B3A22]">Required</span>
                      </div>
                      <input
                        type="text"
                        value={modalName}
                        onChange={(e) => {
                          setModalName(e.target.value);
                          if (modalError && e.target.value.trim() && modalCity.trim() && modalReview.trim()) {
                            setModalError(null);
                          }
                        }}
                        placeholder="e.g. Tariq Mahmood"
                        className={`w-full px-3 py-2 text-xs rounded border bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                          modalTouched && modalName.trim() === ""
                            ? "border-rose-400 bg-rose-50/20"
                            : "border-stone-300"
                        }`}
                      />
                      {modalTouched && modalName.trim() === "" && (
                        <p className="mt-1 text-[11px] text-rose-600 font-medium">Name is required.</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                          City: <span className="text-[#8B3A22]">*</span>
                        </label>
                        <span className="text-[10px] font-semibold text-[#8B3A22]">Required</span>
                      </div>
                      <input
                        type="text"
                        value={modalCity}
                        onChange={(e) => {
                          setModalCity(e.target.value);
                          if (modalError && modalName.trim() && e.target.value.trim() && modalReview.trim()) {
                            setModalError(null);
                          }
                        }}
                        placeholder="e.g. Lahore, Punjab"
                        className={`w-full px-3 py-2 text-xs rounded border bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                          modalTouched && modalCity.trim() === ""
                            ? "border-rose-400 bg-rose-50/20"
                            : "border-stone-300"
                        }`}
                      />
                      {modalTouched && modalCity.trim() === "" && (
                        <p className="mt-1 text-[11px] text-rose-600 font-medium">City is required.</p>
                      )}
                    </div>
                  </div>

                  {modalError && (
                    <div
                      role="alert"
                      className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2 shadow-2xs"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span className="leading-tight font-medium">{modalError}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Customer Photo Preview */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
              <div>
                <div className="text-white text-sm font-semibold">
                  {lightboxPhoto.author} ({lightboxPhoto.city})
                </div>
                <div className="text-stone-400 text-xs mt-0.5">
                  Verified customer meal photo &bull; {lightboxPhoto.product}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] max-h-[65vh] bg-black/60 flex items-center justify-center">
              <Image
                src={lightboxPhoto.url}
                alt={lightboxPhoto.product}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>

            <div className="p-3.5 bg-stone-950 text-stone-300 text-xs border-t border-white/10 flex items-center justify-between">
              <span className="text-white/90 font-medium truncate mr-2">
                {lightboxPhoto.product}
              </span>
              <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold shrink-0 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified Customer Photo
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
