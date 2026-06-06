import type { Module } from "./types";

// SQL Window Functions — OVER(), PARTITION BY, ROW_NUMBER, RANK, LAG, and LEAD.
// Runs in-browser via sql.js (SQLite/WASM).
const SALES = `
CREATE TABLE sales (
  id INTEGER,
  rep TEXT,
  region TEXT,
  amount INTEGER,
  sale_date TEXT
);
INSERT INTO sales VALUES (1, 'Alice',  'North', 200, '2024-01-05');
INSERT INTO sales VALUES (2, 'Bob',    'South', 150, '2024-01-07');
INSERT INTO sales VALUES (3, 'Alice',  'North', 300, '2024-01-12');
INSERT INTO sales VALUES (4, 'Carol',  'South', 250, '2024-01-15');
INSERT INTO sales VALUES (5, 'Bob',    'South', 180, '2024-01-20');
INSERT INTO sales VALUES (6, 'Alice',  'North', 120, '2024-01-22');
INSERT INTO sales VALUES (7, 'Carol',  'South', 310, '2024-02-01');
INSERT INTO sales VALUES (8, 'David',  'North', 400, '2024-02-03');
INSERT INTO sales VALUES (9, 'Bob',    'South', 90,  '2024-02-10');
INSERT INTO sales VALUES (10,'David',  'North', 220, '2024-02-14');
`;

export const sqlWindowFunctions: Module = {
  slug: "sql-window-functions",
  title: "SQL Window Functions",
  description:
    "Calculate running totals, rankings, and row-by-row comparisons without collapsing your data — the analytics superpower hiding inside every SQL database.",
  emoji: "🪟",
  gradient: "from-violet-400/20 to-purple-500/10",
  language: "sql",
  tagline:
    "Learn SQL window functions: OVER, PARTITION BY, ROW_NUMBER, RANK, SUM OVER, LAG, and LEAD.",
  keywords: [
    "sql window functions",
    "sql over partition by",
    "sql row_number",
    "sql rank",
    "sql running total",
    "sql lag lead",
  ],
  lessons: [
    {
      slug: "sum-over",
      title: "Running Total with SUM OVER",
      blurb: "Add a running total column without GROUP BY.",
      xp: 45,
      setup: SALES,
      content: `# Running Total with SUM OVER

A **window function** computes across a set of rows related to the current row.
Unlike \`GROUP BY\`, it does NOT collapse the rows — every row stays.

\`\`\`sql
SELECT id, amount,
       SUM(amount) OVER (ORDER BY id) AS running_total
FROM sales;
\`\`\`

The \`OVER (ORDER BY id)\` clause defines the window: rows from the start up to
the current row, in \`id\` order.

Table: \`sales(id, rep, region, amount, sale_date)\`

## Your task
Return \`id\`, \`amount\`, and a \`running_total\` column that is the cumulative sum
of \`amount\` ordered by \`id\` ascending.`,
      starterCode: `-- running total of amount ordered by id
`,
      solution: `SELECT id, amount,
       SUM(amount) OVER (ORDER BY id) AS running_total
FROM sales
ORDER BY id;`,
      tests: [{ name: "Running total per row", code: "" }],
    },
    {
      slug: "partition-by",
      title: "PARTITION BY",
      blurb: "Restart the window per group.",
      xp: 50,
      setup: SALES,
      content: `# PARTITION BY

\`PARTITION BY\` resets the window for each distinct value of a column — like
running a window function inside each group independently.

\`\`\`sql
SELECT rep, amount,
       SUM(amount) OVER (PARTITION BY rep ORDER BY id) AS rep_running
FROM sales;
\`\`\`

## Your task
Return \`region\`, \`rep\`, \`amount\`, and a \`region_running\` column — the running
total of \`amount\` within each \`region\`, ordered by \`id\` within the partition.`,
      starterCode: `-- running total of amount partitioned by region, ordered by id
`,
      solution: `SELECT region, rep, amount,
       SUM(amount) OVER (PARTITION BY region ORDER BY id) AS region_running
FROM sales
ORDER BY region, id;`,
      tests: [{ name: "Running total per region", code: "" }],
    },
    {
      slug: "row-number",
      title: "ROW_NUMBER",
      blurb: "Assign a unique sequential rank within a partition.",
      xp: 45,
      setup: SALES,
      content: `# ROW_NUMBER

\`ROW_NUMBER()\` assigns a unique integer to each row within its window, starting
at 1.  Ties get different numbers (first encountered wins).

\`\`\`sql
SELECT rep, amount,
       ROW_NUMBER() OVER (PARTITION BY rep ORDER BY amount DESC) AS rn
FROM sales;
\`\`\`

## Your task
Return \`rep\`, \`amount\`, and a \`rn\` column — the row number within each \`rep\`'s
sales ordered by \`amount\` descending (biggest sale = 1).`,
      starterCode: `-- row number per rep, ordered by amount descending
`,
      solution: `SELECT rep, amount,
       ROW_NUMBER() OVER (PARTITION BY rep ORDER BY amount DESC) AS rn
FROM sales
ORDER BY rep, rn;`,
      tests: [{ name: "Row number per rep", code: "" }],
    },
    {
      slug: "rank",
      title: "RANK vs ROW_NUMBER",
      blurb: "Ties get the same rank with gaps after.",
      xp: 45,
      setup: SALES,
      content: `# RANK vs ROW_NUMBER

\`RANK()\` is like \`ROW_NUMBER\` but tied values share a rank and the next rank
skips the gap (1, 1, 3 …).

\`\`\`sql
SELECT rep, amount,
       RANK() OVER (ORDER BY amount DESC) AS rnk
FROM sales;
\`\`\`

## Your task
Return every sale's \`rep\`, \`amount\`, and a global \`rnk\` — rank ordered by
\`amount\` descending across the entire table (no \`PARTITION BY\`).`,
      starterCode: `-- global rank by amount descending
`,
      solution: `SELECT rep, amount,
       RANK() OVER (ORDER BY amount DESC) AS rnk
FROM sales
ORDER BY rnk, rep;`,
      tests: [{ name: "Global rank by amount", code: "" }],
    },
    {
      slug: "lag",
      title: "LAG — Previous Row's Value",
      blurb: "Compare a row to the one before it.",
      xp: 50,
      setup: SALES,
      content: `# LAG — Previous Row's Value

\`LAG(column, offset, default)\` looks back \`offset\` rows in the window.  It lets
you compare a row to the previous one — great for period-over-period analysis.

\`\`\`sql
SELECT id, amount,
       LAG(amount, 1, 0) OVER (ORDER BY id) AS prev_amount
FROM sales;
\`\`\`

## Your task
Return \`id\`, \`amount\`, and \`prev_amount\` — the \`amount\` of the previous row
(by \`id\` ascending), defaulting to \`0\` for the first row.`,
      starterCode: `-- id, amount, and the previous row's amount (default 0)
`,
      solution: `SELECT id, amount,
       LAG(amount, 1, 0) OVER (ORDER BY id) AS prev_amount
FROM sales
ORDER BY id;`,
      tests: [{ name: "Previous amount per row", code: "" }],
    },
    {
      slug: "top-n-per-group",
      title: "Top-N per Group",
      blurb: "Filter to the top row per partition using a subquery.",
      xp: 55,
      setup: SALES,
      content: `# Top-N per Group

A classic pattern: use \`ROW_NUMBER()\` in a subquery, then filter on \`rn = 1\`
to keep only the top row within each partition.

\`\`\`sql
SELECT rep, amount, region
FROM (
  SELECT rep, amount, region,
         ROW_NUMBER() OVER (PARTITION BY rep ORDER BY amount DESC) AS rn
  FROM sales
) t
WHERE t.rn = 1;
\`\`\`

## Your task
Return each \`rep\` and their single \`best\` (highest) \`amount\` sale, with a column
named \`best\`.  Order results by \`rep\` ascending.`,
      starterCode: `-- each rep and their highest single sale as "best", ordered by rep
`,
      solution: `SELECT rep, amount AS best
FROM (
  SELECT rep, amount,
         ROW_NUMBER() OVER (PARTITION BY rep ORDER BY amount DESC) AS rn
  FROM sales
) t
WHERE t.rn = 1
ORDER BY rep;`,
      tests: [{ name: "Best sale per rep", code: "" }],
    },
  ],
};
