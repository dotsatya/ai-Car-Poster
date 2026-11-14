"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Template } from "@/types";
import { useStudio } from "@/context/StudioContext";

interface TemplateCardProps {
  template: Template;
  showDetailsLink?: boolean;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { selectedTemplates, toggleTemplate } = useStudio();
  const isSelected = selectedTemplates.includes(template.id);
  const selectionIndex = selectedTemplates.indexOf(template.id);

  return (
    <div className="group relative transition-all duration-300">
      {/* Clicking the poster or title navigates to its full detail page */}
      <Link href={`/templates/${template.slug}`} className="block">
        {/* Poster Card Container */}
        <div
          className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border transition-all duration-300 ${
            isSelected
              ? "border-brand ring-2 ring-brand shadow-xl shadow-brand/25 -translate-y-1"
              : "border-white/[0.08] bg-neutral-900/60 hover:border-white/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/70"
          }`}
        >
          <Image
            src={template.image}
            alt={template.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Soft dark vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Selected badge overlay on bottom */}
          {isSelected && (
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10 pointer-events-none">
              <span className="rounded-full bg-brand px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-brand/40">
                #{selectionIndex + 1} Selected
              </span>
            </div>
          )}
        </div>

        {/* Just the Title underneath, exactly like the reference image */}
        <div className="mt-2.5 sm:mt-3 px-0.5">
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wide truncate group-hover:text-brand transition-colors">
            {template.name}
          </h3>
        </div>
      </Link>

      {/* Top-Right Add (+) / Selected Button - Clicking toggles selection without navigating */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
        <button
          type="button"
          aria-label={isSelected ? `Remove ${template.name}` : `Select ${template.name}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTemplate(template.id);
          }}
          className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isSelected
              ? "border-brand bg-brand text-white shadow-md shadow-brand/50 scale-105"
              : "border-white/30 bg-black/60 text-white hover:border-white hover:bg-black/90 hover:scale-110"
          }`}
          title={isSelected ? "Remove from selection" : "Add to selection bar"}
        >
          {isSelected ? (
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
          ) : (
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
          )}
        </button>
      </div>
    </div>
  );
}
