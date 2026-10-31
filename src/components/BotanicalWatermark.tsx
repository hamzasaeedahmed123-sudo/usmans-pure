import Image from "next/image";

interface WatermarkProps {
  type: "herbal" | "wheat" | "leaf" | "basil";
  className?: string;
  opacity?: number; // default ~0.35 for clear visible organic watermark
  size?: number;
}

export function BotanicalWatermark({
  type,
  className = "",
  opacity = 0.35,
  size = 400,
}: WatermarkProps) {
  const imageMap = {
    herbal: "/images/watermarks/leaves-free-img.png",
    leaf: "/images/watermarks/leaves-free-img.png",
    wheat: "/images/watermarks/wheat-stalks.png",
    basil: "/images/watermarks/basil-leaf.png",
  };

  const src = imageMap[type] || imageMap.herbal;

  return (
    <div
      className={`pointer-events-none z-0 select-none overflow-hidden max-w-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}

// Inline crisp SVG alternatives for lightweight decorative watermark flourishes
export function HerbalBranchSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none -z-10 select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M30 170 C60 140, 100 110, 160 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Delicate leaves */}
      <path
        d="M70 125 C65 110, 50 105, 45 115 C55 125, 70 125, 70 125 Z"
        fill="currentColor"
      />
      <path
        d="M85 110 C95 95, 110 95, 112 105 C102 115, 85 110, 85 110 Z"
        fill="currentColor"
      />
      <path
        d="M105 85 C100 70, 85 65, 80 75 C90 85, 105 85, 105 85 Z"
        fill="currentColor"
      />
      <path
        d="M125 68 C135 55, 150 55, 152 65 C142 75, 125 68, 125 68 Z"
        fill="currentColor"
      />
      <path
        d="M150 45 C155 30, 170 30, 172 38 C165 48, 150 45, 150 45 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WheatStalkSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none -z-10 select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M100 250 C100 180, 100 120, 100 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Wheat kernels */}
      <path d="M100 120 C90 110, 80 115, 85 125 C95 130, 100 120, 100 120 Z" fill="currentColor" />
      <path d="M100 120 C110 110, 120 115, 115 125 C105 130, 100 120, 100 120 Z" fill="currentColor" />
      <path d="M100 100 C90 90, 80 95, 85 105 C95 110, 100 100, 100 100 Z" fill="currentColor" />
      <path d="M100 100 C110 90, 120 95, 115 105 C105 110, 100 100, 100 100 Z" fill="currentColor" />
      <path d="M100 80 C90 70, 80 75, 85 85 C95 90, 100 80, 100 80 Z" fill="currentColor" />
      <path d="M100 80 C110 70, 120 75, 115 85 C105 90, 100 80, 100 80 Z" fill="currentColor" />
      <path d="M100 60 C90 50, 80 55, 85 65 C95 70, 100 60, 100 60 Z" fill="currentColor" />
      <path d="M100 60 C110 50, 120 55, 115 65 C105 70, 100 60, 100 60 Z" fill="currentColor" />
      <path d="M100 40 C90 30, 80 35, 85 45 C95 50, 100 40, 100 40 Z" fill="currentColor" />
      <path d="M100 40 C110 30, 120 35, 115 45 C105 50, 100 40, 100 40 Z" fill="currentColor" />
      <path d="M100 20 C95 10, 105 10, 100 20 Z" fill="currentColor" />
    </svg>
  );
}


