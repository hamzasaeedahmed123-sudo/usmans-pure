import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { FAQS_DATA, FaqItem } from "@/data/faqs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get("category");

    const res = await query(
      "SELECT id, category, category_label, q, a FROM faqs ORDER BY id ASC"
    );

    if (res.rows.length === 0) {
      // Seed initial default FAQs into PostgreSQL
      for (const f of FAQS_DATA) {
        await query(
          `INSERT INTO faqs (id, category, category_label, q, a, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           ON CONFLICT (id) DO NOTHING`,
          [f.id, f.category, f.categoryLabel, f.q, f.a]
        ).catch(() => {});
      }
      const faqs = categoryFilter
        ? FAQS_DATA.filter((f) => f.category === categoryFilter)
        : FAQS_DATA;
      return NextResponse.json({ success: true, faqs });
    }

    let faqs: FaqItem[] = res.rows.map((row: any) => ({
      id: Number(row.id),
      category: row.category,
      categoryLabel: row.category_label,
      q: row.q,
      a: row.a,
    }));

    if (categoryFilter) {
      faqs = faqs.filter((f) => f.category === categoryFilter);
    }

    return NextResponse.json({ success: true, faqs });
  } catch (err: any) {
    console.warn("[FAQs API GET Notice]:", err.message);
    return NextResponse.json({ success: true, faqs: FAQS_DATA });
  }
}
