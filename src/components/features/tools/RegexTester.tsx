"use client";

import { useMemo, useState } from "react";

const FLAGS = [
  { key: "g", label: "global" },
  { key: "i", label: "ignore case" },
  { key: "m", label: "multiline" },
  { key: "s", label: "dotall" },
];

type Match = { text: string; index: number; groups: string[] };

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState(
    "Email ada@cantrip.dev or support@example.com for help.",
  );

  const { error, matches } = useMemo(() => {
    if (!pattern) return { error: null as string | null, matches: [] as Match[] };
    try {
      // Always include "g" internally so we can collect every match.
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const out: Match[] = [];
      let m: RegExpExecArray | null;
      let guard = 0;
      while ((m = re.exec(text)) !== null && guard++ < 10000) {
        out.push({ text: m[0], index: m.index, groups: m.slice(1) });
        if (m[0] === "") re.lastIndex++; // guard against zero-width loops
      }
      return { error: null, matches: out };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Invalid regex", matches: [] };
    }
  }, [pattern, flags, text]);

  function toggleFlag(f: string) {
    setFlags((cur) => (cur.includes(f) ? cur.replace(f, "") : cur + f));
  }

  // Highlight matches in the test string.
  const highlighted = useMemo(() => {
    if (error || matches.length === 0) return null;
    const parts: React.ReactNode[] = [];
    let last = 0;
    matches.forEach((m, i) => {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(
        <mark key={i} className="rounded bg-accent/40 text-white">
          {text.slice(m.index, m.index + m.text.length)}
        </mark>,
      );
      last = m.index + m.text.length;
    });
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }, [matches, text, error]);

  return (
    <div className="space-y-4">
      <div className="card">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Pattern
        </label>
        <div className="mt-1 flex items-center gap-2 font-mono">
          <span className="text-gray-500">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 rounded-lg border border-line bg-canvas/60 px-3 py-2 text-sm text-white focus:border-accent/60 focus:outline-none"
            spellCheck={false}
          />
          <span className="text-gray-500">/{flags}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {FLAGS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFlag(f.key)}
              aria-pressed={flags.includes(f.key)}
              className={[
                "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                flags.includes(f.key)
                  ? "bg-accent/20 text-white"
                  : "bg-surface-2 text-gray-400 hover:text-white",
              ].join(" ")}
            >
              {f.key} · {f.label}
            </button>
          ))}
        </div>
        {error && <p className="mt-2 text-sm text-danger">⚠ {error}</p>}
      </div>

      <div className="card">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Test string
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-1 w-full resize-y rounded-lg border border-line bg-canvas/60 px-3 py-2 font-mono text-sm text-white focus:border-accent/60 focus:outline-none"
          spellCheck={false}
        />
        {highlighted && (
          <div className="mt-3 whitespace-pre-wrap rounded-lg border border-line bg-canvas/40 p-3 font-mono text-sm text-gray-300">
            {highlighted}
          </div>
        )}
      </div>

      <div className="card">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          {matches.length} match{matches.length === 1 ? "" : "es"}
        </p>
        {matches.length === 0 ? (
          <p className="text-sm text-gray-500">No matches.</p>
        ) : (
          <div className="space-y-1.5">
            {matches.map((m, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-mono text-accent-soft">{m.text}</span>
                <span className="text-xs text-gray-500">at index {m.index}</span>
                {m.groups.length > 0 && (
                  <span className="text-xs text-gray-400">
                    groups: {m.groups.map((g) => JSON.stringify(g)).join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
