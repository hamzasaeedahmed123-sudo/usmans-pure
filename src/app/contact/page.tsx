import type { Metadata } from "next";
import { ContactPageView } from "./ContactPageView";

export const metadata: Metadata = {
  title: "Contact Us & Atta Inquiries | Usman's Pure",
  description:
    "Get in touch with Usman's Pure customer support desk for questions on fresh stone-ground atta, custom flour orders, and delivery across Pakistan.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Atta Inquiries | Usman's Pure",
    description:
      "Get in touch with Usman's Pure customer support desk for questions on fresh stone-ground atta, custom flour orders, and delivery across Pakistan.",
    url: "https://usmanspure.com/contact",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Usman's Pure Support Desk",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageView />;
}
