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
    const displayName = user.role === "admin" ? "Master Admin" : (user.name ? user.name.split(" ")[0] : "User");

    return (
      <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* User/Admin Avatar badge with display name */}
        <div className={`flex items-center gap-1.5 py-1 px-2.5 rounded-full border shadow-2xs ${currentStyle.authPill}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs ${currentStyle.avatarBg}`}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="text-xs font-bold leading-none truncate max-w-[90px]">
            {displayName}
          </span>
        </div>

        {/* Direct "Dashboard" shortcut button linking to /admin */}
        <Link
          href="/admin"
          className="px-2.5 py-1.5 text-xs font-semibold rounded-full bg-amber-600 hover:bg-amber-700 text-white transition flex items-center gap-1.5 shrink-0 shadow-2xs"
          title="Go to Admin Dashboard"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>

        {/* Simple "Logout" action button */}
        <button
          onClick={() => logout()}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-red-700 transition flex items-center gap-1 shrink-0 border border-stone-200 shadow-2xs cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Logout</span>
        </button>
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
