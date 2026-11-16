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
        {/* Header matching unified luxury atelier hierarchy */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading uppercase leading-[1.08]">
            Poster Templates
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            Choose from our premium automotive poster designs. Turn your machine photograph into a museum-grade archival edition.
          </p>
        </div>

        <TemplateGrid />
      </div>
    </div>
  );
}
