import Link from "next/link";
import { MascotBoots } from "@/components/MascotBoots";
import { SITE } from "@/lib/site";

const COLS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Learn",
    links: [
      { label: "All courses", href: "/learn" },
      { label: "Career paths", href: "/paths" },
      { label: "Playground", href: "/playground" },
      { label: "Cheat sheets", href: "/cheatsheet" },
      { label: "Digital safety", href: "/learn/digital-safety" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Regex tester", href: "/tools/regex" },
      { label: "JSON formatter", href: "/tools/json" },
      { label: "Base64", href: "/tools/base64" },
      { label: "UUID generator", href: "/tools/uuid" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <MascotBoots size={28} />
            <span className="text-lg font-bold tracking-tight text-white">
              {SITE.name}
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-gray-400">{SITE.tagline}</p>
        </div>

        {COLS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {col.heading}
            </h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gray-500 sm:flex-row">
          <span>
            © {year} {SITE.name}. Learn to code, one spell at a time.
          </span>
          <span>Made for learners, not algorithms.</span>
        </div>
      </div>
    </footer>
  );
}
