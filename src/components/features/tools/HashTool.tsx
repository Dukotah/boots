"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algorithm = (typeof ALGORITHMS)[number];

async function hash(algo: Algorithm, text: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    algo,
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function HashTool() {
  const [algo, setAlgo] = useState<Algorithm>("SHA-256");
  const [input, setInput] = useState("Cantrip");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setOutput("");
      return;
    }
    hash(algo, input).then((digest) => {
      if (!cancelled) setOutput(digest);
    });
    return () => {
      cancelled = true;
    };
  }, [algo, input]);

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-line p-0.5">
          {ALGORITHMS.map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={[
                "rounded-md px-3 py-1.5 text-sm font-medium transition",
                algo === a ? "bg-accent/20 text-white" : "text-gray-400 hover:text-white",
              ].join(" ")}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          spellCheck={false}
          className="mt-1 w-full resize-y rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-sm text-white focus:border-accent/60 focus:outline-none"
        />
      </div>

      <div className="card">
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {algo}
          </label>
          {output && (
            <button
              onClick={copy}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
        <pre className="min-h-[5rem] whitespace-pre-wrap break-all rounded-lg border border-line bg-canvas/40 p-3 font-mono text-sm text-gray-200">
          {output || <span className="text-gray-500">Result appears here.</span>}
        </pre>
      </div>
    </div>
  );
}
