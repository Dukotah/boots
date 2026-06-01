import type { Module } from "./types";

// Sets & Maps — the ES6 collections that make dedupe, lookups, and grouping fast
// and clean. Auto-graded in-browser.
export const collections: Module = {
  slug: "collections",
  title: "Sets & Maps",
  description:
    "ES6 Sets and Maps give you fast lookups, easy deduplication, and clean grouping — the tools behind countless interview answers and real-world data wrangling.",
  emoji: "🗂️",
  gradient: "from-teal-400/20 to-emerald-500/10",
  tagline:
    "Learn JavaScript Sets and Maps: deduplicate arrays, detect duplicates, intersections, frequency counts, and grouping.",
  keywords: ["javascript set", "javascript map", "deduplicate array", "frequency count"],
  lessons: [
    {
      slug: "unique",
      title: "Deduplicate with a Set",
      blurb: "A Set holds only unique values.",
      xp: 30,
      content: `# Deduplicate with a Set

A **Set** stores only unique values. Spreading it back into an array is the
cleanest way to remove duplicates.

\`\`\`js
[...new Set([1, 1, 2])]; // [1, 2]
\`\`\`

## Your task
Write \`unique(arr)\` that returns a new array with duplicates removed, preserving
first-seen order.`,
      starterCode: `function unique(arr) {
  // return arr with duplicates removed
}
`,
      solution: `function unique(arr) {
  return [...new Set(arr)];
}`,
      tests: [
        { name: "removes duplicates", code: `assertEquals(unique([1, 1, 2, 3, 3, 3]), [1, 2, 3]);` },
        { name: "empty array", code: `assertEquals(unique([]), []);` },
        { name: "strings too", code: `assertEquals(unique(["a", "b", "a"]), ["a", "b"]);` },
      ],
    },
    {
      slug: "has-duplicates",
      title: "Spot a Duplicate",
      blurb: "Compare Set size to length.",
      xp: 30,
      content: `# Spot a Duplicate

If turning an array into a Set shrinks it, there was a duplicate.

## Your task
Write \`hasDuplicates(arr)\` that returns \`true\` if any value appears more than
once, else \`false\`.`,
      starterCode: `function hasDuplicates(arr) {
  // return true if arr contains any duplicate
}
`,
      solution: `function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}`,
      tests: [
        { name: "no duplicates → false", code: `assertEquals(hasDuplicates([1, 2, 3]), false);` },
        { name: "has duplicates → true", code: `assertEquals(hasDuplicates([1, 2, 2]), true);` },
        { name: "empty → false", code: `assertEquals(hasDuplicates([]), false);` },
      ],
    },
    {
      slug: "intersection",
      title: "Set Intersection",
      blurb: "Values present in both arrays.",
      xp: 35,
      content: `# Set Intersection

Put one array in a Set, then keep the items of the other that the Set contains.

## Your task
Write \`intersection(a, b)\` that returns the values from \`a\` that also appear in
\`b\`, in \`a\`'s order.`,
      starterCode: `function intersection(a, b) {
  // return values from a that also appear in b
}
`,
      solution: `function intersection(a, b) {
  const inB = new Set(b);
  return a.filter((x) => inB.has(x));
}`,
      tests: [
        { name: "common values", code: `assertEquals(intersection([1, 2, 3, 4], [2, 4, 6]), [2, 4]);` },
        { name: "no overlap → []", code: `assertEquals(intersection([1, 2], [3, 4]), []);` },
      ],
    },
    {
      slug: "frequency",
      title: "Frequency Count with a Map",
      blurb: "Tally how often each value appears.",
      xp: 35,
      content: `# Frequency Count with a Map

A **Map** is a key/value store. Counting occurrences is the classic use:
\`map.set(key, (map.get(key) || 0) + 1)\`.

## Your task
Write \`frequency(arr)\` that counts how many times each value appears and returns
the result as a plain object. (Tip: \`Object.fromEntries(map)\`.)`,
      starterCode: `function frequency(arr) {
  // return an object of value -> count
}
`,
      solution: `function frequency(arr) {
  const map = new Map();
  for (const x of arr) {
    map.set(x, (map.get(x) || 0) + 1);
  }
  return Object.fromEntries(map);
}`,
      tests: [
        { name: "counts letters", code: `assertEquals(frequency(["a", "b", "a"]), { a: 2, b: 1 });` },
        { name: "single value", code: `assertEquals(frequency(["x", "x", "x"]), { x: 3 });` },
      ],
    },
    {
      slug: "group-by-parity",
      title: "Grouping",
      blurb: "Bucket items by a rule.",
      xp: 35,
      content: `# Grouping

Grouping splits a list into buckets. Here we'll split numbers into even and odd.

## Your task
Write \`groupByParity(nums)\` that returns an object
\`{ even: [...], odd: [...] }\` preserving each number's original order within its
bucket.`,
      starterCode: `function groupByParity(nums) {
  // return { even: [...], odd: [...] }
}
`,
      solution: `function groupByParity(nums) {
  const out = { even: [], odd: [] };
  for (const n of nums) {
    if (n % 2 === 0) out.even.push(n);
    else out.odd.push(n);
  }
  return out;
}`,
      tests: [
        {
          name: "splits even and odd",
          code: `assertEquals(groupByParity([1, 2, 3, 4]), { even: [2, 4], odd: [1, 3] });`,
        },
        {
          name: "all even",
          code: `assertEquals(groupByParity([2, 4, 6]), { even: [2, 4, 6], odd: [] });`,
        },
      ],
    },
  ],
};
