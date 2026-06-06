import { describe, it, expect } from "vitest";
import { deriveNotifications, unreadCount, type NotifSnapshot } from "./notifications";

// A "today" key matching the store's todayKey format: "Y-M-D" (no zero-padding).
function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

const EMPTY_SNAP: NotifSnapshot = {
  achievements: [],
  lastLevelUp: null,
  lastSeasonResult: null,
  dueReviewIds: [],
  lastActiveDay: null,
  streak: 0,
};

describe("deriveNotifications", () => {
  it("returns empty array when state is blank", () => {
    const result = deriveNotifications(EMPTY_SNAP, new Set());
    expect(result).toHaveLength(0);
  });

  it("emits an achievement notification per unlocked achievement", () => {
    const snap: NotifSnapshot = { ...EMPTY_SNAP, achievements: ["first-blood", "apprentice"] };
    const result = deriveNotifications(snap, new Set());
    const kinds = result.map((n) => n.kind);
    expect(kinds.filter((k) => k === "achievement")).toHaveLength(2);
  });

  it("skips achievements already in the seen set", () => {
    const snap: NotifSnapshot = { ...EMPTY_SNAP, achievements: ["first-blood", "apprentice"] };
    const seen = new Set(["achievement:first-blood"]);
    const result = deriveNotifications(snap, seen);
    const ach = result.filter((n) => n.kind === "achievement");
    expect(ach).toHaveLength(1);
    expect(ach[0].id).toBe("achievement:apprentice");
  });

  it("emits a level_up notification when lastLevelUp is set", () => {
    const snap: NotifSnapshot = { ...EMPTY_SNAP, lastLevelUp: 5 };
    const result = deriveNotifications(snap, new Set());
    const lu = result.find((n) => n.kind === "level_up");
    expect(lu).toBeDefined();
    expect(lu!.title).toContain("5");
  });

  it("emits a season_result notification when lastSeasonResult is set", () => {
    const snap: NotifSnapshot = {
      ...EMPTY_SNAP,
      lastSeasonResult: { fromTier: 0, toTier: 1, outcome: "promoted", rank: 2, weeklyXp: 400 },
    };
    const result = deriveNotifications(snap, new Set());
    const sr = result.find((n) => n.kind === "season_result");
    expect(sr).toBeDefined();
    expect(sr!.body).toMatch(/promoted/i);
  });

  it("emits a reviews_due notification when there are due reviews", () => {
    const snap: NotifSnapshot = { ...EMPTY_SNAP, dueReviewIds: ["js/vars", "py/loops"] };
    const result = deriveNotifications(snap, new Set());
    const rv = result.find((n) => n.kind === "reviews_due");
    expect(rv).toBeDefined();
    expect(rv!.title).toContain("2 reviews");
  });

  it("says '1 review' (singular) when exactly one is due", () => {
    const snap: NotifSnapshot = { ...EMPTY_SNAP, dueReviewIds: ["js/vars"] };
    const result = deriveNotifications(snap, new Set());
    const rv = result.find((n) => n.kind === "reviews_due");
    expect(rv!.title).toContain("1 review");
    expect(rv!.title).not.toContain("reviews");
  });

  it("emits streak_risk when lastActiveDay is yesterday", () => {
    const snap: NotifSnapshot = {
      ...EMPTY_SNAP,
      streak: 5,
      lastActiveDay: yesterday(),
    };
    const result = deriveNotifications(snap, new Set());
    const sr = result.find((n) => n.kind === "streak_risk");
    expect(sr).toBeDefined();
    expect(sr!.body).toContain("5-day streak");
  });

  it("does NOT emit streak_risk when lastActiveDay is today", () => {
    const snap: NotifSnapshot = {
      ...EMPTY_SNAP,
      streak: 5,
      lastActiveDay: todayKey(),
    };
    const result = deriveNotifications(snap, new Set());
    expect(result.find((n) => n.kind === "streak_risk")).toBeUndefined();
  });

  it("does NOT emit streak_risk when streak is 0", () => {
    const snap: NotifSnapshot = {
      ...EMPTY_SNAP,
      streak: 0,
      lastActiveDay: yesterday(),
    };
    const result = deriveNotifications(snap, new Set());
    expect(result.find((n) => n.kind === "streak_risk")).toBeUndefined();
  });
});

describe("unreadCount", () => {
  it("returns 0 for empty state", () => {
    expect(unreadCount(EMPTY_SNAP, new Set())).toBe(0);
  });

  it("counts only notifications not in the seen set", () => {
    const snap: NotifSnapshot = {
      ...EMPTY_SNAP,
      achievements: ["first-blood", "apprentice"],
      lastLevelUp: 3,
    };
    const seen = new Set(["achievement:first-blood", "level_up:3"]);
    // only apprentice is unseen
    expect(unreadCount(snap, seen)).toBe(1);
  });
});
