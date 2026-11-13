import type { Metadata } from "next";
import Link from "next/link";
import { MissionSection } from "@/components/home/MissionSection";

export const metadata: Metadata = {
  title: "How It Works — The Creation Journey — POSTER GEN",
  description:
    "Learn how Poster Gen transforms customer car photographs into museum-grade automotive posters with generative AI, 310 GSM archival cotton paper, and aerospace aluminum framing.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 pb-4">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
          The Creation Process
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          From Photograph to Gallery Masterpiece
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-400 md:text-base">
          Our four-stage creation pipeline combines neural vehicle segmentation, multi-template generative styling,
          and museum-grade physical execution.
        </p>
      </div>

      <MissionSection />

      {/* Deep-Dive Technical Detail */}
      <section className="border-t border-white/[0.06] bg-[#0A0C0E] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
              Specification Standards
            </span>
            <h3 className="mt-2 text-2xl font-bold text-white md:text-4xl">
              Print Acceptance & 300 DPI Validation
            </h3>
            <p className="mt-3 text-xs text-neutral-400 md:text-sm">
              As defined by our production standards, print acceptance is based on agreed physical dimensions and verified
              pixel resolutions—never metadata interpolation alone.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4 text-xs">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <div className="font-bold text-white text-base">A3 Studio</div>
              <div className="text-neutral-500 mt-1">297 × 420 mm</div>
              <div className="mt-3 font-mono text-[#D9272E]">3,508 × 4,960 px</div>
              <p className="mt-2 text-neutral-400 text-[11px]">Ideal for offices, desk frames, and personal garages.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <div className="font-bold text-white text-base">A2 Gallery</div>
              <div className="text-neutral-500 mt-1">420 × 594 mm</div>
              <div className="mt-3 font-mono text-[#D9272E]">4,960 × 7,016 px</div>
              <p className="mt-2 text-neutral-400 text-[11px]">Our most popular collector size. Striking wall presence.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <div className="font-bold text-white text-base">A1 Exhibition</div>
              <div className="text-neutral-500 mt-1">594 × 841 mm</div>
              <div className="mt-3 font-mono text-[#D9272E]">7,016 × 9,933 px</div>
              <p className="mt-2 text-neutral-400 text-[11px]">Showroom-grade focal piece with full chassis definition.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
              <div className="font-bold text-white text-base">Panoramic Grand</div>
              <div className="text-neutral-500 mt-1">600 × 1200 mm</div>
              <div className="mt-3 font-mono text-[#D9272E]">7,086 × 14,173 px</div>
              <p className="mt-2 text-neutral-400 text-[11px]">Reserved for 3-template combined triptych artworks.</p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/#creator"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D9272E] to-[#B01A20] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#D9272E]/30 hover:scale-105 transition-all"
            >
              <span>Begin Your Creation</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

