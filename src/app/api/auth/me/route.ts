import { NextResponse } from "next/server";
import { verifyCustomerToken, CUSTOMER_COOKIE_NAME } from "@/lib/auth";
import { findCustomerById } from "@/lib/customerStore";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [k, ...v] = c.split("=");
        return [k, v.join("=")];
      })
    );
    const token = cookies[CUSTOMER_COOKIE_NAME];

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const payload = await verifyCustomerToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const customer = findCustomerById(payload.userId);
    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.userId,
        name: customer ? customer.name : payload.name,
        email: customer ? customer.email : payload.email,
        phone: customer?.phone,
        role: "customer",
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
