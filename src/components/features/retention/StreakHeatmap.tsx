"use client";

import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

const DAYS = 119; // 17 weeks

// Same local-day key the store records in activeDays (year-month-date, month 0-indexed).
function keyFor(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// GitHub-style contribution calendar of practice days. Pure read of activeDays.
export function StreakHeatmap() {
  const mounted = useMounted();
  const activeDays = useGameStore((s) => s.activeDays);

  if (!mounted) {
    return <div className="card h-32" />;
  }

  const set = new Set(activeDays);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: { key: string; active: boolean }[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = keyFor(d);
    cells.push({ key, active: set.has(key) });
  }
  const activeCount = cells.filter((c) => c.active).length;

  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Your activity</h2>
        <span className="text-xs text-gray-500">
          {activeCount} active {activeCount === 1 ? "day" : "days"} · last 17 weeks
        </span>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
        {cells.map((c) => (
          <div
            key={c.key}
            title={c.active ? "Practiced" : "No practice"}
            className={[
              "h-3 w-3 rounded-sm",
              c.active ? "bg-accent shadow-glow" : "bg-surface-2",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
