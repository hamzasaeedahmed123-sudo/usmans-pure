import type { Metadata } from "next";
import { DoctorsChoicePageView } from "./DoctorsChoicePageView";

export const metadata: Metadata = {
  title: "Diabetic-Care & High-Fiber Whole Grain Flours | Usman's Pure",
  description:
    "Stone-ground whole-grain flour blends enriched with roasted fenugreek, barley, and ancient grains for daily dietary wellness and balanced nutrition.",
  alternates: {
    canonical: "/doctors-choice",
  },
  openGraph: {
    title: "Diabetic-Care & High-Fiber Whole Grain Flours | Usman's Pure",
    description:
      "Stone-ground whole-grain flour blends enriched with roasted fenugreek, barley, and ancient grains for daily dietary wellness and balanced nutrition.",
    url: "https://usmanspure.com/doctors-choice",
    type: "website",
    images: [
      {
        url: "/images/products/prod-4.png",
        width: 1200,
        height: 630,
        alt: "Diabetic-Care & High-Fiber Whole Grain Flours",
      },
    ],
  },
};

export default function DoctorsChoicePage() {
  return <DoctorsChoicePageView />;
}
