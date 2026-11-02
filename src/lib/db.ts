import { Pool, PoolConfig } from "pg";

/**
 * Production-Ready PostgreSQL Database Manager
 * Supports Supabase, Neon, AWS RDS, Railway, and local PostgreSQL instances.
 */

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  "";

const isProduction = process.env.NODE_ENV === "production";
const isRemoteUrl =
  connectionString.includes("supabase.co") ||
  connectionString.includes("neon.tech") ||
  connectionString.includes("sslmode=require") ||
  connectionString.includes(".com");

const poolConfig: PoolConfig = {
  connectionString: connectionString || undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ...(isRemoteUrl || (isProduction && connectionString)
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
};

// Global singleton pattern to prevent multiple pool instances during Next.js hot reload
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool: Pool = globalForPg.pgPool || new Pool(poolConfig);

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

let isInitialized = false;

/**
 * Execute parameterized SQL query safely
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not configured. Please set DATABASE_URL in your environment variables."
    );
  }

  // Ensure tables exist before running queries
  if (!isInitialized) {
    await initDatabaseTables().catch((err) => {
      console.warn("[PostgreSQL Init Notice] Schema check encountered error:", err.message);
    });
  }

  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows as T[], rowCount: res.rowCount };
  } finally {
    client.release();
  }
}

/**
 * Creates database schemas and tables if they do not already exist
 */
export async function initDatabaseTables(): Promise<void> {
  if (!connectionString) return;

  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1. Admin Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS admin (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          must_change_password BOOLEAN DEFAULT FALSE,
          reset_token TEXT,
          reset_token_expires BIGINT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 2. Customers Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS customers (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          phone VARCHAR(50),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 3. Orders Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(100) PRIMARY KEY,
          order_number VARCHAR(100) NOT NULL,
          customer_name VARCHAR(255) NOT NULL,
          customer_email VARCHAR(255),
          phone VARCHAR(50) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          items JSONB NOT NULL,
          subtotal NUMERIC(12, 2) DEFAULT 0,
          shipping_fee NUMERIC(12, 2) DEFAULT 0,
          total_amount NUMERIC(12, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'Pending',
          payment_method VARCHAR(100) DEFAULT 'Cash on Delivery (COD)',
          notes TEXT,
          transaction_id VARCHAR(255),
          sender_account_title VARCHAR(255),
          receipt_image TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 4. Products Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          category_label VARCHAR(100),
          price NUMERIC(12, 2) NOT NULL,
          original_price NUMERIC(12, 2),
          image TEXT,
          description TEXT,
          badge VARCHAR(100),
          in_stock BOOLEAN DEFAULT TRUE,
          benefits JSONB,
          pack_options JSONB,
          highlight TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 5. Reviews Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS reviews (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          city VARCHAR(100) NOT NULL,
          product VARCHAR(255) NOT NULL,
          rating INT NOT NULL DEFAULT 5,
          review TEXT NOT NULL,
          verified BOOLEAN DEFAULT TRUE,
          date VARCHAR(50),
          status VARCHAR(50) DEFAULT 'Approved',
          photos JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 6. Banners Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS banners (
          id VARCHAR(100) PRIMARY KEY,
          badge VARCHAR(100),
          title VARCHAR(255) NOT NULL,
          discount_tag VARCHAR(100),
          description TEXT,
          link VARCHAR(255),
          button_text VARCHAR(100),
          bg_color VARCHAR(50),
          enabled BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 7. Settings Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS settings (
          id VARCHAR(50) PRIMARY KEY DEFAULT 'primary',
          free_shipping_threshold NUMERIC(12, 2) DEFAULT 10000,
          flat_shipping_fee NUMERIC(12, 2) DEFAULT 250,
          support_phone VARCHAR(50),
          support_email VARCHAR(255),
          store_open BOOLEAN DEFAULT TRUE,
          payment_credentials JSONB,
          cms_content JSONB,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Indices for high performance lookups
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
        CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      `);

      await client.query("COMMIT");
      isInitialized = true;
    } catch (txErr) {
      await client.query("ROLLBACK");
      throw txErr;
    } finally {
      client.release();
    }
  } catch (err: any) {
    // If database is not reachable yet, log warning rather than halting app boot
    console.warn("[PostgreSQL Notice] Database connection warning:", err.message);
  }
}
