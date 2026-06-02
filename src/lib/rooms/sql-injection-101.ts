import type { Room } from "./types";

// Understand SQL injection so you can DEFEND against it. Framed as a white-hat
// exercise: read vulnerable queries, reason about the classic attack, then name
// the fix. Nothing here runs against a real system — it's all on-paper analysis.
export const sqlInjection101: Room = {
  slug: "sql-injection-101",
  title: "SQL Injection 101",
  emoji: "🛡️",
  gradient: "from-rose-500/20 to-red-500/10",
  difficulty: "medium",
  tags: ["sql", "security", "web"],
  blurb: "Learn how SQL injection works — so you can shut it down. White-hat only.",
  intro: `# SQL Injection 101

You can't defend what you don't understand. This room walks through the most
common web vulnerability of all time — **SQL injection** — by reading vulnerable
code and reasoning about it. Then you'll name the fix.

> ⚠️ This is a **defensive** exercise. Only ever test systems you own or are
> explicitly authorized to test.`,
  tasks: [
    {
      slug: "classic-bypass",
      prompt:
        "A login builds its query by string concatenation:\n\n```sql\nSELECT * FROM users WHERE name = '$input' AND pass = '$pw'\n```\n\nWhat value for `$input` makes the `WHERE` always true, returning the first user regardless of password? (A classic `OR`-based payload.)",
      hint: "You want the condition to short-circuit to true. Close the quote, add `OR` something that's always true, and comment out the rest.",
      answer: "' OR '1'='1",
      acceptable: [
        "' OR '1'='1' --",
        "' OR '1'='1'--",
        "' OR 1=1 --",
        "' OR 1=1--",
        "' OR '1'='1' #",
        "' OR 1=1#",
      ],
      xp: 30,
    },
    {
      slug: "neutralize-the-rest",
      prompt:
        "In the payload above, which two-character SQL comment sequence is most commonly used to ignore everything after your injection?",
      hint: "It's also how you write a single-line comment in standard SQL.",
      answer: "--",
      acceptable: ["-- ", "#"],
      xp: 20,
    },
    {
      slug: "the-fix",
      prompt:
        "What's the real fix — the technique that sends user input as data, never as part of the SQL text? (Two common names; either works.)",
      hint: "Placeholders like `?` or `$1`, with the driver binding the values separately.",
      answer: "parameterized queries",
      acceptable: [
        "parameterized query",
        "parameterised queries",
        "prepared statements",
        "prepared statement",
        "parameterized",
        "prepared statements / parameterized queries",
      ],
      xp: 25,
    },
  ],
};
