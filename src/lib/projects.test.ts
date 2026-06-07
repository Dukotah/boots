import { describe, it, expect } from "vitest";
import {
  allProjects,
  isProject,
  completedProjects,
  projectProgress,
} from "./projects";

// ── allProjects ───────────────────────────────────────────────────────────────

describe("allProjects", () => {
  it("returns an array (may be empty if the module has no lessons yet)", () => {
    expect(Array.isArray(allProjects())).toBe(true);
  });

  it("each project has the required shape", () => {
    for (const p of allProjects()) {
      expect(typeof p.slug).toBe("string");
      expect(typeof p.id).toBe("string");
      expect(typeof p.href).toBe("string");
      expect(typeof p.title).toBe("string");
      expect(typeof p.xp).toBe("number");
      expect(typeof p.language).toBe("string");
      expect(typeof p.demonstrates).toBe("string");
      expect(["Beginner", "Intermediate", "Advanced"]).toContain(p.difficulty);
    }
  });

  it("every project id starts with a portfolio module prefix", () => {
    // Projects now aggregate across all portfolio-* modules, not just the
    // original portfolio-projects one.
    for (const p of allProjects()) {
      expect(p.id).toMatch(/^portfolio[^/]*\//);
    }
  });

  it("every project href follows /learn/<portfolio-module>/<lesson>", () => {
    for (const p of allProjects()) {
      expect(p.href).toMatch(/^\/learn\/portfolio[^/]*\//);
    }
  });

  it("project XP values are positive integers", () => {
    for (const p of allProjects()) {
      expect(p.xp).toBeGreaterThan(0);
      expect(Number.isInteger(p.xp)).toBe(true);
    }
  });

  it("tags is always an array (never undefined)", () => {
    for (const p of allProjects()) {
      expect(Array.isArray(p.tags)).toBe(true);
    }
  });

  it("calling allProjects twice returns the same length (stable)", () => {
    expect(allProjects().length).toBe(allProjects().length);
  });
});

// ── isProject ─────────────────────────────────────────────────────────────────

describe("isProject", () => {
  it("recognises a canonical project id", () => {
    expect(isProject("portfolio-projects/todo-app")).toBe(true);
  });

  it("rejects a regular lesson id", () => {
    expect(isProject("javascript/variables")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isProject("")).toBe(false);
  });

  it("rejects an id that merely contains the slug as a substring", () => {
    expect(isProject("not-portfolio-projects/foo")).toBe(false);
  });

  it("is true for every project returned by allProjects()", () => {
    for (const p of allProjects()) {
      expect(isProject(p.id)).toBe(true);
    }
  });
});

// ── completedProjects ─────────────────────────────────────────────────────────

describe("completedProjects", () => {
  it("returns an empty array when nothing is completed", () => {
    expect(completedProjects([])).toEqual([]);
  });

  it("returns only projects whose id appears in the completed list", () => {
    const all = allProjects();
    if (all.length === 0) return; // guard: module empty in this env

    const [first] = all;
    const result = completedProjects([first.id]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(first.id);
  });

  it("ignores non-project ids in the completed list", () => {
    const result = completedProjects(["javascript/variables", "python/lists"]);
    expect(result).toHaveLength(0);
  });

  it("handles completing all projects", () => {
    const all = allProjects();
    const ids = all.map((p) => p.id);
    const done = completedProjects(ids);
    expect(done).toHaveLength(all.length);
  });

  it("preserves catalog order (not completed-list order)", () => {
    const all = allProjects();
    if (all.length < 2) return;
    // Supply in reverse order — output should still follow catalog order.
    const reversed = [...all].reverse().map((p) => p.id);
    const result = completedProjects(reversed);
    const resultIds = result.map((p) => p.id);
    const catalogIds = all.map((p) => p.id);
    expect(resultIds).toEqual(catalogIds);
  });
});

// ── projectProgress ───────────────────────────────────────────────────────────

describe("projectProgress", () => {
  it("returns { done: 0, total } for an empty completed list", () => {
    const { done, total } = projectProgress([]);
    expect(done).toBe(0);
    expect(total).toBe(allProjects().length);
  });

  it("total equals allProjects().length", () => {
    expect(projectProgress([]).total).toBe(allProjects().length);
  });

  it("done is 0 when no project ids are in the list", () => {
    expect(projectProgress(["javascript/variables"]).done).toBe(0);
  });

  it("done increments correctly as projects are completed", () => {
    const all = allProjects();
    if (all.length === 0) return;
    const { done } = projectProgress([all[0].id]);
    expect(done).toBe(1);
  });

  it("done equals total when all projects are completed", () => {
    const all = allProjects();
    const ids = all.map((p) => p.id);
    const { done, total } = projectProgress(ids);
    expect(done).toBe(total);
  });

  it("done never exceeds total", () => {
    const all = allProjects();
    const ids = all.map((p) => p.id);
    // Add extra junk ids — should never inflate done beyond total.
    const { done, total } = projectProgress([...ids, "fake/id"]);
    expect(done).toBeLessThanOrEqual(total);
  });
});
