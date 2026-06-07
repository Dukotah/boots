"use client";

// RecommendedBuilds — compact row of 3 preset build cards.
//
// Each card shows: name, icon, tagline, payoff ("what you get"), a progress
// bar toward completion, and an "Apply next step" button that calls the
// store's buyTalent in order — one step per click, idempotent.
//
// Branch colors come from BRANCH_META via buildColor().
// Tailwind conventions match TalentBuildCard.tsx (card, text-* classes, etc).

import { useGameStore } from "@/store/useGameStore";
import {
  TALENT_BUILDS,
  buildProgress,
  buildColor,
  type TalentBuild,
} from "@/lib/talentBuilds";
import { getTalent } from "@/lib/talents";

// ─── Single Build Card ────────────────────────────────────────────────────────

function BuildCard({ build }: { build: TalentBuild }) {
  const talents = useGameStore((s) => s.talents);
  const buyTalent = useGameStore((s) => s.buyTalent);
  const { available } = useGameStore((s) => s.skillPoints());

  const progress = buildProgress(build, talents, available);
  const color = buildColor(build);

  function handleApply() {
    if (!progress.nextAffordable) return;
    // Buy the single next affordable step. buyTalent is idempotent — it
    // returns false if already owned / gated / unaffordable, so this is safe.
    buyTalent(progress.nextAffordable);
  }

  const nextTalent = progress.nextAffordable
    ? getTalent(progress.nextAffordable)
    : null;

  const buttonLabel = progress.complete
    ? "Complete!"
    : progress.nextAffordable
      ? `Get ${nextTalent?.label ?? "next"} (${nextTalent?.cost ?? "?"}SP)`
      : progress.steps.find((s) => s.status !== "owned")
        ? "Need more SP"
        : "Complete!";

  const buttonDisabled = progress.complete || !progress.nextAffordable;

  return (
    <div
      className="card flex flex-col gap-3"
      style={{
        borderColor: `${color}33`,
        boxShadow: `0 0 0 1px ${color}22`,
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <span className="text-2xl leading-none">{build.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">{build.name}</h3>
            {progress.complete && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ backgroundColor: `${color}22`, color }}
              >
                Maxed
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">{build.tagline}</p>
        </div>
      </div>

      {/* Payoff summary */}
      <p className="text-[11px] leading-relaxed text-gray-300">{build.payoff}</p>

      {/* Step pills */}
      <div className="flex flex-wrap gap-1.5">
        {progress.steps.map((step) => (
          <span
            key={step.id}
            className="rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors"
            style={
              step.status === "owned"
                ? {
                    borderColor: `${color}66`,
                    backgroundColor: `${color}22`,
                    color,
                  }
                : step.status === "affordable"
                  ? {
                      borderColor: `${color}33`,
                      backgroundColor: "transparent",
                      color: `${color}cc`,
                    }
                  : {
                      borderColor: "#374151",
                      backgroundColor: "transparent",
                      color: "#6b7280",
                    }
            }
          >
            {step.status === "owned" ? "✓ " : ""}
            {step.label}
            {step.status !== "owned" && (
              <span className="ml-1 opacity-60">{step.cost}SP</span>
            )}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Progress</span>
          <span className="text-[10px] font-semibold" style={{ color }}>
            {progress.owned}/{progress.total}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress.pct}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        disabled={buttonDisabled}
        className="btn-sm w-full rounded-lg py-2 text-xs font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        style={
          buttonDisabled
            ? { backgroundColor: "#1f2937", color: "#9ca3af" }
            : { backgroundColor: `${color}22`, color, border: `1px solid ${color}44` }
        }
      >
        {buttonLabel}
      </button>
    </div>
  );
}

// ─── Public export: row of 3 cards ───────────────────────────────────────────

/**
 * Compact row of preset build cards. Drop this anywhere above or beside the
 * Skill Tree — it reads store state itself and never needs props.
 */
export function RecommendedBuilds() {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-base">⚡</span>
        <h2 className="text-sm font-bold text-white">Recommended Builds</h2>
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] text-gray-400">
          Pick a path, skip the paralysis
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TALENT_BUILDS.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
    </section>
  );
}
