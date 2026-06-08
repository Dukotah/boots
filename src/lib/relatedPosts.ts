import type { BlogPost } from "@/content/blog";

/**
 * Score a candidate post against the current post.
 * Returns a tuple [sharedTagCount, dateMs] so we can sort by shared tags
 * descending, then by recency descending as a tiebreak.
 */
function score(current: BlogPost, candidate: BlogPost): [number, number] {
  const currentTags = new Set(current.tags);
  const shared = candidate.tags.filter((t) => currentTags.has(t)).length;
  const dateMs = new Date(candidate.date).getTime();
  return [shared, dateMs];
}

/**
 * Return up to `n` posts most related to `current`, scored by shared tags
 * with recency as a tiebreak. The current post itself is always excluded.
 * Posts with zero shared tags are still eligible as a fallback (pure recency).
 */
export function relatedPosts(
  current: BlogPost,
  all: BlogPost[],
  n = 3
): BlogPost[] {
  return all
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ post: p, score: score(current, p) }))
    .sort((a, b) => {
      // Primary: more shared tags wins
      if (b.score[0] !== a.score[0]) return b.score[0] - a.score[0];
      // Tiebreak: newer wins
      return b.score[1] - a.score[1];
    })
    .slice(0, n)
    .map(({ post }) => post);
}
