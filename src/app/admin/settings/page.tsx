"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useStoreData, StoreSettings, PaymentCredentials } from "@/context/StoreDataContext";
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
  Building,
  Smartphone,
  HelpCircle,
  FileText,
  Zap,
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
  bankTransferEnabled: boolean;
  bankName: string;
  bankAccountTitle: string;
  bankIban: string;
  raastId: string;
  jazzCashNumber: string;
  jazzCashTitle: string;
  easyPaisaNumber: string;
  easyPaisaTitle: string;
  paymentInstructions: string;
}

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const { storeSettings, updateStoreSettings } = useStoreData();

  const getFormDataFromSettings = useCallback(
    (): SettingsFormData => ({
      storeName: storeSettings.storeName,
      storePhone: storeSettings.storePhone,
      storeEmail: storeSettings.storeEmail,
      storeAddress: storeSettings.storeAddress,
      freeShippingThreshold: storeSettings.freeShippingThreshold,
      standardDeliveryFee: storeSettings.standardDeliveryFee,
      codEnabled: storeSettings.codEnabled,
      jazzCashEnabled: storeSettings.jazzCashEnabled,
      easyPaisaEnabled: storeSettings.easyPaisaEnabled,
      bankTransferEnabled: storeSettings.bankTransferEnabled ?? true,
      bankName: storeSettings.paymentCredentials?.bankName || "Meezan Bank Ltd",
      bankAccountTitle: storeSettings.paymentCredentials?.bankAccountTitle || "Usman's Pure Products",
      bankIban: storeSettings.paymentCredentials?.bankIban || "PK36MEZN0001098472910101",
      raastId: storeSettings.paymentCredentials?.raastId || "0300-8472910",
      jazzCashNumber: storeSettings.paymentCredentials?.jazzCashNumber || "0300-8472910",
      jazzCashTitle: storeSettings.paymentCredentials?.jazzCashTitle || "Usman's Pure Products",
      easyPaisaNumber: storeSettings.paymentCredentials?.easyPaisaNumber || "0345-1234567",
      easyPaisaTitle: storeSettings.paymentCredentials?.easyPaisaTitle || "Usman's Pure Products",
      paymentInstructions:
        storeSettings.paymentCredentials?.paymentInstructions ||
        "Please transfer the total order amount using Raast, Online Banking, or Mobile Wallet. Enter your Transaction ID (TID) or sender account title below for instant automated verification.",
    }),
    [storeSettings]
  );

  const [formData, setFormData] = useState<SettingsFormData>(getFormDataFromSettings);
  const [past, setPast] = useState<SettingsFormData[]>([]);
  const [future, setFuture] = useState<SettingsFormData[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  // Sync state if storeSettings updates from storage
  useEffect(() => {
    setFormData(getFormDataFromSettings());
  }, [getFormDataFromSettings]);

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
      const defaults: SettingsFormData = {
        storeName: "Usman's Pure Products",
        storePhone: "+92 300 8472910",
        storeEmail: "support@usmanspure.com",
        storeAddress: "Milling Facility, G.T. Road, Lahore, Punjab, Pakistan",
        freeShippingThreshold: 2000,
        standardDeliveryFee: 250,
        codEnabled: true,
        jazzCashEnabled: true,
        easyPaisaEnabled: true,
        bankTransferEnabled: true,
        bankName: "Meezan Bank Ltd",
        bankAccountTitle: "Usman's Pure Products",
        bankIban: "PK36MEZN0001098472910101",
        raastId: "0300-8472910",
        jazzCashNumber: "0300-8472910",
        jazzCashTitle: "Usman's Pure Products",
        easyPaisaNumber: "0345-1234567",
        easyPaisaTitle: "Usman's Pure Products",
        paymentInstructions:
          "Please transfer the total order amount using Raast, Online Banking, or Mobile Wallet. Enter your Transaction ID (TID) or sender account title below for instant automated verification.",
      };
      setFormData(defaults);
      showToast("Settings reset to defaults.");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateStoreSettings({
      storeName: formData.storeName,
      storePhone: formData.storePhone,
      storeEmail: formData.storeEmail,
      storeAddress: formData.storeAddress,
      freeShippingThreshold: Number(formData.freeShippingThreshold),
      standardDeliveryFee: Number(formData.standardDeliveryFee),
      codEnabled: formData.codEnabled,
      jazzCashEnabled: formData.jazzCashEnabled,
      easyPaisaEnabled: formData.easyPaisaEnabled,
      bankTransferEnabled: formData.bankTransferEnabled,
      paymentCredentials: {
        bankName: formData.bankName.trim(),
        bankAccountTitle: formData.bankAccountTitle.trim(),
        bankIban: formData.bankIban.trim(),
        raastId: formData.raastId.trim(),
        jazzCashNumber: formData.jazzCashNumber.trim(),
        jazzCashTitle: formData.jazzCashTitle.trim(),
        easyPaisaNumber: formData.easyPaisaNumber.trim(),
        easyPaisaTitle: formData.easyPaisaTitle.trim(),
        paymentInstructions: formData.paymentInstructions.trim(),
      },
    });

    showToast("Operational & Payment Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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
            Store contact info, shipping rules, editable payment account credentials, and staff security controls.
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

        {/* 3. Accepted Payment Gateways & Editable Accounts (Requirement 1) */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <CreditCard className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Accepted Payment Gateways &amp; Account Credentials
              </h2>
              <p className="text-xs text-stone-500">
                Toggle active payment channels and edit bank / wallet account details shown to customers at checkout
              </p>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Cash on Delivery</p>
                <p className="text-[10px] text-stone-500">Doorstep COD</p>
              </div>
              <input
                type="checkbox"
                checked={formData.codEnabled}
                onChange={(e) => updateField("codEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Online Bank / Raast</p>
                <p className="text-[10px] text-stone-500">Direct IBAN &amp; Raast</p>
              </div>
              <input
                type="checkbox"
                checked={formData.bankTransferEnabled}
                onChange={(e) => updateField("bankTransferEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">JazzCash Digital</p>
                <p className="text-[10px] text-stone-500">Mobile Wallet</p>
              </div>
              <input
                type="checkbox"
                checked={formData.jazzCashEnabled}
                onChange={(e) => updateField("jazzCashEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Easypaisa Wallet</p>
                <p className="text-[10px] text-stone-500">Mobile Wallet</p>
              </div>
              <input
                type="checkbox"
                checked={formData.easyPaisaEnabled}
                onChange={(e) => updateField("easyPaisaEnabled", e.target.checked)}
                className="w-4 h-4 rounded text-amber-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Dedicated Configuration Fields Underneath Toggles */}
          <div className="pt-2 space-y-5">
            {/* 3A. Bank Transfer Settings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2.5">
                <Building className="w-4 h-4 text-amber-900" />
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-950">
                  Bank Transfer Account Credentials
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => updateField("bankName", e.target.value)}
                    placeholder="e.g. Meezan Bank Ltd / Bank Alfalah"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-amber-900/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Account Title
                  </label>
                  <input
                    type="text"
                    value={formData.bankAccountTitle}
                    onChange={(e) => updateField("bankAccountTitle", e.target.value)}
                    placeholder="e.g. Usman's Pure Products"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-amber-900/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Account Number / IBAN
                  </label>
                  <input
                    type="text"
                    value={formData.bankIban}
                    onChange={(e) => updateField("bankIban", e.target.value)}
                    placeholder="e.g. PK36MEZN0001098472910101"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-mono font-bold text-stone-900 focus:ring-2 focus:ring-amber-900/40"
                  />
                </div>
              </div>
            </div>

            {/* 3B. Mobile Wallets & Raast Settings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                <Smartphone className="w-4 h-4 text-emerald-800" />
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
                  Mobile Wallets &amp; Raast Instant Pay Settings
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Raast */}
                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Raast Instant ID</span>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-medium mb-0.5">
                      Registered Mobile Number
                    </label>
                    <input
                      type="text"
                      value={formData.raastId}
                      onChange={(e) => updateField("raastId", e.target.value)}
                      placeholder="e.g. 0300-8472910"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-900"
                    />
                  </div>
                </div>

                {/* JazzCash */}
                <div className="p-3 rounded-xl bg-white border border-red-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>JazzCash Details</span>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-medium mb-0.5">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={formData.jazzCashNumber}
                      onChange={(e) => updateField("jazzCashNumber", e.target.value)}
                      placeholder="0300-8472910"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-900 mb-1.5"
                    />
                    <label className="block text-[10px] text-stone-500 font-medium mb-0.5">
                      Account Title
                    </label>
                    <input
                      type="text"
                      value={formData.jazzCashTitle}
                      onChange={(e) => updateField("jazzCashTitle", e.target.value)}
                      placeholder="Usman's Pure Products"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-bold text-stone-900"
                    />
                  </div>
                </div>

                {/* Easypaisa */}
                <div className="p-3 rounded-xl bg-white border border-emerald-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Easypaisa Details</span>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-medium mb-0.5">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={formData.easyPaisaNumber}
                      onChange={(e) => updateField("easyPaisaNumber", e.target.value)}
                      placeholder="0345-1234567"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-900 mb-1.5"
                    />
                    <label className="block text-[10px] text-stone-500 font-medium mb-0.5">
                      Account Title
                    </label>
                    <input
                      type="text"
                      value={formData.easyPaisaTitle}
                      onChange={(e) => updateField("easyPaisaTitle", e.target.value)}
                      placeholder="Usman's Pure Products"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-bold text-stone-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3C. Payment Instructions Notice */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="block text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-800" />
                <span>Customer Checkout Payment Instructions Notice</span>
              </label>
              <textarea
                rows={2}
                value={formData.paymentInstructions}
                onChange={(e) => updateField("paymentInstructions", e.target.value)}
                placeholder="Transfer total amount and share screenshot or Transaction ID..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-900 text-xs leading-relaxed focus:ring-2 focus:ring-amber-900/40"
              />
              <p className="text-[11px] text-stone-500">
                This notice is shown prominently to customers on the checkout page when choosing online transfer.
              </p>
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
