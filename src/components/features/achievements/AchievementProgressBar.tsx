// Small inline progress bar shown on locked achievement cards that have a
// derivable progress fn. Intentionally minimal — width-bounded, no animation
// so it never distracts from the badge art.

interface Props {
  current: number;
  goal: number;
}

export function AchievementProgressBar({ current, goal }: Props) {
  const clamped = Math.min(current, goal);
  const pct = goal > 0 ? Math.round((clamped / goal) * 100) : 0;

  return (
    <div className="mt-3 w-full">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-accent/70 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] text-gray-500">
        {clamped.toLocaleString()} / {goal.toLocaleString()}
      </p>
    </div>
  );
}
