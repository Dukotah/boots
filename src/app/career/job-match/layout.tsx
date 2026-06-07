import type { Metadata } from "next";
export const metadata: Metadata = { title: "Job Match", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
