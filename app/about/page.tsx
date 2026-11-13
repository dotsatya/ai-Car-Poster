import type { Metadata } from "next";
import Link from "next/link";
import { StorySection } from "@/components/home/StorySection";
import { MissionSection } from "@/components/home/MissionSection";

export const metadata: Metadata = {
  title: "About Our Atelier — POSTER GEN",
  description:
    "Founded by automotive designers and computational artists, Poster Gen preserves the soul and engineering of enthusiast machines through fine art and generative intelligence.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Page Title Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 pb-12">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
          Atelier Heritage & Vision
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          Crafting Automotive Immortality
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-400 md:text-base">
          Poster Gen bridges the physical garage and digital generative intelligence. Every vehicle has a soul—a
          symphony of displacement, silhouette, and human memory. Our mission is to translate that machine into an
          heirloom fine-art piece worthy of gallery curation.
        </p>
      </div>

      <StorySection />
      <MissionSection />

      {/* Atelier Core Pillars */}
      <section className="border-t border-white/[0.06] bg-[#0A0C0E] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
              Guiding Standards
            </span>
            <h3 className="mt-2 text-2xl font-bold text-white md:text-4xl">
              The Three Pillars of Poster Gen
            </h3>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-8 backdrop-blur-md">
              <span className="font-mono text-xs font-bold text-[#D9272E]">01</span>
              <h4 className="mt-3 text-lg font-bold text-white">Authentic Machine Vision</h4>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                We never replace your vehicle with a generic stock 3D model. Our neural pipeline analyzes your exact
                wheels, aerodynamic splitters, imperfections, and lighting to create an honest tribute to your machine.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-8 backdrop-blur-md">
              <span className="font-mono text-xs font-bold text-[#D9272E]">02</span>
              <h4 className="mt-3 text-lg font-bold text-white">Multi-Template Perspective</h4>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                A single car can be aggressive on track, elegant in studio, or historic in racing livery. We enable
                simultaneous generation across up to 3 master aesthetics plus an optional harmonized triptych.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-8 backdrop-blur-md">
              <span className="font-mono text-xs font-bold text-[#D9272E]">03</span>
              <h4 className="mt-3 text-lg font-bold text-white">Archival Giclée Physicality</h4>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Digital art only reaches full power when manifested in physical reality. 310 GSM 100% cotton rag,
                12-color pigment plotters, and CNC anodized aluminum guarantee 100-year color fidelity.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/#creator"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D9272E] to-[#B01A20] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#D9272E]/30 hover:scale-105 transition-all"
            >
              <span>Launch Creation Studio</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

