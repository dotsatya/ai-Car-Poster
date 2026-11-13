import type { Metadata } from "next";
import { TemplateGrid } from "@/components/templates/TemplateGrid";

export const metadata: Metadata = {
  title: "Poster Templates — Curated Automotive Designs",
  description: "Choose from our premium automotive poster designs. Turn your car photo into stunning AI posters.",
};

export default function TemplatesPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header matching user design reference */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Poster Templates
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Choose from our premium automotive poster designs.
          </p>
        </div>

        <TemplateGrid />
      </div>
    </div>
  );
}
