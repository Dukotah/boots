# Bundle Performance Notes

## First-load finding (~539 kB JS, gzipped)

A Lighthouse / Next.js build analysis of the lesson pages showed approximately
539 kB of first-load JavaScript. The main contributors:

| Chunk                  | Approx size (gz) | Notes                                  |
|------------------------|-----------------|----------------------------------------|
| Monaco editor          | ~250 kB         | Loaded on every lesson page            |
| Framer Motion          | ~30 kB          | Used for animations throughout         |
| sucrase                | ~40 kB          | TypeScript-strip for TS lessons        |
| React + Next.js runtime| ~90 kB          | Unavoidable framework cost             |
| App code               | ~80 kB          | Curriculum, store, components          |
| Pyodide loader (old)   | 0 kB            | Was lazy; confirmed not in first-load  |
| sql.js loader (old)    | 0 kB            | Was lazy; confirmed not in first-load  |

The Pyodide and sql.js *loaders* were already behind lazy function calls so
they did not inflate the first-load JS. However, the function bodies
(`runPython`, `scratchPython`, `runSql`, `scratchSql`, plus CDN constants)
lived in `runner.ts`, which was statically imported by every lesson page
including JS and HTML lessons that never need those runtimes.

## What Section K changed

`runner.ts` was refactored to split the Python and SQL runtime code into
separate modules:

- `src/lib/pythonRunner.ts` — Pyodide loader + `runPython` / `scratchPython`
- `src/lib/sqlRunner.ts` — sql.js loader + `runSql` / `scratchSql`

Both are loaded via `import("./pythonRunner")` / `import("./sqlRunner")` inside
`runLesson` and `runScratch`, triggered only when the language is `"py"` or
`"sql"`. Next.js / webpack treats these as async chunk boundaries and emits them
as separate JS files that are never fetched for JS or HTML lesson pages.

**Effect:**
- JS lesson page: no py/sql code downloaded.
- HTML lesson page: no py/sql code downloaded.
- Python lesson page: `pythonRunner` chunk downloaded on first Run click, then
  the ~8 MB Pyodide WASM is fetched from jsDelivr and cached for the session.
- SQL lesson page: `sqlRunner` chunk downloaded on first Run click, then
  sql-wasm.js + sql-wasm.wasm (~1.1 MB) are fetched from jsDelivr and cached.

## Recommended next code-splits

### 1. Monaco editor (highest impact, ~250 kB gz)

`CodeEditor.tsx` imports `@monaco-editor/react` at the top level. Monaco's
own loader is async, but the `@monaco-editor/react` wrapper and its type stubs
still add weight. Wrap `CodeEditor` with `next/dynamic`:

```tsx
// In LessonView.tsx / HtmlLessonView.tsx
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  { ssr: false, loading: () => <div className="h-[340px] animate-pulse bg-surface-2 rounded" /> },
);
```

This defers the Monaco bundle until the lesson page is interactive, shaving
~250 kB from the initial parse cost. The loading skeleton prevents layout
shift.

### 2. Per-route dynamic imports for heavy lesson components

`LessonView.tsx` statically imports several components that are only shown
conditionally (e.g. `AskBoots`, `TutorPanel`, `CodeReview`, `BlockTray`).
Wrapping the heaviest with `next/dynamic` further reduces the lesson page
first-load parse cost:

```tsx
const AskBoots = dynamic(() => import("./features/tutor/AskBoots").then(m => m.AskBoots), { ssr: false });
const TutorPanel = dynamic(() => import("./TutorPanel").then(m => m.TutorPanel), { ssr: false });
const CodeReview = dynamic(() => import("./quality/CodeReview").then(m => m.CodeReview), { ssr: false });
```

### 3. sucrase (TS lessons only, ~40 kB gz)

`sucrase` is imported at the top of `runner.ts` and therefore bundled on every
lesson page. It is only exercised for `language === "ts"` lessons. Move it
behind a dynamic import in the `ts` branch of `runLesson`:

```ts
if (language === "ts") {
  const { transform } = await import("sucrase");
  // ... rest of TS path
}
```

Remove the static `import { transform } from "sucrase"` at the top of
`runner.ts`. This saves ~40 kB on JS/Python/SQL/HTML lesson pages.

### 4. Route-level splitting for /playground

The Playground page imports `runScratch` (and thus pulls in `runner.ts`)
only for the playground route. Since Next.js already splits on route
boundaries, this is free. However, the CodeEditor on the playground page
would benefit from the same `next/dynamic` wrapping described in #1.

## Measuring impact

Run `ANALYZE=true npm run build` with `@next/bundle-analyzer` to get a
treemap. Add it once to `next.config.mjs`:

```js
import bundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });
export default withBundleAnalyzer({ reactStrictMode: true });
```

Then `npm install --save-dev @next/bundle-analyzer` and run:

```
ANALYZE=true npm run build
```
