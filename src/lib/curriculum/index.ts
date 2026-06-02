import type { Lesson, Module } from "./types";
import { beginner } from "./beginner";
import { kids } from "./kids";
import { html } from "./html";
import { css } from "./css";
import { javascript } from "./javascript";
import { javascriptNext } from "./javascript-next";
import { strings } from "./strings";
import { functional } from "./functional";
import { oop } from "./oop";
import { recursion } from "./recursion";
import { regex } from "./regex";
import { errorHandling } from "./error-handling";
import { json } from "./json";
import { math } from "./math";
import { algorithms } from "./algorithms";
import { dataStructures } from "./data-structures";
import { dynamicProgramming } from "./dynamic-programming";
import { interview } from "./interview";
import { python } from "./python";
import { pythonData } from "./python-data";
import { sql } from "./sql";
import { sqlJoins } from "./sql-joins";
import { aiLlms } from "./ai-llms";
import { digitalSafety } from "./digital-safety";

// The whole curriculum. Add a module here and it shows up everywhere.
// Order defines the Campaign Map progression (sequential unlock) — a difficulty ramp.
export const MODULES: Module[] = [
  // Beginner on-ramps
  beginner,
  kids,
  // Web foundations (HTML/CSS — live preview)
  html,
  css,
  // JavaScript track
  javascript,
  javascriptNext,
  strings,
  functional,
  oop,
  recursion,
  regex,
  errorHandling,
  json,
  math,
  algorithms,
  dataStructures,
  dynamicProgramming,
  interview,
  // Python track
  python,
  pythonData,
  // SQL track
  sql,
  sqlJoins,
  // AI track
  aiLlms,
  // Public-good track (free)
  digitalSafety,
];

export function getModule(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string,
): { module: Module; lesson: Lesson; index: number } | undefined {
  const module = getModule(moduleSlug);
  if (!module) return undefined;
  const index = module.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  return { module, lesson: module.lessons[index], index };
}

export function lessonId(moduleSlug: string, lessonSlug: string): string {
  return `${moduleSlug}/${lessonSlug}`;
}

export function totalLessons(): number {
  return MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function totalXpAvailable(): number {
  return MODULES.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.xp, 0),
    0,
  );
}

export type { Lesson, Module } from "./types";
