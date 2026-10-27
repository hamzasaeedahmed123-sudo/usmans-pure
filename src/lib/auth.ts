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
import crypto from "crypto";

export interface AdminRecord {
  username: string;
  email: string;
  passwordHash: string;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  resetToken?: string;
  resetTokenExpires?: number;
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

  const defaultUsername = (process.env.ADMIN_USERNAME || "admin@usmanspure.com").trim();
  const defaultEmail = (process.env.ADMIN_EMAIL || "admin@usmanspure.com").trim();
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin1122";

  if (fs.existsSync(ADMIN_FILE_PATH)) {
    try {
      const raw = fs.readFileSync(ADMIN_FILE_PATH, "utf-8");
      const record = JSON.parse(raw) as AdminRecord;
      if (record && record.username && record.passwordHash) {
        if (!record.email) {
          record.email = defaultEmail;
        }
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
    email: defaultEmail,
    passwordHash: initialHash,
    mustChangePassword: false,
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

export async function createPasswordResetToken(email: string): Promise<string> {
  ensureStoreDir();
  const admin = await getOrInitAdminRecord();

  const normalizedInput = email.trim().toLowerCase();
  const adminEmail = (admin.email || admin.username || "admin@usmanspure.com").toLowerCase();

  if (
    normalizedInput !== adminEmail &&
    normalizedInput !== "admin@usmanspure.com" &&
    normalizedInput !== (admin.username || "").toLowerCase()
  ) {
    throw new Error("No administrator account associated with this email address.");
  }

  // Generate 32-byte cryptographically secure random token (64 hex characters)
  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1-hour expiration

  const updated: AdminRecord = {
    ...admin,
    resetToken,
    resetTokenExpires: expiresAt,
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth Warning] Could not persist resetToken in admin_auth.json:", err);
  }

  return resetToken;
}

export async function validatePasswordResetToken(
  token: string
): Promise<{ valid: boolean; reason?: string }> {
  ensureStoreDir();
  const admin = await getOrInitAdminRecord();

  if (!token || typeof token !== "string" || !admin.resetToken || admin.resetToken !== token) {
    return { valid: false, reason: "Invalid or already used password reset link." };
  }

  if (!admin.resetTokenExpires || Date.now() > admin.resetTokenExpires) {
    return {
      valid: false,
      reason: "Password reset link has expired (1-hour validity window). Please request a new link.",
    };
  }

  return { valid: true };
}

export async function resetAdminPasswordWithToken(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  ensureStoreDir();
  const validation = await validatePasswordResetToken(token);
  if (!validation.valid) {
    return { success: false, error: validation.reason || "Invalid reset token." };
  }

  const admin = await getOrInitAdminRecord();
  const newHash = await hashPassword(newPassword);

  const updated: AdminRecord = {
    ...admin,
    passwordHash: newHash,
    mustChangePassword: false,
    resetToken: undefined,
    resetTokenExpires: undefined,
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth Warning] Could not persist reset password in admin_auth.json:", err);
  }

  return { success: true };
}
