import type { Module } from "./types";

// Freelancing as a Developer — practical, no-hype guide to going independent.
// Covers how to price yourself, find clients, manage contracts, handle the
// business side, and sustain a freelance career long-term. All quiz/reading
// lessons (conceptual + practical — no coding).
export const freelanceDeveloper: Module = {
  slug: "freelance-developer",
  title: "Freelancing as a Developer",
  description:
    "Ready to work for yourself? Learn how to price your services, land clients, write contracts that protect you, manage projects solo, handle taxes and cash flow, and build a freelance practice that actually lasts — practical advice grounded in how the market works as of 2026.",
  emoji: "🧑‍💼",
  gradient: "from-teal-500/20 to-green-500/10",
  tagline:
    "Go from employee or student to independent developer — pricing, clients, contracts, taxes, and long-term sustainability, all in one course.",
  keywords: [
    "how to freelance as a developer",
    "freelance developer rates",
    "how to find clients as a developer",
    "freelance developer contracts",
    "freelance taxes for developers",
    "independent contractor developer",
    "how to price software projects",
    "freelance developer tips 2026",
  ],
  lessons: [
    {
      slug: "is-freelancing-right-for-you",
      title: "Is Freelancing Right for You?",
      blurb:
        "Honest trade-offs between independence and stability — before you quit your day job.",
      xp: 20,
      kind: "quiz",
      content: `# Is Freelancing Right for You?

Freelancing offers genuine freedom: you choose your clients, your hours, and the
kind of work you take on. But freedom comes with weight. Before going independent,
it helps to look at the real trade-offs — not the fantasy version.

## What you gain

- **Autonomy** — no one tells you which tech stack to use or how to structure your
  day. You decide.
- **Income ceiling** — a well-positioned freelancer can earn significantly more per
  hour than a salaried role, because clients pay a premium for availability and speed.
- **Variety** — different clients, domains, and problems keep the work from going stale.
- **Location independence** — remote-by-default; many freelancers work from anywhere.

## What you give up

- **Predictable income** — revenue comes in lumps. A slow month means a slow month.
- **Benefits** — health insurance, retirement matching, paid leave, and stock are
  yours to fund now.
- **Colleagues** — isolation is real. You have to build your own professional network
  deliberately.
- **Organizational momentum** — nobody is scheduling your sprints or unblocking you.
  Self-direction is a skill.

## Who tends to thrive

- People who can tolerate income uncertainty without panic.
- People who can sell — or learn to. Client acquisition never fully stops.
- People with a specific, demonstrable skill set clients will pay for.
- People who treat it like a business, not just "doing gigs."

The goal of this module is not to sell you on freelancing — it's to give you the
tools to do it well if you choose it.`,
      questions: [
        {
          prompt:
            "Which of the following is a genuine trade-off of freelancing that employees typically don't face?",
          options: [
            "Having to write code",
            "Funding your own health insurance, retirement, and paid leave",
            "Working with other people",
          ],
          answer: 1,
          explanation:
            "Salaried employees often receive employer-sponsored benefits. As a freelancer you absorb those costs yourself, which meaningfully affects your effective hourly rate.",
        },
        {
          prompt:
            "A freelance developer who earns more per hour than a comparable salaried role is usually compensating for…",
          options: [
            "Having a better personality",
            "Income gaps, self-paid benefits, and the business overhead of running solo",
            "Being allowed to use any text editor they want",
          ],
          answer: 1,
          explanation:
            "A higher hourly rate isn't pure profit — it must cover slow periods, benefits, taxes, admin time, and client-acquisition effort. Salaried roles include all of that invisibly.",
        },
        {
          prompt:
            "Which personal trait most predicts long-term freelance success?",
          options: [
            "Using the newest programming language",
            "Treating freelancing like a business — including the selling, admin, and financial planning",
            "Having gone to a well-known university",
          ],
          answer: 1,
          explanation:
            "The technical skill gets you the work; the business discipline keeps you solvent and growing. Many talented developers fail at freelancing because they ignore the business side.",
        },
      ],
      explanation:
        "Freelancing is a career choice, not just a working arrangement. Going in clear-eyed about the trade-offs is what separates people who thrive from those who burn out and scramble back to employment.",
    },
    {
      slug: "pricing-your-services",
      title: "Pricing Your Services",
      blurb:
        "Hourly vs. project rates, market floors, and why undercharging is a trap.",
      xp: 25,
      kind: "quiz",
      content: `# Pricing Your Services

Pricing is where most new freelancers go wrong — usually by charging too little.
Here's how to think about it clearly.

## Start with your target income

Work backwards from what you actually need to earn:

1. **Annual income goal** (salary equivalent, say $80 000)
2. Add **self-employment tax** (roughly 15% in the US on top of income tax)
3. Add **benefits** (health insurance, retirement: easily $10 000–$20 000/yr)
4. Add **overhead** (software, hardware, accountant, co-working: $3 000–$8 000/yr)
5. Divide by **billable hours** — not your total working hours. Admin, sales, and
   learning are real work; you can't bill them. 1 000–1 200 billable hours/year is
   realistic for a solo freelancer (vs. 2 000 for a full-time employee).

Running those numbers often reveals a floor of $80–$120/hour before you've added
any margin. Charging $30/hr doesn't just undervalue you — it makes your business
mathematically unsustainable.

## Hourly vs. project pricing

- **Hourly** — simple, fair when scope is unclear. Downside: clients see every hour
  as a cost and can feel the meter running.
- **Project (fixed-price)** — quoted for the whole deliverable. Clients love
  predictability. Works well when scope is well-defined. You absorb over-runs, but
  you also capture efficiency gains.
- **Retainer** — a client pays a fixed monthly fee for ongoing availability. Provides
  predictable income; great if you can land one or two.

## Market rates as of 2026

Rates vary widely by specialty, region, and client type. As a rough guide for
English-language markets: generalist web developers commonly see $60–$120/hr;
specialists (security, ML, senior architecture) often command $150–$250+/hr.
Platform rates (Upwork, Toptal) are often lower than direct clients.

## Raising rates

You can and should raise rates over time. The cleanest moment: when starting a new
client. Existing clients get a transition notice ("my rate increases to X on
[date]"). Most good clients accept a reasonable increase annually.`,
      questions: [
        {
          prompt:
            "A freelance developer targets $80 000/year income. After accounting for self-employment tax, benefits, and overhead, their real hourly floor (at 1 100 billable hours) is likely…",
          options: [
            "Around $40/hr — what $80 000 ÷ 2 000 hours gives you",
            "Significantly higher than $40/hr, because billable hours are fewer and true costs are much larger than base salary",
            "Exactly $80 000 ÷ 52 weeks",
          ],
          answer: 1,
          explanation:
            "Divide full loaded cost (salary + tax + benefits + overhead) by realistic billable hours (~1 000–1 200). The number is almost always 2–2.5x what naive salary-to-hourly math suggests.",
        },
        {
          prompt:
            "Which pricing model gives a client the most budget predictability and rewards a developer's efficiency?",
          options: [
            "Hourly billing",
            "Fixed-price project billing",
            "Charging nothing and hoping for referrals",
          ],
          answer: 1,
          explanation:
            "Fixed-price quotes let clients plan their budgets, and an efficient developer who finishes early still earns the full quote. The risk is scope creep — mitigated with a good contract.",
        },
        {
          prompt: "When is the easiest moment to raise your rate?",
          options: [
            "Mid-project, as soon as you decide you want more money",
            "When starting a new client engagement — you simply quote the new rate",
            "Never; rates must stay fixed once set",
          ],
          answer: 1,
          explanation:
            "New clients have no anchor to your old rate. For existing clients, give advance notice and a clear effective date — most good clients accept an annual increase.",
        },
      ],
      explanation:
        "Price from the math, not from impostor syndrome. Work backwards from your full loaded cost and realistic billable hours, and you'll discover that undercutting the market often means working yourself broke.",
    },
    {
      slug: "finding-clients",
      title: "Finding Clients",
      blurb:
        "Where good clients come from — and why your network beats any job board.",
      xp: 20,
      kind: "quiz",
      content: `# Finding Clients

Client acquisition is the part most developers dread and most consistently
under-invest in. The good news: you don't need a sales personality — you need a
simple, repeatable system.

## Your network first

The fastest path to your first (and tenth) client is through people who already
know you. Former colleagues, managers, classmates, and even family friends can
refer you or hire you directly. A short, honest message — "I've gone independent
and I'm taking on projects, here's what I do" — sent to your existing contacts
produces more results than most platforms.

## Direct outreach

Target businesses whose websites, apps, or internal tools clearly need help.
A short, specific email explaining exactly what you'd fix and why it matters is
far more effective than a generic pitch.

## Platforms (use them tactically)

- **Toptal, gun.io** — vetted networks; higher average rates, harder to enter.
- **Upwork, Fiverr** — broad marketplaces; rates are lower and competition is high,
  but useful for building a portfolio or filling gaps.
- **LinkedIn** — keeping your profile current and posting occasionally about your
  work keeps you in front of people who hire.

## Content and visibility

Writing (blog posts, LinkedIn articles, GitHub activity, open-source contributions)
shows expertise without a sales pitch. A developer who has a visible track record
of solving the exact problem a client has gets warm inbound — the best kind.

## The flywheel: referrals

The best client-acquisition strategy is doing excellent work. Every happy client is
a source of referrals. Ask — directly, at project close — "Do you know anyone else
who'd benefit from this?" Most clients are glad to refer; they just don't do it
unless prompted.

## Drying up vs. pipeline

One classic freelance mistake: bill, stop marketing, finish, scramble. Build the
habit of doing *some* client-acquisition activity every week, even when you're
fully booked — so the pipeline never goes empty.`,
      questions: [
        {
          prompt:
            "For a new freelance developer, what is typically the fastest path to the first paying client?",
          options: [
            "Creating a profile on every freelance platform simultaneously",
            "Reaching out to existing contacts — former colleagues, managers, classmates — who know your work",
            "Waiting for inbound inquiries once your website is live",
          ],
          answer: 1,
          explanation:
            "People who already know and trust your work are the shortest path. A warm connection converts far faster than a cold marketplace listing.",
        },
        {
          prompt:
            "A freelancer finishes a great project with a happy client. What is the highest-value thing to do at that moment?",
          options: [
            "Move on quickly to avoid seeming needy",
            "Ask directly: 'Do you know anyone else who'd benefit from this kind of work?'",
            "Post the project on social media without telling the client",
          ],
          answer: 1,
          explanation:
            "Referrals from happy clients are the best leads — high trust, low acquisition cost. Clients rarely refer spontaneously; a direct ask at the right moment almost always works.",
        },
        {
          prompt:
            "What is the 'bill-stop-scramble' mistake that many freelancers fall into?",
          options: [
            "Billing clients twice by accident",
            "Doing client-acquisition only when there's no work, creating feast-or-famine cycles",
            "Stopping work before an invoice is paid",
          ],
          answer: 1,
          explanation:
            "Marketing stops when projects start, leaving an empty pipeline when those projects end. Consistent, small client-acquisition activity — even when fully booked — smooths the cycle.",
        },
      ],
      explanation:
        "Your network and your reputation are your best marketing channels. Cultivate both deliberately, ask for referrals, and keep the pipeline moving even when you're busy.",
    },
    {
      slug: "contracts-and-scope",
      title: "Contracts & Scope Management",
      blurb:
        "Why you need a written contract, what to put in it, and how to stop scope creep cold.",
      xp: 25,
      kind: "quiz",
      content: `# Contracts & Scope Management

A handshake deal is a liability. A written contract is the thing that turns a
professional relationship into a protected one — for both sides.

## What a freelance contract must cover

You don't need to be a lawyer, but your contract must address at minimum:

- **Scope of work** — exactly what you will build or deliver, in as much detail as
  practical. "A website" is not scope. "A five-page marketing site with a contact
  form, built in Next.js, with content provided by client" is closer.
- **Payment terms** — amount, currency, payment schedule (milestone-based or net-30),
  late-payment fees, and how disputes are handled.
- **Revision limits** — how many rounds of revision are included; what additional
  rounds cost.
- **Intellectual property** — who owns the work. Default varies by jurisdiction;
  specify it explicitly. Most clients expect to own the final deliverable; you
  typically retain copyright until paid in full.
- **Termination** — what happens if either party exits early. Who keeps what money?
  What work is delivered?
- **Confidentiality** — if the client shares proprietary information, spell out how
  you'll handle it.

## Scope creep

Scope creep is the slow accumulation of "one small extras" that, collectively, turn
a profitable project into an unpaid one. Signs: "Can you just…", "While you're in
there…", "It should only take a minute."

The fix: a written change order. When new work is requested, respond in writing
with a description of the change, the additional cost, and a request for written
approval. This is not rude — it is professional, and experienced clients expect it.

## Milestone payments

Never do all the work before collecting any money. A common structure:

- 25–50% deposit before work starts
- 25–50% at a defined midpoint milestone
- Remainder on delivery

This aligns payment with progress and protects both sides.`,
      questions: [
        {
          prompt:
            "A client asks for 'one small extra' mid-project that wasn't in the original scope. The professional response is to…",
          options: [
            "Do it for free to keep the client happy",
            "Respond in writing with a description of the change, the additional cost, and ask for written approval before proceeding",
            "Refuse all changes regardless of size",
          ],
          answer: 1,
          explanation:
            "A written change order documents the addition, sets a price, and requires client approval. It protects you legally and trains clients to expect that extra work costs money.",
        },
        {
          prompt:
            "Why is milestone-based payment important for a freelance project?",
          options: [
            "It allows you to charge more in total",
            "It ensures you never do all the work before collecting any money, reducing financial risk for both parties",
            "It is required by law in most countries",
          ],
          answer: 1,
          explanation:
            "Milestone payments align cash flow with progress. A deposit protects you if the client disappears early; milestone payments prevent you from being owed a huge final payment on completed work.",
        },
        {
          prompt:
            "In a freelance contract, who typically owns the intellectual property in the deliverable?",
          options: [
            "Always the developer, no matter what",
            "It depends on the contract — ownership should be specified explicitly, since defaults vary by jurisdiction and the client usually expects to own the final work once paid",
            "Always the client, automatically",
          ],
          answer: 1,
          explanation:
            "IP ownership defaults vary by country and by whether the work qualifies as 'work for hire.' The safest approach is always to state ownership explicitly in the contract, tied to full payment.",
        },
      ],
      explanation:
        "A clear contract protects you, professionalizes the relationship, and creates shared expectations. Scope creep and late payment are not inevitable — they're solved by writing things down.",
    },
    {
      slug: "managing-projects-solo",
      title: "Managing Projects Solo",
      blurb:
        "Communication rhythms, expectation-setting, and delivering on time without a PM.",
      xp: 20,
      kind: "quiz",
      content: `# Managing Projects Solo

As a freelancer, you are simultaneously the developer, the project manager, the
account manager, and the one responsible when something goes wrong. That's not a
reason to be overwhelmed — it's a reason to have simple, repeatable habits.

## Communication is your most underrated skill

Clients don't see your code. They see your updates. A developer who ships late but
communicates well throughout usually keeps the client. One who ships on time but
goes dark loses them.

**Default communication rhythm for a project:**

- Brief written kickoff: restate the scope, timeline, and first milestone in your
  own words and ask the client to confirm. This surfaces misunderstandings before
  they become expensive.
- Weekly status update: what's done, what's next, any blockers or decisions needed.
  Short enough to read in 30 seconds.
- Milestone confirmation: when a milestone is hit, notify in writing and send an
  invoice if payment is due.

## Over-communicate problems early

When something is off — the scope is murkier than expected, a dependency is delayed,
you hit an unexpected technical constraint — tell the client immediately. "I'm going
to be late" delivered early is recoverable. Silence followed by a missed deadline is
often fatal to the relationship.

## Tools and organization

You don't need elaborate tooling. A shared folder (Notion, Google Drive, Linear, or
even a simple shared doc) where the client can see progress and deliverables is
usually enough. Match the client's comfort level, not your own preference for
cutting-edge tooling.

## Handling revision and feedback

Set up a clear feedback loop: share work in a specific, reviewable form; give the
client a deadline for feedback; incorporate it into the next phase. Open-ended
"let me know what you think" with no deadline invites indefinite delays.`,
      questions: [
        {
          prompt:
            "A freelancer is running a week behind schedule. What is the most professional action?",
          options: [
            "Work through the weekend silently and say nothing until it's done",
            "Tell the client immediately, explain why, and propose a revised timeline",
            "Deliver whatever is done on the original date and call it final",
          ],
          answer: 1,
          explanation:
            "Early, honest communication about delays is almost always survivable. Silence followed by a surprise miss destroys trust. Most clients can adjust if given time to do so.",
        },
        {
          prompt:
            "Why is a written kickoff summary (restating scope and timeline in your own words) worth doing at the start of every project?",
          options: [
            "It fills time before the real work starts",
            "It surfaces misunderstandings between what the client thinks they ordered and what you think you're building — before those misunderstandings become expensive",
            "Clients always read it and it substitutes for a contract",
          ],
          answer: 1,
          explanation:
            "The kickoff summary acts as a cheap, early test of alignment. A misunderstanding caught in writing on day one costs almost nothing to fix; the same misunderstanding discovered at delivery can derail the project.",
        },
        {
          prompt:
            "When sharing work for client review, what habit keeps the feedback loop from stalling indefinitely?",
          options: [
            "Sending multiple versions at once so they have options",
            "Giving the client a clear deadline for feedback and specifying what kind of input you need",
            "Waiting until the client reaches out on their own schedule",
          ],
          answer: 1,
          explanation:
            "Open-ended review requests get deprioritized. A deadline and a specific ask ('please confirm the layout by Thursday') keeps the project moving and signals that you are running a professional process.",
        },
      ],
      explanation:
        "Project management as a solo freelancer is mostly communication discipline: set expectations early, update often, surface problems fast, and make it easy for clients to give you the input you need.",
    },
    {
      slug: "taxes-and-finances",
      title: "Taxes & Freelance Finances",
      blurb:
        "Quarterly taxes, separating business money, and the financial hygiene that prevents ugly surprises.",
      xp: 25,
      kind: "quiz",
      content: `# Taxes & Freelance Finances

Financial chaos is one of the most common reasons freelancers burn out or fail.
The good news: the habits that prevent it are not complicated — they just need to
be set up once and maintained.

## Self-employment tax

In most jurisdictions, employees split payroll taxes with their employer. As a
freelancer (self-employed), you owe both halves yourself. In the US this is roughly
15.3% on top of ordinary income tax. The exact rate and name differ by country, but
the principle is universal: your effective tax rate as a freelancer is higher than
your bracket rate alone suggests.

## Estimated (quarterly) tax payments

When you're salaried, tax is withheld automatically. As a freelancer, you typically
owe estimated payments to the government every quarter (in the US: April, June,
September, January). Missing them triggers penalties. A simple rule: set aside 25–35%
of every payment you receive into a separate savings account and treat it as already
spent.

## Separate your money

Open a dedicated business bank account the day you start freelancing. Every invoice
is deposited there; every business expense is paid from there. This is not about
legal structure — it is about clarity. Commingled personal and business funds make
tax time painful and make it hard to see how the business is actually performing.

## Track expenses

Business expenses reduce your taxable income. Common deductible items: home-office
portion of rent/utilities, hardware, software subscriptions, professional development,
health insurance premiums (in many jurisdictions), and the employer half of
self-employment tax itself. You cannot claim what you cannot document — keep receipts.

## Work with a professional

For most freelancers, a CPA or accountant who works with self-employed clients pays
for themselves in saved taxes and avoided mistakes. This is especially true in your
first year.`,
      questions: [
        {
          prompt:
            "Why does a freelance developer in the US often owe a higher effective tax rate than a comparably paid employee?",
          options: [
            "Freelancers are taxed at a special punitive rate by law",
            "Freelancers owe both halves of payroll/self-employment tax that employees normally split with their employer",
            "The government charges extra for not having a traditional job",
          ],
          answer: 1,
          explanation:
            "Employees see only their half of payroll taxes; the employer pays the other half invisibly. As a freelancer, you pay both halves — roughly 15.3% in the US — in addition to ordinary income tax.",
        },
        {
          prompt:
            "What is the simplest, most effective habit for avoiding a painful tax bill at year end?",
          options: [
            "Wait until April to figure out what you owe",
            "Set aside 25–35% of every payment into a separate account the moment it arrives and treat it as already spent",
            "Pay as little as possible and negotiate later",
          ],
          answer: 1,
          explanation:
            "Tax obligations accumulate invisibly on freelance income. Reserving a fixed percentage immediately — before you can spend it — means the money is there when quarterly payments and year-end taxes are due.",
        },
        {
          prompt:
            "A freelancer tracks business expenses carefully. Why does this directly reduce their tax burden?",
          options: [
            "It doesn't — expenses are irrelevant to taxes",
            "Documented business expenses reduce taxable income, so you owe tax on a smaller number",
            "It increases the tax rate applied to their income",
          ],
          answer: 1,
          explanation:
            "Legitimate business expenses (hardware, software, home office, professional development, etc.) are deducted from gross income before tax is calculated. Undocumented expenses cannot be claimed — receipts matter.",
        },
      ],
      explanation:
        "Set aside tax money immediately, keep business and personal funds separate, track every deductible expense, and get a CPA for at least your first year. These four habits prevent most freelance financial disasters.",
    },
    {
      slug: "building-a-sustainable-practice",
      title: "Building a Sustainable Practice",
      blurb:
        "Capstone: positioning, long-term clients, avoiding burnout, and growing beyond solo.",
      xp: 25,
      kind: "quiz",
      content: `# Building a Sustainable Practice

Getting your first client is a milestone. Sustaining a freelance practice for years
— with income you can plan around, clients you actually want to work with, and
energy to spare — is the real goal. That requires deliberate choices.

## Specialize to stand out

Generalists compete on price. Specialists compete on expertise. A developer who
is "good at websites" faces enormous competition; one who is "the go-to person for
performance optimization on Next.js e-commerce stores" has a far smaller competitive
set and commands a premium. You don't have to niche down immediately, but you should
move in that direction intentionally.

## Long-term clients are the business model

A single client on a 12-month retainer is worth more than twelve one-off projects,
for multiple reasons: no recurring acquisition cost, lower communication overhead,
predictable income, and a relationship that deepens over time. Treat your best
clients like partners, not transactions.

## Avoid the trap of permanent busyness

Full utilization is not the goal. A freelancer running at 100% capacity has no time
to market, learn, or rest — and will either miss a deadline or burn out. Target
70–80% billable utilization, and use the remaining capacity for professional
development, pipeline building, and recovery.

## When to raise your rates

Rate increases signal confidence and filter for serious clients. A common moment:
annually, at contract renewal, or when demand for your time consistently exceeds
your capacity. Raising rates and losing a bottom-tier client is often a win — it
frees time for a better-paying one.

## Beyond solo

Some freelancers stay solo indefinitely and that is a valid choice. Others grow by:
subcontracting (farming overflow work to trusted colleagues), productizing (turning a
repeatable service into a fixed-scope, fixed-price offering), or gradually becoming
an agency. None of these are required — but knowing the paths exist helps you
choose deliberately rather than drift.

## What longevity actually looks like

The freelancers who are still going strong five and ten years in share common traits:
a specialty they're known for, a handful of long-term clients, rates that have
grown with experience, sustainable work hours, and consistent (if modest) marketing
every week. Boring, repeatable discipline beats brilliant hustle every time.`,
      questions: [
        {
          prompt:
            "Why do specialist freelancers generally command higher rates than generalists?",
          options: [
            "They work longer hours",
            "They face a smaller competitive set and clients pay a premium for specific, proven expertise",
            "They have more expensive equipment",
          ],
          answer: 1,
          explanation:
            "Specialists define their own market. When you're the obvious expert for a specific problem, price competition largely disappears — clients choose you for the expertise, not the lowest bid.",
        },
        {
          prompt:
            "A freelance developer is fully booked every week with billable work. This sounds ideal, but what critical problem does 100% utilization create?",
          options: [
            "Clients will be too happy and expect the same pace forever",
            "There is no capacity left for marketing, learning, or rest — risking missed deadlines, burnout, and an empty pipeline when projects end",
            "Tax obligations increase sharply above 90% utilization",
          ],
          answer: 1,
          explanation:
            "Sustainable freelancing needs slack. The 20–30% of non-billable time is where pipeline, skill development, and rest live. Burning it all on client hours feels productive until the crash.",
        },
        {
          prompt:
            "Which of the following best describes the profile of a freelance developer who is still thriving five or ten years in?",
          options: [
            "Someone who constantly chases the newest technology and switches niches every year",
            "Someone with a known specialty, a few long-term clients, growing rates, and consistent weekly habits around marketing and delivery",
            "Someone who has never raised their rates to avoid losing clients",
          ],
          answer: 1,
          explanation:
            "Longevity in freelancing comes from compounding: a specialty that deepens, clients who stay, rates that reflect experience, and disciplined habits that keep the pipeline full. It looks boring from the outside and is deeply stable from the inside.",
        },
      ],
      explanation:
        "A sustainable freelance practice is built on specialization, long-term relationships, realistic utilization, and quiet weekly habits — not on hustle or volume. The goal is still earning well and doing good work in five years.",
    },
  ],
};
