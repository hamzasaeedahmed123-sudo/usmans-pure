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
} from "lucide-react";

export function StoreFooter() {
  return (
    <footer className="bg-[#1C1613] text-[#EDE4D8] border-t border-[#3A2D25] pt-0 pb-20 sm:pb-12">
      {/* Top Trust & Value Feature Strip */}
      <div className="border-b border-[#3A2D25] py-4 sm:py-5 bg-[#16110E]/80">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#3A2D25] text-center gap-y-3 sm:gap-y-0">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 px-2 sm:px-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#8C6D46] to-[#4A321E] text-[#FAF5EC] flex flex-col items-center justify-center shadow-xs border border-[#C5A059]/40 shrink-0">
                <span className="text-[12px] font-black leading-none font-serif">100%</span>
                <span className="text-[7px] font-bold uppercase tracking-tighter text-[#E5D2BA] mt-0.5">CHAKKI</span>
              </div>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  100% Khalis Chakki Atta
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  Freshly Stone-Ground Daily
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 px-2 sm:px-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#1E5D38] to-[#0E381C] text-[#D4F0DF] flex flex-col items-center justify-center shadow-xs border border-[#48A36C]/40 shrink-0">
                <span className="text-[12px] font-black leading-none font-serif">0%</span>
                <span className="text-[7px] font-bold uppercase tracking-tighter text-[#A3D2B7] mt-0.5">MAIDA</span>
              </div>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  Zero Maida &amp; 0% Bleach
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  100% Whole Grains Bran Intact
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 px-2 sm:px-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#2D241E] to-[#18110D] text-[#E5D2BA] flex flex-col items-center justify-center shadow-xs border border-[#8C6D46]/40 shrink-0">
                <span className="text-[11px] font-black leading-none font-sans tracking-tight">COD</span>
                <span className="text-[7px] font-bold uppercase tracking-tighter text-[#C2A37E] mt-0.5">PAKISTAN</span>
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

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 px-2 sm:px-4">
              <a
                href="https://wa.me/923008472910"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xs shrink-0 transition-transform active:scale-95 cursor-pointer"
                aria-label="Direct WhatsApp Ordering"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41c-1.42 0-2.8-.37-4.03-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.25-4.49c0-4.54 3.7-8.24 8.24-8.24zm4.84 11.64c-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.59.13-.18.26-.68.85-.83 1.03-.15.18-.31.2-.57.07-.26-.13-1.1-.41-2.09-1.3-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.59-1.43-.81-1.96-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.3 1.02 2.55 1.16 2.74.15.18 2 3.05 4.84 4.28.68.29 1.21.46 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31z" />
                </svg>
              </a>
              <div className="text-center sm:text-left">
                <h5 className="font-bold text-white text-xs sm:text-sm leading-tight tracking-tight">
                  Direct WhatsApp Support
                </h5>
                <p className="text-[11px] sm:text-xs text-[#A89887] mt-0.5 leading-tight">
                  +92 300 8472910
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
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 01-5.82 2.41c-1.42 0-2.8-.37-4.03-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 01-1.25-4.49c0-4.54 3.7-8.24 8.24-8.24zm4.84 11.64c-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.59.13-.18.26-.68.85-.83 1.03-.15.18-.31.2-.57.07-.26-.13-1.1-.41-2.09-1.3-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.18-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.59-1.43-.81-1.96-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.3 1.02 2.55 1.16 2.74.15.18 2 3.05 4.84 4.28.68.29 1.21.46 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.18-.5-.31z" />
                </svg>
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
