"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, DEMO_USERS, UserRole } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Eye, EyeOff, CheckCircle2, AlertCircle, X } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login, isAuthenticated, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<UserRole>("admin");
  const [email, setEmail] = useState("admin@usmanspure.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const handleTabSwitch = (role: UserRole) => {
    setActiveTab(role);
    setErrorMsg("");
    if (role === "admin") {
      setEmail("admin@usmanspure.com");
      setPassword("admin123");
    } else if (role === "staff") {
      setEmail("staff@usmanspure.com");
      setPassword("staff123");
    } else {
      setEmail("customer@usmanspure.com");
      setPassword("customer123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      setLoading(false);
      return;
    }

    const res = await login(email, password, activeTab);
    setLoading(false);

    if (res.success) {
      setSuccessToast(`Welcome back! Accessing ${activeTab === "customer" ? "Store" : "Admin Panel"}...`);
      setTimeout(() => {
        if (activeTab === "admin" || activeTab === "staff") {
          router.push(redirectUrl.startsWith("/admin") ? redirectUrl : "/admin");
        } else {
          router.push(redirectUrl === "/admin" ? "/" : redirectUrl);
        }
      }, 700);
    } else {
      setErrorMsg(res.error || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-8 pb-32 px-4 sm:px-6 overflow-hidden bg-[#FAF6F0]">
      {/* 1. Atmospheric Luxury Organic Background Visuals */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Radial Ambient Lighting */}
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

        <motion.div
          animate={{ y: [10, -12, 10], rotate: [4, -4, 4] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-20 right-8 md:right-28 w-16 h-16 sm:w-20 sm:h-20 opacity-40 mix-blend-multiply"
        >
          <Image src="/images/hero/star-anise.png" alt="Star Anise" fill className="object-contain" />
        </motion.div>
      </div>

      {/* 2. Glassmorphic Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/75 border border-white/80 shadow-2xl rounded-3xl p-6 sm:p-9 text-stone-900"
      >
        {/* Close (X) Button */}
        <Link
          href="/"
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition z-50"
          aria-label="Close and return to Home"
          title="Return to Home"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105 mb-3">
            <div className="relative w-40 h-10">
              <Image src="/logo.png" alt="Usman's Pure Products" fill className="object-contain" priority />
            </div>
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-200/80 text-amber-950 text-[11px] font-bold tracking-wide">
            <ShieldCheck className="w-3 h-3 text-amber-700" />
            <span>Secure Access Portal</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-2.5">
            Sign In to Your Account
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Manage your store, track orders, or edit organic content
          </p>
        </div>

        {/* Portal Role Switcher Tabs */}
        <div className="flex p-1 bg-stone-200/60 rounded-2xl mb-5 border border-stone-300/50">
          <button
            type="button"
            onClick={() => handleTabSwitch("admin")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "admin"
                ? "bg-[#1C1613] text-white shadow-sm"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("customer")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "customer"
                ? "bg-[#1C1613] text-white shadow-sm"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Customer</span>
          </button>
        </div>

        {/* One-Click Quick Fill Pill */}
        <div className="mb-4 bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-950 font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Demo Mode: Pre-filled credentials</span>
          </div>
          <button
            type="button"
            onClick={() => handleTabSwitch(activeTab)}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-800 text-white hover:bg-amber-900 transition cursor-pointer"
          >
            Reset
          </button>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-amber-900/80 hover:underline cursor-pointer font-medium">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-stone-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 focus:ring-amber-900/40 border-stone-300"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#1C1613] hover:bg-black text-white transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In as {activeTab === "admin" ? "Admin" : activeTab === "staff" ? "Staff" : "Customer"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-stone-200/80 text-center text-xs text-stone-600">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/signup" className="font-bold text-amber-950 hover:underline">
            Create an Account &rarr;
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-[#FAF6F0] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
