import type { Module } from "./types";

// SQL Recursive CTEs — WITH RECURSIVE, org-charts, category trees, calendar generation.
// Runs in-browser via sql.js (SQLite/WASM).

const EMPLOYEES = `
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  manager_id INTEGER
);
INSERT INTO employees VALUES (1, 'Alice',   NULL);
INSERT INTO employees VALUES (2, 'Bob',     1);
INSERT INTO employees VALUES (3, 'Carol',   1);
INSERT INTO employees VALUES (4, 'David',   2);
INSERT INTO employees VALUES (5, 'Eve',     2);
INSERT INTO employees VALUES (6, 'Frank',   3);
INSERT INTO employees VALUES (7, 'Grace',   3);
INSERT INTO employees VALUES (8, 'Hank',    4);
`;

const CATEGORIES = `
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER
);
INSERT INTO categories VALUES (1, 'Electronics',   NULL);
INSERT INTO categories VALUES (2, 'Clothing',      NULL);
INSERT INTO categories VALUES (3, 'Phones',        1);
INSERT INTO categories VALUES (4, 'Laptops',       1);
INSERT INTO categories VALUES (5, 'Mens',          2);
INSERT INTO categories VALUES (6, 'Womens',        2);
INSERT INTO categories VALUES (7, 'Smartphones',   3);
INSERT INTO categories VALUES (8, 'Feature Phones', 3);
INSERT INTO categories VALUES (9, 'T-Shirts',      5);
`;

export const sqlRecursiveCtes: Module = {
  slug: "sql-recursive-ctes",
  title: "Recursive CTEs & Hierarchical Queries",
  description:
    "Conquer org-charts, category trees, and calendar generation with WITH RECURSIVE — the most-requested hard SQL pattern in technical interviews, now fully interactive.",
  emoji: "🌳",
  gradient: "from-emerald-400/20 to-teal-500/10",
  language: "sql",
  tagline:
    "Learn SQL recursive CTEs: WITH RECURSIVE, anchor terms, org-charts, tree traversal, ancestor paths, and calendar generation.",
  keywords: [
    "sql recursive cte",
    "with recursive sql",
    "sql hierarchical query",
    "sql org chart query",
    "sql tree traversal",
    "sql generate series",
    "sql interview questions",
  ],
  lessons: [
    // ── Lesson 1 — Concept / Anatomy (quiz) ──────────────────────────────────
    {
      slug: "anatomy-of-with-recursive",
      title: "Anatomy of WITH RECURSIVE",
      blurb: "How anchor + recursive terms combine to walk a tree.",
      xp: 25,
      kind: "quiz",
      content: `# Anatomy of WITH RECURSIVE

A **recursive CTE** has two parts separated by \`UNION ALL\`:

\`\`\`sql
WITH RECURSIVE cte_name(col1, col2) AS (
  -- 1. Anchor term: the starting row(s) — no self-reference
  SELECT ...

  UNION ALL

  -- 2. Recursive term: joins cte_name to extend results
  SELECT ...
  FROM source
  JOIN cte_name ON ...          -- reference to the CTE itself
  WHERE <stop condition>        -- prevent infinite loops!
)
SELECT * FROM cte_name;
\`\`\`

**How it executes:**
1. Run the anchor term → seed the working table.
2. Run the recursive term against the working table → new rows.
3. Append new rows; repeat until **no new rows are produced**.
4. The final result is the union of all iterations.

**Key rules:**
- The recursive term MUST reference the CTE by name exactly once.
- Always include a \`WHERE\` guard (or natural termination) to stop recursion.
- Column names/types are fixed by the **anchor term**.
- \`UNION ALL\` is almost always correct (use \`UNION\` only when you need dedup and accept the performance cost).
`,
      questions: [
        {
          prompt: "What is the **anchor term** in a recursive CTE?",
          options: [
            "The part that references the CTE itself to produce the next rows",
            "The base-case SELECT that produces the initial seed rows with no self-reference",
            "A LIMIT clause that stops the recursion after N iterations",
          ],
          answer: 1,
          explanation:
            "The anchor term is the first SELECT — it runs once, produces seed rows, and must NOT reference the CTE itself. The recursive term is the second SELECT that joins back to the CTE.",
        },
        {
          prompt: "Why is a stop condition (WHERE clause) essential in the recursive term?",
          options: [
            "It is optional — the database engine automatically detects when to stop",
            "Without it, the recursive term can produce rows indefinitely, causing an infinite loop or max-recursion error",
            "It speeds up the anchor term",
          ],
          answer: 1,
          explanation:
            "Without a termination condition, the recursive term keeps running and producing rows, quickly exhausting memory or hitting the engine's recursion depth limit.",
        },
        {
          prompt: "You have a table with a cycle (node A → B → A). What is the safest way to guard against infinite recursion?",
          options: [
            "Add UNION (not UNION ALL) so duplicate rows are removed",
            "Track visited IDs in a path string column and stop when the next ID already appears in the path",
            "Cycles are impossible in SQL tables, so no guard is needed",
          ],
          answer: 1,
          explanation:
            "The standard SQLite/PostgreSQL technique is to carry a 'path' text column (e.g. '1,3,7') and add WHERE path NOT LIKE '%,' || next_id || ',%' to break the cycle. UNION dedup alone won't catch all cycle shapes.",
        },
        {
          prompt: "Which operator should you almost always use to combine the anchor and recursive terms?",
          options: [
            "UNION (removes duplicates each iteration, which is expensive)",
            "UNION ALL (keeps duplicates, faster, and usually correct for tree traversal)",
            "INTERSECT",
          ],
          answer: 1,
          explanation:
            "UNION ALL is correct for tree traversal because the same node legitimately appears only once anyway, and the dedup overhead of plain UNION is unnecessary — use UNION only when you know duplicates must be removed.",
        },
      ],
    },

    // ── Lesson 2 — Counter sequence ──────────────────────────────────────────
    {
      slug: "counting-sequence",
      title: "Generate a Number Sequence",
      blurb: "Use WITH RECURSIVE to count from 1 to 10 — no table needed.",
      xp: 30,
      setup: `SELECT 1;`, // minimal setup — no seed table needed
      content: `# Generate a Number Sequence

The simplest recursive CTE generates rows out of thin air — a number sequence.

\`\`\`sql
WITH RECURSIVE counter(n) AS (
  SELECT 1                          -- anchor: start at 1
  UNION ALL
  SELECT n + 1 FROM counter         -- recursive: add 1 each step
  WHERE n < 5                       -- stop after 5
)
SELECT n FROM counter;
-- → 1, 2, 3, 4, 5
\`\`\`

**Why it works:** The anchor produces a single row \`{n: 1}\`.  The recursive term
joins it, produces \`{n: 2}\`, and repeats until \`n < 5\` is false.

## Your task
Write a recursive CTE named \`counter\` with a single column \`n\` that produces
the integers **1 through 10**, in ascending order.  Return only the \`n\` column.
`,
      starterCode: `-- Generate integers 1 to 10 using WITH RECURSIVE
`,
      solution: `WITH RECURSIVE counter(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM counter WHERE n < 10
)
SELECT n FROM counter
ORDER BY n;`,
      tests: [
        { name: "Returns exactly 10 rows numbered 1 to 10", code: "" },
      ],
      hints: [
        "Start the anchor with SELECT 1.",
        "The recursive term should SELECT n + 1 FROM counter WHERE n < 10.",
        "Add ORDER BY n at the final SELECT to guarantee ascending order.",
      ],
    },

    // ── Lesson 3 — Org-chart top-down traversal ──────────────────────────────
    {
      slug: "org-chart-traversal",
      title: "Org-Chart: Top-Down Traversal",
      blurb: "Walk an employee hierarchy from the root to every leaf.",
      xp: 45,
      setup: EMPLOYEES,
      content: `# Org-Chart: Top-Down Traversal

The classic recursive CTE use-case: an **employee / manager** table where
\`manager_id\` points to a row in the same table, and the root has \`manager_id IS NULL\`.

\`\`\`
Alice (id 1, root)
├── Bob   (id 2)
│   ├── David  (id 4)
│   │   └── Hank (id 8)
│   └── Eve    (id 5)
└── Carol (id 3)
    ├── Frank  (id 6)
    └── Grace  (id 7)
\`\`\`

Table: \`employees(id, name, manager_id)\` — root has \`manager_id IS NULL\`.

**Pattern:**
\`\`\`sql
WITH RECURSIVE org(id, name, level) AS (
  -- anchor: the root
  SELECT id, name, 0 FROM employees WHERE manager_id IS NULL
  UNION ALL
  -- recursive: one level deeper each iteration
  SELECT e.id, e.name, org.level + 1
  FROM employees e
  JOIN org ON e.manager_id = org.id
)
SELECT id, name, level FROM org ORDER BY level, id;
\`\`\`

## Your task
Write the query above exactly — return all employees with columns \`id\`, \`name\`,
and \`level\` (root = 0).  Order by \`level\` ascending, then \`id\` ascending.
`,
      starterCode: `-- Walk the entire org chart from root to leaves
-- Return: id, name, level (root=0)
`,
      solution: `WITH RECURSIVE org(id, name, level) AS (
  SELECT id, name, 0 FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, org.level + 1
  FROM employees e
  JOIN org ON e.manager_id = org.id
)
SELECT id, name, level FROM org
ORDER BY level, id;`,
      tests: [
        { name: "Returns all 8 employees with correct level values", code: "" },
      ],
      hints: [
        "The anchor selects WHERE manager_id IS NULL — that is Alice (id 1, level 0).",
        "The recursive term joins employees e ON e.manager_id = org.id to find direct reports.",
        "Carry the level by writing org.level + 1 in the recursive SELECT.",
      ],
    },

    // ── Lesson 4 — Category tree with depth ──────────────────────────────────
    {
      slug: "category-depth",
      title: "Category Tree: Compute Depth",
      blurb: "Assign a depth level to every node in a nested category tree.",
      xp: 45,
      setup: CATEGORIES,
      content: `# Category Tree: Compute Depth

E-commerce sites store categories in a **self-referencing table** identical in
shape to the employee table.  The same recursive pattern applies.

\`\`\`
Electronics (id 1, depth 0)
├── Phones   (id 3, depth 1)
│   ├── Smartphones   (id 7, depth 2)
│   └── Feature Phones (id 8, depth 2)
└── Laptops  (id 4, depth 1)

Clothing (id 2, depth 0)
├── Mens     (id 5, depth 1)
│   └── T-Shirts (id 9, depth 2)
└── Womens   (id 6, depth 1)
\`\`\`

Table: \`categories(id, name, parent_id)\` — roots have \`parent_id IS NULL\`.

## Your task
Write a recursive CTE named \`cat_tree\` that computes the \`depth\` of every
category (root = 0).  Return columns \`id\`, \`name\`, \`depth\`, ordered by
\`depth\` ascending then \`id\` ascending.
`,
      starterCode: `-- Compute depth for every category node (roots = depth 0)
`,
      solution: `WITH RECURSIVE cat_tree(id, name, depth) AS (
  SELECT id, name, 0 FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, ct.depth + 1
  FROM categories c
  JOIN cat_tree ct ON c.parent_id = ct.id
)
SELECT id, name, depth FROM cat_tree
ORDER BY depth, id;`,
      tests: [
        { name: "All 9 categories returned with correct depth (0, 1, or 2)", code: "" },
      ],
      hints: [
        "The anchor is WHERE parent_id IS NULL (Electronics and Clothing, depth 0).",
        "Join categories c ON c.parent_id = ct.id in the recursive term.",
        "The depth column increments by 1 each iteration: ct.depth + 1.",
      ],
    },

    // ── Lesson 5 — Ancestors path (bottom-up) ────────────────────────────────
    {
      slug: "ancestors-path",
      title: "Ancestors: Bottom-Up Walk",
      blurb: "Find every ancestor of a given employee by walking up the tree.",
      xp: 50,
      setup: EMPLOYEES,
      content: `# Ancestors: Bottom-Up Walk

Sometimes you need to walk **up** the tree — from a leaf to the root — to find
an employee's chain of command.  The trick is to anchor at the target node and
join on \`e.id = a.manager_id\` instead of \`e.manager_id = a.id\`.

\`\`\`sql
-- Find all ancestors of Eve (id 5), including Eve herself
WITH RECURSIVE ancestors(id, name, manager_id) AS (
  SELECT id, name, manager_id FROM employees WHERE id = 5   -- anchor: Eve
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e
  JOIN ancestors a ON e.id = a.manager_id     -- walk UP: e is a's manager
)
SELECT id, name FROM ancestors ORDER BY id;
-- → Eve (5), Bob (2), Alice (1)
\`\`\`

## Your task
Write the query above exactly — return the ancestors of employee **id = 8** (Hank),
including Hank himself.  Output columns \`id\` and \`name\`, ordered by \`id\` ascending.

Hank's chain: Hank (8) → David (4) → Bob (2) → Alice (1).
`,
      starterCode: `-- Find all ancestors of employee id=8 (including themselves)
-- Return: id, name  ordered by id ASC
`,
      solution: `WITH RECURSIVE ancestors(id, name, manager_id) AS (
  SELECT id, name, manager_id FROM employees WHERE id = 8
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e
  JOIN ancestors a ON e.id = a.manager_id
)
SELECT id, name FROM ancestors
ORDER BY id;`,
      tests: [
        { name: "Returns Hank (8), David (4), Bob (2), and Alice (1) in order", code: "" },
      ],
      hints: [
        "Anchor with WHERE id = 8 to start at Hank.",
        "Join condition is e.id = a.manager_id — you're walking up to the manager row.",
        "Recursion stops naturally when a.manager_id IS NULL (Alice has no manager).",
      ],
    },

    // ── Lesson 6 — Descendants subtree ───────────────────────────────────────
    {
      slug: "descendants-subtree",
      title: "Descendants: Collect a Subtree",
      blurb: "Gather every descendant under a given category node.",
      xp: 50,
      setup: CATEGORIES,
      content: `# Descendants: Collect a Subtree

To find **all descendants** of a node, anchor at that node and walk **down**
with the standard \`parent_id\` join.  This returns the entire subtree rooted
at the chosen node.

\`\`\`sql
-- All descendants of Electronics (id 1), including itself
WITH RECURSIVE subtree(id, name) AS (
  SELECT id, name FROM categories WHERE id = 1   -- anchor: root node
  UNION ALL
  SELECT c.id, c.name
  FROM categories c
  JOIN subtree s ON c.parent_id = s.id           -- walk DOWN
)
SELECT id, name FROM subtree ORDER BY id;
\`\`\`

## Your task
Write a recursive CTE named \`subtree\` that returns **all descendants of
category id = 2 (Clothing)**, including Clothing itself.

Expected output (order by \`id\`): Clothing (2), Mens (5), Womens (6), T-Shirts (9).
Return columns \`id\` and \`name\`.
`,
      starterCode: `-- Return category id=2 and all its descendants
-- Return: id, name  ordered by id ASC
`,
      solution: `WITH RECURSIVE subtree(id, name) AS (
  SELECT id, name FROM categories WHERE id = 2
  UNION ALL
  SELECT c.id, c.name
  FROM categories c
  JOIN subtree s ON c.parent_id = s.id
)
SELECT id, name FROM subtree
ORDER BY id;`,
      tests: [
        { name: "Returns Clothing (2), Mens (5), Womens (6), T-Shirts (9) ordered by id", code: "" },
      ],
      hints: [
        "Anchor with WHERE id = 2 to start at Clothing.",
        "Join ON c.parent_id = s.id to walk downward to children.",
        "The recursion naturally terminates when no child rows are found.",
      ],
    },

    // ── Lesson 7 — Calendar / date range generation ──────────────────────────
    {
      slug: "calendar-generation",
      title: "Calendar Generation",
      blurb: "Generate a sequence of dates — no calendar table required.",
      xp: 40,
      setup: `SELECT 1;`, // no seed table needed
      content: `# Calendar Generation

Combining the number-sequence trick with SQLite's \`date()\` modifier generates
a date range on the fly — perfect for filling gaps in time-series data or
joining against a reporting period.

\`\`\`sql
-- Generate Jan 1–5 2024
WITH RECURSIVE cal(d, n) AS (
  SELECT date('2024-01-01'), 1
  UNION ALL
  SELECT date(d, '+1 day'), n + 1
  FROM cal
  WHERE n < 5
)
SELECT d AS day FROM cal ORDER BY d;
\`\`\`

SQLite's \`date(base, modifier)\` adds days, months, or years:
- \`date('2024-01-01', '+1 day')\` → \`'2024-01-02'\`
- \`date('2024-01-31', '+1 month')\` → \`'2024-02-29'\` (leap-year aware)

## Your task
Write a recursive CTE named \`cal\` with columns \`d\` (date text) and \`n\` (counter)
that generates **7 consecutive days** starting from \`'2024-03-01'\`.  Return only
the \`d\` column aliased as \`day\`, ordered ascending.

Expected first row: \`2024-03-01\`. Expected last row: \`2024-03-07\`.
`,
      starterCode: `-- Generate 7 days starting from 2024-03-01
-- Return: day  ordered ASC
`,
      solution: `WITH RECURSIVE cal(d, n) AS (
  SELECT date('2024-03-01'), 1
  UNION ALL
  SELECT date(d, '+1 day'), n + 1
  FROM cal
  WHERE n < 7
)
SELECT d AS day FROM cal
ORDER BY d;`,
      tests: [
        { name: "Returns exactly 7 rows from 2024-03-01 through 2024-03-07", code: "" },
      ],
      hints: [
        "Anchor: SELECT date('2024-03-01'), 1.",
        "Recursive term: SELECT date(d, '+1 day'), n + 1 FROM cal WHERE n < 7.",
        "Stop at n < 7: when n=7 the WHERE is false, so no 8th row is generated.",
      ],
    },

    // ── Lesson 8 — Interview capstone quiz ───────────────────────────────────
    {
      slug: "recursive-cte-interview-patterns",
      title: "Interview Patterns & Pitfalls",
      blurb: "The questions interviewers actually ask about recursive CTEs.",
      xp: 35,
      kind: "quiz",
      content: `# Interview Patterns & Pitfalls

Recursive CTEs appear regularly in mid-to-senior SQL interviews (LeetCode Hard,
system design rounds, data engineering take-homes).  Here are the patterns that
separate solid candidates from the rest.

**The four canonical problems:**
1. **Generate a sequence** — number or date range, no table needed.
2. **Top-down tree walk** — org chart, category hierarchy, filesystem.
3. **Bottom-up ancestor path** — find the chain of command for one node.
4. **Subtree collection** — gather all descendants under a given node.

**Common gotchas:**
- Forgetting the stop condition → infinite loop / stack overflow.
- Anchoring on the wrong node (off-by-one in depth).
- Using UNION instead of UNION ALL when dedup is not needed (performance hit).
- Not carrying a \`path\` column when cycles are possible (graphs, not just trees).
`,
      questions: [
        {
          prompt: "An interviewer asks: 'Given an employees table, return every employee together with the name of their **skip-level manager** (their manager's manager).' Which approach is cleanest?",
          options: [
            "A recursive CTE with depth tracking — stop at depth = 2",
            "Two self-joins: JOIN employees m1 ON e.manager_id = m1.id JOIN employees m2 ON m1.manager_id = m2.id",
            "A correlated subquery for each row",
          ],
          answer: 1,
          explanation:
            "For a fixed two-level look-up, two self-joins are simpler and more readable than a CTE. Recursive CTEs shine when the depth is variable or unknown — use the right tool for the right problem.",
        },
        {
          prompt: "You run your org-chart CTE and get 'max recursion depth exceeded'. What is the most likely cause?",
          options: [
            "You used UNION ALL instead of UNION",
            "There is a cycle in the data (e.g., A reports to B and B reports to A) or the WHERE stop condition is wrong",
            "The anchor term returned more than one row",
          ],
          answer: 1,
          explanation:
            "Cycles in the data cause the recursive term to keep producing rows indefinitely, hitting the engine's recursion guard. Fix by auditing the data for cycles or carrying a visited-path column to break them.",
        },
        {
          prompt: "Which statement about UNION vs UNION ALL in recursive CTEs is correct?",
          options: [
            "You must always use UNION to prevent duplicate rows from accumulating",
            "UNION ALL is correct for tree traversal (each node appears once); use UNION only if dedup is truly needed and accept the added cost",
            "UNION and UNION ALL produce identical results in recursive CTEs",
          ],
          answer: 1,
          explanation:
            "In a proper tree, each node is visited once, so UNION ALL is both correct and faster. UNION performs dedup on every iteration, which is expensive and usually unnecessary.",
        },
        {
          prompt: "What column type trick lets a recursive CTE detect and avoid graph cycles?",
          options: [
            "A BOOLEAN visited flag that you set to TRUE when a node is processed",
            "A TEXT path column (e.g. '1,3,7') in the CTE; add WHERE path NOT LIKE '%' || next_id || '%' to stop when a node has already been visited",
            "An INTEGER depth column with a hard LIMIT 100 on the outer query",
          ],
          answer: 1,
          explanation:
            "Carrying a comma-delimited path string and checking LIKE (or INSTR) for the next node ID is the standard, portable way to guard against cycles in graph queries. A depth cap can help too, but it won't catch all cycle shapes.",
        },
      ],
    },
  ],
};
