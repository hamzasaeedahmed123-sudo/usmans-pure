import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { LUXURY_BUNDLES, LuxuryBundle } from "@/data/bundles";

export async function GET() {
  try {
    const res = await query(
      `SELECT id, slug, title, subtitle, tagline, badge, price, original_price,
              savings, image, tint, included_tags, description, whats_in_the_box,
              synergy, accordions
       FROM bundles
       ORDER BY price ASC`
    );

    if (res.rows.length === 0) {
      // Seed initial default bundles into PostgreSQL
      for (const b of LUXURY_BUNDLES) {
        await query(
          `INSERT INTO bundles (
            id, slug, title, subtitle, tagline, badge, price, original_price,
            savings, image, tint, included_tags, description, whats_in_the_box,
            synergy, accordions, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING`,
          [
            b.id,
            b.slug,
            b.title,
            b.subtitle,
            b.tagline,
            b.badge,
            b.price,
            b.originalPrice,
            b.savings,
            b.image,
            b.tint,
            JSON.stringify(b.includedTags || []),
            b.description,
            JSON.stringify(b.whatsInTheBox || []),
            JSON.stringify(b.synergy || {}),
            JSON.stringify(b.accordions || []),
          ]
        ).catch(() => {});
      }
      return NextResponse.json({ success: true, bundles: LUXURY_BUNDLES });
    }

    const bundles: LuxuryBundle[] = res.rows.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle || "",
      tagline: row.tagline || "",
      badge: row.badge || "",
      price: Number(row.price),
      originalPrice: Number(row.original_price || row.price),
      savings: Number(row.savings || 0),
      image: row.image,
      tint: row.tint || "bg-[#F1E8DA]",
      includedTags: typeof row.included_tags === "string" ? JSON.parse(row.included_tags) : row.included_tags || [],
      description: row.description || "",
      whatsInTheBox: typeof row.whats_in_the_box === "string" ? JSON.parse(row.whats_in_the_box) : row.whats_in_the_box || [],
      synergy: typeof row.synergy === "string" ? JSON.parse(row.synergy) : row.synergy || {},
      accordions: typeof row.accordions === "string" ? JSON.parse(row.accordions) : row.accordions || [],
    }));

    return NextResponse.json({ success: true, bundles });
  } catch (err: any) {
    console.warn("[Bundles API GET Notice]:", err.message);
    return NextResponse.json({ success: true, bundles: LUXURY_BUNDLES });
  }
}
