import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { StoreDataProvider } from "@/context/StoreDataContext";

import { ClientLayoutWidgets } from "@/components/layout/ClientLayoutWidgets";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://usmanspure.com"),
  title: {
    default: "Usman's Pure - Chakki Atta, Flour & Spices",
    template: "%s | Usman's Pure",
  },
  description: "Fresh stone-ground chakki atta, pure flour, whole grains, and organic spices in Pakistan.",
  keywords: [
    "atta",
    "flour",
    "chakki atta",
    "chakki flour",
    "grains",
    "wheat",
    "organic spices",
    "herbal tea",
    "usman pure",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://usmanspure.com/#organization",
      name: "Usman's Pure Products",
      url: "https://usmanspure.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://usmanspure.com/#logo",
        url: "https://usmanspure.com/logo.png",
        caption: "Usman's Pure Products Logo",
      },
      image: "https://usmanspure.com/logo.png",
      description:
        "Authentic stone-milled whole grain chakki flours, diabetic nutritional blends, cold-pounded spices, and pure herbal teas in Pakistan.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-300-0000000",
        contactType: "Customer Support",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
      sameAs: [
        "https://www.facebook.com/usmanspure",
        "https://www.instagram.com/usmanspure",
      ],
    },
    {
      "@type": ["LocalBusiness", "OnlineStore"],
      "@id": "https://usmanspure.com/#store",
      name: "Usman's Pure Products",
      url: "https://usmanspure.com",
      logo: "https://usmanspure.com/logo.png",
      image: "https://usmanspure.com/images/products/prod-3.jpg",
      description:
        "Premium 100% Stone-Ground Whole Wheat Chakki Atta & Organic Wellness Products in Pakistan.",
      priceRange: "₨₨",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      areaServed: ["Pakistan", "Lahore", "Karachi", "Islamabad", "Rawalpindi"],
      paymentAccepted: "Cash on Delivery, JazzCash, Easypaisa, Credit Card",
      currenciesAccepted: "PKR",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "148",
        bestRating: "5",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased text-[#1E1510] bg-[#FAF7F2] overflow-x-hidden w-full max-w-full selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
        <AuthProvider>
          <StoreDataProvider>
            <CartProvider>
              <main className="flex-1 w-full max-w-full overflow-x-hidden pb-28 sm:pb-24">{children}</main>
              <ClientLayoutWidgets />
            </CartProvider>
          </StoreDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
