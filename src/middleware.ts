import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "usmans-pure-production-secure-hmac-sha256-key-1947-elite";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

async function verifyAdminSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: "usmanspure",
      audience: "usmanspure:admin",
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin_token")?.value;

  // 1. Protect Admin API Routes (except /api/admin/login)
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const tokenToVerify = adminToken || bearerToken || undefined;

    const isValid = await verifyAdminSession(tokenToVerify);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Administrator cryptographic authentication required." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 2. Protect Admin Frontend Pages (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const isValid = await verifyAdminSession(adminToken);
    if (!isValid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      // Invalidate any legacy insecure cookies
      response.cookies.delete("admin_session");
      response.cookies.delete("usman_auth_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
