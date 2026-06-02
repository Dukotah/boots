"use client";

import { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import { LANGUAGES } from "@/lib/curriculum/lang";
import { runScratch, type ScratchResult } from "@/lib/runner";
import { CodeEditor } from "@/components/CodeEditor";

// The playground REPL supports the runnable, output-producing languages only
// (HTML/CSS is taught via the live-preview lesson view, not this REPL).
type PgLang = "js" | "py" | "sql";

const STARTERS: Record<PgLang, string> = {
  js: `// Try some JavaScript — runs in your browser.
console.log("Hello from Cantrip 🪄");

const nums = [1, 2, 3, 4, 5];
console.log("squares:", nums.map((n) => n * n));`,
  py: `# Try some Python — runs in your browser via Pyodide.
print("Hello from Cantrip 🪄")

nums = [1, 2, 3, 4, 5]
print("squares:", [n * n for n in nums])`,
  sql: `-- Try some SQL — runs in your browser via SQLite (WASM).
CREATE TABLE spells (name TEXT, power INTEGER);
INSERT INTO spells VALUES ('Fireball', 9), ('Heal', 5), ('Bolt', 7);

SELECT * FROM spells ORDER BY power DESC;`,
};

const ORDER: PgLang[] = ["js", "py", "sql"];

export function Playground({ initial = "js" }: { initial?: PgLang }) {
  const [lang, setLang] = useState<PgLang>(initial);
  const [code, setCode] = useState(STARTERS[initial]);
  const [result, setResult] = useState<ScratchResult | null>(null);
  const [running, setRunning] = useState(false);
  // Track which starters the user hasn't edited, so switching languages is safe.
  const [pristine, setPristine] = useState(true);

  function switchLang(next: PgLang) {
    if (next === lang) return;
    setLang(next);
    setResult(null);
    if (pristine || code.trim() === STARTERS[lang].trim()) {
      setCode(STARTERS[next]);
      setPristine(true);
    }
  }

  async function run() {
    setRunning(true);
    try {
      setResult(await runScratch(code, lang));
    } catch {
      setResult({ logs: [], error: "Something went wrong running your code. Try again." });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {ORDER.map((l) => (
            <button
              key={l}
              onClick={() => switchLang(l)}
              className={[
                "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                l === lang
                  ? "bg-accent/20 text-white"
                  : "text-gray-400 hover:bg-surface-2 hover:text-white",
              ].join(" ")}
            >
              {LANGUAGES[l].label}
            </button>
          ))}
          <button
            onClick={run}
            disabled={running}
            className="btn-primary ml-auto disabled:opacity-60"
          >
            {running ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {running ? "Running…" : "Run"}
          </button>
        </div>

        <div className="card h-[420px] p-0">
          <CodeEditor
            value={code}
            onChange={(v) => {
              setCode(v);
              setPristine(false);
            }}
            language={LANGUAGES[lang].monaco}
          />
        </div>
        <p className="text-xs text-gray-500">{LANGUAGES[lang].runtime} · nothing is sent to a server.</p>
      </section>

      <section className="card min-h-[420px] overflow-auto">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Output
        </p>
        <Output result={result} running={running} />
      </section>
    </div>
  );
}

function Output({
  result,
  running,
}: {
  result: ScratchResult | null;
  running: boolean;
}) {
  if (running && !result) {
    return <p className="text-sm text-gray-500">Running…</p>;
  }
  if (!result) {
    return <p className="text-sm text-gray-500">Press Run to see output here.</p>;
  }
  if (result.error) {
    return (
      <pre className="whitespace-pre-wrap font-mono text-sm text-danger">
        {result.error}
      </pre>
    );
  }
  if (result.tables && result.tables.length > 0) {
    return (
      <div className="space-y-4">
        {result.tables.map((t, i) => (
          <table key={i} className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-gray-400">
                {t.columns.map((c) => (
                  <th key={c} className="px-2 py-1 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.values.map((row, r) => (
                <tr key={r} className="border-b border-line/50">
                  {row.map((cell, c) => (
                    <td key={c} className="px-2 py-1 font-mono text-gray-200">
                      {String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  }
  if (result.logs.length > 0) {
    return (
      <pre className="whitespace-pre-wrap font-mono text-sm text-gray-200">
        {result.logs.join("\n")}
      </pre>
    );
  }
  return (
    <p className="text-sm text-gray-500">
      Ran successfully — no output{result.tables ? " (no rows returned)" : ""}.
    </p>
  );
}
