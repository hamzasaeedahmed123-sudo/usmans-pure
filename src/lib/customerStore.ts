import fs from "fs";
import path from "path";

export interface StoredCustomer {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

const STORE_DIR = path.join(process.cwd(), "src", "data", "store");
const CUSTOMERS_FILE_PATH = path.join(STORE_DIR, "customers.json");

function ensureStoreDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

function readCustomers(): StoredCustomer[] {
  ensureStoreDir();
  if (!fs.existsSync(CUSTOMERS_FILE_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(CUSTOMERS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCustomers(customers: StoredCustomer[]) {
  ensureStoreDir();
  const tempPath = `${CUSTOMERS_FILE_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(customers, null, 2), "utf-8");
  fs.renameSync(tempPath, CUSTOMERS_FILE_PATH);
}

export function findCustomerByEmail(email: string): StoredCustomer | null {
  const customers = readCustomers();
  const target = email.trim().toLowerCase();
  return customers.find((c) => c.email.toLowerCase() === target) || null;
}

export function findCustomerById(id: string): StoredCustomer | null {
  const customers = readCustomers();
  return customers.find((c) => c.id === id) || null;
}

export function createCustomer(data: {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
}): StoredCustomer {
  const customers = readCustomers();
  const now = new Date().toISOString();
  const newCustomer: StoredCustomer = {
    id: `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    passwordHash: data.passwordHash,
    phone: data.phone?.trim(),
    createdAt: now,
    updatedAt: now,
  };
  customers.push(newCustomer);
  writeCustomers(customers);
  return newCustomer;
}
