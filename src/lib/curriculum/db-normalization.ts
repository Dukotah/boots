import type { Module } from "./types";

// Database Normalization — 1NF, 2NF, 3NF.
// Runs in-browser via sql.js (SQLite/WASM).
// Students actively decompose denormalized tables through each normal form
// and verify results with runnable SQL queries.

const RAW_ORDERS = `
CREATE TABLE orders_raw (
  order_id    INTEGER,
  customer    TEXT,
  city        TEXT,
  zip         TEXT,
  items       TEXT,
  total       INTEGER
);
INSERT INTO orders_raw VALUES (1, 'Alice', 'Portland', '97201', 'Widget,Gadget', 75);
INSERT INTO orders_raw VALUES (2, 'Bob',   'Salem',    '97301', 'Widget',        30);
INSERT INTO orders_raw VALUES (3, 'Alice', 'Portland', '97201', 'Thingamajig',   45);
INSERT INTO orders_raw VALUES (4, 'Carol', 'Portland', '97202', 'Widget,Gadget', 75);
`;

const ORDER_ITEMS_1NF = `
CREATE TABLE order_items (
  order_id    INTEGER,
  customer    TEXT,
  city        TEXT,
  zip         TEXT,
  item        TEXT,
  total       INTEGER
);
INSERT INTO order_items VALUES (1, 'Alice', 'Portland', '97201', 'Widget',      75);
INSERT INTO order_items VALUES (1, 'Alice', 'Portland', '97201', 'Gadget',      75);
INSERT INTO order_items VALUES (2, 'Bob',   'Salem',    '97301', 'Widget',      30);
INSERT INTO order_items VALUES (3, 'Alice', 'Portland', '97201', 'Thingamajig', 45);
INSERT INTO order_items VALUES (4, 'Carol', 'Portland', '97202', 'Widget',      75);
INSERT INTO order_items VALUES (4, 'Carol', 'Portland', '97202', 'Gadget',      75);
`;

const TABLES_2NF = `
CREATE TABLE orders2 (
  order_id  INTEGER PRIMARY KEY,
  customer  TEXT,
  city      TEXT,
  zip       TEXT,
  total     INTEGER
);
INSERT INTO orders2 VALUES (1, 'Alice', 'Portland', '97201', 75);
INSERT INTO orders2 VALUES (2, 'Bob',   'Salem',    '97301', 30);
INSERT INTO orders2 VALUES (3, 'Alice', 'Portland', '97201', 45);
INSERT INTO orders2 VALUES (4, 'Carol', 'Portland', '97202', 75);

CREATE TABLE order_lines (
  order_id  INTEGER,
  item      TEXT,
  PRIMARY KEY (order_id, item)
);
INSERT INTO order_lines VALUES (1, 'Widget');
INSERT INTO order_lines VALUES (1, 'Gadget');
INSERT INTO order_lines VALUES (2, 'Widget');
INSERT INTO order_lines VALUES (3, 'Thingamajig');
INSERT INTO order_lines VALUES (4, 'Widget');
INSERT INTO order_lines VALUES (4, 'Gadget');
`;

const TABLES_3NF = `
CREATE TABLE customers (
  customer TEXT PRIMARY KEY,
  city     TEXT,
  zip      TEXT
);
INSERT INTO customers VALUES ('Alice', 'Portland', '97201');
INSERT INTO customers VALUES ('Bob',   'Salem',    '97301');
INSERT INTO customers VALUES ('Carol', 'Portland', '97202');

CREATE TABLE orders3 (
  order_id  INTEGER PRIMARY KEY,
  customer  TEXT,
  total     INTEGER
);
INSERT INTO orders3 VALUES (1, 'Alice', 75);
INSERT INTO orders3 VALUES (2, 'Bob',   30);
INSERT INTO orders3 VALUES (3, 'Alice', 45);
INSERT INTO orders3 VALUES (4, 'Carol', 75);

CREATE TABLE order_lines (
  order_id  INTEGER,
  item      TEXT,
  PRIMARY KEY (order_id, item)
);
INSERT INTO order_lines VALUES (1, 'Widget');
INSERT INTO order_lines VALUES (1, 'Gadget');
INSERT INTO order_lines VALUES (2, 'Widget');
INSERT INTO order_lines VALUES (3, 'Thingamajig');
INSERT INTO order_lines VALUES (4, 'Widget');
INSERT INTO order_lines VALUES (4, 'Gadget');
`;

export const dbNormalization: Module = {
  slug: "db-normalization",
  title: "Database Normalization: 1NF, 2NF & 3NF",
  description:
    "Stop storing duplicate data and broken schemas. Learn to diagnose and decompose denormalized tables through First, Second, and Third Normal Form — with runnable SQL at every step.",
  emoji: "🗄️",
  gradient: "from-sky-400/20 to-indigo-500/10",
  language: "sql",
  tagline:
    "Learn database normalization: 1NF, 2NF, 3NF, functional dependency, and decomposition with hands-on SQL exercises.",
  keywords: [
    "database normalization",
    "1NF 2NF 3NF",
    "first normal form",
    "second normal form",
    "third normal form",
    "functional dependency",
    "sql schema design",
    "relational database design",
  ],
  lessons: [
    // ── Lesson 1 — What Is Normalization? (quiz) ──────────────────────────
    {
      slug: "what-is-normalization",
      title: "What Is Normalization?",
      blurb: "Understand why we normalize and what problems it solves.",
      xp: 20,
      kind: "quiz",
      content: `# What Is Normalization?

**Normalization** is the process of organizing a relational database to reduce
**data redundancy** (duplicate data) and improve **data integrity** (keeping data
consistent and accurate).

Edgar F. Codd introduced the Normal Forms in 1970. Each form builds on the last:

| Form | Core rule |
|------|-----------|
| 1NF  | Atomic values, no repeating groups |
| 2NF  | 1NF + no partial dependencies      |
| 3NF  | 2NF + no transitive dependencies   |

## Why Does It Matter?

Consider a single \`orders\` table that stores the customer's city on every order
row.  If Alice moves, you need to update **every one of her rows** — miss one and
your database now contains two conflicting cities.  That is an **update anomaly**.

Normalization eliminates:
- **Update anomalies** — changing one fact requires many row edits.
- **Insert anomalies** — you can't record a fact without unrelated data.
- **Delete anomalies** — deleting one fact accidentally erases another.`,
      questions: [
        {
          prompt:
            "A database stores a customer's city on every order row. If the customer moves, every row must be updated. This is called:",
          options: [
            "A delete anomaly",
            "An update anomaly",
            "A constraint violation",
          ],
          answer: 1,
          explanation:
            "When one real-world fact (city) is stored in many rows, changing it requires multi-row updates — that is an update anomaly.",
        },
        {
          prompt:
            "Normalization primarily aims to reduce:",
          options: [
            "Query execution time",
            "Data redundancy and anomalies",
            "The number of indexes needed",
          ],
          answer: 1,
          explanation:
            "Normalization is about structure, not performance. The goal is to store each fact exactly once.",
        },
        {
          prompt: "Third Normal Form (3NF) requires that a table already satisfies:",
          options: [
            "Only 1NF",
            "Only 2NF",
            "Both 1NF and 2NF",
          ],
          answer: 2,
          explanation:
            "The Normal Forms are cumulative — 3NF ⊃ 2NF ⊃ 1NF. You can't skip a level.",
        },
      ],
    },

    // ── Lesson 2 — Spotting a Non-1NF Table (code) ────────────────────────
    {
      slug: "spot-non-1nf",
      title: "Spot the 1NF Violation",
      blurb: "Query a table that stores multiple values in one cell.",
      xp: 25,
      language: "sql",
      setup: RAW_ORDERS,
      content: `# Spot the 1NF Violation

**First Normal Form (1NF)** requires that every column contains **atomic**
(indivisible) values — no comma-separated lists, no arrays, no repeating groups.

Our \`orders_raw\` table has a problem:

\`\`\`
order_id | customer | city     | zip   | items           | total
---------|----------|----------|-------|-----------------|------
1        | Alice    | Portland | 97201 | Widget,Gadget   | 75
2        | Bob      | Salem    | 97301 | Widget          | 30
\`\`\`

The \`items\` column stores **multiple values** in a single cell.  That violates
1NF because you cannot reliably filter, join, or aggregate individual items.

## Your task

Select all rows from \`orders_raw\` where the \`items\` column contains the text
\`'Widget'\`. Use the \`LIKE\` operator with a \`%\` wildcard.

Table: \`orders_raw(order_id, customer, city, zip, items, total)\``,
      starterCode: `-- Select rows where items contains 'Widget'
`,
      solution: `SELECT *
FROM orders_raw
WHERE items LIKE '%Widget%';`,
      tests: [
        { name: "Rows containing Widget", code: "" },
      ],
      hints: [
        "Use WHERE items LIKE '%Widget%' — the % wildcards match anything before or after 'Widget'.",
      ],
      explanation:
        "The query works, but notice it is unreliable — `'%Widget%'` would also match `'MiniWidget'`. Storing multiple values in one column makes every query fragile. That is why 1NF demands atomic values.",
    },

    // ── Lesson 3 — Achieve 1NF (code) ─────────────────────────────────────
    {
      slug: "achieve-1nf",
      title: "Achieve 1NF — One Value Per Cell",
      blurb: "Query the fixed table where each item has its own row.",
      xp: 30,
      language: "sql",
      setup: ORDER_ITEMS_1NF,
      content: `# Achieve 1NF — One Value Per Cell

The fix for multi-value cells is to give **each value its own row**.  The new
\`order_items\` table has been split so every item gets a dedicated row:

\`\`\`
order_id | customer | city     | zip   | item   | total
---------|----------|----------|-------|--------|------
1        | Alice    | Portland | 97201 | Widget | 75
1        | Alice    | Portland | 97201 | Gadget | 75
2        | Bob      | Salem    | 97301 | Widget | 30
...
\`\`\`

Every column is now atomic — 1NF satisfied!

## Your task

Count how many rows in \`order_items\` have \`item = 'Widget'\`.
Return a single column named \`widget_count\`.

Table: \`order_items(order_id, customer, city, zip, item, total)\``,
      starterCode: `-- Count rows where item = 'Widget', label column widget_count
`,
      solution: `SELECT COUNT(*) AS widget_count
FROM order_items
WHERE item = 'Widget';`,
      tests: [
        { name: "widget_count is 3", code: "" },
      ],
      hints: [
        "Use COUNT(*) AS widget_count and a WHERE clause.",
      ],
      explanation:
        "With atomic values, `WHERE item = 'Widget'` is exact and fast — no LIKE hacks needed. This is the power of 1NF.",
    },

    // ── Lesson 4 — Functional Dependencies Quiz ───────────────────────────
    {
      slug: "functional-dependencies",
      title: "Functional Dependencies",
      blurb: "Learn the theory that drives 2NF and 3NF.",
      xp: 25,
      kind: "quiz",
      content: `# Functional Dependencies

A **functional dependency** X → Y means: knowing X uniquely determines Y.

Examples:
- \`order_id\` → \`total\` — each order has one total.
- \`customer\` → \`city\` — each customer lives in one city.
- \`zip\` → \`city\` — a zip code maps to exactly one city.

## Partial vs. Full vs. Transitive

| Type | Definition | Example |
|------|-----------|---------|
| **Full** | Y depends on the *entire* composite key | \`(order_id, item)\` → \`item_price\` |
| **Partial** | Y depends on *part* of a composite key | \`order_id\` → \`customer\` in a table keyed by \`(order_id, item)\` |
| **Transitive** | Y depends on a non-key column X which depends on the PK | \`order_id\` → \`zip\` → \`city\` |

- **2NF** eliminates **partial** dependencies.
- **3NF** eliminates **transitive** dependencies.`,
      questions: [
        {
          prompt:
            "In a table keyed by `(order_id, item)`, the column `customer` depends only on `order_id`. This is called a:",
          options: [
            "Transitive dependency",
            "Partial dependency",
            "Full dependency",
          ],
          answer: 1,
          explanation:
            "A partial dependency exists when a non-key column depends on only part of a composite primary key.",
        },
        {
          prompt:
            "`order_id` → `zip` and `zip` → `city`, so `order_id` → `city`. The dependency of `city` on `order_id` via `zip` is:",
          options: [
            "A partial dependency",
            "A full dependency",
            "A transitive dependency",
          ],
          answer: 2,
          explanation:
            "`city` does not depend directly on the key — it depends on `zip` which depends on the key. That chain is a transitive dependency.",
        },
        {
          prompt: "Which Normal Form specifically eliminates transitive dependencies?",
          options: ["1NF", "2NF", "3NF"],
          answer: 2,
          explanation:
            "3NF requires that every non-key column depend *directly* on the primary key — no transitive chains allowed.",
        },
      ],
    },

    // ── Lesson 5 — Identify 2NF Violation (code) ──────────────────────────
    {
      slug: "identify-2nf-violation",
      title: "Identify a 2NF Violation",
      blurb: "Find columns that depend on only part of the composite key.",
      xp: 35,
      language: "sql",
      setup: ORDER_ITEMS_1NF,
      content: `# Identify a 2NF Violation

Our 1NF table is \`order_items(order_id, customer, city, zip, item, total)\`.

The **composite primary key** is \`(order_id, item)\` — you need both to identify
a unique row.

But look at \`customer\`, \`city\`, and \`zip\`.  They depend only on \`order_id\`, **not
on \`item\`**.  That is a **partial dependency** — a 2NF violation.

The evidence: Alice appears on two rows with the same city.  Change her city in
one row and it diverges from the other — an update anomaly.

## Your task

Show the anomaly.  Query \`order_items\` for customer \`'Alice'\` and return
\`order_id\`, \`customer\`, \`city\`, and \`zip\`.  Order by \`order_id\` ascending.

Table: \`order_items(order_id, customer, city, zip, item, total)\``,
      starterCode: `-- Show order_id, customer, city, zip for Alice, ordered by order_id
`,
      solution: `SELECT order_id, customer, city, zip
FROM order_items
WHERE customer = 'Alice'
ORDER BY order_id;`,
      tests: [
        { name: "Alice rows with duplicate city/zip", code: "" },
      ],
      hints: [
        "SELECT four columns, filter on customer = 'Alice', then ORDER BY order_id.",
      ],
      explanation:
        "You'll see Alice's city/zip repeated across every row. That redundancy is exactly what 2NF is designed to eliminate.",
    },

    // ── Lesson 6 — Achieve 2NF (code) ─────────────────────────────────────
    {
      slug: "achieve-2nf",
      title: "Achieve 2NF — Remove Partial Dependencies",
      blurb: "Join the two tables that result from splitting out partial dependencies.",
      xp: 40,
      language: "sql",
      setup: TABLES_2NF,
      content: `# Achieve 2NF — Remove Partial Dependencies

To reach 2NF we **split** the 1NF table into two tables:

**\`orders2\`** — columns that depend on \`order_id\` alone:
\`(order_id, customer, city, zip, total)\`

**\`order_lines\`** — columns that depend on the full composite key:
\`(order_id, item)\`

Now customer/city/zip is stored **once per order**, not once per item.

## Your task

Join \`orders2\` and \`order_lines\` on \`order_id\`.
Return \`orders2.order_id\`, \`orders2.customer\`, \`order_lines.item\`, and
\`orders2.total\`.  Order by \`order_id\`, then \`item\` ascending.

Tables:
- \`orders2(order_id, customer, city, zip, total)\`
- \`order_lines(order_id, item)\``,
      starterCode: `-- Join orders2 and order_lines, return order_id, customer, item, total
`,
      solution: `SELECT o.order_id, o.customer, l.item, o.total
FROM orders2 o
JOIN order_lines l ON o.order_id = l.order_id
ORDER BY o.order_id, l.item;`,
      tests: [
        { name: "Full order list from 2NF tables", code: "" },
      ],
      hints: [
        "Use a JOIN ... ON o.order_id = l.order_id, then ORDER BY o.order_id, l.item.",
      ],
      explanation:
        "The join reconstructs the same data without any redundancy. Each customer's city appears once in `orders2`, eliminating update anomalies entirely.",
    },

    // ── Lesson 7 — Identify 3NF Violation (code) ──────────────────────────
    {
      slug: "identify-3nf-violation",
      title: "Identify a 3NF Violation",
      blurb: "Spot a column that depends on a non-key column, not the PK.",
      xp: 35,
      language: "sql",
      setup: TABLES_2NF,
      content: `# Identify a 3NF Violation

Our 2NF table \`orders2(order_id, customer, city, zip, total)\` has a new problem:

- \`order_id\` → \`zip\` (each order has a zip)
- \`zip\` → \`city\` (each zip maps to a city)
- Therefore: \`order_id\` → \`city\` **via zip** — a **transitive dependency**.

\`city\` does not depend directly on \`order_id\`; it depends on \`zip\`.

The anomaly: zip \`97201\` always means Portland — but that fact is repeated on
every order with that zip.  If Portland were renamed, every row would need updating.

## Your task

Show the redundancy.  From \`orders2\`, return distinct \`(zip, city)\` pairs,
ordered by \`zip\` ascending.

Table: \`orders2(order_id, customer, city, zip, total)\``,
      starterCode: `-- Show distinct zip and city pairs, ordered by zip
`,
      solution: `SELECT DISTINCT zip, city
FROM orders2
ORDER BY zip;`,
      tests: [
        { name: "Distinct zip-city pairs", code: "" },
      ],
      hints: [
        "Use SELECT DISTINCT zip, city then ORDER BY zip.",
      ],
      explanation:
        "Three distinct zip-city pairs exist across four orders. That zip→city fact is duplicated across rows — a classic transitive dependency that 3NF eliminates.",
    },

    // ── Lesson 8 — Achieve 3NF (code) ─────────────────────────────────────
    {
      slug: "achieve-3nf",
      title: "Achieve 3NF — Remove Transitive Dependencies",
      blurb: "Query the fully normalized schema across three clean tables.",
      xp: 45,
      language: "sql",
      setup: TABLES_3NF,
      content: `# Achieve 3NF — Remove Transitive Dependencies

To eliminate the transitive dependency we extract customers into their own table:

**\`customers\`** — \`(customer, city, zip)\` — the zip→city fact lives here once.

**\`orders3\`** — \`(order_id, customer, total)\` — city and zip are gone.

**\`order_lines\`** — \`(order_id, item)\` — unchanged from 2NF.

Now every non-key column in every table depends **directly** on that table's
primary key.  3NF achieved.

## Your task

Reconstruct the full picture: join all three tables and return
\`orders3.order_id\`, \`orders3.customer\`, \`customers.city\`, \`order_lines.item\`,
and \`orders3.total\`.  Order by \`order_id\`, then \`item\` ascending.

Tables:
- \`customers(customer, city, zip)\`
- \`orders3(order_id, customer, total)\`
- \`order_lines(order_id, item)\``,
      starterCode: `-- Join all three tables, return order_id, customer, city, item, total
`,
      solution: `SELECT o.order_id, o.customer, c.city, l.item, o.total
FROM orders3 o
JOIN customers c ON o.customer = c.customer
JOIN order_lines l ON o.order_id = l.order_id
ORDER BY o.order_id, l.item;`,
      tests: [
        { name: "Full denormalized view from 3NF schema", code: "" },
      ],
      hints: [
        "You need two JOINs: one on customer, one on order_id. Alias the tables for clarity.",
      ],
      explanation:
        "The three-table join produces the same result as the original denormalized table — but now each fact lives in exactly one place. Changing Portland's name requires one update to one row in `customers`.",
    },

    // ── Lesson 9 — Normalization Recap Quiz ───────────────────────────────
    {
      slug: "normalization-recap",
      title: "Normalization Recap",
      blurb: "Consolidate 1NF, 2NF, and 3NF in one final quiz.",
      xp: 30,
      kind: "quiz",
      content: `# Normalization Recap

You have now walked a table through all three Normal Forms:

| Step | Problem found | Solution |
|------|--------------|---------|
| 1NF  | Multi-value cell (\`items\` column) | One value per cell — each item gets its own row |
| 2NF  | Partial dependency (customer/city/zip depend on \`order_id\` only) | Extract into \`orders\` table keyed by \`order_id\` |
| 3NF  | Transitive dependency (\`zip\` → \`city\`) | Extract into \`customers\` table keyed by \`customer\` |

## When to Stop?

For most production systems, 3NF is the sweet spot.  Going further (BCNF, 4NF,
5NF) is rarely needed and can make queries harder to write.

## The Trade-off

Normalization reduces storage and anomalies but requires JOINs to reassemble
data.  **Denormalization** (intentionally breaking normal forms) is sometimes used
in read-heavy analytics warehouses for query performance — but it should be a
deliberate choice, not an accident.`,
      questions: [
        {
          prompt:
            "A table has the composite key `(student_id, course_id)`. The column `student_name` depends only on `student_id`. What violation is this?",
          options: [
            "A 1NF violation — the value is not atomic",
            "A 2NF violation — partial dependency on part of the key",
            "A 3NF violation — transitive dependency",
          ],
          answer: 1,
          explanation:
            "`student_name` depends on just `student_id`, not the full `(student_id, course_id)` key — a classic partial dependency that 2NF prohibits.",
        },
        {
          prompt:
            "A table `employees(emp_id, dept_id, dept_name)` where `dept_id → dept_name`. What violation exists?",
          options: [
            "1NF — multi-value column",
            "2NF — partial dependency",
            "3NF — transitive dependency",
          ],
          answer: 2,
          explanation:
            "`dept_name` depends on `dept_id` (a non-key column), not directly on `emp_id`. That is a transitive dependency — a 3NF violation. Fix: move `dept_name` to a `departments` table.",
        },
        {
          prompt:
            "After normalizing to 3NF, which statement is most accurate?",
          options: [
            "All queries become faster because there is less data",
            "Each fact is stored in exactly one place, eliminating update anomalies",
            "You no longer need indexes or constraints",
          ],
          answer: 1,
          explanation:
            "3NF means each fact lives in one place — one update changes it everywhere. Performance depends on indexes, not normalization level.",
        },
      ],
    },
  ],
};
