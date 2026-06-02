"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Lock, Loader2 } from "lucide-react";
import type { Lesson, Module } from "@/lib/curriculum/types";
import type { LessonLanguage } from "@/lib/curriculum/types";
import { useEntitlements } from "@/store/useEntitlements";
import { useMounted } from "@/hooks/useMounted";
import { MascotBoots } from "@/components/MascotBoots";

type ChatMessage = { role: "user" | "assistant"; content: string };

// The Socratic tutor panel. Gated behind Pro in the UI; the /api/tutor route
// re-checks server-side. Streams hints token-by-token. `code` is the student's
// live editor contents, passed through so Cantrip can reference their attempt.
export function AskBoots({
  module,
  lesson,
  language,
  code,
}: {
  module: Module;
  lesson: Lesson;
  language: LessonLanguage;
  code: string;
}) {
  const mounted = useMounted();
  const isPro = useEntitlements((s) => s.isPro);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Until hydrated, assume locked to avoid flashing the panel to free users.
  const locked = !mounted || !isPro;

  async function send() {
    const question = input.trim();
    if (!question || busy) return;
    setInput("");

    const next = [...messages, { role: "user" as const, content: question }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleTitle: module.title,
          lessonTitle: lesson.title,
          lessonContent: lesson.content,
          language,
          code,
          messages: next,
        }),
      });

      if (!res.ok || !res.body) {
        const msg =
          (await res.json().catch(() => null))?.error ??
          "Cantrip is unavailable right now.";
        setMessages((m) => updateLast(m, msg));
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => updateLast(m, acc));
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
      }
    } catch {
      setMessages((m) => updateLast(m, "Something went wrong — try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card p-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        <MascotBoots size={24} />
        <span className="font-semibold text-white">Ask Cantrip</span>
        <Sparkles size={14} className="text-accent-soft" />
        <span className="ml-auto text-xs text-gray-500">
          {open ? "Hide" : "Socratic AI tutor"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line"
          >
            {locked ? (
              <div className="p-5 text-center">
                <Lock className="mx-auto text-gray-500" size={20} />
                <p className="mt-2 text-sm text-gray-300">
                  Cantrip gives Socratic hints — never the answer — to help you
                  get unstuck.
                </p>
                <Link href="/pricing" className="btn-primary mx-auto mt-3 w-fit">
                  Unlock with Pro
                </Link>
              </div>
            ) : (
              <div className="flex flex-col">
                <div
                  ref={scrollRef}
                  className="max-h-72 space-y-3 overflow-y-auto p-4"
                >
                  {messages.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Stuck? Ask Cantrip for a nudge — e.g. “Why does my loop never
                      stop?” Cantrip won’t hand over the answer, but will help you
                      find it.
                    </p>
                  )}
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={
                        m.role === "user" ? "flex justify-end" : "flex justify-start"
                      }
                    >
                      <div
                        className={[
                          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm",
                          m.role === "user"
                            ? "bg-accent/20 text-white"
                            : "bg-surface-2 text-gray-200",
                        ].join(" ")}
                      >
                        {m.content || (
                          <Loader2 size={14} className="animate-spin text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-line p-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask for a hint…"
                    disabled={busy}
                    className="flex-1 rounded-lg border border-line bg-canvas/60 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-accent/60 focus:outline-none"
                  />
                  <button
                    onClick={send}
                    disabled={busy || !input.trim()}
                    className="btn-primary px-3 py-2 disabled:opacity-40"
                  >
                    {busy ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function updateLast(messages: ChatMessage[], content: string): ChatMessage[] {
  const copy = [...messages];
  copy[copy.length - 1] = { role: "assistant", content };
  return copy;
}
