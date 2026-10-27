import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, signCustomerToken, CUSTOMER_COOKIE_NAME } from "@/lib/auth";
import { findCustomerByEmail, createCustomer } from "@/lib/customerStore";

const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = registerSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid registration data" },
        { status: 400 }
      );
    }

    const { name, email, password, phone } = parsed.data;

    // Check if user already exists
    const existing = findCustomerByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    // Secure password hashing
    const passwordHash = await hashPassword(password);
    const customer = createCustomer({
      name,
      email,
      passwordHash,
      phone,
    });

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
    console.error("[Customer Register Error]:", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
