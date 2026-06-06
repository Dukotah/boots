import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
import { levelFromXp } from "@/lib/levels";
import { SITE } from "@/lib/site";

// Dynamic social-share card for a public learner profile. Next wires this up as
// the og:image for /u/[username]. Node runtime: the levels import + a Supabase
// read are fine here, and edge would add bundle constraints for no benefit.
export const runtime = "nodejs";
export const alt = "Cantrip learner profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ProfileRow = {
  xp: number | null;
  streak: number | null;
  completed: string[] | null;
  achievements: string[] | null;
};

// Best-effort public-profile lookup. Returns null when Supabase isn't configured,
// the row is missing, or anything throws — the card then falls back to a generic
// branded version so the route never errors a deploy or a share.
async function fetchProfile(username: string): Promise<ProfileRow | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  try {
    const sb = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data } = await sb
      .from("profiles")
      .select("xp, streak, completed, achievements")
      .eq("username", username)
      .maybeSingle();
    return (data as ProfileRow | null) ?? null;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: { username: string };
}) {
  const username = decodeURIComponent(params.username);
  const profile = await fetchProfile(username);

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const lessons = profile?.completed?.length ?? 0;
  const badges = profile?.achievements?.length ?? 0;
  const info = levelFromXp(xp);

  const stats: { value: string; label: string; color: string }[] = [
    { value: `${streak}`, label: "day streak", color: "#f97316" },
    { value: `${lessons}`, label: "lessons", color: "#a78bfa" },
    { value: xp.toLocaleString(), label: "total XP", color: "#f59e0b" },
    { value: `${badges}`, label: "badges", color: "#22c55e" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{ width: 44, height: 44, borderRadius: 22, background: "#8b5cf6", display: "flex" }}
          />
          <div style={{ fontSize: 30, fontWeight: 700 }}>{SITE.name}</div>
        </div>

        {/* Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ fontSize: 110 }}>{info.rank.emoji}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 800 }}>{username}</div>
            <div style={{ fontSize: 32, color: "#a78bfa", marginTop: 6 }}>
              {`Level ${info.level} · ${info.rank.name}`}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 28 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "22px 28px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: 46, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 24, color: "#9ca3af", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
