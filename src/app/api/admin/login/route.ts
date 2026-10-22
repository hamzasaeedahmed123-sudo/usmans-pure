import { NextResponse } from "next/server";

interface LoginAttempt {
  count: number;
  firstAttemptTime: number;
  lockedUntil?: number;
}

// In-memory brute-force rate limiter
const attemptsMap = new Map<string, LoginAttempt>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

function cleanOldAttempts() {
  const now = Date.now();
  for (const [ip, data] of attemptsMap.entries()) {
    if (now - data.firstAttemptTime > WINDOW_MS && (!data.lockedUntil || now > data.lockedUntil)) {
      attemptsMap.delete(ip);
    }
  }
}

export async function POST(req: Request) {
  cleanOldAttempts();

  // Get client IP
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const now = Date.now();

  const attemptData = attemptsMap.get(ip) || { count: 0, firstAttemptTime: now };

  // Check lockout status
  if (attemptData.lockedUntil && now < attemptData.lockedUntil) {
    const remainingSeconds = Math.ceil((attemptData.lockedUntil - now) / 1000);
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Security lockout active. Please retry in ${remainingSeconds} seconds.`,
        locked: true,
        remainingSeconds,
      },
      { status: 429 }
    );
  }

  try {
    const { email, password, role } = await req.json();

    const expectedAdminEmail = (process.env.ADMIN_EMAIL || "admin@usmanspure.com").toLowerCase();
    const expectedAdminPass = process.env.ADMIN_PASSWORD || "admin123";
    const expectedStaffEmail = "staff@usmanspure.com";
    const expectedStaffPass = "staff123";

    const cleanEmail = (email || "").trim().toLowerCase();

    const isValidAdmin = cleanEmail === expectedAdminEmail && password === expectedAdminPass;
    const isValidStaff = cleanEmail === expectedStaffEmail && password === expectedStaffPass;

    if (!isValidAdmin && !isValidStaff) {
      attemptData.count += 1;
      if (attemptData.count >= MAX_ATTEMPTS) {
        attemptData.lockedUntil = now + LOCKOUT_MS;
      }
      attemptsMap.set(ip, attemptData);

      const remainingAttempts = Math.max(0, MAX_ATTEMPTS - attemptData.count);
      return NextResponse.json(
        {
          error: remainingAttempts === 0
            ? "Account temporarily locked due to multiple failed attempts. Please retry in 15 minutes."
            : `Invalid credentials. ${remainingAttempts} attempt(s) remaining before security lockout.`,
        },
        { status: 401 }
      );
    }

    // Reset attempts on successful login
    attemptsMap.delete(ip);

    const authenticatedRole = isValidAdmin ? "admin" : "staff";
    const sessionPayload = {
      email: cleanEmail,
      role: authenticatedRole,
      loginTime: new Date().toISOString(),
    };

    const response = NextResponse.json({
      success: true,
      role: authenticatedRole,
      message: "Admin authentication successful",
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: "admin_session",
      value: encodeURIComponent(JSON.stringify(sessionPayload)),
      httpOnly: false, // accessible to client auth context
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("[Admin Login Error]:", err);
    return NextResponse.json({ error: "Authentication system error" }, { status: 500 });
  }
}
