"use client";

import { Globe, Users, ShieldCheck, ChevronDown } from "lucide-react";
import type { ScopeFilter, LanguageFilter } from "@/lib/leaderboard";
import { LANGUAGE_FILTER_OPTIONS } from "@/lib/leaderboard";

interface Props {
  scope: ScopeFilter;
  onScopeChange: (s: ScopeFilter) => void;
  language: LanguageFilter;
  onLanguageChange: (l: LanguageFilter) => void;
  hasGuild: boolean;
}

const SCOPES: { id: ScopeFilter; label: string; icon: React.ReactNode }[] = [
  { id: "global", label: "Global", icon: <Globe size={13} /> },
  { id: "friends", label: "Friends", icon: <Users size={13} /> },
  { id: "guild", label: "Guild", icon: <ShieldCheck size={13} /> },
];

/**
 * Secondary filter bar that appears below the main All-Time / Weekly / Guilds tabs.
 * Handles scope (Global / Friends / Guild) and a language dropdown.
 */
export function LeaderboardFilters({
  scope,
  onScopeChange,
  language,
  onLanguageChange,
  hasGuild,
}: Props) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {/* Scope pills */}
      <div className="flex gap-1 rounded-full border border-line bg-surface p-1">
        {SCOPES.map((s) => (
          <button
            key={s.id}
            onClick={() => onScopeChange(s.id)}
            disabled={s.id === "guild" && !hasGuild}
            title={
              s.id === "guild" && !hasGuild
                ? "Join a guild first to see the guild board"
                : undefined
            }
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
              scope === s.id
                ? "bg-accent text-white shadow"
                : s.id === "guild" && !hasGuild
                  ? "cursor-not-allowed text-gray-600"
                  : "text-gray-400 hover:text-white",
            ].join(" ")}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {/* Language dropdown */}
      <div className="relative">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as LanguageFilter)}
          className="appearance-none rounded-full border border-line bg-surface px-3 py-1.5 pr-7 text-xs font-medium text-gray-300 transition hover:border-accent/50 hover:text-white focus:outline-none focus:ring-1 focus:ring-accent/40 cursor-pointer"
        >
          {LANGUAGE_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}
