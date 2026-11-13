"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus, ArrowLeft, ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Template } from "@/types";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";
import { TemplateSelectionBar } from "./TemplateSelectionBar";

interface TemplateDetailViewProps {
  template: Template;
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const { selectedTemplates, toggleTemplate, setStudioState } = useStudio();
  const isSelected = selectedTemplates.includes(template.id);
  const selectionIndex = selectedTemplates.indexOf(template.id);

  // Curated related templates from the library
  const relatedTemplates = TEMPLATES.filter(
    (t) => t.id !== template.id && (t.category === template.category || true)
  ).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-16 pb-36">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/templates" className="hover:text-white transition-colors">
          Templates
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs">{template.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left: High-Res Poster Artwork Showcase */}
        <div className="lg:col-span-7">
          <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/80">
            <Image
              src={template.image}
              alt={template.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover filter brightness-95 contrast-125 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4">
              <span className="rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                {template.tag}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D9272E]">
                {template.category}
              </span>
              <h1 className="mt-1 text-2xl lg:text-3xl font-extrabold text-white">{template.name}</h1>
              <p className="mt-1 text-xs text-neutral-300 font-medium">{template.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Right: Specifications, Features & Selection Button */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
              Atelier Master Design
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">{template.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              {template.longDescription || template.description}
            </p>
          </div>

          {/* Primary Action Button: Add to / Remove from Selection Bar */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => toggleTemplate(template.id)}
              className={`w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 px-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer ${
                isSelected
                  ? "bg-white text-black hover:bg-neutral-200 shadow-white/10"
                  : selectedTemplates.length >= 3
                  ? "bg-neutral-800 text-neutral-400 cursor-not-allowed border border-white/10"
                  : "bg-[#D9272E] text-white shadow-[#D9272E]/30 hover:bg-[#b81d23] hover:scale-[1.01] active:scale-95"
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="h-5 w-5 text-emerald-600 stroke-[3]" />
                  <span>Added ({selectionIndex + 1}/3) - Tap to Remove</span>
                </>
              ) : selectedTemplates.length >= 3 ? (
                <span>Remove selected one to add this</span>
              ) : (
                <>
                  <Plus className="h-5 w-5 stroke-[2.5]" />
                  <span>Add to Select ({selectedTemplates.length}/3)</span>
                </>
              )}
            </button>
            <p className="mt-2 text-center text-xs text-neutral-400">
              Select up to 3 templates to run simultaneous AI generative poster variations.
            </p>
          </div>

          {/* Composition & Visual FX Features */}
          {template.features && (
            <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Composition & Visual Architecture
              </h4>
              <ul className="space-y-2 text-xs text-neutral-300">
                {template.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-[#D9272E] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specs Meta */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-white/[0.08] bg-black/50 p-4">
              <div className="text-neutral-500 uppercase tracking-wider text-[10px]">Print Aspect</div>
              <div className="mt-1 font-semibold text-white">{template.recommendedAspect || "3:4 Standard"}</div>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-black/50 p-4">
              <div className="text-neutral-500 uppercase tracking-wider text-[10px]">Custom Telemetry</div>
              <div className="mt-1 font-semibold text-white">
                {template.supportsCustomText ? "Supported (Plate/Chassis)" : "Fixed Typography"}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 hover:text-white underline underline-offset-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Browse all templates</span>
            </Link>
            <Link
              href="/studio"
              onClick={() => setStudioState("configure")}
              className="text-white hover:text-[#D9272E] font-semibold flex items-center gap-1.5"
            >
              <span>Launch Poster Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Explore More Posters Section */}
      <div className="mt-20 pt-12 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">Explore More Templates</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Click any design to inspect its artistic specifications.</p>
          </div>
          <Link
            href="/templates"
            className="text-xs font-semibold text-[#D9272E] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedTemplates.map((rel) => {
            const isRelSelected = selectedTemplates.includes(rel.id);
            return (
              <div key={rel.id} className="group relative">
                <Link href={`/templates/${rel.slug}`} className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 transition-transform duration-300 group-hover:scale-105">
                    <Image src={rel.image} alt={rel.name} fill sizes="25vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#D9272E] transition-colors">
                    {rel.name}
                  </h4>
                </Link>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleTemplate(rel.id);
                  }}
                  className={`absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                    isRelSelected
                      ? "border-[#D9272E] bg-[#D9272E] text-white"
                      : "border-white/20 bg-black/60 text-white hover:border-white"
                  }`}
                  title={isRelSelected ? "Remove from selection" : "Add to selection bar"}
                >
                  {isRelSelected ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : <Plus className="h-3.5 w-3.5 stroke-[2.5]" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Selection Bar: Visible directly on the detail page as well! */}
      <TemplateSelectionBar />
    </div>
  );
}
