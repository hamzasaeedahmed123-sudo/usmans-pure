"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Terminal,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Droplet,
  ShoppingBag,
  Star,
  Award,
} from "lucide-react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<"products" | "terminal">("products");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // GSAP Interactive Fluid Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes for emerald fluid mesh
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        hue: Math.random() > 0.5 ? 155 : 175, // Emerald to Teal
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 190 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 4;
          const angle = Math.atan2(dy, dx);
          p1.x -= Math.cos(angle) * force;
          p1.y -= Math.sin(angle) * force;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p1.hue}, 85%, 60%, 0.45)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distBetween < 130) {
            const alpha = (1 - distBetween / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Entrance Choreography
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: -25, opacity: 0, duration: 0.8, delay: 0.1 })
        .from(".hero-headline", { y: 30, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-sub", { y: 25, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-hud", { y: 40, opacity: 0, scale: 0.96, duration: 1 }, "-=0.5");

      gsap.to(".hud-glow", {
        scale: 1.25,
        opacity: 0.8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (name: string) => {
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const pureProducts = [
    {
      id: "prod-1",
      name: "Cold-Pressed Black Seed Oil",
      volume: "250ml Glass Bottle",
      price: "$28.00",
      purity: "100% Nigella Sativa",
      rating: "4.9",
      tag: "Best Seller",
    },
    {
      id: "prod-2",
      name: "Raw Wild Sidr Honey",
      volume: "500g Jar",
      price: "$42.00",
      purity: "Unfiltered & Raw",
      rating: "5.0",
      tag: "Pure Forest",
    },
    {
      id: "prod-3",
      name: "Extra Virgin Cold-Pressed Olive Oil",
      volume: "500ml Dark Glass",
      price: "$32.00",
      purity: "Single Estate <0.2% Acidity",
      rating: "4.9",
      tag: "First Cold Press",
    },
    {
      id: "prod-4",
      name: "Pure Sweet Almond Oil",
      volume: "200ml Amber Dropper",
      price: "$24.00",
      purity: "100% Cold-Pressed Kernels",
      rating: "4.8",
      tag: "Certified Organic",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 selection:bg-emerald-500/30 selection:text-emerald-200"
    >
      {/* Background Interactive Fluid Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-55"
      />

      {/* Radial Gradient Ambient Lighting */}
      <div className="hud-glow pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-tr from-emerald-600/20 via-teal-600/20 to-emerald-900/15 blur-[140px] rounded-full z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-zinc-900/80 backdrop-blur-md text-xs font-medium text-emerald-300 mb-8 shadow-xl hover:border-emerald-500/50 transition">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-zinc-300">Usman&apos;s Pure Storefront</span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Cold-Pressed & Lab-Tested
          </span>
        </div>

        {/* Fluid Kinetic Headline */}
        <h1
          ref={titleRef}
          className="hero-headline text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-balance max-w-4xl leading-[1.08]"
        >
          Organic Nourishment in Its{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Purest Natural Form
          </span>
        </h1>

        {/* Subhead Description */}
        <p className="hero-sub mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Unrefined cold-pressed oils, unfiltered forest honey, and certified botanicals.
          Crafted with zero heat, zero chemical solvents, and 100% verified traceability.
        </p>

        {/* Action Button Group */}
        <div className="hero-actions mt-9 flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#featured-pure"
            className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium shadow-lg shadow-emerald-500/25 transition duration-200"
          >
            <Droplet className="w-4 h-4 text-emerald-200" />
            <span>Explore Pure Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#purity-guarantee"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 font-medium transition duration-200 backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Purity Certificate Guarantee</span>
          </a>
        </div>

        {/* Live HUD / Product Showcase & GSD State Card */}
        <div className="hero-hud mt-14 w-full max-w-3xl rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl text-left">
          {/* HUD Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/70 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="w-3 h-3 rounded-full bg-teal-500/80" />
              <span className="w-3 h-3 rounded-full bg-cyan-500/80" />
              <span className="ml-2 font-mono text-zinc-300 font-medium">Usman&apos;s Pure Curated Vault</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("products")}
                className={`cursor-pointer px-3 py-1 rounded-md transition ${
                  activeTab === "products"
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Signature Pure Items
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`cursor-pointer px-3 py-1 rounded-md transition ${
                  activeTab === "terminal"
                    ? "bg-zinc-800 text-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                GSD Architecture State
              </button>
            </div>
          </div>

          {/* Tab 1: Pure Products Showcase */}
          {activeTab === "products" ? (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {pureProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 hover:border-emerald-500/40 transition duration-200 flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-zinc-100 text-sm group-hover:text-emerald-300 transition">
                        {prod.name}
                      </div>
                      <div className="text-zinc-400 text-[11px] mt-0.5">{prod.volume}</div>
                      <div className="text-emerald-400/90 text-[11px] font-mono mt-1 flex items-center gap-1">
                        <Leaf className="w-3 h-3" /> {prod.purity}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                      {prod.tag}
                    </span>
                  </div>

                  <div className="pt-3 mt-3 border-t border-zinc-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">{prod.price}</span>
                      <span className="text-amber-400 flex items-center text-[10px] gap-0.5 ml-1">
                        <Star className="w-3 h-3 fill-amber-400" /> {prod.rating}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(prod.name)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 font-semibold text-xs border border-emerald-500/30 transition duration-200"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{addedItem === prod.name ? "Added ✓" : "Add to Cart"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tab 2: GSD & Ralph Loop State */
            <div className="pt-3 font-mono text-xs text-zinc-300 space-y-2 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/70 mt-3 min-h-[140px]">
              <div className="text-zinc-500 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>$ ./ralph-loop.sh --status</span>
              </div>
              <div className="text-zinc-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Storefront: Usman&apos;s Pure Store (Next.js 16 + Tailwind v4)</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>US-001: Validate CLI Dependencies (git, jq, gh) [PASS]</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>US-002: GSAP Fluid Hero Canvas with Kinetic Particles [PASS]</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>US-003: Modern Header Navigation & Brand Shell in layout.tsx [PASS]</span>
              </div>
              <div className="text-indigo-400">
                🌿 Branch: ralph/feature-foundation | Zero Context Rot Mode Active
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
