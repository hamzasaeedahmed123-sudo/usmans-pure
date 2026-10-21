"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useStoreData } from "@/context/StoreDataContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileText,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Dashboard & Analytics",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Products & Inventory",
    href: "/admin/products",
    icon: Package,
    badge: "Catalog",
  },
  {
    name: "Orders & Customers",
    href: "/admin/orders",
    icon: ShoppingBag,
    badge: "Live",
  },
  {
    name: "Website Text & CMS",
    href: "/admin/content",
    icon: FileText,
    badge: "Editor",
  },
  {
    name: "Store Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isStaff, isLoading, logout } = useAuth();
  const { orders, products } = useStoreData();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route guard
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isStaff)) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, isStaff, router, pathname]);

  if (isLoading || !isAuthenticated || !isStaff) {
    return (
      <div className="min-h-screen bg-[#F6F1E9] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-3 border-amber-900/30 border-t-amber-900 rounded-full animate-spin mb-4" />
        <h2 className="text-base font-bold text-stone-900 tracking-tight">
          Verifying Admin Credentials...
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          Redirecting to secure login if unauthenticated.
        </p>
      </div>
    );
  }

  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;
  const lowStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex text-stone-900 font-sans antialiased">
      {/* 1. Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* 2. Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 h-[100dvh] max-h-[100dvh] overflow-y-auto bg-[#1C1613] text-stone-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-36 h-9">
                <Image
                  src="/logo.png"
                  alt="Usman's Pure Products"
                  fill
                  className="object-contain object-left invert brightness-0"
                />
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Role Pill */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white text-[11px] tracking-wide">
                  {user?.role === "admin" ? "MASTER ADMIN" : "STAFF OPS"}
                </span>
              </div>
              <span className="text-[10px] text-amber-300/80 font-mono">v2.4 Live</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#8D2D1B] text-white shadow-md shadow-[#8D2D1B]/30"
                      : "text-stone-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isActive ? "bg-white/20 text-white" : "bg-white/10 text-stone-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar User Info & View Live Site */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold transition border border-white/10"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate leading-tight">{user?.name}</p>
                <p className="text-[10px] text-stone-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-white/5 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-stone-200/80 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="hidden sm:inline">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
              <span className="font-bold text-stone-900 capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          {/* Quick Admin Actions & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {pendingOrdersCount > 0 && (
              <Link
                href="/admin/orders"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs hover:bg-amber-200 transition"
              >
                <Bell className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
                <span>{pendingOrdersCount} Pending</span>
              </Link>
            )}

            {lowStockCount > 0 && (
              <Link
                href="/admin/products"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 border border-red-300 text-red-900 text-xs font-bold shadow-2xs"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
                <span>{lowStockCount} Out of Stock</span>
              </Link>
            )}

            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200 transition"
            >
              <span>Live Store</span>
              <ExternalLink className="w-3 h-3 text-stone-500" />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
