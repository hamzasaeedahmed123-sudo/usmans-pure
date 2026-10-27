import { NextResponse } from "next/server";
import { z } from "zod";
import { resetAdminPasswordWithToken } from "@/lib/auth";

const resetSchema = z.object({
  token: z.string().min(1, "Reset token is required."),
  newPassword: z.string().min(8, "New password must be at least 8 characters long."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = resetSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid request payload.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { token, newPassword } = parsed.data;

    const result = await resetAdminPasswordWithToken(token, newPassword);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Password reset failed. The link may be invalid or expired." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Administrator password has been successfully updated. You can now log in with your new password.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    console.error("[Reset Password Error]:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
