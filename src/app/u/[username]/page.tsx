"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import {
  ProfileCard,
  type ProfileData,
} from "@/components/features/profile/ProfileCard";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

type Load = "loading" | "found" | "missing";

export default function PublicProfilePage() {
  const params = useParams();
  const username = decodeURIComponent(
    Array.isArray(params.username) ? params.username[0] : params.username ?? "",
  );
  const mounted = useMounted();

  // Local player's own data — used when viewing your own public handle offline.
  const xp = useGameStore((s) => s.xp);
  const streak = useGameStore((s) => s.streak);
  const gold = useGameStore((s) => s.gold);
  const completed = useGameStore((s) => s.completed);
  const achievements = useGameStore((s) => s.achievements);
  const user = useGameStore((s) => s.user);

  const [state, setState] = useState<Load>("loading");
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (!mounted) return;
    const myHandle = user?.email?.split("@")[0];

    // 1) Your own profile renders instantly from local state.
    if (myHandle && myHandle === username) {
      setData({
        name: username,
        xp,
        streak,
        gold,
        completedCount: completed.length,
        achievements,
      });
      setState("found");
      return;
    }

    // 2) Otherwise look it up in Supabase if a backend is configured.
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
        completedCount: (r.completed ?? []).length,
        achievements: r.achievements ?? [],
      });
      setState("found");
    })();
    return () => {
      active = false;
    };
  }, [mounted, username, user, xp, streak, gold, completed, achievements]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {state === "loading" && <p className="text-gray-500">Loading profile…</p>}

      {state === "found" && data && <ProfileCard data={data} />}

      {state === "missing" && (
        <div className="card text-center">
          <p className="text-4xl">🧭</p>
          <h1 className="mt-3 text-xl font-bold text-white">
            No public profile for “{username}”
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            This learner hasn’t shared a profile yet — or the journey hasn’t
            started.
          </p>
          <Link href="/learn" className="btn-primary mx-auto mt-5 w-fit">
            Start learning
          </Link>
        </div>
      )}
    </div>
  );
}
