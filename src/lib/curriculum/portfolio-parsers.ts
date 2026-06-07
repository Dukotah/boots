import type { Module } from "./types";

// Portfolio Parsers — guided projects that build real parsing and interpretation
// tools from scratch. Each lesson is a complete mini-project: spec → build → test.
// Parsers are a universal interview topic and a genuine resume differentiator.
export const portfolioParsers: Module = {
  slug: "portfolio-parsers",
  title: "Parsers & Mini-Interpreters",
  description:
    "Build the tools that read and transform text: an arithmetic evaluator, a CSV parser, a Markdown-to-HTML converter, a query-string decoder, and a JSON-path getter. These projects prove you understand how real-world data layers work under the hood.",
  emoji: "🔤",
  gradient: "from-violet-400/20 to-purple-500/10",
  tagline: "build parsers and mini-interpreters that real engineers write",
  language: "js",
  keywords: [
    "parser javascript",
    "expression evaluator",
    "csv parser",
    "markdown parser",
    "query string parser",
    "json path",
    "portfolio projects",
    "javascript projects intermediate",
  ],
  free: false,
  lessons: [
    // ── 1. Arithmetic Expression Evaluator ─────────────────────────────────
    {
      slug: "arithmetic-evaluator",
      title: "Arithmetic Expression Evaluator",
      blurb: "Parse and evaluate math strings like \"3 + 4 * 2\" with correct precedence.",
      xp: 60,
      language: "js",
      content: `## What you're building

A function \`evaluate(expr)\` that takes a string like \`"3 + 4 * 2"\` and returns the
correct numeric result (\`11\`), respecting standard operator precedence
(\`*\` and \`/\` bind tighter than \`+\` and \`-\`).

This is the classic **recursive-descent parser** problem — the same technique
used in every programming language compiler, spreadsheet engine, and formula field.

## Requirements

- Accept non-negative integers and the four operators: \`+\`, \`-\`, \`*\`, \`/\`
- Respect standard precedence: \`*\` / \`/\` before \`+\` / \`-\`
- Handle optional spaces between tokens
- Integer division rounds toward zero (use \`Math.trunc\`)
- Return a number (not a string)

## Stretch goals

- Support parentheses: \`"(2 + 3) * 4"\` → \`20\`
- Support unary minus: \`"-3 + 5"\` → \`2\`
- Return a descriptive error for invalid input

## What this proves

- You can implement a multi-precedence recursive parser without a library
- You understand tokenisation, grammar, and evaluation order
- Compilers/interpreters are no longer magic to you
`,
      hints: [
        "Tokenise first: split the string into numbers and operator strings.",
        "Use two passes: a 'term' pass for * and / , then an 'expression' pass for + and -.",
        "Track a cursor (index) into the token array and advance it as you consume tokens.",
      ],
      starterCode: `/**
 * Evaluate a simple arithmetic expression string.
 * e.g. evaluate("3 + 4 * 2") === 11
 * Supports +, -, *, / with correct precedence.
 * Spaces between tokens are allowed.
 */
function evaluate(expr) {
  // TODO: tokenise expr, then parse with precedence
  return 0;
}
`,
      solution: `function evaluate(expr) {
  // Tokenise: extract numbers and operators
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === " ") { i++; continue; }
    if (expr[i] >= "0" && expr[i] <= "9") {
      let num = "";
      while (i < expr.length && expr[i] >= "0" && expr[i] <= "9") { num += expr[i]; i++; }
      tokens.push(Number(num));
    } else {
      tokens.push(expr[i]);
      i++;
    }
  }

  // Recursive-descent parser
  let pos = 0;

  function parseTerm() {
    let left = tokens[pos++]; // number
    while (pos < tokens.length && (tokens[pos] === "*" || tokens[pos] === "/")) {
      const op = tokens[pos++];
      const right = tokens[pos++];
      left = op === "*" ? left * right : Math.trunc(left / right);
    }
    return left;
  }

  function parseExpr() {
    let left = parseTerm();
    while (pos < tokens.length && (tokens[pos] === "+" || tokens[pos] === "-")) {
      const op = tokens[pos++];
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  return parseExpr();
}`,
      tests: [
        {
          name: "simple addition",
          code: `assertEquals(evaluate("1 + 2"), 3);`,
        },
        {
          name: "precedence: multiply before add",
          code: `assertEquals(evaluate("3 + 4 * 2"), 11);`,
        },
        {
          name: "left-to-right same precedence",
          code: `assertEquals(evaluate("10 - 3 - 2"), 5);`,
        },
        {
          name: "mixed operators no spaces",
          code: `assertEquals(evaluate("6/2+1"), 4);`,
        },
      ],
    },

    // ── 2. CSV Parser ──────────────────────────────────────────────────────
    {
      slug: "csv-parser",
      title: "CSV Parser",
      blurb: "Turn raw comma-separated text into structured rows of data.",
      xp: 40,
      language: "js",
      content: `## What you're building

A function \`parseCSV(text)\` that converts a CSV string into an array of
objects, using the first row as headers.

\`\`\`
name,age,city
Alice,30,NYC
Bob,25,LA
\`\`\`
→
\`\`\`js
[
  { name: "Alice", age: "30", city: "NYC" },
  { name: "Bob",   age: "25", city: "LA"  },
]
\`\`\`

CSV is the most common data-exchange format in the real world — spreadsheets,
bank exports, analytics pipelines. Every data engineer has written one.

## Requirements

- Split text into lines on \`\\n\`
- First line is headers; remaining lines are data rows
- Split each line on \`","\` to get fields (values stay as strings)
- Skip completely empty lines (trailing newline at EOF, etc.)
- Return an array of plain objects

## Stretch goals

- Handle quoted fields containing commas: \`"Smith, John"\`
- Trim whitespace from field values
- Support a custom delimiter (semicolon, tab, etc.)

## What this proves

- String splitting and line handling — the bread and butter of data work
- You can map a header row onto data rows systematically
- You understand why "just split on commas" breaks for real CSV
`,
      hints: [
        "Split on '\\n' then filter out empty lines before processing.",
        "The first element of the split lines array is your headers row.",
        "Use Array.reduce or map with an index to zip headers and values into objects.",
      ],
      starterCode: `/**
 * Parse a CSV string into an array of objects.
 * The first row is treated as headers.
 * e.g. parseCSV("name,age\\nAlice,30") === [{ name: "Alice", age: "30" }]
 */
function parseCSV(text) {
  // TODO: split lines, extract headers, map data rows to objects
  return [];
}
`,
      solution: `function parseCSV(text) {
  const lines = text.split("\\n").filter(l => l.trim() !== "");
  if (lines.length === 0) return [];
  const headers = lines[0].split(",");
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] !== undefined ? values[j] : "";
    }
    rows.push(obj);
  }
  return rows;
}`,
      tests: [
        {
          name: "single data row",
          code: `const rows = parseCSV("name,age\\nAlice,30");
assertEquals(rows.length, 1);
assertEquals(rows[0].name, "Alice");
assertEquals(rows[0].age, "30");`,
        },
        {
          name: "multiple rows",
          code: `const rows = parseCSV("x,y\\n1,2\\n3,4");
assertEquals(rows.length, 2);
assertEquals(rows[1].x, "3");
assertEquals(rows[1].y, "4");`,
        },
        {
          name: "three-column header",
          code: `const rows = parseCSV("a,b,c\\n1,2,3");
assertEquals(Object.keys(rows[0]).length, 3);
assertEquals(rows[0].c, "3");`,
        },
        {
          name: "trailing newline is ignored",
          code: `const rows = parseCSV("id,val\\n7,hello\\n");
assertEquals(rows.length, 1);
assertEquals(rows[0].id, "7");`,
        },
      ],
    },

    // ── 3. Mini Markdown-to-HTML ───────────────────────────────────────────
    {
      slug: "markdown-to-html",
      title: "Mini Markdown-to-HTML Converter",
      blurb: "Transform a subset of Markdown into valid HTML strings.",
      xp: 50,
      language: "js",
      content: `## What you're building

A function \`markdownToHTML(md)\` that converts a small but useful subset of
Markdown syntax into an HTML string.

Input:
\`\`\`
# Hello
## World
This is **bold** and *italic* text.
\`\`\`

Output:
\`\`\`html
<h1>Hello</h1>
<h2>World</h2>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
\`\`\`

Markdown powers GitHub READMEs, dev blogs, documentation, and chat apps.
Understanding how it works removes the mystery from these tools.

## Requirements

- \`# Heading\` → \`<h1>Heading</h1>\`
- \`## Heading\` → \`<h2>Heading</h2>\`
- \`**text**\` → \`<strong>text</strong>\` (inline, inside paragraphs)
- \`*text*\` → \`<em>text</em>\` (inline, inside paragraphs)
- Any line that is not a heading and is not blank → wrap in \`<p>...</p>\`
- Skip blank lines (produce no output for them)
- Process lines in order; each line produces at most one output element

## Stretch goals

- Support unordered lists: \`- item\` → \`<li>item</li>\` wrapped in \`<ul>\`
- Support inline \`\\\`code\\\`\` → \`<code>code</code>\`
- Handle \`***bold and italic***\`

## What this proves

- Regex-powered line-by-line transformation
- Layered string processing: block-level first, then inline
- You understand how Markdown renderers work at their core
`,
      hints: [
        "Process line by line. Match '# ' prefix first, then '## ', then treat the rest as paragraphs.",
        "After classifying the block type, run inline replacements (**bold**, *italic*) on the inner text.",
        "Use replace with regex: /\\*\\*(.+?)\\*\\*/g for bold, /\\*(.+?)\\*/g for italic.",
      ],
      starterCode: `/**
 * Convert a small subset of Markdown to an HTML string.
 * Supported: # h1, ## h2, **bold**, *italic*, plain paragraphs.
 * Blank lines are skipped.
 */
function markdownToHTML(md) {
  // TODO: split into lines, classify each, apply inline transforms
  return "";
}
`,
      solution: `function markdownToHTML(md) {
  function inlineFormat(text) {
    return text
      .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>")
      .replace(/\\*(.+?)\\*/g, "<em>$1</em>");
  }

  const lines = md.split("\\n");
  const out = [];
  for (const line of lines) {
    if (line.trim() === "") continue;
    if (line.startsWith("## ")) {
      out.push("<h2>" + inlineFormat(line.slice(3).trim()) + "</h2>");
    } else if (line.startsWith("# ")) {
      out.push("<h1>" + inlineFormat(line.slice(2).trim()) + "</h1>");
    } else {
      out.push("<p>" + inlineFormat(line.trim()) + "</p>");
    }
  }
  return out.join("\\n");
}`,
      tests: [
        {
          name: "h1 heading",
          code: `assertEquals(markdownToHTML("# Hello"), "<h1>Hello</h1>");`,
        },
        {
          name: "h2 heading",
          code: `assertEquals(markdownToHTML("## World"), "<h2>World</h2>");`,
        },
        {
          name: "bold and italic in paragraph",
          code: `const result = markdownToHTML("This is **bold** and *italic* text.");
assertEquals(result, "<p>This is <strong>bold</strong> and <em>italic</em> text.</p>");`,
        },
        {
          name: "blank lines are skipped",
          code: `const result = markdownToHTML("# A\\n\\n## B");
assertEquals(result, "<h1>A</h1>\\n<h2>B</h2>");`,
        },
      ],
    },

    // ── 4. Query-String Parser ─────────────────────────────────────────────
    {
      slug: "query-string-parser",
      title: "Query-String Parser",
      blurb: "Decode URL query strings into plain objects — without URLSearchParams.",
      xp: 40,
      language: "js",
      content: `## What you're building

Two functions:

- \`parseQS(queryString)\` — decode \`"name=Alice&age=30"\` into \`{ name: "Alice", age: "30" }\`
- \`stringifyQS(obj)\` — encode \`{ name: "Alice", age: "30" }\` back to \`"name=Alice&age=30"\`

Query strings power every web URL, form submission, and REST API you will ever
work with. Knowing what \`encodeURIComponent\` / \`decodeURIComponent\` do — and why
they exist — is essential for a working web developer.

## Requirements

**parseQS:**
- Split on \`&\` to get key-value pairs
- Split each pair on the first \`=\` only
- Decode percent-encoded characters with \`decodeURIComponent\`
- Ignore pairs with no \`=\`
- Return a plain object

**stringifyQS:**
- Encode both key and value with \`encodeURIComponent\`
- Join pairs with \`&\`
- Return the query string (no leading \`?\`)

## Stretch goals

- Handle repeated keys as arrays: \`color=red&color=blue\` → \`{ color: ["red","blue"] }\`
- Support a leading \`?\` in the input to \`parseQS\`

## What this proves

- You can read and write the fundamental unit of web communication
- You understand URL encoding and why special characters must be escaped
- You've implemented a utility that ships in every HTTP library
`,
      hints: [
        "Split the input on '&' first, then split each chunk on '=' using indexOf so only the first '=' is a separator.",
        "decodeURIComponent('%20') === ' ' — use it on both the key and value.",
        "For stringifyQS, Object.entries(obj) gives you [key, value] pairs to encode and join.",
      ],
      starterCode: `/**
 * Decode a query string into a plain object.
 * e.g. parseQS("name=Alice&age=30") === { name: "Alice", age: "30" }
 */
function parseQS(queryString) {
  // TODO: split on &, then split each pair on =, decode each part
  return {};
}

/**
 * Encode a plain object into a query string.
 * e.g. stringifyQS({ name: "Alice", age: "30" }) === "name=Alice&age=30"
 */
function stringifyQS(obj) {
  // TODO: encode each key and value, join with &
  return "";
}
`,
      solution: `function parseQS(queryString) {
  const result = {};
  if (!queryString) return result;
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    const eqIdx = pair.indexOf("=");
    if (eqIdx === -1) continue;
    const key = decodeURIComponent(pair.slice(0, eqIdx));
    const val = decodeURIComponent(pair.slice(eqIdx + 1));
    result[key] = val;
  }
  return result;
}

function stringifyQS(obj) {
  return Object.entries(obj)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}`,
      tests: [
        {
          name: "parseQS basic key-value pairs",
          code: `const obj = parseQS("name=Alice&age=30");
assertEquals(obj.name, "Alice");
assertEquals(obj.age, "30");`,
        },
        {
          name: "parseQS decodes percent-encoding",
          code: `const obj = parseQS("city=New%20York&lang=en");
assertEquals(obj.city, "New York");`,
        },
        {
          name: "stringifyQS encodes special chars",
          code: `const qs = stringifyQS({ q: "hello world", lang: "en" });
assert(qs.includes("q=hello%20world"), "spaces must be encoded");`,
        },
        {
          name: "round-trip: stringify then parse",
          code: `const original = { name: "Bob", score: "100" };
const parsed = parseQS(stringifyQS(original));
assertEquals(parsed.name, "Bob");
assertEquals(parsed.score, "100");`,
        },
      ],
    },

    // ── 5. JSON-Path Getter ────────────────────────────────────────────────
    {
      slug: "json-path-getter",
      title: "JSON-Path Getter",
      blurb: "Traverse deeply nested objects using dot-and-bracket path strings.",
      xp: 50,
      language: "js",
      content: `## What you're building

A function \`getPath(obj, path)\` that safely reads a value from a deeply nested
object using a dot-and-bracket notation path string.

\`\`\`js
const data = { user: { address: { city: "Boston" }, scores: [10, 20, 30] } };
getPath(data, "user.address.city");   // "Boston"
getPath(data, "user.scores[1]");      // 20
getPath(data, "user.missing.field");  // undefined
\`\`\`

Tools like Lodash \`_.get\`, MongoDB projections, and JSON Schema all rely on
this concept. It is also a common interview question at every level.

## Requirements

- Support dot-separated keys: \`"a.b.c"\`
- Support bracket-indexed array access: \`"items[0]"\` or \`"a.items[2].name"\`
- Return \`undefined\` (not an error) when any segment is missing or the parent is not an object
- Index values in brackets will always be non-negative integers in the tests

## Stretch goals

- Support negative indices: \`"list[-1]"\` retrieves the last element
- Support a default value as a third argument: \`getPath(obj, path, defaultVal)\`
- Support bracket-style string keys: \`"map['key']"\`

## What this proves

- You can tokenise and traverse arbitrary nested structures
- Safe property access and graceful handling of nullish values
- You understand how utility libraries implement their "get" helpers
`,
      hints: [
        "Convert bracket notation to dot notation first: 'a[0].b' → 'a.0.b', then split on '.'.",
        "Use Array.reduce over the segments, returning undefined early if the accumulator is nullish.",
        "segment.replace(/\\[(\\d+)\\]/g, '.$1') converts all brackets to dots in one pass.",
      ],
      starterCode: `/**
 * Read a value from a nested object using a path string.
 * Supports dot notation ("a.b.c") and bracket array access ("a[0].b").
 * Returns undefined when any segment is missing.
 */
function getPath(obj, path) {
  // TODO: tokenise the path, then walk the object segment by segment
  return undefined;
}
`,
      solution: `function getPath(obj, path) {
  // Convert bracket notation to dot notation, then split
  const segments = path.replace(/\\[(\\d+)\\]/g, ".$1").split(".");
  let current = obj;
  for (const seg of segments) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object" && !Array.isArray(current)) return undefined;
    current = current[seg];
  }
  return current;
}`,
      tests: [
        {
          name: "dot-separated nested key",
          code: `const data = { user: { name: "Alice" } };
assertEquals(getPath(data, "user.name"), "Alice");`,
        },
        {
          name: "bracket array index",
          code: `const data = { scores: [10, 20, 30] };
assertEquals(getPath(data, "scores[1]"), 20);`,
        },
        {
          name: "mixed dot and bracket",
          code: `const data = { team: { members: [{ name: "Bob" }] } };
assertEquals(getPath(data, "team.members[0].name"), "Bob");`,
        },
        {
          name: "missing path returns undefined",
          code: `const data = { a: { b: 1 } };
assertEquals(getPath(data, "a.c.d"), undefined);`,
        },
      ],
    },
  ],
};
