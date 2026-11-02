import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // 1. Authenticate administrator
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [k, ...v] = c.split("=");
        return [k, v.join("=")];
      })
    );
    const authHeader = req.headers.get("authorization");
    const token =
      cookies[ADMIN_COOKIE_NAME] ||
      (authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const verified = await verifyAdminToken(token);
    if (!verified) {
      return NextResponse.json({ error: "Unauthorized. Invalid admin session." }, { status: 401 });
    }

    const body = await req.json();
    const { products, banners, reviews, settings, cms } = body;

    let syncedProducts = 0;
    let syncedBanners = 0;
    let syncedReviews = 0;

    // 2. Sync Products from browser
    if (Array.isArray(products)) {
      for (const p of products) {
        if (!p.id || !p.title) continue;
        await query(
          `INSERT INTO products (
            id, title, category, category_label, price, original_price, image,
            description, badge, in_stock, benefits, pack_options, highlight, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            price = EXCLUDED.price,
            original_price = EXCLUDED.original_price,
            image = EXCLUDED.image,
            description = EXCLUDED.description,
            badge = EXCLUDED.badge,
            in_stock = EXCLUDED.in_stock,
            updated_at = NOW()`,
          [
            p.id,
            p.title,
            p.category || "flours",
            p.categoryLabel || "Pure Chakki Flour",
            Number(p.price || 0),
            Number(p.originalPrice || p.price || 0),
            p.image || "/images/products/prod-1.jpg",
            p.description || "",
            p.badge || p.discountBadge || null,
            p.inStock ?? true,
            JSON.stringify(p.benefits || []),
            JSON.stringify(p.packOptions || []),
            p.tagline || p.highlight || null,
          ]
        ).catch(() => {});
        syncedProducts++;
      }
    }

    // 3. Sync Banners from browser
    if (Array.isArray(banners)) {
      for (const b of banners) {
        if (!b.id || !b.title) continue;
        await query(
          `INSERT INTO banners (id, badge, title, discount_tag, description, link, button_text, bg_color, enabled, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
           ON CONFLICT (id) DO UPDATE SET
             badge = EXCLUDED.badge,
             title = EXCLUDED.title,
             discount_tag = EXCLUDED.discount_tag,
             description = EXCLUDED.description,
             link = EXCLUDED.link,
             button_text = EXCLUDED.button_text,
             bg_color = EXCLUDED.bg_color,
             enabled = EXCLUDED.enabled`,
          [
            b.id,
            b.badge || "",
            b.title,
            b.discountTag || "",
            b.description || "",
            b.link || "",
            b.buttonText || "",
            b.bgColor || "#8B3A22",
            b.enabled ?? true,
          ]
        ).catch(() => {});
        syncedBanners++;
      }
    }

    // 4. Sync Reviews from browser
    if (Array.isArray(reviews)) {
      for (const r of reviews) {
        if (!r.id || !r.name || !r.review) continue;
        await query(
          `INSERT INTO reviews (id, name, city, product, rating, review, verified, date, status, photos, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
           ON CONFLICT (id) DO UPDATE SET
             rating = EXCLUDED.rating,
             review = EXCLUDED.review,
             status = EXCLUDED.status`,
          [
            r.id,
            r.name,
            r.city || "Pakistan",
            r.product || "Pure Chakki Flour",
            Number(r.rating || 5),
            r.review,
            r.verified ?? true,
            r.date || "Just now",
            r.status || "Published",
            JSON.stringify(r.photos || []),
          ]
        ).catch(() => {});
        syncedReviews++;
      }
    }

    // 5. Sync Settings & CMS from browser
    if (settings || cms) {
      await query(
        `INSERT INTO settings (id, free_shipping_threshold, flat_shipping_fee, support_phone, support_email, store_open, payment_credentials, cms_content, updated_at)
         VALUES ('primary', $1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (id) DO UPDATE SET
           free_shipping_threshold = COALESCE(EXCLUDED.free_shipping_threshold, settings.free_shipping_threshold),
           flat_shipping_fee = COALESCE(EXCLUDED.flat_shipping_fee, settings.flat_shipping_fee),
           support_phone = COALESCE(EXCLUDED.support_phone, settings.support_phone),
           support_email = COALESCE(EXCLUDED.support_email, settings.support_email),
           store_open = COALESCE(EXCLUDED.store_open, settings.store_open),
           payment_credentials = COALESCE(EXCLUDED.payment_credentials, settings.payment_credentials),
           cms_content = COALESCE(EXCLUDED.cms_content, settings.cms_content),
           updated_at = NOW()`,
        [
          settings?.freeShippingThreshold || 10000,
          settings?.standardDeliveryFee || 250,
          settings?.storePhone || null,
          settings?.storeEmail || null,
          settings?.storeOpen ?? true,
          JSON.stringify(settings?.paymentCredentials || {}),
          cms ? JSON.stringify(cms) : null,
        ]
      ).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: `Browser data successfully migrated to PostgreSQL: ${syncedProducts} products, ${syncedBanners} banners, ${syncedReviews} reviews.`,
    });
  } catch (err: any) {
    console.error("[Migrate Browser Data Error]:", err);
    return NextResponse.json({ error: "Failed to migrate browser data" }, { status: 500 });
  }
}
