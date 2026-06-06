/**
 * LeaderboardFilters — unit tests.
 *
 * The component is purely presentational: it renders scope pills and a language
 * dropdown and fires callbacks. No store, no network, no Next.js routing.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeaderboardFilters } from "./LeaderboardFilters";
import { LANGUAGE_FILTER_OPTIONS } from "@/lib/leaderboard";
import type { ScopeFilter, LanguageFilter } from "@/lib/leaderboard";

// Lucide icons render SVGs; jsdom handles them fine — no mock needed.

function renderFilters(overrides: {
  scope?: ScopeFilter;
  onScopeChange?: (s: ScopeFilter) => void;
  language?: LanguageFilter;
  onLanguageChange?: (l: LanguageFilter) => void;
  hasGuild?: boolean;
}) {
  const props = {
    scope: "global" as ScopeFilter,
    onScopeChange: vi.fn(),
    language: "all" as LanguageFilter,
    onLanguageChange: vi.fn(),
    hasGuild: true,
    ...overrides,
  };
  render(<LeaderboardFilters {...props} />);
  return props;
}

// ── scope pill rendering ──────────────────────────────────────────────────────

describe("LeaderboardFilters — scope pills", () => {
  it("renders all three scope labels", () => {
    renderFilters({});
    expect(screen.getByText("Global")).toBeInTheDocument();
    expect(screen.getByText("Friends")).toBeInTheDocument();
    expect(screen.getByText("Guild")).toBeInTheDocument();
  });

  it("active scope button has 'bg-accent' class (highlighted)", () => {
    renderFilters({ scope: "friends" });
    const friendsBtn = screen.getByText("Friends").closest("button")!;
    expect(friendsBtn.className).toContain("bg-accent");
  });

  it("inactive scope button does NOT have 'bg-accent' class", () => {
    renderFilters({ scope: "global" });
    const friendsBtn = screen.getByText("Friends").closest("button")!;
    expect(friendsBtn.className).not.toContain("bg-accent");
  });

  it("calls onScopeChange with 'friends' when Friends is clicked", () => {
    const onScopeChange = vi.fn();
    renderFilters({ onScopeChange });
    fireEvent.click(screen.getByText("Friends"));
    expect(onScopeChange).toHaveBeenCalledOnce();
    expect(onScopeChange).toHaveBeenCalledWith("friends");
  });

  it("calls onScopeChange with 'global' when Global is clicked", () => {
    const onScopeChange = vi.fn();
    renderFilters({ scope: "friends", onScopeChange });
    fireEvent.click(screen.getByText("Global"));
    expect(onScopeChange).toHaveBeenCalledWith("global");
  });

  it("calls onScopeChange with 'guild' when Guild is clicked and hasGuild=true", () => {
    const onScopeChange = vi.fn();
    renderFilters({ hasGuild: true, onScopeChange });
    fireEvent.click(screen.getByText("Guild"));
    expect(onScopeChange).toHaveBeenCalledWith("guild");
  });
});

// ── guild pill when user has no guild ────────────────────────────────────────

describe("LeaderboardFilters — guild pill disabled without a guild", () => {
  it("Guild button is disabled when hasGuild=false", () => {
    renderFilters({ hasGuild: false });
    const guildBtn = screen.getByText("Guild").closest("button")!;
    expect(guildBtn).toBeDisabled();
  });

  it("Guild button has cursor-not-allowed class when hasGuild=false", () => {
    renderFilters({ hasGuild: false });
    const guildBtn = screen.getByText("Guild").closest("button")!;
    expect(guildBtn.className).toContain("cursor-not-allowed");
  });

  it("Guild button has tooltip text when hasGuild=false", () => {
    renderFilters({ hasGuild: false });
    const guildBtn = screen.getByText("Guild").closest("button")!;
    expect(guildBtn.title).toMatch(/join a guild/i);
  });

  it("onScopeChange is NOT called when clicking the disabled Guild button", () => {
    const onScopeChange = vi.fn();
    renderFilters({ hasGuild: false, onScopeChange });
    fireEvent.click(screen.getByText("Guild"));
    // The button is disabled so the click should not bubble to the handler.
    expect(onScopeChange).not.toHaveBeenCalled();
  });

  it("Guild button is enabled when hasGuild=true", () => {
    renderFilters({ hasGuild: true });
    const guildBtn = screen.getByText("Guild").closest("button")!;
    expect(guildBtn).not.toBeDisabled();
  });
});

// ── language dropdown ─────────────────────────────────────────────────────────

describe("LeaderboardFilters — language dropdown", () => {
  it("renders a select element with every LANGUAGE_FILTER_OPTIONS entry", () => {
    renderFilters({});
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    const optionValues = Array.from(select.options).map((o) => o.value);
    LANGUAGE_FILTER_OPTIONS.forEach((opt) => {
      expect(optionValues).toContain(opt.value);
    });
  });

  it("select shows the current language value", () => {
    renderFilters({ language: "python" });
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("python");
  });

  it("calls onLanguageChange with the new value when the select changes", () => {
    const onLanguageChange = vi.fn();
    renderFilters({ onLanguageChange });
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "typescript" } });
    expect(onLanguageChange).toHaveBeenCalledOnce();
    expect(onLanguageChange).toHaveBeenCalledWith("typescript");
  });

  it("displays 'All languages' option label", () => {
    renderFilters({});
    expect(screen.getByText("All languages")).toBeInTheDocument();
  });

  it("displays 'JavaScript' option label", () => {
    renderFilters({});
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });
});
