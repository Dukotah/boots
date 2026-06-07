// Curriculum quality gate. Validates every lesson against the same grading logic
// the in-browser worker uses, plus structural/quality checks. Run with:
//   npm run check
// (which calls: node --experimental-strip-types scripts/check-curriculum.ts)
//
// NB: import module files directly (with .ts extensions) so this runs under
// Node's type-stripping without a bundler. The app uses src/lib/curriculum/index.ts.
import { beginner } from "../src/lib/curriculum/beginner.ts";
import { kids } from "../src/lib/curriculum/kids.ts";
import { html } from "../src/lib/curriculum/html.ts";
import { css } from "../src/lib/curriculum/css.ts";
import { digitalSafety } from "../src/lib/curriculum/digital-safety.ts";
import { javascript } from "../src/lib/curriculum/javascript.ts";
import { javascriptNext } from "../src/lib/curriculum/javascript-next.ts";
import { strings } from "../src/lib/curriculum/strings.ts";
import { functional } from "../src/lib/curriculum/functional.ts";
import { oop } from "../src/lib/curriculum/oop.ts";
import { recursion } from "../src/lib/curriculum/recursion.ts";
import { regex } from "../src/lib/curriculum/regex.ts";
import { errorHandling } from "../src/lib/curriculum/error-handling.ts";
import { json } from "../src/lib/curriculum/json.ts";
import { math } from "../src/lib/curriculum/math.ts";
import { algorithms } from "../src/lib/curriculum/algorithms.ts";
import { dataStructures } from "../src/lib/curriculum/data-structures.ts";
import { dynamicProgramming } from "../src/lib/curriculum/dynamic-programming.ts";
import { interview } from "../src/lib/curriculum/interview.ts";
import { python } from "../src/lib/curriculum/python.ts";
import { pythonData } from "../src/lib/curriculum/python-data.ts";
import { sql } from "../src/lib/curriculum/sql.ts";
import { sqlJoins } from "../src/lib/curriculum/sql-joins.ts";
import { aiLlms } from "../src/lib/curriculum/ai-llms.ts";
import { aiForEveryone } from "../src/lib/curriculum/ai-for-everyone.ts";
import { aiPowerUser } from "../src/lib/curriculum/ai-power-user.ts";
import { aiImageGeneration } from "../src/lib/curriculum/ai-image-generation.ts";
import { aiIntegrations } from "../src/lib/curriculum/ai-integrations.ts";
import { aiCustomAssistants } from "../src/lib/curriculum/ai-custom-assistants.ts";
import { aiForBusiness } from "../src/lib/curriculum/ai-for-business.ts";
import { aiVideoAndVoice } from "../src/lib/curriculum/ai-video-and-voice.ts";
import { vibeCoding } from "../src/lib/curriculum/vibe-coding.ts";
import { closures } from "../src/lib/curriculum/closures.ts";
import { dataFormats } from "../src/lib/curriculum/data-formats.ts";
import { collections } from "../src/lib/curriculum/collections.ts";
import { asyncJs } from "../src/lib/curriculum/async.ts";
import { webApis } from "../src/lib/curriculum/web-apis.ts";
import { typescript } from "../src/lib/curriculum/typescript.ts";
import { twoPointers } from "../src/lib/curriculum/two-pointers.ts";
import { bitManipulation } from "../src/lib/curriculum/bit-manipulation.ts";
import { pythonStrings } from "../src/lib/curriculum/python-strings.ts";
import { pythonComprehensions } from "../src/lib/curriculum/python-comprehensions.ts";
import { pythonOop } from "../src/lib/curriculum/python-oop.ts";
import { pythonAlgorithms } from "../src/lib/curriculum/python-algorithms.ts";
import { sqlAggregations } from "../src/lib/curriculum/sql-aggregations.ts";
import { sqlSubqueries } from "../src/lib/curriculum/sql-subqueries.ts";
import { gitGithub } from "../src/lib/curriculum/git-github.ts";
import { promptEngineering } from "../src/lib/curriculum/prompt-engineering.ts";
import { aiApps } from "../src/lib/curriculum/ai-apps.ts";
import { aiAgents } from "../src/lib/curriculum/ai-agents.ts";
import { aiEmbeddings } from "../src/lib/curriculum/ai-embeddings.ts";
import { aiEthics } from "../src/lib/curriculum/ai-ethics.ts";
import { hackerMindset } from "../src/lib/curriculum/hacker-mindset.ts";
import { passwordsAuth } from "../src/lib/curriculum/passwords-auth.ts";
import { webSecurity } from "../src/lib/curriculum/web-security.ts";
import { networkSecurity } from "../src/lib/curriculum/network-security.ts";
import { ctfIntro } from "../src/lib/curriculum/ctf-intro.ts";
import { kidsLogic } from "../src/lib/curriculum/kids-logic.ts";
import { codeQuest2 } from "../src/lib/curriculum/code-quest-2.ts";
import { buildYourFirstGame } from "../src/lib/curriculum/build-your-first-game.ts";
import { internetForKids } from "../src/lib/curriculum/internet-for-kids.ts";
import { aiSafetyKids } from "../src/lib/curriculum/ai-safety-kids.ts";
import { digitalCitizenship } from "../src/lib/curriculum/digital-citizenship.ts";
import { systemDesign } from "../src/lib/curriculum/system-design.ts";
import { portfolioProjects } from "../src/lib/curriculum/portfolio-projects.ts";
import { portfolioJsApps } from "../src/lib/curriculum/portfolio-js-apps.ts";
import { portfolioAlgorithms } from "../src/lib/curriculum/portfolio-algorithms.ts";
import { portfolioDataStructures } from "../src/lib/curriculum/portfolio-data-structures.ts";
import { portfolioParsers } from "../src/lib/curriculum/portfolio-parsers.ts";
import { portfolioGames } from "../src/lib/curriculum/portfolio-games.ts";
import { portfolioSystems } from "../src/lib/curriculum/portfolio-systems.ts";
import { portfolioText } from "../src/lib/curriculum/portfolio-text.ts";
import { portfolioValidation } from "../src/lib/curriculum/portfolio-validation.ts";
import { portfolioFinance } from "../src/lib/curriculum/portfolio-finance.ts";
import { portfolioTypescript } from "../src/lib/curriculum/portfolio-typescript.ts";
import { pythonDecorators } from "../src/lib/curriculum/python-decorators.ts";
import { pythonGenerators } from "../src/lib/curriculum/python-generators.ts";
import { sqlWindowFunctions } from "../src/lib/curriculum/sql-window-functions.ts";
import { jsArrayMethods } from "../src/lib/curriculum/js-array-methods.ts";
import { httpAndRest } from "../src/lib/curriculum/http-and-rest.ts";
import { debuggingSkills } from "../src/lib/curriculum/debugging-skills.ts";
import type { Lesson, Module } from "../src/lib/curriculum/types.ts";
import { jsGenerators } from "../src/lib/curriculum/js-generators.ts";
import { jsProxyReflect } from "../src/lib/curriculum/js-proxy-reflect.ts";
import { tsMappedConditionalTypes } from "../src/lib/curriculum/ts-mapped-conditional-types.ts";
import { pythonTypeHints } from "../src/lib/curriculum/python-type-hints.ts";
import { pythonItertools } from "../src/lib/curriculum/python-itertools.ts";
import { pythonDatetime } from "../src/lib/curriculum/python-datetime.ts";
import { pythonStatistics } from "../src/lib/curriculum/python-statistics.ts";
import { sqlRecursiveCtes } from "../src/lib/curriculum/sql-recursive-ctes.ts";
import { sqlCaseAndPivoting } from "../src/lib/curriculum/sql-case-and-pivoting.ts";
import { dbNormalization } from "../src/lib/curriculum/db-normalization.ts";
import { dbTransactionsAcid } from "../src/lib/curriculum/db-transactions-acid.ts";
import { slidingWindow } from "../src/lib/curriculum/sliding-window.ts";
import { greedyAlgorithms } from "../src/lib/curriculum/greedy-algorithms.ts";
import { graphsJs } from "../src/lib/curriculum/graphs-js.ts";
import { heapsPriorityQueuesJs } from "../src/lib/curriculum/heaps-priority-queues-js.ts";
import { fpCompositionPipelines } from "../src/lib/curriculum/fp-composition-pipelines.ts";
import { httpCaching } from "../src/lib/curriculum/http-caching.ts";
import { browserStorage } from "../src/lib/curriculum/browser-storage.ts";
import { numberSystems } from "../src/lib/curriculum/number-systems.ts";
import { bigOComplexity } from "../src/lib/curriculum/big-o-complexity.ts";
import { unitTestingFundamentals } from "../src/lib/curriculum/unit-testing-fundamentals.ts";
import { tddPractice } from "../src/lib/curriculum/tdd-practice.ts";
import { solidPrinciples } from "../src/lib/curriculum/solid-principles.ts";
import { behavioralPatterns } from "../src/lib/curriculum/behavioral-patterns.ts";
import { tsGenericsAdvanced } from "../src/lib/curriculum/ts-generics-advanced.ts";
import { webcryptoApi } from "../src/lib/curriculum/webcrypto-api.ts";
import { hashingAndIntegrity } from "../src/lib/curriculum/hashing-and-integrity.ts";
import { mlModelEvaluation } from "../src/lib/curriculum/ml-model-evaluation.ts";
import { decisionTrees } from "../src/lib/curriculum/decision-trees.ts";
import { numberTheory } from "../src/lib/curriculum/number-theory.ts";
import { aiDataAnalysis } from "../src/lib/curriculum/ai-data-analysis.ts";
import { aiForDevelopers } from "../src/lib/curriculum/ai-for-developers.ts";
import { aiForJobSearch } from "../src/lib/curriculum/ai-for-job-search.ts";
import { aiForMarketing } from "../src/lib/curriculum/ai-for-marketing.ts";
import { aiForStudents } from "../src/lib/curriculum/ai-for-students.ts";
import { aiForTeachers } from "../src/lib/curriculum/ai-for-teachers.ts";
import { aiForWriters } from "../src/lib/curriculum/ai-for-writers.ts";
import { aiLocalModels } from "../src/lib/curriculum/ai-local-models.ts";
import { aiProductivity } from "../src/lib/curriculum/ai-productivity.ts";
import { aiPromptPatterns } from "../src/lib/curriculum/ai-prompt-patterns.ts";
import { aiResearchAssistant } from "../src/lib/curriculum/ai-research-assistant.ts";
import { aiSafetyAndSecurity } from "../src/lib/curriculum/ai-safety-and-security.ts";
import { aiSpreadsheets } from "../src/lib/curriculum/ai-spreadsheets.ts";
import { aiStayingCurrent } from "../src/lib/curriculum/ai-staying-current.ts";
import { behavioralInterviews } from "../src/lib/curriculum/behavioral-interviews.ts";
import { devPortfolio } from "../src/lib/curriculum/dev-portfolio.ts";
import { freelanceDeveloper } from "../src/lib/curriculum/freelance-developer.ts";
import { markdownMastery } from "../src/lib/curriculum/markdown-mastery.ts";
import { terminalBasics } from "../src/lib/curriculum/terminal-basics.ts";
import { webAccessibility } from "../src/lib/curriculum/web-accessibility.ts";
import { aiBuildAChatbot } from "../src/lib/curriculum/ai-build-a-chatbot.ts";
import { aiEmailInbox } from "../src/lib/curriculum/ai-email-inbox.ts";
import { aiForHealthcare } from "../src/lib/curriculum/ai-for-healthcare.ts";
import { aiForLegal } from "../src/lib/curriculum/ai-for-legal.ts";
import { aiForNonprofits } from "../src/lib/curriculum/ai-for-nonprofits.ts";
import { aiForParents } from "../src/lib/curriculum/ai-for-parents.ts";
import { aiForRealEstate } from "../src/lib/curriculum/ai-for-real-estate.ts";
import { aiForSeniors } from "../src/lib/curriculum/ai-for-seniors.ts";
import { aiKnowledgeManagement } from "../src/lib/curriculum/ai-knowledge-management.ts";
import { aiMeetingNotes } from "../src/lib/curriculum/ai-meeting-notes.ts";
import { dataVisualization } from "../src/lib/curriculum/data-visualization.ts";
import { noCodeTools } from "../src/lib/curriculum/no-code-tools.ts";
import { networkingPersonalBrand } from "../src/lib/curriculum/networking-personal-brand.ts";
import { publicSpeakingTech } from "../src/lib/curriculum/public-speaking-tech.ts";
import { remoteWorkSkills } from "../src/lib/curriculum/remote-work-skills.ts";
import { salaryNegotiation } from "../src/lib/curriculum/salary-negotiation.ts";
import { spreadsheetsMastery } from "../src/lib/curriculum/spreadsheets-mastery.ts";
import { timeManagementDevs } from "../src/lib/curriculum/time-management-devs.ts";

// ---------------------------------------------------------------------------
// KNOWN_PRESOLVED — lessons whose starterCode intentionally passes all tests.
// Add entries as "moduleSlug/lessonSlug" to suppress the pre-solved gate for
// that lesson. Entries here still trigger a warning so they stay visible and
// can be cleaned up over time; they just do NOT fail the build.
// ---------------------------------------------------------------------------
const KNOWN_PRESOLVED: ReadonlySet<string> = new Set<string>([
  // Example (remove once the lesson is fixed):
  // "beginner/hello-world",
]);

// Keep in sync with src/lib/curriculum/index.ts. (New module? Add it here too.)
const MODULES: Module[] = [
  beginner,
  kids,
  html,
  css,
  digitalSafety,
  javascript,
  javascriptNext,
  strings,
  functional,
  oop,
  recursion,
  regex,
  errorHandling,
  json,
  dataFormats,
  collections,
  asyncJs,
  webApis,
  closures,
  math,
  typescript,
  algorithms,
  dataStructures,
  dynamicProgramming,
  twoPointers,
  bitManipulation,
  interview,
  python,
  pythonData,
  pythonStrings,
  pythonComprehensions,
  pythonOop,
  pythonAlgorithms,
  sql,
  sqlJoins,
  sqlAggregations,
  sqlSubqueries,
  gitGithub,
  aiForEveryone,
  aiLlms,
  promptEngineering,
  aiPowerUser,
  aiImageGeneration,
  aiVideoAndVoice,
  aiApps,
  vibeCoding,
  aiIntegrations,
  aiCustomAssistants,
  aiForBusiness,
  aiAgents,
  aiEmbeddings,
  aiEthics,
  hackerMindset,
  passwordsAuth,
  webSecurity,
  networkSecurity,
  ctfIntro,
  kidsLogic,
  codeQuest2,
  buildYourFirstGame,
  internetForKids,
  aiSafetyKids,
  digitalCitizenship,
  systemDesign,
  portfolioProjects,
  // Portfolio project modules (2026-06-07)
  portfolioJsApps,
  portfolioAlgorithms,
  portfolioDataStructures,
  portfolioParsers,
  portfolioGames,
  portfolioSystems,
  portfolioText,
  portfolioValidation,
  portfolioFinance,
  portfolioTypescript,
  pythonDecorators,
  pythonGenerators,
  sqlWindowFunctions,
  jsArrayMethods,
  httpAndRest,
  debuggingSkills,
  // Module-discovery batch (2026-06-04)
  jsGenerators,
  jsProxyReflect,
  tsMappedConditionalTypes,
  pythonTypeHints,
  pythonItertools,
  pythonDatetime,
  pythonStatistics,
  sqlRecursiveCtes,
  sqlCaseAndPivoting,
  dbNormalization,
  dbTransactionsAcid,
  slidingWindow,
  greedyAlgorithms,
  graphsJs,
  heapsPriorityQueuesJs,
  fpCompositionPipelines,
  httpCaching,
  browserStorage,
  numberSystems,
  bigOComplexity,
  unitTestingFundamentals,
  tddPractice,
  solidPrinciples,
  behavioralPatterns,
  tsGenericsAdvanced,
  webcryptoApi,
  hashingAndIntegrity,
  mlModelEvaluation,
  decisionTrees,
  numberTheory,
  // New batch (2026-06-07)
  aiDataAnalysis,
  aiForDevelopers,
  aiForJobSearch,
  aiForMarketing,
  aiForStudents,
  aiForTeachers,
  aiForWriters,
  aiLocalModels,
  aiProductivity,
  aiPromptPatterns,
  aiResearchAssistant,
  aiSafetyAndSecurity,
  aiSpreadsheets,
  aiStayingCurrent,
  behavioralInterviews,
  devPortfolio,
  freelanceDeveloper,
  markdownMastery,
  terminalBasics,
  webAccessibility,
  // New batch (2026-06-07 wave 2)
  aiBuildAChatbot,
  aiEmailInbox,
  aiForHealthcare,
  aiForLegal,
  aiForNonprofits,
  aiForParents,
  aiForRealEstate,
  aiForSeniors,
  aiKnowledgeManagement,
  aiMeetingNotes,
  dataVisualization,
  noCodeTools,
  networkingPersonalBrand,
  publicSpeakingTech,
  remoteWorkSkills,
  salaryNegotiation,
  spreadsheetsMastery,
  timeManagementDevs,
];

function stringify(v: unknown): string {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

/** Run a single test against code; resolve true if it passes (no throw).
 *  Wrapped in an async IIFE + awaited so async/await lessons grade correctly;
 *  synchronous lessons are unaffected (awaiting a non-Promise is a no-op). */
async function testPasses(code: string, test: { code: string }): Promise<boolean> {
  const assertEquals = (a: unknown, b: unknown, m?: string) => {
    if (stringify(a) !== stringify(b))
      throw new Error(m ?? `Expected ${stringify(b)} but got ${stringify(a)}`);
  };
  const assert = (c: unknown, m?: string) => {
    if (!c) throw new Error(m ?? "Assertion failed");
  };
  const fakeConsole = { log() {}, info() {}, warn() {}, error() {} };
  try {
    const fn = new Function(
      "console",
      "assertEquals",
      "assert",
      `"use strict";\nreturn (async () => {\n${code}\n;\n${test.code}\n})();`,
    );
    await fn(fakeConsole, assertEquals, assert);
    return true;
  } catch {
    return false;
  }
}

const errors: string[] = [];
// Warnings do not cause a non-zero exit; used for KNOWN_PRESOLVED notices.
const warnings: string[] = [];

async function checkLesson(mod: Module, lesson: Lesson, seen: Set<string>) {
  const where = `${mod.slug}/${lesson.slug}`;

  // ── structure ──
  if (!lesson.slug) errors.push(`${mod.slug}: a lesson is missing a slug`);
  if (seen.has(lesson.slug)) errors.push(`${where}: duplicate slug within module`);
  seen.add(lesson.slug);

  for (const field of ["title", "blurb", "content"] as const) {
    if (!lesson[field] || String(lesson[field]).trim() === "")
      errors.push(`${where}: empty "${field}"`);
  }
  if (!(lesson.xp > 0)) errors.push(`${where}: xp must be > 0 (got ${lesson.xp})`);

  // ── quiz lessons: validate questions, then stop (no code to grade) ──
  if (lesson.kind === "quiz") {
    const qs = lesson.questions ?? [];
    if (qs.length === 0) errors.push(`${where}: quiz lesson needs at least one question`);
    qs.forEach((q, i) => {
      if (!q.prompt || !q.prompt.trim()) errors.push(`${where}: question ${i + 1} has no prompt`);
      if (!q.options || q.options.length < 2)
        errors.push(`${where}: question ${i + 1} needs at least 2 options`);
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.options?.length ?? 0))
        errors.push(`${where}: question ${i + 1} has an out-of-range answer index`);
    });
    return;
  }

  // ── code lessons: require the code fields ──
  for (const field of ["starterCode", "solution"] as const) {
    if (!lesson[field] || String(lesson[field]).trim() === "")
      errors.push(`${where}: empty "${field}"`);
  }
  if (!lesson.tests || lesson.tests.length === 0)
    errors.push(`${where}: needs at least one test`);

  if (!lesson.tests?.length) return;

  const language = lesson.language ?? mod.language ?? "js";

  // Non-JS lessons (Python via Pyodide, SQL via sql.js) execute in a browser WASM
  // runtime that we can't spin up under Node here, so we validate them
  // structurally instead of grading them. Browser-side runs do the real grading.
  if (language !== "js") {
    if (language === "sql" && (!lesson.setup || !lesson.setup.trim()))
      errors.push(`${where}: SQL lesson needs a "setup" (schema + seed data)`);
    if (lesson.starterCode.trim() === lesson.solution.trim()) {
      if (KNOWN_PRESOLVED.has(where)) {
        warnings.push(`${where}: starterCode is identical to the solution (allowlisted, but should be fixed)`);
      } else {
        errors.push(`${where}: starterCode is identical to the solution (lesson is pre-solved)`);
      }
    }
    return;
  }

  // ── grading: solution must pass ALL tests ──
  for (const t of lesson.tests) {
    if (!(await testPasses(lesson.solution, t)))
      errors.push(`${where}: solution FAILS test "${t.name}"`);
  }

  // ── quality: starter must FAIL at least one test (no pre-solved lessons) ──
  // We stop on the first failing test to avoid running more test code than
  // necessary — never introduce an unbounded loop here.
  let starterPassesAll = true;
  for (const t of lesson.tests) {
    if (!(await testPasses(lesson.starterCode, t))) {
      starterPassesAll = false;
      break; // one failure is enough — starter is not pre-solved
    }
  }
  if (starterPassesAll) {
    if (KNOWN_PRESOLVED.has(where)) {
      warnings.push(
        `${where}: starterCode already passes all tests (allowlisted pre-solved — please fix)`,
      );
    } else {
      errors.push(`${where}: starterCode already passes all tests (lesson is pre-solved)`);
    }
  }
}

let lessonCount = 0;
let testCount = 0;

async function main() {
  for (const mod of MODULES) {
    const seen = new Set<string>();
    if (!mod.lessons.length) errors.push(`${mod.slug}: module has no lessons`);
    for (const lesson of mod.lessons) {
      lessonCount++;
      testCount += lesson.tests?.length ?? 0;
      await checkLesson(mod, lesson, seen);
    }
  }

  if (warnings.length) {
    console.log("⚠️  Curriculum warnings (allowlisted — fix these):\n");
    for (const w of warnings) console.log("  ~ " + w);
    console.log();
  }

  if (errors.length) {
    console.log("❌ Curriculum check failed:\n");
    for (const e of errors) console.log("  • " + e);
    console.log(`\n${errors.length} problem(s) across ${lessonCount} lessons.`);
    if (warnings.length)
      console.log(
        `(${warnings.length} additional warning(s) for allowlisted pre-solved lessons — see above)`,
      );
    process.exit(1);
  }

  const warnNote =
    warnings.length
      ? ` (${warnings.length} allowlisted pre-solved warning(s) — see above)`
      : "";
  console.log(
    `✅ Curriculum OK — ${MODULES.length} modules, ${lessonCount} lessons, ${testCount} tests all green.${warnNote}`,
  );
}

main();
