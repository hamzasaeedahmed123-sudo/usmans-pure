"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);

const FloatingActions = dynamic(
  () => import("@/components/layout/FloatingActions").then((mod) => mod.FloatingActions),
  { ssr: false }
);

export function ClientLayoutWidgets() {
  return (
    <>
      <CartDrawer />
      <FloatingActions />
    </>
  );
}
