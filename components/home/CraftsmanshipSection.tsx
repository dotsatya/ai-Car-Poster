import { PRINT_SIZES } from "@/data/print-sizes";

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="relative border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mb-6 sm:mb-8 lg:mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
              MUSEUM-GRADE EXECUTION
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] font-heading uppercase">
            Archival Inks &amp; Aerospace Framing
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
            Every customer print is produced on industrial fine-art Giclée plotters with 12 pigment colors,
            guaranteeing 100+ years without color degradation.
          </p>
        </div>

        {/* 6 Print Sizes: 2 cols on mobile, 3 cols on tablet/laptop, 6 cols on wide desktop */}
        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4">
          {PRINT_SIZES.map((size) => (
            <div
              key={size.id}
              className={`group relative rounded-xl border p-3 sm:p-4 md:p-5 transition-all duration-300 flex flex-col justify-between ${
                size.popular
                  ? "border-brand/60 bg-neutral-900/70 shadow-lg shadow-brand/10 ring-1 ring-brand/35 pt-5 sm:pt-6 md:pt-7 -translate-y-0.5"
                  : "border-white/[0.08] bg-neutral-900/30 hover:border-white/25 hover:bg-neutral-900/50 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/80 pt-4 sm:pt-5 md:pt-6"
              }`}
            >
              {size.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none">
                  <span className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand px-2 sm:px-2.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white shadow-md shadow-brand/40 ring-1 ring-white/20">
                    <span className="sm:hidden">Favorite</span>
                    <span className="hidden sm:inline">Enthusiast Favorite</span>
                  </span>
                </div>
              )}

              <div>
                <div className="text-[9.5px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                  {size.dimensions}
                </div>
                <h4 className="mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base font-bold text-white truncate">
                  {size.label}
                </h4>
              </div>

              <div className="mt-2 sm:mt-3">
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-brand font-mono">
                  {size.price}
                </div>
                <p className="mt-1 text-[9.5px] sm:text-[11px] md:text-xs text-neutral-400 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Includes serialized certificate, museum mounting, and insured air courier.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Material Specifications */}
        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-3.5 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300">
            <div className="text-brand text-xs sm:text-sm md:text-base font-bold font-mono">01 / 310 GSM Cotton Rag</div>
            <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed text-neutral-400">
              Acid-free 100% cotton fiber with smooth velvet matte finish that eliminates glass glare in garage or
              gallery lighting.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-3.5 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300">
            <div className="text-brand text-xs sm:text-sm md:text-base font-bold font-mono">02 / Aerospace Matte Aluminum</div>
            <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed text-neutral-400">
              CNC-machined aluminum frames finished in deep anodized obsidian or brushed titanium with UV-blocking
              museum acrylic.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/30 p-3.5 sm:p-5 backdrop-blur-md hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300">
            <div className="text-brand text-xs sm:text-sm md:text-base font-bold font-mono">03 / Serialized Hologram Seal</div>
            <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs leading-relaxed text-neutral-400">
              Each physical piece is registered in our production registry with an embossed seal verifying authentic
              generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
