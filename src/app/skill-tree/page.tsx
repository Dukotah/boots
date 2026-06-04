"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";
import { MODULES, lessonId } from "@/lib/curriculum";
import {
  SKILL_NODES,
  SKILL_EDGES,
  TRACK_COLORS,
  TRACK_LABELS,
  type SkillNode,
} from "@/lib/skillTree";

// Layout constants
const NODE_W = 120;
const NODE_H = 64;
const TIER_H = 120;
const COL_W = 140;
const PAD_X = 60;
const PAD_Y = 60;

function nodeCenter(n: SkillNode) {
  return {
    x: PAD_X + n.col * COL_W + NODE_W / 2,
    y: PAD_Y + n.tier * TIER_H + NODE_H / 2,
  };
}

type NodeStatus = "locked" | "available" | "in-progress" | "complete";

export default function SkillTreePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const completed = useGameStore((s) => s.completed);
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [filterTrack, setFilterTrack] = useState<string>("all");
  const svgRef = useRef<SVGSVGElement>(null);

  // Which module slugs have at least one completed lesson
  const completedModuleSet = useMemo(() => {
    const set = new Set<string>();
    for (const id of completed) {
      const [slug] = id.split("/");
      set.add(slug);
    }
    return set;
  }, [completed]);

  // Fully completed modules
  const fullyCompleted = useMemo(() => {
    const full = new Set<string>();
    for (const mod of MODULES) {
      const allDone = mod.lessons.every((l: { slug: string }) =>
        completed.includes(lessonId(mod.slug, l.slug))
      );
      if (allDone && mod.lessons.length > 0) full.add(mod.slug);
    }
    return full;
  }, [completed]);

  function getStatus(node: SkillNode): NodeStatus {
    if (fullyCompleted.has(node.id)) return "complete";
    if (completedModuleSet.has(node.id)) return "in-progress";
    if (node.requires.length === 0) return "available";
    const prereqsMet = node.requires.every(
      (r) => fullyCompleted.has(r) || completedModuleSet.has(r)
    );
    return prereqsMet ? "available" : "locked";
  }

  const maxCol = Math.max(...SKILL_NODES.map((n) => n.col));
  const maxTier = Math.max(...SKILL_NODES.map((n) => n.tier));
  const svgW = PAD_X * 2 + (maxCol + 1) * COL_W;
  const svgH = PAD_Y * 2 + (maxTier + 1) * TIER_H;

  const visibleNodes = filterTrack === "all"
    ? SKILL_NODES
    : SKILL_NODES.filter((n) => n.track === filterTrack);
  const visibleIds = new Set(visibleNodes.map((n) => n.id));

  const selectedMod = selected
    ? MODULES.find((m) => m.slug === selected.id)
    : null;
  const selectedStatus = selected ? getStatus(selected) : null;
  const doneLessons = selectedMod
    ? selectedMod.lessons.filter((l) =>
        completed.includes(lessonId(selectedMod.slug, l.slug))
      ).length
    : 0;

  const tracks = Array.from(new Set(SKILL_NODES.map((n) => n.track)));

  if (!mounted) {
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading…</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-canvas">
      {/* Header */}
      <div className="border-b border-line px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Skill Tree</h1>
            <p className="text-sm text-gray-400">
              Complete modules to unlock advanced skills — {fullyCompleted.size}/{SKILL_NODES.length} mastered
            </p>
          </div>
          <Link href="/learn" className="btn-primary text-sm">Browse Courses</Link>
        </div>

        {/* Track filter */}
        <div className="mx-auto mt-3 flex max-w-7xl flex-wrap gap-2">
          <button
            onClick={() => setFilterTrack("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filterTrack === "all"
                ? "bg-accent text-white"
                : "bg-surface-2 text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTrack(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filterTrack === t
                  ? "text-canvas font-semibold"
                  : "bg-surface-2 text-gray-400 hover:text-white"
              }`}
              style={filterTrack === t ? { backgroundColor: TRACK_COLORS[t] } : {}}
            >
              {TRACK_LABELS[t] ?? t}
            </button>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* SVG tree */}
        <div className="flex-1 overflow-auto">
          <svg
            ref={svgRef}
            width={svgW}
            height={svgH}
            className="min-w-full"
          >
            {/* Edges */}
            {SKILL_EDGES.filter(
              (e) => visibleIds.has(e.from) && visibleIds.has(e.to)
            ).map((edge) => {
              const fromNode = SKILL_NODES.find((n) => n.id === edge.from)!;
              const toNode = SKILL_NODES.find((n) => n.id === edge.to)!;
              const from = nodeCenter(fromNode);
              const to = nodeCenter(toNode);
              const fromStatus = getStatus(fromNode);
              const toStatus = getStatus(toNode);
              const active = fromStatus !== "locked" && toStatus !== "locked";
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y + NODE_H / 2}
                  x2={to.x}
                  y2={to.y - NODE_H / 2}
                  stroke={active ? TRACK_COLORS[toNode.track] : "#374151"}
                  strokeWidth={active ? 2 : 1}
                  strokeOpacity={active ? 0.5 : 0.3}
                  strokeDasharray={active ? undefined : "4 4"}
                />
              );
            })}

            {/* Nodes */}
            {visibleNodes.map((node) => {
              const status = getStatus(node);
              const { x, y } = nodeCenter(node);
              const nx = x - NODE_W / 2;
              const ny = y - NODE_H / 2;
              const color = TRACK_COLORS[node.track];
              const isSelected = selected?.id === node.id;

              const bgOpacity =
                status === "complete" ? "0.25"
                  : status === "in-progress" ? "0.15"
                  : status === "available" ? "0.08"
                  : "0.03";
              const strokeColor =
                status === "complete" ? color
                  : status === "in-progress" ? color
                  : status === "available" ? color
                  : "#374151";
              const strokeWidth = isSelected ? 2.5 : status === "complete" ? 2 : 1;
              const strokeOpacity =
                status === "locked" ? "0.2"
                  : isSelected ? "1"
                  : status === "complete" ? "0.9"
                  : "0.5";

              return (
                <g
                  key={node.id}
                  onClick={() => setSelected(isSelected ? null : node)}
                  className="cursor-pointer"
                >
                  {/* Glow for complete */}
                  {status === "complete" && (
                    <rect
                      x={nx - 3}
                      y={ny - 3}
                      width={NODE_W + 6}
                      height={NODE_H + 6}
                      rx={10}
                      fill={color}
                      opacity={0.08}
                    />
                  )}
                  <rect
                    x={nx}
                    y={ny}
                    width={NODE_W}
                    height={NODE_H}
                    rx={8}
                    fill={color}
                    fillOpacity={bgOpacity}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={strokeOpacity}
                  />
                  {/* Emoji */}
                  <text
                    x={nx + 14}
                    y={ny + NODE_H / 2 + 6}
                    fontSize={20}
                    className="select-none"
                  >
                    {status === "locked" ? "🔒" : node.emoji}
                  </text>
                  {/* Label */}
                  <text
                    x={nx + 38}
                    y={ny + NODE_H / 2 - 4}
                    fontSize={11}
                    fontWeight={600}
                    fill={status === "locked" ? "#6b7280" : "#e5e7eb"}
                    className="select-none"
                  >
                    {node.label.length > 12
                      ? node.label.slice(0, 11) + "…"
                      : node.label}
                  </text>
                  {/* Lesson count / status */}
                  <text
                    x={nx + 38}
                    y={ny + NODE_H / 2 + 10}
                    fontSize={10}
                    fill={status === "complete" ? color : "#6b7280"}
                    className="select-none"
                  >
                    {status === "complete"
                      ? "✓ Mastered"
                      : status === "in-progress"
                      ? "In progress"
                      : `${node.lessonCount} lessons`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side panel */}
        {selected && (
          <div className="w-72 shrink-0 overflow-y-auto border-l border-line bg-surface p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <span className="text-3xl">{selected.emoji}</span>
                <h2 className="mt-1 text-lg font-bold text-white">{selected.label}</h2>
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-xs font-medium text-canvas mt-1"
                  style={{ backgroundColor: TRACK_COLORS[selected.track] }}
                >
                  {TRACK_LABELS[selected.track] ?? selected.track}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Status badge */}
            <div className={`mb-4 rounded-lg px-3 py-2 text-sm font-medium ${
              selectedStatus === "complete"
                ? "bg-success/10 text-success"
                : selectedStatus === "in-progress"
                ? "bg-accent/10 text-accent-soft"
                : selectedStatus === "available"
                ? "bg-gold/10 text-gold"
                : "bg-surface-2 text-gray-400"
            }`}>
              {selectedStatus === "complete" && "✓ Mastered — all lessons done"}
              {selectedStatus === "in-progress" && `⚡ In progress — ${doneLessons}/${selectedMod?.lessons.length} lessons`}
              {selectedStatus === "available" && "🔓 Unlocked — ready to start"}
              {selectedStatus === "locked" && "🔒 Locked — complete prerequisites first"}
            </div>

            {/* Prerequisites */}
            {selected.requires.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Prerequisites
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.requires.map((r) => {
                    const rNode = SKILL_NODES.find((n) => n.id === r);
                    const rStatus = rNode ? getStatus(rNode) : "locked";
                    return (
                      <span
                        key={r}
                        className={`rounded px-2 py-0.5 text-xs ${
                          rStatus === "complete"
                            ? "bg-success/20 text-success"
                            : "bg-surface-2 text-gray-400"
                        }`}
                      >
                        {rNode ? rNode.emoji : ""} {rNode?.label ?? r}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Unlocks */}
            {(() => {
              const unlocks = SKILL_NODES.filter((n) => n.requires.includes(selected.id));
              if (!unlocks.length) return null;
              return (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Unlocks
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {unlocks.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => setSelected(u)}
                        className="rounded px-2 py-0.5 text-xs bg-surface-2 text-gray-300 hover:text-white"
                      >
                        {u.emoji} {u.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* CTA */}
            {selectedStatus !== "locked" && (
              <Link
                href={`/learn/${selected.id}`}
                className="btn-primary mt-2 block w-full text-center text-sm"
              >
                {selectedStatus === "complete"
                  ? "Review Module"
                  : selectedStatus === "in-progress"
                  ? "Continue Module"
                  : "Start Module"}
              </Link>
            )}
            {selectedStatus === "locked" && (
              <p className="mt-2 text-xs text-gray-500">
                Complete the prerequisites above to unlock this module.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="border-t border-line px-6 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-gray-600 bg-gray-800" />
            Locked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-yellow-400/50 bg-yellow-400/10" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-accent bg-accent/15" />
            In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-2 border-success bg-success/25" />
            Mastered
          </span>
          <span className="ml-auto text-gray-600">Click a node to inspect · Scroll to pan</span>
        </div>
      </div>
    </div>
  );
}
