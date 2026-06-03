// Lifecycle email templates — plain functions returning { subject, html }.
// Inline styles only (email clients ignore <style>/external CSS). Kept simple
// and brand-light so they render everywhere.

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
    <p style="margin-top:28px;font-size:12px;color:#6b7280">— The ${SITE.name} team</p>
  </div>
</div>`;
}

export function welcomeEmail(name: string) {
  return {
    subject: `Welcome to ${SITE.name}, ${name}! 🥾`,
    html: shell(
      `Welcome aboard, ${name}!`,
      `You're in. Learn to code like it's an RPG — write real code, earn XP, keep your streak, and climb from Intern to Archmage. The first lesson pops a level-up; go grab it.`,
      { label: "Start your first lesson", href: `${SITE.url}/learn` },
    ),
  };
}

export function streakAtRiskEmail(name: string, streak: number) {
  return {
    subject: `🔥 Your ${streak}-day streak is about to break`,
    html: shell(
      `Don't lose your ${streak}-day streak!`,
      `One quick lesson keeps it alive. It takes two minutes — your future self (and your contribution graph) will thank you.`,
      { label: "Keep my streak", href: `${SITE.url}/dashboard` },
    ),
  };
}

export function winBackEmail(name: string) {
  return {
    subject: `We saved your spot, ${name}`,
    html: shell(
      `Ready to pick back up?`,
      `Your progress is right where you left it. Jump back in and earn some XP — a new league season is always around the corner.`,
      { label: "Continue learning", href: `${SITE.url}/dashboard` },
    ),
  };
}
