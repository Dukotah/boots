// The "juice" on a win — a confetti burst + a short, pleasant chime. Pure
// client-side; safe to call from event handlers. Respects reduced-motion for the
// confetti (sound still plays since it's brief and non-motion). The confetti
// library is loaded on demand (it only ever fires on a first clear), so it
// stays out of the lesson's initial bundle.
export function celebrate(): void {
  if (typeof window === "undefined") return;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!reduced) {
    void import("canvas-confetti").then(({ default: confetti }) => {
      const colors = ["#a78bfa", "#8b5cf6", "#fde68a", "#34d399"];
      confetti({ particleCount: 80, spread: 70, startVelocity: 38, origin: { y: 0.7 }, colors });
      // a second, delayed pop for a fuller feel
      window.setTimeout(
        () => confetti({ particleCount: 40, spread: 100, startVelocity: 28, origin: { y: 0.6 }, colors }),
        140,
      );
    });
  }
  playDing();
}

// A gentle two-note rising chime via Web Audio — no asset, no network.
function playDing(): void {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const notes: [number, number][] = [
      [880, 0], // A5
      [1318.51, 0.12], // E6
    ];
    for (const [freq, t] of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.exponentialRampToValueAtTime(0.14, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + 0.3);
    }
    window.setTimeout(() => ctx.close().catch(() => {}), 800);
  } catch {
    /* audio not available — no-op */
  }
}
