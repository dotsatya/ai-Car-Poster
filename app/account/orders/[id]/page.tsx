"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Truck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Download,
  Copy,
  Calendar,
  MapPin,
  Package,
  Check,
  Phone,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { AccountNav } from "@/components/account/AccountNav";
import {
  getOrderById,
  INITIAL_ORDERS,
  AtelierOrder,
  getStatusBadgeStyle,
} from "@/data/orders";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = use(params);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Retrieve matching order or fallback to the first sample order
  const [order] = useState<AtelierOrder>(() => {
    const found = getOrderById(id);
    if (found) return found;

    // Fallback if not found: create a dynamic representation matching the id
    return {
      ...INITIAL_ORDERS[0],
      id: id || "PG-2026-911RS",
      orderNumber: id || "PG-2026-911RS",
    };
  });

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedTracking(true);
      toast.success("Tracking Number Copied", { description: text });
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  const handleDownloadCertificate = () => {
    toast.success("Archival Certificate Ready", {
      description: `Official Certificate of Authenticity for Order #${order.orderNumber} generated.`,
    });
  };

  const isDelivered =
    order.status === "delivered" || order.statusLabel === "Delivered";
  const badgeStyle = getStatusBadgeStyle(order.status, order.statusLabel);

  return (
    <div className="min-h-screen bg-bg-primary pb-24 text-white">
      {/* Account Navigation Bar */}
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-12 py-3.5 sm:py-8">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-3 sm:mb-6">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer group py-1"
          >
            <ArrowLeft className="h-4 w-4 text-neutral-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to My Orders</span>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* HERO ORDER HEADER CARD (Luxury Receipt Header on Mobile & Desktop) */}
        {/* ============================================================== */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 backdrop-blur-xl mb-4 sm:mb-6 shadow-xl shadow-black/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <h1 className="text-base sm:text-xl font-bold font-mono tracking-wide text-white">
                  #{order.orderNumber.replace(/^#/, "")}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium whitespace-nowrap ${badgeStyle.pill}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${badgeStyle.dot}`}
                  />
                  <span>{badgeStyle.label}</span>
                </span>
              </div>

              {/* Date & Meta */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  <span>{order.date}</span>
                </span>
                <span>•</span>
                <span className="text-neutral-300 font-medium">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "Artwork" : "Artworks"}
                </span>
                <span>•</span>
                <span className="text-brand font-bold">
                  {order.totalAmount}
                </span>
              </div>
            </div>

            {/* Certificate Download Action */}
            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 active:scale-[0.98] px-4 py-2.5 sm:py-2 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-brand" />
              <span>Certificate PDF</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN RESPONSIVE CONTENT GRID */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* LEFT COLUMN: Live Tracker & Posters (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* ============================================================== */}
            {/* 1. ORDER TRACKER & MILESTONES (EXACT MATCH WITH IMAGE 2) */}
            {/* ============================================================== */}
            <section
              id="tracker"
              className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 backdrop-blur-md shadow-lg shadow-black/40"
            >
              {/* Tracker Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-red-500" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                    ORDER TRACKER &amp; MILESTONES
                  </h2>
                </div>

                {/* Tracking Code Badge with Copy Action */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
                  <span className="text-neutral-500">Tracking:</span>
                  <span className="text-white font-bold tracking-wide">
                    {order.trackingNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(order.trackingNumber)}
                    className="p-1 rounded text-neutral-400 hover:text-white active:scale-90 transition-all cursor-pointer"
                    title="Copy tracking number"
                  >
                    {copiedTracking ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Courier & Transit Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 sm:mb-6">
                <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 sm:p-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                    LOGISTICS COURIER
                  </span>
                  <span className="text-xs sm:text-sm text-white font-bold mt-1 block leading-snug">
                    {order.courier}
                  </span>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 sm:p-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                    {isDelivered ? "DELIVERED DATE" : "ESTIMATED ARRIVAL"}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-bold mt-1 block leading-snug">
                    {isDelivered
                      ? order.deliveredDate
                      : (order.estimatedDelivery || "Expected in 4-5 business days")}
                  </span>
                </div>
              </div>

              {/* Stepper Timeline (Image 2 Double-Ring Clock, Connecting Line & Centered Dots) */}
              <div className="space-y-0 pt-1">
                {order.milestones.map((milestone, idx) => {
                  const isLast = idx === order.milestones.length - 1;
                  const isDone = milestone.completed;
                  const isCurrent = milestone.current;

                  return (
                    <div key={idx} className="flex gap-3 sm:gap-4 group">
                      {/* Left: Step Indicator Column (Circle + Connecting Line) */}
                      <div className="flex flex-col items-center shrink-0">
                        {/* Dot / Icon Circle (Exact double-ring red clock & centered gray dots from Image 2) */}
                        <div
                          className={`relative flex items-center justify-center rounded-full transition-all duration-200 shrink-0 ${
                            isCurrent
                              ? "h-8 w-8 sm:h-8.5 sm:w-8.5 bg-[#121316] border-2 border-red-500 ring-4 ring-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                              : isDone
                                ? "h-7 w-7 sm:h-8 sm:w-8 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400"
                                : "h-7 w-7 sm:h-8 sm:w-8 bg-[#141619] border border-white/15"
                          }`}
                        >
                          {isCurrent ? (
                            <Clock className="h-4 w-4 text-red-500" strokeWidth={2.2} />
                          ) : isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-neutral-400" />
                          )}
                        </div>

                        {/* Continuous connecting line between steps */}
                        {!isLast && (
                          <div
                            className={`w-[2px] flex-1 my-1.5 min-h-[34px] sm:min-h-[38px] transition-colors ${
                              isDone && !isCurrent
                                ? "bg-emerald-500/35"
                                : "bg-neutral-700/60"
                            }`}
                          />
                        )}
                      </div>

                      {/* Right: Step Content (Exact typography from Image 2) */}
                      <div
                        className={`flex-1 min-w-0 ${
                          !isLast ? "pb-4 sm:pb-5" : "pb-1"
                        } pt-0.5`}
                      >
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h4
                            className={`text-xs sm:text-sm font-bold tracking-wide ${
                              isCurrent
                                ? "text-white"
                                : isDone
                                  ? "text-neutral-200"
                                  : "text-neutral-300"
                            }`}
                          >
                            {milestone.title}
                          </h4>

                          <span
                            className={`text-[10px] sm:text-[11px] font-mono shrink-0 ${
                              isCurrent
                                ? "text-neutral-400"
                                : isDone
                                  ? "text-emerald-400/80"
                                  : "text-neutral-500"
                            }`}
                          >
                            {milestone.date}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-neutral-400 leading-relaxed max-w-xl">
                          {milestone.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ============================================================== */}
            {/* 2. COMMISSIONED POSTERS & SPECIFICATIONS */}
            {/* ============================================================== */}
            <section
              id="posters"
              className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 backdrop-blur-md shadow-lg shadow-black/40"
            >
              <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-brand" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Commissioned Posters ({order.items.length})
                  </h2>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  Museum 300 DPI Curation
                </span>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-3.5 sm:p-4 rounded-xl border border-white/[0.08] bg-black/40 hover:border-white/15 transition-all space-y-3"
                  >
                    {/* Top Row: Thumbnail + Title + Vehicle + Price */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Artwork Preview Thumbnail */}
                      <Link
                        href={`/templates/${item.templateSlug}`}
                        className="group/img relative aspect-[3/4] w-18 xs:w-20 sm:w-24 md:w-28 rounded-lg sm:rounded-xl overflow-hidden border border-white/15 bg-black shrink-0 hover:border-brand transition-all block shadow-lg"
                      >
                        <Image
                          src={item.image}
                          alt={item.templateName}
                          fill
                          sizes="(max-width: 640px) 80px, 112px"
                          className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                      </Link>

                      {/* Info & Pricing */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider text-brand block">
                              Artwork #{index + 1}
                            </span>
                            <Link href={`/templates/${item.templateSlug}`}>
                              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white hover:text-brand transition-colors truncate">
                                {item.templateName}
                              </h3>
                            </Link>
                            <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
                              {item.vehicle}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm md:text-base font-bold font-mono text-white block">
                              {item.price}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              Qty: {item.qty}
                            </span>
                          </div>
                        </div>

                        {/* Serialized Certificate */}
                        <div className="flex items-center gap-1.5 sm:gap-2 pt-2 text-[10px] sm:text-[11px] font-mono text-neutral-400 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-neutral-300">
                            <ShieldCheck className="h-3.5 w-3.5 text-brand shrink-0" />
                            <span>Serial: {item.certificateNumber}</span>
                          </span>
                          <span className="hidden xs:inline">•</span>
                          <span className="text-emerald-400">
                            Verified Hologram Stamped
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specifications Grid (Responsive 1/2/3 cols) */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-white/[0.04] text-[11px]">
                      <div className="rounded-lg border border-white/[0.06] bg-black/50 p-2">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                          Dimensions
                        </span>
                        <span className="text-white font-medium truncate block mt-0.5">
                          {item.sizeLabel}
                        </span>
                      </div>

                      <div className="rounded-lg border border-white/[0.06] bg-black/50 p-2">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                          Substrate
                        </span>
                        <span className="text-white font-medium truncate block mt-0.5">
                          310 GSM Cotton Rag
                        </span>
                      </div>

                      <div className="rounded-lg border border-white/[0.06] bg-black/50 p-2 xs:col-span-2 sm:col-span-1">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                          Framing &amp; Glazing
                        </span>
                        <span
                          className="text-white font-medium truncate block mt-0.5"
                          title={item.framing}
                        >
                          {item.framing}
                        </span>
                      </div>
                    </div>

                    {/* Quick Link to View Template */}
                    <div className="pt-1 flex justify-end">
                      <Link
                        href={`/templates/${item.templateSlug}`}
                        className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors font-medium cursor-pointer"
                      >
                        <span>View Template Page</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Shipping Address, Pricing Breakdown & Provenance */}
          <div className="lg:col-span-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Delivery Address Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-5 backdrop-blur-md space-y-3 sm:col-span-1 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Shipping Destination
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                  Insured Air
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-bold text-white text-sm">
                  {order.shippingAddress.name}
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  {order.shippingAddress.street}
                </p>
                <p className="text-neutral-400">
                  {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
                  {order.shippingAddress.postalCode}
                </p>
                {order.shippingAddress.phone && (
                  <div className="pt-1.5 flex items-center gap-1.5 text-neutral-400 font-mono">
                    <Phone className="h-3 w-3 text-brand shrink-0" />
                    <a
                      href={`tel:${order.shippingAddress.phone}`}
                      className="hover:text-white transition-colors"
                    >
                      {order.shippingAddress.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Invoicing Breakdown */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-5 backdrop-blur-md space-y-3 sm:col-span-1 shadow-lg shadow-black/40">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white pb-2.5 border-b border-white/[0.06]">
                Payment Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Posters Subtotal ({order.items.length} items)</span>
                  <span className="font-mono text-neutral-200">
                    {order.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Insured Express Air Courier</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Reinforced Flight Packaging</span>
                  <span className="font-mono text-emerald-400 font-medium">
                    Included
                  </span>
                </div>

                <div className="pt-2.5 border-t border-white/[0.08] flex justify-between items-center text-sm font-bold text-white">
                  <span>Total Paid</span>
                  <span className="font-mono text-brand text-base sm:text-lg">
                    {order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
