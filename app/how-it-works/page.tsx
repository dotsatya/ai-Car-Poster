import type { Metadata } from "next";
import Link from "next/link";
import { MissionSection } from "@/components/how-it-works/MissionSection";

export const metadata: Metadata = {
  title: "How It Works — The Creation Journey — POSTER GEN",
  description:
    "Learn how Poster Gen transforms customer car photographs into museum-grade automotive posters with generative AI, 310 GSM archival cotton paper, and aerospace aluminum framing.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-4 sm:mb-6 lg:mb-8">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
          The Creation Process
        </span>
        <h1 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          From Photograph to Gallery Masterpiece
        </h1>
        <p className="mt-2 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
          Our four-stage creation pipeline combines neural vehicle segmentation,
          multi-template generative styling, and museum-grade physical
          execution.
        </p>
      </div>

      <MissionSection />

      {/* Deep-Dive Technical Detail */}
      <section className="border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
              Specification Standards
            </span>
            <h3 className="mt-1.5 text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Print Acceptance &amp; 300 DPI Validation
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed mx-auto">
              As defined by our production standards, print acceptance is based
              on agreed physical dimensions and verified pixel resolutions—never
              metadata interpolation alone.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-4 text-xs">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-4 sm:p-5">
              <div className="font-bold text-white text-sm sm:text-base">A3 Studio</div>
              <div className="text-neutral-500 mt-0.5">297 × 420 mm</div>
              <div className="mt-2.5 font-mono text-brand">3,508 × 4,960 px</div>
              <p className="mt-1.5 text-neutral-400 text-[11px]">
                Ideal for offices, desk frames, and personal garages.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-4 sm:p-5">
              <div className="font-bold text-white text-sm sm:text-base">A2 Gallery</div>
              <div className="text-neutral-500 mt-0.5">420 × 594 mm</div>
              <div className="mt-2.5 font-mono text-brand">4,960 × 7,016 px</div>
              <p className="mt-1.5 text-neutral-400 text-[11px]">
                Our most popular collector size. Striking wall presence.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-6 sm:p-5">
              <div className="font-bold text-white text-sm sm:text-base">
                A1 Exhibition
              </div>
              <div className="text-neutral-500 mt-0.5">594 × 841 mm</div>
              <div className="mt-2.5 font-mono text-brand">7,016 × 9,933 px</div>
              <p className="mt-1.5 text-neutral-400 text-[11px]">
                Showroom-grade focal piece with full chassis definition.
              </p>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-neutral-900/40 p-4 sm:p-5">
              <div className="font-bold text-white text-sm sm:text-base">
                Panoramic Grand
              </div>
              <div className="text-neutral-500 mt-0.5">600 × 1200 mm</div>
              <div className="mt-2.5 font-mono text-brand">7,086 × 14,173 px</div>
              <p className="mt-1.5 text-neutral-400 text-[11px]">
                Reserved for 3-template combined triptych artworks.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-6 py-2.5 sm:px-7 sm:py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand/30 hover:scale-105 transition-all"
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
