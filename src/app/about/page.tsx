import type { Metadata } from "next";
import { AboutPageView } from "./AboutPageView";

export const metadata: Metadata = {
  title: "Our Heritage & Milling Process - Usman's Pure",
  description:
    "Learn about Usman's Pure traditional slow stone-ground milling process, bringing 100% natural, whole-wheat chakki atta and unadulterated spices across Pakistan.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Our Heritage & Milling Process - Usman's Pure",
    description:
      "Learn about Usman's Pure traditional slow stone-ground milling process, bringing 100% natural, whole-wheat chakki atta and unadulterated spices across Pakistan.",
    url: "https://usmanspure.com/about",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Usman's Pure Traditional Stone Chakki Milling Process",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageView />;
}
