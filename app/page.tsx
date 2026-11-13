"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { StorySection } from "@/components/home/StorySection";
import { MissionSection } from "@/components/home/MissionSection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";
import { StudioSection } from "@/components/home/StudioSection";
import { TemplateGrid } from "@/components/templates/TemplateGrid";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StorySection />
      <MissionSection />

      {/* Template Vault Showcase */}
      <section id="templates" className="relative border-t border-white/[0.06] bg-[#0A0C0E] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Poster Templates
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400">
              Choose from our premium automotive poster designs. Select up to 3 templates below to generate parallel previews.
            </p>
          </div>
        </div>
      </section>

      {/* The Interactive AI Poster Studio */}
      <StudioSection />

      {/* Craftsmanship Specifications */}
      <CraftsmanshipSection />
    </div>
  );
}
