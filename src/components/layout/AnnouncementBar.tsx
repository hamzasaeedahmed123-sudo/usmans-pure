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

  const defaultText = "90% Pathar Ki Chakki Ka Khalis Atta • Zero Maida • Lahore & Rawalpindi/Islamabad Mein Taaza Delivery";
  const primaryText = (!cmsContent?.announcementBarText || cmsContent.announcementBarText.includes("Traditional Stone-Ground"))
    ? defaultText
    : cmsContent.announcementBarText;

  return (
    <motion.div
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`relative z-40 w-full py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs font-medium text-white flex items-center justify-center gap-2 tracking-normal shadow-xs select-none ${className}`}
    >
      <span className="truncate sm:overflow-visible">
        {primaryText}
      </span>
    </motion.div>
  );
}

export default AnnouncementBar;
