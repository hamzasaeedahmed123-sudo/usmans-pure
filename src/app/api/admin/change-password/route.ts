import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getOrInitAdminRecord,
  verifyPassword,
  updateAdminPassword,
  verifyAdminToken,
  signAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    // 1. Authorize admin from cookie or header
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
      return NextResponse.json({ error: "Unauthorized. Invalid or expired session." }, { status: 401 });
    }

    // 2. Validate request payload
    const body = await req.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = parsed.data;

    // 3. Verify current password against database
    const admin = await getOrInitAdminRecord();
    const isCurrentValid = await verifyPassword(currentPassword, admin.passwordHash);
    if (!isCurrentValid) {
      return NextResponse.json(
        { error: "Current administrator password is incorrect." },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from current password." },
        { status: 400 }
      );
    }

    // 4. Update password and remove mustChangePassword flag
    const updated = await updateAdminPassword(newPassword);

    // 5. Issue new session token
    const newToken = await signAdminToken({
      username: updated.username,
      role: "admin",
      mustChangePassword: false,
    });

    const response = NextResponse.json({
      success: true,
      message: "Administrator password updated successfully. Security lockdown satisfied.",
      mustChangePassword: false,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Change Password Error]:", error);
    return NextResponse.json({ error: "Failed to update administrator password" }, { status: 500 });
  }
}
