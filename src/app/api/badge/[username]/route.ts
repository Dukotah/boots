import { levelFromXp, rankForLevel } from "@/lib/levels";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/site";

// Read-only SVG badge of a learner's progress, for embedding in a GitHub profile
// README (or anywhere). No auth, no write scope — just public profile stats.
// e.g. ![progress](https://<site>/api/badge/<username>)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Stats = { xp: number; streak: number; completed: number };

async function lookup(username: string): Promise<Stats | null> {
  const sb = getSupabaseServerClient();
  if (!sb) return null;
  const { data } = await sb
    .from("profiles")
    .select("xp, streak, completed")
    .eq("username", username)
    .maybeSingle();
  if (!data) return null;
  const row = data as { xp?: number; streak?: number; completed?: string[] };
  return {
    xp: row.xp ?? 0,
    streak: row.streak ?? 0,
    completed: (row.completed ?? []).length,
  };
}

function svg(username: string, stats: Stats): string {
  const info = levelFromXp(stats.xp);
  const rank = rankForLevel(info.level);
  const name = esc(`@${username}`);
  const W = 420;
  const H = 120;

  const stat = (label: string, value: string, x: number) => `
    <text x="${x}" y="84" fill="#e5e7eb" font-size="20" font-weight="700" font-family="ui-sans-serif,system-ui,sans-serif">${value}</text>
    <text x="${x}" y="101" fill="#8b93a7" font-size="11" font-family="ui-sans-serif,system-ui,sans-serif">${label}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${name} on ${SITE.name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c1018"/>
      <stop offset="1" stop-color="#141a26"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7c5cff"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="16" fill="url(#bg)" stroke="#222a3a"/>
  <rect width="6" height="${H}" rx="3" fill="url(#accent)"/>

  <text x="24" y="40" font-size="26" font-family="ui-sans-serif,system-ui,sans-serif">${rank.emoji}</text>
  <text x="58" y="38" fill="#ffffff" font-size="20" font-weight="800" font-family="ui-sans-serif,system-ui,sans-serif">${name}</text>
  <text x="58" y="56" fill="#9aa3b7" font-size="12" font-family="ui-sans-serif,system-ui,sans-serif">Level ${info.level} · ${esc(rank.name)} on ${esc(SITE.name)}</text>

  ${stat("XP", info.totalXp.toLocaleString(), 24)}
  ${stat("LESSONS", String(stats.completed), 150)}
  ${stat("STREAK", `${stats.streak}🔥`, 270)}

  <text x="${W - 16}" y="101" text-anchor="end" fill="#5b6478" font-size="10" font-family="ui-sans-serif,system-ui,sans-serif">${esc(SITE.name)}</text>
</svg>`;
}

export async function GET(
  _req: Request,
  { params }: { params: { username: string } },
) {
  const username = decodeURIComponent(params.username).slice(0, 40);
  const stats = (await lookup(username)) ?? { xp: 0, streak: 0, completed: 0 };

  return new Response(svg(username, stats), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      // Cache at the edge but let it refresh; GitHub proxies via camo anyway.
      "Cache-Control":
        "public, max-age=300, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
