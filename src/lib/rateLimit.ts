// Minimal fixed-window rate limiter, in-memory.
//
// Purpose: a first-line guard so one user (or one leaked token) can't run up the
// Anthropic bill on the AI tutor. It counts requests per key within a rolling
// window and rejects once the cap is hit.
//
// Caveat (read before trusting it): the counter lives in process memory, so on
// serverless/multi-instance hosting (Vercel) each instance has its own counter
// and a determined caller spread across instances gets `instances × limit`.
// That's fine as a cheap abuse brake; for hard quotas back it with a shared
// store (Upstash Redis or a Supabase table keyed by user+window).

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  /** Requests left in the current window. */
  remaining: number;
  /** Seconds until the window resets (for a Retry-After header). */
  retryAfter: number;
};

/**
 * Record a hit for `key` and report whether it's within `limit` per `windowMs`.
 * Call once per request; the call itself counts.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    sweep(now);
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter };
}

// Opportunistic cleanup so the Map doesn't grow unbounded across many keys.
let lastSweep = 0;
function sweep(now: number): void {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  buckets.forEach((b, k) => {
    if (now >= b.resetAt) buckets.delete(k);
  });
}
