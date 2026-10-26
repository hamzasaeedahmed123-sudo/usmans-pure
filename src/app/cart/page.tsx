"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  ChevronRight,
  Trash2,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  pack: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "prod-3",
      name: "Fat2Fuel Advance Multigrain Flour For Effective Weight Loss",
      pack: "5kg Family Pack",
      price: 1150,
      quantity: 1,
      image: "/images/products/prod-3.jpg",
    },
    {
      id: "prod-9",
      name: "Rosella Tea (Organic Ruby Hibiscus)",
      pack: "50g Stand-up Pouch",
      price: 1000,
      quantity: 1,
      image: "/images/products/prod-9.jpg",
    },
  ]);

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    city: "Lahore",
    address: "",
    notes: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 10000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 200;
  const grandTotal = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cartItems
      .map((i) => `• ${i.name} (${i.pack}) x ${i.quantity} = ₨${(i.price * i.quantity).toLocaleString()}`)
      .join("%0A");

    const message = `Hello Usman's Pure,%0A%0AI would like to place an order on Cash on Delivery:%0A%0A${itemsList}%0A%0ASubtotal: ₨${subtotal.toLocaleString()}%0AShipping: ${
      shippingFee === 0 ? "FREE" : "₨200"
    }%0ATotal: ₨${grandTotal.toLocaleString()}%0A%0AName: ${encodeURIComponent(
      checkoutForm.name || "Customer"
    )}%0APhone: ${encodeURIComponent(checkoutForm.phone || "N/A")}%0ACity: ${encodeURIComponent(
      checkoutForm.city
    )}%0AAddress: ${encodeURIComponent(checkoutForm.address || "N/A")}`;

    window.open(`https://wa.me/923008472910?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/products" className="hover:text-amber-800 transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">Your Basket &amp; Checkout</span>
          </div>
        </div>

        <TickerMarquee />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2F] tracking-tight mb-8">
            Shopping Cart &amp; Cash on Delivery Checkout
          </h1>

          {orderPlaced ? (
            <div className="bg-white rounded-sm border border-stone-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A2F]">
                Order Confirmed with Cash on Delivery!
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{checkoutForm.name || "Valued Customer"}</strong>! Your order totaling{" "}
                <strong>₨{grandTotal.toLocaleString()}</strong> has been scheduled for stone-milling and nationwide dispatch.
              </p>
              <div className="mt-6 p-4 rounded-sm bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto">
                Our courier will call or SMS your phone (<strong>{checkoutForm.phone || "provided number"}</strong>) prior to doorstep arrival.
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-[3px] bg-[#1E1510] text-[#F6F1E9] font-medium text-[11px] hover:bg-[#8B3A22] transition uppercase tracking-[0.18em] duration-200 ease-out"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={handleWhatsAppOrder}
                  className="px-6 py-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                  <span>Open Order on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white rounded-sm border border-stone-200 p-12 text-center max-w-md mx-auto">
              <ShoppingBag className="w-14 h-14 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-900">Your pure basket is empty</h3>
              <p className="mt-1 text-xs text-stone-500">
                Explore our fresh stone-ground flours and organic herbal teas.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-[3px] bg-[#1E1510] text-[#F6F1E9] text-[11px] font-medium hover:bg-[#8B3A22] transition uppercase tracking-[0.18em] duration-200 ease-out"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Cart Items & COD Form (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                {/* Free Shipping Alert Banner */}
                <div className="p-4 rounded-sm bg-white border border-stone-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-stone-900">
                      {amountToFreeShipping === 0 ? (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          ✓ You have unlocked FREE Nationwide Delivery!
                        </span>
                      ) : (
                        <span>Add ₨{amountToFreeShipping.toLocaleString()} more for FREE Delivery!</span>
                      )}
                    </span>
                    <span className="text-stone-500">Free over ₨10,000</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-white rounded-sm border border-stone-200 p-6 sm:p-8 shadow-xs">
                  <h3 className="text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100">
                    Your Items ({cartItems.length})
                  </h3>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-md bg-stone-50 border border-stone-200 p-2 shrink-0 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="text-xs text-stone-500 mt-0.5">{item.pack}</div>
                            <div className="text-xs font-semibold text-stone-900 mt-1">
                              ₨{item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                          {/* Quantity Counter */}
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 px-2 py-1 gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-md bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-stone-900 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-md bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-sm font-semibold text-stone-900 min-w-[70px] text-right">
                            ₨{(item.price * item.quantity).toLocaleString()}
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-stone-400 hover:text-red-500 transition cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cash on Delivery Address Form */}
                <div className="bg-white rounded-sm border border-stone-200 p-6 sm:p-8 shadow-xs">
                  <h3 className="text-lg font-bold text-stone-900 mb-1">
                    Cash on Delivery Delivery Details
                  </h3>
                  <p className="text-xs text-stone-500 mb-6">
                    Pay at your doorstep anywhere across Pakistan when you receive the sealed parcel.
                  </p>

                  <form onSubmit={handlePlaceOrder} id="cod-form" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          placeholder="e.g. Usman Tariq"
                          className="w-full px-4 py-2.5 rounded-md bg-stone-50 border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-600 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                          WhatsApp / Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="w-full px-4 py-2.5 rounded-md bg-stone-50 border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-600 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                          Delivery City *
                        </label>
                        <select
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 transition cursor-pointer"
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Other City">Other Pakistan City</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                          Delivery Method
                        </label>
                        <div className="px-4 py-2.5 rounded-md bg-stone-100 border border-stone-200 text-xs font-bold text-stone-800 flex items-center justify-between">
                          <span>Doorstep Cash on Delivery (COD)</span>
                          <span className="text-emerald-700">✓ Active</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1 uppercase tracking-wider">
                        Full Delivery Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                        placeholder="House / Flat #, Street, Phase / Sector, Landmark"
                        className="w-full px-4 py-2.5 rounded-md bg-stone-50 border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-600 transition"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-sm border border-stone-200 p-6 sm:p-8 shadow-xs sticky top-28 space-y-6">
                  <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between text-stone-600">
                      <span>Items Subtotal:</span>
                      <span className="font-bold text-stone-900">₨{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span>Nationwide Delivery:</span>
                      <span className="font-bold">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-700 uppercase font-medium">FREE</span>
                        ) : (
                          <span>₨{shippingFee}</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span>Payment Method:</span>
                      <span className="font-bold text-stone-900">Cash on Delivery</span>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
                      <span className="text-sm font-bold text-stone-900">Total Payable:</span>
                      <span className="text-2xl font-semibold text-stone-900">
                        ₨{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      form="cod-form"
                      className="w-full py-4 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] font-medium text-[11px] flex items-center justify-center gap-2 transition cursor-pointer uppercase tracking-[0.18em] duration-200 ease-out"
                    >
                      <span>Confirm Cash on Delivery Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppOrder}
                      className="w-full py-3 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                      <span>Order Directly via WhatsApp</span>
                    </button>
                  </div>

                  {/* Trust guarantees */}
                  <div className="pt-4 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>14-Day Money Back Guarantee if not satisfied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Inspected and sealed fresh upon ordering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
