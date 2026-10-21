"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AmbientCategoryTheme = "default" | "flour" | "herbals" | "spices";

export interface ThemePalette {
  bg: string;
  bgHex: string;
  border: string;
  borderHex: string;
  accent: string;
  accentHex: string;
  pillBg: string;
  pillText: string;
  label: string;
  subtext: string;
}

export const THEME_PALETTES: Record<AmbientCategoryTheme, ThemePalette> = {
  default: {
    bg: "bg-[#FAF7F2]",
    bgHex: "#FAF7F2",
    border: "border-[#EBE4D8]",
    borderHex: "#EBE4D8",
    accent: "text-[#8B3A22]",
    accentHex: "#8B3A22",
    pillBg: "bg-[#EFE2CE]",
    pillText: "text-[#54361C]",
    label: "Organic Pantry",
    subtext: "100% Pure Stone-Ground Chakki Products",
  },
  flour: {
    bg: "bg-[#F7F3EB]",
    bgHex: "#F7F3EB",
    border: "border-[#E8DFD1]",
    borderHex: "#E8DFD1",
    accent: "text-[#8C6D46]",
    accentHex: "#8C6D46",
    pillBg: "bg-[#EFE7DB]",
    pillText: "text-[#6E4E28]",
    label: "Stone-Ground Chakki Flours",
    subtext: "Warm Linen & Milled Wheat Tone",
  },
  herbals: {
    bg: "bg-[#F2F7F4]",
    bgHex: "#F2F7F4",
    border: "border-[#D0E2D6]",
    borderHex: "#D0E2D6",
    accent: "text-[#2D5A3E]",
    accentHex: "#2D5A3E",
    pillBg: "bg-[#DCF0E5]",
    pillText: "text-[#1C4A2D]",
    label: "Pure Botanical Herbal Teas",
    subtext: "Botanical Sage & Mint Mist Tone",
  },
  spices: {
    bg: "bg-[#FAF3EF]",
    bgHex: "#FAF3EF",
    border: "border-[#ECCDC3]",
    borderHex: "#ECCDC3",
    accent: "text-[#9E3E26]",
    accentHex: "#9E3E26",
    pillBg: "bg-[#FBE5DF]",
    pillText: "text-[#7E2914]",
    label: "Cold-Pounded Pure Spices",
    subtext: "Warm Saffron Sand & Terracotta Tone",
  },
};

interface AmbientThemeContextType {
  activeTheme: AmbientCategoryTheme;
  setActiveTheme: (theme: AmbientCategoryTheme) => void;
  palette: ThemePalette;
}

const AmbientThemeContext = createContext<AmbientThemeContextType>({
  activeTheme: "default",
  setActiveTheme: () => {},
  palette: THEME_PALETTES.default,
});

export const useAmbientTheme = () => useContext(AmbientThemeContext);

interface AmbientThemeWrapperProps {
  children: ReactNode;
  initialTheme?: AmbientCategoryTheme;
  className?: string;
  enableScrollSpy?: boolean;
}

export function AmbientThemeWrapper({
  children,
  initialTheme = "default",
  className = "",
  enableScrollSpy = true,
}: AmbientThemeWrapperProps) {
  const [activeTheme, setActiveTheme] = useState<AmbientCategoryTheme>(initialTheme);

  useEffect(() => {
    if (!enableScrollSpy) return;

    // Observe elements with data-ambient-theme or id="flour" | "herbals" | "spices"
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-ambient-theme], #flour, #herbals, #spices"
    );

    if (!targets || targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio descending
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topEntry = visibleEntries[0];
          const rawAttr =
            topEntry.target.getAttribute("data-ambient-theme") || topEntry.target.id;

          if (
            rawAttr === "flour" ||
            rawAttr === "herbals" ||
            rawAttr === "spices" ||
            rawAttr === "default"
          ) {
            setActiveTheme(rawAttr as AmbientCategoryTheme);
          }
        }
      },
      {
        threshold: [0.1, 0.25, 0.45],
        rootMargin: "-10% 0px -30% 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [enableScrollSpy]);

  const currentPalette = THEME_PALETTES[activeTheme];

  return (
    <AmbientThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
        palette: currentPalette,
      }}
    >
      <div
        className={`relative w-full ${currentPalette.bg} text-stone-900 transition-colors duration-700 ease-in-out ${className}`}
        style={{
          willChange: "background-color",
          // Expose CSS variables for dynamic ambient matching
          ["--ambient-bg" as string]: currentPalette.bgHex,
          ["--ambient-border" as string]: currentPalette.borderHex,
          ["--ambient-accent" as string]: currentPalette.accentHex,
        }}
        data-active-ambient-theme={activeTheme}
      >
        {children}
      </div>
    </AmbientThemeContext.Provider>
  );
}
