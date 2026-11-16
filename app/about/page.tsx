"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Truck,
  ArrowRight,
  Sliders,
  Lock,
  Cpu,
  Palette,
  Eye,
  Camera,
  Sparkles,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { StorySection } from "@/components/home/StorySection";
import { PRINT_SIZES } from "@/data/print-sizes";

const SIZE_RESOLUTIONS: Record<string, { pixels: string; ideal: string }> = {
  a4: {
    pixels: "2,480 × 3,508 px",
    ideal: "Compact desk displays, studio frames, and collector folios.",
  },
  a3: {
    pixels: "3,508 × 4,960 px",
    ideal: "Personal office, desk display, and compact enthusiast garages.",
  },
  "12x18": {
    pixels: "3,600 × 5,400 px",
    ideal: "Classic architectural proportions ideal for study rooms and corridors.",
  },
  a2: {
    pixels: "4,960 × 7,016 px",
    ideal: "Our most popular collector size. Striking, balanced wall presence.",
  },
  a1: {
    pixels: "7,016 × 9,933 px",
    ideal: "Commanding museum presence for living spaces and automotive galleries.",
  },
  ultra: {
    pixels: "7,087 × 14,173 px",
    ideal: "Full showroom showcase spanning wide automotive wall installations.",
  },
};

export default function AboutPage() {
  const [activePhotoTab, setActivePhotoTab] = useState<"after" | "before">(
    "after",
  );
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  const processSteps = [
    {
      step: "01",
      title: "Select 1 to 3 Master Templates",
      tagline: "Curated Atelier Archive",
      summary:
        "Explore our archive of 29 distinct artistic disciplines—from Technical Spec and Bauhaus to Tokyo Cyber, Vintage Monaco, and Street Graffiti.",
      details: [
        "Select up to 3 templates simultaneously to compare different aesthetic interpretations of your car.",
        "Real-time floating selection bar preserves choices across full catalog browsing.",
        "Single-template, two-template, and three-template paths fully supported.",
      ],
      icon: Palette,
      highlight: "1 to 3 Templates",
    },
    {
      step: "02",
      title: "Upload Vehicle Photo & Customize",
      tagline: "Authentic Chassis Preservation",
      summary:
        "Upload a single high-resolution photograph of your machine from any angle, track pit, mountain pass, or garage lighting.",
      details: [
        "Proprietary neural vision isolates aerodynamic splitters, wheel geometries, and body reflection curves.",
        "Never substitutes generic 3D stock models—your car's exact stance and imperfections are honored.",
        "Add optional chassis designation, engine code, or personalized serial badge text.",
      ],
      icon: Sliders,
      highlight: "Raw Photo → Vector AI",
    },
    {
      step: "03",
      title: "Email & OTP Member Verification",
      tagline: "State-Preserved Authentication",
      summary:
        "Quick sign-in with your email address and prototype passcode (0000). Your inputs survive authentication without reset.",
      details: [
        "Your uploaded image, chosen templates, and custom typography inputs are preserved seamlessly.",
        "Authenticated sessions link your generations to your private Atelier Registry.",
        "Protected from accidental browser closes with cloud-persisted generation job queues.",
      ],
      icon: Lock,
      highlight: "Passcode: 0000",
    },
    {
      step: "04",
      title: "Generative AI Pipeline & Combined Triptych",
      tagline: "300+ DPI Neural Synthesis",
      summary:
        "Our specialized diffusion models render individual master artworks separately, plus an exclusive Combined Triptych blending your choices.",
      details: [
        "Generates 1 to 3 individual master previews with live status tracking (Queued → Processing → Completed).",
        "When 2 or 3 templates are chosen, an optional Combined Preview blends design elements into a single harmonized panoramic composition.",
        "Delivers up to 4 distinct museum-grade outputs per session (3 individual + 1 combined).",
      ],
      icon: Cpu,
      highlight: "Up to 4 Master Previews",
    },
    {
      step: "05",
      title: "Review Previews & Select Posters",
      tagline: "Full-Resolution Inspection",
      summary:
        "Inspect high-resolution previews with zoom capabilities. Select any non-empty combination of ready artworks for physical print commission.",
      details: [
        "Review individual compositions and the combined triptych side-by-side.",
        "Independent sizing and quantity configuration per poster artwork.",
        "Unselected previews remain safely accessible in your account for future print orders.",
      ],
      icon: Eye,
      highlight: "Multi-Poster Selection",
    },
    {
      step: "06",
      title: "Archival Giclée Print & Aerospace Framing",
      tagline: "100+ Year Fine Art Longevity",
      summary:
        "Executed on industrial 12-color pigment Giclée plotters with 310 GSM 100% cotton rag paper and CNC-machined aluminum framing.",
      details: [
        "Substrate: 310 GSM 100% acid-free velvet cotton rag paper that eliminates glare.",
        "Inks: 12-pigment archival Giclée inks certified 100+ years lightfast without fading.",
        "Framing: CNC-machined aerospace matte aluminum with UV-filtering museum acrylic glazing.",
        "Embossed serialized hologram seal and numbered Certificate of Authenticity included.",
      ],
      icon: Printer,
      highlight: "310 GSM Cotton Rag",
    },
    {
      step: "07",
      title: "Insured Air Courier & Live Milestone Tracking",
      tagline: "Global White-Glove Dispatch",
      summary:
        "Dispatched in reinforced wooden-backed transit packaging with direct recipient signature and real-time courier milestone updates.",
      details: [
        "Live status progression: Order Received → Preparing Artwork → Sent to Printer → Printing → Ready for Shipment → Shipped.",
        "Dispatched via DHL Express Worldwide, FedEx Custom Critical, or UPS Fine Art Air Courier.",
        "Includes instant download access to 300 DPI high-resolution digital master files.",
      ],
      icon: Truck,
      highlight: "Global Insured Transit",
    },
  ];

  return (
    <div className="py-6 sm:py-8 lg:py-12 bg-bg-primary">
      {/* ============================================================== */}
      {/* 1. HERO HEADER SECTION */}
      {/* ============================================================== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12 lg:mb-14">
  
        <h1 className="mt-1.5 text-3xl sm:text-5xl lg:text-6xl tracking-wide sm:tracking-wider text-white leading-[1.05] font-heading uppercase">
          Crafting Automotive Immortality
        </h1>
        <p className="mt-2.5 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
          Poster Gen bridges the physical garage and digital generative
          intelligence. Every vehicle has a soul—a symphony of displacement,
          silhouette, and human memory. Here is our story, our exacting
          production standards, and the complete creation journey from
          photograph to museum fine art.
        </p>

        {/* Quick Nav Anchors */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08] text-xs">
          <a
            href="#story"
            className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] px-3 py-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            Our Story &amp; Heritage
          </a>
          <a
            href="#process"
            className="rounded-lg border border-brand/40 bg-brand/10 hover:bg-brand/20 px-3 py-1.5 text-brand font-semibold transition-colors"
          >
            Creation Pipeline
          </a>
          <a
            href="#specifications"
            className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] px-3 py-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            300 DPI Print Standards
          </a>
          <a
            href="#pillars"
            className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] px-3 py-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            Atelier Pillars
          </a>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. OUR STORY & SPECIFICATION FOOTPRINT */}
      {/* ============================================================== */}
      <div id="story">
        <StorySection />
      </div>

      {/* ============================================================== */}
      {/* 3. THE COMPLETE CREATION PROCESS & INTERACTIVE TRANSITION */}
      {/* ============================================================== */}
      <section
        id="process"
        className="relative border-t border-white/[0.06] bg-[#07080A] py-10 sm:py-14 lg:py-16"
      >
        {/* Subtle Ambient Red Glow */}
        <div
          className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-brand/5 blur-[140px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Interactive Before & After Visual Component + Machine Vision Features */}
          {/* Layout mirrors HowItWorksSection perfectly: Row 1 Header/Buttons, Row 2 Cards/Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-6 sm:gap-y-8 items-stretch mb-12 sm:mb-16">
            {/* ROW 1 LEFT: Section Header (order-1 on mobile/tablet, Row 1 on desktop) */}
            <div className="order-1 lg:order-none lg:col-span-7 xl:col-span-8 flex flex-col justify-end">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand font-mono">
                MACHINE VISION &amp; CREATION PIPELINE
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading uppercase">
                From Customer Photo to Gallery Masterpiece
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
                As established in our V1 Atelier Specification, our creation
                journey balances customer autonomy, multi-template generative AI
                rendering, state-preserved authentication, and physical fine-art
                execution.
              </p>
            </div>

            {/* ROW 1 RIGHT: Toggle Buttons (order-3 on mobile/tablet, Row 1 on desktop) */}
            <div className="order-3 lg:order-none lg:col-span-5 xl:col-span-4 flex items-end justify-center lg:justify-end">
              <div className="w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[360px] flex justify-center lg:justify-end">
                <div className="inline-flex w-full sm:w-auto p-1 rounded-xl bg-black/40 border border-white/[0.08] shadow-sm">
                  <button
                    type="button"
                    onClick={() => setActivePhotoTab("before")}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      activePhotoTab === "before"
                        ? "bg-white/10 text-white border border-white/20 shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Camera size={13} className={activePhotoTab === "before" ? "text-brand" : ""} />
                    <span>Before Generation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePhotoTab("after")}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      activePhotoTab === "after"
                        ? "bg-brand text-white border border-brand/50 shadow-sm shadow-brand/30"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Sparkles size={13} />
                    <span>After Generation</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 2 LEFT: 3 Feature Cards (order-2 on mobile/tablet, Row 2 on desktop) */}
            <div className="order-2 lg:order-none lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-3 sm:gap-3.5 h-full">
              {/* Card 1 */}
              <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-brand font-mono text-xs sm:text-sm font-bold tracking-wider">
                    01 / AUTHENTIC CHASSIS GEOMETRY
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    Zero Stock 3D
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Preserving Stance, Reflection &amp; Bespoke Aero
                </h3>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                  Preserves genuine reflections, paint depth, aftermarket carbon splitters, custom wheels, and natural specular lighting without generic 3D model substitution.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-brand font-mono text-xs sm:text-sm font-bold tracking-wider">
                    02 / NEURAL BACKGROUND &amp; STUDIO RELIGHTING
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    Automated Vision
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Driveway to Editorial Studio Environment
                </h3>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                  Proprietary vision models isolate the subject from messy surroundings, applying studio specular reflections and multi-angle dynamic lighting composites.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-brand font-mono text-xs sm:text-sm font-bold tracking-wider">
                    03 / 300+ DPI MASTER RESOLUTION
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                    Giclée Certified
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Physical Millimeter Print Fidelity
                </h3>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                  Native pixel synthesis scaled directly for large-format physical Giclée plotters, guaranteeing razor-sharp badge typography and crisp chassis contours.
                </p>
              </div>
            </div>

            {/* ROW 2 RIGHT: Image Showcase (order-4 on mobile/tablet, Row 2 on desktop) */}
            <div className="order-4 lg:order-none lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end">
              <div
                onClick={() => setActivePhotoTab(activePhotoTab === "before" ? "after" : "before")}
                className="group relative w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[360px] aspect-[3/4] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E1013] shadow-2xl cursor-pointer select-none"
                title="Click to toggle Before / After"
              >
                {/* Before Image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                    activePhotoTab === "before" ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src="/carTransition/old.png"
                    alt="Before Generation - Original Car Photo"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 360px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-neutral-200 text-[10px] font-mono backdrop-blur-md">
                      <Camera size={10} className="text-amber-400" />
                      Before • Raw Photo
                    </span>
                  </div>
                </div>

                {/* After Image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                    activePhotoTab === "after" ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src="/carTransition/new.png"
                    alt="After Generation - AI Fine-Art Poster"
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 360px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand/90 border border-brand/50 text-white text-[10px] font-mono font-medium backdrop-blur-md shadow-sm shadow-brand/30">
                      <Sparkles size={10} />
                      After • Master Poster
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Customer Flow: Interactive 7-Step Pipeline */}
          <div className="space-y-6 sm:space-y-8 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand font-mono">
                  END-TO-END ARCHITECTURE
                </span>
                <h3 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-heading uppercase">
                  The 7-Stage Creation Pipeline
                </h3>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Click any stage below to inspect specifications
              </span>
            </div>

            {/* Step Selection Buttons: responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {processSteps.map((s, idx) => {
                const isSelected = activeProcessStep === idx;
                const Icon = s.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveProcessStep(idx)}
                    className={`rounded-xl border p-3 sm:p-3.5 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-brand bg-brand/10 shadow-lg shadow-brand/15 ring-1 ring-brand/40 -translate-y-0.5"
                        : "border-white/[0.08] bg-[#0E1013]/80 hover:border-white/20 hover:bg-[#121418]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className={`font-mono font-bold text-xs ${isSelected ? "text-brand" : "text-neutral-500"}`}>
                          {s.step}
                        </span>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${isSelected ? "bg-brand/20 text-brand" : "bg-white/[0.04] text-neutral-400"}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {s.title}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate mt-2 pt-1.5 border-t border-white/[0.04]">
                      {s.highlight}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detailed Focus Card */}
            {(() => {
              const current = processSteps[activeProcessStep];
              const StepIcon = current.icon;
              return (
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-5 sm:p-7 backdrop-blur-xl shadow-2xl hover:border-white/15 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white font-mono text-xs font-bold shadow-md shadow-brand/30">
                          {current.step}
                        </span>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brand">
                          {current.tagline}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-heading uppercase">
                        {current.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {current.summary}
                      </p>

                      <div className="pt-2 space-y-2">
                        {current.details.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step Visual Summary Pill */}
                    <div className="rounded-xl border border-white/10 bg-black/60 p-4 sm:p-5 shrink-0 w-full md:w-64 space-y-3 self-center md:self-start">
                      <div className="flex items-center gap-2 text-white">
                        <StepIcon className="h-4 w-4 text-brand" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                          Key Deliverable
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white font-mono">
                        {current.highlight}
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-relaxed border-t border-white/10 pt-2 font-sans">
                        Part of Poster Gen&apos;s verified V1 specification.
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PRINT ACCEPTANCE & 300 DPI SPECIFICATIONS */}
      {/* ============================================================== */}
      <section
        id="specifications"
        className="relative border-t border-white/[0.06] bg-bg-primary py-10 sm:py-14 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand mb-2">
              Museum-Grade Execution
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading uppercase">
              Print Acceptance &amp; 300 DPI Resolution
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
              As mandated by our production guidelines, print acceptance is
              strictly governed by verified physical millimeter dimensions and
              true 300 DPI pixel counts—never software metadata scaling.
            </p>
          </div>

          {/* Size Specifications Grid (Directly using verified PRINT_SIZES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PRINT_SIZES.map((size) => {
              const res = SIZE_RESOLUTIONS[size.id] || {
                pixels: "300 DPI Native Canvas",
                ideal: "Includes serialized certificate, museum mounting, and insured courier.",
              };
              return (
                <div
                  key={size.id}
                  className={`group relative rounded-xl border p-4 sm:p-5 transition-all duration-300 ${
                    size.popular
                      ? "border-brand/50 bg-neutral-900/60 shadow-lg shadow-brand/10 ring-1 ring-brand/30 pt-7 sm:pt-8 -translate-y-1"
                      : "border-white/[0.08] bg-neutral-900/30 hover:border-white/25 hover:bg-neutral-900/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 pt-6 sm:pt-6"
                  }`}
                >
                  {size.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none">
                      <span className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand px-3 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-brand/30 ring-1 ring-white/20">
                        Enthusiast Favorite
                      </span>
                    </div>
                  )}
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {size.dimensions}
                  </div>
                  <h4 className="mt-1 text-base sm:text-lg font-bold text-white">{size.label}</h4>
                  <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-brand font-mono">
                    {size.price}
                  </div>

                  {/* Verified 300 DPI Box */}
                  <div className="mt-3 rounded-lg border border-white/[0.06] bg-black/50 p-2">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold font-mono">
                      Verified 300 DPI Canvas
                    </span>
                    <span className="text-xs font-mono font-bold text-white mt-0.5 block">
                      {res.pixels}
                    </span>
                  </div>

                  <p className="mt-2.5 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                    {res.ideal}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Archival Material Pillars matching CraftsmanshipSection */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3.5 sm:gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-4 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="text-brand text-sm sm:text-base font-bold font-mono">01 / 310 GSM Cotton Rag</div>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                100% acid-free museum cotton rag paper with a velvet matte texture that completely eliminates harsh specular glare from garage LED and gallery ceiling lighting.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-4 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="text-brand text-sm sm:text-base font-bold font-mono">02 / Aerospace Matte Aluminum</div>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                Precision-machined matte aluminum framing finished in deep anodized obsidian or hand-brushed titanium, glazed with UV-blocking museum acrylic.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-4 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="text-brand text-sm sm:text-base font-bold font-mono">03 / Serialized Hologram Seal</div>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                Every physical print is registered in our production registry and stamped with a serialized tamper-evident hologram seal and numbered Certificate of Authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. THE THREE ATELIER PILLARS & FINAL CTA */}
      {/* ============================================================== */}
      <section
        id="pillars"
        className="border-t border-white/[0.06] bg-[#07080A] py-10 sm:py-14 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand font-mono">
              ATELIER FOUNDATIONS
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading uppercase leading-[1.1]">
              The Three Pillars of Poster Gen
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-brand">
                  PILLAR I
                </span>
                <Eye className="h-4 w-4 text-brand/70" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading uppercase">
                Authentic Machine Vision
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                We never replace your vehicle with a generic stock 3D model. Our neural pipeline analyzes your exact wheels, aerodynamic splitters, imperfections, and lighting to create an honest tribute to your machine.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-brand">
                  PILLAR II
                </span>
                <Layers className="h-4 w-4 text-brand/70" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading uppercase">
                Multi-Template Perspective
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                A single car can be aggressive on track, elegant in studio, or historic in racing livery. We enable simultaneous generation across up to 3 master aesthetics plus an optional harmonized triptych.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-brand">
                  PILLAR III
                </span>
                <ShieldCheck className="h-4 w-4 text-brand/70" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading uppercase">
                Archival Giclée Physicality
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                Digital art only reaches full power when manifested in physical reality. 310 GSM 100% cotton rag, 12-color pigment plotters, and CNC anodized aluminum guarantee 100-year color fidelity.
              </p>
            </div>
          </div>

          {/* Final Call to Action Box */}
          <div className="mt-12 sm:mt-16 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-neutral-950 via-neutral-900 to-black p-6 sm:p-10 lg:p-12 text-center relative overflow-hidden hover:border-white/20 transition-all duration-300">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[600px] rounded-full bg-brand/15 blur-[100px]" />

            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-brand relative z-10 font-mono">
              Ready to Immortalize Your Machine?
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white relative z-10 font-heading uppercase">
              Transform Your Car into Fine Art
            </h3>
            <p className="mt-2.5 max-w-xl mx-auto text-xs sm:text-sm text-neutral-400 relative z-10">
              Select up to 3 templates, upload your photograph, and preview your
              custom automotive poster in minutes.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Launch Creation Studio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer"
              >
                <span>Browse All Templates</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
