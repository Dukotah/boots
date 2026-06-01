import type { Module } from "./types";

// SQL Basics — runs in-browser via sql.js (SQLite compiled to WASM). Each lesson
// seeds a fresh database with `setup`, then grades by comparing the student
// query's result set against the reference `solution` query.
const PRODUCTS = `
CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price INTEGER, stock INTEGER);
INSERT INTO products VALUES (1, 'Laptop',   'Tech',   1200, 5);
INSERT INTO products VALUES (2, 'Mouse',    'Tech',     25, 40);
INSERT INTO products VALUES (3, 'Desk',     'Home',    300, 10);
INSERT INTO products VALUES (4, 'Chair',    'Home',    150, 8);
INSERT INTO products VALUES (5, 'Notebook', 'Office',    5, 100);
INSERT INTO products VALUES (6, 'Pen',      'Office',    2, 200);
`;

export const sql: Module = {
  slug: "sql",
  title: "SQL Basics",
  description:
    "Learn SQL by querying a real database in your browser. SELECT the data you want, filter it, sort it, and limit it — the foundation of every data job.",
  emoji: "🗄️",
  gradient: "from-amber-400/20 to-orange-500/10",
  language: "sql",
  tagline:
    "Learn SQL online: SELECT, WHERE, ORDER BY, LIMIT and DISTINCT with hands-on practice on a real SQLite database.",
  keywords: [
    "learn sql",
    "sql tutorial",
    "sql practice",
    "sql select where",
    "sql for beginners",
  ],
  lessons: [
    {
      slug: "select-columns",
      title: "SELECT Columns",
      blurb: "Choose which columns to return.",
      xp: 30,
      setup: PRODUCTS,
      content: `# SELECT Columns

A query starts with \`SELECT\`, then the columns you want, then \`FROM\` a table.

\`\`\`sql
SELECT name, price FROM products;
\`\`\`

We have a \`products\` table with columns:
\`id\`, \`name\`, \`category\`, \`price\`, \`stock\`.

## Your task
Select the \`name\` and \`price\` of every product.`,
      starterCode: `-- Select the name and price columns from products
`,
      solution: `SELECT name, price FROM products;`,
      tests: [{ name: "Returns name + price for all products", code: "" }],
    },
    {
      slug: "where-filter",
      title: "Filtering with WHERE",
      blurb: "Return only the rows that match.",
      xp: 35,
      setup: PRODUCTS,
      content: `# Filtering with WHERE

\`WHERE\` keeps only rows matching a condition.

\`\`\`sql
SELECT name FROM products WHERE stock > 10;
\`\`\`

## Your task
Select the \`name\` of every product that costs **less than 50**.`,
      starterCode: `-- Select names of products cheaper than 50
`,
      solution: `SELECT name FROM products WHERE price < 50;`,
      tests: [{ name: "Returns only products under 50", code: "" }],
    },
    {
      slug: "order-by",
      title: "Sorting with ORDER BY",
      blurb: "Sort the results.",
      xp: 35,
      setup: PRODUCTS,
      content: `# Sorting with ORDER BY

\`ORDER BY\` sorts rows. Add \`DESC\` for descending (highest first).

\`\`\`sql
SELECT name FROM products ORDER BY name ASC;
\`\`\`

## Your task
Select every product's \`name\`, sorted by \`price\` from **highest to lowest**.`,
      starterCode: `-- Select all names ordered by price, highest first
`,
      solution: `SELECT name FROM products ORDER BY price DESC;`,
      tests: [{ name: "Names ordered by price descending", code: "" }],
    },
    {
      slug: "limit",
      title: "LIMIT",
      blurb: "Return only the first N rows.",
      xp: 35,
      setup: PRODUCTS,
      content: `# LIMIT

\`LIMIT\` caps how many rows come back — perfect for "top N" queries when combined
with \`ORDER BY\`.

\`\`\`sql
SELECT name FROM products ORDER BY price ASC LIMIT 1;
\`\`\`

## Your task
Select the \`name\` of the **2 most expensive** products (highest price first).`,
      starterCode: `-- Select the 2 most expensive product names
`,
      solution: `SELECT name FROM products ORDER BY price DESC LIMIT 2;`,
      tests: [{ name: "Top 2 by price", code: "" }],
    },
    {
      slug: "distinct",
      title: "DISTINCT",
      blurb: "Remove duplicate values.",
      xp: 40,
      setup: PRODUCTS,
      content: `# DISTINCT

\`DISTINCT\` collapses duplicate rows so each value appears once.

\`\`\`sql
SELECT DISTINCT category FROM products;
\`\`\`

## Your task
Select each **unique** \`category\` in the products table (no duplicates).`,
      starterCode: `-- Select each unique category
`,
      solution: `SELECT DISTINCT category FROM products;`,
      tests: [{ name: "Unique categories", code: "" }],
    },
    {
      slug: "and-condition",
      title: "Combining Conditions",
      blurb: "Match multiple conditions with AND.",
      xp: 40,
      setup: PRODUCTS,
      content: `# Combining Conditions

Combine conditions with \`AND\` (both must be true) or \`OR\` (either).

\`\`\`sql
SELECT name FROM products WHERE category = 'Home' AND stock > 8;
\`\`\`

## Your task
Select the \`name\` of every product in the \`'Tech'\` category that costs
**less than 100**.`,
      starterCode: `-- Tech products cheaper than 100
`,
      solution: `SELECT name FROM products WHERE category = 'Tech' AND price < 100;`,
      tests: [{ name: "Cheap Tech products", code: "" }],
    },
  ],
};
