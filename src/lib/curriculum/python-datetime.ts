import type { Module } from "./types";

// Python Dates & Times — datetime / timedelta / strptime / strftime, all from stdlib.
// Runs in the browser via Pyodide (CPython → WASM). No pip deps required.
export const pythonDatetime: Module = {
  slug: "python-datetime",
  title: "Python: Dates & Times",
  description:
    "Master Python's built-in datetime module — creating dates, doing arithmetic with timedelta, formatting with strftime, parsing with strptime, and working with timezones. Zero pip installs, pure stdlib.",
  emoji: "📅",
  gradient: "from-blue-400/20 to-indigo-500/10",
  language: "py",
  tagline:
    "Learn Python datetime: date, time, datetime, timedelta, strftime, strptime, and UTC timezones — all from the standard library.",
  keywords: [
    "python datetime",
    "python timedelta",
    "python strftime strptime",
    "python date arithmetic",
    "python timezone",
    "python date formatting",
  ],
  lessons: [
    // ── Lesson 1 ─────────────────────────────────────────────────────────────
    {
      slug: "creating-dates",
      title: "Creating Dates",
      blurb: "Build date objects from year, month, and day.",
      xp: 20,
      language: "py",
      content: `# Creating Dates

Python's \`datetime\` module lives in the standard library — no install needed.
The \`date\` class represents a calendar date (no time-of-day component).

\`\`\`py
from datetime import date

# Construct a specific date
d = date(2024, 7, 4)   # July 4 2024
print(d)               # 2024-07-04

# Today's date
today = date.today()
\`\`\`

Three positional arguments: **year**, **month**, **day**.  All are ints.

## Your task
1. Import \`date\` from \`datetime\`.
2. Create a variable \`moon_landing\` set to **July 20, 1969**.
3. Create a variable \`today\` set to \`date.today()\`.`,
      starterCode: `# import date and create the two variables
`,
      solution: `from datetime import date

moon_landing = date(1969, 7, 20)
today = date.today()`,
      tests: [
        {
          name: "moon_landing is date(1969, 7, 20)",
          code: `from datetime import date\nassert_equals(moon_landing, date(1969, 7, 20))`,
        },
        {
          name: "today is a date instance",
          code: `from datetime import date\nassert isinstance(today, date), "today should be a date object"`,
        },
        {
          name: "moon_landing year is 1969",
          code: `assert_equals(moon_landing.year, 1969)`,
        },
      ],
      hints: [
        "Start with: from datetime import date",
        "date() takes three ints: date(year, month, day)",
      ],
    },

    // ── Lesson 2 ─────────────────────────────────────────────────────────────
    {
      slug: "creating-datetimes",
      title: "Creating Datetimes",
      blurb: "datetime adds hours, minutes, and seconds to a date.",
      xp: 25,
      language: "py",
      content: `# Creating Datetimes

A \`datetime\` combines date **and** time in one object.

\`\`\`py
from datetime import datetime

dt = datetime(2024, 12, 31, 23, 59, 59)
# year=2024, month=12, day=31, hour=23, minute=59, second=59

now = datetime.now()   # current local date-time
\`\`\`

Time components (hour, minute, second) are **optional** and default to 0.

## Your task
1. Import \`datetime\` from \`datetime\`.
2. Create \`new_year_2000\` = midnight on **January 1, 2000** (all time parts = 0).
3. Create \`launch_time\` = **March 5, 2025 at 14:30:00** (2:30 PM).`,
      starterCode: `# import datetime and create the two variables
`,
      solution: `from datetime import datetime

new_year_2000 = datetime(2000, 1, 1, 0, 0, 0)
launch_time = datetime(2025, 3, 5, 14, 30, 0)`,
      tests: [
        {
          name: "new_year_2000 == datetime(2000, 1, 1, 0, 0, 0)",
          code: `from datetime import datetime\nassert_equals(new_year_2000, datetime(2000, 1, 1, 0, 0, 0))`,
        },
        {
          name: "launch_time hour is 14",
          code: `assert_equals(launch_time.hour, 14)`,
        },
        {
          name: "launch_time minute is 30",
          code: `assert_equals(launch_time.minute, 30)`,
        },
        {
          name: "launch_time year is 2025",
          code: `assert_equals(launch_time.year, 2025)`,
        },
      ],
      hints: [
        "datetime() signature: datetime(year, month, day, hour=0, minute=0, second=0)",
        "14:30 in 24-hour time means hour=14, minute=30",
      ],
    },

    // ── Lesson 3 ─────────────────────────────────────────────────────────────
    {
      slug: "date-attributes",
      title: "Reading Date Attributes",
      blurb: "Pull year, month, day, weekday, and more off any date.",
      xp: 20,
      language: "py",
      content: `# Reading Date Attributes

Every \`date\` (and \`datetime\`) exposes its components as attributes.

| Attribute | Type | Example |
|-----------|------|---------|
| \`.year\` | int | 2024 |
| \`.month\` | int | 7 (July) |
| \`.day\` | int | 4 |
| \`.weekday()\` | int | 0 = Mon … 6 = Sun |
| \`.isoweekday()\` | int | 1 = Mon … 7 = Sun |

\`\`\`py
from datetime import date
d = date(2024, 7, 4)   # Thursday
print(d.year)          # 2024
print(d.weekday())     # 3  (Thursday, zero-indexed from Monday)
print(d.isoweekday())  # 4  (Thursday, ISO counts Mon=1)
\`\`\`

## Your task
Given \`d = date(2023, 11, 15)\`:
1. Store \`d.year\` in \`yr\`.
2. Store \`d.month\` in \`mo\`.
3. Store \`d.day\` in \`dy\`.
4. Store \`d.weekday()\` in \`wd\` — Wednesday is **2**.`,
      starterCode: `from datetime import date

d = date(2023, 11, 15)
yr = None
mo = None
dy = None
wd = None
`,
      solution: `from datetime import date

d = date(2023, 11, 15)
yr = d.year
mo = d.month
dy = d.day
wd = d.weekday()`,
      tests: [
        { name: "yr == 2023", code: `assert_equals(yr, 2023)` },
        { name: "mo == 11", code: `assert_equals(mo, 11)` },
        { name: "dy == 15", code: `assert_equals(dy, 15)` },
        {
          name: "wd == 2 (Wednesday)",
          code: `assert_equals(wd, 2)`,
        },
      ],
      hints: [
        "Access attributes with dot notation: d.year, d.month, d.day",
        "weekday() returns 0 for Monday, 1 for Tuesday … 6 for Sunday",
        "November 15 2023 was a Wednesday, so weekday() returns 2",
      ],
    },

    // ── Lesson 4 ─────────────────────────────────────────────────────────────
    {
      slug: "timedelta-arithmetic",
      title: "Date Arithmetic with timedelta",
      blurb: "Add and subtract durations; find the gap between two dates.",
      xp: 35,
      language: "py",
      content: `# Date Arithmetic with timedelta

\`timedelta\` represents a **duration** — a fixed span of days, seconds, or
microseconds.  You can add or subtract it from a \`date\` or \`datetime\`.

\`\`\`py
from datetime import date, timedelta

today = date(2024, 1, 1)
one_week = timedelta(days=7)

next_week = today + one_week      # date(2024, 1, 8)
last_week = today - one_week      # date(2023, 12, 25)

# Subtracting two dates gives a timedelta
gap = date(2024, 3, 1) - date(2024, 1, 1)
print(gap.days)   # 60
\`\`\`

## Your task
1. Import \`date\` and \`timedelta\` from \`datetime\`.
2. Create \`start = date(2025, 1, 1)\`.
3. Create \`end\` by adding **100 days** to \`start\`.
4. Create \`diff\` as the number of days between \`end\` and \`start\` (an **int**).`,
      starterCode: `# import date and timedelta, then create start, end, and diff
`,
      solution: `from datetime import date, timedelta

start = date(2025, 1, 1)
end = start + timedelta(days=100)
diff = (end - start).days`,
      tests: [
        {
          name: "end is start + 100 days",
          code: `from datetime import date\nassert_equals(end, date(2025, 4, 11))`,
        },
        {
          name: "diff == 100",
          code: `assert_equals(diff, 100)`,
        },
      ],
      hints: [
        "timedelta(days=100) creates a 100-day duration",
        "Subtracting two date objects gives a timedelta; access .days for an int",
      ],
    },

    // ── Lesson 5 ─────────────────────────────────────────────────────────────
    {
      slug: "strftime-formatting",
      title: "Formatting with strftime",
      blurb: "Turn a date into any string format using format codes.",
      xp: 35,
      language: "py",
      content: `# Formatting with strftime

\`strftime\` (**str**ing **f**rom **time**) converts a date or datetime to a
string using **format codes**.

| Code | Meaning | Example |
|------|---------|---------|
| \`%Y\` | 4-digit year | 2024 |
| \`%m\` | 2-digit month | 07 |
| \`%d\` | 2-digit day | 04 |
| \`%B\` | Full month name | July |
| \`%A\` | Full weekday name | Thursday |
| \`%H\` | Hour (24h) | 14 |
| \`%M\` | Minute | 30 |
| \`%S\` | Second | 00 |

\`\`\`py
from datetime import date
d = date(2024, 7, 4)
print(d.strftime("%B %d, %Y"))   # "July 04, 2024"
print(d.strftime("%Y-%m-%d"))    # "2024-07-04"
\`\`\`

## Your task
Given \`dt = datetime(2030, 6, 15, 9, 5, 0)\`:
1. Create \`iso\` = the date formatted as \`"2030-06-15"\` (ISO 8601, \`%Y-%m-%d\`).
2. Create \`pretty\` = formatted as \`"June 15, 2030"\` (\`%B %d, %Y\`).
3. Create \`time_str\` = formatted as \`"09:05:00"\` (\`%H:%M:%S\`).`,
      starterCode: `from datetime import datetime

dt = datetime(2030, 6, 15, 9, 5, 0)
iso = None
pretty = None
time_str = None
`,
      solution: `from datetime import datetime

dt = datetime(2030, 6, 15, 9, 5, 0)
iso = dt.strftime("%Y-%m-%d")
pretty = dt.strftime("%B %d, %Y")
time_str = dt.strftime("%H:%M:%S")`,
      tests: [
        {
          name: 'iso == "2030-06-15"',
          code: `assert_equals(iso, "2030-06-15")`,
        },
        {
          name: 'pretty == "June 15, 2030"',
          code: `assert_equals(pretty, "June 15, 2030")`,
        },
        {
          name: 'time_str == "09:05:00"',
          code: `assert_equals(time_str, "09:05:00")`,
        },
      ],
      hints: [
        "dt.strftime(format_string) returns a str",
        "%H zero-pads hours (09, not 9); %M and %S also zero-pad",
        "%B is the full English month name",
      ],
    },

    // ── Lesson 6 ─────────────────────────────────────────────────────────────
    {
      slug: "strptime-parsing",
      title: "Parsing with strptime",
      blurb: "Convert a date string back into a datetime object.",
      xp: 40,
      language: "py",
      content: `# Parsing with strptime

\`strptime\` (**str**ing **p**arse **time**) is the inverse of \`strftime\` — it
turns a **string** into a \`datetime\` object.

\`\`\`py
from datetime import datetime

dt = datetime.strptime("2024-07-04", "%Y-%m-%d")
print(dt)             # 2024-07-04 00:00:00
print(dt.year)        # 2024

# More complex format
dt2 = datetime.strptime("Jul 04 2024 15:30", "%b %d %Y %H:%M")
\`\`\`

The format string **must match** the input exactly — every character, space,
and punctuation mark.

## Your task
Parse these two strings into datetime objects:
1. \`"1969-07-20"\` using \`"%Y-%m-%d"\` → store in \`moon\`.
2. \`"December 31, 1999 23:59:59"\` using \`"%B %d, %Y %H:%M:%S"\` → store in \`millennium_eve\`.`,
      starterCode: `from datetime import datetime

moon = None
millennium_eve = None
`,
      solution: `from datetime import datetime

moon = datetime.strptime("1969-07-20", "%Y-%m-%d")
millennium_eve = datetime.strptime("December 31, 1999 23:59:59", "%B %d, %Y %H:%M:%S")`,
      tests: [
        {
          name: "moon.year == 1969",
          code: `assert_equals(moon.year, 1969)`,
        },
        {
          name: "moon.month == 7",
          code: `assert_equals(moon.month, 7)`,
        },
        {
          name: "moon.day == 20",
          code: `assert_equals(moon.day, 20)`,
        },
        {
          name: "millennium_eve.year == 1999, hour == 23",
          code: `assert_equals(millennium_eve.year, 1999)\nassert_equals(millennium_eve.hour, 23)`,
        },
        {
          name: "millennium_eve.second == 59",
          code: `assert_equals(millennium_eve.second, 59)`,
        },
      ],
      hints: [
        "datetime.strptime(string, format) — it's a class method, not an instance method",
        "The format codes must match the string exactly: %B is a full month name like 'December'",
        "Make sure the comma and spaces in your format string match the input string",
      ],
    },

    // ── Lesson 7 ─────────────────────────────────────────────────────────────
    {
      slug: "comparing-dates",
      title: "Comparing and Sorting Dates",
      blurb: "Use <, >, ==, min(), and max() on date objects.",
      xp: 30,
      language: "py",
      content: `# Comparing and Sorting Dates

Date objects support the standard comparison operators, so you can sort them,
find the earliest or latest, and check equality naturally.

\`\`\`py
from datetime import date

d1 = date(2020, 1, 1)
d2 = date(2023, 6, 15)

print(d1 < d2)          # True  — d1 is earlier
print(d2 > d1)          # True
print(d1 == d1)         # True

dates = [d2, d1, date(2021, 3, 10)]
print(min(dates))       # 2020-01-01
print(max(dates))       # 2023-06-15
print(sorted(dates))    # [2020-01-01, 2021-03-10, 2023-06-15]
\`\`\`

## Your task
Given this list of dates:
\`\`\`py
events = [date(2022, 8, 3), date(2019, 12, 25), date(2024, 2, 14), date(2021, 5, 1)]
\`\`\`
1. Store the **earliest** date in \`earliest\`.
2. Store the **latest** date in \`latest\`.
3. Store a **sorted list** (oldest → newest) in \`in_order\`.`,
      starterCode: `from datetime import date

events = [date(2022, 8, 3), date(2019, 12, 25), date(2024, 2, 14), date(2021, 5, 1)]
earliest = None
latest = None
in_order = None
`,
      solution: `from datetime import date

events = [date(2022, 8, 3), date(2019, 12, 25), date(2024, 2, 14), date(2021, 5, 1)]
earliest = min(events)
latest = max(events)
in_order = sorted(events)`,
      tests: [
        {
          name: "earliest == date(2019, 12, 25)",
          code: `from datetime import date\nassert_equals(earliest, date(2019, 12, 25))`,
        },
        {
          name: "latest == date(2024, 2, 14)",
          code: `from datetime import date\nassert_equals(latest, date(2024, 2, 14))`,
        },
        {
          name: "in_order is sorted oldest-first",
          code: `from datetime import date\nassert_equals(in_order, [date(2019, 12, 25), date(2021, 5, 1), date(2022, 8, 3), date(2024, 2, 14)])`,
        },
      ],
      hints: [
        "Use Python built-ins: min(), max(), sorted()",
        "date objects compare naturally — no special key needed",
      ],
    },

    // ── Lesson 8 ─────────────────────────────────────────────────────────────
    {
      slug: "utc-timezones",
      title: "UTC and Timezone-Aware Datetimes",
      blurb: "Attach timezone info so your datetimes are unambiguous.",
      xp: 50,
      language: "py",
      content: `# UTC and Timezone-Aware Datetimes

A **naive** datetime has no timezone info — it's just numbers.  A
**timezone-aware** datetime knows its UTC offset, making comparisons and
conversions safe.

Python's stdlib \`timezone\` class covers the common case.

\`\`\`py
from datetime import datetime, timezone, timedelta

# UTC-aware "now"
now_utc = datetime.now(tz=timezone.utc)

# Build an aware datetime directly
dt_utc = datetime(2024, 7, 4, 12, 0, 0, tzinfo=timezone.utc)

# Eastern Time is UTC-5 in winter (EST)
est = timezone(timedelta(hours=-5))
dt_est = dt_utc.astimezone(est)
print(dt_est.hour)   # 7
\`\`\`

\`astimezone(tz)\` converts an aware datetime to a different timezone.

## Your task
1. Create \`utc_launch\` = **June 1, 2025 at 18:00:00 UTC** (use \`tzinfo=timezone.utc\`).
2. Create \`cst_offset\` = \`timezone(timedelta(hours=-6))\` (Central Standard Time).
3. Create \`cst_launch\` = \`utc_launch\` converted to CST with \`astimezone\`.
4. Store the **hour** of \`cst_launch\` in \`cst_hour\` — should be **12**.`,
      starterCode: `from datetime import datetime, timezone, timedelta

utc_launch = None
cst_offset = None
cst_launch = None
cst_hour = None
`,
      solution: `from datetime import datetime, timezone, timedelta

utc_launch = datetime(2025, 6, 1, 18, 0, 0, tzinfo=timezone.utc)
cst_offset = timezone(timedelta(hours=-6))
cst_launch = utc_launch.astimezone(cst_offset)
cst_hour = cst_launch.hour`,
      tests: [
        {
          name: "utc_launch hour is 18",
          code: `assert_equals(utc_launch.hour, 18)`,
        },
        {
          name: "utc_launch is timezone-aware",
          code: `assert utc_launch.tzinfo is not None, "utc_launch must be timezone-aware"`,
        },
        {
          name: "cst_hour == 12",
          code: `assert_equals(cst_hour, 12)`,
        },
        {
          name: "cst_launch day is still June 1",
          code: `assert_equals(cst_launch.day, 1)`,
        },
      ],
      hints: [
        "Pass tzinfo=timezone.utc to the datetime() constructor",
        "timezone(timedelta(hours=-6)) creates the CST offset",
        "18:00 UTC minus 6 hours = 12:00 CST",
        "Call .astimezone(tz) on the UTC datetime to convert it",
      ],
    },

    // ── Lesson 9 ─────────────────────────────────────────────────────────────
    {
      slug: "datetime-quiz",
      title: "Dates & Times: Quick-Fire Quiz",
      blurb: "Lock in the key concepts before you go.",
      xp: 30,
      kind: "quiz",
      content: `# Dates & Times: Quick-Fire Quiz

You've covered \`date\`, \`datetime\`, \`timedelta\`, \`strftime\`, \`strptime\`, and
timezones.  Let's make sure the concepts stick!`,
      questions: [
        {
          prompt:
            "Which import gives you both `date` and `timedelta` in one line?",
          options: [
            "import datetime",
            "from datetime import date, timedelta",
            "from time import date, timedelta",
            "import date, timedelta",
          ],
          answer: 1,
          explanation:
            "`from datetime import date, timedelta` imports exactly those two names. `import datetime` works too but requires the `datetime.` prefix everywhere.",
        },
        {
          prompt:
            "What does `date(2024, 7, 4).weekday()` return for a Thursday?",
          options: ["3", "4", "5", "0"],
          answer: 0,
          explanation:
            "`weekday()` is zero-indexed from Monday: Mon=0, Tue=1, Wed=2, **Thu=3**, Fri=4, Sat=5, Sun=6. July 4, 2024 was a Thursday, so it returns 3.",
        },
        {
          prompt:
            "You want to find the number of days between two `date` objects `a` and `b`. Which expression is correct?",
          options: [
            "(a - b).seconds",
            "(a - b).days",
            "timedelta(a, b).days",
            "abs(a - b)",
          ],
          answer: 1,
          explanation:
            "Subtracting two `date` objects returns a `timedelta`. Access `.days` on that result to get an integer count of days.",
        },
        {
          prompt:
            "Which format code produces the **full month name** (e.g. `\"September\"`)?",
          options: ["%m", "%M", "%b", "%B"],
          answer: 3,
          explanation:
            "`%B` → full month name (September). `%b` → abbreviated (Sep). `%m` → zero-padded month number (09). `%M` → minutes.",
        },
        {
          prompt:
            "A **naive** datetime differs from a **timezone-aware** datetime in that:",
          options: [
            "It can only represent dates, not times",
            "It has no tzinfo attached, so its UTC offset is unknown",
            "It only works with UTC time",
            "It stores milliseconds but not seconds",
          ],
          answer: 1,
          explanation:
            "A naive datetime has `tzinfo=None`, so Python can't tell which timezone it belongs to. Timezone-aware datetimes carry a `tzinfo` object encoding the UTC offset.",
        },
      ],
    },
  ],
};
