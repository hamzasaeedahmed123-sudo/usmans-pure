"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";

export function HomeStickyHeader() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Smoothly display sticky header once scrolled past the hero viewport
      setShowSticky(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showSticky) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
      <Header isSolid theme="amber" />
    </div>
  );
}

