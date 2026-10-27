export function TickerMarquee() {
  const items = [
    "PURE PRODUCTS, PURE LIFESTYLE",
    "TRADITIONAL STONE-GROUND CHAKKI",
    "ZERO MAIDA & ZERO CHEMICAL BLEACH",
    "NATIONWIDE CASH ON DELIVERY",
    "ASLI PATHAR KI CHAKKI KA KHALIS ATTA",
    "FRESH BATCH QUALITY ASSURANCE",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#1E1510] text-stone-100 py-3 border-y border-stone-800 select-none z-10">
      <div className="flex w-max animate-marquee space-x-8">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8 shrink-0">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-amber-400">
              {text}
            </span>
            <span className="text-stone-600 text-xs font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
