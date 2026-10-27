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

function escapeHtml(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "mail.usmanspure.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || "orders@usmanspure.com";
  const pass = process.env.SMTP_PASS;

  if (!pass) {
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
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

/**
 * Dispatch automated customer receipt and store owner notification via Business SMTP
 */
export async function sendOrderConfirmationEmail(order: OrderEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "orders@usmanspure.com";
  const senderEmail = process.env.SMTP_USER || "orders@usmanspure.com";

  const safeCustomerName = escapeHtml(order.customerName);
  const safeOrderId = escapeHtml(order.orderId);
  const safeAddress = escapeHtml(order.address);
  const safeCity = escapeHtml(order.city);
  const safePhone = escapeHtml(order.phone);
  const safePaymentMethod = escapeHtml(order.paymentMethod);
  const safeNotes = order.notes ? escapeHtml(order.notes) : "";

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #EFEAE2;">
        <td style="padding: 10px 0; font-weight: 500; color: #1E1510;">${escapeHtml(item.name)} (${escapeHtml(item.pack)})</td>
        <td style="padding: 10px 0; text-align: center; color: #55483D;">${Number(item.quantity)}</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #1E1510;">₨${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 24px; border-radius: 16px; border: 1px solid #EFEAE2;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #8B3A22;">
        <h1 style="color: #1E1510; font-size: 24px; margin: 0 0 6px 0; font-family: Georgia, serif;">Usman's Pure Products</h1>
        <p style="color: #8B3A22; font-size: 13px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Traditional Stone-Ground • Order Confirmation</p>
      </div>

      <div style="padding: 20px 0;">
        <p style="font-size: 15px; color: #1E1510; margin-top: 0;">
          Assalam-o-Alaikum <strong>${safeCustomerName}</strong>,
        </p>
        <p style="font-size: 14px; color: #55483D; line-height: 1.6;">
          Shukriya! Aapka order <strong>#${safeOrderId}</strong> receive ho gaya hai. Hamari team aapke pure stone-ground essentials ko taaza chakki mill karke packing queue mein daal chuki hai.
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
          <div><strong>Address:</strong> ${safeAddress}, ${safeCity}</div>
          <div><strong>Phone:</strong> ${safePhone}</div>
          <div><strong>Payment Method:</strong> ${safePaymentMethod}</div>
          ${safeNotes ? `<div><strong>Special Notes:</strong> ${safeNotes}</div>` : ""}
        </div>
      </div>

      <div style="text-align: center; border-top: 1px solid #EFEAE2; padding-top: 16px; font-size: 12px; color: #8C7D6F;">
        <p style="margin: 0 0 6px 0;">Direct WhatsApp Support: <strong>+92 300 8472910</strong></p>
        <p style="margin: 0;">Usman's Pure Products — Traditional Stone-Ground Whole Wheat Atta &amp; Organic Spices, Pakistan.</p>
      </div>
    </div>
  `;

  const transporter = getTransporter();

  if (!transporter) {
    return { success: true, simulated: true, reason: "SMTP_PASS not configured" };
  }

  const recipients = [adminEmail];
  if (order.customerEmail && order.customerEmail.includes("@") && !order.customerEmail.endsWith("@customer.pk")) {
    recipients.push(order.customerEmail);
  }

  try {
    await transporter.sendMail({
      from: `"Usman's Pure Products" <${senderEmail}>`,
      to: recipients.join(", "),
      subject: `Order Confirmation #${safeOrderId} - Usman's Pure Products`,
      html: emailHtml,
    });
    return { success: true, simulated: false };
  } catch (err) {
    console.error("[SMTP Error] Failed to send order confirmation email:", err);
    return { success: false, error: err };
  }
}

/**
 * Dispatch admin security verification code
 */
export async function sendAdminOtpEmail(targetEmail: string, code: string) {
  const safeEmail = escapeHtml(targetEmail);
  const safeCode = escapeHtml(code);
  const transporter = getTransporter();
  const senderEmail = process.env.SMTP_USER || "security@usmanspure.com";

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; background: #FAF7F2; padding: 24px; border-radius: 12px; border: 1px solid #EFEAE2;">
      <h2 style="color: #1E1510; font-size: 20px; margin-top: 0;">Admin Security Verification</h2>
      <p style="color: #55483D; font-size: 14px;">A credential change was requested for <strong>${safeEmail}</strong>.</p>
      <div style="background: #FFFFFF; border: 2px dashed #8B3A22; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #8B3A22;">${safeCode}</div>
      </div>
      <p style="color: #8C7D6F; font-size: 12px; margin: 0;">This single-use code expires in 10 minutes. If you did not initiate this request, inspect your server logs immediately.</p>
    </div>
  `;

  if (!transporter) {
    return { success: true, simulated: true, reason: "SMTP_PASS not configured" };
  }

  try {
    await transporter.sendMail({
      from: `"Usman's Pure Security" <${senderEmail}>`,
      to: targetEmail,
      subject: `Admin Security Verification Code`,
      html: emailHtml,
    });
    return { success: true, simulated: false };
  } catch (err) {
    console.error("[SMTP Error] Failed to send OTP email:", err);
    return { success: false, error: err };
  }
}

/**
 * Dispatch secure password reset link to administrator email
 */
export async function sendPasswordResetEmail(
  targetEmail: string,
  resetLink: string
): Promise<{ success: boolean; error?: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    const errorMsg =
      "Email delivery failed: SMTP credentials are not configured in environment (SMTP_PASS is missing in .env.local).";
    console.error("[SMTP Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }

  const safeEmail = escapeHtml(targetEmail);
  const safeLink = escapeHtml(resetLink);
  const senderEmail = process.env.SMTP_USER || "orders@usmanspure.com";

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 540px; margin: 0 auto; background: #FAF7F2; padding: 28px; border-radius: 12px; border: 1px solid #EFEAE2;">
      <div style="text-align: center; padding-bottom: 18px; border-bottom: 2px solid #8B3A22;">
        <h1 style="color: #1E1510; font-size: 22px; margin: 0 0 6px 0; font-family: Georgia, serif;">Usman's Pure Products</h1>
        <p style="color: #8B3A22; font-size: 12px; font-weight: bold; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">Cryptographic Admin Gateway</p>
      </div>

      <div style="padding: 24px 0;">
        <h2 style="color: #1E1510; font-size: 18px; margin: 0 0 12px 0;">Password Reset Request</h2>
        <p style="color: #55483D; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
          A password reset was requested for the administrator account (<strong>${safeEmail}</strong>). Click the button below to establish a new password for your store management portal.
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${safeLink}" style="display: inline-block; background: #8B3A22; color: #FFFFFF; font-weight: bold; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(139, 58, 34, 0.25);">
            Reset Admin Password
          </a>
        </div>

        <p style="color: #8C7D6F; font-size: 12px; line-height: 1.5; margin: 20px 0 0 0;">
          This link will expire in <strong>1 hour</strong>. For security, it is single-use only.
        </p>
        <p style="color: #A09489; font-size: 11px; word-break: break-all; margin: 12px 0 0 0;">
          Direct URL: <a href="${safeLink}" style="color: #8B3A22;">${safeLink}</a>
        </p>
        <p style="color: #A09489; font-size: 11px; margin: 16px 0 0 0;">
          If you did not request this password reset, no action is required. Your current password remains active and secure.
        </p>
      </div>

      <div style="border-top: 1px solid #EFEAE2; padding-top: 16px; text-align: center; font-size: 11px; color: #A09489;">
        Usman's Pure &bull; Automated Security Service &bull; ${new Date().getFullYear()}
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Usman's Pure Security" <${senderEmail}>`,
      to: targetEmail,
      subject: "Password Reset Request - Usman's Pure Admin Portal",
      html: emailHtml,
    });
    console.log(`[SMTP Success] Password reset link dispatched to ${targetEmail}`);
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[SMTP Error] Failed to send password reset email:", errorMsg);
    return { success: false, error: `SMTP server error: ${errorMsg}` };
  }
}
