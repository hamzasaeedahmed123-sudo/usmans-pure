import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, signCustomerToken, CUSTOMER_COOKIE_NAME } from "@/lib/auth";
import { findCustomerByEmail } from "@/lib/customerStore";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Simple rate limit for customer login
const customerLoginAttempts = new Map<string, { count: number; firstAttempt: number }>();

export async function POST(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const now = Date.now();

  const tracker = customerLoginAttempts.get(ip) || { count: 0, firstAttempt: now };
  if (now - tracker.firstAttempt > 15 * 60 * 1000) {
    tracker.count = 0;
    tracker.firstAttempt = now;
  }

  if (tracker.count >= 10) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const raw = await req.json();
    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid credentials format" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const customer = findCustomerByEmail(email);

    if (!customer) {
      tracker.count += 1;
      customerLoginAttempts.set(ip, tracker);
      return NextResponse.json(
        { error: "Invalid email address or password." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, customer.passwordHash);
    if (!isValid) {
      tracker.count += 1;
      customerLoginAttempts.set(ip, tracker);
      return NextResponse.json(
        { error: "Invalid email address or password." },
        { status: 401 }
      );
    }

    // Success: clear rate limit
    customerLoginAttempts.delete(ip);

    // Sign customer JWT token
    const token = await signCustomerToken({
      userId: customer.id,
      email: customer.email,
      name: customer.name,
      role: "customer",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: "customer",
      },
    });

    response.cookies.set({
      name: CUSTOMER_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Customer Login Error]:", error);
    return NextResponse.json({ error: "Failed to authenticate customer" }, { status: 500 });
  }
}
