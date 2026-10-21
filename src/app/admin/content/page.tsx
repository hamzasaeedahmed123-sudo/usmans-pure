"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStoreData } from "@/context/StoreDataContext";
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
} from "lucide-react";

export default function AdminContentPage() {
  const { cmsContent, updateCMS, resetToDefaults } = useStoreData();

  // Local editable state
  const [announcementText, setAnnouncementText] = useState(cmsContent.announcementBarText);
  const [announcementSub, setAnnouncementSub] = useState(cmsContent.announcementSubText);

  // Hero slides local edits
  const [flourTitle, setFlourTitle] = useState(cmsContent.heroSlides.flour.title);
  const [flourSubtitle, setFlourSubtitle] = useState(cmsContent.heroSlides.flour.subtitle);
  const [flourFullTitle, setFlourFullTitle] = useState(cmsContent.heroSlides.flour.fullTitle);
  const [flourBenefit, setFlourBenefit] = useState(cmsContent.heroSlides.flour.benefit);
  const [flourPrice, setFlourPrice] = useState(cmsContent.heroSlides.flour.price);

  const [teaTitle, setTeaTitle] = useState(cmsContent.heroSlides.herbals.title);
  const [teaSubtitle, setTeaSubtitle] = useState(cmsContent.heroSlides.herbals.subtitle);
  const [teaFullTitle, setTeaFullTitle] = useState(cmsContent.heroSlides.herbals.fullTitle);
  const [teaBenefit, setTeaBenefit] = useState(cmsContent.heroSlides.herbals.benefit);
  const [teaPrice, setTeaPrice] = useState(cmsContent.heroSlides.herbals.price);

  const [spiceTitle, setSpiceTitle] = useState(cmsContent.heroSlides.spices.title);
  const [spiceSubtitle, setSpiceSubtitle] = useState(cmsContent.heroSlides.spices.subtitle);
  const [spiceFullTitle, setSpiceFullTitle] = useState(cmsContent.heroSlides.spices.fullTitle);
  const [spiceBenefit, setSpiceBenefit] = useState(cmsContent.heroSlides.spices.benefit);
  const [spicePrice, setSpicePrice] = useState(cmsContent.heroSlides.spices.price);

  // Promo toggles
  const [doctorsChoice, setDoctorsChoice] = useState(cmsContent.promotions.doctorsChoiceEnabled);
  const [dietBanner, setDietBanner] = useState(cmsContent.promotions.dietBannerEnabled);
  const [megaBundles, setMegaBundles] = useState(cmsContent.promotions.megaBundlesEnabled);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    updateCMS({
      announcementBarText: announcementText,
      announcementSubText: announcementSub,
      heroSlides: {
        flour: {
          ...cmsContent.heroSlides.flour,
          title: flourTitle,
          subtitle: flourSubtitle,
          fullTitle: flourFullTitle,
          benefit: flourBenefit,
          price: flourPrice,
        },
        herbals: {
          ...cmsContent.heroSlides.herbals,
          title: teaTitle,
          subtitle: teaSubtitle,
          fullTitle: teaFullTitle,
          benefit: teaBenefit,
          price: teaPrice,
        },
        spices: {
          ...cmsContent.heroSlides.spices,
          title: spiceTitle,
          subtitle: spiceSubtitle,
          fullTitle: spiceFullTitle,
          benefit: spiceBenefit,
          price: spicePrice,
        },
      },
      promotions: {
        ...cmsContent.promotions,
        doctorsChoiceEnabled: doctorsChoice,
        dietBannerEnabled: dietBanner,
        megaBundlesEnabled: megaBundles,
      },
    });

    showToast("Website content published! Changes are now live on the store.");
  };

  const handleReset = () => {
    if (confirm("Reset website text and banners to default values?")) {
      resetToDefaults();
      showToast("Store content reset to default state.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1C1613] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
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
            Instantly edit marquee shipping tickers, 3-slide hero headlines, and toggle promotional sections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
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
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Secondary Shipping Offer
              </label>
              <input
                type="text"
                value={announcementSub}
                onChange={(e) => setAnnouncementSub(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>
          </div>

          {/* Live Preview Bar */}
          <div className="p-2.5 rounded-xl bg-[#2A1F17] text-white text-center text-xs font-medium flex items-center justify-center gap-2 shadow-xs">
            <span className="text-amber-400 font-bold uppercase text-[10px]">Live Preview:</span>
            <span>{announcementText}</span>
            <span className="opacity-40">|</span>
            <span className="font-semibold text-stone-200">{announcementSub}</span>
          </div>
        </div>

        {/* 3. Hero Section Slider CMS (3 Slides) */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Sliders className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Hero Showcase Slide Copy (3 Main Categories)
              </h2>
              <p className="text-xs text-stone-500">
                Large kinetic 3D typography, product titles, benefit sentences, and default displayed prices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Slide 1: Multigrain Flour */}
            <div className="p-5 rounded-2xl bg-[#FAF5EE] border border-amber-900/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-900/10">
                <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                  Slide 1: Chakki Flour
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#8C6D46]" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 1</label>
                <input
                  type="text"
                  value={flourTitle}
                  onChange={(e) => setFlourTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 2</label>
                <input
                  type="text"
                  value={flourSubtitle}
                  onChange={(e) => setFlourSubtitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Card Full Title</label>
                <input
                  type="text"
                  value={flourFullTitle}
                  onChange={(e) => setFlourFullTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Benefit Description</label>
                <textarea
                  rows={2}
                  value={flourBenefit}
                  onChange={(e) => setFlourBenefit(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Featured Price</label>
                <input
                  type="text"
                  value={flourPrice}
                  onChange={(e) => setFlourPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>
            </div>

            {/* Slide 2: Herbal Teas */}
            <div className="p-5 rounded-2xl bg-[#F0F7F3] border border-emerald-900/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-900/10">
                <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                  Slide 2: Herbal Teas
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A3E]" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 1</label>
                <input
                  type="text"
                  value={teaTitle}
                  onChange={(e) => setTeaTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 2</label>
                <input
                  type="text"
                  value={teaSubtitle}
                  onChange={(e) => setTeaSubtitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Card Full Title</label>
                <input
                  type="text"
                  value={teaFullTitle}
                  onChange={(e) => setTeaFullTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Benefit Description</label>
                <textarea
                  rows={2}
                  value={teaBenefit}
                  onChange={(e) => setTeaBenefit(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Featured Price</label>
                <input
                  type="text"
                  value={teaPrice}
                  onChange={(e) => setTeaPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>
            </div>

            {/* Slide 3: Organic Spices */}
            <div className="p-5 rounded-2xl bg-[#FAF0ED] border border-red-900/15 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-red-900/10">
                <span className="text-xs font-black text-red-950 uppercase tracking-wide">
                  Slide 3: Pure Spices
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E3E26]" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 1</label>
                <input
                  type="text"
                  value={spiceTitle}
                  onChange={(e) => setSpiceTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Title Line 2</label>
                <input
                  type="text"
                  value={spiceSubtitle}
                  onChange={(e) => setSpiceSubtitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Card Full Title</label>
                <input
                  type="text"
                  value={spiceFullTitle}
                  onChange={(e) => setSpiceFullTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Benefit Description</label>
                <textarea
                  rows={2}
                  value={spiceBenefit}
                  onChange={(e) => setSpiceBenefit(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">Featured Price</label>
                <input
                  type="text"
                  value={spicePrice}
                  onChange={(e) => setSpicePrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Promotional Banners Visibility Toggles */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Section Visibility & Promotional Banners
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
                onClick={() => setDoctorsChoice(!doctorsChoice)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  doctorsChoice ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    doctorsChoice ? "translate-x-5" : "translate-x-0"
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
                onClick={() => setDietBanner(!dietBanner)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  dietBanner ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    dietBanner ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Mega Bundles Spotlight</p>
                <p className="text-[11px] text-stone-500">Value packs & savings section</p>
              </div>
              <button
                type="button"
                onClick={() => setMegaBundles(!megaBundles)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                  megaBundles ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    megaBundles ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Sticky Publish CTA */}
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
            <span>Save & Publish Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}
