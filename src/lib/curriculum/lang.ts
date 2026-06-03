// Per-language presentation + runtime metadata. One source of truth so the
// editor, lesson header, runner, and SEO copy all agree on what a language is.
import type { LessonLanguage, Lesson, Module } from "./types";

export type LangMeta = {
  /** Human label shown in the UI ("JavaScript"). */
  label: string;
  /** Monaco editor language id. */
  monaco: string;
  /** Filename shown above the editor ("solution.js"). */
  filename: string;
  /** Where the code runs, shown as a small badge near the editor. */
  runtime: string;
  /** Line-comment delimiters, used to drop hints into the editor as comments. */
  comment: { open: string; close?: string };
};

export const LANGUAGES: Record<LessonLanguage, LangMeta> = {
  js: {
    label: "JavaScript",
    monaco: "javascript",
    filename: "solution.js",
    runtime: "Runs in your browser",
    comment: { open: "//" },
  },
  ts: {
    label: "TypeScript",
    monaco: "typescript",
    filename: "solution.ts",
    runtime: "Transpiled & run in your browser",
    comment: { open: "//" },
  },
  py: {
    label: "Python",
    monaco: "python",
    filename: "solution.py",
    runtime: "Runs in your browser (Pyodide)",
    comment: { open: "#" },
  },
  sql: {
    label: "SQL",
    monaco: "sql",
    filename: "query.sql",
    runtime: "Runs in your browser (SQLite/WASM)",
    comment: { open: "--" },
  },
  html: {
    label: "HTML & CSS",
    monaco: "html",
    filename: "index.html",
    runtime: "Live preview in your browser",
    comment: { open: "<!--", close: " -->" },
  },
};

/** The effective language of a lesson: its own override, else its module's, else js. */
export function lessonLanguage(lesson: Lesson, module?: Module): LessonLanguage {
  return lesson.language ?? module?.language ?? "js";
}

export function langMeta(lang: LessonLanguage): LangMeta {
  return LANGUAGES[lang];
}
