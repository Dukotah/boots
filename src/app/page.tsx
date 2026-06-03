import type { Metadata } from "next";
import { Landing } from "@/components/features/marketing/Landing";

export const metadata: Metadata = {
  title: "Cantrip — Learn to Code & Land the Career, Gamified",
  description:
    "Pick a guided career path — frontend, backend, AI engineer, data — and we sequence every course from your first line of code to job-ready. Write real, auto-graded code in your browser, earn XP, and level up like an RPG. Free to start.",
};

export default function Home() {
  return <Landing />;
}
