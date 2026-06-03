import type { Module } from "./types";

// How Hackers Think — the *ethical* security mindset. Conceptual quiz course: the
// attacker's-eye view used defensively, the rules of engagement, and the legal/
// ethical line. No exploit instructions — this is about thinking, not attacking.
export const hackerMindset: Module = {
  slug: "hacker-mindset",
  title: "How Hackers Think",
  description:
    "Learn the ethical-hacker mindset: think like an attacker to defend better, understand authorization and rules of engagement, and stay firmly on the legal side.",
  emoji: "🕵️",
  gradient: "from-slate-500/20 to-emerald-500/10",
  tagline:
    "Learn the ethical hacking mindset: threat modeling, attacker thinking, authorization, and responsible disclosure.",
  keywords: [
    "ethical hacking",
    "how hackers think",
    "security mindset",
    "white hat hacker",
    "threat modeling basics",
  ],
  free: true,
  lessons: [
    {
      slug: "white-grey-black-hat",
      title: "White, Grey & Black Hats",
      blurb: "Same skills, very different ethics and consequences.",
      xp: 25,
      kind: "quiz",
      content: `# White, Grey & Black Hats

The word "hacker" really just means someone who deeply understands a system and
bends it to do new things. What separates people is **permission and intent**:

- **White hat** — tests systems **with authorization** to help fix them (e.g. a
  hired penetration tester, a bug-bounty researcher following the rules).
- **Black hat** — breaks in **without permission** for theft, damage, or profit.
  This is a crime.
- **Grey hat** — pokes at systems without clear permission. Even with "good
  intentions," this can still be illegal.

This course teaches the **white-hat mindset**: learning how attacks work so you
can **defend**. The single most important rule is coming up next — authorization.

**Things to remember:**
- The skills are neutral; **permission and intent** decide if it's ethical or criminal
- White hat = authorized and helpful; black hat = unauthorized and harmful
- "I meant well" does not make unauthorized access legal`,
      questions: [
        {
          prompt: "What most clearly separates a white-hat from a black-hat hacker?",
          options: [
            "White hats use better tools",
            "White hats act with authorization to help; black hats act without permission to harm",
            "White hats only work during the day",
          ],
          answer: 1,
          explanation:
            "The skills overlap — what differs is authorization and intent. Permission to test, with the goal of fixing, is the white-hat line.",
        },
        {
          prompt: "You find a website bug and start probing deeper 'just to help,' without asking anyone. This is:",
          options: [
            "Clearly fine because your intent is good",
            "Grey-hat behavior that can still be illegal — you lacked authorization",
            "Required of a responsible citizen",
          ],
          answer: 1,
          explanation:
            "Good intentions don't grant permission. Probing without authorization can break the law regardless of motive.",
        },
        {
          prompt: "This course's goal in teaching how attacks work is to:",
          options: [
            "Help you break into systems",
            "Help you defend systems by understanding the attacker's perspective",
            "Encourage grey-hat experimentation",
          ],
          answer: 1,
          explanation:
            "Understanding offense is how defenders anticipate and close gaps. The mindset is used defensively and lawfully.",
        },
      ],
    },
    {
      slug: "authorization-first",
      title: "Authorization Comes First",
      blurb: "No written permission, no test. Full stop.",
      xp: 30,
      kind: "quiz",
      content: `# Authorization Comes First

The non-negotiable rule of security testing: **never test a system you don't own
or have explicit written permission to test.** Professionals work under a
document called a **scope** or **rules of engagement** that spells out exactly
what's allowed: which systems, which techniques, what hours, and what's off-limits.

Where do people practice legally without a target?
- **Their own** machines and lab networks
- **CTF** (Capture The Flag) competitions built for it
- **Intentionally vulnerable** practice apps designed for learning
- **Bug-bounty programs** — but only within the program's published rules

Stepping outside the agreed scope — even on a real engagement — can turn lawful
work into a crime.

**Things to remember:**
- **Written authorization** before any test — always
- Stay **inside the agreed scope**; out-of-scope = unauthorized
- Practice on **your own labs, CTFs, or apps built to be hacked**`,
      questions: [
        {
          prompt: "Before you run any security test against a system, you must have:",
          options: [
            "A fast internet connection",
            "Explicit written authorization (you own it or have permission, within a defined scope)",
            "A good reason in your head",
          ],
          answer: 1,
          explanation:
            "Written permission and a defined scope are the bedrock of legal testing. Without them, it's unauthorized access.",
        },
        {
          prompt: "Which is a legal, safe place to practice attack techniques?",
          options: [
            "Any website that looks insecure",
            "A CTF competition or an app intentionally built to be hacked",
            "A neighbor's Wi-Fi, if you're curious",
          ],
          answer: 1,
          explanation:
            "CTFs and deliberately vulnerable practice apps exist for exactly this. Random real systems are off-limits.",
        },
        {
          prompt: "During an authorized pentest, you notice an interesting server that's NOT in the scope. You should:",
          options: [
            "Test it too, since you're already authorized for the client",
            "Leave it alone — out-of-scope means you have no authorization for it",
            "Test it but don't write it down",
          ],
          answer: 1,
          explanation:
            "Authorization is bounded by the scope. Touching out-of-scope systems is unauthorized, even mid-engagement.",
        },
      ],
    },
    {
      slug: "think-like-attacker",
      title: "Think Like an Attacker",
      blurb: "Defenders ask 'how could this be misused?' — not just 'does it work?'",
      xp: 25,
      kind: "quiz",
      content: `# Think Like an Attacker

Builders ask *"does it work?"* Attackers (and good defenders) ask *"how could this
be **misused**?"* That shift is the security mindset. Instead of the happy path,
you look for the **edge cases, assumptions, and trust** a system relies on:

- What happens if I send **unexpected input** (huge, empty, weird characters)?
- What if I **skip a step** or do things **out of order**?
- What does the system **assume** about me that might not be true?
- Where does it **trust** data it shouldn't (user input, another service)?

Attackers also like the **weakest link** — often not the code at all, but a person
(tricked by a phishing email) or a forgotten, unpatched server.

**Things to remember:**
- Ask **"how could this be abused?"**, not just "does it work?"
- Probe **assumptions, trust, and edge cases**
- The weakest link is often a **person or a forgotten system**, not the firewall`,
      questions: [
        {
          prompt: "The core question of the security mindset is:",
          options: [
            "Does the feature work on the happy path?",
            "How could this be misused or abused?",
            "Is the UI pretty?",
          ],
          answer: 1,
          explanation:
            "Security thinking looks past the intended use to how something could be turned against its owner.",
        },
        {
          prompt: "Why do attackers probe a login form with empty, huge, or strange inputs?",
          options: [
            "To be annoying",
            "To find where the system's assumptions break and reveal a weakness",
            "Because it's faster than logging in normally",
          ],
          answer: 1,
          explanation:
            "Unexpected input flushes out unhandled cases and broken assumptions — classic places vulnerabilities hide.",
        },
        {
          prompt: "In many real breaches, the weakest link turns out to be:",
          options: [
            "The encryption math",
            "A person tricked by phishing, or a forgotten/unpatched system",
            "The choice of programming language",
          ],
          answer: 1,
          explanation:
            "Humans and neglected systems are frequently easier targets than well-maintained cryptography or code.",
        },
      ],
    },
    {
      slug: "recon-and-attack-surface",
      title: "Recon & Attack Surface",
      blurb: "The more ways in, the more you have to defend.",
      xp: 30,
      kind: "quiz",
      content: `# Recon & Attack Surface

Before anything else, attackers do **reconnaissance** — they map the target.
Every login page, API, open port, third-party integration, and employee email is
a possible way in. The sum of all those entry points is the **attack surface**.

A defender's job is largely to **shrink the attack surface**: turn off services
you don't use, close ports you don't need, remove old accounts, and limit what
each part of the system can reach. Less surface means fewer doors to guard.

Much recon uses **public information** — a company's own website, job postings
(which reveal the tech stack!), and public records. None of that requires
breaking in, which is why minimizing what you expose matters.

**Things to remember:**
- **Attack surface** = every possible entry point into a system
- Defenders **shrink** it: disable unused services, close ports, remove old accounts
- A lot of recon uses **public info** — be mindful of what you expose`,
      questions: [
        {
          prompt: "A system's 'attack surface' is:",
          options: [
            "The screen where you type commands",
            "The total set of points where an attacker could try to get in",
            "The physical size of the server",
          ],
          answer: 1,
          explanation:
            "Attack surface is the sum of all entry points — logins, APIs, ports, integrations, people.",
        },
        {
          prompt: "A good general defense is to:",
          options: [
            "Add as many services and open ports as possible",
            "Reduce the attack surface — disable unused services, close unneeded ports, remove stale accounts",
            "Keep every old account in case it's needed",
          ],
          answer: 1,
          explanation:
            "Fewer exposed services and accounts means fewer doors to defend. Shrinking the surface is foundational.",
        },
        {
          prompt: "Why can a company's public job postings help an attacker?",
          options: [
            "They contain passwords",
            "They often reveal the technology stack and tools in use",
            "They list the firewall rules",
          ],
          answer: 1,
          explanation:
            "Postings like 'must know AWS and PostgreSQL' quietly disclose the tech in use — useful recon, gathered entirely from public info.",
        },
      ],
    },
    {
      slug: "responsible-disclosure",
      title: "Responsible Disclosure",
      blurb: "Found a bug? There's a right way to report it.",
      xp: 30,
      kind: "quiz",
      content: `# Responsible Disclosure

Suppose you legitimately discover a real security flaw — say, in a bug-bounty
program. What you do next defines whether you're a hero or a liability.
**Responsible (coordinated) disclosure** is the standard:

1. **Report privately** to the vendor (via their security contact or bounty program).
2. Give them **reasonable time to fix it** before going public.
3. **Don't exploit it**, steal data, or access more than needed to prove it exists.
4. Only **publish details** after a fix, and often in coordination with the vendor.

The opposite — dumping a working exploit publicly or selling it — puts real users
at risk and can be illegal. Many companies run **bug-bounty** programs that pay
for exactly this kind of responsible reporting.

**Things to remember:**
- Report **privately first**, give time to fix, don't exploit or exfiltrate data
- Prove the bug with the **minimum** access needed
- **Bug-bounty programs** reward responsible disclosure`,
      questions: [
        {
          prompt: "You find a serious vulnerability in a company that runs a bug-bounty program. The responsible first step is:",
          options: [
            "Post the exploit on social media so it gets fixed fast",
            "Report it privately through their security/bounty channel and give them time to fix it",
            "Use it to download user data as proof",
          ],
          answer: 1,
          explanation:
            "Coordinated disclosure means reporting privately and allowing time to remediate before any public details.",
        },
        {
          prompt: "When proving a vulnerability is real, you should access:",
          options: [
            "As much data as possible to make a strong case",
            "Only the minimum needed to demonstrate the issue",
            "Other users' accounts to show the full impact",
          ],
          answer: 1,
          explanation:
            "Minimize access — enough to prove it, never exfiltrating real user data. More than that can be illegal and harmful.",
        },
        {
          prompt: "Selling a working exploit or dumping it publicly before a fix is:",
          options: [
            "A great way to build a reputation",
            "Harmful and often illegal — it endangers real users",
            "The standard practice in security research",
          ],
          answer: 1,
          explanation:
            "Public dumps and sales put users at risk and can be criminal. Responsible disclosure protects people while the fix ships.",
        },
      ],
    },
  ],
};
