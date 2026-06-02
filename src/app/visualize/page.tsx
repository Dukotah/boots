import type { Metadata } from "next";
import { Visualizer } from "@/components/visualizer/Visualizer";

export const metadata: Metadata = {
  title: "Code Visualizer — Step Through JavaScript Execution",
  description:
    "Watch JavaScript run line by line: see the call stack, variables, and console output change at every step. A free in-browser visual debugger for learning how code executes.",
  keywords: [
    "javascript visualizer",
    "code execution visualizer",
    "visualize recursion",
    "call stack visualizer",
    "how javascript works",
    "step through code",
  ],
  alternates: { canonical: "/visualize" },
};

export default function VisualizePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Code Visualizer</h1>
      <p className="mt-2 max-w-2xl text-gray-400">
        Paste or write JavaScript, hit Visualize, then step through it line by
        line. Watch the call stack grow and unwind, variables update, and console
        output appear — the clearest way to <em>see</em> how recursion and loops
        actually work. Use ← / → to scrub.
      </p>

      <Visualizer />
    </div>
  );
}
