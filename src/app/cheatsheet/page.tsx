import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CHEATSHEETS } from "@/lib/cheatsheets";

export const metadata: Metadata = {
  title: "Programming Cheat Sheets — JavaScript, Python & SQL",
  description:
    "Free, quick-reference programming cheat sheets for JavaScript, Python, and SQL. Syntax, snippets, and the methods you reach for every day.",
  keywords: ["programming cheat sheet", "javascript cheat sheet", "python cheat sheet", "sql cheat sheet"],
  alternates: { canonical: "/cheatsheet" },
};

export default function CheatsheetIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Cheat sheets</h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Quick-reference syntax and snippets for the languages you’re learning.
        Bookmark one and keep it open while you code.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CHEATSHEETS.map((c) => (
          <Link
            key={c.slug}
            href={`/cheatsheet/${c.slug}`}
            className="card group transition-transform hover:-translate-y-1"
          >
            <span className="text-4xl">{c.emoji}</span>
            <h2 className="mt-3 text-lg font-bold text-white">{c.title}</h2>
            <p className="mt-1 text-sm text-gray-300">{c.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-soft">
              Open <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
