import type { Module } from "./types";

// Statistics with Python's stdlib — mean, median, mode, stdev, variance,
// correlation, and linear regression using only the built-in `statistics` module.
// Runs entirely in the browser via Pyodide (CPython → WASM, no pip required).
export const pythonStatistics: Module = {
  slug: "python-statistics",
  title: "Statistics with Python's stdlib",
  description:
    "Compute mean, median, mode, variance, standard deviation, correlation, and linear regression using only Python's built-in statistics module — no NumPy or SciPy required.",
  emoji: "📊",
  gradient: "from-violet-400/20 to-indigo-500/10",
  language: "py",
  tagline:
    "Learn descriptive statistics in pure Python: mean, median, mode, stdev, variance, correlation, and linear regression with the statistics module.",
  keywords: [
    "python statistics",
    "python mean median mode",
    "python standard deviation",
    "python statistics module",
    "descriptive statistics python",
    "python correlation",
    "learn statistics python",
  ],
  lessons: [
    {
      slug: "mean-and-median",
      title: "Mean and Median",
      blurb: "Find the center of a dataset two different ways.",
      xp: 25,
      content: `# Mean and Median

The **mean** (average) and **median** (middle value) are the two most common
measures of central tendency.

\`\`\`py
import statistics

scores = [70, 85, 90, 60, 95]
statistics.mean(scores)    # 80.0
statistics.median(scores)  # 85
\`\`\`

The mean sums all values and divides by the count.  The median sorts the data
and picks the middle element (or the average of the two middle elements when
the count is even).

The median is **resistant to outliers** — a single extreme value can drag the
mean far from the center while leaving the median nearly unchanged.

## Your task
Import \`statistics\` and write two functions:
- \`get_mean(data)\` — returns the mean of the list
- \`get_median(data)\` — returns the median of the list`,
      starterCode: `import statistics

def get_mean(data):
    # return the mean of data
    pass

def get_median(data):
    # return the median of data
    pass
`,
      solution: `import statistics

def get_mean(data):
    return statistics.mean(data)

def get_median(data):
    return statistics.median(data)`,
      tests: [
        {
          name: "mean of [1, 2, 3, 4, 5] is 3.0",
          code: `assert_equals(get_mean([1, 2, 3, 4, 5]), 3)`,
        },
        {
          name: "mean handles decimals",
          code: `assert_equals(get_mean([10, 20, 30]), 20)`,
        },
        {
          name: "median of odd-length list",
          code: `assert_equals(get_median([3, 1, 4, 1, 5]), 3)`,
        },
        {
          name: "median of even-length list is average of two middle values",
          code: `assert_equals(get_median([1, 2, 3, 4]), 2.5)`,
        },
      ],
      hints: [
        "Both functions are one-liners — call the matching statistics.* function and return the result.",
      ],
    },
    {
      slug: "mode",
      title: "Mode and Multimode",
      blurb: "Find the most frequently occurring value(s) in a dataset.",
      xp: 25,
      content: `# Mode and Multimode

The **mode** is the value that appears most often.  Python's \`statistics.mode()\`
returns a single value and raises \`StatisticsError\` when there is no unique mode
(all values tied for most common).

\`\`\`py
import statistics

statistics.mode([1, 1, 2, 3])         # 1
statistics.multimode([1, 1, 2, 2, 3]) # [1, 2]  — both tied
\`\`\`

\`statistics.multimode()\` always returns a **list** of all modes (never raises),
making it safer to call when ties are possible.

## Your task
Write two functions:
- \`single_mode(data)\` — returns the single mode using \`statistics.mode()\`
- \`all_modes(data)\` — returns a sorted list of all modes using \`statistics.multimode()\``,
      starterCode: `import statistics

def single_mode(data):
    # return the single mode value
    pass

def all_modes(data):
    # return a sorted list of all mode values
    pass
`,
      solution: `import statistics

def single_mode(data):
    return statistics.mode(data)

def all_modes(data):
    return sorted(statistics.multimode(data))`,
      tests: [
        {
          name: "single_mode finds the most common value",
          code: `assert_equals(single_mode([4, 1, 2, 4, 3, 4]), 4)`,
        },
        {
          name: "single_mode works on strings too",
          code: `assert_equals(single_mode(["a", "b", "a", "c"]), "a")`,
        },
        {
          name: "all_modes returns sorted list of tied values",
          code: `assert_equals(all_modes([1, 2, 1, 2, 3]), [1, 2])`,
        },
        {
          name: "all_modes with one winner still returns a list",
          code: `assert_equals(all_modes([5, 5, 5, 7]), [5])`,
        },
      ],
      hints: [
        "multimode() returns a list, but its order is insertion order. Wrap it in sorted() for a predictable result.",
      ],
    },
    {
      slug: "variance-and-stdev",
      title: "Variance and Standard Deviation",
      blurb: "Measure how spread out your data is.",
      xp: 30,
      content: `# Variance and Standard Deviation

**Variance** is the average squared distance from the mean.
**Standard deviation** is its square root — back in the original units.

\`\`\`py
import statistics

grades = [70, 75, 80, 85, 90]
statistics.variance(grades)  # 62.5   (sample variance)
statistics.stdev(grades)     # 7.905... (sample stdev)
\`\`\`

Both functions compute the **sample** statistic by default, dividing by
\`n - 1\` (Bessel's correction).  Use this when your data is a *sample* drawn
from a larger population.

A **small stdev** means values cluster tightly around the mean.
A **large stdev** means they are widely spread.

## Your task
Write:
- \`spread(data)\` — returns a dict with keys \`"variance"\` and \`"stdev"\`,
  both rounded to 2 decimal places.`,
      starterCode: `import statistics

def spread(data):
    # return {"variance": ..., "stdev": ...}, each rounded to 2 decimal places
    pass
`,
      solution: `import statistics

def spread(data):
    return {
        "variance": round(statistics.variance(data), 2),
        "stdev": round(statistics.stdev(data), 2),
    }`,
      tests: [
        {
          name: "variance and stdev keys exist",
          code: `result = spread([2, 4, 4, 4, 5, 5, 7, 9])\nassert "variance" in result\nassert "stdev" in result`,
        },
        {
          name: "variance of [2,4,4,4,5,5,7,9] is 4.57",
          code: `assert_equals(spread([2, 4, 4, 4, 5, 5, 7, 9])["variance"], 4.57)`,
        },
        {
          name: "stdev of [2,4,4,4,5,5,7,9] is 2.14",
          code: `assert_equals(spread([2, 4, 4, 4, 5, 5, 7, 9])["stdev"], 2.14)`,
        },
        {
          name: "uniform list has zero variance",
          code: `assert_equals(spread([5, 5, 5, 5])["variance"], 0)`,
        },
      ],
      hints: [
        "Build the dict with two keys. Use round(value, 2) on each result before storing it.",
      ],
    },
    {
      slug: "population-vs-sample",
      title: "Population vs Sample Statistics",
      blurb: "Know when to divide by n vs n-1.",
      xp: 30,
      content: `# Population vs Sample Statistics

Python provides two flavors of each spread measure:

| Function | Divides by | Use when |
|---|---|---|
| \`statistics.variance(data)\` | n − 1 | data is a **sample** |
| \`statistics.pvariance(data)\` | n | data is the **whole population** |
| \`statistics.stdev(data)\` | n − 1 | sample |
| \`statistics.pstdev(data)\` | n | population |

**Rule of thumb:** if you collected data from a subset of a group and want to
estimate the true spread for the whole group, use the sample version (n − 1).
If you *have* the entire population, use the population version (n).

\`\`\`py
import statistics

# exam scores for the WHOLE class (population)
class_scores = [78, 82, 91, 65, 88]
statistics.pstdev(class_scores)   # 8.87...

# 5 patients sampled from a hospital (sample)
samples = [78, 82, 91, 65, 88]
statistics.stdev(samples)         # 9.91...
\`\`\`

## Your task
Write \`describe(data, is_population)\`:
- When \`is_population\` is \`True\`, return \`{"stdev": pstdev, "variance": pvariance}\`
- When \`False\`, return \`{"stdev": stdev, "variance": variance}\`
All values rounded to 4 decimal places.`,
      starterCode: `import statistics

def describe(data, is_population):
    # return dict with "stdev" and "variance" keys
    # use population functions when is_population is True, sample functions otherwise
    pass
`,
      solution: `import statistics

def describe(data, is_population):
    if is_population:
        return {
            "stdev": round(statistics.pstdev(data), 4),
            "variance": round(statistics.pvariance(data), 4),
        }
    else:
        return {
            "stdev": round(statistics.stdev(data), 4),
            "variance": round(statistics.variance(data), 4),
        }`,
      tests: [
        {
          name: "population stdev of [2,4,4,4,5,5,7,9] is 2.0",
          code: `assert_equals(describe([2, 4, 4, 4, 5, 5, 7, 9], True)["stdev"], 2.0)`,
        },
        {
          name: "population variance of [2,4,4,4,5,5,7,9] is 4.0",
          code: `assert_equals(describe([2, 4, 4, 4, 5, 5, 7, 9], True)["variance"], 4.0)`,
        },
        {
          name: "sample stdev is larger than population stdev",
          code: `data = [2, 4, 4, 4, 5, 5, 7, 9]\nassert describe(data, False)["stdev"] > describe(data, True)["stdev"]`,
        },
        {
          name: "is_population=False uses n-1 correction",
          code: `assert_equals(describe([2, 4, 4, 4, 5, 5, 7, 9], False)["variance"], 4.5714)`,
        },
      ],
      hints: [
        "Use an if/else on is_population. The population functions are pstdev and pvariance; the sample functions are stdev and variance.",
      ],
    },
    {
      slug: "quantiles",
      title: "Quantiles and the IQR",
      blurb: "Divide your data into equal-frequency buckets.",
      xp: 35,
      content: `# Quantiles and the IQR

**Quantiles** divide sorted data into equal-frequency groups.
The most common are **quartiles** (4 groups): Q1, Q2, Q3.

\`\`\`py
import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
qs = statistics.quantiles(data, n=4)
# qs → [Q1, Q2, Q3]  e.g. [3.25, 5.5, 7.75]
\`\`\`

The **Interquartile Range (IQR)** = Q3 − Q1.  It describes the spread of the
middle 50 % of the data and is robust to outliers (used in box plots).

## Your task
Write \`iqr(data)\` that returns the interquartile range (Q3 − Q1) rounded to
4 decimal places, using \`statistics.quantiles(data, n=4)\`.`,
      starterCode: `import statistics

def iqr(data):
    # compute Q1 and Q3 via statistics.quantiles, return Q3 - Q1 rounded to 4 dp
    pass
`,
      solution: `import statistics

def iqr(data):
    qs = statistics.quantiles(data, n=4)
    return round(qs[2] - qs[0], 4)`,
      tests: [
        {
          name: "iqr of [1..10] is 5.0",
          code: `assert_equals(iqr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 5.0)`,
        },
        {
          name: "iqr of uniform list is 0",
          code: `assert_equals(iqr([7, 7, 7, 7, 7, 7, 7, 7]), 0.0)`,
        },
        {
          name: "iqr is positive when data varies",
          code: `assert iqr([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) > 0`,
        },
      ],
      hints: [
        "statistics.quantiles returns a list of n-1 cut points. With n=4 you get [Q1, Q2, Q3] at indices 0, 1, 2.",
        "IQR = qs[2] - qs[0]",
      ],
    },
    {
      slug: "correlation",
      title: "Correlation",
      blurb: "Measure how linearly related two variables are.",
      xp: 40,
      content: `# Correlation

**Pearson's correlation coefficient** (r) measures how strongly two variables
move together in a linear fashion.  It ranges from −1 to 1:

| r value | Meaning |
|---|---|
| 1.0 | Perfect positive linear relationship |
| 0.0 | No linear relationship |
| −1.0 | Perfect negative linear relationship |

\`\`\`py
import statistics

hours  = [1, 2, 3, 4, 5]
scores = [50, 60, 70, 80, 90]
statistics.correlation(hours, scores)  # 1.0  (perfect positive)
\`\`\`

Both lists must have the same length and at least two elements.

## Your task
Write \`pearson(x, y)\` that returns the Pearson correlation coefficient of
\`x\` and \`y\` rounded to 4 decimal places.`,
      starterCode: `import statistics

def pearson(x, y):
    # return Pearson r rounded to 4 decimal places
    pass
`,
      solution: `import statistics

def pearson(x, y):
    return round(statistics.correlation(x, y), 4)`,
      tests: [
        {
          name: "perfectly correlated lists give r = 1.0",
          code: `assert_equals(pearson([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]), 1.0)`,
        },
        {
          name: "perfectly inverse lists give r = -1.0",
          code: `assert_equals(pearson([1, 2, 3, 4, 5], [10, 8, 6, 4, 2]), -1.0)`,
        },
        {
          name: "result is between -1 and 1",
          code: `r = pearson([1, 3, 2, 5, 4], [2, 6, 3, 9, 7])\nassert -1.0 <= r <= 1.0`,
        },
        {
          name: "moderate positive correlation",
          code: `r = pearson([1, 2, 3, 4, 5], [1, 3, 2, 4, 5])\nassert r >= 0.9`,
        },
      ],
      hints: [
        "statistics.correlation(x, y) is available in Python 3.10 and later. Wrap it in round(result, 4).",
      ],
    },
    {
      slug: "linear-regression",
      title: "Linear Regression",
      blurb: "Fit a straight line through your data points.",
      xp: 45,
      content: `# Linear Regression

**Linear regression** fits the best straight line \`y = slope * x + intercept\`
through a set of (x, y) pairs.

\`\`\`py
import statistics

x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 4, 5]
result = statistics.linear_regression(x, y)
result.slope      # ~0.6
result.intercept  # ~2.2
\`\`\`

Once you have the slope and intercept you can **predict** y for any new x:

\`\`\`py
x_new = 6
y_hat = result.slope * x_new + result.intercept  # predicted y at x=6
\`\`\`

## Your task
Write \`fit_line(x, y)\` that returns a dict with keys \`"slope"\` and
\`"intercept"\`, both rounded to 4 decimal places.

Then write \`predict(x, y, x_new)\` that fits the line and returns the predicted
y value for \`x_new\`, rounded to 4 decimal places.`,
      starterCode: `import statistics

def fit_line(x, y):
    # return {"slope": ..., "intercept": ...} rounded to 4 dp
    pass

def predict(x, y, x_new):
    # fit the line and return the predicted y at x_new, rounded to 4 dp
    pass
`,
      solution: `import statistics

def fit_line(x, y):
    result = statistics.linear_regression(x, y)
    return {
        "slope": round(result.slope, 4),
        "intercept": round(result.intercept, 4),
    }

def predict(x, y, x_new):
    result = statistics.linear_regression(x, y)
    return round(result.slope * x_new + result.intercept, 4)`,
      tests: [
        {
          name: "slope and intercept keys present",
          code: `r = fit_line([1,2,3],[2,4,6])\nassert "slope" in r\nassert "intercept" in r`,
        },
        {
          name: "perfect line: slope=2, intercept=0",
          code: `r = fit_line([1, 2, 3, 4, 5], [2, 4, 6, 8, 10])\nassert_equals(r["slope"], 2.0)\nassert_equals(r["intercept"], 0.0)`,
        },
        {
          name: "predict on a perfect line",
          code: `assert_equals(predict([1, 2, 3, 4, 5], [2, 4, 6, 8, 10], 6), 12.0)`,
        },
        {
          name: "predict returns a number",
          code: `val = predict([1,2,3,4,5],[1,3,2,4,5], 7)\nassert isinstance(val, (int, float))`,
        },
      ],
      hints: [
        "statistics.linear_regression(x, y) returns an object with .slope and .intercept attributes.",
        "To predict: slope * x_new + intercept.",
      ],
    },
    {
      slug: "choosing-your-measure",
      title: "Choosing the Right Measure",
      blurb: "Know which statistic to reach for in each situation.",
      xp: 20,
      kind: "quiz",
      content: `# Choosing the Right Measure

Knowing *which* statistical function to call is as important as knowing how.
Here is a quick reference:

| Goal | Function |
|---|---|
| Typical value, no outliers | \`mean()\` |
| Typical value, outliers present | \`median()\` |
| Most frequent category | \`mode()\` or \`multimode()\` |
| Spread of a **sample** | \`stdev()\` / \`variance()\` |
| Spread of a **whole population** | \`pstdev()\` / \`pvariance()\` |
| Middle 50 % range | \`quantiles(n=4)\` → IQR |
| Linear association between two variables | \`correlation()\` |
| Best-fit line equation | \`linear_regression()\` |

Use this knowledge to answer the questions below.`,
      questions: [
        {
          prompt:
            "A dataset of employee salaries contains a few extreme executive salaries. Which measure of center is most appropriate?",
          options: ["Mean", "Median", "Mode"],
          answer: 1,
          explanation:
            "The median is resistant to outliers. A handful of very high salaries would inflate the mean far above what a typical employee earns.",
        },
        {
          prompt:
            "You surveyed 50 students out of a school of 800 about their study hours. Which spread function should you use?",
          options: [
            "statistics.pstdev() — population standard deviation",
            "statistics.stdev() — sample standard deviation",
            "statistics.variance() with n as denominator",
          ],
          answer: 1,
          explanation:
            "Because you sampled from a larger population, use the sample standard deviation (stdev), which divides by n − 1 to give an unbiased estimate.",
        },
        {
          prompt:
            "A teacher wants to know the most common grade letter her class received. Which function is most suitable?",
          options: [
            "statistics.mean()",
            "statistics.median()",
            "statistics.multimode()",
          ],
          answer: 2,
          explanation:
            "Grade letters are categorical, not numeric, so mean and median don't apply. multimode() counts frequencies and returns the most common values.",
        },
        {
          prompt:
            "You want to predict next month's revenue given a trend from the past 12 months. Which statistics module function is your best starting point?",
          options: [
            "statistics.correlation()",
            "statistics.linear_regression()",
            "statistics.quantiles()",
          ],
          answer: 1,
          explanation:
            "linear_regression() fits a line to your historical data and gives you a slope and intercept you can use to extrapolate to future months.",
        },
        {
          prompt:
            "You want to know how tightly a student's quiz scores cluster around their average. Which measure captures this?",
          options: [
            "Median",
            "Standard deviation",
            "Mode",
          ],
          answer: 1,
          explanation:
            "Standard deviation measures average distance from the mean. A small stdev means scores are tightly clustered; a large one means they are spread out.",
        },
      ],
    },
  ],
};
