import type { Metadata } from "next";
import { BundleDetailView } from "./BundleDetailView";
import { LUXURY_BUNDLES, getBundleBySlug } from "@/data/bundles";

export function generateStaticParams() {
  return LUXURY_BUNDLES.map((b) => ({ slug: b.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug) || LUXURY_BUNDLES[0];

  return {
    title: `${bundle.title} | Usman's Pure Products`,
    description:
      bundle.description ||
      `Save Rs ${bundle.savings} on the ${bundle.title}. Includes doorstep delivery across Pakistan.`,
    alternates: {
      canonical: `/bundles/${bundle.slug}`,
    },
    openGraph: {
      title: `${bundle.title} | Usman's Pure Products`,
      description: bundle.description,
      url: `https://usmanspure.com/bundles/${bundle.slug}`,
      type: "website",
      images: [
        {
          url: bundle.image,
          alt: bundle.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: bundle.title,
      description: bundle.description,
      images: [bundle.image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug) || LUXURY_BUNDLES[0];

  const bundleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bundle.title,
    image: `https://usmanspure.com${bundle.image}`,
    description: bundle.description,
    sku: bundle.id,
    brand: {
      "@type": "Brand",
      name: "Usman's Pure Products",
    },
    offers: {
      "@type": "Offer",
      url: `https://usmanspure.com/bundles/${bundle.slug}`,
      priceCurrency: "PKR",
      price: bundle.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "85",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bundleJsonLd) }}
      />
      <BundleDetailView slug={slug} />;
    </>
  );
}
