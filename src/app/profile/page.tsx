"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { ProfileCard } from "@/components/features/profile/ProfileCard";
import { SITE } from "@/lib/site";

export default function ProfilePage() {
  const mounted = useMounted();
  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const gold = useGameStore((s) => s.gold);
  const completed = useGameStore((s) => s.completed);
  const achievements = useGameStore((s) => s.achievements);
  const user = useGameStore((s) => s.user);
  const [copied, setCopied] = useState(false);

  const handle = user?.email?.split("@")[0] ?? "you";

  function share() {
    const url = `${SITE.url}/u/${handle}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!mounted) {
    return <div className="mx-auto max-w-2xl px-4 py-10 text-gray-500">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Your profile</h1>
        <button onClick={share} className="btn-ghost text-sm">
          {copied ? <Check size={15} /> : <Share2 size={15} />}
          {copied ? "Link copied" : "Share"}
        </button>
      </div>

      <ProfileCard
        data={{
          name: handle,
          xp,
          streak,
          gold,
          completedCount: completed.length,
          achievements,
        }}
      />

      <p className="mt-4 text-center text-xs text-gray-500">
        Your public profile lives at{" "}
        <span className="font-mono text-gray-400">/u/{handle}</span>
      </p>
    </div>
  );
}
