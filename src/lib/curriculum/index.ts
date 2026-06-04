import type { Lesson, Module } from "./types";
import { beginner } from "./beginner";
import { kids } from "./kids";
import { html } from "./html";
import { css } from "./css";
import { javascript } from "./javascript";
import { javascriptNext } from "./javascript-next";
import { strings } from "./strings";
import { functional } from "./functional";
import { closures } from "./closures";
import { oop } from "./oop";
import { recursion } from "./recursion";
import { regex } from "./regex";
import { errorHandling } from "./error-handling";
import { json } from "./json";
import { dataFormats } from "./data-formats";
import { collections } from "./collections";
import { asyncJs } from "./async";
import { webApis } from "./web-apis";
import { math } from "./math";
import { typescript } from "./typescript";
import { algorithms } from "./algorithms";
import { dataStructures } from "./data-structures";
import { dynamicProgramming } from "./dynamic-programming";
import { twoPointers } from "./two-pointers";
import { bitManipulation } from "./bit-manipulation";
import { interview } from "./interview";
import { python } from "./python";
import { pythonData } from "./python-data";
import { pythonStrings } from "./python-strings";
import { pythonComprehensions } from "./python-comprehensions";
import { pythonOop } from "./python-oop";
import { pythonAlgorithms } from "./python-algorithms";
import { sql } from "./sql";
import { sqlJoins } from "./sql-joins";
import { sqlAggregations } from "./sql-aggregations";
import { sqlSubqueries } from "./sql-subqueries";
import { gitGithub } from "./git-github";
import { aiLlms } from "./ai-llms";
import { promptEngineering } from "./prompt-engineering";
import { aiApps } from "./ai-apps";
import { aiAgents } from "./ai-agents";
import { aiEmbeddings } from "./ai-embeddings";
import { aiEthics } from "./ai-ethics";
import { digitalSafety } from "./digital-safety";
import { hackerMindset } from "./hacker-mindset";
import { passwordsAuth } from "./passwords-auth";
import { webSecurity } from "./web-security";
import { networkSecurity } from "./network-security";
import { ctfIntro } from "./ctf-intro";
import { kidsLogic } from "./kids-logic";
import { codeQuest2 } from "./code-quest-2";
import { buildYourFirstGame } from "./build-your-first-game";
import { internetForKids } from "./internet-for-kids";
import { aiSafetyKids } from "./ai-safety-kids";
import { digitalCitizenship } from "./digital-citizenship";
import { systemDesign } from "./system-design";
import { portfolioProjects } from "./portfolio-projects";
import { aiSecurity } from "./ai-security";

// The whole curriculum. Add a module here and it shows up everywhere.
// Order defines the Campaign Map progression (sequential unlock) — a difficulty ramp.
export const MODULES: Module[] = [
  // Beginner on-ramps
  beginner,
  kidsLogic,
  kids,
  codeQuest2,
  buildYourFirstGame,
  // Web foundations (HTML/CSS — live preview)
  html,
  css,
  // JavaScript track
  javascript,
  javascriptNext,
  strings,
  functional,
  closures,
  oop,
  recursion,
  regex,
  errorHandling,
  json,
  dataFormats,
  collections,
  asyncJs,
  webApis,
  math,
  // TypeScript
  typescript,
  // CS fundamentals & interview
  algorithms,
  dataStructures,
  dynamicProgramming,
  twoPointers,
  bitManipulation,
  interview,
  systemDesign,
  portfolioProjects,
  // Python track
  python,
  pythonData,
  pythonStrings,
  pythonComprehensions,
  pythonOop,
  pythonAlgorithms,
  // SQL track
  sql,
  sqlJoins,
  sqlAggregations,
  sqlSubqueries,
  // Tooling
  gitGithub,
  // AI track
  aiLlms,
  promptEngineering,
  aiApps,
  aiAgents,
  aiEmbeddings,
  aiEthics,
  aiSecurity,
  // Cybersecurity track
  hackerMindset,
  passwordsAuth,
  webSecurity,
  networkSecurity,
  ctfIntro,
  // Public-good track (free)
  digitalSafety,
  // Kids & teens (free, conceptual)
  internetForKids,
  aiSafetyKids,
  digitalCitizenship,
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
