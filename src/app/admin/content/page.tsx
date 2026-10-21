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
  ArrowUp,
  ArrowDown,
  Copy,
  Layers,
  HelpCircle,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { RichTextEditor } from "../components/RichTextEditor";
import { MediaLibraryModal, MediaItem } from "../components/MediaLibraryModal";

export type BlockType = "announcement" | "promo_banner" | "sale_spotlight" | "faq_item";

export interface CustomBlock {
  id: string;
  type: BlockType;
  title: string;
  content: string;
  badge?: string;
  status: "published" | "draft";
  link?: string;
  buttonText?: string;
}

export const DEFAULT_BLOCKS: CustomBlock[] = [
  {
    id: "block-1",
    type: "announcement",
    title: "Nationwide Free Delivery",
    content: "Free express dispatch across Pakistan on all stone-ground chakki flour orders above ₨2,000.",
    badge: "Free Shipping",
    status: "published",
    link: "/products",
    buttonText: "Shop Now",
  },
  {
    id: "block-2",
    type: "sale_spotlight",
    title: "Diabetic-Care Multigrain Batch",
    content: "Slow-milled whole grains with zero maida and 100% natural bran intact. Use code PURE10 at checkout.",
    badge: "Flat 10% OFF",
    status: "published",
    link: "/category/flours",
    buttonText: "Claim Discount",
  },
  {
    id: "block-3",
    type: "promo_banner",
    title: "Cold Stone-Pounded Haldi & Organic Spices",
    content: "Ground below 38°C to retain authentic essential oils, natural curcumin, and intense aroma.",
    badge: "Pure Harvest",
    status: "published",
    link: "/category/spices",
    buttonText: "Explore Spices",
  },
  {
    id: "block-4",
    type: "faq_item",
    title: "What makes traditional stone-ground chakki atta healthier?",
    content: "Unlike industrial roller mills which extract the nutrient-rich germ and overheat the wheat, our stone chakki grinds at low RPM preserving complete natural dietary fiber, germ, and vitamins.",
    badge: "Milling FAQ",
    status: "published",
  },
];

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
  blocks: CustomBlock[];
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
      blocks: (() => {
        if (typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem("usmans_pure_cms_blocks");
            if (raw) return JSON.parse(raw);
          } catch {}
        }
        return DEFAULT_BLOCKS;
      })(),
    }),
    [cmsContent]
  );

  const [formData, setFormData] = useState<ContentFormData>(getStateFromCMS);
  const [past, setPast] = useState<ContentFormData[]>([]);
  const [future, setFuture] = useState<ContentFormData[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [addBlockDropdownOpen, setAddBlockDropdownOpen] = useState(false);

  // Block management functions
  const handleAddBlock = (type: BlockType) => {
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    const titles: Record<BlockType, string> = {
      announcement: "Special Store Notice",
      promo_banner: "Fresh Seasonal Batch Offer",
      sale_spotlight: "Flash Weekend Discount",
      faq_item: "Frequently Asked Question",
    };
    const badges: Record<BlockType, string> = {
      announcement: "Store Alert",
      promo_banner: "Promo Offer",
      sale_spotlight: "Flash Sale",
      faq_item: "Pure FAQ",
    };
    const newBlock: CustomBlock = {
      id: `block-${Date.now()}`,
      type,
      title: titles[type],
      content: "Write customized section content, pure stone-ground benefits, and customer instructions here...",
      badge: badges[type],
      status: "published",
      link: "/products",
      buttonText: "Learn More",
    };
    setFormData((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    setAddBlockDropdownOpen(false);
    showToast(`New ${type.replace("_", " ")} block added!`);
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === formData.blocks.length - 1) return;
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newBlocks = [...formData.blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setFormData((prev) => ({ ...prev, blocks: newBlocks }));
    showToast(`Block moved ${direction}.`);
  };

  const handleDuplicateBlock = (index: number) => {
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    const original = formData.blocks[index];
    const clone: CustomBlock = {
      ...original,
      id: `block-${Date.now()}`,
      title: `${original.title} (Copy)`,
    };
    const newBlocks = [...formData.blocks];
    newBlocks.splice(index + 1, 0, clone);
    setFormData((prev) => ({ ...prev, blocks: newBlocks }));
    showToast("Block duplicated.");
  };

  const handleDeleteBlock = (id: string) => {
    if (confirm("Delete this block card?")) {
      setPast((prev) => [...prev.slice(-40), formData]);
      setFuture([]);
      setFormData((prev) => ({
        ...prev,
        blocks: prev.blocks.filter((b) => b.id !== id),
      }));
      showToast("Block removed.");
    }
  };

  const handleToggleBlockStatus = (id: string) => {
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    setFormData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === id ? { ...b, status: b.status === "published" ? "draft" : "published" } : b
      ),
    }));
  };

  const handleUpdateBlock = (id: string, updates: Partial<CustomBlock>) => {
    setFormData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

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

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("usmans_pure_cms_blocks", JSON.stringify(formData.blocks));
      } catch {}
    }

    showToast("Website content published! Changes are now live on the store.");
  };

  const handleReset = () => {
    if (confirm("Reset website text and banners to default values?")) {
      resetToDefaults();
      setPast([]);
      setFuture([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("usmans_pure_cms_blocks");
      }
      setFormData({
        ...getStateFromCMS(),
        blocks: DEFAULT_BLOCKS,
      });
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

          {/* Media Library Button */}
          <button
            type="button"
            onClick={() => setMediaModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition cursor-pointer"
            title="Open Media Library"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>Media Library</span>
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

          {/* 4.2 WordPress-Style Section & Block Builder */}
          <div className="pt-6 border-t border-stone-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-amber-800" />
                  <span>WordPress-Style Section &amp; Block Builder</span>
                </div>
                <h3 className="text-sm font-black text-stone-900 tracking-tight mt-0.5">
                  Dynamic Content Blocks &amp; Section Manager
                </h3>
                <p className="text-[11px] text-stone-500">
                  Compose, reorder with Move Up/Down, duplicate, draft, or publish custom content modules with rich text.
                </p>
              </div>

              {/* Add New Block Dropdown Trigger */}
              <div className="relative self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setAddBlockDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Block</span>
                </button>

                {addBlockDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-30 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <p className="text-[10px] uppercase font-bold text-stone-400 px-3 py-1">
                      Choose Block Type:
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("announcement")}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-stone-800 flex items-center gap-2 transition"
                    >
                      <Megaphone className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <p>Announcement Bar</p>
                        <p className="text-[10px] text-stone-500 font-normal">Top header ticker message</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("promo_banner")}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-stone-800 flex items-center gap-2 transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <p>Promotional Banner</p>
                        <p className="text-[10px] text-stone-500 font-normal">Featured promo card or teaser</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("sale_spotlight")}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-stone-800 flex items-center gap-2 transition"
                    >
                      <Flame className="w-4 h-4 text-orange-600 shrink-0" />
                      <div>
                        <p>Sale Spotlight</p>
                        <p className="text-[10px] text-stone-500 font-normal">Limited flash batch discount</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("faq_item")}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50 text-xs font-bold text-stone-800 flex items-center gap-2 transition"
                    >
                      <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <p>FAQ Item</p>
                        <p className="text-[10px] text-stone-500 font-normal">Customer question &amp; answer accordion</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Blocks List */}
            {formData.blocks.length === 0 ? (
              <div className="p-8 rounded-2xl border-2 border-dashed border-stone-200 text-center text-xs text-stone-500">
                No blocks created yet. Click &quot;+ Add New Block&quot; to build dynamic content.
              </div>
            ) : (
              <div className="space-y-4">
                {formData.blocks.map((block, index) => {
                  const typeColors: Record<BlockType, { bg: string; text: string; label: string }> = {
                    announcement: { bg: "bg-blue-100 text-blue-900 border-blue-200", text: "text-blue-700", label: "Announcement Bar" },
                    promo_banner: { bg: "bg-amber-100 text-amber-900 border-amber-200", text: "text-amber-700", label: "Promotional Banner" },
                    sale_spotlight: { bg: "bg-orange-100 text-orange-900 border-orange-200", text: "text-orange-700", label: "Sale Spotlight" },
                    faq_item: { bg: "bg-purple-100 text-purple-900 border-purple-200", text: "text-purple-700", label: "FAQ Item" },
                  };
                  const currentStyle = typeColors[block.type] || typeColors.promo_banner;

                  return (
                    <div
                      key={block.id}
                      className="p-5 rounded-3xl bg-stone-50 border border-stone-200 shadow-2xs space-y-4 transition"
                    >
                      {/* Block Action Bar: Type, Publish/Draft Switch, Move Up/Down, Duplicate, Delete */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-stone-400">
                            #{index + 1}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentStyle.bg}`}>
                            {currentStyle.label}
                          </span>
                          <span className="text-xs font-bold text-stone-900">
                            {block.title || "Untitled Block"}
                          </span>
                        </div>

                        {/* Block Action Controls */}
                        <div className="flex items-center gap-1.5">
                          {/* Live Toggle switch: Publish / Draft */}
                          <div className="flex items-center gap-1.5 mr-2 bg-white px-2.5 py-1 rounded-xl border border-stone-200 text-xs">
                            <button
                              type="button"
                              onClick={() => handleToggleBlockStatus(block.id)}
                              className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                                block.status === "published" ? "bg-emerald-600" : "bg-stone-300"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                                  block.status === "published" ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </button>
                            <span
                              className={`text-[11px] font-bold ${
                                block.status === "published" ? "text-emerald-700" : "text-stone-400"
                              }`}
                            >
                              {block.status === "published" ? "Published" : "Draft"}
                            </span>
                          </div>

                          {/* Move Up Button */}
                          <button
                            type="button"
                            onClick={() => handleMoveBlock(index, "up")}
                            disabled={index === 0}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-700 transition"
                            title="Move Block Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Move Down Button */}
                          <button
                            type="button"
                            onClick={() => handleMoveBlock(index, "down")}
                            disabled={index === formData.blocks.length - 1}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-700 transition"
                            title="Move Block Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Duplicate Button */}
                          <button
                            type="button"
                            onClick={() => handleDuplicateBlock(index)}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                            title="Duplicate Block"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600 transition cursor-pointer"
                            title="Delete Block"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Block Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            Block Title / Headline
                          </label>
                          <input
                            type="text"
                            value={block.title}
                            onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-900"
                            placeholder="e.g. Traditional Slow-Stone Ground Wheat"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            Badge Tag (Optional)
                          </label>
                          <input
                            type="text"
                            value={block.badge || ""}
                            onChange={(e) => handleUpdateBlock(block.id, { badge: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-800"
                            placeholder="e.g. Pure Heritage"
                          />
                        </div>
                      </div>

                      {/* WordPress-Style Visual Rich Editor for Block Body Content */}
                      <RichTextEditor
                        label="Block Body Content (WordPress Gutenberg Visual Toolbar)"
                        value={block.content}
                        onChange={(val) => handleUpdateBlock(block.id, { content: val })}
                        placeholder="Write block content with rich headings, bullet lists, formatting, and images..."
                        onOpenMediaLibrary={() => setMediaModalOpen(true)}
                        minHeight="min-h-[120px]"
                      />

                      {/* Block Footer Actions / Link */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                            Target Link (Optional)
                          </label>
                          <input
                            type="text"
                            value={block.link || ""}
                            onChange={(e) => handleUpdateBlock(block.id, { link: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs"
                            placeholder="e.g. /products or /category/flours"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                            CTA Button Text (Optional)
                          </label>
                          <input
                            type="text"
                            value={block.buttonText || ""}
                            onChange={(e) => handleUpdateBlock(block.id, { buttonText: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs"
                            placeholder="e.g. Explore Grains"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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

      {/* Centralized Media Library Modal */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelectMedia={(media) => {
          showToast(`Selected "${media.name}" (${media.url})`);
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
}
