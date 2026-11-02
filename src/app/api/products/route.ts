import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { PRODUCTS as DEFAULT_PRODUCTS, Product } from "@/data/products";

export async function GET() {
  try {
    const res = await query(
      "SELECT id, title, category, category_label, price, original_price, image, description, badge, in_stock, benefits, pack_options, highlight FROM products ORDER BY id ASC"
    );

    if (res.rows.length === 0) {
      // Seed initial default products into PostgreSQL
      for (const p of DEFAULT_PRODUCTS) {
        await query(
          `INSERT INTO products (
            id, title, category, category_label, price, original_price, image,
            description, badge, in_stock, benefits, pack_options, highlight, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
          ON CONFLICT (id) DO NOTHING`,
          [
            p.id,
            p.title,
            p.category,
            p.categoryLabel,
            p.price,
            p.originalPrice,
            p.image,
            p.description,
            p.discountBadge || null,
            p.inStock,
            JSON.stringify(p.benefits || []),
            JSON.stringify([]),
            p.tagline || null,
          ]
        ).catch(() => {});
      }
      return NextResponse.json({ success: true, products: DEFAULT_PRODUCTS });
    }

    const defaultProductMap = new Map(DEFAULT_PRODUCTS.map((p) => [p.id, p]));

    const products: Product[] = res.rows.map((r: any) => {
      const def = defaultProductMap.get(r.id);
      const price = Number(r.price);
      const originalPrice = Number(r.original_price || r.price);
      return {
        id: r.id,
        title: r.title,
        category: (r.category === "teas" ? "teas" : "flours") as "flours" | "teas",
        categoryLabel: r.category_label || (def?.categoryLabel ?? "Pure Chakki Flour"),
        price,
        originalPrice,
        priceFormatted: `₨${price.toLocaleString()}`,
        originalPriceFormatted: `₨${originalPrice.toLocaleString()}`,
        discountBadge: r.badge || def?.discountBadge || "Pure & Fresh",
        image: r.image || def?.image || "/images/products/prod-1.jpg",
        images: def?.images || [r.image || "/images/products/prod-1.jpg"],
        link: def?.link || `/products/${r.id}`,
        rating: def?.rating || 4.9,
        reviewCount: def?.reviewCount || 24,
        weight: def?.weight || "5kg",
        tagline: r.highlight || def?.tagline || r.title,
        description: r.description || def?.description || "",
        benefits: typeof r.benefits === "string" ? JSON.parse(r.benefits) : r.benefits || def?.benefits || [],
        inStock: Boolean(r.in_stock),
      };
    });

    return NextResponse.json({ success: true, products });
  } catch (err: any) {
    console.warn("[Products API GET Warning]:", err.message);
    return NextResponse.json({ success: true, products: DEFAULT_PRODUCTS });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, price, originalPrice, inStock, badge, discountBadge, description } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const effectiveBadge = badge || discountBadge || null;

    await query(
      `UPDATE products
       SET title = COALESCE($1, title),
           price = COALESCE($2, price),
           original_price = COALESCE($3, original_price),
           in_stock = COALESCE($4, in_stock),
           badge = COALESCE($5, badge),
           description = COALESCE($6, description),
           updated_at = NOW()
       WHERE id = $7`,
      [title, price, originalPrice, inStock, effectiveBadge, description, id]
    );

    return NextResponse.json({ success: true, message: "Product updated in PostgreSQL" });
  } catch (err: any) {
    console.error("[Products API PUT Error]:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
