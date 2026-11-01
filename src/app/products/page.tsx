import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsPageView } from "./ProductsPageView";

export const metadata: Metadata = {
  title: "Shop Pure Chakki Flour, Multigrain Blends & Herbal Teas - Usman's Pure",
  description:
    "Explore our range of pure Pure Chakki Flour, diabetic-care multigrain blends, and caffeine-free herbal teas.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Shop Pure Chakki Flour, Multigrain Blends & Herbal Teas - Usman's Pure",
    description:
      "Explore our range of pure Pure Chakki Flour, diabetic-care multigrain blends, and caffeine-free herbal teas.",
    url: "https://usmanspure.com/products",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Usman's Pure Products Catalog",
      },
    ],
  },
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <ProductsPageView />
    </Suspense>
  );
}

