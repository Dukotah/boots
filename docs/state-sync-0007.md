# State-sync 0007 — wiring guide for `useGameStore.ts`

Migration `0007_client_state_sync.sql` adds five columns to `profiles`:

| Column | Type | Default |
|---|---|---|
| `goal` | text | null |
| `onboarded` | boolean | false |
| `daily_challenge_claimed` | text | null |
| `daily_challenge_streak` | integer | 0 |
| `daily_challenge_best` | integer | 0 |

This document gives the exact code changes needed in
`src/store/useGameStore.ts` to keep these fields in sync. **Do not edit
`useGameStore.ts` without this guide open** — the snippets below show the
minimal targeted diff against the current file.

---

## 1 — `ProfileSnapshot` type

Add five fields to the existing `ProfileSnapshot` type (around line 331).
The type currently ends at `rev: number`. Extend it:

```ts
type ProfileSnapshot = {
  xp: number;
  gold: number;
  streak: number;
  last_active_day: string | null;
  completed: string[];
  achievements: string[];
  active_quest: string | null;
  weekly_xp: number;
  league_tier: number;
  season_start: string | null;
  cosmetics: string[];
  talents: string[];
  equipped: EquippedLoadout;
  streak_freezes: number;
  guild_id: string | null;
  guild_name: string | null;
  // ── new in 0007 ──
  goal: string | null;
  onboarded: boolean;
  daily_challenge_claimed: string | null;
  daily_challenge_streak: number;
  daily_challenge_best: number;
  // Monotonic sync revision — bumped on every write; used for last-writer-wins.
  rev: number;
};
```

---

## 2 — `PROFILE_COLUMNS` string

Append the five new column names to the `select` projection (around line 352).
The existing string is:

```ts
const PROFILE_COLUMNS =
  "xp, gold, streak, last_active_day, completed, achievements, active_quest, " +
  "weekly_xp, league_tier, season_start, cosmetics, talents, equipped, " +
  "streak_freezes, guild_id, guild_name, rev";
```

Replace it with:

```ts
const PROFILE_COLUMNS =
  "xp, gold, streak, last_active_day, completed, achievements, active_quest, " +
  "weekly_xp, league_tier, season_start, cosmetics, talents, equipped, " +
  "streak_freezes, guild_id, guild_name, " +
  "goal, onboarded, daily_challenge_claimed, daily_challenge_streak, " +
  "daily_challenge_best, rev";
```

---

## 3 — `partialize` (persist middleware)

`goal` and `onboarded` are already in `partialize` (they were added when the
fields were introduced). `dailyChallengeClaimed`, `dailyChallengeStreak`, and
`dailyChallengeBest` are also already present in the current `partialize`
block. **No change is needed here** — all five fields are already being
persisted to localStorage.

Confirm by checking the block starting at line 972 in the current file:

```ts
partialize: (s) => ({
  // ...
  dailyChallengeClaimed: s.dailyChallengeClaimed,   // ✓ already present
  dailyChallengeStreak: s.dailyChallengeStreak,     // ✓ already present
  dailyChallengeBest: s.dailyChallengeBest,         // ✓ already present
  // ...
  goal: s.goal,       // ✓ already present
  onboarded: s.onboarded,  // ✓ already present
  // ...
}),
```

If any of these are missing, add them alongside the surrounding streak fields.

---

## 4 — `syncToServer` payload

Inside `syncToServer` (around line 896), the `upsertProfile` call builds the
object literal passed to Supabase. Add the five new fields to the end of that
literal, just before the closing `rev,` line:

```ts
await upsertProfile(s.user.id, {
  xp: s.xp,
  gold: s.gold,
  streak: s.streak,
  last_active_day: s.lastActiveDay,
  completed: s.completed,
  achievements: s.achievements,
  active_quest: s.activeQuest,
  weekly_xp: s.weeklyXp,
  league_tier: s.leagueTier,
  season_start: s.seasonStart,
  cosmetics: s.cosmetics,
  talents: s.talents,
  equipped: s.equipped,
  streak_freezes: s.streakFreezes,
  guild_id: s.guildId,
  guild_name: s.guildName,
  // ── new in 0007 ──
  goal: s.goal,
  onboarded: s.onboarded,
  daily_challenge_claimed: s.dailyChallengeClaimed,
  daily_challenge_streak: s.dailyChallengeStreak,
  daily_challenge_best: s.dailyChallengeBest,
  rev,
});
```

---

## 5 — `pullFromServer` merge with last-writer-wins

Inside `pullFromServer` (around line 936), extend the `set({...})` call with
merge rules for each new field. Add after the `rev: Math.max(...)` line:

```ts
set({
  // ...existing fields unchanged...

  // ── new in 0007: goal / onboarding ──
  // `onboarded` is a one-way flag: once true on either side, stay true.
  onboarded: local.onboarded || (remote.onboarded ?? false),
  // `goal` — newest writer wins; fall back to whichever side has a value.
  goal: remoteNewer
    ? (remote.goal ?? local.goal)
    : (local.goal ?? remote.goal),

  // ── new in 0007: daily challenge ──
  // `dailyChallengeBest` is a high-water mark — always keep the max.
  dailyChallengeBest: Math.max(
    local.dailyChallengeBest,
    remote.daily_challenge_best ?? 0,
  ),
  // `dailyChallengeStreak` and `dailyChallengeClaimed` are time-sensitive
  // (the streak resets on a missed day), so newest writer wins.
  dailyChallengeStreak: remoteNewer
    ? (remote.daily_challenge_streak ?? local.dailyChallengeStreak)
    : local.dailyChallengeStreak,
  dailyChallengeClaimed: remoteNewer
    ? (remote.daily_challenge_claimed ?? local.dailyChallengeClaimed)
    : local.dailyChallengeClaimed,
});
```

---

## Merge-rule rationale summary

| Field | Rule | Why |
|---|---|---|
| `goal` | last-writer-wins (rev) with non-null fallback | A learner may update their goal; stale devices should not clobber a deliberate change |
| `onboarded` | `local \|\| remote` (monotone true) | Onboarding is a one-time event; once seen it must never re-appear on any device |
| `dailyChallengeBest` | `Math.max` | All-time personal best; can only grow |
| `dailyChallengeStreak` | last-writer-wins (rev) | Streak resets on a missed day, so the most-recent write reflects the ground truth |
| `dailyChallengeClaimed` | last-writer-wins (rev) | Day-key claim token; most recent device to claim knows the actual state |
