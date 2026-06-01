"use client";

import { useEffect, useState } from "react";
import { Crown, Swords } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import {
  DEMO_LEAGUE,
  rankLeaderboard,
  type LeaderRow,
  type RankedRow,
} from "@/lib/leaderboard";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

export default function LeaguesPage() {
  const mounted = useMounted();
  const xp = useGameStore((s) => s.xp);
  const user = useGameStore((s) => s.user);
  const [field, setField] = useState<LeaderRow[]>(DEMO_LEAGUE);

  // When Supabase is configured, rank real profiles by XP; otherwise the seeded
  // demo league stands in so the board is never empty.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const sb = getSupabaseBrowserClient();
    if (!sb) return;
    let active = true;
    (async () => {
      const { data } = await sb
        .from("profiles")
        .select("username, xp")
        .order("xp", { ascending: false })
        .limit(25);
      if (active && data && data.length) {
        setField(
          data.map((r) => ({
            name: (r as { username?: string }).username ?? "Anonymous",
            xp: (r as { xp?: number }).xp ?? 0,
          })),
        );
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Drop "you" into the field (replacing a same-named server row if present).
  const youName = user?.email?.split("@")[0] ?? "You";
  const withYou: LeaderRow[] = mounted
    ? [
        ...field.filter((r) => r.name !== youName),
        { name: youName, xp, isYou: true },
      ]
    : field;
  const ranked = rankLeaderboard(withYou);
  const you = ranked.find((r) => r.isYou);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center gap-3">
        <Swords className="text-accent-soft" />
        <h1 className="text-3xl font-bold text-white">Bronze League</h1>
      </div>
      <p className="mt-1 text-gray-400">
        A 7-day season. Earn the most XP to get promoted — newcomers compete
        against peers, not veterans. Top 3 advance; bottom 3 are relegated.
      </p>

      {mounted && you && (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3">
          <span className="text-sm text-gray-300">Your standing</span>
          <span className="text-lg font-bold text-white">
            #{you.rank} · {you.xp} XP
          </span>
        </div>
      )}

      <div className="mt-6 space-y-2">
        {ranked.map((row) => (
          <Row key={`${row.name}-${row.rank}`} row={row} />
        ))}
      </div>
    </div>
  );
}

function Row({ row }: { row: RankedRow }) {
  const promo = row.rank <= 3;
  return (
    <div
      className={[
        "flex items-center gap-4 rounded-xl border px-4 py-3 transition",
        row.isYou
          ? "border-accent/60 bg-accent/15"
          : "border-line bg-canvas/40",
      ].join(" ")}
    >
      <span
        className={[
          "w-8 text-center text-sm font-bold",
          promo ? "text-gold" : "text-gray-500",
        ].join(" ")}
      >
        {row.rank <= 3 ? <Crown size={16} className="mx-auto" /> : row.rank}
      </span>
      <span className="text-xl">{row.rankEmoji}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-white">
          {row.name}
          {row.isYou && (
            <span className="ml-2 rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-semibold text-white">
              YOU
            </span>
          )}
        </p>
        <p className="text-xs text-gray-500">
          Lvl {row.level} · {row.rankName}
        </p>
      </div>
      <span className="font-mono text-sm font-semibold text-accent-soft">
        {row.xp} XP
      </span>
    </div>
  );
}
