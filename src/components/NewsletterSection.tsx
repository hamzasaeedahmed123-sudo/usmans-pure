"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#1E1510] text-white relative overflow-hidden border-b border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          Special Offer
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
          Subscribe to Usman&apos;s Pure Newsletter
        </h2>

        <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Get <strong>10% OFF</strong> your next order, seasonal harvest alerts, and healthy diet &amp; cooking tips straight to your inbox.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-4 rounded-sm bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-sm font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>Thank you for subscribing! Check your email for your 10% coupon code.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-12 pr-4 py-3.5 rounded-md bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-amber-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shrink-0 active:scale-95"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-stone-500">
          We respect your privacy. No spam ever — unsubscribe with a single click anytime.
        </p>
      </div>
    </section>
  );
}
