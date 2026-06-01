import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Boots — Learn to Code & Build with AI, Gamified",
    // Child pages set just their own title; this appends the brand.
    template: "%s | Boots",
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
    title: "Boots — Learn to Code & Build with AI, Gamified",
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: "Boots — Learn to Code & Build with AI, Gamified",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
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
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
