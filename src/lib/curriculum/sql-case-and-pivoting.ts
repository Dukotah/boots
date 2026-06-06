import type { Module } from "./types";

// SQL CASE Expressions & Conditional Aggregation
// Covers: CASE WHEN in SELECT, WHERE, ORDER BY; searched vs simple CASE;
// conditional aggregation with SUM/COUNT/AVG + CASE for manual pivoting.
// Runs in-browser via sql.js (SQLite/WASM).

const ORDERS = `
CREATE TABLE orders (
  id      INTEGER,
  customer TEXT,
  region   TEXT,
  product  TEXT,
  amount   INTEGER,
  status   TEXT,
  month    TEXT
);
INSERT INTO orders VALUES (1,  'Alice',  'North', 'Widget', 120, 'completed',  '2024-01');
INSERT INTO orders VALUES (2,  'Bob',    'South', 'Gadget', 200, 'completed',  '2024-01');
INSERT INTO orders VALUES (3,  'Carol',  'North', 'Widget', 80,  'cancelled',  '2024-01');
INSERT INTO orders VALUES (4,  'Alice',  'South', 'Gadget', 350, 'completed',  '2024-02');
INSERT INTO orders VALUES (5,  'Bob',    'North', 'Widget', 60,  'pending',    '2024-02');
INSERT INTO orders VALUES (6,  'Carol',  'South', 'Widget', 90,  'completed',  '2024-02');
INSERT INTO orders VALUES (7,  'David',  'North', 'Gadget', 410, 'completed',  '2024-03');
INSERT INTO orders VALUES (8,  'Alice',  'South', 'Widget', 70,  'cancelled',  '2024-03');
INSERT INTO orders VALUES (9,  'Bob',    'North', 'Gadget', 310, 'completed',  '2024-03');
INSERT INTO orders VALUES (10, 'Carol',  'South', 'Widget', 50,  'pending',    '2024-03');
INSERT INTO orders VALUES (11, 'David',  'North', 'Widget', 130, 'completed',  '2024-01');
INSERT INTO orders VALUES (12, 'Alice',  'South', 'Gadget', 260, 'completed',  '2024-02');
`;

export const sqlCaseAndPivoting: Module = {
  slug: "sql-case-and-pivoting",
  title: "CASE Expressions & Conditional Aggregation",
  description:
    "Write CASE WHEN logic directly inside SELECT, WHERE, and aggregates — and pivot rows into columns without a pivot operator. A gap on most free platforms, critical for real-world reporting.",
  emoji: "🔀",
  gradient: "from-amber-400/20 to-orange-500/10",
  language: "sql",
  tagline:
    "Master SQL CASE WHEN, searched vs simple CASE, and conditional aggregation (SUM/COUNT/AVG with CASE) for pivoting and reporting.",
  keywords: [
    "sql case when",
    "sql conditional aggregation",
    "sql pivot",
    "sql case in select",
    "sql sum case when",
    "sql count case when",
    "sql reporting queries",
  ],
  lessons: [
    // ── Lesson 1: Simple CASE in SELECT ──────────────────────────────────────
    {
      slug: "case-in-select",
      title: "CASE WHEN in SELECT",
      blurb: "Add an if/else column to any query without changing the table.",
      xp: 25,
      language: "sql",
      setup: ORDERS,
      content: `# CASE WHEN in SELECT

\`CASE WHEN\` is SQL's if/else. You can drop it anywhere an expression is valid —
most commonly in \`SELECT\` to derive a new column on the fly.

\`\`\`sql
SELECT name,
       CASE WHEN score >= 90 THEN 'A'
            WHEN score >= 80 THEN 'B'
            ELSE 'C'
       END AS grade
FROM students;
\`\`\`

Key points:
- Conditions are tested **top-to-bottom**; the first match wins.
- \`ELSE\` is optional — omitting it returns \`NULL\` when nothing matches.
- The whole block ends with \`END\`, and you \`AS\` it like any column.

## Your task
Query the \`orders\` table. Return \`id\`, \`amount\`, and a new column \`size_tier\`:
- \`'large'\` when \`amount >= 300\`
- \`'medium'\` when \`amount >= 100\`
- \`'small'\` otherwise

Order by \`id\`.

Table: \`orders(id, customer, region, product, amount, status, month)\``,
      starterCode: `-- return id, amount, and size_tier (large/medium/small)
`,
      solution: `SELECT id,
       amount,
       CASE WHEN amount >= 300 THEN 'large'
            WHEN amount >= 100 THEN 'medium'
            ELSE 'small'
       END AS size_tier
FROM orders
ORDER BY id;`,
      tests: [{ name: "Correct size_tier for all rows", code: "" }],
      hints: [
        "Start with SELECT id, amount, CASE WHEN ...",
        "Put the largest threshold first — CASE stops at the first true condition.",
        "Don't forget END AS size_tier and ORDER BY id.",
      ],
    },

    // ── Lesson 2: Simple (equality) CASE ─────────────────────────────────────
    {
      slug: "simple-case",
      title: "Simple CASE (equality shorthand)",
      blurb: "Match one column against fixed values without repeating the column name.",
      xp: 20,
      language: "sql",
      setup: ORDERS,
      content: `# Simple CASE — equality shorthand

When every branch tests the **same column for equality**, you can use the
compact *simple CASE* form:

\`\`\`sql
CASE status
  WHEN 'active'   THEN 'Active'
  WHEN 'inactive' THEN 'Archived'
  ELSE 'Unknown'
END
\`\`\`

This is identical to the *searched CASE* below, just less typing:

\`\`\`sql
CASE WHEN status = 'active'   THEN 'Active'
     WHEN status = 'inactive' THEN 'Archived'
     ELSE 'Unknown'
END
\`\`\`

Use searched CASE when you need ranges (\`>=\`, \`LIKE\`, \`AND\`, etc.).

## Your task
Return \`id\`, \`status\`, and a column \`status_label\`:
- \`'completed'\` → \`'Done'\`
- \`'cancelled'\` → \`'Cancelled'\`
- \`'pending'\` → \`'In Progress'\`

Order by \`id\`.`,
      starterCode: `-- return id, status, and status_label using simple CASE
`,
      solution: `SELECT id,
       status,
       CASE status
         WHEN 'completed' THEN 'Done'
         WHEN 'cancelled' THEN 'Cancelled'
         WHEN 'pending'   THEN 'In Progress'
       END AS status_label
FROM orders
ORDER BY id;`,
      tests: [{ name: "Correct status_label for each status value", code: "" }],
      hints: [
        "CASE status WHEN 'completed' THEN 'Done' ...",
        "No ELSE needed here because all three values are covered.",
      ],
    },

    // ── Lesson 3: CASE in ORDER BY ────────────────────────────────────────────
    {
      slug: "case-in-order-by",
      title: "CASE in ORDER BY",
      blurb: "Control sort priority with custom logic instead of alphabetical order.",
      xp: 30,
      language: "sql",
      setup: ORDERS,
      content: `# CASE in ORDER BY

You can use \`CASE\` inside \`ORDER BY\` to sort rows in any custom sequence —
great when alphabetical order is wrong for your domain.

\`\`\`sql
SELECT id, status
FROM orders
ORDER BY CASE status
           WHEN 'pending'   THEN 1
           WHEN 'completed' THEN 2
           WHEN 'cancelled' THEN 3
         END;
\`\`\`

This sorts pending first, then completed, then cancelled — ignoring
the alphabetical default.

## Your task
Return \`id\`, \`amount\`, and \`status\` from \`orders\`, sorted by **status priority**:
1. \`'pending'\` first
2. \`'completed'\` second
3. \`'cancelled'\` last

Within the same priority group, sort by \`id\` ascending.`,
      starterCode: `-- sort by custom status priority, then id
`,
      solution: `SELECT id, amount, status
FROM orders
ORDER BY CASE status
           WHEN 'pending'   THEN 1
           WHEN 'completed' THEN 2
           WHEN 'cancelled' THEN 3
         END,
         id;`,
      tests: [{ name: "Rows sorted pending → completed → cancelled, then by id", code: "" }],
      hints: [
        "Put the CASE expression directly after ORDER BY.",
        "Add a second sort key: , id after the CASE...END block.",
      ],
    },

    // ── Lesson 4: Conditional COUNT ───────────────────────────────────────────
    {
      slug: "conditional-count",
      title: "Conditional COUNT",
      blurb: "Count only the rows that match a condition, in a single pass.",
      xp: 35,
      language: "sql",
      setup: ORDERS,
      content: `# Conditional COUNT

Wrapping a \`CASE\` inside \`COUNT\` lets you tally only the rows that satisfy a
condition — no sub-query required.

The trick: return a non-NULL value when the condition is true, \`NULL\` when
false.  \`COUNT\` ignores \`NULL\`s, so it only counts the matching rows.

\`\`\`sql
SELECT
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_count
FROM orders;
\`\`\`

You can combine multiple conditional counts in one \`SELECT\`:

\`\`\`sql
SELECT
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled
FROM orders;
\`\`\`

## Your task
Return a single row with three columns:
- \`completed\` — number of completed orders
- \`cancelled\` — number of cancelled orders
- \`pending\` — number of pending orders`,
      starterCode: `-- count orders by status in one row using conditional COUNT
`,
      solution: `SELECT
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled,
  COUNT(CASE WHEN status = 'pending'   THEN 1 END) AS pending
FROM orders;`,
      tests: [{ name: "Single row with completed=8, cancelled=2, pending=2", code: "" }],
      hints: [
        "COUNT(CASE WHEN status = 'completed' THEN 1 END) counts only completed rows.",
        "Repeat the pattern for each status in the same SELECT.",
        "No GROUP BY needed — this collapses the entire table to one summary row.",
      ],
    },

    // ── Lesson 5: Conditional SUM ─────────────────────────────────────────────
    {
      slug: "conditional-sum",
      title: "Conditional SUM",
      blurb: "Sum only the values that match a filter — the workhorse of reporting.",
      xp: 40,
      language: "sql",
      setup: ORDERS,
      content: `# Conditional SUM

\`SUM(CASE WHEN ... THEN value END)\` sums only the rows where the condition is
true.  Rows that don't match contribute \`NULL\`, which \`SUM\` skips.

\`\`\`sql
SELECT
  SUM(CASE WHEN region = 'North' THEN amount END) AS north_revenue,
  SUM(CASE WHEN region = 'South' THEN amount END) AS south_revenue
FROM orders;
\`\`\`

This is the foundation of **manual pivoting** — turning distinct values in one
column into separate aggregated columns.

## Your task
Return a single row with:
- \`widget_revenue\` — total \`amount\` for \`product = 'Widget'\`
- \`gadget_revenue\` — total \`amount\` for \`product = 'Gadget'\`

Only count orders where \`status = 'completed'\`.`,
      starterCode: `-- conditional SUM for Widget and Gadget revenue (completed orders only)
`,
      solution: `SELECT
  SUM(CASE WHEN product = 'Widget' AND status = 'completed' THEN amount END) AS widget_revenue,
  SUM(CASE WHEN product = 'Gadget' AND status = 'completed' THEN amount END) AS gadget_revenue
FROM orders;`,
      tests: [
        { name: "widget_revenue = 340, gadget_revenue = 1530", code: "" },
      ],
      hints: [
        "SUM(CASE WHEN product = 'Widget' AND status = 'completed' THEN amount END)",
        "Add the status filter inside the same CASE condition with AND.",
      ],
    },

    // ── Lesson 6: Pivot rows into columns ─────────────────────────────────────
    {
      slug: "pivot-by-month",
      title: "Pivot: Month Columns",
      blurb: "Turn a month column into three side-by-side revenue columns.",
      xp: 45,
      language: "sql",
      setup: ORDERS,
      content: `# Pivot: Month Columns

A **pivot** transforms distinct row values (like months) into columns.
SQLite has no \`PIVOT\` keyword — we build it with conditional \`SUM\`:

\`\`\`sql
SELECT
  region,
  SUM(CASE WHEN month = '2024-01' THEN amount END) AS jan,
  SUM(CASE WHEN month = '2024-02' THEN amount END) AS feb,
  SUM(CASE WHEN month = '2024-03' THEN amount END) AS mar
FROM orders
GROUP BY region;
\`\`\`

Each \`SUM(CASE ...)\` only accumulates the rows for that month; other rows
contribute \`NULL\` (which \`SUM\` ignores).

## Your task
Pivot \`orders\` by month for **completed orders only**.

Return one row per \`region\` with columns:
- \`region\`
- \`jan\` — total amount for \`month = '2024-01'\`
- \`feb\` — total amount for \`month = '2024-02'\`
- \`mar\` — total amount for \`month = '2024-03'\`

Order by \`region\`.`,
      starterCode: `-- pivot completed-order revenue by month, one row per region
`,
      solution: `SELECT
  region,
  SUM(CASE WHEN month = '2024-01' AND status = 'completed' THEN amount END) AS jan,
  SUM(CASE WHEN month = '2024-02' AND status = 'completed' THEN amount END) AS feb,
  SUM(CASE WHEN month = '2024-03' AND status = 'completed' THEN amount END) AS mar
FROM orders
GROUP BY region
ORDER BY region;`,
      tests: [
        { name: "North row: jan=250, feb=NULL (no completed in Feb North), mar=720", code: "" },
        { name: "South row: jan=200, feb=700, mar=NULL (no completed in Mar South)", code: "" },
      ],
      hints: [
        "Add AND status = 'completed' inside each CASE condition.",
        "GROUP BY region to get one row per region.",
        "Use ORDER BY region at the end.",
      ],
    },

    // ── Lesson 7: Conditional AVG ─────────────────────────────────────────────
    {
      slug: "conditional-avg",
      title: "Conditional AVG",
      blurb: "Average only a subset of rows without a WHERE clause.",
      xp: 35,
      language: "sql",
      setup: ORDERS,
      content: `# Conditional AVG

\`AVG(CASE WHEN ... THEN value END)\` averages only the rows matching the
condition.  Non-matching rows return \`NULL\`, which \`AVG\` excludes from both
the sum *and* the count — so the denominator is only matching rows.

\`\`\`sql
SELECT
  AVG(CASE WHEN region = 'North' THEN amount END) AS avg_north,
  AVG(CASE WHEN region = 'South' THEN amount END) AS avg_south
FROM orders;
\`\`\`

This avoids a \`WHERE\` clause, letting you compute multiple conditional
averages in a single scan.

## Your task
Return one row with:
- \`avg_completed\` — average \`amount\` for completed orders
- \`avg_cancelled\` — average \`amount\` for cancelled orders

Round both values to 2 decimal places using \`ROUND(..., 2)\`.`,
      starterCode: `-- average amount for completed vs cancelled orders, rounded to 2 dp
`,
      solution: `SELECT
  ROUND(AVG(CASE WHEN status = 'completed' THEN amount END), 2) AS avg_completed,
  ROUND(AVG(CASE WHEN status = 'cancelled' THEN amount END), 2) AS avg_cancelled
FROM orders;`,
      tests: [
        { name: "avg_completed matches total/count of completed rows", code: "" },
        { name: "avg_cancelled matches total/count of cancelled rows", code: "" },
      ],
      hints: [
        "Wrap the whole AVG(CASE...) in ROUND(..., 2).",
        "AVG automatically ignores NULLs, so non-matching rows don't skew the result.",
      ],
    },

    // ── Lesson 8: CASE inside WHERE (via HAVING) ──────────────────────────────
    {
      slug: "case-in-having",
      title: "CASE in HAVING",
      blurb: "Filter aggregated groups using conditional logic in HAVING.",
      xp: 40,
      language: "sql",
      setup: ORDERS,
      content: `# CASE in HAVING

\`CASE\` can appear inside \`HAVING\` to express complex post-aggregation filters.

Example — only keep customers whose top single order is a large order:

\`\`\`sql
SELECT customer, MAX(amount) AS best
FROM orders
GROUP BY customer
HAVING CASE WHEN MAX(amount) >= 300 THEN 1 ELSE 0 END = 1;
\`\`\`

This is equivalent to \`HAVING MAX(amount) >= 300\` but demonstrates the
pattern.  It becomes useful when the condition involves multiple aggregates
or complex branching.

## Your task
Return each \`customer\` and their \`total_revenue\` (sum of all their \`amount\`
values), but **only for customers whose total revenue exceeds 400**.

Use \`HAVING\` with a \`CASE\` expression to apply this filter.

Order by \`total_revenue\` descending.`,
      starterCode: `-- customers with total revenue > 400, filtered via HAVING CASE
`,
      solution: `SELECT customer,
       SUM(amount) AS total_revenue
FROM orders
GROUP BY customer
HAVING CASE WHEN SUM(amount) > 400 THEN 1 ELSE 0 END = 1
ORDER BY total_revenue DESC;`,
      tests: [
        { name: "Only customers with total_revenue > 400 appear", code: "" },
        { name: "Rows ordered by total_revenue descending", code: "" },
      ],
      hints: [
        "GROUP BY customer, then SUM(amount) AS total_revenue.",
        "HAVING CASE WHEN SUM(amount) > 400 THEN 1 ELSE 0 END = 1",
        "Add ORDER BY total_revenue DESC at the end.",
      ],
    },

    // ── Lesson 9: Quiz — Putting it all together ──────────────────────────────
    {
      slug: "case-quiz",
      title: "CASE & Pivoting: Concept Check",
      blurb: "Solidify your understanding before moving on.",
      xp: 30,
      kind: "quiz",
      content: `# CASE & Pivoting: Concept Check

You've covered all the major patterns:

- **Searched CASE** (\`CASE WHEN condition THEN ...\`) for ranges and complex logic
- **Simple CASE** (\`CASE column WHEN value THEN ...\`) for equality matching
- **CASE in ORDER BY** for custom sort sequences
- **Conditional COUNT / SUM / AVG** for single-scan multi-group aggregation
- **Manual pivot** using \`GROUP BY\` + conditional \`SUM\`
- **CASE in HAVING** for complex post-aggregation filters

Answer these questions to lock in the concepts.`,
      questions: [
        {
          prompt:
            "You want to sum sales amounts separately for each region in a **single row** (no GROUP BY). Which pattern achieves this?",
          options: [
            "WHERE region = 'North' UNION ALL WHERE region = 'South'",
            "SUM(CASE WHEN region = 'North' THEN amount END) AS north, SUM(CASE WHEN region = 'South' THEN amount END) AS south",
            "GROUP BY region",
          ],
          answer: 1,
          explanation:
            "Conditional SUM using CASE inside the aggregate is the correct single-scan pivot technique. GROUP BY produces multiple rows; UNION ALL requires multiple queries.",
        },
        {
          prompt:
            "In a searched CASE expression, what happens when **no** WHEN condition matches and there is no ELSE clause?",
          options: [
            "The query throws an error",
            "The row is excluded from results",
            "The expression returns NULL",
          ],
          answer: 2,
          explanation:
            "A CASE expression with no matching branch and no ELSE returns NULL — it never errors or silently drops the row.",
        },
        {
          prompt:
            "You write: `COUNT(CASE WHEN status = 'active' THEN 1 END)`. Why does this count only active rows?",
          options: [
            "COUNT skips rows where the CASE returns 1",
            "COUNT ignores NULL values, and the CASE returns NULL for non-active rows",
            "COUNT always applies a hidden filter based on CASE",
          ],
          answer: 1,
          explanation:
            "When the condition is false, the CASE returns NULL (no ELSE). COUNT ignores NULLs, so only the rows that return 1 are counted.",
        },
        {
          prompt:
            "Which CASE form is most appropriate for: checking whether `amount` is `< 100`, `100–299`, or `>= 300`?",
          options: [
            "Simple CASE: CASE amount WHEN < 100 THEN ...",
            "Searched CASE: CASE WHEN amount < 100 THEN ...",
            "Either form works identically for range checks",
          ],
          answer: 1,
          explanation:
            "Simple CASE only supports equality checks. Range comparisons (< , >=) require the searched CASE form with full boolean expressions.",
        },
      ],
    },
  ],
};
