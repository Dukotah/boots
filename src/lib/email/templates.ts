// Lifecycle email templates — plain functions returning { subject, html }.
// Inline styles only (email clients ignore <style>/external CSS). Kept simple
// and brand-light so they render everywhere.
//
// Cadence (sent by the streak-reminder cron):
//   Day 3  → gentle re-engagement nudge     (reEngagementDay3Email)
//   Day 7  → streak-freeze offer / urgency  (reEngagementDay7Email)
//   Day 14 → win-back with fresh-start hook (reEngagementDay14Email)
//
// The streak-at-risk email (streakAtRiskEmail) is a separate, same-day alert
// when a user was active yesterday but hasn't done today's lesson yet (streak > 0).

import { SITE } from "@/lib/site";

function shell(title: string, body: string, cta?: { label: string; href: string }): string {
  const button = cta
    ? `<a href="${cta.href}" style="display:inline-block;margin-top:20px;padding:12px 22px;background:#7c5cff;color:#fff;border-radius:10px;text-decoration:none;font-weight:600">${cta.label}</a>`
    : "";
  return `<div style="background:#0b0e14;padding:32px;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;background:#121826;border:1px solid #222a3a;border-radius:16px;padding:28px;color:#e5e7eb">
    <h1 style="margin:0 0 12px;color:#fff;font-size:20px">${title}</h1>
    <div style="font-size:15px;line-height:1.6;color:#c2c8d4">${body}</div>
    ${button}
    <p style="margin-top:28px;font-size:12px;color:#6b7280">— The ${SITE.name} team &nbsp;·&nbsp; <a href="${SITE.url}/settings" style="color:#6b7280">manage emails</a></p>
  </div>
</div>`;
}

// ─── Transactional (always sent) ────────────────────────────────────────────

export function welcomeEmail(name: string) {
  return {
    subject: `Welcome to ${SITE.name}, ${name}! Your adventure starts now`,
    html: shell(
      `Welcome to the academy, ${name}!`,
      `You just joined a coding platform that actually makes it fun — write real code, earn XP, keep your streak, and level up from Intern all the way to Archmage.<br><br>
      Your first lesson is waiting. It takes about five minutes and earns your first XP drop. Go cast your first spell.`,
      { label: "Start my first lesson", href: `${SITE.url}/learn` },
    ),
  };
}

// ─── Same-day streak-at-risk (user was active yesterday, missed today) ───────

export function streakAtRiskEmail(name: string, streak: number) {
  const streakLabel = streak > 1 ? `${streak}-day streak` : `streak`;
  return {
    subject: `Your ${streakLabel} ends at midnight — one lesson saves it`,
    html: shell(
      `Don't let your ${streakLabel} slip, ${name}`,
      `You've been on a roll — ${streak} ${streak === 1 ? "day" : "days"} of consistent practice. Miss today and it resets to zero.<br><br>
      One quick lesson keeps it alive. We're talking two minutes. Your future self (and your league ranking) will thank you.`,
      { label: "Save my streak now", href: `${SITE.url}/learn` },
    ),
  };
}

// ─── Re-engagement cadence (Day 3 / 7 / 14 of inactivity) ──────────────────

/**
 * Day 3: Gentle nudge. Tone: warm, low-pressure, curious.
 * Best send-time signal: user still remembers us, hasn't mentally quit yet.
 */
export function reEngagementDay3Email(name: string, completedCount: number) {
  const progress = completedCount > 0
    ? `You've already completed <strong>${completedCount} lesson${completedCount === 1 ? "" : "s"}</strong> — that's real momentum.`
    : `You've made a start — and that's the hardest part.`;
  return {
    subject: `${name}, your next XP is waiting (3-day check-in)`,
    html: shell(
      `Hey ${name} — everything okay?`,
      `You haven't logged into ${SITE.name} in a few days, and we noticed. ${progress}<br><br>
      No pressure — life happens. Whenever you're ready, your progress is exactly where you left it. Even one lesson today re-ignites the streak.`,
      { label: "Pick up where I left off", href: `${SITE.url}/dashboard` },
    ),
  };
}

/**
 * Day 7: Streak-freeze offer + mild urgency. Tone: helpful, practical.
 * User is sliding toward churn; offer the streak-freeze as a low-friction hook.
 */
export function reEngagementDay7Email(name: string, streakFreezes: number) {
  const freezeNote = streakFreezes > 0
    ? `<br><br>Good news: you have <strong>${streakFreezes} streak freeze${streakFreezes === 1 ? "" : "s"}</strong> banked — use one today and your streak survives even this gap.`
    : `<br><br>One lesson today is all it takes to get the streak counter moving again.`;
  return {
    subject: `A week away — your ${SITE.name} streak is frozen in time`,
    html: shell(
      `It's been a week, ${name}`,
      `Seven days is long enough to lose your rhythm — but not your progress. Everything you built is still here: your XP, your lessons, your league standing.${freezeNote}<br><br>
      The hardest part of coming back is opening the tab. You've already done that by reading this.`,
      { label: "Jump back in", href: `${SITE.url}/learn` },
    ),
  };
}

/**
 * Day 14: Win-back with fresh-start framing. Tone: upbeat, no guilt, new season hook.
 * User is at high churn risk; lean into "new beginning" rather than loss.
 */
export function reEngagementDay14Email(name: string) {
  return {
    subject: `${name}, a new season just started — fresh XP, fresh league`,
    html: shell(
      `Fresh start, ${name} — no excuses needed`,
      `Two weeks is nothing in the grand scheme of learning to code. Plenty of Archmages took breaks. What matters is coming back.<br><br>
      A new league season is kicking off, which means the XP scoreboard just reset — it's the perfect moment to jump in and climb with everyone else from scratch.<br><br>
      Your lessons, achievements, and gold are right where you left them.`,
      { label: "Claim my fresh start", href: `${SITE.url}/dashboard` },
    ),
  };
}
