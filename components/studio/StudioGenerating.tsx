"use client";

import Image from "next/image";
import { useStudio } from "@/context/StudioContext";

export function StudioGenerating() {
  const { vehicleName, generatedArtworks, generationProgress } = useStudio();

  return (
    <div className="mt-6 sm:mt-8 rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4 sm:p-6 lg:p-8 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
      <div className="flex flex-col items-center justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
            Generation Cluster Online
          </span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-0.5">
            Synthesizing 4 Poster Variations for {vehicleName || "Bespoke Vehicle"}
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-1 text-xs text-neutral-300">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Parallel Jobs: {generatedArtworks.length || 4} Synthesizing</span>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {generatedArtworks.map((art) => {
          const status = generationProgress[art.id] || "queued";

          return (
            <div
              key={art.id}
              className="rounded-xl border border-white/[0.08] bg-black/60 p-3 sm:p-4 overflow-hidden relative flex flex-col justify-between hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand truncate">
                  {art.badge}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase shrink-0 ${
                    status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : status === "processing"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-3 relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/[0.08]">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover transition-all duration-700 ${
                    status === "completed"
                      ? "filter brightness-100 contrast-110"
                      : "filter blur-sm brightness-50"
                  }`}
                />
                {status === "processing" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/25 to-transparent animate-pulse" />
                )}
                <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/75 p-2 backdrop-blur-sm text-[10px] text-neutral-300">
                  {status === "completed"
                    ? "✓ 300 DPI Render Ready"
                    : status === "processing"
                    ? "Synthesizing contours & typography..."
                    : "Queued in generation cluster..."}
                </div>
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-bold text-white truncate">{art.title}</h4>
                <p className="text-[10px] text-neutral-400 truncate mt-0.5">{art.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

