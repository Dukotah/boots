import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for using ${SITE.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const EFFECTIVE = "June 1, 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Effective {EFFECTIVE}</p>

      <div className="mt-8 space-y-6 text-gray-300">
        <Section title="Acceptance">
          By using {SITE.name}, you agree to these terms. If you don’t agree, please
          don’t use the service.
        </Section>
        <Section title="Your account">
          You’re responsible for activity under your account and for keeping your
          login secure. You must be at least 13 years old to create an account.
        </Section>
        <Section title="Acceptable use">
          Don’t abuse the service: no attempting to break security or sandboxing, no
          scraping at scale, no reselling access, and no using the platform to harm
          others. Code you run executes in your own browser sandbox — don’t use it
          to attack anyone.
        </Section>
        <Section title="Subscriptions & payments">
          Some features require a paid subscription. Prices and what’s included are
          shown on the pricing page. Subscriptions renew until cancelled; you can
          cancel anytime and keep access through the end of the paid period. Billing
          is handled by Stripe.
        </Section>
        <Section title="Content & IP">
          Course content, branding, and the software are owned by {SITE.name} or its
          licensors. You keep ownership of code you write. Free content is yours to
          read; please don’t republish our paid materials wholesale.
        </Section>
        <Section title="Disclaimer">
          {SITE.name} is provided “as is.” We work hard to keep it accurate and
          available, but we don’t guarantee it’s error-free, and completing courses
          doesn’t guarantee employment or any specific outcome.
        </Section>
        <Section title="Changes">
          We may update these terms; we’ll update the effective date above. Continued
          use after changes means you accept them.
        </Section>
        <Section title="Contact">
          Questions? Email{" "}
          <a className="text-accent-soft hover:underline" href="mailto:hello@cantrip.dev">
            hello@cantrip.dev
          </a>
          .
        </Section>

        <p className="text-xs text-gray-600">
          These terms are a starting template and should be reviewed by legal counsel
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
      <p className="mt-2">{children}</p>
    </section>
  );
}
