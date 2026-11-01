"use client";

import { useState, useRef } from "react";
import { Play, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export function ProductVideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      aria-label="Natural Purity & Milling Process Video"
      className="relative w-full bg-[#FAF9F5] text-[#1E1510] py-14 sm:py-20 overflow-hidden border-t border-b border-[#E8E2D5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E1510] tracking-tight leading-snug">
            Asli Qudrati Purity &amp; Milling in Action
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#6B5D52] leading-relaxed font-sans">
            Dekhein kaise asli sabut anaj bina kisi chemical bleaching, bina kisi maida aur bina kisi artificial preservative ke khalis milling se tayyar kiya jata hai.
          </p>
        </div>

        {/* Full-Width Video Frame Container - Clean, Organic, Minimal */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-sm group">
          <video
            ref={videoRef}
            src="/videos/flour-production-process.mp4"
            className="w-full h-auto aspect-video sm:aspect-[16/9] object-cover cursor-pointer bg-stone-100"
            controls={hasStarted}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Clean Organic Play Overlay Button */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-stone-900/25 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-stone-900/20 z-10 select-none"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8B3A22] hover:bg-[#722F1B] text-white flex items-center justify-center shadow-lg transition-transform duration-300 transform group-hover:scale-105 active:scale-95 ring-4 ring-white/40 cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-white text-white" />
              </button>
              <span className="mt-4 text-xs sm:text-sm font-semibold tracking-wide text-[#1E1510] bg-white/95 px-4 py-1.5 rounded-full border border-stone-200/90 shadow-sm backdrop-blur-xs">
                Click to Watch Milling Process
              </span>
            </div>
          )}
        </div>

        {/* Quality Badges Beneath Video - Clean Warm Design */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 text-xs text-stone-700">
          <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-medium text-[#1E1510]">100% Whole Grains Inspected</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#8B3A22] shrink-0" />
            <span className="font-medium text-[#1E1510]">Zero Preservatives or Additives</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/90 p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
            <Award className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-medium text-[#1E1510]">Freshly Milled &amp; Hygienically Packed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
