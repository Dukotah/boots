import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { MODULES } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "All Courses — Learn to Code & AI | Boots",
  description:
    "Browse interactive courses: JavaScript foundations, Learn AI / build with LLMs, and more. Auto-graded, gamified, free to start.",
};

export default function LearnIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Courses</h1>
      <p className="mt-1 text-gray-400">
        Choose a module and start earning XP. Everything runs in your browser.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => (
          <Link
            key={m.slug}
            href={`/learn/${m.slug}`}
            className={`card group bg-gradient-to-br ${m.gradient} transition-transform hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl">{m.emoji}</span>
              <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300">
                {m.lessons.length} lessons
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-white">{m.title}</h2>
            <p className="mt-1 text-sm text-gray-300">{m.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
              Open course <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
