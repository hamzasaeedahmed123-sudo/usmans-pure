import { NextResponse } from "next/server";
import { backupOrder, generateWhatsAppOrderUrl, OrderBackupRecord } from "@/lib/ordersBackup";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 });
    }

    const orderId = body.orderNumber || `UPP-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateFormatted = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const itemsSummary = body.items
      .map((i: { name: string; pack: string; quantity: number }) => `${i.name} (${i.pack}) x ${i.quantity}`)
      .join(", ");

    const orderRecord: OrderBackupRecord = {
      orderId,
      date: dateFormatted,
      customerName: body.customerName || "Customer",
      phone: body.phone || "N/A",
      city: body.city || "Lahore",
      address: body.address || "N/A",
      items: body.items,
      itemsSummary,
      subtotal: body.subtotal || 0,
      shippingFee: body.shippingFee ?? (body.subtotal >= 10000 ? 0 : 250),
      grandTotal: body.totalAmount || 0,
      paymentMethod: body.paymentMethod || "Cash on Delivery (COD)",
      notes: body.notes,
      transactionId: body.transactionId,
      senderAccountTitle: body.senderAccountTitle,
    };

    // 1. Triple-Sync Channel 1: Instant WhatsApp URL formatting
    const whatsappUrl = generateWhatsAppOrderUrl(orderRecord);

    // 2. Triple-Sync Channel 2: Server-side JSON & Google Sheets Backup
    await backupOrder(orderRecord);

    // 3. Triple-Sync Channel 3: Namecheap SMTP automated email dispatch (Customer + Admin notification)
    await sendOrderConfirmationEmail({
      orderId: orderRecord.orderId,
      customerName: orderRecord.customerName,
      customerEmail: body.customerEmail,
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
    });

    return NextResponse.json({
      success: true,
      orderId,
      whatsappUrl,
      message: "Order successfully synced across backend backup, email dispatch, and WhatsApp routing.",
    });
  } catch (error) {
    console.error("[API Orders Error]:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
