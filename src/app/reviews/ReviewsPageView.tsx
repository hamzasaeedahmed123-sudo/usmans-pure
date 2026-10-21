"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import {
  Star,
  CheckCircle,
  Camera,
  Upload,
  X,
  ThumbsUp,
  ChevronRight,
  Filter,
  Check,
  ShieldCheck,
  Award,
  ArrowRight,
  PenLine,
  AlertCircle,
} from "lucide-react";

interface CustomerStory {
  id: string;
  name: string;
  city: string;
  product: string;
  category: "flours" | "teas" | "spices";
  rating: number;
  date: string;
  title: string;
  review: string;
  image?: string;
  photos?: string[];
  verified: boolean;
  helpfulCount: number;
}

interface LightboxPhotoData {
  url: string;
  title: string;
  author: string;
  city: string;
  product: string;
}

const INITIAL_STORIES: CustomerStory[] = [
  {
    id: "rev-1",
    name: "Tariq Mahmood",
    city: "Lahore, Punjab",
    product: "Fat2Fuel Advance Multigrain Flour",
    category: "flours",
    rating: 5,
    date: "Verified Purchase &bull; 4 days ago",
    title: "Lost 3.8 kgs in 3 weeks without feeling hungry",
    review:
      "I was skeptical about diet flours because they usually taste dry and hard. But Fat2Fuel rotis are genuinely soft, flavorful, and keep me completely full from lunch all the way to 7 PM. My digestion has improved dramatically and my waistline is down 1.5 inches.",
    image: "/images/products/prod-3.jpg",
    photos: ["/images/products/prod-3.jpg", "/images/products/prod-1.jpg"],
    verified: true,
    helpfulCount: 38,
  },
  {
    id: "rev-2",
    name: "Dr. Farzana Akhtar",
    city: "Islamabad, Capital",
    product: "FENUGREEK Plus Diabetic Flour",
    category: "flours",
    rating: 5,
    date: "Verified Purchase &bull; 1 week ago",
    title: "Eliminated post-meal glucose spikes completely",
    review:
      "As a physician and diabetic patient, I monitor my blood sugar meticulously with a continuous glucose monitor. Regular whole wheat atta caused spikes up to 180 mg/dL. With FENUGREEK Plus, my 2-hour reading stays smoothly under 135 mg/dL. Absolutely remarkable formulation.",
    image: "/images/products/prod-4.png",
    photos: ["/images/products/prod-4.png"],
    verified: true,
    helpfulCount: 52,
  },
  {
    id: "rev-3",
    name: "Ayesha Imran",
    city: "Karachi, Sindh",
    product: "Rosella Ruby Herbal Tea",
    category: "teas",
    rating: 5,
    date: "Verified Purchase &bull; 2 weeks ago",
    title: "Amazing tart ruby infusion — bloat is gone!",
    review:
      "The color of this tea is stunning! I brew a big pitcher in the morning with whole dried hibiscus calyces, chill it in the fridge, and drink it with a drizzle of honey. It completely cured my evening water retention. Feels like a high-end luxury spa drink.",
    image: "/images/products/prod-9.jpg",
    photos: ["/images/products/prod-9.jpg"],
    verified: true,
    helpfulCount: 29,
  },
  {
    id: "rev-4",
    name: "Muhammad Bilal",
    city: "Faisalabad, Punjab",
    product: "Giggly Grains (Kids Immunity Flour)",
    category: "flours",
    rating: 5,
    date: "Verified Purchase &bull; 3 weeks ago",
    title: "Picky toddler now asks for second rotis!",
    review:
      "My 4-year-old son used to avoid eating rotis because commercial flour was too chewy and gave him stomach bloating. Giggly Grains makes ultra-tender rotis that practically melt. He eats with chicken curry happily. Great peace of mind for parents.",
    verified: true,
    helpfulCount: 19,
  },
  {
    id: "rev-5",
    name: "Begum Shahnaz",
    city: "Rawalpindi, Punjab",
    product: "Pure Lakadong Turmeric (>7% Curcumin)",
    category: "spices",
    rating: 5,
    date: "Verified Purchase &bull; 1 month ago",
    title: "Earthy fragrance and deep golden color like real haldi",
    review:
      "Commercial turmeric in grocery stores is full of yellow dye and starch fillers. You can tell Usman's Lakadong turmeric is 100% pure from the moment you open the glass jar. I take half a teaspoon in warm milk for joint pain and my knees feel 10 years younger.",
    image: "/images/spices-product.jpg",
    photos: ["/images/spices-product.jpg"],
    verified: true,
    helpfulCount: 44,
  },
  {
    id: "rev-6",
    name: "Usman Rafique",
    city: "Multan, Punjab",
    product: "Olive Leaf Cardiac Herbal Tea",
    category: "teas",
    rating: 5,
    date: "Verified Purchase &bull; 1 month ago",
    title: "Natural blood pressure support backed by science",
    review:
      "I drink two cups of Olive Leaf tea daily alongside my morning walks. It has a light herbal note, zero bitterness, and no caffeine jitters. My physician noticed a 10-point drop in my systolic blood pressure over 6 weeks. A true gift of nature.",
    verified: true,
    helpfulCount: 31,
  },
];

export function ReviewsPageView() {
  const [stories, setStories] = useState<CustomerStory[]>(INITIAL_STORIES);
  const [activeFilter, setActiveFilter] = useState<"all" | "flours" | "teas" | "spices" | "photos">("all");
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});
  const [lightboxPhoto, setLightboxPhoto] = useState<LightboxPhotoData | null>(null);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [productName, setProductName] = useState("Fat2Fuel Advance Multigrain Flour");
  const [category, setCategory] = useState<"flours" | "teas" | "spices">("flours");
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [bottomFormError, setBottomFormError] = useState<string | null>(null);
  const [bottomFormTouched, setBottomFormTouched] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setBottomFormTouched(true);

    const isNameValid = authorName.trim() !== "";
    const isCityValid = city.trim() !== "";
    const isReviewValid = reviewText.trim() !== "";

    // ONLY these 3 fields are strictly mandatory
    if (!isNameValid || !isCityValid || !isReviewValid) {
      const missing: string[] = [];
      if (!isNameValid) missing.push("Full Name");
      if (!isCityValid) missing.push("City");
      if (!isReviewValid) missing.push("Review Message");

      setBottomFormError(`Name, City, and Review message are required (missing: ${missing.join(", ")}).`);
      return;
    }

    setBottomFormError(null);

    const newStory: CustomerStory = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      city: city.trim(),
      product: productName,
      category,
      rating,
      date: "Verified Purchase &bull; Just now",
      title: title.trim() || `${productName} Review`,
      review: reviewText.trim(),
      image: photoPreview || undefined,
      photos: photoPreview ? [photoPreview] : [],
      verified: true,
      helpfulCount: 1,
    };

    setStories([newStory, ...stories]);
    setSubmittedSuccess(true);

    // Reset Form
    setTimeout(() => {
      setTitle("");
      setReviewText("");
      setAuthorName("");
      setCity("");
      setEmail("");
      setPhotoPreview(null);
      setRating(5);
      setSubmittedSuccess(false);
      setBottomFormTouched(false);
    }, 4000);
  };

  const handleHelpfulVote = (id: string) => {
    if (helpfulClicked[id]) return;
    setHelpfulClicked((prev) => ({ ...prev, [id]: true }));
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, helpfulCount: s.helpfulCount + 1 } : s))
    );
  };

  const filteredStories = stories.filter((s) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "photos") return Boolean(s.image || (s.photos && s.photos.length > 0));
    return s.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1510] flex flex-col justify-between selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3.5 flex items-center gap-2 text-xs text-[#6B5D52]">
            <Link href="/" className="hover:text-[#8B3A22] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/products" className="hover:text-[#8B3A22] transition-colors">
              Store
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-medium text-[#1E1510]">Verified Customer Reviews &amp; Stories</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header & Rating Breakdown */}
        <section className="relative py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#1E1510]/10 overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-2 -left-10 w-[380px] h-[380px] pointer-events-none -z-0"
            opacity={0.18}
            size={380}
          />
          <BotanicalWatermark
            type="herbal"
            className="absolute -bottom-10 -right-10 w-[420px] h-[420px] pointer-events-none -z-0"
            opacity={0.2}
            size={420}
          />

          <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Title & Intro */}
              <div className="lg:col-span-7">
                <span className="eyebrow">500+ Verified Experiences &bull; Transparent Reviews</span>
                <h1 className="mt-3 text-4xl sm:text-5xl font-serif text-[#1E1510] leading-tight">
                  Real Stories from <em className="italic font-normal text-[#8B3A22]">Real Kitchens</em>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[#5A4E45] font-light leading-relaxed">
                  Discover authentic feedback, meal photos, and health transformations from families across Pakistan who upgraded to Usman&apos;s Pure cold-stone chakki flours and organic botanicals.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/reviews/write"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-xs"
                  >
                    <PenLine className="w-4 h-4 text-[#E5B869]" />
                    <span>Write Your Review</span>
                  </Link>

                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-stone-50 border border-[#1E1510]/15 text-[#1E1510] text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                  >
                    <Camera className="w-4 h-4 text-[#8B3A22]" />
                    <span>Browse Photo Gallery</span>
                  </a>
                </div>
              </div>

              {/* Right Score Breakdown Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-sm border border-[#1E1510]/10 p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                    <div>
                      <div className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">4.9</div>
                      <div className="flex items-center text-amber-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <div className="text-xs text-stone-500 mt-1">Based on 524 verified orders</div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-800">96%</div>
                      <div className="text-xs text-stone-600 font-medium">Would Recommend to Family</div>
                      <div className="mt-1 text-[11px] text-stone-500">100% Real Buyers</div>
                    </div>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="mt-5 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-stone-600 font-medium">5 Star</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "92%" }} />
                      </div>
                      <span className="w-8 text-right text-stone-500">92%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-12 text-stone-600 font-medium">4 Star</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "6%" }} />
                      </div>
                      <span className="w-8 text-right text-stone-500">6%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-12 text-stone-600 font-medium">3 Star</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "2%" }} />
                      </div>
                      <span className="w-8 text-right text-stone-500">2%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-12 text-stone-600 font-medium">2 Star</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "0%" }} />
                      </div>
                      <span className="w-8 text-right text-stone-500">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Navigation Bar */}
        <section className="bg-white border-b border-[#1E1510]/10 sticky top-0 z-20 shadow-2xs">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {[
                { key: "all", label: "All Stories (524)" },
                { key: "photos", label: "📸 With Customer Photos" },
                { key: "flours", label: "Stone-Ground Flours" },
                { key: "teas", label: "Organic Herbal Teas" },
                { key: "spices", label: "Cold-Pounded Spices" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-colors cursor-pointer shrink-0 ${
                    activeFilter === f.key
                      ? "bg-[#1E1510] text-[#FAF7F2]"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="hidden md:inline-block text-xs text-[#6B5D52] font-medium shrink-0">
              Showing {filteredStories.length} Customer Experiences
            </span>
          </div>
        </section>

        {/* Photo-First Grid Section */}
        <section id="gallery" className="py-14 sm:py-20 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredStories.map((story) => {
                const storyPhotos =
                  story.photos && story.photos.length > 0
                    ? story.photos
                    : story.image
                    ? [story.image]
                    : [];

                return (
                  <article
                    key={story.id}
                    className="bg-white rounded-md border border-[#1E1510]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                  >
                    <div className="p-6">
                      {/* Rating & Verified Buyer Tag */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center text-amber-500">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="tag-quiet !text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Verified Buyer
                        </span>
                      </div>

                      <div className="text-[11px] font-bold text-[#8B3A22] uppercase tracking-wider mb-2">
                        {story.product}
                      </div>

                      {story.title && (
                        <h3 className="font-serif text-lg text-[#1E1510] font-semibold leading-snug">
                          {story.title}
                        </h3>
                      )}

                      {/* Review Quote Text */}
                      <p className="mt-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                        &ldquo;{story.review}&rdquo;
                      </p>

                      {/* Photos directly below review quote text */}
                      {storyPhotos.length > 0 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-1 scrollbar-thin">
                          {storyPhotos.map((photoUrl, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() =>
                                setLightboxPhoto({
                                  url: photoUrl,
                                  title: story.title || story.product,
                                  author: story.name,
                                  city: story.city,
                                  product: story.product,
                                })
                              }
                              className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-stone-200 cursor-pointer hover:opacity-90 shrink-0 shadow-2xs group focus:outline-hidden"
                              aria-label={`View full photo ${pIdx + 1} from ${story.name}`}
                            >
                              <Image
                                src={photoUrl}
                                alt={`${story.name} meal photo ${pIdx + 1}`}
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

                    {/* Footer Meta & Helpful Button */}
                    <div className="px-6 pb-6 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-stone-900">{story.name}</div>
                        <div className="text-[10px] text-stone-500">
                          {story.city} &bull; {story.date.split("&bull;")[1]?.trim() || "Verified"}
                        </div>
                      </div>

                      <button
                        onClick={() => handleHelpfulVote(story.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-medium transition cursor-pointer ${
                          helpfulClicked[story.id]
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-stone-50 hover:bg-stone-100 text-stone-600"
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{story.helpfulCount}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comprehensive Review Submission Form Section */}
        <section id="submit" className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-[#1E1510]/10">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-10">
              <span className="eyebrow">Your Honest Voice Matters</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1E1510]">
                Submit Your <em className="italic font-normal text-[#8B3A22]">Customer Story</em>
              </h2>
              <p className="mt-2 text-sm text-[#6B5D52]">
                Upload photos of your rotis, herbal infusions, or packaging to inspire the community.
              </p>
            </div>

            <div className="bg-white rounded-sm border border-[#1E1510]/10 p-8 sm:p-10 shadow-xs">
              {submittedSuccess ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-stone-900">
                    Review Submitted Successfully!
                  </h3>
                  <p className="mt-3 text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {authorName || "Friend"}! Your verified story and photograph have been added to our live customer gallery.
                  </p>
                  <a
                    href="#gallery"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#1E1510] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <span>View In Gallery &uarr;</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  {/* Interactive Star Rating */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800 mb-2">
                      Overall Rating (Select 1 to 5 Stars): *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-115"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-xs font-bold text-[#8B3A22] uppercase tracking-wider">
                        {rating === 5
                          ? "5 Stars — Outstanding Purity"
                          : rating === 4
                          ? "4 Stars — Very Good"
                          : `${rating} Stars`}
                      </span>
                    </div>
                  </div>

                  {/* Product Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800 mb-2">
                        Product Reviewed: *
                      </label>
                      <select
                        value={productName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setProductName(val);
                          if (val.includes("Tea")) setCategory("teas");
                          else if (val.includes("Turmeric") || val.includes("Chili") || val.includes("Spice"))
                            setCategory("spices");
                          else setCategory("flours");
                        }}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      >
                        <option value="Fat2Fuel Advance Multigrain Flour">
                          Fat2Fuel Advance Multigrain Flour (Weight Loss)
                        </option>
                        <option value="FENUGREEK Plus Diabetic Flour">
                          FENUGREEK Plus Diabetic-Care Flour
                        </option>
                        <option value="Basic Stone-Ground Whole Wheat Atta">
                          Basic Stone-Ground Chakki Flour
                        </option>
                        <option value="Giggly Grains Kids Immunity Flour">
                          Giggly Grains (Kids Immunity Flour)
                        </option>
                        <option value="NutraPrime Gluten-Free Multigrain Flour">
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

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800">
                          Review Headline
                        </label>
                        <span className="text-[11px] text-stone-500 font-normal">(Optional)</span>
                      </div>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Best atta for sugar balance & energy"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  {/* Visual Photo Upload Zone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800 mb-2">
                      Upload Meal / Product Photo <span className="font-normal text-stone-500">(Optional)</span>:
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {photoPreview ? (
                      <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-stone-300 bg-stone-100 flex items-center justify-center">
                        <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-stone-300 hover:border-[#8B3A22] rounded-sm p-6 text-center cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                        <div className="text-xs font-bold text-stone-800">
                          Click or Drag to Upload Meal / Product Photo
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1">
                          Supports PNG, JPG, WebP up to 10MB
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Detailed Story Textarea (Mandatory) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800">
                        Detailed Customer Experience <span className="text-[#8B3A22]">*</span>
                      </label>
                      <span className="text-[11px] font-semibold text-[#8B3A22]">Required</span>
                    </div>
                    <textarea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => {
                        setReviewText(e.target.value);
                        if (bottomFormError && e.target.value.trim() && authorName.trim() && city.trim()) {
                          setBottomFormError(null);
                        }
                      }}
                      placeholder="Share how this pure food impacted your digestion, energy, cooking, or family wellness..."
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                        bottomFormTouched && reviewText.trim() === ""
                          ? "border-rose-400 bg-rose-50/20"
                          : "border-stone-300"
                      }`}
                    />
                    {bottomFormTouched && reviewText.trim() === "" && (
                      <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Review message is required.</span>
                      </p>
                    )}
                  </div>

                  {/* Reviewer Name, City & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800">
                          Your Full Name <span className="text-[#8B3A22]">*</span>
                        </label>
                        <span className="text-[11px] font-semibold text-[#8B3A22]">Required</span>
                      </div>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => {
                          setAuthorName(e.target.value);
                          if (bottomFormError && e.target.value.trim() && city.trim() && reviewText.trim()) {
                            setBottomFormError(null);
                          }
                        }}
                        placeholder="e.g. Tariq Mahmood"
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                          bottomFormTouched && authorName.trim() === ""
                            ? "border-rose-400 bg-rose-50/20"
                            : "border-stone-300"
                        }`}
                      />
                      {bottomFormTouched && authorName.trim() === "" && (
                        <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Full name is required.</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800">
                          City &amp; Province <span className="text-[#8B3A22]">*</span>
                        </label>
                        <span className="text-[11px] font-semibold text-[#8B3A22]">Required</span>
                      </div>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (bottomFormError && authorName.trim() && e.target.value.trim() && reviewText.trim()) {
                            setBottomFormError(null);
                          }
                        }}
                        placeholder="e.g. Lahore, Punjab"
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 ${
                          bottomFormTouched && city.trim() === ""
                            ? "border-rose-400 bg-rose-50/20"
                            : "border-stone-300"
                        }`}
                      />
                      {bottomFormTouched && city.trim() === "" && (
                        <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>City is required.</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-[0.14em] text-stone-800">
                          Email Address
                        </label>
                        <span className="text-[11px] text-stone-500 font-normal">(Optional)</span>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="For verified buyer badge"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  {/* Inline Error Banner */}
                  {bottomFormError && (
                    <div
                      role="alert"
                      className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3 shadow-2xs"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-rose-950">Name, City, and Review message are required</p>
                        <p className="text-rose-700 leading-normal">{bottomFormError}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer shadow-xs"
                    >
                      Publish My Verified Story &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Image Preview Modal / Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header / Close button */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/40">
              <div>
                <div className="text-white text-sm sm:text-base font-semibold">
                  {lightboxPhoto.author} ({lightboxPhoto.city})
                </div>
                <div className="text-stone-400 text-xs mt-0.5">
                  Verified customer meal photo &bull; {lightboxPhoto.product}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Preview Image */}
            <div className="relative w-full max-h-[70vh] aspect-[4/3] bg-black/60 flex items-center justify-center">
              <Image
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </div>

            {/* Lightbox Footer Caption */}
            <div className="p-4 bg-stone-950 text-stone-300 text-xs sm:text-sm border-t border-white/10 flex items-center justify-between">
              <span className="font-serif italic text-white/90 truncate mr-3">
                &ldquo;{lightboxPhoto.title}&rdquo;
              </span>
              <span className="text-[11px] text-emerald-400 uppercase tracking-wider font-semibold shrink-0 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified Customer Photo
              </span>
            </div>
          </div>
        </div>
      )}

      <StoreFooter />
    </div>
  );
}
