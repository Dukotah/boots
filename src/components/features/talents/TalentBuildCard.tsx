"use client";

import Link from "next/link";
import {
  BRANCH_META,
  branchPoints,
  buildTitle,
  talentEffects,
  type TalentBranch,
} from "@/lib/talents";

const ORDER: TalentBranch[] = ["prospector", "sentinel", "luminary", "scholar"];

/**
 * Compact summary of a player's talent build — branch investment, active
 * bonuses, and a link into the Skill Tree. Shared by the dashboard (own,
 * interactive) and public profiles (identity flex). Pass `showBonuses={false}`
 * on other people's profiles where the personal gold perks aren't meaningful.
 */
export function TalentBuildCard({
  talents,
  availableSp,
  showBonuses = true,
  href = "/skill-tree" as string | null,
}: {
  talents: string[];
  availableSp?: number;
  showBonuses?: boolean;
  href?: string | null;
}) {
  const title = buildTitle(talents);
  const pts = branchPoints(talents);
  const fx = talentEffects(talents);

  const bonuses: string[] = [];
  if (fx.goldMultPct) bonuses.push(`+${fx.goldMultPct}% lesson gold`);
  if (fx.dailyGold) bonuses.push(`+${fx.dailyGold} daily gold`);
  if (fx.chestBonus) bonuses.push(`+${fx.chestBonus} chest gold`);
  if (fx.reviewGold) bonuses.push(`+${fx.reviewGold} gold/review`);
  if (fx.freezePerWeek) bonuses.push(`+${fx.freezePerWeek} freeze/wk`);
  if (fx.cosmetics.length)
    bonuses.push(
      `${fx.cosmetics.length} exclusive cosmetic${fx.cosmetics.length > 1 ? "s" : ""}`,
    );

  const hasBuild = title !== null;
  const invested = ORDER.filter((b) => pts[b] > 0);

  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌳</span>
          <h2 className="font-bold text-white">
            {hasBuild ? title : "Skill Tree"}
          </h2>
          {availableSp !== undefined && availableSp > 0 && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-soft">
              {availableSp} SP to spend
            </span>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="text-xs font-medium text-accent-soft hover:underline"
          >
            {hasBuild ? "Skill Tree →" : "Build →"}
          </Link>
        )}
      </div>

      {!hasBuild ? (
        <p className="text-sm text-gray-400">
          No talents yet — spend skill points (earned by finishing courses) to
          build a Prospector, Sentinel, Luminary, or Scholar.
        </p>
      ) : (
        <>
          {/* Per-branch investment */}
          <div className="flex flex-wrap gap-2">
            {invested.map((b) => {
              const meta = BRANCH_META[b];
              return (
                <span
                  key={b}
                  className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
                  style={{
                    borderColor: `${meta.color}55`,
                    backgroundColor: `${meta.color}14`,
                    color: meta.color,
                  }}
                >
                  <span>{meta.icon}</span>
                  {meta.label}
                  <span className="opacity-70">{pts[b]} SP</span>
                </span>
              );
            })}
          </div>

          {/* Active bonuses (own surfaces only) */}
          {showBonuses && bonuses.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {bonuses.map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-gray-300"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
