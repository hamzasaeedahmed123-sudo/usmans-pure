"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import {
  ChevronRight,
  Star,
  Camera,
  UploadCloud,
  X,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  PenLine,
  AlertCircle,
} from "lucide-react";
import { useStoreData } from "@/context/StoreDataContext";

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

const REVIEW_PRODUCTS = [
  "Fat2Fuel Advance Multigrain Flour",
  "FENUGREEK Plus – Diabetic Care Flour",
  "Basic Stone-Ground Whole Wheat Atta",
  "Kids Giggly Grains Immunity Flour",
  "Wild Rosella Herbal Tea (Hibiscus)",
  "Olive Leaf Cardiac Herbal Tea",
  "Soothing Chamomile Relax Tea",
  "Pure Lakadong High-Curcumin Turmeric",
  "Cold-Pounded Kashmiri Red Chili",
  "Royal Stone-Pounded Garam Masala",
  "Fat Loss Transformation Combo",
  "Diabetic Care & Heart Health Pack",
  "Family Immunity & Vitality Pack",
  "Royal Organic Spice Kitchen Box",
];

const RATING_LABELS: Record<number, string> = {
  1: "1 Star — Disappointed / Unsatisfactory",
  2: "2 Stars — Needs Significant Improvement",
  3: "3 Stars — Average / Met Basic Expectations",
  4: "4 Stars — Very Good / Highly Recommended",
  5: "5 Stars — Outstanding / Transformative Quality",
};

export default function WriteReviewPage() {
  const { addReview } = useStoreData();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<string>(REVIEW_PRODUCTS[0]);
  const [title, setTitle] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [emailOrOrder, setEmailOrOrder] = useState<string>("");
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [touchedSubmit, setTouchedSubmit] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeRating = hoverRating || rating;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              url: e.target?.result as string,
              name: file.name,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedSubmit(true);

    const isNameValid = name.trim() !== "";
    const isCityValid = city.trim() !== "";
    const isReviewValid = review.trim() !== "";

    // ONLY these 3 fields are strictly mandatory
    if (!isNameValid || !isCityValid || !isReviewValid) {
      const missing: string[] = [];
      if (!isNameValid) missing.push("Full Name");
      if (!isCityValid) missing.push("City");
      if (!isReviewValid) missing.push("Review Message");

      setErrorMessage(`Name, City, and Review message are required (missing: ${missing.join(", ")}).`);
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Save directly to centralized StoreDataContext & Admin Panel as Pending
    addReview({
      name: name.trim(),
      city: city.trim(),
      product: selectedProduct,
      rating,
      review: review.trim(),
      verified: false,
      status: "Pending",
      photos: photos.map((p) => p.url),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1E1510] flex flex-col justify-between selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-[#6B5D52]">
            <Link href="/" className="hover:text-[#8B3A22] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/reviews" className="hover:text-[#8B3A22] transition-colors">
              Reviews
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-[#1E1510]">Write a Review</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Form Container */}
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
          {!submitted ? (
            <div className="space-y-8">
              {/* Clean Editorial Header */}
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B3A22] block mb-2">
                  Verified Customer Voice
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1510] tracking-tight leading-tight">
                  Share Your Honest Experience
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[#6B5D52] max-w-xl mx-auto leading-relaxed">
                  Help health-conscious families make better choices with real kitchen stories and photos.
                </p>
              </div>

              {/* Review Submission Card */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-md border border-[#1E1510]/10 p-6 sm:p-10 shadow-xs space-y-7"
              >
                {/* 1. Star Rating Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510] mb-2">
                    Overall Experience Rating <span className="text-[#8B3A22]">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-hidden group cursor-pointer transition-transform hover:scale-110"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            star <= activeRating
                              ? "fill-amber-400 text-amber-400 drop-shadow-xs"
                              : "text-stone-300 hover:text-amber-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-xs font-medium text-[#8B3A22]">
                    {RATING_LABELS[activeRating]}
                  </div>
                </div>

                {/* 2. Product Selector */}
                <div>
                  <label
                    htmlFor="product"
                    className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510] mb-2"
                  >
                    Select Product Reviewed <span className="text-[#8B3A22]">*</span>
                  </label>
                  <select
                    id="product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-md bg-[#FAF7F2] border border-[#1E1510]/15 text-sm text-[#1E1510] focus:outline-hidden focus:border-[#8B3A22] transition-colors"
                  >
                    {REVIEW_PRODUCTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Photo Upload Zone (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510] mb-2">
                    Add Photos of Your Roti, Meals, or Unboxing{" "}
                    <span className="text-xs font-normal text-stone-500 capitalize">(Optional)</span>
                  </label>
                  <p className="text-xs text-[#6B5D52] mb-3">
                    Photo upload is completely optional. Verified customer stories with photos receive priority community placement.
                  </p>

                  {/* Drag-and-drop Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-md p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-[#8B3A22] bg-[#8B3A22]/5"
                        : "border-[#1E1510]/20 bg-[#FAF7F2] hover:border-[#8B3A22]/50 hover:bg-[#F5EFE6]"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFiles(e.target.files)}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-white border border-[#1E1510]/10 flex items-center justify-center mx-auto mb-3 text-[#8B3A22] shadow-2xs">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-semibold text-[#1E1510]">
                      Click or drag photos here to upload
                    </div>
                    <div className="text-xs text-[#6B5D52] mt-1">
                      Supports JPG, PNG, WEBP (up to 10MB each)
                    </div>
                  </div>

                  {/* Uploaded Photo Previews */}
                  {photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative aspect-square rounded-md overflow-hidden border border-[#1E1510]/15 bg-stone-100 group shadow-2xs"
                        >
                          <Image
                            src={photo.url}
                            alt={photo.name}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(photo.id);
                            }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/75 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer"
                            aria-label="Remove photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Headline / Review Title (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="headline"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510]"
                    >
                      Review Headline
                    </label>
                    <span className="text-[11px] font-normal text-stone-500">(Optional)</span>
                  </div>
                  <input
                    type="text"
                    id="headline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Best flour for diabetic blood sugar management"
                    className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border border-[#1E1510]/15 text-base text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden focus:border-[#8B3A22] transition-colors shadow-2xs"
                  />
                </div>

                {/* 5. Review Body Textarea (Mandatory) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="reviewBody"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510]"
                    >
                      Review Message / Story <span className="text-[#8B3A22]">*</span>
                    </label>
                    <span className="text-[11px] font-semibold text-[#8B3A22]">Required</span>
                  </div>
                  <textarea
                    id="reviewBody"
                    rows={5}
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                      if (errorMessage && e.target.value.trim() && name.trim() && city.trim()) {
                        setErrorMessage(null);
                      }
                    }}
                    placeholder="Tell us about the texture, taste, digestion, or health benefits you experienced with your family..."
                    className={`w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border text-base text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden transition-colors leading-relaxed shadow-2xs ${
                      touchedSubmit && review.trim() === ""
                        ? "border-rose-400 focus:border-rose-600 bg-rose-50/20"
                        : "border-[#1E1510]/15 focus:border-[#8B3A22]"
                    }`}
                  />
                  {touchedSubmit && review.trim() === "" && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Review message is required. Please share a brief experience.</span>
                    </p>
                  )}
                </div>

                {/* 6. User Information (Name & City Mandatory, Email/Order Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="authorName"
                        className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510]"
                      >
                        Your Full Name <span className="text-[#8B3A22]">*</span>
                      </label>
                      <span className="text-[11px] font-semibold text-[#8B3A22]">Required</span>
                    </div>
                    <input
                      type="text"
                      id="authorName"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMessage && e.target.value.trim() && city.trim() && review.trim()) {
                          setErrorMessage(null);
                        }
                      }}
                      placeholder="e.g., Dr. Ayesha Tariq"
                      className={`w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border text-base text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden transition-colors shadow-2xs ${
                        touchedSubmit && name.trim() === ""
                          ? "border-rose-400 focus:border-rose-600 bg-rose-50/20"
                          : "border-[#1E1510]/15 focus:border-[#8B3A22]"
                      }`}
                    />
                    {touchedSubmit && name.trim() === "" && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Full name is required.</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="city"
                        className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510]"
                      >
                        Your City <span className="text-[#8B3A22]">*</span>
                      </label>
                      <span className="text-[11px] font-semibold text-[#8B3A22]">Required</span>
                    </div>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errorMessage && name.trim() && e.target.value.trim() && review.trim()) {
                          setErrorMessage(null);
                        }
                      }}
                      placeholder="e.g., Karachi / Lahore / Islamabad"
                      className={`w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border text-base text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden transition-colors shadow-2xs ${
                        touchedSubmit && city.trim() === ""
                          ? "border-rose-400 focus:border-rose-600 bg-rose-50/20"
                          : "border-[#1E1510]/15 focus:border-[#8B3A22]"
                      }`}
                    />
                    {touchedSubmit && city.trim() === "" && (
                      <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>City is required.</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="verificationInfo"
                      className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1E1510]"
                    >
                      Email Address or Order ID
                    </label>
                    <span className="text-[11px] font-normal text-stone-500">(Optional for Verified Buyer Badge)</span>
                  </div>
                  <input
                    type="text"
                    id="verificationInfo"
                    value={emailOrOrder}
                    onChange={(e) => setEmailOrOrder(e.target.value)}
                    placeholder="e.g., ayesha@example.com or Order #UP-4821"
                    className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border border-[#1E1510]/15 text-base text-[#1E1510] placeholder:text-stone-400 focus:outline-hidden focus:border-[#8B3A22] transition-colors shadow-2xs"
                  />
                  <div className="mt-1 text-[11px] text-stone-500">
                    We never share your contact details publicly. Used strictly to verify authentic customer orders.
                  </div>
                </div>

                {/* Inline Validation Feedback Banner if validation fails */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3 shadow-2xs animate-fade-in"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-rose-950">Name, City, and Review message are required</p>
                      <p className="text-rose-700 leading-normal">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* 7. Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-sm font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-60"
                  >
                    <PenLine className="w-4 h-4 text-[#E5B869]" />
                    <span>{isSubmitting ? "Submitting Review..." : "Submit Verified Review"}</span>
                  </button>
                  <div className="mt-3 text-center text-xs text-[#6B5D52] flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>100% Genuine Community Feedback &bull; Zero Paid Endorsements</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Success Feedback State */
            <div className="bg-white rounded-md border border-[#1E1510]/10 p-8 sm:p-12 text-center shadow-sm space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800 block mb-1">
                  Submission Received
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1510]">
                  {photos.length > 0
                    ? "Thank you! Your photo review has been submitted for verification."
                    : "Thank you! Your review has been submitted for verification."}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#6B5D52] max-w-lg mx-auto leading-relaxed">
                  Our quality team verifies authentic customer experiences within 12–24 hours before publishing to our community board.
                </p>
              </div>

              {/* Review Summary Receipt */}
              <div className="p-5 rounded-md bg-[#FAF7F2] border border-[#1E1510]/10 text-left max-w-lg mx-auto text-xs sm:text-sm space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[#1E1510]/10">
                  <span className="text-stone-500 font-medium">Reviewer</span>
                  <span className="font-semibold text-stone-900">{name} ({city})</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#1E1510]/10">
                  <span className="text-stone-500 font-medium">Product</span>
                  <span className="font-semibold text-stone-900">{selectedProduct}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#1E1510]/10">
                  <span className="text-stone-500 font-medium">Rating</span>
                  <div className="flex text-amber-400">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                {photos.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Photos Uploaded</span>
                    <span className="font-semibold text-stone-900">{photos.length} photo{photos.length > 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Link
                  href="/reviews"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  <span>Browse All Stories</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
