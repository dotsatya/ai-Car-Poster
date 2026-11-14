"use client";

import { ArrowRight } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

interface StudioActionBarProps {
  onStartGeneration: () => void;
}

export function StudioActionBar({ onStartGeneration }: StudioActionBarProps) {
  const { selectedTemplates } = useStudio();

  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
      {/* Left Side: Summary text */}
      <div className="text-center sm:text-left w-full sm:w-auto">
        <div className="text-sm sm:text-base md:text-lg font-bold text-white">
          {selectedTemplates.length > 0
            ? `${selectedTemplates.length} individual ${
                selectedTemplates.length === 1 ? "poster" : "posters"
              }`
            : "No templates selected"}
        </div>
        <div className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
          {selectedTemplates.length > 0
            ? "+ 1 optional combined preview"
            : "Select 1 to 3 templates to enable generation"}
        </div>
      </div>

      {/* Right Side: Primary CTA Generate Button */}
      <button
        type="button"
        onClick={onStartGeneration}
        disabled={selectedTemplates.length === 0}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-hover px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-brand/30 hover:shadow-brand/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
      >
        <span>Generate Posters</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

