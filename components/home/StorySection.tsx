import Image from "next/image";

export function StorySection() {
  return (
    <section id="about" className="relative border-t border-white/[0.06] bg-[#0A0C0E] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
              The Art of Automotive Immortality
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Our Story
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400 lg:text-base">
              Preserving the art of luxury automotive passion through precision, craftsmanship, and generative
              mastery.
            </p>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-sm leading-relaxed text-neutral-300 md:text-base">
              Poster Gen was founded by car designers, computational artists, and obsessive petrolheads with a shared
              conviction: an enthusiast&apos;s machine is more than transport—it is a sculpture of engineering, memories,
              and character.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400 md:text-base">
              Today, we are proud to serve collectors across 40 countries, turning everyday photos of trackday icons,
              classic restorations, and daily drivers into museum-grade framed posters worth over $2.5M in custom-built
              enthusiast art.
            </p>
          </div>
        </div>

        {/* Front Supercar Visual with Glowing Headlights */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-black lg:mt-24">
          <div className="relative aspect-[16/8] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1900&q=85"
              alt="Front view dark luxury supercar with LED headlights"
              fill
              className="object-cover object-center filter brightness-95 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C0E]/70 via-transparent to-[#0A0C0E]/70" />
          </div>

          {/* 4 Floating Metric Glass Cards */}
          <div className="relative -mt-16 z-20 grid grid-cols-2 gap-4 px-6 pb-8 md:grid-cols-4 md:gap-6 lg:px-12 lg:pb-12">
            <div className="group rounded-2xl border border-white/[0.08] bg-neutral-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/95 hover:-translate-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-[#D9272E]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">15,000+</div>
              <p className="mt-1 text-xs font-medium text-neutral-400">Our Presence Across Global Markets</p>
            </div>

            <div className="group rounded-2xl border border-white/[0.08] bg-neutral-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/95 hover:-translate-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-[#D9272E]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">40+</div>
              <p className="mt-1 text-xs font-medium text-neutral-400">Curated Master Design Templates</p>
            </div>

            <div className="group rounded-2xl border border-white/[0.08] bg-neutral-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/95 hover:-translate-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-[#D9272E]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">310 GSM</div>
              <p className="mt-1 text-xs font-medium text-neutral-400">Museum Archival Grade Fine Paper</p>
            </div>

            <div className="group rounded-2xl border border-white/[0.08] bg-neutral-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/95 hover:-translate-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-[#D9272E]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight text-white lg:text-3xl">$2.5M+</div>
              <p className="mt-1 text-xs font-medium text-neutral-400">Enthusiast Collector Art Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

