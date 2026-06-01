import type { Lesson, Module } from "./types";
import { javascript } from "./javascript";
import { javascriptNext } from "./javascript-next";
import { functional } from "./functional";
import { algorithms } from "./algorithms";
import { dataStructures } from "./data-structures";
import { aiLlms } from "./ai-llms";

// The whole curriculum. Add a module here and it shows up everywhere.
// Order defines the Campaign Map progression (sequential unlock) — a difficulty ramp.
export const MODULES: Module[] = [
  javascript,
  javascriptNext,
  functional,
  algorithms,
  dataStructures,
  aiLlms,
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
