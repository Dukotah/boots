import type { Module } from "./types";

export const salaryNegotiation: Module = {
  slug: "salary-negotiation",
  title: "Salary Negotiation for Tech",
  description:
    "Most tech workers leave tens of thousands of dollars on the table by accepting the first offer. Learn the research, framing, and scripts that turn an offer conversation into a negotiation — without sounding greedy or tanking the opportunity.",
  emoji: "💰",
  gradient: "from-amber-500/20 to-orange-500/10",
  tagline:
    "Research your market value, counter confidently, and negotiate beyond base salary — practical tactics for every stage of a tech offer.",
  keywords: [
    "salary negotiation",
    "tech salary",
    "negotiate job offer",
    "software engineer salary",
    "how to negotiate salary",
    "total compensation",
    "equity negotiation",
    "tech offer negotiation",
  ],
  lessons: [
    {
      slug: "why-negotiate",
      title: "Why Negotiation Is Expected",
      blurb: "Hiring managers expect a counter. Not negotiating is leaving money on the table.",
      xp: 20,
      kind: "quiz",
      content: `# Why Negotiation Is Expected

Most people skip negotiation out of fear — they worry about seeming greedy, or
losing the offer entirely. Both fears are largely unfounded in tech.

**Companies build negotiation room into every offer.** Recruiters are instructed
to open at a number below the approved budget for exactly this reason. The first
offer is not the final offer — it's the opening bid.

**Rescinding an offer over a polite counter is extremely rare.** In practice, a
reasonable counter-offer signals that you understand your market value and can
advocate for yourself — qualities every employer wants in a hire. The risk of a
firm "no" is almost always just... the offer stays where it was.

**The compounding math is enormous.** A $10,000 increase in base salary —
modest and common — compounds over a career through raises, bonuses (often
a % of base), and future offers anchored to your current comp. Over five years
that single negotiation is often worth $50,000–$100,000 in total lifetime earnings.

**The asymmetry is real:** the downside of asking politely is almost zero; the
upside is significant. If you walk away from this module with one habit, make it
this: always at least try.`,
      questions: [
        {
          prompt: "Why do companies typically build negotiation room into their initial offers?",
          options: [
            "They are required to do so by law",
            "Recruiters open below the approved budget expecting a counter",
            "They want to pay as much as possible from the start",
          ],
          answer: 1,
          explanation:
            "The first offer is a starting bid, not a ceiling. Approved comp bands almost always have room above the opening number — that headroom exists for negotiation.",
        },
        {
          prompt: "What actually happens in most cases when a candidate politely counter-offers?",
          options: [
            "The offer is immediately rescinded",
            "The hiring manager is insulted and ends the process",
            "The company either meets the counter or holds firm — the offer stays on the table",
          ],
          answer: 2,
          explanation:
            "Offer rescissions for a professional counter are extremely rare in tech. The realistic downside is hearing 'no' — which leaves you exactly where you started.",
        },
        {
          prompt: "Why does a $10,000 base salary increase matter more than it looks at first?",
          options: [
            "It only matters if you negotiate every single year",
            "It compounds through raises, bonuses, and future offers anchored to your current comp",
            "It has no lasting impact after the first year",
          ],
          answer: 1,
          explanation:
            "Base salary is a multiplier: bonuses are often a % of base, raises build on it, and future employers anchor to your current comp. One negotiation echoes for years.",
        },
      ],
      explanation:
        "Negotiation is expected, safe to attempt, and financially significant. The biggest mistake is not starting.",
    },
    {
      slug: "research-your-market-value",
      title: "Researching Your Market Value",
      blurb: "Know your number before any conversation starts — data wins arguments.",
      xp: 22,
      kind: "quiz",
      content: `# Researching Your Market Value

Walking into a negotiation without data is walking into a knife fight empty-handed.
Your job before any offer conversation is to build a defensible comp range for
**your specific role, level, location, and company size**.

**Primary sources (use all three):**

- **Levels.fyi** — self-reported total compensation (TC) data for tech roles at
  specific companies. The most granular resource for software engineering, product,
  and design at larger companies. Filter by company, level, location, and recency.
- **Glassdoor / LinkedIn Salary** — broader coverage including non-FAANG companies,
  marketing, HR, and ops roles. Useful for a second data point and for smaller firms.
- **Blind / Reddit (r/cscareerquestions, r/datascience)** — community threads where
  people share offer details, including equity and signing bonus numbers. Messy but
  rich in real-time signal.

**What to triangulate:**

1. Base salary range for your level and geography.
2. Typical equity grant (RSUs or options) for the company tier.
3. Signing bonus norms for your role.
4. Total compensation (TC) — base + bonus + equity amortized annually.

**Anchoring rule:** Build a range with a floor (your walk-away point) and a target
(realistic, well-supported ask). Never enter a conversation with only a vague sense
of "more." Specific numbers show you did the work.`,
      questions: [
        {
          prompt: "Which resource is best known for detailed total-comp data at specific tech companies, filterable by level and recency?",
          options: [
            "LinkedIn Salary",
            "Levels.fyi",
            "Indeed",
          ],
          answer: 1,
          explanation:
            "Levels.fyi aggregates self-reported TC data with company, level, and location filters — making it the go-to for software engineering and product roles at named tech employers.",
        },
        {
          prompt: "What four components make up a complete 'total compensation' picture?",
          options: [
            "Base salary only — everything else is a bonus",
            "Base salary, equity (RSUs/options), annual bonus, and signing bonus",
            "Base salary, health insurance, 401(k) match, and PTO",
          ],
          answer: 1,
          explanation:
            "TC = base + equity grant (amortized over the vesting schedule) + target annual bonus + signing bonus. Leaving equity or signing off the table is the most common comparison mistake.",
        },
        {
          prompt: "Why is entering a negotiation with a specific number better than saying 'I'd like more'?",
          options: [
            "Specific numbers are legally required",
            "A researched number anchors the conversation and shows the employer you understand the market",
            "Vague requests are more polite and less likely to offend",
          ],
          answer: 1,
          explanation:
            "Anchoring with a specific, data-backed number moves the negotiation toward your target. Vague requests give the other party no reason to move and signal you haven't done the research.",
        },
      ],
    },
    {
      slug: "timing-and-sequencing",
      title: "Timing & Sequencing the Conversation",
      blurb: "When you share your number matters as much as what the number is.",
      xp: 22,
      kind: "quiz",
      content: `# Timing & Sequencing the Conversation

Salary negotiation is not a single moment — it's a sequence of decisions across
the interview process. Optimizing the timing protects your leverage at every step.

**The golden rule: delay sharing your number as long as possible.**

Employers ask early ("What are your salary expectations?") to get an anchor
they can use against you. If you name a number first and it's too low, you've
capped yourself. If it's too high, some will screen you out before negotiating.

**How to deflect gracefully:**

- "I'd love to focus on fit for now. Once I understand the full scope of the role,
  I'll be much better positioned to talk about compensation."
- "I'm expecting a competitive offer in line with market rates — I'm confident
  we can land somewhere that works for both sides."
- If pushed hard: "My research suggests the range for this role at this level
  is approximately $X–$Y — does that align with what you have budgeted?"

**Timing signals:**

1. **Before an offer:** deflect and research.
2. **At the offer call:** listen, express enthusiasm, and ask for time to review.
   Never accept or counter on the spot.
3. **During the review period (24–72 hours):** run your analysis, prepare your
   counter, and reply by email or a scheduled call.
4. **After verbal acceptance:** stop negotiating. Re-opening after a "yes" damages
   trust and is rarely worth it.`,
      questions: [
        {
          prompt: "Why do recruiters ask for salary expectations early in the process?",
          options: [
            "To ensure they can budget accurately for all candidates equally",
            "To get an anchor number they can use to limit how much they offer",
            "It is required by most HR compliance systems",
          ],
          answer: 1,
          explanation:
            "Early anchoring benefits the employer. If you name a number, you lose leverage — they can either hold you to a low self-stated number or screen you out for a high one.",
        },
        {
          prompt: "You receive an offer call. The recruiter wants an answer right now. What should you do?",
          options: [
            "Accept immediately so they know you're excited",
            "Counter on the spot with your best number",
            "Express genuine enthusiasm and ask for 24–72 hours to review the written offer",
          ],
          answer: 2,
          explanation:
            "Decisions made under pressure are rarely optimal. Asking for review time is professional and universally expected — it gives you space to analyze the full package and prepare a confident counter.",
        },
        {
          prompt: "You've verbally accepted an offer. A competing offer arrives the next day at 15% more. What is the cleanest path?",
          options: [
            "Re-open the negotiation — it's fine because nothing is signed",
            "Decline the competing offer since you already gave your word",
            "Inform the first company you're withdrawing, understanding this damages the relationship",
          ],
          answer: 2,
          explanation:
            "A verbal acceptance is a professional commitment. Re-opening it can work in rare cases, but the trust cost is real. Declining after a verbal 'yes' is legal but burns goodwill — factor that into timing decisions earlier.",
        },
      ],
    },
    {
      slug: "crafting-your-counter",
      title: "Crafting Your Counter-Offer",
      blurb: "A strong counter is specific, grounded in data, and enthusiastic — not apologetic.",
      xp: 25,
      kind: "quiz",
      content: `# Crafting Your Counter-Offer

A counter-offer is not a confrontation. It's a professional conversation about
market value — and the tone matters as much as the number.

**The anatomy of a strong counter:**

1. **Express genuine enthusiasm first.** "I'm really excited about this role and
   the team — this is exactly the kind of work I want to be doing."
2. **Introduce the ask clearly.** "After reviewing the full offer and my market
   research, I'd like to ask if there's flexibility on the base salary."
3. **Name a specific number, 10–20% above the offer.** Anchoring high (but
   reasonably) gives you room to meet in the middle while still gaining.
4. **Justify briefly with data.** "Comparable roles at this level in this market
   are ranging from $X to $Y based on Levels.fyi and a few competing conversations."
5. **Don't apologize, don't over-explain.** One clear reason is enough.

**Email vs. phone:** Email is often preferable — you can be precise, the recruiter
can take it to the hiring manager without misquoting you, and you have a record.
Phone builds rapport but requires you to think on your feet.

**What to do if they say they can't move on base:**

Ask about other levers before accepting: signing bonus, equity (larger grant or
accelerated vesting), an earlier first review, remote flexibility, or professional
development budget. A "no" on base rarely means a "no" on everything.`,
      questions: [
        {
          prompt: "What is the recommended range to anchor your counter above the initial offer?",
          options: [
            "1–3% — any more is rude",
            "10–20% — high enough to leave room, reasonable enough to stay credible",
            "50% or more — always aim as high as possible",
          ],
          answer: 1,
          explanation:
            "10–20% over the offer is the established professional range in tech. It gives you room to meet in the middle and still win a meaningful increase, while staying within what companies expect.",
        },
        {
          prompt: "The recruiter says 'the base is fixed — we can't move on that.' What is the best next move?",
          options: [
            "Accept immediately — there is nothing else to discuss",
            "Ask about other levers: signing bonus, equity, vesting schedule, review timing, or remote flexibility",
            "Withdraw from the process — if base is fixed, the company is acting in bad faith",
          ],
          answer: 1,
          explanation:
            "Total compensation has many variables. When base is fixed, the negotiation shifts to the rest of the package — signing bonuses and equity in particular can meaningfully change the first-year and long-term value.",
        },
        {
          prompt: "Why is it important to express enthusiasm before presenting your counter?",
          options: [
            "It is not — lead with the number immediately to show confidence",
            "Framing the counter inside genuine interest signals you want the role and reduces defensiveness",
            "HR systems require positive language in all communications",
          ],
          answer: 1,
          explanation:
            "A counter framed inside enthusiasm sounds like a business conversation; a counter without warmth can sound like an ultimatum. Recruiters advocate for candidates they believe are genuinely excited.",
        },
      ],
      explanation:
        "Enthusiasm + specificity + data = a counter that moves. One well-structured ask can be worth more than years of annual raises.",
    },
    {
      slug: "equity-and-total-comp",
      title: "Understanding Equity & Total Comp",
      blurb: "RSUs, options, vesting cliffs — equity is often the biggest number. Know how to read it.",
      xp: 25,
      kind: "quiz",
      content: `# Understanding Equity & Total Comp

Equity is where tech compensation gets complex — and where candidates most
often misread what they're actually being offered.

**Two main flavors:**

- **RSUs (Restricted Stock Units)** — the most common at public tech companies.
  You receive shares of stock on a vesting schedule. No purchase required; they're
  taxed as ordinary income when they vest, at the current market price.
- **Stock Options (ISOs / NSOs)** — more common at startups. You receive the
  *right* to buy shares at a fixed "strike price." They're only valuable if the
  company's value exceeds that price. Options expire (often 90 days after leaving)
  and can have complex tax treatment.

**Vesting schedules:** A standard schedule is **4 years with a 1-year cliff** —
meaning you receive 0% until the one-year mark, then 25% all at once, then monthly
or quarterly over the remaining 3 years. Leaving before the cliff means forfeiting
all unvested equity.

**How to compare equity across offers:**

1. Get the grant value as a dollar amount (shares × current price for RSUs; shares ×
   (current price − strike) for options, conservatively).
2. Divide by the vesting period (usually 4 years) to get annual equity value.
3. Add to base + target bonus for true annual TC.

**Refresh grants:** At many companies, strong performers receive new equity grants
each year before existing ones fully vest, keeping them "golden handcuffed" to the
company. Ask if refresh grants are part of the culture.`,
      questions: [
        {
          prompt: "At a public tech company, you are offered 400 RSUs over 4 years with a 1-year cliff. You leave after 10 months. How many RSUs do you keep?",
          options: [
            "100 (the first-year tranche)",
            "0 — you left before the cliff and none have vested",
            "About 83 (10/48 of the total)",
          ],
          answer: 1,
          explanation:
            "The 1-year cliff means 0% vests until you complete 12 months. Leaving at 10 months forfeits the entire grant. This is one of the most financially significant facts to understand before accepting.",
        },
        {
          prompt: "To compare equity across two offers fairly, what should you calculate?",
          options: [
            "Total shares granted — whoever offers more shares wins",
            "Annual equity value: (grant dollar value) ÷ vesting period, then add to base + bonus",
            "Whether the company is publicly traded — private company equity is worthless",
          ],
          answer: 1,
          explanation:
            "Shares alone are meaningless without the price per share and vesting schedule. Annualizing and adding to cash comp gives you true total compensation to compare apples-to-apples.",
        },
        {
          prompt: "Stock options at a startup are different from RSUs primarily because:",
          options: [
            "Options are always more valuable because startups grow faster",
            "Options give you the right to buy shares at a strike price — they only have value if the company's worth exceeds that price",
            "Options vest immediately with no cliff",
          ],
          answer: 1,
          explanation:
            "Options are rights, not shares. If the company's stock price never exceeds your strike price (common in downturns or failed startups), the options expire worthless. RSUs become shares regardless of price movement.",
        },
      ],
    },
    {
      slug: "multiple-offers-and-competing",
      title: "Leveraging Multiple Offers",
      blurb: "A competing offer is the most powerful negotiation tool — use it ethically and precisely.",
      xp: 22,
      kind: "quiz",
      content: `# Leveraging Multiple Offers

Nothing changes a negotiation dynamic faster than a competing offer. It converts
"I think I'm worth more" into "the market has confirmed I'm worth more" — a much
stronger position.

**The ethics:** Only use a competing offer as leverage if it's real and you'd
genuinely consider accepting it. Fabricating or inflating offers is both
unethical and risky — companies sometimes verify numbers, and the tech industry
is smaller than it looks.

**How to use it effectively:**

- Be specific, not vague. "I have a competing offer at $X base, $Y in equity, and
  a $Z signing bonus" is far more persuasive than "I have another offer."
- Name the company if you're comfortable — it adds credibility and anchors
  the comparison concretely.
- Frame it as a preference problem, not a threat. "I genuinely prefer this role —
  the team and mission are a better fit. But the financial gap makes it hard to
  make that choice. Is there anything you can do to close it?"

**What happens next:**

Most companies will either match (or partially match) the competing number, or they
won't. If they can't come close, take that as information — it's either a budget
constraint or a signal about how they value the role. Either way, you now know.

**One competing offer also unlocks the others.** If you have three processes
running, you can use early offer A to accelerate B and C by honestly informing
them: "I have an offer with a deadline of [date] — I'd prefer to see your process
through first. Is there any flexibility on timeline?"`,
      questions: [
        {
          prompt: "You have a real competing offer. How should you present it most effectively?",
          options: [
            "Say vaguely that 'other companies are interested' without specifics",
            "Give the specific numbers and frame it as a preference problem, not a threat",
            "Only mention it if directly asked",
          ],
          answer: 1,
          explanation:
            "Specific numbers are credible; vague signals are easy to dismiss. Framing it as 'I prefer you, but the gap makes it hard' gives the recruiter something to bring to the hiring manager with a concrete ask.",
        },
        {
          prompt: "Is it acceptable to fabricate or inflate a competing offer during negotiation?",
          options: [
            "Yes — companies always lowball so the ends justify the means",
            "No — it is unethical, verifiable, and can cost you the offer and your reputation",
            "Only if you inflate it by less than 10%",
          ],
          answer: 1,
          explanation:
            "Tech is a small world. Companies sometimes verify numbers, and candidates have lost offers when fabrications were uncovered. Beyond the risk, misrepresentation is simply dishonest.",
        },
        {
          prompt: "You have an offer from Company A with a 3-day deadline, but you're still interviewing at Company B. What is the cleanest approach?",
          options: [
            "Accept A immediately to secure it, then renege if B comes through",
            "Honestly tell B you have an offer with a deadline and ask if they can accelerate their timeline",
            "Let A's deadline pass and hope for B",
          ],
          answer: 1,
          explanation:
            "Accelerating a timeline by disclosing a competing deadline is standard and expected. Companies deal with this regularly — most will either move faster or tell you they can't.",
        },
      ],
    },
    {
      slug: "negotiation-capstone",
      title: "Capstone: Full Negotiation Walkthrough",
      blurb: "Put it all together — from offer call to signed letter, decision by decision.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: Full Negotiation Walkthrough

You've done the groundwork. Now walk through a complete negotiation scenario from
offer call to acceptance, applying every layer of what you've learned.

---

**The scenario:**

You're a mid-level software engineer. You receive an offer:
- Base: $155,000
- Equity: 200 RSUs over 4 years (1-year cliff), stock currently at $80/share
- Signing bonus: $5,000
- Your Levels.fyi research shows $165K–$180K base for this level and city.
- You have a second offer for $168K base, $160K equity over 4 years, no signing.

**Decision 1 — On the call:**
Express enthusiasm. Do not accept or counter. Ask for 48 hours to review the
written offer.

**Decision 2 — Run the math:**
Offer A TC: $155K base + ($16K equity/yr) + $5K signing = roughly $171K year 1,
$171K ongoing (ignoring signing).
Offer B TC: $168K base + ($40K equity/yr) + $0 signing = $208K year 1, $208K ongoing.

**Decision 3 — Counter Offer A:**
"I'm genuinely excited about this role. Based on my research and a competing offer,
I'd like to ask for $172K base and a $20K signing to close the compensation gap.
The competing offer is at $168K base with $160K in equity — I prefer your team and
mission, but I want to make sure I can make the call comfortably."

**Decision 4 — They respond:**
"We can do $165K base, and we'll increase the signing to $15K. Equity is fixed."

Revised Offer A TC: $165K + $16K equity + $15K signing = $196K year 1.
Still behind Offer B's $208K annually. You now have a clear, honest choice.

**The lesson:**
Every step was data-driven, professionally framed, and grounded in honesty.
That's the whole playbook.`,
      questions: [
        {
          prompt: "In the scenario, Offer A's revised TC is $196K year 1 versus Offer B's $208K annually. What is the most important factor in making a final decision?",
          options: [
            "Always take the higher TC — money is the only variable that matters",
            "Consider TC alongside role fit, team quality, growth trajectory, company stability, and your personal priorities",
            "Always take the lower offer to show loyalty and avoid seeming greedy",
          ],
          answer: 1,
          explanation:
            "TC is one important variable. A $12K gap might be worth it for a role at a stronger company, a better manager, or a team where you'll grow faster. The negotiation gives you the best number from each; the decision is yours to make with full information.",
        },
        {
          prompt: "In the capstone counter, the candidate names the competing offer specifically. Why does this work better than just saying 'my research suggests I'm worth more'?",
          options: [
            "It doesn't — specific numbers are rude and make the recruiter feel like they lost",
            "A concrete competing offer is market evidence, not just self-assessment — it gives the recruiter a specific number to bring to the hiring manager",
            "Companies are legally required to match competing offers when they are named",
          ],
          answer: 1,
          explanation:
            "Recruiters need a business case to get approval for a higher number. A real competing offer at a specific figure is the strongest possible external anchor — it converts 'I think I'm worth more' into 'the market has priced me at this.'",
        },
        {
          prompt: "The company says 'equity is fixed' and improves base and signing instead. What does this tell you?",
          options: [
            "The company is acting in bad faith and the equity pool is probably worthless",
            "Comp packages are flexible across multiple levers — a 'no' on one component often means 'yes' is possible elsewhere",
            "You should have counter-offered on equity first and never on base",
          ],
          answer: 1,
          explanation:
            "Equity grants are often controlled by a separate budget with less flexibility, while signing bonuses and base have more room. A negotiation that moves two levers instead of one can close a gap almost as well as moving one dramatically.",
        },
      ],
      explanation:
        "Research your range. Delay sharing your number. Express enthusiasm and counter specifically. Use competing offers honestly. Ask about every lever. Then decide with full information — that's the complete playbook.",
    },
  ],
};
