"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Package,
  Truck,
  ArrowRight,
  Search,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { AccountNav } from "@/components/account/AccountNav";
import { AtelierOrder, getAllOrders, getStatusBadgeStyle } from "@/data/orders";

export default function OrdersPage() {
  const [orders] = useState<AtelierOrder[]>(() => getAllOrders());
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {
      "PG-2026-18637": true,
    },
  );

  const toggleOrder = (id: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8">
        {/* Subsection Header */}
        <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-6">
          <div>
            <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white">
              Order History
            </h1>
          </div>

          <Link
            href="/studio"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-brand hover:bg-brand-hover px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>New Poster</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md overflow-x-auto scrollbar-none w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === "all"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("active")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === "active"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Active &amp; In Transit (
              {orders.filter((o) => !isDeliveredOrder(o)).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("delivered")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === "delivered"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Delivered ({orders.filter(isDeliveredOrder).length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or vehicle..."
              className="w-full rounded-xl border border-white/[0.08] bg-black/40 pl-9 pr-3.5 py-1.5 sm:py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand transition-colors"
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
          <div className="space-y-3 sm:space-y-3.5">
            {filteredOrders.map((order) => {
              const isDelivered = isDeliveredOrder(order);
              const isExpanded = !!expandedOrders[order.id];
              const badgeStyle = getStatusBadgeStyle(
                order.status,
                order.statusLabel,
              );

              return (
                <div
                  key={order.id}
                  className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 hover:border-white/20 transition-all duration-200 overflow-hidden shadow-lg shadow-black/40"
                >
                  {/* Collapsed Bar: Clickable to toggle dropdown */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    className="w-full text-left p-3 sm:px-5 sm:py-4 cursor-pointer select-none transition-colors hover:bg-white/[0.02]"
                    aria-expanded={isExpanded}
                  >
                    {/* Responsive Grid/Flex: 
                        - Desktop/Tablet (sm+): 1 clean horizontal row
                        - Smartphone (<sm): 2 clean rows that never cramp */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                      {/* Top Row on Phone / Left Group on Tablet+ */}
                      <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3.5 min-w-0 w-full sm:w-auto">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          {/* Standalone Red Wireframe Cube Icon */}
                          <Box
                            className="h-5 w-5 text-red-500 shrink-0"
                            strokeWidth={1.8}
                          />

                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap">
                            {/* Order Number (Exact format from reference) */}
                            <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-white tracking-wide shrink-0">
                              #{order.orderNumber.replace(/^#/, "")}
                            </span>

                            <span className="text-neutral-600 hidden sm:inline">
                              •
                            </span>

                            {/* Date (inline on sm+) */}
                            <span className="text-neutral-400 text-xs sm:text-sm hidden sm:inline whitespace-nowrap">
                              {order.date}
                            </span>

                            {/* Posters Count Pill */}
                            <span className="rounded-full bg-white/[0.06] border border-white/10 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs text-neutral-300 font-medium whitespace-nowrap shrink-0">
                              {order.items.length}{" "}
                              {order.items.length === 1 ? "Poster" : "Posters"}
                            </span>
                          </div>
                        </div>

                        {/* Mobile-only Price + Chevron on top right (< sm) */}
                        <div className="flex sm:hidden items-center gap-2 shrink-0">
                          <span className="font-mono font-bold text-xs text-white">
                            {order.totalAmount}
                          </span>
                          <div className="p-0.5 text-neutral-400">
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-white" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Mobile-only Sub-Row: Placed Date + Status Pill (< sm) */}
                      <div className="flex sm:hidden items-center justify-between gap-2 pl-7.5 pr-0.5">
                        <span className="text-neutral-400 text-[11px] whitespace-nowrap font-mono">
                          {order.date}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap ${badgeStyle.pill}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${badgeStyle.dot}`}
                          />
                          <span>{badgeStyle.label}</span>
                        </span>
                      </div>

                      {/* Tablet/Desktop Right Group (sm+): Status Pill + Total Price + Chevron */}
                      <div className="hidden sm:flex items-center gap-3 md:gap-4 shrink-0">
                        {/* Status Pill */}
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-xs font-medium whitespace-nowrap ${badgeStyle.pill}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${badgeStyle.dot}`}
                          />
                          <span>{badgeStyle.label}</span>
                        </span>

                        {/* Total Amount */}
                        <span className="font-mono font-bold text-sm md:text-base text-white">
                          {order.totalAmount}
                        </span>

                        {/* Chevron Down (rotates when expanded) */}
                        <div className="p-0.5 text-neutral-400 hover:text-white transition-colors">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-white" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Dropdown Content */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.06] bg-black/40 p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                      {/* Commissioned Posters Preview Grid */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                          COMMISSIONED POSTERS IN THIS ORDER:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-xl border border-white/[0.08] bg-black/50 hover:border-white/15 transition-colors"
                            >
                              {/* Poster preview with white mat frame */}
                              <div className="relative aspect-[3/4] w-12 sm:w-14 h-16 sm:h-18 rounded-lg overflow-hidden border border-white/20 bg-neutral-900 shrink-0 shadow-md">
                                <Image
                                  src={item.image}
                                  alt={item.templateName}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p
                                  className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide truncate leading-tight"
                                  title={item.templateName}
                                >
                                  {item.templateName}
                                </p>
                                <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
                                  {item.vehicle}
                                </p>
                                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono mt-1 flex-wrap">
                                  <span className="text-red-500 font-medium">
                                    {item.sizeLabel}
                                  </span>
                                  <span className="text-neutral-600">•</span>
                                  <span className="text-neutral-400">
                                    Qty: {item.qty}
                                  </span>
                                  <span className="text-neutral-600">•</span>
                                  <span className="text-white font-bold">
                                    {item.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Footer: Delivery Info + Order Details Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center gap-2 text-xs text-neutral-400 min-w-0 flex-wrap">
                          <Truck className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="text-neutral-400">
                            Estimated Arrival:{" "}
                            <strong className="text-white font-semibold">
                              {order.estimatedDelivery ||
                                (isDelivered
                                  ? order.deliveredDate
                                  : "Expected in 4-5 business days")}
                            </strong>
                          </span>
                          {order.trackingNumber && (
                            <>
                              <span className="text-neutral-600">•</span>
                              <span className="font-mono text-neutral-400">
                                {order.trackingNumber}
                              </span>
                            </>
                          )}
                        </div>

                        <Link
                          href={`/account/orders/${order.orderNumber}`}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto"
                        >
                          <span>ORDER DETAILS</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
