import Link from "next/link";
import { ArrowRight, Zap, Flame, Trophy, Bot, Code2, Sparkles } from "lucide-react";
import { MODULES, totalLessons } from "@/lib/curriculum";
import { MascotBoots } from "@/components/MascotBoots";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="flex flex-col items-center py-20 text-center">
        <div className="mb-6 animate-pop-in">
          <MascotBoots size={92} />
        </div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-accent-soft">
          <Sparkles size={13} /> Learn to code & build with AI — gamified
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Level up your code.
          <span className="block bg-gradient-to-r from-accent-soft to-emerald-300 bg-clip-text text-transparent">
            One quest at a time.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-gray-400">
          Write real, auto-graded code in your browser. Earn XP, keep your
          streak, and level up across JavaScript, AI/LLMs, and more — like an RPG.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/learn" className="btn-primary text-base">
            Start learning free <ArrowRight size={18} />
          </Link>
          <Link href="/pricing" className="btn-ghost text-base">
            See pricing
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          {totalLessons()} interactive lessons · No signup needed to try
        </p>
      </section>

      {/* Feature strip */}
      <section className="grid gap-4 py-8 sm:grid-cols-3">
        {[
          { icon: Zap, title: "Earn XP", body: "Every passing test levels you up toward Wizard." },
          { icon: Flame, title: "Keep your streak", body: "Daily practice with streak freezes that forgive an off day." },
          { icon: Trophy, title: "Climb leagues", body: "Compete fairly with learners who started when you did." },
        ].map((f) => (
          <div key={f.title} className="card">
            <f.icon className="mb-3 text-accent-soft" />
            <h3 className="font-semibold text-white">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{f.body}</p>
          </div>
        ))}
      </section>

      {/* Modules */}
      <section className="py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Pick your path</h2>
            <p className="text-sm text-gray-400">
              Multi-language from day one — including AI.
            </p>
          </div>
          <Link href="/learn" className="text-sm text-accent-soft hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link
              key={m.slug}
              href={`/learn/${m.slug}`}
              className={`card group bg-gradient-to-br ${m.gradient} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{m.emoji}</span>
                <span className="rounded-full bg-black/30 px-2 py-1 text-xs text-gray-300">
                  {m.lessons.length} lessons
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{m.title}</h3>
              <p className="mt-1 text-sm text-gray-300">{m.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                Start <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI tutor teaser */}
      <section className="my-12 flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface p-10 text-center">
        <Bot className="text-accent-soft" size={36} />
        <h2 className="text-2xl font-bold text-white">
          Stuck? Boots tutors you — Socratically.
        </h2>
        <p className="max-w-xl text-sm text-gray-400">
          Our AI mentor won&apos;t just hand you the answer. It asks the right
          questions so the concept actually sticks. (Coming next on the roadmap.)
        </p>
        <Link href="/learn" className="btn-primary">
          <Code2 size={16} /> Try a lesson now
        </Link>
      </section>
    </div>
  );
}
