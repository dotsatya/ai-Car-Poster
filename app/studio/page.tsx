import type { Metadata } from "next";
import { StudioSection } from "@/components/home/StudioSection";

export const metadata: Metadata = {
  title: "AI Poster Studio — POSTER GEN",
  description:
    "Transform your personal automotive photography into museum-grade fine art posters using advanced AI styling and precision architectural layouts.",
};

export default function StudioPage() {
  return (
    <div className="pt-8">
      <StudioSection />
    </div>
  );
}

