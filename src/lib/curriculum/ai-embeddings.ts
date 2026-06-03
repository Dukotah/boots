import type { Module } from "./types";

// Fine-tuning & Embeddings (intro) — the vector side of AI: turning text into
// numbers, comparing them, and the semantic-search machinery behind RAG. Plus a
// conceptual lesson on when to fine-tune vs. prompt. Code lessons grade in-browser.
export const aiEmbeddings: Module = {
  slug: "ai-embeddings",
  title: "Fine-tuning & Embeddings",
  description:
    "An intro to the vector side of AI: dot products, normalizing vectors, nearest-neighbor search, top-k retrieval, and when to fine-tune instead of prompt.",
  emoji: "🧮",
  gradient: "from-cyan-500/20 to-blue-500/10",
  tagline:
    "Learn embeddings and fine-tuning basics: vector similarity, nearest-neighbor search, semantic retrieval, and fine-tune vs. prompt.",
  keywords: [
    "embeddings explained",
    "vector similarity",
    "semantic search",
    "fine-tuning vs prompting",
    "nearest neighbor search",
  ],
  lessons: [
    {
      slug: "dot-product",
      title: "The Dot Product",
      blurb: "The one operation behind almost all vector comparison.",
      xp: 30,
      content: `# The Dot Product

An **embedding** is a list of numbers (a vector) representing a piece of text. To
compare two of them you start with the **dot product**: multiply matching
positions and sum the results.

\`\`\`
dot([1, 2, 3], [4, 5, 6]) = 1·4 + 2·5 + 3·6 = 32
\`\`\`

## Your task
Write \`dot(a, b)\` for two equal-length number arrays.`,
      starterCode: `function dot(a, b) {
  // sum of a[i] * b[i]
}
`,
      solution: `function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}`,
      tests: [
        { name: "[1,2,3]·[4,5,6] = 32", code: `assertEquals(dot([1, 2, 3], [4, 5, 6]), 32);` },
        { name: "orthogonal → 0", code: `assertEquals(dot([1, 0], [0, 1]), 0);` },
        { name: "empty → 0", code: `assertEquals(dot([], []), 0);` },
      ],
      hints: [
        "Loop over the indices and accumulate `a[i] * b[i]`.",
        "Start the running sum at 0 so empty vectors return 0.",
      ],
      explanation:
        "The dot product is the workhorse of vector math. Cosine similarity, attention scores, and nearest-neighbor search are all dot products with a little scaling on top.",
    },
    {
      slug: "magnitude",
      title: "Vector Length (Magnitude)",
      blurb: "How long is a vector? Pythagoras, in N dimensions.",
      xp: 30,
      content: `# Vector Length (Magnitude)

The **magnitude** (length) of a vector is the square root of the sum of its
squared components — the Pythagorean theorem generalized to any number of
dimensions.

\`\`\`
|[3, 4]| = √(3² + 4²) = √25 = 5
\`\`\`

## Your task
Write \`magnitude(v)\` returning the length of vector \`v\`.`,
      starterCode: `function magnitude(v) {
  // sqrt of the sum of squares
}
`,
      solution: `function magnitude(v) {
  let sum = 0;
  for (const x of v) {
    sum += x * x;
  }
  return Math.sqrt(sum);
}`,
      tests: [
        { name: "[3,4] → 5", code: `assertEquals(magnitude([3, 4]), 5);` },
        { name: "[0,0] → 0", code: `assertEquals(magnitude([0, 0]), 0);` },
        { name: "unit vector → 1", code: `assertEquals(magnitude([1, 0, 0]), 1);` },
      ],
      hints: [
        "Sum each component squared, then `Math.sqrt` the total.",
        "`x * x` is the squared component.",
      ],
      explanation:
        "Magnitude is how you measure and compare the 'size' of a vector. Dividing a vector by its magnitude gives a unit vector — the next lesson.",
    },
    {
      slug: "normalize",
      title: "Normalize a Vector",
      blurb: "Scale a vector to length 1 so only its direction matters.",
      xp: 35,
      content: `# Normalize a Vector

For semantic search we usually care about a vector's **direction**, not its
length. **Normalizing** divides every component by the magnitude so the result
has length 1. Then a plain dot product equals cosine similarity.

## Your task
Write \`normalize(v)\` returning a new vector scaled to length 1. Round each
component to 2 decimals. (You may assume \`v\` is not all zeros.)`,
      starterCode: `function normalize(v) {
  // divide each component by the magnitude; round to 2 decimals
}
`,
      solution: `function normalize(v) {
  const mag = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
  return v.map((x) => Math.round((x / mag) * 100) / 100);
}`,
      tests: [
        { name: "[3,4] → [0.6,0.8]", code: `assertEquals(normalize([3, 4]), [0.6, 0.8]);` },
        { name: "already unit", code: `assertEquals(normalize([1, 0]), [1, 0]);` },
      ],
      hints: [
        "Compute the magnitude first, then map `x / mag` over the vector.",
        "Round with `Math.round(value * 100) / 100`.",
      ],
      explanation:
        "Normalizing up front is a common optimization: once every embedding is unit-length, similarity search reduces to a single dot product per candidate — fast and simple.",
    },
    {
      slug: "nearest-neighbor",
      title: "Nearest-Neighbor Search",
      blurb: "Find the stored vector most similar to a query.",
      xp: 45,
      content: `# Nearest-Neighbor Search

Semantic search embeds your query, then finds the **most similar** stored vector.
With unit vectors, "most similar" means the highest dot product. The index of
that best match tells you which document to return.

## Your task
Write \`nearest(query, vectors)\` that returns the **index** of the vector in
\`vectors\` with the largest dot product against \`query\`. On a tie, return the
earliest index. \`vectors\` is non-empty.`,
      starterCode: `function nearest(query, vectors) {
  // return the index of the vector with the highest dot product vs query
}
`,
      solution: `function nearest(query, vectors) {
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  let bestIdx = 0;
  let bestScore = dot(query, vectors[0]);
  for (let i = 1; i < vectors.length; i++) {
    const score = dot(query, vectors[i]);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  return bestIdx;
}`,
      tests: [
        {
          name: "picks the aligned vector",
          code: `assertEquals(nearest([1, 0], [[0, 1], [0.9, 0.1], [-1, 0]]), 1);`,
        },
        {
          name: "first on a tie",
          code: `assertEquals(nearest([1, 1], [[1, 1], [1, 1]]), 0);`,
        },
      ],
      hints: [
        "Track `bestIdx` and `bestScore`, starting from index 0.",
        "Only update when the new score is strictly greater (`>`), so ties keep the earlier index.",
      ],
      explanation:
        "This linear scan is exactly what a vector database does — just at scale and with clever indexes (HNSW, IVF) so it doesn't compare against every vector. The idea is identical.",
    },
    {
      slug: "top-k",
      title: "Top-K Retrieval",
      blurb: "Return the K best matches, not just the single closest.",
      xp: 40,
      content: `# Top-K Retrieval

RAG usually retrieves the **top K** most relevant chunks, not just one, so the
model has enough context. Given a list of \`{ id, score }\` results, you sort by
score (highest first) and keep the first K ids.

## Your task
Write \`topK(results, k)\` where \`results\` is an array of \`{ id, score }\`. Return
an array of the \`id\`s of the \`k\` highest-scoring results, highest first.`,
      starterCode: `function topK(results, k) {
  // sort by score descending, take the first k, return their ids
}
`,
      solution: `function topK(results, k) {
  return [...results]
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((r) => r.id);
}`,
      tests: [
        {
          name: "returns the 2 best ids",
          code: `assertEquals(topK([{ id: "a", score: 0.2 }, { id: "b", score: 0.9 }, { id: "c", score: 0.5 }], 2), ["b", "c"]);`,
        },
        {
          name: "k larger than list",
          code: `assertEquals(topK([{ id: "x", score: 1 }], 5), ["x"]);`,
        },
      ],
      hints: [
        "Copy before sorting (`[...results]`) so you don't mutate the input.",
        "Sort with `(a, b) => b.score - a.score` for descending order, then `slice(0, k)` and `map` to ids.",
      ],
      explanation:
        "Top-K is the retrieval half of Retrieval-Augmented Generation: pull the K most relevant chunks, drop them into the prompt, and let the model answer grounded in real data.",
    },
    {
      slug: "fine-tune-or-prompt",
      title: "Fine-tune or Just Prompt?",
      blurb: "When is fine-tuning worth it — and when is it overkill?",
      xp: 30,
      kind: "quiz",
      content: `# Fine-tune or Just Prompt?

You don't always need to **fine-tune** (retrain a model on your own examples).
Most problems are solved more cheaply with good prompting, few-shot examples, or
retrieval (RAG). Fine-tuning shines when you need a **consistent style or
format** at scale, or to bake in a narrow skill — but it costs data, money, and
time, and it doesn't add fresh knowledge the way RAG does.

A simple rule of thumb:
- **Prompt / few-shot** first — it's instant and free to iterate.
- **RAG** when the model needs *facts* it doesn't have (your docs, recent data).
- **Fine-tune** when you need *behavior* (tone, format) locked in across millions
  of calls, and prompting alone can't hold it.`,
      questions: [
        {
          prompt:
            "You want the model to answer questions about your company's internal handbook, which it has never seen. What's the best first approach?",
          options: [
            "Fine-tune a model on the handbook",
            "Use retrieval (RAG): embed the handbook and feed relevant chunks into the prompt",
            "Raise the temperature so it's more creative",
          ],
          answer: 1,
          explanation:
            "RAG injects the facts the model lacks at request time. Fine-tuning teaches behavior, not fresh knowledge, and would be slower and costlier here.",
        },
        {
          prompt: "Which problem is fine-tuning genuinely well-suited for?",
          options: [
            "Adding this week's news to the model's knowledge",
            "Locking in a very specific output style/format across millions of calls",
            "Letting the model browse the live web",
          ],
          answer: 1,
          explanation:
            "Fine-tuning bakes in consistent behavior (style/format). It doesn't add up-to-date facts or give the model new tools.",
        },
        {
          prompt: "Before reaching for fine-tuning, you should usually first try:",
          options: [
            "Clear prompting and a few well-chosen examples (few-shot)",
            "Training a model from scratch",
            "Buying more GPUs",
          ],
          answer: 0,
          explanation:
            "Prompting and few-shot are instant and free to iterate. Exhaust them (and RAG) before paying the data/time/cost of fine-tuning.",
        },
      ],
    },
  ],
};
