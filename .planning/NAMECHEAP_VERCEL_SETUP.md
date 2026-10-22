# Namecheap & Vercel Production Deployment Architecture Guide
**Store:** Usman's Pure Products (`usmanspure.com`)

---

## 1. Vercel Custom Domain Configuration (Namecheap Advanced DNS)

Log in to **Namecheap Dashboard** -> **Domain List** -> Click **Manage** on `usmanspure.com` -> Select **Advanced DNS**.

### Required DNS Records:

| Type | Host | Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic | Points root domain (`usmanspure.com`) to Vercel edge network |
| **CNAME Record** | `www` | `cname.vercel-dns.com.` | Automatic | Points `www.usmanspure.com` to Vercel |

---

## 2. Namecheap Business Email Configuration (Private Email SMTP)

Under **Advanced DNS** -> **Mail Settings**, select **Custom MX** (or **Namecheap Private Email**):

| Type | Host | Value | Priority / TTL |
| :--- | :--- | :--- | :--- |
| **MX Record** | `@` | `mail.privateemail.com.` | 10 |
| **TXT Record** | `@` | `v=spf1 include:spf.privateemail.com ~all` | Automatic |
| **CNAME Record** | `mail` | `mail.privateemail.com.` | Automatic |

---

## 3. Vercel Environment Variables (`Project Settings` -> `Environment Variables`)

Add the following environment variables to your Vercel project dashboard:

```bash
# Administrator Authentication
ADMIN_EMAIL=admin@usmanspure.com
ADMIN_PASSWORD=SetSecurePasswordHere

# Namecheap Private Email SMTP Credentials
SMTP_HOST=mail.usmanspure.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=orders@usmanspure.com
SMTP_PASS=YourNamecheapMailboxPassword
ADMIN_NOTIFICATION_EMAIL=orders@usmanspure.com

# Triple-Sync Backup: Google Sheets Webhook (Optional)
GOOGLE_SHEETS_WEBHOOK_URL=

# WhatsApp Order Desk Routing
NEXT_PUBLIC_WHATSAPP_NUMBER=923008472910
```

---

## 4. Triple-Sync Architecture Overview

1. **WhatsApp Redirection**:
   - Customer orders automatically generate a structured URL opening WhatsApp chat with `+92 300 8472910`.
2. **Namecheap Business Email**:
   - Customer receives branded HTML receipt.
   - Admin receives immediate new order notification.
3. **Server-side Backup & Google Sheets**:
   - Every order is logged to `src/data/orders_backup.json` and posted to `GOOGLE_SHEETS_WEBHOOK_URL` if configured.
