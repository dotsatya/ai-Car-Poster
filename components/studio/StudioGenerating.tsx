"use client";

import Image from "next/image";
import { useStudio } from "@/context/StudioContext";

export function StudioGenerating() {
  const { vehicleName, generatedArtworks, generationProgress } = useStudio();

  return (
    <div className="mt-4 sm:mt-8 rounded-2xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 lg:p-8 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand block">
            Generation Cluster Online
          </span>
          <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mt-0.5">
            Synthesizing 4 Poster Variations for {vehicleName || "Bespoke Vehicle"}
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] sm:text-xs text-neutral-300 shrink-0">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Parallel Jobs: {generatedArtworks.length || 4} Synthesizing</span>
        </div>
      </div>

      <div className="mt-4 sm:mt-8 grid grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {generatedArtworks.map((art) => {
          const status = generationProgress[art.id] || "queued";

          return (
            <div
              key={art.id}
              className="rounded-xl border border-white/[0.08] bg-black/60 p-1.5 sm:p-2.5 overflow-hidden relative flex flex-col justify-between hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-brand truncate">
                  {art.badge}
                </span>
                <span
                  className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase shrink-0 ${
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

              <div className="mt-2 sm:mt-3 relative aspect-[3/4] w-full overflow-hidden rounded-md bg-neutral-900 border border-white/[0.08]">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover transition-all duration-700 ${
                    status === "completed"
                      ? "filter brightness-100 contrast-110"
                      : "filter blur-sm brightness-50"
                  }`}
                />
                {status === "processing" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/25 to-transparent animate-pulse" />
                )}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 rounded-md bg-black/80 p-1.5 sm:p-2 backdrop-blur-sm text-[8px] sm:text-[10px] text-neutral-300 leading-tight">
                  {status === "completed"
                    ? "✓ 300 DPI Render Ready"
                    : status === "processing"
                    ? "Synthesizing contours..."
                    : "Queued..."}
                </div>
              </div>

              <div className="mt-2 sm:mt-3">
                <h4 className="text-[11px] sm:text-xs font-bold text-white truncate leading-tight">
                  {art.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] text-neutral-400 truncate mt-0.5">
                  {art.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

