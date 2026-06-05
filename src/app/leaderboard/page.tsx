"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Users, Crown, Globe, UserCheck } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { GUILDS, seededWeeklyXp, seededMemberCount } from "@/lib/guilds";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

type LeaderboardPlayer = {
  id: string;
  username: string;
  xp: number;
  weekly_xp: number;
  streak: number;
  league_tier: number;
};

type Tab = "global" | "weekly" | "guilds";

// Seeded fake players for the global board when no backend is configured.
function seededPlayers(): LeaderboardPlayer[] {
  const names = [
    "ByteWizard", "asyncAwaitlin", "NullPointerNate", "SegfaultSophie",
    "RecursiveRaj", "PolyglotPaola", "AlgoAlex", "SQLSorcerer",
    "HexHunter", "TypescriptTina", "PythonPete", "ReactRuby",
    "DevOpsDave", "KernelKim", "CleanCodeCara", "BigOBruno",
    "MemoMike", "BitBandit", "HeapHannah", "StackSmith",
    "AIAurelien", "MLMaria", "APIAdrian", "CacheCarlos",
    "ShardShana",
  ];
  return names.map((username, i) => {
    let hash = 0;
    for (const c of username) hash = (hash * 31 + c.charCodeAt(0)) | 0;
    const xp = 500 + Math.abs(hash % 9500);
    return {
      id: `seed-${i}`,
      username,
      xp,
      weekly_xp: Math.abs((hash * 7) % 1200),
      streak: Math.abs((hash * 13) % 45),
      league_tier: Math.min(4, Math.floor(xp / 2000)),
    };
  });
}

const TIER_LABELS = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
const TIER_COLORS = [
  "text-amber-600", "text-gray-300", "text-yellow-400", "text-cyan-300", "text-blue-400",
];

export default function LeaderboardPage() {
  const mounted = useMounted();
  const myXp = useGameStore((s) => s.xp);
  const myStreak = useGameStore((s) => s.streak);
  const myWeeklyXp = useGameStore((s) => s.weeklyXp);
  const myLeagueTier = useGameStore((s) => s.leagueTier);
  const user = useGameStore((s) => s.user);
  const guildId = useGameStore((s) => s.guildId);

  const [tab, setTab] = useState<Tab>("global");
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  const myHandle = user?.email?.split("@")[0] ?? "you";

  useEffect(() => {
    if (!mounted) return;

    async function load() {
      setLoading(true);
      let fetched: LeaderboardPlayer[] = [];

      if (isSupabaseConfigured) {
        const sb = getSupabaseBrowserClient();
        if (sb) {
          const col = tab === "weekly" ? "weekly_xp" : "xp";
          const { data } = await sb
            .from("profiles")
            .select("id, username, xp, weekly_xp, streak, league_tier")
            .order(col, { ascending: false })
            .limit(50);
          fetched = (data ?? []) as LeaderboardPlayer[];
        }
      }

      if (fetched.length === 0) {
        fetched = seededPlayers();
      }

      // Always ensure the local player appears (on both the seeded and the
      // Supabase-backed path) so the rank callout + highlight never vanish.
      if (!fetched.some((p) => p.id === "me" || p.username === myHandle)) {
        fetched = [
          ...fetched,
          {
            id: "me",
            username: myHandle,
            xp: myXp,
            weekly_xp: myWeeklyXp,
            streak: myStreak,
            league_tier: myLeagueTier,
          },
        ];
      }

      const sortKey = tab === "weekly" ? "weekly_xp" : "xp";
      fetched.sort((a, b) => b[sortKey] - a[sortKey]);
      setPlayers(fetched);
      setLoading(false);
    }

    load();
  }, [mounted, tab, myXp, myWeeklyXp, myStreak, myLeagueTier, myHandle]);

  const myRank = players.findIndex((p) => p.id === "me" || p.username === myHandle) + 1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
          Rankings
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-white">
          Leaderboard
        </h1>
        <p className="mt-2 text-gray-400">
          The global rankings. Earn XP to climb — all-time and weekly boards
          reset together with the league season.
        </p>
      </div>

      {/* My rank callout */}
      {mounted && myRank > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-4 rounded-xl border border-accent/30 bg-accent/5 px-5 py-4"
        >
          <Crown size={20} className="text-gold" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              You&apos;re ranked #{myRank} globally
            </p>
            <p className="text-xs text-gray-400">
              {myXp.toLocaleString()} total XP · {myWeeklyXp.toLocaleString()} this week · {myStreak}-day streak
            </p>
          </div>
          <span className={`text-sm font-bold ${TIER_COLORS[myLeagueTier]}`}>
            {TIER_LABELS[myLeagueTier]}
          </span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {([
          { id: "global" as Tab, label: "All-Time XP", icon: <Globe size={14} /> },
          { id: "weekly" as Tab, label: "This Week", icon: <Zap size={14} /> },
          { id: "guilds" as Tab, label: "Guilds", icon: <Users size={14} /> },
        ] as { id: Tab; label: string; icon: React.ReactNode }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition",
              tab === t.id
                ? "bg-accent text-white"
                : "border border-line bg-surface text-gray-400 hover:border-accent/50 hover:text-white",
            ].join(" ")}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === "guilds" ? (
        <GuildLeaderboard myGuildId={guildId} myWeeklyXp={myWeeklyXp} />
      ) : (
        <PlayerLeaderboard
          players={players}
          loading={loading || !mounted}
          myHandle={myHandle}
          sortKey={tab === "weekly" ? "weekly_xp" : "xp"}
        />
      )}
    </div>
  );
}

function PlayerLeaderboard({
  players,
  loading,
  myHandle,
  sortKey,
}: {
  players: LeaderboardPlayer[];
  loading: boolean;
  myHandle: string;
  sortKey: "xp" | "weekly_xp";
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-surface animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      {players.slice(0, 50).map((player, idx) => {
        const isMe = player.username === myHandle || player.id === "me";
        const info = levelFromXp(player.xp);
        const rankNum = idx + 1;
        const rankStyle =
          rankNum === 1
            ? "text-yellow-400 font-black text-lg"
            : rankNum === 2
              ? "text-gray-300 font-bold"
              : rankNum === 3
                ? "text-amber-600 font-bold"
                : "text-gray-500";
        const rankIcon = rankNum === 1 ? "🥇" : rankNum === 2 ? "🥈" : rankNum === 3 ? "🥉" : null;

        return (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(idx * 0.02, 0.5) }}
            className={[
              "flex items-center gap-3 px-4 py-3 border-b border-line/50 last:border-0 transition-colors",
              isMe ? "bg-accent/10" : "hover:bg-surface-2",
            ].join(" ")}
          >
            {/* Rank */}
            <div className={`w-8 text-center shrink-0 ${rankStyle}`}>
              {rankIcon ?? rankNum}
            </div>

            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-lg">
              {info.rank.emoji}
            </div>

            {/* Name + level */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  href={`/u/${player.username}`}
                  className={`font-semibold truncate hover:underline ${isMe ? "text-accent-soft" : "text-white"}`}
                >
                  {player.username}
                </Link>
                {isMe && (
                  <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-soft shrink-0">
                    YOU
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Lv {info.level} · {info.rank.name}
                {player.streak > 0 && (
                  <span className="ml-2 text-orange-400">
                    <Flame size={10} className="inline" /> {player.streak}
                  </span>
                )}
              </p>
            </div>

            {/* XP */}
            <div className="text-right shrink-0">
              <p className="font-bold text-white">
                {player[sortKey].toLocaleString()}
              </p>
              <p className="text-[11px] text-gray-500">
                {sortKey === "weekly_xp" ? "weekly XP" : "total XP"}
              </p>
            </div>

            {/* League tier */}
            <div className={`text-xs font-semibold shrink-0 hidden sm:block ${TIER_COLORS[player.league_tier ?? 0]}`}>
              {TIER_LABELS[player.league_tier ?? 0]}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function GuildLeaderboard({
  myGuildId,
  myWeeklyXp,
}: {
  myGuildId: string | null;
  myWeeklyXp: number;
}) {
  const ranked = [...GUILDS]
    .map((g) => ({
      ...g,
      totalXp: seededWeeklyXp(g.id) + (g.id === myGuildId ? myWeeklyXp : 0),
      members: seededMemberCount(g.id),
    }))
    .sort((a, b) => b.totalXp - a.totalXp);

  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <span className="w-8">#</span>
        <span className="flex-1">Guild</span>
        <span className="hidden sm:block w-24 text-right">Members</span>
        <span className="w-28 text-right">Weekly XP</span>
      </div>
      {ranked.map((guild, idx) => {
        const isMyGuild = guild.id === myGuildId;
        const rankIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
        return (
          <div
            key={guild.id}
            className={[
              "flex items-center gap-3 px-4 py-3 border-b border-line/50 last:border-0",
              isMyGuild ? "bg-accent/10" : "hover:bg-surface-2",
            ].join(" ")}
          >
            <div className="w-8 text-center text-sm font-bold text-gray-400">
              {rankIcon ?? idx + 1}
            </div>
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${guild.color} text-lg shadow`}
            >
              {guild.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  href="/guilds"
                  className={`font-semibold truncate hover:underline ${isMyGuild ? "text-accent-soft" : "text-white"}`}
                >
                  {guild.name}
                </Link>
                {isMyGuild && (
                  <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-soft shrink-0">
                    YOURS
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">{guild.tier} tier</p>
            </div>
            <div className="hidden sm:block w-24 text-right text-sm text-gray-400">
              <UserCheck size={12} className="inline mr-1" />
              {guild.members}
            </div>
            <div className="w-28 text-right">
              <p className="font-bold text-white">{guild.totalXp.toLocaleString()}</p>
              <p className="text-[11px] text-gray-500">this week</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
