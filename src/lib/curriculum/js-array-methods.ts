import type { Module } from "./types";

// JavaScript Array Methods Mastery — map, filter, reduce, find, flatMap, and more.
// Auto-graded in-browser via Web Worker.
export const jsArrayMethods: Module = {
  slug: "js-array-methods",
  title: "JavaScript Array Methods",
  description:
    "Master map, filter, reduce, find, flatMap, and sort — the functional toolkit that makes working with collections clean, readable, and interview-ready.",
  emoji: "🗂️",
  gradient: "from-teal-400/20 to-cyan-500/10",
  tagline:
    "Learn JavaScript array methods: map, filter, reduce, find, flatMap, sort, and chaining.",
  keywords: [
    "javascript array methods",
    "javascript map filter reduce",
    "javascript flatmap",
    "javascript array sort",
  ],
  lessons: [
    {
      slug: "map",
      title: "map — Transform Every Element",
      blurb: "Apply a function to each item, get a new array back.",
      xp: 30,
      content: `# map — Transform Every Element

\`Array.prototype.map\` calls a function on **every element** and returns a new
array of the results.  The original array is not mutated.

\`\`\`js
[1, 2, 3].map((n) => n * 2); // [2, 4, 6]
\`\`\`

## Your task
Write a function \`doubleAll(arr)\` that takes an array of numbers and returns a
new array where every element is doubled, using \`map\`.`,
      starterCode: `function doubleAll(arr) {
  // use .map() to double each element
}
`,
      solution: `function doubleAll(arr) {
  return arr.map((n) => n * 2);
}`,
      tests: [
        { name: "doubles each element", code: `assertEquals(JSON.stringify(doubleAll([1,2,3])), JSON.stringify([2,4,6]));` },
        { name: "empty array", code: `assertEquals(JSON.stringify(doubleAll([])), JSON.stringify([]));` },
        { name: "negative numbers", code: `assertEquals(JSON.stringify(doubleAll([-1,0,5])), JSON.stringify([-2,0,10]));` },
      ],
    },
    {
      slug: "filter",
      title: "filter — Keep Only What Matches",
      blurb: "Return only the elements where the predicate is true.",
      xp: 30,
      content: `# filter — Keep Only What Matches

\`filter\` returns a new array containing only the elements for which the callback
returns a truthy value.

\`\`\`js
[1, 2, 3, 4, 5].filter((n) => n % 2 === 0); // [2, 4]
\`\`\`

## Your task
Write \`onlyPositive(arr)\` that returns a new array containing only the elements
that are **greater than 0**.`,
      starterCode: `function onlyPositive(arr) {
  // use .filter() to keep values > 0
}
`,
      solution: `function onlyPositive(arr) {
  return arr.filter((n) => n > 0);
}`,
      tests: [
        { name: "keeps positives", code: `assertEquals(JSON.stringify(onlyPositive([1,-2,3,0,-5])), JSON.stringify([1,3]));` },
        { name: "empty array", code: `assertEquals(JSON.stringify(onlyPositive([])), JSON.stringify([]));` },
        { name: "all positive", code: `assertEquals(JSON.stringify(onlyPositive([1,2,3])), JSON.stringify([1,2,3]));` },
      ],
    },
    {
      slug: "reduce",
      title: "reduce — Fold Into a Single Value",
      blurb: "Accumulate array values into one result.",
      xp: 40,
      content: `# reduce — Fold Into a Single Value

\`reduce\` runs an **accumulator** function over each element, carrying the result
forward.  The second argument is the initial accumulator value.

\`\`\`js
[1, 2, 3, 4].reduce((acc, n) => acc + n, 0); // 10
\`\`\`

## Your task
Write \`sum(arr)\` that returns the sum of all numbers in \`arr\` using \`reduce\`.
An empty array should return \`0\`.`,
      starterCode: `function sum(arr) {
  // use .reduce() to sum all elements
}
`,
      solution: `function sum(arr) {
  return arr.reduce((acc, n) => acc + n, 0);
}`,
      tests: [
        { name: "sum([1,2,3,4]) === 10", code: `assertEquals(sum([1,2,3,4]), 10);` },
        { name: "sum([]) === 0", code: `assertEquals(sum([]), 0);` },
        { name: "sum([-1,1]) === 0", code: `assertEquals(sum([-1,1]), 0);` },
      ],
    },
    {
      slug: "find-findindex",
      title: "find & findIndex",
      blurb: "Locate the first element that satisfies a test.",
      xp: 35,
      content: `# find & findIndex

\`find\` returns the **first element** for which the callback is truthy (or
\`undefined\` if none).  \`findIndex\` returns the **index** (or \`-1\`).

\`\`\`js
[5, 12, 8, 130].find((n) => n > 10);      // 12
[5, 12, 8, 130].findIndex((n) => n > 10); // 1
\`\`\`

## Your task
Write \`firstEven(arr)\` that returns the **first even number** in the array using
\`find\`, or \`undefined\` if there is none.`,
      starterCode: `function firstEven(arr) {
  // use .find() to return the first even number
}
`,
      solution: `function firstEven(arr) {
  return arr.find((n) => n % 2 === 0);
}`,
      tests: [
        { name: "finds first even", code: `assertEquals(firstEven([1,3,4,6]), 4);` },
        { name: "returns undefined if none", code: `assertEquals(firstEven([1,3,5]), undefined);` },
        { name: "first element is even", code: `assertEquals(firstEven([2,4,6]), 2);` },
      ],
    },
    {
      slug: "flatmap",
      title: "flatMap — Map then Flatten",
      blurb: "Expand each element and flatten one level.",
      xp: 45,
      content: `# flatMap — Map then Flatten

\`flatMap\` applies a mapping function and then flattens the result **one level**.
It is equivalent to \`.map(...).flat(1)\` but faster.

\`\`\`js
["hello world", "foo bar"].flatMap((s) => s.split(" "));
// ["hello", "world", "foo", "bar"]
\`\`\`

## Your task
Write \`expandRanges(arr)\` that takes an array of \`[start, end]\` pairs and
returns a flat array containing each integer from \`start\` to \`end\` inclusive.

Example: \`expandRanges([[1,3],[5,6]])\` → \`[1,2,3,5,6]\`.`,
      starterCode: `function expandRanges(arr) {
  // use .flatMap() — each [start,end] pair expands to its integers
}
`,
      solution: `function expandRanges(arr) {
  return arr.flatMap(([start, end]) => {
    const result = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
  });
}`,
      tests: [
        {
          name: "expands two ranges",
          code: `assertEquals(JSON.stringify(expandRanges([[1,3],[5,6]])), JSON.stringify([1,2,3,5,6]));`,
        },
        {
          name: "single-element range",
          code: `assertEquals(JSON.stringify(expandRanges([[4,4]])), JSON.stringify([4]));`,
        },
        {
          name: "empty input",
          code: `assertEquals(JSON.stringify(expandRanges([])), JSON.stringify([]));`,
        },
      ],
    },
    {
      slug: "chaining",
      title: "Chaining Methods",
      blurb: "Compose map, filter, and reduce in a pipeline.",
      xp: 50,
      content: `# Chaining Methods

You can chain array methods to build readable data pipelines — each call returns
a new array, so the next method has fresh input.

\`\`\`js
const result = [1, 2, 3, 4, 5]
  .filter((n) => n % 2 !== 0) // [1, 3, 5]
  .map((n) => n * n)           // [1, 9, 25]
  .reduce((acc, n) => acc + n, 0); // 35
\`\`\`

## Your task
Write \`sumOfSquaredOdds(arr)\` that: filters to odd numbers, squares each one,
then sums the results.  Use a chain of \`filter\`, \`map\`, \`reduce\`.`,
      starterCode: `function sumOfSquaredOdds(arr) {
  // chain .filter → .map → .reduce
}
`,
      solution: `function sumOfSquaredOdds(arr) {
  return arr
    .filter((n) => n % 2 !== 0)
    .map((n) => n * n)
    .reduce((acc, n) => acc + n, 0);
}`,
      tests: [
        {
          name: "sumOfSquaredOdds([1,2,3,4,5]) → 35",
          code: `assertEquals(sumOfSquaredOdds([1,2,3,4,5]), 35);`,
        },
        { name: "no odds → 0", code: `assertEquals(sumOfSquaredOdds([2,4,6]), 0);` },
        { name: "empty → 0", code: `assertEquals(sumOfSquaredOdds([]), 0);` },
      ],
    },
    {
      slug: "sort-custom",
      title: "Sorting with a Comparator",
      blurb: "Control sort order with a comparison function.",
      xp: 40,
      content: `# Sorting with a Comparator

\`Array.prototype.sort\` accepts a **comparator** \`(a, b) => number\`.  Return
negative to put \`a\` first, positive to put \`b\` first, 0 for equal.

\`\`\`js
[3,1,4,1,5].sort((a,b) => a - b); // [1,1,3,4,5] ascending
[3,1,4,1,5].sort((a,b) => b - a); // [5,4,3,1,1] descending
\`\`\`

## Your task
Write \`sortByLength(words)\` that sorts an array of strings by their
**length ascending** (shortest first).  Strings of equal length keep their
relative order (stable sort).`,
      starterCode: `function sortByLength(words) {
  // sort by string length ascending — do NOT mutate the original
}
`,
      solution: `function sortByLength(words) {
  return [...words].sort((a, b) => a.length - b.length);
}`,
      tests: [
        {
          name: "sorts by length",
          code: `assertEquals(JSON.stringify(sortByLength(["banana","kiwi","fig","apple"])), JSON.stringify(["fig","kiwi","apple","banana"]));`,
        },
        {
          name: "empty array",
          code: `assertEquals(JSON.stringify(sortByLength([])), JSON.stringify([]));`,
        },
        {
          name: "does not mutate original",
          code: `const orig = ["zzz","a"]; sortByLength(orig); assertEquals(orig[0], "zzz");`,
        },
      ],
    },
  ],
};
