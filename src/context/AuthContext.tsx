"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export type UserRole = "admin" | "staff" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  mustChangePassword?: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isLoading: boolean;
  mustChangePassword?: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      // 1. Check if an admin session is active
      const adminRes = await fetch("/api/admin/me", { method: "GET" }).catch(() => null);
      if (adminRes && adminRes.ok) {
        const adminData = await adminRes.json();
        if (adminData.authenticated) {
          setUser({
            id: "admin-master",
            name: adminData.username || "Master Administrator",
            email: `${adminData.username}@usmanspure.com`,
            role: "admin",
            mustChangePassword: adminData.mustChangePassword,
          });
          setIsLoading(false);
          return;
        }
      }

      // 2. Check customer session
      const customerRes = await fetch("/api/auth/me", { method: "GET" }).catch(() => null);
      if (customerRes && customerRes.ok) {
        const customerData = await customerRes.json();
        if (customerData.authenticated && customerData.user) {
          setUser({
            id: customerData.user.id,
            name: customerData.user.name,
            email: customerData.user.email,
            phone: customerData.user.phone,
            role: "customer",
          });
          setIsLoading(false);
          return;
        }
      }

      setUser(null);
    } catch (err) {
      console.warn("[AuthContext] Session verification check failed:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (email: string, password = ""): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || "Login failed. Please check your credentials." };
      }

      setUser(data.user);
      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const signup = async (
    name: string,
    email: string,
    password = "",
    phone = ""
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password, phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || "Failed to create account." };
      }

      setUser(data.user);
      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await Promise.all([
        fetch("/api/admin/logout", { method: "POST" }),
        fetch("/api/auth/logout", { method: "POST" }),
      ]);
    } catch {
      // ignore
    }
    // Hard refresh/redirect
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "admin" || user?.role === "staff";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isStaff,
        isLoading,
        mustChangePassword: user?.mustChangePassword,
        login,
        signup,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
