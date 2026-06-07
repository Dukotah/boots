import type { Module } from "./types";

// Portfolio SQL — five standalone project lessons that produce real, shareable
// SQL queries. Runs in-browser via sql.js (SQLite/WASM). Graded by comparing the
// student's result set to the reference solution run on the same seeded database.

const SALES_DB = `
CREATE TABLE products (id INTEGER, name TEXT, category TEXT, price REAL);
INSERT INTO products VALUES (1, 'Laptop',    'Electronics', 999.00);
INSERT INTO products VALUES (2, 'Mouse',     'Electronics',  29.99);
INSERT INTO products VALUES (3, 'Desk',      'Furniture',   349.00);
INSERT INTO products VALUES (4, 'Chair',     'Furniture',   199.00);
INSERT INTO products VALUES (5, 'Monitor',   'Electronics', 399.00);
INSERT INTO products VALUES (6, 'Bookshelf', 'Furniture',   149.00);
INSERT INTO products VALUES (7, 'Keyboard',  'Electronics',  79.99);
INSERT INTO products VALUES (8, 'Lamp',      'Furniture',    49.99);

CREATE TABLE customers (id INTEGER, name TEXT, city TEXT);
INSERT INTO customers VALUES (1, 'Ada',     'Seattle');
INSERT INTO customers VALUES (2, 'Linus',   'Portland');
INSERT INTO customers VALUES (3, 'Grace',   'Seattle');
INSERT INTO customers VALUES (4, 'Alan',    'Denver');
INSERT INTO customers VALUES (5, 'Barbara', 'Portland');

CREATE TABLE orders (id INTEGER, customer_id INTEGER, product_id INTEGER, quantity INTEGER, order_date TEXT);
INSERT INTO orders VALUES (1,  1, 1, 1, '2024-01-05');
INSERT INTO orders VALUES (2,  1, 2, 2, '2024-01-10');
INSERT INTO orders VALUES (3,  2, 3, 1, '2024-01-12');
INSERT INTO orders VALUES (4,  3, 5, 1, '2024-01-15');
INSERT INTO orders VALUES (5,  1, 5, 1, '2024-02-01');
INSERT INTO orders VALUES (6,  4, 4, 2, '2024-02-03');
INSERT INTO orders VALUES (7,  2, 7, 1, '2024-02-10');
INSERT INTO orders VALUES (8,  5, 6, 1, '2024-02-14');
INSERT INTO orders VALUES (9,  3, 2, 3, '2024-02-20');
INSERT INTO orders VALUES (10, 4, 8, 2, '2024-03-01');
INSERT INTO orders VALUES (11, 1, 3, 1, '2024-03-05');
INSERT INTO orders VALUES (12, 5, 1, 1, '2024-03-10');
`;

const LIBRARY_DB = `
CREATE TABLE books (id INTEGER, title TEXT, author TEXT, genre TEXT, year INTEGER);
INSERT INTO books VALUES (1, 'Clean Code',          'Robert Martin',  'Tech',    2008);
INSERT INTO books VALUES (2, 'The Pragmatic Programmer', 'David Thomas', 'Tech', 1999);
INSERT INTO books VALUES (3, 'Dune',                'Frank Herbert',  'Sci-Fi',  1965);
INSERT INTO books VALUES (4, 'Foundation',          'Isaac Asimov',   'Sci-Fi',  1951);
INSERT INTO books VALUES (5, 'Sapiens',             'Yuval Harari',   'History', 2011);
INSERT INTO books VALUES (6, 'The Lean Startup',    'Eric Ries',      'Tech',    2011);
INSERT INTO books VALUES (7, 'Neuromancer',         'William Gibson', 'Sci-Fi',  1984);
INSERT INTO books VALUES (8, 'Thinking Fast Slow',  'Daniel Kahneman','History', 2011);

CREATE TABLE members (id INTEGER, name TEXT, city TEXT);
INSERT INTO members VALUES (1, 'Ada',   'Seattle');
INSERT INTO members VALUES (2, 'Grace', 'Portland');
INSERT INTO members VALUES (3, 'Alan',  'Seattle');
INSERT INTO members VALUES (4, 'Linus', 'Denver');

CREATE TABLE loans (id INTEGER, member_id INTEGER, book_id INTEGER, loan_date TEXT, return_date TEXT);
INSERT INTO loans VALUES (1, 1, 1, '2024-01-01', '2024-01-15');
INSERT INTO loans VALUES (2, 1, 3, '2024-01-16', NULL);
INSERT INTO loans VALUES (3, 2, 2, '2024-01-05', '2024-01-20');
INSERT INTO loans VALUES (4, 2, 5, '2024-02-01', NULL);
INSERT INTO loans VALUES (5, 3, 3, '2024-01-10', '2024-01-25');
INSERT INTO loans VALUES (6, 3, 7, '2024-02-05', NULL);
INSERT INTO loans VALUES (7, 4, 4, '2024-02-10', '2024-02-28');
INSERT INTO loans VALUES (8, 1, 2, '2024-03-01', NULL);
`;

export const portfolioSql: Module = {
  slug: "portfolio-sql",
  title: "SQL Projects",
  description:
    "Write five real SQL queries you can demo in interviews: a sales report, top customers, running totals, a library schema explorer, and a duplicate finder. All run in your browser against a live SQLite database.",
  emoji: "🗄️",
  gradient: "from-blue-400/20 to-indigo-500/10",
  language: "sql",
  tagline:
    "Build real SQL portfolio queries: sales reports, top customers, running totals, library schema, and duplicate detection.",
  keywords: [
    "sql portfolio project",
    "sql sales report",
    "sql window functions",
    "sql running total",
    "sql interview queries",
  ],
  lessons: [
    {
      slug: "sales-report",
      title: "Sales Report by Category",
      blurb: "Aggregate revenue and units sold per product category.",
      xp: 40,
      setup: SALES_DB,
      content: `# Sales Report by Category

## What you're building

The classic first analytics query: a revenue summary grouped by category — the backbone of every sales dashboard.

## Requirements

Join \`orders\` to \`products\` and return, for each \`category\`:
- \`category\` — the product category
- \`total_revenue\` — \`SUM(price * quantity)\` across all orders in that category
- \`units_sold\` — \`SUM(quantity)\`

Order results by \`total_revenue\` descending.

Tables: \`products(id, name, category, price)\` · \`orders(id, customer_id, product_id, quantity, order_date)\`

## Stretch goals

- Add a \`ROUND(total_revenue, 2)\` to tidy the output.
- Filter to a single month using \`WHERE order_date LIKE '2024-01%'\`.

## What this proves

Every analytics interview includes a GROUP BY + JOIN question. This is the canonical form.`,
      starterCode: `-- Sales report: category, total_revenue, units_sold
-- ORDER BY total_revenue DESC
`,
      solution: `SELECT
  p.category,
  SUM(p.price * o.quantity) AS total_revenue,
  SUM(o.quantity) AS units_sold
FROM orders o
JOIN products p ON p.id = o.product_id
GROUP BY p.category
ORDER BY total_revenue DESC;`,
      tests: [{ name: "Revenue and units per category, high to low", code: "" }],
    },
    {
      slug: "top-customers",
      title: "Top Customers",
      blurb: "Rank customers by total spend.",
      xp: 40,
      setup: SALES_DB,
      content: `# Top Customers

## What you're building

A leaderboard of customers ranked by how much they've spent — used in CRM dashboards, loyalty programs, and churn analysis.

## Requirements

Join \`orders\`, \`products\`, and \`customers\`. Return:
- \`name\` — customer name
- \`total_spent\` — total money spent (price × quantity summed)
- \`order_count\` — number of orders placed

Order by \`total_spent\` descending. Include all customers who placed at least one order.

Tables: \`customers(id, name, city)\` · \`orders(id, customer_id, product_id, quantity)\` · \`products(id, price)\`

## Stretch goals

- Show only the top 3 with \`LIMIT 3\`.
- Add \`city\` to the output so you can see geographic patterns.

## What this proves

Multi-table joins, aggregation, and ranking — the exact triad tested in SQL screens at every tech company.`,
      starterCode: `-- Top customers: name, total_spent, order_count
-- ORDER BY total_spent DESC
`,
      solution: `SELECT
  c.name,
  SUM(p.price * o.quantity) AS total_spent,
  COUNT(o.id) AS order_count
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN products p ON p.id = o.product_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;`,
      tests: [{ name: "Customers ranked by total spend", code: "" }],
    },
    {
      slug: "running-totals",
      title: "Running Totals",
      blurb: "Compute a cumulative revenue total with a window function.",
      xp: 60,
      setup: SALES_DB,
      content: `# Running Totals

## What you're building

A running (cumulative) total of revenue by order date — essential for trend charts and financial reports.

## Requirements

Return, for each order (by \`order_date\`):
- \`order_date\`
- \`daily_revenue\` — revenue on that date (\`SUM(price * quantity)\` per date)
- \`running_total\` — cumulative revenue up to and including that date

Use a window function:

\`\`\`sql
SUM(daily_revenue) OVER (ORDER BY order_date) AS running_total
\`\`\`

Order the final output by \`order_date\` ascending.

Tables: \`orders(id, customer_id, product_id, quantity, order_date)\` · \`products(id, price)\`

## Stretch goals

- Add a 7-day rolling average using \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\`.
- Partition by month to restart the running total each month.

## What this proves

Window functions separate junior from mid-level SQL skills. A running total is the first window function every analyst learns.`,
      starterCode: `-- Running total of revenue by order_date
-- Columns: order_date, daily_revenue, running_total
`,
      solution: `WITH daily AS (
  SELECT
    o.order_date,
    SUM(p.price * o.quantity) AS daily_revenue
  FROM orders o
  JOIN products p ON p.id = o.product_id
  GROUP BY o.order_date
)
SELECT
  order_date,
  daily_revenue,
  SUM(daily_revenue) OVER (ORDER BY order_date) AS running_total
FROM daily
ORDER BY order_date;`,
      tests: [{ name: "Daily revenue with cumulative running total", code: "" }],
    },
    {
      slug: "library-schema",
      title: "Library Schema Explorer",
      blurb: "Query a multi-table library database to find overdue books.",
      xp: 50,
      setup: LIBRARY_DB,
      content: `# Library Schema Explorer

## What you're building

A query that identifies currently overdue loans — books that were borrowed but never returned. The kind of report a librarian runs every morning.

## Requirements

Return a list of currently active loans (where \`return_date IS NULL\`) with:
- \`member_name\` — the borrowing member's name
- \`book_title\` — the book's title
- \`genre\` — the book's genre
- \`loan_date\` — when it was checked out

Order by \`loan_date\` ascending (oldest loans first).

Tables: \`members(id, name, city)\` · \`books(id, title, author, genre, year)\` · \`loans(id, member_id, book_id, loan_date, return_date)\`

## Stretch goals

- Add a count of how many books each member currently has out.
- Filter to only \`'Sci-Fi'\` books still on loan.

## What this proves

NULL handling, multi-table joins, and real-world schema reasoning — skills that show up in every backend and data role.`,
      starterCode: `-- Active loans: member_name, book_title, genre, loan_date
-- WHERE return_date IS NULL, ORDER BY loan_date ASC
`,
      solution: `SELECT
  m.name  AS member_name,
  b.title AS book_title,
  b.genre,
  l.loan_date
FROM loans l
JOIN members m ON m.id = l.member_id
JOIN books   b ON b.id = l.book_id
WHERE l.return_date IS NULL
ORDER BY l.loan_date ASC;`,
      tests: [{ name: "Unreturned books with member and title, oldest first", code: "" }],
    },
    {
      slug: "find-duplicates",
      title: "Find Duplicates",
      blurb: "Detect members who borrowed the same book more than once.",
      xp: 60,
      setup: LIBRARY_DB,
      content: `# Find Duplicates

## What you're building

A query that finds members who borrowed the same book more than once — duplicate detection is a classic data-quality problem that shows up in analytics, ETL, and fraud detection.

## Requirements

Return rows from \`loans\` where the same \`member_id\` borrowed the same \`book_id\` on multiple occasions. Show:
- \`member_name\`
- \`book_title\`
- \`borrow_count\` — how many times that member borrowed that book

Only include pairs with \`borrow_count > 1\`. Order by \`borrow_count\` descending.

Tables: \`members(id, name)\` · \`books(id, title)\` · \`loans(id, member_id, book_id, loan_date, return_date)\`

Hint: \`GROUP BY member_id, book_id\` then \`HAVING COUNT(*) > 1\`.

## Stretch goals

- List all loan dates for each duplicate pair using \`GROUP_CONCAT(loan_date)\`.
- Extend to find any member who has more than 2 active loans at once.

## What this proves

HAVING-filtered aggregation for duplicate detection — a pattern that recurs in data engineering interviews, fraud analytics, and database health checks.`,
      starterCode: `-- Find member+book pairs borrowed more than once
-- Columns: member_name, book_title, borrow_count
-- ORDER BY borrow_count DESC
`,
      solution: `SELECT
  m.name  AS member_name,
  b.title AS book_title,
  COUNT(*) AS borrow_count
FROM loans l
JOIN members m ON m.id = l.member_id
JOIN books   b ON b.id = l.book_id
GROUP BY l.member_id, l.book_id, m.name, b.title
HAVING COUNT(*) > 1
ORDER BY borrow_count DESC;`,
      tests: [{ name: "Member-book pairs borrowed more than once", code: "" }],
    },
  ],
};
