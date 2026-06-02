import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Developer Tools — Regex, JSON, Base64 & UUID",
  description:
    "Free online developer tools that run in your browser: a regex tester, JSON formatter & validator, Base64 encoder/decoder, and UUID generator. No signup.",
  keywords: ["developer tools", "online dev tools", "regex tester", "json formatter", "base64", "uuid generator"],
  alternates: { canonical: "/tools" },
};

export default function ToolsIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Free dev tools</h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Handy, no-signup tools that run entirely in your browser. Bookmark them —
        and when you’re ready to go deeper,{" "}
        <Link href="/learn" className="text-accent-soft hover:underline">
          take a course
        </Link>
        .
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="card group transition-transform hover:-translate-y-1"
          >
            <span className="text-4xl">{t.emoji}</span>
            <h2 className="mt-3 text-lg font-bold text-white">{t.name}</h2>
            <p className="mt-1 text-sm text-gray-300">{t.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-soft">
              Open <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
