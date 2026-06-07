import type { Module } from "./types";

// Portfolio JS Apps — real JavaScript app-logic projects.
// Each lesson is a self-contained mini-app: a clear spec, typed stub,
// working solution, and auto-graded tests. All pure logic — no DOM, no async.
export const portfolioJsApps: Module = {
  slug: "portfolio-js-apps",
  title: "JavaScript App Logic",
  description:
    "Build the logic engines behind real apps. Five complete JavaScript projects — todo manager, shopping cart, expense splitter, habit tracker, and poll tally — each with a spec, tests, and a solution you can ship.",
  emoji: "📲",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline: "build JavaScript app logic for your portfolio",
  language: "js",
  keywords: [
    "javascript projects",
    "javascript portfolio",
    "js app logic",
    "todo manager javascript",
    "shopping cart javascript",
    "expense splitter javascript",
    "habit tracker javascript",
    "poll tally javascript",
    "javascript mini projects",
  ],
  free: false,
  lessons: [
    // ── 1 ─────────────────────────────────────────────────────────────────────
    {
      slug: "todo-manager",
      title: "Todo Manager",
      blurb: "CRUD, filtering, and priorities — the canonical first app, done properly.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`TodoManager\` class that stores tasks and exposes the full create / read / update / delete surface. This is the foundation of almost every data-driven app ever written.

## Requirements

- \`add(text, priority)\` — add a task; \`priority\` is \`"low"\`, \`"medium"\`, or \`"high"\` (default \`"medium"\`). Return the new task object: \`{ id, text, priority, done: false }\`.
- \`complete(id)\` — mark the task done. Return \`true\` if found, \`false\` otherwise.
- \`remove(id)\` — delete the task. Return \`true\` if removed, \`false\` if not found.
- \`getAll()\` — return all tasks (any order).
- \`getByPriority(priority)\` — return tasks matching that priority that are **not yet done**.
- \`pendingCount()\` — return the number of tasks where \`done === false\`.

## Stretch goals

- Add an \`edit(id, text)\` method that updates the text of an existing task.
- Add a \`sort()\` method that returns all tasks ordered high → medium → low.

## What this proves

You understand CRUD, filtering with \`Array.filter\`, object mutation, and unique IDs — the exact skills every junior dev interview tests with a whiteboard problem.`,
      starterCode: `class TodoManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  add(text, priority = "medium") {
    // Create a task object { id, text, priority, done: false }
    // Push it to this.tasks and return it
    // TODO
  }

  complete(id) {
    // Find task by id, set done = true, return true
    // Return false if not found
    // TODO
    return false;
  }

  remove(id) {
    // Remove task by id, return true
    // Return false if not found
    // TODO
    return false;
  }

  getAll() {
    // Return all tasks
    // TODO
    return [];
  }

  getByPriority(priority) {
    // Return tasks matching priority that are not done
    // TODO
    return [];
  }

  pendingCount() {
    // Return count of tasks where done === false
    // TODO
    return 0;
  }
}
`,
      solution: `class TodoManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  add(text, priority = "medium") {
    const task = { id: this.nextId++, text, priority, done: false };
    this.tasks.push(task);
    return task;
  }

  complete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return false;
    task.done = true;
    return true;
  }

  remove(id) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    return true;
  }

  getAll() {
    return this.tasks;
  }

  getByPriority(priority) {
    return this.tasks.filter(t => t.priority === priority && !t.done);
  }

  pendingCount() {
    return this.tasks.filter(t => !t.done).length;
  }
}
`,
      tests: [
        {
          name: "add returns task with correct shape",
          code: `const tm = new TodoManager();
const task = tm.add("Write tests", "high");
assertEquals(task.id, 1);
assertEquals(task.text, "Write tests");
assertEquals(task.priority, "high");
assertEquals(task.done, false);`,
        },
        {
          name: "complete marks done and remove deletes",
          code: `const tm = new TodoManager();
const t = tm.add("Deploy app");
assertEquals(tm.complete(t.id), true);
assertEquals(tm.getAll()[0].done, true);
assertEquals(tm.remove(t.id), true);
assertEquals(tm.getAll().length, 0);`,
        },
        {
          name: "getByPriority excludes done tasks",
          code: `const tm = new TodoManager();
tm.add("Low task", "low");
const hi = tm.add("High task", "high");
tm.complete(hi.id);
const highs = tm.getByPriority("high");
assertEquals(highs.length, 0);
const lows = tm.getByPriority("low");
assertEquals(lows.length, 1);`,
        },
        {
          name: "pendingCount tracks incomplete tasks",
          code: `const tm = new TodoManager();
tm.add("A");
tm.add("B");
const c = tm.add("C");
tm.complete(c.id);
assertEquals(tm.pendingCount(), 2);`,
        },
      ],
      hints: [
        "Use `this.nextId++` to assign incrementing IDs — post-increment returns the current value then bumps it.",
        "For `complete` and `remove`, use `Array.find` / `Array.findIndex` to locate the task, then mutate or splice.",
        "`getByPriority` is a one-liner: `this.tasks.filter(t => t.priority === priority && !t.done)`.",
      ],
    },

    // ── 2 ─────────────────────────────────────────────────────────────────────
    {
      slug: "shopping-cart",
      title: "Shopping Cart with Discounts",
      blurb: "Model a cart, apply coupon codes, and compute accurate totals.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`ShoppingCart\` class that manages line items and applies discount codes at checkout. E-commerce logic is one of the most common real-world JS exercises — and interviewers love asking about rounding and edge cases.

## Requirements

- \`addItem(name, price, qty)\` — add or update a line item. If the same \`name\` already exists, **add** to its quantity. Return the cart (for chaining).
- \`removeItem(name)\` — remove a line item by name. Return \`true\` if removed, \`false\` if not found.
- \`applyCoupon(code)\` — apply a discount. Coupons are: \`"SAVE10"\` (10% off), \`"SAVE20"\` (20% off), \`"FLAT5"\` (flat $5 off). Return \`true\` if valid, \`false\` if unknown.
- \`getSubtotal()\` — sum of \`price × qty\` for all items, rounded to 2 decimal places.
- \`getTotal()\` — subtotal minus any applied discount, never below 0, rounded to 2 decimal places.
- \`itemCount()\` — total quantity of all items in the cart.

## Stretch goals

- Support stacking multiple coupons (each applies to the running total).
- Add a \`clear()\` method that empties the cart and removes any coupon.

## What this proves

You can model real business rules cleanly: data aggregation, conditional discounts, floating-point rounding — the staples of any payments or e-commerce feature.`,
      starterCode: `class ShoppingCart {
  constructor() {
    this.items = {};  // name → { name, price, qty }
    this.coupon = null;
  }

  addItem(name, price, qty = 1) {
    // If item exists, add qty. Otherwise create it.
    // Return this (for chaining)
    // TODO
    return this;
  }

  removeItem(name) {
    // Delete item by name. Return true/false.
    // TODO
    return false;
  }

  applyCoupon(code) {
    // Valid codes: SAVE10, SAVE20, FLAT5
    // Store the code and return true; return false if unknown
    // TODO
    return false;
  }

  getSubtotal() {
    // Sum price * qty for all items, round to 2 dp
    // TODO
    return 0;
  }

  getTotal() {
    // Apply coupon discount to subtotal; never below 0; round to 2 dp
    // TODO
    return 0;
  }

  itemCount() {
    // Total qty across all items
    // TODO
    return 0;
  }
}
`,
      solution: `class ShoppingCart {
  constructor() {
    this.items = {};
    this.coupon = null;
  }

  addItem(name, price, qty = 1) {
    if (this.items[name]) {
      this.items[name].qty += qty;
    } else {
      this.items[name] = { name, price, qty };
    }
    return this;
  }

  removeItem(name) {
    if (!this.items[name]) return false;
    delete this.items[name];
    return true;
  }

  applyCoupon(code) {
    const valid = ["SAVE10", "SAVE20", "FLAT5"];
    if (!valid.includes(code)) return false;
    this.coupon = code;
    return true;
  }

  getSubtotal() {
    const sum = Object.values(this.items).reduce((acc, i) => acc + i.price * i.qty, 0);
    return Math.round(sum * 100) / 100;
  }

  getTotal() {
    let total = this.getSubtotal();
    if (this.coupon === "SAVE10") total *= 0.9;
    else if (this.coupon === "SAVE20") total *= 0.8;
    else if (this.coupon === "FLAT5") total -= 5;
    total = Math.max(0, total);
    return Math.round(total * 100) / 100;
  }

  itemCount() {
    return Object.values(this.items).reduce((acc, i) => acc + i.qty, 0);
  }
}
`,
      tests: [
        {
          name: "addItem accumulates quantity for duplicates",
          code: `const cart = new ShoppingCart();
cart.addItem("Apple", 1.50, 3);
cart.addItem("Apple", 1.50, 2);
assertEquals(cart.itemCount(), 5);
assertEquals(cart.getSubtotal(), 7.5);`,
        },
        {
          name: "SAVE20 coupon reduces total by 20%",
          code: `const cart = new ShoppingCart();
cart.addItem("Widget", 10, 2);
cart.applyCoupon("SAVE20");
assertEquals(cart.getTotal(), 16);`,
        },
        {
          name: "FLAT5 coupon deducts $5 flat",
          code: `const cart = new ShoppingCart();
cart.addItem("Gadget", 8, 1);
cart.applyCoupon("FLAT5");
assertEquals(cart.getTotal(), 3);`,
        },
        {
          name: "total never goes below zero",
          code: `const cart = new ShoppingCart();
cart.addItem("Sticker", 2, 1);
cart.applyCoupon("FLAT5");
assertEquals(cart.getTotal(), 0);`,
        },
      ],
      hints: [
        "Use an object keyed by name (`this.items = {}`) so duplicate-detection is an O(1) lookup.",
        "For percentage discounts multiply: `total * 0.9` for 10% off, `total * 0.8` for 20% off.",
        "Round with `Math.round(value * 100) / 100` to safely get 2 decimal places.",
      ],
    },

    // ── 3 ─────────────────────────────────────────────────────────────────────
    {
      slug: "expense-splitter",
      title: "Expense Splitter",
      blurb: "Who owes whom? Model group expenses and compute the simplest settlements.",
      xp: 50,
      language: "js",
      content: `## What you're building

An \`ExpenseSplitter\` class for group trips or shared housing. Users log expenses, and the class figures out the minimum payments so everyone ends up even — a classic graph / balance problem.

## Requirements

- \`addMember(name)\` — register a participant. No-op if already added.
- \`addExpense(payer, amount, participants)\` — \`payer\` paid \`amount\` total, split equally among \`participants\` (array of names, including the payer). The payer's share is deducted from what they're owed.
- \`getBalance(name)\` — return the net balance for a member: positive means others owe them, negative means they owe money, 0 means even.
- \`getSettlements()\` — return an array of \`{ from, to, amount }\` objects (amounts rounded to 2 dp) representing the smallest set of transactions that zeroes every balance. Order does not matter.

## Stretch goals

- Enforce that all names in \`participants\` must be registered members (throw an error otherwise).
- Add \`reset()\` to clear all expenses while keeping the member list.

## What this proves

You can model a real financial algorithm, handle floating-point bookkeeping carefully, and produce a clean summary — the kind of feature in Splitwise, Tricount, and countless fintech apps.`,
      starterCode: `class ExpenseSplitter {
  constructor() {
    this.members = new Set();
    this.balances = {}; // name → net balance
  }

  addMember(name) {
    // Register name; no-op if already present
    // TODO
  }

  addExpense(payer, amount, participants) {
    // Split amount equally among participants.
    // Each participant's balance decreases by their share.
    // Payer's balance increases by amount (they paid), then decreases by their own share.
    // Net effect on payer: balance += amount - share; on others: balance -= share
    // TODO
  }

  getBalance(name) {
    // Return net balance for name (0 if unknown)
    // TODO
    return 0;
  }

  getSettlements() {
    // Greedily settle: find the person who owes the most and the person owed
    // the most, make them transact, repeat until all balances are ~0.
    // Return [{ from, to, amount }]
    // TODO
    return [];
  }
}
`,
      solution: `class ExpenseSplitter {
  constructor() {
    this.members = new Set();
    this.balances = {};
  }

  addMember(name) {
    if (this.members.has(name)) return;
    this.members.add(name);
    this.balances[name] = 0;
  }

  addExpense(payer, amount, participants) {
    const share = amount / participants.length;
    for (const p of participants) {
      this.balances[p] = (this.balances[p] || 0) - share;
    }
    this.balances[payer] = (this.balances[payer] || 0) + amount;
  }

  getBalance(name) {
    return Math.round((this.balances[name] || 0) * 100) / 100;
  }

  getSettlements() {
    const balances = {};
    for (const [k, v] of Object.entries(this.balances)) {
      balances[k] = v;
    }
    const settlements = [];
    const eps = 0.001;
    // Max iterations bounded by member count squared — no unbounded loop
    const maxIter = Object.keys(balances).length * Object.keys(balances).length + 10;
    let iter = 0;
    while (iter < maxIter) {
      iter++;
      const debtors = Object.entries(balances).filter(([, v]) => v < -eps).sort((a, b) => a[1] - b[1]);
      const creditors = Object.entries(balances).filter(([, v]) => v > eps).sort((a, b) => b[1] - a[1]);
      if (debtors.length === 0 || creditors.length === 0) break;
      const [dName, dBal] = debtors[0];
      const [cName, cBal] = creditors[0];
      const transfer = Math.min(-dBal, cBal);
      settlements.push({ from: dName, to: cName, amount: Math.round(transfer * 100) / 100 });
      balances[dName] += transfer;
      balances[cName] -= transfer;
    }
    return settlements;
  }
}
`,
      tests: [
        {
          name: "getBalance reflects who paid",
          code: `const es = new ExpenseSplitter();
es.addMember("Alice");
es.addMember("Bob");
es.addMember("Carol");
es.addExpense("Alice", 30, ["Alice", "Bob", "Carol"]);
assertEquals(es.getBalance("Alice"), 20);
assertEquals(es.getBalance("Bob"), -10);
assertEquals(es.getBalance("Carol"), -10);`,
        },
        {
          name: "getSettlements zeroes balances",
          code: `const es = new ExpenseSplitter();
es.addMember("Alice");
es.addMember("Bob");
es.addMember("Carol");
es.addExpense("Alice", 60, ["Alice", "Bob", "Carol"]);
const s = es.getSettlements();
// Two transactions: Bob→Alice 20, Carol→Alice 20
assertEquals(s.length, 2);
const total = s.reduce((acc, t) => acc + t.amount, 0);
assertEquals(total, 40);`,
        },
        {
          name: "already-even group has no settlements",
          code: `const es = new ExpenseSplitter();
es.addMember("X");
es.addMember("Y");
es.addExpense("X", 10, ["X", "Y"]);
es.addExpense("Y", 10, ["X", "Y"]);
assertEquals(es.getSettlements().length, 0);`,
        },
      ],
      hints: [
        "Think of `addExpense` as: payer gains `amount` (they fronted the cash) and each participant (including payer) loses their equal share.",
        "For `getSettlements`, the greedy approach works: repeatedly match the biggest debtor with the biggest creditor.",
        "Use `Math.round(value * 100) / 100` to avoid floating-point drift in balance checks.",
      ],
    },

    // ── 4 ─────────────────────────────────────────────────────────────────────
    {
      slug: "habit-tracker",
      title: "Habit Tracker Streak Logic",
      blurb: "Build the streak and completion engine behind apps like Duolingo and Streaks.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`HabitTracker\` that records which days a user completed each habit and computes their current streak and longest streak. Streak logic is deceptively tricky — get it right and you understand date arithmetic and state machines.

## Requirements

- \`addHabit(name)\` — register a new habit.
- \`logCompletion(name, dateStr)\` — mark habit \`name\` as completed on \`dateStr\` (ISO format: \`"2024-03-15"\`). Ignore duplicate log calls for the same day.
- \`getStreak(name, todayStr)\` — return the current streak: number of **consecutive days ending on or including \`todayStr\`** where the habit was completed. If today is not completed, the streak is 0.
- \`getLongestStreak(name)\` — return the all-time longest consecutive-day streak for the habit.
- \`getCompletedDays(name)\` — return a sorted array of date strings for which the habit was logged.

## Stretch goals

- Add \`getAllHabits()\` that returns each habit name with its current streak and longest streak.
- Handle the case where \`getStreak\` is called with yesterday as "today" (i.e., allow a grace day).

## What this proves

You can work with date arithmetic (no library needed — just compare ISO strings and use \`Date\` arithmetic), manage sorted sets, and compute window-based aggregates — skills that appear in analytics dashboards, fitness apps, and learning platforms.`,
      starterCode: `class HabitTracker {
  constructor() {
    this.habits = {}; // name → Set of "YYYY-MM-DD" strings
  }

  addHabit(name) {
    // Register habit if not already present
    // TODO
  }

  logCompletion(name, dateStr) {
    // Add dateStr to the habit's set (ignore duplicates automatically)
    // TODO
  }

  getCompletedDays(name) {
    // Return sorted array of date strings for this habit
    // TODO
    return [];
  }

  getStreak(name, todayStr) {
    // Count consecutive days ending on todayStr.
    // If todayStr not completed → 0.
    // Hint: walk backwards from todayStr, subtracting one day at a time.
    // TODO
    return 0;
  }

  getLongestStreak(name) {
    // Compute longest consecutive streak across all logged days.
    // TODO
    return 0;
  }
}
`,
      solution: `class HabitTracker {
  constructor() {
    this.habits = {};
  }

  addHabit(name) {
    if (!this.habits[name]) this.habits[name] = new Set();
  }

  logCompletion(name, dateStr) {
    if (!this.habits[name]) this.habits[name] = new Set();
    this.habits[name].add(dateStr);
  }

  getCompletedDays(name) {
    const days = Array.from(this.habits[name] || []);
    return days.sort();
  }

  _prevDay(dateStr) {
    const d = new Date(dateStr + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
  }

  getStreak(name, todayStr) {
    const set = this.habits[name] || new Set();
    if (!set.has(todayStr)) return 0;
    let streak = 0;
    let current = todayStr;
    const maxDays = set.size + 1; // bounded by number of logged days
    for (let i = 0; i < maxDays; i++) {
      if (!set.has(current)) break;
      streak++;
      current = this._prevDay(current);
    }
    return streak;
  }

  getLongestStreak(name) {
    const days = this.getCompletedDays(name);
    if (days.length === 0) return 0;
    let longest = 1;
    let current = 1;
    for (let i = 1; i < days.length; i++) {
      const prev = new Date(days[i - 1] + "T00:00:00Z");
      const curr = new Date(days[i] + "T00:00:00Z");
      const diff = (curr - prev) / 86400000;
      if (diff === 1) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 1;
      }
    }
    return longest;
  }
}
`,
      tests: [
        {
          name: "getStreak returns consecutive count ending today",
          code: `const ht = new HabitTracker();
ht.addHabit("Run");
ht.logCompletion("Run", "2024-03-13");
ht.logCompletion("Run", "2024-03-14");
ht.logCompletion("Run", "2024-03-15");
assertEquals(ht.getStreak("Run", "2024-03-15"), 3);`,
        },
        {
          name: "getStreak is 0 when today is not completed",
          code: `const ht = new HabitTracker();
ht.addHabit("Read");
ht.logCompletion("Read", "2024-03-13");
ht.logCompletion("Read", "2024-03-14");
assertEquals(ht.getStreak("Read", "2024-03-15"), 0);`,
        },
        {
          name: "getLongestStreak finds best run",
          code: `const ht = new HabitTracker();
ht.addHabit("Meditate");
ht.logCompletion("Meditate", "2024-01-01");
ht.logCompletion("Meditate", "2024-01-02");
ht.logCompletion("Meditate", "2024-01-03");
ht.logCompletion("Meditate", "2024-01-10");
ht.logCompletion("Meditate", "2024-01-11");
assertEquals(ht.getLongestStreak("Meditate"), 3);`,
        },
        {
          name: "duplicate log calls do not inflate streak",
          code: `const ht = new HabitTracker();
ht.addHabit("Code");
ht.logCompletion("Code", "2024-05-01");
ht.logCompletion("Code", "2024-05-01");
ht.logCompletion("Code", "2024-05-02");
assertEquals(ht.getStreak("Code", "2024-05-02"), 2);
assertEquals(ht.getCompletedDays("Code").length, 2);`,
        },
      ],
      hints: [
        "Store dates in a `Set` — it ignores duplicates automatically and makes membership checks O(1).",
        "To subtract one day: create a `Date` with `new Date(dateStr + 'T00:00:00Z')`, call `setUTCDate(d.getUTCDate() - 1)`, then read back with `.toISOString().slice(0,10)`.",
        "For `getLongestStreak`, sort the days array and walk forward: when the gap between consecutive entries is exactly 1 day, extend the current run.",
      ],
    },

    // ── 5 ─────────────────────────────────────────────────────────────────────
    {
      slug: "poll-tally",
      title: "Poll & Vote Tally",
      blurb: "Build a multi-option poll engine with vote tracking and ranked results.",
      xp: 60,
      language: "js",
      content: `## What you're building

A \`Poll\` class that runs a multi-option vote — the kind of thing powering Slido, Mentimeter, or any live Q&A tool. You'll track who voted, prevent double-voting, and produce a ranked leaderboard.

## Requirements

- \`constructor(question, options)\` — \`question\` is a string; \`options\` is an array of unique option strings.
- \`vote(voterId, option)\` — cast a vote. Rules:
  - If \`option\` is not a valid option → throw \`Error("Invalid option")\`.
  - If \`voterId\` has already voted → throw \`Error("Already voted")\`.
  - Otherwise record the vote and return \`true\`.
- \`getResults()\` — return an array of \`{ option, votes }\` objects sorted by \`votes\` descending. Ties preserve original option order.
- \`getWinner()\` — return the option string with the most votes. If no votes have been cast, return \`null\`. On a tie, return whichever tied option appears first in the original list.
- \`totalVotes()\` — return the total number of votes cast.
- \`hasVoted(voterId)\` — return \`true\` if this voter has already voted.

## Stretch goals

- Add \`changeVote(voterId, newOption)\` that lets a voter switch their choice.
- Add \`reset()\` that clears all votes but keeps the question and options.

## What this proves

You can enforce business constraints (unique voters, valid options), produce aggregated leaderboards, and handle tie-breaking — patterns that appear in auction systems, leaderboards, and any feature where you rank items by count.`,
      starterCode: `class Poll {
  constructor(question, options) {
    this.question = question;
    this.options = options;       // original order preserved
    this.votes = {};              // option → count
    this.voters = new Set();     // set of voterIds who have voted
    for (const opt of options) this.votes[opt] = 0;
  }

  vote(voterId, option) {
    // Throw Error("Invalid option") if option not in this.options
    // Throw Error("Already voted") if voterId already voted
    // Otherwise record and return true
    // TODO
    return false;
  }

  getResults() {
    // Return [{ option, votes }] sorted by votes descending
    // Stable: ties keep original option order
    // TODO
    return [];
  }

  getWinner() {
    // Return option string with most votes, null if no votes cast
    // TODO
    return null;
  }

  totalVotes() {
    // Sum of all vote counts
    // TODO
    return 0;
  }

  hasVoted(voterId) {
    // TODO
    return false;
  }
}
`,
      solution: `class Poll {
  constructor(question, options) {
    this.question = question;
    this.options = options;
    this.votes = {};
    this.voters = new Set();
    for (const opt of options) this.votes[opt] = 0;
  }

  vote(voterId, option) {
    if (!this.options.includes(option)) throw new Error("Invalid option");
    if (this.voters.has(voterId)) throw new Error("Already voted");
    this.voters.add(voterId);
    this.votes[option]++;
    return true;
  }

  getResults() {
    return this.options
      .map(opt => ({ option: opt, votes: this.votes[opt] }))
      .sort((a, b) => b.votes - a.votes);
  }

  getWinner() {
    if (this.totalVotes() === 0) return null;
    return this.getResults()[0].option;
  }

  totalVotes() {
    return Object.values(this.votes).reduce((acc, v) => acc + v, 0);
  }

  hasVoted(voterId) {
    return this.voters.has(voterId);
  }
}
`,
      tests: [
        {
          name: "vote records correctly and totalVotes reflects count",
          code: `const p = new Poll("Fave color?", ["Red", "Blue", "Green"]);
p.vote("user1", "Blue");
p.vote("user2", "Blue");
p.vote("user3", "Red");
assertEquals(p.totalVotes(), 3);
assertEquals(p.hasVoted("user1"), true);
assertEquals(p.hasVoted("user99"), false);`,
        },
        {
          name: "getWinner returns leading option",
          code: `const p = new Poll("Best pet?", ["Cat", "Dog", "Fish"]);
p.vote("a", "Dog");
p.vote("b", "Dog");
p.vote("c", "Cat");
assertEquals(p.getWinner(), "Dog");`,
        },
        {
          name: "vote throws on invalid option and duplicate voter",
          code: `const p = new Poll("Q", ["A", "B"]);
p.vote("v1", "A");
let err1 = null;
try { p.vote("v1", "A"); } catch(e) { err1 = e.message; }
assertEquals(err1, "Already voted");
let err2 = null;
try { p.vote("v2", "Z"); } catch(e) { err2 = e.message; }
assertEquals(err2, "Invalid option");`,
        },
        {
          name: "getResults sorted descending with no votes returns zeros",
          code: `const p = new Poll("Season?", ["Spring", "Summer", "Fall", "Winter"]);
const r = p.getResults();
assertEquals(r.length, 4);
assertEquals(r[0].votes, 0);
assertEquals(p.getWinner(), null);`,
        },
      ],
      hints: [
        "Store voters in a `Set` — `voters.has(id)` is O(1) and prevents duplicates automatically.",
        "For a stable sort, map options to `{ option, votes }` in their original order first, then sort. JavaScript's `Array.sort` is stable in all modern engines.",
        "To check for invalid options use `this.options.includes(option)` — this list is short so O(n) is fine.",
      ],
    },
  ],
};
