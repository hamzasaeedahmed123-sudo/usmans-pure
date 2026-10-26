"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wheat,
  BadgeCheck,
  Truck,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

export function StoreFooter() {
  return (
    <footer className="bg-[#1C1613] text-[#EDE4D8] border-t border-[#3A2D25] pt-0 pb-20 sm:pb-12">
      {/* Top Trust & Value Feature Strip */}
      <div className="border-b border-[#3A2D25] py-4 sm:py-5 bg-[#16110E]/80">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#3A2D25] text-center gap-y-3 sm:gap-y-0">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 px-2 sm:px-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2A1F17] border border-[#3D2B1F] text-[#E5D2BA] flex items-center justify-center shrink-0 shadow-2xs">
                <Wheat className="w-5 h-5 text-[#D8B486]" />
              </div>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  100% Khalis Chakki Atta
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  Freshly Stone-Ground
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 px-2 sm:px-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#142D1C] border border-[#1D4028] text-[#A3D2B7] flex items-center justify-center shrink-0 shadow-2xs">
                <BadgeCheck className="w-5 h-5 text-[#88C69F]" />
              </div>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  Zero Maida &amp; Zero Chemicals
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  100% Pure Grains
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 px-2 sm:px-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2A1F17] border border-[#3D2B1F] text-[#E5D2BA] flex items-center justify-center shrink-0 shadow-2xs">
                <Truck className="w-5 h-5 text-[#D8B486]" />
              </div>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  Cash on Delivery Available
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  Doorstep Delivery
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 px-2 sm:px-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#142D1C] border border-[#1D4028] text-[#A3D2B7] flex items-center justify-center shrink-0 shadow-2xs">
                <MessageCircle className="w-5 h-5 text-[#88C69F]" />
              </div>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  Direct WhatsApp Support
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  Fast Help &amp; Orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1 (Far Left - GET IN TOUCH - Prominent & Big) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#D8B486] mb-4">
                GET IN TOUCH
              </h4>

              <div className="space-y-4">
                {/* Phone / UAN - Large, bold and tap-to-call */}
                <div>
                  <a
                    href="tel:+923008472910"
                    className="flex items-center gap-3 text-lg sm:text-xl font-bold text-white hover:text-[#D8B486] transition-colors group"
                  >
                    <Phone className="w-6 h-6 text-[#D8B486] shrink-0 group-hover:scale-110 transition-transform" />
                    <span>+92 300 8472910</span>
                  </a>
                  <span className="text-xs text-[#A89887] ml-9 block mt-0.5">
                    Toll-Free UAN &amp; Order Helpline
                  </span>
                </div>

                {/* Email Address */}
                <div>
                  <a
                    href="mailto:info@usmanzpure.com"
                    className="flex items-center gap-3 text-base sm:text-lg font-semibold text-[#EDE4D8] hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[#D8B486] shrink-0" />
                    <span>info@usmanzpure.com</span>
                  </a>
                </div>

                {/* Physical Location */}
                <div className="flex items-start gap-3 text-sm sm:text-base font-medium text-[#D3C7B8]">
                  <MapPin className="w-5 h-5 text-[#D8B486] shrink-0 mt-0.5" />
                  <span>Lahore &amp; Faisalabad, Pakistan (Nationwide Doorstep Delivery)</span>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center gap-3 text-sm text-[#A89887]">
                  <Clock className="w-4 h-4 text-[#D8B486] shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href="https://wa.me/923008472910"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl font-bold text-sm bg-[#25D366] text-white flex items-center gap-2.5 shadow-md hover:bg-[#20ba59] hover:shadow-lg transition-all duration-200 w-fit mt-5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2 (Middle Left - Brand Story & About) */}
          <div className="lg:col-span-3">
            <div className="relative w-40 sm:w-48 h-10 sm:h-12 mb-3 flex items-center">
              <Image
                src="/logo.png"
                alt="Usman's Pure Products"
                width={160}
                height={45}
                loading="lazy"
                className="w-auto h-9 sm:h-10 object-contain object-left invert brightness-200"
              />
            </div>
            <h5 className="font-serif font-bold text-base text-white">
              Usman&apos;s Pure Products
            </h5>
            <p className="text-xs sm:text-sm text-[#C8BBAF] leading-relaxed max-w-sm mt-3">
              Reviving pure stone-ground culinary traditions across Pakistan. Fresh whole-grain chakki flours, raw botanical herbal teas, and cold stone-pounded masalas milled under 40°C with zero additives.
            </p>
            <p className="text-xs text-[#8C7D6F] mt-3">
              100% Khalis Chakki Atta &bull; Zero Maida &bull; Cash on Delivery Available
            </p>
          </div>

          {/* Column 3 (Middle Right - Shop Collections - Compact) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8B486] mb-3">
              SHOP
            </h4>
            <ul className="text-xs sm:text-sm text-[#B3A596] space-y-2">
              <li>
                <Link href="/products" className="hover:text-white transition-colors block">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/flour" className="hover:text-white transition-colors block">
                  Stone-Ground Flours
                </Link>
              </li>
              <li>
                <Link href="/spices" className="hover:text-white transition-colors block">
                  Pure Organic Spices
                </Link>
              </li>
              <li>
                <Link href="/herbals" className="hover:text-white transition-colors block">
                  Organic Herbal Teas
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-white transition-colors block">
                  Mega Bundles
                </Link>
              </li>
              <li>
                <Link href="/doctors-choice" className="hover:text-white transition-colors block">
                  Doctor&apos;s Choice
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 (Far Right - Customer Care - Compact) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8B486] mb-3">
              CUSTOMER CARE
            </h4>
            <ul className="text-xs sm:text-sm text-[#B3A596] space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors block">
                  14-Day Return Guarantee
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors block">
                  Verified Customer Reviews (500+)
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors block">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors block">
                  Cash on Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors block">
                  Lab Test Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block">
                  Contact Support Desk
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright Notice & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-[#3A2D25] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8C7D6F] text-center sm:text-left">
            © 2026 Usman&apos;s Pure Products. All rights reserved. Pure Food &bull; Real Nutrition.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-2.5">
            <span className="px-3 py-1.5 rounded-lg bg-[#251E1A] border border-[#3A2D25] text-xs font-semibold text-[#B3A596]">
              Cash on Delivery (COD)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#251E1A] border border-[#3A2D25] text-xs font-semibold text-[#B3A596]">
              Online Bank Transfer
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#251E1A] border border-[#3A2D25] text-xs font-semibold text-[#B3A596]">
              JazzCash / EasyPaisa
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default StoreFooter;
