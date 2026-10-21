"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Search,
  Copy,
  Check,
  ExternalLink,
  Filter,
  Grid,
  List as ListIcon,
  Undo2,
  Redo2,
  Plus,
} from "lucide-react";
import {
  MediaItem,
  getStoredMediaLibrary,
  saveStoredMediaLibrary,
} from "../components/MediaLibraryModal";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [past, setPast] = useState<MediaItem[][]>([]);
  const [future, setFuture] = useState<MediaItem[][]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const items = getStoredMediaLibrary();
    setMediaList(items);
    if (items.length > 0) setSelectedItem(items[0]);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleUndo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setFuture((prev) => [mediaList, ...prev]);
    setMediaList(previous);
    setPast(newPast);
    saveStoredMediaLibrary(previous);
    showToast("Undo applied");
  }, [past, mediaList]);

  const handleRedo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast((prev) => [...prev, mediaList]);
    setMediaList(next);
    setFuture(newFuture);
    saveStoredMediaLibrary(next);
    showToast("Redo applied");
  }, [future, mediaList]);

  // Global Ctrl+Z / Ctrl+Y shortcuts
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
        setPast((prev) => [...prev, mediaList]);
        setFuture([]);

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
        showToast(`"${file.name}" uploaded to Media Library!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}" from media library?`)) {
      setPast((prev) => [...prev, mediaList]);
      setFuture([]);

      const updated = mediaList.filter((m) => m.id !== id);
      setMediaList(updated);
      saveStoredMediaLibrary(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(updated[0] || null);
      }
      showToast(`"${name}" removed from library.`);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast("Image link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1C1613] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Undo, Redo, and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 tracking-wide uppercase">
            <span>WordPress-Style Media Manager</span>
            <span>•</span>
            <span className="text-emerald-700">Central Storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Upload, manage, copy links, and select photography for products, blogs, and banner blocks.
          </p>
        </div>

        {/* Top Actions: Undo, Redo, Upload */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={past.length === 0}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
            title="Undo last change (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={future.length === 0}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
            title="Redo change (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
            <span>Redo</span>
          </button>

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8D2D1B] hover:bg-[#722314] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Media</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
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
        className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
          isDragging
            ? "border-amber-700 bg-amber-50"
            : "border-stone-300 hover:border-amber-800 bg-white shadow-xs hover:bg-stone-50/70"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-900">Drag &amp; Drop Media Here to Upload</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            PNG, JPG, or WEBP up to 8MB • Files automatically register to media catalog
          </p>
        </div>
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

      {/* Media Browser Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden flex flex-col lg:flex-row">
        {/* Main Grid / List Area */}
        <div className="flex-1 p-5 sm:p-6 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search media by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-semibold">
                {filteredMedia.length} Media Items
              </span>
              <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition ${viewMode === "grid" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500"}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500"}`}
                  title="List View"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Media Items */}
          {filteredMedia.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              No media items found matching &quot;{searchQuery}&quot;.
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
                    <div className="absolute inset-x-0 bottom-0 bg-stone-950/80 p-1.5 text-[10px] text-white truncate font-medium">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredMedia.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition ${
                      isSelected ? "bg-amber-50/70 border border-amber-200" : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          unoptimized={item.url.startsWith("data:") || item.url.startsWith("http")}
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-stone-500">{item.date} • {item.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.url, item.id);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                    >
                      Copy Link
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Details Sidebar */}
        {selectedItem && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-stone-200 p-6 bg-stone-50/60 space-y-4">
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Selected Asset Details
            </span>

            <div className="relative w-full aspect-square rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-2xs">
              <Image
                src={selectedItem.url}
                alt={selectedItem.name}
                fill
                unoptimized={selectedItem.url.startsWith("data:") || selectedItem.url.startsWith("http")}
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-stone-900 text-sm break-words">{selectedItem.name}</p>
              <p className="text-stone-500 text-[11px]">Upload Date: {selectedItem.date}</p>
              <p className="text-stone-500 text-[11px]">File Size: {selectedItem.size}</p>
              <p className="text-stone-500 text-[11px] font-mono">Type: {selectedItem.type}</p>
            </div>

            {/* Copy Direct URL */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <label className="block text-[11px] font-bold text-stone-700">Direct Media URL</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  value={selectedItem.url}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-[11px] font-mono text-stone-600 truncate"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(selectedItem.url, selectedItem.id)}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-bold transition shrink-0 cursor-pointer"
                >
                  {copiedId === selectedItem.id ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDelete(selectedItem.id, selectedItem.name)}
                className="text-red-600 hover:text-red-700 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
