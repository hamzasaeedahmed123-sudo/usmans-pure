import fs from "fs";
import path from "path";

export interface OrderBackupRecord {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  items: Array<{
    name: string;
    pack: string;
    quantity: number;
    price: number;
  }>;
  itemsSummary: string;
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  paymentMethod: string;
  notes?: string;
  transactionId?: string;
  senderAccountTitle?: string;
}

const BACKUP_FILE_PATH = path.join(process.cwd(), "src", "data", "orders_backup.json");

/**
 * Persists order to server JSON file and optionally dispatches to Google Sheets Webhook
 */
export async function backupOrder(order: OrderBackupRecord) {
  // 1. Server-side file persistence
  try {
    let existingOrders: OrderBackupRecord[] = [];
    if (fs.existsSync(BACKUP_FILE_PATH)) {
      const fileData = fs.readFileSync(BACKUP_FILE_PATH, "utf-8");
      try {
        existingOrders = JSON.parse(fileData);
      } catch {
        existingOrders = [];
      }
    }
    existingOrders.unshift(order);
    // Keep last 1,000 orders
    if (existingOrders.length > 1000) {
      existingOrders = existingOrders.slice(0, 1000);
    }
    fs.writeFileSync(BACKUP_FILE_PATH, JSON.stringify(existingOrders, null, 2), "utf-8");
    console.log(`[Order Backup] Saved #${order.orderId} to server-side file.`);
  } catch (fileErr) {
    console.warn("[Order Backup Warning] Could not write to local JSON file (likely read-only serverless environment):", fileErr);
  }

  // 2. Google Sheets Webhook sync (if configured)
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsWebhookUrl) {
    try {
      const payload = {
        date: order.date,
        orderId: order.orderId,
        customerName: order.customerName,
        phone: order.phone,
        city: order.city,
        address: order.address,
        items: order.itemsSummary,
        totalAmount: order.grandTotal,
        paymentMethod: order.paymentMethod,
        notes: order.notes || "",
        transactionId: order.transactionId || "",
      };

      await fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(`[Order Backup] Dispatched #${order.orderId} to Google Sheets Webhook.`);
    } catch (sheetErr) {
      console.error("[Order Backup Error] Failed to dispatch to Google Sheets:", sheetErr);
    }
  }

  return { success: true };
}

/**
 * Generate official structured WhatsApp message and direct URL for +92 300 8472910
 */
export function generateWhatsAppOrderUrl(order: OrderBackupRecord) {
  const storeWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923008472910";
  const cleanNumber = storeWhatsAppNumber.replace(/[^0-9]/g, "");

  const itemsList = order.items
    .map((i) => `• ${i.name} (${i.pack}) x ${i.quantity} = ₨${(i.price * i.quantity).toLocaleString()}`)
    .join("\n");

  const deliveryNote = order.shippingFee === 0 ? "FREE Delivery (Order Rs 10,000+)" : `₨${order.shippingFee.toLocaleString()}`;

  const messageText = `Assalam-o-Alaikum Usman's Pure Products! 🌿\n\n*NEW ORDER CONFIRMATION*\n*Order ID:* #${order.orderId}\n*Date:* ${order.date}\n\n*Items Ordered:*\n${itemsList}\n\n*Subtotal:* ₨${order.subtotal.toLocaleString()}\n*Delivery Charges:* ${deliveryNote}\n*Grand Total:* ₨${order.grandTotal.toLocaleString()}\n\n*Delivery Address:*\n*Name:* ${order.customerName}\n*Phone:* ${order.phone}\n*City:* ${order.city}\n*Address:* ${order.address}\n*Payment Method:* ${order.paymentMethod}${order.transactionId ? `\n*Transaction ID / TID:* ${order.transactionId}` : ""}${order.senderAccountTitle ? `\n*Sender Title:* ${order.senderAccountTitle}` : ""}${order.notes ? `\n*Special Instructions:* ${order.notes}` : ""}\n\nPlease confirm dispatch and delivery timeframe. Shukriya!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}
