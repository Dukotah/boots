import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { PwaRegister } from "@/components/PwaRegister";
import { Analytics } from "@/components/Analytics";
import { ReducedMotionProvider } from "@/components/ReducedMotionProvider";
import { SITE } from "@/lib/site";

// Default social-share card (branded). Per-page metadata overrides this.
const DEFAULT_OG = `/api/og?title=${encodeURIComponent(SITE.name)}&subtitle=${encodeURIComponent(SITE.tagline)}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cantrip — Learn to Code & Build with AI, Gamified",
    // Child pages set just their own title; this appends the brand.
    template: "%s | Cantrip",
  },
  description:
    "A gamified, multi-language coding academy. Learn JavaScript, Python, SQL, AI/LLMs, and more through interactive, auto-graded lessons. Earn XP, keep your streak, level up.",
  applicationName: SITE.name,
  keywords: [
    "learn to code",
    "learn javascript",
    "learn python",
    "learn sql",
    "learn ai",
    "learn llms",
    "prompt engineering",
    "coding interview practice",
    "interactive coding",
    "gamified learning",
    "free coding course",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Cantrip — Learn to Code & Build with AI, Gamified",
    description: SITE.description,
    url: SITE.url,
    images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: "Cantrip — Learn to Code & Build with AI, Gamified",
    description: SITE.description,
    images: [DEFAULT_OG],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0b0e14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Keyboard users can jump past the nav to content (WCAG 2.4.1). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <Analytics />
        <ReducedMotionProvider>
          <AuthProvider>
            <PwaRegister />
            <Navbar />
            <main id="main-content" className="min-h-[60vh]">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
