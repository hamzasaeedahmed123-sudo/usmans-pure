"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Trash2,
  Check,
  ArrowRight,
  Truck,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { AuthHeaderButton } from "@/components/auth/AuthHeaderButton";

interface HeaderProps {
  theme?: "amber" | "green";
  isSolid?: boolean;
}

export function Header({ theme = "amber", isSolid = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products", hasDropdown: true },
    { label: "Bundles", href: "/bundles" },
    { label: "Contact", href: "/contact" },
  ];

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Theme styling for header elements
  const slideThemeKey: "flour" | "herbals" =
    theme === "green" ? "herbals" : "flour";

  const themeClasses = {
    amber: {
      bar: "bg-[#2A1F17] text-white",
      glass: isSolid
        ? "bg-[#FAF5EC] border-[#D8C2A0]/80 text-[#3F2A17] shadow-md"
        : isScrolled
        ? "bg-[#FAF5EC]/90 border-[#D8C2A0]/70 text-[#3F2A17] shadow-lg shadow-[#3F2A17]/5"
        : "bg-white/45 border-white/60 text-[#3F2A17]",
      accent: "bg-[#54361C] hover:bg-[#3D2511] text-[#FAF5EC]",
      pill: "bg-[#F5EFE6]/70 border-[#E5DACB]/80 text-[#3D2817]",
      badge: "bg-[#EBDDCB]/70 border-[#DCC7AD]/80 text-[#3D2817]",
      cartBtn: "bg-[#F5EFE6]/70 hover:bg-[#F5EFE6] border-[#E5DACB]/80 text-[#3D2817]",
      tag: "pure milled",
    },
    green: {
      bar: "bg-[#0E381C] text-white",
      glass: isSolid
        ? "bg-[#EDF8F1] border-[#B5DFCA]/80 text-[#124227] shadow-md"
        : isScrolled
        ? "bg-[#EDF8F1]/90 border-[#B5DFCA]/70 text-[#124227] shadow-lg shadow-[#124227]/5"
        : "bg-white/45 border-white/60 text-[#124227]",
      accent: "bg-[#145330] hover:bg-[#0D3B22] text-[#EEF9F2]",
      pill: "bg-[#EAF3EC]/70 border-[#C5DEC9]/80 text-[#0E351B]",
      badge: "bg-[#D4E8D8]/70 border-[#BFDDC3]/80 text-[#0E351B]",
      cartBtn: "bg-[#EAF3EC]/70 hover:bg-[#EAF3EC] border-[#C5DEC9]/80 text-[#0E351B]",
      tag: "Pure Botanical",
    },
  }[theme];

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        {/* Top Announcement Bar */}
        <AnnouncementBar theme={theme} />

        {/* Main Solid Pure White Luxury Navbar */}
        <div
          className="w-full bg-white opacity-100 border-b border-gray-200 shadow-xs transition-all duration-300"
        >
          {/* Top Row: Centered Logo + User Action Items (and Mobile Left Hamburger) */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative flex items-center justify-between py-2.5 sm:py-3.5 min-h-[58px] sm:min-h-[68px]">
            {/* Mobile Left: Hamburger Button */}
            <div className="flex items-center lg:hidden z-10">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-[#2C2A29] flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#2C2A29]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#2C2A29]" />
                )}
              </button>
            </div>

            {/* Desktop Left: Subtle Brand Seal / Tagline Spacer */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-500 font-medium z-10 w-48">
              <span className="w-1.5 h-1.5 rounded-full bg-[#145330]" />
              <span>Pure &amp; Freshly Milled</span>
            </div>

            {/* Top Center: "Usman's Pure Products" Logo (Prominent Focal Point, Centered on Mobile & Desktop) */}
            <div className="absolute inset-0 mx-auto flex justify-center items-center pointer-events-none z-0 px-14 sm:px-20">
              <Link
                href="/"
                className="pointer-events-auto flex items-center justify-center group focus:outline-none transition-transform active:scale-98"
                aria-label="USMAN'S PURE PRODUCTS"
              >
                <Image
                  src="/logo.png"
                  alt="USMAN'S PURE PRODUCTS"
                  width={280}
                  height={76}
                  className="w-auto h-9 sm:h-11 md:h-13 lg:h-15 object-contain max-w-[155px] xs:max-w-[190px] sm:max-w-[235px] md:max-w-[275px]"
                  priority
                />
                <span className="sr-only">USMAN&apos;S PURE PRODUCTS</span>
              </Link>
            </div>

            {/* Top Right: User Action Items (Search, Cart, Login, Sign Up) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 z-10 ml-auto">
              {/* Quick Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Pure Products"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-[#2C2A29] flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 text-[#2C2A29]" strokeWidth={2} />
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => openCart()}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-[#2C2A29] flex items-center justify-center transition-transform active:scale-95 shadow-xs cursor-pointer shrink-0"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#2C2A29]" strokeWidth={2} />
                {totalCount > 0 && (
                  <span
                    id="cart-badge-count"
                    className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-bold bg-[#8B3A22] text-white shadow-xs"
                  >
                    {totalCount}
                  </span>
                )}
              </button>

              {/* User Authentication Actions / Admin Menu */}
              <div className="hidden sm:flex shrink-0">
                <AuthHeaderButton slideTheme={slideThemeKey} />
              </div>
            </div>
          </div>

          {/* Bottom Row (Desktop): Centered Horizontal Navigation Links */}
          <div className="hidden lg:block border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <nav className="flex items-center justify-center gap-7 xl:gap-9 py-2">
                {/* 1. Home */}
                <Link
                  href="/"
                  className="text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1"
                >
                  Home
                </Link>

                {/* 2. Dietary Care */}
                <Link
                  href="/doctors-choice"
                  className="flex items-center gap-1.5 text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1"
                >
                  <span>Dietary Care</span>
                  <span className="bg-[#145330] text-white text-[9px] xl:text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                    Whole Grain
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
                    className="flex items-center gap-1 text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1 cursor-pointer"
                  >
                    <span>All Products</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        productsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {productsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-[#FAF9F5]/98 backdrop-blur-xl border border-stone-200/80 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-[#2C2A29]">
                      <Link
                        href="/products"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="block px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-[#8B3A22] border-b border-stone-200/60"
                      >
                        All Catalog &rarr;
                      </Link>
                      <div className="py-1">
                        <Link
                          href="/flour"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#F5F2EB] text-[#2C2A29]"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#8B3A22]" />
                          <span>1. Chakki Flour</span>
                        </Link>
                        <Link
                          href="/herbals"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#F5F2EB] text-[#2C2A29]"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#145330]" />
                          <span>2. Herbal Teas</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Mega Bundles */}
                <Link
                  href="/bundles"
                  className="flex items-center gap-1.5 text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1"
                >
                  <span>Mega Bundles</span>
                  <span className="bg-[#8B3A22] text-white text-[9px] xl:text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                    Save
                  </span>
                </Link>

                {/* 5. FAQs */}
                <Link
                  href="/faqs"
                  className="text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1"
                >
                  FAQs
                </Link>

                {/* 6. About Us */}
                <Link
                  href="/about"
                  className="text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1"
                >
                  About Us
                </Link>

                {/* 7. Contact */}
                <Link
                  href="/contact"
                  className="text-xs xl:text-[13px] font-medium tracking-wide text-[#2C2A29] hover:text-[#8B3A22] transition-colors py-1"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Mobile Slide-down Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-stone-200/60 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#FAF9F5]/98 backdrop-blur-xl rounded-2xl p-4 shadow-xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto pb-24 border border-stone-200/60">
              <div className="px-2 pb-2.5 mb-2 border-b border-stone-200/60 flex items-center justify-between sticky top-0 bg-[#FAF9F5]/90 backdrop-blur-sm z-20 -mt-1 pt-1">
                <div className="relative w-40 h-10 flex items-center">
                  <Image
                    src="/logo.png"
                    alt="USMAN'S PURE PRODUCTS"
                    width={180}
                    height={50}
                    className="w-auto h-8 sm:h-9 object-contain object-left"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2C2A29] uppercase tracking-widest">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-[#F5F2EB] hover:bg-[#EFEBE4] text-[#2C2A29] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-50 shadow-xs"
                    aria-label="Close Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 pb-2">
                {/* 1. Home */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-[#F5F2EB] transition text-[#2C2A29] min-h-[48px]"
                >
                  <span>Home</span>
                </Link>

                {/* 2. Dietary Care Flours */}
                <Link
                  href="/doctors-choice"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-[#F5F2EB] transition text-[#2C2A29] min-h-[48px]"
                >
                  <div className="flex items-center">
                    <span>Dietary Care Flours</span>
                    <span className="text-[10px] bg-[#145330] text-white px-2 py-0.5 rounded-full font-bold ml-2 leading-none">
                      Whole Grain
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 3. All Products with Sub-items */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-[#2C2A29]">
                    <Link
                      href="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:underline"
                    >
                      All Products
                    </Link>
                  </div>
                  <div className="ml-4 pl-3 border-l-2 border-stone-200/80 flex flex-col gap-1 py-1">
                    <Link
                      href="/flour"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#F5F2EB] text-[#2C2A29]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#8B3A22]" />
                      <span>1. Chakki Flour</span>
                    </Link>
                    <Link
                      href="/herbals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#F5F2EB] text-[#2C2A29]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#145330]" />
                      <span>2. Herbal Teas</span>
                    </Link>
                  </div>
                </div>

                {/* 4. Mega Bundles */}
                <Link
                  href="/bundles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-[#F5F2EB] transition text-[#2C2A29] min-h-[48px]"
                >
                  <div className="flex items-center">
                    <span>Mega Bundles</span>
                    <span className="text-[10px] bg-[#8B3A22] text-white px-2 py-0.5 rounded-full font-bold ml-2 leading-none">
                      Save
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 5. FAQs */}
                <Link
                  href="/faqs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-[#F5F2EB] transition text-[#2C2A29] min-h-[48px]"
                >
                  <span>FAQs</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 6. About Us */}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-[#F5F2EB] transition text-[#2C2A29] min-h-[48px]"
                >
                  <span>About Us</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 7. Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-[#F5F2EB] transition text-[#2C2A29] min-h-[48px]"
                >
                  <span>Contact</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* Mobile Auth Links / Profile */}
                <AuthHeaderButton isMobile={true} />

                <div className="pt-3 mt-1 border-t border-stone-200/60 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchModalOpen(true);
                    }}
                    className="w-full text-center py-3.5 rounded-xl font-semibold text-sm bg-[#F5F2EB] hover:bg-[#EFEBE4] active:scale-95 text-[#2C2A29] transition-transform flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <Search className="w-4 h-4" /> Search Products
                  </button>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-[#4A3525] hover:bg-[#3D2B1F] active:scale-95 text-[#FAF9F5] shadow-xs flex items-center justify-center min-h-[48px] transition-transform"
                  >
                    Explore Pure Catalog
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-[#145330] hover:bg-[#0E381C] active:scale-95 text-white shadow-xs flex items-center justify-center gap-1.5 min-h-[48px] transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4" /> View Cart &amp; Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Quick Search Modal Dialog */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/70 bg-white/98 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl text-stone-900 max-h-[85dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
              <Search className="w-5 h-5 text-amber-800" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flour, herbal teas, bundles..."
                autoFocus
                className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-stone-400"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => setSearchModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 transition text-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg bg-stone-50 border border-stone-200 p-1 shrink-0 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 group-hover:text-amber-800">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-stone-500 font-medium">
                          {p.categoryLabel} • {p.weight}
                        </div>
                      </div>
                    </div>
                    <span className="font-black text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
                      {p.priceFormatted}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-stone-500">
                  No products found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
