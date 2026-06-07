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
import { react } from "./react";
import { node } from "./node";
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
import { aiForEveryone } from "./ai-for-everyone";
import { aiLlms } from "./ai-llms";
import { promptEngineering } from "./prompt-engineering";
import { aiPowerUser } from "./ai-power-user";
import { aiImageGeneration } from "./ai-image-generation";
import { aiVideoAndVoice } from "./ai-video-and-voice";
import { aiApps } from "./ai-apps";
import { vibeCoding } from "./vibe-coding";
import { aiIntegrations } from "./ai-integrations";
import { aiCustomAssistants } from "./ai-custom-assistants";
import { aiForBusiness } from "./ai-for-business";
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
import { pythonDecorators } from "./python-decorators";
import { pythonGenerators } from "./python-generators";
import { pythonStatistics } from "./python-statistics";
import { sqlWindowFunctions } from "./sql-window-functions";
import { jsArrayMethods } from "./js-array-methods";
import { httpAndRest } from "./http-and-rest";
import { httpCaching } from "./http-caching";
import { debuggingSkills } from "./debugging-skills";
import { decisionTrees } from "./decision-trees";
import { jsGenerators } from "./js-generators";
import { jsProxyReflect } from "./js-proxy-reflect";
import { tsMappedConditionalTypes } from "./ts-mapped-conditional-types";
import { pythonTypeHints } from "./python-type-hints";
import { pythonItertools } from "./python-itertools";
import { pythonDatetime } from "./python-datetime";
import { sqlRecursiveCtes } from "./sql-recursive-ctes";
import { sqlCaseAndPivoting } from "./sql-case-and-pivoting";
import { dbNormalization } from "./db-normalization";
import { dbTransactionsAcid } from "./db-transactions-acid";
import { slidingWindow } from "./sliding-window";
import { greedyAlgorithms } from "./greedy-algorithms";
import { graphsJs } from "./graphs-js";
import { heapsPriorityQueuesJs } from "./heaps-priority-queues-js";
import { fpCompositionPipelines } from "./fp-composition-pipelines";
import { browserStorage } from "./browser-storage";
import { numberSystems } from "./number-systems";
import { bigOComplexity } from "./big-o-complexity";
import { unitTestingFundamentals } from "./unit-testing-fundamentals";
import { tddPractice } from "./tdd-practice";
import { solidPrinciples } from "./solid-principles";
import { behavioralPatterns } from "./behavioral-patterns";
import { tsGenericsAdvanced } from "./ts-generics-advanced";
import { webcryptoApi } from "./webcrypto-api";
import { hashingAndIntegrity } from "./hashing-and-integrity";
import { mlModelEvaluation } from "./ml-model-evaluation";
import { numberTheory } from "./number-theory";
import { aiDataAnalysis } from "./ai-data-analysis";
import { aiForDevelopers } from "./ai-for-developers";
import { aiForJobSearch } from "./ai-for-job-search";
import { aiForMarketing } from "./ai-for-marketing";
import { aiForStudents } from "./ai-for-students";
import { aiForTeachers } from "./ai-for-teachers";
import { aiForWriters } from "./ai-for-writers";
import { aiLocalModels } from "./ai-local-models";
import { aiProductivity } from "./ai-productivity";
import { aiPromptPatterns } from "./ai-prompt-patterns";
import { aiResearchAssistant } from "./ai-research-assistant";
import { aiSafetyAndSecurity } from "./ai-safety-and-security";
import { aiSpreadsheets } from "./ai-spreadsheets";
import { aiStayingCurrent } from "./ai-staying-current";
import { behavioralInterviews } from "./behavioral-interviews";
import { devPortfolio } from "./dev-portfolio";
import { freelanceDeveloper } from "./freelance-developer";
import { markdownMastery } from "./markdown-mastery";
import { terminalBasics } from "./terminal-basics";
import { webAccessibility } from "./web-accessibility";
import { aiBuildAChatbot } from "./ai-build-a-chatbot";
import { aiEmailInbox } from "./ai-email-inbox";
import { aiForHealthcare } from "./ai-for-healthcare";
import { aiForLegal } from "./ai-for-legal";
import { aiForNonprofits } from "./ai-for-nonprofits";
import { aiForParents } from "./ai-for-parents";
import { aiForRealEstate } from "./ai-for-real-estate";
import { aiForSeniors } from "./ai-for-seniors";
import { aiKnowledgeManagement } from "./ai-knowledge-management";
import { aiMeetingNotes } from "./ai-meeting-notes";
import { dataVisualization } from "./data-visualization";
import { noCodeTools } from "./no-code-tools";
import { networkingPersonalBrand } from "./networking-personal-brand";
import { publicSpeakingTech } from "./public-speaking-tech";
import { remoteWorkSkills } from "./remote-work-skills";
import { salaryNegotiation } from "./salary-negotiation";
import { spreadsheetsMastery } from "./spreadsheets-mastery";
import { timeManagementDevs } from "./time-management-devs";

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
  // Frontend frameworks
  react,
  // Backend
  node,
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
  pythonDecorators,
  pythonGenerators,
  pythonStatistics,
  // SQL track
  sql,
  sqlJoins,
  sqlAggregations,
  sqlSubqueries,
  sqlWindowFunctions,
  // Tooling
  gitGithub,
  // Web fundamentals
  httpAndRest,
  httpCaching,
  debuggingSkills,
  // JavaScript array methods
  jsArrayMethods,
  // AI track
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
  decisionTrees,
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
  // Module-discovery batch (2026-06-04)
  jsGenerators,
  jsProxyReflect,
  tsMappedConditionalTypes,
  pythonTypeHints,
  pythonItertools,
  pythonDatetime,
  sqlRecursiveCtes,
  sqlCaseAndPivoting,
  dbNormalization,
  dbTransactionsAcid,
  slidingWindow,
  greedyAlgorithms,
  graphsJs,
  heapsPriorityQueuesJs,
  fpCompositionPipelines,
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

// Pure id helper lives in ./ids (no content imports) so client components can use
// it without bundling the whole curriculum; re-exported here for server/barrel use.
export { lessonId } from "./ids";

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
