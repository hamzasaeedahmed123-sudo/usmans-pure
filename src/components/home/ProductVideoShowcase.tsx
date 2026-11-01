"use client";

import { useState, useRef } from "react";
import { Play, Sparkles, CheckCircle2, ShieldCheck, Award } from "lucide-react";

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
      aria-label="Freshly Milled Chakki Atta Production & Quality Video"
      className="relative w-full bg-[#1A120D] text-[#FAF7F2] py-14 sm:py-20 overflow-hidden border-t border-[#3A2A20]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B3A22]/30 border border-[#8B3A22]/50 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Visual Evidence of Purity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
            Taaza Chakki Purity &amp; Milling in Action
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            Dekhein kaise asli sabut anaj bina kisi chemical bleaching, bina kisi maida aur bina kisi artificial preservative ke taaza chakki pe tayyar kiya jata hai.
          </p>
        </div>

        {/* Full-Width Video Frame Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-stone-800 group">
          <video
            ref={videoRef}
            src="/videos/flour-production-process.mp4"
            className="w-full h-auto aspect-video sm:aspect-[16/9] object-cover cursor-pointer bg-stone-950"
            controls={hasStarted}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Interactive Play Overlay Button */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/30 z-10 select-none"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8B3A22] hover:bg-[#A04328] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 transform group-hover:scale-110 active:scale-95 ring-4 ring-white/20 cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-white text-white" />
              </button>
              <span className="mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-black/70 px-4 py-1.5 rounded-full backdrop-blur-xs border border-white/15 shadow-md">
                Click to Watch Milling Process
              </span>
            </div>
          )}
        </div>

        {/* Quality Badges Beneath Video */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 text-xs text-stone-300">
          <div className="flex items-center gap-2.5 bg-stone-900/70 p-3.5 rounded-xl border border-stone-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium text-stone-200">100% Whole Grains Inspected</span>
          </div>
          <div className="flex items-center gap-2.5 bg-stone-900/70 p-3.5 rounded-xl border border-stone-800">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium text-stone-200">Zero Preservatives or Additives</span>
          </div>
          <div className="flex items-center gap-2.5 bg-stone-900/70 p-3.5 rounded-xl border border-stone-800">
            <Award className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-medium text-stone-200">Freshly Milled &amp; Hygienically Packed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
