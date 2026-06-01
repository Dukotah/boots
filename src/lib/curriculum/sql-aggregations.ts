import type { Module } from "./types";

// SQL Aggregations — COUNT, SUM, AVG, GROUP BY, HAVING. Runs in-browser via
// sql.js; graded by comparing the student query's result set to the solution's.
const SALES = `
CREATE TABLE sales (id INTEGER, product TEXT, category TEXT, amount INTEGER);
INSERT INTO sales VALUES (1, 'Laptop',  'Tech', 1200);
INSERT INTO sales VALUES (2, 'Mouse',   'Tech',   25);
INSERT INTO sales VALUES (3, 'Desk',    'Home',  300);
INSERT INTO sales VALUES (4, 'Chair',   'Home',  150);
INSERT INTO sales VALUES (5, 'Monitor', 'Tech',  400);
INSERT INTO sales VALUES (6, 'Lamp',    'Home',   60);
`;

export const sqlAggregations: Module = {
  slug: "sql-aggregations",
  title: "SQL Aggregations",
  description:
    "Summarize data: count rows, total and average columns, then group and filter those groups. The heart of every analytics query.",
  emoji: "🧮",
  gradient: "from-amber-400/20 to-yellow-500/10",
  language: "sql",
  tagline:
    "Learn SQL aggregations: COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING on a real SQLite database.",
  keywords: ["sql group by", "sql count sum avg", "sql having", "sql aggregate functions"],
  lessons: [
    {
      slug: "count-rows",
      title: "COUNT Rows",
      blurb: "How many records are there?",
      xp: 30,
      setup: SALES,
      content: `# COUNT Rows

\`COUNT(*)\` returns the number of rows.

\`\`\`sql
SELECT COUNT(*) FROM sales;
\`\`\`

The \`sales\` table has columns: \`id\`, \`product\`, \`category\`, \`amount\`.

## Your task
Count how many rows are in the \`sales\` table.`,
      starterCode: `-- Count all rows in sales
`,
      solution: `SELECT COUNT(*) FROM sales;`,
      tests: [{ name: "Returns the row count", code: "" }],
    },
    {
      slug: "sum-amount",
      title: "SUM a Column",
      blurb: "Total up the amounts.",
      xp: 35,
      setup: SALES,
      content: `# SUM a Column

\`SUM(column)\` adds up a numeric column.

\`\`\`sql
SELECT SUM(amount) FROM sales;
\`\`\`

## Your task
Return the total of all \`amount\` values in \`sales\`.`,
      starterCode: `-- Sum the amount column
`,
      solution: `SELECT SUM(amount) FROM sales;`,
      tests: [{ name: "Returns the total amount", code: "" }],
    },
    {
      slug: "avg-min-max",
      title: "AVG, MIN & MAX",
      blurb: "Average, smallest, largest.",
      xp: 35,
      setup: SALES,
      content: `# AVG, MIN & MAX

These aggregates summarize a column:

\`\`\`sql
SELECT AVG(amount), MIN(amount), MAX(amount) FROM sales;
\`\`\`

## Your task
Return the average, minimum, and maximum \`amount\` (in that order).`,
      starterCode: `-- Select AVG, MIN, and MAX of amount
`,
      solution: `SELECT AVG(amount), MIN(amount), MAX(amount) FROM sales;`,
      tests: [{ name: "Returns avg, min, max", code: "" }],
    },
    {
      slug: "group-by",
      title: "GROUP BY",
      blurb: "Aggregate per category.",
      xp: 45,
      setup: SALES,
      content: `# GROUP BY

\`GROUP BY\` collapses rows that share a value into one group, so aggregates run
**per group**.

\`\`\`sql
SELECT category, SUM(amount) FROM sales GROUP BY category;
\`\`\`

## Your task
Return each \`category\` with the total \`amount\` for that category.`,
      starterCode: `-- Total amount per category
`,
      solution: `SELECT category, SUM(amount) FROM sales GROUP BY category;`,
      tests: [{ name: "Returns total per category", code: "" }],
    },
    {
      slug: "having",
      title: "HAVING",
      blurb: "Filter groups after aggregating.",
      xp: 50,
      setup: SALES,
      content: `# HAVING

\`WHERE\` filters rows; \`HAVING\` filters **groups** after aggregation.

\`\`\`sql
SELECT category, SUM(amount) FROM sales
GROUP BY category
HAVING SUM(amount) > 500;
\`\`\`

## Your task
Return each \`category\` and its total \`amount\`, but only for categories whose
total is greater than \`500\`.`,
      starterCode: `-- Categories whose total amount exceeds 500
`,
      solution: `SELECT category, SUM(amount) FROM sales GROUP BY category HAVING SUM(amount) > 500;`,
      tests: [{ name: "Returns only high-total categories", code: "" }],
    },
  ],
};
