"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Play, ChevronLeft, ChevronRight, Pencil, AlertTriangle, Terminal, Layers } from "lucide-react";
import { CodeEditor } from "@/components/CodeEditor";
import { trace, type TraceResult } from "@/lib/visualizer/trace";

const EXAMPLE = `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

let result = factorial(5);
console.log("5! =", result);`;

export function Visualizer() {
  const [code, setCode] = useState(EXAMPLE);
  const [result, setResult] = useState<TraceResult | null>(null);
  const [i, setI] = useState(0);

  const step = result && result.steps.length ? result.steps[i] : null;
  const stepCount = result?.steps.length ?? 0;

  function run() {
    const r = trace(code);
    setResult(r);
    setI(0);
  }

  const go = useCallback(
    (delta: number) => setI((n) => Math.min(Math.max(n + delta, 0), Math.max(stepCount - 1, 0))),
    [stepCount],
  );

  // Arrow-key scrubbing while a trace is open.
  useEffect(() => {
    if (!result) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result, go]);

  const lines = useMemo(() => code.split("\n"), [code]);

  // ── editing mode ──
  if (!result) {
    return (
      <div className="mt-6">
        <div className="card flex flex-col p-0">
          <div className="border-b border-line px-4 py-2 font-mono text-xs text-gray-400">
            scratch.js
          </div>
          <div className="h-[360px]">
            <CodeEditor value={code} onChange={setCode} language="javascript" />
          </div>
        </div>
        <button onClick={run} className="btn-primary mt-3">
          <Play size={16} /> Visualize
        </button>
        <p className="mt-2 text-xs text-gray-400">
          Runs in your browser. Best on plain functions, loops, conditionals, and
          variables — step through to watch the call stack and values change.
        </p>
      </div>
    );
  }

  // ── stepping mode ──
  return (
    <div className="mt-6">
      {result.error && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
          <AlertTriangle size={16} className="mt-0.5 flex-none" />
          <span>{result.error}</span>
        </div>
      )}
      {result.truncated && !result.error && (
        <div className="mb-3 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-gold">
          Trace was cut off — this looks like a very long or infinite loop.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Code with current-line highlight */}
        <div className="card overflow-x-auto p-0">
          <pre className="font-mono text-sm leading-6">
            {lines.map((ln, idx) => {
              const lineNo = idx + 1;
              const active = step?.line === lineNo;
              return (
                <div
                  key={idx}
                  className={`flex ${active ? "bg-accent/20" : ""}`}
                >
                  <span className="w-10 flex-none select-none px-2 text-right text-gray-400">
                    {lineNo}
                  </span>
                  <code className={`flex-1 whitespace-pre px-2 ${active ? "text-white" : "text-gray-300"}`}>
                    {ln || " "}
                  </code>
                </div>
              );
            })}
          </pre>
        </div>

        {/* State: call stack + variables + console */}
        <div className="space-y-4">
          <div className="card">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
              <Layers size={13} /> Call stack &amp; variables
            </p>
            <div className="space-y-2">
              {step?.frames
                .slice()
                .reverse()
                .map((frame, fi) => (
                  <div
                    key={fi}
                    className={`rounded-lg border p-2 ${
                      fi === 0 ? "border-accent/40 bg-accent/5" : "border-line bg-canvas/40"
                    }`}
                  >
                    <p className="font-mono text-xs font-semibold text-accent-soft">
                      {frame.fn}
                    </p>
                    {Object.keys(frame.vars).length === 0 ? (
                      <p className="mt-1 text-xs text-gray-400">no variables yet</p>
                    ) : (
                      <ul className="mt-1 space-y-0.5">
                        {Object.entries(frame.vars).map(([k, v]) => (
                          <li key={k} className="font-mono text-xs">
                            <span className="text-gray-400">{k}</span>
                            <span className="text-gray-400"> = </span>
                            <span className="text-emerald-300">{v}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div className="card">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
              <Terminal size={13} /> Console
            </p>
            {step && step.stdout.length > 0 ? (
              <pre className="whitespace-pre-wrap font-mono text-xs text-gray-300">
                {step.stdout.join("\n")}
              </pre>
            ) : (
              <p className="text-xs text-gray-400">No output yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Step controls */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => setResult(null)} className="btn-ghost">
          <Pencil size={15} /> Edit code
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            disabled={i === 0}
            className="btn-ghost px-3 disabled:opacity-40"
            aria-label="Previous step"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-[7rem] text-center text-sm text-gray-400">
            Step {stepCount ? i + 1 : 0} / {stepCount}
            {step ? ` · line ${step.line}` : ""}
          </span>
          <button
            onClick={() => go(1)}
            disabled={i >= stepCount - 1}
            className="btn-ghost px-3 disabled:opacity-40"
            aria-label="Next step"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        {stepCount > 1 && (
          <input
            type="range"
            min={0}
            max={stepCount - 1}
            value={i}
            onChange={(e) => setI(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer accent-accent"
            aria-label="Scrub steps"
          />
        )}
      </div>
    </div>
  );
}
