"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStoreData } from "@/context/StoreDataContext";

export type AnnouncementBarTheme = "flour" | "herbals" | "spices" | "amber" | "green" | "terracotta";

interface AnnouncementBarProps {
  theme?: AnnouncementBarTheme;
  className?: string;
  customBg?: string;
}

const THEME_COLORS: Record<AnnouncementBarTheme, string> = {
  flour: "#2A1F17", // Deep Roasted Brown
  amber: "#2A1F17",
  herbals: "#0E381C", // Deep Forest Green
  green: "#0E381C",
  spices: "#541B10", // Deep Terracotta Rust
  terracotta: "#541B10",
};

export function AnnouncementBar({ theme = "flour", className = "", customBg }: AnnouncementBarProps) {
  const bgColor = customBg || THEME_COLORS[theme] || "#2A1F17";
  const { cmsContent } = useStoreData();

  const primaryText = cmsContent?.announcementBarText || "100% Traditional Stone-Ground • Zero Maida • Freshly Milled";
  const subText = cmsContent?.announcementSubText || "Free Nationwide Shipping on Orders Rs 10,000+ • Cash on Delivery";

  return (
    <motion.div
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`relative z-40 w-full py-1.5 px-3 sm:px-4 text-center text-[10px] sm:text-[11px] md:text-xs font-medium text-white flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide shadow-xs select-none ${className}`}
    >
      <span className="truncate sm:overflow-visible">
        {primaryText}
      </span>
      <span className="opacity-60 hidden sm:inline">|</span>
      <span className="font-semibold hidden sm:inline">
        {subText}
      </span>
      <span className="font-semibold sm:hidden">
        • Free Shipping Rs 10,000+
      </span>
    </motion.div>
  );
}

export default AnnouncementBar;
