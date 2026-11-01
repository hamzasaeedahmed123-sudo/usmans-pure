import { Suspense } from "react";
import { CheckoutView } from "./CheckoutView";

export const metadata = {
  title: "Checkout & Payment Options (COD, JazzCash, Card) | Usman's Pure Products",
  description:
    "Place your order for 100% pure & freshly milled chakki flours and pure organic herbal teas. Pay with Cash on Delivery across Pakistan, JazzCash, Easypaisa, or Card.",
};

function CheckoutLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-bold text-stone-700">Loading Order Checkout...</span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingSkeleton />}>
      <CheckoutView />
    </Suspense>
  );
}
