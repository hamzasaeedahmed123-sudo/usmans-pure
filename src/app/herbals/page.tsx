import type { Metadata } from "next";
import { HerbalsPageView } from "./HerbalsPageView";

export const metadata: Metadata = {
  title: "Wild Organic Herbal Teas & Infusions | Usman's Pure",
  description:
    "90% caffeine-free Rosella Hibiscus Tea, Olive Leaf Cardioprotective Tea, and Calming Chamomile Blossoms. Whole-leaf, shade-dried, and aroma-sealed.",
  alternates: {
    canonical: "/herbals",
  },
  openGraph: {
    title: "Wild Organic Herbal Teas & Infusions | Usman's Pure",
    description:
      "90% caffeine-free Rosella Hibiscus Tea, Olive Leaf Cardioprotective Tea, and Calming Chamomile Blossoms. Whole-leaf, shade-dried, and aroma-sealed.",
    url: "https://usmanspure.com/herbals",
    type: "website",
    images: [
      {
        url: "/images/products/prod-9.jpg",
        width: 1200,
        height: 630,
        alt: "Wild Organic Herbal Teas & Infusions",
      },
    ],
  },
};

export default function HerbalsPage() {
  return <HerbalsPageView />;
}
