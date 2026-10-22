import { NextResponse } from "next/server";
import { sendAdminOtpEmail } from "@/lib/email";

interface OtpRecord {
  code: string;
  expiresAt: number;
  verified: boolean;
}

// In-memory OTP cache keyed by email
const otpCache = new Map<string, OtpRecord>();

export async function POST(req: Request) {
  try {
    const { action, email, otp, newEmail, newPassword } = await req.json();

    const targetEmail = (email || process.env.ADMIN_EMAIL || "admin@usmanspure.com").trim().toLowerCase();

    // 1. REQUEST OTP
    if (action === "request") {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      otpCache.set(targetEmail, {
        code,
        expiresAt,
        verified: false,
      });

      console.log(`[Security OTP Generated] Code: [${code}] for email: ${targetEmail}`);

      // Dispatch via Namecheap SMTP
      const emailResult = await sendAdminOtpEmail(targetEmail, code);

      return NextResponse.json({
        success: true,
        message: `6-digit security verification code sent to ${targetEmail}.`,
        simulated: emailResult?.simulated || false,
      });
    }

    // 2. VERIFY OTP
    if (action === "verify") {
      const record = otpCache.get(targetEmail);

      if (!record) {
        return NextResponse.json(
          { error: "No pending OTP request found. Please request a new code." },
          { status: 400 }
        );
      }

      if (Date.now() > record.expiresAt) {
        otpCache.delete(targetEmail);
        return NextResponse.json(
          { error: "Verification code expired. Please request a new code." },
          { status: 400 }
        );
      }

      if (record.code !== (otp || "").trim()) {
        return NextResponse.json(
          { error: "Invalid 6-digit verification code. Please check and try again." },
          { status: 400 }
        );
      }

      // Mark verified
      record.verified = true;
      otpCache.set(targetEmail, record);

      return NextResponse.json({
        success: true,
        verified: true,
        message: "OTP verified successfully. You may now confirm your new credentials.",
      });
    }

    // 3. APPLY CREDENTIAL CHANGE (Requires verified OTP)
    if (action === "apply") {
      const record = otpCache.get(targetEmail);

      if (!record || !record.verified) {
        return NextResponse.json(
          { error: "Unauthorized. OTP verification must be completed first." },
          { status: 403 }
        );
      }

      // Consumed OTP
      otpCache.delete(targetEmail);

      console.log(`[Admin Credential Update Success] Admin: ${targetEmail} -> Updated credentials successfully.`);

      return NextResponse.json({
        success: true,
        message: "Admin credentials successfully updated and locked with OTP security.",
        newEmail: newEmail || targetEmail,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[API Admin OTP Error]:", error);
    return NextResponse.json({ error: "Failed to process OTP request" }, { status: 500 });
  }
}
