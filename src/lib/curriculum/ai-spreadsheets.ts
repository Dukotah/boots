import type { Module } from "./types";

// AI in Spreadsheets — practical, no-code guide to using AI features inside
// Excel and Google Sheets, as well as AI assistants alongside spreadsheet work.
// Covers built-in AI functions, prompt-driven formula generation, data cleaning,
// forecasting caveats, and the judgment calls that keep your data trustworthy.
export const aiSpreadsheets: Module = {
  slug: "ai-spreadsheets",
  title: "AI in Spreadsheets",
  description:
    "Learn to use AI features inside Excel and Google Sheets — and AI assistants alongside them — to write formulas faster, clean messy data, summarize tables, and work smarter without becoming a formula expert. Practical, accurate, no coding required.",
  emoji: "🧮",
  gradient: "from-green-500/20 to-emerald-500/10",
  tagline:
    "Use AI to write formulas, clean data, and analyze spreadsheets faster — without needing to be a formula expert.",
  keywords: [
    "AI in Excel",
    "AI in Google Sheets",
    "AI formula generator",
    "spreadsheet AI",
    "Copilot in Excel",
    "Gemini in Sheets",
    "AI data cleaning",
    "AI for spreadsheets",
    "Excel AI features",
    "Google Sheets AI",
  ],
  lessons: [
    {
      slug: "ai-spreadsheet-landscape",
      title: "The AI Spreadsheet Landscape",
      blurb: "Where AI lives in Excel, Google Sheets, and alongside them — the lay of the land.",
      xp: 20,
      kind: "quiz",
      content: `# The AI Spreadsheet Landscape

As of 2026, AI has entered spreadsheets through several distinct doors. Knowing which is which saves a lot of confusion.

**Built-in AI assistants**
Both major platforms have shipped AI sidebars:

- **Microsoft Copilot in Excel** — embedded in the Office ribbon (Microsoft 365 subscribers). You can ask it in plain English to write formulas, summarize ranges, create pivot tables, and highlight patterns.
- **Gemini in Google Sheets** — available via the "Help me organize" / side panel in Workspace accounts. Similar capabilities: formula suggestions, data summaries, automated formatting.

**AI-powered cell functions**
Some enterprise Workspace plans expose \`=AI()\`-style functions that call a model directly from a cell formula — useful for classification, extraction, and summarization at scale without leaving the grid.

**AI assistants alongside spreadsheets**
Even without a built-in AI, you can paste a formula problem or a data sample into Claude, ChatGPT, or Gemini and get a working formula back in seconds. This works for any spreadsheet tool — LibreOffice, Airtable, Notion databases, and more.

**What they all have in common**
The AI does not "understand" your business. It understands patterns in text and formulas. That makes it excellent at syntax and translation ("what formula does X?"), decent at structural suggestions ("group these columns"), and unreliable on questions requiring domain judgment ("is this sales figure normal?"). That distinction is the thread that runs through this whole course.`,
      questions: [
        {
          prompt: "Microsoft Copilot in Excel and Gemini in Google Sheets are best described as…",
          options: [
            "Separate apps you install instead of spreadsheets",
            "Built-in AI sidebars that can write formulas and summarize data using plain-English requests",
            "Automated macros that run on a schedule",
          ],
          answer: 1,
          explanation:
            "Both are AI assistants embedded inside the spreadsheet product itself — you stay in the same file and ask in plain language.",
        },
        {
          prompt: "You use LibreOffice Calc and have no paid AI add-on. What's your fastest path to getting AI help with a tricky formula?",
          options: [
            "You're out of luck — AI only works in Excel and Sheets",
            "Paste the problem into a general AI assistant like Claude or ChatGPT and ask for the formula",
            "Upgrade to Excel first",
          ],
          answer: 1,
          explanation:
            "Any general-purpose AI assistant can read a formula problem and return a working answer. The built-in assistants are convenient but not the only route.",
        },
        {
          prompt: "Which type of spreadsheet question is AI LEAST reliable for?",
          options: [
            "Translating a plain-English description into a VLOOKUP formula",
            "Fixing a syntax error in a nested IF statement",
            "Judging whether a specific revenue figure is reasonable for your business",
          ],
          answer: 2,
          explanation:
            "AI handles syntax and translation well. Business-context judgment — 'is this number realistic?' — requires domain knowledge the model doesn't have.",
        },
      ],
    },
    {
      slug: "formula-generation",
      title: "Generating Formulas with AI",
      blurb: "Describe what you want in plain English and get a working formula back — then verify it.",
      xp: 22,
      kind: "quiz",
      content: `# Generating Formulas with AI

Writing formulas is where AI delivers its clearest, fastest win in spreadsheets. Instead of hunting through documentation, you describe the goal and the AI produces the syntax.

## How to get a good formula

A weak request produces a generic formula. A specific request produces a usable one. Give the AI:

1. **The platform** — Excel or Google Sheets (they use different functions; XLOOKUP is Excel-native, QUERY is Sheets-only).
2. **The column/sheet layout** — "Column A has dates, Column B has amounts, Column C has category names."
3. **The goal** — "Sum only the rows in Column B where Column C says 'Rent'."
4. **Any constraint** — "It needs to work when I add new rows later."

That prompt will return \`=SUMIF(C:C,"Rent",B:B)\` or an equivalent — exactly what you need.

## Translating between platforms

AI is exceptional at: "I have this Excel formula — give me the Google Sheets equivalent." Most complex XLOOKUP, LAMBDA, or array formulas have Sheets counterparts, and the AI knows the mapping.

## The one critical step: test before you trust

AI-generated formulas are usually correct, but they can:
- Reference the wrong column (off by one) if your description was ambiguous.
- Use a function available in one version of Excel but not your organization's version.
- Work on the sample rows but break on edge cases (empty cells, text in a number column).

Always paste the formula into a test range and verify the results against at least a few rows you already know the answer to. One minute of checking prevents spreadsheet disasters.`,
      questions: [
        {
          prompt: "You want AI to write a formula that sums sales figures only for the 'West' region. What should you include in your request?",
          options: [
            "Just 'sum the sales' — the AI will figure the rest out",
            "The platform (Excel or Sheets), which columns hold sales and region, and the exact region label to match",
            "A screenshot of the spreadsheet — text prompts don't work",
          ],
          answer: 1,
          explanation:
            "The more layout and goal detail you provide, the more precise the returned formula. Platform matters too — SUMIF is universal, but some alternatives differ by app.",
        },
        {
          prompt: "An AI returns a formula that looks right. What should you do before relying on it for a real report?",
          options: [
            "Ship it immediately — AI formulas are always correct",
            "Test it against a small set of rows where you already know the correct answer, then verify",
            "Run it on the full dataset first; if it crashes, try again",
          ],
          answer: 1,
          explanation:
            "AI formulas are usually right but can reference the wrong column or use unsupported functions. A quick sanity check on known data catches errors before they matter.",
        },
        {
          prompt: "You have a complex XLOOKUP formula from an Excel file and need the Google Sheets equivalent. AI is…",
          options: [
            "Useless here — you have to rewrite it yourself from documentation",
            "Excellent at this kind of translation — just paste the formula and ask for the Sheets version",
            "Only helpful for formulas shorter than one line",
          ],
          answer: 1,
          explanation:
            "Cross-platform formula translation is one of AI's strongest spreadsheet use cases. It knows both function libraries and the mapping between them.",
        },
      ],
      explanation:
        "Describe the layout and goal, specify the platform, then verify the output on a few known rows. That workflow turns AI into a formula collaborator, not a formula gamble.",
    },
    {
      slug: "data-cleaning-with-ai",
      title: "Data Cleaning with AI",
      blurb: "Inconsistent names, mixed formats, junk entries — AI can write the formulas and logic to fix them.",
      xp: 22,
      kind: "quiz",
      content: `# Data Cleaning with AI

Messy data is one of the most time-consuming parts of real spreadsheet work. AI won't clean your data for you — but it dramatically speeds up writing the formulas and approaches that do.

## Common cleaning tasks AI handles well

**Standardizing text** — "Write a formula to trim whitespace and capitalize each word in Column A." Result: \`=PROPER(TRIM(A2))\`.

**Splitting and extracting** — "Column B contains values like 'Smith, John (ID:4821)'. Extract just the ID number." AI will suggest a TEXTAFTER/MID/FIND combo or a REGEXEXTRACT for Sheets.

**Detecting and flagging outliers** — "Write a formula that marks a cell red if the value in Column C is more than 3 standard deviations from the column's average." AI can write both the formula and walk you through conditional formatting.

**Deduplication logic** — "How do I find duplicate rows in Excel where columns A and B together define a unique key?" AI can explain the COUNTIFS approach and write the formula.

## What AI cannot do

AI can generate cleaning formulas based on patterns you describe, but it **cannot see your actual data**. If you paste a sample (a few anonymized rows), it can tailor its suggestions. Without a sample, it works from your description alone — which is why describing the format precisely ("dates like '01-JAN-2025'") matters.

Also: cleaning logic that looks correct on your sample may still miss edge cases in the full dataset. Always scan results after applying a bulk clean.

## The paste-sample workflow

Pasting 5–10 representative rows (with any sensitive data removed or replaced with placeholders) gives the AI enough to write a formula that fits your exact structure, not just the general case.`,
      questions: [
        {
          prompt: "You have a column with values like '  west region  ' and 'West Region' and 'west region'. What kind of formula should you ask AI to write?",
          options: [
            "A formula to delete and retype each cell by hand",
            "A formula using TRIM and PROPER (or equivalent) to strip whitespace and standardize capitalization",
            "A macro that can only run on Windows",
          ],
          answer: 1,
          explanation:
            "TRIM removes extra spaces, PROPER standardizes capitalization — a classic one-two punch for inconsistent text. AI will write and combine these for you.",
        },
        {
          prompt: "To get the most accurate cleaning formula, what should you give the AI alongside your description?",
          options: [
            "Nothing extra — descriptions are always enough",
            "A few anonymized sample rows that show the actual format of the messy data",
            "The entire spreadsheet file",
          ],
          answer: 1,
          explanation:
            "Sample rows let the AI tailor the formula to your exact format rather than guessing. Anonymize sensitive values before pasting.",
        },
        {
          prompt: "After applying an AI-generated bulk cleaning formula to 10,000 rows, the best next step is…",
          options: [
            "Immediately send the cleaned data to stakeholders",
            "Scan a representative sample of the results to catch any edge cases the formula missed",
            "Delete the original column to save space",
          ],
          answer: 1,
          explanation:
            "Bulk operations can silently mishandle edge cases — unusual formats, nulls, non-ASCII characters. A spot-check after the fact is cheap and catches disasters before they propagate.",
        },
      ],
    },
    {
      slug: "summarizing-and-analyzing",
      title: "Summarizing and Analyzing Data",
      blurb: "Ask plain-English questions about your table — and know when the answer needs a second look.",
      xp: 22,
      kind: "quiz",
      content: `# Summarizing and Analyzing Data

One of the flagship features of Copilot in Excel and Gemini in Sheets is answering natural-language questions about your data: "What were total sales by region last quarter?" or "Which product had the most returns?"

## What this looks like in practice

You select a table (or the AI has access to it), type a question, and it responds with a summary, a chart suggestion, or a pivot table. The answers are often impressive for well-structured, clean data.

## The catch: garbage in, garbage out

AI analysis is only as good as the underlying data:

- **Inconsistent categories** ("West", "west", "W. Region") split totals across three rows — the AI won't know to merge them unless you clean first.
- **Hidden rows or filtered views** may not be included, silently skewing results.
- **Blank rows in the middle** of a table can terminate the range the AI reads.

If the AI's summary doesn't match your mental model, suspect data quality first, AI error second.

## Knowing when to go deeper

AI summaries are great for quick overviews, but they don't replace deliberate analysis for decisions that matter. For anything you'll present to stakeholders or act on financially, trace the numbers back:
- Check the formula or pivot that generated the figure.
- Verify the row count matches what you expect.
- Confirm the date range or filter was applied correctly.

## Asking follow-up questions

Just like a chatbot conversation, you can refine: "Break that down by month instead." "Show only the top 5." "Exclude returns." Iterating improves the result — you're not locked to the first answer.`,
      questions: [
        {
          prompt: "You ask Copilot in Excel 'what are total sales by region?' and the West region's total looks too low. The most likely cause is…",
          options: [
            "Excel has a known bug with regional data",
            "The underlying data has inconsistent region labels ('West', 'west', 'W. Region') being counted separately",
            "AI can only sum up to 1,000 rows",
          ],
          answer: 1,
          explanation:
            "Inconsistent labels are the most common cause of split totals. Clean the data first, then re-run the summary.",
        },
        {
          prompt: "An AI-generated summary shows a quarterly revenue figure you'll use in an investor report. What should you do?",
          options: [
            "Use it as-is — AI summaries are audit-grade",
            "Trace the number back: verify the formula, row count, date range, and filters before presenting it",
            "Round the number and move on",
          ],
          answer: 1,
          explanation:
            "High-stakes figures must be traceable. AI summaries are a starting point; you validate the mechanics before anything goes to stakeholders.",
        },
        {
          prompt: "The AI's first summary groups data quarterly but you need monthly. The right move is…",
          options: [
            "Start over in a new session from scratch",
            "Follow up in the same session: 'Break that down by month instead'",
            "Export to CSV and reprocess manually",
          ],
          answer: 1,
          explanation:
            "AI assistants in spreadsheets carry context within the session. A follow-up instruction refines the existing output — no need to start over.",
        },
      ],
    },
    {
      slug: "forecasting-and-limits",
      title: "Forecasting — and Where AI Falls Short",
      blurb: "AI can suggest forecast formulas, but statistical validity and business judgment are still yours.",
      xp: 25,
      kind: "quiz",
      content: `# Forecasting — and Where AI Falls Short

Forecasting is one of the most tempting AI-in-spreadsheets use cases, and one of the most important to approach carefully.

## What AI does well here

**Formula generation for standard methods** — AI can write the Excel \`FORECAST.ETS\` function (exponential smoothing), suggest moving averages, or build a LINEST-based linear regression — correctly, from a description. That saves time versus hunting docs.

**Explaining the math** — "What does the seasonality argument in FORECAST.ETS actually do?" is a great question to ask an AI. The explanations are usually clear and accurate.

**Sanity-checking your setup** — paste your forecast formula and ask the AI to review it for obvious errors in argument order or range references.

## Where AI falls short on forecasting

**It cannot evaluate whether your historical data is sufficient.** A 6-month series with a new product launch midway is not a valid basis for a 12-month forecast — but the AI will generate a formula anyway.

**It cannot validate your assumptions.** "Assume 15% growth" is a business judgment, not something an AI can confirm is reasonable.

**Forecast functions have real statistical requirements** — enough data points, stationarity, seasonality that matches the cycle. Excel's \`FORECAST.ETS\` will return a number regardless; the AI will generate the formula regardless. Whether the result is statistically meaningful is your responsibility.

**Confidence intervals are not certainty.** Many forecast functions return a range. The AI can explain what the interval means; it cannot tell you whether your business will actually land inside it.

## The responsible approach

Use AI to write and explain the formula. Then ask a human with domain knowledge — or a statistician, or at minimum your own business experience — whether the inputs, assumptions, and historical data actually support the forecast you're making.`,
      questions: [
        {
          prompt: "You ask AI to build a 12-month sales forecast from 3 months of data. It returns a formula. What's the problem?",
          options: [
            "No problem — the formula will be statistically sound regardless of how much data you have",
            "Three months is almost certainly insufficient for a reliable 12-month forecast; the AI generates the formula but cannot validate your data adequacy",
            "AI refuses to forecast with fewer than 24 months of data",
          ],
          answer: 1,
          explanation:
            "AI will produce a forecast formula on any data — it doesn't evaluate whether your dataset is statistically sufficient. That judgment is yours.",
        },
        {
          prompt: "A forecast formula returns a number with a confidence interval. The confidence interval means…",
          options: [
            "The actual outcome is guaranteed to fall in that range",
            "Based on the model's assumptions, that range captures likely outcomes — but real-world results depend on factors the model doesn't know",
            "The formula has an error",
          ],
          answer: 1,
          explanation:
            "Confidence intervals express statistical probability under the model's assumptions, not a guarantee. Business surprises outside the model are always possible.",
        },
        {
          prompt: "What is AI genuinely useful for in a forecasting workflow?",
          options: [
            "Confirming that your business assumptions are correct",
            "Writing and explaining the forecast formula, and reviewing it for syntax errors",
            "Guaranteeing the forecast is statistically valid",
          ],
          answer: 1,
          explanation:
            "AI writes the formula fast and explains the mechanics well. Validating assumptions and data adequacy are human responsibilities.",
        },
      ],
      explanation:
        "Let AI write and explain forecast formulas. Bring your own judgment — or a domain expert — to validate whether the inputs, data, and assumptions make real-world sense.",
    },
    {
      slug: "prompting-for-spreadsheet-tasks",
      title: "Prompting Well for Spreadsheet Tasks",
      blurb: "The specific details that make AI spreadsheet requests go from vague to precise.",
      xp: 22,
      kind: "quiz",
      content: `# Prompting Well for Spreadsheet Tasks

Spreadsheet AI requests have specific failure modes that general prompting advice doesn't cover. Here's what makes spreadsheet prompts succeed or fail.

## Always specify the platform

Excel and Google Sheets have meaningfully different function libraries. XLOOKUP does not exist in Sheets. QUERY does not exist in Excel. ARRAYFORMULA is Sheets; dynamic arrays with \`@\` are Excel. Start every formula request with "In Excel" or "In Google Sheets" so you get the right syntax.

## Describe your layout precisely

Vague: "Sum the sales by category."
Better: "In Google Sheets. Column A: transaction date. Column B: category (text). Column C: sale amount (numbers). I want a formula in E2 that sums all of Column C where Column B exactly matches the text in D2."

The second version leaves no room for column-guessing.

## Paste a sample for cleaning or extraction

When the data format is unusual — "dates formatted like '2025-Jan-03'" or "amounts with currency symbols like '€1.234,56'" — paste 4–5 representative rows. The AI tailors the formula to your exact format instead of the standard one.

## Ask for an explanation with the formula

"Give me the formula and explain each argument." This lets you catch incorrect assumptions and teaches you the formula at the same time. It takes seconds to ask and saves time when you need to adjust it later.

## Iterating when the formula is almost right

If the returned formula is close but not right, don't restart. Say: "That's almost correct — but it should also exclude rows where Column D is blank. How do I add that condition?" Building on an existing formula is faster than re-describing the whole problem.`,
      questions: [
        {
          prompt: "Why does specifying 'Excel' vs 'Google Sheets' matter in a formula request?",
          options: [
            "It doesn't — all spreadsheet formulas are identical across platforms",
            "The two platforms have different function libraries; XLOOKUP works in Excel but not natively in Sheets, and QUERY is Sheets-only",
            "AI only supports one platform at a time",
          ],
          answer: 1,
          explanation:
            "Platform matters because function libraries diverge. Omitting it risks getting a formula that uses a function your tool doesn't support.",
        },
        {
          prompt: "The AI returns a formula that's 90% correct — it needs one more condition added. The best next step is…",
          options: [
            "Start a brand-new session and re-describe the whole formula from scratch",
            "Follow up: describe just the missing condition and ask it to update the formula",
            "Find the condition in the documentation and merge it yourself without AI",
          ],
          answer: 1,
          explanation:
            "Follow-up refinements in the same session are faster than re-describing everything. The AI carries context about the formula you're building.",
        },
        {
          prompt: "You're asking AI to parse dates formatted as '15 Mar 2025'. The most useful thing to add to your request is…",
          options: [
            "Nothing extra — standard date parsing handles all formats",
            "A few example cells showing the exact format, so the AI tailors the formula rather than guessing",
            "The total number of rows in your sheet",
          ],
          answer: 1,
          explanation:
            "Non-standard formats need format-specific parsing. Sample values let the AI write the right DATEVALUE/TEXT/SPLIT combination instead of a generic one that may fail.",
        },
      ],
    },
    {
      slug: "ai-spreadsheets-capstone",
      title: "Putting It All Together",
      blurb: "Capstone: apply the whole course — formulas, cleaning, analysis, forecasting, and judgment.",
      xp: 25,
      kind: "quiz",
      content: `# Putting It All Together

You've covered the full arc of AI in spreadsheets. Let's lock in the key ideas before you go use them.

## The three-layer model

Think of AI's role in spreadsheets across three layers:

1. **Syntax layer** — Writing, translating, and debugging formulas. AI is fast and accurate here. Always verify on test data, but this is your highest-confidence use case.

2. **Structure layer** — Suggesting how to organize data, creating pivot tables, cleaning inconsistencies, summarizing ranges. AI is useful but needs clean inputs to produce clean outputs. Your job: prepare the data and check the results.

3. **Judgment layer** — Is this forecast reasonable? Is this anomaly a real trend or noise? Should you trust this figure in a presentation? AI has no business context. These calls are always yours.

## The habits that matter

- **Specify the platform and layout** before asking for a formula.
- **Paste a sample** when the data format is unusual.
- **Test on known data** before applying a formula at scale.
- **Trace high-stakes numbers** back to their source regardless of who (or what) generated them.
- **Iterate, don't restart** — follow-up refinements in the same session are almost always faster.
- **Verify citations and summaries** — if the AI claims a statistic about your own data, cross-check it against the raw numbers.

## What hasn't changed

AI has made formula-writing dramatically faster and data-cleaning less tedious. It has not changed the fundamentals of good spreadsheet practice: clean data before you analyze, document your assumptions, check your work, and own the decisions you make with numbers. AI is a powerful accelerant — the steering wheel is still yours.`,
      questions: [
        {
          prompt: "At which layer is AI MOST reliable in spreadsheet work?",
          options: [
            "Judgment layer — deciding whether a business figure is reasonable",
            "Syntax layer — writing, translating, and debugging formulas",
            "It's equally reliable at all three",
          ],
          answer: 1,
          explanation:
            "Formula syntax is AI's highest-confidence spreadsheet zone. Business-context judgment — whether a number makes sense — is the layer where human expertise is irreplaceable.",
        },
        {
          prompt: "A colleague generated a revenue summary using Copilot and is ready to put it in the board deck. The right move is…",
          options: [
            "Go ahead — Copilot summaries are always accurate",
            "Trace the figure back to the source data to confirm the row count, date range, and filters are correct before it reaches the board",
            "Regenerate it with ChatGPT to double-check",
          ],
          answer: 1,
          explanation:
            "High-stakes numbers go to stakeholders only after you've verified the mechanics — regardless of whether a human or an AI generated them.",
        },
        {
          prompt: "Which single habit most prevents AI-in-spreadsheets mistakes from becoming real problems?",
          options: [
            "Only using built-in AI features, never external assistants",
            "Testing AI-generated formulas and summaries against known data before applying them at scale",
            "Avoiding forecasting functions entirely",
          ],
          answer: 1,
          explanation:
            "Verification on a small, known dataset is the universal safety net. It catches column errors, unsupported functions, and edge-case failures before they affect real decisions.",
        },
      ],
      explanation:
        "Syntax: trust but verify. Structure: clean inputs, check outputs. Judgment: always yours. Specifying platform, pasting samples, testing on known data, and tracing high-stakes numbers — those habits make you a reliable AI-powered spreadsheet operator.",
    },
  ],
};
