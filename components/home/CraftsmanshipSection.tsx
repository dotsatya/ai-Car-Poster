import { PRINT_SIZES } from "@/data/print-sizes";

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="relative border-t border-white/[0.06] bg-[#08090A] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
            Museum-Grade Execution
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Archival Inks & Aerospace Framing
          </h2>
          <p className="mt-4 text-sm text-neutral-400 md:text-base">
            Every customer print is produced on industrial fine-art Giclée plotters with 12 pigment colors,
            guaranteeing 100+ years without color degradation.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINT_SIZES.map((size) => (
            <div
              key={size.id}
              className="group relative rounded-2xl border border-white/[0.08] bg-neutral-900/30 p-6 transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/50"
            >
              {size.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#D9272E] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    Enthusiast Favorite
                  </span>
                </div>
              )}
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {size.dimensions}
              </div>
              <h4 className="mt-2 text-xl font-bold text-white">{size.label}</h4>
              <div className="mt-4 text-3xl font-extrabold text-[#D9272E]">{size.price}</div>
              <p className="mt-2 text-xs text-neutral-400">
                Includes serialized certificate, museum mounting, and insured air courier.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-6 backdrop-blur-md">
            <div className="text-[#D9272E] text-lg font-bold">01 / 310 GSM Cotton Rag</div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Acid-free 100% cotton fiber with smooth velvet matte finish that eliminates glass glare in garage or
              gallery lighting.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-6 backdrop-blur-md">
            <div className="text-[#D9272E] text-lg font-bold">02 / Aerospace Matte Aluminum</div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              CNC-machined aluminum frames finished in deep anodized obsidian or brushed titanium with UV-blocking
              museum acrylic.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-neutral-900/30 p-6 backdrop-blur-md">
            <div className="text-[#D9272E] text-lg font-bold">03 / Serialized Hologram Seal</div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Each physical piece is registered in our production registry with an embossed seal verifying authentic
              generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

