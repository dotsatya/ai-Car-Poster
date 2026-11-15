"use client";

import { use } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { AccountNav } from "@/components/account/AccountNav";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = use(params);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    toast.success("Copied to clipboard", { description: text });
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <AccountNav />

      <main className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-12 py-4 sm:py-8">
        {/* Back navigation */}
        <div className="mb-3.5 sm:mb-6">
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Orders</span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-white">
                Order #{id || "PG-2026-911RS"}
              </h1>
              <span className="rounded-full bg-brand/10 border border-brand/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                In Transit
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
              Archival giclée commission registered with Certificate of Authenticity.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toast.success("Certificate downloaded", { description: "Verified archival print seal." })}
            className="shrink-0 inline-flex items-center gap-1 rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Certificate PDF</span>
          </button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5 space-y-3.5">
              <div className="flex flex-row gap-3 sm:gap-4 items-start">
                <div className="relative aspect-[3/4] w-20 sm:w-28 rounded-lg sm:rounded-xl overflow-hidden border border-white/[0.08] bg-black shrink-0">
                  <Image
                    src="/template photo/1.webp"
                    alt="Porsche 911 GT3 RS Minimalist"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand">
                    Commissioned Artwork
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    Porsche 911 GT3 RS Minimalist
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400">
                    Chassis geometry &amp; clean typography on museum rag.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">
                        Dimensions
                      </span>
                      <span className="text-[11px] sm:text-xs text-white font-medium mt-0.5 block truncate">
                        A2 Gallery (42.0 × 59.4 cm)
                      </span>
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">
                        Media Substrate
                      </span>
                      <span className="text-[11px] sm:text-xs text-white font-medium mt-0.5 block truncate">
                        300 GSM Archival Cotton
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courier milestones */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-3.5 sm:p-5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Shipment Milestones
                </h3>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-[11px] before:w-[2px] before:bg-white/10">
                <div className="relative flex items-start gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white border border-brand text-xs z-10 animate-pulse">
                    <Clock className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">In Transit via DHL Air Express</p>
                    <p className="text-[11px] text-neutral-400">Departed Frankfurt Logistics Hub. Clearance completed.</p>
                    <span className="text-[10px] font-mono text-neutral-500">Nov 14, 2026 • 09:40 UTC</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black border border-emerald-500 text-xs z-10">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Museum Curation &amp; Archival Seal</p>
                    <p className="text-[11px] text-neutral-400">Individually inspected and stamped with security serial PG-911RS-004.</p>
                    <span className="text-[10px] font-mono text-neutral-500">Nov 13, 2026 • 16:15 UTC</span>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black border border-emerald-500 text-xs z-10">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Commission Confirmed</p>
                    <p className="text-[11px] text-neutral-400">Payment cleared and queued for 12-color archival giclée print.</p>
                    <span className="text-[10px] font-mono text-neutral-500">Nov 12, 2026 • 11:20 UTC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Tracking Details
              </span>
              <div className="flex items-center justify-between text-xs text-neutral-300 font-mono">
                <span>DHL-9482-7710-DE</span>
                <button
                  type="button"
                  onClick={() => handleCopy("DHL-9482-7710-DE")}
                  className="p-1 hover:text-white transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-neutral-400">
                Estimated Delivery: <strong className="text-white">Monday, Nov 16</strong>
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/50 p-5 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Certificate Registry
              </span>
              <div className="flex items-center gap-2 text-xs text-neutral-200">
                <ShieldCheck className="h-4 w-4 text-brand shrink-0" />
                <span className="font-mono text-xs">CERT-ATELIER-911RS-004</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Guaranteed genuine 12-color pigment archival print on museum-grade rag.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
