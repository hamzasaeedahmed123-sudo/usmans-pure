import { query } from "@/lib/db";

export interface StoredCustomer {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory cache fallback for resilient handling
const memoryCustomers = new Map<string, StoredCustomer>();

export async function findCustomerByEmail(email: string): Promise<StoredCustomer | null> {
  const target = email.trim().toLowerCase();
  try {
    const res = await query(
      "SELECT id, name, email, password_hash, phone, created_at, updated_at FROM customers WHERE LOWER(email) = $1 LIMIT 1",
      [target]
    );

    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        passwordHash: row.password_hash,
        phone: row.phone || undefined,
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
      };
    }
  } catch (err: any) {
    console.warn("[Customer Store] Database query warning:", err.message);
  }

  return memoryCustomers.get(target) || null;
}

export async function findCustomerById(id: string): Promise<StoredCustomer | null> {
  try {
    const res = await query(
      "SELECT id, name, email, password_hash, phone, created_at, updated_at FROM customers WHERE id = $1 LIMIT 1",
      [id]
    );

    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        passwordHash: row.password_hash,
        phone: row.phone || undefined,
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
      };
    }
  } catch (err: any) {
    console.warn("[Customer Store] Database query warning:", err.message);
  }

  for (const c of memoryCustomers.values()) {
    if (c.id === id) return c;
  }
  return null;
}

export async function createCustomer(data: {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
}): Promise<StoredCustomer> {
  const customerId = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const cleanEmail = data.email.trim().toLowerCase();
  const cleanName = data.name.trim();
  const cleanPhone = data.phone?.trim() || null;

  try {
    const res = await query(
      `INSERT INTO customers (id, name, email, password_hash, phone, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, name, email, password_hash, phone, created_at, updated_at`,
      [customerId, cleanName, cleanEmail, data.passwordHash, cleanPhone]
    );

    if (res.rows.length > 0) {
      const row = res.rows[0];
      const created: StoredCustomer = {
        id: row.id,
        name: row.name,
        email: row.email,
        passwordHash: row.password_hash,
        phone: row.phone || undefined,
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
      };
      memoryCustomers.set(cleanEmail, created);
      return created;
    }
  } catch (err: any) {
    console.warn("[Customer Store] Could not insert customer into database:", err.message);
  }

  const now = new Date().toISOString();
  const fallbackCustomer: StoredCustomer = {
    id: customerId,
    name: cleanName,
    email: cleanEmail,
    passwordHash: data.passwordHash,
    phone: cleanPhone || undefined,
    createdAt: now,
    updatedAt: now,
  };
  memoryCustomers.set(cleanEmail, fallbackCustomer);
  return fallbackCustomer;
}
