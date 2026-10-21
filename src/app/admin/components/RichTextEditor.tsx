"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Code,
  Check,
  X,
  Type,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
  onOpenMediaLibrary?: () => void;
}

export function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = "Write content here...",
  minHeight = "min-h-[160px]",
  onOpenMediaLibrary,
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "text">("visual");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert formatted text at cursor/selection
  const insertFormatting = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultText;
    const replacement = `${prefix}${selected}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 10);
  };

  const handleInsertHeading = (level: 1 | 2 | 3) => {
    const hashes = "#".repeat(level) + " ";
    insertFormatting(hashes, "", `Heading ${level}`);
  };

  const handleInsertBold = () => {
    insertFormatting("**", "**", "Bold text");
  };

  const handleInsertItalic = () => {
    insertFormatting("*", "*", "Italic text");
  };

  const handleInsertBulletList = () => {
    insertFormatting("\n- ", "", "List item");
  };

  const handleInsertNumberedList = () => {
    insertFormatting("\n1. ", "", "List item");
  };

  const handleInsertParagraph = () => {
    insertFormatting("\n\n", "", "New paragraph text");
  };

  const handleConfirmLink = () => {
    if (!linkUrl.trim()) return;
    const text = linkText.trim() || linkUrl.trim();
    insertFormatting(`[${text}](`, `${linkUrl.trim()})`, "");
    setLinkUrl("");
    setLinkText("");
    setLinkModalOpen(false);
  };

  const handleConfirmImage = () => {
    if (!imageUrl.trim()) return;
    const alt = imageAlt.trim() || "Product image";
    const imageMarkdown = `\n![${alt}](${imageUrl.trim()})\n`;
    onChange(value + imageMarkdown);
    setImageUrl("");
    setImageAlt("");
    setImageModalOpen(false);
  };

  // Extract inline images from markdown for visual thumbnail preview
  const extractedImages: string[] = [];
  const imgRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = imgRegex.exec(value)) !== null) {
    if (match[1]) extractedImages.push(match[1]);
  }

  // Simple, robust markdown preview renderer (zero hydration issues)
  const renderVisualContent = () => {
    if (!value.trim()) {
      return (
        <p className="text-stone-400 italic text-xs py-4 text-center">
          (Empty block content. Click &quot;Text / Code&quot; or use the toolbar above to start writing.)
        </p>
      );
    }

    const lines = value.split("\n");
    return (
      <div className="space-y-2 text-stone-800 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          // Image markdown
          const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            return (
              <div
                key={idx}
                className="my-3 p-2 bg-stone-100/80 rounded-2xl border border-stone-200 inline-block max-w-full"
              >
                <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-white">
                  <Image
                    src={imgMatch[2]}
                    alt={imgMatch[1] || "Visual media"}
                    fill
                    unoptimized={imgMatch[2].startsWith("data:") || imgMatch[2].startsWith("http")}
                    className="object-contain p-1"
                  />
                </div>
                <p className="text-[10px] text-stone-500 font-mono mt-1 text-center truncate max-w-[192px]">
                  {imgMatch[1] || "Inline Media"}
                </p>
              </div>
            );
          }

          // H1
          if (line.startsWith("# ")) {
            return (
              <h1 key={idx} className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight pt-2">
                {line.replace("# ", "")}
              </h1>
            );
          }
          // H2
          if (line.startsWith("## ")) {
            return (
              <h2 key={idx} className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight pt-1.5">
                {line.replace("## ", "")}
              </h2>
            );
          }
          // H3
          if (line.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-sm sm:text-base font-bold text-amber-950 pt-1">
                {line.replace("### ", "")}
              </h3>
            );
          }
          // Bullet list
          if (line.startsWith("- ") || line.startsWith("* ")) {
            return (
              <li key={idx} className="ml-5 list-disc text-stone-700">
                {line.replace(/^[-*]\s+/, "")}
              </li>
            );
          }
          // Numbered list
          if (/^\d+\.\s+/.test(line)) {
            return (
              <li key={idx} className="ml-5 list-decimal text-stone-700 font-medium">
                {line.replace(/^\d+\.\s+/, "")}
              </li>
            );
          }
          // Blank line
          if (!line.trim()) {
            return <div key={idx} className="h-2" />;
          }

          // Regular paragraph
          return (
            <p key={idx} className="text-stone-700">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs">
      {/* 1. Header with Label & Visual / Text Tabs */}
      <div className="bg-stone-50/90 border-b border-stone-200 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2">
        {label && (
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-800" />
            <span>{label}</span>
          </span>
        )}

        {/* WordPress-Style Visual vs Text Mode Switcher */}
        <div className="flex items-center gap-1 bg-stone-200/60 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition cursor-pointer ${
              activeTab === "visual"
                ? "bg-white text-stone-900 shadow-2xs font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Eye className="w-3 h-3 text-amber-700" />
            <span>Visual</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition cursor-pointer ${
              activeTab === "text"
                ? "bg-white text-stone-900 shadow-2xs font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Code className="w-3 h-3 text-amber-700" />
            <span>Text / Code</span>
          </button>
        </div>
      </div>

      {/* 2. Gutenberg-Style Formatting Toolbar */}
      <div className="bg-white border-b border-stone-200 px-2 py-1.5 flex flex-wrap items-center gap-1 text-xs">
        {/* Headings */}
        <button
          type="button"
          onClick={() => handleInsertHeading(1)}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition font-black text-xs"
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleInsertHeading(2)}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition font-black text-xs"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleInsertHeading(3)}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition font-black text-xs"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-stone-200 mx-1" />

        {/* Paragraph & Inline Formatting */}
        <button
          type="button"
          onClick={handleInsertParagraph}
          className="px-2 py-1 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition font-bold text-xs"
          title="Paragraph Break"
        >
          P
        </button>
        <button
          type="button"
          onClick={handleInsertBold}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition font-bold"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleInsertItalic}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-stone-200 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={handleInsertBulletList}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleInsertNumberedList}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-stone-200 mx-1" />

        {/* Link Modal Trigger */}
        <button
          type="button"
          onClick={() => setLinkModalOpen(true)}
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition font-medium"
          title="Insert Link"
        >
          <LinkIcon className="w-3.5 h-3.5 text-stone-600" />
          <span className="hidden sm:inline">Link</span>
        </button>

        {/* Inline Media Inserter */}
        <button
          type="button"
          onClick={() => {
            if (onOpenMediaLibrary) {
              onOpenMediaLibrary();
            } else {
              setImageModalOpen(true);
            }
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 transition cursor-pointer"
          title="Insert Media / Image"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
          <span>Insert Image</span>
        </button>
      </div>

      {/* 3. Editor Body: Visual Preview vs Textarea */}
      <div className="p-3.5">
        {activeTab === "visual" ? (
          <div
            onClick={() => setActiveTab("text")}
            className={`${minHeight} p-3 rounded-xl bg-stone-50/50 hover:bg-stone-50 transition cursor-text border border-dashed border-stone-200`}
            title="Click to edit content"
          >
            {renderVisualContent()}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={6}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full ${minHeight} p-3 rounded-xl bg-stone-50/70 border border-stone-200 text-stone-900 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-900/40`}
          />
        )}

        {/* Live Extracted Image Thumbnails Strip */}
        {extractedImages.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] uppercase font-bold text-stone-500 shrink-0">
              Attached Media ({extractedImages.length}):
            </span>
            {extractedImages.map((src, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden shrink-0 shadow-2xs"
                title={src}
              >
                <Image
                  src={src}
                  alt={`Inline thumbnail ${i + 1}`}
                  fill
                  unoptimized={src.startsWith("data:") || src.startsWith("http")}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Insert Link */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-amber-800" />
                <span>Insert Hyperlink</span>
              </h4>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Link URL</label>
              <input
                type="text"
                placeholder="https://... or /products"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Display Text (Optional)</label>
              <input
                type="text"
                placeholder="Click here"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLink}
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Insert Image by URL */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-800" />
                <span>Insert Inline Image</span>
              </h4>
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Image URL / Path</label>
              <input
                type="text"
                placeholder="/images/products/prod-1.jpg or https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">Image Caption / Alt Text</label>
              <input
                type="text"
                placeholder="Product photography"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setImageModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmImage}
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold"
              >
                Insert Media
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
