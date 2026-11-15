"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { X, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
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
      toast.warning("No Templates Selected", {
        description: "Please select at least 1 template (up to 3) before proceeding to the studio.",
      });
      return;
    }
    router.push("/studio");
  };

  const hasSelection = selectedTemplates.length > 0;

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-5 left-1/2 z-50 w-[95%] sm:w-[92%] max-w-xl -translate-x-1/2 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* ============================================================== */}
      {/* 1. MOBILE VIEW (sm:hidden): Compact, slots left, count & button right */}
      {/* ============================================================== */}
      <div className="flex sm:hidden items-center justify-between gap-2.5 rounded-xl border border-white/[0.08] bg-[#0B0D10]/95 px-3.5 py-3 shadow-2xl shadow-black/95 backdrop-blur-xl ring-1 ring-white/10 hover:border-white/20 transition-all duration-300">
        {/* Left: Three Template Slots */}
        <div className="flex items-center gap-1.5 shrink-0">
          {[0, 1, 2].map((index) => {
            const templateId = selectedTemplates[index];
            const tpl = templateId ? TEMPLATES.find((t) => t.id === templateId) : null;

            if (tpl) {
              return (
                <div
                  key={tpl.id}
                  onClick={() => setPreviewTemplateId(tpl.id)}
                  title={`Preview ${tpl.name}`}
                  className="group relative h-12 w-8.5 shrink-0 overflow-hidden rounded-sm border border-white/25 bg-black shadow-md cursor-pointer hover:border-brand/70 active:scale-95 transition-all"
                >        
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    sizes="45px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Quick-remove cross (✕) button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTemplate(tpl.id);
                    }}
                    aria-label={`Remove ${tpl.name}`}
                    className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black/85 border border-white/20 text-neutral-300 hover:bg-brand hover:border-brand hover:text-white transition-colors duration-150 shadow-md cursor-pointer"
                  >
                    <X size={9} strokeWidth={2.5} />
                  </button>

                  <div className="pointer-events-none absolute bottom-0.5 left-0.5 right-0.5 text-[7px] font-mono font-bold text-white/90 text-center">
                    #{index + 1}
                  </div>
                </div>
              );
            }

            // Empty slot placeholder
            return (
              <div
                key={index}
                className="flex h-12 w-8.5 shrink-0 flex-col items-center justify-center rounded-sm border border-dashed border-white/20 bg-white/[0.02] text-neutral-500 transition-colors"
              >
                <Plus size={10} className="text-neutral-500" />
                <span className="text-[7px] font-mono font-medium text-neutral-500 mt-0.5">
                  #{index + 1}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Selected count above Prominent Generate Button */}
        <div className="flex flex-col items-center justify-center shrink-0 min-w-0">
          <div className="text-[9px] font-medium tracking-wide text-neutral-300 mb-1 leading-none">
            {selectedTemplates.length === 0 ? (
              <span className="text-neutral-400">0 of 3 selected</span>
            ) : (
              <>
                <span className="font-semibold text-white">{selectedTemplates.length}</span>
                <span className="text-neutral-300"> of 3 selected</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleProceedToGenerate}
            disabled={!hasSelection}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-[1.01] active:scale-[0.98] ${
              hasSelection
                ? "bg-brand text-white shadow-sm shadow-brand/30 border border-brand/40 hover:bg-brand-hover hover:shadow-brand/50"
                : "bg-white/[0.05] text-neutral-500 border border-white/10 cursor-not-allowed opacity-60 hover:scale-100"
            }`}
          >
            <span>Generate ({selectedTemplates.length})</span>
            <ArrowRight size={12} className="shrink-0" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. LAPTOP / DESKTOP VIEW (hidden sm:flex): Original 3-part layout */}
      {/* ============================================================== */}
      <div className="hidden sm:flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-bg-primary/95 py-2.5 px-4 shadow-2xl shadow-black/90 backdrop-blur-xl ring-1 ring-white/10 hover:border-white/20 transition-all duration-300">
        {/* Left: Selected Templates Counter + Clear */}
        <div className="flex flex-col items-start shrink-0 min-w-[130px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Selected
            </span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold text-white transition-colors ${
                hasSelection ? "bg-brand" : "bg-neutral-800 text-neutral-400 border border-white/10"
              }`}
            >
              {selectedTemplates.length}/3
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-neutral-400 hidden md:inline">
              {selectedTemplates.length === 3 ? "Triptych unlocked" : "Pick up to 3"}
            </span>
            {hasSelection ? (
              <button
                type="button"
                onClick={clearTemplates}
                className="text-[10px] font-medium text-neutral-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Clear
              </button>
            ) : (
              <span className="text-[10px] text-neutral-400 md:hidden whitespace-nowrap">
                Pick up to 3
              </span>
            )}
          </div>
        </div>

        {/* Middle: Three Centered Template Picture Slots */}
        <div className="flex items-center justify-center gap-2 mx-auto">
          {[0, 1, 2].map((index) => {
            const templateId = selectedTemplates[index];
            const tpl = templateId ? TEMPLATES.find((t) => t.id === templateId) : null;

            if (tpl) {
              return (
                <div
                  key={tpl.id}
                  onClick={() => setPreviewTemplateId(tpl.id)}
                  title={`Preview ${tpl.name}`}
                  className="group relative h-13 w-9.5 shrink-0 overflow-hidden rounded-sm border border-white/30 bg-black shadow-md cursor-pointer hover:border-brand/70 hover:scale-105 transition-all"
                >
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    sizes="45px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

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

                  <div className="pointer-events-none absolute bottom-0.5 left-0.5 right-0.5 text-[7px] font-semibold text-white/90 text-center">
                    #{index + 1}
                  </div>
                </div>
              );
            }

            // Compact Empty slot placeholder
            return (
              <div
                key={index}
                className="flex h-13 w-9.5 shrink-0 flex-col items-center justify-center rounded-sm border border-dashed border-white/20 bg-white/[0.02] text-neutral-400 transition-colors"
              >
                <Plus size={9} className="text-neutral-400" />
                <span className="text-[7px] font-mono mt-0.5">#{index + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Compact Generate Button */}
        <div className="flex items-center justify-end shrink-0 min-w-[130px]">
          <button
            type="button"
            onClick={handleProceedToGenerate}
            disabled={!hasSelection}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-[1.01] active:scale-[0.98] ${
              hasSelection
                ? "bg-brand text-white shadow-sm shadow-brand/30 hover:bg-brand-hover hover:shadow-brand/50"
                : "bg-white/[0.06] text-neutral-400 border border-white/10 cursor-not-allowed opacity-60 hover:scale-100"
            }`}
          >
            <span>Generate ({selectedTemplates.length})</span>
            <ArrowRight size={12} />
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
