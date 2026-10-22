import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authCookie = request.cookies.get("usman_auth_token")?.value;
    const adminSession = request.cookies.get("admin_session")?.value;

    let isAuthenticatedAdmin = false;

    if (adminSession) {
      isAuthenticatedAdmin = true;
    } else if (authCookie) {
      try {
        const decoded = JSON.parse(decodeURIComponent(authCookie));
        if (decoded && (decoded.role === "admin" || decoded.role === "staff")) {
          isAuthenticatedAdmin = true;
        }
      } catch {
        isAuthenticatedAdmin = false;
      }
    }

    if (!isAuthenticatedAdmin) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
