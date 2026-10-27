"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  X,
  Mail,
} from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [verifyingToken, setVerifyingToken] = useState(true);
  const [tokenInvalid, setTokenInvalid] = useState(false);
  const [tokenInvalidReason, setTokenInvalidReason] = useState("");

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      setTokenInvalid(true);
      setTokenInvalidReason("Missing password reset token in URL. Please use the complete link provided in your email.");
      setVerifyingToken(false);
      return;
    }

    async function checkToken() {
      try {
        const res = await fetch(`/api/admin/verify-reset-token?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok || !data.valid) {
          setTokenInvalid(true);
          setTokenInvalidReason(
            data.reason || "This password reset link is invalid, expired, or has already been used."
          );
        }
      } catch {
        // If network issue, allow them to attempt submission
      } finally {
        setVerifyingToken(false);
      }
    }

    checkToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!token) {
      setErrorMsg("Reset token is missing. Please use the link sent to your email.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters in length.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify both fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setErrorMsg(data.error || "Failed to reset password. The link may have expired.");
        return;
      }

      setLoading(false);
      setSuccessMsg(data.message || "Password successfully reset! Redirecting to login...");

      setTimeout(() => {
        router.push("/admin/login?reset=success");
      }, 2000);
    } catch {
      setLoading(false);
      setErrorMsg("Network error connecting to authentication service. Please retry.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center py-10 px-4 sm:px-6 overflow-hidden bg-[#120E0C] text-stone-100 selection:bg-amber-500 selection:text-white">
      {/* Return to Storefront */}
      <Link
        href="/"
        className="fixed sm:absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 shadow-xl transition-all duration-200 z-50 flex items-center justify-center cursor-pointer"
        aria-label="Exit to Storefront Home"
        title="Exit to Storefront Home"
      >
        <X className="w-5 h-5" />
      </Link>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-700/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-emerald-900/15 blur-[120px] pointer-events-none" />

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
            <span>Secure Password Reset</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Set New Admin Password
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Establish new cryptographic credentials for your store management account
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {verifyingToken ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-stone-400 font-medium">Validating cryptographic reset link...</p>
            </div>
          ) : tokenInvalid ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-white mb-2">Invalid or Expired Link</h2>
              <p className="text-xs text-stone-300 leading-relaxed mb-6">
                {tokenInvalidReason}
              </p>
              <div className="space-y-3">
                <Link
                  href="/admin/login"
                  className="block w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors text-center"
                >
                  Return to Admin Login
                </Link>
              </div>
            </div>
          ) : successMsg ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-base font-bold text-white mb-2">Password Reset Successful</h2>
              <p className="text-xs text-stone-300 leading-relaxed mb-6">
                {successMsg}
              </p>
              <Link
                href="/admin/login"
                className="block w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors text-center"
              >
                Sign In Now &rarr;
              </Link>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    New Password (min. 8 characters)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new administrator password"
                      required
                      minLength={8}
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

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new administrator password"
                      required
                      minLength={8}
                      className="w-full pl-10 pr-4 py-3 bg-stone-950/60 border border-white/15 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Updating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Update Password &amp; Continue</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <Link href="/admin/login" className="hover:text-amber-400 transition-colors">
                  &larr; Back to Admin Login
                </Link>
                <span className="text-[11px] text-stone-500">Security Node: Active</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#120E0C] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
