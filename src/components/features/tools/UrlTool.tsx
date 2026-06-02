"use client";

import { useState } from "react";
import { ArrowDownUp, Check, Copy } from "lucide-react";

export function UrlTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("https://cantrip.dev/learn?topic=html & css");
  const [copied, setCopied] = useState(false);

  let output = "";
  let error: string | null = null;
  try {
    output = input
      ? mode === "encode"
        ? encodeURIComponent(input)
        : decodeURIComponent(input)
      : "";
  } catch {
    error = "That doesn't look like a valid encoded URL.";
  }

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
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={[
                "rounded-md px-3 py-1.5 text-sm font-medium capitalize transition",
                mode === m ? "bg-accent/20 text-white" : "text-gray-400 hover:text-white",
              ].join(" ")}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setMode((m) => (m === "encode" ? "decode" : "encode"));
            setInput(output);
          }}
          className="btn-ghost text-sm"
          title="Swap input/output"
        >
          <ArrowDownUp size={15} /> Swap
        </button>
      </div>

      <div className="card">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {mode === "encode" ? "Text" : "Encoded URL"}
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
            {mode === "encode" ? "Encoded URL" : "Text"}
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
        {error ? (
          <p className="text-sm text-danger">⚠ {error}</p>
        ) : (
          <pre className="min-h-[5rem] whitespace-pre-wrap break-all rounded-lg border border-line bg-canvas/40 p-3 font-mono text-sm text-gray-200">
            {output || <span className="text-gray-500">Result appears here.</span>}
          </pre>
        )}
      </div>
    </div>
  );
}
