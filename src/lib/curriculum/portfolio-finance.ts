import type { Module } from "./types";

// Portfolio Finance — five self-contained financial/math mini-projects that produce
// real, demonstrable code. Each lesson is a pure-JS function or class: no DOM,
// no async, no external deps. Auto-graded in-browser.
export const portfolioFinance: Module = {
  slug: "portfolio-finance",
  title: "Finance & Math Tools",
  description:
    "Build five real financial calculators from scratch — compound interest, loan amortisation, tip splitting, currency rounding, and running statistics. Pure logic, tested code, and something worth showing employers.",
  emoji: "💹",
  gradient: "from-green-400/20 to-emerald-600/10",
  tagline: "build financial math tools for your portfolio",
  language: "js",
  keywords: [
    "javascript finance",
    "financial calculator javascript",
    "compound interest code",
    "loan amortization javascript",
    "math projects portfolio",
  ],
  lessons: [
    // ── 1 ── COMPOUND INTEREST (Beginner, 40 XP) ──────────────────────────────
    {
      slug: "compound-interest",
      title: "Compound Interest Calculator",
      blurb: "See why compound interest is called the eighth wonder of the world.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`compoundInterest(principal, rate, n, t)\` function that returns the **final balance** after compound interest is applied.

The formula:

\`\`\`
A = P × (1 + r/n)^(n×t)
\`\`\`

- **P** — principal (starting amount)
- **r** — annual interest rate as a decimal (e.g. 0.05 for 5 %)
- **n** — compounding periods per year (12 = monthly, 4 = quarterly, 1 = annually)
- **t** — time in years

Return the result rounded to **2 decimal places**.

## Requirements

- Accept the four parameters above in the order \`(principal, rate, n, t)\`
- Return a \`number\` (not a string) rounded to 2 decimal places
- Handle edge cases: \`t = 0\` returns \`principal\`; \`principal = 0\` returns \`0\`

## Stretch goals

- Add a \`compoundSchedule(principal, rate, n, t)\` that returns an array of yearly balances
- Accept a monthly contribution parameter and add it each period

## What this proves

You understand exponential growth, floating-point rounding, and function design — all common in fintech interviews.`,
      starterCode: `function compoundInterest(principal, rate, n, t) {
  // Formula: A = P * (1 + r/n)^(n*t)
  // Return the result rounded to 2 decimal places.
  // TODO: implement
  return 0;
}
`,
      solution: `function compoundInterest(principal, rate, n, t) {
  const A = principal * Math.pow(1 + rate / n, n * t);
  return Math.round(A * 100) / 100;
}`,
      tests: [
        {
          name: "1000 at 5% annually for 10 years",
          code: `assertEquals(compoundInterest(1000, 0.05, 1, 10), 1628.89);`,
        },
        {
          name: "1000 at 5% monthly for 1 year",
          code: `assertEquals(compoundInterest(1000, 0.05, 12, 1), 1051.16);`,
        },
        {
          name: "t=0 returns principal unchanged",
          code: `assertEquals(compoundInterest(500, 0.1, 4, 0), 500);`,
        },
        {
          name: "principal=0 returns 0",
          code: `assertEquals(compoundInterest(0, 0.08, 12, 5), 0);`,
        },
      ],
      hints: [
        "Use Math.pow(base, exponent) for the exponentiation.",
        "To round to 2 decimal places: Math.round(value * 100) / 100",
        "When t is 0, Math.pow(anything, 0) === 1, so the formula handles it automatically.",
      ],
    },

    // ── 2 ── LOAN AMORTISATION (Intermediate, 50 XP) ─────────────────────────
    {
      slug: "loan-amortization",
      title: "Loan Amortization Schedule",
      blurb: "Model every payment of a mortgage or car loan, down to the cent.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`amortize(principal, annualRate, months)\` function that returns an **array of payment objects**, one per month, modelling a fully amortising fixed-rate loan.

Each object in the array:

\`\`\`js
{
  month:     1,          // payment number (1-indexed)
  payment:   537.30,     // fixed monthly payment (same every month)
  principal: 412.30,     // portion paying down the balance
  interest:  125.00,     // portion going to interest
  balance:   99587.70    // remaining balance after this payment
}
\`\`\`

All monetary values rounded to **2 decimal places**.

### Monthly payment formula

\`\`\`
monthlyRate = annualRate / 12
payment     = P × monthlyRate / (1 − (1 + monthlyRate)^(−months))
\`\`\`

When \`annualRate === 0\`, the payment is simply \`principal / months\`.

## Requirements

- Return an array of exactly \`months\` objects with the shape above
- The final \`balance\` must be \`0\` (adjust the last payment for rounding drift)
- Interest for each period = \`balance_before × monthlyRate\`, rounded to 2 dp
- Principal for each period = \`payment − interest\`

## Stretch goals

- Accept an extra-payment parameter to pay down faster
- Add a summary object: \`{ totalPaid, totalInterest }\`

## What this proves

You can implement real financial formulas, handle floating-point precision carefully, and return structured data — all valuable in any data-heavy role.`,
      starterCode: `function amortize(principal, annualRate, months) {
  // Return an array of { month, payment, principal, interest, balance }
  // one entry per month.
  // TODO: implement
  return [];
}
`,
      solution: `function amortize(principal, annualRate, months) {
  const r = annualRate / 12;
  let payment;
  if (r === 0) {
    payment = Math.round((principal / months) * 100) / 100;
  } else {
    payment = Math.round(
      (principal * r) / (1 - Math.pow(1 + r, -months)) * 100
    ) / 100;
  }
  const schedule = [];
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest = Math.round(balance * r * 100) / 100;
    let prinPart = Math.round((payment - interest) * 100) / 100;
    // Last payment: clear any rounding residual
    if (m === months) {
      prinPart = Math.round(balance * 100) / 100;
    }
    const newBalance = Math.round((balance - prinPart) * 100) / 100;
    schedule.push({
      month: m,
      payment: m === months ? Math.round((prinPart + interest) * 100) / 100 : payment,
      principal: prinPart,
      interest,
      balance: newBalance < 0 ? 0 : newBalance,
    });
    balance = newBalance < 0 ? 0 : newBalance;
  }
  return schedule;
}`,
      tests: [
        {
          name: "returns correct number of payments",
          code: `const s = amortize(10000, 0.06, 12);
assertEquals(s.length, 12);`,
        },
        {
          name: "first month interest is correct",
          code: `const s = amortize(12000, 0.06, 24);
// monthlyRate = 0.005; interest = 12000 * 0.005 = 60
assertEquals(s[0].interest, 60);`,
        },
        {
          name: "final balance is 0",
          code: `const s = amortize(5000, 0.05, 36);
assertEquals(s[s.length - 1].balance, 0);`,
        },
        {
          name: "zero interest splits evenly",
          code: `const s = amortize(1200, 0, 12);
assertEquals(s[0].payment, 100);
assertEquals(s[0].interest, 0);`,
        },
      ],
      hints: [
        "Calculate the fixed monthly payment first using the amortisation formula, then loop month-by-month.",
        "Each month: interest = remainingBalance × monthlyRate. Principal = payment − interest.",
        "For the last payment, set principal = remaining balance to eliminate rounding drift.",
      ],
    },

    // ── 3 ── TIP SPLITTER (Beginner, 40 XP) ──────────────────────────────────
    {
      slug: "tip-splitter",
      title: "Tip Splitter",
      blurb: "Split a restaurant bill fairly — the app every bootcamp skips but every interviewer loves.",
      xp: 40,
      language: "js",
      content: `## What you're building

A \`splitBill(subtotal, tipPercent, people)\` function that returns an object describing how to fairly divide a restaurant bill.

\`\`\`js
splitBill(80, 20, 4)
// →
{
  subtotal:   80,
  tip:        16,       // subtotal × tipPercent / 100, rounded to 2 dp
  total:      96,       // subtotal + tip
  perPerson:  24,       // total / people, rounded to 2 dp
}
\`\`\`

## Requirements

- \`tipPercent\` is a plain percentage number (15 means 15 %, not 0.15)
- All returned values rounded to **2 decimal places**
- Throw an \`Error\` with the message \`"people must be at least 1"\` when \`people < 1\`
- Throw an \`Error\` with the message \`"subtotal must be positive"\` when \`subtotal <= 0\`

## Stretch goals

- Add a \`splitCustom(subtotal, tipAmount, people)\` that accepts a fixed tip dollar amount
- Return each person's share as an array when people have different split ratios

## What this proves

Input validation, arithmetic, and returning structured objects — the exact pattern used in payment microservices and point-of-sale software.`,
      starterCode: `function splitBill(subtotal, tipPercent, people) {
  // Validate inputs, then return { subtotal, tip, total, perPerson }
  // Tip = subtotal * tipPercent / 100
  // All values rounded to 2 decimal places.
  // TODO: implement
  return {};
}
`,
      solution: `function splitBill(subtotal, tipPercent, people) {
  if (subtotal <= 0) throw new Error("subtotal must be positive");
  if (people < 1) throw new Error("people must be at least 1");
  const tip = Math.round(subtotal * tipPercent / 100 * 100) / 100;
  const total = Math.round((subtotal + tip) * 100) / 100;
  const perPerson = Math.round(total / people * 100) / 100;
  return { subtotal, tip, total, perPerson };
}`,
      tests: [
        {
          name: "basic split 4 people 20% tip",
          code: `const r = splitBill(80, 20, 4);
assertEquals(r.tip, 16);
assertEquals(r.total, 96);
assertEquals(r.perPerson, 24);`,
        },
        {
          name: "15% tip odd cents",
          code: `const r = splitBill(50, 15, 3);
assertEquals(r.tip, 7.5);
assertEquals(r.perPerson, 19.17);`,
        },
        {
          name: "throws on zero subtotal",
          code: `let threw = false;
try { splitBill(0, 18, 2); } catch(e) { threw = e.message === "subtotal must be positive"; }
assertEquals(threw, true);`,
        },
        {
          name: "throws on zero people",
          code: `let threw = false;
try { splitBill(100, 18, 0); } catch(e) { threw = e.message === "people must be at least 1"; }
assertEquals(threw, true);`,
        },
      ],
      hints: [
        "Validate first, then calculate — throw before doing any math.",
        "To round to 2 dp: Math.round(value * 100) / 100",
        "tipPercent is a percentage, so divide by 100 before multiplying.",
      ],
    },

    // ── 4 ── CURRENCY ROUNDING (Intermediate, 50 XP) ─────────────────────────
    {
      slug: "currency-rounding",
      title: "Currency Rounding & Formatting",
      blurb: "Avoid the floating-point bugs that cost fintech companies millions.",
      xp: 50,
      language: "js",
      content: `## What you're building

A \`Money\` class that stores an amount as **integer cents** (avoiding floating-point drift) and exposes arithmetic and formatting helpers.

\`\`\`js
const price = new Money(19.99);
const tax   = price.multiply(0.08);   // 8% tax
price.add(tax).format();              // "$21.59"
\`\`\`

## Requirements

Implement a \`Money\` class with:

| Method | Behaviour |
|--------|-----------|
| \`constructor(dollars)\` | Store internally as rounded integer cents |
| \`add(other)\` | Return a new \`Money\` equal to \`this + other\` |
| \`subtract(other)\` | Return a new \`Money\` equal to \`this − other\` |
| \`multiply(factor)\` | Return a new \`Money\` with cents multiplied by \`factor\`, **banker's rounding** (round half to even) |
| \`toCents()\` | Return the integer cent amount |
| \`format()\` | Return a string like \`"$12.34"\` (always 2 decimal places, negative as \`"-$5.00"\`) |

**Banker's rounding** (round-half-to-even): when the fractional part is exactly 0.5, round to the nearest even integer.
e.g. 2.5 → 2, 3.5 → 4, 4.5 → 4, 5.5 → 6.

## Stretch goals

- Add a \`Money.fromCents(cents)\` static factory
- Support currency symbols other than \`$\`

## What this proves

Floating-point pitfalls, integer arithmetic for money, and object-oriented design — the core of every payments library.`,
      starterCode: `function bankersRound(n) {
  // Round n to the nearest integer using banker's rounding:
  // if fractional part is exactly 0.5, round to nearest even.
  // TODO: implement
  return Math.round(n);
}

class Money {
  constructor(dollars) {
    // Store as integer cents using bankersRound
    // TODO: implement
    this.cents = 0;
  }

  add(other) {
    // Return a new Money from (this.cents + other.cents)
    // TODO: implement
  }

  subtract(other) {
    // Return a new Money from (this.cents - other.cents)
    // TODO: implement
  }

  multiply(factor) {
    // Return a new Money with bankersRound(this.cents * factor) cents
    // TODO: implement
  }

  toCents() {
    return this.cents;
  }

  format() {
    // Return "$X.XX" or "-$X.XX"
    // TODO: implement
    return "$0.00";
  }
}
`,
      solution: `function bankersRound(n) {
  const floor = Math.floor(n);
  const frac = n - floor;
  if (Math.abs(frac - 0.5) < 1e-10) {
    return floor % 2 === 0 ? floor : floor + 1;
  }
  return Math.round(n);
}

class Money {
  constructor(dollars) {
    this.cents = bankersRound(dollars * 100);
  }

  static _fromCents(cents) {
    const m = new Money(0);
    m.cents = cents;
    return m;
  }

  add(other) {
    return Money._fromCents(this.cents + other.cents);
  }

  subtract(other) {
    return Money._fromCents(this.cents - other.cents);
  }

  multiply(factor) {
    return Money._fromCents(bankersRound(this.cents * factor));
  }

  toCents() {
    return this.cents;
  }

  format() {
    const neg = this.cents < 0;
    const abs = Math.abs(this.cents);
    const dollars = Math.floor(abs / 100);
    const cents = abs % 100;
    const str = \`\$\${dollars}.\${String(cents).padStart(2, "0")}\`;
    return neg ? \`-\${str}\` : str;
  }
}`,
      tests: [
        {
          name: "stores cents correctly",
          code: `const m = new Money(19.99);
assertEquals(m.toCents(), 1999);`,
        },
        {
          name: "add returns correct cents",
          code: `const a = new Money(10.00);
const b = new Money(5.50);
assertEquals(a.add(b).toCents(), 1550);`,
        },
        {
          name: "multiply with banker's rounding",
          code: `// 1000 cents * 0.085 = 85.0 → 85 cents (no tie)
const m = new Money(10.00);
assertEquals(m.multiply(0.085).toCents(), 85);`,
        },
        {
          name: "format produces dollar string",
          code: `const m = new Money(7.05);
assertEquals(m.format(), "$7.05");`,
        },
      ],
      hints: [
        "Store everything in integer cents (multiply dollars by 100 on construction) to avoid 0.1 + 0.2 !== 0.3 bugs.",
        "For bankersRound: check if the fractional part is exactly 0.5, then round to the nearest even number.",
        "Use a private static factory (_fromCents) so add/subtract/multiply can create Money objects without going through the dollars constructor.",
      ],
    },

    // ── 5 ── RUNNING STATS (Advanced, 60 XP) ──────────────────────────────────
    {
      slug: "running-stats",
      title: "Running Statistics Engine",
      blurb: "Compute mean, median, and standard deviation over a live data stream.",
      xp: 60,
      language: "js",
      content: `## What you're building

A \`StatsEngine\` class that accepts numbers one at a time and always has the current **mean**, **median**, and **population standard deviation** available — without re-scanning the whole dataset.

\`\`\`js
const stats = new StatsEngine();
stats.push(10);
stats.push(20);
stats.push(30);
stats.mean();   // 20
stats.median(); // 20
stats.stdev();  // 8.165... (population std dev)
\`\`\`

## Requirements

| Method | Behaviour |
|--------|-----------|
| \`push(value)\` | Add a number to the dataset |
| \`mean()\` | Return the arithmetic mean; \`null\` if empty |
| \`median()\` | Return the median; \`null\` if empty |
| \`stdev()\` | Return the **population** standard deviation; \`0\` if fewer than 2 values |
| \`count()\` | Return how many values have been pushed |

**Population std dev formula:**

\`\`\`
σ = sqrt( Σ(xᵢ − mean)² / N )
\`\`\`

For \`median\`: sort the current dataset, take the middle value for odd N, or the average of the two middle values for even N.

Return all floating-point results as-is (no forced rounding).

## Stretch goals

- Implement Welford's online algorithm for numerically stable variance (no array needed for mean/stdev)
- Add \`min()\`, \`max()\`, and \`percentile(p)\` methods

## What this proves

Real-time analytics, statistical formulas in code, and clean class design — appearing in data engineering, quant finance, and ML monitoring interviews.`,
      starterCode: `class StatsEngine {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
  }

  count() {
    return this.data.length;
  }

  mean() {
    // Return arithmetic mean, or null if empty
    // TODO: implement
    return null;
  }

  median() {
    // Sort a copy, pick middle element(s), return null if empty
    // TODO: implement
    return null;
  }

  stdev() {
    // Population std dev: sqrt(Σ(x - mean)² / N)
    // Return 0 if fewer than 2 values
    // TODO: implement
    return 0;
  }
}
`,
      solution: `class StatsEngine {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
  }

  count() {
    return this.data.length;
  }

  mean() {
    if (this.data.length === 0) return null;
    let sum = 0;
    for (const x of this.data) sum += x;
    return sum / this.data.length;
  }

  median() {
    if (this.data.length === 0) return null;
    const sorted = this.data.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 1) return sorted[mid];
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  stdev() {
    if (this.data.length < 2) return 0;
    const m = this.mean();
    let sumSq = 0;
    for (const x of this.data) sumSq += (x - m) * (x - m);
    return Math.sqrt(sumSq / this.data.length);
  }
}`,
      tests: [
        {
          name: "mean of [10, 20, 30] is 20",
          code: `const s = new StatsEngine();
s.push(10); s.push(20); s.push(30);
assertEquals(s.mean(), 20);`,
        },
        {
          name: "median of even-length dataset",
          code: `const s = new StatsEngine();
s.push(1); s.push(2); s.push(3); s.push(4);
assertEquals(s.median(), 2.5);`,
        },
        {
          name: "stdev of [2, 4, 4, 4, 5, 5, 7, 9] is 2",
          code: `const s = new StatsEngine();
[2, 4, 4, 4, 5, 5, 7, 9].forEach(n => s.push(n));
assert(Math.abs(s.stdev() - 2) < 1e-9);`,
        },
        {
          name: "mean and median are null when empty",
          code: `const s = new StatsEngine();
assertEquals(s.mean(), null);
assertEquals(s.median(), null);`,
        },
      ],
      hints: [
        "For median, always sort a *copy* of the data (use .slice()) so push order is preserved.",
        "Population std dev divides by N, not N-1. Sample std dev divides by N-1 — make sure you use N here.",
        "A for...of loop over this.data is the clearest way to compute the sum of squared deviations.",
      ],
    },
  ],
};
