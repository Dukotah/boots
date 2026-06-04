"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  type Node,
  type NodeProps,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import { useGameStore } from "@/store/useGameStore";
import { MODULES, lessonId } from "@/lib/curriculum";
import { SKILL_NODES, SKILL_EDGES, TRACK_COLORS, TRACK_LABELS } from "@/lib/skillTree";

/* ─── Types ─────────────────────────────────────────────────────────── */
type NodeStatus = "locked" | "available" | "in-progress" | "complete";

type SkillNodeData = {
  label: string;
  emoji: string;
  track: string;
  status: NodeStatus;
  lessonCount: number;
  doneLessons: number;
  selected: boolean;
};

/* ─── Layout via Dagre ───────────────────────────────────────────────── */
const NODE_W = 110;
const NODE_H = 110;

function buildLayout(
  nodes: Node[],
  edges: Edge[],
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", ranksep: 80, nodesep: 40 });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
  edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);
  return {
    nodes: nodes.map((n) => {
      const { x, y } = g.node(n.id);
      return { ...n, position: { x: x - NODE_W / 2, y: y - NODE_H / 2 } };
    }),
    edges,
  };
}

/* ─── Custom Node Component ──────────────────────────────────────────── */
function SkillNodeComponent({ data, selected }: NodeProps) {
  const d = data as unknown as SkillNodeData;
  const color = TRACK_COLORS[d.track] ?? "#6b7280";
  const pct = d.lessonCount > 0 ? Math.round((d.doneLessons / d.lessonCount) * 100) : 0;

  /* ring animation classes injected via inline style + keyframes in global css */
  const ringStyle: React.CSSProperties =
    d.status === "available"
      ? { boxShadow: `0 0 0 3px ${color}88, 0 0 16px 2px ${color}44`, animation: "skill-pulse 2.5s ease-in-out infinite" }
      : d.status === "complete"
      ? { boxShadow: `0 0 0 2px #FFD70099, 0 0 20px 4px #FFD70044` }
      : d.status === "in-progress"
      ? { boxShadow: `0 0 0 2px ${color}77` }
      : {};

  const bgColor =
    d.status === "complete"
      ? "#1a1400"
      : d.status === "in-progress"
      ? "#0d1a2a"
      : d.status === "available"
      ? "#0d1520"
      : "#0a0a0a";

  const borderColor =
    d.status === "complete"
      ? "#FFD700"
      : d.status === "in-progress"
      ? color
      : d.status === "available"
      ? color
      : "#2a2a2a";

  /* Radial progress arc for in-progress */
  const r = 46;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-full cursor-pointer select-none transition-transform duration-150 hover:scale-105"
      style={{
        width: NODE_W,
        height: NODE_H,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        ...ringStyle,
        outline: selected ? `2px solid white` : "none",
        outlineOffset: 3,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />

      {/* SVG arc for in-progress */}
      {(d.status === "in-progress" || d.status === "complete") && (
        <svg
          className="absolute inset-0"
          width={NODE_W}
          height={NODE_H}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* background track */}
          <circle
            cx={NODE_W / 2}
            cy={NODE_H / 2}
            r={r}
            fill="none"
            stroke={d.status === "complete" ? "#FFD70033" : `${color}22`}
            strokeWidth={4}
          />
          {/* progress fill */}
          <circle
            cx={NODE_W / 2}
            cy={NODE_H / 2}
            r={r}
            fill="none"
            stroke={d.status === "complete" ? "#FFD700" : color}
            strokeWidth={4}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Shimmer overlay for complete */}
      {d.status === "complete" && (
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          style={{ animation: "skill-shimmer 3s linear infinite" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.25) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      )}

      {/* Emoji */}
      <span className="text-2xl leading-none z-10" style={{ filter: d.status === "locked" ? "grayscale(1) opacity(0.3)" : "none" }}>
        {d.status === "locked" ? "🔒" : d.emoji}
      </span>

      {/* Label */}
      <span
        className="text-center leading-tight mt-1 z-10 font-semibold"
        style={{
          fontSize: 10,
          color: d.status === "locked" ? "#4b5563" : d.status === "complete" ? "#FFD700" : "#e5e7eb",
          maxWidth: 84,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {d.label}
      </span>

      {/* Status micro-label */}
      <span
        className="z-10 mt-0.5"
        style={{
          fontSize: 9,
          color: d.status === "complete" ? "#FFD70099" : d.status === "in-progress" ? `${color}bb` : "#374151",
        }}
      >
        {d.status === "complete"
          ? "✓ Mastered"
          : d.status === "in-progress"
          ? `${d.doneLessons}/${d.lessonCount}`
          : d.status === "available"
          ? "Unlocked"
          : "Locked"}
      </span>
    </div>
  );
}

const nodeTypes = { skill: SkillNodeComponent };

/* ─── Main page (inner, needs ReactFlowProvider) ─────────────────────── */
function SkillTreeInner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const completed = useGameStore((s) => s.completed);
  const [filterTrack, setFilterTrack] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /* Compute module completion state */
  const { completedSet, fullyCompleted } = useMemo(() => {
    const completedSet = new Set<string>();
    for (const id of completed) completedSet.add(id.split("/")[0]);
    const fullyCompleted = new Set<string>();
    for (const mod of MODULES) {
      if (mod.lessons.length > 0 && mod.lessons.every((l) => completed.includes(lessonId(mod.slug, l.slug)))) {
        fullyCompleted.add(mod.slug);
      }
    }
    return { completedSet, fullyCompleted };
  }, [completed]);

  function getStatus(nodeId: string, requires: string[]): NodeStatus {
    if (fullyCompleted.has(nodeId)) return "complete";
    if (completedSet.has(nodeId)) return "in-progress";
    if (requires.length === 0) return "available";
    return requires.some((r) => completedSet.has(r) || fullyCompleted.has(r))
      ? "available"
      : "locked";
  }

  /* Build RF nodes + edges */
  const { rfNodes, rfEdges } = useMemo(() => {
    const visibleIds = new Set(
      filterTrack === "all" ? SKILL_NODES.map((n) => n.id) : SKILL_NODES.filter((n) => n.track === filterTrack).map((n) => n.id)
    );

    const rfNodes: Node[] = SKILL_NODES.filter((n) => visibleIds.has(n.id)).map((n) => {
      const mod = MODULES.find((m) => m.slug === n.id);
      const doneLessons = mod ? mod.lessons.filter((l) => completed.includes(lessonId(n.id, l.slug))).length : 0;
      const status = getStatus(n.id, n.requires);
      return {
        id: n.id,
        type: "skill",
        position: { x: 0, y: 0 },
        data: {
          label: n.label,
          emoji: n.emoji,
          track: n.track,
          status,
          lessonCount: n.lessonCount,
          doneLessons,
          selected: selectedId === n.id,
        } as unknown as Record<string, unknown>,
      };
    });

    const rfEdges: Edge[] = SKILL_EDGES.filter(
      (e) => visibleIds.has(e.from) && visibleIds.has(e.to)
    ).map((e) => {
      const fromNode = SKILL_NODES.find((n) => n.id === e.from)!;
      const toNode = SKILL_NODES.find((n) => n.id === e.to)!;
      const fromStatus = getStatus(e.from, fromNode.requires);
      const toStatus = getStatus(e.to, toNode.requires);
      const active = fromStatus !== "locked" && toStatus !== "locked";
      const bothComplete = fullyCompleted.has(e.from) && fullyCompleted.has(e.to);
      const color = bothComplete ? "#FFD700" : active ? TRACK_COLORS[toNode.track] : "#2a2a2a";
      return {
        id: `${e.from}-${e.to}`,
        source: e.from,
        target: e.to,
        type: "smoothstep",
        animated: false,
        style: {
          stroke: color,
          strokeWidth: active ? 2 : 1,
          strokeDasharray: active ? undefined : "5 5",
          opacity: active ? 0.7 : 0.25,
        },
      };
    });

    const laid = buildLayout(rfNodes, rfEdges);
    return { rfNodes: laid.nodes, rfEdges: laid.edges };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, filterTrack, selectedId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, , onEdgesChange] = useEdgesState(rfEdges);

  /* Sync when deps change */
  useEffect(() => { setNodes(rfNodes); }, [rfNodes, setNodes]);

  const onNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedId((prev) => (prev === node.id ? null : node.id));
  }, []);

  /* Side panel data */
  const selectedSkillNode = SKILL_NODES.find((n) => n.id === selectedId);
  const selectedMod = selectedSkillNode ? MODULES.find((m) => m.slug === selectedSkillNode.id) : null;
  const selectedStatus = selectedSkillNode ? getStatus(selectedSkillNode.id, selectedSkillNode.requires) : null;
  const doneLessons = selectedMod
    ? selectedMod.lessons.filter((l) => completed.includes(lessonId(selectedMod.slug, l.slug))).length
    : 0;
  const unlocks = selectedSkillNode ? SKILL_NODES.filter((n) => n.requires.includes(selectedSkillNode.id)) : [];
  const tracks = Array.from(new Set(SKILL_NODES.map((n) => n.track)));

  const totalNodes = SKILL_NODES.length;
  const masteredCount = SKILL_NODES.filter((n) => fullyCompleted.has(n.id)).length;
  const availableCount = SKILL_NODES.filter((n) => getStatus(n.id, n.requires) === "available" && !fullyCompleted.has(n.id) && !completedSet.has(n.id)).length;

  if (!mounted) return null;

  return (
    <div className="flex h-screen flex-col bg-[#050508]">
      {/* Header */}
      <div className="border-b border-[#1a1a2e] bg-[#08080f]/80 backdrop-blur px-6 py-3 z-10">
        <div className="mx-auto flex max-w-7xl items-center gap-6">
          <div>
            <h1 className="text-xl font-bold text-white">Skill Tree</h1>
            <p className="text-xs text-gray-500">
              <span className="text-yellow-400 font-semibold">{masteredCount}</span> mastered ·{" "}
              <span className="text-blue-400 font-semibold">{availableCount}</span> unlocked ·{" "}
              {totalNodes - masteredCount - availableCount} remaining
            </p>
          </div>

          {/* Track filter pills */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            <button
              onClick={() => setFilterTrack("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                filterTrack === "all" ? "bg-white/10 text-white ring-1 ring-white/20" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              All
            </button>
            {tracks.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTrack(t)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all"
                style={{
                  background: filterTrack === t ? TRACK_COLORS[t] + "33" : "transparent",
                  color: filterTrack === t ? TRACK_COLORS[t] : "#6b7280",
                  border: `1px solid ${filterTrack === t ? TRACK_COLORS[t] + "66" : "transparent"}`,
                }}
              >
                {TRACK_LABELS[t] ?? t}
              </button>
            ))}
          </div>

          <Link href="/learn" className="btn-primary text-sm shrink-0">Browse Courses</Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* React Flow canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.2}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} color="#1a1a2e" gap={28} size={1} />
            <Controls className="[&>button]:bg-surface [&>button]:border-line [&>button]:text-gray-400" />
          </ReactFlow>
        </div>

        {/* Side panel */}
        {selectedSkillNode && (
          <div
            className="w-72 shrink-0 border-l overflow-y-auto flex flex-col"
            style={{ background: "#08080f", borderColor: "#1a1a2e" }}
          >
            {/* Hero */}
            <div
              className="p-5 border-b"
              style={{
                background: `radial-gradient(ellipse at top, ${TRACK_COLORS[selectedSkillNode.track]}18 0%, transparent 70%)`,
                borderColor: "#1a1a2e",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{selectedStatus === "locked" ? "🔒" : selectedSkillNode.emoji}</span>
                <button onClick={() => setSelectedId(null)} className="text-gray-600 hover:text-gray-300 text-lg leading-none">✕</button>
              </div>
              <h2 className="text-lg font-bold text-white">{selectedSkillNode.label}</h2>
              <span
                className="inline-block rounded-full px-2 py-0.5 text-xs font-medium mt-1"
                style={{ background: TRACK_COLORS[selectedSkillNode.track] + "33", color: TRACK_COLORS[selectedSkillNode.track] }}
              >
                {TRACK_LABELS[selectedSkillNode.track]}
              </span>
            </div>

            {/* Status */}
            <div className="p-5 space-y-4">
              <div
                className="rounded-lg px-3 py-2.5 text-sm"
                style={{
                  background:
                    selectedStatus === "complete" ? "#FFD70018"
                    : selectedStatus === "in-progress" ? "#3b82f618"
                    : selectedStatus === "available" ? "#22c55e18"
                    : "#ffffff08",
                  border: `1px solid ${
                    selectedStatus === "complete" ? "#FFD70033"
                    : selectedStatus === "in-progress" ? "#3b82f633"
                    : selectedStatus === "available" ? "#22c55e33"
                    : "#ffffff11"
                  }`,
                  color:
                    selectedStatus === "complete" ? "#FFD700"
                    : selectedStatus === "in-progress" ? "#93c5fd"
                    : selectedStatus === "available" ? "#86efac"
                    : "#6b7280",
                }}
              >
                {selectedStatus === "complete" && `✦ Mastered — all ${selectedSkillNode.lessonCount} lessons complete`}
                {selectedStatus === "in-progress" && `⚡ In progress — ${doneLessons} of ${selectedMod?.lessons.length} lessons done`}
                {selectedStatus === "available" && "🔓 Unlocked — ready to start"}
                {selectedStatus === "locked" && "🔒 Locked — complete prerequisites first"}
              </div>

              {/* Progress bar */}
              {(selectedStatus === "in-progress" || selectedStatus === "complete") && selectedMod && (
                <div>
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: "#6b7280" }}>
                    <span>Progress</span>
                    <span style={{ color: selectedStatus === "complete" ? "#FFD700" : TRACK_COLORS[selectedSkillNode.track] }}>
                      {Math.round((doneLessons / selectedMod.lessons.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1a1a2e" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((doneLessons / selectedMod.lessons.length) * 100)}%`,
                        background: selectedStatus === "complete"
                          ? "linear-gradient(90deg, #b8860b, #FFD700)"
                          : `linear-gradient(90deg, ${TRACK_COLORS[selectedSkillNode.track]}88, ${TRACK_COLORS[selectedSkillNode.track]})`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {selectedSkillNode.requires.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#374151" }}>Prerequisites</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkillNode.requires.map((r) => {
                      const rNode = SKILL_NODES.find((n) => n.id === r);
                      const rDone = fullyCompleted.has(r);
                      return (
                        <button
                          key={r}
                          onClick={() => setSelectedId(r)}
                          className="rounded-md px-2 py-1 text-xs transition-colors hover:text-white"
                          style={{
                            background: rDone ? "#FFD70018" : "#1a1a2e",
                            color: rDone ? "#FFD700" : "#6b7280",
                            border: `1px solid ${rDone ? "#FFD70033" : "#2a2a2a"}`,
                          }}
                        >
                          {rNode?.emoji} {rNode?.label ?? r} {rDone ? "✓" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Unlocks */}
              {unlocks.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#374151" }}>Unlocks</p>
                  <div className="flex flex-wrap gap-1.5">
                    {unlocks.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => setSelectedId(u.id)}
                        className="rounded-md px-2 py-1 text-xs transition-colors hover:text-white"
                        style={{ background: "#1a1a2e", color: "#9ca3af", border: "1px solid #2a2a2a" }}
                      >
                        {u.emoji} {u.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {selectedStatus !== "locked" ? (
                <Link
                  href={`/learn/${selectedSkillNode.id}`}
                  className="block w-full text-center rounded-lg py-2.5 text-sm font-semibold transition-all"
                  style={{
                    background: selectedStatus === "complete"
                      ? "linear-gradient(135deg, #b8860b, #FFD700)"
                      : `linear-gradient(135deg, ${TRACK_COLORS[selectedSkillNode.track]}88, ${TRACK_COLORS[selectedSkillNode.track]})`,
                    color: selectedStatus === "complete" ? "#000" : "#fff",
                  }}
                >
                  {selectedStatus === "complete" ? "Review Module →" : selectedStatus === "in-progress" ? "Continue →" : "Start Module →"}
                </Link>
              ) : (
                <div className="text-center text-xs py-2" style={{ color: "#4b5563" }}>
                  Complete prerequisites to unlock
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom legend */}
      <div className="border-t px-6 py-2.5" style={{ borderColor: "#1a1a2e", background: "#08080f" }}>
        <div className="mx-auto flex max-w-7xl items-center gap-5 text-xs" style={{ color: "#4b5563" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-[#2a2a2a] bg-[#0a0a0a]" />
            Locked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#3b82f633", border: "1px solid #3b82f666" }} />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#60a5fa33", border: "1px solid #60a5fa66" }} />
            In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#FFD70033", border: "1px solid #FFD700" }} />
            Mastered
          </span>
          <span className="ml-auto">Scroll to zoom · Drag to pan · Click a node to inspect</span>
        </div>
      </div>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes skill-pulse {
          0%, 100% { box-shadow: 0 0 0 2px var(--pulse-color, #3b82f6)55, 0 0 12px 2px var(--pulse-color, #3b82f6)22; }
          50% { box-shadow: 0 0 0 4px var(--pulse-color, #3b82f6)88, 0 0 24px 6px var(--pulse-color, #3b82f6)44; }
        }
        @keyframes skill-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
        .react-flow__node { background: transparent !important; border: none !important; }
        .react-flow__controls { background: #0d0d14 !important; border-color: #1a1a2e !important; }
        .react-flow__controls button { background: #0d0d14 !important; border-color: #1a1a2e !important; color: #6b7280 !important; }
        .react-flow__controls button:hover { background: #1a1a2e !important; color: #e5e7eb !important; }
      `}</style>
    </div>
  );
}

export default function SkillTreePage() {
  return (
    <ReactFlowProvider>
      <SkillTreeInner />
    </ReactFlowProvider>
  );
}
