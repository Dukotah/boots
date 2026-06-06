"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Users, Crown, Globe, UserCheck, UsersRound } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { GUILDS, seededWeeklyXp, seededMemberCount } from "@/lib/guilds";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { LeaderboardFilters } from "@/components/features/leaderboard/LeaderboardFilters";
import { matchesLanguageFilter, type ScopeFilter, type LanguageFilter } from "@/lib/leaderboard";

type LeaderboardPlayer = {
  id: string;
  username: string;
  xp: number;
  weekly_xp: number;
  streak: number;
  league_tier: number;
  /** Module slugs the player has completed at least one lesson in. */
  completed: string[];
  /** Guild the player belongs to (for guild-scope filter). */
  guildId: string | null;
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

  // Seeded language buckets so the language filter has something to do without
  // a live database. Each fake player is slotted into one primary language.
  const langBuckets: string[][] = [
    ["javascript/variables", "javascript/functions", "closures/intro"],
    ["javascript/basics", "async/promises", "javascript-next/esm"],
    ["algorithms/big-o", "data-structures/arrays", "algorithms/sorting"],
    ["sql/select", "sql/where", "sql-joins/inner"],
    ["python/basics", "python/functions", "python-data/pandas"],
    ["python/oop", "python-algorithms/sorting", "python/decorators"],
    ["algorithms/graphs", "graphs-js/bfs", "data-structures/trees"],
    ["sql/aggregations", "sql-aggregations/groupby", "sql-window-functions/rank"],
    ["typescript/basics", "ts-generics-advanced/intro", "typescript/utility-types"],
    ["typescript/narrowing", "typescript/generics", "react/hooks"],
    ["python/strings", "python-strings/methods", "python-comprehensions/list"],
    ["react/state", "react/effects", "react/context"],
    ["algorithms/dynamic-programming", "dynamic-programming/knapsack", "algorithms/dp"],
    ["javascript/closures", "closures/scope", "javascript/events"],
    ["algorithms/data-structures", "data-structures/hash-maps", "big-o-complexity/intro"],
    ["algorithms/sorting", "greedy-algorithms/intro", "algorithms/greedy"],
    ["python/generators", "python-generators/intro", "python/itertools"],
    ["javascript/async", "async/fetch", "web-apis/fetch"],
    ["sql/subqueries", "sql-subqueries/correlated", "sql/advanced"],
    ["data-structures/stacks", "data-structures/queues", "algorithms/searching"],
    ["ai-llms/basics", "ai-agents/intro", "prompt-engineering/basics"],
    ["ai-llms/transformers", "ml-model-evaluation/metrics", "decision-trees/intro"],
    ["javascript/apis", "web-apis/dom", "async/ajax"],
    ["algorithms/cache", "data-structures/graphs", "algorithms/bfs"],
    ["sql/joins", "sql-joins/outer", "db-normalization/1nf"],
  ];

  // Seeded guild membership: spread players across guilds.
  const guildIds = GUILDS.map((g) => g.id);

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
      completed: langBuckets[i % langBuckets.length],
      guildId: guildIds[Math.abs(hash) % guildIds.length],
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
  const myCompleted = useGameStore((s) => s.completed);
  const user = useGameStore((s) => s.user);
  const guildId = useGameStore((s) => s.guildId);
  const guildName = useGameStore((s) => s.guildName);

  const [tab, setTab] = useState<Tab>("global");
  const [scope, setScope] = useState<ScopeFilter>("global");
  const [language, setLanguage] = useState<LanguageFilter>("all");
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);
  const [friendIds, setFriendIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const myHandle = user?.email?.split("@")[0] ?? "you";

  // Fetch followed-user ids once (no polling — Supabase only).
  const loadFriends = useCallback(async () => {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;
    const { data } = await sb
      .from("follows")
      .select("following_id")
      .eq("follower_id", user.id);
    const ids = (data ?? []).map((r) => (r as { following_id: string }).following_id);
    setFriendIds(new Set(ids));
  }, [user]);

  useEffect(() => {
    if (mounted && user && isSupabaseConfigured) loadFriends();
  }, [mounted, user, loadFriends]);

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
            .select("id, username, xp, weekly_xp, streak, league_tier, completed, guild_id")
            .order(col, { ascending: false })
            .limit(50);
          fetched = ((data ?? []) as Array<{
            id: string;
            username: string;
            xp: number;
            weekly_xp: number;
            streak: number;
            league_tier: number;
            completed: string[] | null;
            guild_id: string | null;
          }>).map((row) => ({
            id: row.id,
            username: row.username,
            xp: row.xp,
            weekly_xp: row.weekly_xp,
            streak: row.streak,
            league_tier: row.league_tier,
            completed: row.completed ?? [],
            guildId: row.guild_id,
          }));
        }
      }

      if (fetched.length === 0) {
        fetched = seededPlayers();
      }

      // Always ensure the local player appears so the rank callout never vanishes.
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
            completed: myCompleted,
            guildId: guildId,
          },
        ];
      }

      const sortKey = tab === "weekly" ? "weekly_xp" : "xp";
      fetched.sort((a, b) => b[sortKey] - a[sortKey]);
      setPlayers(fetched);
      setLoading(false);
    }

    load();
  }, [mounted, tab, myXp, myWeeklyXp, myStreak, myLeagueTier, myHandle, myCompleted, guildId]);

  // Apply scope + language filters client-side on the already-fetched rows.
  const visiblePlayers = players.filter((p) => {
    // Language filter
    if (!matchesLanguageFilter(p.completed, language)) return false;
    // Scope filter (only on player tabs, not guilds tab)
    if (tab === "guilds") return true;
    if (scope === "friends") {
      // The local player's own row is always visible so the rank callout works.
      const isMe = p.id === "me" || p.username === myHandle;
      return isMe || friendIds.has(p.id);
    }
    if (scope === "guild") {
      return p.guildId === guildId;
    }
    return true; // global
  });

  const myRank =
    players.findIndex((p) => p.id === "me" || p.username === myHandle) + 1;

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

      {/* Primary tabs */}
      <div className="mb-4 flex gap-2">
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

      {/* Secondary filters (scope + language) — hidden on the Guilds tab */}
      {tab !== "guilds" && (
        <LeaderboardFilters
          scope={scope}
          onScopeChange={setScope}
          language={language}
          onLanguageChange={setLanguage}
          hasGuild={!!guildId}
        />
      )}

      {tab === "guilds" ? (
        <GuildLeaderboard myGuildId={guildId} myWeeklyXp={myWeeklyXp} />
      ) : (
        <PlayerLeaderboard
          players={visiblePlayers}
          allPlayers={players}
          loading={loading || !mounted}
          myHandle={myHandle}
          sortKey={tab === "weekly" ? "weekly_xp" : "xp"}
          scope={scope}
          hasGuild={!!guildId}
          guildName={guildName}
          language={language}
        />
      )}
    </div>
  );
}

function PlayerLeaderboard({
  players,
  allPlayers,
  loading,
  myHandle,
  sortKey,
  scope,
  hasGuild,
  guildName,
  language,
}: {
  players: LeaderboardPlayer[];
  allPlayers: LeaderboardPlayer[];
  loading: boolean;
  myHandle: string;
  sortKey: "xp" | "weekly_xp";
  scope: ScopeFilter;
  hasGuild: boolean;
  guildName: string | null;
  language: LanguageFilter;
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

  // Empty state: no results after filtering.
  if (players.length === 0 || (players.length === 1 && (players[0].id === "me" || players[0].username === myHandle))) {
    // Only the local player (or nothing) — show a contextual nudge.
    if (scope === "friends") {
      return (
        <EmptyState
          icon={<UsersRound size={32} className="text-gray-600" />}
          title="No friends yet"
          body={
            isSupabaseConfigured
              ? "Follow other learners on the Friends page to see them here."
              : "Friends require an account backend (Supabase) to be configured."
          }
          link={isSupabaseConfigured ? { href: "/friends", label: "Go to Friends" } : undefined}
        />
      );
    }
    if (scope === "guild") {
      return (
        <EmptyState
          icon={<Trophy size={32} className="text-gray-600" />}
          title={hasGuild ? `No ${guildName ?? "guild"} members yet` : "You're not in a guild"}
          body={
            hasGuild
              ? "You're the only member of your guild on the board right now."
              : "Join a guild to see your guild-mates here."
          }
          link={!hasGuild ? { href: "/guilds", label: "Browse Guilds" } : undefined}
        />
      );
    }
    // Language filter emptied the board.
    return (
      <EmptyState
        icon={<Globe size={32} className="text-gray-600" />}
        title="No players match this filter"
        body={`Nobody on the board has completed a ${language} lesson yet. Be the first!`}
      />
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

        // Global rank position within the FULL unfiltered list.
        const globalRank = allPlayers.findIndex((p) => p.id === player.id) + 1;
        const showGlobalRank = scope !== "global" && globalRank > 0;

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
            {/* Rank within filtered view */}
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
                {showGlobalRank && (
                  <span className="ml-2 text-gray-600">#{globalRank} global</span>
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

function EmptyState({
  icon,
  title,
  body,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-6 py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
        {icon}
      </div>
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-gray-400">{body}</p>
      {link && (
        <Link
          href={link.href}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent-soft transition hover:bg-accent/20"
        >
          {link.label}
        </Link>
      )}
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
