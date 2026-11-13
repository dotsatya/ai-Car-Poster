import type { Metadata } from "next";
import "./globals.css";
import { StudioProvider } from "@/context/StudioContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SignInModal } from "@/components/layout/SignInModal";

export const metadata: Metadata = {
  title: "POSTER GEN — Bespoke Automotive Art & Fine Art Prints",
  description:
    "Transform your personal car photographs into museum-grade automotive posters with generative AI and collector-grade craftsmanship.",
  keywords: [
    "automotive posters",
    "car art",
    "AI poster generator",
    "supercar art",
    "custom car print",
    "fine art prints",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#08090A] text-[#F5F5F3] selection:bg-[#D9272E] selection:text-white font-sans">
        <StudioProvider>
          {/* Ambient Glows */}
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-[#D9272E]/10 via-transparent to-transparent blur-[140px] opacity-70" />
            <div className="absolute top-[1400px] left-1/4 w-[600px] h-[600px] bg-white/[0.02] blur-[150px]" />
            <div className="absolute top-[2800px] right-1/4 w-[700px] h-[600px] bg-[#D9272E]/5 blur-[160px]" />
          </div>

          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />

          {/* Global Modals & Drawers */}
          <SearchModal />
          <CartDrawer />
          <SignInModal />
        </StudioProvider>
      </body>
    </html>
  );
}
