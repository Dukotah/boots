import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { PwaRegister } from "@/components/PwaRegister";
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
        <AuthProvider>
          <PwaRegister />
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
