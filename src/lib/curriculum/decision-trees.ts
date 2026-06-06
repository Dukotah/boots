import type { Module } from "./types";

// Decision Trees: Information Gain & Splitting from Scratch
// Implements ID3 algorithm entirely in vanilla JS — no imports, fully in-browser.
export const decisionTrees: Module = {
  slug: "decision-trees",
  title: "Decision Trees from Scratch",
  description:
    "Build a working ID3 decision tree in plain JavaScript — entropy, information gain, recursive splitting, and prediction. No libraries, just math and code.",
  emoji: "🌳",
  gradient: "from-green-400/20 to-emerald-500/10",
  tagline:
    "Learn decision trees: entropy, information gain, ID3 splitting, and tree traversal — coded from scratch in vanilla JS.",
  keywords: [
    "decision tree",
    "ID3 algorithm",
    "information gain",
    "entropy machine learning",
    "classification algorithm",
    "learn machine learning javascript",
  ],
  language: "js",
  lessons: [
    {
      slug: "entropy",
      title: "Entropy — Measuring Impurity",
      blurb: "Quantify how mixed a set of labels is with Shannon entropy.",
      xp: 30,
      content: `# Entropy — Measuring Impurity

A decision tree learns by asking questions that reduce **uncertainty**.
To measure uncertainty, we use **Shannon entropy**:

$$H(S) = -\\sum_{c} p_c \\log_2(p_c)$$

Where $p_c$ is the proportion of class $c$ in set $S$.

| Labels | Entropy |
|--------|---------|
| all same | **0** (perfectly pure) |
| 50/50 split | **1.0** (maximally impure) |
| mixed | somewhere in between |

### How to compute it

1. Count how many times each unique label appears.
2. Divide each count by the total to get proportions.
3. For each proportion $p$, add $-p \\times \\log_2(p)$.

\`\`\`js
// example: ['yes','yes','no'] has p_yes=2/3, p_no=1/3
// H = -(2/3)*log2(2/3) - (1/3)*log2(1/3) ≈ 0.918
\`\`\`

## Your task
Write \`entropy(labels)\` that accepts an array of class labels (strings or numbers)
and returns the Shannon entropy as a number.  Return **0** for an empty array.`,
      starterCode: `function entropy(labels) {
  // TODO: compute Shannon entropy of the label array
  // 1. count each unique label
  // 2. compute proportions
  // 3. return -sum(p * log2(p))
}
`,
      solution: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) {
    const p = c / n;
    h -= p * Math.log2(p);
  }
  return h;
}`,
      tests: [
        {
          name: "empty array returns 0",
          code: `assertEquals(entropy([]), 0);`,
        },
        {
          name: "all-same labels have entropy 0",
          code: `assertEquals(entropy(["yes","yes","yes"]), 0);`,
        },
        {
          name: "50/50 split has entropy 1",
          code: `assertEquals(entropy(["yes","no","yes","no"]), 1);`,
        },
        {
          name: "entropy of ['yes','yes','no'] ≈ 0.918",
          code: `const h = entropy(["yes","yes","no"]);
assertEquals(Math.round(h * 1000) / 1000, 0.918);`,
        },
        {
          name: "three classes returns positive entropy",
          code: `const h = entropy(["a","b","c"]);
assert(h > 1.5 && h <= Math.log2(3) + 0.001);`,
        },
      ],
      hints: [
        "Use a plain object as a frequency map: `counts[l] = (counts[l] || 0) + 1`.",
        "After counting, loop over `Object.values(counts)` to get the raw counts, divide by `labels.length` for proportion `p`.",
        "`Math.log2(p)` gives the base-2 log. Subtract `p * Math.log2(p)` from the running total.",
      ],
      explanation: `Entropy measures **disorder**. Pure sets (one class) have entropy 0; maximally mixed sets reach log₂(k) where k is the number of classes.
The key insight: when we split a dataset, we want each branch to be *purer* (lower entropy) than the parent.`,
    },
    {
      slug: "information-gain",
      title: "Information Gain — Value of a Split",
      blurb: "Measure how much entropy a feature split removes.",
      xp: 35,
      content: `# Information Gain — Value of a Split

Once we can measure entropy, we can measure how much a split *helps*.
**Information Gain** is the entropy of the parent minus the weighted entropy of the children:

$$\\text{IG}(S, \\text{split}) = H(S) - \\sum_{\\text{branch}} \\frac{|S_i|}{|S|} H(S_i)$$

A gain of **0** means the split told us nothing. A gain close to **1** means near-perfect separation.

\`\`\`js
// parent: ['yes','no','yes','no']  → H = 1.0
// split into ['yes','yes'] and ['no','no']  → H = 0 for both branches
// IG = 1.0 - (2/4)*0 - (2/4)*0 = 1.0  (perfect split!)
\`\`\`

## Your task
Write \`informationGain(parentLabels, subsets)\` where:
- \`parentLabels\` is the full array of class labels before splitting.
- \`subsets\` is an array of arrays — each inner array is the labels for one branch.

Return the information gain as a number.

You may call your \`entropy\` function from the previous lesson — it is already in scope.`,
      starterCode: `function informationGain(parentLabels, subsets) {
  // TODO: return H(parent) - weighted_avg(H(children))
}
`,
      solution: `function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let weightedH = 0;
  for (const subset of subsets) {
    weightedH += (subset.length / n) * entropy(subset);
  }
  return parentH - weightedH;
}`,
      tests: [
        {
          name: "perfect split yields IG = 1",
          code: `// entropy helper must be present
function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
assertEquals(informationGain(["yes","no","yes","no"], [["yes","yes"],["no","no"]]), 1);`,
        },
        {
          name: "useless split yields IG = 0",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
assertEquals(informationGain(["yes","no","yes","no"], [["yes","no"],["yes","no"]]), 0);`,
        },
        {
          name: "empty subsets handled gracefully",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
const ig = informationGain(["a","b","c"], [["a","b","c"],[]]);
assert(ig >= 0);`,
        },
      ],
      hints: [
        "Start with `const parentH = entropy(parentLabels);`.",
        "Loop over each subset: `(subset.length / parentLabels.length) * entropy(subset)` gives its weighted contribution.",
        "Subtract the total weighted entropy from `parentH`.",
      ],
      explanation: `Information Gain answers: "After we split on this feature, how much less uncertain are we?"
The ID3 algorithm greedily picks the feature with the **highest** information gain at every node.`,
    },
    {
      slug: "best-split",
      title: "Finding the Best Split",
      blurb: "Pick the feature that gives the highest information gain.",
      xp: 40,
      content: `# Finding the Best Split

Given a dataset (array of rows) and a set of candidate features, the ID3 algorithm
picks the feature that maximizes information gain.

Each row looks like: \`[feature0, feature1, ..., featureN, label]\`

To evaluate feature at column index \`fi\`:
1. Group rows by their value in column \`fi\`.
2. Collect the labels for each group → these are your subsets.
3. Compute \`informationGain(allLabels, subsets)\`.

The feature with the **highest** gain wins.

\`\`\`js
const rows = [
  [0, 0, "no"],
  [0, 1, "no"],
  [1, 0, "yes"],
  [1, 1, "yes"],
];
// feature 0 perfectly separates yes/no → IG = 1.0
// feature 1 doesn't help at all    → IG = 0.0
// bestSplitFeature(rows, [0, 1], 2) === 0
\`\`\`

## Your task
Write \`bestSplitFeature(rows, featureIndices, labelIndex)\` that returns the
**column index** of the feature with the highest information gain.`,
      starterCode: `function bestSplitFeature(rows, featureIndices, labelIndex) {
  // TODO: for each feature index, compute IG, return the index with max IG
}
`,
      solution: `function bestSplitFeature(rows, featureIndices, labelIndex) {
  const allLabels = rows.map(r => r[labelIndex]);
  let bestFi = featureIndices[0];
  let bestGain = -Infinity;
  for (const fi of featureIndices) {
    const groups = {};
    for (const row of rows) {
      const val = row[fi];
      if (!groups[val]) groups[val] = [];
      groups[val].push(row[labelIndex]);
    }
    const subsets = Object.values(groups);
    const gain = informationGain(allLabels, subsets);
    if (gain > bestGain) {
      bestGain = gain;
      bestFi = fi;
    }
  }
  return bestFi;
}`,
      tests: [
        {
          name: "picks the perfectly-separating feature",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n) * entropy(s);
  return parentH - wH;
}
const rows = [[0,0,"no"],[0,1,"no"],[1,0,"yes"],[1,1,"yes"]];
assertEquals(bestSplitFeature(rows, [0, 1], 2), 0);`,
        },
        {
          name: "works when second feature is better",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n) * entropy(s);
  return parentH - wH;
}
// feature 0 is noise, feature 1 is perfect
const rows = [[0,0,"no"],[1,0,"no"],[0,1,"yes"],[1,1,"yes"]];
assertEquals(bestSplitFeature(rows, [0, 1], 2), 1);`,
        },
      ],
      hints: [
        "Group rows by `row[fi]` using a plain object as a map.",
        "Collect only the label (`row[labelIndex]`) for each group.",
        "Track the running `bestGain` and `bestFi` — update when gain exceeds best so far.",
      ],
      explanation: `This greedy feature selection is the heart of ID3.
At each node we ask: "Which question reduces uncertainty the most?"
The answer becomes the split criterion for that node.`,
    },
    {
      slug: "build-tree",
      title: "Building the Tree Recursively",
      blurb: "Recursively split data into a full decision-tree structure.",
      xp: 50,
      content: `# Building the Tree Recursively

The ID3 algorithm builds a tree top-down:

1. **Base cases** — stop and create a **leaf** when:
   - All remaining rows have the same label (pure node), OR
   - No features are left to split on.
2. **Recursive case** — find the best feature, partition rows by its values,
   then call \`buildTree\` on each partition.

### Node shapes
\`\`\`js
// Leaf node:
{ type: "leaf", label: "yes" }

// Decision node:
{
  type: "node",
  featureIndex: 0,
  branches: {
    "0": <subtree>,   // rows where feature[0] === "0"
    "1": <subtree>,   // rows where feature[0] === "1"
  }
}
\`\`\`

### Picking a leaf label
When a node is forced to become a leaf (no features left), use the **majority class**
among the remaining rows.

## Your task
Write \`buildTree(rows, featureIndices, labelIndex)\`.
All features are categorical (string/number values).

\`buildTree\` may call itself recursively.  You may also call \`bestSplitFeature\`
and the entropy/IG helpers — they are all in scope.`,
      starterCode: `function buildTree(rows, featureIndices, labelIndex) {
  // TODO: implement ID3 recursive tree building
  // Base case 1: all labels the same → leaf
  // Base case 2: no features left → leaf (majority vote)
  // Recursive: split on best feature, recurse on each branch
}
`,
      solution: `function buildTree(rows, featureIndices, labelIndex) {
  const labels = rows.map(r => r[labelIndex]);

  // majority-vote helper
  function majorityLabel(lbls) {
    const counts = {};
    for (const l of lbls) counts[l] = (counts[l] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  // base case: all same label
  const unique = [...new Set(labels)];
  if (unique.length === 1) return { type: "leaf", label: labels[0] };

  // base case: no features left
  if (featureIndices.length === 0) return { type: "leaf", label: majorityLabel(labels) };

  // recursive: find best feature and split
  const fi = bestSplitFeature(rows, featureIndices, labelIndex);
  const groups = {};
  for (const row of rows) {
    const val = String(row[fi]);
    if (!groups[val]) groups[val] = [];
    groups[val].push(row);
  }

  const remainingFeatures = featureIndices.filter(f => f !== fi);
  const branches = {};
  for (const [val, subset] of Object.entries(groups)) {
    branches[val] = buildTree(subset, remainingFeatures, labelIndex);
  }

  return { type: "node", featureIndex: fi, branches };
}`,
      tests: [
        {
          name: "pure dataset returns a leaf",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n) * entropy(s);
  return parentH - wH;
}
function bestSplitFeature(rows, featureIndices, labelIndex) {
  const allLabels = rows.map(r => r[labelIndex]);
  let bestFi = featureIndices[0]; let bestGain = -Infinity;
  for (const fi of featureIndices) {
    const groups = {};
    for (const row of rows) { const val = row[fi]; if (!groups[val]) groups[val] = []; groups[val].push(row[labelIndex]); }
    const gain = informationGain(allLabels, Object.values(groups));
    if (gain > bestGain) { bestGain = gain; bestFi = fi; }
  }
  return bestFi;
}
const rows = [["a","yes"],["b","yes"],["c","yes"]];
const tree = buildTree(rows, [0], 1);
assertEquals(tree.type, "leaf");
assertEquals(tree.label, "yes");`,
        },
        {
          name: "perfectly separable dataset — root is a node",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n) * entropy(s);
  return parentH - wH;
}
function bestSplitFeature(rows, featureIndices, labelIndex) {
  const allLabels = rows.map(r => r[labelIndex]);
  let bestFi = featureIndices[0]; let bestGain = -Infinity;
  for (const fi of featureIndices) {
    const groups = {};
    for (const row of rows) { const val = row[fi]; if (!groups[val]) groups[val] = []; groups[val].push(row[labelIndex]); }
    const gain = informationGain(allLabels, Object.values(groups));
    if (gain > bestGain) { bestGain = gain; bestFi = fi; }
  }
  return bestFi;
}
const rows = [["0","no"],["0","no"],["1","yes"],["1","yes"]];
const tree = buildTree(rows, [0], 1);
assertEquals(tree.type, "node");
assertEquals(tree.featureIndex, 0);`,
        },
        {
          name: "leaves of the perfect-split tree are correct labels",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n) * entropy(s);
  return parentH - wH;
}
function bestSplitFeature(rows, featureIndices, labelIndex) {
  const allLabels = rows.map(r => r[labelIndex]);
  let bestFi = featureIndices[0]; let bestGain = -Infinity;
  for (const fi of featureIndices) {
    const groups = {};
    for (const row of rows) { const val = row[fi]; if (!groups[val]) groups[val] = []; groups[val].push(row[labelIndex]); }
    const gain = informationGain(allLabels, Object.values(groups));
    if (gain > bestGain) { bestGain = gain; bestFi = fi; }
  }
  return bestFi;
}
const rows = [["0","no"],["0","no"],["1","yes"],["1","yes"]];
const tree = buildTree(rows, [0], 1);
assertEquals(tree.branches["0"].type, "leaf");
assertEquals(tree.branches["0"].label, "no");
assertEquals(tree.branches["1"].type, "leaf");
assertEquals(tree.branches["1"].label, "yes");`,
        },
      ],
      hints: [
        "Check `[...new Set(labels)].length === 1` first — that's the pure-node base case.",
        "Use `featureIndices.filter(f => f !== fi)` to remove the used feature before recursing.",
        "Convert feature values to strings (`String(row[fi])`) so they work as object keys consistently.",
      ],
      explanation: `The recursive structure mirrors the tree itself: each call builds one node,
and the branches are built by recursively calling the same function on smaller subsets.
This divide-and-conquer pattern is why decision trees are so intuitive.`,
    },
    {
      slug: "predict",
      title: "Predict — Walking the Tree",
      blurb: "Traverse a built tree to classify a new data point.",
      xp: 35,
      content: `# Predict — Walking the Tree

Once the tree is built, classifying a new sample is straightforward:

1. Start at the root.
2. If the current node is a **leaf**, return its label.
3. If it is a **decision node**, read the sample's value for \`featureIndex\`,
   follow the matching branch, and repeat.

\`\`\`js
const tree = {
  type: "node",
  featureIndex: 0,
  branches: {
    "sunny":  { type: "leaf", label: "no" },
    "cloudy": { type: "leaf", label: "yes" },
  }
};
predict(tree, ["sunny", "hot"]); // "no"
predict(tree, ["cloudy", "cool"]); // "yes"
\`\`\`

If the sample's feature value is not found in the branches (unseen value),
return **null**.

## Your task
Write \`predict(tree, sample)\` where \`sample\` is an array of feature values
(same column order used during training).`,
      starterCode: `function predict(tree, sample) {
  // TODO: traverse tree, return leaf label (or null if branch missing)
}
`,
      solution: `function predict(tree, sample) {
  if (tree.type === "leaf") return tree.label;
  const val = String(sample[tree.featureIndex]);
  const branch = tree.branches[val];
  if (!branch) return null;
  return predict(branch, sample);
}`,
      tests: [
        {
          name: "returns leaf label directly",
          code: `const leaf = { type: "leaf", label: "yes" };
assertEquals(predict(leaf, []), "yes");`,
        },
        {
          name: "follows single-level branch — sunny → no",
          code: `const tree = {
  type: "node",
  featureIndex: 0,
  branches: {
    "sunny":  { type: "leaf", label: "no" },
    "cloudy": { type: "leaf", label: "yes" },
  }
};
assertEquals(predict(tree, ["sunny", "hot"]), "no");`,
        },
        {
          name: "follows single-level branch — cloudy → yes",
          code: `const tree = {
  type: "node",
  featureIndex: 0,
  branches: {
    "sunny":  { type: "leaf", label: "no" },
    "cloudy": { type: "leaf", label: "yes" },
  }
};
assertEquals(predict(tree, ["cloudy", "cool"]), "yes");`,
        },
        {
          name: "unseen feature value returns null",
          code: `const tree = {
  type: "node",
  featureIndex: 0,
  branches: { "yes": { type: "leaf", label: "go" } }
};
assertEquals(predict(tree, ["no"]), null);`,
        },
        {
          name: "two-level tree traversal",
          code: `const tree = {
  type: "node", featureIndex: 0,
  branches: {
    "0": {
      type: "node", featureIndex: 1,
      branches: {
        "0": { type: "leaf", label: "low" },
        "1": { type: "leaf", label: "mid" },
      }
    },
    "1": { type: "leaf", label: "high" },
  }
};
assertEquals(predict(tree, ["0", "1"]), "mid");
assertEquals(predict(tree, ["1", "0"]), "high");`,
        },
      ],
      hints: [
        "Check `tree.type === 'leaf'` first and return `tree.label`.",
        "Convert the sample value to string: `String(sample[tree.featureIndex])`.",
        "If `tree.branches[val]` is undefined, return `null`.",
      ],
      explanation: `Prediction is just a recursive tree walk. The elegance of decision trees is that
both building and querying them map naturally to recursion.
In practice, you'd usually use an iterative loop for very deep trees to avoid stack overflows.`,
    },
    {
      slug: "gini-impurity",
      title: "Gini Impurity — An Alternative to Entropy",
      blurb: "Compute Gini impurity, the criterion used by CART and Random Forests.",
      xp: 30,
      content: `# Gini Impurity — An Alternative to Entropy

**Gini impurity** is another way to measure how mixed a node is:

$$G(S) = 1 - \\sum_{c} p_c^2$$

It ranges from **0** (pure) to **1 - 1/k** (maximally mixed, k classes).

| Labels | Gini |
|--------|------|
| all same | **0** |
| 50/50 | **0.5** |
| three equal classes | **0.667** |

Gini is used by **CART** (the algorithm behind scikit-learn's \`DecisionTreeClassifier\`)
and **Random Forests**, while ID3/C4.5 use entropy.  In practice the two give very
similar trees — Gini is slightly cheaper to compute (no logarithm).

\`\`\`js
// ['a','b'] → p_a=0.5, p_b=0.5
// G = 1 - (0.5² + 0.5²) = 1 - 0.5 = 0.5
\`\`\`

## Your task
Write \`giniImpurity(labels)\` that returns the Gini impurity of the label array.
Return **0** for an empty array.`,
      starterCode: `function giniImpurity(labels) {
  // TODO: return 1 - sum(p^2) for each class proportion p
}
`,
      solution: `function giniImpurity(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let sumSq = 0;
  for (const c of Object.values(counts)) {
    const p = c / n;
    sumSq += p * p;
  }
  return 1 - sumSq;
}`,
      tests: [
        {
          name: "empty array returns 0",
          code: `assertEquals(giniImpurity([]), 0);`,
        },
        {
          name: "all-same labels have Gini 0",
          code: `assertEquals(giniImpurity(["yes","yes","yes"]), 0);`,
        },
        {
          name: "50/50 split has Gini 0.5",
          code: `assertEquals(giniImpurity(["yes","no"]), 0.5);`,
        },
        {
          name: "4-element 50/50 also 0.5",
          code: `assertEquals(giniImpurity(["a","a","b","b"]), 0.5);`,
        },
        {
          name: "three equal classes ≈ 0.667",
          code: `const g = giniImpurity(["a","b","c"]);
assertEquals(Math.round(g * 1000) / 1000, 0.667);`,
        },
      ],
      hints: [
        "Count each label just like in `entropy`. Then compute `p = count / n`.",
        "Sum `p * p` for each class, then return `1 - sumSq`.",
      ],
      explanation: `Gini and entropy nearly always agree on which feature to split.
The main practical difference: **Gini prefers larger partitions**, while entropy can
favor balanced splits slightly more.  Both are valid — pick Gini when you want speed.`,
    },
    {
      slug: "end-to-end",
      title: "End-to-End: Train and Predict",
      blurb: "Put it all together — build a tree on real training data and classify new rows.",
      xp: 50,
      content: `# End-to-End: Train and Predict

Let's wire everything together on a classic toy dataset: the **Play Tennis** problem
from Mitchell's *Machine Learning* textbook.

Each row is \`[outlook, temperature, humidity, wind, playTennis]\` (column 4 is the label).

\`\`\`js
const data = [
  ["sunny",    "hot",  "high",   "weak",   "no"],
  ["sunny",    "hot",  "high",   "strong", "no"],
  ["overcast", "hot",  "high",   "weak",   "yes"],
  ["rain",     "mild", "high",   "weak",   "yes"],
  ["rain",     "cool", "normal", "weak",   "yes"],
  ["rain",     "cool", "normal", "strong", "no"],
  ["overcast", "cool", "normal", "strong", "yes"],
  ["sunny",    "mild", "high",   "weak",   "no"],
  ["sunny",    "cool", "normal", "weak",   "yes"],
  ["rain",     "mild", "normal", "weak",   "yes"],
  ["sunny",    "mild", "normal", "strong", "yes"],
  ["overcast", "mild", "high",   "strong", "yes"],
  ["overcast", "hot",  "normal", "weak",   "yes"],
  ["rain",     "mild", "high",   "strong", "no"],
];
\`\`\`

The label index is **4**.  Feature indices are **[0, 1, 2, 3]**.

## Your task
Write \`trainAndPredict(trainData, labelIndex, featureIndices, sample)\` that:
1. Builds a tree from \`trainData\`.
2. Returns \`predict(tree, sample)\`.

All helper functions (\`entropy\`, \`informationGain\`, \`bestSplitFeature\`, \`buildTree\`, \`predict\`) are in scope.`,
      starterCode: `function trainAndPredict(trainData, labelIndex, featureIndices, sample) {
  // TODO: build the tree, then return the prediction for sample
}
`,
      solution: `function trainAndPredict(trainData, labelIndex, featureIndices, sample) {
  const tree = buildTree(trainData, featureIndices, labelIndex);
  return predict(tree, sample);
}`,
      tests: [
        {
          name: "overcast → always yes in training data",
          code: `// Inline all helpers so the test is self-contained
function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n)*entropy(s);
  return parentH - wH;
}
function bestSplitFeature(rows, featureIndices, labelIndex) {
  const allLabels = rows.map(r => r[labelIndex]);
  let bestFi = featureIndices[0]; let bestGain = -Infinity;
  for (const fi of featureIndices) {
    const groups = {};
    for (const row of rows) { const val = row[fi]; if (!groups[val]) groups[val] = []; groups[val].push(row[labelIndex]); }
    const gain = informationGain(allLabels, Object.values(groups));
    if (gain > bestGain) { bestGain = gain; bestFi = fi; }
  }
  return bestFi;
}
function buildTree(rows, featureIndices, labelIndex) {
  const labels = rows.map(r => r[labelIndex]);
  function majorityLabel(lbls) {
    const counts = {};
    for (const l of lbls) counts[l] = (counts[l] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }
  const unique = [...new Set(labels)];
  if (unique.length === 1) return { type: "leaf", label: labels[0] };
  if (featureIndices.length === 0) return { type: "leaf", label: majorityLabel(labels) };
  const fi = bestSplitFeature(rows, featureIndices, labelIndex);
  const groups = {};
  for (const row of rows) { const val = String(row[fi]); if (!groups[val]) groups[val] = []; groups[val].push(row); }
  const remainingFeatures = featureIndices.filter(f => f !== fi);
  const branches = {};
  for (const [val, subset] of Object.entries(groups)) branches[val] = buildTree(subset, remainingFeatures, labelIndex);
  return { type: "node", featureIndex: fi, branches };
}
function predict(tree, sample) {
  if (tree.type === "leaf") return tree.label;
  const val = String(sample[tree.featureIndex]);
  const branch = tree.branches[val];
  if (!branch) return null;
  return predict(branch, sample);
}
const data = [
  ["sunny","hot","high","weak","no"],["sunny","hot","high","strong","no"],
  ["overcast","hot","high","weak","yes"],["rain","mild","high","weak","yes"],
  ["rain","cool","normal","weak","yes"],["rain","cool","normal","strong","no"],
  ["overcast","cool","normal","strong","yes"],["sunny","mild","high","weak","no"],
  ["sunny","cool","normal","weak","yes"],["rain","mild","normal","weak","yes"],
  ["sunny","mild","normal","strong","yes"],["overcast","mild","high","strong","yes"],
  ["overcast","hot","normal","weak","yes"],["rain","mild","high","strong","no"],
];
// overcast rows in training all have "yes"
assertEquals(trainAndPredict(data, 4, [0,1,2,3], ["overcast","mild","high","weak"]), "yes");`,
        },
        {
          name: "reproduces known training-set predictions",
          code: `function entropy(labels) {
  if (labels.length === 0) return 0;
  const counts = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  const n = labels.length;
  let h = 0;
  for (const c of Object.values(counts)) { const p = c/n; h -= p * Math.log2(p); }
  return h;
}
function informationGain(parentLabels, subsets) {
  const n = parentLabels.length;
  if (n === 0) return 0;
  const parentH = entropy(parentLabels);
  let wH = 0;
  for (const s of subsets) wH += (s.length/n)*entropy(s);
  return parentH - wH;
}
function bestSplitFeature(rows, featureIndices, labelIndex) {
  const allLabels = rows.map(r => r[labelIndex]);
  let bestFi = featureIndices[0]; let bestGain = -Infinity;
  for (const fi of featureIndices) {
    const groups = {};
    for (const row of rows) { const val = row[fi]; if (!groups[val]) groups[val] = []; groups[val].push(row[labelIndex]); }
    const gain = informationGain(allLabels, Object.values(groups));
    if (gain > bestGain) { bestGain = gain; bestFi = fi; }
  }
  return bestFi;
}
function buildTree(rows, featureIndices, labelIndex) {
  const labels = rows.map(r => r[labelIndex]);
  function majorityLabel(lbls) {
    const counts = {};
    for (const l of lbls) counts[l] = (counts[l] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }
  const unique = [...new Set(labels)];
  if (unique.length === 1) return { type: "leaf", label: labels[0] };
  if (featureIndices.length === 0) return { type: "leaf", label: majorityLabel(labels) };
  const fi = bestSplitFeature(rows, featureIndices, labelIndex);
  const groups = {};
  for (const row of rows) { const val = String(row[fi]); if (!groups[val]) groups[val] = []; groups[val].push(row); }
  const remainingFeatures = featureIndices.filter(f => f !== fi);
  const branches = {};
  for (const [val, subset] of Object.entries(groups)) branches[val] = buildTree(subset, remainingFeatures, labelIndex);
  return { type: "node", featureIndex: fi, branches };
}
function predict(tree, sample) {
  if (tree.type === "leaf") return tree.label;
  const val = String(sample[tree.featureIndex]);
  const branch = tree.branches[val];
  if (!branch) return null;
  return predict(branch, sample);
}
const data = [
  ["sunny","hot","high","weak","no"],["sunny","hot","high","strong","no"],
  ["overcast","hot","high","weak","yes"],["rain","mild","high","weak","yes"],
  ["rain","cool","normal","weak","yes"],["rain","cool","normal","strong","no"],
  ["overcast","cool","normal","strong","yes"],["sunny","mild","high","weak","no"],
  ["sunny","cool","normal","weak","yes"],["rain","mild","normal","weak","yes"],
  ["sunny","mild","normal","strong","yes"],["overcast","mild","high","strong","yes"],
  ["overcast","hot","normal","weak","yes"],["rain","mild","high","strong","no"],
];
// Row 0 is in training: ["sunny","hot","high","weak","no"]
const p0 = trainAndPredict(data, 4, [0,1,2,3], ["sunny","hot","high","weak"]);
assertEquals(p0, "no");`,
        },
      ],
      hints: [
        "`trainAndPredict` is really just two lines: `buildTree(...)` then `predict(...)`.",
        "Make sure you pass `featureIndices` and `labelIndex` in the right order to `buildTree`.",
      ],
      explanation: `With just ~50 lines of vanilla JavaScript you've implemented the full ID3 algorithm
that underpins production systems like Random Forests and Gradient Boosted Trees.
The real-world versions add: continuous feature splitting, pruning to avoid overfitting,
and bootstrapped sampling for ensembles — but the core entropy/gain loop is identical.`,
    },
    {
      slug: "concepts-quiz",
      title: "Concepts: Overfitting, Pruning & When to Use Trees",
      blurb: "Check your understanding of tree depth, overfitting, and practical trade-offs.",
      xp: 25,
      kind: "quiz",
      content: `# Concepts: Overfitting, Pruning & When to Use Trees

Before using decision trees on real projects, there are three critical ideas to understand.

## Overfitting
A fully-grown ID3 tree memorises the training data — every leaf is pure.  On *new* data
it often fails because it learned noise, not signal.

## Pruning
**Pre-pruning** (early stopping): limit max depth, require a minimum number of samples
per split, or stop when information gain is below a threshold.

**Post-pruning**: grow the full tree, then collapse branches that don't improve
validation performance.

Scikit-learn's \`DecisionTreeClassifier\` offers \`max_depth\`, \`min_samples_split\`,
and \`min_impurity_decrease\` to control this.

## When trees shine
- Features are **categorical** or **mixed** (not purely numeric).
- You need a **human-readable** model ("if outlook is sunny AND humidity is high → no").
- Feature interactions matter (trees handle them natively).
- As a base learner inside **Random Forests** or **XGBoost**.

## When to prefer other models
- Linear relationships → logistic/linear regression.
- Very high-dimensional sparse data (text) → linear SVMs or transformers.
- When you need calibrated probabilities → logistic regression with isotonic calibration.`,
      questions: [
        {
          prompt:
            "A fully-grown ID3 tree on 500 training samples achieves 100% training accuracy but 62% test accuracy. The most likely cause is:",
          options: [
            "The entropy formula was implemented incorrectly.",
            "The tree is overfitting — it memorised training noise.",
            "The dataset is too small to train any model.",
            "Information gain always produces the wrong split.",
          ],
          answer: 1,
          explanation:
            "A perfect training accuracy with low test accuracy is the classic sign of overfitting. The tree grew deep enough to memorise every training sample, including noise.",
        },
        {
          prompt: "Which technique directly limits how deep a decision tree grows?",
          options: [
            "L2 regularisation",
            "Dropout",
            "max_depth pre-pruning",
            "Batch normalisation",
          ],
          answer: 2,
          explanation:
            "Setting a max_depth is pre-pruning: the tree stops splitting once it reaches that depth, regardless of remaining impurity. L2, Dropout, and BatchNorm are neural-network techniques.",
        },
        {
          prompt:
            "You have a dataset with 8 categorical features and a binary label. A single decision tree scores 80% on validation. To improve, you train 100 trees on random subsets of data and features, then average their votes. This technique is called:",
          options: [
            "Gradient boosting",
            "Random Forest",
            "Principal Component Analysis",
            "K-Nearest Neighbours",
          ],
          answer: 1,
          explanation:
            "Random Forests average many independently-trained decision trees, each built on a bootstrap sample with random feature subsets. This reduces variance and usually beats any single tree.",
        },
        {
          prompt:
            "Which impurity measure does CART (scikit-learn's default) use instead of Shannon entropy?",
          options: [
            "Mean squared error",
            "Cross-entropy loss",
            "Gini impurity",
            "Kullback-Leibler divergence",
          ],
          answer: 2,
          explanation:
            "CART uses Gini impurity: G = 1 - Σp². It's computationally cheaper than entropy (no logarithm) and produces nearly identical trees in practice.",
        },
        {
          prompt:
            "A node in your tree has 10 samples: 5 class A and 5 class B. After a split, left has [5A, 0B] and right has [0A, 5B]. The information gain for this split is:",
          options: ["0", "0.5", "1.0", "2.0"],
          answer: 2,
          explanation:
            "The parent has entropy = 1.0 (50/50 split). Both children are pure (entropy 0). IG = 1.0 - (5/10)×0 - (5/10)×0 = 1.0. This is a perfect split.",
        },
      ],
    },
  ],
};
