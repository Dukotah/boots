import type { Metadata } from "next";
import { Playground } from "@/components/features/playground/Playground";

export const metadata: Metadata = {
  title: "Online Code Playground — Run JavaScript, Python & SQL",
  description:
    "A free online code playground. Write and run JavaScript, Python, and SQL right in your browser — no install, no signup. Powered by Cantrip.",
  keywords: [
    "online code playground",
    "run python online",
    "run javascript online",
    "online javascript compiler",
    "sql playground online",
    "code editor online",
  ],
  alternates: { canonical: "/playground" },
  openGraph: {
    type: "website",
    title: "Online Code Playground — Run JS, Python & SQL | Cantrip",
    description:
      "Write and run JavaScript, Python, and SQL in your browser. Free, instant, no signup.",
    url: "/playground",
  },
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Online code playground
      </h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Write and run <strong className="text-gray-200">JavaScript</strong>,{" "}
        <strong className="text-gray-200">Python</strong>, and{" "}
        <strong className="text-gray-200">SQL</strong> right in your browser —
        no install, no signup. Your code runs locally in a sandbox; nothing is
        sent to a server. Ready to go deeper?{" "}
        <a href="/learn" className="text-accent-soft hover:underline">
          Start a course →
        </a>
      </p>

      <div className="mt-8">
        <Playground initial="js" />
      </div>

      <section className="mt-12 max-w-2xl text-sm leading-relaxed text-gray-400">
        <h2 className="text-lg font-semibold text-white">
          Run code online, instantly
        </h2>
        <p className="mt-2">
          The Cantrip playground is a free online compiler and REPL. JavaScript
          runs in a sandboxed Web Worker, Python runs via Pyodide (CPython
          compiled to WebAssembly), and SQL runs on SQLite compiled to WASM — all
          on your own machine. It’s perfect for testing a snippet, learning a new
          language, or trying an idea without setting anything up.
        </p>
      </section>
    </div>
  );
}
