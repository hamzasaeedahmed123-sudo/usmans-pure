"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  X,
  Search,
  Copy,
  Check,
  ExternalLink,
  Filter,
  FileImage,
} from "lucide-react";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  date: string;
  type: string;
}

const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: "media-prod-1",
    name: "100% Whole Wheat Chakki Atta",
    url: "/images/products/prod-1.jpg",
    size: "420 KB",
    date: "2026-10-15",
    type: "image/jpeg",
  },
  {
    id: "media-prod-2",
    name: "Pure Artisanal Kashmiri Herbal Tea",
    url: "/images/products/prod-2.jpg",
    size: "385 KB",
    date: "2026-10-16",
    type: "image/jpeg",
  },
  {
    id: "media-prod-3",
    name: "Diabetic-Care Multigrain Chakki Flour",
    url: "/images/products/prod-3.jpg",
    size: "512 KB",
    date: "2026-10-17",
    type: "image/jpeg",
  },
  {
    id: "media-prod-4",
    name: "Cold-Pounded Pure Organic Haldi",
    url: "/images/products/prod-4.jpg",
    size: "460 KB",
    date: "2026-10-18",
    type: "image/jpeg",
  },
  {
    id: "media-prod-5",
    name: "Traditional Kashmiri Kahwa Blend",
    url: "/images/products/prod-5.jpg",
    size: "390 KB",
    date: "2026-10-19",
    type: "image/jpeg",
  },
  {
    id: "media-prod-6",
    name: "Desi Cold-Ground Organic Ajwain",
    url: "/images/products/prod-6.jpg",
    size: "340 KB",
    date: "2026-10-20",
    type: "image/jpeg",
  },
  {
    id: "media-logo",
    name: "Usman's Pure Official Brand Mark",
    url: "/logo.png",
    size: "64 KB",
    date: "2026-10-01",
    type: "image/png",
  },
];

const STORAGE_KEY = "usmans_pure_media_library";

export function getStoredMediaLibrary(): MediaItem[] {
  if (typeof window === "undefined") return DEFAULT_MEDIA_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MEDIA_ITEMS));
      return DEFAULT_MEDIA_ITEMS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_MEDIA_ITEMS;
  }
}

export function saveStoredMediaLibrary(items: MediaItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("usman-media-updated"));
  } catch (err) {
    console.warn("Storage quota exceeded or error saving media:", err);
  }
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (media: MediaItem) => void;
  title?: string;
}

export function MediaLibraryModal({
  isOpen,
  onClose,
  onSelectMedia,
  title = "WordPress Media Library",
}: MediaLibraryModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const items = getStoredMediaLibrary();
      setMediaList(items);
      if (items.length > 0 && !selectedItem) {
        setSelectedItem(items[0]);
      }
    }
  }, [isOpen, selectedItem]);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.match(/^image\/(png|jpeg|webp)$/)) {
      alert("Please upload a PNG, JPG, or WEBP image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("File size exceeds 8MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        const newItem: MediaItem = {
          id: `media-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          url: e.target.result,
          size: `${Math.round(file.size / 1024)} KB`,
          date: new Date().toISOString().split("T")[0],
          type: file.type,
        };

        const updated = [newItem, ...mediaList];
        setMediaList(updated);
        saveStoredMediaLibrary(updated);
        setSelectedItem(newItem);
        setActiveTab("library");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`Delete "${name}" from media library?`)) {
      const updated = mediaList.filter((m) => m.id !== id);
      setMediaList(updated);
      saveStoredMediaLibrary(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(updated[0] || null);
      }
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[88dvh] max-h-[750px] shadow-2xl flex flex-col overflow-hidden border border-stone-200 text-stone-900">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <FileImage className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900 tracking-tight">{title}</h3>
              <p className="text-[11px] text-stone-500">
                Centralized assets, WordPress-style media management &amp; instant selector
              </p>
            </div>
          </div>

          {/* Tab Selector: Upload Files vs Media Library */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("library")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "library" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Media Library ({mediaList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "upload" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Upload New Media
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-stone-200/60 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === "upload" ? (
            /* Upload Dropzone View */
            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-stone-50/40">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-10 max-w-lg w-full text-center transition cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? "border-amber-700 bg-amber-50"
                    : "border-stone-300 hover:border-amber-800 bg-white shadow-xs hover:bg-stone-50"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shadow-inner">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-stone-900">Drop files to upload</h4>
                  <p className="text-xs text-stone-500 mt-1">or click to browse local device files</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs mt-2"
                >
                  Select Files
                </button>
                <p className="text-[10px] text-stone-400 mt-1">
                  Accepts JPG, PNG, WEBP • Max upload file size: 8 MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </div>
          ) : (
            /* Media Library Browser View */
            <div className="flex-1 flex overflow-hidden">
              {/* Media Grid */}
              <div className="flex-1 flex flex-col p-4 sm:p-5 overflow-hidden">
                {/* Search Bar */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search media files by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:ring-2 focus:ring-amber-900/40"
                  />
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {filteredMedia.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`group relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-amber-800 ring-2 ring-amber-700/30 shadow-md"
                            : "border-stone-200 hover:border-stone-400 bg-stone-50"
                        }`}
                      >
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          unoptimized={item.url.startsWith("data:") || item.url.startsWith("http")}
                          className="object-cover group-hover:scale-105 transition duration-200"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-3" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-stone-950/80 p-1 text-[10px] text-white truncate font-medium opacity-0 group-hover:opacity-100 transition">
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Detail Panel (WordPress Attachment Details) */}
              {selectedItem && (
                <div className="w-72 sm:w-80 border-l border-stone-200 bg-stone-50/70 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      Attachment Details
                    </span>

                    {/* Preview */}
                    <div className="relative w-full aspect-video rounded-xl bg-white border border-stone-200 overflow-hidden shadow-2xs">
                      <Image
                        src={selectedItem.url}
                        alt={selectedItem.name}
                        fill
                        unoptimized={selectedItem.url.startsWith("data:") || selectedItem.url.startsWith("http")}
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p className="font-bold text-stone-900 break-words text-sm">{selectedItem.name}</p>
                      <p className="text-[11px] text-stone-500">Uploaded: {selectedItem.date}</p>
                      <p className="text-[11px] text-stone-500">File size: {selectedItem.size}</p>
                      <p className="text-[11px] text-stone-500 font-mono">Format: {selectedItem.type}</p>
                    </div>

                    {/* Copy Link Button */}
                    <div className="pt-2 border-t border-stone-200/80">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(selectedItem.url, selectedItem.id)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200 transition cursor-pointer"
                      >
                        {copiedId === selectedItem.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-500" />
                            <span>Copy Image Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Delete Action */}
                    <div>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(selectedItem.id, selectedItem.name)}
                        className="text-red-600 hover:text-red-700 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Permanently</span>
                      </button>
                    </div>
                  </div>

                  {/* Select Callback Trigger */}
                  {onSelectMedia && (
                    <div className="pt-4 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectMedia(selectedItem);
                          onClose();
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Select for Product</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
