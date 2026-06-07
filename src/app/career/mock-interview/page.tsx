"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Loader2,
  Lock,
  Mic,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import {
  ROLES,
  INTERVIEW_TYPE_LABELS,
  INTERVIEW_TYPE_DESCRIPTIONS,
  buildInterviewerContext,
  typePill,
} from "@/lib/mockInterview";
import type { InterviewRole, InterviewType } from "@/lib/mockInterview";
import { useProAccess } from "@/store/useEntitlements";
import { useMounted } from "@/hooks/useMounted";
import { track } from "@/lib/analytics/track";

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatMessage = { role: "user" | "assistant"; content: string };

type Phase = "pick-role" | "pick-type" | "interview";

// ─── Constants ────────────────────────────────────────────────────────────────

const INTERVIEW_TYPES: InterviewType[] = [
  "behavioral",
  "coding-concept",
  "system-design",
];

// Opening message that seeds the conversation — the AI sees this as the first
// user turn, which triggers the interviewer persona to ask the first question.
const SEED_MESSAGE = "I'm ready. Please start the interview.";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function updateLast(messages: ChatMessage[], content: string): ChatMessage[] {
  const copy = [...messages];
  copy[copy.length - 1] = { role: "assistant", content };
  return copy;
}

// ─── Pro gate ─────────────────────────────────────────────────────────────────

function ProGate() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-line bg-surface-1 p-8 text-center">
      <span
        className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-surface-2"
        aria-hidden="true"
      >
        <Lock size={24} className="text-gray-400" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-white">Pro feature</h2>
      <p className="mt-2 text-sm text-gray-400">
        AI Mock Interview uses Cantrip to act as a real interviewer — asking
        questions, probing your depth, and giving honest feedback on your
        answers. Upgrade to Pro to unlock it.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <Link href="/pricing" className="btn-primary w-full justify-center">
          <Sparkles size={15} aria-hidden="true" />
          Unlock with Pro
        </Link>
        <Link
          href="/career"
          className="text-sm text-gray-500 hover:text-gray-300 transition"
        >
          Back to Career Pack
        </Link>
      </div>
    </div>
  );
}

// ─── Role picker ──────────────────────────────────────────────────────────────

function RolePicker({
  onSelect,
}: {
  onSelect: (role: InterviewRole) => void;
}) {
  return (
    <section aria-labelledby="role-heading">
      <h2
        id="role-heading"
        className="text-xl font-bold text-white"
      >
        What role are you interviewing for?
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        Pick the role that best matches the position — the AI will tailor
        questions to that domain.
      </p>

      <ul
        className="mt-6 grid gap-3 sm:grid-cols-2"
        role="list"
        aria-label="Interview roles"
      >
        {ROLES.map((role) => (
          <li key={role.id}>
            <button
              onClick={() => onSelect(role)}
              aria-label={`Select ${role.label}`}
              className="group flex w-full items-start gap-4 rounded-xl border border-line bg-surface-1 p-4 text-left transition hover:border-accent/60 hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="text-2xl" aria-hidden="true">
                {role.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white group-hover:text-white">
                  {role.label}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{role.blurb}</p>
              </div>
              <ChevronRight
                size={16}
                className="mt-1 shrink-0 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-accent-soft"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Type picker ──────────────────────────────────────────────────────────────

function TypePicker({
  role,
  onBack,
  onSelect,
}: {
  role: InterviewRole;
  onBack: () => void;
  onSelect: (type: InterviewType) => void;
}) {
  return (
    <section aria-labelledby="type-heading">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition"
        aria-label="Go back to role selection"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Change role
      </button>

      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          {role.emoji}
        </span>
        <div>
          <p className="text-xs uppercase tracking-widest text-accent-soft">
            {role.label}
          </p>
          <h2 id="type-heading" className="text-xl font-bold text-white">
            What kind of interview?
          </h2>
        </div>
      </div>

      <ul
        className="mt-6 space-y-3"
        role="list"
        aria-label="Interview types"
      >
        {INTERVIEW_TYPES.map((type) => (
          <li key={type}>
            <button
              onClick={() => onSelect(type)}
              aria-label={`Start ${INTERVIEW_TYPE_LABELS[type]} interview`}
              className="group flex w-full items-start gap-4 rounded-xl border border-line bg-surface-1 p-5 text-left transition hover:border-accent/60 hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="flex-1">
                <p className="font-semibold text-white">
                  {INTERVIEW_TYPE_LABELS[type]}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {INTERVIEW_TYPE_DESCRIPTIONS[type]}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="mt-1 shrink-0 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-accent-soft"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Interview chat ───────────────────────────────────────────────────────────

function InterviewChat({
  role,
  type,
  onReset,
}: {
  role: InterviewRole;
  type: InterviewType;
  onReset: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Kick off the interview as soon as the component mounts by sending the seed
  // message. This triggers the AI to ask the first question immediately.
  useEffect(() => {
    if (started) return;
    setStarted(true);
    sendMessage(SEED_MESSAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to the bottom whenever messages update.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || busy) return;

    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);

    const interviewerContext = buildInterviewerContext(role, type);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Reuse the tutor route. We pass the interviewer persona via
          // lessonContent so it fills the second (cached) system-prompt block.
          moduleTitle: "Mock Interview",
          lessonTitle: `${role.label} — ${INTERVIEW_TYPE_LABELS[type]}`,
          lessonContent: interviewerContext,
          language: "text",
          code: "",
          failingTests: [],
          messages: next,
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const msg: string =
          data?.error ?? "The interviewer is unavailable right now.";
        setMessages((m) => updateLast(m, msg));
        setError(msg);
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
      }
    } catch {
      const msg = "Something went wrong — please try again.";
      setMessages((m) => updateLast(m, msg));
      setError(msg);
    } finally {
      setBusy(false);
      // Return focus to the textarea after the AI responds.
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleSubmit() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    sendMessage(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Submit on Enter; Shift+Enter inserts a newline.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  // Visible messages: hide the seed message that the user never typed.
  const visibleMessages = messages.filter((m) => m.content !== SEED_MESSAGE);

  return (
    <div className="flex flex-col gap-0">
      {/* Session header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl" aria-hidden="true">
            {role.emoji}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {role.label}
            </p>
            <p className="text-xs text-gray-500">
              {typePill(type)} interview
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          aria-label="Start a new interview session"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface-1 px-3 py-1.5 text-xs text-gray-400 transition hover:border-accent/40 hover:text-white"
        >
          <RotateCcw size={12} aria-hidden="true" />
          New session
        </button>
      </div>

      {/* Chat window */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Interview conversation"
        className="h-[420px] overflow-y-auto rounded-xl border border-line bg-surface-1 p-4 space-y-4"
      >
        {/* Initial loading state — AI is composing the first question */}
        {visibleMessages.length === 0 && busy && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            <span>Your interviewer is getting started…</span>
          </div>
        )}

        {visibleMessages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              {/* Interviewer avatar */}
              {!isUser && (
                <span
                  className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm"
                  aria-hidden="true"
                >
                  <Mic size={13} className="text-accent-soft" />
                </span>
              )}

              <div
                className={[
                  "max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  isUser
                    ? "bg-accent/20 text-white"
                    : "bg-surface-2 text-gray-200",
                ].join(" ")}
              >
                {m.content ? (
                  m.content
                ) : (
                  <Loader2
                    size={14}
                    className="animate-spin text-gray-400"
                    aria-label="Loading response"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Error state */}
        {error && (
          <p role="alert" className="text-xs text-red-400 text-center pt-1">
            {error}
          </p>
        )}
      </div>

      {/* Input */}
      <div className="mt-3 flex items-end gap-2">
        <label htmlFor="interview-input" className="sr-only">
          Your answer
        </label>
        <textarea
          id="interview-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
          disabled={busy}
          rows={3}
          aria-label="Your answer"
          className="flex-1 resize-none rounded-xl border border-line bg-surface-1 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 disabled:opacity-60"
        />
        <button
          onClick={handleSubmit}
          disabled={busy || !input.trim()}
          aria-label="Send answer"
          className="btn-primary self-end px-4 py-3 disabled:opacity-40"
        >
          {busy ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-gray-600">
        This is AI-generated feedback — use it to practice, not as a guarantee
        of real interview outcomes.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MockInterviewPage() {
  const mounted = useMounted();
  const isPro = useProAccess();

  const [phase, setPhase] = useState<Phase>("pick-role");
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null);
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);

  // Gate: treat as locked until hydrated to avoid flash for free users.
  const locked = !mounted || !isPro;

  // Track paywall views.
  useEffect(() => {
    if (mounted && locked) {
      track("paywall_viewed", { source: "mock_interview_pro_gate" });
    }
  }, [mounted, locked]);

  function handleRoleSelect(role: InterviewRole) {
    setSelectedRole(role);
    setPhase("pick-type");
  }

  function handleTypeSelect(type: InterviewType) {
    setSelectedType(type);
    setPhase("interview");
  }

  function handleReset() {
    setPhase("pick-role");
    setSelectedRole(null);
    setSelectedType(null);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-sm text-gray-500"
      >
        <Link href="/career" className="text-accent-soft hover:underline">
          Career Pack
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="text-gray-400">AI Mock Interview</span>
      </nav>

      {/* Page header */}
      <div className="mb-8 flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-2xl"
          aria-hidden="true"
        >
          <Mic size={22} className="text-accent-soft" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-white">
            AI Mock Interview{" "}
            <span className="ml-1 inline-flex items-center rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-soft align-middle">
              Pro
            </span>
          </h1>
          <p className="mt-1 text-gray-400">
            Practice with an AI interviewer that asks real questions, probes
            your depth, and gives honest feedback — just like the real thing.
          </p>
        </div>
      </div>

      {/* Content area */}
      {locked ? (
        <ProGate />
      ) : (
        <>
          {phase === "pick-role" && (
            <RolePicker onSelect={handleRoleSelect} />
          )}

          {phase === "pick-type" && selectedRole && (
            <TypePicker
              role={selectedRole}
              onBack={() => setPhase("pick-role")}
              onSelect={handleTypeSelect}
            />
          )}

          {phase === "interview" && selectedRole && selectedType && (
            <InterviewChat
              role={selectedRole}
              type={selectedType}
              onReset={handleReset}
            />
          )}
        </>
      )}
    </div>
  );
}
