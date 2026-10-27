import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // Clear admin secure cookie
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // Clear legacy cookies
  response.cookies.set({
    name: "admin_session",
    value: "",
    maxAge: 0,
    path: "/",
  });

  response.cookies.set({
    name: "usman_auth_token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
