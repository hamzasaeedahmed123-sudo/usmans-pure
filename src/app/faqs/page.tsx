import type { Metadata } from "next";
import { FaqsPageView } from "./FaqsPageView";
import { FAQS_DATA } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Purity, Delivery & chakki mill Storage",
  description:
    "Got questions about shelf life, pure milled grain varieties, or delivery across Pakistan? Read our complete purity knowledge base.",
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions | Purity, Delivery & chakki mill Storage",
    description:
      "Got questions about shelf life, pure milled grain varieties, or delivery across Pakistan? Read our complete purity knowledge base.",
    url: "https://usmanspure.com/faqs",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Usman's Pure Frequently Asked Questions",
      },
    ],
  },
};

export default function FaqsPage() {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <FaqsPageView />
    </>
  );
}
