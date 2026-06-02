import type { Room } from "./types";

// Use regular expressions to extract a value hidden in noisy text — the classic
// "find the flag in the haystack" CTF move, applied to real log-wrangling.
export const regexForensics: Room = {
  slug: "regex-forensics",
  title: "Regex Forensics",
  emoji: "🔎",
  gradient: "from-emerald-500/20 to-teal-500/10",
  difficulty: "medium",
  tags: ["regex", "security", "text-processing"],
  blurb: "Hunt values out of noisy logs with regular expressions. Submit what you extract.",
  intro: `# Regex Forensics

Half of security and ops work is **finding the signal in noisy text**. Each task
gives you a blob of text and a pattern to think about. Apply the pattern in your
head (or in the [playground](/playground)) and submit the value you extract.`,
  tasks: [
    {
      slug: "find-the-ip",
      prompt:
        "Extract the IPv4 address from this log line. Pattern to think about: `\\d+\\.\\d+\\.\\d+\\.\\d+`",
      code: `Apr 12 02:13:55 web-01 sshd[4021]: Accepted password for root from 10.0.42.7 port 51224`,
      hint: "Four groups of digits separated by dots.",
      answer: "10.0.42.7",
      xp: 20,
    },
    {
      slug: "capture-the-flag",
      prompt:
        "A flag of the form `FLAG{...}` is buried in the noise below. Pattern: `FLAG\\{[^}]+\\}`. Submit the whole flag, braces included.",
      code: `9f3a2 ;; dGhpcyBpcyBub3QgaXQ= ## FLAG{r3gex_n1nja} %% 0xDEADBEEF __ ignore_me`,
      hint: "Match from `FLAG{` up to the first closing brace `}`.",
      answer: "FLAG{r3gex_n1nja}",
      caseSensitive: true,
      xp: 25,
    },
    {
      slug: "capture-group",
      prompt:
        "Using the capture group in `#(\\d+)`, what digits does group 1 capture from this line?",
      code: `[INFO] Order #00123 confirmed for customer #88`,
      hint: "The FIRST `#` followed by digits wins. Submit only the captured digits — keep the leading zeros.",
      answer: "00123",
      xp: 20,
    },
  ],
};
