import Image from "next/image";

export function HeroFeatureShowcase() {
  return (
    <section
      aria-label="Usman's Pure Products Multigrain Flour Feature"
      className="relative w-full bg-white overflow-hidden py-3 sm:py-6 flex items-center justify-center border-none shadow-none"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center border-none shadow-none">
        <Image
          src="/images/hero/feature-man-flour.png"
          alt="Usman's Pure Products Multigrain Flour - 100% Pure & Freshly Stone-Ground"
          width={1024}
          height={765}
          priority
          quality={100}
          className="w-full h-auto object-contain max-h-[500px] md:max-h-[600px] mix-blend-multiply select-none pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
        />
      </div>
    </section>
  );
}
