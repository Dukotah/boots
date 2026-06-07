/**
 * useGameStore unit tests.
 *
 * Strategy: we import the store module directly (not via React hooks) so we
 * can call actions synchronously without a browser or component tree.
 *
 * Mocks needed:
 *   - @/lib/supabase/client — no real Supabase in tests
 *   - @/lib/analytics/track — no Plausible in tests
 *
 * Zustand's `persist` middleware writes to localStorage; jsdom provides a
 * minimal localStorage implementation so persist never throws.  We call
 * `reset()` (the store's own action) between tests to start from a known
 * clean state.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Mock Supabase before the store is imported ────────────────────────────────
vi.mock("@/lib/supabase/client", () => ({
  isSupabaseConfigured: false,
  getSupabaseBrowserClient: () => null,
}));

// ── Mock analytics (Plausible is absent in jsdom) ─────────────────────────────
vi.mock("@/lib/analytics/track", () => ({
  track: vi.fn(),
}));

// ── Import AFTER mocks are registered ────────────────────────────────────────
import { useGameStore, streakRepairCost } from "./useGameStore";
import { xpForLevel, levelFromXp } from "@/lib/levels";
import { DAILY_BONUS_GOLD, DAILY_BONUS_XP, pickDaily, dayKeyOf } from "@/lib/daily";
import { DAILY_QUESTS } from "@/lib/quests";
import { isDoubleXpActive } from "@/lib/events";

// Lessons award 2x XP during double-XP weekends, so player/daily XP assertions
// must account for the multiplier to stay deterministic any day of the week.
// (League weeklyXp + gold intentionally use raw XP, so those tests are unaffected.)
const XP_MULT = isDoubleXpActive() ? 2 : 1;

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Reset the store to its empty initial state before every test. */
function resetStore() {
  useGameStore.getState().reset();
}

/** Get the current store state. */
const gs = () => useGameStore.getState();

// A real lesson id that exists in the curriculum (from the "beginner" module).
// The exact slug is verified by grepping curriculum/beginner.ts.
const LESSON_ID = "beginner/first-function";
const LESSON_XP = 15;

// ── streakRepairCost (pure helper, no store needed) ───────────────────────────

describe("streakRepairCost", () => {
  it("0 lost days → 0 cost", () => {
    expect(streakRepairCost(0)).toBe(0);
  });

  it("1 lost day → 25 gold", () => {
    expect(streakRepairCost(1)).toBe(25);
  });

  it("2 lost days → 50 gold", () => {
    expect(streakRepairCost(2)).toBe(50);
  });

  it("caps at 500 gold for very long lost streaks", () => {
    expect(streakRepairCost(9999)).toBe(500);
  });

  it("negative input → 0", () => {
    expect(streakRepairCost(-5)).toBe(0);
  });
});

// ── completeLesson — XP and gold ──────────────────────────────────────────────

describe("completeLesson — XP and gold", () => {
  beforeEach(resetStore);

  it("awards the specified XP on first completion", () => {
    const result = gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(result.gainedXp).toBe(LESSON_XP * XP_MULT);
    expect(gs().xp).toBe(LESSON_XP * XP_MULT);
  });

  it("awards gold alongside XP (GOLD_PER_XP ratio)", () => {
    const result = gs().completeLesson(LESSON_ID, LESSON_XP);
    // GOLD_PER_XP = 0.5 → gainedGold = Math.round(xp * 0.5)
    expect(result.gainedGold).toBe(Math.round(LESSON_XP * 0.5));
    // The lesson's own gold is included in the balance; first-completion
    // achievements may stack additional gold, so the total is >= gainedGold.
    expect(gs().gold).toBeGreaterThanOrEqual(result.gainedGold);
  });

  it("marks the lesson as complete in the completed array", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(gs().completed).toContain(LESSON_ID);
    expect(gs().isComplete(LESSON_ID)).toBe(true);
  });

  it("does NOT re-award XP on re-completion", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    const xpAfterFirst = gs().xp;

    const result = gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(result.gainedXp).toBe(0);
    // Gold may change (scholar review gold), but XP should not increase by lesson XP.
    expect(gs().xp).toBeGreaterThanOrEqual(xpAfterFirst);
    expect(gs().xp).toBeLessThan(xpAfterFirst + LESSON_XP);
  });

  it("completing two different lessons accumulates XP", () => {
    const ID2 = "beginner/variables";
    const XP2 = 10;
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().completeLesson(ID2, XP2);
    expect(gs().xp).toBeGreaterThanOrEqual(LESSON_XP + XP2);
  });
});

// ── completeLesson — level-up ─────────────────────────────────────────────────

describe("completeLesson — level-up", () => {
  beforeEach(resetStore);

  it("returns leveledUp=true when crossing a level boundary", () => {
    // Level 1 → 2 costs xpForLevel(1) = 80 XP.
    const cost = xpForLevel(1);
    const result = gs().completeLesson("beginner/first-function", cost);
    expect(result.leveledUp).toBe(true);
    expect(result.newLevel).toBeGreaterThan(1);
  });

  it("returns leveledUp=false when staying within the same level", () => {
    const result = gs().completeLesson(LESSON_ID, LESSON_XP); // 15 XP < 80 threshold
    expect(result.leveledUp).toBe(false);
  });

  it("lastLevelUp is set when leveling up", () => {
    const cost = xpForLevel(1);
    gs().completeLesson("beginner/lv-trigger", cost);
    expect(gs().lastLevelUp).not.toBeNull();
    expect(gs().lastLevelUp).toBeGreaterThan(1);
  });

  it("clearLevelUp sets lastLevelUp to null", () => {
    const cost = xpForLevel(1);
    gs().completeLesson("beginner/lv-trigger-2", cost);
    gs().clearLevelUp();
    expect(gs().lastLevelUp).toBeNull();
  });

  it("newLevel in result matches levelFromXp after the completion", () => {
    const result = gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(result.newLevel).toBe(levelFromXp(gs().xp).level);
  });
});

// ── completeLesson — streak ───────────────────────────────────────────────────

describe("completeLesson — streak", () => {
  beforeEach(resetStore);

  it("first-ever completion starts a streak of 1", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(gs().streak).toBe(1);
  });

  it("second completion on the SAME day keeps streak at 1", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().completeLesson("beginner/variables", 10);
    expect(gs().streak).toBe(1);
  });

  it("lastActiveDay is set to today's key after completion", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    const today = dayKeyOf(new Date());
    expect(gs().lastActiveDay).toBe(today);
  });

  it("daily lesson counter increments on fresh completions", () => {
    expect(gs().dailyLessons).toBe(0);
    gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(gs().dailyLessons).toBe(1);
  });

  it("daily XP counter accumulates", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().completeLesson("beginner/booleans", 20);
    expect(gs().dailyXp).toBe((LESSON_XP + 20) * XP_MULT);
  });

  it("weeklyXp accumulates across completions", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().completeLesson("beginner/booleans", 20);
    expect(gs().weeklyXp).toBe(LESSON_XP + 20);
  });

  it("short streak (≤ decay) decays to 1 and lostStreak is the delta lost", () => {
    // A streak of 5 with STREAK_DECAY_DAYS=10: decayed = max(1, 5-10) = 1.
    // lostStreak = 5 - 1 = 4 (the amount lost, not the old absolute streak).
    useGameStore.setState({
      streak: 5,
      streakFreezes: 0,
      lastActiveDay: "2020-0-1", // far in the past → gap
    });
    gs().completeLesson("beginner/first-function", 10);
    expect(gs().streak).toBe(1);
    expect(gs().lostStreak).toBe(4); // delta: 5 - 1 = 4
  });

  it("a streak freeze prevents a gap from breaking the streak", () => {
    useGameStore.setState({
      streak: 5,
      streakFreezes: 1,
      lastActiveDay: "2020-0-1",
    });
    gs().completeLesson("beginner/first-function", 10);
    expect(gs().streak).toBe(6); // freeze consumed
    expect(gs().streakFreezes).toBe(0);
    expect(gs().lostStreak).toBeNull();
  });

  it("long streak (> decay) decays by STREAK_DECAY_DAYS and lostStreak is 10", () => {
    // A streak of 120 with STREAK_DECAY_DAYS=10: decayed = max(1, 120-10) = 110.
    // lostStreak = 120 - 110 = 10 (the delta).
    useGameStore.setState({
      streak: 120,
      streakFreezes: 0,
      lastActiveDay: "2020-0-1", // far in the past → gap
    });
    gs().completeLesson("beginner/variables", 10);
    expect(gs().streak).toBe(110);
    expect(gs().lostStreak).toBe(10);
  });

  it("repairStreak restores the decayed amount on top of current streak", () => {
    // Set up: streak of 120 decayed to 110, lostStreak = 10.
    // After repair with enough gold: streak = 110 + 10 = 120, lostStreak = null.
    useGameStore.setState({
      streak: 110,
      lostStreak: 10,
      gold: 1000, // enough to cover streakRepairCost(10) = 250
      streakFreezes: 0,
    });
    const repaired = gs().repairStreak();
    expect(repaired).toBe(true);
    expect(gs().streak).toBe(120); // 110 + 10
    expect(gs().lostStreak).toBeNull();
    expect(gs().gold).toBe(1000 - 250); // streakRepairCost(10) = 10 * 25 = 250
  });
});

// ── completeLesson — season roll ──────────────────────────────────────────────

describe("completeLesson — season roll", () => {
  beforeEach(resetStore);

  it("seeds seasonStart on first completion (null → today key)", () => {
    expect(gs().seasonStart).toBeNull();
    gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(gs().seasonStart).not.toBeNull();
  });

  it("a fresh season resets weeklyXp after a roll", () => {
    // Set a stale season (older than SEASON_DAYS = 7 days).
    const oldDay = "2020-0-1";
    useGameStore.setState({
      seasonStart: oldDay,
      weeklyXp: 9999,
      leagueTier: 0,
      streakFreezes: 0,
    });
    gs().completeLesson(LESSON_ID, LESSON_XP);
    // After the roll, weeklyXp should reflect only this lesson's XP.
    expect(gs().weeklyXp).toBe(LESSON_XP);
  });

  it("the season start is updated after a roll", () => {
    useGameStore.setState({
      seasonStart: "2020-0-1",
      weeklyXp: 0,
      leagueTier: 0,
    });
    gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(gs().seasonStart).toBe(dayKeyOf(new Date()));
  });
});

// ── claimQuest ────────────────────────────────────────────────────────────────

describe("claimQuest", () => {
  beforeEach(resetStore);

  it("returns false for an unknown quest id", () => {
    expect(gs().claimQuest("non-existent-quest")).toBe(false);
  });

  it("returns false when the quest goal is not met", () => {
    // 'warm-up' requires 1 lesson; we haven't completed any yet.
    expect(gs().claimQuest("warm-up")).toBe(false);
  });

  it("returns true and awards gold when the quest is complete", () => {
    // Complete one lesson so 'warm-up' (goal: 1 lesson) is satisfied.
    gs().completeLesson(LESSON_ID, LESSON_XP);
    const goldBefore = gs().gold;
    const claimed = gs().claimQuest("warm-up");
    expect(claimed).toBe(true);
    expect(gs().gold).toBeGreaterThan(goldBefore);
  });

  it("awards at least the quest's rewardGold", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    const goldBefore = gs().gold;
    gs().claimQuest("warm-up");
    const quest = DAILY_QUESTS.find((q) => q.id === "warm-up")!;
    // Claiming also runs grantAchievements, which may award additional gold in
    // the same action, so the delta is >= the bare quest reward.
    expect(gs().gold - goldBefore).toBeGreaterThanOrEqual(quest.rewardGold);
  });

  it("awards rewardXp when the quest defines it", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    const xpBefore = gs().xp;
    gs().claimQuest("warm-up");
    const quest = DAILY_QUESTS.find((q) => q.id === "warm-up")!;
    if (quest.rewardXp) {
      expect(gs().xp).toBe(xpBefore + quest.rewardXp);
    }
  });

  it("returns false on double-claim (idempotent)", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().claimQuest("warm-up");
    expect(gs().claimQuest("warm-up")).toBe(false);
  });

  it("quest appears in claimedQuests after claiming", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().claimQuest("warm-up");
    expect(gs().claimedQuests).toContain("warm-up");
  });
});

// ── claimDailyChallenge ───────────────────────────────────────────────────────

describe("claimDailyChallenge", () => {
  beforeEach(resetStore);

  it("returns false when the challenge lesson is not completed", () => {
    expect(gs().claimDailyChallenge()).toBe(false);
  });

  it("returns true after the challenge lesson is completed", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    // Complete the daily lesson so it shows as done.
    gs().completeLesson(id, 20);
    expect(gs().claimDailyChallenge()).toBe(true);
  });

  it("awards at least DAILY_BONUS_GOLD on success", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    const goldBefore = gs().gold;
    gs().claimDailyChallenge();
    // grantAchievements may stack extra gold in the same action.
    expect(gs().gold - goldBefore).toBeGreaterThanOrEqual(DAILY_BONUS_GOLD);
  });

  it("awards DAILY_BONUS_XP on success", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    const xpBefore = gs().xp;
    gs().claimDailyChallenge();
    expect(gs().xp - xpBefore).toBe(DAILY_BONUS_XP);
  });

  it("sets dailyChallengeClaimed to today's key", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    gs().claimDailyChallenge();
    expect(gs().dailyChallengeClaimed).toBe(today);
  });

  it("increments dailyChallengeStreak on first claim", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    gs().claimDailyChallenge();
    expect(gs().dailyChallengeStreak).toBe(1);
  });

  it("updates dailyChallengeBest when streak exceeds previous best", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    gs().claimDailyChallenge();
    expect(gs().dailyChallengeBest).toBeGreaterThanOrEqual(1);
  });

  it("returns false on a second claim the same day (idempotent)", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    gs().claimDailyChallenge();
    expect(gs().claimDailyChallenge()).toBe(false);
  });

  it("updates weeklyXp by DAILY_BONUS_XP", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    const weeklyBefore = gs().weeklyXp;
    gs().claimDailyChallenge();
    expect(gs().weeklyXp - weeklyBefore).toBe(DAILY_BONUS_XP);
  });

  it("dailyChallenge() selector reflects claimed state after claiming", () => {
    const today = dayKeyOf(new Date());
    const { id } = pickDaily(today);
    gs().completeLesson(id, 20);
    gs().claimDailyChallenge();
    const dc = gs().dailyChallenge();
    expect(dc.claimed).toBe(true);
  });
});

// ── stats() selector ──────────────────────────────────────────────────────────

describe("stats() selector", () => {
  beforeEach(resetStore);

  it("reflects zero state on a fresh store", () => {
    const s = gs().stats();
    expect(s.xp).toBe(0);
    expect(s.gold).toBe(0);
    expect(s.streak).toBe(0);
    expect(s.completedCount).toBe(0);
    expect(s.completedIds).toEqual([]);
  });

  it("completedCount matches completed.length after lessons", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().completeLesson("beginner/variables", 10);
    expect(gs().stats().completedCount).toBe(2);
  });

  it("level is at least 1", () => {
    expect(gs().stats().level).toBeGreaterThanOrEqual(1);
  });
});

// ── today() selector ──────────────────────────────────────────────────────────

describe("today() selector", () => {
  beforeEach(resetStore);

  it("returns zeros on a fresh store", () => {
    const t = gs().today();
    expect(t.xp).toBe(0);
    expect(t.lessons).toBe(0);
  });

  it("reflects lessons and XP earned today", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    const t = gs().today();
    expect(t.lessons).toBe(1);
    expect(t.xp).toBe(LESSON_XP * XP_MULT);
  });

  it("stale dailyDay returns zeros (not today's counters)", () => {
    useGameStore.setState({ dailyDay: "2020-0-1", dailyXp: 999, dailyLessons: 5 });
    const t = gs().today();
    expect(t.xp).toBe(0);
    expect(t.lessons).toBe(0);
  });
});

// ── gold helpers ──────────────────────────────────────────────────────────────

describe("addGold / spendGold", () => {
  beforeEach(resetStore);

  it("addGold increases gold", () => {
    gs().addGold(100);
    expect(gs().gold).toBe(100);
  });

  it("addGold with negative number decreases gold (but never below 0)", () => {
    gs().addGold(-999);
    expect(gs().gold).toBe(0);
  });

  it("spendGold deducts gold and returns true", () => {
    gs().addGold(200);
    expect(gs().spendGold(50)).toBe(true);
    expect(gs().gold).toBe(150);
  });

  it("spendGold returns false when insufficient gold", () => {
    gs().addGold(10);
    expect(gs().spendGold(50)).toBe(false);
    expect(gs().gold).toBe(10); // unchanged
  });

  it("spendGold returns false for zero or negative amount", () => {
    gs().addGold(100);
    expect(gs().spendGold(0)).toBe(false);
    expect(gs().spendGold(-10)).toBe(false);
  });
});

// ── setActiveQuest ────────────────────────────────────────────────────────────

describe("setActiveQuest", () => {
  beforeEach(resetStore);

  it("sets the active quest id", () => {
    gs().setActiveQuest("some-quest");
    expect(gs().activeQuest).toBe("some-quest");
  });

  it("clears the active quest when set to null", () => {
    gs().setActiveQuest("some-quest");
    gs().setActiveQuest(null);
    expect(gs().activeQuest).toBeNull();
  });
});

// ── onboarding ────────────────────────────────────────────────────────────────

describe("onboarding", () => {
  beforeEach(resetStore);

  it("onboarded is false by default", () => {
    expect(gs().onboarded).toBe(false);
  });

  it("setGoal sets the goal and marks onboarded", () => {
    gs().setGoal("frontend");
    expect(gs().goal).toBe("frontend");
    expect(gs().onboarded).toBe(true);
  });

  it("setGoal(null) marks onboarded even with no goal", () => {
    gs().setGoal(null);
    expect(gs().onboarded).toBe(true);
    expect(gs().goal).toBeNull();
  });

  it("dismissOnboarding marks onboarded without setting a goal", () => {
    gs().dismissOnboarding();
    expect(gs().onboarded).toBe(true);
    expect(gs().goal).toBeNull();
  });
});

// ── guild helpers ─────────────────────────────────────────────────────────────

describe("joinGuild / leaveGuild", () => {
  beforeEach(resetStore);

  it("joinGuild sets guildId and guildName", () => {
    gs().joinGuild("guild-1", "Arcane Order");
    expect(gs().guildId).toBe("guild-1");
    expect(gs().guildName).toBe("Arcane Order");
  });

  it("leaveGuild clears both fields", () => {
    gs().joinGuild("guild-1", "Arcane Order");
    gs().leaveGuild();
    expect(gs().guildId).toBeNull();
    expect(gs().guildName).toBeNull();
  });
});

// ── season() selector ─────────────────────────────────────────────────────────

describe("season() selector", () => {
  beforeEach(resetStore);

  it("tier is 0 on a fresh store", () => {
    expect(gs().season().tier).toBe(0);
  });

  it("weeklyXp reflects current earnings", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    expect(gs().season().weeklyXp).toBe(LESSON_XP);
  });

  it("daysLeft is a non-negative integer", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP); // seeds seasonStart
    const { daysLeft } = gs().season();
    expect(daysLeft).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(daysLeft)).toBe(true);
  });
});

// ── clearRecentAchievement ────────────────────────────────────────────────────

describe("clearRecentAchievement", () => {
  beforeEach(resetStore);

  it("clears recentAchievement to null", () => {
    useGameStore.setState({ recentAchievement: "first-lesson" });
    gs().clearRecentAchievement();
    expect(gs().recentAchievement).toBeNull();
  });
});

// ── reset ─────────────────────────────────────────────────────────────────────

describe("reset", () => {
  beforeEach(resetStore);

  it("zeroes XP and gold", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().reset();
    expect(gs().xp).toBe(0);
    expect(gs().gold).toBe(0);
  });

  it("clears the completed list", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().reset();
    expect(gs().completed).toEqual([]);
  });

  it("resets streak to 0", () => {
    gs().completeLesson(LESSON_ID, LESSON_XP);
    gs().reset();
    expect(gs().streak).toBe(0);
  });
});
