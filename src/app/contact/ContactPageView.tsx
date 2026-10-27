"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import {
  BotanicalWatermark,
  WheatStalkSvg,
  HerbalBranchSvg,
} from "@/components/BotanicalWatermark";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function ContactPageView() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    topic: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // WhatsApp direct integration
    const text = `Hi Usman's Pure,%0A%0AMy Name: ${encodeURIComponent(formData.name)}%0APhone: ${encodeURIComponent(
      formData.phone
    )}%0ACity: ${encodeURIComponent(formData.city)}%0ATopic: ${encodeURIComponent(
      formData.topic
    )}%0AMessage: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/923008472910?text=${text}`, "_blank");
  };

  const faqs = [
    {
      q: "How does Cash on Delivery (COD) work across Pakistan?",
      a: "You pay only when our courier arrives at your doorstep with your sealed Usman's Pure parcel. COD is available in all major cities and small towns nationwide.",
    },
    {
      q: "What is your standard delivery time?",
      a: "Orders in Lahore, Faisalabad, and Islamabad are typically delivered within 24–48 hours. Orders for Karachi and other cities arrive within 2–4 business days via express courier.",
    },
    {
      q: "How does the 14-Day Money Back Guarantee work?",
      a: "If you are not completely pleased with our stone-ground flour's texture or our herbal teas' freshness, simply contact our WhatsApp support team within 14 days for a replacement or full refund.",
    },
    {
      q: "How do I get a free customized diet consultation?",
      a: "Simply choose 'Customized Diet Plan' in the contact form or send a message directly to our WhatsApp number with your current health goals (Weight loss, diabetic control, digestive health).",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1510] flex flex-col justify-between relative overflow-hidden selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      {/* Organic Wheat & Botanical Leaves Watermarks */}
      <BotanicalWatermark
        type="wheat"
        className="absolute top-8 left-0 w-64 md:w-80 pointer-events-none opacity-20 -rotate-12 select-none"
        opacity={0.2}
        size={360}
      />
      <div className="absolute top-16 right-0 w-48 md:w-64 h-64 pointer-events-none opacity-15 rotate-12 select-none -z-0">
        <WheatStalkSvg className="text-[#8C6D46] w-full h-full" />
      </div>
      <BotanicalWatermark
        type="herbal"
        className="absolute bottom-12 right-0 w-72 md:w-96 pointer-events-none opacity-20 rotate-45 select-none"
        opacity={0.2}
        size={420}
      />
      <div className="absolute bottom-32 -left-8 w-56 md:w-72 h-72 pointer-events-none opacity-15 -rotate-45 select-none -z-0">
        <HerbalBranchSvg className="text-[#2D4A32] w-full h-full" />
      </div>

      <Header isSolid theme="amber" />

      <main className="flex-1 relative z-10">
        {/* Breadcrumb */}
        <div className="bg-[#FAF6F0] border-b border-[#EBE4D8]/80 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">Contact Us</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header — Clean, Open & Airy */}
        <div className="py-12 md:py-16 text-center max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-xs font-semibold tracking-widest text-[#8C6D46] uppercase mb-3 block">
            CUSTOMER SUPPORT &amp; NUTRITION DESK
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            We&apos;re Here to Help Your Family Live Pure
          </h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Have questions about our stone chakki milling, diabetic flour glycemic index, or need assistance with your order? Our team responds within minutes.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/95 rounded-2xl shadow-sm border border-[#EBE4D8] p-6 md:p-8 backdrop-blur-sm relative z-10">
                <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">Direct Channels</h3>

                <div className="space-y-6">
                  {/* WhatsApp Support */}
                  <a
                    href="https://wa.me/923008472910"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-sm bg-[#FAF7F2] border border-[#E5DACB] flex items-start gap-4 hover:bg-[#F3EDE2] transition group"
                  >
                    <div className="w-12 h-12 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                      <WhatsAppIcon className="w-12 h-12" variant="official" />
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-emerald-800">
                        Fastest Response
                      </div>
                      <div className="text-base font-bold text-stone-900 mt-0.5 group-hover:text-emerald-800">
                        WhatsApp Live Chat
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        Average reply time: under 5 minutes
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-2">
                    <div className="w-10 h-10 rounded-md bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500 uppercase">Customer Helpline</div>
                      <div className="text-sm font-bold text-stone-900 mt-0.5">+92 300 8472910</div>
                      <div className="text-xs text-stone-500">Toll-free / Regular call rates</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-2">
                    <div className="w-10 h-10 rounded-md bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500 uppercase">Email Support</div>
                      <div className="text-sm font-bold text-stone-900 mt-0.5">info@usmanzpure.com</div>
                      <div className="text-xs text-stone-500">Orders, receipts, &amp; lab reports</div>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-start gap-4 p-2">
                    <div className="w-10 h-10 rounded-md bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500 uppercase">Working Hours</div>
                      <div className="text-sm font-bold text-stone-900 mt-0.5">Monday – Saturday</div>
                      <div className="text-xs text-stone-500">9:00 AM – 8:00 PM PKT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outlet Badges */}
              <div className="bg-[#1E1510] text-white rounded-2xl p-6 md:p-8 border border-stone-800 shadow-sm relative z-10">
                <h4 className="text-base font-bold text-white mb-2">Our Physical Facilities</h4>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  We welcome customers and food safety auditors at our stone chakki units and testing laboratories in Lahore &amp; Faisalabad.
                </p>
                <div className="space-y-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E5B869] shrink-0" />
                    <span>Lahore: Customer Experience &amp; Urban Dispatch Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E5B869] shrink-0" />
                    <span>Faisalabad: Traditional Cold Stone-Milling &amp; Packing Suites</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white/95 rounded-2xl shadow-sm border border-[#EBE4D8] p-6 md:p-8 sm:p-10 backdrop-blur-sm relative z-10">
                <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-stone-500 mt-1 mb-8">
                  Fill in your details below and our team will get in touch directly via WhatsApp or phone.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-emerald-900">
                      Message Sent to WhatsApp!
                    </h4>
                    <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
                      Thank you for contacting Usman&apos;s Pure. Our nutritionist advisor will review your request and get back to you immediately.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-5 px-5 py-2.5 rounded-md bg-[#1E1510] text-[#F6F1E9] text-xs font-semibold hover:bg-[#8B3A22] transition uppercase tracking-[0.16em]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Tariq Mehmood"
                          className="w-full py-3 px-4 rounded-xl bg-[#FAF6F0]/60 border border-[#EBE4D8] text-base font-medium text-stone-900 focus:outline-hidden focus:border-[#8C6D46] focus:bg-white transition shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="w-full py-3 px-4 rounded-xl bg-[#FAF6F0]/60 border border-[#EBE4D8] text-base font-medium text-stone-900 focus:outline-hidden focus:border-[#8C6D46] focus:bg-white transition shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                          Your City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Lahore, Islamabad, Karachi"
                          className="w-full py-3 px-4 rounded-xl bg-[#FAF6F0]/60 border border-[#EBE4D8] text-base font-medium text-stone-900 focus:outline-hidden focus:border-[#8C6D46] focus:bg-white transition shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                          Inquiry Topic
                        </label>
                        <select
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full py-3 px-4 rounded-xl bg-[#FAF6F0]/60 border border-[#EBE4D8] text-base font-bold text-stone-800 focus:outline-hidden focus:border-[#8C6D46] focus:bg-white transition cursor-pointer shadow-2xs"
                        >
                          <option value="diet-plan">Customized Diet Plan Guidance</option>
                          <option value="order-tracking">Order Tracking &amp; Delivery</option>
                          <option value="diabetic-flour">Diabetic Flour Consultation</option>
                          <option value="weight-loss">Weight Loss Flour Query</option>
                          <option value="general">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                        Your Message / Health Goals
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about what you need assistance with..."
                        className="w-full py-3 px-4 rounded-xl bg-[#FAF6F0]/60 border border-[#EBE4D8] text-base font-medium text-stone-900 focus:outline-hidden focus:border-[#8C6D46] focus:bg-white transition resize-none leading-relaxed shadow-2xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md uppercase tracking-[0.16em]"
                    >
                      <Send className="w-4 h-4 text-[#E5B869]" />
                      <span>Send Message via WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-20 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-medium uppercase tracking-widest text-[#8C6D46]">
                GOT QUESTIONS?
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/95 border border-[#EBE4D8] shadow-sm backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#8C6D46] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{faq.q}</h4>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
