// The language a lesson is authored and graded in. Drives which runtime executes
// the student's code: `js` → in-browser Web Worker (zero infra), `py` → Pyodide
// (Python compiled to WASM, loaded lazily from CDN), `sql` → sql.js (SQLite in
// WASM). All three run entirely client-side, so there is still no server sandbox.
export type LessonLanguage = "js" | "py" | "sql";

// A test that runs against the student's code in a sandboxed runtime.
//
// - js:  `code` is JS that runs *after* the student's code in the same scope,
//        with `assert`, `assertEquals`, and a captured `console`. Throw to fail.
// - py:  `code` is Python that runs *after* the student's code, with `assert`
//        and an `assert_equals(actual, expected)` helper. Raise to fail.
// - sql: tests are descriptive only; grading compares the student query's result
//        set against the reference `solution` run on the same seeded database.
export type TestCase = {
  name: string;
  code: string;
};

export type Lesson = {
  slug: string;
  title: string;
  // One-line teaser shown in lists.
  blurb: string;
  // XP awarded the first time the lesson is completed.
  xp: number;
  // Markdown lesson body shown to the left of the editor.
  content: string;
  // Code the editor is pre-filled with.
  starterCode: string;
  // Reference solution (used for "show solution" + sanity).
  solution: string;
  tests: TestCase[];
  // Defaults to "js" when omitted (keeps every existing JS lesson valid).
  language?: LessonLanguage;
  // SQL only: schema + seed data executed before the student's query runs.
  setup?: string;
};

export type Module = {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  // Tailwind gradient classes for the module's accent.
  gradient: string;
  // Search-friendly tagline (helps with SEO copy later).
  tagline: string;
  // The course's primary language. Lessons inherit it unless they override
  // `language` themselves. Defaults to "js". Drives the editor + SEO copy.
  language?: LessonLanguage;
  // Extra SEO keywords for this course's pages (e.g. "learn python", "sql joins").
  keywords?: string[];
  lessons: Lesson[];
};
