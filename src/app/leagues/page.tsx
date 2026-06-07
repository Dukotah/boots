"use client";

import { useEffect, useState } from "react";
import { Crown, Swords, ArrowUp, ArrowDown, Clock, Users } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import {
  LEAGUE_TIERS,
  TOP_TIER,
  PROMOTE_COUNT,
  RELEGATE_COUNT,
  tierAt,
  seasonStandings,
  rankSeason,
  cohortLabel,
  cohortPercentile,
  type WeeklyRow,
  type RankedWeeklyRow,
  type SeasonResult,
} from "@/lib/leagues";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

export default function LeaguesPage() {
  const mounted = useMounted();
  const checkSeason = useGameStore((s) => s.checkSeason);
  const season = useGameStore((s) => s.season);
  const lastSeasonResult = useGameStore((s) => s.lastSeasonResult);
  const clearSeasonResult = useGameStore((s) => s.clearSeasonResult);
  const user = useGameStore((s) => s.user);

  // Roll the season over (promote/relegate) if it expired while we were away.
  useEffect(() => {
    checkSeason();
  }, [checkSeason]);

  const { tier, daysLeft, weeklyXp } = mounted
    ? season()
    : { tier: 0, daysLeft: 7, weeklyXp: 0 };

  // When a backend is configured, rank against real rivals by this week's XP;
  // otherwise fall back to the seeded field so the board is never empty.
  const [realField, setRealField] = useState<WeeklyRow[] | null>(null);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const sb = getSupabaseBrowserClient();
    if (!sb) return;
    let active = true;
    (async () => {
      const { data } = await sb
        .from("profiles")
        .select("username, weekly_xp")
        .order("weekly_xp", { ascending: false })
        .limit(25);
      if (!active || !data) return;
      const rows = (data as { username?: string; weekly_xp?: number }[])
        .filter((r) => (r.weekly_xp ?? 0) > 0)
        .map((r) => ({ name: r.username ?? "Anonymous", weeklyXp: r.weekly_xp ?? 0 }));
      if (rows.length >= 3) setRealField(rows);
    })();
    return () => {
      active = false;
    };
  }, []);

  const t = tierAt(tier);
  const youName = user?.email?.split("@")[0] ?? "You";

  const standings: RankedWeeklyRow[] = realField
    ? rankSeason(
        [
          ...realField.filter((r) => r.name !== youName),
          { name: youName, weeklyXp, isYou: true },
        ],
        tier,
      )
    : seasonStandings(weeklyXp, tier).map((r) =>
        r.isYou ? { ...r, name: youName } : r,
      );
  const you = standings.find((r) => r.isYou);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {mounted && lastSeasonResult && (
        <SeasonResultBanner result={lastSeasonResult} onDismiss={clearSeasonResult} />
      )}

      <div className="flex items-center gap-3">
        <Swords className="text-accent-soft" />
        <h1 className="text-3xl font-bold text-white">
          <span className={t.color}>{t.emoji} {t.name}</span> League
        </h1>
      </div>
      <p className="mt-1 text-gray-400">
        A 7-day season. Earn the most XP to climb. Top {PROMOTE_COUNT} are
        promoted{tier < TOP_TIER ? " to the next tier" : ""}; bottom{" "}
        {RELEGATE_COUNT} are relegated{tier === 0 ? " (you're safe in Bronze)" : ""}.
      </p>

      {/* Season status strip */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-canvas/40 px-5 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={14} /> Season ends
          </div>
          <p className="mt-1 text-lg font-bold text-white">
            {mounted ? (daysLeft === 0 ? "Today" : `${daysLeft} day${daysLeft === 1 ? "" : "s"}`) : "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3">
          <span className="text-sm text-gray-300">Your standing</span>
          <p className="mt-1 text-lg font-bold text-white">
            {mounted && you ? `#${you.rank} · ${you.weeklyXp} XP` : "—"}
          </p>
        </div>
      </div>

      {/* Cohort segment badge */}
      {mounted && (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-canvas/30 px-4 py-2.5">
          <Users size={14} className="shrink-0 text-gray-500" />
          <div className="flex flex-1 items-center gap-2 text-sm">
            <span className="text-gray-400">Pool:</span>
            <span className="font-semibold text-white">
              {cohortLabel(weeklyXp, tier)} cohort
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400">{cohortPercentile(weeklyXp, tier)} in pool</span>
          </div>
          <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            matched
          </span>
        </div>
      )}

      {/* Tier ladder */}
      <div className="mt-6 flex items-center justify-center gap-1 text-sm">
        {LEAGUE_TIERS.map((tt, i) => (
          <span
            key={tt.name}
            className={[
              "rounded-full px-2.5 py-1 font-semibold transition",
              i === tier
                ? `bg-white/10 ${tt.color}`
                : "text-gray-600",
            ].join(" ")}
            title={tt.name}
          >
            {tt.emoji}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {standings.map((row) => (
          <Row key={`${row.name}-${row.rank}`} row={row} />
        ))}
      </div>
    </div>
  );
}

function SeasonResultBanner({
  result,
  onDismiss,
}: {
  result: SeasonResult;
  onDismiss: () => void;
}) {
  const from = tierAt(result.fromTier);
  const to = tierAt(result.toTier);
  const config = {
    promoted: {
      icon: <ArrowUp className="text-emerald-400" />,
      title: `Promoted to ${to.name}!`,
      body: `You finished #${result.rank} in ${from.name}. Onward and upward.`,
      cls: "border-emerald-500/40 bg-emerald-500/10",
    },
    relegated: {
      icon: <ArrowDown className="text-rose-400" />,
      title: `Relegated to ${to.name}`,
      body: `You finished #${result.rank} in ${from.name}. Climb back next season.`,
      cls: "border-rose-500/40 bg-rose-500/10",
    },
    held: {
      icon: <Crown className="text-gold" />,
      title: `Held your spot in ${to.name}`,
      body: `You finished #${result.rank}. A new season has begun — go again.`,
      cls: "border-gold/40 bg-gold/10",
    },
  }[result.outcome];

  return (
    <div className={`mb-6 flex items-start gap-3 rounded-2xl border px-5 py-4 ${config.cls}`}>
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex-1">
        <p className="font-bold text-white">{config.title}</p>
        <p className="mt-0.5 text-sm text-gray-300">{config.body}</p>
      </div>
      <button
        onClick={onDismiss}
        className="rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
      >
        Dismiss
      </button>
    </div>
  );
}

function Row({ row }: { row: RankedWeeklyRow }) {
  const zoneColor =
    row.zone === "promote"
      ? "text-emerald-400"
      : row.zone === "relegate"
        ? "text-rose-400"
        : "text-gray-500";
  return (
    <div
      className={[
        "flex items-center gap-4 rounded-xl border px-4 py-3 transition",
        row.isYou ? "border-accent/60 bg-accent/15" : "border-line bg-canvas/40",
      ].join(" ")}
    >
      <span className={`w-8 text-center text-sm font-bold ${zoneColor}`}>
        {row.zone === "promote" ? (
          <ArrowUp size={16} className="mx-auto" />
        ) : row.zone === "relegate" ? (
          <ArrowDown size={16} className="mx-auto" />
        ) : (
          row.rank
        )}
      </span>
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
          {row.zone === "promote"
            ? "Promotion zone"
            : row.zone === "relegate"
              ? "Relegation zone"
              : `Rank #${row.rank}`}
        </p>
      </div>
      <span className="font-mono text-sm font-semibold text-accent-soft">
        {row.weeklyXp} XP
      </span>
    </div>
  );
}
