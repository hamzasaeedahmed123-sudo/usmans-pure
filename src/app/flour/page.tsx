import type { Metadata } from "next";
import { FlourPageView } from "./FlourPageView";

export const metadata: Metadata = {
  title: "Buy Pure Pure Chakki Atta Online | Usman's Pure",
  description:
    "Order freshly milled whole wheat chakki flour, multigrain atta, and diabetic-friendly flour with nationwide Cash on Delivery.",
  keywords: [
    "buy chakki atta online",
    "pure chakki atta",
    "whole wheat flour pakistan",
    "multigrain atta",
    "diabetic flour",
    "gandum ka atta",
    "fresh chakki atta",
    "chakki atta lahore",
    "chakki atta karachi",
    "cold milled atta",
  ],
  alternates: {
    canonical: "/flour",
  },
  openGraph: {
    title: "Buy Pure Pure Chakki Atta Online | Usman's Pure",
    description:
      "Order freshly milled whole wheat chakki flour, multigrain atta, and diabetic-friendly flour with nationwide Cash on Delivery.",
    url: "https://usmanspure.com/flour",
    type: "website",
    images: [
      {
        url: "/images/products/prod-1.jpg",
        width: 1200,
        height: 630,
        alt: "Buy Pure Pure Chakki Atta Online - Usman's Pure",
      },
    ],
  },
};

export default function FlourPage() {
  return <FlourPageView />;
}
