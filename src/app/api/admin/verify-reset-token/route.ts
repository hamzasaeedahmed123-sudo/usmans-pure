import { NextResponse } from "next/server";
import { validatePasswordResetToken } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";

  if (!token) {
    return NextResponse.json({ valid: false, reason: "Missing reset token in request." }, { status: 400 });
  }

  const result = await validatePasswordResetToken(token);
  return NextResponse.json(result);
}
