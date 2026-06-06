// Targets "SQL JOINs explained" — one of the most searched SQL beginner topics.
// Covers INNER, LEFT, RIGHT, and FULL OUTER joins with the same sample tables
// throughout for conceptual continuity. Links to /learn/sql for guided practice.

import type { BlogPost } from "../blog";

const post: BlogPost = {
  slug: "sql-joins-explained",
  title: "SQL JOINs Explained (With Simple Examples)",
  description:
    "A clear, practical guide to SQL JOINs — INNER, LEFT, RIGHT, and FULL OUTER — using the same tables throughout so the differences actually click.",
  date: "2026-06-02",
  readingMinutes: 8,
  tags: ["sql", "data", "concepts"],
  body: `JOINs are the step where SQL students most often stall. The SELECT and WHERE commands feel intuitive, but JOINs add a new dimension — combining data from two tables — and the four join types look confusingly similar until you see them side by side.

This guide uses the same two tables all the way through so you can focus on the *differences*, not the setup.

## The sample tables

**customers**

| id | name |
| --- | --- |
| 1 | Alice |
| 2 | Bob |
| 3 | Carol |

**orders**

| id | customer_id | amount |
| --- | --- | --- |
| 101 | 1 | 50 |
| 102 | 1 | 30 |
| 103 | 2 | 90 |
| 104 | 5 | 20 |

Notice: Carol (id 3) has no orders. And order 104 belongs to customer_id 5 — a customer who doesn't exist in the customers table. These gaps are what make the different join types interesting.

## INNER JOIN — only rows that match on both sides

An \`INNER JOIN\` returns rows where the join condition is satisfied in *both* tables. Anything that exists in one table but not the other is excluded.

\`\`\`sql
SELECT customers.name, orders.amount
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**Result:**

| name | amount |
| --- | --- |
| Alice | 50 |
| Alice | 30 |
| Bob | 90 |

What happened:
- Carol is gone — she has no orders, so there's no match.
- Order 104 (customer_id 5) is gone — no customer with id 5 exists.
- Only the overlapping rows survived.

**When to use it:** You want data that exists in *both* tables — matched pairs only.

## LEFT JOIN — all rows from the left table, matches from the right

A \`LEFT JOIN\` returns every row from the *left* table (the one in the \`FROM\` clause), plus any matching rows from the right. When there's no match, the right side columns come back as \`NULL\`.

\`\`\`sql
SELECT customers.name, orders.amount
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**Result:**

| name | amount |
| --- | --- |
| Alice | 50 |
| Alice | 30 |
| Bob | 90 |
| Carol | NULL |

What happened:
- Carol now appears — she's in the left table (customers) so she's always included.
- Her \`amount\` is \`NULL\` because there's no matching order.
- Order 104 is still gone — no match from the right side into the left.

**When to use it:** "Give me all [left table items] and show any related [right table items] if they exist." Classic use: all customers and their order history (including customers with no orders).

## RIGHT JOIN — all rows from the right table, matches from the left

A \`RIGHT JOIN\` is the mirror image. Every row from the *right* table is kept, plus any matching rows from the left.

\`\`\`sql
SELECT customers.name, orders.amount
FROM customers
RIGHT JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**Result:**

| name | amount |
| --- | --- |
| Alice | 50 |
| Alice | 30 |
| Bob | 90 |
| NULL | 20 |

What happened:
- Order 104 now appears — it's in the right table (orders).
- Its \`name\` is \`NULL\` because customer_id 5 doesn't exist in customers.
- Carol is gone — she's in the left table, and the right table has no row to drive her inclusion.

**When to use it:** "Give me all [right table items] and show any related [left table items] if they exist." In practice, most developers just flip the table order and use a LEFT JOIN instead — the logic is symmetrical.

## FULL OUTER JOIN — all rows from both tables

A \`FULL OUTER JOIN\` keeps every row from both tables. Matched rows are combined; unmatched rows appear with \`NULL\` on the side that has no match.

\`\`\`sql
SELECT customers.name, orders.amount
FROM customers
FULL OUTER JOIN orders ON customers.id = orders.customer_id;
\`\`\`

**Result:**

| name | amount |
| --- | --- |
| Alice | 50 |
| Alice | 30 |
| Bob | 90 |
| Carol | NULL |
| NULL | 20 |

Both the "orphaned" customer (Carol) and the "orphaned" order (104) appear. This join is the most complete view — nothing is excluded.

**When to use it:** Audits and reconciliation — "show me everything, including mismatches." Less common in everyday queries, but essential when you need to find gaps in both directions.

## A visual summary

Think of the tables as two overlapping circles (a Venn diagram):

- **INNER JOIN:** the intersection only.
- **LEFT JOIN:** the entire left circle.
- **RIGHT JOIN:** the entire right circle.
- **FULL OUTER JOIN:** both circles combined.

## Practical tips

**Filter for unmatched rows.** One of the most useful LEFT JOIN patterns is finding rows in the left table that have *no* match on the right:

\`\`\`sql
SELECT customers.name
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
WHERE orders.customer_id IS NULL;
\`\`\`

This returns only customers who have never placed an order — Carol in our example.

**Build incrementally.** Start with a bare \`SELECT *\` and the join condition, check what comes back, then add filters. Trying to write the entire query at once is where beginners get stuck.

**Check your join column.** Most JOIN bugs come from joining on the wrong columns or mismatched data types. When results look wrong, confirm the join condition is correct first.

## Where to practice

The best way to make JOINs click is to run them yourself. The [SQL track on Cantrip](/learn/sql) includes auto-graded JOIN exercises against sample data, so you get immediate feedback on whether your query is right. Keep a [SQL cheat sheet](/cheatsheet) nearby for syntax reference.

## The bottom line

INNER JOIN keeps only matched rows. LEFT JOIN keeps all left rows plus matches. RIGHT JOIN keeps all right rows plus matches. FULL OUTER JOIN keeps everything. Understand those four sentences, then practice writing each type against real data and they'll stay with you. [Start the SQL track](/learn/sql) and run your first JOIN today.`,
};

export default post;
