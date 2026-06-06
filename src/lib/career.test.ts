import { describe, it, expect } from "vitest";
import {
  CAREER_MODULES,
  READINESS_TIERS,
  readinessTier,
  computeReadiness,
  certVerifyCode,
  buildResume,
  resumeMarkdown,
  pathCredentials,
  languageName,
} from "./career";
import type { PlayerStats } from "@/types/game";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeStats(overrides: Partial<PlayerStats> = {}): PlayerStats {
  return {
    xp: 0,
    level: 1,
    gold: 0,
    streak: 0,
    completedCount: 0,
    completedIds: [],
    languages: [],
    completedModules: [],
    modulesTouched: 0,
    ...overrides,
  };
}

// ── languageName ──────────────────────────────────────────────────────────────

describe("languageName", () => {
  it("maps 'js' to 'JavaScript'", () => {
    expect(languageName("js")).toBe("JavaScript");
  });

  it("maps 'py' to 'Python'", () => {
    expect(languageName("py")).toBe("Python");
  });

  it("maps 'sql' to 'SQL'", () => {
    expect(languageName("sql")).toBe("SQL");
  });

  it("title-cases unknown codes", () => {
    expect(languageName("rust")).toBe("Rust");
  });
});

// ── readinessTier ─────────────────────────────────────────────────────────────

describe("readinessTier", () => {
  it("score 0 → 'Just Starting'", () => {
    expect(readinessTier(0).name).toBe("Just Starting");
  });

  it("score 20 → 'Building Foundations'", () => {
    expect(readinessTier(20).name).toBe("Building Foundations");
  });

  it("score 40 → 'Junior-Ready'", () => {
    expect(readinessTier(40).name).toBe("Junior-Ready");
  });

  it("score 60 → 'Interview-Ready'", () => {
    expect(readinessTier(60).name).toBe("Interview-Ready");
  });

  it("score 80 → 'Standout Candidate'", () => {
    expect(readinessTier(80).name).toBe("Standout Candidate");
  });

  it("score 100 → 'Standout Candidate' (top cap)", () => {
    expect(readinessTier(100).name).toBe("Standout Candidate");
  });

  it("score 19 stays in 'Just Starting' (below the 20 boundary)", () => {
    expect(readinessTier(19).name).toBe("Just Starting");
  });

  it("every tier boundary triggers the right tier", () => {
    for (const tier of READINESS_TIERS) {
      expect(readinessTier(tier.min).name).toBe(tier.name);
    }
  });
});

// ── computeReadiness ──────────────────────────────────────────────────────────

describe("computeReadiness", () => {
  it("a brand-new player has score 0", () => {
    const r = computeReadiness(makeStats());
    expect(r.score).toBe(0);
  });

  it("score is always in [0, 100]", () => {
    const rich = makeStats({
      streak: 100,
      completedCount: 1000,
      completedModules: Array.from({ length: 20 }, (_, i) => `mod-${i}`),
      languages: ["js", "py", "sql", "ts", "html"],
    });
    const r = computeReadiness(rich);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });

  it("returns exactly 5 factors", () => {
    expect(computeReadiness(makeStats()).factors).toHaveLength(5);
  });

  it("each factor has required shape", () => {
    for (const f of computeReadiness(makeStats()).factors) {
      expect(typeof f.key).toBe("string");
      expect(typeof f.label).toBe("string");
      expect(typeof f.detail).toBe("string");
      expect(typeof f.points).toBe("number");
      expect(typeof f.max).toBe("number");
      expect(typeof f.tip).toBe("string");
      expect(f.points).toBeGreaterThanOrEqual(0);
      expect(f.points).toBeLessThanOrEqual(f.max);
    }
  });

  it("higher streak → higher consistency score", () => {
    const low = computeReadiness(makeStats({ streak: 2 }));
    const high = computeReadiness(makeStats({ streak: 10 }));
    const lowPts = low.factors.find((f) => f.key === "consistency")!.points;
    const highPts = high.factors.find((f) => f.key === "consistency")!.points;
    expect(highPts).toBeGreaterThan(lowPts);
  });

  it("consistency is capped at 10", () => {
    const r = computeReadiness(makeStats({ streak: 999 }));
    const pts = r.factors.find((f) => f.key === "consistency")!.points;
    expect(pts).toBe(10);
  });

  it("more completed lessons → higher practice score", () => {
    const low = computeReadiness(makeStats({ completedCount: 4 }));
    const high = computeReadiness(makeStats({ completedCount: 60 }));
    const lowPts = low.factors.find((f) => f.key === "practice")!.points;
    const highPts = high.factors.find((f) => f.key === "practice")!.points;
    expect(highPts).toBeGreaterThan(lowPts);
  });

  it("more languages → higher breadth score", () => {
    const low = computeReadiness(makeStats({ languages: ["js"] }));
    const high = computeReadiness(makeStats({ languages: ["js", "py", "sql"] }));
    const lowPts = low.factors.find((f) => f.key === "languages")!.points;
    const highPts = high.factors.find((f) => f.key === "languages")!.points;
    expect(highPts).toBeGreaterThan(lowPts);
  });

  it("tier matches readinessTier(score)", () => {
    const r = computeReadiness(makeStats({ streak: 5 }));
    expect(r.tier.name).toBe(readinessTier(r.score).name);
  });

  it("nextTier is null when score is at the highest tier min", () => {
    // Max possible score → Standout Candidate (min 80). nextTier should be null.
    const r = computeReadiness(
      makeStats({
        streak: 100,
        completedCount: 1000,
        completedModules: Array.from({ length: 20 }, (_, i) => `mod-${i}`),
        languages: ["js", "py", "sql", "ts", "html"],
      }),
    );
    if (r.score >= 80) {
      expect(r.nextTier).toBeNull();
    }
  });

  it("factor total matches score (up to the 100 cap)", () => {
    const stats = makeStats({ streak: 7, completedCount: 40 });
    const r = computeReadiness(stats);
    const rawSum = r.factors.reduce((s, f) => s + f.points, 0);
    expect(r.score).toBe(Math.min(100, rawSum));
  });
});

// ── certVerifyCode ────────────────────────────────────────────────────────────

describe("certVerifyCode", () => {
  it("returns a string containing the site name prefix", () => {
    const code = certVerifyCode("frontend", "Alice");
    expect(code.startsWith("CANTRIP-")).toBe(true);
  });

  it("is deterministic — same slug + name always produces the same code", () => {
    expect(certVerifyCode("frontend", "Alice")).toBe(
      certVerifyCode("frontend", "Alice"),
    );
  });

  it("is case-insensitive on the name (Alice === alice)", () => {
    expect(certVerifyCode("frontend", "Alice")).toBe(
      certVerifyCode("frontend", "alice"),
    );
  });

  it("different slugs produce different codes", () => {
    expect(certVerifyCode("frontend", "Bob")).not.toBe(
      certVerifyCode("backend", "Bob"),
    );
  });

  it("different names produce different codes", () => {
    expect(certVerifyCode("frontend", "Alice")).not.toBe(
      certVerifyCode("frontend", "Bob"),
    );
  });

  it("code segment is exactly 6 chars after the prefix dash", () => {
    const code = certVerifyCode("frontend", "Alice");
    const [, segment] = code.split("-");
    expect(segment).toHaveLength(6);
  });
});

// ── CAREER_MODULES ────────────────────────────────────────────────────────────

describe("CAREER_MODULES", () => {
  it("is a non-empty array of strings", () => {
    expect(Array.isArray(CAREER_MODULES)).toBe(true);
    expect(CAREER_MODULES.length).toBeGreaterThan(0);
    expect(CAREER_MODULES.every((m) => typeof m === "string")).toBe(true);
  });

  it("contains core languages ('javascript', 'python', 'sql')", () => {
    expect(CAREER_MODULES).toContain("javascript");
    expect(CAREER_MODULES).toContain("python");
    expect(CAREER_MODULES).toContain("sql");
  });
});

// ── buildResume ───────────────────────────────────────────────────────────────

describe("buildResume", () => {
  it("returns a ResumeData with the provided name", () => {
    const r = buildResume(makeStats(), "Alice");
    expect(r.name).toBe("Alice");
  });

  it("headline contains 'Level'", () => {
    const r = buildResume(makeStats(), "Alice");
    expect(r.headline).toContain("Level");
  });

  it("summary is a non-empty string", () => {
    expect(buildResume(makeStats(), "Alice").summary.length).toBeGreaterThan(0);
  });

  it("skills, courses, projects, credentials, highlights are all arrays", () => {
    const r = buildResume(makeStats(), "Alice");
    expect(Array.isArray(r.skills)).toBe(true);
    expect(Array.isArray(r.courses)).toBe(true);
    expect(Array.isArray(r.projects)).toBe(true);
    expect(Array.isArray(r.credentials)).toBe(true);
    expect(Array.isArray(r.highlights)).toBe(true);
  });

  it("highlights include XP mention", () => {
    const r = buildResume(makeStats({ xp: 500 }), "Bob");
    const hasXp = r.highlights.some((h) => h.includes("XP"));
    expect(hasXp).toBe(true);
  });

  it("skills come from the languages list", () => {
    const stats = makeStats({ languages: ["js", "py"] });
    const r = buildResume(stats, "Alice");
    expect(r.skills).toContain("JavaScript");
    expect(r.skills).toContain("Python");
  });
});

// ── resumeMarkdown ────────────────────────────────────────────────────────────

describe("resumeMarkdown", () => {
  it("starts with '# <name>'", () => {
    const r = buildResume(makeStats(), "Alice");
    const md = resumeMarkdown(r);
    expect(md.startsWith("# Alice")).toBe(true);
  });

  it("includes the headline in bold", () => {
    const r = buildResume(makeStats(), "Alice");
    const md = resumeMarkdown(r);
    expect(md).toContain(`**${r.headline}**`);
  });

  it("includes 'Highlights' section", () => {
    const r = buildResume(makeStats(), "Alice");
    expect(resumeMarkdown(r)).toContain("## Highlights");
  });

  it("includes the Cantrip brand footer", () => {
    const r = buildResume(makeStats(), "Alice");
    expect(resumeMarkdown(r)).toContain("Cantrip");
  });

  it("returns a non-empty string", () => {
    const r = buildResume(makeStats(), "Alice");
    expect(resumeMarkdown(r).length).toBeGreaterThan(0);
  });
});

// ── pathCredentials ───────────────────────────────────────────────────────────

describe("pathCredentials", () => {
  it("returns an array (one entry per path)", () => {
    const creds = pathCredentials([]);
    expect(Array.isArray(creds)).toBe(true);
    expect(creds.length).toBeGreaterThan(0);
  });

  it("each entry has path, done, total, pct, earned", () => {
    for (const c of pathCredentials([])) {
      expect(c).toHaveProperty("path");
      expect(c).toHaveProperty("done");
      expect(c).toHaveProperty("total");
      expect(c).toHaveProperty("pct");
      expect(c).toHaveProperty("earned");
    }
  });

  it("no path is earned when nothing is completed", () => {
    const creds = pathCredentials([]);
    expect(creds.every((c) => !c.earned)).toBe(true);
  });

  it("pct is 0 for all paths when nothing is completed", () => {
    const creds = pathCredentials([]);
    expect(creds.every((c) => c.pct === 0)).toBe(true);
  });

  it("done is 0 for all paths when nothing is completed", () => {
    const creds = pathCredentials([]);
    expect(creds.every((c) => c.done === 0)).toBe(true);
  });
});
