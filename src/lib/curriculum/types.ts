// The language a lesson is authored and graded in. Drives which runtime executes
// the student's code: `js` → in-browser Web Worker (zero infra), `py` → Pyodide
// (Python compiled to WASM, loaded lazily from CDN), `sql` → sql.js (SQLite in
// WASM). All three run entirely client-side, so there is still no server sandbox.
export type LessonLanguage = "js" | "ts" | "py" | "sql" | "html";

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

// A multiple-choice / "spot the scam" question for quiz lessons.
export type QuizQuestion = {
  // The question or scenario (Markdown allowed).
  prompt: string;
  // Answer choices.
  options: string[];
  // Index into `options` of the correct answer.
  answer: number;
  // Shown after the learner answers — why it's right/wrong.
  explanation?: string;
};

export type Lesson = {
  slug: string;
  title: string;
  // One-line teaser shown in lists.
  blurb: string;
  // XP awarded the first time the lesson is completed.
  xp: number;
  // Markdown lesson body (the reading shown left of the editor, or above a quiz).
  content: string;
  // "code" (default) → editor + auto-graded tests. "quiz" → reading + questions.
  kind?: "code" | "quiz";

  // ── code lessons (kind !== "quiz") ──
  // Code the editor is pre-filled with.
  starterCode?: string;
  // Reference solution (used for "show solution" + sanity).
  solution?: string;
  tests?: TestCase[];
  // Defaults to "js" when omitted (keeps every existing JS lesson valid).
  language?: LessonLanguage;
  // SQL only: schema + seed data executed before the student's query runs.
  setup?: string;

  // ── quiz lessons (kind === "quiz") ──
  questions?: QuizQuestion[];

  // Optional "code blocks" — bite-sized snippets shown beside the lesson that a
  // beginner can drag (or tap) into the editor to assemble the answer, instead of
  // typing from a blank page. Inserting them left-to-right builds the solution
  // line. Purely an assist: never required, and they don't affect grading.
  blocks?: string[];
  // Optional progressive hints, revealed one at a time (free, no AI needed).
  hints?: string[];
  // Optional partial code states paired with hints — each entry is the editor
  // code after that hint is applied (like a partial solution). When present for
  // hint[i], clicking Hint sets the editor to hintCode[i] instead of inserting
  // a comment. Entries can be omitted (undefined) to fall back to comment mode.
  hintCode?: (string | undefined)[];
  // Optional Markdown shown after all tests pass — why the solution works.
  explanation?: string;
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
  // When true, every lesson is fully interactive for free (no paywall). Used for
  // public-good / lead-magnet courses like Digital Safety.
  free?: boolean;
  lessons: Lesson[];
};
