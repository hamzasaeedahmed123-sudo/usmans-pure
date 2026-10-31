import type { Metadata } from "next";
import { CategoryPageView } from "./CategoryPageView";

export function generateStaticParams() {
  return [{ slug: "flours" }, { slug: "teas" }];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_META: Record<string, { title: string; desc: string }> = {
  flours: {
    title: "Stone-Ground Chakki Flours | Usman's Pure",
    desc: "Shop slow-milled chakki atta, multigrain dietary flour, and diabetic-safe grains milled fresh under 40°C.",
  },
  teas: {
    title: "Organic Whole Herbal Teas & Infusions | Usman's Pure",
    desc: "Chamomile, lemongrass, and moringa herbal teas for restful sleep, immunity, and natural energy.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug] || {
    title: "Organic Collections | Usman's Pure",
    desc: "Explore fresh stone-ground flours and pure herbal teas from Usman's Pure.",
  };

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: `https://usmanspure.com/category/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPageView slug={slug} />;
}
