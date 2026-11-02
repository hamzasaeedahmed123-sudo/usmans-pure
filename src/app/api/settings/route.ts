import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { DEFAULT_STORE_SETTINGS, DEFAULT_CMS } from "@/context/StoreDataContext";

export async function GET() {
  try {
    const settingsRes = await query(
      "SELECT id, free_shipping_threshold, flat_shipping_fee, support_phone, support_email, store_open, payment_credentials, cms_content FROM settings WHERE id = 'primary' LIMIT 1"
    );

    const bannersRes = await query(
      "SELECT id, badge, title, discount_tag, description, link, button_text, bg_color, enabled FROM banners ORDER BY created_at DESC"
    );

    let storeSettings = DEFAULT_STORE_SETTINGS;
    let cmsContent = DEFAULT_CMS;

    if (settingsRes.rows.length > 0) {
      const row = settingsRes.rows[0];
      storeSettings = {
        ...DEFAULT_STORE_SETTINGS,
        freeShippingThreshold: Number(row.free_shipping_threshold || DEFAULT_STORE_SETTINGS.freeShippingThreshold),
        standardDeliveryFee: Number(row.flat_shipping_fee || DEFAULT_STORE_SETTINGS.standardDeliveryFee),
        storePhone: row.support_phone || DEFAULT_STORE_SETTINGS.storePhone,
        storeEmail: row.support_email || DEFAULT_STORE_SETTINGS.storeEmail,
        paymentCredentials: typeof row.payment_credentials === "string" ? JSON.parse(row.payment_credentials) : row.payment_credentials || DEFAULT_STORE_SETTINGS.paymentCredentials,
      };

      if (row.cms_content) {
        cmsContent = {
          ...DEFAULT_CMS,
          ...(typeof row.cms_content === "string" ? JSON.parse(row.cms_content) : row.cms_content),
        };
      }
    }

    const banners = bannersRes.rows.map((b: any) => ({
      id: b.id,
      badge: b.badge || "",
      title: b.title,
      discountTag: b.discount_tag || "",
      description: b.description || "",
      link: b.link || "",
      buttonText: b.button_text || "",
      bgColor: b.bg_color || "#8B3A22",
      enabled: Boolean(b.enabled),
    }));

    return NextResponse.json({
      success: true,
      settings: storeSettings,
      cms: cmsContent,
      banners: banners.length > 0 ? banners : cmsContent.customBanners,
    });
  } catch (err: any) {
    console.warn("[Settings API GET Notice]:", err.message);
    return NextResponse.json({
      success: true,
      settings: DEFAULT_STORE_SETTINGS,
      cms: DEFAULT_CMS,
      banners: DEFAULT_CMS.customBanners,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { settings, cms, banners } = body;

    if (settings) {
      await query(
        `INSERT INTO settings (id, free_shipping_threshold, flat_shipping_fee, support_phone, support_email, store_open, payment_credentials, updated_at)
         VALUES ('primary', $1, $2, $3, $4, $5, $6, NOW())
         ON CONFLICT (id) DO UPDATE SET
           free_shipping_threshold = EXCLUDED.free_shipping_threshold,
           flat_shipping_fee = EXCLUDED.flat_shipping_fee,
           support_phone = EXCLUDED.support_phone,
           support_email = EXCLUDED.support_email,
           store_open = EXCLUDED.store_open,
           payment_credentials = EXCLUDED.payment_credentials,
           updated_at = NOW()`,
        [
          settings.freeShippingThreshold || 10000,
          settings.flatShippingFee || 250,
          settings.supportPhone || null,
          settings.supportEmail || null,
          settings.storeOpen ?? true,
          JSON.stringify(settings.paymentCredentials || {}),
        ]
      );
    }

    if (cms) {
      await query(
        `INSERT INTO settings (id, cms_content, updated_at)
         VALUES ('primary', $1, NOW())
         ON CONFLICT (id) DO UPDATE SET
           cms_content = EXCLUDED.cms_content,
           updated_at = NOW()`,
        [JSON.stringify(cms)]
      );
    }

    if (Array.isArray(banners)) {
      for (const banner of banners) {
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
            banner.id,
            banner.badge || "",
            banner.title,
            banner.discountTag || "",
            banner.description || "",
            banner.link || "",
            banner.buttonText || "",
            banner.bgColor || "#8B3A22",
            banner.enabled ?? true,
          ]
        );
      }
    }

    return NextResponse.json({ success: true, message: "Settings and CMS updated in PostgreSQL" });
  } catch (err: any) {
    console.error("[Settings API PUT Error]:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
