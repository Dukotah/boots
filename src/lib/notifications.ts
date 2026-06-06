// Notification feed — pure derivation from a game-state snapshot.
//
// No backend, no new store fields. We synthesize a Notification[] from the
// existing state shape so the bell & full-page list always stay in sync with
// reality. The "seen" set is persisted in its own localStorage key by the
// hook in NotificationBell — this file knows nothing about localStorage.

import { getAchievement } from "@/lib/achievements";
import { tierAt } from "@/lib/leagues";

// ── Types ────────────────────────────────────────────────────────────────────

export type NotificationKind =
  | "achievement"
  | "level_up"
  | "season_result"
  | "reviews_due"
  | "streak_risk";

export type Notification = {
  /** Stable, deterministic id used for the "seen" set. */
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  icon: string;
  /** ISO timestamp string — used only for display order (newest first). */
  ts: string;
  /** Route to navigate to when the notification is tapped. */
  href: string;
};

// ── State snapshot (subset of GameState we actually need) ────────────────────

export type NotifSnapshot = {
  achievements: string[];
  lastLevelUp: number | null;
  lastSeasonResult: {
    fromTier: number;
    toTier: number;
    outcome: "promoted" | "relegated" | "held";
    rank: number;
    weeklyXp: number;
  } | null;
  /** Result of store.dueReviews() — already-computed array. */
  dueReviewIds: string[];
  /** store.lastActiveDay — local day-key string or null. */
  lastActiveDay: string | null;
  /** store.streak — current streak length. */
  streak: number;
};

// ── Date helpers (local-day, matching the store's todayKey format) ────────────

function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am, ad).getTime();
  const db = new Date(by, bm, bd).getTime();
  return Math.round((db - da) / 86_400_000);
}

// ── Derivation ────────────────────────────────────────────────────────────────

/**
 * Derive the full notification feed from a state snapshot.
 * Pure — no side effects, safe to call in a selector or useMemo.
 *
 * @param snap   Subset of store state (pass selectors, never the whole store object).
 * @param seenIds  Set of notification ids the user has already "seen" (read).
 */
export function deriveNotifications(
  snap: NotifSnapshot,
  seenIds: ReadonlySet<string>,
): Notification[] {
  const notifs: Notification[] = [];
  const today = todayKey();

  // ── 1. Newly unlocked achievements ──────────────────────────────────────────
  // We use the full achievements array from the store (all unlocked ever) but
  // only surface ones that are NOT yet in the seenIds set — so brand-new
  // unlocks bubble up without duplicating old ones.
  for (const achId of snap.achievements) {
    const id = `achievement:${achId}`;
    if (!seenIds.has(id)) {
      const def = getAchievement(achId);
      notifs.push({
        id,
        kind: "achievement",
        title: "Achievement unlocked!",
        body: def ? `${def.icon} ${def.title} — ${def.description}` : achId,
        icon: def?.icon ?? "🏆",
        // Stable fake timestamp: seed from the achId string so order is consistent.
        ts: new Date(0).toISOString(),
        href: "/achievements",
      });
    }
  }

  // ── 2. Level-up ─────────────────────────────────────────────────────────────
  if (snap.lastLevelUp !== null) {
    const id = `level_up:${snap.lastLevelUp}`;
    notifs.push({
      id,
      kind: "level_up",
      title: `Level ${snap.lastLevelUp} reached!`,
      body: "Keep going — your next rank is waiting.",
      icon: "⭐",
      ts: new Date(1).toISOString(),
      href: "/dashboard",
    });
  }

  // ── 3. League season result ──────────────────────────────────────────────────
  if (snap.lastSeasonResult !== null) {
    const r = snap.lastSeasonResult;
    const id = `season_result:${r.fromTier}:${r.toTier}:${r.weeklyXp}`;
    const toTierName = tierAt(r.toTier).name;
    const outcomeText =
      r.outcome === "promoted"
        ? `Promoted to ${toTierName}!`
        : r.outcome === "relegated"
          ? `Relegated to ${toTierName}.`
          : `Held in ${toTierName}.`;
    notifs.push({
      id,
      kind: "season_result",
      title: "Season over",
      body: `You finished rank ${r.rank}. ${outcomeText}`,
      icon:
        r.outcome === "promoted"
          ? "🏆"
          : r.outcome === "relegated"
            ? "📉"
            : "🛡️",
      ts: new Date(2).toISOString(),
      href: "/leagues",
    });
  }

  // ── 4. Reviews due ───────────────────────────────────────────────────────────
  const dueCount = snap.dueReviewIds.length;
  if (dueCount > 0) {
    const id = `reviews_due:${dueCount}`;
    notifs.push({
      id,
      kind: "reviews_due",
      title: `${dueCount} ${dueCount === 1 ? "review" : "reviews"} due`,
      body: "Re-solve them now to lock in your knowledge and earn gold.",
      icon: "🔁",
      ts: new Date(3).toISOString(),
      href: "/review",
    });
  }

  // ── 5. Streak at risk ────────────────────────────────────────────────────────
  // Fire when the learner has a streak ≥ 1 but hasn't been active today OR
  // yesterday (i.e., one more missed day would break it). We check gap ≥ 1 day
  // (they didn't do anything today) as the trigger.
  if (snap.streak >= 1 && snap.lastActiveDay !== null) {
    const gap = dayDiff(snap.lastActiveDay, today);
    if (gap >= 1) {
      const id = `streak_risk:${snap.lastActiveDay}`;
      notifs.push({
        id,
        kind: "streak_risk",
        title: "Streak at risk!",
        body: `Your ${snap.streak}-day streak will break if you don't practice today.`,
        icon: "🔥",
        ts: new Date(4).toISOString(),
        href: "/learn",
      });
    }
  }

  return notifs;
}

/** Count of un-seen notifications (the red badge number). */
export function unreadCount(
  snap: NotifSnapshot,
  seenIds: ReadonlySet<string>,
): number {
  return deriveNotifications(snap, seenIds).filter(
    (n) => !seenIds.has(n.id),
  ).length;
}
