import Link from "next/link";
import { ShieldCheck, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — POSTER GEN Automotive Atelier",
  description:
    "Review the terms, fine art commission agreements, intellectual property guidelines, and print fulfillment policies for POSTER GEN.",
};

export default function TermsPage() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header matching standard category / page typography */}
        <div className="mb-6 sm:mb-8 lg:mb-10 max-w-3xl">
         
          <h1 className="mt-1.5 text-3xl sm:text-5xl lg:text-6xl tracking-wide sm:tracking-wider text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
            Welcome to POSTER GEN. These terms govern the commission of generative automotive artwork, 
            use of our digital atelier studio, and purchase of museum-grade physical fine art prints.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
            <span>Last Updated: November 2026</span>
            <span>·</span>
            <span>Version 2.4</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Legal Sections */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Section 1 */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-mono">
                  01
                </span>
                Atelier Scope &amp; Service Agreement
              </h2>
              <div className="mt-3.5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  POSTER GEN provides an exclusive, proprietary digital-to-physical atelier service allowing automotive 
                  enthusiasts and collectors to transform vehicle photographs into stylized, gallery-grade automotive 
                  posters utilizing bespoke generative AI artistic models.
                </p>
                <p>
                  By accessing our studio, selecting templates, submitting photographs, or completing a print commission, 
                  you agree to be legally bound by these Terms &amp; Conditions and our Privacy Policy.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-mono">
                  02
                </span>
                User Photographs &amp; Intellectual Property
              </h2>
              <div className="mt-3.5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  <strong>Ownership of Submissions:</strong> You retain full intellectual property ownership of all personal 
                  automotive photographs uploaded to the studio. By uploading an image, you affirm that you own or possess 
                  authorized license to process the submitted media.
                </p>
                <p>
                  <strong>Processing License:</strong> You grant POSTER GEN a limited, non-exclusive license solely to 
                  analyze, process, stylize, and render your photograph for the fulfillment of your poster generation and 
                  print order. We do not sell or license your personal vehicle photographs to third parties.
                </p>
                <p>
                  <strong>Atelier Templates &amp; Graphics:</strong> All proprietary design templates, typographic layouts, 
                  vector graphics, technical spec layouts, and atelier branding remain the exclusive intellectual property 
                  of POSTER GEN.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-mono">
                  03
                </span>
                Generative AI Pipeline &amp; Artistic Disclaimers
              </h2>
              <div className="mt-3.5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  Our generative pipeline applies specialized neural rendering models to interpret vehicular angles, reflections, 
                  and environmental lighting into stylized aesthetics (including Minimalist Spec, Neon Cyberpunk, Vintage 
                  Monochrome, and Bauhaus Studio editions).
                </p>
                <p>
                  Due to the creative nature of generative diffusion algorithms, minor stylistic variations and artistic 
                  abstractions may occur. Digital previews on client monitors are calibrated to 100% sRGB color spaces; 
                  physical prints are executed on 12-color Giclée plotters utilizing archival pigment inks for maximum 
                  fidelity.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-mono">
                  04
                </span>
                Fine Art Print Specifications &amp; Quality
              </h2>
              <div className="mt-3.5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  Every physical artwork produced by our atelier conforms to strict archival standards:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li><strong>Substrate:</strong> 310 GSM 100% acid-free velvet cotton rag paper.</li>
                  <li><strong>Inks:</strong> 12-pigment archival Giclée inks certified 100+ years lightfast without fading.</li>
                  <li><strong>Framing:</strong> CNC-machined aerospace matte aluminum frames with UV-filtering museum acrylic glazing.</li>
                  <li><strong>Certification:</strong> Individually serialized registration label and atelier certificate of authenticity.</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-mono">
                  05
                </span>
                Bespoke Orders, Shipping &amp; Replacement Policy
              </h2>
              <div className="mt-3.5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  <strong>Custom Made-to-Order Nature:</strong> Because each print is custom-rendered and printed individually 
                  based on your vehicle specifications, completed prints cannot be returned or refunded once production has begun.
                </p>
                <p>
                  <strong>Transit Guarantee &amp; Courier Damage:</strong> All artworks are dispatched in reinforced, impact-tested 
                  packaging with full courier insurance. In the rare event your physical frame or print arrives damaged in transit, 
                  contact our concierge within 7 calendar days with photographs of the packaging and damage. We will immediately 
                  remaster and dispatch a replacement piece at zero additional charge.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 sm:p-7 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 border border-brand/30 text-brand text-xs font-mono">
                  06
                </span>
                Limitation of Liability
              </h2>
              <div className="mt-3.5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>
                  POSTER GEN shall not be held liable for indirect, incidental, or consequential damages resulting from 
                  the use of our digital generator, server downtime, or third-party courier customs delays. In all circumstances, 
                  our aggregate liability is strictly limited to the amount paid for your commissioned order.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Highlights */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            {/* Quick Summary Card */}
            <div className="rounded-xl border border-white/[0.08] bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-md space-y-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2.5 text-brand">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Collector Guarantees
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                  <span>Your car photos remain strictly your own intellectual property.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                  <span>100% insured transit replacement for any courier damage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                  <span>True 100+ year archival museum-grade fine art longevity.</span>
                </li>
              </ul>
            </div>

            {/* Questions Card */}
            <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-neutral-900/90 to-black p-5 sm:p-6 backdrop-blur-md hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-bold">Have Legal Questions?</h3>
              </div>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Our concierge and legal desk are available for custom gallery licensing and commercial commission queries.
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-between rounded-xl bg-white/[0.05] hover:bg-white/[0.1] px-3.5 py-2.5 text-xs font-semibold text-white transition-colors"
                >
                  <span>Contact Concierge</span>
                  <ArrowRight className="h-3.5 w-3.5 text-brand" />
                </Link>
                <Link
                  href="/account/orders"
                  className="inline-flex items-center justify-between rounded-xl border border-white/10 hover:border-white/20 px-3.5 py-2.5 text-xs font-medium text-neutral-300 transition-colors"
                >
                  <span>Track Past Orders</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

