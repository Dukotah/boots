"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Flame,
  Trophy,
  Bot,
  Sparkles,
  Check,
  CheckCircle2,
  Swords,
  Languages,
  BookOpen,
  Code2,
  Play,
} from "lucide-react";
import { MODULES, totalLessons } from "@/lib/curriculum";
import { MascotBoots } from "@/components/MascotBoots";
import { PathQuiz } from "./PathQuiz";

// Mount-triggered entrance (not scroll-triggered): reliable for users, SEO/no-JS,
// and screenshots. Below-the-fold sections finish animating off-screen, so they're
// simply present when the user scrolls to them.
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Hero />
      <StatStrip />
      <HowItWorks />
      <Features />
      <Paths />
      <PathQuiz />
      <PricingTeaser />
      <FinalCta />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center lg:text-left"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-accent-soft">
          <Sparkles size={13} /> Learn to code & build with AI — gamified
        </div>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Level up your code.
          <span className="block bg-gradient-to-r from-accent-soft via-violet-300 to-emerald-300 bg-clip-text text-transparent">
            One quest at a time.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-gray-400 lg:mx-0">
          Write real, auto-graded code in your browser. Earn XP, keep your
          streak, and climb from Intern to Archmage across JavaScript, AI/LLMs,
          and more — like an RPG.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Link href="/learn" className="btn-primary text-base">
            Start learning free <ArrowRight size={18} />
          </Link>
          <Link href="/map" className="btn-ghost text-base">
            See the quest map
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          {totalLessons()} interactive lessons · No signup needed to try
        </p>
      </motion.div>

      <HeroDemo />
    </section>
  );
}

/** The "watch a test go green" juice — our marketing asset, animated. */
function HeroDemo() {
  const reduce = useReducedMotion();
  const tests = ["add(2, 3) === 5", "add(-1, 1) === 0", "add(10, 20) === 30"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="relative"
    >
      {/* glow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/10 blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-glow">
        {/* editor header */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <span className="ml-2 font-mono text-xs text-gray-500">solution.js</span>
        </div>

        {/* code */}
        <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-gray-300">
          <code>
            <span className="text-violet-300">function</span>{" "}
            <span className="text-emerald-300">add</span>(a, b) {"{"}
            {"\n"}
            {"  "}
            <span className="text-violet-300">return</span> a + b;
            {"\n"}
            {"}"}
          </code>
        </pre>

        {/* results */}
        <div className="space-y-1.5 border-t border-line bg-[#0d0d17] px-4 py-3">
          {tests.map((t, i) => (
            <motion.div
              key={t}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.25, duration: 0.3 }}
              className="flex items-center gap-2 text-xs"
            >
              <CheckCircle2 size={14} className="text-success" />
              <span className="font-mono text-gray-400">{t}</span>
              <span className="ml-auto font-semibold text-success">pass</span>
            </motion.div>
          ))}
        </div>

        {/* xp reward bar */}
        <div className="flex items-center gap-3 border-t border-line px-4 py-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
              initial={{ width: "30%" }}
              animate={{ width: "78%" }}
              transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 14 }}
            className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold"
          >
            <Zap size={13} /> +30 XP
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Stat strip ───────────────────────────────────────────────────────────── */

function StatStrip() {
  const stats = [
    { value: `${totalLessons()}+`, label: "interactive lessons" },
    { value: `${MODULES.length}`, label: "courses & growing" },
    { value: "$0", label: "to start — no card" },
    { value: "100%", label: "runs in your browser" },
  ];
  return (
    <motion.section
      {...fadeUp}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
    >
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-4 py-6 text-center">
          <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
          <p className="mt-1 text-xs text-gray-400">{s.label}</p>
        </div>
      ))}
    </motion.section>
  );
}

/* ── How it works ─────────────────────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    { icon: BookOpen, title: "Read a short lesson", body: "Tight, practical explanations — no fluff, no 3-hour videos." },
    { icon: Code2, title: "Write & run real code", body: "An in-browser editor grades your code against tests instantly." },
    { icon: Trophy, title: "Earn XP & level up", body: "Every pass earns XP and gold and unlocks the next quest." },
  ];
  return (
    <section className="py-20">
      <motion.div {...fadeUp} className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          A feedback loop that actually sticks
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-gray-400">
          The same loop that makes games addictive — applied to learning to code.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className="card"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
              <s.icon size={20} />
            </div>
            <h3 className="font-semibold text-white">
              {i + 1}. {s.title}
            </h3>
            <p className="mt-1 text-sm text-gray-400">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────────────────────────── */

function Features() {
  const feats = [
    { icon: Zap, title: "XP & ranks", body: "Climb from Intern to Archmage on a real RPG curve." },
    { icon: Flame, title: "Streaks", body: "Daily practice with freezes that forgive an off day." },
    { icon: Swords, title: "Leagues", body: "Compete fairly with learners who started when you did." },
    { icon: Bot, title: "AI tutor", body: "Boots mentors you Socratically — it won't just hand over the answer." },
    { icon: Trophy, title: "Achievements", body: "Loot, badges and milestones reward breadth, not grind." },
    { icon: Languages, title: "Multi-language", body: "JavaScript, AI/LLMs, and more — learn the path you actually want." },
  ];
  return (
    <section className="py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feats.map((f, i) => (
          <motion.div
            key={f.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}
            className="card transition-transform hover:-translate-y-1"
          >
            <f.icon className="mb-3 text-accent-soft" size={22} />
            <h3 className="font-semibold text-white">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Paths ────────────────────────────────────────────────────────────────── */

function Paths() {
  return (
    <section className="py-12">
      <motion.div {...fadeUp} className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Pick your path
          </h2>
          <p className="text-sm text-gray-400">
            Multi-language from day one — including AI.
          </p>
        </div>
        <Link href="/learn" className="text-sm text-accent-soft hover:underline">
          View all →
        </Link>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2">
        {MODULES.map((m, i) => (
          <motion.div
            key={m.slug}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.08 }}
          >
            <Link
              href={`/learn/${m.slug}`}
              className={`card group block bg-gradient-to-br ${m.gradient} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{m.emoji}</span>
                <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300">
                  {m.lessons.length} lessons
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{m.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{m.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                Start <ArrowRight size={15} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Pricing teaser ───────────────────────────────────────────────────────── */

function PricingTeaser() {
  return (
    <motion.section
      {...fadeUp}
      className="my-12 overflow-hidden rounded-3xl border border-accent/40 bg-surface p-8 text-center shadow-glow sm:p-12"
    >
      <h2 className="text-3xl font-bold tracking-tight text-white">
        Free to learn. Pro to play.
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-pretty text-gray-400">
        Every lesson is readable for free. Go Pro to unlock the full game loop,
        the AI tutor, and every interactive exercise — from{" "}
        <span className="font-semibold text-white">$9/mo</span> billed annually.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/pricing" className="btn-primary text-base">
          <Sparkles size={16} /> See pricing
        </Link>
        <Link href="/learn" className="btn-ghost text-base">
          <Play size={15} /> Try a lesson first
        </Link>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <Check size={13} className="text-success" /> Cancel anytime
        </span>
        <span className="inline-flex items-center gap-1">
          <Check size={13} className="text-success" /> No card to start
        </span>
        <span className="inline-flex items-center gap-1">
          <Check size={13} className="text-success" /> Content free forever
        </span>
      </div>
    </motion.section>
  );
}

/* ── Final CTA ────────────────────────────────────────────────────────────── */

function FinalCta() {
  return (
    <motion.section {...fadeUp} className="flex flex-col items-center py-20 text-center">
      <MascotBoots size={72} />
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Your first quest is waiting.
      </h2>
      <p className="mt-2 max-w-md text-pretty text-gray-400">
        Write your first line of graded code in the next two minutes.
      </p>
      <Link href="/learn" className="btn-primary mt-6 text-base">
        Start learning free <ArrowRight size={18} />
      </Link>
    </motion.section>
  );
}
