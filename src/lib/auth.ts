import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// 1. JWT Configuration
const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "usmans-pure-production-secure-hmac-sha256-key-1947-elite";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export const ADMIN_COOKIE_NAME = "admin_token";
export const CUSTOMER_COOKIE_NAME = "customer_token";

export interface AdminTokenPayload {
  username: string;
  role: "admin";
  mustChangePassword?: boolean;
}

export interface CustomerTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "customer";
}

export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("usmanspure")
    .setAudience("usmanspure:admin")
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: "usmanspure",
      audience: "usmanspure:admin",
    });
    if (payload.role !== "admin") return null;
    return {
      username: String(payload.username || ""),
      role: "admin",
      mustChangePassword: Boolean(payload.mustChangePassword),
    };
  } catch {
    return null;
  }
}

export async function signCustomerToken(payload: CustomerTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("usmanspure")
    .setAudience("usmanspure:customer")
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyCustomerToken(token: string): Promise<CustomerTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: "usmanspure",
      audience: "usmanspure:customer",
    });
    if (payload.role !== "customer") return null;
    return {
      userId: String(payload.userId || ""),
      email: String(payload.email || ""),
      name: String(payload.name || ""),
      role: "customer",
    };
  } catch {
    return null;
  }
}

// 2. Password Hashing
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// 3. Admin Bootstrap & Credentials Persistence
export interface AdminRecord {
  username: string;
  passwordHash: string;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORE_DIR = path.join(process.cwd(), "src", "data", "store");
const ADMIN_FILE_PATH = path.join(STORE_DIR, "admin_auth.json");

function ensureStoreDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

export async function getOrInitAdminRecord(): Promise<AdminRecord> {
  ensureStoreDir();

  const defaultUsername = (process.env.ADMIN_USERNAME || "usmanspure1947").trim();
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin1947";

  if (fs.existsSync(ADMIN_FILE_PATH)) {
    try {
      const raw = fs.readFileSync(ADMIN_FILE_PATH, "utf-8");
      const record = JSON.parse(raw) as AdminRecord;
      if (record && record.username && record.passwordHash) {
        return record;
      }
    } catch (err) {
      console.error("[Auth] Error reading admin_auth.json, resetting bootstrap record:", err);
    }
  }

  // Initialize bootstrap credentials securely with strong hash
  const initialHash = await hashPassword(defaultPassword);
  const newRecord: AdminRecord = {
    username: defaultUsername,
    passwordHash: initialHash,
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(newRecord, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth Warning] Could not persist admin_auth.json to disk:", err);
  }

  return newRecord;
}

export async function updateAdminPassword(newPassword: string): Promise<AdminRecord> {
  ensureStoreDir();
  const current = await getOrInitAdminRecord();
  const newHash = await hashPassword(newPassword);

  const updated: AdminRecord = {
    ...current,
    passwordHash: newHash,
    mustChangePassword: false,
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth Warning] Could not persist updated admin_auth.json:", err);
  }

  return updated;
}
