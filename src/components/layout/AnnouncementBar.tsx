"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStoreData } from "@/context/StoreDataContext";

export type AnnouncementBarTheme = "flour" | "herbals" | "amber" | "green";

interface AnnouncementBarProps {
  theme?: AnnouncementBarTheme;
  className?: string;
  customBg?: string;
}

const THEME_COLORS: Record<AnnouncementBarTheme, string> = {
  flour: "#121212",
  amber: "#121212",
  herbals: "#121212",
  green: "#121212",
};

export function AnnouncementBar({ theme = "flour", className = "", customBg }: AnnouncementBarProps) {
  const bgColor = customBg || THEME_COLORS[theme] || "#2A1F17";
  const { cmsContent } = useStoreData();

  const defaultText = "100% Khalis Aur Taaza Chakki Atta • Zero Maida • Nationwide Cash on Delivery Across Pakistan";
  const primaryText = cmsContent?.announcementBarText || defaultText;

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
