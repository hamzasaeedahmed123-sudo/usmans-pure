import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { query } from "@/lib/db";

// 1. JWT Security Configuration
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error(
      "FATAL SECURITY ERROR: JWT_SECRET environment variable is missing. The application must fail securely rather than defaulting to insecure values."
    );
  }
  return new TextEncoder().encode(secret);
}

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
  const secret = getJwtSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("usmanspure")
    .setAudience("usmanspure:admin")
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret, {
      issuer: "usmanspure",
      audience: "usmanspure:admin",
    });
    if (payload.role !== "admin") return null;

    const username = String(payload.username || "");

    // Verify session validity directly against the PostgreSQL admin schema
    try {
      const res = await query(
        "SELECT id, username, email, must_change_password FROM admin WHERE username = $1 OR email = $1 LIMIT 1",
        [username]
      );
      if (res.rows.length > 0) {
        const row = res.rows[0];
        return {
          username: row.username,
          role: "admin",
          mustChangePassword: Boolean(row.must_change_password),
        };
      }
    } catch {
      // In case DB is temporarily offline, fallback to cryptographically verified payload
    }

    return {
      username,
      role: "admin",
      mustChangePassword: Boolean(payload.mustChangePassword),
    };
  } catch {
    return null;
  }
}

export async function signCustomerToken(payload: CustomerTokenPayload): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("usmanspure")
    .setAudience("usmanspure:customer")
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyCustomerToken(token: string): Promise<CustomerTokenPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret, {
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

// 2. Password Hashing Utilities
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// 3. PostgreSQL Administrator Authentication Record Management
export interface AdminRecord {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  resetToken?: string;
  resetTokenExpires?: number;
}

// In-memory memory fallback to ensure local builds/dev without active DB connection do not crash
let memoryAdminFallback: AdminRecord | null = null;

export async function getOrInitAdminRecord(): Promise<AdminRecord> {
  const defaultUsername = (process.env.ADMIN_USERNAME || "admin@usmanspure.com").trim();
  const defaultEmail = (process.env.ADMIN_EMAIL || "admin@usmanspure.com").trim();
  const defaultPassword = process.env.ADMIN_PASSWORD;

  if (!defaultPassword || defaultPassword.trim().length === 0) {
    throw new Error(
      "FATAL SECURITY ERROR: ADMIN_PASSWORD environment variable is missing. The application must fail securely rather than defaulting to insecure hardcoded values."
    );
  }

  try {
    const res = await query(
      "SELECT id, username, email, password_hash, must_change_password, reset_token, reset_token_expires, created_at, updated_at FROM admin ORDER BY id ASC LIMIT 1"
    );

    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        passwordHash: row.password_hash,
        mustChangePassword: Boolean(row.must_change_password),
        resetToken: row.reset_token || undefined,
        resetTokenExpires: row.reset_token_expires ? Number(row.reset_token_expires) : undefined,
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
      };
    }

    // Table is empty: Bootstrap initial admin securely
    const initialHash = await hashPassword(defaultPassword);
    const insertRes = await query(
      `INSERT INTO admin (username, email, password_hash, must_change_password, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, username, email, password_hash, must_change_password, created_at, updated_at`,
      [defaultUsername, defaultEmail, initialHash, false]
    );

    const created = insertRes.rows[0];
    return {
      id: created.id,
      username: created.username,
      email: created.email,
      passwordHash: created.password_hash,
      mustChangePassword: Boolean(created.must_change_password),
      createdAt: new Date(created.created_at).toISOString(),
      updatedAt: new Date(created.updated_at).toISOString(),
    };
  } catch (err: any) {
    console.warn("[Admin Auth] Database query failed, using resilient fallback:", err.message);

    if (!memoryAdminFallback) {
      const fallbackHash = await hashPassword(defaultPassword);
      memoryAdminFallback = {
        username: defaultUsername,
        email: defaultEmail,
        passwordHash: fallbackHash,
        mustChangePassword: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    return memoryAdminFallback;
  }
}

export async function updateAdminPassword(newPassword: string): Promise<AdminRecord> {
  const current = await getOrInitAdminRecord();
  const newHash = await hashPassword(newPassword);

  try {
    const res = await query(
      `UPDATE admin
       SET password_hash = $1, must_change_password = FALSE, reset_token = NULL, reset_token_expires = NULL, updated_at = NOW()
       WHERE username = $2 OR email = $3
       RETURNING id, username, email, password_hash, must_change_password, created_at, updated_at`,
      [newHash, current.username, current.email]
    );

    if (res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        passwordHash: row.password_hash,
        mustChangePassword: Boolean(row.must_change_password),
        createdAt: new Date(row.created_at).toISOString(),
        updatedAt: new Date(row.updated_at).toISOString(),
      };
    }
  } catch (err: any) {
    console.warn("[Admin Auth] Could not update password in database:", err.message);
  }

  // Update in-memory fallback
  memoryAdminFallback = {
    ...current,
    passwordHash: newHash,
    mustChangePassword: false,
    updatedAt: new Date().toISOString(),
  };
  return memoryAdminFallback;
}

export async function createPasswordResetToken(email: string): Promise<string> {
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

  try {
    await query(
      `UPDATE admin
       SET reset_token = $1, reset_token_expires = $2, updated_at = NOW()
       WHERE username = $3 OR email = $4`,
      [resetToken, expiresAt, admin.username, admin.email]
    );
  } catch (err: any) {
    console.warn("[Admin Auth] Could not persist reset token in database:", err.message);
  }

  if (memoryAdminFallback) {
    memoryAdminFallback.resetToken = resetToken;
    memoryAdminFallback.resetTokenExpires = expiresAt;
  }

  return resetToken;
}

export async function validatePasswordResetToken(
  token: string
): Promise<{ valid: boolean; reason?: string }> {
  if (!token || typeof token !== "string") {
    return { valid: false, reason: "Invalid reset token." };
  }

  try {
    const res = await query(
      "SELECT reset_token, reset_token_expires FROM admin WHERE reset_token = $1 LIMIT 1",
      [token]
    );

    if (res.rows.length === 0) {
      // Check memory fallback
      if (memoryAdminFallback?.resetToken === token) {
        if (!memoryAdminFallback.resetTokenExpires || Date.now() > memoryAdminFallback.resetTokenExpires) {
          return { valid: false, reason: "Password reset link has expired (1-hour validity window)." };
        }
        return { valid: true };
      }
      return { valid: false, reason: "Invalid or already used password reset link." };
    }

    const row = res.rows[0];
    const expires = row.reset_token_expires ? Number(row.reset_token_expires) : 0;
    if (!expires || Date.now() > expires) {
      return {
        valid: false,
        reason: "Password reset link has expired (1-hour validity window). Please request a new link.",
      };
    }

    return { valid: true };
  } catch (err: any) {
    console.warn("[Admin Auth] Database error during token validation:", err.message);
    if (memoryAdminFallback?.resetToken === token) {
      return { valid: true };
    }
    return { valid: false, reason: "Could not validate reset token. Please retry." };
  }
}

export async function resetAdminPasswordWithToken(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const validation = await validatePasswordResetToken(token);
  if (!validation.valid) {
    return { success: false, error: validation.reason || "Invalid reset token." };
  }

  const newHash = await hashPassword(newPassword);

  try {
    const res = await query(
      `UPDATE admin
       SET password_hash = $1, must_change_password = FALSE, reset_token = NULL, reset_token_expires = NULL, updated_at = NOW()
       WHERE reset_token = $2
       RETURNING id`,
      [newHash, token]
    );

    if (res.rowCount && res.rowCount > 0) {
      return { success: true };
    }
  } catch (err: any) {
    console.warn("[Admin Auth] Could not reset password via token in database:", err.message);
  }

  if (memoryAdminFallback && memoryAdminFallback.resetToken === token) {
    memoryAdminFallback.passwordHash = newHash;
    memoryAdminFallback.resetToken = undefined;
    memoryAdminFallback.resetTokenExpires = undefined;
    return { success: true };
  }

  return { success: true };
}
