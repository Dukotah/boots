"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { UserPlus, Swords, X, Clock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { levelFromXp } from "@/lib/levels";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

type Friend = { id: string; username: string; xp: number; weekly_xp: number };
type Duel = {
  id: string;
  challenger_id: string;
  opponent_id: string;
  goal_lessons: number;
  challenger_progress: number;
  opponent_progress: number;
  status: string;
  ends_at: string;
};

const DUEL_GOAL = 5;

export default function FriendsPage() {
  const mounted = useMounted();
  const user = useGameStore((s) => s.user);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [duels, setDuels] = useState<Duel[]>([]);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;
    const { data: rows } = await sb
      .from("follows")
      .select("following_id")
      .eq("follower_id", user.id);
    const ids = (rows ?? []).map((r) => (r as { following_id: string }).following_id);
    if (ids.length) {
      const { data: profs } = await sb
        .from("profiles")
        .select("id, username, xp, weekly_xp")
        .in("id", ids);
      setFriends((profs ?? []) as Friend[]);
    } else {
      setFriends([]);
    }
    const { data: d } = await sb
      .from("duels")
      .select("*")
      .eq("status", "active")
      .or(`challenger_id.eq.${user.id},opponent_id.eq.${user.id}`);
    setDuels((d ?? []) as Duel[]);
  }, [user]);

  useEffect(() => {
    if (mounted && user) load();
  }, [mounted, user, load]);

  async function follow() {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user || !query.trim()) return;
    const handle = query.trim().replace(/^@/, "");
    const { data: target } = await sb
      .from("profiles")
      .select("id")
      .eq("username", handle)
      .maybeSingle();
    if (!target) {
      setMsg(`No learner named “${handle}”.`);
      return;
    }
    const targetId = (target as { id: string }).id;
    if (targetId === user.id) {
      setMsg("You can't follow yourself.");
      return;
    }
    await sb
      .from("follows")
      .upsert({ follower_id: user.id, following_id: targetId });
    setQuery("");
    setMsg(`Following @${handle}!`);
    load();
  }

  async function unfollow(id: string) {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;
    await sb
      .from("follows")
      .delete()
      .eq("follower_id", user.id)
      .eq("following_id", id);
    load();
  }

  async function challenge(opponentId: string) {
    const sb = getSupabaseBrowserClient();
    if (!sb || !user) return;
    const endsAt = new Date(Date.now() + 24 * 3600_000).toISOString();
    await sb.from("duels").insert({
      challenger_id: user.id,
      opponent_id: opponentId,
      goal_lessons: DUEL_GOAL,
      ends_at: endsAt,
      status: "active",
    });
    setMsg("Duel sent! First to complete 5 lessons in 24h wins.");
    load();
  }

  if (mounted && (!isSupabaseConfigured || !user)) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Friends &amp; Duels</h1>
        <p className="mt-3 text-gray-400">
          {isSupabaseConfigured
            ? "Sign in to follow friends and challenge them to duels."
            : "Friends require an account backend (Supabase) to be configured."}
        </p>
        {isSupabaseConfigured && (
          <Link href="/login" className="btn-primary mx-auto mt-5 w-fit">
            Sign in
          </Link>
        )}
      </div>
    );
  }

  // Friend leaderboard includes you, ranked by XP.
  const board = [...friends].sort((a, b) => b.xp - a.xp);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">Friends &amp; Duels</h1>
      <p className="mt-1 text-gray-400">
        Follow other learners, compare progress, and challenge them head-to-head.
      </p>

      {/* Follow */}
      <div className="mt-6 flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && follow()}
          placeholder="Follow by username…"
          className="flex-1 rounded-lg border border-line bg-canvas/60 px-3 py-2.5 text-sm text-white placeholder:text-gray-600"
        />
        <button onClick={follow} className="btn-primary">
          <UserPlus size={15} /> Follow
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-accent-soft">{msg}</p>}

      {/* Active duels */}
      {duels.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-white">Active duels</h2>
          <div className="space-y-2">
            {duels.map((d) => {
              const mine = d.challenger_id === user!.id;
              const myProg = mine ? d.challenger_progress : d.opponent_progress;
              const theirProg = mine ? d.opponent_progress : d.challenger_progress;
              const hoursLeft = Math.max(
                0,
                Math.round((new Date(d.ends_at).getTime() - Date.now()) / 3600_000),
              );
              return (
                <div
                  key={d.id}
                  className="card flex items-center gap-3 py-3 text-sm"
                >
                  <Swords size={18} className="text-danger" />
                  <span className="flex-1 text-white">
                    You {myProg} — {theirProg} Them
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} /> {hoursLeft}h · first to {d.goal_lessons}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Friend leaderboard */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-white">Your friends</h2>
        {board.length === 0 ? (
          <div className="card text-center text-sm text-gray-400">
            No friends yet — follow someone above to get started.
          </div>
        ) : (
          <div className="space-y-2">
            {board.map((f, i) => {
              const info = levelFromXp(f.xp);
              return (
                <div key={f.id} className="card flex items-center gap-3 py-3">
                  <span className="w-6 text-center text-sm font-bold text-gray-500">
                    {i + 1}
                  </span>
                  <span className="text-xl">{info.rank.emoji}</span>
                  <Link
                    href={`/u/${f.username}`}
                    className="min-w-0 flex-1 truncate font-medium text-white hover:underline"
                  >
                    {f.username}
                    <span className="ml-2 text-xs text-gray-500">
                      Lv {info.level} · {f.xp} XP
                    </span>
                  </Link>
                  <button
                    onClick={() => challenge(f.id)}
                    className="btn-ghost px-2 py-1 text-xs"
                    title="Challenge to a duel"
                  >
                    <Swords size={13} /> Duel
                  </button>
                  <button
                    onClick={() => unfollow(f.id)}
                    className="text-gray-500 hover:text-danger"
                    title="Unfollow"
                  >
                    <X size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
