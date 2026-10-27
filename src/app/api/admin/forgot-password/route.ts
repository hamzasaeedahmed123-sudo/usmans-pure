import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrInitAdminRecord, createPasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

const forgotSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
});

// Simple in-memory rate limiting for password reset requests (max 3 requests per 15 minutes per IP)
const resetRateMap = new Map<string, { count: number; firstAttempt: number }>();
const MAX_RESET_REQUESTS = 5;
const RESET_WINDOW_MS = 15 * 60 * 1000;

function checkResetRate(ip: string): boolean {
  const now = Date.now();
  const record = resetRateMap.get(ip) || { count: 0, firstAttempt: now };
  if (now - record.firstAttempt > RESET_WINDOW_MS) {
    record.count = 0;
    record.firstAttempt = now;
  }
  record.count += 1;
  resetRateMap.set(ip, record);
  return record.count <= MAX_RESET_REQUESTS;
}

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  if (!checkResetRate(ip)) {
    return NextResponse.json(
      { error: "Too many password reset requests from this IP. Please wait 15 minutes before trying again." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = forgotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid administrator email address." },
        { status: 400 }
      );
    }

    const inputEmail = parsed.data.email.trim().toLowerCase();
    const admin = await getOrInitAdminRecord();
    const expectedEmail = (admin.email || admin.username || "admin@usmanspure.com").toLowerCase();

    // Verify email matches administrator
    if (inputEmail !== expectedEmail && inputEmail !== "admin@usmanspure.com") {
      return NextResponse.json(
        { error: "No administrator account found associated with this email address." },
        { status: 404 }
      );
    }

    // Generate cryptographic single-use reset token
    const token = await createPasswordResetToken(expectedEmail);

    // Build absolute URL for reset link
    const origin = req.headers.get("origin") || req.headers.get("referer");
    let baseUrl = "http://localhost:3000";
    if (origin) {
      try {
        const u = new URL(origin);
        baseUrl = `${u.protocol}//${u.host}`;
      } catch {}
    } else {
      const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
      const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
      baseUrl = `${proto}://${host}`;
    }

    const resetLink = `${baseUrl}/admin/reset-password?token=${token}`;

    // Dispatch email via business SMTP
    const emailResult = await sendPasswordResetEmail(expectedEmail, resetLink);

    if (!emailResult.success) {
      return NextResponse.json(
        {
          error:
            emailResult.error ||
            "Failed to dispatch password reset email. Please ensure SMTP credentials are configured.",
          smtpError: true,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `A secure password reset link has been dispatched to ${expectedEmail}. Please check your inbox. The link will expire in 1 hour.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    console.error("[Forgot Password Error]:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
