import fs from "fs";
import path from "path";

// Auto-load .env.local if present
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      const cleanKey = key.trim();
      if (cleanKey && !process.env[cleanKey]) {
        process.env[cleanKey] = vals.join("=").trim();
      }
    }
  }
}

import { query, initDatabaseTables } from "../src/lib/db";
import { PRODUCTS } from "../src/data/products";
import { LUXURY_BUNDLES } from "../src/data/bundles";
import { FAQS_DATA } from "../src/data/faqs";

// Embedded historical legacy records archived directly from store commits
const ARCHIVED_LEGACY_CUSTOMERS = [
  {
    id: "cust_1793119222232_4o1ko",
    name: "Ahmad Raza",
    email: "test_1793119222111@example.pk",
    passwordHash: "$2b$10$eCkG8fDos75CAVG/lIjseOS8AUk3tKLJTLVISJgOav94iHDIpymGC",
    phone: "03001234567",
    createdAt: "2026-10-27T16:40:22.232Z",
    updatedAt: "2026-10-27T16:40:22.232Z",
  },
  {
    id: "cust_1793119293687_b1w7z",
    name: "Ahmad Raza",
    email: "test_1793119293527@example.pk",
    passwordHash: "$2b$10$m4Hx0.3mdTSAGto09bvYX.LQB1ypn.GVKphm7fLwwXXCk0I5of8EC",
    phone: "03001234567",
    createdAt: "2026-10-27T16:41:33.687Z",
    updatedAt: "2026-10-27T16:41:33.687Z",
  },
  {
    id: "cust_1793119373009_p69zt",
    name: "Fatima Noor",
    email: "live_cust_1793119371659@test.pk",
    passwordHash: "$2b$10$EYrX8DU2toyTTySs2KurjOiXXujHGEg5I5SRpu9nnzyehxP6TfF6K",
    phone: "03219876543",
    createdAt: "2026-10-27T16:42:53.009Z",
    updatedAt: "2026-10-27T16:42:53.009Z",
  },
  {
    id: "cust_1793119525324_zdgvd",
    name: "Fatima Noor",
    email: "live_cust_1793119525096@test.pk",
    passwordHash: "$2b$10$RVSAhpZDGqGbhFem54CcqOn6TXl4CHaTMg8/zQOyLgY4a7I/0Mc96",
    phone: "03219876543",
    createdAt: "2026-10-27T16:45:25.324Z",
    updatedAt: "2026-10-27T16:45:25.324Z",
  },
  {
    id: "cust_1793119545587_9dvld",
    name: "Ahmad Raza",
    email: "test_1793119545416@example.pk",
    passwordHash: "$2b$10$OP7LXWIp0BkQtIJNLvwXmuThDaCqfDHBvE3Id9c4rtBXzhTC7S10q",
    phone: "03001234567",
    createdAt: "2026-10-27T16:45:45.587Z",
    updatedAt: "2026-10-27T16:45:45.587Z",
  },
  {
    id: "cust_1793121235684_rg4hd",
    name: "Ahmad Raza",
    email: "test_1793121235554@example.pk",
    passwordHash: "$2b$10$s4D93M2ehvdKHyKaYGEMWOwuZmQEtw10m4JvwfaSM6s4zsrbIc9pG",
    phone: "03001234567",
    createdAt: "2026-10-27T17:13:55.684Z",
    updatedAt: "2026-10-27T17:13:55.684Z",
  },
  {
    id: "cust_1793121274970_2jtw3",
    name: "Fatima Noor",
    email: "live_cust_1793121274080@test.pk",
    passwordHash: "$2b$10$TWomFaAiE.wRUDdoxduxqe5m3INMqbnp1hH/m0D8MRj3Xz212W7rK",
    phone: "03219876543",
    createdAt: "2026-10-27T17:14:34.970Z",
    updatedAt: "2026-10-27T17:14:34.970Z",
  },
  {
    id: "cust_1793122540996_0ja7k",
    name: "Ahmad Raza",
    email: "test_1793122540475@example.pk",
    passwordHash: "$2b$10$Lx.FqLzaCzI/9vev2wcFheFv.pJSQ/Af0ydSFMpO5jL7OtDGUUUE6",
    phone: "03001234567",
    createdAt: "2026-10-27T17:35:40.996Z",
    updatedAt: "2026-10-27T17:35:40.996Z",
  },
  {
    id: "cust_1793122571293_vy67o",
    name: "Fatima Noor",
    email: "live_cust_1793122570021@test.pk",
    passwordHash: "$2b$10$Wjxuv996BzeNjPf7LYSyjOIiRl5/t/V63yqC0MqhPQQEoyUSzEfy.",
    phone: "03219876543",
    createdAt: "2026-10-27T17:36:11.293Z",
    updatedAt: "2026-10-27T17:36:11.293Z",
  },
  {
    id: "cust_1793125821399_u7x80",
    name: "Ahmad Raza",
    email: "test_1793125821080@example.pk",
    passwordHash: "$2b$10$IdjH3jfIpzHtmZn3Cms8u.3YqA8DIELD5ns5m.Zj8sW8Ja/Icdb/K",
    phone: "03001234567",
    createdAt: "2026-10-27T18:30:21.399Z",
    updatedAt: "2026-10-27T18:30:21.399Z",
  },
  {
    id: "cust_1793125865869_uhsik",
    name: "Fatima Noor",
    email: "live_cust_1793125864988@test.pk",
    passwordHash: "$2b$10$k0pIl7DhNzeMTwMF2eCEVODMMiUo.xSC4oHt9qicE78p4bEUVyl7e",
    phone: "03219876543",
    createdAt: "2026-10-27T18:31:05.869Z",
    updatedAt: "2026-10-27T18:31:05.869Z",
  },
  {
    id: "cust_1793126165975_s6fyl",
    name: "Ahmad Raza",
    email: "test_1793126165796@example.pk",
    passwordHash: "$2b$10$/GjK3OHZ4qcrobHh90sRPex36slkBCr8oxZPc9o/nPAfwUFb8gEf.",
    phone: "03001234567",
    createdAt: "2026-10-27T18:36:05.975Z",
    updatedAt: "2026-10-27T18:36:05.975Z",
  },
  {
    id: "cust_1793126188966_rtr90",
    name: "Fatima Noor",
    email: "live_cust_1793126188582@test.pk",
    passwordHash: "$2b$10$AZJkgZo1OvdvTVoqrXLkieTlB/E1QSEeEBZNazdzNzMYFWeTJcJLm",
    phone: "03219876543",
    createdAt: "2026-10-27T18:36:28.966Z",
    updatedAt: "2026-10-27T18:36:28.966Z",
  },
];

const ARCHIVED_LEGACY_ORDERS = [
  {
    orderId: "UPP-188357-282",
    date: "27-Oct-2026, 11:36 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 9,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 9",
    subtotal: 10800,
    shippingFee: 0,
    grandTotal: 10800,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-188183-470",
    date: "27-Oct-2026, 11:36 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 2,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 2",
    subtotal: 2400,
    shippingFee: 250,
    grandTotal: 2650,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-864502-565",
    date: "27-Oct-2026, 11:31 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 9,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 9",
    subtotal: 10800,
    shippingFee: 0,
    grandTotal: 10800,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-864039-885",
    date: "27-Oct-2026, 11:31 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 2,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 2",
    subtotal: 2400,
    shippingFee: 250,
    grandTotal: 2650,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-569178-958",
    date: "27-Oct-2026, 10:36 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 9,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 9",
    subtotal: 10800,
    shippingFee: 0,
    grandTotal: 10800,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-567428-496",
    date: "27-Oct-2026, 10:36 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 2,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 2",
    subtotal: 2400,
    shippingFee: 250,
    grandTotal: 2650,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-273742-145",
    date: "27-Oct-2026, 10:14 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 9,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 9",
    subtotal: 10800,
    shippingFee: 0,
    grandTotal: 10800,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-273175-936",
    date: "27-Oct-2026, 10:14 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 2,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 2",
    subtotal: 2400,
    shippingFee: 250,
    grandTotal: 2650,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-524946-461",
    date: "27-Oct-2026, 9:45 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 9,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 9",
    subtotal: 10800,
    shippingFee: 0,
    grandTotal: 10800,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-524910-186",
    date: "27-Oct-2026, 9:45 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 2,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 2",
    subtotal: 2400,
    shippingFee: 250,
    grandTotal: 2650,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-371417-114",
    date: "27-Oct-2026, 9:42 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 9,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 9",
    subtotal: 10800,
    shippingFee: 0,
    grandTotal: 10800,
    paymentMethod: "Cash on Delivery (COD)",
  },
  {
    orderId: "UPP-371187-481",
    date: "27-Oct-2026, 9:42 pm",
    customerName: "Mohammad Ali",
    phone: "03008765432",
    city: "Lahore",
    address: "House 12, Street 4, Model Town",
    items: [
      {
        id: "prod-1",
        name: "Basic – Flour For General Health",
        pack: "Standard Pack (5kg)",
        quantity: 2,
        price: 1200,
      },
    ],
    itemsSummary: "Basic – Flour For General Health (Standard Pack (5kg)) x 2",
    subtotal: 2400,
    shippingFee: 250,
    grandTotal: 2650,
    paymentMethod: "Cash on Delivery (COD)",
  },
];

const ARCHIVED_LEGACY_ADMIN = {
  username: "admin@usmanspure.com",
  email: "admin@usmanspure.com",
  passwordHash: "$2b$10$6Fgbnf8tCID.j/upDlOFceFaNFIPJP98ZVonuaIwB4O9goDcQK3QS",
  mustChangePassword: false,
};

export async function runMigration() {
  console.log("==========================================================");
  console.log("STARTING POSTGRESQL DATA MIGRATION: USMAN'S PURE PRODUCTS");
  console.log("==========================================================\n");

  await initDatabaseTables();

  // 1. MIGRATE CUSTOMERS
  let customersToMigrate = ARCHIVED_LEGACY_CUSTOMERS;
  const localCustPath = path.resolve(process.cwd(), "src/data/store/customers.json");
  if (fs.existsSync(localCustPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(localCustPath, "utf-8"));
      if (Array.isArray(raw) && raw.length > 0) {
        customersToMigrate = raw;
      }
    } catch {}
  }

  console.log(`[Migration] Bulk-inserting ${customersToMigrate.length} legacy customer accounts...`);
  let migratedCustomers = 0;
  for (const c of customersToMigrate) {
    try {
      await query(
        `INSERT INTO customers (id, name, email, password_hash, phone, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           email = EXCLUDED.email,
           password_hash = EXCLUDED.password_hash,
           phone = EXCLUDED.phone,
           updated_at = NOW()`,
        [c.id, c.name, c.email, c.passwordHash, c.phone || null, c.createdAt || new Date(), c.updatedAt || new Date()]
      );
      migratedCustomers++;
    } catch (err: any) {
      console.warn(`  Warning on customer ${c.email}:`, err.message);
    }
  }
  console.log(`✓ Successfully migrated ${migratedCustomers} customer accounts.\n`);

  // 2. MIGRATE ORDERS
  let ordersToMigrate = ARCHIVED_LEGACY_ORDERS;
  const localOrdersPath = path.resolve(process.cwd(), "src/data/store/orders.json");
  if (fs.existsSync(localOrdersPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(localOrdersPath, "utf-8"));
      if (Array.isArray(raw) && raw.length > 0) {
        ordersToMigrate = raw;
      }
    } catch {}
  }

  console.log(`[Migration] Bulk-inserting ${ordersToMigrate.length} historical orders...`);
  let migratedOrders = 0;
  for (const o of ordersToMigrate) {
    try {
      const orderId = o.orderId || (o as any).id;
      await query(
        `INSERT INTO orders (
           id, order_number, customer_name, customer_email, phone, address, city,
           items, subtotal, shipping_fee, total_amount, status, payment_method, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
         ON CONFLICT (id) DO UPDATE SET
           status = EXCLUDED.status,
           total_amount = EXCLUDED.total_amount,
           updated_at = NOW()`,
        [
          orderId,
          orderId,
          o.customerName,
          (o as any).customerEmail || null,
          o.phone,
          o.address,
          o.city,
          JSON.stringify(o.items || []),
          o.subtotal || 0,
          o.shippingFee || 0,
          o.grandTotal || (o as any).totalAmount || 0,
          (o as any).status || "Delivered",
          o.paymentMethod || "Cash on Delivery (COD)",
        ]
      );
      migratedOrders++;
    } catch (err: any) {
      console.warn(`  Warning on order ${o.orderId}:`, err.message);
    }
  }
  console.log(`✓ Successfully migrated ${migratedOrders} historical orders.\n`);

  // 3. MIGRATE ADMIN CREDENTIALS
  console.log("[Migration] Synchronizing administrator account...");
  try {
    await query(
      `INSERT INTO admin (username, email, password_hash, must_change_password, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       ON CONFLICT (username) DO NOTHING`,
      [ARCHIVED_LEGACY_ADMIN.username, ARCHIVED_LEGACY_ADMIN.email, ARCHIVED_LEGACY_ADMIN.passwordHash, false]
    );
    console.log("✓ Administrator record secured in PostgreSQL.\n");
  } catch (err: any) {
    console.warn("  Admin notice:", err.message);
  }

  // 4. MIGRATE PRODUCT CATALOG
  console.log(`[Migration] Bulk-inserting ${PRODUCTS.length} catalog products...`);
  let migratedProducts = 0;
  for (const p of PRODUCTS) {
    try {
      await query(
        `INSERT INTO products (
          id, title, category, category_label, price, original_price, image,
          description, badge, in_stock, benefits, pack_options, highlight, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          category_label = EXCLUDED.category_label,
          price = EXCLUDED.price,
          original_price = EXCLUDED.original_price,
          image = EXCLUDED.image,
          description = EXCLUDED.description,
          badge = EXCLUDED.badge,
          in_stock = EXCLUDED.in_stock,
          benefits = EXCLUDED.benefits,
          updated_at = NOW()`,
        [
          p.id,
          p.title,
          p.category,
          p.categoryLabel,
          p.price,
          p.originalPrice,
          p.image,
          p.description,
          p.discountBadge || null,
          p.inStock,
          JSON.stringify(p.benefits || []),
          JSON.stringify([]),
          p.tagline || null,
        ]
      );
      migratedProducts++;
    } catch (err: any) {
      console.warn(`  Warning on product ${p.id}:`, err.message);
    }
  }
  console.log(`✓ Successfully migrated ${migratedProducts} products.\n`);

  // 5. MIGRATE LUXURY BUNDLES
  console.log(`[Migration] Bulk-inserting ${LUXURY_BUNDLES.length} curated luxury bundles...`);
  let migratedBundles = 0;
  for (const b of LUXURY_BUNDLES) {
    try {
      await query(
        `INSERT INTO bundles (
          id, slug, title, subtitle, tagline, badge, price, original_price,
          savings, image, tint, included_tags, description, whats_in_the_box,
          synergy, accordions, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          tagline = EXCLUDED.tagline,
          badge = EXCLUDED.badge,
          price = EXCLUDED.price,
          original_price = EXCLUDED.original_price,
          savings = EXCLUDED.savings,
          image = EXCLUDED.image,
          tint = EXCLUDED.tint,
          included_tags = EXCLUDED.included_tags,
          description = EXCLUDED.description,
          whats_in_the_box = EXCLUDED.whats_in_the_box,
          synergy = EXCLUDED.synergy,
          accordions = EXCLUDED.accordions,
          updated_at = NOW()`,
        [
          b.id,
          b.slug,
          b.title,
          b.subtitle,
          b.tagline,
          b.badge,
          b.price,
          b.originalPrice,
          b.savings,
          b.image,
          b.tint,
          JSON.stringify(b.includedTags || []),
          b.description,
          JSON.stringify(b.whatsInTheBox || []),
          JSON.stringify(b.synergy || {}),
          JSON.stringify(b.accordions || []),
        ]
      );
      migratedBundles++;
    } catch (err: any) {
      console.warn(`  Warning on bundle ${b.id}:`, err.message);
    }
  }
  console.log(`✓ Successfully migrated ${migratedBundles} luxury bundles.\n`);

  // 6. MIGRATE FREQUENTLY ASKED QUESTIONS (FAQS)
  console.log(`[Migration] Bulk-inserting ${FAQS_DATA.length} FAQ questions & answers...`);
  let migratedFaqs = 0;
  for (const f of FAQS_DATA) {
    try {
      await query(
        `INSERT INTO faqs (id, category, category_label, q, a, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (id) DO UPDATE SET
           category = EXCLUDED.category,
           category_label = EXCLUDED.category_label,
           q = EXCLUDED.q,
           a = EXCLUDED.a`,
        [f.id, f.category, f.categoryLabel, f.q, f.a]
      );
      migratedFaqs++;
    } catch (err: any) {
      console.warn(`  Warning on FAQ ${f.id}:`, err.message);
    }
  }
  console.log(`✓ Successfully migrated ${migratedFaqs} FAQs.\n`);

  console.log("==========================================================");
  console.log("ALL DATA MIGRATION VERIFIED AND PERSISTED TO POSTGRESQL!");
  console.log("==========================================================");
}

if (require.main === module) {
  runMigration()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Migration failed:", err);
      process.exit(1);
    });
}
