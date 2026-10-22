"use client";

import { useState, useEffect } from "react";
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
  theme?: "amber" | "green" | "terracotta";
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
  const slideThemeKey: "flour" | "herbals" | "spices" =
    theme === "green" ? "herbals" : theme === "terracotta" ? "spices" : "flour";

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
      tag: "100% Stone-Ground",
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
    terracotta: {
      bar: "bg-[#541B10] text-white",
      glass: isSolid
        ? "bg-[#FCF1EC] border-[#E8BFB2]/80 text-[#681E10] shadow-md"
        : isScrolled
        ? "bg-[#FCF1EC]/90 border-[#E8BFB2]/70 text-[#681E10] shadow-lg shadow-[#681E10]/5"
        : "bg-white/50 border-white/60 text-[#681E10]",
      accent: "bg-[#8D2D1B] hover:bg-[#6D2012] text-[#FDF4EF]",
      pill: "bg-[#F9ECE4]/70 border-[#E8C8B5]/80 text-[#4E1E0F]",
      badge: "bg-[#F3D5C5]/70 border-[#ECC0AA]/80 text-[#4E1E0F]",
      cartBtn: "bg-[#F9ECE4]/70 hover:bg-[#F9ECE4] border-[#E8C8B5]/80 text-[#4E1E0F]",
      tag: "Cold Stone-Pounded",
    },
  }[theme];

  return (
    <>
      <header className="relative w-full z-40 transition-all duration-300">
        {/* Top Announcement Bar */}
        <AnnouncementBar theme={theme} />

        {/* Main Frosted Glass Navbar */}
        <div
          className={`mx-auto transition-all duration-300 backdrop-blur-xl border-b ${themeClasses.glass}`}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 relative z-50">
            {/* Left Section (Logo): Clean without redundant badge */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
                aria-label="USMAN'S PURE PRODUCTS"
              >
                <div className="relative w-36 sm:w-40 h-9 sm:h-[45px] flex items-center">
                  <Image
                    src="/logo.png"
                    alt="USMAN'S PURE PRODUCTS"
                    width={160}
                    height={45}
                    className="w-auto h-8 sm:h-9 object-contain object-left group-hover:scale-[1.02] transition-transform duration-300"
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

                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-stone-900">
                    <Link
                      href="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="block px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-900 border-b border-stone-100"
                    >
                      All Catalog &rarr;
                    </Link>
                    <div className="py-1">
                      <Link
                        href="/flour"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-50 text-stone-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#8C6D46]" />
                        <span>1. Chakki Flour</span>
                      </Link>
                      <Link
                        href="/herbals"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-50 text-stone-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#2D5A3E]" />
                        <span>2. Herbal Teas</span>
                      </Link>
                      <Link
                        href="/spices"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-50 text-stone-800"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#9E3E26]" />
                        <span>3. Pure Spices</span>
                      </Link>
                    </div>
                  </div>
                )}
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
              {/* Quick Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Pure Products"
                className="cursor-pointer hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede8e1] border border-stone-200/80 hover:bg-stone-200 text-xs font-medium shadow-xs transition shrink-0"
              >
                <Search className="w-3.5 h-3.5 opacity-70" />
                <span className="opacity-80">Search</span>
                <kbd className="font-mono text-[9px] bg-black/5 px-1 py-0.2 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => openCart()}
                className="cursor-pointer relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ede8e1] flex items-center justify-center hover:bg-stone-200 transition shadow-sm shrink-0"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-stone-800" />
                <span
                  id="cart-badge-count"
                  className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold shadow-xs ${themeClasses.badge}`}
                >
                  {totalCount}
                </span>
              </button>

              {/* User Authentication Actions / Admin Menu */}
              <AuthHeaderButton slideTheme={slideThemeKey} />

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ede8e1] flex items-center justify-center hover:bg-stone-200 transition shadow-sm cursor-pointer shrink-0"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-stone-800" />
                ) : (
                  <Menu className="w-5 h-5 text-stone-800" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Slide-down Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-black/10 animate-in fade-in slide-in-from-top-2 duration-200 bg-white/98 backdrop-blur-xl rounded-2xl p-4 shadow-xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto pb-24">
              <div className="px-2 pb-2.5 mb-2 border-b border-black/10 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-sm z-20 -mt-1 pt-1">
                <div className="relative w-36 h-9 flex items-center">
                  <Image
                    src="/logo.png"
                    alt="USMAN'S PURE PRODUCTS"
                    width={160}
                    height={45}
                    className="w-auto h-8 object-contain object-left"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-widest">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center z-50 shadow-xs"
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
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-stone-100 transition text-stone-900 min-h-[48px]"
                >
                  <span>Home</span>
                </Link>

                {/* 2. Doctor's Choice */}
                <Link
                  href="/doctors-choice"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-stone-100 transition text-stone-900 min-h-[48px]"
                >
                  <div className="flex items-center">
                    <span>Doctor&apos;s Choice</span>
                    <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded-full font-bold ml-1.5 leading-none">
                      Verified
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 3. All Products with Sub-items */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-stone-900">
                    <Link
                      href="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:underline"
                    >
                      All Products
                    </Link>
                  </div>
                  <div className="ml-4 pl-3 border-l-2 border-stone-200 flex flex-col gap-1 py-1">
                    <Link
                      href="/flour"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 text-stone-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#8C6D46]" />
                      <span>1. Chakki Flour</span>
                    </Link>
                    <Link
                      href="/herbals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 text-stone-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#2D5A3E]" />
                      <span>2. Herbal Teas</span>
                    </Link>
                    <Link
                      href="/spices"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-stone-100 text-stone-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#9E3E26]" />
                      <span>3. Pure Spices</span>
                    </Link>
                  </div>
                </div>

                {/* 4. Mega Bundles */}
                <Link
                  href="/bundles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-stone-100 transition text-stone-900 min-h-[48px]"
                >
                  <div className="flex items-center">
                    <span>Mega Bundles</span>
                    <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full font-bold ml-1.5 leading-none">
                      Save
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 5. About Us */}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-stone-100 transition text-stone-900 min-h-[48px]"
                >
                  <span>About Us</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* 6. Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold hover:bg-stone-100 transition text-stone-900 min-h-[48px]"
                >
                  <span>Contact</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>

                {/* Mobile Auth Links / Profile */}
                <AuthHeaderButton isMobile={true} />

                <div className="pt-3 mt-1 border-t border-black/10 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchModalOpen(true);
                    }}
                    className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-stone-100 hover:bg-stone-200 text-stone-800 transition flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <Search className="w-4 h-4" /> Search Products
                  </button>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full text-center py-3.5 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center min-h-[48px] ${themeClasses.accent}`}
                  >
                    Explore Pure Catalog
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-1.5 min-h-[48px]"
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
