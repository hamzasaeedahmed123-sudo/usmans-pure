"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  KeyRound,
  ShieldAlert,
} from "lucide-react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";
  const { refreshSession } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // Forced Initial Password Change Modal State
  const [showForceChangeModal, setShowForceChangeModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeError, setChangeError] = useState("");
  const [changeLoading, setChangeLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!username.trim()) {
      setErrorMsg("Please provide your administrator username.");
      setLoading(false);
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your administrator password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorMsg(data.error || "Authentication failed. Invalid administrator credentials.");
        return;
      }

      await refreshSession();

      if (data.mustChangePassword) {
        setLoading(false);
        setShowForceChangeModal(true);
        return;
      }

      setSuccessToast("Credentials verified. Initializing master admin dashboard...");
      setTimeout(() => {
        router.push(redirectUrl.startsWith("/admin") ? redirectUrl : "/admin");
      }, 600);
    } catch {
      setLoading(false);
      setErrorMsg("Network error communicating with authentication service. Please retry.");
    }
  };

  const handleForcePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError("");

    if (newPassword.length < 8) {
      setChangeError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeError("Passwords do not match. Please re-enter carefully.");
      return;
    }

    if (newPassword === password) {
      setChangeError("New password must be different from initial bootstrap password.");
      return;
    }

    setChangeLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: password,
          newPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setChangeLoading(false);
        setChangeError(data.error || "Failed to update password.");
        return;
      }

      await refreshSession();
      setChangeLoading(false);
      setShowForceChangeModal(false);
      setSuccessToast("Password successfully updated. Entering admin portal...");
      setTimeout(() => {
        router.push(redirectUrl.startsWith("/admin") ? redirectUrl : "/admin");
      }, 700);
    } catch {
      setChangeLoading(false);
      setChangeError("Network error. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center py-10 px-4 sm:px-6 overflow-hidden bg-[#120E0C] text-stone-100 selection:bg-amber-500 selection:text-white">
      {/* Exit Button to Storefront Home */}
      <Link
        href="/"
        className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 shadow-xl transition-all duration-200 z-50 flex items-center justify-center cursor-pointer group"
        aria-label="Exit Admin Portal to Storefront Home"
        title="Exit to Storefront Home"
      >
        <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
      </Link>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-700/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-emerald-900/15 blur-[120px] pointer-events-none" />

      {/* Success Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl border border-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-stone-950" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[420px] z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block relative group mb-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-900/30 p-2 border border-amber-500/30 shadow-2xl backdrop-blur-md flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Usman's Pure"
                width={80}
                height={80}
                className="object-contain filter drop-shadow-md"
                priority
              />
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cryptographic Admin Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Usman&apos;s Pure Admin
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Authorized Personnel &amp; Store Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                Administrator Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usmanspure1947"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-stone-950/60 border border-white/15 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                Administrator Password
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
                  className="w-full pl-10 pr-11 py-3 bg-stone-950/60 border border-white/15 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              &larr; Return to Storefront
            </Link>
            <span className="text-[11px] text-stone-500">Security Node: Active</span>
          </div>
        </div>
      </div>

      {/* Mandatory Initial Password Change Modal */}
      <AnimatePresence>
        {showForceChangeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-100"
            >
              <div className="flex items-center gap-3 mb-4 text-amber-400">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <ShieldAlert className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">First-Time Setup Required</h3>
                  <p className="text-xs text-stone-400">Bootstrap Credentials Security Policy</p>
                </div>
              </div>

              <p className="text-xs text-stone-300 mb-5 leading-relaxed">
                You have authenticated using the default initial credentials. For production security, you
                must establish a new permanent administrator password before accessing the store management dashboard.
              </p>

              {changeError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{changeError}</span>
                </div>
              )}

              <form onSubmit={handleForcePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    New Secure Password (min. 8 characters)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="Enter new administrator password"
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-white/20 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="Re-enter new administrator password"
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-white/20 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={changeLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 mt-2"
                >
                  {changeLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Saving New Credentials...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Set Permanent Password &amp; Continue</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#120E0C] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
