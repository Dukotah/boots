import type { Module } from "./types";

// Portfolio Python — five standalone project lessons that produce real, shareable
// Python code. Runs in the browser via Pyodide (CPython → WASM); tests use the
// `assert_equals(actual, expected)` helper available in every py lesson.
export const portfolioPython: Module = {
  slug: "portfolio-python",
  title: "Python Projects",
  description:
    "Build five real Python projects you can put on your resume: a word counter, bank account class, temperature stats tool, password strength checker, and CSV summarizer. Every project runs in your browser — no install needed.",
  emoji: "🐍",
  gradient: "from-yellow-400/20 to-green-500/10",
  language: "py",
  tagline:
    "Build real Python portfolio projects: word counter, bank account, temperature stats, password checker, and CSV summarizer.",
  keywords: [
    "python portfolio projects",
    "python projects for beginners",
    "python class project",
    "python word counter",
    "python csv project",
  ],
  lessons: [
    {
      slug: "word-counter",
      title: "Word Counter",
      blurb: "Count words and find the most frequent one.",
      xp: 40,
      content: `# Word Counter

## What you're building

A \`WordCounter\` class that parses a block of text, counts every word (case-insensitive, no punctuation), and reports statistics.

## Requirements

- \`count_words()\` — total word count
- \`unique_count()\` — number of distinct words
- \`top_word()\` — the single most frequent word (lowercase)

\`\`\`py
wc = WordCounter("The cat sat on the mat. The cat!")
wc.count_words()   # 8
wc.unique_count()  # 5
wc.top_word()      # "the"
\`\`\`

## Stretch goals

- Handle ties in \`top_word\` by returning the alphabetically first word.
- Add \`frequency(word)\` that returns the count for a specific word.

## What this proves

String manipulation, dictionaries for counting, and basic class design — all staples of data-wrangling interviews.`,
      starterCode: `class WordCounter:
    def __init__(self, text):
        self.text = text
        # TODO: parse self.text into a word-frequency dict

    def count_words(self):
        pass

    def unique_count(self):
        pass

    def top_word(self):
        pass
`,
      solution: `class WordCounter:
    def __init__(self, text):
        self.text = text
        cleaned = ""
        for ch in text.lower():
            if ch.isalpha() or ch == " ":
                cleaned += ch
            else:
                cleaned += " "
        words = cleaned.split()
        self._freq = {}
        for w in words:
            self._freq[w] = self._freq.get(w, 0) + 1

    def count_words(self):
        return sum(self._freq.values())

    def unique_count(self):
        return len(self._freq)

    def top_word(self):
        return max(self._freq, key=lambda w: (self._freq[w], [-ord(c) for c in w]))
`,
      tests: [
        {
          name: "count_words totals all words",
          code: `wc = WordCounter("hello world hello")
assert_equals(wc.count_words(), 3)`,
        },
        {
          name: "unique_count counts distinct words",
          code: `wc = WordCounter("the cat sat on the mat")
assert_equals(wc.unique_count(), 5)`,
        },
        {
          name: "top_word returns most frequent",
          code: `wc = WordCounter("the cat sat on the mat the cat")
assert_equals(wc.top_word(), "the")`,
        },
        {
          name: "case-insensitive: The == the",
          code: `wc = WordCounter("The THE the")
assert_equals(wc.count_words(), 3)
assert_equals(wc.unique_count(), 1)`,
        },
      ],
    },
    {
      slug: "bank-account",
      title: "Bank Account Class",
      blurb: "Deposits, withdrawals, and overdraft protection.",
      xp: 40,
      content: `# Bank Account Class

## What you're building

A \`BankAccount\` class that tracks a balance, records a transaction history, and refuses withdrawals that would overdraw the account.

## Requirements

- \`deposit(amount)\` — add \`amount\` to balance; return new balance
- \`withdraw(amount)\` — subtract \`amount\` if funds are available; return \`True\` on success, \`False\` on failure
- \`balance\` property — current balance
- \`history\` property — list of \`(type, amount)\` tuples, e.g. \`("deposit", 100)\`

\`\`\`py
acc = BankAccount(100)
acc.deposit(50)    # balance → 150
acc.withdraw(200)  # False (overdraft)
acc.withdraw(40)   # True,  balance → 110
\`\`\`

## Stretch goals

- Add a \`transfer(amount, other_account)\` method.
- Raise \`ValueError\` for negative deposit/withdrawal amounts.

## What this proves

OOP fundamentals — \`__init__\`, instance state, methods with return values, and defensive guards — the bread and butter of system design questions.`,
      starterCode: `class BankAccount:
    def __init__(self, initial_balance=0):
        pass  # TODO: set up balance and history

    def deposit(self, amount):
        pass  # TODO: add amount, record history, return new balance

    def withdraw(self, amount):
        pass  # TODO: check funds, deduct if ok, return True/False

    @property
    def balance(self):
        pass

    @property
    def history(self):
        pass
`,
      solution: `class BankAccount:
    def __init__(self, initial_balance=0):
        self._balance = initial_balance
        self._history = []

    def deposit(self, amount):
        self._balance += amount
        self._history.append(("deposit", amount))
        return self._balance

    def withdraw(self, amount):
        if amount > self._balance:
            return False
        self._balance -= amount
        self._history.append(("withdrawal", amount))
        return True

    @property
    def balance(self):
        return self._balance

    @property
    def history(self):
        return self._history
`,
      tests: [
        {
          name: "deposit increases balance",
          code: `acc = BankAccount(100)
acc.deposit(50)
assert_equals(acc.balance, 150)`,
        },
        {
          name: "withdraw succeeds when funds available",
          code: `acc = BankAccount(100)
result = acc.withdraw(40)
assert_equals(result, True)
assert_equals(acc.balance, 60)`,
        },
        {
          name: "withdraw fails when insufficient funds",
          code: `acc = BankAccount(50)
result = acc.withdraw(100)
assert_equals(result, False)
assert_equals(acc.balance, 50)`,
        },
        {
          name: "history records transactions",
          code: `acc = BankAccount(0)
acc.deposit(200)
acc.withdraw(50)
assert_equals(len(acc.history), 2)
assert_equals(acc.history[0][0], "deposit")`,
        },
      ],
    },
    {
      slug: "temperature-stats",
      title: "Temperature Stats",
      blurb: "Min, max, average, and trend from a list of readings.",
      xp: 50,
      content: `# Temperature Stats

## What you're building

A \`TemperatureStats\` class that ingests a list of daily temperatures and computes useful statistics — the kind of thing a weather app backend runs constantly.

## Requirements

- \`minimum()\` — lowest reading
- \`maximum()\` — highest reading
- \`average()\` — mean, rounded to 2 decimal places
- \`above_average()\` — list of readings strictly above the mean (original order)

\`\`\`py
ts = TemperatureStats([72, 68, 85, 90, 61])
ts.minimum()       # 61
ts.maximum()       # 90
ts.average()       # 75.2
ts.above_average() # [85, 90]
\`\`\`

## Stretch goals

- \`trend()\` — returns \`"rising"\` if the last reading is above average, else \`"falling"\`.
- \`hottest_streak()\` — length of the longest run of readings above average.

## What this proves

Working with numeric lists, built-in functions (\`min\`, \`max\`, \`sum\`), and list comprehensions — exactly what data-pipeline interviews test.`,
      starterCode: `class TemperatureStats:
    def __init__(self, readings):
        self.readings = readings  # list of numbers

    def minimum(self):
        pass

    def maximum(self):
        pass

    def average(self):
        pass  # round to 2 decimal places

    def above_average(self):
        pass  # readings strictly above the mean
`,
      solution: `class TemperatureStats:
    def __init__(self, readings):
        self.readings = readings

    def minimum(self):
        return min(self.readings)

    def maximum(self):
        return max(self.readings)

    def average(self):
        return round(sum(self.readings) / len(self.readings), 2)

    def above_average(self):
        avg = sum(self.readings) / len(self.readings)
        return [r for r in self.readings if r > avg]
`,
      tests: [
        {
          name: "minimum returns lowest",
          code: `ts = TemperatureStats([72, 68, 85, 90, 61])
assert_equals(ts.minimum(), 61)`,
        },
        {
          name: "maximum returns highest",
          code: `ts = TemperatureStats([72, 68, 85, 90, 61])
assert_equals(ts.maximum(), 90)`,
        },
        {
          name: "average rounded to 2 places",
          code: `ts = TemperatureStats([72, 68, 85, 90, 61])
assert_equals(ts.average(), 75.2)`,
        },
        {
          name: "above_average filters correctly",
          code: `ts = TemperatureStats([72, 68, 85, 90, 61])
assert_equals(ts.above_average(), [85, 90])`,
        },
      ],
    },
    {
      slug: "password-checker",
      title: "Password Strength Checker",
      blurb: "Validate passwords and score their strength.",
      xp: 50,
      content: `# Password Strength Checker

## What you're building

A \`PasswordChecker\` that evaluates a password against common rules and returns a score and a list of improvement hints.

## Requirements

\`check(password)\` returns a dict:

\`\`\`py
{
  "score": int,   # 0–4 (one point per rule met)
  "hints": list   # rules that were NOT met
}
\`\`\`

Rules (1 point each):
1. At least 8 characters long
2. Contains an uppercase letter
3. Contains a digit
4. Contains a special character (\`!@#$%^&*()\`)

\`\`\`py
pc = PasswordChecker()
pc.check("hi")
# {"score": 0, "hints": ["at least 8 characters", "uppercase letter", "digit", "special character"]}
pc.check("Secure1!")
# {"score": 4, "hints": []}
\`\`\`

## Stretch goals

- Penalise common passwords like \`"password"\` or \`"123456"\`.
- Add a \`strength_label()\` that maps score to \`"weak"\`/\`"fair"\`/\`"strong"\`/\`"very strong"\`.

## What this proves

String inspection, boolean flags, list building, and dict construction — building-block skills for any auth or security feature.`,
      starterCode: `class PasswordChecker:
    SPECIALS = "!@#$%^&*()"

    def check(self, password):
        score = 0
        hints = []
        # Check each rule; increment score and skip adding hint if met,
        # otherwise append the hint string.
        # Rule 1: at least 8 characters  → hint "at least 8 characters"
        # Rule 2: uppercase letter        → hint "uppercase letter"
        # Rule 3: digit                   → hint "digit"
        # Rule 4: special character       → hint "special character"
        return {"score": score, "hints": hints}
`,
      solution: `class PasswordChecker:
    SPECIALS = "!@#$%^&*()"

    def check(self, password):
        score = 0
        hints = []

        if len(password) >= 8:
            score += 1
        else:
            hints.append("at least 8 characters")

        if any(c.isupper() for c in password):
            score += 1
        else:
            hints.append("uppercase letter")

        if any(c.isdigit() for c in password):
            score += 1
        else:
            hints.append("digit")

        if any(c in self.SPECIALS for c in password):
            score += 1
        else:
            hints.append("special character")

        return {"score": score, "hints": hints}
`,
      tests: [
        {
          name: "weak password scores 0",
          code: `pc = PasswordChecker()
result = pc.check("hi")
assert_equals(result["score"], 0)
assert_equals(len(result["hints"]), 4)`,
        },
        {
          name: "strong password scores 4",
          code: `pc = PasswordChecker()
result = pc.check("Secure1!")
assert_equals(result["score"], 4)
assert_equals(result["hints"], [])`,
        },
        {
          name: "missing digit noted in hints",
          code: `pc = PasswordChecker()
result = pc.check("LongPass!")
assert_equals("digit" in result["hints"], True)`,
        },
        {
          name: "short password flagged",
          code: `pc = PasswordChecker()
result = pc.check("Ab1!")
assert_equals("at least 8 characters" in result["hints"], True)`,
        },
      ],
    },
    {
      slug: "csv-summarizer",
      title: "CSV Summarizer",
      blurb: "Parse raw CSV text and compute column statistics.",
      xp: 60,
      content: `# CSV Summarizer

## What you're building

A \`CSVSummarizer\` that parses a raw CSV string (header row + data rows) and lets you query column statistics — the core of any lightweight data tool.

## Requirements

- \`headers()\` — list of column names
- \`column(name)\` — list of values for that column (as strings)
- \`numeric_summary(name)\` — for a numeric column, returns \`{"min": …, "max": …, "avg": …}\`

\`\`\`py
data = """name,age,score
Alice,30,88
Bob,25,92
Carol,35,79"""

csv = CSVSummarizer(data)
csv.headers()                   # ["name", "age", "score"]
csv.column("name")              # ["Alice", "Bob", "Carol"]
csv.numeric_summary("score")    # {"min": 79, "max": 92, "avg": 86.33}
\`\`\`

## Stretch goals

- \`row_count()\` — number of data rows (excluding header).
- \`find_rows(column, value)\` — return rows where that column equals the value.

## What this proves

String parsing without external libraries, list operations, type conversion, and dict construction — the exact skills used in data engineering and backend scripting interviews.`,
      starterCode: `class CSVSummarizer:
    def __init__(self, raw):
        self.raw = raw
        # TODO: parse raw into self._headers (list) and self._rows (list of lists)

    def headers(self):
        pass

    def column(self, name):
        pass  # return list of string values for that column

    def numeric_summary(self, name):
        pass  # return {"min": …, "max": …, "avg": …} rounded to 2 decimal places
`,
      solution: `class CSVSummarizer:
    def __init__(self, raw):
        lines = [line for line in raw.strip().splitlines() if line.strip()]
        self._headers = [h.strip() for h in lines[0].split(",")]
        self._rows = []
        for line in lines[1:]:
            self._rows.append([v.strip() for v in line.split(",")])

    def headers(self):
        return self._headers

    def column(self, name):
        idx = self._headers.index(name)
        return [row[idx] for row in self._rows]

    def numeric_summary(self, name):
        values = [float(v) for v in self.column(name)]
        avg = round(sum(values) / len(values), 2)
        return {"min": min(values), "max": max(values), "avg": avg}
`,
      tests: [
        {
          name: "headers returns column names",
          code: `data = "name,age,score\\nAlice,30,88\\nBob,25,92"
csv = CSVSummarizer(data)
assert_equals(csv.headers(), ["name", "age", "score"])`,
        },
        {
          name: "column returns all values",
          code: `data = "name,age,score\\nAlice,30,88\\nBob,25,92"
csv = CSVSummarizer(data)
assert_equals(csv.column("name"), ["Alice", "Bob"])`,
        },
        {
          name: "numeric_summary min and max",
          code: `data = "name,age,score\\nAlice,30,88\\nBob,25,92\\nCarol,35,79"
csv = CSVSummarizer(data)
s = csv.numeric_summary("score")
assert_equals(s["min"], 79.0)
assert_equals(s["max"], 92.0)`,
        },
        {
          name: "numeric_summary avg rounded",
          code: `data = "name,age,score\\nAlice,30,88\\nBob,25,92\\nCarol,35,79"
csv = CSVSummarizer(data)
s = csv.numeric_summary("score")
assert_equals(s["avg"], 86.33)`,
        },
      ],
    },
  ],
};
