import type { Metadata } from "next";
import { Landing } from "@/components/features/marketing/Landing";

export const metadata: Metadata = {
  title: "Boots — Learn to Code & Build with AI, Gamified",
  description:
    "Write real, auto-graded code in your browser. Earn XP, keep your streak, and level up across JavaScript, AI/LLMs, and more — like an RPG. Free to start.",
};

export default function Home() {
  return <Landing />;
}
