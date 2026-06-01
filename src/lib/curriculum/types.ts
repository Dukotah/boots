// A test that runs against the student's code in a sandboxed Web Worker.
// `code` is JS that runs *after* the student's code in the same scope. It has
// access to `assertEquals`, `assert`, and a captured `console`. It should throw
// to signal failure.
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
  lessons: Lesson[];
};
