"use client";

import { useRef } from "react";
import { useStudio } from "@/context/StudioContext";
import {
  StudioAuthPrompt,
  StudioConfigure,
  StudioGenerating,
  StudioReview,
} from "@/components/studio";

export default function StudioPage() {
  const {
    user,
    selectedTemplates,
    uploadedPhoto,
    studioState,
    setStudioState,
    generationProgress,
    startGenerationPipeline,
  } = useStudio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartGenerationClick = () => {
    if (selectedTemplates.length === 0) {
      alert(
        "Please select at least 1 template (up to 3) before initiating generation.",
      );
      const el = document.getElementById("templates");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (!uploadedPhoto) {
      alert("Please upload your car photo first.");
      fileInputRef.current?.click();
      return;
    }

    if (!user) {
      setStudioState("auth_prompt");
    } else {
      startGenerationPipeline();
    }
  };

  return (
    <section
      id="studio"
      className="relative border-t border-white/[0.06] bg-gradient-to-b from-bg-primary to-bg-primary py-6 sm:py-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Studio Header matching layout reference */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand">
            YOUR CREATION SPACE
          </span>
          <h1 className="mt-1.5 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Let&apos;s create your masterpiece.
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            Upload your car. Choose your selected designs. Let AI do the rest.
          </p>
        </div>

        {/* WORKFLOW TABS (kept for seamless state switching) */}
        <div className="mb-5 sm:mb-6 flex justify-center">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-white/10 bg-neutral-900/80 p-1 backdrop-blur-md">
            <button
              onClick={() => setStudioState("configure")}
              className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                studioState === "configure"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span className="sm:hidden">1. Upload</span>
              <span className="hidden sm:inline">1. Setup &amp; Upload</span>
            </button>
            <button
              onClick={handleStartGenerationClick}
              className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                studioState === "auth_prompt" || studioState === "generating"
                  ? "bg-brand text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span className="sm:hidden">2. AI Gen</span>
              <span className="hidden sm:inline">2. AI Generation</span>
            </button>
            <button
              onClick={() => {
                if (Object.keys(generationProgress).length > 0)
                  setStudioState("review");
                else handleStartGenerationClick();
              }}
              className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                studioState === "review"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span className="sm:hidden">3. Review</span>
              <span className="hidden sm:inline">3. Review &amp; Sizing</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            STATE 1: CONFIGURE & PHOTO UPLOAD (2-COLUMN REFERENCE LAYOUT)
        ======================================================== */}
        {studioState === "configure" && (
          <StudioConfigure
            fileInputRef={fileInputRef}
            onStartGeneration={handleStartGenerationClick}
          />
        )}

        {/* ========================================================
            STATE 2: SIGN IN GATEWAY (Email + Password 0000)
        ======================================================== */}
        {studioState === "auth_prompt" && (
          <StudioAuthPrompt
            onBack={() => setStudioState("configure")}
            onSuccess={startGenerationPipeline}
          />
        )}

        {/* ========================================================
            STATE 3: PARALLEL GENERATION SIMULATION
        ======================================================== */}
        {studioState === "generating" && <StudioGenerating />}

        {/* ========================================================
            STATE 4: REVIEW PREVIEWS & PURCHASE SIZING
        ======================================================== */}
        {studioState === "review" && (
          <StudioReview onBackToConfigure={() => setStudioState("configure")} />
        )}
      </div>
    </section>
  );
}
