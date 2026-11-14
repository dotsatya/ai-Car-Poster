"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { StorySection } from "@/components/home/StorySection";
import { MissionSection } from "@/components/how-it-works/MissionSection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";
import { TemplateGrid } from "@/components/templates/TemplateGrid";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StorySection />
      <MissionSection />

      {/* Template Vault Showcase */}
      <section
        id="templates"
        className="relative border-t border-white/[0.06] bg-bg-primary py-8 sm:py-12 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
              Curated Collection
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Poster Templates
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
              Choose from our premium automotive poster designs.
            </p>
          </div>

          <TemplateGrid />
        </div>
      </section>

      {/* Craftsmanship Specifications */}
      <CraftsmanshipSection />
    </div>
  );
}
