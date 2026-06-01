// Shared module list for Node-run scripts (curriculum check, SQL seed). Imports
// the module files directly with .ts extensions so it runs under Node's type
// stripping without a bundler. Keep this list in sync with
// src/lib/curriculum/index.ts (the app's bundler-resolved registry).
import type { Module } from "../src/lib/curriculum/types.ts";
import { javascript } from "../src/lib/curriculum/javascript.ts";
import { javascriptNext } from "../src/lib/curriculum/javascript-next.ts";
import { typescript } from "../src/lib/curriculum/typescript.ts";
import { asyncJs } from "../src/lib/curriculum/async.ts";
import { webApis } from "../src/lib/curriculum/web-apis.ts";
import { strings } from "../src/lib/curriculum/strings.ts";
import { functional } from "../src/lib/curriculum/functional.ts";
import { closures } from "../src/lib/curriculum/closures.ts";
import { oop } from "../src/lib/curriculum/oop.ts";
import { collections } from "../src/lib/curriculum/collections.ts";
import { recursion } from "../src/lib/curriculum/recursion.ts";
import { regex } from "../src/lib/curriculum/regex.ts";
import { errorHandling } from "../src/lib/curriculum/error-handling.ts";
import { json } from "../src/lib/curriculum/json.ts";
import { dataFormats } from "../src/lib/curriculum/data-formats.ts";
import { gitGithub } from "../src/lib/curriculum/git-github.ts";
import { math } from "../src/lib/curriculum/math.ts";
import { algorithms } from "../src/lib/curriculum/algorithms.ts";
import { dataStructures } from "../src/lib/curriculum/data-structures.ts";
import { bitManipulation } from "../src/lib/curriculum/bit-manipulation.ts";
import { twoPointers } from "../src/lib/curriculum/two-pointers.ts";
import { dynamicProgramming } from "../src/lib/curriculum/dynamic-programming.ts";
import { interview } from "../src/lib/curriculum/interview.ts";
import { python } from "../src/lib/curriculum/python.ts";
import { pythonStrings } from "../src/lib/curriculum/python-strings.ts";
import { pythonComprehensions } from "../src/lib/curriculum/python-comprehensions.ts";
import { pythonOop } from "../src/lib/curriculum/python-oop.ts";
import { pythonAlgorithms } from "../src/lib/curriculum/python-algorithms.ts";
import { pythonData } from "../src/lib/curriculum/python-data.ts";
import { sql } from "../src/lib/curriculum/sql.ts";
import { sqlJoins } from "../src/lib/curriculum/sql-joins.ts";
import { sqlAggregations } from "../src/lib/curriculum/sql-aggregations.ts";
import { sqlSubqueries } from "../src/lib/curriculum/sql-subqueries.ts";
import { aiLlms } from "../src/lib/curriculum/ai-llms.ts";

export const MODULES: Module[] = [
  javascript,
  javascriptNext,
  typescript,
  asyncJs,
  webApis,
  strings,
  functional,
  closures,
  oop,
  collections,
  recursion,
  regex,
  errorHandling,
  json,
  dataFormats,
  gitGithub,
  math,
  algorithms,
  dataStructures,
  bitManipulation,
  twoPointers,
  dynamicProgramming,
  interview,
  python,
  pythonStrings,
  pythonComprehensions,
  pythonOop,
  pythonAlgorithms,
  pythonData,
  sql,
  sqlJoins,
  sqlAggregations,
  sqlSubqueries,
  aiLlms,
];
