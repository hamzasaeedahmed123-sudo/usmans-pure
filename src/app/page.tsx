import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSlider } from "@/components/home/HeroSlider";
import { FlagshipFeaturedProduct } from "@/components/home/FlagshipFeaturedProduct";
import { ProductVideoShowcase } from "@/components/home/ProductVideoShowcase";
import { TickerMarquee } from "@/components/TickerMarquee";
import { AmbientThemeWrapper } from "@/components/theme/AmbientThemeWrapper";

const ProductCatalog = dynamic(
  () => import("@/components/ProductCatalog").then((m) => m.ProductCatalog),
  { ssr: true }
);
const CustomerReviews = dynamic(
  () => import("@/components/CustomerReviews").then((m) => m.CustomerReviews),
  { ssr: true }
);
const DoctorsChoiceBanner = dynamic(
  () => import("@/components/DoctorsChoiceBanner").then((m) => m.DoctorsChoiceBanner),
  { ssr: true }
);
const MegaBundles = dynamic(
  () => import("@/components/MegaBundles").then((m) => m.MegaBundles),
  { ssr: true }
);
const DietConsultationBanner = dynamic(
  () => import("@/components/DietConsultationBanner").then((m) => m.DietConsultationBanner),
  { ssr: true }
);
const NewsletterSection = dynamic(
  () => import("@/components/NewsletterSection").then((m) => m.NewsletterSection),
  { ssr: true }
);
const StoreFooter = dynamic(
  () => import("@/components/StoreFooter").then((m) => m.StoreFooter),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Usman's Pure | FRESHLY MILLED CHAKKI Atta Online Pakistan",
  description:
    "Buy FRESHLY MILLED CHAKKI atta online in Pakistan. Zero maida, 100% whole wheat flour, diabetic-care & multigrain flour. Doorstep Cash on Delivery.",
  keywords: [
    "atta",
    "chakki atta",
    "pure atta",
    "whole wheat flour pakistan",
    "chakki atta price in pakistan",
    "buy atta online lahore",
    "pure chakki atta karachi",
    "diabetic atta pakistan",
    "multigrain flour",
    "gandum ka atta",
    "FRESHLY MILLED flour",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Usman's Pure | FRESHLY MILLED CHAKKI Atta Online Pakistan",
    description:
      "Buy FRESHLY MILLED CHAKKI atta online in Pakistan. Zero maida, 100% whole wheat flour, diabetic-care & multigrain flour. Doorstep Cash on Delivery.",
    url: "https://usmanspure.com",
    type: "website",
    images: [
      {
        url: "/images/products/multigrain-flagship-family.jpg",
        width: 1024,
        height: 824,
        alt: "Usman's Pure Products - FRESHLY MILLED CHAKKI Atta Online Pakistan",
      },
      {
        url: "/logo.png",
        width: 1024,
        height: 292,
        alt: "Usman's Pure Products",
      },
    ],
  },
};

export default function Home() {
  return (
    <AmbientThemeWrapper className="min-h-screen bg-white selection:bg-amber-500/20 selection:text-amber-900">
      {/* Primary Semantic H1 for Search Engine Dominance */}
      <h1 className="sr-only">FRESHLY MILLED CHAKKI Atta &amp; Organics in Pakistan</h1>

      {/* 1. Hero Section Slider - Untouched */}
      <HeroSlider />

      {/* 2. Flagship Featured Product (Solid Pure White Background, No Watermarks) */}
      <FlagshipFeaturedProduct />

      {/* 3. Featured Products Storefront (Pure White Canvas, Borderless Minimalist Grid) */}
      <ProductCatalog />

      {/* 4. Curated Mega Bundles Section (Pure White Canvas, Borderless Minimalist Grid) */}
      <div className="content-visibility-auto">
        <MegaBundles />
      </div>

      {/* 5. Customer Voices & Testimonials */}
      <div className="content-visibility-auto">
        <CustomerReviews />
      </div>

      {/* 6. Middle/Footer Green Section: Animated Wavy Liquid Divider & Scrolling Marquee Buttons */}
      <div className="content-visibility-auto">
        <DoctorsChoiceBanner />
      </div>

      {/* 7. Full-Width Video Showcase (Asli Qudrati Purity & Milling in Action) */}
      <div className="content-visibility-auto">
        <ProductVideoShowcase />
      </div>

      {/* 8. Personalized Diet Plan & Health Guidance Banner (Green with Animated Wavy Liquid Divider) */}
      <div className="content-visibility-auto">
        <DietConsultationBanner />
      </div>

      {/* 9. Scrolling Marquee Ticker */}
      <TickerMarquee />

      {/* 10. Email Newsletter Subscription */}
      <div className="content-visibility-auto">
        <NewsletterSection />
      </div>

      {/* 11. E-Commerce Footer */}
      <div className="content-visibility-footer">
        <StoreFooter />
      </div>
    </AmbientThemeWrapper>
  );
}
