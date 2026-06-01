// Scaffolds a ready-to-paste lesson object so authoring a new lesson is a
// copy/paste-and-fill job. Run with:
//   npm run new:lesson -- <slug> "Lesson Title"
// e.g.
//   npm run new:lesson -- closures "Closures"
//
// It prints the lesson block to stdout — paste it into the target module's
// `lessons` array (e.g. src/lib/curriculum/javascript.ts), fill the TODOs, then
// run `npm run check` to validate.

const [, , rawSlug, ...titleParts] = process.argv;

if (!rawSlug) {
  console.log('Usage: npm run new:lesson -- <slug> "Lesson Title"');
  process.exit(1);
}

const slug = rawSlug
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const title = titleParts.join(" ") || "TODO: Title";
const fn = "solveMe"; // rename to your exercise's function

const block = `    {
      slug: "${slug}",
      title: "${title}",
      blurb: "TODO: one-line teaser shown in lists.",
      xp: 25,
      content: \`# ${title}

TODO: explain the concept in 2–4 short paragraphs. Use a small code example:

\\\`\\\`\\\`js
// example
\\\`\\\`\\\`

## Your task
TODO: describe exactly what \\\`${fn}\\\` should do.\`,
      starterCode: \`function ${fn}() {
  // TODO: student starts here (must NOT already pass the tests)
}
\`,
      solution: \`function ${fn}() {
  // TODO: reference solution (must pass every test)
}\`,
      tests: [
        { name: "TODO describe case", code: \`assertEquals(${fn}(), "TODO");\` },
      ],
    },`;

console.log(`\n// ── paste into a module's "lessons" array, then: npm run check ──\n`);
console.log(block);
console.log("");
