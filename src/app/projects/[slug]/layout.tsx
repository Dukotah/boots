import type { Metadata } from "next";

// Project detail pages ARE indexable — they're SEO landing pages. This MUST
// explicitly set robots:index to OVERRIDE the parent src/app/projects/layout.tsx,
// which sets noindex for the private /projects hub (a client app-shell).
export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
