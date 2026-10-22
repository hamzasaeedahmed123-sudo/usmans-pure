import nodemailer from "nodemailer";

export interface OrderEmailPayload {
  orderId: string;
  customerName: string;
  customerEmail?: string;
  phone: string;
  address: string;
  city: string;
  items: Array<{
    name: string;
    pack: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  paymentMethod: string;
  notes?: string;
  date: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "mail.usmanspure.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || "orders@usmanspure.com";
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    console.warn("[SMTP Notice] SMTP_PASS not set. Emails will be logged to console in development mode.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Dispatch automated customer receipt and store owner notification via Namecheap Business SMTP
 */
export async function sendOrderConfirmationEmail(order: OrderEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "orders@usmanspure.com";
  const senderEmail = process.env.SMTP_USER || "orders@usmanspure.com";

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #EFEAE2;">
        <td style="padding: 10px 0; font-weight: 500; color: #1E1510;">${item.name} (${item.pack})</td>
        <td style="padding: 10px 0; text-align: center; color: #55483D;">${item.quantity}</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #1E1510;">₨${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 24px; border-radius: 16px; border: 1px solid #EFEAE2;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #8B3A22;">
        <h1 style="color: #1E1510; font-size: 24px; margin: 0 0 6px 0; font-family: Georgia, serif;">Usman's Pure Products</h1>
        <p style="color: #8B3A22; font-size: 13px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 1px;">100% Traditional Stone-Ground • Order Confirmation</p>
      </div>

      <div style="padding: 20px 0;">
        <p style="font-size: 15px; color: #1E1510; margin-top: 0;">
          Assalam-o-Alaikum <strong>${order.customerName}</strong>,
        </p>
        <p style="font-size: 14px; color: #55483D; line-height: 1.6;">
          Shukriya! Aapka order <strong>#${order.orderId}</strong> receive ho gaya hai. Hamari team aapke pure stone-ground essentials ko taaza chakki mill karke packing queue mein daal chuki hai.
        </p>

        <div style="background: #FFFFFF; border-radius: 12px; padding: 18px; border: 1px solid #EFEAE2; margin: 18px 0;">
          <h3 style="font-size: 14px; color: #8B3A22; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 1.5px solid #EFEAE2; color: #8C7D6F; text-align: left;">
                <th style="padding-bottom: 8px;">Item</th>
                <th style="padding-bottom: 8px; text-align: center;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding-top: 12px; color: #55483D;">Subtotal</td>
                <td style="padding-top: 12px; text-align: right; font-weight: 500;">₨${order.subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 6px 0; color: #55483D;">Delivery Charges</td>
                <td style="padding: 6px 0; text-align: right; font-weight: 500; color: ${order.shippingFee === 0 ? "#15803d" : "#1E1510"};">
                  ${order.shippingFee === 0 ? "FREE (Orders over Rs 10,000)" : `₨${order.shippingFee.toLocaleString()}`}
                </td>
              </tr>
              <tr style="border-top: 1.5px solid #1E1510;">
                <td colspan="2" style="padding-top: 10px; font-weight: bold; font-size: 15px; color: #1E1510;">Grand Total</td>
                <td style="padding-top: 10px; text-align: right; font-weight: bold; font-size: 16px; color: #8B3A22;">₨${order.grandTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style="background: #FFFFFF; border-radius: 12px; padding: 16px; border: 1px solid #EFEAE2; font-size: 13px; color: #55483D; line-height: 1.6;">
          <h4 style="margin: 0 0 8px 0; color: #1E1510; font-size: 13px;">Shipping &amp; Payment Details</h4>
          <div><strong>Address:</strong> ${order.address}, ${order.city}</div>
          <div><strong>Phone:</strong> ${order.phone}</div>
          <div><strong>Payment Method:</strong> ${order.paymentMethod}</div>
          ${order.notes ? `<div><strong>Special Notes:</strong> ${order.notes}</div>` : ""}
        </div>
      </div>

      <div style="text-align: center; border-top: 1px solid #EFEAE2; padding-top: 16px; font-size: 12px; color: #8C7D6F;">
        <p style="margin: 0 0 6px 0;">Direct WhatsApp Support: <strong>+92 300 8472910</strong></p>
        <p style="margin: 0;">Usman's Pure Products — 100% Stone-Ground Whole Wheat Atta &amp; Organic Spices, Pakistan.</p>
      </div>
    </div>
  `;

  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Order Email Simulation] Order #${order.orderId} receipt created for ${order.customerName} (${order.phone}) -> Grand Total: ₨${order.grandTotal}`);
    return { success: true, simulated: true };
  }

  const recipients = [adminEmail];
  if (order.customerEmail && order.customerEmail.includes("@") && !order.customerEmail.endsWith("@customer.pk")) {
    recipients.push(order.customerEmail);
  }

  try {
    await transporter.sendMail({
      from: `"Usman's Pure Products" <${senderEmail}>`,
      to: recipients.join(", "),
      subject: `Order Confirmation #${order.orderId} - Usman's Pure Products`,
      html: emailHtml,
    });
    return { success: true, simulated: false };
  } catch (error) {
    console.error("[SMTP Error] Failed to send order email:", error);
    return { success: false, error };
  }
}

/**
 * Send 6-digit OTP verification email for admin profile credential changes
 */
export async function sendAdminOtpEmail(targetEmail: string, otpCode: string) {
  const senderEmail = process.env.SMTP_USER || "orders@usmanspure.com";
  const transporter = getTransporter();

  const otpEmailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; background: #FAF7F2; padding: 24px; border-radius: 16px; border: 1px solid #EFEAE2;">
      <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #8B3A22;">
        <h2 style="color: #1E1510; margin: 0; font-family: Georgia, serif;">Usman's Pure Admin Security</h2>
        <p style="color: #8B3A22; font-size: 12px; font-weight: bold; margin: 4px 0 0 0; text-transform: uppercase;">Credential Change Verification</p>
      </div>

      <div style="padding: 24px 0; text-align: center;">
        <p style="font-size: 14px; color: #55483D; margin-top: 0;">
          A request was initiated to update administrator credentials (email or password) for the Usman's Pure Master Portal.
        </p>

        <div style="display: inline-block; background: #1E1510; color: #FFFFFF; font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 14px 28px; border-radius: 12px; margin: 16px 0;">
          ${otpCode}
        </div>

        <p style="font-size: 12px; color: #8C7D6F; margin: 12px 0 0 0;">
          This single-use OTP is valid for <strong>10 minutes</strong>. If you did not request this change, please ignore this email immediately.
        </p>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[Admin OTP Simulation] Security OTP for ${targetEmail}: [${otpCode}] (Valid for 10 minutes)`);
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: `"Usman's Pure Security" <${senderEmail}>`,
      to: targetEmail,
      subject: `Your Admin Verification Code: ${otpCode}`,
      html: otpEmailHtml,
    });
    return { success: true, simulated: false };
  } catch (error) {
    console.error("[SMTP Error] Failed to send OTP email:", error);
    return { success: false, error };
  }
}
