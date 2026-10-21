"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, User as UserIcon, Eye, EyeOff, CheckCircle2, AlertCircle, Phone } from "lucide-react";

function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      setErrorMsg("Please accept the terms of service.");
      return;
    }

    setLoading(true);
    const res = await signup(name, email, password, role);
    setLoading(false);

    if (res.success) {
      setSuccessToast("Account created successfully! Redirecting...");
      setTimeout(() => {
        if (role === "admin" || role === "staff") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 700);
    } else {
      setErrorMsg(res.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-8 pb-32 px-4 sm:px-6 overflow-hidden bg-[#FAF6F0]">
      {/* 1. Atmospheric Luxury Organic Background Visuals */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#E5D2BA]/70 blur-3xl opacity-80" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#A3D2B7]/50 blur-3xl opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8C5B5]/40 blur-3xl opacity-50" />

        {/* Floating Organic Accents */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-4, 6, -4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-10 md:left-24 w-16 h-16 sm:w-20 sm:h-20 opacity-40 mix-blend-multiply"
        >
          <Image src="/images/hero/wheat-1.png" alt="Wheat Spike" fill className="object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [12, -8, 12], rotate: [5, -5, 5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 left-8 md:left-28 w-16 h-16 sm:w-20 sm:h-20 opacity-40 mix-blend-multiply"
        >
          <Image src="/images/hero/cinnamon.png" alt="Cinnamon Stick" fill className="object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [-8, 12, -8], rotate: [-6, 6, -6] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-16 right-10 md:right-32 w-14 h-14 sm:w-16 sm:h-16 opacity-45 mix-blend-multiply"
        >
          <Image src="/images/hero/chamomile.png" alt="Chamomile Blossom" fill className="object-contain" />
        </motion.div>
      </div>

      {/* 2. Glassmorphic Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/75 border border-white/80 shadow-2xl rounded-3xl p-6 sm:p-9 text-stone-900 my-8"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105 mb-3">
            <div className="relative w-40 h-10">
              <Image src="/logo.png" alt="Usman's Pure Products" fill className="object-contain" priority />
            </div>
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200/80 text-emerald-950 text-[11px] font-bold tracking-wide">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>Join the Pure Living Community</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-2.5">
            Create an Account
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Access stone-ground flours, herbal teas, and pure spices
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200/80 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Usman Malik"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40 focus:border-amber-900/60 transition shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40 focus:border-amber-900/60 transition shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300 1234567"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40 focus:border-amber-900/60 transition shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/90 border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40 focus:border-amber-900/60 transition shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  role === "customer"
                    ? "bg-[#1C1613] text-white border-black shadow-xs"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                Customer Account
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  role === "admin"
                    ? "bg-[#1C1613] text-white border-black shadow-xs"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                Admin / Staff
              </button>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer select-none text-xs font-medium text-stone-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 focus:ring-amber-900/40 border-stone-300 mt-0.5"
              />
              <span>
                I agree to the <span className="underline">Terms of Service</span> and acknowledge Usman&apos;s Pure guarantee.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#1C1613] hover:bg-black text-white transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Pure Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-5 pt-4 border-t border-stone-200/80 text-center text-xs text-stone-600">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-amber-950 hover:underline">
            Sign In &rarr;
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-[#FAF6F0] flex items-center justify-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
