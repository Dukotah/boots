// Lightweight uptime / readiness probe. Always returns 200 so load-balancers and
// external monitors never get a false-alarm. Reports which backing services are
// configured (env-var presence only — no outbound calls, so it's instant and
// can't cascade-fail when a dependency is slow).
//
// Response shape:
//   { ok: true, ts: "<ISO>", commit: "<sha>"|null, services: { supabase, stripe } }

export const runtime = "nodejs";

// These are intentionally read at request time so a re-deploy that adds a new
// env var is reflected immediately without a cold-start cache miss.
function servicesStatus() {
  const supabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const stripe = Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET,
  );
  return { supabase, stripe };
}

export async function GET(): Promise<Response> {
  const body = {
    ok: true,
    ts: new Date().toISOString(),
    // Injected by Vercel at build time; null in local dev or non-Vercel deploys.
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    services: servicesStatus(),
  };

  return Response.json(body, {
    status: 200,
    headers: {
      // Don't let CDNs cache health results — always hit origin.
      "Cache-Control": "no-store",
    },
  });
}
