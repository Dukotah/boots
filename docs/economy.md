# Gold economy — faucets, sinks & the no-pay-to-win rule

Gold is the game's soft currency. The single hard rule (gameplan §4): **gold can
buy convenience and cosmetics, never power.** It never touches XP, level, or
League standing, so the leaderboard stays credible. Talents and achievements are
deliberately built so nothing feeds weekly XP.

Keep the economy *slightly faucet-positive* — players should always feel they're
accumulating toward the next cosmetic — but never so loose that gold is
meaningless. The classic failure mode is a +EV loot box (see Chests below); don't
reintroduce one.

## Faucets (where gold comes from)

| Source | Amount | Notes |
| --- | --- | --- |
| Lesson completion | `round(xp × 0.5)` | `GOLD_PER_XP = 0.5` in `useGameStore`. ~10–25 per lesson. |
| Prospector talents | +10% / +15% lesson gold; +15 first-lesson/day | `gold-mult`, `daily-gold` in `lib/talents`. |
| Scholar talents | +8 / +14 gold per **due** review | `review-gold`. Gated by the Leitner interval — a lesson only pays again once its review is genuinely due, so it can't be farmed by re-completing the same lesson. |
| Quests / chains | per-quest `rewardGold` | `lib/quests`. |
| Daily challenge | +20 gold (+15 XP) per day | `DAILY_BONUS_GOLD` in `lib/daily`. Bounded: at most once/day, and only payable on a *genuine* completion of that day's lesson (`claimDailyChallenge` checks `completed`). The pull is the streak, not the payout. |
| Boss battles | per-boss `rewardGold` | `lib/boss`. |
| Achievements | 10–1000 | `lib/achievements`. One-time. |
| Mystery chest | weighted, EV ≈ 46 | A gamble, not a faucet — see below. |

## Sinks (where gold goes)

| Sink | Cost |
| --- | --- |
| Streak Freeze | 60 |
| Mystery Chest | 50 (EV ≈ 46 → net sink unless you own Tycoon) |
| Cosmetics | 100–600 |
| Respec talents | 300 |

## Mystery chest EV (the load-bearing balance)

`rollChest(r, bonus)` in `lib/shop.ts` is a **weighted** roll, not a uniform band.
Tiers and contribution to expected value:

| Tier | Prob | Payout | EV contribution |
| --- | --- | --- | --- |
| Common | 55% | 10–30 | 11.0 |
| Uncommon | 28% | 35–65 | 14.0 |
| Rare | 13% | 80–140 | 14.3 |
| Jackpot | 4% | 200–300 | 10.0 |
| **Base EV** | | | **≈ 49** (≈ 46 typical) |

Cost is **50**, so the chest is a near-neutral gamble with a small house edge —
the fun is variance and the rare jackpot, not a profit. **Do not let the base EV
rise above the cost**; that turns the chest into an infinite-gold printer and
trivialises every cosmetic sink.

The Prospector **Tycoon** keystone adds a flat `chest-luck` bonus (+40) to every
roll. That deliberately flips the chest into a +EV investment — it's the payoff
for spending scarce skill points and clearing the keystone's gates, and since
gold can't buy power, a Tycoon "farming" gold only buys more cosmetics.

> Earlier the roll was `10 + rand(0..150)` → EV ≈ 85 against a 50 cost: a
> money printer. Fixed 2026-06.
