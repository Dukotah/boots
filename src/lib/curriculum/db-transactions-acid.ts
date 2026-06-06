import type { Module } from "./types";

// Transactions, ACID & Isolation Levels — runs in-browser via sql.js (SQLite/WASM).
// Covers BEGIN/COMMIT/ROLLBACK, SAVEPOINT, ACID properties, dirty/non-repeatable/
// phantom reads, and isolation level trade-offs with live SQLite exercises.

const ACCOUNTS = `
CREATE TABLE accounts (
  id      INTEGER PRIMARY KEY,
  name    TEXT    NOT NULL,
  balance INTEGER NOT NULL
);
INSERT INTO accounts VALUES (1, 'Alice', 1000);
INSERT INTO accounts VALUES (2, 'Bob',   500);
INSERT INTO accounts VALUES (3, 'Carol', 750);
`;

const ORDERS = `
CREATE TABLE orders (
  id         INTEGER PRIMARY KEY,
  customer   TEXT    NOT NULL,
  amount     INTEGER NOT NULL,
  status     TEXT    NOT NULL DEFAULT 'pending'
);
INSERT INTO orders VALUES (1, 'Alice', 200, 'pending');
INSERT INTO orders VALUES (2, 'Bob',   150, 'pending');
INSERT INTO orders VALUES (3, 'Carol', 300, 'pending');
`;

const INVENTORY = `
CREATE TABLE products (
  id       INTEGER PRIMARY KEY,
  name     TEXT    NOT NULL,
  stock    INTEGER NOT NULL,
  reserved INTEGER NOT NULL DEFAULT 0
);
INSERT INTO products VALUES (1, 'Widget', 100, 0);
INSERT INTO products VALUES (2, 'Gadget', 50,  0);
INSERT INTO products VALUES (3, 'Doohickey', 20, 0);
`;

export const dbTransactionsAcid: Module = {
  slug: "db-transactions-acid",
  title: "Transactions, ACID & Isolation Levels",
  description:
    "Learn how databases guarantee correctness under concurrent load — write real BEGIN/COMMIT/ROLLBACK/SAVEPOINT queries, reason through dirty reads and phantom reads, and understand exactly when to reach for SERIALIZABLE.",
  emoji: "🔐",
  gradient: "from-amber-400/20 to-orange-500/10",
  language: "sql",
  tagline:
    "Master database transactions: BEGIN, COMMIT, ROLLBACK, SAVEPOINT, ACID properties, and isolation levels with runnable SQLite exercises.",
  keywords: [
    "sql transactions",
    "acid properties database",
    "database isolation levels",
    "begin commit rollback sql",
    "dirty read phantom read",
    "serializable repeatable read",
    "sqlite transactions tutorial",
  ],
  lessons: [
    {
      slug: "begin-commit",
      title: "BEGIN … COMMIT",
      blurb: "Wrap multiple statements in a single all-or-nothing unit.",
      xp: 30,
      language: "sql",
      setup: ACCOUNTS,
      content: `# BEGIN … COMMIT

A **transaction** groups multiple SQL statements so they succeed or fail together.
Nothing is saved to the database until you issue \`COMMIT\`.

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
\`\`\`

Without a transaction, if the power cut out between the two \`UPDATE\`s, Alice
would lose \$100 but Bob would never receive it. Wrapping them in \`BEGIN … COMMIT\`
makes the pair **atomic** — either both happen or neither does.

Table: \`accounts(id, name, balance)\`
Seed: Alice=1000, Bob=500, Carol=750

## Your task
Transfer **\$200** from Alice (id=1) to Bob (id=2) inside a single transaction.
Then \`SELECT id, name, balance FROM accounts ORDER BY id\` so the grader can
verify the final balances.`,
      starterCode: `-- Transfer $200 from Alice to Bob, then SELECT the results
BEGIN;

COMMIT;

SELECT id, name, balance FROM accounts ORDER BY id;`,
      solution: `BEGIN;
UPDATE accounts SET balance = balance - 200 WHERE id = 1;
UPDATE accounts SET balance = balance + 200 WHERE id = 2;
COMMIT;

SELECT id, name, balance FROM accounts ORDER BY id;`,
      tests: [
        { name: "Alice balance is 800", code: "" },
        { name: "Bob balance is 700", code: "" },
        { name: "Carol balance unchanged at 750", code: "" },
      ],
      hints: [
        "Use UPDATE … SET balance = balance - 200 for Alice (id=1).",
        "Use UPDATE … SET balance = balance + 200 for Bob (id=2).",
        "Put both UPDATEs between BEGIN; and COMMIT;, then end with the SELECT.",
      ],
      explanation: `Both UPDATE statements run inside one transaction. SQLite won't write them to disk until \`COMMIT\` succeeds — so if anything goes wrong in between, neither change lands. This is the **Atomicity** guarantee of ACID.`,
    },
    {
      slug: "rollback",
      title: "ROLLBACK — Undo Everything",
      blurb: "Abort the whole transaction and leave the database unchanged.",
      xp: 30,
      language: "sql",
      setup: ACCOUNTS,
      content: `# ROLLBACK — Undo Everything

\`ROLLBACK\` cancels the current transaction and discards every change made since
\`BEGIN\`. The database is left exactly as it was before \`BEGIN\`.

\`\`\`sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
-- oops, wrong account or not enough funds — abort
ROLLBACK;
\`\`\`

After the \`ROLLBACK\`, Alice's balance is still 1000 — as if the UPDATE never ran.

This is essential for **error handling**: if any step in a multi-step operation
fails, you \`ROLLBACK\` so you never end up in a half-applied state.

Table: \`accounts(id, name, balance)\` — Alice=1000, Bob=500, Carol=750

## Your task
Start a transaction, deduct **\$300** from Carol (id=3), then \`ROLLBACK\` the
transaction. Finally \`SELECT id, name, balance FROM accounts ORDER BY id\` to
confirm all balances are unchanged.`,
      starterCode: `-- Deduct $300 from Carol then ROLLBACK, then SELECT
BEGIN;

ROLLBACK;

SELECT id, name, balance FROM accounts ORDER BY id;`,
      solution: `BEGIN;
UPDATE accounts SET balance = balance - 300 WHERE id = 3;
ROLLBACK;

SELECT id, name, balance FROM accounts ORDER BY id;`,
      tests: [
        { name: "Alice balance still 1000", code: "" },
        { name: "Bob balance still 500", code: "" },
        { name: "Carol balance still 750 (rollback undid the deduct)", code: "" },
      ],
      hints: [
        "UPDATE accounts SET balance = balance - 300 WHERE id = 3 inside the transaction.",
        "Then call ROLLBACK; (not COMMIT) to discard the change.",
        "End with SELECT id, name, balance FROM accounts ORDER BY id;",
      ],
      explanation: `\`ROLLBACK\` rewinds the database to the snapshot taken at \`BEGIN\`. The UPDATE ran in memory but was never persisted. Real applications issue \`ROLLBACK\` inside error-handling code (e.g., a \`catch\` block) whenever any step fails.`,
    },
    {
      slug: "savepoint",
      title: "SAVEPOINT — Partial Rollback",
      blurb: "Roll back to a named checkpoint without ditching the whole transaction.",
      xp: 40,
      language: "sql",
      setup: ORDERS,
      content: `# SAVEPOINT — Partial Rollback

A \`SAVEPOINT\` marks a point inside a transaction you can return to without
discarding everything.

\`\`\`sql
BEGIN;
UPDATE orders SET status = 'approved' WHERE id = 1;

SAVEPOINT after_alice;

UPDATE orders SET status = 'approved' WHERE id = 2;
-- Bob's approval fails a business rule — undo just this part
ROLLBACK TO SAVEPOINT after_alice;

-- Alice's approval is still pending — continue and commit
COMMIT;
\`\`\`

After \`COMMIT\`, Alice is 'approved' and Bob is still 'pending'.

Table: \`orders(id, customer, amount, status)\`
Seed: Alice/Bob/Carol all 'pending'.

## Your task
1. \`BEGIN\` a transaction.
2. Set Alice's order (id=1) status to \`'approved'\`.
3. Create a \`SAVEPOINT mid_tx\`.
4. Set Bob's order (id=2) status to \`'approved'\`.
5. \`ROLLBACK TO SAVEPOINT mid_tx\` (Bob's change is undone).
6. \`COMMIT\`.
7. \`SELECT id, customer, status FROM orders ORDER BY id\` to verify.`,
      starterCode: `-- Approve Alice, savepoint, approve Bob, rollback to savepoint, commit
BEGIN;

SAVEPOINT mid_tx;

ROLLBACK TO SAVEPOINT mid_tx;

COMMIT;

SELECT id, customer, status FROM orders ORDER BY id;`,
      solution: `BEGIN;
UPDATE orders SET status = 'approved' WHERE id = 1;
SAVEPOINT mid_tx;
UPDATE orders SET status = 'approved' WHERE id = 2;
ROLLBACK TO SAVEPOINT mid_tx;
COMMIT;

SELECT id, customer, status FROM orders ORDER BY id;`,
      tests: [
        { name: "Alice status is 'approved'", code: "" },
        { name: "Bob status is still 'pending'", code: "" },
        { name: "Carol status is still 'pending'", code: "" },
      ],
      hints: [
        "UPDATE orders SET status = 'approved' WHERE id = 1; right after BEGIN.",
        "SAVEPOINT mid_tx; locks in Alice's change as a checkpoint.",
        "UPDATE orders SET status = 'approved' WHERE id = 2; then ROLLBACK TO SAVEPOINT mid_tx; reverts only Bob.",
        "COMMIT; keeps Alice's approval. End with the SELECT.",
      ],
      explanation: `SAVEPOINTs let you write complex multi-step transactions with internal retry logic — you can undo part of the work without starting over. They are especially useful in stored procedures and application-level batch operations.`,
    },
    {
      slug: "acid-properties",
      title: "ACID Properties",
      blurb: "The four guarantees every production database must provide.",
      xp: 25,
      kind: "quiz",
      content: `# ACID Properties

Every transaction in a reliable database must satisfy four guarantees, known as
**ACID**:

| Letter | Property | What it means |
|--------|----------|---------------|
| **A** | **Atomicity** | All-or-nothing. If any step fails, all changes are rolled back. |
| **C** | **Consistency** | A transaction takes the DB from one valid state to another. Constraints (foreign keys, NOT NULL, CHECK) are never violated. |
| **I** | **Isolation** | Concurrent transactions don't see each other's in-progress changes (depending on isolation level). |
| **D** | **Durability** | Once \`COMMIT\` returns, the data survives crashes. Written to disk / WAL. |

### Why it matters in practice

- **Atomicity** prevents the "half-transfer" bug: money leaves Alice but never
  arrives at Bob.
- **Consistency** means CHECK constraints and foreign keys hold after every commit.
- **Isolation** means two bank tellers updating the same account simultaneously
  don't corrupt the balance.
- **Durability** means a server reboot after COMMIT doesn't lose your data.`,
      questions: [
        {
          prompt:
            "A money transfer deducts $100 from Alice but crashes before crediting Bob. Which ACID property was violated?",
          options: [
            "Consistency — a constraint was broken",
            "Atomicity — the all-or-nothing guarantee was not met",
            "Durability — the data was not written to disk",
            "Isolation — two transactions ran simultaneously",
          ],
          answer: 1,
          explanation:
            "Atomicity requires that either both the debit and the credit commit, or neither does. A crash leaving only the debit is an atomicity failure.",
        },
        {
          prompt: "After COMMIT returns, the server crashes. When it restarts, which ACID property guarantees the committed data is still there?",
          options: [
            "Atomicity",
            "Consistency",
            "Isolation",
            "Durability",
          ],
          answer: 3,
          explanation:
            "Durability guarantees that committed transactions survive crashes. Databases achieve this via write-ahead logs (WAL) and fsync calls.",
        },
        {
          prompt: "Transaction A is in progress. Transaction B tries to read Transaction A's uncommitted changes. Which ACID property controls whether B can see them?",
          options: [
            "Atomicity",
            "Consistency",
            "Isolation",
            "Durability",
          ],
          answer: 2,
          explanation:
            "Isolation governs what an in-progress transaction can see from other concurrent transactions. The exact behavior depends on the isolation level.",
        },
        {
          prompt: "A transaction inserts a row that violates a UNIQUE constraint. The database rejects the INSERT. Which ACID letter is being enforced?",
          options: [
            "Atomicity",
            "Consistency",
            "Isolation",
            "Durability",
          ],
          answer: 1,
          explanation:
            "Consistency means transactions can only move the database from one valid state to another. Violating a UNIQUE constraint would leave the DB in an invalid state, so the database rejects it.",
        },
      ],
    },
    {
      slug: "lost-update",
      title: "The Lost Update Problem",
      blurb: "Two writes to the same row — one silently disappears.",
      xp: 35,
      language: "sql",
      setup: INVENTORY,
      content: `# The Lost Update Problem

Imagine two warehouse workers both read the stock of Widget (100 units) at the
same time. Worker A ships 10, Worker B ships 5. They each do:

\`\`\`sql
-- Worker A reads stock = 100, writes 100 - 10 = 90
UPDATE products SET stock = stock - 10 WHERE id = 1;

-- Worker B (at the same time) read stock = 100, writes 100 - 5 = 95
UPDATE products SET stock = stock - 5  WHERE id = 1;
\`\`\`

If B commits last, stock becomes **95** — B's write **overwrote** A's deduction.
15 units shipped but only 5 were recorded missing. This is a **lost update**.

The fix: do both updates in a **single transaction** or use locking, so the
reads and writes are serialized.

Table: \`products(id, name, stock, reserved)\` — Widget stock=100.

## Your task
Perform both deductions — subtract 10 then subtract 5 from Widget's stock (id=1)
— in a **single transaction** so neither is lost. Then
\`SELECT id, name, stock FROM products ORDER BY id\`.`,
      starterCode: `-- Deduct 10 then 5 from Widget stock in one transaction
BEGIN;

COMMIT;

SELECT id, name, stock FROM products ORDER BY id;`,
      solution: `BEGIN;
UPDATE products SET stock = stock - 10 WHERE id = 1;
UPDATE products SET stock = stock - 5  WHERE id = 1;
COMMIT;

SELECT id, name, stock FROM products ORDER BY id;`,
      tests: [
        { name: "Widget stock is 85 (100 - 10 - 5)", code: "" },
        { name: "Gadget stock unchanged at 50", code: "" },
        { name: "Doohickey stock unchanged at 20", code: "" },
      ],
      hints: [
        "Both UPDATE statements go inside the same BEGIN … COMMIT block.",
        "First: UPDATE products SET stock = stock - 10 WHERE id = 1;",
        "Second: UPDATE products SET stock = stock - 5 WHERE id = 1;",
        "End with COMMIT; then the SELECT.",
      ],
      explanation: `When both deductions run inside a single transaction, the second UPDATE sees the result of the first (stock=90) and correctly writes 85. Grouping related writes in one transaction is the simplest defense against the lost update anomaly.`,
    },
    {
      slug: "isolation-levels-quiz",
      title: "Isolation Levels",
      blurb: "Choose the right trade-off between correctness and concurrency.",
      xp: 35,
      kind: "quiz",
      content: `# Isolation Levels

SQL defines four standard isolation levels, each allowing different anomalies in
exchange for higher concurrency:

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|-----------|---------------------|--------------|
| **READ UNCOMMITTED** | Possible | Possible | Possible |
| **READ COMMITTED** | Prevented | Possible | Possible |
| **REPEATABLE READ** | Prevented | Prevented | Possible |
| **SERIALIZABLE** | Prevented | Prevented | Prevented |

### The three anomalies explained

**Dirty read** — Transaction A reads a row modified by Transaction B *before* B
commits. If B rolls back, A has read data that never officially existed.

**Non-repeatable read** — Transaction A reads a row, then Transaction B updates
and commits it, then A reads the same row again and sees a *different* value.

**Phantom read** — Transaction A queries a range (e.g., \`WHERE balance > 500\`),
Transaction B inserts a new row in that range and commits, then A re-runs the
same query and sees a *new (phantom) row*.

### Practical defaults

- Most databases (PostgreSQL, MySQL) default to **READ COMMITTED**.
- PostgreSQL's REPEATABLE READ is actually snapshot-based (no phantom reads).
- Use **SERIALIZABLE** for financial totals, inventory checks, or any "read then
  write based on what you read" workflow.`,
      questions: [
        {
          prompt:
            "Transaction A reads Bob's balance as $500. Transaction B hasn't committed yet but updated Bob to $300. Transaction A is reading $300 — what anomaly is this?",
          options: [
            "Phantom read",
            "Non-repeatable read",
            "Dirty read",
            "Lost update",
          ],
          answer: 2,
          explanation:
            "A dirty read occurs when a transaction reads uncommitted changes from another transaction. If B rolls back, A was reading data that never officially existed.",
        },
        {
          prompt:
            "Which isolation level prevents dirty reads but still allows non-repeatable reads?",
          options: [
            "READ UNCOMMITTED",
            "READ COMMITTED",
            "REPEATABLE READ",
            "SERIALIZABLE",
          ],
          answer: 1,
          explanation:
            "READ COMMITTED prevents dirty reads (only committed data is visible) but a second read in the same transaction may see updates committed by another transaction between the two reads.",
        },
        {
          prompt:
            "An inventory check counts 5 items with stock > 0. Before the transaction commits, another transaction inserts a 6th item. The count re-runs and returns 6. What is this anomaly?",
          options: [
            "Dirty read",
            "Non-repeatable read",
            "Phantom read",
            "Deadlock",
          ],
          answer: 2,
          explanation:
            "A phantom read occurs when a range query returns different rows because another transaction inserted (or deleted) rows in that range between two reads within the same transaction.",
        },
        {
          prompt:
            "You are writing a ticket-booking system that reads available seats and then reserves one. Which isolation level is safest to prevent two users reserving the same last seat?",
          options: [
            "READ UNCOMMITTED",
            "READ COMMITTED",
            "REPEATABLE READ",
            "SERIALIZABLE",
          ],
          answer: 3,
          explanation:
            "SERIALIZABLE makes transactions behave as if they ran one after the other. A concurrent reservation will either see the seat taken or will be forced to retry, preventing double-booking.",
        },
        {
          prompt:
            "Transaction A reads an account balance twice in the same transaction. Between the reads, Transaction B commits an update. Transaction A sees different values for the same row. What anomaly is this?",
          options: [
            "Dirty read",
            "Non-repeatable read",
            "Phantom read",
            "Durability failure",
          ],
          answer: 1,
          explanation:
            "A non-repeatable read happens when the same row is read twice in one transaction and returns different values because another transaction committed a change in between. REPEATABLE READ prevents this.",
        },
      ],
    },
    {
      slug: "reserved-stock-pattern",
      title: "Reserve-Then-Confirm Pattern",
      blurb: "A two-phase stock hold that prevents overselling.",
      xp: 40,
      language: "sql",
      setup: INVENTORY,
      content: `# Reserve-Then-Confirm Pattern

E-commerce and ticketing systems use a **reserve-then-confirm** pattern to
prevent overselling without holding a long transaction open:

1. **Reserve** — increment \`reserved\`, check \`stock - reserved >= 0\`.
2. **Confirm** — decrement both \`stock\` and \`reserved\` when payment clears.
3. **Release** — decrement \`reserved\` if the user abandons the cart.

Both the reservation and the confirmation use transactions so they're atomic.

\`\`\`sql
-- Step 1: reserve 3 Widgets
BEGIN;
UPDATE products SET reserved = reserved + 3 WHERE id = 1;
-- business rule check: stock - reserved must stay >= 0
-- (your app code would check this and ROLLBACK if not)
COMMIT;
\`\`\`

Table: \`products(id, name, stock, reserved)\` — Widget stock=100, reserved=0.

## Your task
In a single transaction:
1. Reserve **10** Widgets (id=1): add 10 to \`reserved\`.
2. Confirm **10** Widgets: subtract 10 from \`stock\` AND subtract 10 from \`reserved\`.

Then \`SELECT id, name, stock, reserved FROM products ORDER BY id\`.

Expected result: Widget stock=**90**, reserved=**0**.`,
      starterCode: `-- Reserve 10 Widgets, then confirm (deduct stock + clear reserved), then SELECT
BEGIN;

COMMIT;

SELECT id, name, stock, reserved FROM products ORDER BY id;`,
      solution: `BEGIN;
UPDATE products SET reserved = reserved + 10 WHERE id = 1;
UPDATE products SET stock = stock - 10, reserved = reserved - 10 WHERE id = 1;
COMMIT;

SELECT id, name, stock, reserved FROM products ORDER BY id;`,
      tests: [
        { name: "Widget stock is 90", code: "" },
        { name: "Widget reserved is 0", code: "" },
        { name: "Gadget and Doohickey unchanged", code: "" },
      ],
      hints: [
        "First UPDATE: SET reserved = reserved + 10 WHERE id = 1.",
        "Second UPDATE: SET stock = stock - 10, reserved = reserved - 10 WHERE id = 1.",
        "Both UPDATEs go inside the same BEGIN … COMMIT block.",
      ],
      explanation: `Because both the reservation increment and the confirmation decrement happen in one transaction, there is no window where \`reserved\` is inflated without a corresponding \`stock\` reduction. The net effect on \`reserved\` is zero and \`stock\` decreases by exactly 10 — matching a real confirmed purchase.`,
    },
    {
      slug: "transaction-with-check",
      title: "Conditional Commit vs Rollback",
      blurb: "Only commit a transfer if the sender has enough funds.",
      xp: 45,
      language: "sql",
      setup: ACCOUNTS,
      content: `# Conditional Commit vs Rollback

Real applications check business rules *inside* a transaction before committing.
If the rule fails, they \`ROLLBACK\` instead of \`COMMIT\`.

SQLite doesn't have IF/THEN in plain SQL, but you can use a **CHECK constraint**
or the application layer. For this exercise, we'll model the happy path: a valid
transfer that satisfies the rule \`sender balance - amount >= 0\`.

Scenario: Transfer **\$400** from Bob (id=2, balance=500) to Carol (id=3).
Bob has \$500, so \$400 is fine. The result should be Bob=100, Carol=1150.

Table: \`accounts(id, name, balance)\` — Alice=1000, Bob=500, Carol=750.

## Your task
Transfer \$400 from Bob (id=2) to Carol (id=3) inside a transaction.
\`SELECT id, name, balance FROM accounts ORDER BY id\`.`,
      starterCode: `-- Transfer $400 from Bob to Carol in a transaction, then SELECT
BEGIN;

COMMIT;

SELECT id, name, balance FROM accounts ORDER BY id;`,
      solution: `BEGIN;
UPDATE accounts SET balance = balance - 400 WHERE id = 2;
UPDATE accounts SET balance = balance + 400 WHERE id = 3;
COMMIT;

SELECT id, name, balance FROM accounts ORDER BY id;`,
      tests: [
        { name: "Alice balance unchanged at 1000", code: "" },
        { name: "Bob balance is 100 (500 - 400)", code: "" },
        { name: "Carol balance is 1150 (750 + 400)", code: "" },
      ],
      hints: [
        "Deduct 400 from Bob: UPDATE accounts SET balance = balance - 400 WHERE id = 2;",
        "Credit 400 to Carol: UPDATE accounts SET balance = balance + 400 WHERE id = 3;",
        "Wrap both in BEGIN … COMMIT; then end with the SELECT.",
      ],
      explanation: `In production code, between the debit and credit you would query Bob's balance and call \`ROLLBACK\` if insufficient. Because the check and the writes are inside one transaction, no other session can drain Bob's account between the check and the commit — that race condition is exactly what isolation prevents.`,
    },
    {
      slug: "deadlock-and-best-practices",
      title: "Deadlocks & Transaction Best Practices",
      blurb: "Short transactions, consistent lock order, and retry logic.",
      xp: 30,
      kind: "quiz",
      content: `# Deadlocks & Transaction Best Practices

A **deadlock** occurs when two transactions are each waiting for a lock held by
the other:

- Transaction A locks Row 1, then tries to lock Row 2.
- Transaction B locks Row 2, then tries to lock Row 1.
- Neither can proceed — the database detects the cycle and kills one of them.

### How to avoid deadlocks

1. **Always lock resources in the same order.** If every transaction touches
   accounts in ascending ID order, a cycle can never form.
2. **Keep transactions short.** Long-running transactions hold locks longer,
   increasing the chance of contention.
3. **Retry on deadlock.** Databases report a deadlock error; your application
   should catch it and retry the transaction.
4. **Avoid user interaction inside a transaction.** Never wait for user input
   while a transaction is open — the lock could be held for minutes.

### General transaction hygiene

- Fetch the data you need **before** opening the transaction when possible.
- Do the minimum work inside \`BEGIN … COMMIT\`.
- Use the **lowest isolation level** that still satisfies your correctness
  requirements — higher isolation = more lock contention.
- Always handle the error path: every \`BEGIN\` should have a matching \`COMMIT\`
  or \`ROLLBACK\` in your code, never a code path that exits without one.`,
      questions: [
        {
          prompt:
            "Transaction A holds a lock on Row 1 and wants Row 2. Transaction B holds a lock on Row 2 and wants Row 1. What is this called?",
          options: [
            "A dirty read",
            "A deadlock",
            "A phantom read",
            "A lost update",
          ],
          answer: 1,
          explanation:
            "A deadlock is a cycle of transactions each waiting for a lock the other holds. The database resolves it by aborting one of the transactions.",
        },
        {
          prompt:
            "The simplest way to prevent deadlocks between transactions that touch the same rows is to:",
          options: [
            "Use READ UNCOMMITTED so no locks are taken",
            "Always acquire locks on rows in the same consistent order (e.g., ascending ID)",
            "Never use transactions",
            "Use a SELECT before every UPDATE",
          ],
          answer: 1,
          explanation:
            "If all transactions access shared resources in the same order, a circular wait cycle cannot form, and deadlocks are eliminated.",
        },
        {
          prompt: "Which practice is safest when handling a transaction in application code?",
          options: [
            "Open the transaction, prompt the user for input, then COMMIT",
            "Keep transactions as short as possible and always pair BEGIN with either COMMIT or ROLLBACK in every code path",
            "Use SERIALIZABLE for every query to be safe",
            "Never use transactions — they slow things down",
          ],
          answer: 1,
          explanation:
            "Short transactions minimize lock hold time and contention. Every code path must close the transaction — a missing ROLLBACK in an error path is a common source of connection-pool exhaustion in production.",
        },
      ],
    },
  ],
};
