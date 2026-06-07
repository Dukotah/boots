import type { Module } from "./types";

export const dataVisualization: Module = {
  slug: "data-visualization",
  title: "Data Visualization Basics",
  description:
    "Learn to turn raw numbers into clear, honest charts. Understand when to use each chart type, how to avoid misleading visuals, and how tools like D3, Chart.js, Observable, and Tableau fit into a modern data workflow — no coding required.",
  emoji: "📊",
  gradient: "from-green-500/20 to-emerald-500/10",
  tagline:
    "Choose the right chart, avoid misleading visuals, and communicate data clearly — foundations every analyst and developer needs.",
  keywords: [
    "data visualization",
    "chart types",
    "data viz basics",
    "how to make charts",
    "D3.js",
    "Chart.js",
    "Tableau",
    "data storytelling",
    "visualization best practices",
    "misleading charts",
  ],
  lessons: [
    {
      slug: "why-visualization-matters",
      title: "Why Visualization Matters",
      blurb: "A well-made chart reveals patterns a table of numbers hides — here's why.",
      xp: 20,
      kind: "quiz",
      content: `# Why Visualization Matters

Humans process visual information far faster than text or numbers. A column of 1,000
sales figures tells you almost nothing at a glance; a line chart of the same data
instantly shows a trend, a dip, or a spike.

**The core purpose of data visualization** is to make patterns, relationships, and
outliers visible so that the right decisions get made faster.

## Anscombe's Quartet

In 1973, statistician Francis Anscombe showed four datasets that share nearly
identical summary statistics — same mean, variance, and correlation — yet look
completely different when plotted:

- Dataset I: a clean linear relationship.
- Dataset II: a curve, not a line.
- Dataset III: a perfect line with one dramatic outlier.
- Dataset IV: all points clustered at one x value except one.

If you'd only looked at the numbers, you'd treat all four the same. The chart
tells you they are completely different problems.

## Visualization is communication

A chart is not just a picture — it's an argument. Every design choice (what to
show, what to omit, where to start the axis) shapes the message the reader takes
away. That's why understanding the basics is not optional for anyone working with
data.

## Two failure modes to avoid

1. **Obscuring the data** — so much decoration, so many colors, and so little
   signal that the reader cannot find the point.
2. **Misleading the reader** — truncated axes, cherry-picked time windows, or the
   wrong chart type for the data, producing a false impression.

Great visualization avoids both: it is honest, clear, and purposeful.`,
      questions: [
        {
          prompt:
            "Anscombe's Quartet is used to demonstrate which key point about data visualization?",
          options: [
            "Bar charts are always better than tables",
            "Datasets with identical summary statistics can look completely different when plotted — visualizing is essential",
            "Scatter plots are the only reliable chart type",
          ],
          answer: 1,
          explanation:
            "Anscombe's four datasets share the same mean, variance, and correlation but have radically different shapes. It proves that summary statistics alone are not enough — you need to see the data.",
        },
        {
          prompt: "Which of these is described as a 'failure mode' in data visualization?",
          options: [
            "Using a consistent color palette",
            "Truncating an axis to exaggerate a small change and mislead the reader",
            "Labeling the axes clearly",
          ],
          answer: 1,
          explanation:
            "A truncated y-axis can make a tiny difference look dramatic. This is a classic misleading-chart pattern — the chart is technically accurate but the impression is false.",
        },
        {
          prompt: "Why is a chart described as 'an argument' rather than just a picture?",
          options: [
            "Charts always contain political bias",
            "Every design choice — what to show, what to omit, axis ranges — shapes the message the reader receives",
            "Arguments are faster to read than tables",
          ],
          answer: 1,
          explanation:
            "Every decision an author makes about a chart carries rhetorical weight. Treating a chart as a neutral picture is a trap; understanding it as communication is what separates good data practice from bad.",
        },
      ],
      explanation:
        "Visualization exists to surface patterns that numbers alone hide. Done honestly, it accelerates good decisions. Done carelessly, it misleads — so understanding the basics is foundational.",
    },
    {
      slug: "choosing-the-right-chart",
      title: "Choosing the Right Chart",
      blurb: "Bar, line, scatter, pie — each has a job. Pick the wrong one and you bury your point.",
      xp: 22,
      kind: "quiz",
      content: `# Choosing the Right Chart

The single most impactful decision in data visualization is choosing a chart type
that fits what you are trying to show. Here is a practical guide.

## What are you showing?

| Goal | Reach for |
|------|-----------|
| **Compare categories** | Bar chart (horizontal for long labels) |
| **Show change over time** | Line chart |
| **Show a relationship between two numeric variables** | Scatter plot |
| **Show part-to-whole** | Stacked bar or pie (small number of slices) |
| **Show distribution** | Histogram or box plot |
| **Show geographic patterns** | Choropleth (color-coded map) |

## Common mistakes

**Pie charts with many slices** — humans cannot accurately compare areas or angles
beyond about 5–6 categories. When you have more, use a bar chart instead.

**Line charts for unordered categories** — a line implies continuity and sequence.
If your x-axis is "city names," a bar chart is correct; a line chart implies you
can interpolate between cities, which is meaningless.

**3D charts** — three-dimensional effects distort perception of 2D data almost
every time. Avoid them for quantitative comparisons.

**Dual-axis charts** — two y-axes can imply a relationship between two unrelated
series just by scaling them to intersect. Use them only when both series share the
same unit or the relationship is well-established.

## The "so what" test

Before finalizing any chart, ask: *What is the one thing a reader should take away
in five seconds?* If you cannot name it, the chart needs to be simplified.`,
      questions: [
        {
          prompt:
            "You want to show how monthly revenue changed over a two-year period. Which chart type is most appropriate?",
          options: [
            "Pie chart",
            "Line chart",
            "Scatter plot",
          ],
          answer: 1,
          explanation:
            "Line charts are the standard choice for continuous change over time. Each point is connected, clearly showing trends, rises, and dips across the months.",
        },
        {
          prompt:
            "A pie chart with 14 slices is problematic because…",
          options: [
            "Pie charts can only use primary colors",
            "Humans cannot accurately compare small angles or areas beyond ~5–6 slices, making the chart hard to read",
            "Pie charts are only for geographic data",
          ],
          answer: 1,
          explanation:
            "Human perception of angle and area is weak. With many slices, a pie chart becomes a guessing game. A horizontal bar chart ranked by value is nearly always clearer.",
        },
        {
          prompt:
            "Why should you generally avoid 3D chart effects when showing quantitative data?",
          options: [
            "3D charts take too long to render",
            "Three-dimensional effects distort the perceived proportions of 2D data, causing misreadings",
            "3D charts are only allowed in academic papers",
          ],
          answer: 1,
          explanation:
            "Perspective projection changes how bar heights and slice sizes appear. A bar that looks smaller in the 'back' of a 3D chart is read as having a smaller value — even if it doesn't.",
        },
      ],
      explanation:
        "Match the chart type to the question you are answering: comparison → bar, time → line, relationship → scatter, distribution → histogram. Everything else is a variant of these.",
    },
    {
      slug: "design-principles-clarity",
      title: "Design Principles for Clarity",
      blurb: "Fewer elements, better signal: the data-ink ratio and other rules that make charts readable.",
      xp: 22,
      kind: "quiz",
      content: `# Design Principles for Clarity

Good chart design is mostly about **removing things**, not adding them.

## The data-ink ratio (Edward Tufte)

Edward Tufte introduced the concept of **data-ink**: the ink (or pixels) on a
chart that directly represents data. The **data-ink ratio** is the fraction of
your total chart that is data-ink.

> Maximize the data-ink ratio. Eliminate anything that does not convey information.

Concrete things to cut:

- Unnecessary gridlines (keep only the ones that help comparisons)
- Heavy borders and box outlines around the plot area
- Redundant legends when labels can be placed directly on the series
- Decorative images or clip art inside the chart
- Gradient fills on bars that add no quantitative information

## Color

Color is a channel, not a decoration. Use it to encode a variable (category,
magnitude) or draw attention to a specific element — not to make the chart look
"designed." Rules of thumb:

- **Qualitative data** (categories): use a palette with perceptually distinct hues
  (e.g., ColorBrewer's qualitative scales).
- **Sequential data** (low to high): use a single-hue ramp (light → dark).
- **Diverging data** (negative to positive): use two contrasting hues meeting at a
  neutral midpoint.
- Always check your palette against **color-blind simulators** — about 8% of men
  have red-green color vision deficiency.

## Labels and annotations

Direct labels on data series eliminate the cognitive cost of cross-referencing a
legend. A short callout annotation explaining *why* a spike occurred is worth more
than any decorative flourish.

## Whitespace

Breathing room between elements lets the eye separate them cleanly. Don't cram a
chart; let it breathe.`,
      questions: [
        {
          prompt:
            "Edward Tufte's 'data-ink ratio' principle says you should…",
          options: [
            "Add as many design elements as possible to make the chart visually rich",
            "Maximize the proportion of the chart that directly represents data, and eliminate non-data ink",
            "Always use exactly two colors",
          ],
          answer: 1,
          explanation:
            "Tufte's principle pushes toward stripping out gridlines, borders, and decorations that do not encode data — leaving only what informs the reader.",
        },
        {
          prompt:
            "You are visualizing temperature anomalies that range from −3°C to +3°C relative to a baseline. Which color scheme is most appropriate?",
          options: [
            "A single-hue sequential ramp (light blue to dark blue)",
            "A diverging palette (blue → white → red), with white at zero",
            "A random qualitative palette",
          ],
          answer: 1,
          explanation:
            "Diverging data has a meaningful midpoint (zero). A diverging palette anchored at white (neutral) lets the reader see cooling vs warming immediately. A single-hue ramp would hide the direction of the anomaly.",
        },
        {
          prompt:
            "Why should you check a color palette against a color-blind simulator before publishing?",
          options: [
            "Simulators improve rendering performance",
            "About 8% of men have red-green color vision deficiency, and a chart unreadable to them fails a significant portion of your audience",
            "Color-blind simulators are required by all style guides",
          ],
          answer: 1,
          explanation:
            "Red-green color vision deficiency is common enough that designing without checking it is excluding a real slice of your audience. Tools like Coblis or the Viz Palette site make checking fast.",
        },
      ],
      explanation:
        "Good chart design is mostly subtraction: cut what doesn't encode data, use color purposefully, label directly, and give everything room to breathe.",
    },
    {
      slug: "avoiding-misleading-charts",
      title: "Avoiding Misleading Charts",
      blurb: "Truncated axes, cherry-picked windows, and area distortions — the most common ways charts lie.",
      xp: 23,
      kind: "quiz",
      content: `# Avoiding Misleading Charts

Charts can mislead without containing a single false number. Here are the most
common patterns to recognize and avoid.

## Truncated y-axis

Starting a bar chart's y-axis at a value other than zero exaggerates differences.
A change from 98 to 99 looks like a doubling if the axis runs 98–100. Bar charts
represent magnitude through bar *length*, so the full scale must start at zero.

Line charts are a partial exception: because a line chart shows *change*, starting
above zero to show detail is sometimes defensible — but the axis break must be
clearly marked.

## Cherry-picked time windows

Showing only the portion of a time series that supports your conclusion while
omitting context that contradicts it. Always ask: *What happened before and after
this window?*

## Area and bubble distortions

When using circles or bubbles to encode a numeric value, the area of the circle
must be proportional to the value — not the radius or the diameter. Scaling by
radius makes large values appear enormously larger than they are (area = πr²).

## Correlation vs causation

A chart showing two variables rising together does not prove one causes the other.
Ice cream sales and drowning rates both peak in summer — they share a common
cause (hot weather), not a direct link.

## Inappropriate baselines and cumulative totals

Cumulative line charts always go up as long as you're adding anything positive.
Showing a cumulative total can make stagnant growth look like relentless progress.
Prefer period-by-period charts when showing rate of change matters.`,
      questions: [
        {
          prompt:
            "A bar chart's y-axis starts at 980 instead of 0. Values shown are 985 and 990. What is the problem?",
          options: [
            "The chart uses too many gridlines",
            "Truncating the axis makes a tiny difference (5 units) look enormous, misleading the reader about the relative sizes",
            "Bar charts should always start at 100",
          ],
          answer: 1,
          explanation:
            "Bar length encodes magnitude. When the axis is truncated, the bars' physical lengths no longer represent the actual ratio between values — a 0.5% difference can appear to be a 5x difference.",
        },
        {
          prompt:
            "A bubble chart uses circle *radius* (not area) proportional to population. A city with 4M people gets a circle twice the radius of a 2M city. What is wrong?",
          options: [
            "Bubble charts cannot show population data",
            "Doubling the radius quadruples the visual area, making the larger city look four times bigger rather than twice — distorting perception",
            "Circles should only be used for percentages",
          ],
          answer: 1,
          explanation:
            "Area = πr². If radius doubles, area quadruples. The visual impression of 'size' is driven by area, so encoding by radius systematically overstates large values.",
        },
        {
          prompt:
            "A chart shows ice cream sales and drowning incidents rising together every summer. What conclusion is valid?",
          options: [
            "Eating ice cream causes drowning",
            "The two variables are correlated but likely share a common cause (summer heat) rather than a direct causal link",
            "Drowning causes people to eat more ice cream",
          ],
          answer: 1,
          explanation:
            "Correlation does not imply causation. Both variables are driven by hot weather. A chart showing two lines moving together proves nothing about which causes which — or whether either causes the other.",
        },
      ],
      explanation:
        "Honest charts start bar axes at zero, show full time context, encode area (not radius) for circles, and never claim causation from correlation alone.",
    },
    {
      slug: "visualization-tools-landscape",
      title: "The Visualization Tools Landscape",
      blurb: "D3, Chart.js, Observable, Tableau, Power BI — know which tool belongs in which situation.",
      xp: 22,
      kind: "quiz",
      content: `# The Visualization Tools Landscape

Dozens of tools exist for building charts. Picking the right one depends on your
skill level, your audience, and how custom you need to go.

## A rough taxonomy

### No-code / BI tools
- **Tableau** and **Power BI** — drag-and-drop, deeply integrated with databases
  and spreadsheets, used heavily in business intelligence. Tableau is known for
  powerful interactivity; Power BI for Microsoft ecosystem integration.
- **Google Looker Studio** (formerly Data Studio) — free, browser-based BI with
  native Google Sheets and BigQuery connectors.
- **Excel / Google Sheets charts** — sufficient for quick one-off charts in
  documents and emails.

### Code-based charting libraries
- **Chart.js** — simple, canvas-based, excellent for standard charts (bar, line,
  pie, radar) in web apps. Low learning curve.
- **Recharts** — React-native charting library built on SVG; the go-to for React
  dashboards.
- **Vega-Lite** — a high-level grammar of graphics for the web; concise JSON specs
  produce publication-quality charts.

### Low-level / custom
- **D3.js** (Data-Driven Documents) — the most powerful web visualization library.
  D3 gives you complete control over SVG/Canvas rendering. It has a steep learning
  curve but no ceiling. Most other JS libraries are built on top of D3 internally.

### Notebooks and analysis
- **Observable** — a reactive JavaScript notebook by the D3 creator Mike Bostock.
  Great for exploratory visualization with live data.
- **Matplotlib / Seaborn / Plotly** (Python) — the standard stack for data science
  and Jupyter notebooks. Plotly adds interactivity.

## How to choose

| Situation | Reach for |
|-----------|-----------|
| Business dashboard, non-coder audience | Tableau / Power BI |
| Standard charts in a React app | Recharts or Chart.js |
| Highly custom, interactive web viz | D3.js |
| Python data science notebook | Matplotlib / Seaborn / Plotly |
| Exploratory analysis + sharing | Observable |`,
      questions: [
        {
          prompt:
            "A data scientist working in a Jupyter notebook wants interactive charts without leaving Python. Which tool fits best?",
          options: [
            "D3.js",
            "Plotly (Python)",
            "Tableau",
          ],
          answer: 1,
          explanation:
            "Plotly has a full Python API and renders interactive charts directly inside Jupyter notebooks. D3 is JavaScript-only; Tableau is a separate BI application.",
        },
        {
          prompt:
            "D3.js is described as the 'most powerful web visualization library' but also as having a steep learning curve. Why is it powerful?",
          options: [
            "It auto-selects the best chart type for your data",
            "It gives complete control over SVG and Canvas rendering, with no constraints on chart type or interaction design",
            "It is the only library that can handle more than 1,000 data points",
          ],
          answer: 1,
          explanation:
            "D3 operates at the level of data-to-DOM transformations. There are no pre-built chart templates — you construct everything yourself, which means you can build anything. Most higher-level libraries use D3 internally.",
        },
        {
          prompt:
            "A marketing team with no coding experience needs a live dashboard connected to their Google Sheets data. The best starting point is…",
          options: [
            "D3.js",
            "Google Looker Studio (free, no-code, native Sheets connector)",
            "Observable",
          ],
          answer: 1,
          explanation:
            "Looker Studio is free, requires no code, and connects directly to Google Sheets — an ideal fit for a non-technical team that already lives in Google Workspace.",
        },
      ],
      explanation:
        "Choose tools by audience and constraints: no-code BI tools for business teams, React libraries for web apps, D3 for custom work, and Python libraries for data science notebooks.",
    },
    {
      slug: "data-storytelling",
      title: "Data Storytelling",
      blurb: "Facts don't speak for themselves — narrative structure turns charts into decisions.",
      xp: 23,
      kind: "quiz",
      content: `# Data Storytelling

A dashboard full of accurate charts does not automatically produce decisions. People
need a story — a clear statement of what the data means and why it matters — to move
from looking at numbers to acting on them.

## The three-part structure

Effective data stories share a common structure:

1. **Setup** — context that makes the audience care. What is the situation? What
   decision is being made? Example: *"We've been losing customers at checkout for
   six months."*
2. **Conflict** — the insight the data reveals. What's surprising, wrong, or
   different from expectations? Example: *"Abandonment triples on mobile between
   the address and payment screens."*
3. **Resolution** — the recommended action and its expected outcome. Example:
   *"Simplifying the address form reduces mobile friction and is projected to
   recover $2M in annual revenue."*

## Highlighting vs overwhelming

A story has a protagonist. In data storytelling, that protagonist is the key
insight. Everything else — reference lines, secondary series, footnotes — supports
it without competing with it.

Techniques for directing attention:
- **Gray out** non-focal series so the key one stands out.
- **Annotate the moment** that matters: draw an arrow, add a text box, highlight a
  data point.
- Use a **title that states the finding**, not just the topic. Compare:
  - Topic title: "Monthly Revenue by Region"
  - Finding title: "West Region Revenue Fell 23% After March Promotion Ended"

## Know your audience

An executive needs the bottom line first, then supporting evidence on request. An
analyst needs enough detail to verify the methodology. The same data, different
sequencing.`,
      questions: [
        {
          prompt:
            "Which chart title better follows the 'finding title' principle?",
          options: [
            "'Sales by Quarter'",
            "'Q3 Sales Declined 18% — First Drop in Four Years'",
            "'Data as of 2026-Q3'",
          ],
          answer: 1,
          explanation:
            "A finding title tells the reader what to conclude before they even read the chart. A topic title makes them do the interpretive work themselves — slowing comprehension and risking a missed point.",
        },
        {
          prompt:
            "In the three-part data story structure, the 'conflict' element is…",
          options: [
            "A disagreement between analysts about methodology",
            "The surprising or actionable insight the data reveals — what's different from expectations",
            "A list of all the data sources used",
          ],
          answer: 1,
          explanation:
            "Conflict in storytelling is tension between what was expected and what is. In data, it's the insight that makes the audience say 'I didn't know that' — the reason the story needed to be told.",
        },
        {
          prompt:
            "You want one chart series to stand out as the key insight. The most effective technique is…",
          options: [
            "Use a different font size for that series' data points",
            "Gray out all other series and highlight only the focal one in a strong color",
            "Move the other series to a second chart on the next slide",
          ],
          answer: 1,
          explanation:
            "Graying secondary series preserves context (readers can still see them) while directing the eye immediately to the focal series. Removing other series entirely can strip necessary comparison; graying is the calibrated middle ground.",
        },
      ],
      explanation:
        "Data storytelling = Setup → Conflict → Resolution, with finding titles, highlighted protagonists, and content sequenced for your audience. Accurate charts without narrative rarely produce action.",
    },
    {
      slug: "data-visualization-capstone",
      title: "Data Visualization Capstone",
      blurb: "Bring it all together: chart selection, honesty, design, tools, and storytelling.",
      xp: 25,
      kind: "quiz",
      content: `# Data Visualization Capstone

You've covered the full arc of data visualization practice:

1. **Why visualization matters** — pattern detection, Anscombe's Quartet, two
   failure modes (obscuring and misleading).
2. **Choosing the right chart** — matching chart type to the question, and common
   chart-type mistakes.
3. **Design for clarity** — data-ink ratio, color channels, direct labels,
   whitespace.
4. **Avoiding misleading charts** — truncated axes, cherry-picked windows, radius
   vs area, correlation vs causation.
5. **The tools landscape** — no-code BI tools, JavaScript libraries, D3, Python
   data science stack.
6. **Data storytelling** — Setup/Conflict/Resolution, finding titles, directing
   attention.

This capstone tests whether you can apply all six areas together.

## What 'good' looks like in practice

A production-quality visualization:

- Uses the chart type that *directly answers the question* being asked.
- Encodes one main insight; supporting context is visually subordinate.
- Uses color to encode information, not decoration.
- Has a title that is a finding, not a topic.
- Does not truncate bar axes; uses clearly marked axis breaks on line charts when
  necessary.
- Has been tested against a color-blind simulator.
- Is paired with a sentence or headline that tells the viewer what to do next.

The best data visualizations are forgettable in the best way: the reader absorbs
the insight and acts on it without noticing how the chart was made. That invisibility
is the craft.`,
      questions: [
        {
          prompt:
            "A colleague's bar chart starts the y-axis at 50,000 instead of 0 to 'zoom in on the differences.' Your response should be…",
          options: [
            "Approve it — zooming in is always helpful",
            "Flag it: truncating a bar axis exaggerates differences and should be replaced by either a zero-based axis or a dot plot / slope chart that can honestly show a narrow range",
            "Suggest switching to a pie chart instead",
          ],
          answer: 1,
          explanation:
            "Bar length encodes magnitude from zero. Truncation breaks that encoding. If the narrow range genuinely matters, a dot plot or slope chart is the honest alternative — it doesn't imply a zero baseline.",
        },
        {
          prompt:
            "Your dashboard needs to show year-over-year revenue change for 12 product categories. Which chart type is most appropriate?",
          options: [
            "A pie chart with 12 slices",
            "A horizontal bar chart ranked from largest to smallest change, with a reference line at zero",
            "A 3D line chart",
          ],
          answer: 1,
          explanation:
            "12 categories exceed what a pie chart can show clearly. A horizontal bar chart lets long labels breathe, the zero reference line distinguishes growth from decline, and ranking reveals the story immediately.",
        },
        {
          prompt:
            "A stakeholder says your visualization 'looks too plain.' The best reply is…",
          options: [
            "Add gradients, drop shadows, and a decorative background image to every chart",
            "Explain that visual simplicity maximizes the data-ink ratio — decoration competes with the data and slows comprehension",
            "Switch to a 3D chart to add visual interest",
          ],
          answer: 1,
          explanation:
            "Plain means the data is the star. Decoration distracts the reader's limited attention from the insight. A simple, well-labeled chart is not unsophisticated — it's disciplined.",
        },
      ],
      explanation:
        "The complete data visualization workflow: pick the right chart, design for maximum signal, be scrupulously honest about scale and context, choose tools that match the audience, and wrap everything in a clear narrative. Simplicity is the craft.",
    },
  ],
};
