"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Save,
  CheckCircle2,
  Store,
  Truck,
  CreditCard,
  ShieldCheck,
  RotateCcw,
  Eye,
  Undo2,
  Redo2,
} from "lucide-react";

interface SettingsFormData {
  storeName: string;
  storePhone: string;
  storeEmail: string;
  storeAddress: string;
  freeShippingThreshold: number;
  standardDeliveryFee: number;
  codEnabled: boolean;
  jazzCashEnabled: boolean;
  easyPaisaEnabled: boolean;
}

const DEFAULT_SETTINGS: SettingsFormData = {
  storeName: "Usman's Pure Products",
  storePhone: "+92 300 8472910",
  storeEmail: "support@usmanspure.com",
  storeAddress: "Milling Facility, G.T. Road, Lahore, Punjab, Pakistan",
  freeShippingThreshold: 2000,
  standardDeliveryFee: 250,
  codEnabled: true,
  jazzCashEnabled: true,
  easyPaisaEnabled: true,
};

export default function AdminSettingsPage() {
  const { user } = useAuth();

  const [formData, setFormData] = useState<SettingsFormData>(DEFAULT_SETTINGS);
  const [past, setPast] = useState<SettingsFormData[]>([]);
  const [future, setFuture] = useState<SettingsFormData[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const updateField = <K extends keyof SettingsFormData>(key: K, value: SettingsFormData[K]) => {
    setPast((prev) => [...prev.slice(-40), formData]);
    setFuture([]);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUndo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setFuture((prev) => [formData, ...prev]);
    setFormData(previous);
    setPast(newPast);
    showToast("Undo applied");
  }, [past, formData]);

  const handleRedo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast((prev) => [...prev, formData]);
    setFormData(next);
    setFuture(newFuture);
    showToast("Redo applied");
  }, [future, formData]);

  // Global Ctrl+Z / Ctrl+Y shortcuts for Undo / Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleReset = () => {
    if (confirm("Reset operational settings to system defaults?")) {
      setPast((prev) => [...prev, formData]);
      setFuture([]);
      setFormData(DEFAULT_SETTINGS);
      showToast("Settings reset to defaults.");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1C1613] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Undo, Redo, Reset & Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Store Configuration &amp; Operational Settings
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Store contact info, shipping fee rules, payment integrations, and staff security controls.
          </p>
        </div>

        {/* Action Controls: Undo, Redo, Reset, Preview */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Undo Button */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={past.length === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              past.length > 0
                ? "bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer shadow-2xs"
                : "bg-stone-100/50 text-stone-400 cursor-not-allowed opacity-50"
            }`}
            title="Undo last change (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
            <span className="text-[10px] opacity-60 hidden md:inline font-mono">⌘Z</span>
          </button>

          {/* Redo Button */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={future.length === 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
              future.length > 0
                ? "bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer shadow-2xs"
                : "bg-stone-100/50 text-stone-400 cursor-not-allowed opacity-50"
            }`}
            title="Redo change (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
            <span>Redo</span>
            <span className="text-[10px] opacity-60 hidden md:inline font-mono">⌘Y</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Preview Live */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live</span>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Store Identity */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Store className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Store Identity &amp; Customer Support
              </h2>
              <p className="text-xs text-stone-500">Contact information displayed on customer invoices and website footer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Store Business Name
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => updateField("storeName", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                WhatsApp / Support Helpline
              </label>
              <input
                type="text"
                value={formData.storePhone}
                onChange={(e) => updateField("storePhone", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Official Support Email
              </label>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) => updateField("storeEmail", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Facility Dispatch Address
              </label>
              <input
                type="text"
                value={formData.storeAddress}
                onChange={(e) => updateField("storeAddress", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
            </div>
          </div>
        </div>

        {/* 2. Shipping & Delivery Rules */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Truck className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Shipping &amp; Delivery Rules
              </h2>
              <p className="text-xs text-stone-500">Nationwide courier calculation and free shipping threshold</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Free Shipping Threshold (₨)
              </label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={(e) => updateField("freeShippingThreshold", Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
              <p className="text-[11px] text-stone-500 mt-1">Orders above this amount qualify for zero delivery fee</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Standard Shipping Fee (₨)
              </label>
              <input
                type="number"
                value={formData.standardDeliveryFee}
                onChange={(e) => updateField("standardDeliveryFee", Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold focus:ring-2 focus:ring-amber-900/40"
              />
              <p className="text-[11px] text-stone-500 mt-1">Applied on orders below the free shipping threshold</p>
            </div>
          </div>
        </div>

        {/* 3. Payment Methods */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <CreditCard className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Accepted Payment Gateways
              </h2>
              <p className="text-xs text-stone-500">Toggle active payment channels at checkout</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</p>
                <p className="text-[11px] text-stone-500">Pay courier on doorstep</p>
              </div>
              <input
                type="checkbox"
                checked={formData.codEnabled}
                onChange={(e) => updateField("codEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">JazzCash Digital</p>
                <p className="text-[11px] text-stone-500">Direct mobile wallet</p>
              </div>
              <input
                type="checkbox"
                checked={formData.jazzCashEnabled}
                onChange={(e) => updateField("jazzCashEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Easypaisa Wallet</p>
                <p className="text-[11px] text-stone-500">QR &amp; direct account</p>
              </div>
              <input
                type="checkbox"
                checked={formData.easyPaisaEnabled}
                onChange={(e) => updateField("easyPaisaEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 4. Active Admin Account */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Current Authenticated Administrator
              </h2>
              <p className="text-xs text-stone-500">Security credentials &amp; role privileges</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="w-10 h-10 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">{user?.name}</p>
              <p className="text-[11px] text-stone-500">{user?.email} • Role: {user?.role}</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold shadow-md transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Operational Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
