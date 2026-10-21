import type { Metadata } from "next";
import { ProductDetailView } from "./ProductDetailView";
import { PRODUCTS } from "@/data/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  return {
    title: `${product.title} - 100% Pure | Usman's Pure`,
    description: `Buy authentic ${product.title} in Pakistan. Freshly milled, zero preservatives, stone-ground chakki flour and pure essentials.`,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | Usman's Pure`,
      description: product.description || `Buy authentic ${product.title} in Pakistan. Freshly milled, zero preservatives, stone-ground chakki flour and pure essentials.`,
      url: `https://usmanspure.com/product/${product.id}`,
      type: "website",
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - 100% Pure | Usman's Pure`,
      description: product.description || `Buy authentic ${product.title} in Pakistan.`,
      images: [product.image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: `https://usmanspure.com${product.image}`,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Usman's Pure Products",
    },
    offers: {
      "@type": "Offer",
      url: `https://usmanspure.com/product/${product.id}`,
      priceCurrency: "PKR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || "5.0",
      reviewCount: product.reviewCount || "120",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView id={id} />
    </>
  );
}
