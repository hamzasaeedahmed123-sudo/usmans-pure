import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getOrInitAdminRecord,
  verifyPassword,
  signAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

interface AttemptTracker {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const rateLimitMap = new Map<string, AttemptTracker>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min lockout

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; waitSeconds?: number } {
  const now = Date.now();
  const tracker = rateLimitMap.get(ip) || { count: 0, firstAttempt: now };

  if (tracker.lockedUntil && now < tracker.lockedUntil) {
    const waitSeconds = Math.ceil((tracker.lockedUntil - now) / 1000);
    return { allowed: false, remaining: 0, waitSeconds };
  }

  // Reset window if expired
  if (now - tracker.firstAttempt > WINDOW_MS) {
    tracker.count = 0;
    tracker.firstAttempt = now;
    tracker.lockedUntil = undefined;
  }

  return { allowed: true, remaining: Math.max(0, MAX_ATTEMPTS - tracker.count) };
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const tracker = rateLimitMap.get(ip) || { count: 0, firstAttempt: now };
  tracker.count += 1;
  if (tracker.count >= MAX_ATTEMPTS) {
    tracker.lockedUntil = now + LOCKOUT_MS;
  }
  rateLimitMap.set(ip, tracker);
}

function clearRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

const loginSchema = z.object({
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().min(1, "Email is required").optional(),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Account temporarily locked for security. Please retry in ${rateCheck.waitSeconds} seconds.`,
        locked: true,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload. Username and password are required." },
        { status: 400 }
      );
    }

    const inputIdentifier = (parsed.data.username || parsed.data.email || "").trim().toLowerCase();
    const inputPassword = parsed.data.password;

    const admin = await getOrInitAdminRecord();
    const expectedUsername = (admin.username || "").toLowerCase();
    const expectedEmail = (admin.email || admin.username || "admin@usmanspure.com").toLowerCase();

    // Check username or admin email match
    const isUsernameMatch =
      inputIdentifier === expectedUsername ||
      inputIdentifier === expectedEmail ||
      inputIdentifier === "admin" ||
      inputIdentifier === "admin@usmanspure.com" ||
      inputIdentifier === "usmanspure1947";

    const isPasswordMatch = isUsernameMatch
      ? await verifyPassword(inputPassword, admin.passwordHash)
      : false;

    if (!isUsernameMatch || !isPasswordMatch) {
      recordFailedAttempt(ip);
      const remaining = Math.max(0, rateCheck.remaining - 1);
      return NextResponse.json(
        {
          error:
            remaining === 0
              ? "Account locked due to multiple failed login attempts. Retry in 15 minutes."
              : `Invalid administrator credentials. ${remaining} attempt(s) remaining.`,
        },
        { status: 401 }
      );
    }

    // Reset rate limit on success
    clearRateLimit(ip);

    // Sign cryptographic admin JWT token
    const token = await signAdminToken({
      username: admin.username,
      role: "admin",
      mustChangePassword: admin.mustChangePassword,
    });

    const response = NextResponse.json({
      success: true,
      role: "admin",
      username: admin.username,
      mustChangePassword: admin.mustChangePassword,
      message: admin.mustChangePassword
        ? "Initial bootstrap login successful. Administrator password change is required."
        : "Administrator authentication successful.",
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Invalidate legacy insecure cookies
    response.cookies.delete("admin_session");
    response.cookies.delete("usman_auth_token");

    return response;
  } catch (error) {
    console.error("[Admin Login Error]:", error);
    return NextResponse.json({ error: "Authentication system error" }, { status: 500 });
  }
}
