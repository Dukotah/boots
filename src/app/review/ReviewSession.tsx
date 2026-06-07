"use client";

/**
 * ReviewSession — retrieval-practice card session.
 *
 * Shows one due lesson at a time. The learner types a recall attempt (or
 * writes a keyword/key-concept), then clicks "Reveal" to see the full lesson
 * blurb and explanation. After reveal, they rate their recall (Again / Hard /
 * Good / Easy). The rating is fed into the FSRS scheduler via completeLesson.
 *
 * This is the "testing effect" path: recall before recognition ≈ +50% retention
 * over re-reading (Roediger & Karpicke 2006, cited in STRATEGY-RESEARCH-2026-06).
 */

import { useState, useCallback } from "react";
import { Brain, Eye, RotateCcw, CheckCircle2, ChevronRight } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { getLesson } from "@/lib/curriculum";
import type { Rating } from "@/lib/mastery";

type DueLesson = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  blurb: string;
  content: string;
};

type CardPhase = "recall" | "revealed" | "done";

type SessionSummary = {
  total: number;
  ratings: Record<Rating, number>;
};

const RATING_CONFIG: {
  rating: Rating;
  label: string;
  shortcut: string;
  color: string;
  bg: string;
  description: string;
}[] = [
  {
    rating: "again",
    label: "Again",
    shortcut: "1",
    color: "text-red-400",
    bg: "bg-red-500/10 hover:bg-red-500/20 border-red-500/30",
    description: "Completely blank",
  },
  {
    rating: "hard",
    label: "Hard",
    shortcut: "2",
    color: "text-orange-400",
    bg: "bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30",
    description: "Recalled with effort",
  },
  {
    rating: "good",
    label: "Good",
    shortcut: "3",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30",
    description: "Recalled correctly",
  },
  {
    rating: "easy",
    label: "Easy",
    shortcut: "4",
    color: "text-sky-400",
    bg: "bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/30",
    description: "Instantly remembered",
  },
];

function extractFirstParagraph(markdown: string): string {
  // Pull the first non-heading, non-empty line from markdown content.
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("```")) {
      // Strip basic markdown bold/italic so it reads as plain text.
      return trimmed.replace(/\*\*/g, "").replace(/\*/g, "").slice(0, 200);
    }
  }
  return "";
}

// ── Card component (single card in the session) ──────────────────────────────

function ReviewCard({
  lesson,
  phase,
  recallText,
  onRecallChange,
  onReveal,
  onRate,
}: {
  lesson: DueLesson;
  phase: CardPhase;
  recallText: string;
  onRecallChange: (v: string) => void;
  onReveal: () => void;
  onRate: (r: Rating) => void;
}) {
  const hint = extractFirstParagraph(lesson.content);

  return (
    <div className="flex flex-col gap-4">
      {/* Card */}
      <div className="card rounded-xl p-6">
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <Brain size={20} className="mt-0.5 shrink-0 text-accent-soft" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Retrieve from memory
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">{lesson.title}</h2>
          </div>
        </div>

        {/* Prompt */}
        <p className="mb-4 text-sm text-gray-400">
          Before seeing anything, write down what you remember about this topic —
          even a few words or a rough outline counts.
        </p>

        {/* Recall textarea */}
        <textarea
          value={recallText}
          onChange={(e) => onRecallChange(e.target.value)}
          disabled={phase === "revealed"}
          placeholder="Type what you remember…"
          className="w-full resize-none rounded-lg border border-white/10 bg-surface-2 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent/60 focus:outline-none disabled:opacity-50"
          rows={4}
        />

        {/* Reveal button (recall phase only) */}
        {phase === "recall" && (
          <button
            onClick={onReveal}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent/80 active:scale-95"
          >
            <Eye size={16} />
            Reveal answer
          </button>
        )}

        {/* Revealed content */}
        {phase === "revealed" && (
          <div className="mt-4 rounded-lg border border-white/10 bg-surface-2 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Key concept
            </p>
            <p className="text-sm text-gray-200">{lesson.blurb}</p>
            {hint && hint !== lesson.blurb && (
              <p className="mt-2 text-xs text-gray-400">{hint}</p>
            )}
          </div>
        )}
      </div>

      {/* Rating buttons (revealed phase only) */}
      {phase === "revealed" && (
        <div>
          <p className="mb-2 text-center text-xs text-gray-500">
            How well did you recall it?
          </p>
          <div className="grid grid-cols-4 gap-2">
            {RATING_CONFIG.map(({ rating, label, shortcut, color, bg, description }) => (
              <button
                key={rating}
                onClick={() => onRate(rating)}
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-3 transition-all active:scale-95 ${bg}`}
              >
                <span className={`text-sm font-bold ${color}`}>{label}</span>
                <span className="text-center text-[10px] leading-tight text-gray-500">
                  {description}
                </span>
                <span className="text-[10px] text-gray-600">[{shortcut}]</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Session summary ───────────────────────────────────────────────────────────

function SessionSummaryView({
  summary,
  onRestart,
}: {
  summary: SessionSummary;
  onRestart: () => void;
}) {
  const { total, ratings } = summary;
  const retained = (ratings.good ?? 0) + (ratings.easy ?? 0);
  const pct = total > 0 ? Math.round((retained / total) * 100) : 0;

  return (
    <div className="card flex flex-col items-center gap-6 py-10 text-center">
      <CheckCircle2 size={48} className="text-emerald-400" />
      <div>
        <h2 className="text-2xl font-bold text-white">Session complete!</h2>
        <p className="mt-1 text-gray-400">
          You recalled {retained} of {total} cards correctly ({pct}%).
        </p>
      </div>

      {/* Rating breakdown */}
      <div className="flex gap-4">
        {RATING_CONFIG.map(({ rating, label, color }) => (
          <div key={rating} className="flex flex-col items-center gap-1">
            <span className={`text-xl font-bold ${color}`}>
              {ratings[rating] ?? 0}
            </span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2 text-sm text-gray-300 hover:border-accent/60 hover:text-white"
      >
        <RotateCcw size={14} />
        Back to review list
      </button>
    </div>
  );
}

// ── Main ReviewSession ────────────────────────────────────────────────────────

export function ReviewSession({
  dueIds,
  onExit,
}: {
  dueIds: string[];
  onExit: () => void;
}) {
  const completeLesson = useGameStore((s) => s.completeLesson);

  // Resolve ids → lesson metadata, dropping any stale ids.
  const cards: DueLesson[] = dueIds
    .map((id) => {
      const [m, l] = id.split("/");
      const found = getLesson(m, l);
      if (!found) return null;
      return {
        id,
        moduleSlug: m,
        lessonSlug: l,
        title: found.lesson.title,
        blurb: found.lesson.blurb,
        content: found.lesson.content,
      };
    })
    .filter(Boolean) as DueLesson[];

  const [cardIndex, setCardIndex] = useState(0);
  const [phase, setPhase] = useState<CardPhase>("recall");
  const [recallText, setRecallText] = useState("");
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [ratingAccum, setRatingAccum] = useState<Record<string, number>>({});

  const currentCard = cards[cardIndex];

  const handleReveal = useCallback(() => {
    setPhase("revealed");
  }, []);

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!currentCard) return;

      // Record the rating in FSRS via completeLesson (re-review path).
      // XP = 0 for re-reviews (the store ignores it for already-completed lessons).
      completeLesson(currentCard.id, 0, rating);

      // Accumulate for summary display.
      const updated = { ...ratingAccum, [rating]: (ratingAccum[rating] ?? 0) + 1 };
      setRatingAccum(updated);

      // Advance or finish.
      if (cardIndex + 1 >= cards.length) {
        setSummary({
          total: cards.length,
          ratings: updated as Record<Rating, number>,
        });
      } else {
        setCardIndex((i) => i + 1);
        setPhase("recall");
        setRecallText("");
      }
    },
    [currentCard, cardIndex, cards.length, ratingAccum, completeLesson],
  );

  if (cards.length === 0) {
    return (
      <div className="card py-10 text-center text-sm text-gray-400">
        No cards to review right now.{" "}
        <button onClick={onExit} className="text-accent-soft underline">
          Back
        </button>
      </div>
    );
  }

  if (summary) {
    return <SessionSummaryView summary={summary} onRestart={onExit} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft transition-all duration-300"
            style={{ width: `${((cardIndex) / cards.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-xs text-gray-500">
          {cardIndex + 1} / {cards.length}
        </span>
        <button
          onClick={onExit}
          className="shrink-0 text-xs text-gray-600 hover:text-gray-400"
        >
          Exit
        </button>
      </div>

      {/* Card */}
      <ReviewCard
        lesson={currentCard}
        phase={phase}
        recallText={recallText}
        onRecallChange={setRecallText}
        onReveal={handleReveal}
        onRate={handleRate}
      />

      {/* Skip (doesn't rate, just advances without recording) */}
      {phase === "recall" && (
        <button
          onClick={() => {
            if (cardIndex + 1 >= cards.length) {
              setSummary({
                total: cards.length,
                ratings: ratingAccum as Record<Rating, number>,
              });
            } else {
              setCardIndex((i) => i + 1);
              setRecallText("");
            }
          }}
          className="flex items-center justify-center gap-1 text-xs text-gray-600 hover:text-gray-400"
        >
          Skip this card <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}
