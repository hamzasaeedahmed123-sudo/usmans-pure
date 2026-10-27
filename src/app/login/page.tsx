"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, CheckCircle2, AlertCircle, X } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      setLoading(false);
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password.");
      setLoading(false);
      return;
    }

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      setSuccessToast("Welcome back! Signing you in...");
      setTimeout(() => {
        router.push(redirectUrl === "/admin" ? "/" : redirectUrl);
      }, 700);
    } else {
      setErrorMsg(res.error || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 overflow-hidden bg-[#FAF6F0]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#E5D2BA]/70 blur-3xl opacity-80" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#A3D2B7]/50 blur-3xl opacity-70" />
      </div>

      {/* Exit Button to Storefront */}
      <Link
        href="/"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-stone-700 hover:text-stone-900 bg-white/80 hover:bg-white active:scale-95 backdrop-blur-md border border-stone-200/80 shadow-md transition-all duration-200 z-50 flex items-center justify-center cursor-pointer group"
        aria-label="Return to Storefront"
        title="Return to Storefront"
      >
        <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
      </Link>

      {/* Success Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[420px] z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block relative group mb-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-white p-2 border border-stone-200/80 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
              <Image
                src="/images/logo.png"
                alt="Usman's Pure"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Verified Customer Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            Welcome Back
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Sign in to track orders, manage deliveries, and view purchase history.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Account...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col items-center gap-2.5 text-xs text-stone-600">
            <div>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-amber-900 hover:underline">
                Create Account
              </Link>
            </div>
            <div className="text-[11px] text-stone-400">
              Store Administrator?{" "}
              <Link href="/admin/login" className="text-stone-700 font-medium hover:text-amber-900 underline">
                Administrator Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-900 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
