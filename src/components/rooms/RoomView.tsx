"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Flag, Check, Lightbulb, X } from "lucide-react";
import type { Room } from "@/lib/rooms/types";
import { checkFlag, roomTaskId, roomXp } from "@/lib/rooms";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { celebrate } from "@/lib/celebrate";

export function RoomView({ room }: { room: Room }) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  const completeLesson = useGameStore((s) => s.completeLesson);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<Record<string, boolean>>({});
  const [hintsOpen, setHintsOpen] = useState<Record<string, boolean>>({});

  const isCaptured = (taskSlug: string) =>
    mounted && completed.includes(roomTaskId(room.slug, taskSlug));

  const capturedCount = useMemo(
    () =>
      mounted
        ? room.tasks.filter((t) => completed.includes(roomTaskId(room.slug, t.slug))).length
        : 0,
    [mounted, completed, room],
  );
  const allDone = capturedCount === room.tasks.length;

  function submit(taskSlug: string) {
    const task = room.tasks.find((t) => t.slug === taskSlug);
    if (!task || isCaptured(taskSlug)) return;
    const value = inputs[taskSlug] ?? "";
    if (!value.trim()) return;

    if (checkFlag(task, value)) {
      setWrong((w) => ({ ...w, [taskSlug]: false }));
      completeLesson(roomTaskId(room.slug, task.slug), task.xp);
      celebrate();
    } else {
      setWrong((w) => ({ ...w, [taskSlug]: true }));
    }
  }

  return (
    <div className="mt-8">
      {/* Progress header */}
      <div className="card flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
          <Flag size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-white">
              {mounted ? capturedCount : 0} / {room.tasks.length} flags captured
            </span>
            <span className="text-gray-400">{roomXp(room)} XP on the table</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
              initial={{ width: 0 }}
              animate={{
                width: `${room.tasks.length ? (capturedCount / room.tasks.length) * 100 : 0}%`,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
        </div>
      </div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-success/40 bg-success/10 p-4 text-center"
        >
          <p className="font-bold text-success">Room cleared! 🎉</p>
          <p className="mt-1 text-sm text-gray-300">
            Every flag captured. Nice work — try another challenge.
          </p>
        </motion.div>
      )}

      {/* Tasks */}
      <ol className="mt-6 space-y-4">
        {room.tasks.map((task, i) => {
          const captured = isCaptured(task.slug);
          const isWrong = wrong[task.slug];
          return (
            <li
              key={task.slug}
              className={`card ${captured ? "border-success/40" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-bold ${
                    captured
                      ? "bg-success/20 text-success"
                      : "bg-surface-2 text-gray-400"
                  }`}
                >
                  {captured ? <Check size={16} /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="prose-lesson">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {task.prompt}
                    </ReactMarkdown>
                  </div>

                  {task.code && (
                    <pre className="mt-2 overflow-x-auto rounded-xl border border-line bg-[#0d0d17] p-3 text-sm text-gray-200">
                      <code>{task.code}</code>
                    </pre>
                  )}

                  {/* Answer / flag input */}
                  {captured ? (
                    <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-success">
                      <Check size={15} /> Flag captured · +{task.xp} XP
                    </p>
                  ) : (
                    <div className="mt-3">
                      <div className="flex items-stretch gap-2">
                        <input
                          value={inputs[task.slug] ?? ""}
                          onChange={(e) =>
                            setInputs((v) => ({ ...v, [task.slug]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") submit(task.slug);
                          }}
                          placeholder="Submit your flag…"
                          aria-label={`Flag for task ${i + 1}`}
                          className={`flex-1 rounded-lg border bg-canvas px-3 py-2 font-mono text-sm text-white outline-none focus:border-accent ${
                            isWrong ? "border-danger" : "border-line"
                          }`}
                        />
                        <button
                          onClick={() => submit(task.slug)}
                          className="btn-primary px-4"
                        >
                          <Flag size={15} /> Submit
                        </button>
                      </div>
                      {isWrong && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-danger">
                          <X size={12} /> Not quite — check it and try again.
                        </p>
                      )}
                      {task.hint && (
                        <div className="mt-2">
                          <button
                            onClick={() =>
                              setHintsOpen((h) => ({ ...h, [task.slug]: !h[task.slug] }))
                            }
                            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                          >
                            <Lightbulb size={13} />
                            {hintsOpen[task.slug] ? "Hide hint" : "Show hint"}
                          </button>
                          {hintsOpen[task.slug] && (
                            <div className="prose-lesson mt-1.5 rounded-lg border border-line bg-canvas/40 px-3 py-2 text-sm">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {task.hint}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
