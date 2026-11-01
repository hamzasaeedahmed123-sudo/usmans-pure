import type { Metadata } from "next";
import { ProductsPageView } from "../products/ProductsPageView";

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
  },
};

export default function ShopPage() {
  return <ProductsPageView />;
}
