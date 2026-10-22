"use client";

import React, { useState } from "react";
import { useStoreData, Review, ReviewStatus } from "@/context/StoreDataContext";
import {
  Star,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  EyeOff,
  Eye,
  Trash2,
  Edit3,
  X,
  BadgeCheck,
  MessageSquare,
  Sparkles,
  AlertCircle,
  ThumbsUp,
} from "lucide-react";

export default function AdminReviewsPage() {
  const { reviews, products, addReview, updateReview, deleteReview, toggleReviewStatus } = useStoreData();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ReviewStatus>("All");
  const [toastMessage, setToastMessage] = useState<string>("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Form fields
  const [formName, setFormName] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formProduct, setFormProduct] = useState("");
  const [formRating, setFormRating] = useState<number>(5);
  const [formReview, setFormReview] = useState("");
  const [formVerified, setFormVerified] = useState(true);
  const [formStatus, setFormStatus] = useState<ReviewStatus>("Published");
  const [formError, setFormError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Metrics
  const totalReviews = reviews.length;
  const publishedCount = reviews.filter((r) => r.status === "Published").length;
  const pendingCount = reviews.filter((r) => r.status === "Pending").length;
  const hiddenCount = reviews.filter((r) => r.status === "Hidden").length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
      : "5.0";

  // Filtered Reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.city && r.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingReview(null);
    setFormName("");
    setFormCity("Lahore, Punjab");
    setFormProduct(products[0]?.title || "Fat2Fuel Advance Multigrain Flour");
    setFormRating(5);
    setFormReview("");
    setFormVerified(true);
    setFormStatus("Published");
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setFormName(review.name);
    setFormCity(review.city || "");
    setFormProduct(review.product);
    setFormRating(review.rating);
    setFormReview(review.review);
    setFormVerified(review.verified);
    setFormStatus(review.status);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formReview.trim()) {
      setFormError("Customer Name and Review text are required.");
      return;
    }

    if (editingReview) {
      updateReview(editingReview.id, {
        name: formName.trim(),
        city: formCity.trim() || "Pakistan",
        product: formProduct,
        rating: formRating,
        review: formReview.trim(),
        verified: formVerified,
        status: formStatus,
      });
      showToast("Review successfully updated!");
    } else {
      addReview({
        name: formName.trim(),
        city: formCity.trim() || "Pakistan",
        product: formProduct,
        rating: formRating,
        review: formReview.trim(),
        verified: formVerified,
        status: formStatus,
      });
      showToast("New review successfully published!");
    }

    setIsModalOpen(false);
  };

  const handleApprove = (id: string, name: string) => {
    updateReview(id, { status: "Published", verified: true });
    showToast(`Review by ${name} is now Published!`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete review from "${name}"?`)) {
      deleteReview(id);
      showToast(`Review by ${name} removed.`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D2D1B] bg-[#8D2D1B]/10 px-2.5 py-0.5 rounded-full">
              Verified Feedback CMS
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs font-semibold text-stone-500">Live Storefront Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Manage genuine Pakistani household ratings, approve pending submissions, and edit displayed testimonials.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8D2D1B] hover:bg-[#722315] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#8D2D1B]/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Review</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Reviews</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">{totalReviews}</div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
            <span>Storefront verified database</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Published</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700 mt-1">{publishedCount}</div>
          <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active on Home & Shop</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Approval</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-700 mt-1">{pendingCount}</div>
          <div className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Customer submissions awaiting review</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Average Rating</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 flex items-center gap-2">
            <span>{avgRating}</span>
            <div className="flex text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>High trust satisfaction score</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(["All", "Published", "Pending", "Hidden"] as const).map((status) => {
            const count =
              status === "All"
                ? totalReviews
                : status === "Published"
                ? publishedCount
                : status === "Pending"
                ? pendingCount
                : hiddenCount;

            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#8D2D1B] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, city, review..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-[#8D2D1B] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Reviews Table / Card List */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 px-4">
            <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No reviews found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No reviews match "${searchQuery}". Try clearing search keywords.`
                : "No reviews in this category yet. Click '+ Add New Review' to create one."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 hover:bg-stone-50/60 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                {/* Left Review Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Stars */}
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-stone-200 text-stone-200"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-xs font-bold text-stone-900">{item.name}</span>

                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                        <BadgeCheck className="w-3 h-3 text-emerald-600" />
                        Verified Buyer
                      </span>
                    )}

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.status === "Published"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "Pending"
                          ? "bg-amber-100 text-amber-800 animate-pulse"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="text-[11px] text-stone-400">• {item.date}</span>
                    {item.city && (
                      <span className="text-[11px] text-stone-500 font-medium">({item.city})</span>
                    )}
                  </div>

                  {/* Product Tag */}
                  <div className="text-xs font-bold text-[#8D2D1B]">
                    Product: <span className="text-stone-800 font-normal">{item.product}</span>
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-stone-50/80 p-3 rounded-lg border border-stone-200/50">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center md:flex-col gap-2 shrink-0 md:min-w-[130px] pt-1">
                  {item.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(item.id, item.name)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer w-full"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleReviewStatus(item.id)}
                    className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer w-full ${
                      item.status === "Published"
                        ? "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                        : "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                    }`}
                  >
                    {item.status === "Published" ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-stone-500" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Publish</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openEditModal(item)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer w-full"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors cursor-pointer w-full"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {editingReview ? "Edit Customer Review" : "Add New Customer Review"}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Save authentic Pakistani customer feedback directly to live store.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Customer Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mahmood"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-[#8D2D1B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore, Punjab"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-[#8D2D1B] focus:bg-white"
                  />
                </div>
              </div>

              {/* Product Select */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Reviewed Product</label>
                <select
                  value={formProduct}
                  onChange={(e) => setFormProduct(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-[#8D2D1B] focus:bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                  <option value="Fat Loss Transformation Combo">Fat Loss Transformation Combo</option>
                  <option value="General Store Experience">General Store Experience & Delivery</option>
                </select>
              </div>

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormRating(star)}
                      className="p-1 rounded hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-stone-200 text-stone-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-600 ml-2">
                    {formRating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Review Feedback / Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details of roti texture, health benefits, spice purity, or delivery speed..."
                  value={formReview}
                  onChange={(e) => setFormReview(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-[#8D2D1B] focus:bg-white"
                />
              </div>

              {/* Toggles: Verified Buyer & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <input
                    type="checkbox"
                    id="formVerified"
                    checked={formVerified}
                    onChange={(e) => setFormVerified(e.target.checked)}
                    className="w-4 h-4 text-[#8D2D1B] rounded border-stone-300 focus:ring-[#8D2D1B]"
                  />
                  <label htmlFor="formVerified" className="text-xs font-bold text-stone-700 cursor-pointer">
                    Verified Buyer Badge
                  </label>
                </div>

                <div>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ReviewStatus)}
                    className="w-full px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-bold text-stone-900 focus:outline-hidden focus:border-[#8D2D1B]"
                  >
                    <option value="Published">Status: Published (Live)</option>
                    <option value="Pending">Status: Pending Review</option>
                    <option value="Hidden">Status: Hidden</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8D2D1B] hover:bg-[#722315] text-white text-xs font-bold shadow-md shadow-[#8D2D1B]/20 transition-all cursor-pointer"
                >
                  {editingReview ? "Save Changes" : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
