"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStoreData } from "@/context/StoreDataContext";
import { Product } from "@/data/products";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Check,
  X,
  Package,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  UploadCloud,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo2,
  Redo2,
  FolderOpen,
} from "lucide-react";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("../components/RichTextEditor").then((m) => m.RichTextEditor),
  { ssr: false }
);
const MediaLibraryModal = dynamic(
  () => import("../components/MediaLibraryModal").then((m) => m.MediaLibraryModal),
  { ssr: false }
);

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStoreData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [past, setPast] = useState<Product[][]>([]);
  const [future, setFuture] = useState<Product[][]>([]);

  // New product form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"flours" | "teas" | "spices">("flours");
  const [newPrice, setNewPrice] = useState(1200);
  const [newOriginalPrice, setNewOriginalPrice] = useState(1500);
  const [newWeight, setNewWeight] = useState("5kg");
  const [newTagline, setNewTagline] = useState("100% Pure & Stone-Ground");
  const [newDescription, setNewDescription] = useState("");
  const [newBenefits, setNewBenefits] = useState("Stone-Ground Chakki\nZero Preservatives\n100% Pure Organics");
  const [newImage, setNewImage] = useState<string>("");
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleUndo = React.useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setFuture((prev) => [products, ...prev]);
    setPast(newPast);
    showToast("Undo applied");
  }, [past, products]);

  const handleRedo = React.useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast((prev) => [...prev, products]);
    setFuture(newFuture);
    showToast("Redo applied");
  }, [future, products]);

  // Keyboard shortcuts Ctrl+Z / Ctrl+Y
  React.useEffect(() => {
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

  const handleFileProcess = (file: File) => {
    if (!file.type.match(/^image\/(png|jpeg|webp)$/)) {
      alert("Please upload a PNG, JPG, or WEBP image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size should be less than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setNewImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditPrice(product.price);
  };

  const handleSaveInlinePrice = (id: string) => {
    updateProduct(id, { price: editPrice });
    setEditingId(null);
    showToast("Product price updated successfully!");
  };

  const handleToggleStock = (id: string, currentStatus: boolean) => {
    updateProduct(id, { inStock: !currentStatus });
    showToast(`Product marked as ${!currentStatus ? "In Stock" : "Out of Stock"}.`);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProduct(id);
      showToast(`"${title}" removed from catalog.`);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const benefitsArray = newBenefits
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const categoryLabels = {
      flours: "Stone-Ground Chakki Flour",
      teas: "Artisanal Pure Herbal Tea",
      spices: "Cold Stone-Pounded Spices",
    };

    const finalImage =
      newImage.trim() ||
      (newCategory === "flours"
        ? "/images/products/prod-1.jpg"
        : newCategory === "teas"
        ? "/images/products/prod-2.jpg"
        : "/images/products/prod-4.jpg");

    const newProd: Omit<Product, "id"> = {
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel: categoryLabels[newCategory],
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      priceFormatted: `₨${Number(newPrice).toLocaleString()}`,
      originalPriceFormatted: `₨${Number(newOriginalPrice).toLocaleString()}`,
      discountBadge: "Fresh Batch",
      image: finalImage,
      link: "/products",
      rating: 5.0,
      reviewCount: 1,
      weight: newWeight,
      tagline: newTagline,
      description: newDescription || "100% pure stone-milled product with zero chemical additives.",
      benefits: benefitsArray,
      inStock: true,
    };

    addProduct(newProd);
    setAddModalOpen(false);
    showToast(`"${newTitle}" added to store inventory!`);

    // Reset form
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
    setImageUrlInput("");
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

      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Products & Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Manage prices, stock levels, variants, and product descriptions across all 3 pure categories.
          </p>
        </div>

        {/* Action Controls: Undo, Redo, Media Library, Add Product */}
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

          {/* Open Media Library */}
          <button
            type="button"
            onClick={() => setMediaModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-800 hover:bg-stone-50 text-xs font-semibold transition cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
            <span>Media Library</span>
          </button>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/80 p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title or description..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Items" },
            { id: "flours", label: "Chakki Flours" },
            { id: "teas", label: "Herbal Teas" },
            { id: "spices", label: "Pure Spices" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-[#1C1613] text-white shadow-2xs"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Products Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-4 px-6 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500 font-bold">
          <span>Showing {filteredProducts.length} Products</span>
          <span>Click on Price to Edit Inline</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-100">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Weight / Size</th>
                <th className="py-3 px-6">Price (₨)</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => {
                const isEditing = editingId === p.id;
                return (
                  <tr key={p.id} className="hover:bg-stone-50/60 transition group">
                    {/* Product Info */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-stone-100 border border-stone-200/80 p-1 shrink-0 overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            unoptimized={p.image.startsWith("data:") || p.image.startsWith("http")}
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-stone-900 truncate max-w-xs">{p.title}</p>
                          <p className="text-[11px] text-stone-500 truncate max-w-xs">{p.tagline}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-6">
                      <span className="capitalize font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                        {p.category}
                      </span>
                    </td>

                    {/* Weight */}
                    <td className="py-3.5 px-6 font-bold text-stone-900">
                      {p.weight}
                    </td>

                    {/* Price with Inline Edit */}
                    <td className="py-3.5 px-6">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold">₨</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-20 px-2 py-1 rounded-lg bg-stone-100 border border-amber-900 font-bold text-xs"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveInlinePrice(p.id)}
                            className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 rounded bg-stone-300 text-stone-700 hover:bg-stone-400"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="flex items-center gap-1.5 font-black text-stone-900 hover:text-amber-900 group/price cursor-pointer"
                          title="Click to edit price"
                        >
                          <span>{p.priceFormatted}</span>
                          <Edit2 className="w-3 h-3 text-stone-400 opacity-0 group-hover/price:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </td>

                    {/* In Stock Toggle */}
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => handleToggleStock(p.id, p.inStock)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition ${
                          p.inStock
                            ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                            : "bg-red-100 text-red-900 hover:bg-red-200"
                        }`}
                      >
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Add Product Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div>
                <h3 className="text-xl font-black text-stone-900 tracking-tight">Add New Product</h3>
                <p className="text-xs text-stone-500">Create a stone-ground organic product entry</p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              {/* Product Image Upload Field (Above Product Title) */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
                    <span>Product Featured Image</span>
                  </span>
                  <span className="text-[11px] font-normal text-stone-500">
                    PNG, JPG, or WEBP (Max 5MB)
                  </span>
                </label>

                {newImage ? (
                  /* Live Preview Thumbnail with Remove / Change Action */
                  <div className="relative p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-14 rounded-xl bg-white border border-stone-200 overflow-hidden shrink-0 shadow-2xs">
                        <Image
                          src={newImage}
                          alt="Product Preview"
                          fill
                          unoptimized={newImage.startsWith("data:") || newImage.startsWith("http")}
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">Image Attached</p>
                        <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 shrink-0" /> Ready for catalog
                        </p>
                        <p className="text-[10px] text-stone-400 truncate max-w-xs mt-0.5">
                          {newImage.startsWith("data:") ? "Local file (Base64 data URL)" : newImage}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-[11px] font-bold transition cursor-pointer"
                      >
                        Replace Image
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewImage("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-600 border border-red-200/60 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Dropzone & File Picker */
                  <div className="space-y-2">
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
                        if (file) handleFileProcess(file);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        isDragging
                          ? "border-amber-700 bg-amber-50/50"
                          : "border-stone-300 hover:border-amber-800 bg-stone-50/60 hover:bg-stone-50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800">
                          Drag &amp; drop product photography here
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Accepts PNG, JPG, or WEBP (Max 5MB)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer"
                        >
                          Upload Image / Browse Files
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMediaModalOpen(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Open Media Manager</span>
                        </button>
                      </div>
                    </div>

                    {/* WordPress-Style Media Library Quick Picker */}
                    <div className="pt-2 border-t border-stone-200/60">
                      <p className="text-[11px] font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
                        <span>Media Library (Pick existing photo):</span>
                      </p>
                      <div className="grid grid-cols-6 gap-1.5">
                        {[
                          { src: "/images/products/prod-1.jpg", name: "Chakki Atta" },
                          { src: "/images/products/prod-2.jpg", name: "Herbal Tea" },
                          { src: "/images/products/prod-3.jpg", name: "Multigrain Atta" },
                          { src: "/images/products/prod-4.jpg", name: "Pure Haldi" },
                          { src: "/images/products/prod-5.jpg", name: "Kashmiri Kahwa" },
                          { src: "/images/products/prod-6.jpg", name: "Organic Ajwain" },
                        ].map((media) => (
                          <button
                            key={media.src}
                            type="button"
                            onClick={() => setNewImage(media.src)}
                            title={`Select ${media.name}`}
                            className="relative aspect-square rounded-lg border-2 border-stone-200 hover:border-amber-700 overflow-hidden bg-white group transition cursor-pointer"
                          >
                            <Image
                              src={media.src}
                              alt={media.name}
                              fill
                              className="object-cover group-hover:scale-110 transition duration-200"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Alternative URL Input */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Or enter direct Image URL (e.g. /images/products/prod-1.jpg or https://...)"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (imageUrlInput.trim()) {
                                setNewImage(imageUrlInput.trim());
                                setImageUrlInput("");
                              }
                            }
                          }}
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (imageUrlInput.trim()) {
                            setNewImage(imageUrlInput.trim());
                            setImageUrlInput("");
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition cursor-pointer shrink-0"
                      >
                        Set URL
                      </button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileProcess(file);
                  }}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pure Stone-Ground Diabetic Atta"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs focus:ring-2 focus:ring-amber-900/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs"
                  >
                    <option value="flours">Chakki Flour</option>
                    <option value="teas">Herbal Tea</option>
                    <option value="spices">Pure Spices</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Weight / Variant</label>
                  <input
                    type="text"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="e.g. 5kg, 250g, 500g"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Selling Price (₨)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Original Price (₨)</label>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs"
                  />
                </div>
              </div>

              {/* WordPress-Style Gutenberg Rich Text Description Editor */}
              <RichTextEditor
                label="Product Description (Visual Gutenberg Editor)"
                value={newDescription}
                onChange={setNewDescription}
                placeholder="Write detailed product description, stone-ground milling benefits, and pure organic attributes..."
                onOpenMediaLibrary={() => setMediaModalOpen(true)}
              />

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Key Benefits (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newBenefits}
                  onChange={(e) => setNewBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 font-bold text-xs hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1C1613] hover:bg-black text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WordPress-Style Media Library Modal */}
      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelectMedia={(media) => {
          setNewImage(media.url);
          showToast(`Selected "${media.name}" as featured product image.`);
        }}
        title="Select Product Featured Image"
      />
    </div>
  );
}
