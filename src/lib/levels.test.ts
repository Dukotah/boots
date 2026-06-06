import { describe, it, expect } from "vitest";
import {
  BASE_XP,
  CURVE,
  xpForLevel,
  totalXpForLevel,
  levelFromXp,
  rankForLevel,
  RANKS,
} from "./levels";

// ── xpForLevel ────────────────────────────────────────────────────────────────

describe("xpForLevel", () => {
  it("level 1 costs BASE_XP (the seed of the whole curve)", () => {
    expect(xpForLevel(1)).toBe(Math.round(BASE_XP * Math.pow(1, CURVE)));
  });

  it("costs exactly BASE_XP for level 1", () => {
    expect(xpForLevel(1)).toBe(80);
  });

  it("level 2 costs more than level 1", () => {
    expect(xpForLevel(2)).toBeGreaterThan(xpForLevel(1));
  });

  it("level 10 costs more than level 2 (growth is monotone)", () => {
    expect(xpForLevel(10)).toBeGreaterThan(xpForLevel(2));
  });

  it("never returns a non-integer (Math.round applied)", () => {
    for (let l = 1; l <= 50; l++) {
      expect(Number.isInteger(xpForLevel(l))).toBe(true);
    }
  });

  it("level 60 costs substantially more than level 1 (long-tail grind)", () => {
    expect(xpForLevel(60)).toBeGreaterThan(1000);
  });
});

// ── totalXpForLevel ───────────────────────────────────────────────────────────

describe("totalXpForLevel", () => {
  it("level 1 requires 0 XP (you start here)", () => {
    expect(totalXpForLevel(1)).toBe(0);
  });

  it("level 2 requires exactly xpForLevel(1)", () => {
    expect(totalXpForLevel(2)).toBe(xpForLevel(1));
  });

  it("level 3 is the sum of levels 1 and 2", () => {
    expect(totalXpForLevel(3)).toBe(xpForLevel(1) + xpForLevel(2));
  });

  it("is strictly increasing (each level requires more total XP)", () => {
    for (let l = 1; l < 20; l++) {
      expect(totalXpForLevel(l + 1)).toBeGreaterThan(totalXpForLevel(l));
    }
  });

  it("cumulative formula is consistent with manual summation", () => {
    const manual = [1, 2, 3, 4, 5].reduce(
      (sum, l) => sum + xpForLevel(l),
      0,
    );
    expect(totalXpForLevel(6)).toBe(manual);
  });
});

// ── rankForLevel ──────────────────────────────────────────────────────────────

describe("rankForLevel", () => {
  it("level 1 is 'Intern'", () => {
    expect(rankForLevel(1).name).toBe("Intern");
  });

  it("level 2 is still 'Intern' (threshold is 3 for Junior Dev)", () => {
    expect(rankForLevel(2).name).toBe("Intern");
  });

  it("level 3 advances to 'Junior Dev'", () => {
    expect(rankForLevel(3).name).toBe("Junior Dev");
  });

  it("level 60 reaches 'Archmage'", () => {
    expect(rankForLevel(60).name).toBe("Archmage");
  });

  it("level 100 is still 'Archmage' (no rank beyond that)", () => {
    expect(rankForLevel(100).name).toBe("Archmage");
  });

  it("each rank boundary triggers the expected rank name", () => {
    for (const rank of RANKS) {
      expect(rankForLevel(rank.minLevel).name).toBe(rank.name);
    }
  });
});

// ── levelFromXp ───────────────────────────────────────────────────────────────

describe("levelFromXp", () => {
  it("0 XP → level 1", () => {
    const info = levelFromXp(0);
    expect(info.level).toBe(1);
  });

  it("0 XP → xpIntoLevel is 0", () => {
    expect(levelFromXp(0).xpIntoLevel).toBe(0);
  });

  it("0 XP → progress is 0", () => {
    expect(levelFromXp(0).progress).toBe(0);
  });

  it("exactly xpForLevel(1) XP → level 2", () => {
    const info = levelFromXp(xpForLevel(1));
    expect(info.level).toBe(2);
    expect(info.xpIntoLevel).toBe(0);
  });

  it("one XP short of level 2 stays at level 1 with correct progress", () => {
    const cost = xpForLevel(1);
    const info = levelFromXp(cost - 1);
    expect(info.level).toBe(1);
    expect(info.xpIntoLevel).toBe(cost - 1);
    expect(info.progress).toBeCloseTo((cost - 1) / cost);
  });

  it("progress is always in [0, 1]", () => {
    const samples = [0, 10, 79, 80, 81, 200, 500, 2000, 10000];
    for (const xp of samples) {
      const { progress } = levelFromXp(xp);
      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(1);
    }
  });

  it("totalXp reflects the safe floor of the input", () => {
    expect(levelFromXp(79.9).totalXp).toBe(79);
  });

  it("negative XP is treated as 0 (never throws)", () => {
    const info = levelFromXp(-500);
    expect(info.level).toBe(1);
    expect(info.totalXp).toBe(0);
  });

  it("xpForLevel in the returned info matches the standalone function", () => {
    const info = levelFromXp(500);
    expect(info.xpForLevel).toBe(xpForLevel(info.level));
  });

  it("rank in the returned info matches rankForLevel", () => {
    const info = levelFromXp(5000);
    expect(info.rank).toEqual(rankForLevel(info.level));
  });

  it("large XP value doesn't throw or lock into an infinite loop", () => {
    expect(() => levelFromXp(1_000_000)).not.toThrow();
    expect(levelFromXp(1_000_000).level).toBeGreaterThan(1);
  });

  it("completing a lesson worth 80 XP raises level from 1 to 2", () => {
    const before = levelFromXp(0);
    const after = levelFromXp(before.xpForLevel);
    expect(after.level).toBe(before.level + 1);
  });
});
