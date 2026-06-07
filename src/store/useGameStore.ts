"use client";

// ─────────────────────────────────────────────────────────────────────────────
// useGameStore — the single source of truth for client-side game state.
//
// This is the RPG engine: XP, gold, levels (via the curve in lib/levels), streak,
// completed lessons, the active quest, and unlocked achievements.
//
// Persistence is two-layered:
//   1. localStorage (zustand/persist) — instant, offline, the optimistic cache.
//   2. Supabase `profiles` row — when configured AND signed in, every mutation
//      fires a background upsert; on sign-in we pull + merge so progress made
//      while logged out is never lost.
// The UI never waits on the network.
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";
import { levelFromXp } from "@/lib/levels";
import { newlyUnlocked, getAchievement } from "@/lib/achievements";
import {
  getQuest,
  getWeeklyQuest,
  isQuestComplete,
  getChain,
  getChainStep,
  isChainStepComplete,
  chainStepKey,
  type DailySnapshot,
} from "@/lib/quests";
import { getShopItem, rollChest, rollBossChest, type BossLootResult } from "@/lib/shop";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { deriveBreadth } from "@/lib/progress";
import { SEASON_DAYS, resolveSeason, type SeasonResult } from "@/lib/leagues";
import { bossForSeason, bossState, type Boss, type BossState } from "@/lib/boss";
import {
  nextBox,
  isReviewDue,
  fsrsSchedule,
  type ReviewRecord,
  type Rating,
} from "@/lib/mastery";
import {
  earnedSkillPoints,
  talentEffects,
  getTalent,
  gateMet,
  RESPEC_COST,
} from "@/lib/talents";
import type { PlayerStats } from "@/types/game";
import { track } from "@/lib/analytics/track";
import {
  pickDaily,
  DAILY_BONUS_GOLD,
  DAILY_BONUS_XP,
  type DailyPick,
} from "@/lib/daily";
import { isDoubleXpActive } from "@/lib/events";

/** Build the full stats snapshot (core resources + derived breadth) from state. */
function buildStats(s: {
  xp: number;
  gold: number;
  streak: number;
  completed: string[];
}): PlayerStats {
  return {
    xp: s.xp,
    level: levelFromXp(s.xp).level,
    gold: s.gold,
    streak: s.streak,
    completedCount: s.completed.length,
    completedIds: s.completed,
    ...deriveBreadth(s.completed),
  };
}

/**
 * If the weekly league season has expired, resolve it (promote/relegate) and
 * start a fresh one. Returns the partial state update, or null if nothing to do.
 * Pure aside from reading `todayKey()` — forgiving: a long absence only ever
 * resolves one season, so being away for weeks never cascades relegations.
 */
function rolledSeason(
  s: {
    seasonStart: string | null;
    weeklyXp: number;
    leagueTier: number;
    streakFreezes: number;
  },
  freezePerWeek = 0,
): Partial<GameState> | null {
  const today = todayKey();
  // First ever — just open a season; nothing to resolve (no regen on the seed).
  if (s.seasonStart === null) return { seasonStart: today };
  if (dayDiff(s.seasonStart, today) < SEASON_DAYS) return null;
  const result = resolveSeason(s.weeklyXp, s.leagueTier);
  return {
    leagueTier: result.toTier,
    weeklyXp: 0,
    weeklyLessons: 0,
    seasonStart: today,
    lastSeasonResult: result,
    claimedWeeklyQuests: [], // new season → weekly quests reset
    // Sentinel talents regenerate streak freezes on each weekly roll.
    ...(freezePerWeek > 0
      ? { streakFreezes: s.streakFreezes + freezePerWeek }
      : {}),
  };
}

// ---- date helpers (local-day based) ----
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

/** Gold awarded alongside XP for a fresh lesson completion. Convenience currency. */
const GOLD_PER_XP = 0.5;

/**
 * Days subtracted from the streak on a missed day (no freeze in inventory).
 * Soft-decay instead of a hard reset: a long streak survives a lapse at some
 * cost, which dramatically reduces sunk-cost abandonment churn. A short streak
 * (< STREAK_DECAY_DAYS) floors at 1 so the player always has something to keep.
 */
const STREAK_DECAY_DAYS = 10;

/**
 * Gold cost to repair a broken streak of `lost` days: 25 gold per lost day,
 * capped at 500 so a long streak never becomes unaffordable. The cap makes
 * repair a meaningful-but-attainable gold sink rather than a hard paywall.
 */
export function streakRepairCost(lost: number): number {
  return Math.min(500, Math.max(0, Math.round(lost)) * 25);
}

export type SyncStatus = "idle" | "syncing" | "error";

export type CompletionResult = {
  gainedXp: number;
  gainedGold: number;
  gainedSkillPoints: number;
  leveledUp: boolean;
  newLevel: number;
  unlockedAchievements: string[];
};

export type GameState = {
  // ── core resources ──
  xp: number;
  gold: number;
  // ── progress ──
  completed: string[]; // "moduleSlug/lessonSlug"
  achievements: string[]; // unlocked achievement ids
  // ── streak ──
  streak: number;
  lastActiveDay: string | null;
  // Every local day the player completed at least one lesson — powers the heatmap.
  activeDays: string[];
  // ── streak protection (bought in the shop, auto-consumed on a missed day) ──
  streakFreezes: number;
  // The streak value that was just broken by a missed day and is still
  // recoverable via repairStreak() (null = nothing to repair). Set the moment a
  // gap-reset happens on the next completion; cleared on repair or a clean day.
  lostStreak: number | null;
  // ── daily activity (resets each local day) — powers Daily Quests ──
  dailyDay: string | null;
  dailyXp: number;
  dailyLessons: number;
  claimedQuests: string[]; // quest ids claimed *today*
  // ── daily challenge (the "problem of the day" loop) ──
  // The day key whose challenge bonus was last claimed ("claimed today" ===
  // dailyChallengeClaimed === todayKey()). Separate from the login streak.
  dailyChallengeClaimed: string | null;
  dailyChallengeStreak: number; // consecutive days the challenge was cleared
  dailyChallengeBest: number; // best daily-challenge streak ever reached
  // ── active quest ──
  activeQuest: string | null;
  // ── leagues (weekly competitive season) ──
  weeklyXp: number; // XP earned during the current season
  weeklyLessons: number; // lessons completed during the current season
  seasonStart: string | null; // local day-key when the current season began
  leagueTier: number; // index into LEAGUE_TIERS
  lastSeasonResult: SeasonResult | null; // surfaced once by the UI, then cleared
  claimedWeeklyQuests: string[]; // weekly quest ids claimed this season
  // ── quest chains (persistent, multi-step) ──
  claimedChainSteps: string[]; // "chainId/stepId" steps already claimed
  // ── boss battles ──
  claimedBosses: string[]; // boss ids whose defeat reward was claimed
  // ── spaced repetition ──
  reviews: Record<string, ReviewRecord>; // lessonId → Leitner review record
  // ── cosmetics (decorative; never power) ──
  cosmetics: string[]; // owned cosmetic item ids
  equipped: { flair: string | null; title: string | null; banner: string | null; border: string | null };
  // ── talents (spent skill points; earned SP is derived from progress) ──
  talents: string[]; // purchased talent ids
  // ── guilds ──
  guildId: string | null;
  guildName: string | null;
  // ── onboarding (learner intent chosen on first run; drives recommendations) ──
  goal: string | null; // LearnerGoal id from lib/goals
  onboarded: boolean; // has the learner seen + answered (or skipped) onboarding
  // ── sync revision (bumped on every server write; resolves last-writer-wins) ──
  rev: number;
  // ── transient UI signals (not persisted) ──
  lastLevelUp: number | null;
  recentAchievement: string | null;
  // Skill points earned by the latest completion (for the toast); null = none.
  recentSkillPoints: number | null;
  // The variable-roll result from the most-recently claimed boss chest; null = none.
  lastBossRoll: BossLootResult | null;
  // ── auth / sync (not persisted) ──
  user: User | null;
  session: Session | null;
  syncStatus: SyncStatus;

  // ── selectors ──
  isComplete: (id: string) => boolean;
  stats: () => PlayerStats;
  /** Today's activity, normalized (returns zeros if the stored day is stale). */
  today: () => DailySnapshot;
  /** Today's deterministic challenge + the player's status on it. */
  dailyChallenge: () => DailyPick & {
    completed: boolean;
    claimed: boolean;
    streak: number;
    best: number;
    bonusGold: number;
    bonusXp: number;
  };
  /** Current league season snapshot: tier index, days left, XP earned this season. */
  season: () => { tier: number; daysLeft: number; weeklyXp: number };
  /** This season's activity, for weekly quests (zeros if the season is stale). */
  weekly: () => DailySnapshot;
  /** Current weekly boss + live HP state for the player. */
  boss: () => { boss: Boss; state: BossState; claimed: boolean };
  /** Lesson ids whose spaced-repetition review is due (never-reviewed = due). */
  dueReviews: () => string[];
  /** Skill-point economy: earned (from progress), spent (on talents), available. */
  skillPoints: () => { earned: number; spent: number; available: number };

  // ── game actions ──
  /**
   * Record a lesson completion (first-time or re-review).
   *
   * @param id    - lessonId ("moduleSlug/lessonSlug")
   * @param xp    - XP awarded on first completion (ignored on re-reviews)
   * @param rating - FSRS review rating ("again" | "hard" | "good" | "easy").
   *                 Defaults to "good" when omitted (compatible with all existing
   *                 callers that don't pass a rating).
   */
  completeLesson: (id: string, xp: number, rating?: Rating) => CompletionResult;
  setActiveQuest: (id: string | null) => void;
  addGold: (amount: number) => void;
  spendGold: (amount: number) => boolean;
  /** Claim a completed daily quest's reward (once per day). Returns true if claimed. */
  claimQuest: (questId: string) => boolean;
  /** Claim today's daily-challenge bonus (requires the lesson genuinely done). Returns true if claimed. */
  claimDailyChallenge: () => boolean;
  /** Claim a completed weekly quest's reward (once per season). Returns true if claimed. */
  claimWeeklyQuest: (questId: string) => boolean;
  /** Claim the next available step of a quest chain. Returns true if claimed. */
  claimChainStep: (chainId: string, stepId: string) => boolean;
  /** Claim the reward for defeating this week's boss. Returns true if claimed. */
  claimBoss: (bossId: string) => boolean;
  /** Pay gold to restore a streak broken by a missed day. Returns true if repaired. */
  repairStreak: () => boolean;
  /** Buy a shop item. Returns a result describing the outcome (e.g. chest payout). */
  buyItem: (itemId: string) => { ok: boolean; chestGold?: number; owned?: boolean };
  /** Equip an owned cosmetic into its slot (toggles off if already equipped). */
  equipCosmetic: (itemId: string) => void;
  /** Buy a talent with skill points (checks prereqs + gate + affordability). */
  buyTalent: (id: string) => boolean;
  /** Refund all talents for gold (RESPEC_COST). Unlocked cosmetics are kept. */
  respecTalents: () => boolean;
  /** Join a guild by id and name. */
  joinGuild: (id: string, name: string) => void;
  /** Leave the current guild. */
  leaveGuild: () => void;
  /** Record the learner's onboarding goal (marks onboarding complete). */
  setGoal: (id: string | null) => void;
  /** Mark onboarding as seen without choosing a goal (the "skip" path). */
  dismissOnboarding: () => void;
  /** Resolve + roll the league season if it has expired (idempotent; call on mount). */
  checkSeason: () => void;
  clearLevelUp: () => void;
  clearRecentAchievement: () => void;
  clearRecentSkillPoints: () => void;
  clearSeasonResult: () => void;
  clearBossRoll: () => void;
  reset: () => void;

  // ── auth actions (called from AuthProvider) ──
  setSession: (session: Session | null) => void;
  syncToServer: () => Promise<void>;
  pullFromServer: () => Promise<void>;
};

// Persisted game data only (auth + transient signals are excluded).
const INITIAL = {
  xp: 0,
  gold: 0,
  completed: [] as string[],
  achievements: [] as string[],
  streak: 0,
  lastActiveDay: null as string | null,
  activeDays: [] as string[],
  streakFreezes: 0,
  lostStreak: null as number | null,
  dailyDay: null as string | null,
  dailyXp: 0,
  dailyLessons: 0,
  claimedQuests: [] as string[],
  dailyChallengeClaimed: null as string | null,
  dailyChallengeStreak: 0,
  dailyChallengeBest: 0,
  activeQuest: null as string | null,
  weeklyXp: 0,
  weeklyLessons: 0,
  seasonStart: null as string | null,
  leagueTier: 0,
  lastSeasonResult: null as SeasonResult | null,
  claimedWeeklyQuests: [] as string[],
  claimedChainSteps: [] as string[],
  claimedBosses: [] as string[],
  reviews: {} as Record<string, ReviewRecord>,
  cosmetics: [] as string[],
  equipped: { flair: null as string | null, title: null as string | null, banner: null as string | null, border: null as string | null },
  talents: [] as string[],
  guildId: null as string | null,
  guildName: null as string | null,
  goal: null as string | null,
  onboarded: false,
  rev: 0,
  lastLevelUp: null as number | null,
  recentAchievement: null as string | null,
  recentSkillPoints: null as number | null,
  lastBossRoll: null as BossLootResult | null,
};

// ── Supabase sync helpers — the live snapshot lives on the profiles row ──

type EquippedLoadout = {
  flair: string | null;
  title: string | null;
  banner: string | null;
  border: string | null;
};

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

const PROFILE_COLUMNS =
  "xp, gold, streak, last_active_day, completed, achievements, active_quest, " +
  "weekly_xp, league_tier, season_start, cosmetics, talents, equipped, " +
  "streak_freezes, guild_id, guild_name, " +
  "goal, onboarded, daily_challenge_claimed, daily_challenge_streak, " +
  "daily_challenge_best, rev";

async function upsertProfile(userId: string, snap: ProfileSnapshot): Promise<void> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return;
  await sb.from("profiles").upsert({ id: userId, ...snap }, { onConflict: "id" });
}

async function fetchProfile(userId: string): Promise<ProfileSnapshot | null> {
  const sb = getSupabaseBrowserClient();
  if (!sb) return null;
  const { data } = await sb
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", userId)
    .maybeSingle();
  return (data as ProfileSnapshot | null) ?? null;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      user: null,
      session: null,
      syncStatus: "idle" as SyncStatus,

      isComplete: (id) => get().completed.includes(id),

      stats: () => buildStats(get()),

      today: () => {
        const s = get();
        const fresh = s.dailyDay === todayKey();
        return {
          xp: fresh ? s.dailyXp : 0,
          lessons: fresh ? s.dailyLessons : 0,
          streak: s.streak,
        };
      },

      dailyChallenge: () => {
        const s = get();
        const today = todayKey();
        const pick = pickDaily(today);
        return {
          ...pick,
          completed: s.completed.includes(pick.id),
          claimed: s.dailyChallengeClaimed === today,
          streak: s.dailyChallengeStreak,
          best: s.dailyChallengeBest,
          bonusGold: DAILY_BONUS_GOLD,
          bonusXp: DAILY_BONUS_XP,
        };
      },

      season: () => {
        const s = get();
        const elapsed = s.seasonStart ? dayDiff(s.seasonStart, todayKey()) : 0;
        return {
          tier: s.leagueTier,
          daysLeft: Math.max(0, SEASON_DAYS - elapsed),
          weeklyXp: s.weeklyXp,
        };
      },

      weekly: () => {
        const s = get();
        // If the season has lapsed (a roll is pending), report zeros so weekly
        // quests don't show stale progress before checkSeason() runs.
        const expired =
          s.seasonStart !== null &&
          dayDiff(s.seasonStart, todayKey()) >= SEASON_DAYS;
        return {
          xp: expired ? 0 : s.weeklyXp,
          lessons: expired ? 0 : s.weeklyLessons,
          streak: s.streak,
        };
      },

      boss: () => {
        const s = get();
        const boss = bossForSeason(s.seasonStart);
        const elapsed = s.seasonStart ? dayDiff(s.seasonStart, todayKey()) : 0;
        return {
          boss,
          state: bossState(boss, elapsed, s.weeklyXp),
          claimed: s.claimedBosses.includes(boss.id),
        };
      },

      dueReviews: () => {
        const s = get();
        const today = todayKey();
        return s.completed.filter((id) => {
          const rec = s.reviews[id];
          if (!rec) return true; // completed but never reviewed → due
          return isReviewDue(rec, dayDiff(rec.last, today));
        });
      },

      skillPoints: () => {
        const earned = earnedSkillPoints(buildStats(get()));
        const spent = get().talents.reduce(
          (sum, id) => sum + (getTalent(id)?.cost ?? 0),
          0,
        );
        return { earned, spent, available: Math.max(0, earned - spent) };
      },

      completeLesson: (id, xp, rating = "good") => {
        // Roll the weekly league season over first if it expired, so this
        // completion's XP lands in the correct (possibly new) season. A roll also
        // regenerates Sentinel streak freezes.
        const seasonRoll = rolledSeason(
          get(),
          talentEffects(get().talents).freezePerWeek,
        );
        if (seasonRoll) set(seasonRoll);
        const state = get();
        const today = todayKey();
        // Skill points are derived from progress; capture the baseline so we can
        // report how many this completion earns (module/path finished, level-up).
        const beforeSP = earnedSkillPoints(buildStats(state));

        // Roll the daily counters over if the stored day is not today.
        const sameDay = state.dailyDay === today;
        const baseDailyXp = sameDay ? state.dailyXp : 0;
        const baseDailyLessons = sameDay ? state.dailyLessons : 0;
        const claimedQuests = sameDay ? state.claimedQuests : [];

        // Streak: same day = unchanged, yesterday = +1, gap = reset (unless a
        // Streak Freeze is in inventory, which is auto-consumed to save it).
        let streak = state.streak;
        let streakFreezes = state.streakFreezes;
        // Carry any still-pending repair forward by default; clear it whenever the
        // day resolves cleanly (continued, frozen, or first-ever).
        let lostStreak = state.lostStreak;
        if (state.lastActiveDay === null) {
          streak = 1;
          lostStreak = null;
        } else {
          const diff = dayDiff(state.lastActiveDay, today);
          if (diff === 0) streak = state.streak || 1; // same day → keep pending repair
          else if (diff === 1) {
            streak = state.streak + 1;
            lostStreak = null;
          } else if (streakFreezes > 0) {
            streak = state.streak + 1; // freeze saves the streak
            streakFreezes -= 1;
            lostStreak = null;
          } else {
            // Gap with no freeze → soft-decay instead of hard reset. Subtract
            // STREAK_DECAY_DAYS, flooring at 1 so there is always something left.
            // This prevents sunk-cost abandonment: a 120-day streak survives a
            // lapse at the cost of 10 days rather than being wiped entirely.
            const prevStreak = state.streak;
            const decayed = Math.max(1, prevStreak - STREAK_DECAY_DAYS);
            streak = decayed;
            // Store the AMOUNT lost (the delta), not the old absolute value.
            // repairStreak() adds this delta back on top of the current streak.
            // Only set if there's a meaningful amount to recover (≥2 days lost).
            lostStreak = prevStreak >= 2 ? prevStreak - decayed : null;
          }
        }

        // Re-completing refreshes the streak but never re-awards XP. The Scholar
        // branch *does* pay gold for clearing a review — but only one that was
        // genuinely DUE, so you can't farm it by re-completing the same lesson on
        // repeat the same day (the Leitner interval gates the next payout).
        if (state.completed.includes(id)) {
          const prevRec = state.reviews[id];
          const reviewWasDue =
            !prevRec || isReviewDue(prevRec, dayDiff(prevRec.last, today));
          const reviewGold = reviewWasDue
            ? talentEffects(state.talents).reviewGold
            : 0;
          set({
            gold: state.gold + reviewGold,
            streak,
            streakFreezes,
            lostStreak,
            lastActiveDay: today,
            activeDays: state.activeDays.includes(today)
              ? state.activeDays
              : [...state.activeDays, today],
            dailyDay: today,
            dailyXp: baseDailyXp,
            dailyLessons: baseDailyLessons,
            claimedQuests,
            // Re-completing is a review → apply FSRS scheduling.
            // fsrsSchedule handles legacy {box,last} records gracefully.
            reviews: {
              ...state.reviews,
              [id]: {
                ...fsrsSchedule(
                  state.reviews[id] ?? { box: 0, last: today },
                  rating,
                  today,
                ),
                last: today,
              },
            },
          });
          const unlocked = grantAchievements(get, set);
          const gainedSkillPoints = Math.max(
            0,
            earnedSkillPoints(buildStats(get())) - beforeSP,
          );
          if (gainedSkillPoints > 0) set({ recentSkillPoints: gainedSkillPoints });
          get().syncToServer();
          return {
            gainedXp: 0,
            gainedGold: reviewGold,
            gainedSkillPoints,
            leveledUp: false,
            newLevel: levelFromXp(state.xp).level,
            unlockedAchievements: unlocked,
          };
        }

        const prevLevel = levelFromXp(state.xp).level;
        // Double-XP Weekend: multiply the XP that feeds the player's level and
        // daily counter ONLY. Gold and weeklyXp deliberately stay on the raw
        // value so the league/gold economy invariants are never disturbed:
        //   • weeklyXp drives league promotion — doubling it would be pay-to-win.
        //   • gold is already constrained (the Leagues are explicitly pay-to-win-
        //     free per the Prospector comment below); doubling it on weekends
        //     would flood the gold economy without any corresponding cost.
        // The multiplier is pure and deterministic (Saturday/Sunday local time).
        const xpMultiplier = isDoubleXpActive() ? 2 : 1;
        const gainedXp = xp * xpMultiplier;
        const newXp = state.xp + gainedXp;
        const newLevel = levelFromXp(newXp).level;
        const leveledUp = newLevel > prevLevel;
        // Prospector talents boost gold: a percent multiplier on every lesson,
        // plus a flat bonus on the first lesson of the day. (Gold only — never
        // XP — so Leagues stay pay-to-win-free.)
        const fx = talentEffects(state.talents);
        const firstLessonToday = baseDailyLessons === 0;
        const gainedGold =
          Math.round(xp * GOLD_PER_XP * (1 + fx.goldMultPct / 100)) +
          (firstLessonToday ? fx.dailyGold : 0);

        set({
          xp: newXp,
          gold: state.gold + gainedGold,
          completed: [...state.completed, id],
          streak,
          streakFreezes,
          lostStreak,
          lastActiveDay: today,
          activeDays: state.activeDays.includes(today)
            ? state.activeDays
            : [...state.activeDays, today],
          dailyDay: today,
          dailyXp: baseDailyXp + gainedXp,
          dailyLessons: baseDailyLessons + 1,
          claimedQuests,
          weeklyXp: state.weeklyXp + xp,  // raw xp — league standing unaffected
          weeklyLessons: state.weeklyLessons + 1,
          // First completion seeds the spaced-repetition record at box 0
          // with FSRS defaults (stability=1 day, difficulty=5, reps=0).
          reviews: {
            ...state.reviews,
            [id]: { box: 0, last: today, stability: 1, difficulty: 5, reps: 0 },
          },
          lastLevelUp: leveledUp ? newLevel : state.lastLevelUp,
          activeQuest: state.activeQuest === id ? null : state.activeQuest,
        });

        const unlockedAchievements = grantAchievements(get, set);
        const gainedSkillPoints = Math.max(
          0,
          earnedSkillPoints(buildStats(get())) - beforeSP,
        );
        if (gainedSkillPoints > 0) set({ recentSkillPoints: gainedSkillPoints });
        get().syncToServer();

        // Funnel analytics (cookieless Plausible; no-ops when unconfigured).
        // first_all_green is the activation "magic moment" — fire it only on the
        // learner's very first completed lesson, not every fresh completion.
        track("lesson_completed", { lesson_id: id, xp: gainedXp });
        if (state.completed.length === 0) {
          track("first_all_green", { lesson_id: id });
        }

        return {
          gainedXp,
          gainedGold,
          gainedSkillPoints,
          leveledUp,
          newLevel,
          unlockedAchievements,
        };
      },

      setActiveQuest: (id) => {
        set({ activeQuest: id });
        get().syncToServer();
      },

      addGold: (amount) => {
        set((s) => ({ gold: Math.max(0, s.gold + amount) }));
        get().syncToServer();
      },

      spendGold: (amount) => {
        const { gold } = get();
        if (amount <= 0 || gold < amount) return false;
        set({ gold: gold - amount });
        get().syncToServer();
        return true;
      },

      claimQuest: (questId) => {
        const quest = getQuest(questId);
        if (!quest) return false;
        const snap = get().today();
        const claimed = get().dailyDay === todayKey() ? get().claimedQuests : [];
        if (claimed.includes(questId)) return false; // already claimed today
        if (!isQuestComplete(quest, snap)) return false; // not done yet
        set((s) => ({
          gold: s.gold + quest.rewardGold,
          xp: s.xp + (quest.rewardXp ?? 0),
          weeklyXp: s.weeklyXp + (quest.rewardXp ?? 0),
          claimedQuests: [...claimed, questId],
        }));
        grantAchievements(get, set);
        get().syncToServer();
        return true;
      },

      claimDailyChallenge: () => {
        const today = todayKey();
        const pick = pickDaily(today);
        // Integrity: the bonus is only payable once the lesson is GENUINELY
        // completed — never on a deep-link visit. Mirrors the achievement rule.
        if (!get().completed.includes(pick.id)) return false;
        if (get().dailyChallengeClaimed === today) return false; // already claimed
        const prev = get().dailyChallengeClaimed;
        // Streak continues only if the previous claim was exactly yesterday.
        const continued = prev !== null && dayDiff(prev, today) === 1;
        const streak = continued ? get().dailyChallengeStreak + 1 : 1;
        set((s) => ({
          gold: s.gold + DAILY_BONUS_GOLD,
          xp: s.xp + DAILY_BONUS_XP,
          // Daily-challenge XP counts toward the weekly league, same as quest XP.
          weeklyXp: s.weeklyXp + DAILY_BONUS_XP,
          dailyChallengeClaimed: today,
          dailyChallengeStreak: streak,
          dailyChallengeBest: Math.max(s.dailyChallengeBest, streak),
        }));
        track("daily_challenge_completed", { streak });
        grantAchievements(get, set);
        get().syncToServer();
        return true;
      },

      claimWeeklyQuest: (questId) => {
        const quest = getWeeklyQuest(questId);
        if (!quest) return false;
        if (get().claimedWeeklyQuests.includes(questId)) return false;
        if (!isQuestComplete(quest, get().weekly())) return false;
        set((s) => ({
          gold: s.gold + quest.rewardGold,
          xp: s.xp + (quest.rewardXp ?? 0),
          weeklyXp: s.weeklyXp + (quest.rewardXp ?? 0),
          claimedWeeklyQuests: [...s.claimedWeeklyQuests, questId],
        }));
        grantAchievements(get, set);
        get().syncToServer();
        return true;
      },

      claimChainStep: (chainId, stepId) => {
        const chain = getChain(chainId);
        const step = getChainStep(chainId, stepId);
        if (!chain || !step) return false;

        const key = chainStepKey(chainId, stepId);
        const claimed = get().claimedChainSteps;
        if (claimed.includes(key)) return false;

        // Steps unlock in order — every earlier step must be claimed first.
        const idx = chain.steps.findIndex((s) => s.id === stepId);
        for (let i = 0; i < idx; i++) {
          if (!claimed.includes(chainStepKey(chainId, chain.steps[i].id))) {
            return false;
          }
        }

        if (!isChainStepComplete(step, buildStats(get()))) return false;

        set((s) => ({
          gold: s.gold + step.rewardGold,
          xp: s.xp + (step.rewardXp ?? 0),
          weeklyXp: s.weeklyXp + (step.rewardXp ?? 0),
          claimedChainSteps: [...s.claimedChainSteps, key],
        }));
        grantAchievements(get, set);
        get().syncToServer();
        return true;
      },

      claimBoss: (bossId) => {
        const s = get();
        const boss = bossForSeason(s.seasonStart);
        if (boss.id !== bossId) return false;
        if (s.claimedBosses.includes(bossId)) return false;
        const elapsed = s.seasonStart ? dayDiff(s.seasonStart, todayKey()) : 0;
        if (!bossState(boss, elapsed, s.weeklyXp).defeated) return false;
        // Variable-reward roll: instead of the flat boss.rewardGold, open a loot
        // chest whose payout is a weighted multiplier of the base reward. EV ≈ 95%
        // of rewardGold — slightly below face value to stay economy-safe. XP stays
        // fixed (it drives level + league XP which must be deterministic).
        const roll = rollBossChest(Math.random(), boss.rewardGold);
        set((x) => ({
          gold: x.gold + roll.gold,
          xp: x.xp + boss.rewardXp,
          claimedBosses: [...x.claimedBosses, bossId],
          lastBossRoll: roll,
        }));
        grantAchievements(get, set);
        get().syncToServer();
        return true;
      },

      repairStreak: () => {
        const s = get();
        const lost = s.lostStreak;
        if (!lost || lost < 2) return false; // nothing recoverable
        const cost = streakRepairCost(lost);
        if (s.gold < cost) return false;
        // lostStreak is now the DELTA (days removed by decay), so add it back on
        // top of whatever the current decayed streak is. This is additive, not
        // absolute, so it works correctly regardless of what the streak is now.
        set({ gold: s.gold - cost, streak: s.streak + lost, lostStreak: null });
        get().syncToServer();
        return true;
      },

      buyItem: (itemId) => {
        const item = getShopItem(itemId);
        if (!item) return { ok: false };
        const { gold } = get();
        if (gold < item.cost) return { ok: false };

        if (item.kind === "streak-freeze") {
          set((s) => ({ gold: s.gold - item.cost, streakFreezes: s.streakFreezes + 1 }));
          get().syncToServer();
          return { ok: true };
        }

        if (item.kind === "cosmetic") {
          if (get().cosmetics.includes(item.id)) return { ok: false, owned: true };
          set((s) => ({ gold: s.gold - item.cost, cosmetics: [...s.cosmetics, item.id] }));
          get().syncToServer();
          return { ok: true };
        }

        // Mystery chest: pay the cost, win a weighted-random gold payout (mostly
        // a small loss, rare jackpots — see lib/shop.rollChest). The Prospector
        // "Tycoon" talent adds a flat chest-luck bonus to every roll.
        const roll = rollChest(
          Math.random(),
          talentEffects(get().talents).chestBonus,
        );
        set((s) => ({ gold: s.gold - item.cost + roll }));
        get().syncToServer();
        return { ok: true, chestGold: roll };
      },

      checkSeason: () => {
        const roll = rolledSeason(
          get(),
          talentEffects(get().talents).freezePerWeek,
        );
        if (roll) {
          set(roll);
          get().syncToServer();
        }
      },

      equipCosmetic: (itemId) => {
        const item = getShopItem(itemId);
        if (!item || item.kind !== "cosmetic" || !item.slot) return;
        if (!get().cosmetics.includes(itemId)) return; // must own it
        const slot = item.slot as "flair" | "title" | "banner" | "border";
        set((s) => ({
          equipped: {
            ...s.equipped,
            // Toggle off if this exact value is already equipped.
            [slot]: s.equipped[slot] === item.value ? null : item.value ?? null,
          },
        }));
        get().syncToServer();
      },

      buyTalent: (id) => {
        const talent = getTalent(id);
        if (!talent) return false;
        const s = get();
        if (s.talents.includes(id)) return false; // already owned
        // Prerequisites must all be owned.
        if (!talent.requires.every((r) => s.talents.includes(r))) return false;
        // Learning gate (if any) must be satisfied.
        if (!gateMet(talent.gate, buildStats(s))) return false;
        // Must be able to afford it.
        if (get().skillPoints().available < talent.cost) return false;

        // Cosmetic-effect talents (Luminary branch, Scholar keystone) also grant
        // ownership of a talent-exclusive cosmetic, so it's immediately equippable.
        const grantsCosmetic =
          talent.effect.kind === "cosmetic" ? talent.effect.cosmeticId : null;
        set({
          talents: [...s.talents, id],
          cosmetics:
            grantsCosmetic && !s.cosmetics.includes(grantsCosmetic)
              ? [...s.cosmetics, grantsCosmetic]
              : s.cosmetics,
        });
        get().syncToServer();
        return true;
      },

      respecTalents: () => {
        const s = get();
        if (s.talents.length === 0) return false; // nothing to refund
        if (s.gold < RESPEC_COST) return false;
        // Refund the points (clear talents) but KEEP unlocked cosmetics — identity
        // is permanent; respec only frees points to rebuild the active effects.
        set({ gold: s.gold - RESPEC_COST, talents: [] });
        get().syncToServer();
        return true;
      },

      joinGuild: (id, name) => {
        set({ guildId: id, guildName: name });
        get().syncToServer();
      },

      leaveGuild: () => {
        set({ guildId: null, guildName: null });
        get().syncToServer();
      },

      setGoal: (id) => {
        set({ goal: id, onboarded: true });
        get().syncToServer();
      },
      dismissOnboarding: () => {
        set({ onboarded: true });
        get().syncToServer();
      },

      clearLevelUp: () => set({ lastLevelUp: null }),
      clearRecentAchievement: () => set({ recentAchievement: null }),
      clearRecentSkillPoints: () => set({ recentSkillPoints: null }),
      clearSeasonResult: () => set({ lastSeasonResult: null }),
      clearBossRoll: () => set({ lastBossRoll: null }),

      reset: () => {
        set({ ...INITIAL });
        get().syncToServer();
      },

      // ── auth ──
      setSession: (session) => {
        set({ session, user: session?.user ?? null });
        if (session?.user) get().pullFromServer();
      },

      // Push local snapshot → Supabase (fire-and-forget, safe to call often).
      syncToServer: async () => {
        const s = get();
        if (!s.user || !isSupabaseConfigured) return;
        // Bump the revision so a later device knows this write is newer.
        const rev = s.rev + 1;
        set({ syncStatus: "syncing", rev });
        try {
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
          set({ syncStatus: "idle" });
        } catch {
          set({ syncStatus: "error" });
        }
      },

      // Pull server snapshot and merge (union) with local — used on sign-in.
      pullFromServer: async () => {
        const { user } = get();
        if (!user || !isSupabaseConfigured) return;
        const remote = await fetchProfile(user.id);
        if (!remote) {
          get().syncToServer(); // no row yet → seed it with local
          return;
        }
        const local = get();
        // Is the server snapshot newer than what THIS device last wrote? If so it
        // wins for consumable/preference fields (gold, freezes, equipped). The old
        // Math.max on gold would refund already-spent gold from a stale device.
        const remoteNewer = (remote.rev ?? 0) > local.rev;
        const union = (a: string[], b: string[] | null | undefined) =>
          Array.from(new Set([...a, ...(b ?? [])]));
        set({
          // Monotonic progress — keep the best of either side, always.
          xp: Math.max(local.xp, remote.xp ?? 0),
          streak: Math.max(local.streak, remote.streak ?? 0),
          weeklyXp: Math.max(local.weeklyXp, remote.weekly_xp ?? 0),
          leagueTier: Math.max(local.leagueTier, remote.league_tier ?? 0),
          // Additive sets — union so nothing earned/owned is ever dropped.
          completed: union(local.completed, remote.completed),
          achievements: union(local.achievements, remote.achievements),
          cosmetics: union(local.cosmetics, remote.cosmetics),
          talents: union(local.talents, remote.talents),
          // Consumable / preference — newest writer wins (via the rev counter).
          gold: remoteNewer ? remote.gold ?? local.gold : local.gold,
          streakFreezes: remoteNewer
            ? remote.streak_freezes ?? local.streakFreezes
            : local.streakFreezes,
          equipped: remoteNewer
            ? { ...local.equipped, ...(remote.equipped ?? {}) }
            : local.equipped,
          guildId: remoteNewer ? remote.guild_id ?? local.guildId : local.guildId,
          guildName: remoteNewer
            ? remote.guild_name ?? local.guildName
            : local.guildName,
          lastActiveDay: local.lastActiveDay ?? remote.last_active_day,
          activeQuest: local.activeQuest ?? remote.active_quest,
          seasonStart: local.seasonStart ?? remote.season_start,
          // ── new in 0007: goal / onboarding ──
          // `onboarded` is a one-way flag: once true on either side, stay true.
          onboarded: local.onboarded || (remote.onboarded ?? false),
          // `goal` — newest writer wins; fall back to whichever side has a value.
          goal: remoteNewer ? remote.goal ?? local.goal : local.goal ?? remote.goal,
          // ── new in 0007: daily challenge ──
          // All-time best is a high-water mark — always keep the max.
          dailyChallengeBest: Math.max(
            local.dailyChallengeBest,
            remote.daily_challenge_best ?? 0,
          ),
          // Streak + claim token are time-sensitive (reset on a missed day), so
          // the newest writer reflects ground truth.
          dailyChallengeStreak: remoteNewer
            ? remote.daily_challenge_streak ?? local.dailyChallengeStreak
            : local.dailyChallengeStreak,
          dailyChallengeClaimed: remoteNewer
            ? remote.daily_challenge_claimed ?? local.dailyChallengeClaimed
            : local.dailyChallengeClaimed,
          rev: Math.max(local.rev, remote.rev ?? 0),
        });
        get().syncToServer(); // push the merged result back (bumps rev again)
      },
    }),
    {
      name: "boots-progress",
      version: 2,
      // Persist data only — never the transient toast signals, auth, or action fns.
      partialize: (s) => ({
        xp: s.xp,
        gold: s.gold,
        completed: s.completed,
        achievements: s.achievements,
        streak: s.streak,
        lastActiveDay: s.lastActiveDay,
        activeDays: s.activeDays,
        streakFreezes: s.streakFreezes,
        lostStreak: s.lostStreak,
        dailyDay: s.dailyDay,
        dailyXp: s.dailyXp,
        dailyLessons: s.dailyLessons,
        claimedQuests: s.claimedQuests,
        dailyChallengeClaimed: s.dailyChallengeClaimed,
        dailyChallengeStreak: s.dailyChallengeStreak,
        dailyChallengeBest: s.dailyChallengeBest,
        activeQuest: s.activeQuest,
        weeklyXp: s.weeklyXp,
        weeklyLessons: s.weeklyLessons,
        seasonStart: s.seasonStart,
        leagueTier: s.leagueTier,
        lastSeasonResult: s.lastSeasonResult,
        claimedWeeklyQuests: s.claimedWeeklyQuests,
        claimedChainSteps: s.claimedChainSteps,
        claimedBosses: s.claimedBosses,
        reviews: s.reviews,
        cosmetics: s.cosmetics,
        equipped: s.equipped,
        talents: s.talents,
        guildId: s.guildId,
        guildName: s.guildName,
        goal: s.goal,
        onboarded: s.onboarded,
        rev: s.rev,
      }),
      // A no-op migrate keeps an older persisted blob intact across version
      // bumps; without it, a bump could silently drop the stored state.
      migrate: (persisted) => persisted as GameState,
      merge: (persisted, current) => ({
        ...current,
        ...((persisted as Partial<GameState>) ?? {}),
      }),
    },
  ),
);

/**
 * Evaluate the achievement catalog against current stats, persist any new unlocks
 * (plus bonus rewards), and surface the newest one for the toast.
 */
function grantAchievements(
  get: () => GameState,
  set: (partial: Partial<GameState>) => void,
): string[] {
  const s = get();
  const stats = buildStats(s);

  const fresh = newlyUnlocked(stats, s.achievements);
  if (fresh.length === 0) return [];

  let bonusXp = 0;
  let bonusGold = 0;
  for (const id of fresh) {
    const def = getAchievement(id);
    bonusXp += def?.rewardXp ?? 0;
    bonusGold += def?.rewardGold ?? 0;
  }

  set({
    achievements: [...s.achievements, ...fresh],
    xp: s.xp + bonusXp,
    gold: s.gold + bonusGold,
    // NOTE: achievement bonus XP is deliberately NOT added to weeklyXp. A
    // gold-gated achievement would otherwise pipe gold → weekly League standing,
    // breaking the no-pay-to-win invariant. Achievements are milestones, not
    // weekly effort, so they count toward total XP/level only.
    recentAchievement: fresh[fresh.length - 1],
  });

  return fresh;
}
