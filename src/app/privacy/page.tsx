import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your data.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE = "June 1, 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-400">Effective {EFFECTIVE}</p>

      <div className="prose-legal mt-8 space-y-6 text-gray-300">
        <Section title="The short version">
          We collect the minimum needed to run {SITE.name}: an account (if you sign
          up) and your learning progress. We don’t sell your data. Most of the app
          works with progress stored only in your browser.
        </Section>

        <Section title="What we collect">
          <ul>
            <li>
              <strong>Account data</strong> — if you create an account, your email
              address (via our auth provider).
            </li>
            <li>
              <strong>Learning progress</strong> — lessons completed, XP, streaks,
              and similar gameplay state. This lives in your browser by default and
              syncs to our database only when you’re signed in.
            </li>
            <li>
              <strong>Payment data</strong> — if you subscribe, billing is handled
              by our payment processor (Stripe). We never see or store full card
              numbers.
            </li>
            <li>
              <strong>Basic technical data</strong> — standard request logs and, if
              enabled, privacy-respecting analytics to understand usage.
            </li>
          </ul>
        </Section>

        <Section title="How we use it">
          To provide and improve the service, save your progress, process
          subscriptions, and keep the platform secure. We do not sell your personal
          information.
        </Section>

        <Section title="Third parties">
          We rely on a small number of processors — authentication and database
          (Supabase), payments (Stripe), and the AI tutor (Anthropic). They process
          data only to provide their part of the service.
        </Section>

        <Section title="Your choices">
          You can clear local progress from your browser at any time, request
          deletion of your account data, or use the app signed-out. To make a
          request, email us at the address below.
        </Section>

        <Section title="Children">
          {SITE.name} is intended for users 13 and older. We don’t knowingly collect
          personal information from children under 13.
        </Section>

        <Section title="Contact">
          Questions about privacy? Email{" "}
          <a className="text-accent-soft hover:underline" href="mailto:hello@cantrip.dev">
            hello@cantrip.dev
          </a>
          .
        </Section>

        <p className="text-xs text-gray-400">
          This policy is a starting template and should be reviewed by legal counsel
          before launch.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-2 space-y-2 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
