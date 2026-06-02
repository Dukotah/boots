"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ROOMS, roomTaskId, roomXp } from "@/lib/rooms";
import type { RoomDifficulty } from "@/lib/rooms/types";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

const DIFFICULTY: Record<RoomDifficulty, { label: string; cls: string }> = {
  easy: { label: "Easy", cls: "bg-success/20 text-success" },
  medium: { label: "Medium", cls: "bg-gold/20 text-gold" },
  hard: { label: "Hard", cls: "bg-danger/20 text-danger" },
};

export function RoomCatalog() {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {ROOMS.map((room) => {
        const captured = mounted
          ? room.tasks.filter((t) => completed.includes(roomTaskId(room.slug, t.slug))).length
          : 0;
        const done = captured === room.tasks.length;
        const diff = DIFFICULTY[room.difficulty];
        return (
          <Link
            key={room.slug}
            href={`/rooms/${room.slug}`}
            className={`card group bg-gradient-to-br ${room.gradient} transition-transform hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl">{room.emoji}</span>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${diff.cls}`}>
                  {diff.label}
                </span>
                <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300">
                  {room.tasks.length} flags
                </span>
              </div>
            </div>

            <h3 className="mt-4 flex items-center gap-2 text-lg font-bold text-white">
              {room.title}
              {mounted && done && <Check size={16} className="text-success" />}
            </h3>
            <p className="mt-1 text-sm text-gray-300">{room.blurb}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {room.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-400">
                {mounted ? captured : 0}/{room.tasks.length} captured · {roomXp(room)} XP
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-white">
                Enter room <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
