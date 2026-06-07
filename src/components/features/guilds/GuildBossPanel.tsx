"use client";

// GuildBossPanel — weekly co-op boss section for the /guilds page.
//
// Fetches the guild_boss row for (guildId, currentWeek) from Supabase (SELECT
// only; damage is written via contribute_guild_boss_damage in scoring.ts).
// Renders a shared HP bar and defeated / in-progress state.
// Fully graceful: no-ops when Supabase isn't configured or the user has no guild.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swords, Shield, CheckCircle2, Loader2 } from "lucide-react";
import {
  bossForWeek,
  bossMaxHp,
  bossState,
  currentWeekKey,
  DAMAGE_PER_LESSON,
  type GuildBossDefinition,
  type GuildBossState,
} from "@/lib/guildBoss";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getGuild } from "@/lib/guilds";

// ── DB row type (mirrors migration 0008) ─────────────────────────────────────

type GuildBossRow = {
  id: string;
  guild_id: string;
  week: string;
  boss_id: string;
  total_damage: number;
  defeated: boolean;
  created_at: string;
};

// ── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  guildId: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

export function GuildBossPanel({ guildId }: Props) {
  const [loading, setLoading] = useState(true);
  const [totalDamage, setTotalDamage] = useState(0);
  const [error, setError] = useState(false);

  const weekKey = currentWeekKey();
  const boss: GuildBossDefinition = bossForWeek(weekKey, guildId);
  const maxHp = bossMaxHp(boss);
  const state: GuildBossState = bossState(totalDamage, maxHp);
  const guild = getGuild(guildId);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    const sb = getSupabaseBrowserClient();
    if (!sb) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchBossRow() {
      try {
        const { data, error: sbError } = await sb!
          .from("guild_boss")
          .select("total_damage, defeated")
          .eq("guild_id", guildId)
          .eq("week", weekKey)
          .maybeSingle();

        if (cancelled) return;

        if (sbError) {
          // Table may not exist yet in local dev — treat as graceful no-op.
          console.warn("[GuildBossPanel] fetch failed:", sbError.message);
          setError(true);
        } else if (data) {
          setTotalDamage((data as Pick<GuildBossRow, "total_damage" | "defeated">).total_damage ?? 0);
        }
        // data === null means no row yet → totalDamage stays 0 (undamaged boss).
      } catch (err) {
        if (!cancelled) {
          console.warn("[GuildBossPanel] fetch threw:", err);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBossRow();
    return () => {
      cancelled = true;
    };
  }, [guildId, weekKey]);

  // ── Render ─────────────────────────────────────────────────────────────────

  const hpBarColor = state.defeated
    ? "from-emerald-500 to-green-400"
    : state.pct > 0.6
    ? "from-red-600 to-rose-500"
    : state.pct > 0.25
    ? "from-amber-500 to-yellow-400"
    : "from-orange-400 to-amber-300";

  const tierLabel = ["", "I", "II", "III", "IV"][boss.tier] ?? boss.tier;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
        <Swords size={20} className="text-rose-400" />
        Weekly Guild Boss
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={[
          "rounded-2xl border p-5",
          state.defeated
            ? "border-emerald-500/40 bg-emerald-950/30"
            : "border-rose-500/30 bg-rose-950/20",
        ].join(" ")}
      >
        {/* Boss header */}
        <div className="flex items-start gap-4">
          <div className="text-5xl leading-none select-none">{boss.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-white">{boss.name}</h3>
              <span className="text-[11px] font-semibold rounded-full bg-rose-900/60 text-rose-300 px-2 py-0.5 border border-rose-700/50">
                Tier {tierLabel}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-gray-400 line-clamp-2">{boss.blurb}</p>
          </div>
        </div>

        {/* HP bar */}
        <div className="mt-5">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 size={14} className="animate-spin" />
              Loading guild progress…
            </div>
          ) : error && !isSupabaseConfigured ? (
            /* Supabase not wired up — show a static placeholder */
            <div className="text-xs text-gray-500 italic">
              Guild backend not configured — connect Supabase to track real damage.
            </div>
          ) : state.defeated ? (
            /* Defeated banner */
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 size={18} />
              Boss defeated this week — your guild won!
            </div>
          ) : (
            <>
              {/* HP numbers */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span className="flex items-center gap-1">
                  <Shield size={11} className="text-rose-400" />
                  Guild HP
                </span>
                <span className="font-mono tabular-nums">
                  {state.hpRemaining.toLocaleString()} / {maxHp.toLocaleString()}
                </span>
              </div>

              {/* Bar track */}
              <div className="h-3 rounded-full bg-surface-2 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${hpBarColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, state.pct * 100)}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                />
              </div>

              {/* Damage stats */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                <span>
                  {totalDamage.toLocaleString()} damage dealt
                  {guild ? ` by ${guild.name}` : ""}
                </span>
                <span>{Math.round((1 - state.pct) * 100)}% depleted</span>
              </div>

              {/* Call to action */}
              <p className="mt-3 text-xs text-gray-400 border-t border-line/40 pt-3">
                <span className="text-white font-medium">Complete lessons to deal damage.</span>{" "}
                Each lesson hits for{" "}
                <span className="text-rose-300 font-semibold">{DAMAGE_PER_LESSON} HP</span>.
                Work together to defeat it before the week resets.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
