"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStoreData, Order, OrderStatus } from "@/context/StoreDataContext";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  Trash2,
  FileText,
  MapPin,
  Phone,
  Mail,
  Calendar,
  X,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, deleteOrder } = useStoreData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.transactionId && o.transactionId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.senderAccountTitle && o.senderAccountTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order status updated to "${newStatus}"!`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = (orderId: string, orderNum: string) => {
    if (confirm(`Are you sure you want to delete order ${orderNum}?`)) {
      deleteOrder(orderId);
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      showToast(`Order ${orderNum} deleted.`);
    }
  };

  const statusBadges: Record<OrderStatus, string> = {
    Pending: "bg-amber-100 text-amber-900 border-amber-300",
    Processing: "bg-blue-100 text-blue-900 border-blue-300",
    Delivered: "bg-emerald-100 text-emerald-900 border-emerald-300",
    Cancelled: "bg-stone-100 text-stone-600 border-stone-200",
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1C1613] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Orders & Customer Shipments
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Dispatch verification, cash-on-delivery reconciliation, and live courier tracking.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-amber-950">
          <span>{orders.filter((o) => o.status === "Pending").length} Orders Awaiting Dispatch</span>
        </div>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/80 p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, customer name, phone, or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-900/40"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "Pending", "Processing", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap capitalize ${
                statusFilter === st
                  ? "bg-[#1C1613] text-white shadow-2xs"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {st === "all" ? "All Orders" : st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Orders Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-100">
              <tr>
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer & Phone</th>
                <th className="py-3.5 px-6">Delivery City</th>
                <th className="py-3.5 px-6">Total (₨)</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Fulfillment Status</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 px-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-3 shadow-2xs">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-stone-900">
                      {orders.length === 0 ? "Awaiting Your First Store Orders" : "No Orders Matching Filter"}
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                      {orders.length === 0
                        ? "When customer orders are booked on the website or checkout, live orders and status controls will appear here automatically."
                        : "Try selecting \"All Orders\" or resetting your search query."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-4 px-6">
                      <span className="font-mono font-black text-stone-900">{order.orderNumber}</span>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-stone-900">{order.customerName}</p>
                      <p className="text-[11px] text-stone-500">{order.phone}</p>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-semibold text-stone-800">{order.city}</span>
                      <p className="text-[11px] text-stone-400 truncate max-w-[140px]">{order.address}</p>
                    </td>

                    <td className="py-4 px-6 font-bold text-stone-900">
                      ₨{order.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-[11px] text-stone-700 font-semibold block">{order.paymentMethod}</span>
                      {order.transactionId && (
                        <div className="text-[10px] font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded mt-1 inline-block">
                          TID: {order.transactionId}
                        </div>
                      )}
                      {order.senderAccountTitle && (
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          From: <span className="font-medium text-stone-700">{order.senderAccountTitle}</span>
                        </p>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold py-1 px-2.5 rounded-full border cursor-pointer focus:outline-none ${
                          statusBadges[order.status]
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                          title="View Full Order Invoice"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(order.id, order.orderNumber)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto text-stone-900">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  Customer Invoice
                </span>
                <h3 className="text-xl font-black text-stone-900 tracking-tight">
                  Order {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Card */}
            <div className="bg-stone-50 p-4 rounded-2xl mb-4 text-xs space-y-2 border border-stone-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900">{selectedOrder.customerName}</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${statusBadges[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{selectedOrder.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{selectedOrder.customerEmail}</span>
              </div>
              <div className="flex items-start gap-1.5 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                <span>{selectedOrder.address}, {selectedOrder.city}</span>
              </div>
              <div className="pt-2 text-[11px] text-stone-600 border-t border-stone-200/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-500">Payment Gateway:</span>
                  <span className="font-bold text-stone-800">{selectedOrder.paymentMethod}</span>
                </div>
                {selectedOrder.senderAccountTitle && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-500">Sender Account:</span>
                    <span className="font-bold text-stone-900">{selectedOrder.senderAccountTitle}</span>
                  </div>
                )}
                {selectedOrder.transactionId && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-500">Transaction ID (TID):</span>
                    <span className="font-mono font-black text-amber-950 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                      {selectedOrder.transactionId}
                    </span>
                  </div>
                )}
                {selectedOrder.receiptImage && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-500">Receipt Attached:</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                      {selectedOrder.receiptImage}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Purchased Products ({selectedOrder.items.length})
            </h4>
            <div className="space-y-2 mb-4">
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-stone-50/70 border border-stone-100 text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{it.name}</p>
                    <p className="text-[11px] text-stone-500">Weight: {it.pack} • Qty: {it.quantity}</p>
                  </div>
                  <div className="text-right font-black text-stone-900">
                    ₨{(it.price * it.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-sm font-bold">
              <span>Final Total:</span>
              <span className="text-lg font-black text-amber-950">
                ₨{selectedOrder.totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Status Change Action inside Modal */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600">Update Status:</span>
              <div className="flex items-center gap-1.5">
                {(["Pending", "Processing", "Delivered", "Cancelled"] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedOrder.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedOrder.status === st
                        ? "bg-[#1C1613] text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
