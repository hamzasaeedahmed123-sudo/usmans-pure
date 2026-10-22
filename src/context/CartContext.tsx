"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  pack: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, pack: string, delta: number) => void;
  removeItem: (id: string, pack: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
  deliveryFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "usman_cart";
const FREE_SHIPPING_THRESHOLD = 10000;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore parse error
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage and header badge whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      cartEl.innerText = totalCount.toString();
    }
  }, [items, isLoaded]);

  // Global event listeners for cross-component triggers
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    const handleAddEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Omit<CartItem, "quantity"> & { quantity?: number }>;
      if (customEvent.detail) {
        const { quantity = 1, ...itemData } = customEvent.detail;
        addItem(itemData, quantity);
        setIsOpen(true);
      }
    };

    window.addEventListener("usman-open-cart", handleOpenEvent);
    window.addEventListener("usman-add-to-cart", handleAddEvent as EventListener);

    return () => {
      window.removeEventListener("usman-open-cart", handleOpenEvent);
      window.removeEventListener("usman-add-to-cart", handleAddEvent as EventListener);
    };
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, "quantity">, qty: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.pack === item.pack
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          pack: item.pack,
          price: item.price,
          quantity: Math.max(1, qty),
          image: item.image,
        },
      ];
    });
  };

  const updateQuantity = (id: string, pack: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id && item.pack === pack) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (id: string, pack: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.pack === pack)));
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250;
  const finalTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        totalCount,
        deliveryFee,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
