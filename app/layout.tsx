import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SignInModal } from "@/components/layout/SignInModal";
import { Toaster } from "sonner";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="en" className="h-full antialiased dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${barlowCondensed.variable} ${inter.variable} min-h-full flex flex-col bg-bg-primary text-foreground selection:bg-brand selection:text-white font-sans`}
        suppressHydrationWarning
      >
        <Providers>
          <AmbientGlow />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />

          {/* Global Modals & Drawers */}
          <SearchModal />
          <CartDrawer />
          <SignInModal />
          <Toaster
            position="top-right"
            theme="dark"
            richColors
            closeButton
            toastOptions={{
              className: "font-sans",
              style: {
                background: "#0F1012",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
