import type { Metadata } from "next";

// Auth utility page — no SEO value, keep it out of the index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
