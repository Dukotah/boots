"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function JsonFormatter() {
  const [input, setInput] = useState('{"name":"Cantrip","level":7,"langs":["js","py","sql"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function run(minify: boolean) {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard?.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card flex flex-col">
        <label className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          spellCheck={false}
          className="w-full flex-1 resize-y rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-sm text-white focus:border-accent/60 focus:outline-none"
        />
        <div className="mt-3 flex gap-2">
          <button onClick={() => run(false)} className="btn-primary text-sm">
            Format
          </button>
          <button onClick={() => run(true)} className="btn-ghost text-sm">
            Minify
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-danger">⚠ {error}</p>}
      </div>

      <div className="card flex flex-col">
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Output
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
        <pre className="min-h-[14rem] flex-1 overflow-auto rounded-lg border border-line bg-canvas/40 p-3 font-mono text-sm text-gray-200">
          {output || <span className="text-gray-500">Formatted JSON appears here.</span>}
        </pre>
      </div>
    </div>
  );
}
