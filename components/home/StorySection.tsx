import { LayoutGrid, Sparkles, Scan, Printer, Eye, Cpu, ShieldCheck } from "lucide-react";

export function StorySection() {
  return (
    <section id="story" className="relative border-t border-white/[0.06] bg-bg-primary py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand font-mono">
            V1 ATELIER SPECIFICATION
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading uppercase">
            Our Story &amp; Heritage
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
            Preserving the art of luxury automotive passion through precision, craftsmanship, and generative
            mastery.
          </p>
        </div>

        {/* 3 Core Tenet Cards (Directly from V1 Specification) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {/* Card 1: Authentic Machine Vision */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand">
                  01 • Authentic Machine Vision
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 border border-brand/25 text-brand">
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 font-heading uppercase">
                Zero Stock 3D Renders
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Poster Gen was founded by automotive designers, computational artists, and obsessive petrolheads with a shared conviction: an enthusiast&apos;s machine is never generic transport—it is a sculpture of engineering, memories, and personal character. Rather than substituting vehicles with generic 3D stock models, our proprietary neural vision pipeline honors every authentic chassis contour, aftermarket splitter, bespoke wheel, and natural specular reflection from your original photo.
              </p>
            </div>
          </div>

          {/* Card 2: Generative Architecture */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand">
                  02 • Multi-Template Synthesis
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 border border-brand/25 text-brand">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 font-heading uppercase">
                Customer Autonomy &amp; Triptych
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                As established in our V1 Development Specification, collectors upload a single vehicle photograph and select 1 to 3 master templates simultaneously across 29 curated artistic disciplines. Our generative architecture synthesizes up to 4 high-resolution outputs—including 1 to 3 individual master artworks and an exclusive harmonized Combined Triptych blending the selected design styles.
              </p>
            </div>
          </div>

          {/* Card 3: Archival Physicality */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand">
                  03 • Physical Giclée Execution
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 border border-brand/25 text-brand">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 font-heading uppercase">
                Verified 300 DPI Canvas
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Digital artwork only reaches its full potential when manifested in physical reality. Print acceptance is strictly governed by physical millimeter canvas dimensions and verified 300 DPI native pixel resolution—never software metadata scaling. Executed on 310 GSM 100% acid-free velvet cotton rag paper with 12-pigment archival Giclée inks certified 100+ years lightfast.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Metric Specification Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Metric 1: 1-3 Templates */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
                  1 to 3
                </span>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10">
                  <LayoutGrid className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                Template Multi-Select
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Curated archive of 29 distinct automotive artistic disciplines
              </p>
            </div>
          </div>

          {/* Metric 2: Up to 4 Previews */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
                  Up to 4
                </span>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                Master AI Previews
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                3 individual artworks plus an optional harmonized combined triptych
              </p>
            </div>
          </div>

          {/* Metric 3: 300 DPI Native Resolution */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
                  300 DPI
                </span>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10">
                  <Scan className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                Verified Print Resolution
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Physical millimeter canvas sizing, not software metadata scaling
              </p>
            </div>
          </div>

          {/* Metric 4: 310 GSM Archival Fine Paper */}
          <div className="group rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#0E1013]/80 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-[#121418] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-mono">
                  310 GSM
                </span>
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-brand/10 border border-brand/25 text-brand shadow-sm shadow-brand/10">
                  <Printer className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                Archival Cotton Rag
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                100% acid-free museum fine art paper with 12-pigment archival inks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
