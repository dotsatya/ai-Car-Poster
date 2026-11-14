"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, Eye } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";
import { TemplatePreviewModal } from "@/components/templates/TemplatePreviewModal";

export function SelectedDesignsList() {
  const { selectedTemplates, toggleTemplate } = useStudio();
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide">
          Selected Templates
        </h2>
        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] sm:text-xs font-mono font-bold text-emerald-400">
          {selectedTemplates.length}/3
        </span>
      </div>

      {/* Vertical Stack of Selected Template Cards matching reference layout */}
      <div className="space-y-2.5 sm:space-y-3">
        {selectedTemplates.map((id, index) => {
          const tpl = TEMPLATES.find((t) => t.id === id);
          if (!tpl) return null;

          return (
            <div
              key={id}
              onClick={() => setPreviewTemplateId(id)}
              className="group flex items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-2.5 sm:p-3 transition-all hover:border-brand/40 hover:bg-neutral-900/60 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                {/* 3:4 Portrait Poster Artwork Preview */}
                <div className="relative aspect-[3/4] h-14 w-10.5 sm:h-18 sm:w-13.5 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-white/15 bg-black shadow-md transition-transform duration-200 group-hover:scale-102">
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    sizes="55px"
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={14} className="text-white drop-shadow" />
                  </div> */}
                </div>

                {/* Design Meta */}
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-brand transition-colors">
                    {tpl.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
                    {tpl.category} · #{String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.2 text-[9px] sm:text-[10px] font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Selected
                    </span>
                    <span className="text-[10px] text-neutral-500 hidden sm:inline group-hover:text-neutral-400 transition-colors">
                      Click to preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Remove Cross Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTemplate(id);
                }}
                aria-label={`Remove ${tpl.name}`}
                className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 hover:border-red-500/40 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
                title={`Remove ${tpl.name}`}
              >
                <X size={12} className="sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          );
        })}

        {/* Add Another Slot only if at least 1 template is selected and fewer than 3 */}
        {selectedTemplates.length > 0 && selectedTemplates.length < 3 && (
          <Link
            href="/templates"
            className="flex items-center justify-center gap-1.5 rounded-xl sm:rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-2.5 sm:p-3.5 text-xs font-semibold text-neutral-400 hover:border-brand/40 hover:bg-white/[0.04] hover:text-white transition-all cursor-pointer"
          >
            <Plus size={14} className="text-brand" />
            <span>
              Add Another Template ({selectedTemplates.length}/3) — Browse Library →
            </span>
          </Link>
        )}

        {/* Empty state when 0 selected */}
        {selectedTemplates.length === 0 && (
          <div className="rounded-xl sm:rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 sm:p-6 text-center">
            <p className="text-xs text-neutral-400">
              No templates selected yet. Choose up to 3 master templates from our collection.
            </p>
            <Link
              href="/templates"
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
            >
              Browse Poster Templates →
            </Link>
          </div>
        )}
      </div>

      <p className="text-xs text-neutral-400">
        {selectedTemplates.length > 0
          ? `Your uploaded photo will be used with all ${selectedTemplates.length} selected ${
              selectedTemplates.length === 1 ? "design" : "designs"
            }.`
          : "Select up to 3 master designs to generate parallel poster variations."}
      </p>

      {/* Multi-Template Triptych Benefit Callout */}
      {selectedTemplates.length >= 2 && (
        <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-3.5">
          <div className="flex items-start gap-2.5">
            <div>
              <div className="text-xs font-bold text-white">
                ✦ Multi-Template Advantage: Combined Triptych Unlocked
              </div>
              <p className="mt-0.5 text-[11px] text-neutral-400 leading-relaxed">
                Because you selected {selectedTemplates.length} templates, you will also receive one harmonized composite artwork blending all angles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Image Preview Modal with dark backdrop & deselect button */}
      <TemplatePreviewModal
        templateId={previewTemplateId}
        onClose={() => setPreviewTemplateId(null)}
      />
    </div>
  );
}
