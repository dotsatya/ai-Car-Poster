"use client";

import { CarPhotoUpload } from "./CarPhotoUpload";
import { SelectedDesignsList } from "./SelectedDesignsList";
import { StudioActionBar } from "./StudioActionBar";

interface StudioConfigureProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onStartGeneration: () => void;
}

export function StudioConfigure({
  fileInputRef,
  onStartGeneration,
}: StudioConfigureProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0E1013]/90 p-4 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-2xl hover:border-white/20 transition-all duration-300">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 items-start">
        <CarPhotoUpload fileInputRef={fileInputRef} />
        <SelectedDesignsList />
      </div>
      <StudioActionBar onStartGeneration={onStartGeneration} />
    </div>
  );
}

