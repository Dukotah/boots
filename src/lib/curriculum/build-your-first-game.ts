import type { Module } from "./types";

// Build Your First Game — a beginner JS course that assembles the *logic* of a
// small game one function at a time: dice, guesses, score, hit detection, lives,
// and high scores. Each function is pure and testable (no random in tests — we
// pass the roll in) so the same auto-grader works.
export const buildYourFirstGame: Module = {
  slug: "build-your-first-game",
  title: "Build Your First Game 🎮",
  emoji: "🕹️",
  gradient: "from-green-400/20 to-emerald-500/10",
  description:
    "Build the brains of a real game, one function at a time! 🎮 Roll dice, check guesses, keep score, detect hits, and track lives — all in beginner JavaScript.",
  tagline:
    "A beginner project course: build a simple game's logic in JavaScript — dice rolls, scoring, hit detection, lives, and high scores.",
  keywords: [
    "build a game javascript",
    "javascript game for beginners",
    "first coding project",
    "make a game with code",
    "beginner game logic",
  ],
  lessons: [
    {
      slug: "roll-the-dice",
      title: "Roll the Dice 🎲",
      blurb: "Turn a random number into a fair dice roll from 1 to 6.",
      xp: 25,
      content: `# Roll the Dice 🎲

Games use random numbers, but to **test** them we'll pass the randomness in. Say
\`r\` is a decimal from \`0\` up to (but not including) \`1\`. We can turn it into a
dice number 1–6:

\`\`\`
Math.floor(r * 6) + 1
\`\`\`

\`Math.floor\` chops off the decimals (rounds down), so \`r * 6\` (which is 0 up to
6) becomes 0–5, and \`+ 1\` makes it 1–6.

## Your task
Write \`rollDice(r)\` that returns a whole number from 1 to 6 using the formula
above.`,
      starterCode: `function rollDice(r) {
  // Math.floor(r * 6) + 1
}
`,
      solution: `function rollDice(r) {
  return Math.floor(r * 6) + 1;
}`,
      tests: [
        { name: "0 → 1", code: `assertEquals(rollDice(0), 1);` },
        { name: "0.5 → 4", code: `assertEquals(rollDice(0.5), 4);` },
        { name: "0.99 → 6", code: `assertEquals(rollDice(0.99), 6);` },
      ],
      hints: [
        "`r * 6` spreads the value across 0 to 6.",
        "`Math.floor(...)` rounds down, then add 1 to land on 1–6.",
      ],
      explanation:
        "🎲 Nice roll! In a real game you'd feed in `Math.random()`. We pass `r` in instead so the dice are predictable enough to test. Same formula!",
    },
    {
      slug: "check-the-guess",
      title: "Higher or Lower? 🔼🔽",
      blurb: "Tell the player if their guess is too high, too low, or right.",
      xp: 30,
      content: `# Higher or Lower? 🔼🔽

A guessing game needs to give hints. We compare the player's \`guess\` to the
secret \`target\` and return a message.

## Your task
Write \`checkGuess(guess, target)\`:
- return \`"correct"\` if they match,
- return \`"too high"\` if the guess is bigger than the target,
- return \`"too low"\` otherwise.`,
      starterCode: `function checkGuess(guess, target) {
  // "correct", "too high", or "too low"
}
`,
      solution: `function checkGuess(guess, target) {
  if (guess === target) return "correct";
  if (guess > target) return "too high";
  return "too low";
}`,
      tests: [
        { name: "match → correct", code: `assertEquals(checkGuess(7, 7), "correct");` },
        { name: "bigger → too high", code: `assertEquals(checkGuess(9, 5), "too high");` },
        { name: "smaller → too low", code: `assertEquals(checkGuess(2, 5), "too low");` },
      ],
      hints: [
        "Check for a match first with `guess === target`.",
        "Then `guess > target` is too high; everything else is too low.",
      ],
      explanation:
        "🔼🔽 Perfect hints! Checking equal first, then bigger, then assuming smaller covers all three cases without any extra `else`.",
    },
    {
      slug: "keep-score",
      title: "Keep Score 🏆",
      blurb: "Add the points the player just earned.",
      xp: 25,
      content: `# Keep Score 🏆

Every game tracks a **score**. When the player earns points, you add them to the
current score and hand back the new total.

## Your task
Write \`addScore(score, points)\` that returns \`score + points\`.`,
      starterCode: `function addScore(score, points) {
  // return the new total
}
`,
      solution: `function addScore(score, points) {
  return score + points;
}`,
      tests: [
        { name: "10 + 5 → 15", code: `assertEquals(addScore(10, 5), 15);` },
        { name: "0 + 100 → 100", code: `assertEquals(addScore(0, 100), 100);` },
      ],
      hints: ["Add the two numbers with `+`.", "Return the result so the score updates."],
      explanation:
        "🏆 Score up! A tiny function, but you'll call it every time the player scores. Small pieces build a whole game.",
    },
    {
      slug: "hit-detection",
      title: "Did We Hit It? 🎯",
      blurb: "Check if the player is close enough to the target to score a hit.",
      xp: 35,
      content: `# Did We Hit It? 🎯

Games check if two things **touch**. On a simple number line, a hit happens when
the player and the target are within a certain \`range\` of each other.
\`Math.abs\` gives the distance as a positive number (it ignores the minus sign):

\`\`\`js
Math.abs(3 - 5); // 2
Math.abs(5 - 3); // 2
\`\`\`

## Your task
Write \`isHit(playerX, targetX, range)\` that returns \`true\` when the distance
between them is \`range\` or less.`,
      starterCode: `function isHit(playerX, targetX, range) {
  // true when the distance is <= range
}
`,
      solution: `function isHit(playerX, targetX, range) {
  return Math.abs(playerX - targetX) <= range;
}`,
      tests: [
        { name: "direct hit", code: `assertEquals(isHit(5, 5, 1), true);` },
        { name: "just in range", code: `assertEquals(isHit(5, 7, 2), true);` },
        { name: "too far → miss", code: `assertEquals(isHit(5, 10, 2), false);` },
      ],
      hints: [
        "Distance is `Math.abs(playerX - targetX)`.",
        "It's a hit when that distance is `<= range`.",
      ],
      explanation:
        "🎯 Bullseye! `Math.abs` turns the gap into a positive distance so it works whether the target is left or right. Real games do this in 2D with x and y.",
    },
    {
      slug: "game-over",
      title: "Game Over? 💀",
      blurb: "The game ends when the player runs out of lives.",
      xp: 25,
      content: `# Game Over? 💀

Most games end when **lives** hit zero. This is a simple true/false check.

## Your task
Write \`isGameOver(lives)\` that returns \`true\` when \`lives\` is \`0\` or less, and
\`false\` otherwise.`,
      starterCode: `function isGameOver(lives) {
  // true when lives <= 0
}
`,
      solution: `function isGameOver(lives) {
  return lives <= 0;
}`,
      tests: [
        { name: "0 lives → over", code: `assertEquals(isGameOver(0), true);` },
        { name: "3 lives → keep playing", code: `assertEquals(isGameOver(3), false);` },
        { name: "negative → over", code: `assertEquals(isGameOver(-1), true);` },
      ],
      hints: [
        "`lives <= 0` is already true/false.",
        "Use `<=` so exactly 0 also counts as game over.",
      ],
      explanation:
        "💀 Game over, man! `lives <= 0` catches both 0 and any negative number. Your game loop can call this every turn to know when to stop.",
    },
    {
      slug: "high-score",
      title: "New High Score? 🥇",
      blurb: "Keep the best score the player has ever gotten.",
      xp: 30,
      content: `# New High Score? 🥇

At the end of a game you compare the player's score to the saved **best**. The
new high score is just the bigger of the two — \`Math.max\` to the rescue:

\`\`\`js
Math.max(120, 90); // 120
\`\`\`

## Your task
Write \`bestScore(score, best)\` that returns whichever is larger.`,
      starterCode: `function bestScore(score, best) {
  // return the larger of score and best
}
`,
      solution: `function bestScore(score, best) {
  return Math.max(score, best);
}`,
      tests: [
        { name: "new record!", code: `assertEquals(bestScore(150, 120), 150);` },
        { name: "old record stands", code: `assertEquals(bestScore(80, 120), 120);` },
        { name: "tie keeps the number", code: `assertEquals(bestScore(100, 100), 100);` },
      ],
      hints: [
        "`Math.max(score, best)` returns the bigger number.",
        "That's your new high score either way!",
      ],
      explanation:
        "🥇 You did it! With dice, guesses, scoring, hit detection, lives, and high scores, you've built every piece of logic a simple game needs. Now go wire them into a real screen!",
    },
  ],
};
