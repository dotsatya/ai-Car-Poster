"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/data/faqs";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D9272E]">
            Atelier Clarifications
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
            Everything you need to know about our automotive AI pipeline, multi-template triptychs,
            museum-grade 310 GSM cotton rag printing, and worldwide courier dispatch.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#D9272E]/50 bg-neutral-900/90 shadow-lg shadow-[#D9272E]/10"
                    : "border-white/[0.06] bg-neutral-900/40 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-semibold text-white pr-4">{faq.question}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#D9272E] text-white border-transparent" : "text-neutral-400"
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.06] px-6 pb-6 pt-4 text-xs leading-relaxed text-neutral-400 md:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Help Box */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-neutral-900/50 p-8 text-center backdrop-blur-md">
          <h3 className="text-lg font-bold text-white">Have a Unique Question or Custom Request?</h3>
          <p className="mt-2 text-xs text-neutral-400 max-w-md mx-auto">
            Our curators and printmasters can assist with bespoke livery adaptations, private collection commissions,
            and specialized framing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition-colors"
            >
              Contact Concierge Desk
            </Link>
            <Link
              href="/#creator"
              className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Launch Poster Studio →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

