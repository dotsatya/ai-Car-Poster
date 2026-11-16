"use client";

import { useRef, useEffect } from "react";
import { toast } from "sonner";
import { useStudio } from "@/context/StudioContext";
import { useAppAuth } from "@/lib/auth";
import {
  StudioConfigure,
  StudioGenerating,
  GenaratePosterReview,
} from "@/components/studio";

export default function StudioPage() {
  const { user, isSignInOpen, setIsSignInOpen } = useAppAuth();
  const {
    selectedTemplates,
    uploadedPhoto,
    studioState,
    setStudioState,
    generationProgress,
    startGenerationPipeline,
  } = useStudio();

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Deferred generation queue: starts generation once modal sign-in succeeds
  const pendingGenerateRef = useRef(false);

  useEffect(() => {
    if (user && pendingGenerateRef.current) {
      pendingGenerateRef.current = false;
      startGenerationPipeline();
    }
  }, [user, startGenerationPipeline]);

  // Cancel pending generation if the sign in modal is closed without authentication
  useEffect(() => {
    if (!isSignInOpen && !user) {
      pendingGenerateRef.current = false;
    }
  }, [isSignInOpen, user]);

  const handleStartGenerationClick = () => {
    if (selectedTemplates.length === 0) {
      toast.warning("No Templates Selected", {
        description:
          "Please select at least 1 template (up to 3) before initiating generation.",
      });
      const el = document.getElementById("templates");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (!uploadedPhoto) {
      toast.warning("Photo Required", {
        description: "Please upload your car photo first to generate posters.",
      });
      fileInputRef.current?.click();
      return;
    }

    if (!user) {
      pendingGenerateRef.current = true;
      setIsSignInOpen(true);
      return;
    }

    startGenerationPipeline();
  };

  return (
    <section
      id="studio"
      className="relative border-t border-white/[0.06] bg-gradient-to-b from-bg-primary to-bg-primary py-6 sm:py-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Studio Header matching layout reference */}
        <div className="mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading uppercase leading-[1.08]">
            Let&apos;s create your masterpiece.
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed mx-auto sm:mx-0">
            Upload your car. Choose your selected designs. Let AI do the rest.
          </p>
        </div>

        {/* WORKFLOW TABS (kept for seamless state switching) */}
        <div className="mb-5 sm:mb-6 flex justify-center">
          <div className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-center rounded-full border border-white/10 bg-neutral-900/80 p-1 backdrop-blur-md">
            <button
              onClick={() => setStudioState("configure")}
              className={`flex-1 sm:flex-initial rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
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
              className={`flex-1 sm:flex-initial rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
                studioState === "generating"
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
              className={`flex-1 sm:flex-initial rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
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

        {studioState === "configure" && (
          <StudioConfigure
            fileInputRef={fileInputRef}
            onStartGeneration={handleStartGenerationClick}
          />
        )}

        {studioState === "generating" && <StudioGenerating />}

        {studioState === "review" && (
          <GenaratePosterReview
            onBackToConfigure={() => setStudioState("configure")}
          />
        )}
      </div>
    </section>
  );
}
