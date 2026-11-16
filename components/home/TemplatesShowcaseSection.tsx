"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { TEMPLATES } from "@/data/templates";
import { useStudio } from "@/context/StudioContext";

// 13 premier master automotive templates for the showcase
const SHOWCASE_TEMPLATES = TEMPLATES.slice(0, 13);

// Duplicate 3 times to ensure a truly seamless infinite loop
const INFINITE_TEMPLATES = [
  ...SHOWCASE_TEMPLATES,
  ...SHOWCASE_TEMPLATES,
  ...SHOWCASE_TEMPLATES,
];

export function TemplatesShowcaseSection() {
  const { selectedTemplates, toggleTemplate } = useStudio();

  const trackRef = useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Framer Motion continuous scroll values
  const baseX = useMotionValue(0);
  const dragStartRef = useRef({ x: 0, baseX: 0 });
  const dragDistRef = useRef(0);

  // Measure single set width for wrapping
  const updateWidth = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector<HTMLElement>("[data-card-idx='0']");
    const secondCard = trackRef.current.querySelector<HTMLElement>("[data-card-idx='1']");
    if (firstCard && secondCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = secondCard.offsetLeft - (firstCard.offsetLeft + cardWidth);
      setSingleSetWidth((cardWidth + gap) * SHOWCASE_TEMPLATES.length);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Infinite seamless position wrapped with Framer Motion's wrap()
  const x = useTransform(baseX, (val) => {
    if (singleSetWidth <= 0) return `${val}px`;
    return `${wrap(-singleSetWidth, 0, val)}px`;
  });

  // Continuous auto-scroll loop via Framer Motion's useAnimationFrame
  useAnimationFrame((_, delta) => {
    if (isPaused || isDragging || singleSetWidth <= 0) return;
    // Elegant luxury gliding speed: ~0.8px per frame at 60fps
    const moveBy = (0.8 * delta) / 16;
    baseX.set(baseX.get() - moveBy);
  });

  // Touch & pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, baseX: baseX.get() };
    dragDistRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    dragDistRef.current += Math.abs(deltaX);
    baseX.set(dragStartRef.current.baseX + deltaX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Nudge left or right via chevrons
  const nudge = (direction: "left" | "right") => {
    const card = trackRef.current?.querySelector<HTMLElement>("[data-card-idx='0']");
    const step = (card ? card.offsetWidth + 24 : 320) * 1.5;
    baseX.set(baseX.get() + (direction === "left" ? step : -step));
  };

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#07080A] py-8 sm:py-12 lg:py-16 select-none">
      {/* Background ambient lighting accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[700px] rounded-full bg-brand/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-72 w-96 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand font-mono">
                CURATED ATELIER ARCHIVE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] font-heading uppercase">
              EXPLORE OUR EXCLUSIVE TEMPLATES
            </h2>
            <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
              Step into a world where every poster tells a story, crafted with precision and passion.
            </p>
          </div>

          {/* Right Controls: Pause/Play, Chevrons & View All */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Pause / Resume Auto-scroll */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition-all cursor-pointer"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play size={14} className="ml-0.5" /> : <Pause size={14} />}
            </button>

            {/* Left Chevron Nudge */}
            <button
              type="button"
              onClick={() => nudge("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Right Chevron Nudge */}
            <button
              type="button"
              onClick={() => nudge("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>

            {/* Link to Full Template Catalog */}
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 rounded-md border border-brand/40 bg-brand/10 hover:bg-brand px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white transition-all shadow-sm shadow-brand/30 hover:shadow-brand/50 hover:scale-[1.01] active:scale-[0.98] cursor-pointer ml-1 whitespace-nowrap"
            >
              <span>View All 29</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FRAMER MOTION CONTINUOUS INFINITE CAROUSEL TRACK */}
      {/* ============================================================== */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIdx(null);
        }}
        className={`relative w-full overflow-hidden py-4 sm:py-8 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Cinematic Dual Vignette Fades on Left & Right */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-48 bg-gradient-to-r from-[#07080A] via-[#07080A]/85 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-48 bg-gradient-to-l from-[#07080A] via-[#07080A]/85 to-transparent z-20" />

        {/* Framer Motion Animated Track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          suppressHydrationWarning
          className="flex items-center gap-3 sm:gap-6 pl-3 sm:pl-8 md:pl-12 w-max"
        >
          {INFINITE_TEMPLATES.map((tpl, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const isSelected = selectedTemplates.includes(tpl.id);
            const selectionSlot = selectedTemplates.indexOf(tpl.id);

            return (
              <motion.div
                key={`${tpl.id}-${idx}`}
                data-card
                data-card-idx={idx % SHOWCASE_TEMPLATES.length}
                onMouseEnter={() => setHoveredIdx(idx)}
                animate={{
                  scale: isHovered ? 1.06 : isAnyHovered ? 0.96 : 1,
                  opacity: isHovered ? 1 : isAnyHovered ? 0.55 : 1,
                  y: isHovered ? -6 : 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className={`relative shrink-0 ${isHovered ? "z-30" : "z-10"}`}
              >
                <Link
                  href={`/templates/${tpl.slug}`}
                  onClick={(e) => {
                    // Suppress accidental navigation during drag
                    if (dragDistRef.current > 6) {
                      e.preventDefault();
                    }
                  }}
                  className="block"
                >
                  {/* 3:4 Portrait Poster Card: Compact on smartphones (145px), full on tablet/desktop */}
                  <div
                    className={`relative aspect-[3/4] w-[145px] sm:w-[225px] md:w-[250px] lg:w-[265px] overflow-hidden rounded-xl border bg-black shadow-2xl transition-all duration-300 ${
                      isHovered
                        ? "border-brand/70 shadow-[0_10px_30px_rgba(220,38,38,0.35)] ring-1 ring-brand/50"
                        : isSelected
                        ? "border-emerald-500/50 shadow-emerald-500/10 shadow-xl"
                        : "border-white/[0.08] shadow-black/80 hover:border-white/25"
                    }`}
                  >
                    {/* Poster Artwork Image */}
                    <Image
                      src={tpl.image}
                      alt={tpl.name}
                      fill
                      sizes="(max-width: 640px) 145px, (max-width: 1024px) 250px, 265px"
                      priority={idx < 5}
                      draggable={false}
                      className="object-cover filter contrast-110 brightness-95"
                    />

                    {/* Gradient Overlay for Clean Legibility */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-black/75 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[7.5px] sm:text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-md shadow-md">
                        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-brand" />
                        <span>{tpl.category}</span>
                      </span>
                    </div>

                    {/* Top-Right Quick Select Button */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleTemplate(tpl.id);
                        }}
                        aria-label={
                          isSelected ? `Remove ${tpl.name}` : `Select ${tpl.name}`
                        }
                        title={
                          isSelected
                            ? `Selected #${selectionSlot + 1} — Click to remove`
                            : "Select this template"
                        }
                        className={`flex h-5.5 w-5.5 sm:h-7 sm:w-7 items-center justify-center rounded-md border backdrop-blur-md transition-all shadow-md cursor-pointer ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500 text-black shadow-emerald-500/40"
                            : "border-white/25 bg-black/70 text-white hover:border-brand hover:bg-brand hover:text-white"
                        }`}
                      >
                        {isSelected ? (
                          <Check size={11} strokeWidth={3} />
                        ) : (
                          <Plus size={11} strokeWidth={2.5} />
                        )}
                      </button>
                    </div>

                    {/* Minimal & Clean Bottom Title & Arrow */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3.5 z-20 flex items-end justify-between gap-1.5 sm:gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <p className="text-[8px] sm:text-[10px] text-neutral-400 font-medium truncate">
                            {tpl.subtitle}
                          </p>
                          {tpl.formattedStartingPrice && (
                            <span className="text-[8px] sm:text-[10px] font-bold text-brand shrink-0">
                              • From {tpl.formattedStartingPrice}
                            </span>
                          )}
                        </div>
                        <h3 className="font-sans normal-case text-[11px] sm:text-sm font-extrabold text-white tracking-wide truncate group-hover:text-brand transition-colors mt-0.5">
                          {tpl.name}
                        </h3>
                      </div>

                      {/* Subtle Arrow Action Icon (Always visible & high contrast) */}
                      <div
                        className={`flex h-5.5 w-5.5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border shadow-md transition-all duration-200 ${
                          isHovered
                            ? "bg-brand border-brand text-white shadow-brand/40 scale-105"
                            : "bg-black/60 border-white/20 text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        <ArrowUpRight size={11} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
