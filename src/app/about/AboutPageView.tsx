"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import { ChakkiProcessStory } from "@/components/ChakkiProcessStory";
import {
  ChevronRight,
  ShieldCheck,
  Award,
  Leaf,
  Layers,
  Truck,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Heart,
  Eye,
  Check,
} from "lucide-react";

interface StatCounterProps {
  target: number;
  animate: boolean;
  duration?: number;
  suffix?: string;
}

function StatCounter({
  target,
  animate,
  duration = 2000,
  suffix = "+",
}: StatCounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve (1 - (1 - t)^3) for clean, natural landing
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      setValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [animate, target, duration]);

  return (
    <div className="text-3xl sm:text-5xl font-serif font-bold text-white flex items-baseline justify-center sm:justify-start tabular-nums">
      <span>{value.toLocaleString()}</span>
      <span className="select-none">{suffix}</span>
    </div>
  );
}

export function AboutPageView() {
  const [statsInView, setStatsInView] = useState(false);
  const statsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = statsSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const coreOfferings = [
    {
      title: "Stone-Ground Multigrain Flour",
      highlight: "Cold-Milled Under 40°C",
      desc: "Slow stone-ground chakki flour crafted from ancient whole grains, roasted barley, oats, and chia. Retains 100% of the natural bran, germ, and germ oils with zero maida or chemical bleaching.",
      watermark: "wheat" as const,
      link: "/flour",
      tag: "Flour Collection",
      image: "/atta-bag.png",
      purityBadge: "100% Stone-Ground",
    },
    {
      title: "Pure Herbal Teas (Rosella & Olive Leaf)",
      highlight: "Whole Leaf & Blossom Botanicals",
      desc: "Shade-dried wild hibiscus (rosella) calyces, young Mediterranean olive leaves, and calming chamomile flowers. 100% caffeine-free, loaded with natural polyphenols, vitamin C, and cardiovascular antioxidants.",
      watermark: "herbal" as const,
      link: "/herbals",
      tag: "Herbal Infusions",
      image: "/tea-pouch.png",
      purityBadge: "Zero Caffeine • Pure Herbs",
    },
    {
      title: "Cold-Pounded Organic Spices",
      highlight: "Friction-Free Stone Mortars",
      desc: "Hand-pounded Kashmiri chili, sun-dried coriander, and golden turmeric pounded at ambient room temperature to preserve volatile essential oils without colorants, starch fillers, or synthetic dyes.",
      watermark: "spices" as const,
      link: "/spices",
      tag: "Spices Collection",
      image: "/spices-jar.png",
      purityBadge: "Cold-Ground • Rich Aroma",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">About Us</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header Section */}
        <section className="relative bg-white py-16 sm:py-24 border-b border-stone-200 overflow-hidden">
          {/* Subtle Organic Background Watermark */}
          <BotanicalWatermark
            type="herbal"
            className="absolute -top-12 -right-12 w-96 h-96 sm:w-[520px] sm:h-[520px]"
            opacity={0.28}
            size={520}
          />
          <BotanicalWatermark
            type="wheat"
            className="absolute -bottom-16 -left-16 w-80 h-80 sm:w-96 sm:h-96"
            opacity={0.25}
            size={400}
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-block mb-4 tag-quiet">
              Our Heritage &amp; Philosophy
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E3A2F] tracking-tight leading-tight">
              A Journey Back to Natural Living
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-stone-700 leading-relaxed font-sans max-w-3xl mx-auto">
              &ldquo;Usman&apos;s Pure kisi factory ka naam nahi, balki hamare apne dastarkhwan ki fikar se shuru hua tha. Jab bazaar ke chemical aur maiday walay aate ne ghar ke buzurgo ki tabiyat kharab karna shuru ki, toh humne khud chakki par khalis anaj peesna shuru kiya&mdash;taake jo hum apne ghar walon ko khilayein, wahi be-khauf hokar aap tak pohnchayein.&rdquo;
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> 100% Asli Pathar Ki Chakki
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Khalis Aur Saaf Anaj
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Zero Chemical Bleach Ya Maida
              </span>
            </div>
          </div>
        </section>

        {/* Story Visual & Philosophy Banner */}
        <section className="bg-white pt-12 pb-6 border-b border-stone-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden shadow-ambient border border-stone-200">
              <Image
                src="/images/watermarks/about-leaf.png"
                alt="Our Story: Rooted in Nature, Harvested with Love"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    Usman&apos;s Pure Products Heritage
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
                    Ghar Ke Dastarkhwan Se Aap Tak
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* "Our Vision" & "Our Commitment" with authentic background watercolor leaf (Exact Reference Layout) */}
        <section className="py-20 sm:py-28 bg-white border-b border-stone-200 relative overflow-hidden">
          {/* Authentic Watercolor Botanical Leaf Graphic from usmanzpure.com matching exact reference */}
          <div
            className="absolute left-0 bottom-0 pointer-events-none select-none z-0 w-[420px] sm:w-[620px] md:w-[720px] h-[360px] sm:h-[500px] md:h-[580px] -translate-x-10 translate-y-12 sm:translate-y-8"
            aria-hidden="true"
          >
            <Image
              src="/images/watermarks/leaves-free-img.png"
              alt=""
              fill
              className="object-contain object-left-bottom opacity-60"
              priority
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Headings */}
              <div className="lg:col-span-4 space-y-14 sm:space-y-24">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E3A2F] tracking-tight">
                    Hamari Soch
                  </h2>
                </div>
                <div>
                  <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E3A2F] tracking-tight">
                    Hamara Waada
                  </h2>
                </div>
              </div>

              {/* Right Column: Paragraphs */}
              <div className="lg:col-span-8 space-y-12 sm:space-y-16">
                <div>
                  <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
                    Usman&apos;s Pure kisi factory ka naam nahi, balki hamare apne dastarkhwan ki fikar se shuru hua tha. Jab bazaar ke chemical aur maiday walay aate ne ghar ke buzurgo ki tabiyat kharab karna shuru ki, toh humne khud chakki par khalis anaj peesna shuru kiya&mdash;taake jo hum apne ghar walon ko khilayein, wahi be-khauf hokar aap tak pohnchayein. Har ghar mein khalis aur be-aalaish khorak pohnchana hamara maqsad hai.
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
                    Hum khalispan par kabhi samjhota nahi karte. Saaf suthra anaj, pathar ki thandi chakki ki peesai, aur bina kisi chemical ya maiday ki milawat ke taaza atta&mdash;yehi hamara har ghar se pakka waada hai. Taake buzurg aur bachay dono sehatmand rahein aur dastarkhwan par barkat barkarar rahe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers Speak For Themselves Stats Banner */}
        <section
          ref={statsSectionRef}
          className="bg-[#0B1528] text-white py-14 sm:py-16 border-b border-slate-900 relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center text-center sm:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                  Numbers Speak For Themselves!
                </h3>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
                <StatCounter target={5000} animate={statsInView} duration={2000} suffix="+" />
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Gharon Tak Taaza Delivery</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
                <StatCounter target={800} animate={statsInView} duration={2000} suffix="+" />
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Regular Happy Households</div>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
                <StatCounter target={40} animate={statsInView} duration={2000} suffix="+" />
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Product Categories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Milling Science: Why Cold Stone-Chakki Milling Matters */}
        <ChakkiProcessStory />

        {/* Trust & Purity Promise Section: Lab Certification */}
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200 relative overflow-hidden">
          {/* Subtle Wheat Watermark in background */}
          <BotanicalWatermark
            type="wheat"
            className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96"
            opacity={0.09}
            size={400}
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="rounded-sm bg-[#1E1510] text-white p-8 sm:p-14 relative overflow-hidden shadow-ambient">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 mb-4 tag-quiet">
                  <ShieldCheck className="w-3.5 h-3.5" /> Independent Laboratory Verification
                </span>

                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                  Your Health Isn&apos;t a Guess; It&apos;s a Guarantee.
                </h2>

                <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
                  Every product is lab-tested and verified pure. We screen each batch to guarantee 0% heavy metals, 0% chemical preservatives, and zero artificial bleaching agents like benzoyl peroxide.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800 text-xs">
                  <div>
                    <div className="text-amber-400 font-bold text-base">Under 40°C</div>
                    <div className="text-stone-400 mt-1">Cold Stone Chakki Temperature</div>
                  </div>
                  <div>
                    <div className="text-amber-400 font-bold text-base">100% Pure</div>
                    <div className="text-stone-400 mt-1">Whole Germ &amp; Bran Retained</div>
                  </div>
                  <div>
                    <div className="text-amber-400 font-bold text-base">Zero Additives</div>
                    <div className="text-stone-400 mt-1">No Preservatives or Fillers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Offerings Section */}
        <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                Pure Essentials
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
                Our Key Product Collections
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600">
                Rooted in authentic tradition, crafted for modern vitality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreOfferings.map((offering) => (
                <div
                  key={offering.title}
                  className="relative rounded-sm bg-white p-7 shadow-xs hover:shadow-ambient transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Subtle Botanical Watermark for Each Category */}
                  <BotanicalWatermark
                    type={offering.watermark}
                    className="absolute -bottom-8 -right-8 w-56 h-56"
                    opacity={0.12}
                    size={280}
                  />

                  <div className="relative z-10">
                    {/* Cutout Product Preview */}
                    <div className="relative aspect-4/3 w-full rounded-sm bg-stone-50 p-4 mb-5 flex items-center justify-center overflow-hidden">
                      <Image
                        src={offering.image}
                        alt={offering.title}
                        fill
                        sizes="300px"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 tag-quiet">
                        {offering.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-stone-900 tracking-tight">
                      {offering.title}
                    </h3>

                    <div className="text-xs font-semibold text-emerald-800 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      {offering.highlight}
                    </div>

                    <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                      {offering.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-stone-100">
                    <Link
                      href={offering.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-800 transition group-hover:translate-x-1 duration-200"
                    >
                      <span>Explore {offering.tag}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Catalog CTA */}
            <div className="mt-14 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] font-medium text-[11px] uppercase transition tracking-[0.18em] duration-200 ease-out"
              >
                <span>Explore Complete 17-Product Store</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* Facilities & Contact Section */}
        <section className="py-16 sm:py-20 bg-white border-b border-stone-200 relative overflow-hidden">
          <BotanicalWatermark
            type="spices"
            className="absolute -top-10 -right-10 w-72 h-72"
            opacity={0.09}
            size={300}
          />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-7 rounded-sm bg-stone-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">Lahore Central Dispatch Hub</h4>
                    <p className="text-xs text-stone-500">Same-Day Logistics &amp; Nationwide COD</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Fulfilling direct home orders across Lahore, Karachi, Islamabad, and all 150+ courier service towns in Pakistan with fast doorstep Cash on Delivery.
                </p>
              </div>

              <div className="p-7 rounded-sm bg-stone-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">Faisalabad Traditional Chakki Unit</h4>
                    <p className="text-xs text-stone-500">Cold Stone Milling &amp; Herb Processing</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Located near prime fertile grain belts to source organic wheat, methi seeds, and wild botanicals, milling slowly to lock in living nutrients.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
