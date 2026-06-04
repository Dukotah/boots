"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap, Trophy, Shield, CheckCircle, LogOut } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import {
  GUILDS,
  GUILD_TIERS,
  getGuild,
  seededMemberCount,
  seededWeeklyXp,
  type Guild,
} from "@/lib/guilds";

export default function GuildsPage() {
  const mounted = useMounted();
  const guildId = useGameStore((s) => s.guildId);
  const guildName = useGameStore((s) => s.guildName);
  const weeklyXp = useGameStore((s) => s.weeklyXp);
  const joinGuild = useGameStore((s) => s.joinGuild);
  const leaveGuild = useGameStore((s) => s.leaveGuild);

  const [joining, setJoining] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  if (!mounted) return <GuildsSkeleton />;

  const myGuild = guildId ? getGuild(guildId) : null;
  const filtered = filter === "all" ? GUILDS : GUILDS.filter((g) => g.focus.includes(filter));

  function handleJoin(guild: Guild) {
    setJoining(guild.id);
    setTimeout(() => {
      joinGuild(guild.id, guild.name);
      setJoining(null);
    }, 600);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
          Team Competition
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-white">
          Guilds
        </h1>
        <p className="mt-2 max-w-prose text-pretty text-gray-400">
          Join a guild to compete with a team, share weekly XP goals, and climb
          the guild leaderboard together. One guild at a time.
        </p>
      </div>

      {/* My Guild Banner */}
      {myGuild && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 rounded-2xl border border-accent/30 bg-gradient-to-r ${myGuild.color} p-5 shadow-glow`}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">{myGuild.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-white" />
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  My Guild
                </p>
              </div>
              <h2 className="text-xl font-bold text-white">{myGuild.name}</h2>
              <p className="text-sm text-white/70">{myGuild.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{weeklyXp.toLocaleString()}</p>
              <p className="text-xs text-white/60">your XP this week</p>
              <button
                onClick={leaveGuild}
                className="mt-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/20"
              >
                <LogOut size={12} /> Leave
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/60 mb-1">
              <span>Weekly XP Goal</span>
              <span>{Math.min(seededWeeklyXp(myGuild.id) + weeklyXp, myGuild.weeklyXpGoal).toLocaleString()} / {myGuild.weeklyXpGoal.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-white/70"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    ((seededWeeklyXp(myGuild.id) + weeklyXp) / myGuild.weeklyXpGoal) * 100,
                    100,
                  )}%`,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["all", "algorithms", "ai-llms", "javascript", "sql", "streaks"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              filter === f
                ? "bg-accent text-white"
                : "border border-line bg-surface text-gray-400 hover:border-accent/50 hover:text-white",
            ].join(" ")}
          >
            {f === "all" ? "All Guilds" : f}
          </button>
        ))}
      </div>

      {/* Guild Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((guild) => {
            const isMine = guild.id === guildId;
            const tier = GUILD_TIERS[guild.tier];
            const members = seededMemberCount(guild.id);
            const weekXp = seededWeeklyXp(guild.id) + (isMine ? weeklyXp : 0);
            const pct = Math.min((weekXp / guild.weeklyXpGoal) * 100, 100);

            return (
              <motion.div
                key={guild.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={[
                  "rounded-2xl border p-5 transition-colors",
                  isMine
                    ? "border-accent/40 bg-accent/10"
                    : "border-line bg-surface hover:border-accent/30",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${guild.color} text-2xl shadow`}>
                    {guild.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{guild.name}</h3>
                      <span className={`text-xs font-semibold ${tier.color}`}>
                        {tier.label}
                      </span>
                      {isMine && (
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-soft">
                          MEMBER
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-400 line-clamp-2">
                      {guild.description}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={12} /> {weekXp.toLocaleString()} XP/wk
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={12} /> {guild.tier}
                  </span>
                </div>

                {/* Weekly goal bar */}
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-[11px] text-gray-500">
                    <span>Weekly goal</span>
                    <span>{Math.round(pct)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${guild.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Focus tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {guild.focus.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-canvas/40 px-2 py-0.5 text-[11px] text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="mt-4">
                  {isMine ? (
                    <div className="flex items-center gap-2 text-sm font-medium text-success">
                      <CheckCircle size={15} /> You&apos;re a member
                    </div>
                  ) : (
                    <button
                      onClick={() => handleJoin(guild)}
                      disabled={joining === guild.id || (!!guildId && !isMine)}
                      className="btn-primary w-full disabled:opacity-50"
                    >
                      {joining === guild.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                          >
                            ⚙️
                          </motion.span>
                          Joining…
                        </span>
                      ) : guildId ? (
                        "Leave current guild first"
                      ) : (
                        <>
                          <Users size={14} className="inline mr-1" /> Join Guild
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Guild Leaderboard */}
      <section className="mt-14">
        <h2 className="mb-4 text-xl font-bold text-white">
          <Trophy size={20} className="inline mr-2 text-gold" />
          Guild Leaderboard
        </h2>
        <div className="rounded-2xl border border-line bg-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3 w-10">#</th>
                <th className="px-4 py-3">Guild</th>
                <th className="px-4 py-3 text-right">Members</th>
                <th className="px-4 py-3 text-right">Weekly XP</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">Tier</th>
              </tr>
            </thead>
            <tbody>
              {[...GUILDS]
                .map((g) => ({
                  ...g,
                  weekXp: seededWeeklyXp(g.id) + (g.id === guildId ? weeklyXp : 0),
                  members: seededMemberCount(g.id),
                }))
                .sort((a, b) => b.weekXp - a.weekXp)
                .map((g, idx) => {
                  const isMine = g.id === guildId;
                  const rankColor =
                    idx === 0
                      ? "text-yellow-400"
                      : idx === 1
                        ? "text-gray-300"
                        : idx === 2
                          ? "text-amber-600"
                          : "text-gray-500";
                  return (
                    <tr
                      key={g.id}
                      className={[
                        "border-b border-line/50 last:border-0 transition-colors",
                        isMine ? "bg-accent/10" : "hover:bg-surface-2",
                      ].join(" ")}
                    >
                      <td className={`px-4 py-3 font-bold ${rankColor}`}>{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{g.icon}</span>
                          <span className={isMine ? "font-bold text-white" : "text-gray-300"}>
                            {g.name}
                          </span>
                          {isMine && (
                            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-soft">
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400">{g.members}</td>
                      <td className="px-4 py-3 text-right font-semibold text-white">
                        {g.weekXp.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 text-right hidden sm:table-cell text-xs font-semibold ${GUILD_TIERS[g.tier].color}`}>
                        {GUILD_TIERS[g.tier].label}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function GuildsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="h-10 w-40 rounded-lg bg-surface-2 animate-pulse" />
      <div className="mt-4 h-4 w-80 rounded bg-surface animate-pulse" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-surface animate-pulse" />
        ))}
      </div>
    </div>
  );
}
