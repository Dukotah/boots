"use client";

// /teams — "Cantrip for Teams" B2B marketing landing page.
//
// Value props for engineering managers, bootcamp operators, and L&D teams.
// Ends with a waitlist email form that POSTs to /api/teams-waitlist.
// Fully self-contained — no shared state required.

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  BarChart3,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Trophy,
  Building2,
  GraduationCap,
  Code2,
} from "lucide-react";
import { SITE } from "@/lib/site";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error" | "already";

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Hero />
      <ValueProps />
      <HowItWorks />
      <SocialProofStrip />
      <Pricing />
      <WaitlistSection />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="py-10 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-accent-soft">
        <Building2 size={13} /> Built for teams, bootcamps &amp; L&amp;D
      </div>
      <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
        {SITE.name} for Teams
        <span className="block bg-gradient-to-r from-accent-soft via-violet-300 to-emerald-300 bg-clip-text text-transparent">
          Skill up your whole crew.
        </span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-gray-400">
        Give your engineers, students, or new hires the same gamified coding
        academy you love — managed under one org, with cohort progress
        dashboards and per-seat Pro access.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="#waitlist" className="btn-primary text-base">
          Join the waitlist <ArrowRight size={18} />
        </a>
        <Link href="/learn" className="btn-ghost text-base">
          <BookOpen size={15} /> Try a free lesson
        </Link>
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Early-access pricing · No credit card to join waitlist
      </p>
    </section>
  );
}

// ── Value props ───────────────────────────────────────────────────────────────

const VALUE_PROPS = [
  {
    icon: Users,
    title: "Managed seats",
    body: "Buy a seat bundle and invite your team by email. Members get instant Pro access — no individual billing headaches.",
  },
  {
    icon: BarChart3,
    title: "Cohort progress dashboard",
    body: "See every member's XP, streak, and course completion in one place. Spot who's thriving and who needs a nudge.",
  },
  {
    icon: Zap,
    title: "Real, auto-graded code",
    body: "Every lesson runs actual JavaScript, Python, and SQL in the browser — no sandboxing workarounds, instant feedback.",
  },
  {
    icon: Trophy,
    title: "Game loop included",
    body: "XP, streaks, boss battles, and leaderboards keep your team voluntarily coming back, day after day.",
  },
  {
    icon: Code2,
    title: "AI tutor per seat",
    body: "Each member gets the AI tutor that gives contextual hints without giving answers away — scales to any team size.",
  },
  {
    icon: ShieldCheck,
    title: "SSO-ready (coming soon)",
    body: "Domain-based auto-provisioning via Google Workspace, Okta, or Azure AD — claim your domain and onboarding becomes zero-click.",
  },
];

function ValueProps() {
  return (
    <section className="mt-14">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">
        Everything your team needs. Nothing they don&apos;t.
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
              <Icon size={18} />
            </div>
            <h3 className="mb-1 font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "1",
    title: "Get a seat bundle",
    body: 'Choose a tier (5, 20, 60 seats, or enterprise). We send you an org invite link and you\'re live in minutes.',
  },
  {
    n: "2",
    title: "Invite your team",
    body: "Paste email addresses or share your invite link. Members accept, create (or log into) their Cantrip account, and get Pro automatically.",
  },
  {
    n: "3",
    title: "Watch the dashboard",
    body: "Your admin view shows XP earned, courses started, completion rates, and streaks — refreshed in real time.",
  },
];

function HowItWorks() {
  return (
    <section className="mt-14">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">How it works</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map(({ n, title, body }) => (
          <div key={n} className="card text-center">
            <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-lg font-bold text-accent-soft">
              {n}
            </div>
            <h3 className="mb-1 font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Social proof strip ────────────────────────────────────────────────────────

function SocialProofStrip() {
  return (
    <section className="mt-14">
      <div className="rounded-2xl border border-accent/20 bg-accent/5 px-6 py-5">
        <p className="text-center text-sm font-medium text-gray-300">
          Great for
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {[
            { icon: Building2, label: "Engineering teams levelling up" },
            { icon: GraduationCap, label: "Coding bootcamp cohorts" },
            { icon: Users, label: "L&D teams running developer programs" },
            { icon: Code2, label: "New-hire onboarding" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-gray-300"
            >
              <Icon size={12} className="text-accent-soft" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Starter",
    seats: "5 seats",
    price: "$49",
    period: "/mo",
    features: ["Cohort progress dashboard", "Full Pro per seat", "AI tutor included", "Email support"],
    highlight: false,
  },
  {
    name: "Growth",
    seats: "20 seats",
    price: "$149",
    period: "/mo",
    features: ["Everything in Starter", "Slack integration (coming soon)", "Bulk invite via CSV", "Priority support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    seats: "60+ seats",
    price: "Custom",
    period: "",
    features: ["Everything in Growth", "SSO / domain auto-provisioning", "Dedicated CSM", "Custom contract + SLA"],
    highlight: false,
  },
];

function Pricing() {
  return (
    <section className="mt-14">
      <h2 className="mb-2 text-center text-2xl font-bold text-white">
        Early-access pricing
      </h2>
      <p className="mb-8 text-center text-sm text-gray-400">
        Waitlist members lock in launch pricing. Billed annually = 2 months free.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {PLANS.map(({ name, seats, price, period, features, highlight }) => (
          <div
            key={name}
            className={`card flex flex-col ${
              highlight ? "border-accent/50 ring-1 ring-accent/30" : ""
            }`}
          >
            {highlight && (
              <div className="-mt-5 mb-4 text-center">
                <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular
                </span>
              </div>
            )}
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {seats}
            </p>
            <h3 className="mt-1 text-xl font-bold text-white">{name}</h3>
            <p className="mt-2">
              <span className="text-3xl font-extrabold text-white">{price}</span>
              <span className="text-sm text-gray-400">{period}</span>
            </p>
            <ul className="mt-4 flex-1 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className={`mt-5 block w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors ${
                highlight
                  ? "bg-accent text-white hover:bg-accent-soft"
                  : "border border-line bg-surface-2 text-gray-200 hover:border-accent/60"
              }`}
            >
              Join waitlist
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────────

function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/teams-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), teamSize: teamSize.trim() || undefined }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        skipped?: boolean;
        alreadyRegistered?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      if (data.alreadyRegistered) {
        setState("already");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <section id="waitlist" className="mt-16 scroll-mt-20">
      <div className="mx-auto max-w-xl">
        <div className="card">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
              <Zap size={18} />
            </div>
            <h2 className="text-xl font-bold text-white">Join the waitlist</h2>
          </div>
          <p className="mb-5 text-sm text-gray-400">
            Be first to know when Teams launches and lock in early-access pricing.
          </p>

          {state === "success" && (
            <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-center">
              <CheckCircle2 size={22} className="mx-auto mb-2 text-success" />
              <p className="font-semibold text-white">You&apos;re on the list!</p>
              <p className="mt-1 text-sm text-gray-400">
                We&apos;ll email you at <span className="text-white">{email}</span> when
                Teams is ready. Expect early-access pricing.
              </p>
            </div>
          )}

          {state === "already" && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-4 text-center">
              <CheckCircle2 size={22} className="mx-auto mb-2 text-accent-soft" />
              <p className="font-semibold text-white">Already registered!</p>
              <p className="mt-1 text-sm text-gray-400">
                That address is already on the waitlist. We&apos;ll be in touch.
              </p>
            </div>
          )}

          {(state === "idle" || state === "submitting" || state === "error") && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="teams-email" className="mb-1 block text-xs font-medium text-gray-400">
                  Work email
                </label>
                <input
                  id="teams-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  disabled={state === "submitting"}
                  className="w-full rounded-lg border border-line bg-canvas/60 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent/60 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="teams-size" className="mb-1 block text-xs font-medium text-gray-400">
                  Team size{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <select
                  id="teams-size"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  disabled={state === "submitting"}
                  className="w-full rounded-lg border border-line bg-canvas/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent/60 disabled:opacity-60"
                >
                  <option value="">Select size…</option>
                  <option value="1–4">1–4</option>
                  <option value="5–10">5–10</option>
                  <option value="11–25">11–25</option>
                  <option value="26–50">26–50</option>
                  <option value="51–100">51–100</option>
                  <option value="100+">100+</option>
                </select>
              </div>

              {state === "error" && (
                <p className="text-xs text-danger">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={state === "submitting" || !email.trim()}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "submitting" ? "Joining…" : "Notify me when Teams launches"}
              </button>

              <p className="text-center text-xs text-gray-400">
                No spam. Unsubscribe any time. No credit card required.
              </p>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Questions?{" "}
          <a
            href="mailto:hello@cantrip.dev"
            className="text-accent-soft hover:underline"
          >
            Email us
          </a>{" "}
          or{" "}
          <Link href="/pricing" className="text-accent-soft hover:underline">
            see individual pricing
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
