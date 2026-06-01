import type { Module } from "./types";

// SQL Joins & Aggregation — runs in-browser via sql.js (SQLite/WASM). Graded by
// comparing the student query's result set to the reference solution.
const STORE = `
CREATE TABLE customers (id INTEGER, name TEXT);
INSERT INTO customers VALUES (1, 'Ada');
INSERT INTO customers VALUES (2, 'Linus');
INSERT INTO customers VALUES (3, 'Grace');

CREATE TABLE orders (id INTEGER, customer_id INTEGER, amount INTEGER);
INSERT INTO orders VALUES (1, 1, 50);
INSERT INTO orders VALUES (2, 1, 30);
INSERT INTO orders VALUES (3, 2, 100);
INSERT INTO orders VALUES (4, 3, 70);
INSERT INTO orders VALUES (5, 1, 20);
`;

export const sqlJoins: Module = {
  slug: "sql-joins",
  title: "SQL Joins & Aggregation",
  description:
    "Combine tables with JOIN and crunch numbers with COUNT, SUM, and GROUP BY. The skills that turn raw tables into real answers.",
  emoji: "🔗",
  gradient: "from-orange-400/20 to-rose-500/10",
  language: "sql",
  tagline:
    "Learn SQL JOINs and aggregation — INNER JOIN, COUNT, SUM, GROUP BY and HAVING — with interactive practice.",
  keywords: [
    "sql joins",
    "sql inner join",
    "sql group by",
    "sql aggregation",
    "learn sql",
  ],
  lessons: [
    {
      slug: "inner-join",
      title: "INNER JOIN",
      blurb: "Combine rows from two tables.",
      xp: 45,
      setup: STORE,
      content: `# INNER JOIN

A \`JOIN\` matches rows across tables using a shared key. Here \`orders.customer_id\`
points at \`customers.id\`.

\`\`\`sql
SELECT customers.name, orders.amount
FROM orders
JOIN customers ON customers.id = orders.customer_id;
\`\`\`

Tables: \`customers(id, name)\` and \`orders(id, customer_id, amount)\`.

## Your task
Return each order's customer \`name\` alongside its \`amount\` by joining the two
tables.`,
      starterCode: `-- Join orders to customers; return name and amount
`,
      solution: `SELECT customers.name, orders.amount
FROM orders
JOIN customers ON customers.id = orders.customer_id;`,
      tests: [{ name: "Name + amount per order", code: "" }],
    },
    {
      slug: "count",
      title: "COUNT",
      blurb: "Count the rows.",
      xp: 35,
      setup: STORE,
      content: `# COUNT

Aggregate functions reduce many rows to one number. \`COUNT(*)\` counts rows.

\`\`\`sql
SELECT COUNT(*) AS n FROM customers;
\`\`\`

## Your task
Return the total number of orders as a column named \`n\`.`,
      starterCode: `-- Count all orders as n
`,
      solution: `SELECT COUNT(*) AS n FROM orders;`,
      tests: [{ name: "Total order count", code: "" }],
    },
    {
      slug: "sum",
      title: "SUM",
      blurb: "Add up a column.",
      xp: 35,
      setup: STORE,
      content: `# SUM

\`SUM(column)\` totals a numeric column.

\`\`\`sql
SELECT SUM(amount) AS total FROM orders;
\`\`\`

## Your task
Return the total of all order \`amount\`s as a column named \`total\`.`,
      starterCode: `-- Sum all order amounts as total
`,
      solution: `SELECT SUM(amount) AS total FROM orders;`,
      tests: [{ name: "Sum of amounts", code: "" }],
    },
    {
      slug: "group-by",
      title: "GROUP BY",
      blurb: "Aggregate per group.",
      xp: 50,
      setup: STORE,
      content: `# GROUP BY

\`GROUP BY\` runs an aggregate **per group** instead of over the whole table.

\`\`\`sql
SELECT customer_id, SUM(amount) AS total
FROM orders
GROUP BY customer_id;
\`\`\`

## Your task
Return each \`customer_id\` and how many orders they placed as a column named
\`orders\`, sorted by \`customer_id\` ascending.`,
      starterCode: `-- Orders per customer_id, sorted by customer_id
`,
      solution: `SELECT customer_id, COUNT(*) AS orders
FROM orders
GROUP BY customer_id
ORDER BY customer_id;`,
      tests: [{ name: "Order count per customer", code: "" }],
    },
    {
      slug: "join-group-sum",
      title: "Join + Group + Sum",
      blurb: "Total spend per customer name.",
      xp: 55,
      setup: STORE,
      content: `# Join + Group + Sum

Real queries combine techniques: join to get names, group to aggregate, order to
rank.

\`\`\`sql
SELECT customers.name, COUNT(*) AS orders
FROM orders
JOIN customers ON customers.id = orders.customer_id
GROUP BY customers.name;
\`\`\`

## Your task
Return each customer's \`name\` and their total spend as \`spent\`, highest spender
first.`,
      starterCode: `-- Total spend per customer name, biggest spender first
`,
      solution: `SELECT customers.name, SUM(orders.amount) AS spent
FROM orders
JOIN customers ON customers.id = orders.customer_id
GROUP BY customers.name
ORDER BY spent DESC;`,
      tests: [{ name: "Spend per customer, ranked", code: "" }],
    },
    {
      slug: "having",
      title: "HAVING",
      blurb: "Filter groups after aggregating.",
      xp: 55,
      setup: STORE,
      content: `# HAVING

\`WHERE\` filters rows before grouping; \`HAVING\` filters **groups** after
aggregating.

\`\`\`sql
SELECT customer_id, COUNT(*) AS n
FROM orders
GROUP BY customer_id
HAVING COUNT(*) >= 1;
\`\`\`

## Your task
Return the \`customer_id\` of every customer who placed **more than one** order,
sorted by \`customer_id\` ascending.`,
      starterCode: `-- customer_ids with more than one order
`,
      solution: `SELECT customer_id
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY customer_id;`,
      tests: [{ name: "Repeat customers", code: "" }],
    },
  ],
};
