"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  Upload,
  ArrowRight,
  Check,
  X,
  Plus,
  RefreshCw,
  Sparkles,
  Lock,
  Camera,
  Layers,
} from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { PRINT_SIZES } from "@/data/print-sizes";
import { SAMPLE_VEHICLES } from "@/data/sample-vehicles";
import { useStudio } from "@/context/StudioContext";

export function StudioSection() {
  const {
    user,
    signIn,
    selectedTemplates,
    toggleTemplate,
    uploadedPhoto,
    setUploadedPhoto,
    vehicleName,
    setVehicleName,
    customText,
    setCustomText,
    studioState,
    setStudioState,
    generationProgress,
    combinedStatus,
    startGenerationPipeline,
    generateCombined,
    selectedArtworks,
    toggleArtworkSelection,
    updateArtworkSize,
    updateArtworkQuantity,
    cartItems,
    cartSubtotal,
    setIsCartOpen,
  } = useStudio();

  // Drag and Drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state for the auth prompt
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

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

  const handleStartGenerationClick = () => {
    if (selectedTemplates.length === 0) {
      alert("Please select at least 1 template (up to 3) before initiating generation.");
      const el = document.getElementById("templates");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (!user) {
      setStudioState("auth_prompt");
    } else {
      startGenerationPipeline();
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signIn(authEmail, authPassword);
    if (!result.success) {
      setAuthError(result.error || "Authentication failed. Enter password: 0000");
    } else {
      setAuthError("");
      startGenerationPipeline();
    }
  };

  return (
    <section
      id="studio"
      className="relative border-t border-white/[0.06] bg-gradient-to-b from-[#0A0C0E] to-[#08090A] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Studio Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9272E]/30 bg-[#D9272E]/10 px-4 py-1.5 text-xs font-semibold text-[#D9272E] uppercase tracking-widest">
            AI Poster Studio · Generation Atelier
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Automotive Poster Studio
          </h2>
          <p className="mt-3 text-sm text-neutral-400 md:text-base leading-relaxed">
            Upload your vehicle photo, configure master templates, sign in with prototype password{" "}
            <strong className="text-white">0000</strong>, and generate high-resolution fine art renders.
          </p>
        </div>

        {/* WORKFLOW TABS */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/10 bg-neutral-900/80 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setStudioState("configure")}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                studioState === "configure" ? "bg-white text-black shadow-md" : "text-neutral-400 hover:text-white"
              }`}
            >
              1. Setup & Upload
            </button>
            <button
              onClick={handleStartGenerationClick}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                studioState === "auth_prompt" || studioState === "generating"
                  ? "bg-[#D9272E] text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              2. AI Generation
            </button>
            <button
              onClick={() => {
                if (Object.keys(generationProgress).length > 0) setStudioState("review");
                else handleStartGenerationClick();
              }}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                studioState === "review" ? "bg-white text-black shadow-md" : "text-neutral-400 hover:text-white"
              }`}
            >
              3. Review & Sizing
            </button>
          </div>
        </div>

        {/* ========================================================
            STATE 1: CONFIGURE & PHOTO UPLOAD
        ======================================================== */}
        {studioState === "configure" && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-neutral-900/40 p-6 lg:p-10 backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
              {/* Left Column: Drag & Drop Car Photo Upload Area */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D9272E]">
                      Step 1 · Vehicle Input
                    </span>
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-white">Upload Your Car Photo</h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Upload your high-resolution car photo to feed into the generative style model.
                  </p>
                </div>

                {/* Drag and Drop Zone / Active Photo Preview */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
                    isDragging
                      ? "border-[#D9272E] bg-[#D9272E]/10 scale-[1.01]"
                      : "border-dashed border-white/20 bg-black/50 hover:border-white/40 hover:bg-neutral-900/60"
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
                      {/* Photo Preview */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                        <Image
                          src={uploadedPhoto}
                          alt="Uploaded Vehicle Preview"
                          fill
                          className="object-cover object-center filter contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active Car Photo</span>
                        </div>

                        {/* Change Photo Overlay Button */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-[#D9272E] hover:border-[#D9272E] cursor-pointer"
                        >
                          <RefreshCw size={13} />
                          <span>Change</span>
                        </button>

                        {/* Bottom Metadata */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div>
                            <div className="text-base font-bold text-white truncate">{vehicleName}</div>
                            <div className="text-xs text-neutral-400 font-mono">
                              {customText || "Standard Vehicle Telemetry"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Drop-over overlay indicator */}
                      {isDragging && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center">
                          <UploadCloud size={44} className="text-[#D9272E] animate-bounce" />
                          <p className="mt-2 text-sm font-bold text-white">Drop to replace this car photograph</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Empty State: Drag & Drop Box */
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="p-10 text-center cursor-pointer space-y-3"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-[#D9272E]">
                        <UploadCloud size={32} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          Drag and drop your car photo here
                        </h4>
                        <p className="mt-1 text-xs text-neutral-400">
                          or <span className="text-[#D9272E] font-semibold underline underline-offset-4">click to upload</span> from your device
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[10px] text-neutral-500">
                        <span className="rounded-full bg-white/[0.04] px-2.5 py-1 border border-white/[0.06]">
                          PNG, JPG, WEBP up to 25MB
                        </span>
                        <span className="rounded-full bg-white/[0.04] px-2.5 py-1 border border-white/[0.06]">
                          High-res side, 3/4 or rear angle
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sample Cars Quick-Select */}
                <div className="rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Or Quick-Test with Demo Cars:
                    </span>
                    <span className="text-[10px] text-neutral-500">Instant Presets</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {SAMPLE_VEHICLES.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setUploadedPhoto(sample.image);
                          setVehicleName(sample.name);
                          setCustomText(sample.text);
                        }}
                        className={`group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center transition-all cursor-pointer ${
                          uploadedPhoto === sample.image
                            ? "border-[#D9272E] bg-[#D9272E]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="relative h-10 w-full overflow-hidden rounded-lg bg-black">
                          <Image src={sample.image} alt={sample.name} fill className="object-cover" />
                        </div>
                        <span className="text-[11px] font-semibold text-white truncate w-full">
                          {sample.name.split(" ")[0]} {sample.name.split(" ")[1] || ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Custom Text & Telemetry Inputs */}
                <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      Vehicle Display Title
                    </label>
                    <input
                      type="text"
                      value={vehicleName}
                      onChange={(e) => setVehicleName(e.target.value)}
                      placeholder="e.g. PORSCHE 911 GT3 RS (992)"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                      Optional Plate / Chassis Custom Text
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. CHASSIS #042 · 518 HP · WEISSACH PKG"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-neutral-500">
                      Rendered on technical telemetry specs, chassis badges, and coordinates where supported.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Selected Master Templates in Suitable Position */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D9272E]">
                      Step 2 · Your Generation Package
                    </span>
                    <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-0.5 text-xs font-bold text-white">
                      {selectedTemplates.length} / 3 Selected
                    </span>
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-white">Chosen Poster Templates</h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    {selectedTemplates.length === 0
                      ? "Select 1 to 3 templates from the catalog to generate parallel artwork variations."
                      : `The AI will generate ${selectedTemplates.length} distinct fine-art poster variations for your vehicle.`}
                  </p>
                </div>

                {/* Selected Template Pictures Gallery Display */}
                <div className="space-y-3">
                  {selectedTemplates.map((id, index) => {
                    const tpl = TEMPLATES.find((t) => t.id === id);
                    if (!tpl) return null;

                    return (
                      <div
                        key={id}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/50 p-3.5 transition-all hover:border-[#D9272E]/50 hover:bg-neutral-900/60"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* 3:4 Portrait Poster Thumbnail */}
                          <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-black shadow-md">
                            <Image src={tpl.image} alt={tpl.name} fill sizes="56px" className="object-cover" />
                            <div className="absolute bottom-1 left-1 rounded bg-[#D9272E] px-1 text-[8px] font-bold text-white">
                              #{index + 1}
                            </div>
                          </div>

                          {/* Template Meta */}
                          <div className="min-w-0">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D9272E]">
                              {tpl.category}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">{tpl.name}</h4>
                            <p className="text-xs text-neutral-400 truncate">{tpl.subtitle}</p>
                          </div>
                        </div>

                        {/* Remove Cross Button */}
                        <button
                          type="button"
                          onClick={() => toggleTemplate(id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 hover:border-red-500/40 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
                          title={`Remove ${tpl.name}`}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Empty Slot Placeholder / Add More Button */}
                  {selectedTemplates.length < 3 && (
                    <Link
                      href="/templates"
                      className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-4 text-xs font-semibold text-neutral-400 hover:border-white/40 hover:bg-white/[0.04] hover:text-white transition-all cursor-pointer"
                    >
                      <Plus size={16} className="text-[#D9272E]" />
                      <span>
                        Add Another Template ({selectedTemplates.length}/3) — Browse Library →
                      </span>
                    </Link>
                  )}
                </div>

                {/* Multi-Template Triptych Benefit Callout */}
                {selectedTemplates.length >= 2 && (
                  <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles size={18} className="text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">
                          ✦ Multi-Template Advantage: Combined Triptych Unlocked
                        </div>
                        <p className="mt-0.5 text-[11px] text-neutral-400 leading-relaxed">
                          Because you selected {selectedTemplates.length} templates, you will also be eligible for one
                          harmonized panoramic composite artwork blending all angles.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Generation Action Call to Action */}
                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleStartGenerationClick}
                    disabled={selectedTemplates.length === 0}
                    className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#D9272E] to-[#B01A20] py-4 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-[#D9272E]/30 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 cursor-pointer"
                  >
                    <span>
                      Generate {selectedTemplates.length} Bespoke AI Posters
                    </span>
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-center text-[11px] text-neutral-400">
                    {!user ? (
                      <span className="flex items-center justify-center gap-1.5 text-neutral-300">
                        <Lock size={12} className="text-[#D9272E]" />
                        <span>Requires prototype sign-in (Password: <strong>0000</strong>) · Selections preserved</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium">
                        ✓ Signed in as {user.email} · Ready for instant AI generation
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STATE 2: SIGN IN GATEWAY (Email + Password 0000)
        ======================================================== */}
        {studioState === "auth_prompt" && (
          <div className="mt-12 mx-auto max-w-xl rounded-3xl border border-white/15 bg-neutral-900/80 p-8 lg:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="text-center">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Step 2 of 4: Member Authentication
              </span>
              <h3 className="mt-4 text-2xl font-bold text-white">Sign In to Generate Artworks</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Your <strong className="text-white">{selectedTemplates.length} selected templates</strong> and{" "}
                <strong className="text-white">{vehicleName}</strong> photograph are securely preserved.
                Enter any dummy email and the prototype password <strong className="text-white">0000</strong> to start.
              </p>
            </div>

            {authError && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200 text-center">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="driver@enthusiast.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Password / Prototype OTP
                  </label>
                  <span className="text-[10px] text-[#D9272E] font-medium">Passcode: 0000</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder="0000"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-[#D9272E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 shadow-lg mt-2 cursor-pointer"
              >
                Authenticate & Generate Previews →
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setStudioState("configure")}
                className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                ← Return to photo setup
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STATE 3: PARALLEL GENERATION SIMULATION
        ======================================================== */}
        {studioState === "generating" && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-neutral-900/40 p-8 lg:p-12 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D9272E]">
                  Generation Cluster Online
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Synthesizing Artwork for {vehicleName}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 text-xs text-neutral-300">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span>Parallel Jobs: {selectedTemplates.length} Active</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selectedTemplates.map((id) => {
                const tpl = TEMPLATES.find((t) => t.id === id);
                if (!tpl) return null;
                const status = generationProgress[id] || "queued";

                return (
                  <div key={id} className="rounded-2xl border border-white/10 bg-black/60 p-5 overflow-hidden relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D9272E]">
                        {tpl.name}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : status === "processing"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
                      <Image
                        src={tpl.image}
                        alt={tpl.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-all duration-700 ${
                          status === "completed" ? "filter brightness-100 contrast-110" : "filter blur-sm brightness-50"
                        }`}
                      />
                      {status === "processing" && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D9272E]/30 to-transparent animate-pulse" />
                      )}
                      <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/70 p-2 backdrop-blur-sm text-[10px] text-neutral-300">
                        {status === "completed"
                          ? "✓ 300 DPI Render Ready"
                          : status === "processing"
                          ? "Synthesizing vehicle contours..."
                          : "Queued in generation cluster..."}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            STATE 4: REVIEW PREVIEWS & PURCHASE SIZING
        ======================================================== */}
        {studioState === "review" && (
          <div className="mt-12 space-y-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  ✓ Generation Complete
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Review & Select Posters for Print</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Choose any combination of ready artworks. Configure independent sizes and quantities below.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStudioState("configure")}
                  className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                >
                  ← Adjust Inputs
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="rounded-xl bg-[#D9272E] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#D9272E]/30 cursor-pointer"
                >
                  View Cart ({cartItems.length})
                </button>
              </div>
            </div>

            {/* Generated Artworks Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {selectedTemplates.map((id) => {
                const tpl = TEMPLATES.find((t) => t.id === id);
                if (!tpl) return null;
                const itemState = selectedArtworks[id] || { selected: true, size: "a2", quantity: 1 };
                const currentSize = PRINT_SIZES.find((s) => s.id === itemState.size) || PRINT_SIZES[1];

                return (
                  <div
                    key={id}
                    className={`rounded-3xl border p-5 transition-all duration-300 ${
                      itemState.selected
                        ? "border-[#D9272E] bg-neutral-900/80 shadow-2xl shadow-[#D9272E]/10"
                        : "border-white/10 bg-neutral-900/30 opacity-70"
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lg">
                      <Image
                        src={tpl.image}
                        alt={tpl.name}
                        fill
                        className="object-cover filter contrast-125 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => toggleArtworkSelection(id)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
                            itemState.selected
                              ? "border-[#D9272E] bg-[#D9272E] text-white shadow-md"
                              : "border-white/30 bg-black/60 text-transparent"
                          }`}
                        >
                          <Check className="h-4 w-4 stroke-[2.5]" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D9272E]">
                          {tpl.category}
                        </span>
                        <div className="text-sm font-bold text-white">{tpl.name}</div>
                        <div className="text-[10px] text-neutral-400 font-mono truncate">{customText}</div>
                      </div>
                    </div>

                    {/* Sizing & Quantity Configuration */}
                    <div className="mt-5 space-y-4">
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                          Select Fine Art Print Size
                        </label>
                        <select
                          value={itemState.size}
                          onChange={(e) => updateArtworkSize(id, e.target.value)}
                          className="mt-1 w-full rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-xs text-white focus:border-[#D9272E] focus:outline-none"
                        >
                          {PRINT_SIZES.map((size) => (
                            <option key={size.id} value={size.id} className="bg-neutral-900 text-white">
                              {size.label} ({size.dimensions}) — {size.price} {size.popular ? "★ Popular" : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500">Unit Price</div>
                          <div className="text-base font-bold text-white">{currentSize.price}</div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2 py-1">
                          <button
                            onClick={() => updateArtworkQuantity(id, -1)}
                            className="h-6 w-6 rounded text-neutral-400 hover:bg-white/10 hover:text-white"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-semibold text-white">
                            {itemState.quantity}
                          </span>
                          <button
                            onClick={() => updateArtworkQuantity(id, 1)}
                            className="h-6 w-6 rounded text-neutral-400 hover:bg-white/10 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* OPTIONAL COMBINED TRIPTYCH PREVIEW */}
            {selectedTemplates.length >= 2 && (
              <div className="rounded-3xl border border-dashed border-[#D9272E]/40 bg-gradient-to-r from-neutral-900/80 via-black/80 to-neutral-900/80 p-8 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                      ✦ Multi-Template Privilege
                    </div>
                    <h4 className="text-xl font-bold text-white">Optional Combined Triptych Preview</h4>
                    <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                      Because you selected {selectedTemplates.length} templates (
                      {selectedTemplates.map((id) => TEMPLATES.find((t) => t.id === id)?.name).join(", ")}), you are
                      eligible for one combined composite artwork blending all perspectives.
                    </p>
                  </div>

                  <div>
                    {combinedStatus === "idle" && (
                      <button
                        onClick={generateCombined}
                        className="rounded-xl border border-purple-500/40 bg-purple-500/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-purple-200 transition-all hover:bg-purple-500/20 shadow-lg cursor-pointer"
                      >
                        Generate Combined Artwork →
                      </button>
                    )}
                    {combinedStatus === "processing" && (
                      <div className="flex items-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/40 px-5 py-2.5 text-xs text-purple-300 animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                        <span>Rendering composite triptych...</span>
                      </div>
                    )}
                    {combinedStatus === "completed" && (
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400">
                        ✓ Triptych Artwork Ready
                      </span>
                    )}
                  </div>
                </div>

                {combinedStatus === "completed" && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-4">
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/15">
                      <Image
                        src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=85"
                        alt="Combined Triptych Master Render"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div>
                          <div className="text-base font-bold text-white">Harmonized Automotive Triptych</div>
                          <div className="text-[11px] text-neutral-400">
                            Blending: {selectedTemplates.map((id) => TEMPLATES.find((t) => t.id === id)?.name).join(" + ")}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#D9272E]">$389 (Panoramic Grand)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Checkout Action */}
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Ready Artworks in Cart
                </span>
                <div className="text-xl font-bold text-white">
                  {cartItems.length} Posters Selected · Subtotal:{" "}
                  <span className="text-[#D9272E]">${cartSubtotal}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#D9272E] to-[#B01A20] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#D9272E]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Open Cart & Review Dispatch (${cartSubtotal}) →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
