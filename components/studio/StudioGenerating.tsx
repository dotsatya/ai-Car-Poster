"use client";

import Image from "next/image";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";

export function StudioGenerating() {
  const { vehicleName, selectedTemplates, generationProgress } = useStudio();

  return (
    <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-900/40 p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
      <div className="flex flex-col items-center justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
            Generation Cluster Online
          </span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-0.5">
            Synthesizing Artwork for {vehicleName}
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-neutral-300">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Parallel Jobs: {selectedTemplates.length} Active</span>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selectedTemplates.map((id) => {
          const tpl = TEMPLATES.find((t) => t.id === id);
          if (!tpl) return null;
          const status = generationProgress[id] || "queued";

          return (
            <div key={id} className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/60 p-3.5 sm:p-4.5 overflow-hidden relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
                  {tpl.name}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
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

              <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
                <Image
                  src={tpl.image}
                  alt={tpl.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-all duration-700 ${
                    status === "completed" ? "filter brightness-100 contrast-110" : "filter blur-sm brightness-50"
                  }`}
                />
                {status === "processing" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/30 to-transparent animate-pulse" />
                )}
                <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/70 p-2 backdrop-blur-sm text-[10px] text-neutral-300">
                  {status === "completed"
                    ? "✓ 300 DPI Render Ready"
                    : status === "processing"
                    ? "Synthesizing vehicle contours..."
                    : "Queued in generation cluster..."}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

