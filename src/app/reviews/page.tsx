import type { Metadata } from "next";
import { ReviewsPageView } from "./ReviewsPageView";

export const metadata: Metadata = {
  title: "Verified Customer Reviews & Real Stories | Usman's Pure",
  description:
    "Read authentic customer experiences with our stone-ground flours, dietary care flours, and organic teas. Real meal photos and feedback from Pakistani households.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Verified Customer Reviews & Real Stories | Usman's Pure",
    description:
      "Read authentic customer experiences with our stone-ground flours, dietary care flours, and organic teas. Real meal photos and feedback from Pakistani households.",
    url: "https://usmanspure.com/reviews",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Customer Reviews - Usman's Pure",
      },
    ],
  },
};

export default function ReviewsPage() {
  return <ReviewsPageView />;
}
