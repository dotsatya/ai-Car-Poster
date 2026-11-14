import { PRINT_SIZES } from "@/data/print-sizes";

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="relative border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
            Museum-Grade Execution
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Archival Inks &amp; Aerospace Framing
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
            Every customer print is produced on industrial fine-art Giclée plotters with 12 pigment colors,
            guaranteeing 100+ years without color degradation.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {PRINT_SIZES.map((size) => (
            <div
              key={size.id}
              className="group relative rounded-xl sm:rounded-2xl border border-white/[0.08] bg-neutral-900/30 p-4 sm:p-5 transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/50"
            >
              {size.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    Enthusiast Favorite
                  </span>
                </div>
              )}
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {size.dimensions}
              </div>
              <h4 className="mt-1 text-base sm:text-lg font-bold text-white">{size.label}</h4>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-brand">{size.price}</div>
              <p className="mt-1.5 text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Includes serialized certificate, museum mounting, and insured air courier.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-3.5 sm:gap-5 md:grid-cols-3">
          <div className="rounded-xl sm:rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-4 sm:p-5 backdrop-blur-md">
            <div className="text-brand text-sm sm:text-base font-bold">01 / 310 GSM Cotton Rag</div>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
              Acid-free 100% cotton fiber with smooth velvet matte finish that eliminates glass glare in garage or
              gallery lighting.
            </p>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-4 sm:p-5 backdrop-blur-md">
            <div className="text-brand text-sm sm:text-base font-bold">02 / Aerospace Matte Aluminum</div>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
              CNC-machined aluminum frames finished in deep anodized obsidian or brushed titanium with UV-blocking
              museum acrylic.
            </p>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-4 sm:p-5 backdrop-blur-md">
            <div className="text-brand text-sm sm:text-base font-bold">03 / Serialized Hologram Seal</div>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
              Each physical piece is registered in our production registry with an embossed seal verifying authentic
              generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
