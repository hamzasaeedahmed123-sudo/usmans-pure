"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "staff" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "usman_auth_user";
const AUTH_COOKIE_NAME = "usman_auth_token";

// Default seed users for immediate testing
export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: "usr-admin-01",
    name: "Usman Malik (Owner)",
    email: "admin@usmanspure.com",
    role: "admin",
    avatar: "/images/admin/admin-avatar.jpg",
    phone: "+92 300 8472910",
    createdAt: "2024-01-01",
  },
  staff: {
    id: "usr-staff-01",
    name: "Ahmad Raza (Operations)",
    email: "staff@usmanspure.com",
    role: "staff",
    phone: "+92 321 4455667",
    createdAt: "2024-03-15",
  },
  customer: {
    id: "usr-cust-01",
    name: "Dr. Fatima Zahra",
    email: "customer@usmanspure.com",
    role: "customer",
    phone: "+92 333 9988776",
    createdAt: "2024-06-10",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage or cookie on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load auth state", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync auth state to document cookie for Next.js routing/guards
  const persistUser = (newUser: User | null) => {
    setUser(newUser);
    if (typeof window !== "undefined") {
      if (newUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
        document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(JSON.stringify({ id: newUser.id, role: newUser.role }))}; path=/; max-age=604800; SameSite=Lax`;
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
      }
    }
  };

  const login = async (email: string, password = "", role: UserRole = "customer"): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate brief network delay for realism
    await new Promise((r) => setTimeout(r, 450));

    const cleanEmail = email.trim().toLowerCase();

    // Check predefined accounts
    if (cleanEmail === DEMO_USERS.admin.email.toLowerCase()) {
      persistUser(DEMO_USERS.admin);
      setIsLoading(false);
      return { success: true };
    }

    if (cleanEmail === DEMO_USERS.staff.email.toLowerCase()) {
      persistUser(DEMO_USERS.staff);
      setIsLoading(false);
      return { success: true };
    }

    if (cleanEmail === DEMO_USERS.customer.email.toLowerCase()) {
      persistUser(DEMO_USERS.customer);
      setIsLoading(false);
      return { success: true };
    }

    // Fallback: allow any valid email
    if (cleanEmail.includes("@")) {
      const newUser: User = {
        id: `usr-${Date.now().toString(36)}`,
        name: cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: cleanEmail,
        role: role || (cleanEmail.includes("admin") ? "admin" : "customer"),
        createdAt: new Date().toISOString(),
      };
      persistUser(newUser);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Please enter a valid email address." };
  };

  const signup = async (
    name: string,
    email: string,
    password = "",
    role: UserRole = "customer"
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 450));

    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim()) {
      setIsLoading(false);
      return { success: false, error: "Please enter your full name." };
    }
    if (!cleanEmail.includes("@")) {
      setIsLoading(false);
      return { success: false, error: "Please enter a valid email address." };
    }

    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: name.trim(),
      email: cleanEmail,
      role: role || "customer",
      createdAt: new Date().toISOString(),
    };

    persistUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    persistUser(null);
    if (typeof window !== "undefined") {
      fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff" || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isStaff,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
