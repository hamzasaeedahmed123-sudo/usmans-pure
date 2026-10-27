import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSlider } from "@/components/home/HeroSlider";
import { FlagshipFeaturedProduct } from "@/components/home/FlagshipFeaturedProduct";
import { TickerMarquee } from "@/components/TickerMarquee";
import { CategoryCollections } from "@/components/CategoryCollections";
import { ProductCatalog } from "@/components/ProductCatalog";
import { DoctorsChoiceBanner } from "@/components/DoctorsChoiceBanner";
import { DietConsultationBanner } from "@/components/DietConsultationBanner";
import { TrustGuarantee } from "@/components/TrustGuarantee";
import { StoreFooter } from "@/components/StoreFooter";
import { AmbientThemeWrapper } from "@/components/theme/AmbientThemeWrapper";

import { CustomerReviews } from "@/components/CustomerReviews";
import { MegaBundles } from "@/components/MegaBundles";
import { NewsletterSection } from "@/components/NewsletterSection";

export const metadata: Metadata = {
  title: "Usman's Pure | 90% Pure Chakki Atta Online Pakistan (Fresh Stone-Ground)",
  description:
    "Buy fresh 90% pure stone-ground chakki atta online in Pakistan. Zero maida, 90% whole wheat flour, diabetic atta & multigrain flour. Doorstep Cash on Delivery.",
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
    "stone ground flour",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Usman's Pure | 90% Pure Chakki Atta Online Pakistan (Fresh Stone-Ground)",
    description:
      "Buy fresh 90% pure stone-ground chakki atta online in Pakistan. Zero maida, 90% whole wheat flour, diabetic atta & multigrain flour. Doorstep Cash on Delivery.",
    url: "https://usmanspure.com",
    type: "website",
    images: [
      {
        url: "/images/products/multigrain-flagship-family.jpg",
        width: 1024,
        height: 824,
        alt: "Usman's Pure Products - 90% Pure Stone-Ground Chakki Atta Online Pakistan",
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
      {/* Primary Semantic H1 for Googlebot Search Dominance */}
      <h1 className="sr-only">90% Pure Stone-Ground Chakki Atta &amp; Organics in Pakistan</h1>

      {/* 1. Hero Section Slider */}
      <HeroSlider />

      {/* 2. Flagship Featured Product (Multigrain Diet & Diabetic Care Flour) */}
      <FlagshipFeaturedProduct />

      {/* 3. Scrolling Marquee Ticker */}
      <TickerMarquee />

      {/* 4. Category Collections ("Our Collections") */}
      <CategoryCollections />

      {/* 5. Featured Products (Fresh Stone-Milled Whole Wheat Flour & Multi-Grain Blends) */}
      <ProductCatalog />

      {/* 6. Customer Voices & Testimonials (Repositioned Higher on Homepage) */}
      <div className="content-visibility-auto">
        <CustomerReviews />
      </div>

      {/* 7. Prominent Doctor's Choice / Clinical Wellness Editorial CTA Banner */}
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

      {/* 10. 14-Day Guarantee & Nationwide COD Multi-column */}
      <div className="content-visibility-auto">
        <TrustGuarantee />
      </div>

      {/* 11. Email Newsletter Subscription */}
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
