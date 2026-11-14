"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Truck,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Lock,
  Cpu,
  Palette,
  Eye,
} from "lucide-react";
import { StorySection } from "@/components/home/StorySection";

export default function AboutPage() {
  const [activePhotoTab, setActivePhotoTab] = useState<"after" | "before">("after");
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

  const printSizes = [
    {
      name: "A3 Studio",
      mm: "297 × 420 mm",
      inches: "11.7 × 16.5 in",
      pixels: "3,508 × 4,960 px",
      price: "$129",
      ideal: "Personal office, desk display, and compact enthusiast garages.",
      badge: "Studio Edition",
    },
    {
      name: "A2 Gallery",
      mm: "420 × 594 mm",
      inches: "16.5 × 23.4 in",
      pixels: "4,960 × 7,016 px",
      price: "$189",
      ideal: "Our most popular collector size. Striking, balanced wall presence.",
      badge: "Enthusiast Favorite",
      popular: true,
    },
    {
      name: "A1 Exhibition",
      mm: "594 × 841 mm",
      inches: "23.4 × 33.1 in",
      pixels: "7,016 × 9,933 px",
      price: "$269",
      ideal: "Showroom-grade focal piece with ultra-fine chassis details.",
      badge: "Exhibition Grade",
    },
    {
      name: "Panoramic Grand",
      mm: "600 × 1,200 mm",
      inches: "23.6 × 47.2 in",
      pixels: "7,086 × 14,173 px",
      price: "$389",
      ideal: "Specially proportioned for 3-template combined triptych artworks.",
      badge: "Collector Triptych",
    },
  ];

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      {/* ============================================================== */}
      {/* 1. HERO HEADER */}
      {/* ============================================================== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12 lg:mb-16">
      
        <h1 className="mt-1.5 text-3xl sm:text-5xl lg:text-6xl tracking-wide sm:tracking-wider text-white leading-[1.05]">
          Crafting Automotive Immortality
        </h1>
        <p className="mt-2.5 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
          Poster Gen bridges the physical garage and digital generative intelligence. Every vehicle has a soul—a
          symphony of displacement, silhouette, and human memory. Here is our story, our exacting production standards,
          and the complete creation journey from photograph to museum fine art.
        </p>

        {/* Quick Nav Anchors */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/[0.08] text-xs">
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
            The 7-Stage Creation Process
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
      {/* 2. OUR STORY & COLLECTOR FOOTPRINT */}
      {/* ============================================================== */}
      <div id="story">
        <StorySection />
      </div>

      {/* ============================================================== */}
      {/* 3. THE COMPLETE CREATION PROCESS (MERGED & ENHANCED FROM PDF) */}
      {/* ============================================================== */}
      <section id="process" className="relative border-t border-white/[0.06] bg-[#07080A] py-10 sm:py-16 lg:py-24">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full bg-brand/10 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-blue-600/5 blur-[150px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
           
            <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              From Customer Photo to Gallery Masterpiece
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
              As established in our V1 Atelier Specification, our creation journey balances customer autonomy,
              multi-template generative AI rendering, state-preserved authentication, and physical fine-art execution.
            </p>
          </div>

          {/* Interactive Before & After Visual Component */}
          <div className="mb-12 sm:mb-16 lg:mb-20 rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-6 lg:p-8 backdrop-blur-md hover:border-white/20 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Image View */}
              <div className="lg:col-span-7">
                <div className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-black shadow-2xl hover:border-white/20 transition-all duration-300">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={
                        activePhotoTab === "after"
                          ? "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=85"
                          : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
                      }
                      alt="Before and after transformation of customer car photo into AI artwork"
                      fill
                      className="object-cover object-center filter contrast-125 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Interactive Tab Switcher */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl border border-white/15 bg-black/85 p-2 backdrop-blur-md">
                      <div className="flex gap-1.5 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setActivePhotoTab("before")}
                          className={`flex-1 sm:flex-initial rounded-lg px-3 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all text-center cursor-pointer ${
                            activePhotoTab === "before"
                              ? "bg-white text-black shadow-md"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          Customer Raw Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePhotoTab("after")}
                          className={`flex-1 sm:flex-initial rounded-lg px-3 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all text-center cursor-pointer ${
                            activePhotoTab === "after"
                              ? "bg-brand text-white shadow-md shadow-brand/40"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          AI Master Poster
                        </button>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-300 uppercase">
                        {activePhotoTab === "after" ? "Studio Specimen V4.2" : "Original Customer Upload"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Transformation Narrative */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                  Machine Vision Intelligence
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Zero Stock Models. Pure Enthusiast Identity.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Traditional poster makers slap your photo into a generic mockup or replace your vehicle with a
                  generic 3D render. Our pipeline honors every exact curve, aftermarket wheel, aerodynamic canard, and
                  bespoke body line of your individual vehicle.
                </p>

                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                    <span>Preserves genuine reflections, paint depth, and wheels</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                    <span>Automated neural background removal &amp; studio relighting</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                    <span>Upscaled to 300+ DPI master resolution for fine-art plotters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Customer Flow Diagram & Interactive 7-Step Pipeline */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                  End-to-End Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  The 7-Stage Creation Pipeline
                </h3>
              </div>
              <span className="text-xs text-neutral-400">
                Click any stage below to inspect specifications
              </span>
            </div>

            {/* Step Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {processSteps.map((s, idx) => {
                const isSelected = activeProcessStep === idx;
                const Icon = s.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveProcessStep(idx)}
                    className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-brand bg-brand/10 shadow-lg shadow-brand/15 ring-1 ring-brand/40"
                        : "border-white/[0.08] bg-neutral-900/50 hover:border-white/20 hover:bg-neutral-900/80"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={`font-mono font-bold ${isSelected ? "text-brand" : "text-neutral-500"}`}>
                        {s.step}
                      </span>
                      <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-brand" : "text-neutral-400"}`} />
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {s.title.split(" ")[0]} {s.title.split(" ")[1]}
                    </div>
                    <span className="text-[9px] text-neutral-500 block truncate mt-0.5">
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
                <div className="rounded-xl border border-white/[0.08] bg-neutral-900/60 p-5 sm:p-8 backdrop-blur-md shadow-2xl hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white font-mono text-xs font-bold shadow-md shadow-brand/30">
                          {current.step}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                          {current.tagline}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">
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
                    <div className="rounded-xl border border-white/10 bg-black/50 p-4 sm:p-5 shrink-0 w-full md:w-64 space-y-3 self-center md:self-start">
                      <div className="flex items-center gap-2 text-white">
                        <StepIcon className="h-5 w-5 text-brand" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Key Deliverable
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        {current.highlight}
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-relaxed border-t border-white/10 pt-2">
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
      <section id="specifications" className="border-t border-white/[0.06] bg-bg-primary py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
           
            <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Print Acceptance &amp; 300 DPI Resolution
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed mx-auto">
              As mandated by our production guidelines, print acceptance is strictly governed by verified physical
              millimeter dimensions and true 300 DPI pixel counts—never software metadata scaling.
            </p>
          </div>

          {/* Size Specifications Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {printSizes.map((size, idx) => (
              <div
                key={idx}
                className={`group relative rounded-xl border p-5 sm:p-6 transition-all duration-300 ${
                  size.popular
                    ? "border-brand/50 bg-neutral-900/60 shadow-xl shadow-brand/10 ring-1 ring-brand/30 -translate-y-1"
                    : "border-white/[0.08] bg-neutral-900/30 hover:border-white/25 hover:bg-neutral-900/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80"
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      size.popular ? "bg-brand text-white" : "bg-white/[0.06] text-neutral-400"
                    }`}
                  >
                    {size.badge}
                  </span>
                  <span className="text-base font-extrabold text-white">{size.price}</span>
                </div>

                <h4 className="text-lg font-bold text-white">{size.name}</h4>
                <div className="text-xs text-neutral-400 mt-0.5 font-medium">
                  {size.mm} <span className="text-neutral-600">·</span> {size.inches}
                </div>

                {/* Exact Verified 300 DPI Resolution */}
                <div className="mt-3.5 rounded-xl border border-white/[0.06] bg-black/50 p-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-semibold">
                    Verified 300 DPI Canvas
                  </span>
                  <span className="text-xs font-mono font-bold text-brand mt-0.5 block">
                    {size.pixels}
                  </span>
                </div>

                <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                  {size.ideal}
                </p>
              </div>
            ))}
          </div>

          {/* Archival Material Pillars */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 text-xs">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">01</span>
              <h5 className="mt-2 text-sm sm:text-base font-bold text-white">
                310 GSM Cotton Rag
              </h5>
              <p className="mt-1.5 text-neutral-400 leading-relaxed">
                100% acid-free museum cotton rag paper with a velvet matte texture that completely eliminates harsh
                specular glare from garage LED and gallery ceiling lighting.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">02</span>
              <h5 className="mt-2 text-sm sm:text-base font-bold text-white">
                Aerospace CNC Aluminum
              </h5>
              <p className="mt-1.5 text-neutral-400 leading-relaxed">
                Precision-machined matte aluminum framing finished in deep anodized obsidian or hand-brushed titanium,
                glazed with UV-blocking museum acrylic.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">03</span>
              <h5 className="mt-2 text-sm sm:text-base font-bold text-white">
                Serialized Hologram Seal
              </h5>
              <p className="mt-1.5 text-neutral-400 leading-relaxed">
                Every physical print is registered in our production registry and stamped with a serialized tamper-evident
                hologram seal and numbered Certificate of Authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. THE THREE ATELIER PILLARS & FINAL CTA */}
      {/* ============================================================== */}
      <section id="pillars" className="border-t border-white/[0.06] bg-[#07080A] py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-8 sm:mb-12">
           
            <h2 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              The Three Pillars of Poster Gen
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">Pillar I</span>
              <h4 className="mt-2 text-base sm:text-lg font-bold text-white">
                Authentic Machine Vision
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                We never replace your vehicle with a generic stock 3D model. Our neural pipeline analyzes your exact
                wheels, aerodynamic splitters, imperfections, and lighting to create an honest tribute to your machine.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">Pillar II</span>
              <h4 className="mt-2 text-base sm:text-lg font-bold text-white">
                Multi-Template Perspective
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                A single car can be aggressive on track, elegant in studio, or historic in racing livery. We enable
                simultaneous generation across up to 3 master aesthetics plus an optional harmonized triptych.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-6 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-brand">Pillar III</span>
              <h4 className="mt-2 text-base sm:text-lg font-bold text-white">
                Archival Giclée Physicality
              </h4>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                Digital art only reaches full power when manifested in physical reality. 310 GSM 100% cotton rag,
                12-color pigment plotters, and CNC anodized aluminum guarantee 100-year color fidelity.
              </p>
            </div>
          </div>

          {/* Final Call to Action Box */}
          <div className="mt-12 sm:mt-16 rounded-xl border border-white/[0.08] bg-gradient-to-r from-neutral-950 via-neutral-900 to-black p-6 sm:p-10 lg:p-12 text-center relative overflow-hidden hover:border-white/20 transition-all duration-300">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[600px] rounded-full bg-brand/15 blur-[100px]" />

            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-brand relative z-10">
              Ready to Immortalize Your Machine?
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white relative z-10">
              Transform Your Car into Fine Art
            </h3>
            <p className="mt-2.5 max-w-xl mx-auto text-xs sm:text-sm text-neutral-400 relative z-10">
              Select up to 3 templates, upload your photograph, and preview your custom automotive poster in minutes.
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
                <span>Browse All 29 Templates</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
