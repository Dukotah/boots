import type { Module } from "./types";

// Spreadsheets Mastery — practical, quiz-only course covering formulas, data
// management, pivot tables, data validation, collaboration, and real-world
// spreadsheet design. Targets Google Sheets and Excel (parity noted where it
// matters). No coding; all concept and application questions.
export const spreadsheetsMastery: Module = {
  slug: "spreadsheets-mastery",
  title: "Spreadsheets Mastery",
  description:
    "Go from casual spreadsheet user to confident power user. Learn the formulas, data tools, pivot tables, and design habits that turn a grid of cells into a decision-making machine — covering both Google Sheets and Excel.",
  emoji: "🧮",
  gradient: "from-lime-500/20 to-green-500/10",
  tagline:
    "Master formulas, pivot tables, data validation, and clean design in Google Sheets and Excel — practical skills that pay off every week.",
  keywords: [
    "spreadsheets",
    "Excel tutorial",
    "Google Sheets tutorial",
    "VLOOKUP",
    "pivot tables",
    "spreadsheet formulas",
    "data analysis spreadsheet",
    "learn Excel",
    "learn Google Sheets",
  ],
  lessons: [
    {
      slug: "cell-references-and-formula-basics",
      title: "Cell References & Formula Basics",
      blurb: "Understand relative, absolute, and mixed references before you touch VLOOKUP.",
      xp: 20,
      kind: "quiz",
      content: `# Cell References & Formula Basics

Every spreadsheet formula is ultimately about **which cells to read, and how to
keep reading the right ones as you copy the formula down or across**.

## The three reference types

| Type | Syntax | Behavior when copied |
|------|--------|----------------------|
| Relative | \`A1\` | Both row and column shift |
| Absolute | \`$A$1\` | Neither row nor column shifts |
| Mixed | \`$A1\` or \`A$1\` | Only the $ part is locked |

**Example:** You have a price list in column B and a tax rate in cell E1.
- Formula in C2: \`=B2*(1+$E$1)\`
- When you copy it to C3, it becomes \`=B3*(1+$E$1)\` — the price row shifts,
  the tax-rate cell stays locked. That's the pattern for 80% of real-world formulas.

## Naming cells and ranges

Instead of \`$E$1\`, you can name a cell — select it, type a name in the Name Box
(top-left), press Enter. Then write \`=B2*(1+TaxRate)\`. Named ranges are
self-documenting and never need dollar signs.

## Basic arithmetic and order of operations

Spreadsheets follow standard math precedence: \`^\` before \`*\` and \`/\` before
\`+\` and \`-\`. Use parentheses to be explicit. \`=2+3*4\` gives 14, not 20.

## Text vs numbers

If a number is stored as text (common when pasting from PDFs or exports), your
SUM will silently skip it. The tell: numbers align right by default; text aligns
left. Fix with \`=VALUE(A1)\` or the "Convert to number" prompt in Excel.`,
      questions: [
        {
          prompt:
            "You write `=B2*$E$1` in cell C2 and copy it down to C3. What does the formula in C3 look like?",
          options: [
            "`=B2*$E$1` — nothing changes",
            "`=B3*$E$1` — the relative row shifts, the absolute reference stays",
            "`=B3*$E$2` — both rows shift by one",
          ],
          answer: 1,
          explanation:
            "`B2` is relative, so the row number increments when you copy down. `$E$1` is fully locked with dollar signs, so it never changes regardless of where you paste.",
        },
        {
          prompt:
            "A column of numbers imported from a PDF shows 0 when you SUM it. The most likely cause is:",
          options: [
            "SUM is broken in this version",
            "The numbers are stored as text, which SUM ignores",
            "The column is too wide",
          ],
          answer: 1,
          explanation:
            "Numbers stored as text are a classic import trap. SUM only adds numeric values; text-formatted numbers look fine visually but are skipped. Wrap each cell in VALUE() or use the built-in 'Convert to Number' fix.",
        },
        {
          prompt: "What is the result of `=2+3*4` in a spreadsheet?",
          options: ["20 — addition runs left to right first", "14 — multiplication runs before addition", "Error"],
          answer: 1,
          explanation:
            "Standard operator precedence applies: multiplication before addition. 3*4=12, then 2+12=14. Use parentheses `=(2+3)*4` if you want 20.",
        },
      ],
      explanation:
        "Master the dollar sign and you master copying formulas. Everything else — VLOOKUP, pivot tables, conditional formatting — builds on this foundation.",
    },
    {
      slug: "essential-formulas",
      title: "Essential Formulas",
      blurb: "SUM, IF, COUNTIF, SUMIF, and the lookup functions you'll use every week.",
      xp: 22,
      kind: "quiz",
      content: `# Essential Formulas

A handful of formulas cover the majority of real-world spreadsheet work. Here are
the ones worth mastering cold.

## Aggregation
- **SUM(range)** — adds all numbers in a range.
- **AVERAGE(range)** — arithmetic mean; blank cells are excluded.
- **COUNT(range)** — counts cells with numbers. **COUNTA** counts non-blank cells.
- **MIN / MAX** — smallest or largest value.

## Conditional logic
- **IF(condition, value_if_true, value_if_false)** — the backbone of derived columns.
  Example: \`=IF(B2>1000,"High","Low")\`
- **IFS(cond1, val1, cond2, val2, …)** — cleaner than nested IFs when you have
  3+ conditions (Excel 2019+, Google Sheets).
- **IFERROR(formula, fallback)** — wraps any formula; returns *fallback* instead of
  \`#N/A\`, \`#DIV/0!\`, etc. Essential around lookups.

## Conditional aggregation
- **COUNTIF(range, criteria)** — count cells matching a criterion.
  Example: \`=COUNTIF(D:D,"Paid")\`
- **SUMIF(range, criteria, sum_range)** — sum a column where another column matches.
  Example: \`=SUMIF(A:A,"East",C:C)\`
- **SUMIFS** and **COUNTIFS** — same idea with multiple criteria (AND logic).

## Lookups
- **VLOOKUP(value, table, col_index, FALSE)** — looks up a value in the leftmost
  column of a table and returns a value from the same row. The \`FALSE\` is critical:
  it means exact match. Omitting it (or using TRUE) is a common source of wrong answers.
- **XLOOKUP(value, lookup_array, return_array)** — the modern replacement. Works
  left or right, returns a range, handles "not found" cleanly.
- **INDEX(array, row, col) + MATCH(value, array, 0)** — flexible two-part lookup;
  the gold standard before XLOOKUP existed. Still widely used.

## Text
- **TRIM(text)** — removes leading/trailing spaces (the invisible bug-causer).
- **TEXT(value, format)** — converts a number to formatted text: \`=TEXT(A1,"$#,##0.00")\`
- **CONCATENATE** / the \`&\` operator / **TEXTJOIN** — combine strings.`,
      questions: [
        {
          prompt:
            "You use `=VLOOKUP(A2, Orders!$A:$D, 3, TRUE)`. A colleague says this might return wrong results. Why?",
          options: [
            "VLOOKUP only works on the same sheet",
            "TRUE enables approximate match, which requires the lookup column to be sorted and can silently return a wrong row",
            "The column index 3 is out of range",
          ],
          answer: 1,
          explanation:
            "TRUE (approximate match) assumes the first column is sorted ascending and returns the largest value less than or equal to your lookup. If the data isn't sorted, or you wanted an exact match, you'll get plausible-looking wrong answers. Always use FALSE for exact lookups.",
        },
        {
          prompt:
            "Your VLOOKUP returns `#N/A` for some rows. You want those cells to display 0 instead. Which formula does this cleanly?",
          options: [
            "`=IFERROR(VLOOKUP(A2,Table,2,FALSE), 0)`",
            "`=IF(VLOOKUP(A2,Table,2,FALSE)=#N/A, 0, VLOOKUP(A2,Table,2,FALSE))`",
            "Delete the rows that cause #N/A",
          ],
          answer: 0,
          explanation:
            "IFERROR wraps any formula and returns the fallback value whenever the formula produces any error. It's concise, runs the formula only once, and handles all error types, not just #N/A.",
        },
        {
          prompt:
            "You need to count orders from the 'West' region in column B that have a value over 500 in column C. Which formula is correct?",
          options: [
            "`=COUNTIF(B:B,\"West\")+COUNTIF(C:C,\">500\")`",
            "`=COUNTIFS(B:B,\"West\",C:C,\">500\")`",
            "`=SUMIF(B:B,\"West\",C:C)`",
          ],
          answer: 1,
          explanation:
            "COUNTIFS applies multiple criteria with AND logic — both conditions must be true for a row to count. The first option adds the two counts separately (OR-like logic, always wrong here). SUMIF adds values rather than counting rows.",
        },
      ],
      explanation:
        "IFERROR around every lookup, FALSE for exact matches, and COUNTIFS/SUMIFS for multi-criteria work — these three habits eliminate most formula bugs.",
    },
    {
      slug: "data-cleaning-and-validation",
      title: "Data Cleaning & Validation",
      blurb: "Garbage in, garbage out — fix it before it reaches your formulas.",
      xp: 22,
      kind: "quiz",
      content: `# Data Cleaning & Validation

Clean data is the invisible prerequisite for every formula, pivot table, and chart.
Most spreadsheet errors aren't formula mistakes — they're dirty input.

## Common data quality problems

| Problem | Symptom | Fix |
|---------|---------|-----|
| Leading/trailing spaces | COUNTIF misses matches | TRIM() |
| Numbers as text | SUM returns 0 | VALUE() or Convert to Number |
| Inconsistent capitalization | "west" ≠ "West" | LOWER() / PROPER() |
| Date stored as text | Date math fails | DATEVALUE() |
| Merged cells | Sorting breaks silently | Unmerge, fill down |

## Data Validation (the prevent-the-mess tool)

**Data → Data Validation** lets you restrict what can be entered in a cell:

- **List** — forces a dropdown (great for regions, statuses, categories).
- **Whole number / Decimal** — rejects out-of-range entries.
- **Date** — ensures a valid date is typed.
- **Custom formula** — e.g., \`=LEN(A1)=10\` to enforce a 10-character code.

Add an **input message** to guide users and an **error alert** to stop bad entries.
Prevention is always cheaper than cleaning.

## Flash Fill and Power Tools (Excel)

**Ctrl+E** (Flash Fill) detects a pattern from your examples and applies it to the
whole column — great for splitting names, reformatting phone numbers, etc. In Google
Sheets use **Data → Split text to columns** or SPLIT().

## Remove Duplicates

**Data → Remove Duplicates** (both apps) deletes rows where every selected column
matches a prior row. Run it on an ID column only to catch real duplicates; running
it on too many columns may miss rows that *should* be deduplicated.`,
      questions: [
        {
          prompt:
            "A COUNTIF formula for 'West' returns 0, but you can see 'West' entries in the column. The most likely cause is:",
          options: [
            "COUNTIF is case-sensitive and 'West' must be uppercase",
            "The cells contain extra spaces (e.g., ' West') that TRIM would fix",
            "COUNTIF doesn't support text criteria",
          ],
          answer: 1,
          explanation:
            "COUNTIF is case-insensitive, so capitalization isn't the issue. Extra leading or trailing spaces make ' West' not equal to 'West'. Wrap the source with TRIM or run a Find & Replace to remove spaces.",
        },
        {
          prompt:
            "You want to prevent anyone from typing a value other than 'Pending', 'Approved', or 'Rejected' in column D. The right tool is:",
          options: [
            "Conditional formatting — highlight invalid values red",
            "Data Validation with a List — shows a dropdown and can block other entries",
            "A formula in column E that flags bad values",
          ],
          answer: 1,
          explanation:
            "Data Validation with a List source prevents invalid input at entry time. Conditional formatting only highlights problems after the fact; a flag formula also reacts after the damage is done.",
        },
        {
          prompt:
            "You click Remove Duplicates and select all 12 columns. Two rows have the same Order ID but different timestamps. What happens?",
          options: [
            "Both rows are deleted",
            "Neither row is deleted — they differ in at least one column, so they're not considered duplicates",
            "The older row is deleted automatically",
          ],
          answer: 1,
          explanation:
            "Remove Duplicates only deletes a row when ALL selected columns match a prior row. Selecting too many columns causes it to miss true duplicates. To deduplicate on Order ID alone, select only that column.",
        },
      ],
      explanation:
        "Validate at entry to prevent dirty data; TRIM, VALUE, and LOWER to fix what already exists. Clean input makes every downstream formula and chart reliable.",
    },
    {
      slug: "pivot-tables",
      title: "Pivot Tables",
      blurb: "Summarize thousands of rows in seconds — the single highest-leverage spreadsheet skill.",
      xp: 25,
      kind: "quiz",
      content: `# Pivot Tables

A pivot table is a **summarization engine**: you drag field names into buckets
(Rows, Columns, Values, Filters), and the spreadsheet instantly aggregates your
data. No formulas required.

## The four areas

- **Rows** — unique values here become the left-hand labels (e.g., Region, Product).
- **Columns** — unique values here become column headers (e.g., Quarter, Category).
- **Values** — the number to aggregate (e.g., Revenue, Count of Orders). You choose
  the aggregation: Sum, Count, Average, Max, etc.
- **Filters** — a slicer across the whole table (e.g., filter to 'West' only).

## Building one (both apps)

1. Click anywhere inside your clean, tabular data.
2. **Insert → Pivot Table** (Excel) / **Insert → Pivot table** (Sheets).
3. Place the pivot on a new sheet to avoid overwriting data.
4. Drag fields to areas; the table updates live.

## Design rules for pivot-friendly source data

- **One row = one record.** No merged cells, no subtotal rows, no blank rows.
- **Column headers in row 1.** Every column needs a unique, non-blank header.
- **No calculated columns mixed with raw data** (put those in the pivot's Values area).

## Refresh

Pivot tables don't update automatically. After adding rows to source data, right-click
the pivot and choose **Refresh** (Excel) or it may update automatically in Sheets.
In Excel, turning on **Refresh on Open** (PivotTable Options) is good hygiene.

## Slicers

Slicers (both apps) are visual filter buttons. **PivotTable Analyze → Insert Slicer**.
They're connected to the pivot and make it trivial to hand a dashboard to a non-technical
colleague.`,
      questions: [
        {
          prompt:
            "You drag 'Region' to Rows, 'Quarter' to Columns, and 'Revenue' to Values (Sum). What does the pivot table show?",
          options: [
            "A list of all revenue figures sorted by date",
            "Total revenue for each Region-Quarter combination, in a grid",
            "A count of how many rows exist per region",
          ],
          answer: 1,
          explanation:
            "With Region in Rows and Quarter in Columns, the pivot creates a matrix. Each cell holds the Sum of Revenue for that specific region-quarter pair — exactly the cross-tab breakdown most reports need.",
        },
        {
          prompt:
            "After adding 50 new rows to your source data in Excel, the pivot table still shows old totals. What do you do?",
          options: [
            "Delete the pivot and rebuild it",
            "Right-click the pivot and choose Refresh (or set Refresh on Open)",
            "Nothing — pivot tables always update in real time",
          ],
          answer: 1,
          explanation:
            "Excel pivot tables cache results and must be refreshed manually (or on file open). Right-click → Refresh is the fastest fix. Google Sheets updates more eagerly but still benefits from a manual refresh after bulk imports.",
        },
        {
          prompt:
            "Your source data has merged cells in the 'Product' column. You build a pivot table — what will likely go wrong?",
          options: [
            "Nothing; pivot tables handle merged cells automatically",
            "Only the top cell of each merge has a value; the rest are blank, so the pivot will miscount or omit rows",
            "The pivot will error immediately and refuse to build",
          ],
          answer: 1,
          explanation:
            "Merged cells in spreadsheet UIs only store the value in the top-left cell; underlying cells are blank. A pivot table reads all cells, so merged-cell rows look blank and get grouped under an empty label or omitted. Always unmerge and fill down before pivoting.",
        },
      ],
      explanation:
        "Rows + Columns + Values is the whole model. Keep source data flat, refresh after updates, and add Slicers to hand dashboards to anyone.",
    },
    {
      slug: "charts-and-visualization",
      title: "Charts & Visualization",
      blurb: "Pick the right chart, trim the clutter, and let the data speak.",
      xp: 20,
      kind: "quiz",
      content: `# Charts & Visualization

A chart is only as good as its ability to communicate one clear idea. Most default
spreadsheet charts are technically correct but visually noisy. A few principles
separate forgettable charts from useful ones.

## Picking the right chart type

| Goal | Chart type |
|------|-----------|
| Compare categories | Bar / column chart |
| Show trends over time | Line chart |
| Show part-to-whole | Pie or stacked bar (with few categories) |
| Show correlation between two measures | Scatter plot |
| Show distribution | Histogram |

**Pie charts** should have at most 5–6 slices and only when parts truly sum to a
meaningful whole. Prefer a sorted bar chart for most comparisons.

## Common clutter to remove

- **Gridlines** — remove or lighten them; the bars/lines carry the data.
- **Chart borders** — invisible is usually better.
- **3-D effects** — distort the perceived lengths; never use for data comparison.
- **Legend** — if you have only one data series, delete it; if you have two, label
  directly on the chart instead of a legend.
- **Decimal precision** on axes — round to the level of meaningful precision.

## Best practices

- **Start the Y-axis at zero** for bar/column charts (truncating makes differences
  look much bigger than they are and can mislead).
- **Title the chart with the conclusion**, not just the data: "Q2 Sales Rose 18%
  vs Q1" beats "Revenue by Quarter."
- **Consistent color** — use one accent color for the highlighted category; grey
  for context bars.
- **Sort categories** for bar charts (largest to smallest) unless the order is
  inherently meaningful (months, age groups, etc.).`,
      questions: [
        {
          prompt:
            "You want to show how each sales region contributes to total annual revenue. Which chart type is most appropriate?",
          options: [
            "Line chart",
            "Pie chart or 100% stacked bar chart showing part-to-whole breakdown by region",
            "Scatter plot",
          ],
          answer: 1,
          explanation:
            "Part-to-whole relationships are the natural home of pie or stacked bar charts. A line chart implies trend over time; a scatter plot implies correlation between two continuous variables.",
        },
        {
          prompt:
            "A bar chart comparing monthly sales starts its Y-axis at $8,000 instead of $0. What problem does this create?",
          options: [
            "No problem — it just zooms in for detail",
            "Visual distortion: bars appear proportionally much larger/smaller than the real differences, which can mislead viewers",
            "The chart will show a formula error",
          ],
          answer: 1,
          explanation:
            "A truncated Y-axis exaggerates differences. A bar that is 10% taller visually might represent only a 1% actual change. For bar/column charts, zero baseline is standard. Truncated axes are sometimes acceptable for line charts where the variation matters more than the absolute level.",
        },
        {
          prompt: "You have a column chart with only one data series. What should you do with the legend?",
          options: [
            "Keep it — legends are always required",
            "Delete it — the chart title or a data label makes it redundant",
            "Move it to the bottom to save space",
          ],
          answer: 1,
          explanation:
            "A single-series legend adds ink without adding information. The chart title or axis label already identifies the data. Removing it reduces clutter and shifts focus to the actual bars.",
        },
      ],
      explanation:
        "Right chart type + zero baseline + clear title + no clutter = a chart that communicates instead of confuses.",
    },
    {
      slug: "collaboration-and-data-integrity",
      title: "Collaboration & Data Integrity",
      blurb: "Share safely, protect what matters, and avoid the classic overwrite disasters.",
      xp: 22,
      kind: "quiz",
      content: `# Collaboration & Data Integrity

Spreadsheets were designed for one person; most modern ones are used by teams.
That gap creates predictable disasters: overwritten formulas, accidental deletions,
version confusion, and broken links.

## Sharing and permissions

**Google Sheets** uses granular sharing: Viewer, Commenter, or Editor. Lock sharing
at Viewer for dashboards you distribute; share as Editor only with people who need to
input data.

**Excel Online** (SharePoint / OneDrive) supports co-authoring — multiple editors
simultaneously — with cell-level conflict resolution.

**Protect sheets and ranges** (both apps):

- In Google Sheets: Data → Protect sheets and ranges. You can allow exceptions for
  specific editors.
- In Excel: Review → Protect Sheet. You can password-protect and choose which actions
  are allowed (select cells, sort, etc.).

## Version history

Both apps keep automatic version history. In Google Sheets: File → Version history →
See version history. In Excel Online: similar in the ribbon; for desktop, rely on
OneDrive/SharePoint versioning or manual saves with dated filenames.

**Never** use "Final_v2_REAL_final_USE_THIS.xlsx" naming. Use version history instead.

## Structural integrity habits

- **Put raw data on one sheet; derived work on another.** Raw data should be append-only;
  never overwrite it with transformations.
- **Name your sheets descriptively**: "Raw Data", "Summary", "Dashboard" — not
  "Sheet1", "Sheet2".
- **Avoid circular references** unless you explicitly need iterative calculation.
  Excel will warn; Sheets may silently compute the wrong thing.
- **Avoid VBA or Apps Script for shared files** unless every user will have it
  enabled. Scripts can break silently when permissions or environment change.`,
      questions: [
        {
          prompt:
            "You share a Google Sheets dashboard with 50 colleagues. You want them to see but not edit it. Which permission do you set?",
          options: [
            "Editor — so they can interact with filters",
            "Viewer — they can see data and use Slicer/filter views but cannot change cells",
            "Commenter — they can leave notes on every cell",
          ],
          answer: 1,
          explanation:
            "Viewer access prevents any edits. Google Sheets Viewer can still use Filter Views (their own view of the data) without affecting the shared sheet. Commenter adds annotation rights but isn't needed for a pure dashboard audience.",
        },
        {
          prompt:
            "An analyst overwrites your VLOOKUP column with hardcoded values and saves. How do you recover the formulas?",
          options: [
            "The data is gone — there's no recovery from a save",
            "Use version history (File → Version history in Sheets; OneDrive versions in Excel) to restore a prior version",
            "Re-type the VLOOKUP formulas from memory",
          ],
          answer: 1,
          explanation:
            "Both Google Sheets and Excel Online keep automatic version history. You can view a prior version, copy the lost formulas, and paste them back — or restore the whole sheet if the damage is widespread.",
        },
        {
          prompt:
            "Your team runs monthly reports by overwriting last month's data in the same file. What's the better practice?",
          options: [
            "Append new data as new rows in a raw-data sheet; formulas and pivots will pick it up automatically",
            "Continue overwriting — it's simpler and version history covers any mistakes",
            "Email the file instead of using shared storage",
          ],
          answer: 0,
          explanation:
            "An append-only raw data sheet preserves history, lets you compare months in pivot tables, and eliminates the risk of overwriting the wrong thing. Overwriting is a data-loss pattern even with version history, because recovering it is slower than never losing it.",
        },
      ],
      explanation:
        "Viewer for distribution, protect key ranges, use version history liberally, and keep raw data append-only. These habits prevent the most common collaboration disasters.",
    },
    {
      slug: "spreadsheets-mastery-capstone",
      title: "Spreadsheets Mastery: Capstone",
      blurb: "Apply everything — references, formulas, pivot tables, validation, charts, and collaboration.",
      xp: 25,
      kind: "quiz",
      content: `# Spreadsheets Mastery: Capstone

You've covered the full toolkit. This capstone tests your ability to reason through
realistic, multi-concept scenarios — the kind you'll actually encounter on the job.

## Quick reference: the skills in play

**Formula mechanics** — relative vs absolute references, order of operations,
text-vs-number gotchas.

**Core formulas** — IF, IFERROR, COUNTIFS, SUMIFS, VLOOKUP (exact match), XLOOKUP,
INDEX/MATCH.

**Data quality** — TRIM, VALUE, Data Validation, Remove Duplicates, append-only raw data.

**Pivot tables** — flat source data, Rows/Columns/Values, Refresh, Slicers.

**Charts** — right type, zero baseline for bars, conclusion-driven title, no clutter.

**Collaboration** — permission levels, version history, sheet protection, shared
editing.

## Decision framework for formula choice

1. **Do I need to look something up?** → XLOOKUP (modern) or VLOOKUP with FALSE
   (classic); wrap in IFERROR.
2. **Do I need a conditional count?** → COUNTIFS.
3. **Do I need a conditional sum?** → SUMIFS.
4. **Do I need conditional text?** → IF or IFS.
5. **Do I need to summarize many rows interactively?** → Pivot table, not nested formulas.
6. **Is my data dirty?** → Clean first (TRIM, VALUE, validate). Formulas on dirty
   data produce silently wrong results.

Spreadsheet fluency is a compounding skill: every hour of practice makes the next
problem faster. The goal isn't memorizing syntax — it's knowing which tool to reach
for and why.`,
      questions: [
        {
          prompt:
            "A manager wants a live summary showing total sales by product and by month, filterable by region. The most appropriate tool is:",
          options: [
            "A large block of SUMIFS formulas, one per product-month combination",
            "A pivot table with Product in Rows, Month in Columns, SUM of Sales in Values, and a Region Slicer",
            "A manually built table updated each month by copy-pasting",
          ],
          answer: 1,
          explanation:
            "A pivot table with a slicer is built for exactly this use case: interactive cross-tab summaries filterable by dimension. SUMIFS can replicate it but requires you to hard-code every combination; a manual table is error-prone and expensive to maintain.",
        },
        {
          prompt:
            "You inherit a file where someone used `=VLOOKUP(A2, Products, 2, TRUE)` to pull product names. Prices look right for most rows, but a few are wrong. What's the most likely cause?",
          options: [
            "TRUE (approximate match) requires the lookup column to be sorted; if it isn't, VLOOKUP silently returns a wrong row",
            "VLOOKUP can't handle text lookup values",
            "The table range named 'Products' is missing a column",
          ],
          answer: 0,
          explanation:
            "TRUE/approximate match assumes the lookup column is sorted ascending. When it isn't, VLOOKUP returns the largest value less than or equal to the lookup key — which can be a completely different product. Always use FALSE for exact-match name lookups.",
        },
        {
          prompt:
            "A colleague accidentally deletes 200 rows of raw sales data and saves the Google Sheet. Your next step is:",
          options: [
            "Re-enter all 200 rows manually",
            "File → Version history → See version history, find the version before the deletion, and restore or copy the lost rows",
            "Nothing can be done; the file is saved and the data is gone",
          ],
          answer: 1,
          explanation:
            "Google Sheets keeps a granular, automatic version history. You can browse named versions or specific timestamps, view the prior state, and restore the entire sheet or copy just the deleted rows back. This is one of the most important recovery tools to know.",
        },
      ],
      explanation:
        "The spreadsheet power-user mindset: reach for pivot tables over formula sprawl, always exact-match in lookups, keep raw data intact, and lean on version history. These habits separate reactive firefighting from confident, reliable data work.",
    },
  ],
};
