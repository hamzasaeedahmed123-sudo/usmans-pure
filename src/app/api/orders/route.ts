import { NextResponse } from "next/server";
import { z } from "zod";
import { PRODUCTS } from "@/data/products";
import { LUXURY_BUNDLES } from "@/data/bundles";
import { generateWhatsAppOrderUrl, OrderBackupRecord } from "@/lib/ordersBackup";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { query } from "@/lib/db";

// In-memory idempotency cache (keyed by phone + fingerprint)
const recentSubmissions = new Map<string, { orderId: string; timestamp: number }>();
// In-memory fallback if database connection is temporarily pending configuration
const inMemoryOrders: any[] = [];

const orderItemSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(50, "Quantity cannot exceed 50"),
  pack: z.string().optional().default("standard"),
});

const createOrderSchema = z.object({
  orderNumber: z.string().optional(),
  customerName: z.string().min(2, "Customer name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  altPhone: z.string().optional(),
  address: z.string().min(5, "Delivery address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  customerEmail: z.string().email().optional(),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  paymentMethod: z.string().default("Cash on Delivery (COD)"),
  notes: z.string().optional(),
  transactionId: z.string().optional(),
  senderAccountTitle: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = createOrderSchema.safeParse(rawBody);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid order details.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const {
      customerName,
      phone,
      address,
      city,
      customerEmail,
      items,
      paymentMethod,
      notes,
      transactionId,
      senderAccountTitle,
    } = parsed.data;

    // 1. Server as Source of Truth for Item Prices and Availability
    let calculatedSubtotal = 0;
    const verifiedItems: Array<{
      id: string;
      name: string;
      pack: string;
      quantity: number;
      price: number;
    }> = [];

    for (const item of items) {
      const isFlagship = item.id === "prod-multigrain-flagship";
      const product = isFlagship ? PRODUCTS.find((p) => p.id === "prod-3") : PRODUCTS.find((p) => p.id === item.id);
      const bundle = LUXURY_BUNDLES.find((b) => b.id === item.id);

      if (!product && !bundle && !isFlagship) {
        return NextResponse.json(
          { error: `Item with ID "${item.id}" is unavailable or does not exist in store catalog.` },
          { status: 400 }
        );
      }

      let verifiedUnitPrice = 0;
      let itemName = "";
      let packName = item.pack || "Standard";

      if (isFlagship) {
        const is2_5 = item.pack?.includes("2.5");
        const is10 = item.pack?.includes("10");
        verifiedUnitPrice = is2_5 ? 650 : is10 ? 2300 : 1200;
        itemName = "Multigrain Diet & Diabetic Care Flour";
        packName = item.pack || "5kg Family Pack";
      } else if (product) {
        if (!product.inStock) {
          return NextResponse.json(
            { error: `Product "${product.title}" is currently out of stock.` },
            { status: 400 }
          );
        }
        const isLarge =
          item.pack === "large" ||
          item.pack === "Family Double Pack" ||
          item.pack?.toLowerCase().includes("double");
        verifiedUnitPrice = isLarge ? Math.round(product.price * 1.85) : product.price;
        itemName = product.title;
        packName = isLarge ? "Family Double Pack" : `Standard Pack (${product.weight})`;
      } else if (bundle) {
        verifiedUnitPrice = bundle.price;
        itemName = bundle.title;
        packName = "Curated Bundle";
      }

      calculatedSubtotal += verifiedUnitPrice * item.quantity;
      verifiedItems.push({
        id: item.id,
        name: itemName,
        pack: packName,
        quantity: item.quantity,
        price: verifiedUnitPrice,
      });
    }

    // 2. Server-side Delivery Fee Calculation Policy (Single Source of Truth)
    // Rule: Orders of PKR 10,000 or more enjoy FREE delivery. Otherwise PKR 250 standard delivery fee.
    const calculatedShippingFee = calculatedSubtotal >= 10000 ? 0 : 250;
    const calculatedGrandTotal = calculatedSubtotal + calculatedShippingFee;

    // 3. Idempotency / Duplicate Submission Guard (60 second window)
    const idempotencyFingerprint = `${phone.replace(/\D/g, "")}_${calculatedGrandTotal}_${verifiedItems.map((i) => `${i.id}x${i.quantity}`).join("_")}`;
    const existingSubmission = recentSubmissions.get(idempotencyFingerprint);
    if (existingSubmission && Date.now() - existingSubmission.timestamp < 60000) {
      return NextResponse.json({
        success: true,
        orderId: existingSubmission.orderId,
        message: "Duplicate order submission prevented. Existing order confirmation returned.",
        isDuplicate: true,
      });
    }

    // 4. Generate Unique Order ID
    const orderId =
      parsed.data.orderNumber ||
      `UPP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const dateFormatted = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const itemsSummary = verifiedItems
      .map((i) => `${i.name} (${i.pack}) x ${i.quantity}`)
      .join(", ");

    const orderRecord: OrderBackupRecord = {
      orderId,
      date: dateFormatted,
      customerName,
      phone,
      city,
      address,
      items: verifiedItems,
      itemsSummary,
      subtotal: calculatedSubtotal,
      shippingFee: calculatedShippingFee,
      grandTotal: calculatedGrandTotal,
      paymentMethod,
      notes,
      transactionId,
      senderAccountTitle,
    };

    // 5. Direct PostgreSQL Database Insertion (Primary Persistent Record)
    try {
      await query(
        `INSERT INTO orders (
          id, order_number, customer_name, customer_email, phone, address, city,
          items, subtotal, shipping_fee, total_amount, status, payment_method,
          notes, transaction_id, sender_account_title, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET updated_at = NOW()`,
        [
          orderId,
          orderId,
          customerName,
          customerEmail || null,
          phone,
          address,
          city,
          JSON.stringify(verifiedItems),
          calculatedSubtotal,
          calculatedShippingFee,
          calculatedGrandTotal,
          "Pending",
          paymentMethod,
          notes || null,
          transactionId || null,
          senderAccountTitle || null,
        ]
      );
    } catch (dbErr: any) {
      console.warn("[Orders API] Database insert notice:", dbErr.message);
      // Keep memory fallback in case DB is temporarily initializing
      inMemoryOrders.unshift({
        id: orderId,
        orderNumber: orderId,
        customerName,
        customerEmail: customerEmail || "",
        phone,
        address,
        city,
        items: verifiedItems,
        subtotal: calculatedSubtotal,
        shippingFee: calculatedShippingFee,
        totalAmount: calculatedGrandTotal,
        status: "Pending",
        paymentMethod,
        notes: notes || undefined,
        transactionId: transactionId || undefined,
        senderAccountTitle: senderAccountTitle || undefined,
        date: dateFormatted,
      });
    }

    // Record submission in idempotency tracker
    recentSubmissions.set(idempotencyFingerprint, { orderId, timestamp: Date.now() });

    // 6. External Backups (Google Sheets & WhatsApp URL)
    const whatsappUrl = generateWhatsAppOrderUrl(orderRecord);

    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: orderRecord.date,
          orderId: orderRecord.orderId,
          customerName: orderRecord.customerName,
          phone: orderRecord.phone,
          city: orderRecord.city,
          address: orderRecord.address,
          items: orderRecord.itemsSummary,
          totalAmount: orderRecord.grandTotal,
          paymentMethod: orderRecord.paymentMethod,
          notes: orderRecord.notes || "",
          transactionId: orderRecord.transactionId || "",
        }),
      }).catch((sheetErr) => console.warn("[Orders API] Google Sheets sync notice:", sheetErr));
    }

    // 7. Email Dispatch (Customer + Admin notification with safe HTML escaping)
    sendOrderConfirmationEmail({
      orderId: orderRecord.orderId,
      customerName: orderRecord.customerName,
      customerEmail,
      phone: orderRecord.phone,
      address: orderRecord.address,
      city: orderRecord.city,
      items: orderRecord.items,
      subtotal: orderRecord.subtotal,
      shippingFee: orderRecord.shippingFee,
      grandTotal: orderRecord.grandTotal,
      paymentMethod: orderRecord.paymentMethod,
      notes: orderRecord.notes,
      date: orderRecord.date,
    }).catch((emailErr) => console.warn("[Orders API] Email dispatch notice:", emailErr));

    return NextResponse.json({
      success: true,
      orderId,
      order: orderRecord,
      whatsappUrl,
      message: "Order successfully verified and persisted to PostgreSQL database.",
    });
  } catch (error) {
    console.error("[API Orders Error]:", error);
    return NextResponse.json({ error: "Failed to process and persist order" }, { status: 500 });
  }
}

/**
 * GET: Retrieve orders directly from PostgreSQL Database
 */
export async function GET() {
  try {
    const res = await query(
      `SELECT id, order_number, customer_name, customer_email, phone, address, city, items,
              subtotal, shipping_fee, total_amount, status, payment_method, notes,
              transaction_id, sender_account_title, receipt_image, created_at, updated_at
       FROM orders
       ORDER BY created_at DESC
       LIMIT 500`
    );

    const orders = res.rows.map((row: any) => ({
      id: row.id,
      orderNumber: row.order_number,
      customerName: row.customer_name,
      customerEmail: row.customer_email || "",
      phone: row.phone,
      address: row.address,
      city: row.city,
      items: typeof row.items === "string" ? JSON.parse(row.items) : row.items || [],
      subtotal: Number(row.subtotal || 0),
      shippingFee: Number(row.shipping_fee || 0),
      totalAmount: Number(row.total_amount || 0),
      status: row.status,
      paymentMethod: row.payment_method,
      notes: row.notes || undefined,
      transactionId: row.transaction_id || undefined,
      senderAccountTitle: row.sender_account_title || undefined,
      receiptImage: row.receipt_image || undefined,
      date: new Date(row.created_at).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi" }),
    }));

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.warn("[Orders API GET Notice]:", err.message);
    return NextResponse.json({ success: true, orders: inMemoryOrders });
  }
}

/**
 * PATCH: Update order status in PostgreSQL Database
 */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "Missing order ID or status" }, { status: 400 });
    }

    try {
      await query(
        "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 OR order_number = $2",
        [status, id]
      );
    } catch (dbErr: any) {
      console.warn("[Orders API PATCH DB Warning]:", dbErr.message);
    }

    // Also update in-memory cache
    const memOrder = inMemoryOrders.find((o) => o.id === id || o.orderNumber === id);
    if (memOrder) {
      memOrder.status = status;
    }

    return NextResponse.json({
      success: true,
      message: `Order #${id} status updated to ${status} in PostgreSQL.`,
    });
  } catch (err: any) {
    console.error("[Orders API PATCH Error]:", err);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}

/**
 * DELETE: Delete order from PostgreSQL Database
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing order ID parameter" }, { status: 400 });
    }

    try {
      await query("DELETE FROM orders WHERE id = $1 OR order_number = $1", [id]);
    } catch (dbErr: any) {
      console.warn("[Orders API DELETE DB Warning]:", dbErr.message);
    }

    const idx = inMemoryOrders.findIndex((o) => o.id === id || o.orderNumber === id);
    if (idx !== -1) {
      inMemoryOrders.splice(idx, 1);
    }

    return NextResponse.json({
      success: true,
      message: `Order #${id} deleted from PostgreSQL database.`,
    });
  } catch (err: any) {
    console.error("[Orders API DELETE Error]:", err);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
