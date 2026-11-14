"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/data/faqs";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header matching standard category / page typography */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
         
          <h1 className="mt-1.5 text-3xl sm:text-5xl lg:text-6xl tracking-wide sm:tracking-wider text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            Everything you need to know about our automotive AI pipeline,
            multi-template triptychs, museum-grade 310 GSM cotton rag printing,
            and worldwide courier dispatch.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2.5 sm:space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-brand/50 bg-neutral-900/90 shadow-lg shadow-brand/10"
                    : "border-white/[0.08] bg-neutral-900/40 hover:border-white/25 hover:bg-neutral-900/60"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-3.5 sm:p-4.5 lg:p-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full border border-white/10 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-brand text-white border-transparent"
                        : "text-neutral-400"
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 sm:px-4.5 sm:pb-4.5 lg:px-5 lg:pb-5 text-xs sm:text-sm leading-relaxed text-neutral-300 border-t border-white/[0.04] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Concierge Card */}
        <div className="mt-8 sm:mt-12 rounded-xl border border-white/[0.08] bg-neutral-900/60 p-5 sm:p-7 text-center hover:border-white/20 transition-all duration-300">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand">
            Private Concierge Support
          </span>
          <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-white">
            Have a Specific Vehicle or Bespoke Request?
          </h3>
          <p className="mt-1.5 text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Our automotive curators and digital printmakers are available for
            custom large-format inquiries, racing team commissions, and bespoke
            gallery framing consultations.
          </p>
          <div className="mt-5">
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-brand hover:bg-brand-hover px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm shadow-brand/30 hover:shadow-brand/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            >
              Contact Concierge Desk →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
