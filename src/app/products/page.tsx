import type { Metadata } from "next";
import { ProductsPageView } from "./ProductsPageView";

export const metadata: Metadata = {
  title: "Shop Pure Chakki Flour, Multigrain Blends & Spices - Usman's Pure",
  description:
    "Explore our range of 90% pure whole wheat chakki flour, diabetic multigrain blends, caffeine-free herbal teas, and cold-pounded spices.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Shop Pure Chakki Flour, Multigrain Blends & Spices - Usman's Pure",
    description:
      "Explore our range of 90% pure whole wheat chakki flour, diabetic multigrain blends, caffeine-free herbal teas, and cold-pounded spices.",
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
