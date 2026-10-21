"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, LogIn, UserPlus, LogOut, LayoutDashboard, Shield, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbientTheme } from "@/components/theme/AmbientThemeWrapper";

export type SlideNavTheme = "flour" | "herbals" | "spices";

export interface AuthHeaderButtonProps {
  isMobile?: boolean;
  slideTheme?: SlideNavTheme;
}

export function AuthHeaderButton({ isMobile = false, slideTheme }: AuthHeaderButtonProps) {
  const { user, isAuthenticated, isStaff, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { activeTheme } = useAmbientTheme();

  // Determine effective theme
  const currentTheme: SlideNavTheme =
    slideTheme ||
    (activeTheme === "herbals"
      ? "herbals"
      : activeTheme === "spices"
      ? "spices"
      : "flour");

  const themeStyles: Record<
    SlideNavTheme,
    {
      loginBtn: string;
      signUpBtn: string;
      authPill: string;
      avatarBg: string;
    }
  > = {
    flour: {
      loginBtn: "bg-[#F5EFE6]/70 hover:bg-[#F5EFE6] border-[#E5DACB]/80 text-[#3D2817]",
      signUpBtn: "bg-[#2A1B10] text-[#FDFBF7] hover:bg-[#1C120B]",
      authPill: "bg-[#F5EFE6]/70 hover:bg-[#F5EFE6] border-[#E5DACB]/80 text-[#3D2817]",
      avatarBg: "bg-[#2A1B10] text-[#FDFBF7]",
    },
    herbals: {
      loginBtn: "bg-[#EAF3EC]/70 hover:bg-[#EAF3EC] border-[#C5DEC9]/80 text-[#0E351B]",
      signUpBtn: "bg-[#0B2C16] text-[#F3F9F5] hover:bg-[#071F0F]",
      authPill: "bg-[#EAF3EC]/70 hover:bg-[#EAF3EC] border-[#C5DEC9]/80 text-[#0E351B]",
      avatarBg: "bg-[#0B2C16] text-[#F3F9F5]",
    },
    spices: {
      loginBtn: "bg-[#F9ECE4]/70 hover:bg-[#F9ECE4] border-[#E8C8B5]/80 text-[#4E1E0F]",
      signUpBtn: "bg-[#381408] text-[#FDF6F2] hover:bg-[#270E05]",
      authPill: "bg-[#F9ECE4]/70 hover:bg-[#F9ECE4] border-[#E8C8B5]/80 text-[#4E1E0F]",
      avatarBg: "bg-[#381408] text-[#FDF6F2]",
    },
  };

  const currentStyle = themeStyles[currentTheme];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    if (isAuthenticated && user) {
      return (
        <div className="pt-2 border-t border-stone-200/80 mt-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-stone-100/80 rounded-2xl mb-2">
            <div className="w-9 h-9 rounded-full bg-[#1C1613] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-stone-900 truncate">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                  user.role === "admin"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : user.role === "staff"
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-stone-200 text-stone-800"
                }`}>
                  {user.role}
                </span>
                <span className="text-[11px] text-stone-500 truncate">{user.email}</span>
              </div>
            </div>
          </div>

          {isStaff && (
            <Link
              href="/admin"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 font-bold text-xs mb-1.5 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-amber-700" />
                <span>Admin Dashboard</span>
              </div>
              <span className="text-[10px] bg-amber-700 text-white px-1.5 py-0.5 rounded-full font-bold">Panel</span>
            </Link>
          )}

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-stone-600 hover:text-red-700 hover:bg-red-50 text-xs font-semibold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      );
    }

    return (
      <div className="pt-2 border-t border-stone-200/80 mt-2 flex items-center gap-2">
        <Link
          href="/login"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition border border-stone-200 shadow-2xs"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Log In</span>
        </Link>
        <Link
          href="/signup"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold transition shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Sign Up</span>
        </Link>
      </div>
    );
  }

  // Desktop view
  if (isAuthenticated && user) {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={`flex items-center gap-2 py-1 px-2.5 sm:px-3 rounded-full border shadow-xs transition-colors duration-500 ease-in-out cursor-pointer group ${currentStyle.authPill}`}
          aria-label="User Account Menu"
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs group-hover:scale-105 transition-all duration-500 ${currentStyle.avatarBg}`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight max-w-[90px] truncate">
              {user.name.split(" ")[0]}
            </span>
            <span className="text-[9px] font-semibold opacity-80 uppercase tracking-wider leading-none">
              {user.role}
            </span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-2xl shadow-xl p-2 z-50 text-stone-900"
            >
              <div className="px-3 py-2 border-b border-stone-100">
                <p className="text-xs font-bold text-stone-900 truncate">{user.name}</p>
                <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                <span className={`inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  user.role === "admin"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : user.role === "staff"
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-stone-100 text-stone-700"
                }`}>
                  {user.role === "admin" ? "Store Administrator" : user.role === "staff" ? "Staff Member" : "Customer"}
                </span>
              </div>

              <div className="py-1">
                {isStaff && (
                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-950 hover:bg-amber-50 transition group"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
                    <span className="flex-1">Admin Panel</span>
                    <span className="text-[9px] bg-amber-700 text-white px-1.5 py-0.5 rounded-full font-bold">CMS</span>
                  </Link>
                )}

                <Link
                  href="/products"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-800 hover:bg-stone-100 transition"
                >
                  <Shield className="w-4 h-4 text-stone-500" />
                  <span>Shop Pure Organics</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-stone-100">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Unauthenticated desktop buttons
  return (
    <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
      <Link
        href="/login"
        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full bg-[#ede8e1] text-stone-800 hover:bg-stone-200 transition flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-xs"
      >
        <LogIn className="w-3.5 h-3.5 opacity-80" />
        <span>Log In</span>
      </Link>
      <Link
        href="/signup"
        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full bg-stone-900 text-white hover:bg-stone-800 transition flex items-center gap-1.5 shrink-0 whitespace-nowrap shadow-xs"
      >
        <UserPlus className="w-3.5 h-3.5" />
        <span>Sign Up</span>
      </Link>
    </div>
  );
}
