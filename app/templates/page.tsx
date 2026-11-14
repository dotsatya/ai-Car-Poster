import type { Metadata } from "next";
import { TemplateGrid } from "@/components/templates/TemplateGrid";

export const metadata: Metadata = {
  title: "Poster Templates — Curated Automotive Designs",
  description:
    "Choose from our premium automotive poster designs. Turn your car photo into stunning AI posters.",
};

export default function TemplatesPage() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header matching user design reference */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
            Curated Collection
          </span>
          <h1 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Poster Templates
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            Choose from our premium automotive poster designs.
          </p>
        </div>

        <TemplateGrid />
      </div>
    </div>
  );
}
