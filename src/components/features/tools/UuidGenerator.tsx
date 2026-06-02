"use client";

import { useState } from "react";
import { RefreshCw, Check, Copy } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

function makeUuids(n: number): string[] {
  // crypto.randomUUID is available in modern browsers (client-only).
  return Array.from({ length: n }, () => crypto.randomUUID());
}

export function UuidGenerator() {
  const mounted = useMounted();
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Generate on first mount (avoids hydration mismatch — randomness is client-only).
  if (mounted && uuids.length === 0) {
    setUuids(makeUuids(count));
  }

  function regenerate() {
    setUuids(makeUuids(count));
  }
  function copy(value: string) {
    navigator.clipboard?.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1200);
  }
  function copyAll() {
    copy(uuids.join("\n"));
  }

  return (
    <div className="space-y-4">
      <div className="card flex flex-wrap items-center gap-3">
        <label className="text-sm text-gray-400">How many?</label>
        <input
          type="number"
          min={1}
          max={50}
          value={count}
          onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
          className="w-20 rounded-lg border border-line bg-canvas/60 px-3 py-1.5 text-sm text-white focus:border-accent/60 focus:outline-none"
        />
        <button onClick={regenerate} className="btn-primary text-sm">
          <RefreshCw size={15} /> Generate
        </button>
        {uuids.length > 0 && (
          <button onClick={copyAll} className="btn-ghost text-sm">
            Copy all
          </button>
        )}
      </div>

      <div className="card">
        {!mounted ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <div className="space-y-1.5">
            {uuids.map((u) => (
              <button
                key={u}
                onClick={() => copy(u)}
                className="flex w-full items-center justify-between rounded-lg border border-line bg-canvas/40 px-3 py-2 text-left font-mono text-sm text-gray-200 hover:border-accent/50"
              >
                {u}
                {copied === u ? (
                  <Check size={14} className="text-success" />
                ) : (
                  <Copy size={14} className="text-gray-500" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
