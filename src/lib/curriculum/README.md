# Authoring lessons

Lessons are **data**, not code paths — add one and it appears everywhere (the
Campaign Map, course pages, dashboard, XP totals) automatically. This is the
content flywheel: every lesson is a permanent, indexable SEO asset.

## Add a lesson in ~60 seconds

1. **Scaffold** a lesson block:

   ```bash
   npm run new:lesson -- closures "Closures"
   ```

2. **Paste** the printed block into the target module's `lessons` array
   (e.g. `javascript.ts`), in the order you want it to appear.

3. **Fill the TODOs:**
   - `blurb` — one-line teaser
   - `content` — Markdown explanation + a `## Your task` section
   - `starterCode` — what the student begins with (must **not** already pass)
   - `solution` — reference answer (must pass **every** test)
   - `tests` — assertions (see grading contract below)
   - `xp` — reward (harder lesson → more XP)

4. **Validate:**

   ```bash
   npm run check
   ```

## The grading contract

Tests run **after** the student's code in the same scope (sandboxed Web Worker),
with two globals available:

- `assert(condition, message?)` — throws `message` if falsy.
- `assertEquals(actual, expected, message?)` — compares by JSON value, so arrays
  and objects compare structurally.

```js
{ name: "add(2, 3) === 5", code: `assertEquals(add(2, 3), 5);` }
```

Keep exercises **pure** (no DOM, no network) so they grade instantly in-browser.

## What `npm run check` enforces

- Every `solution` passes all of its own tests.
- No lesson is **pre-solved** (the `starterCode` must fail at least one test).
- Unique slugs within a module, required fields present, `xp > 0`, ≥1 test.

CI / pre-push should run `npm run check` so broken content can never ship.

## Adding a whole new module (course)

1. Create `src/lib/curriculum/<name>.ts` exporting a `Module`.
2. Register it in `src/lib/curriculum/index.ts` (`MODULES` array).
3. Register it in `scripts/check-curriculum.ts` (`MODULES` array) too.

> Note: non-JS languages (Python, Go, Rust) need a runtime — Pyodide/WASM or a
> Judge0 server sandbox — before their lessons can auto-grade. JS/TS-flavored
> courses run on the existing in-browser worker with zero infra.
