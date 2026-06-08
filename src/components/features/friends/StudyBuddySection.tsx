"use client";

// ─────────────────────────────────────────────────────────────────────────────
// StudyBuddySection — renders the Study Buddy panel on /friends.
//
// A learner can promote ONE followed friend to their Study Buddy. The pair
// streak advances when BOTH users were active on the same local day, checked
// client-side on page load. Persisted in the `study_buddies` Supabase table.
//
// Graceful degradation: all Supabase calls are guarded by isSupabaseConfigured
// and user != null, matching the pattern used by the parent friends page.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { Flame, HeartHandshake, UserMinus } from "lucide-react";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import {
  advancePairStreak,
  todayKey,
  type PairStreakRow,
} from "@/lib/pairStreaks";
import type { User } from "@supabase/supabase-js";

// ── Types ─────────────────────────────────────────────────────────────────────

type Friend = { id: string; username: string };

type BuddyProfile = {
  buddyId: string;
  username: string;
  pairStreak: number;
  lastAdvanced: string | null;
  bothActiveToday: boolean;
};

type Props = {
  /** Current auth user (null = signed out). */
  user: User | null;
  /** Followed friends list (from the parent page). */
  friends: Friend[];
  /** Called after promote/demote so the parent can refresh if needed. */
  onChanged?: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function StudyBuddySection({ user, friends, onChanged }: Props) {
  const [buddy, setBuddy] = useState<BuddyProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const flash = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(null), 3500);
  };

  // ── Load + advance pair streak ────────────────────────────────────────────

  const load = useCallback(async () => {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;

    setLoading(true);
    try {
      // Fetch this user's study_buddy row (if any).
      const { data: rows } = await sb
        .from("study_buddies")
        .select("*")
        .eq("user_id", user.id)
        .limit(1);

      const row = (rows ?? [])[0] as PairStreakRow | undefined;
      if (!row) {
        setBuddy(null);
        return;
      }

      // Fetch both profiles' last_active_day.
      const { data: profs } = await sb
        .from("profiles")
        .select("id, username, last_active_day")
        .in("id", [user.id, row.buddy_id]);

      const profMap = Object.fromEntries(
        ((profs ?? []) as { id: string; username: string; last_active_day: string | null }[]).map(
          (p) => [p.id, p],
        ),
      );

      const userProf = profMap[user.id];
      const buddyProf = profMap[row.buddy_id];
      const buddyUsername = buddyProf?.username ?? "your buddy";
      const today = todayKey();

      const result = advancePairStreak({
        userLastActive: userProf?.last_active_day ?? null,
        buddyLastActive: buddyProf?.last_active_day ?? null,
        today,
        pairStreak: row.pair_streak,
        lastAdvanced: row.last_advanced,
      });

      // Persist changes only when something actually changed.
      if (result.advancedToday || result.pairStreak !== row.pair_streak) {
        await sb
          .from("study_buddies")
          .update({
            pair_streak: result.pairStreak,
            last_advanced: result.lastAdvanced,
          })
          .eq("id", row.id);
      }

      setBuddy({
        buddyId: row.buddy_id,
        username: buddyUsername,
        pairStreak: result.pairStreak,
        lastAdvanced: result.lastAdvanced,
        bothActiveToday: result.bothActiveToday,
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isSupabaseConfigured && user) load();
  }, [user, load]);

  // ── Promote a followed friend to study buddy ──────────────────────────────

  async function promote(friendId: string, username: string) {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;

    // Remove any existing buddy first (one buddy per user).
    await sb.from("study_buddies").delete().eq("user_id", user.id);

    const { error } = await sb.from("study_buddies").insert({
      user_id: user.id,
      buddy_id: friendId,
      pair_streak: 0,
      last_advanced: null,
    });

    if (error) {
      flash("Could not set study buddy — please try again.");
      return;
    }

    flash(`@${username} is now your Study Buddy!`);
    onChanged?.();
    load();
  }

  // ── Demote (remove) the current study buddy ───────────────────────────────

  async function demote() {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;

    await sb.from("study_buddies").delete().eq("user_id", user.id);
    setBuddy(null);
    flash("Study Buddy removed.");
    onChanged?.();
  }

  // ── Guard: no-op render when Supabase isn't configured or not signed in ───

  if (!isSupabaseConfigured || !user) return null;

  // ── Eligible friends (all followed friends — user picks one) ─────────────

  const eligible = friends.filter((f) => f.id !== buddy?.buddyId);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="mt-10" aria-labelledby="study-buddy-heading">
      <h2
        id="study-buddy-heading"
        className="mb-1 text-lg font-semibold text-white"
      >
        Study Buddy
      </h2>
      <p className="mb-3 text-sm text-gray-400">
        Pair up with one friend. Your shared streak advances any day you
        both learn — keeping each other accountable.
      </p>

      {/* Flash message */}
      {msg && (
        <p role="status" aria-live="polite" className="mb-3 text-xs text-accent-soft">
          {msg}
        </p>
      )}

      {/* Current buddy card */}
      {buddy && (
        <div className="card mb-4 flex items-center gap-3 py-3">
          <HeartHandshake size={18} className="shrink-0 text-accent-soft" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-white">
              You + @{buddy.username}
            </p>
            {buddy.bothActiveToday ? (
              <p className="text-xs text-green-400">
                Both active today — streak protected!
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                Complete a lesson today to keep your shared streak.
              </p>
            )}
          </div>
          {/* Pair streak flame */}
          <div
            className="flex items-center gap-1 text-sm font-bold text-orange-400"
            aria-label={`Pair streak: ${buddy.pairStreak} days`}
          >
            <Flame size={16} aria-hidden="true" />
            <span>{buddy.pairStreak}</span>
          </div>
          <button
            onClick={demote}
            className="text-gray-400 hover:text-danger"
            title="Remove Study Buddy"
            aria-label={`Remove @${buddy.username} as Study Buddy`}
          >
            <UserMinus size={15} />
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && !buddy && (
        <p className="text-xs text-gray-400">Loading…</p>
      )}

      {/* Promote a friend */}
      {!buddy && !loading && (
        <>
          {eligible.length === 0 ? (
            <div className="card flex flex-col items-center gap-2 py-8 text-center">
              <HeartHandshake size={28} className="text-gray-400" aria-hidden="true" />
              <p className="text-sm text-gray-400">
                Follow at least one friend to set a Study Buddy.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {eligible.map((f) => (
                <div
                  key={f.id}
                  className="card flex items-center gap-3 py-2.5"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-white">
                    @{f.username}
                  </span>
                  <button
                    onClick={() => promote(f.id, f.username)}
                    className="btn-ghost px-2 py-1 text-xs"
                    aria-label={`Set @${f.username} as your Study Buddy`}
                  >
                    <HeartHandshake size={13} /> Pair up
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Swap buddy option when one is already set */}
      {buddy && eligible.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-300">
            Switch Study Buddy
          </summary>
          <div className="mt-2 space-y-2">
            {eligible.map((f) => (
              <div key={f.id} className="card flex items-center gap-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-sm text-white">
                  @{f.username}
                </span>
                <button
                  onClick={() => promote(f.id, f.username)}
                  className="btn-ghost px-2 py-1 text-xs"
                  aria-label={`Switch Study Buddy to @${f.username}`}
                >
                  <HeartHandshake size={13} /> Pair up
                </button>
              </div>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
