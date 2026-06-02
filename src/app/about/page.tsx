import Link from "next/link";
import type { Metadata } from "next";
import { MascotBoots } from "@/components/MascotBoots";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is and why it exists — learn to code the fun way.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center gap-3">
        <MascotBoots size={44} />
        <h1 className="text-3xl font-bold text-white">About {SITE.name}</h1>
      </div>

      <div className="mt-8 space-y-5 text-gray-300">
        <p>
          {SITE.name} is a gamified coding academy built on one belief:{" "}
          <strong className="text-white">
            learning to code should feel less like a textbook and more like a game.
          </strong>{" "}
          You write real code in your browser, it’s graded instantly, and you earn
          XP and keep streaks as you climb from Intern to Archmage.
        </p>
        <p>
          Every lesson runs locally — JavaScript in a sandbox, Python via WebAssembly,
          SQL on an in-browser database — so there’s nothing to install and nothing
          to set up. The written content is free; the interactive game loop and AI
          tutor are what make it stick.
        </p>
        <p>
          We also do something most coding sites don’t: we teach{" "}
          <Link href="/learn/digital-safety" className="text-accent-soft hover:underline">
            digital safety
          </Link>{" "}
          — a free course that helps people (and their families) spot scams and stay
          safe online. Because being good with technology shouldn’t require a CS
          degree.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat value="22+" label="interactive courses" />
          <Stat value="169+" label="hands-on lessons" />
          <Stat value="3" label="languages, zero setup" />
        </div>

        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5 text-center">
          <p className="text-sm text-gray-200">Ready to cast your first spell?</p>
          <Link href="/learn" className="btn-primary mx-auto mt-3 w-fit">
            Start learning free
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{label}</p>
    </div>
  );
}
