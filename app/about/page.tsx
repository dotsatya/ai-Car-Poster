import type { Metadata } from "next";
import Link from "next/link";
import { StorySection } from "@/components/home/StorySection";
import { MissionSection } from "@/components/how-it-works/MissionSection";

export const metadata: Metadata = {
  title: "About Our Atelier — POSTER GEN",
  description:
    "Founded by automotive designers and computational artists, Poster Gen preserves the soul and engineering of enthusiast machines through fine art and generative intelligence.",
};

export default function AboutPage() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      {/* Page Title Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-4 sm:mb-6 lg:mb-8">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
          Atelier Heritage &amp; Vision
        </span>
        <h1 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Crafting Automotive Immortality
        </h1>
        <p className="mt-2 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
          Poster Gen bridges the physical garage and digital generative
          intelligence. Every vehicle has a soul—a symphony of displacement,
          silhouette, and human memory. Our mission is to translate that machine
          into an heirloom fine-art piece worthy of gallery curation.
        </p>
      </div>

      <StorySection />
      <MissionSection />

      {/* Atelier Core Pillars */}
      <section className="border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-6 sm:mb-8 lg:mb-10">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
              Guiding Standards
            </span>
            <h3 className="mt-1.5 text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              The Three Pillars of Poster Gen
            </h3>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-4 sm:p-5 lg:p-6 backdrop-blur-md">
              <span className="font-mono text-xs font-bold text-brand">01</span>
              <h4 className="mt-2 text-base sm:text-lg font-bold text-white">
                Authentic Machine Vision
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                We never replace your vehicle with a generic stock 3D model. Our
                neural pipeline analyzes your exact wheels, aerodynamic
                splitters, imperfections, and lighting to create an honest
                tribute to your machine.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-4 sm:p-5 lg:p-6 backdrop-blur-md">
              <span className="font-mono text-xs font-bold text-brand">02</span>
              <h4 className="mt-2 text-base sm:text-lg font-bold text-white">
                Multi-Template Perspective
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                A single car can be aggressive on track, elegant in studio, or
                historic in racing livery. We enable simultaneous generation
                across up to 3 master aesthetics plus an optional harmonized
                triptych.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-4 sm:p-5 lg:p-6 backdrop-blur-md">
              <span className="font-mono text-xs font-bold text-brand">03</span>
              <h4 className="mt-2 text-base sm:text-lg font-bold text-white">
                Archival Giclée Physicality
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                Digital art only reaches full power when manifested in physical
                reality. 310 GSM 100% cotton rag, 12-color pigment plotters, and
                CNC anodized aluminum guarantee 100-year color fidelity.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-6 py-2.5 sm:px-7 sm:py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand/30 hover:scale-105 transition-all"
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
