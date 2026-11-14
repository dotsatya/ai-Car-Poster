"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, RefreshCw } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

interface CarPhotoUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function CarPhotoUpload({ fileInputRef }: CarPhotoUploadProps) {
  const {
    uploadedPhoto,
    setUploadedPhoto,
    vehicleName,
    setVehicleName,
    customText,
    setCustomText,
  } = useStudio();

  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedPhoto(url);
      setVehicleName(file.name.replace(/\.[^/.]+$/, "").toUpperCase());
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedPhoto(url);
      setVehicleName(file.name.replace(/\.[^/.]+$/, "").toUpperCase());
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide">
          Upload Your Car Picture
        </h2>
      </div>

      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
          isDragging
            ? "border-brand bg-brand/10 scale-[1.01]"
            : "border-dashed border-white/20 bg-black/40 hover:border-white/30 hover:bg-neutral-900/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedPhoto ? (
          <div className="relative group">
            {/* Active Car Photo Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <Image
                src={uploadedPhoto}
                alt="Uploaded Vehicle Preview"
                fill
                className="object-cover object-center filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-black/75 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Car Photo</span>
              </div>

              {/* Top Right Action Buttons */}
              <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-black/75 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-brand hover:border-brand cursor-pointer"
                >
                  <RefreshCw size={11} />
                  <span>Change</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedPhoto("");
                    setVehicleName("");
                    setCustomText("");
                  }}
                  className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-white/20 bg-black/75 text-neutral-300 backdrop-blur-md transition-all hover:bg-red-600 hover:border-red-600 hover:text-white cursor-pointer"
                  title="Remove photo"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Bottom Metadata */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white truncate">{vehicleName}</div>
                  {customText && (
                    <div className="text-xs text-neutral-400 font-mono">
                      {customText}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Drop-over overlay indicator */}
            {isDragging && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm text-center">
                <UploadCloud size={40} className="text-brand animate-bounce" />
                <p className="mt-2 text-sm font-bold text-white">Drop to replace this car photograph</p>
              </div>
            )}
          </div>
        ) : (
          /* Empty State: Matching user demo screenshot precisely */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="py-6 sm:py-10 md:py-12 px-3 sm:px-6 text-center cursor-pointer flex flex-col items-center justify-center space-y-2.5 group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/[0.03] text-neutral-300 group-hover:text-white group-hover:scale-105 transition-all">
              <UploadCloud size={24} className="sm:w-[28px] sm:h-[28px]" strokeWidth={1.8} />
            </div>

            <div className="space-y-0.5">
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wide">
                Drag &amp; drop your car photo here
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400">
                or
              </p> 
              <p className="text-xs sm:text-sm text-white underline underline-offset-4 group-hover:text-brand transition-colors font-medium">
                click to upload
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-[11px] sm:text-xs text-neutral-400">
        Use a clear, high-quality photograph of your car.
      </p>

      {/* Optional Custom Text */}
      <div className="space-y-1 pt-1">
        <label className="block text-xs sm:text-sm font-bold text-white">
          Optional Custom Text
        </label>
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="e.g. Porsche 911 GT3 RS"
          className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs text-white placeholder-neutral-500 backdrop-blur-sm transition-all focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <p className="text-[10px] sm:text-[11px] text-neutral-500">
          Only available for templates that support text.
        </p>
      </div>
    </div>
  );
}

