import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AmbientGlow } from "@/components/layout/AmbientGlow";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`${barlowCondensed.variable} ${inter.variable} min-h-full flex flex-col bg-bg-primary text-foreground selection:bg-brand selection:text-white font-sans`}
        suppressHydrationWarning
      >
        <Providers>
          <AmbientGlow />
          <Navbar />
          <main className="relative z-10 flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />

          {/* Global Modals & Drawers */}
          <SearchModal />
          <CartDrawer />
          <SignInModal />
          <Toaster
            position="top-right"
            theme="dark"
            closeButton
            className="max-sm:!hidden"
            offset={{ top: "88px", right: "20px" }}
            toastOptions={{
              duration: 3500,
              classNames: {
                toast:
                  "font-sans !bg-[#111215] !border !border-white/10 !text-white !shadow-xl !shadow-black/70 " +
                  "!w-[260px] lg:!w-[320px] " +
                  "!rounded-lg lg:!rounded-xl " +
                  "!gap-2 !px-3 !py-2 lg:!px-3.5 lg:!py-2.5",
                title:
                  "!text-xs !font-semibold !text-white !leading-tight tracking-wide",
                description:
                  "!text-[10.5px] lg:!text-[11px] !text-neutral-400 !font-normal !leading-snug !mt-0.5",
                icon: "!size-3.5 lg:!size-4",
                closeButton:
                  "max-lg:!hidden !bg-[#18191D] !border-white/10 !text-neutral-400 hover:!text-white hover:!bg-white/10",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
