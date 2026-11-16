"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Trash2, Check } from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";

interface TemplatePreviewModalProps {
  templateId: string | null;
  onClose: () => void;
  onRemove?: (id: string) => void;
}

const emptySubscribe = () => () => {};

export function TemplatePreviewModal({
  templateId,
  onClose,
  onRemove,
}: TemplatePreviewModalProps) {
  const { toggleTemplate, selectedTemplates } = useStudio();
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Close on Escape key and prevent background scroll while modal is active
  useEffect(() => {
    if (!templateId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [templateId, onClose]);

  if (!isClient || !templateId) return null;

  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) return null;

  const selectionIndex = selectedTemplates.indexOf(templateId);

  const handleDeselect = () => {
    if (onRemove) {
      onRemove(templateId);
    } else {
      toggleTemplate(templateId);
    }
    onClose();
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-preview-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-[340px] sm:max-w-sm md:max-w-[400px] max-h-[92vh] flex flex-col rounded-xl border border-white/[0.08] bg-[#0F1115] p-3.5 sm:p-5 shadow-2xl shadow-black/95 text-left animate-in zoom-in-95 duration-200 overflow-y-auto">
        {/* Top Header: Eyebrow + Close Button */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              {template.category}
            </span>
            {selectionIndex !== -1 && (
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.2 text-[9px] font-mono font-bold text-emerald-400">
                #{selectionIndex + 1} Selected
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Large Artwork Poster Preview */}
        <div className="relative aspect-[3/4] w-full max-h-[44vh] sm:max-h-[50vh] overflow-hidden rounded-xl border border-white/[0.08] bg-black mt-3 shadow-lg shrink-0">
          <Image
            src={template.image}
            alt={template.name}
            fill
            sizes="(max-width: 640px) 85vw, 400px"
            priority
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Bottom Overlay Info Tag */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-white/90">
            <span className="rounded-full bg-black/60 px-2.5 py-0.5 backdrop-blur-md border border-white/10">
              {template.tag || "300 DPI Atelier Master"}
            </span>
            <span className="rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-md border border-white/10 font-mono">
              3:4 Fine Art
            </span>
          </div>
        </div>

        {/* Template Meta */}
        <div className="mt-3 space-y-1 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              id="template-preview-title"
              className="font-sans normal-case text-base sm:text-lg font-bold text-white tracking-wide truncate"
            >
              {template.name}
            </h3>
            {template.formattedStartingPrice && (
              <span className="text-xs sm:text-sm font-bold text-brand shrink-0">
                From {template.formattedStartingPrice}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
            {template.subtitle || template.description}
          </p>
        </div>

        {/* Action Buttons: Deselect / Remove & Keep Selection */}
        <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex items-center gap-2.5 shrink-0">
          {/* Deselect / Remove Button */}
          <button
            type="button"
            onClick={handleDeselect}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-red-500/35 bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-white py-2 sm:py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer shadow-sm shadow-red-500/20 active:scale-95"
          >
            <Trash2 size={13} className="shrink-0 text-red-400" />
            <span>Remove</span>
          </button>

          {/* Keep / Done Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white py-2 sm:py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer active:scale-95"
          >
            <Check size={13} className="text-emerald-400 shrink-0" />
            <span>Keep Selected</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
