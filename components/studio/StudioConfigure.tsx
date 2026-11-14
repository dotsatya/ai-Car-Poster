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
    <div className="rounded-xl sm:rounded-3xl border border-white/10 bg-[#0E1013]/90 p-3.5 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-2xl">
      <div className="grid grid-cols-1 gap-5 sm:gap-8 lg:grid-cols-2 items-start">
        <CarPhotoUpload fileInputRef={fileInputRef} />
        <SelectedDesignsList />
      </div>
      <StudioActionBar onStartGeneration={onStartGeneration} />
    </div>
  );
}

