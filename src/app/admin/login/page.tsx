"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  KeyRound,
  Sparkles,
  Server,
  Layers,
} from "lucide-react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("admin@usmanspure.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setErrorMsg("");
    if (selectedRole === "admin") {
      setEmail("admin@usmanspure.com");
      setPassword("admin123");
    } else {
      setEmail("staff@usmanspure.com");
      setPassword("staff123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!email.trim()) {
      setErrorMsg("Please provide your admin email address.");
      setLoading(false);
      return;
    }

    const res = await login(email, password, role);
    setLoading(false);

    if (res.success) {
      setSuccessToast("Credentials verified. Initializing master admin dashboard...");
      setTimeout(() => {
        router.push(redirectUrl.startsWith("/admin") ? redirectUrl : "/admin");
      }, 600);
    } else {
      setErrorMsg(res.error || "Authentication failed. Invalid admin credentials.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center py-10 px-4 sm:px-6 overflow-hidden bg-[#120E0C] text-stone-100 selection:bg-amber-500 selection:text-white">
      {/* 1. Prominent Cross / Exit Button (Mobile & Desktop) */}
      <Link
        href="/"
        className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 shadow-xl transition-all duration-200 z-50 flex items-center justify-center cursor-pointer group"
        aria-label="Exit Admin Portal to Storefront Home"
        title="Exit to Storefront Home"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
        <span className="sr-only">Exit to Storefront</span>
      </Link>

      {/* 2. Executive Background Atmospheric Lighting & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle radial ambient gradients */}
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-amber-600/15 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-emerald-700/15 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-amber-900/10 blur-[150px]" />

        {/* Subtle geometric dot matrix overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#FAF5EC 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* 3. Executive-Grade Centered Authentication Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg backdrop-blur-2xl bg-[#1C1613]/92 border border-stone-800/90 shadow-2xl rounded-3xl p-6 sm:p-10 text-stone-100"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <Link
            href="/"
            className="inline-block transition-transform hover:scale-105 mb-3 group focus:outline-none"
            title="Return to Storefront"
          >
            <div className="relative w-44 sm:w-48 h-10 sm:h-11 brightness-110 drop-shadow-md">
              <Image
                src="/logo.png"
                alt="Usman's Pure Products"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Security Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold tracking-wide mt-1 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Usman&apos;s Pure - Master Admin Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-stone-100 tracking-tight mt-3">
            Admin Access Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1.5 max-w-sm">
            Zero-code content management, product catalog control, and store operations.
          </p>
        </div>

        {/* Quick Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#140F0D] rounded-2xl mb-6 border border-stone-800/80">
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              role === "admin"
                ? "bg-amber-600 text-white shadow-md shadow-amber-900/40"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/40"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect("staff")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              role === "staff"
                ? "bg-amber-600 text-white shadow-md shadow-amber-900/40"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/40"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Operations Staff</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Toast */}
        {successToast && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@usmanspure.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140F0D] border border-stone-800 text-stone-100 text-sm font-medium placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                Master Password
              </label>
              <span className="text-[11px] text-amber-500/90 font-medium">
                Demo key: admin123
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#140F0D] border border-stone-800 text-stone-100 text-sm font-medium placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember terminal & session info */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-stone-700 bg-[#140F0D] text-amber-600 focus:ring-amber-500/30 accent-amber-600"
              />
              <span>Remember this terminal</span>
            </label>

            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-amber-400 transition"
            >
              Exit to Storefront &rarr;
            </Link>
          </div>

          {/* Active "Access Dashboard" Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-[0.99] disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Security Details */}
        <div className="mt-8 pt-5 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-stone-600" />
            <span>Next.js Turbopack Edge Session</span>
          </div>
          <span>256-Bit SSL Encrypted</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#120E0C] flex flex-col items-center justify-center p-4 text-stone-300">
          <div className="w-10 h-10 border-3 border-amber-600/30 border-t-amber-600 rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold tracking-wider uppercase text-stone-400">
            Loading Admin Access Portal...
          </p>
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
