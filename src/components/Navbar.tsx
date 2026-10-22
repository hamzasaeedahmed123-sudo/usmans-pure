"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthHeaderButton } from "./auth/AuthHeaderButton";
import { useAmbientTheme } from "@/components/theme/AmbientThemeWrapper";

export { AuthHeaderButton };

export type SlideTheme = "flour" | "herbals" | "spices";

export interface NavbarProps {
  slideTheme?: SlideTheme;
  slideIndex?: number;
  tag?: string;
  isSolid?: boolean;
  className?: string;
}

export const NAVBAR_THEMES: Record<
  SlideTheme,
  {
    name: string;
    pillBg: string;
    badgeBg: string;
    cartBtn: string;
    defaultTag: string;
  }
> = {
  flour: {
    name: "Chakki Flour",
    pillBg: "bg-[#F5EFE6]/70 border-[#E5DACB]/80 text-[#3D2817]",
    badgeBg: "bg-[#EBDDCB]/70 border-[#DCC7AD]/80 text-[#3D2817]",
    cartBtn: "bg-[#F5EFE6]/70 hover:bg-[#F5EFE6] border-[#E5DACB]/80 text-[#3D2817]",
    defaultTag: "100% Stone-Ground",
  },
  herbals: {
    name: "Herbal Teas",
    pillBg: "bg-[#EAF3EC]/70 border-[#C5DEC9]/80 text-[#0E351B]",
    badgeBg: "bg-[#D4E8D8]/70 border-[#BFDDC3]/80 text-[#0E351B]",
    cartBtn: "bg-[#EAF3EC]/70 hover:bg-[#EAF3EC] border-[#C5DEC9]/80 text-[#0E351B]",
    defaultTag: "Pure Botanical",
  },
  spices: {
    name: "Organic Spices",
    pillBg: "bg-[#F9ECE4]/70 border-[#E8C8B5]/80 text-[#4E1E0F]",
    badgeBg: "bg-[#F3D5C5]/70 border-[#ECC0AA]/80 text-[#4E1E0F]",
    cartBtn: "bg-[#F9ECE4]/70 hover:bg-[#F9ECE4] border-[#E8C8B5]/80 text-[#4E1E0F]",
    defaultTag: "Cold Stone-Pounded",
  },
};

export function Navbar({
  slideTheme,
  slideIndex,
  tag,
  isSolid = false,
  className = "",
}: NavbarProps) {
  const { activeTheme } = useAmbientTheme();
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine active theme key
  const effectiveTheme: SlideTheme =
    slideTheme ||
    (typeof slideIndex === "number"
      ? slideIndex === 1
        ? "herbals"
        : slideIndex === 2
        ? "spices"
        : "flour"
      : activeTheme === "herbals"
      ? "herbals"
      : activeTheme === "spices"
      ? "spices"
      : "flour");

  const themeConfig = NAVBAR_THEMES[effectiveTheme] || NAVBAR_THEMES.flour;
  const displayTag = tag || themeConfig.defaultTag;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 relative z-50 shrink-0 transition-all duration-500 ease-in-out ${className}`}
      >
        {/* Left Section (Logo): Clean without redundant badge */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            className="inline-block transition-transform hover:scale-105 shrink-0 focus:outline-none"
            aria-label="USMAN'S PURE PRODUCTS"
          >
            <div className="relative w-36 sm:w-40 h-9 sm:h-[45px] drop-shadow-sm flex items-center">
              <Image
                src="/logo.png"
                alt="Usman's Pure Products"
                width={160}
                height={45}
                className="w-auto h-8 sm:h-9 object-contain object-left"
                priority
              />
            </div>
            <span className="sr-only">USMAN&apos;S PURE PRODUCTS</span>
          </Link>
        </div>

        {/* Center Section: Navigation Pill Menu (Compact & Balanced with All Items Restored) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#ede8e1]/90 backdrop-blur-md px-3 xl:px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm shrink">
          {/* 1. Home */}
          <Link
            href="/"
            className="px-2 xl:px-2.5 py-1 text-xs xl:text-[13px] font-medium text-stone-800 hover:text-stone-950 transition whitespace-nowrap"
          >
            Home
          </Link>

          {/* 2. Doctor's Choice with Verified Badge */}
          <Link
            href="/doctors-choice"
            className="flex items-center gap-1 px-2 xl:px-2.5 py-1 text-xs xl:text-[13px] font-medium text-stone-800 hover:text-stone-950 transition whitespace-nowrap"
          >
            <span>Doctor&apos;s Choice</span>
            <span className="bg-emerald-700 text-white text-[9px] xl:text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
              Verified
            </span>
          </Link>

          {/* 3. All Products Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => setProductsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-0.5 xl:gap-1 px-2 xl:px-2.5 py-1 text-xs xl:text-[13px] font-medium text-stone-800 hover:text-stone-950 transition cursor-pointer whitespace-nowrap"
            >
              <span>All Products</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productsDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {productsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-2xl shadow-xl p-2 z-50 text-stone-900"
                >
                  <Link
                    href="/products"
                    onClick={() => setProductsDropdownOpen(false)}
                    className="block px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-stone-900 border-b border-stone-100"
                  >
                    View All Products &rarr;
                  </Link>

                  <div className="py-1">
                    <Link
                      href="/flour"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-100 transition-colors text-stone-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#8C6D46]" />
                      <span>1. Chakki Flour</span>
                    </Link>

                    <Link
                      href="/herbals"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-100 transition-colors text-stone-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#2D5A3E]" />
                      <span>2. Herbal Teas</span>
                    </Link>

                    <Link
                      href="/spices"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-100 transition-colors text-stone-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#9E3E26]" />
                      <span>3. Pure Spices</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Mega Bundles with Save Badge */}
          <Link
            href="/bundles"
            className="flex items-center gap-1 px-2 xl:px-2.5 py-1 text-xs xl:text-[13px] font-medium text-stone-800 hover:text-stone-950 transition whitespace-nowrap"
          >
            <span>Mega Bundles</span>
            <span className="bg-amber-600 text-white text-[9px] xl:text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
              Save
            </span>
          </Link>

          {/* 5. About Us */}
          <Link
            href="/about"
            className="px-2 xl:px-2.5 py-1 text-xs xl:text-[13px] font-medium text-stone-800 hover:text-stone-950 transition whitespace-nowrap"
          >
            About Us
          </Link>

          {/* 6. Contact */}
          <Link
            href="/contact"
            className="px-2 xl:px-2.5 py-1 text-xs xl:text-[13px] font-medium text-stone-800 hover:text-stone-950 transition whitespace-nowrap"
          >
            Contact
          </Link>
        </nav>

        {/* Right Section: Viewport safety padding and compact button sizing */}
        <div className="flex items-center gap-2 shrink-0 ml-auto pr-1 sm:pr-2">
          {/* Quick Cart Trigger */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("usman-open-cart"));
              }
            }}
            aria-label="Open Basket"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ede8e1] flex items-center justify-center hover:bg-stone-200 transition shadow-sm cursor-pointer shrink-0"
          >
            <svg
              className="w-4 h-4 text-stone-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </button>

          {/* User Auth Buttons / Avatar */}
          <AuthHeaderButton slideTheme={effectiveTheme} />

          {/* Mobile Hamburger Button: Strictly Top Right of Header */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Open navigation menu"
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ede8e1] flex items-center justify-center hover:bg-stone-200 transition shadow-sm cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-3 sm:inset-x-4 top-20 z-50 lg:hidden bg-white/98 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-5 shadow-2xl text-stone-900 max-h-[calc(100dvh-6rem)] overflow-y-auto pb-8"
            >
              {/* Explicit Mobile Menu Close (X) Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors z-50 cursor-pointer shadow-xs min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>

            <div className="flex flex-col gap-2 font-semibold text-sm pt-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/doctors-choice"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span>Doctor&apos;s Choice</span>
                  <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded-full font-bold ml-1.5 leading-none">
                    Verified
                  </span>
                </div>
                <span className="text-stone-400 text-xs">&rarr;</span>
              </Link>

              <div className="border-t border-stone-100 pt-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-400 px-3">
                  All Products
                </span>
                <div className="mt-1 flex flex-col gap-1 pl-3">
                  <Link
                    href="/flour"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-3 rounded-lg hover:bg-stone-100 text-stone-800 text-xs font-semibold"
                  >
                    1. Chakki Flour
                  </Link>
                  <Link
                    href="/herbals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-3 rounded-lg hover:bg-stone-100 text-stone-800 text-xs font-semibold"
                  >
                    2. Herbal Teas
                  </Link>
                  <Link
                    href="/spices"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-3 rounded-lg hover:bg-stone-100 text-stone-800 text-xs font-semibold"
                  >
                    3. Pure Spices
                  </Link>
                </div>
              </div>

              <Link
                href="/bundles"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors border-t border-stone-100 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span>Mega Bundles</span>
                  <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full font-bold ml-1.5 leading-none">
                    Save
                  </span>
                </div>
                <span className="text-stone-400 text-xs">&rarr;</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-colors"
              >
                Contact
              </Link>

              <AuthHeaderButton isMobile />
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
