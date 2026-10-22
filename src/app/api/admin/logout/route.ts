import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

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
