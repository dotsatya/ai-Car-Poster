"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Search,
  Copy,
  Download,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AccountNav } from "@/components/account/AccountNav";

interface OrderMilestone {
  date: string;
  title: string;
  detail: string;
  completed: boolean;
  current?: boolean;
}

interface AtelierOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "in_transit" | "processing" | "delivered";
  statusLabel: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  courier: string;
  trackingNumber: string;
  templateName: string;
  templateSlug: string;
  vehicle: string;
  sizeLabel: string;
  framing: string;
  certificateNumber: string;
  price: string;
  image: string;
  milestones: OrderMilestone[];
}

const DUMMY_ORDERS: AtelierOrder[] = [
  {
    id: "ord-1",
    orderNumber: "PG-2026-911RS",
    date: "November 12, 2026",
    status: "in_transit",
    statusLabel: "In Transit · International Air",
    estimatedDelivery: "Monday, Nov 16, 2026",
    courier: "DHL Express Worldwide · Insured Fine Art Flight",
    trackingNumber: "DHL-9482-7710-DE",
    templateName: "Porsche 911 GT3 RS Minimalist Spec",
    templateSlug: "porsche-911-gt3-rs-minimalist-spec",
    vehicle: "Porsche 911 GT3 RS (992) — Ice Grey / Pyro Red",
    sizeLabel: "A2 Gallery (42.0 × 59.4 cm)",
    framing: "CNC Matte Obsidian Aluminum · Museum UV Acrylic Glazing",
    certificateNumber: "CERT-#0892-GT3",
    price: "$214.00",
    image: "/template photo/1.webp",
    milestones: [
      {
        date: "Nov 12, 2026 · 14:22",
        title: "Commission Placed & Authenticated",
        detail: "Digital AI diffusion master rendered at 300+ DPI. Order verified in production registry.",
        completed: true,
      },
      {
        date: "Nov 13, 2026 · 09:15",
        title: "12-Color Archival Giclée Plotter Execution",
        detail: "Printed on 310 GSM 100% cotton rag paper. 24-hour pigment curing cycle completed.",
        completed: true,
      },
      {
        date: "Nov 14, 2026 · 16:40",
        title: "Aerospace Aluminum Framing & Glazing",
        detail: "Mounted inside CNC anodized frame with UV-filtering acrylic. Serialized seal embossed.",
        completed: true,
      },
      {
        date: "Nov 15, 2026 · 08:30",
        title: "Dispatched via Insured Express Air Courier",
        detail: "Departed European logistics hub (Leipzig). In transit to destination customs hub.",
        completed: true,
        current: true,
      },
      {
        date: "Expected Nov 16, 2026",
        title: "Final Courier Handover & Signature",
        detail: "Dispatched with white-glove direct recipient signature requirement.",
        completed: false,
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "PG-2026-BRG02",
    date: "November 11, 2026",
    status: "processing",
    statusLabel: "Archival Framing & Glazing",
    estimatedDelivery: "Wednesday, Nov 18, 2026",
    courier: "FedEx Custom Critical Fine Art Services",
    trackingNumber: "Pending Courier Handover (Expected Nov 14)",
    templateName: "Porsche 911 GT3 RS British Racing Green & Gold",
    templateSlug: "porsche-911-gt3-rs-racing-green-gold",
    vehicle: "Porsche 911 GT3 RS — Weissach Package",
    sizeLabel: "Panoramic Grand (60.0 × 120.0 cm)",
    framing: "Hand-Brushed Champagne Gold Anodized Aluminum · Anti-Glare Acrylic",
    certificateNumber: "CERT-#0744-BRG",
    price: "$414.00",
    image: "/template photo/2.webp",
    milestones: [
      {
        date: "Nov 11, 2026 · 18:04",
        title: "Commission Placed & Authenticated",
        detail: "High-resolution panoramic triptych layout approved by atelier lead master.",
        completed: true,
      },
      {
        date: "Nov 12, 2026 · 11:30",
        title: "Archival Giclée Large-Format Print",
        detail: "Executed on wide-format fine art plotter using lightfast 12-pigment archival inks.",
        completed: true,
      },
      {
        date: "Nov 13, 2026 · 15:10",
        title: "Hand-Assembled Aerospace Framing",
        detail: "Custom champagne gold frame fabrication in progress. Undergoing final glare inspection.",
        completed: true,
        current: true,
      },
      {
        date: "Expected Nov 14, 2026",
        title: "Reinforced Impact Packaging & Dispatch",
        detail: "Sealed in wooden reinforced transit crate for express priority flight handover.",
        completed: false,
      },
      {
        date: "Expected Nov 18, 2026",
        title: "Collector Destination Delivery",
        detail: "Direct insured courier delivery to designated private garage address.",
        completed: false,
      },
    ],
  },
  {
    id: "ord-3",
    orderNumber: "PG-2026-720MC",
    date: "October 28, 2026",
    status: "delivered",
    statusLabel: "Delivered & Signed by Collector",
    deliveredDate: "November 02, 2026 · Signed by Collector",
    courier: "DHL Express Worldwide",
    trackingNumber: "DHL-3810-9921-GB",
    templateName: "McLaren 720S Red Street Graffiti Edition",
    templateSlug: "mclaren-720s-red-graffiti",
    vehicle: "McLaren 720S Performance Coupe",
    sizeLabel: "A1 Exhibition (59.4 × 84.1 cm)",
    framing: "Deep Anodized Obsidian Shadow Box · 310 GSM Cotton Rag",
    certificateNumber: "CERT-#0621-720",
    price: "$294.00",
    image: "/template photo/3.webp",
    milestones: [
      {
        date: "Oct 28, 2026 · 10:12",
        title: "Order Placed & Verified",
        detail: "Client photo processed and color-graded for Street Graffiti palette.",
        completed: true,
      },
      {
        date: "Oct 29, 2026 · 14:00",
        title: "Print & Shadow Box Assembly",
        detail: "Archival mounting completed. Serialized hologram affixed to backing board.",
        completed: true,
      },
      {
        date: "Oct 30, 2026 · 19:45",
        title: "Dispatched via Express Courier",
        detail: "Airway bill generated, collected from atelier dispatch desk.",
        completed: true,
      },
      {
        date: "Nov 02, 2026 · 11:24",
        title: "Delivered & Handed Over",
        detail: "Package delivered in pristine condition. Proof of delivery signed by client.",
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: "ord-4",
    orderNumber: "PG-2026-SHARK",
    date: "October 14, 2026",
    status: "delivered",
    statusLabel: "Delivered & Signed by Collector",
    deliveredDate: "October 19, 2026 · Signed by Collector",
    courier: "UPS Worldwide Express Fine Art",
    trackingNumber: "1Z-892A-4491-002",
    templateName: "Porsche 911 Turbo S Shark Blue Tokyo Cyber",
    templateSlug: "porsche-911-turbo-s-shark-blue-cyber",
    vehicle: "Porsche 911 Turbo S (992)",
    sizeLabel: "A3 Studio (29.7 × 42.0 cm)",
    framing: "Unframed Fine Art Folio Presentation with Serialized Seal",
    certificateNumber: "CERT-#0510-TYO",
    price: "$154.00",
    image: "/template photo/4.webp",
    milestones: [
      {
        date: "Oct 14, 2026 · 16:30",
        title: "Order Placed & Verified",
        detail: "Tokyo Cyber graphic elements combined with client vehicle photo.",
        completed: true,
      },
      {
        date: "Oct 15, 2026 · 10:00",
        title: "310 GSM Hahnemühle Giclée Print",
        detail: "High-density pigment curing on heavyweight cotton rag paper.",
        completed: true,
      },
      {
        date: "Oct 16, 2026 · 13:15",
        title: "Dispatched via Priority Air",
        detail: "Shipped flat in archival acid-free museum presentation folio.",
        completed: true,
      },
      {
        date: "Oct 19, 2026 · 14:48",
        title: "Delivered & Handed Over",
        detail: "Successfully delivered. Digital download token activated in user account.",
        completed: true,
        current: true,
      },
    ],
  },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<AtelierOrder | null>(null);

  // Close modal on Escape key and lock body scrolling
  useEffect(() => {
    if (!activeTrackingOrder) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTrackingOrder(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTrackingOrder]);

  const filteredOrders = DUMMY_ORDERS.filter((order) => {
    // Tab filter
    if (filter === "active" && order.status === "delivered") return false;
    if (filter === "delivered" && order.status !== "delivered") return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(q) ||
      order.vehicle.toLowerCase().includes(q) ||
      order.templateName.toLowerCase().includes(q) ||
      order.certificateNumber.toLowerCase().includes(q)
    );
  });

  const handleCopyTracking = (tracking: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tracking);
      toast.success("Tracking Number Copied", {
        description: `${tracking} copied to clipboard`,
      });
    }
  };

  const handleDownloadDigitalMaster = (order: AtelierOrder) => {
    toast.success("Digital Master Download Ready", {
      description: `300 DPI master render package for ${order.orderNumber} initialized.`,
    });
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <AccountNav />
      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8">
        {/* Subsection Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-3.5 sm:mb-6">
          <div>
            <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white">
              Order History
            </h1>
      
          </div>

          <Link
            href="/studio"
            className="shrink-0 inline-flex items-center gap-1 rounded-lg sm:rounded-xl bg-brand hover:bg-brand-hover px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>New Poster</span>
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-6">
          {/* Status Tabs without scrollbar track */}
          <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === "all"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Orders ({DUMMY_ORDERS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("active")}
              className={`rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === "active"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Active &amp; In Transit (2)
            </button>
            <button
              type="button"
              onClick={() => setFilter("delivered")}
              className={`rounded-md sm:rounded-lg px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filter === "delivered"
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Delivered (2)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-60 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-500" />
            <input
              type="text"
              placeholder="Search order ID or vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg sm:rounded-xl border border-white/10 bg-neutral-900/60 pl-8 pr-3 py-1.5 text-[11px] sm:text-xs text-white placeholder-neutral-500 focus:border-brand focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-8 sm:p-12 text-center hover:border-white/20 transition-all duration-300">
            <Package className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
            <h3 className="text-sm sm:text-base font-bold text-white">No Matching Commissions Found</h3>
            <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 max-w-sm mx-auto">
              No orders matched your filter. Try adjusting your search query or reset your status tabs.
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
          <div className="space-y-3.5 sm:space-y-5">
            {filteredOrders.map((order) => {
              const isInTransit = order.status === "in_transit";
              const isProcessing = order.status === "processing";
              const isDelivered = order.status === "delivered";

              return (
                <div
                  key={order.id}
                  className="group rounded-xl border border-white/[0.08] bg-neutral-900/40 p-3 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:shadow-xl hover:shadow-black/70 hover:-translate-y-0.5 shadow-lg shadow-black/40"
                >
                  {/* Top Bar: Order ID, Date, Status, Total */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2 sm:pb-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                        {order.orderNumber}
                      </span>
                      <span className="text-neutral-600 hidden xs:inline">•</span>
                      <span className="text-[10px] sm:text-xs text-neutral-400 truncate hidden xs:inline">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                          isInTransit
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : isProcessing
                            ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isInTransit
                              ? "bg-amber-400 animate-pulse"
                              : isProcessing
                              ? "bg-sky-400 animate-pulse"
                              : "bg-emerald-400"
                          }`}
                        />
                        <span>{order.statusLabel}</span>
                      </span>

                      <span className="font-bold text-xs sm:text-sm md:text-base text-white">
                        {order.price}
                      </span>
                    </div>
                  </div>

                  {/* Main Grid: Poster Preview + Spec Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 items-start">
                    {/* Left: Poster Artwork Thumbnail & Info in clean flex row */}
                    <div className="md:col-span-8 lg:col-span-8 flex items-start gap-3 sm:gap-4 min-w-0">
                      <Link
                        href={`/templates/${order.templateSlug}`}
                        className="group/img relative aspect-[3/4] w-16 sm:w-20 md:w-24 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-white/15 bg-black shadow-md hover:border-brand transition-all cursor-pointer block"
                      >
                        <Image
                          src={order.image}
                          alt={order.templateName}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                      </Link>

                      {/* Middle: Vehicle Spec, Size, Certificate */}
                      <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
                        <div>
                          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-brand block">
                            {order.templateName}
                          </span>
                          <h2 className="font-sans normal-case text-xs sm:text-sm md:text-base font-bold text-white truncate mt-0.5">
                            {order.vehicle}
                          </h2>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] text-neutral-300">
                          <span className="rounded bg-black/50 border border-white/10 px-1.5 py-0.5 font-mono">
                            {order.sizeLabel}
                          </span>
                          <span className="rounded bg-black/50 border border-white/10 px-1.5 py-0.5 truncate max-w-[200px]">
                            {order.framing}
                          </span>
                        </div>

                        {/* Registration Seal & Courier Preview */}
                        <div className="flex items-center gap-2 pt-0.5 text-[9px] sm:text-[10px] text-neutral-400 font-mono">
                          <span className="inline-flex items-center gap-1 text-neutral-300 shrink-0">
                            <ShieldCheck className="h-3 w-3 text-brand" />
                            <span>{order.certificateNumber}</span>
                          </span>
                          <span>•</span>
                          <span className="truncate">{order.courier}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Courier Status & Action Buttons */}
                    <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-between space-y-2 pt-2.5 md:pt-0 border-t md:border-t-0 md:border-l border-white/[0.06] md:pl-4">
                      {/* Tracking / Delivery Note */}
                      <div className="rounded-lg border border-white/[0.06] bg-black/30 p-2 sm:p-2.5">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-0.5">
                          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                            {isDelivered ? "Delivered On" : "Estimated Arrival"}
                          </span>
                          <span className="text-white font-bold text-[10px] sm:text-xs">
                            {isDelivered ? order.deliveredDate : order.estimatedDelivery}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-neutral-300">
                          <span className="truncate">{order.trackingNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyTracking(order.trackingNumber)}
                            title="Copy Tracking Number"
                            className="p-0.5 hover:text-white transition-colors cursor-pointer text-neutral-400"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Action CTAs: side-by-side on mobile, stacked on desktop */}
                      <div className="flex flex-row md:flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveTrackingOrder(order)}
                          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-white transition-all cursor-pointer whitespace-nowrap"
                        >
                          <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand" />
                          <span>Track</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadDigitalMaster(order)}
                          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-transparent hover:bg-white/[0.04] border border-white/10 px-2.5 py-1.5 text-[10px] sm:text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                        >
                          <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-400" />
                          <span>Digital Master</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Tracking Modal / Milestone Timeline Drawer */}
      {activeTrackingOrder && (
        <div
          onClick={() => setActiveTrackingOrder(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tracking-modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-lg rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-7 shadow-2xl hover:border-white/25 transition-all duration-300 max-h-[calc(100vh-3rem)] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveTrackingOrder(null)}
              className="absolute top-4 right-4 rounded-xl p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/10"
              aria-label="Close tracking"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2.5 pr-8">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/30 text-brand">
                <Truck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand block">
                  Courier Milestones
                </span>
                <h3 id="tracking-modal-title" className="text-base font-bold text-white truncate">
                  {activeTrackingOrder.orderNumber}
                </h3>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl border border-white/[0.08] bg-neutral-900/60 text-xs space-y-1.5">
              <div className="text-neutral-400 leading-snug">
                Courier: <strong className="text-white">{activeTrackingOrder.courier}</strong>
              </div>
              <div className="text-neutral-400 font-mono text-[11px] flex items-center justify-between gap-2 pt-1 border-t border-white/[0.06]">
                <span className="truncate">Tracking: {activeTrackingOrder.trackingNumber}</span>
                <button
                  type="button"
                  onClick={() => handleCopyTracking(activeTrackingOrder.trackingNumber)}
                  className="text-brand hover:underline cursor-pointer shrink-0 font-sans text-xs font-semibold"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="mt-6 space-y-5 relative before:absolute before:inset-0 before:left-[13px] before:w-[2px] before:bg-white/10">
              {activeTrackingOrder.milestones.map((m, idx) => {
                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Circle icon indicator */}
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs z-10 transition-colors ${
                        m.current
                          ? "bg-brand text-white border-brand shadow-lg shadow-brand/40 animate-pulse"
                          : m.completed
                          ? "bg-emerald-500 text-black border-emerald-500"
                          : "bg-neutral-900 text-neutral-500 border-white/20"
                      }`}
                    >
                      {m.completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                    </div>

                    {/* Step details */}
                    <div className="flex-1 pt-0.5 min-w-0">
                      <div className="flex flex-wrap sm:flex-nowrap items-baseline justify-between gap-2 text-xs">
                        <span className="font-bold text-white leading-tight">{m.title}</span>
                        <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                          {m.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                        {m.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Modal Action */}
            <div className="mt-7 pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTrackingOrder(null)}
                className="rounded-xl border border-white/[0.08] hover:border-white/25 bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
