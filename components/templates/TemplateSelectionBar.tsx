"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Plus, ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";

export function TemplateSelectionBar() {
  const router = useRouter();
  const { selectedTemplates, toggleTemplate, clearTemplates } = useStudio();

  if (selectedTemplates.length === 0) {
    return null;
  }

  const handleProceedToGenerate = () => {
    router.push("/studio");
  };

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-white/15 bg-[#0E1013]/95 py-2.5 px-4 shadow-2xl shadow-black/90 backdrop-blur-xl ring-1 ring-white/10">
        {/* Left: Selected Templates Counter */}
        <div className="flex items-center sm:flex-col items-center sm:items-start justify-between w-full sm:w-auto shrink-0 sm:min-w-[140px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Selected
            </span>
            <span className="rounded-full bg-[#D9272E] px-1.5 py-0.5 text-[10px] font-bold text-white">
              {selectedTemplates.length}/3
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-neutral-400 hidden md:inline">
              {selectedTemplates.length === 3 ? "Triptych unlocked" : `Pick up to 3`}
            </span>
            <button
              type="button"
              onClick={clearTemplates}
              className="text-[10px] font-medium text-neutral-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Middle: Three Compact Template Picture Slots */}
        <div className="flex items-center justify-center gap-2 mx-auto">
          {[0, 1, 2].map((index) => {
            const templateId = selectedTemplates[index];
            const tpl = templateId ? TEMPLATES.find((t) => t.id === templateId) : null;

            if (tpl) {
              return (
                <div
                  key={tpl.id}
                  className="group relative h-13 w-10 sm:h-14 sm:w-11 shrink-0 overflow-hidden rounded-lg border border-white/30 bg-black shadow-md"
                >
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Cross (✕) button to remove template from selection */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTemplate(tpl.id);
                    }}
                    aria-label={`Remove ${tpl.name}`}
                    className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/80 text-white/90 hover:bg-[#D9272E] hover:text-white transition-colors duration-150 shadow-md cursor-pointer"
                  >
                    <X size={10} strokeWidth={2.5} />
                  </button>

                  <div className="absolute bottom-0.5 left-0.5 right-0.5 text-[7px] font-semibold text-white/90 text-center pointer-events-none">
                    #{index + 1}
                  </div>
                </div>
              );
            }

            // Compact Empty slot placeholder
            return (
              <div
                key={index}
                className="flex h-13 w-10 sm:h-14 sm:w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/[0.02] text-neutral-500 transition-colors"
              >
                <Plus size={12} className="text-neutral-500" />
                <span className="text-[7px] font-mono mt-0.5">#{index + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Compact Generate Button */}
        <div className="flex items-center justify-center sm:justify-end shrink-0 sm:min-w-[140px] w-full sm:w-auto">
          <button
            type="button"
            onClick={handleProceedToGenerate}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#D9272E] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#D9272E]/30 transition-all duration-200 hover:bg-[#b81d23] hover:shadow-[#D9272E]/50 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Generate ({selectedTemplates.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
