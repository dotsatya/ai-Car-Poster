"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Package,
  Truck,
  ArrowRight,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { AccountNav } from "@/components/account/AccountNav";
import { AtelierOrder, getAllOrders, getStatusBadgeStyle } from "@/data/orders";

export default function OrdersPage() {
  const [orders] = useState<AtelierOrder[]>(() => getAllOrders());
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const isDeliveredOrder = (o: AtelierOrder) =>
    o.status === "delivered" || o.statusLabel === "Delivered";

  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (filter === "active" && isDeliveredOrder(order)) return false;
    if (filter === "delivered" && !isDeliveredOrder(order)) return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesOrderNo = order.orderNumber.toLowerCase().includes(q);
    const matchesCourier = order.courier.toLowerCase().includes(q);
    const matchesItems = order.items.some(
      (item) =>
        item.templateName.toLowerCase().includes(q) ||
        item.vehicle.toLowerCase().includes(q) ||
        item.certificateNumber.toLowerCase().includes(q),
    );
    return matchesOrderNo || matchesCourier || matchesItems;
  });

  return (
    <div className="min-h-screen bg-bg-primary pb-24 text-white">
      {/* Account Navigation */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-10">
        {/* Subsection Header */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white">
              Order History
            </h1>
          </div>

          <Link
            href="/studio"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-brand hover:bg-brand-hover px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>New Poster</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Status Filter Tabs (Segmented Control: 3 equal cols on mobile, snug inline-flex on sm+) */}
          <div className="grid grid-cols-3 sm:inline-flex sm:flex-row items-center gap-1 p-1 rounded-xl border border-white/10 bg-[#0E1013]/90 backdrop-blur-md w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-md py-1.5 sm:py-2 px-1.5 sm:px-3.5 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center ${
                filter === "all"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>All Orders ({orders.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter("active")}
              className={`rounded-md py-1.5 sm:py-2 px-1.5 sm:px-3.5 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center ${
                filter === "active"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className="sm:hidden">
                Active ({orders.filter((o) => !isDeliveredOrder(o)).length})
              </span>
              <span className="hidden sm:inline">
                Active &amp; In Transit (
                {orders.filter((o) => !isDeliveredOrder(o)).length})
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFilter("delivered")}
              className={`rounded-md py-1.5 sm:py-2 px-1.5 sm:px-3.5 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center flex items-center justify-center ${
                filter === "delivered"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span>Delivered ({orders.filter(isDeliveredOrder).length})</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-56 md:w-72 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or vehicle..."
              className="w-full rounded-md border border-white/[0.08] bg-black/40 pl-9 pr-3.5 py-1.5 sm:py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Orders Dropdown List */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-neutral-900/30 p-8 sm:p-12 text-center backdrop-blur-md">
            <Package className="h-10 w-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">
              No commissions found
            </h3>
            <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
              No orders matched your filter. Try adjusting your search query or
              reset your status tabs.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
              }}
              className="mt-3 inline-block text-xs font-semibold text-brand hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredOrders.map((order) => {
              const isDelivered = isDeliveredOrder(order);
              const badgeStyle = getStatusBadgeStyle(
                order.status,
                order.statusLabel,
              );

              return (
                <div
                  key={order.id}
                  className="rounded-xl sm:rounded-xl border border-white/[0.08] bg-[#0E1013]/90 p-3 sm:p-4.5 md:p-5 shadow-xl shadow-black/40 space-y-2.5 sm:space-y-3.5 hover:border-white/15 transition-all duration-200"
                >
                  {/* Header Row: Clean 2-row on phone / 1-row on sm+ */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                    {/* Top part on phone / Left on desktop */}
                    <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <Box
                          className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 shrink-0"
                          strokeWidth={1.8}
                        />
                        <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-white tracking-wide shrink-0">
                          #{order.orderNumber.replace(/^#/, "")}
                        </span>
                        <span className="text-neutral-600 hidden sm:inline">•</span>
                        <span className="text-neutral-400 text-xs sm:text-sm hidden sm:inline whitespace-nowrap">
                          {order.date}
                        </span>
                        <span className="rounded-full bg-white/[0.06] border border-white/10 px-1.5 sm:px-2.5 py-0.5 text-[9px] sm:text-xs text-neutral-300 font-medium whitespace-nowrap shrink-0">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "Poster" : "Posters"}
                        </span>
                      </div>

                      {/* Mobile-only Price right aligned */}
                      <span className="font-mono font-bold text-xs sm:hidden text-white">
                        {order.totalAmount}
                      </span>
                    </div>

                    {/* Bottom part on phone / Right on desktop */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0">
                      <span className="text-neutral-400 text-[10px] sm:hidden font-mono">
                        {order.date}
                      </span>
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium whitespace-nowrap ${badgeStyle.pill}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${badgeStyle.dot}`}
                          />
                          <span>{badgeStyle.label}</span>
                        </span>
                        <span className="hidden sm:inline font-mono font-bold text-sm sm:text-base text-white">
                          {order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Commissioned Posters List: Unified sleek container for all viewports (1-col on phone, 2-cols on laptop/desktop) */}
                  <div className="rounded-xl border border-white/[0.06] bg-black/40 px-3 py-2 sm:px-4 sm:py-3 divide-y divide-white/[0.04] sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-2 py-1 sm:py-1.5 first:pt-0 sm:first:pt-1.5 last:pb-0 sm:last:pb-1.5"
                      >
                        <p
                          className="text-[11px] sm:text-xs md:text-sm text-neutral-300 truncate font-medium hover:text-white transition-colors"
                          title={`${item.templateName} x ${item.qty}`}
                        >
                          {item.templateName}
                        </p>
                        <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 shrink-0 font-medium ml-2 bg-white/[0.04] px-1.5 py-0.5 rounded">
                          ×{item.qty}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer: Single unified row on mobile and desktop */}
                  <div className="flex items-center justify-between gap-2 pt-2 sm:pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 min-w-0">
                      <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 shrink-0" />
                      <span className="truncate">
                        <span className="hidden sm:inline">Estimated Arrival: </span>
                        <strong className="text-white font-medium sm:font-semibold">
                          {order.estimatedDelivery ||
                            (isDelivered
                              ? order.deliveredDate
                              : "Expected in 4-5 business days")}
                        </strong>
                        {order.trackingNumber && (
                          <span className="hidden md:inline font-mono text-neutral-400">
                            {" "}• {order.trackingNumber}
                          </span>
                        )}
                      </span>
                    </div>

                    <Link
                      href={`/account/orders/${order.orderNumber}`}
                      className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-md bg-red-600 hover:bg-red-700 active:scale-[0.98] px-3 sm:px-5 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Order Details</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
