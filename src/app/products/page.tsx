import type { Metadata } from "next";
import { ProductsPageView } from "./ProductsPageView";

export const metadata: Metadata = {
  title: "All Products | Stone-Ground Flours, Spices & Organic Teas",
  description:
    "Explore 100% pure stone-ground chakki flours, spices, and herbal teas from Usman's Pure. Freshly milled wheat, diabetic atta, cold-pounded spices, and natural herbal teas.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "All Products | Stone-Ground Flours, Spices & Organic Teas",
    description:
      "Explore 100% pure stone-ground chakki flours, spices, and herbal teas from Usman's Pure. Freshly milled wheat, diabetic atta, cold-pounded spices, and natural herbal teas.",
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
  return <ProductsPageView />;
}
