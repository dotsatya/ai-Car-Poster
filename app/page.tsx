"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { TemplatesShowcaseSection } from "@/components/home/TemplatesShowcaseSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Premium Automotive Templates Showcase (Continuously Auto-scrolling Infinite Loop) */}
      <TemplatesShowcaseSection />

      {/* 4-Step Interactive Process */}
      <HowItWorksSection />

      {/* Craftsmanship Specifications */}
      <CraftsmanshipSection />
    </div>
  );
}
