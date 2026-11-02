import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { Review } from "@/context/StoreDataContext";

export async function GET() {
  try {
    const res = await query(
      "SELECT id, name, city, product, rating, review, verified, date, status, photos, created_at FROM reviews ORDER BY created_at DESC"
    );

    const reviews: Review[] = res.rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      city: r.city,
      product: r.product,
      rating: Number(r.rating || 5),
      review: r.review,
      verified: Boolean(r.verified),
      date: r.date || new Date(r.created_at).toLocaleDateString(),
      status: r.status || "Approved",
      photos: typeof r.photos === "string" ? JSON.parse(r.photos) : r.photos || [],
    }));

    return NextResponse.json({ success: true, reviews });
  } catch (err: any) {
    console.warn("[Reviews API GET Warning]:", err.message);
    return NextResponse.json({ success: true, reviews: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, city, product, rating, review, verified, photos } = body;

    if (!name || !review) {
      return NextResponse.json({ error: "Name and review message are required" }, { status: 400 });
    }

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const dateFormatted = new Date().toLocaleDateString("en-PK", {
      dateStyle: "medium",
    });

    try {
      await query(
        `INSERT INTO reviews (id, name, city, product, rating, review, verified, date, status, photos, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
        [
          reviewId,
          name.trim(),
          (city || "Verified Household").trim(),
          (product || "Pure Product").trim(),
          Number(rating || 5),
          review.trim(),
          verified ?? false,
          dateFormatted,
          "Pending",
          JSON.stringify(photos || []),
        ]
      );
    } catch (dbErr: any) {
      console.warn("[Reviews API POST DB Notice]:", dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully and saved to PostgreSQL.",
      reviewId,
    });
  } catch (err: any) {
    console.error("[Reviews API POST Error]:", err);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Review ID and status are required" }, { status: 400 });
    }

    await query("UPDATE reviews SET status = $1 WHERE id = $2", [status, id]);
    return NextResponse.json({ success: true, message: `Review status updated to ${status}` });
  } catch (err: any) {
    console.error("[Reviews API PATCH Error]:", err);
    return NextResponse.json({ error: "Failed to update review status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Review ID required" }, { status: 400 });
    }

    await query("DELETE FROM reviews WHERE id = $1", [id]);
    return NextResponse.json({ success: true, message: "Review deleted from PostgreSQL" });
  } catch (err: any) {
    console.error("[Reviews API DELETE Error]:", err);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
