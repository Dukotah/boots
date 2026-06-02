import type { Module } from "./types";

// CSV & Data Parsing — turning raw text data into structures and back. A daily
// task in real backends and scripts. Auto-graded in-browser.
export const dataFormats: Module = {
  slug: "data-formats",
  title: "CSV & Data Parsing",
  description:
    "Real data arrives as messy text. Learn to parse CSV into objects, build CSV from data, and pull columns — the bread-and-butter of data plumbing.",
  emoji: "📑",
  gradient: "from-cyan-400/20 to-blue-500/10",
  tagline:
    "Learn to parse and build CSV data in JavaScript: rows to objects, objects to CSV, plucking and summing columns.",
  keywords: ["parse csv javascript", "csv to json", "data parsing", "javascript data"],
  lessons: [
    {
      slug: "parse-row",
      title: "Parse a CSV Row",
      blurb: "Split a line into fields.",
      xp: 30,
      content: `# Parse a CSV Row

CSV = "comma-separated values". A single row splits on commas into fields.

\`\`\`js
"a,b,c" → ["a", "b", "c"]
\`\`\`

## Your task
Write \`parseRow(line)\` that splits a CSV line into an array of field strings.`,
      starterCode: `function parseRow(line) {
  // split the line into fields on commas
}
`,
      solution: `function parseRow(line) {
  return line.split(",");
}`,
      tests: [
        { name: "three fields", code: `assertEquals(parseRow("a,b,c"), ["a", "b", "c"]);` },
        { name: "one field", code: `assertEquals(parseRow("solo"), ["solo"]);` },
      ],
    },
    {
      slug: "parse-csv",
      title: "CSV to Objects",
      blurb: "Use the header row as keys.",
      xp: 45,
      content: `# CSV to Objects

A CSV file's first line is the **header** (the keys). Each later line becomes an
object mapping those keys to values.

\`\`\`
name,age
Ada,30
\`\`\`
→ \`[{ name: "Ada", age: "30" }]\`

## Your task
Write \`parseCsv(text)\` that parses a CSV string (header + rows) into an array of
objects. Values stay as strings.`,
      starterCode: `function parseCsv(text) {
  // first line = keys; each row = an object
}
`,
      solution: `function parseCsv(text) {
  const [header, ...rows] = text.trim().split("\\n");
  const keys = header.split(",");
  return rows.map((row) => {
    const values = row.split(",");
    const obj = {};
    keys.forEach((key, i) => {
      obj[key] = values[i];
    });
    return obj;
  });
}`,
      tests: [
        {
          name: "parses rows to objects",
          code: `assertEquals(parseCsv("name,age\\nAda,30\\nSam,25"), [{ name: "Ada", age: "30" }, { name: "Sam", age: "25" }]);`,
        },
      ],
    },
    {
      slug: "to-csv",
      title: "Objects to CSV",
      blurb: "Serialize data back to text.",
      xp: 45,
      content: `# Objects to CSV

Going the other way: take an array of objects and produce a CSV string — a header
line of the keys, then one line per object.

## Your task
Write \`toCsv(rows)\` that returns a CSV string. Use the keys of the **first**
object as the header. An empty array returns an empty string.`,
      starterCode: `function toCsv(rows) {
  // header line of keys, then a line per row
}
`,
      solution: `function toCsv(rows) {
  if (rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  const header = keys.join(",");
  const lines = rows.map((row) => keys.map((k) => row[k]).join(","));
  return [header, ...lines].join("\\n");
}`,
      tests: [
        {
          name: "builds header + rows",
          code: `assertEquals(toCsv([{ a: "1", b: "2" }, { a: "3", b: "4" }]), "a,b\\n1,2\\n3,4");`,
        },
        { name: "empty → ''", code: `assertEquals(toCsv([]), "");` },
      ],
    },
    {
      slug: "pluck",
      title: "Pluck a Column",
      blurb: "Extract one field from each row.",
      xp: 30,
      content: `# Pluck a Column

Often you want just one column's values out of a list of records.

## Your task
Write \`pluck(rows, key)\` that returns an array of the \`key\` value from each
object.`,
      starterCode: `function pluck(rows, key) {
  // return each row's value for key
}
`,
      solution: `function pluck(rows, key) {
  return rows.map((row) => row[key]);
}`,
      tests: [
        {
          name: "plucks the column",
          code: `assertEquals(pluck([{ name: "Ada" }, { name: "Sam" }], "name"), ["Ada", "Sam"]);`,
        },
      ],
    },
    {
      slug: "sum-column",
      title: "Sum a Numeric Column",
      blurb: "Parse strings to numbers and total them.",
      xp: 35,
      content: `# Sum a Numeric Column

CSV values are strings, so to do math you must convert them with \`Number(...)\`.

## Your task
Write \`sumColumn(rows, key)\` that converts each row's \`key\` value to a number
and returns the total. An empty array returns \`0\`.`,
      starterCode: `function sumColumn(rows, key) {
  // convert each value to a number and total them
}
`,
      solution: `function sumColumn(rows, key) {
  return rows.reduce((total, row) => total + Number(row[key]), 0);
}`,
      tests: [
        {
          name: "sums numeric strings",
          code: `assertEquals(sumColumn([{ x: "1" }, { x: "2" }, { x: "3" }], "x"), 6);`,
        },
        { name: "empty → 0", code: `assertEquals(sumColumn([], "x"), 0);` },
      ],
    },
  ],
};
