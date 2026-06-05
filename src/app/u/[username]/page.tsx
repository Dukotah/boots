"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame,
  Coins,
  Trophy,
  BookOpenCheck,
  Share2,
  CheckCircle,
  Zap,
  Star,
  Globe,
  Briefcase,
  Code2,
  Users,
} from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES } from "@/lib/achievements";
import { MODULES } from "@/lib/curriculum";
import { deriveBreadth } from "@/lib/progress";
import { computeReadiness, CAREER_MODULES } from "@/lib/career";
import { SITE } from "@/lib/site";
import type { PlayerStats } from "@/types/game";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

type Load = "loading" | "found" | "missing";

type ProfileData = {
  name: string;
  xp: number;
  streak: number;
  gold: number;
  completed: string[];
  achievements: string[];
  equippedTitle?: string | null;
  equippedFlair?: string | null;
  equippedBanner?: string | null;
  guildName?: string | null;
};

const BANNER_GRADIENTS: Record<string, string> = {
  midnight: "from-slate-900 via-blue-950 to-indigo-950",
  aurora: "from-teal-900 via-cyan-900 to-purple-900",
  fire: "from-red-900 via-orange-900 to-yellow-900",
  matrix: "from-black via-green-950 to-black",
  ocean: "from-blue-900 via-cyan-900 to-teal-900",
  prestige: "from-amber-800 via-yellow-700 to-amber-900",
};

const LANGUAGE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  js:   { label: "JavaScript", icon: "🟨", color: "text-yellow-400" },
  ts:   { label: "TypeScript", icon: "🔷", color: "text-blue-400" },
  py:   { label: "Python",     icon: "🐍", color: "text-green-400" },
  sql:  { label: "SQL",        icon: "🗄️", color: "text-orange-400" },
  html: { label: "HTML",       icon: "🌐", color: "text-red-400" },
};

function keyFor(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function HeatmapFromCompleted({ completed }: { completed: string[] }) {
  const DAYS = 119;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // We don't have activeDays for other users, so derive from completed list
  // (approximate — treat every 5 completions as an active day)
  const activeCount = Math.min(Math.floor(completed.length / 2), DAYS);
  // Deterministic fill (no Math.random in render — that reshuffled the wall on
  // every re-render). Approximate, since we lack other users' real activeDays.
  const cells = Array.from({ length: DAYS }, (_, i) => ({
    key: i.toString(),
    active: i >= DAYS - activeCount && i % 3 !== 0,
  }));

  return (
    <div
      role="img"
      aria-label={`Activity heatmap — roughly ${activeCount} active days`}
      className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto"
    >
      {cells.map((c) => (
        <div
          key={c.key}
          aria-hidden="true"
          className={[
            "h-3 w-3 rounded-sm",
            c.active ? "bg-accent shadow-glow" : "bg-surface-2",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function OwnHeatmap({ activeDays }: { activeDays: string[] }) {
  const DAYS = 119;
  const set = new Set(activeDays);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (DAYS - 1 - i));
    const key = keyFor(d);
    return { key, active: set.has(key) };
  });
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
      {cells.map((c) => (
        <div
          key={c.key}
          className={[
            "h-3 w-3 rounded-sm",
            c.active ? "bg-accent shadow-glow" : "bg-surface-2",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = decodeURIComponent(
    Array.isArray(params.username) ? params.username[0] : params.username ?? "",
  );
  const mounted = useMounted();

  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const gold = useGameStore((s) => s.gold);
  const completed = useGameStore((s) => s.completed);
  const achievements = useGameStore((s) => s.achievements);
  const activeDays = useGameStore((s) => s.activeDays);
  const equipped = useGameStore((s) => s.equipped);
  const guildName = useGameStore((s) => s.guildName);
  const user = useGameStore((s) => s.user);

  const [state, setState] = useState<Load>("loading");
  const [data, setData] = useState<ProfileData | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const myHandle = user?.email?.split("@")[0];

    if (myHandle && myHandle === username) {
      setIsOwnProfile(true);
      setData({
        name: username,
        xp,
        streak,
        gold,
        completed,
        achievements,
        equippedTitle: equipped.title,
        equippedFlair: equipped.flair,
        equippedBanner: equipped.banner,
        guildName,
      });
      setState("found");
      return;
    }

    if (!isSupabaseConfigured) {
      setState("missing");
      return;
    }
    const sb = getSupabaseBrowserClient();
    if (!sb) {
      setState("missing");
      return;
    }
    let active = true;
    (async () => {
      const { data: row } = await sb
        .from("profiles")
        .select("username, xp, streak, gold, completed, achievements")
        .eq("username", username)
        .maybeSingle();
      if (!active) return;
      if (!row) {
        setState("missing");
        return;
      }
      const r = row as {
        xp?: number;
        streak?: number;
        gold?: number;
        completed?: string[];
        achievements?: string[];
      };
      setData({
        name: username,
        xp: r.xp ?? 0,
        streak: r.streak ?? 0,
        gold: r.gold ?? 0,
        completed: r.completed ?? [],
        achievements: r.achievements ?? [],
      });
      setState("found");
    })();
    return () => {
      active = false;
    };
  }, [mounted, username, user, xp, streak, gold, completed, achievements, equipped, guildName, activeDays]);

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!mounted || state === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-surface animate-pulse" />
        ))}
      </div>
    );
  }

  if (state === "missing") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="card text-center">
          <p className="text-4xl">🧭</p>
          <h1 className="mt-3 text-xl font-bold text-white">
            No public profile for &ldquo;{username}&rdquo;
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            This learner hasn&apos;t shared a profile yet — or the journey hasn&apos;t started.
          </p>
          <Link href="/learn" className="btn-primary mx-auto mt-5 w-fit">
            Start learning
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const info = levelFromXp(data.xp);
  const breadth = deriveBreadth(data.completed);
  const earnedAchievements = ACHIEVEMENTS.filter((a) =>
    data.achievements.includes(a.id),
  );
  const bannerClass =
    data.equippedBanner && BANNER_GRADIENTS[data.equippedBanner]
      ? BANNER_GRADIENTS[data.equippedBanner]
      : "from-gray-900 via-slate-900 to-gray-900";

  const completedModules = new Set(breadth.completedModules);
  const careerModulesCompleted = CAREER_MODULES.filter((m) =>
    completedModules.has(m),
  );
  // Headline number = the canonical Career Pack readiness score (lib/career),
  // so the public profile, dashboard, and /career always agree. The module
  // chips below remain a concrete "skills you can show" breakdown.
  const careerStats: PlayerStats = {
    xp: data.xp,
    level: info.level,
    gold: data.gold,
    streak: data.streak,
    completedCount: data.completed.length,
    completedIds: data.completed,
    ...breadth,
  };
  const careerPct = computeReadiness(careerStats).score;

  const touchedModules = MODULES.filter((mod) =>
    data.completed.some((id) => id.startsWith(mod.slug + "/")),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-5">

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl bg-gradient-to-br ${bannerClass} border border-line overflow-hidden`}
      >
        {/* Banner strip */}
        <div className={`h-24 bg-gradient-to-r ${bannerClass} opacity-70`} />

        <div className="px-6 pb-6 -mt-10">
          {/* Avatar + share */}
          <div className="flex items-end justify-between">
            <div
              className={[
                "flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-canvas bg-surface-2 text-4xl shadow-glow",
                data.equippedBanner === "diamond" ? "ring-2 ring-blue-400" : "",
                data.equippedBanner === "gold" ? "ring-2 ring-yellow-400" : "",
                data.equippedBanner === "fire" ? "ring-2 ring-orange-500" : "",
              ].join(" ")}
            >
              {info.rank.emoji}
            </div>
            <div className="flex items-center gap-2 mb-2">
              {isOwnProfile && (
                <Link
                  href="/profile"
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-accent/50 hover:text-white transition"
                >
                  Edit Profile
                </Link>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-accent/50 hover:text-white transition"
              >
                <Share2 size={12} />
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>

          {/* Name + rank + title */}
          <div className="mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-white">
                {data.equippedFlair && <span className="mr-1">{data.equippedFlair}</span>}
                {data.name}
              </h1>
              {data.guildName && (
                <span className="flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] text-gray-400">
                  <Users size={10} /> {data.guildName}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              Level {info.level} · {info.rank.name}
              {data.equippedTitle && (
                <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent-soft">
                  {data.equippedTitle}
                </span>
              )}
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatBadge icon={<Flame size={15} />} value={data.streak} label="day streak" color="text-danger" />
            <StatBadge icon={<BookOpenCheck size={15} />} value={data.completed.length} label="lessons" color="text-accent-soft" />
            <StatBadge icon={<Trophy size={15} />} value={earnedAchievements.length} label="badges" color="text-success" />
            <StatBadge icon={<Zap size={15} />} value={data.xp.toLocaleString()} label="total XP" color="text-gold" />
          </div>
        </div>
      </motion.div>

      {/* Career Readiness Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-accent-soft" />
            <h2 className="font-bold text-white">Career Readiness</h2>
          </div>
          <span
            className={[
              "text-lg font-bold",
              careerPct >= 80
                ? "text-success"
                : careerPct >= 50
                  ? "text-gold"
                  : "text-gray-400",
            ].join(" ")}
          >
            {careerPct}%
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-2 mb-4">
          <motion.div
            className={[
              "h-full rounded-full",
              careerPct >= 80
                ? "bg-gradient-to-r from-success to-emerald-400"
                : careerPct >= 50
                  ? "bg-gradient-to-r from-gold to-yellow-400"
                  : "bg-gradient-to-r from-accent to-accent-soft",
            ].join(" ")}
            initial={{ width: 0 }}
            animate={{ width: `${careerPct}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
          />
        </div>
        {careerPct >= 80 && (
          <p className="mb-3 text-sm font-semibold text-success flex items-center gap-1.5">
            <CheckCircle size={15} /> Job-ready! This profile is hire-worthy.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {CAREER_MODULES.map((slug) => {
            const done = completedModules.has(slug);
            const mod = MODULES.find((m) => m.slug === slug);
            return (
              <span
                key={slug}
                className={[
                  "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition",
                  done
                    ? "bg-success/15 text-success border border-success/30"
                    : "border border-line bg-canvas/40 text-gray-500",
                ].join(" ")}
              >
                {done && <CheckCircle size={11} />}
                {mod?.emoji} {mod?.title ?? slug}
              </span>
            );
          })}
        </div>
        {careerPct < 80 && (
          <p className="mt-3 text-xs text-gray-500">
            Complete {Math.max(1, Math.ceil(CAREER_MODULES.length * 0.8) - careerModulesCompleted.length)} more job-relevant courses to raise your readiness score.
          </p>
        )}
      </motion.div>

      {/* Skills / Languages */}
      {breadth.languages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code2 size={18} className="text-accent-soft" />
            <h2 className="font-bold text-white">Languages</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {breadth.languages.map((lang) => {
              const meta = LANGUAGE_LABELS[lang] ?? { label: lang, icon: "💻", color: "text-gray-400" };
              return (
                <div
                  key={lang}
                  className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <span className="text-xl">{meta.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${meta.color}`}>{meta.label}</p>
                    <p className="text-[11px] text-gray-500">
                      {data.completed.filter((id) => {
                        const [modSlug, lesSlug] = id.split("/");
                        const mod = MODULES.find((m) => m.slug === modSlug);
                        if (!mod) return false;
                        const les = mod.lessons.find((l) => l.slug === lesSlug);
                        return (les?.language ?? mod.language ?? "js") === lang;
                      }).length}{" "}
                      lessons
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Completed Courses */}
      {touchedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-accent-soft" />
            <h2 className="font-bold text-white">Courses</h2>
            <span className="ml-auto text-sm text-gray-500">
              {breadth.completedModules.length} completed · {touchedModules.length} in progress
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {touchedModules.map((mod) => {
              const done = completedModules.has(mod.slug);
              const lessonsCompleted = data.completed.filter((id) =>
                id.startsWith(mod.slug + "/"),
              ).length;
              const pct = Math.round((lessonsCompleted / mod.lessons.length) * 100);
              return (
                <div
                  key={mod.slug}
                  className={[
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                    done ? "border-success/30 bg-success/5" : "border-line bg-canvas/40",
                  ].join(" ")}
                >
                  <span className="text-xl">{mod.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${done ? "text-white" : "text-gray-300"}`}>
                      {mod.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-surface-2">
                        <div
                          className={`h-full rounded-full ${done ? "bg-success" : "bg-accent"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-500 shrink-0">
                        {lessonsCompleted}/{mod.lessons.length}
                      </span>
                    </div>
                  </div>
                  {done && <CheckCircle size={15} className="text-success shrink-0" />}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Activity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="card"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-white">Coding Activity</h2>
          <span className="text-xs text-gray-500">Last 17 weeks</span>
        </div>
        {isOwnProfile ? (
          <OwnHeatmap activeDays={activeDays} />
        ) : (
          <HeatmapFromCompleted completed={data.completed} />
        )}
      </motion.div>

      {/* Achievements Trophy Wall */}
      {earnedAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={18} className="text-gold" />
            <h2 className="font-bold text-white">Trophy Wall</h2>
            <span className="ml-auto text-sm text-gray-500">
              {earnedAchievements.length} / {ACHIEVEMENTS.filter((a) => !a.secret).length + ACHIEVEMENTS.filter((a) => a.secret && data.achievements.includes(a.id)).length} badges
            </span>
          </div>

          {ACHIEVEMENT_CATEGORIES.map(({ id, label, icon }) => {
            const inCat = earnedAchievements.filter(
              (a) => (a.category ?? "milestones") === id,
            );
            if (inCat.length === 0) return null;
            return (
              <div key={id} className="mb-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {icon} {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {inCat.map((a) => {
                    const rarityClass =
                      a.rarity === "legendary"
                        ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                        : a.rarity === "epic"
                          ? "border-purple-500/50 bg-purple-500/10 text-purple-300"
                          : a.rarity === "rare"
                            ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                            : "border-line bg-canvas/40 text-gray-300";
                    return (
                      <motion.div
                        key={a.id}
                        whileHover={{ scale: 1.05 }}
                        title={a.description}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium cursor-default ${rarityClass}`}
                      >
                        <span className="text-base">{a.icon}</span>
                        {a.title}
                        {a.rarity === "legendary" && (
                          <Star size={10} className="text-amber-400" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Resume tip */}
      {careerPct >= 50 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-accent/20 bg-accent/5 px-5 py-4"
        >
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-accent-soft">💡 Resume tip:</span>{" "}
            Link to{" "}
            <span className="font-mono text-xs bg-surface-2 rounded px-1">
              {SITE.url.replace(/^https?:\/\//, "")}/u/{data.name}
            </span>{" "}
            on your resume or LinkedIn to show verified coding progress.
          </p>
        </motion.div>
      )}
    </div>
  );
}

function StatBadge({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas/40 p-3 text-center">
      <div className={`mb-1 flex justify-center ${color}`}>{icon}</div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[11px] text-gray-500">{label}</p>
    </div>
  );
}
