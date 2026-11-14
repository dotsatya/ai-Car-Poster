"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { X, Plus, ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";
import { TemplatePreviewModal } from "./TemplatePreviewModal";

export function TemplateSelectionBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedTemplates, toggleTemplate, clearTemplates } = useStudio();
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

  // Only show on template page (/templates or /templates/[slug]), not on all pages
  if (!pathname || !pathname.startsWith("/templates")) {
    return null;
  }

  const handleProceedToGenerate = () => {
    if (selectedTemplates.length === 0) {
      alert("Please select at least 1 template (up to 3) before proceeding to the studio.");
      return;
    }
    router.push("/studio");
  };

  const hasSelection = selectedTemplates.length > 0;

  return (
    <div className="fixed bottom-2.5 sm:bottom-4 left-1/2 z-50 w-[96%] sm:w-[92%] max-w-xl -translate-x-1/2 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 rounded-2xl border border-white/15 bg-bg-primary/95 py-1.5 px-2.5 sm:py-2 sm:px-3.5 shadow-2xl shadow-black/90 backdrop-blur-xl ring-1 ring-white/10">
        {/* Left: Selected Templates Counter */}
        <div className="flex flex-col items-start shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
              Selected
            </span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[8px] sm:text-[10px] font-bold text-white transition-colors ${
                hasSelection ? "bg-brand" : "bg-neutral-800 text-neutral-400 border border-white/10"
              }`}
            >
              {selectedTemplates.length}/3
            </span>
          </div>
          {hasSelection ? (
            <button
              type="button"
              onClick={clearTemplates}
              className="text-[8px] sm:text-[10px] font-medium text-neutral-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Clear
            </button>
          ) : (
            <span className="text-[8px] sm:text-[10px] text-neutral-400 whitespace-nowrap">
              Pick up to 3
            </span>
          )}
        </div>

        {/* Middle: Three Compact Template Picture Slots */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mx-auto">
          {[0, 1, 2].map((index) => {
            const templateId = selectedTemplates[index];
            const tpl = templateId ? TEMPLATES.find((t) => t.id === templateId) : null;

            if (tpl) {
              return (
                <div
                  key={tpl.id}
                  onClick={() => setPreviewTemplateId(tpl.id)}
                  title={`Preview ${tpl.name}`}
                  className="group relative h-9 w-7 sm:h-12 sm:w-9 shrink-0 overflow-hidden rounded-lg border border-white/30 bg-black shadow-md cursor-pointer hover:border-brand hover:scale-105 transition-all"
                >
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    sizes="40px"
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
                    className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black/80 text-white/90 hover:bg-brand hover:text-white transition-colors duration-150 shadow-md cursor-pointer"
                  >
                    <X size={9} strokeWidth={2.5} />
                  </button>

                  <div className="absolute bottom-0.5 left-0.5 right-0.5 text-[6px] sm:text-[7px] font-semibold text-white/90 text-center pointer-events-none">
                    #{index + 1}
                  </div>
                </div>
              );
            }

            // Compact Empty slot placeholder
            return (
              <div
                key={index}
                className="flex h-9 w-7 sm:h-12 sm:w-9 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/[0.02] text-neutral-400 transition-colors"
              >
                <Plus size={9} className="text-neutral-400" />
                <span className="text-[6px] sm:text-[7px] font-mono mt-0.5">#{index + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Compact Generate Button */}
        <div className="flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={handleProceedToGenerate}
            disabled={!hasSelection}
            className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold transition-all duration-200 whitespace-nowrap ${
              hasSelection
                ? "bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-hover hover:shadow-brand/50 hover:scale-[1.02] active:scale-95 cursor-pointer"
                : "bg-white/[0.06] text-neutral-400 border border-white/10 cursor-not-allowed opacity-60"
            }`}
          >
            <span>Generate ({selectedTemplates.length})</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* Pop-up Image Preview Modal with dark backdrop & deselect button */}
      <TemplatePreviewModal
        templateId={previewTemplateId}
        onClose={() => setPreviewTemplateId(null)}
      />
    </div>
  );
}
