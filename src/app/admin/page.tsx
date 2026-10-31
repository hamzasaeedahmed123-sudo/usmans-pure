"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStoreData, OrderStatus } from "@/context/StoreDataContext";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Plus,
  Filter,
  DollarSign,
  ChevronRight,
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { products, orders, updateOrderStatus } = useStoreData();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  // Calculations
  const validOrders = orders.filter((o) => o.status !== "Cancelled");
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const deliveredOrdersCount = orders.filter((o) => o.status === "Delivered").length;
  const aov = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
  const outOfStockProducts = products.filter((p) => !p.inStock);

  // Category statistics dynamically calculated from actual products catalog
  const categoryCounts = {
    flours: products.filter((p) => p.category === "flours").length,
    teas: products.filter((p) => p.category === "teas").length,
  };
  const totalProductsCount = products.length || 1;
  const flourShare = Math.round((categoryCounts.flours / totalProductsCount) * 100);
  const teaShare = Math.round((categoryCounts.teas / totalProductsCount) * 100);

  // Dynamic Top Performing item from real orders
  const itemCounts: Record<string, number> = {};
  validOrders.forEach((o) => {
    o.items.forEach((item) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
    });
  });
  const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);
  const topProductName = sortedItems.length > 0
    ? `${sortedItems[0][0]} (${sortedItems[0][1]} sold)`
    : "Catalog Ready (Awaiting Sales)";

  // Dynamic SVG Chart Data Points from real orders
  const generateChartData = () => {
    const hasValidOrders = validOrders.length > 0;

    if (!hasValidOrders) {
      if (timeRange === "week") {
        return [
          { label: "Mon", value: 0 },
          { label: "Tue", value: 0 },
          { label: "Wed", value: 0 },
          { label: "Thu", value: 0 },
          { label: "Fri", value: 0 },
          { label: "Sat", value: 0 },
          { label: "Sun", value: 0 },
        ];
      } else if (timeRange === "month") {
        return [
          { label: "Day 1-5", value: 0 },
          { label: "Day 6-10", value: 0 },
          { label: "Day 11-15", value: 0 },
          { label: "Day 16-20", value: 0 },
          { label: "Day 21-25", value: 0 },
          { label: "Day 26-30", value: 0 },
        ];
      } else {
        return [
          { label: "Q1", value: 0 },
          { label: "Q2", value: 0 },
          { label: "Q3", value: 0 },
          { label: "Q4", value: 0 },
        ];
      }
    }

    const now = new Date();

    if (timeRange === "week") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(now.getDate() - (6 - i));
        return {
          dateStr: d.toISOString().split("T")[0],
          label: days[d.getDay()],
          value: 0,
        };
      });

      validOrders.forEach((o) => {
        const orderDateStr = (o.date || "").split("T")[0];
        const match = last7Days.find((d) => d.dateStr === orderDateStr);
        if (match) {
          match.value += o.totalAmount;
        } else {
          last7Days[last7Days.length - 1].value += o.totalAmount;
        }
      });

      return last7Days.map(({ label, value }) => ({ label, value }));
    } else if (timeRange === "month") {
      const buckets = [
        { label: "Day 1-5", value: 0 },
        { label: "Day 6-10", value: 0 },
        { label: "Day 11-15", value: 0 },
        { label: "Day 16-20", value: 0 },
        { label: "Day 21-25", value: 0 },
        { label: "Day 26-30", value: 0 },
      ];
      validOrders.forEach((o) => {
        const d = new Date(o.date);
        const day = isNaN(d.getDate()) ? 1 : d.getDate();
        const bucketIndex = Math.min(Math.floor((day - 1) / 5), 5);
        buckets[bucketIndex].value += o.totalAmount;
      });
      return buckets;
    } else {
      const quarters = [
        { label: "Q1", value: 0 },
        { label: "Q2", value: 0 },
        { label: "Q3", value: 0 },
        { label: "Q4", value: 0 },
      ];
      validOrders.forEach((o) => {
        const d = new Date(o.date);
        const m = isNaN(d.getMonth()) ? now.getMonth() : d.getMonth();
        const qIndex = Math.floor(m / 3);
        quarters[qIndex].value += o.totalAmount;
      });
      return quarters;
    }
  };

  const chartData = generateChartData();
  const maxVal = Math.max(...chartData.map((d) => d.value), 1);
  const hasOrders = validOrders.length > 0;

  // Build SVG path
  const width = 600;
  const height = 200;
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * (width - 40) + 20;
    const y = hasOrders ? height - (d.value / maxVal) * (height - 50) - 20 : height - 25;
    return `${x},${y}`;
  });
  const pathD = `M ${points.join(" L ")}`;
  const areaD = `M ${points[0]} L ${points.join(" L ")} L ${points[points.length - 1].split(",")[0]},${height} L ${points[0].split(",")[0]},${height} Z`;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 tracking-wide uppercase">
            <span>Store Performance Hub</span>
            <span>•</span>
            <span className="text-emerald-700">Synchronized Real-Time</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
            Store Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Real-time revenue, order fulfillment status, and category velocity for Usman&apos;s Pure.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/content"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold transition shadow-2xs"
          >
            <span>Edit Homepage CMS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Revenue */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ₨
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              ₨{totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-stone-600">
              {totalRevenue > 0 ? (
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {validOrders.length} customer order{validOrders.length !== 1 ? "s" : ""} processed
                </span>
              ) : (
                <span className="text-stone-400">Awaiting first store order</span>
              )}
            </div>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {totalOrdersCount}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-stone-600">
              {totalOrdersCount > 0 ? (
                <span>{deliveredOrdersCount} delivered successfully</span>
              ) : (
                <span className="text-stone-400">0 customer orders placed</span>
              )}
            </div>
          </div>
        </div>

        {/* KPI 3: Average Order Value */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Avg. Order Value (AOV)
            </span>
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              ₨{aov.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-stone-600">
              {validOrders.length > 0 ? (
                <span>Across {validOrders.length} active order{validOrders.length !== 1 ? "s" : ""}</span>
              ) : (
                <span className="text-stone-400">Calculates on first order</span>
              )}
            </div>
          </div>
        </div>

        {/* KPI 4: Active Inventory & Stock Alerts */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Inventory
            </span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              outOfStockProducts.length > 0 ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
            }`}>
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {products.length} SKUs
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-medium">
              {outOfStockProducts.length > 0 ? (
                <span className="text-red-700 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {outOfStockProducts.length} items out of stock
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">All products in stock</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Visual Charts: Revenue Trends & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend SVG Area Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Sales & Revenue Trajectory
              </h2>
              <p className="text-xs text-stone-500">
                Daily order volume and processed payments across Pakistan
              </p>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  timeRange === "week" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  timeRange === "month" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange("year")}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  timeRange === "year" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                1 Year
              </button>
            </div>
          </div>

          {/* Responsive SVG Chart with Empty State Notification */}
          <div className="w-full h-56 pt-2 relative">
            {!hasOrders && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <div className="bg-amber-50/90 border border-amber-200/90 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-xs text-center">
                  <p className="text-xs font-bold text-amber-950">
                    Awaiting your first store orders. Sales trends will populate automatically.
                  </p>
                  <p className="text-[11px] text-amber-800/80 mt-0.5">
                    Place a test order on the storefront to preview live metrics.
                  </p>
                </div>
              </div>
            )}

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8D2D1B" stopOpacity={hasOrders ? "0.35" : "0.08"} />
                  <stop offset="100%" stopColor="#8D2D1B" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="30" x2={width - 20} y2="30" stroke="#E5E7EB" strokeDasharray="3 3" />
              <line x1="20" y1="90" x2={width - 20} y2="90" stroke="#E5E7EB" strokeDasharray="3 3" />
              <line x1="20" y1="150" x2={width - 20} y2="150" stroke="#E5E7EB" strokeDasharray="3 3" />

              {/* Gradient Area */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Stroke Curve */}
              <path
                d={pathD}
                fill="none"
                stroke={hasOrders ? "#8D2D1B" : "#D1D5DB"}
                strokeWidth={hasOrders ? "3" : "2"}
                strokeDasharray={hasOrders ? undefined : "4 4"}
                strokeLinecap="round"
              />

              {/* Data points */}
              {chartData.map((d, i) => {
                const x = (i / (chartData.length - 1)) * (width - 40) + 20;
                const y = hasOrders ? height - (d.value / maxVal) * (height - 50) - 20 : height - 25;
                return (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r={hasOrders ? "4.5" : "3"}
                      className={`fill-white stroke-2 group-hover:r-6 transition-all ${
                        hasOrders ? "stroke-[#8D2D1B]" : "stroke-stone-400"
                      }`}
                    />
                    {hasOrders && (
                      <text
                        x={x}
                        y={y - 12}
                        textAnchor="middle"
                        className="text-[10px] fill-stone-900 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ₨{d.value.toLocaleString()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-400 pt-2 border-t border-stone-100">
            {chartData.map((d, idx) => (
              <span key={idx}>{d.label}</span>
            ))}
          </div>
        </div>

        {/* Category Breakdown Card (1 Col) */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight">
              Category Distribution
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Product catalog catalog share by pure category
            </p>

            <div className="space-y-4 mt-6">
              {/* Category 1: Flours */}
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8C6D46]" />
                    Chakki Multigrain Flours
                  </span>
                  <span>{flourShare}% ({categoryCounts.flours})</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8C6D46] rounded-full transition-all duration-500"
                    style={{ width: `${flourShare}%` }}
                  />
                </div>
              </div>

              {/* Category 2: Teas */}
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A3E]" />
                    Organic Herbal Teas
                  </span>
                  <span>{teaShare}% ({categoryCounts.teas})</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D5A3E] rounded-full transition-all duration-500"
                    style={{ width: `${teaShare}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex items-center justify-between">
            <span className="font-semibold">Top Performing:</span>
            <span className="font-bold text-stone-900 truncate max-w-[170px]" title={topProductName}>
              {topProductName}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Recent Orders Feed Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-stone-500">
              Live orders waiting for fulfillment, dispatch, or delivery confirmation
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-amber-900 hover:text-black flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 text-stone-500 uppercase tracking-wider font-bold border-b border-stone-100">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-stone-500">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-3 text-amber-800">
                        <ShoppingBag className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <p className="font-bold text-stone-800 text-sm">Awaiting Your First Store Orders</p>
                      <p className="text-xs text-stone-500 mt-1 max-w-sm">
                        Incoming customer orders and checkout payments will automatically appear here with real-time fulfillment actions.
                      </p>
                      <Link
                        href="/products"
                        target="_blank"
                        className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition shadow-xs"
                      >
                        Visit Storefront Catalog
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => {
                  const statusStyles: Record<OrderStatus, string> = {
                    Pending: "bg-amber-100 text-amber-900 border-amber-300",
                    Processing: "bg-blue-100 text-blue-900 border-blue-300",
                    Delivered: "bg-emerald-100 text-emerald-900 border-emerald-300",
                    Cancelled: "bg-stone-100 text-stone-600 border-stone-200",
                  };

                  return (
                    <tr key={order.id} className="hover:bg-stone-50/50 transition">
                      <td className="py-4 px-6 font-mono font-bold text-stone-900">
                        {order.orderNumber}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-stone-900">{order.customerName}</p>
                        <p className="text-[11px] text-stone-500">{order.phone}</p>
                      </td>
                      <td className="py-4 px-6 text-stone-700">
                        <span className="font-semibold">{order.city}</span>
                      </td>
                      <td className="py-4 px-6 text-stone-600">
                        {order.items.map((it) => it.name).join(", ").slice(0, 32)}
                        {order.items.length > 1 ? "..." : ""}
                      </td>
                      <td className="py-4 px-6 font-bold text-stone-900">
                        ₨{order.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            statusStyles[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {order.status === "Pending" ? (
                          <button
                            onClick={() => updateOrderStatus(order.id, "Processing")}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-[11px] border border-blue-200 cursor-pointer"
                          >
                            Dispatch
                          </button>
                        ) : order.status === "Processing" ? (
                          <button
                            onClick={() => updateOrderStatus(order.id, "Delivered")}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-[11px] border border-emerald-200 cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                        ) : (
                          <span className="text-stone-400 text-[11px]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
