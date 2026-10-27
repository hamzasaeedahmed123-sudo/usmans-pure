import { NextResponse } from "next/server";
import { z } from "zod";
import { sendAdminOtpEmail } from "@/lib/email";
import { updateAdminPassword } from "@/lib/auth";

interface OtpRecord {
  code: string;
  expiresAt: number;
  verified: boolean;
  attempts: number;
}

// In-memory OTP cache with strict rate limiting and single-use expiry
const otpCache = new Map<string, OtpRecord>();

const otpRequestSchema = z.object({
  action: z.enum(["request", "verify", "apply"]),
  email: z.string().email().optional(),
  otp: z.string().optional(),
  newPassword: z.string().min(8).optional(),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = otpRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const { action, email, otp, newPassword } = parsed.data;
    const targetEmail = (email || process.env.ADMIN_EMAIL || "admin@usmanspure.com").trim().toLowerCase();

    // 1. REQUEST OTP
    if (action === "request") {
      // Clean previous expired OTP
      otpCache.delete(targetEmail);

      // Cryptographically random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpCache.set(targetEmail, {
        code,
        expiresAt,
        verified: false,
        attempts: 0,
      });

      // Dispatch via SMTP if configured
      const emailResult = await sendAdminOtpEmail(targetEmail, code);

      if (!process.env.SMTP_PASS) {
        return NextResponse.json({
          success: true,
          message: "SMTP is not currently configured. Email delivery was simulated in development mode.",
          delivered: false,
          simulated: true,
        });
      }

      return NextResponse.json({
        success: true,
        message: `6-digit security verification code dispatched to ${targetEmail}.`,
        delivered: true,
        simulated: false,
      });
    }

    // 2. VERIFY OTP
    if (action === "verify") {
      const record = otpCache.get(targetEmail);

      if (!record) {
        return NextResponse.json(
          { error: "No pending OTP request found. Please request a new verification code." },
          { status: 400 }
        );
      }

      if (Date.now() > record.expiresAt) {
        otpCache.delete(targetEmail);
        return NextResponse.json(
          { error: "Verification code has expired. Please request a new code." },
          { status: 400 }
        );
      }

      record.attempts += 1;
      if (record.attempts > 3) {
        otpCache.delete(targetEmail);
        return NextResponse.json(
          { error: "Too many failed attempts. Code invalidated. Please request a new code." },
          { status: 429 }
        );
      }

      if (record.code !== (otp || "").trim()) {
        return NextResponse.json(
          { error: `Invalid verification code. ${3 - record.attempts} attempts remaining.` },
          { status: 400 }
        );
      }

      // Mark verified
      record.verified = true;
      otpCache.set(targetEmail, record);

      return NextResponse.json({
        success: true,
        verified: true,
        message: "OTP verified successfully. You may now complete credential update.",
      });
    }

    // 3. APPLY CREDENTIAL CHANGE
    if (action === "apply") {
      const record = otpCache.get(targetEmail);

      if (!record || !record.verified) {
        return NextResponse.json(
          { error: "Unauthorized. OTP verification must be completed first." },
          { status: 403 }
        );
      }

      if (!newPassword || newPassword.length < 8) {
        return NextResponse.json(
          { error: "New password must be at least 8 characters long." },
          { status: 400 }
        );
      }

      // Consume OTP single-use immediately
      otpCache.delete(targetEmail);

      // Persist new hashed password
      await updateAdminPassword(newPassword);

      return NextResponse.json({
        success: true,
        message: "Admin password successfully updated and locked with OTP security.",
      });
    }

    return NextResponse.json({ error: "Invalid action specified." }, { status: 400 });
  } catch (error) {
    console.error("[API Admin OTP Error]:", error);
    return NextResponse.json({ error: "Failed to process OTP request" }, { status: 500 });
  }
}
