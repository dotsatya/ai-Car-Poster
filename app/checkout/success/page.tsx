"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  Download,
  Copy,
  Printer,
  ArrowRight,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "PG-2026-98142";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(orderId);
    setCopied(true);
    toast.success("Order ID copied to clipboard", { description: orderId });
    setTimeout(() => setCopied(false), 2000);
  };

  const milestones = [
    {
      title: "Order Received",
      time: "Today, Just now",
      status: "completed",
      description: "Order confirmed and logged in the Atelier fine-art production registry.",
    },
    {
      title: "Preparing Artwork",
      time: "Within 4 hours",
      status: "current",
      description: "Digital AI diffusion master scaled at 300+ DPI. Prepress curation & color grading.",
    },
    {
      title: "Printing",
      time: "Tomorrow",
      status: "upcoming",
      description: "12-color archival giclée plotter execution on 310 GSM 100% cotton rag paper.",
    },
    {
      title: "Quality Check & Packing",
      time: "Day 2",
      status: "upcoming",
      description: "Chromatics inspection, serialized hologram seal applied, and protective flight casing.",
    },
    {
      title: "Shipped",
      time: "Day 3",
      status: "upcoming",
      description: "Dispatched via insured express air courier logistics with end-to-end telemetry.",
    },
    {
      title: "Out for Delivery",
      time: "Day 4",
      status: "upcoming",
      description: "Package arrived at local delivery hub and out for white-glove collector handover.",
    },
    {
      title: "Delivered",
      time: "Day 5",
      status: "upcoming",
      description: "Successfully handed over and confirmed with recipient signature.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary pb-24 text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Hero Success Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-neutral-900 to-black border border-emerald-500/40 text-emerald-400 shadow-2xl">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
            </div>
          </div>

          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-brand font-mono block">
            OFFICIAL ATELIER COMMISSION
          </span>
          <h1 className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight text-white font-heading uppercase">
            Order Successfully Placed
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Thank you for your commission. Your bespoke automotive artwork has been serialized and queued for 12-pigment archival printing.
          </p>

          {/* Order ID Pill with Copy */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/50 px-4 py-2 text-xs font-mono">
            <span className="text-neutral-400">Order Reference:</span>
            <span className="font-bold text-white">{orderId}</span>
            <button
              onClick={handleCopy}
              className="ml-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Order ID"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            {copied && <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>}
          </div>
        </div>

        {/* Two-Column Grid: Left Production Timeline, Right Order & Delivery Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: 5-Stage Live Production Milestones */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Live Production Milestones
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  Estimated Dispatch: 48 Hours
                </span>
              </div>

              {/* Milestones list */}
              <div className="space-y-5">
                {milestones.map((m, idx) => {
                  const isCompleted = m.status === "completed";
                  const isCurrent = m.status === "current";

                  return (
                    <div key={idx} className="flex items-start gap-3.5 relative">
                      {idx !== milestones.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-7 bottom-0 w-[2px] -mb-2 ${
                            isCompleted ? "bg-emerald-500/50" : "bg-white/[0.06]"
                          }`}
                        />
                      )}

                      {/* Icon Indicator */}
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                          isCompleted
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm shadow-emerald-500/30"
                            : isCurrent
                            ? "bg-brand/20 border-brand text-brand ring-4 ring-brand/10 shadow-sm shadow-brand/30 animate-pulse"
                            : "bg-white/[0.04] border-white/10 text-neutral-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <span className="font-mono text-[10px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      {/* Detail */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-xs sm:text-sm font-bold ${
                              isCompleted || isCurrent ? "text-white" : "text-neutral-400"
                            }`}
                          >
                            {m.title}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                            {m.time}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-neutral-400 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-5 sm:p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Serialized Certificate of Authenticity
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Numbered hologram seal registered in our private Atelier Registry.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  toast.success("Certificate Downloaded", {
                    description: `Official Certificate for ${orderId} generated.`,
                  })
                }
                className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-3 py-2 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="h-3.5 w-3.5 text-brand" />
                <span>Certificate PDF</span>
              </button>
            </div>
          </div>

          {/* Right Column: Delivery Details & Navigation Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery Destination Box */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-5 sm:p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-brand" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Delivery Destination
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                  Insured DHL Air
                </span>
              </div>

              <div className="text-xs space-y-1 text-neutral-300">
                <p className="font-bold text-white text-sm">Satya Dey</p>
                <p>Studio 4B, Atelier Penthouse, Bandra West</p>
                <p>Mumbai, 400050 · India</p>
                <p className="text-[11px] text-neutral-400 font-mono pt-1">+91 98765 43210</p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-3 text-[11px] text-neutral-400 flex items-center gap-2">
                <Package className="h-4 w-4 text-brand shrink-0" />
                <span>Packaged in heavy-duty triangular museum grade fine art cylinder.</span>
              </div>
            </div>

            {/* Print Specification & Substrate */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-5 sm:p-6 backdrop-blur-xl space-y-3.5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
                <Printer className="h-4 w-4 text-brand" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Museum Print Standard
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">
                    Substrate
                  </span>
                  <span className="text-xs font-bold text-white mt-0.5 block">
                    310 GSM Cotton
                  </span>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">
                    Resolution
                  </span>
                  <span className="text-xs font-bold text-brand font-mono mt-0.5 block">
                    Verified 300 DPI
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions: Only Track in My Orders */}
            <div className="space-y-2.5">
              <Link
                href="/account/orders"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Track in My Orders</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-primary flex items-center justify-center text-white text-xs font-mono">
          Loading order details...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
