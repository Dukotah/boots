"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Copy } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

type Result = {
  utc: string;
  local: string;
  iso: string;
};

function toResult(input: string): { result: Result | null; error: string | null } {
  const trimmed = input.trim();
  if (!trimmed) return { result: null, error: null };
  if (!/^-?\d+$/.test(trimmed)) {
    return { result: null, error: "Enter a whole number (Unix timestamp)." };
  }

  const n = Number(trimmed);
  if (!Number.isFinite(n)) {
    return { result: null, error: "That number is too large to convert." };
  }

  // 13 digits => milliseconds, otherwise treat as seconds.
  const ms = trimmed.replace("-", "").length === 13 ? n : n * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return { result: null, error: "That timestamp is out of range." };
  }

  return {
    result: {
      utc: date.toUTCString(),
      local: date.toString(),
      iso: date.toISOString(),
    },
    error: null,
  };
}

function OutputRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card">
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </label>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-all rounded-lg border border-line bg-canvas/40 p-3 font-mono text-sm text-gray-200">
        {value}
      </pre>
    </div>
  );
}

export function EpochTool() {
  const mounted = useMounted();
  const [input, setInput] = useState("1717200000");
  const [now, setNow] = useState(0);

  // Live current epoch, only after mount to avoid hydration mismatch.
  useEffect(() => {
    setNow(Math.floor(Date.now() / 1000));
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const { result, error } = toResult(input);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}
          className="btn-ghost text-sm"
          title="Fill with the current Unix timestamp"
        >
          <Clock size={15} /> Now
        </button>
        <span className="text-xs text-gray-500">
          Current epoch:{" "}
          <span className="font-mono text-gray-300">
            {mounted ? now : "—"}
          </span>
        </span>
      </div>

      <div className="card">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Unix timestamp
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          inputMode="numeric"
          placeholder="1717200000"
          className="mt-1 w-full rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-sm text-white focus:border-accent/60 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">
          Seconds by default; a 13-digit value is treated as milliseconds.
        </p>
      </div>

      {error ? (
        <div className="card">
          <p className="text-sm text-danger">⚠ {error}</p>
        </div>
      ) : result ? (
        <>
          <OutputRow label="UTC" value={result.utc} />
          <OutputRow label="Local" value={result.local} />
          <OutputRow label="ISO 8601" value={result.iso} />
        </>
      ) : (
        <div className="card">
          <pre className="min-h-[5rem] whitespace-pre-wrap break-all rounded-lg border border-line bg-canvas/40 p-3 font-mono text-sm text-gray-200">
            <span className="text-gray-500">Enter a timestamp to convert.</span>
          </pre>
        </div>
      )}
    </div>
  );
}
