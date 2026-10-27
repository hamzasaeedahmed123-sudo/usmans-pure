import type { Metadata } from "next";
import { CategoryPageView } from "./CategoryPageView";

export function generateStaticParams() {
  return [{ slug: "flours" }, { slug: "teas" }, { slug: "spices" }];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_META: Record<string, { title: string; desc: string }> = {
  flours: {
    title: "90% Stone-Ground Chakki Flours | Usman's Pure",
    desc: "Shop slow-milled chakki atta, multigrain weight loss flour, and diabetic-safe grains milled fresh under 40°C.",
  },
  spices: {
    title: "Pure Cold-Pounded Organic Spices | Usman's Pure",
    desc: "Single-origin Lakadong turmeric, stone-pounded garam masala, and 90% pure Kashmiri chili powder.",
  },
  teas: {
    title: "Organic Whole Herbal Teas & Infusions | Usman's Pure",
    desc: "Whole wild Rosella hibiscus tea, olive leaf tea, and chamomile flowers for daily metabolic and heart health.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug] || {
    title: "Organic Collections | Usman's Pure",
    desc: "Explore fresh stone-ground flours, cold-pounded spices, and herbal teas from Usman's Pure.",
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
