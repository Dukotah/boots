"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  PanelLeftClose,
  PanelLeftOpen,
  ListChecks,
  HelpCircle,
  Wand2,
  X,
} from "lucide-react";
import type { Module } from "@/lib/curriculum/types";
import { lessonId } from "@/lib/curriculum";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

// The course progress map: every lesson in the current course, in order, with a
// green check on the ones you've cleared and the current quest highlighted.
//
// Layout strategy: on lg+ it's an inline collapsible column (the parent grid
// stays lg:grid-cols-2 for content+editor — this sits *outside* that grid). On
// small screens it collapses into an off-canvas drawer toggled by a floating
// button so it never crowds the editor.
export function LessonSidebar({
  module,
  currentSlug,
}: {
  module: Module;
  currentSlug: string;
}) {
  const mounted = useMounted();
  const completed = useGameStore((s) => s.completed);
  // Collapsed by default on mobile; the desktop column starts open.
  const [openDesktop, setOpenDesktop] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Mobile drawer is a modal: lock background scroll, trap focus, close on
  // Escape, and restore focus to the toggle when it closes (a11y — ROADMAP 3.5).
  useEffect(() => {
    if (!openMobile) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      drawerRef.current
        ? Array.from(
            drawerRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMobile(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      openButtonRef.current?.focus();
    };
  }, [openMobile]);

  const doneCount = module.lessons.filter((l) =>
    mounted ? completed.includes(lessonId(module.slug, l.slug)) : false,
  ).length;

  const list = (
    <nav className="space-y-1">
      {module.lessons.map((l, i) => {
        const isCurrent = l.slug === currentSlug;
        const done = mounted && completed.includes(lessonId(module.slug, l.slug));
        return (
          <Link
            key={l.slug}
            href={`/learn/${module.slug}/${l.slug}`}
            onClick={() => setOpenMobile(false)}
            aria-current={isCurrent ? "page" : undefined}
            className={[
              "group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
              isCurrent
                ? "bg-accent/15 text-white ring-1 ring-accent/40"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
            ].join(" ")}
          >
            <span className="mt-0.5 shrink-0">
              {done ? (
                <CheckCircle2 size={16} className="text-success" />
              ) : (
                <Circle
                  size={16}
                  className={isCurrent ? "text-accent-soft" : "text-gray-600"}
                />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="mr-1 text-[10px] font-mono text-gray-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={isCurrent ? "font-semibold" : ""}>{l.title}</span>
              {l.kind === "quiz" && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-accent/15 px-1.5 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-wide text-accent-soft">
                  <HelpCircle size={9} /> Quiz
                </span>
              )}
              {l.kind === "project" && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-accent/15 px-1.5 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-wide text-accent-soft">
                  <Wand2 size={9} /> Project
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  const header = (
    <div className="mb-3">
      <Link
        href={`/learn/${module.slug}`}
        className="flex items-center gap-1.5 text-sm font-semibold text-accent-soft hover:underline"
      >
        <span>{module.emoji}</span>
        <span className="truncate">{module.title}</span>
      </Link>
      <p className="mt-1 text-xs text-gray-500" suppressHydrationWarning>
        {doneCount}/{module.lessons.length} quests cleared
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-success transition-[width] duration-500"
          style={{
            width: `${(doneCount / Math.max(1, module.lessons.length)) * 100}%`,
          }}
          suppressHydrationWarning
        />
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop: inline collapsible column ── */}
      <aside className="hidden lg:block">
        {openDesktop ? (
          <div className="card max-h-[calc(100vh-7rem)] overflow-y-auto p-4 lg:sticky lg:top-20">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <ListChecks size={13} /> Course map
              </span>
              <button
                onClick={() => setOpenDesktop(false)}
                aria-label="Collapse course map"
                className="text-gray-500 hover:text-white"
              >
                <PanelLeftClose size={16} />
              </button>
            </div>
            {header}
            {list}
          </div>
        ) : (
          <button
            onClick={() => setOpenDesktop(true)}
            aria-label="Expand course map"
            className="card sticky top-20 flex flex-col items-center gap-2 p-2 text-gray-400 hover:text-white"
          >
            <PanelLeftOpen size={18} />
            <span className="text-[10px] font-semibold uppercase tracking-wide [writing-mode:vertical-rl]">
              Course map
            </span>
          </button>
        )}
      </aside>

      {/* ── Mobile: floating toggle + off-canvas drawer ── */}
      <button
        ref={openButtonRef}
        onClick={() => setOpenMobile(true)}
        className="btn-ghost fixed bottom-4 left-4 z-30 px-3 py-2 text-xs shadow-glow lg:hidden"
        aria-label="Open course map"
        aria-haspopup="dialog"
        aria-expanded={openMobile}
      >
        <ListChecks size={15} />
        <span suppressHydrationWarning>
          {doneCount}/{module.lessons.length}
        </span>
      </button>

      <AnimatePresence>
        {openMobile && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMobile(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Course map"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="absolute inset-y-0 left-0 w-[82%] max-w-xs overflow-y-auto border-r border-line bg-surface p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <ListChecks size={13} /> Course map
                </span>
                <button
                  onClick={() => setOpenMobile(false)}
                  aria-label="Close course map"
                  className="text-gray-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              {header}
              {list}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
