"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useStoreData, CustomPromoBanner } from "@/context/StoreDataContext";
import {
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Eye,
  Sliders,
  Type,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Megaphone,
  Flame,
  Sparkles,
  Plus,
  Trash2,
  Tag,
  Undo2,
  Redo2,
} from "lucide-react";

interface ContentFormData {
  announcementText: string;
  announcementSub: string;
  flourTitle: string;
  flourSubtitle: string;
  flourFullTitle: string;
  flourBenefit: string;
  flourPrice: string;
  teaTitle: string;
  teaSubtitle: string;
  teaFullTitle: string;
  teaBenefit: string;
  teaPrice: string;
  spiceTitle: string;
  spiceSubtitle: string;
  spiceFullTitle: string;
  spiceBenefit: string;
  spicePrice: string;
  doctorsChoice: boolean;
  dietBanner: boolean;
  megaBundles: boolean;
  saleBannerEnabled: boolean;
  saleBadgeTitle: string;
  saleDiscountTag: string;
  saleBannerSubtext: string;
  saleButtonText: string;
  saleLink: string;
  customBanners: CustomPromoBanner[];
}

export default function AdminContentPage() {
  const { cmsContent, updateCMS, resetToDefaults } = useStoreData();

  // Helper to extract state from cmsContent
  const getStateFromCMS = useCallback(
    (): ContentFormData => ({
      announcementText: cmsContent.announcementBarText,
      announcementSub: cmsContent.announcementSubText,
      flourTitle: cmsContent.heroSlides.flour.title,
      flourSubtitle: cmsContent.heroSlides.flour.subtitle,
      flourFullTitle: cmsContent.heroSlides.flour.fullTitle,
      flourBenefit: cmsContent.heroSlides.flour.benefit,
      flourPrice: cmsContent.heroSlides.flour.price,
      teaTitle: cmsContent.heroSlides.herbals.title,
      teaSubtitle: cmsContent.heroSlides.herbals.subtitle,
      teaFullTitle: cmsContent.heroSlides.herbals.fullTitle,
      teaBenefit: cmsContent.heroSlides.herbals.benefit,
      teaPrice: cmsContent.heroSlides.herbals.price,
      spiceTitle: cmsContent.heroSlides.spices.title,
      spiceSubtitle: cmsContent.heroSlides.spices.subtitle,
      spiceFullTitle: cmsContent.heroSlides.spices.fullTitle,
      spiceBenefit: cmsContent.heroSlides.spices.benefit,
      spicePrice: cmsContent.heroSlides.spices.price,
      doctorsChoice: cmsContent.promotions.doctorsChoiceEnabled,
      dietBanner: cmsContent.promotions.dietBannerEnabled,
      megaBundles: cmsContent.promotions.megaBundlesEnabled,
      saleBannerEnabled: cmsContent.saleBanner?.enabled ?? true,
      saleBadgeTitle: cmsContent.saleBanner?.badgeTitle || "Grand Opening Sale",
      saleDiscountTag: cmsContent.saleBanner?.discountTag || "Flat 15% OFF on Multigrain Flour",
      saleBannerSubtext:
        cmsContent.saleBanner?.subtext ||
        "Fresh stone-milled chakki flour packed with 100% natural wheat germ. Use code PURE15 at checkout.",
      saleButtonText: cmsContent.saleBanner?.buttonText || "Shop Flash Sale",
      saleLink: cmsContent.saleBanner?.link || "/products",
      customBanners: cmsContent.customBanners || [],
    }),
    [cmsContent]
  );

  const [formData, setFormData] = useState<ContentFormData>(getStateFromCMS);
  const [past, setPast] = useState<ContentFormData[]>([]);
  const [future, setFuture] = useState<ContentFormData[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  // Sync state if cmsContent updates externally (e.g. on first hydration)
  useEffect(() => {
    setFormData(getStateFromCMS());
  }, [getStateFromCMS]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // History tracking helpers
  const updateField = <K extends keyof ContentFormData>(key: K, value: ContentFormData[K]) => {
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateFormDataBatch = (updater: (prev: ContentFormData) => ContentFormData) => {
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    setFormData(updater);
  };

  const handleUndo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setFuture((prev) => [formData, ...prev]);
    setFormData(previous);
    setPast(newPast);
    showToast("Undo applied");
  }, [past, formData]);

  const handleRedo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast((prev) => [...prev, formData]);
    setFormData(next);
    setFuture(newFuture);
    showToast("Redo applied");
  }, [future, formData]);

  // Global Ctrl+Z / Ctrl+Y keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    updateCMS({
      announcementBarText: formData.announcementText,
      announcementSubText: formData.announcementSub,
      heroSlides: {
        flour: {
          ...cmsContent.heroSlides.flour,
          title: formData.flourTitle,
          subtitle: formData.flourSubtitle,
          fullTitle: formData.flourFullTitle,
          benefit: formData.flourBenefit,
          price: formData.flourPrice,
        },
        herbals: {
          ...cmsContent.heroSlides.herbals,
          title: formData.teaTitle,
          subtitle: formData.teaSubtitle,
          fullTitle: formData.teaFullTitle,
          benefit: formData.teaBenefit,
          price: formData.teaPrice,
        },
        spices: {
          ...cmsContent.heroSlides.spices,
          title: formData.spiceTitle,
          subtitle: formData.spiceSubtitle,
          fullTitle: formData.spiceFullTitle,
          benefit: formData.spiceBenefit,
          price: formData.spicePrice,
        },
      },
      promotions: {
        ...cmsContent.promotions,
        doctorsChoiceEnabled: formData.doctorsChoice,
        dietBannerEnabled: formData.dietBanner,
        megaBundlesEnabled: formData.megaBundles,
      },
      saleBanner: {
        enabled: formData.saleBannerEnabled,
        badgeTitle: formData.saleBadgeTitle,
        discountTag: formData.saleDiscountTag,
        subtext: formData.saleBannerSubtext,
        buttonText: formData.saleButtonText,
        link: formData.saleLink,
      },
      customBanners: formData.customBanners,
    });

    showToast("Website content published! Changes are now live on the store.");
  };

  const handleReset = () => {
    if (confirm("Reset website text and banners to default values?")) {
      resetToDefaults();
      setPast([]);
      setFuture([]);
      showToast("Store content reset to default state.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1C1613] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Undo, Redo, Reset & Live Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 tracking-wide uppercase">
            <span>Visual Content Management</span>
            <span>•</span>
            <span className="text-emerald-700">Zero-Code Updates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
            Website Text & Banner CMS Editor
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Instantly edit marquee shipping tickers, promotional banners, 3-slide hero headlines, and section visibility.
          </p>
        </div>

        {/* Action Controls: Undo, Redo, Reset, Preview */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Undo Button */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={past.length === 0}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
            title="Undo last change (Ctrl+Z / Cmd+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          {/* Redo Button */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={future.length === 0}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
            title="Redo change (Ctrl+Y / Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
            <span>Redo</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Preview Live */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live</span>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* 2. Top Announcement Bar Editor */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Megaphone className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Top Announcement Marquee Bar
              </h2>
              <p className="text-xs text-stone-500">
                Topmost continuous banner across all customer pages
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Primary Marquee Headline
              </label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) => updateField("announcementText", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Secondary Shipping Offer
              </label>
              <input
                type="text"
                value={formData.announcementSub}
                onChange={(e) => updateField("announcementSub", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>
          </div>

          {/* Live Preview Bar */}
          <div className="p-2.5 rounded-xl bg-[#2A1F17] text-white text-center text-xs font-medium flex items-center justify-center gap-2 shadow-xs">
            <span className="text-amber-400 font-bold uppercase text-[10px]">Live Preview:</span>
            <span>{formData.announcementText}</span>
            <span className="opacity-40">|</span>
            <span className="font-semibold text-stone-200">{formData.announcementSub}</span>
          </div>
        </div>

        {/* 3. Hero Section Slider Content */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Sliders className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Hero Slider Headlines &amp; Featured Slide Copy
              </h2>
              <p className="text-xs text-stone-500">
                Text content for the 3 homepage hero slides (Flours, Teas, Spices)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slide 1: Flour */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                <span className="font-bold text-xs text-amber-950 uppercase tracking-wider">Slide 1: Chakki Flour</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-900 text-amber-100">Hero Main</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 1</label>
                <input
                  type="text"
                  value={formData.flourTitle}
                  onChange={(e) => updateField("flourTitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 2</label>
                <input
                  type="text"
                  value={formData.flourSubtitle}
                  onChange={(e) => updateField("flourSubtitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Card Full Title</label>
                <input
                  type="text"
                  value={formData.flourFullTitle}
                  onChange={(e) => updateField("flourFullTitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Benefit Description</label>
                <textarea
                  rows={2}
                  value={formData.flourBenefit}
                  onChange={(e) => updateField("flourBenefit", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Featured Price</label>
                <input
                  type="text"
                  value={formData.flourPrice}
                  onChange={(e) => updateField("flourPrice", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>
            </div>

            {/* Slide 2: Herbals */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                <span className="font-bold text-xs text-emerald-950 uppercase tracking-wider">Slide 2: Herbal Teas</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100">Wellness</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 1</label>
                <input
                  type="text"
                  value={formData.teaTitle}
                  onChange={(e) => updateField("teaTitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 2</label>
                <input
                  type="text"
                  value={formData.teaSubtitle}
                  onChange={(e) => updateField("teaSubtitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Card Full Title</label>
                <input
                  type="text"
                  value={formData.teaFullTitle}
                  onChange={(e) => updateField("teaFullTitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Benefit Description</label>
                <textarea
                  rows={2}
                  value={formData.teaBenefit}
                  onChange={(e) => updateField("teaBenefit", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Featured Price</label>
                <input
                  type="text"
                  value={formData.teaPrice}
                  onChange={(e) => updateField("teaPrice", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>
            </div>

            {/* Slide 3: Spices */}
            <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/70 space-y-3">
              <div className="flex items-center justify-between border-b border-orange-200/60 pb-2">
                <span className="font-bold text-xs text-orange-950 uppercase tracking-wider">Slide 3: Spices</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-900 text-orange-100">Aromatic</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 1</label>
                <input
                  type="text"
                  value={formData.spiceTitle}
                  onChange={(e) => updateField("spiceTitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 2</label>
                <input
                  type="text"
                  value={formData.spiceSubtitle}
                  onChange={(e) => updateField("spiceSubtitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Card Full Title</label>
                <input
                  type="text"
                  value={formData.spiceFullTitle}
                  onChange={(e) => updateField("spiceFullTitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Benefit Description</label>
                <textarea
                  rows={2}
                  value={formData.spiceBenefit}
                  onChange={(e) => updateField("spiceBenefit", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Featured Price</label>
                <input
                  type="text"
                  value={formData.spicePrice}
                  onChange={(e) => updateField("spicePrice", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Promotional Banners & Sale Engine (WordPress-Style CMS) */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              <div>
                <h2 className="text-base font-bold text-stone-900 tracking-tight">
                  Promotional Banners &amp; Sale Engine
                </h2>
                <p className="text-xs text-stone-500">
                  Configure flash discounts, sale ribbons, and promotional teasers on the storefront
                </p>
              </div>
            </div>

            {/* Flash Sale Toggle: [Enable / Disable] */}
            <div className="flex items-center gap-2.5 bg-stone-50 p-2 px-3.5 rounded-2xl border border-stone-200 self-start sm:self-auto">
              <span className="text-xs font-bold text-stone-800">Flash Sale Banner:</span>
              <button
                type="button"
                onClick={() => updateField("saleBannerEnabled", !formData.saleBannerEnabled)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  formData.saleBannerEnabled ? "bg-amber-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.saleBannerEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-bold ${formData.saleBannerEnabled ? "text-amber-800" : "text-stone-400"}`}>
                {formData.saleBannerEnabled ? "[Enabled]" : "[Disabled]"}
              </span>
            </div>
          </div>

          {/* WordPress-Style Sale Badge & Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Sale Badge Title
              </label>
              <input
                type="text"
                value={formData.saleBadgeTitle}
                onChange={(e) => updateField("saleBadgeTitle", e.target.value)}
                placeholder="e.g. Grand Opening Sale"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Sale Tag (Discount)
              </label>
              <input
                type="text"
                value={formData.saleDiscountTag}
                onChange={(e) => updateField("saleDiscountTag", e.target.value)}
                placeholder="e.g. Flat 15% Off"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Target Link
              </label>
              <input
                type="text"
                value={formData.saleLink}
                onChange={(e) => updateField("saleLink", e.target.value)}
                placeholder="e.g. /products or /category/flours"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Heading &amp; Subtext Description
              </label>
              <textarea
                rows={2}
                value={formData.saleBannerSubtext}
                onChange={(e) => updateField("saleBannerSubtext", e.target.value)}
                placeholder="Fresh stone-milled chakki flour packed with 100% natural wheat germ. Use code PURE15 at checkout."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40 leading-relaxed"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 p-4 sm:p-5 text-white shadow-md border border-amber-800/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Live Banner Preview
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${formData.saleBannerEnabled ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/10 text-stone-400"}`}>
                {formData.saleBannerEnabled ? "Active on Storefront" : "Disabled (Hidden)"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[11px] font-black uppercase tracking-wider mb-1">
                  {formData.saleBadgeTitle || "Grand Opening Sale"}
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-amber-100">
                  {formData.saleDiscountTag || "Flat 15% OFF on Multigrain Flour"}
                </h4>
                <p className="text-xs text-stone-300 max-w-xl mt-0.5 leading-relaxed">
                  {formData.saleBannerSubtext || "Banner description details..."}
                </p>
              </div>
              <Link
                href={formData.saleLink || "/products"}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 transition"
              >
                {formData.saleButtonText || "Shop Flash Sale"}
              </Link>
            </div>
          </div>

          {/* Custom Promo Banners List & Add Trigger */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Custom Promo Banners &amp; Teasers
                </h3>
                <p className="text-[11px] text-stone-500">
                  Configure additional promo teasers on the storefront for seasonal offers
                </p>
              </div>

              {/* Add Custom Banner Trigger */}
              <button
                type="button"
                onClick={() => {
                  const newBanner: CustomPromoBanner = {
                    id: `banner-${Date.now()}`,
                    badge: "Special Promo",
                    title: "Seasonal Fresh Harvest",
                    discountTag: "Flat 10% Bundle Discount",
                    description: "Pure whole-grain chakki atta packed fresh with zero preservatives.",
                    link: "/products",
                    buttonText: "Shop Special",
                    bgColor: "#2A1F17",
                    enabled: true,
                  };
                  updateFormDataBatch((prev) => ({
                    ...prev,
                    customBanners: [...prev.customBanners, newBanner],
                  }));
                  showToast("New Custom Banner Section added!");
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Custom Announcement Bar / Promo Card</span>
              </button>
            </div>

            {formData.customBanners.length === 0 ? (
              <div className="p-4 rounded-2xl border border-dashed border-stone-200 text-center text-xs text-stone-500">
                No custom promo banners created yet. Click &quot;+ Add Custom Announcement Bar / Promo Card&quot; to configure one.
              </div>
            ) : (
              <div className="space-y-3">
                {formData.customBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-amber-800" />
                        <span>Promo Teaser #{index + 1}: {banner.badge}</span>
                      </span>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={banner.enabled}
                            onChange={(e) => {
                              const updated = formData.customBanners.map((b) =>
                                b.id === banner.id ? { ...b, enabled: e.target.checked } : b
                              );
                              updateField("customBanners", updated);
                            }}
                            className="rounded text-amber-800"
                          />
                          <span>Enabled</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const filtered = formData.customBanners.filter((b) => b.id !== banner.id);
                            updateField("customBanners", filtered);
                            showToast("Custom banner removed.");
                          }}
                          className="p-1 rounded-lg hover:bg-red-50 text-red-600 transition cursor-pointer"
                          title="Delete Custom Banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Badge Title</label>
                        <input
                          type="text"
                          value={banner.badge}
                          onChange={(e) => {
                            const updated = formData.customBanners.map((b) =>
                              b.id === banner.id ? { ...b, badge: e.target.value } : b
                            );
                            updateField("customBanners", updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Section Title</label>
                        <input
                          type="text"
                          value={banner.title}
                          onChange={(e) => {
                            const updated = formData.customBanners.map((b) =>
                              b.id === banner.id ? { ...b, title: e.target.value } : b
                            );
                            updateField("customBanners", updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Discount Tag</label>
                        <input
                          type="text"
                          value={banner.discountTag}
                          onChange={(e) => {
                            const updated = formData.customBanners.map((b) =>
                              b.id === banner.id ? { ...b, discountTag: e.target.value } : b
                            );
                            updateField("customBanners", updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Description Text</label>
                        <input
                          type="text"
                          value={banner.description}
                          onChange={(e) => {
                            const updated = formData.customBanners.map((b) =>
                              b.id === banner.id ? { ...b, description: e.target.value } : b
                            );
                            updateField("customBanners", updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Button Text</label>
                        <input
                          type="text"
                          value={banner.buttonText}
                          onChange={(e) => {
                            const updated = formData.customBanners.map((b) =>
                              b.id === banner.id ? { ...b, buttonText: e.target.value } : b
                            );
                            updateField("customBanners", updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. Promotional Banners Visibility Toggles */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Section Visibility &amp; Promotional Modules
              </h2>
              <p className="text-xs text-stone-500">
                Turn promotional modules on or off across the customer storefront
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Doctor&apos;s Choice Banner</p>
                <p className="text-[11px] text-stone-500">Clinical recommendations badge</p>
              </div>
              <button
                type="button"
                onClick={() => updateField("doctorsChoice", !formData.doctorsChoice)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  formData.doctorsChoice ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.doctorsChoice ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Diet Consultation Banner</p>
                <p className="text-[11px] text-stone-500">WhatsApp direct nutrition guide</p>
              </div>
              <button
                type="button"
                onClick={() => updateField("dietBanner", !formData.dietBanner)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  formData.dietBanner ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.dietBanner ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Mega Bundles Spotlight</p>
                <p className="text-[11px] text-stone-500">Value packs &amp; savings section</p>
              </div>
              <button
                type="button"
                onClick={() => updateField("megaBundles", !formData.megaBundles)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  formData.megaBundles ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    formData.megaBundles ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 6. Sticky Publish CTA */}
        <div className="sticky bottom-6 z-20 flex items-center justify-between p-4 px-6 rounded-2xl bg-[#1C1613] text-white shadow-2xl border border-white/20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold">Unsaved changes ready for production publish</span>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md cursor-pointer transition hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Publish Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}
