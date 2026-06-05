import type { Module } from "./types";

// ML Model Evaluation — confusion matrix, accuracy, precision, recall, F1.
// Auto-graded in-browser via Web Worker (language: "js").
export const mlModelEvaluation: Module = {
  slug: "ml-model-evaluation",
  title: "Model Evaluation: Precision, Recall & F1",
  description:
    "Learn how to measure whether a classifier is actually good. Build a confusion matrix from scratch, then compute accuracy, precision, recall, and F1 — the four numbers every ML engineer must know.",
  emoji: "📊",
  gradient: "from-violet-400/20 to-indigo-500/10",
  tagline:
    "Master confusion matrices, precision, recall, F1 score, and accuracy — the essential metrics for evaluating any binary classifier.",
  language: "js",
  keywords: [
    "confusion matrix",
    "precision and recall",
    "f1 score",
    "model evaluation",
    "machine learning metrics",
    "binary classification",
    "accuracy precision recall f1",
    "ml evaluation metrics",
  ],
  lessons: [
    {
      slug: "why-accuracy-isnt-enough",
      title: "Why Accuracy Isn't Enough",
      kind: "quiz",
      blurb: "A 99% accurate spam filter can still be useless — here's why.",
      xp: 20,
      content: `# Why Accuracy Isn't Enough

Imagine you build a spam filter. Your test set has **990 real emails** and only
**10 spam emails**. A model that labels **every single email as "not spam"** gets
990 / 1000 = **99% accuracy**.

That model is completely useless — it never catches a single spam.

Accuracy hides this failure because the dataset is **imbalanced**. We need
metrics that separately measure:

- How often we cry wolf (**false alarms**)
- How often we miss the real threat (**missed catches**)

The foundation for all of these is the **confusion matrix** — a 2×2 table that
counts every kind of right and wrong your model can make.

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actually Positive** | True Positive (TP) | False Negative (FN) |
| **Actually Negative** | False Positive (FP) | True Negative (TN) |

- **TP** — correctly predicted positive ("yes and I said yes")
- **TN** — correctly predicted negative ("no and I said no")
- **FP** — false alarm ("no but I said yes") — Type I error
- **FN** — missed it ("yes but I said no") — Type II error`,
      questions: [
        {
          prompt:
            "A model predicts 'not spam' for every single email in a test set of 990 real + 10 spam emails. What is its accuracy?",
          options: ["50%", "99%", "10%", "0%"],
          answer: 1,
          explanation:
            "990 correct out of 1000 = 99% accuracy — yet the model catches zero spam. This is why accuracy alone is misleading on imbalanced data.",
        },
        {
          prompt:
            "Your fraud-detection model flags a legitimate transaction as fraud. What kind of error is that?",
          options: [
            "True Positive (TP)",
            "False Negative (FN)",
            "False Positive (FP)",
            "True Negative (TN)",
          ],
          answer: 2,
          explanation:
            "The actual label is negative (not fraud) but the model predicted positive (fraud). Predicted positive when actually negative = False Positive.",
        },
        {
          prompt:
            "A cancer-screening test misses a patient who actually has cancer. What cell of the confusion matrix does this fall into?",
          options: [
            "True Positive",
            "False Negative",
            "False Positive",
            "True Negative",
          ],
          answer: 1,
          explanation:
            "The patient is actually positive (has cancer) but the model predicted negative (clear). Missed a real positive = False Negative.",
        },
        {
          prompt: "Which two cells of the confusion matrix represent correct predictions?",
          options: [
            "TP and FP",
            "FN and FP",
            "TP and TN",
            "FN and TN",
          ],
          answer: 2,
          explanation:
            "True Positives (correctly said yes) and True Negatives (correctly said no) are the two correct outcomes.",
        },
      ],
    },
    {
      slug: "build-confusion-matrix",
      title: "Build a Confusion Matrix",
      blurb:
        "Count TPs, FPs, FNs, and TNs from a list of predictions.",
      xp: 35,
      content: `# Build a Confusion Matrix

Given two parallel arrays — \`actual\` labels and \`predicted\` labels — count
every combination of (actual, predicted) where labels are **1** (positive) or
**0** (negative).

\`\`\`
actual:    [1, 1, 0, 0, 1, 0]
predicted: [1, 0, 0, 0, 1, 1]
           ↑     ↑     ↑  ↑
           TP    FN    TP  FP ... wait, let's trace each:

index 0: actual=1, predicted=1 → TP
index 1: actual=1, predicted=0 → FN
index 2: actual=0, predicted=0 → TN
index 3: actual=0, predicted=0 → TN
index 4: actual=1, predicted=1 → TP
index 5: actual=0, predicted=1 → FP
→ { tp:2, fp:1, fn:1, tn:2 }
\`\`\`

## Your task
Write \`buildConfusionMatrix(actual, predicted)\` that returns an object
\`{ tp, fp, fn, tn }\` with integer counts.

Rules:
- \`actual[i] === 1\` and \`predicted[i] === 1\` → **TP**
- \`actual[i] === 0\` and \`predicted[i] === 1\` → **FP**
- \`actual[i] === 1\` and \`predicted[i] === 0\` → **FN**
- \`actual[i] === 0\` and \`predicted[i] === 0\` → **TN**`,
      starterCode: `function buildConfusionMatrix(actual, predicted) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  // loop through each index and increment the right counter
}
`,
      solution: `function buildConfusionMatrix(actual, predicted) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === 1 && predicted[i] === 1) tp++;
    else if (actual[i] === 0 && predicted[i] === 1) fp++;
    else if (actual[i] === 1 && predicted[i] === 0) fn++;
    else tn++;
  }
  return { tp, fp, fn, tn };
}`,
      tests: [
        {
          name: "basic example from lesson { tp:2, fp:1, fn:1, tn:2 }",
          code: `const cm = buildConfusionMatrix([1,1,0,0,1,0],[1,0,0,0,1,1]);
assertEquals(cm.tp, 2);
assertEquals(cm.fp, 1);
assertEquals(cm.fn, 1);
assertEquals(cm.tn, 2);`,
        },
        {
          name: "perfect predictions { tp:3, fp:0, fn:0, tn:3 }",
          code: `const cm = buildConfusionMatrix([1,0,1,0,1,0],[1,0,1,0,1,0]);
assertEquals(cm.tp, 3);
assertEquals(cm.fp, 0);
assertEquals(cm.fn, 0);
assertEquals(cm.tn, 3);`,
        },
        {
          name: "all wrong { tp:0, fp:3, fn:3, tn:0 }",
          code: `const cm = buildConfusionMatrix([1,0,1,0,1,0],[0,1,0,1,0,1]);
assertEquals(cm.tp, 0);
assertEquals(cm.fp, 3);
assertEquals(cm.fn, 3);
assertEquals(cm.tn, 0);`,
        },
        {
          name: "empty arrays return all zeros",
          code: `const cm = buildConfusionMatrix([],[]);
assertEquals(cm.tp, 0);
assertEquals(cm.fp, 0);
assertEquals(cm.fn, 0);
assertEquals(cm.tn, 0);`,
        },
      ],
      hints: [
        "Loop over each index and compare actual[i] with predicted[i].",
        "Use if/else-if: check (actual===1 && predicted===1) first for TP, then (actual===0 && predicted===1) for FP, etc.",
      ],
      explanation:
        "Iterating once through both arrays and tallying each of the four cells is O(n) — no sorting or extra data structures needed. Return the four counters as a plain object.",
    },
    {
      slug: "accuracy",
      title: "Accuracy: What Fraction Did We Get Right?",
      blurb: "The simplest metric — right answers divided by total predictions.",
      xp: 25,
      content: `# Accuracy

**Accuracy** is the fraction of all predictions that were correct:

$$\\text{accuracy} = \\frac{TP + TN}{TP + FP + FN + TN}$$

It's the most intuitive metric, but as the opening lesson showed, it can be
misleading when classes are imbalanced.

\`\`\`
cm = { tp:4, fp:1, fn:1, tn:4 }
accuracy = (4 + 4) / (4 + 1 + 1 + 4) = 8 / 10 = 0.8
\`\`\`

## Your task
Write \`accuracy(cm)\` that accepts a confusion-matrix object \`{ tp, fp, fn, tn }\`
and returns the accuracy as a **number between 0 and 1**.

If all counts are 0 (empty dataset), return **0**.`,
      starterCode: `function accuracy(cm) {
  const { tp, fp, fn, tn } = cm;
  // (correct predictions) / (total predictions)
}
`,
      solution: `function accuracy(cm) {
  const { tp, fp, fn, tn } = cm;
  const total = tp + fp + fn + tn;
  if (total === 0) return 0;
  return (tp + tn) / total;
}`,
      tests: [
        {
          name: "accuracy({ tp:4, fp:1, fn:1, tn:4 }) === 0.8",
          code: `assertEquals(accuracy({ tp:4, fp:1, fn:1, tn:4 }), 0.8);`,
        },
        {
          name: "perfect accuracy === 1",
          code: `assertEquals(accuracy({ tp:3, fp:0, fn:0, tn:3 }), 1);`,
        },
        {
          name: "zero accuracy === 0",
          code: `assertEquals(accuracy({ tp:0, fp:3, fn:3, tn:0 }), 0);`,
        },
        {
          name: "empty confusion matrix returns 0, not NaN",
          code: `assertEquals(accuracy({ tp:0, fp:0, fn:0, tn:0 }), 0);`,
        },
      ],
      hints: [
        "Total = tp + fp + fn + tn. Correct = tp + tn.",
        "Guard against division by zero: if total === 0, return 0.",
      ],
      explanation:
        "Correct predictions are the ones on the main diagonal of the confusion matrix (TP + TN). Dividing by total gives the fraction correct. The zero-guard prevents NaN when the dataset is empty.",
    },
    {
      slug: "precision",
      title: "Precision: When You Say Yes, Are You Right?",
      blurb:
        "Of all the positives you predicted, how many were actually positive?",
      xp: 35,
      content: `# Precision

**Precision** asks: *of everything I labeled as positive, what fraction really was?*

$$\\text{precision} = \\frac{TP}{TP + FP}$$

Think of a spam filter: precision is the fraction of emails you flagged as spam
that **actually were** spam. Low precision = lots of false alarms (good emails
sent to spam).

\`\`\`
cm = { tp:3, fp:1, fn:2, tn:4 }
precision = 3 / (3 + 1) = 3 / 4 = 0.75
\`\`\`

Precision matters most when the **cost of a false positive is high**
(e.g., flagging a legitimate transaction as fraud annoys the customer).

## Your task
Write \`precision(cm)\` that returns \`tp / (tp + fp)\`.
If \`tp + fp === 0\` (the model never predicted positive), return **0**.`,
      starterCode: `function precision(cm) {
  const { tp, fp } = cm;
  // tp / (tp + fp)
}
`,
      solution: `function precision(cm) {
  const { tp, fp } = cm;
  const denominator = tp + fp;
  if (denominator === 0) return 0;
  return tp / denominator;
}`,
      tests: [
        {
          name: "precision({ tp:3, fp:1, fn:2, tn:4 }) === 0.75",
          code: `assertEquals(precision({ tp:3, fp:1, fn:2, tn:4 }), 0.75);`,
        },
        {
          name: "perfect precision === 1",
          code: `assertEquals(precision({ tp:5, fp:0, fn:1, tn:4 }), 1);`,
        },
        {
          name: "all predictions are FP, precision === 0",
          code: `assertEquals(precision({ tp:0, fp:3, fn:2, tn:5 }), 0);`,
        },
        {
          name: "never predicted positive (tp+fp===0) returns 0, not NaN",
          code: `assertEquals(precision({ tp:0, fp:0, fn:3, tn:5 }), 0);`,
        },
      ],
      hints: [
        "The denominator is (tp + fp) — everything you predicted as positive.",
        "If you never predicted positive, the denominator is 0. Return 0 to avoid NaN.",
      ],
      explanation:
        "Precision only looks at what the model claimed was positive. It ignores false negatives entirely — that's what recall is for.",
    },
    {
      slug: "recall",
      title: "Recall: Did You Find All the Positives?",
      blurb:
        "Of all the actual positives, how many did you catch?",
      xp: 35,
      content: `# Recall (Sensitivity)

**Recall** asks: *of all the things that actually were positive, how many did I find?*

$$\\text{recall} = \\frac{TP}{TP + FN}$$

Think of a medical test: recall is the fraction of sick patients you correctly
identified. Low recall = you're missing sick people (dangerous!).

\`\`\`
cm = { tp:3, fp:1, fn:1, tn:4 }
recall = 3 / (3 + 1) = 3 / 4 = 0.75
\`\`\`

Recall matters most when the **cost of a false negative is high**
(e.g., missing a cancer diagnosis, missing a fraudulent transaction).

> Recall is also called **sensitivity** or **true positive rate (TPR)**.

## Your task
Write \`recall(cm)\` that returns \`tp / (tp + fn)\`.
If \`tp + fn === 0\` (no actual positives exist), return **0**.`,
      starterCode: `function recall(cm) {
  const { tp, fn } = cm;
  // tp / (tp + fn)
}
`,
      solution: `function recall(cm) {
  const { tp, fn } = cm;
  const denominator = tp + fn;
  if (denominator === 0) return 0;
  return tp / denominator;
}`,
      tests: [
        {
          name: "recall({ tp:3, fp:1, fn:1, tn:4 }) === 0.75",
          code: `assertEquals(recall({ tp:3, fp:1, fn:1, tn:4 }), 0.75);`,
        },
        {
          name: "perfect recall === 1",
          code: `assertEquals(recall({ tp:4, fp:2, fn:0, tn:3 }), 1);`,
        },
        {
          name: "zero recall === 0",
          code: `assertEquals(recall({ tp:0, fp:1, fn:4, tn:5 }), 0);`,
        },
        {
          name: "no actual positives (tp+fn===0) returns 0, not NaN",
          code: `assertEquals(recall({ tp:0, fp:2, fn:0, tn:4 }), 0);`,
        },
      ],
      hints: [
        "The denominator is (tp + fn) — everything that was actually positive.",
        "False negatives are the positives the model missed. They live in the denominator.",
      ],
      explanation:
        "Recall captures the model's 'coverage' of real positives. A model that always predicts positive has perfect recall (1.0) but likely terrible precision — hence why we need both.",
    },
    {
      slug: "f1-score",
      title: "F1 Score: Balancing Precision and Recall",
      blurb: "The harmonic mean of precision and recall — one number to rule them both.",
      xp: 40,
      content: `# F1 Score

Precision and recall trade off against each other. A model that flags everything
as positive gets recall = 1 but terrible precision. We want **both** to be high.

The **F1 score** is the **harmonic mean** of precision and recall:

$$F_1 = 2 \\cdot \\frac{\\text{precision} \\cdot \\text{recall}}{\\text{precision} + \\text{recall}}$$

It simplifies directly from the confusion matrix:

$$F_1 = \\frac{2 \\cdot TP}{2 \\cdot TP + FP + FN}$$

\`\`\`
cm = { tp:3, fp:1, fn:1, tn:4 }
F1 = (2 * 3) / (2*3 + 1 + 1) = 6 / 8 = 0.75
\`\`\`

The harmonic mean punishes extreme imbalance between precision and recall harder
than the arithmetic mean would. If either is 0, F1 = 0.

## Your task
Write \`f1Score(cm)\` using the **direct formula**: \`2*tp / (2*tp + fp + fn)\`.
If the denominator is 0, return **0**.`,
      starterCode: `function f1Score(cm) {
  const { tp, fp, fn } = cm;
  // 2 * tp / (2 * tp + fp + fn)
}
`,
      solution: `function f1Score(cm) {
  const { tp, fp, fn } = cm;
  const denominator = 2 * tp + fp + fn;
  if (denominator === 0) return 0;
  return (2 * tp) / denominator;
}`,
      tests: [
        {
          name: "f1Score({ tp:3, fp:1, fn:1, tn:4 }) === 0.75",
          code: `assertEquals(f1Score({ tp:3, fp:1, fn:1, tn:4 }), 0.75);`,
        },
        {
          name: "perfect F1 === 1 when no FP or FN",
          code: `assertEquals(f1Score({ tp:5, fp:0, fn:0, tn:5 }), 1);`,
        },
        {
          name: "f1Score({ tp:2, fp:2, fn:0, tn:4 }) — precision=0.5, recall=1 → 2/3",
          code: `const result = f1Score({ tp:2, fp:2, fn:0, tn:4 });
assertEquals(Math.round(result * 10000) / 10000, 0.6667);`,
        },
        {
          name: "all FP and FN, tp=0 → F1 === 0",
          code: `assertEquals(f1Score({ tp:0, fp:1, fn:1, tn:4 }), 0);`,
        },
        {
          name: "denominator 0 returns 0 not NaN",
          code: `assertEquals(f1Score({ tp:0, fp:0, fn:0, tn:5 }), 0);`,
        },
      ],
      hints: [
        "Use the direct formula — no need to call precision() and recall() separately.",
        "Denominator = 2*tp + fp + fn. If that's 0, return 0.",
      ],
      explanation:
        "The direct formula avoids the precision/recall zero-division edge case naturally. The harmonic mean penalises lopsided scores heavily: precision=1, recall=0.1 gives F1≈0.18, not 0.55.",
    },
    {
      slug: "evaluate-classifier",
      title: "Putting It All Together",
      blurb: "One function to compute all four metrics from raw predictions.",
      xp: 50,
      content: `# Putting It All Together

In practice, you call one function, hand it your labels, and get back a
**metrics report**. Let's build that.

\`\`\`
actual:    [1, 0, 1, 0, 1, 0, 1, 0]
predicted: [1, 0, 1, 0, 0, 1, 0, 0]

confusion matrix:
  TP=2, FP=1, FN=2, TN=3

accuracy  = (2+3)/8  = 0.625
precision = 2/(2+1)  ≈ 0.6667
recall    = 2/(2+2)  = 0.5
F1        = 4/(4+1+2)≈ 0.5714
\`\`\`

## Your task
Write \`evaluateClassifier(actual, predicted)\` that:
1. Calls \`buildConfusionMatrix\` to get the counts.
2. Computes accuracy, precision, recall, and f1 using the formulas you've built.
3. Returns \`{ accuracy, precision, recall, f1 }\` with each value **rounded to
   4 decimal places** (\`Math.round(x * 10000) / 10000\`).

All four helper functions (\`buildConfusionMatrix\`, \`accuracy\`, \`precision\`,
\`recall\`, \`f1Score\`) are available in scope — you can call them directly.`,
      starterCode: `function buildConfusionMatrix(actual, predicted) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === 1 && predicted[i] === 1) tp++;
    else if (actual[i] === 0 && predicted[i] === 1) fp++;
    else if (actual[i] === 1 && predicted[i] === 0) fn++;
    else tn++;
  }
  return { tp, fp, fn, tn };
}

function accuracy(cm) {
  const { tp, fp, fn, tn } = cm;
  const total = tp + fp + fn + tn;
  if (total === 0) return 0;
  return (tp + tn) / total;
}

function precision(cm) {
  const { tp, fp } = cm;
  const d = tp + fp;
  if (d === 0) return 0;
  return tp / d;
}

function recall(cm) {
  const { tp, fn } = cm;
  const d = tp + fn;
  if (d === 0) return 0;
  return tp / d;
}

function f1Score(cm) {
  const { tp, fp, fn } = cm;
  const d = 2 * tp + fp + fn;
  if (d === 0) return 0;
  return (2 * tp) / d;
}

function evaluateClassifier(actual, predicted) {
  // 1. build the confusion matrix
  // 2. compute the four metrics
  // 3. round each to 4 decimal places and return them
}
`,
      solution: `function buildConfusionMatrix(actual, predicted) {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === 1 && predicted[i] === 1) tp++;
    else if (actual[i] === 0 && predicted[i] === 1) fp++;
    else if (actual[i] === 1 && predicted[i] === 0) fn++;
    else tn++;
  }
  return { tp, fp, fn, tn };
}

function accuracy(cm) {
  const { tp, fp, fn, tn } = cm;
  const total = tp + fp + fn + tn;
  if (total === 0) return 0;
  return (tp + tn) / total;
}

function precision(cm) {
  const { tp, fp } = cm;
  const d = tp + fp;
  if (d === 0) return 0;
  return tp / d;
}

function recall(cm) {
  const { tp, fn } = cm;
  const d = tp + fn;
  if (d === 0) return 0;
  return tp / d;
}

function f1Score(cm) {
  const { tp, fp, fn } = cm;
  const d = 2 * tp + fp + fn;
  if (d === 0) return 0;
  return (2 * tp) / d;
}

function evaluateClassifier(actual, predicted) {
  const round4 = (x) => Math.round(x * 10000) / 10000;
  const cm = buildConfusionMatrix(actual, predicted);
  return {
    accuracy:  round4(accuracy(cm)),
    precision: round4(precision(cm)),
    recall:    round4(recall(cm)),
    f1:        round4(f1Score(cm)),
  };
}`,
      tests: [
        {
          name: "worked example: accuracy=0.625, precision=0.6667, recall=0.5, f1=0.5714",
          code: `const r = evaluateClassifier(
  [1,0,1,0,1,0,1,0],
  [1,0,1,0,0,1,0,0]
);
assertEquals(r.accuracy,  0.625);
assertEquals(r.precision, 0.6667);
assertEquals(r.recall,    0.5);
assertEquals(r.f1,        0.5714);`,
        },
        {
          name: "perfect classifier: all metrics === 1",
          code: `const r = evaluateClassifier([1,0,1,0],[1,0,1,0]);
assertEquals(r.accuracy,  1);
assertEquals(r.precision, 1);
assertEquals(r.recall,    1);
assertEquals(r.f1,        1);`,
        },
        {
          name: "all-negative model on balanced data: accuracy=0.5, precision=0, recall=0, f1=0",
          code: `const r = evaluateClassifier([1,0,1,0],[0,0,0,0]);
assertEquals(r.accuracy,  0.5);
assertEquals(r.precision, 0);
assertEquals(r.recall,    0);
assertEquals(r.f1,        0);`,
        },
      ],
      hints: [
        "Call buildConfusionMatrix(actual, predicted) first to get the cm object.",
        "Define a round4 helper: x => Math.round(x * 10000) / 10000, then apply it to each metric.",
      ],
      explanation:
        "Composing the helper functions keeps evaluateClassifier clean — it only orchestrates. Rounding to 4 decimal places avoids floating-point noise when comparing results.",
    },
  ],
};
