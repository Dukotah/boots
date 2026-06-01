import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Boots — Learn to Code & Build with AI, Gamified",
  description:
    "A gamified, multi-language coding academy. Learn JavaScript, AI/LLMs, and more through interactive, auto-graded lessons. Earn XP, keep your streak, level up.",
  keywords: [
    "learn to code",
    "learn javascript",
    "learn ai",
    "learn llms",
    "prompt engineering",
    "interactive coding",
    "gamified learning",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
