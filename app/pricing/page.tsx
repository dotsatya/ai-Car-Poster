"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Printer,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
} from "lucide-react";
import { PRINT_SIZES } from "@/data/print-sizes";

interface SizeSpec {
  pixels: string;
  ideal: string;
  badge?: string;
  popular?: boolean;
}

const SIZE_SPECS: Record<string, SizeSpec> = {
  a4: {
    pixels: "2,480 × 3,508 px",
    ideal: "Personal workspace, desk display, and collector gift folios.",
    badge: "Studio Edition",
  },
  a3: {
    pixels: "3,508 × 4,960 px",
    ideal: "Office walls, private study rooms, and enthusiast garage bays.",
    badge: "Collector Spec",
  },
  "12x18": {
    pixels: "3,600 × 5,400 px",
    ideal:
      "Classic architectural 2:3 ratio ideal for corridors and modern lounges.",
    badge: "Architectural Proportion",
  },
  a2: {
    pixels: "4,960 × 7,016 px",
    ideal:
      "Our most popular size. Striking, balanced presence above desks and sofas.",
    badge: "Enthusiast Favorite",
    popular: true,
  },
  a1: {
    pixels: "7,016 × 9,933 px",
    ideal:
      "Commanding museum focal point for enthusiast lounges and feature walls.",
    badge: "Exhibition Master",
  },
  ultra: {
    pixels: "7,087 × 14,173 px",
    ideal:
      "Showroom-scale panoramic statement—optimized for the 3-template combined triptych.",
    badge: "Triptych Panoramic",
  },
};

const PRICING_FAQS = [
  {
    q: "Is generating AI previews free?",
    a: "Yes. You can upload your car photograph, select 1 to 3 templates simultaneously, and generate up to 4 high-resolution previews completely free of charge before placing a physical print commission.",
  },
  {
    q: "What paper substrate do you print on?",
    a: "Every poster is executed on 310 GSM 100% acid-free velvet cotton rag fine art paper. Unlike cheap glossy paper, our matte rag completely eliminates specular glare from ceiling LEDs and track lighting.",
  },
  {
    q: "What are your courier shipping rates and delivery timelines?",
    a: "We charge a flat ₹199 for insured express air logistics across India. Prints are cured, sealed, framed, and dispatched within 48 hours in reinforced heavy-duty transit packaging.",
  },
  {
    q: "Do you include a Certificate of Authenticity?",
    a: "Yes. Every physical commission is stamped with a serialized tamper-evident hologram seal and accompanied by an official Certificate of Authenticity logged in our Atelier Registry.",
  },
  {
    q: "Can I commission multiple prints with different sizes in one order?",
    a: "Yes. In our review and checkout screens, you can select any combination of generated previews and independently customize their print size, quantity, and framing options.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="py-6 sm:py-8 lg:py-12 bg-bg-primary overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. HERO HEADER */}
      {/* ============================================================== */}
      <section className="relative pb-8 sm:pb-12 lg:pb-16 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl tracking-wide sm:tracking-wider text-white leading-[1.08] font-heading uppercase">
            Museum-Grade Fine Art Editions
          </h1>
          <p className="mt-2.5 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
            Honest, transparent pricing for bespoke automotive generative art.
            Executed on 310 GSM 100% cotton rag with 12-pigment archival Giclée
            inks certified 100+ years lightfast.
          </p>

          {/* Key Value Badges */}
          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 shrink-0">
              <Printer className="h-3.5 w-3.5 text-brand" />
              12-Pigment Giclée
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              Serialized Hologram Seal
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 shrink-0">
              <Truck className="h-3.5 w-3.5 text-brand" />
              Flat ₹199 Insured Air Courier
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. PRINT SIZES PRICING GRID */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
                ARCHIVAL CANVAS SIZES
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading uppercase">
              Choose Your Physical Format
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl">
              All sizes governed by true 300 DPI native pixel counts and
              physical millimeter execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PRINT_SIZES.map((size) => {
              const spec = SIZE_SPECS[size.id] || {
                pixels: "300 DPI Verified Canvas",
                ideal: "Museum-grade archival cotton rag execution.",
                badge: "Fine Art Spec",
              };
              const isPopular = spec.popular || size.popular;

              return (
                <div
                  key={size.id}
                  className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-xl ${
                    isPopular
                      ? "border-brand/60 bg-[#0E1013] shadow-2xl shadow-brand/15 ring-1 ring-brand/40 -translate-y-1 sm:-translate-y-1.5"
                      : "border-white/[0.08] bg-[#0E1013]/80 hover:border-white/20 hover:bg-[#121418] hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none">
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-brand/30 ring-1 ring-white/20 font-mono">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Top Tier & Dimensions */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        {size.dimensions}
                      </span>
                      <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-neutral-300">
                        {spec.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-white font-heading uppercase">
                      {size.label}
                    </h3>

                    {/* Price Header */}
                    <div className="mt-2.5 sm:mt-3 pb-3 sm:pb-4 border-b border-white/[0.06] flex items-baseline gap-2">
                      <span className="text-2xl sm:text-4xl font-extrabold text-brand font-mono">
                        {size.price}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        / edition
                      </span>
                    </div>

                    {/* 300 DPI Canvas Box */}
                    <div className="mt-3 sm:mt-4 rounded-xl border border-white/[0.06] bg-black/50 p-2.5">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold font-mono">
                        Verified 300 DPI Canvas
                      </span>
                      <span className="text-xs font-mono font-bold text-white mt-0.5 block">
                        {spec.pixels}
                      </span>
                    </div>

                    <p className="mt-2.5 sm:mt-3 text-xs text-neutral-400 leading-relaxed">
                      {spec.ideal}
                    </p>

                    {/* Feature Checklist */}
                    <div className="mt-4 sm:mt-5 space-y-2 text-xs text-neutral-300 border-t border-white/[0.06] pt-3 sm:pt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>310 GSM 100% Cotton Rag Paper</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>12-Pigment Lightfast Giclée Inks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>Serialized Hologram &amp; Certificate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>Insured Express Courier Dispatch</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="mt-5 sm:mt-6 pt-2">
                    <Link
                      href={`/studio?size=${size.id}`}
                      className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isPopular
                          ? "bg-brand hover:bg-brand-hover text-white shadow-sm shadow-brand/30 hover:shadow-brand/50"
                          : "border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white"
                      }`}
                    >
                      <span>Create in This Size</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. INCLUDED ATELIER STANDARDS (3 Pillars) */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-14 lg:py-16 border-t border-white/[0.06] bg-[#07080A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
                THE PHYSICAL ATELIER STANDARD
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-3xl font-bold tracking-tight text-white font-heading uppercase">
              Included with Every Commission
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
              We never compromise on material integrity. Every physical delivery
              includes museum cotton rag, aerospace aluminum framing, and
              serialized provenance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">
                01 / ARCHIVAL SUBSTRATE
              </span>
              <h4 className="mt-2 text-base font-bold text-white font-heading uppercase">
                310 GSM Museum Cotton Rag
              </h4>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                100% acid-free cotton fiber featuring a velvety matte texture
                that eliminates glare from ceiling lights, garage LEDs, and
                showroom spotlights.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">
                02 / AEROSPACE FRAMING
              </span>
              <h4 className="mt-2 text-base font-bold text-white font-heading uppercase">
                CNC Anodized Obsidian Aluminum
              </h4>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                Precision CNC-machined aluminum framing finished in deep
                anodized obsidian or brushed titanium, glazed with UV-filtering
                museum-grade acrylic.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 backdrop-blur-md hover:border-white/20 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-xs font-bold text-brand">
                03 / PROVENANCE SEAL
              </span>
              <h4 className="mt-2 text-base font-bold text-white font-heading uppercase">
                Serialized Hologram &amp; COA
              </h4>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                Each edition is assigned a permanent serial identifier in our
                registry, stamped with a tamper-evident holographic seal and
                numbered Certificate of Authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PRICING FAQ ACCORDION */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-14 lg:py-16 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
            <h2 className="mt-1 text-xl sm:text-3xl font-bold tracking-tight text-white font-heading uppercase">
              Pricing &amp; Shipping Queries
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our transparent edition pricing,
              courier timelines, and bespoke museum framing.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {PRICING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.08] bg-[#0E1013]/80 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left text-xs sm:text-sm font-bold text-white hover:text-brand transition-colors cursor-pointer gap-3"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04] pt-2.5 sm:pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. BOTTOM CALL TO ACTION */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-14 lg:py-16 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-neutral-950 via-neutral-900 to-black p-6 sm:p-10 lg:p-12 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[600px] rounded-full bg-brand/15 blur-[100px]" />

            <div className="inline-flex items-center gap-2 mb-2 relative z-10">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-brand font-mono">
                READY TO COMMENCE YOUR COMMISSION?
              </span>
            </div>
            <h3 className="mt-1 text-xl sm:text-3xl font-bold text-white relative z-10 font-heading uppercase">
              Transform Your Car into Fine Art
            </h3>
            <p className="mt-2 max-w-lg mx-auto text-xs sm:text-sm text-neutral-400 relative z-10 leading-relaxed">
              Upload one photo, select up to 3 templates, and preview your
              custom automotive poster in minutes with zero commitment.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 relative z-10 w-full sm:w-auto">
              <Link
                href="/studio"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Launch Creation Studio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer w-full sm:w-auto"
              >
                <Layers className="h-4 w-4 text-brand" />
                <span>Browse All 29 Templates</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
