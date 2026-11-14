"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { TemplatesShowcaseSection } from "@/components/home/TemplatesShowcaseSection";
import { StorySection } from "@/components/home/StorySection";
import { MissionSection } from "@/components/home/MissionSection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Premium Automotive Templates Showcase (Continuously Auto-scrolling Infinite Loop) */}
      <TemplatesShowcaseSection />

      <StorySection />
      <MissionSection />

      {/* Craftsmanship Specifications */}
      <CraftsmanshipSection />
    </div>
  );
}
