import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HeroFeatureShowcase } from "@/components/home/HeroFeatureShowcase";
import { FlagshipFeaturedProduct } from "@/components/home/FlagshipFeaturedProduct";
import { TickerMarquee } from "@/components/TickerMarquee";
import { CategoryCollections } from "@/components/CategoryCollections";
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
  title: "Usman's Pure | 100% pure & freshly milled Chakki Atta Online Pakistan",
  description:
    "Buy 100% pure & freshly milled chakki atta online in Pakistan. Zero maida, 100% whole wheat flour, diabetic-care & multigrain flour. Doorstep Cash on Delivery.",
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
    "100% PURE & FRESHLY MILLED flour",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Usman's Pure | 100% pure & freshly milled Chakki Atta Online Pakistan",
    description:
      "Buy 100% pure & freshly milled chakki atta online in Pakistan. Zero maida, 100% whole wheat flour, diabetic-care & multigrain flour. Doorstep Cash on Delivery.",
    url: "https://usmanspure.com",
    type: "website",
    images: [
      {
        url: "/images/products/multigrain-flagship-family.jpg",
        width: 1024,
        height: 824,
        alt: "Usman's Pure Products - 100% pure & freshly milled Chakki Atta Online Pakistan",
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
    <AmbientThemeWrapper className="min-h-screen selection:bg-amber-500/20 selection:text-amber-900">
      {/* Primary Semantic H1 for Search Engine Dominance */}
      <h1 className="sr-only">100% pure & freshly milled Chakki Atta &amp; Organics in Pakistan</h1>

      {/* 1. Hero Section Slider */}
      <HeroSlider />

      {/* 1.1 Seamless Borderless Feature Showcase */}
      <HeroFeatureShowcase />

      {/* 2. Flagship Featured Product (Multigrain Diet & Diabetic Care Flour) */}
      <FlagshipFeaturedProduct />

      {/* 3. Scrolling Marquee Ticker */}
      <TickerMarquee />

      {/* 4. Category Collections ("Our Collections") */}
      <CategoryCollections />

      {/* 5. Featured Products (freshly milled Whole Wheat Flour & Multi-Grain Blends) */}
      <ProductCatalog />

      {/* 6. Customer Voices & Testimonials (Repositioned Higher on Homepage) */}
      <div className="content-visibility-auto">
        <CustomerReviews />
      </div>

      {/* 7. Dietary Care / Whole Grains Editorial CTA Banner */}
      <div className="content-visibility-auto">
        <DoctorsChoiceBanner />
      </div>

      {/* 8. Curated Mega Bundles Section */}
      <div className="content-visibility-auto">
        <MegaBundles />
      </div>

      {/* 9. Personalized Diet Plan & Health Guidance Banner */}
      <div className="content-visibility-auto">
        <DietConsultationBanner />
      </div>

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
