import type { Module } from "./types";

// AI for Legal Work — practical AI literacy for legal professionals and
// people who deal with legal documents. All quiz/reading lessons. Covers
// how LLMs interact with legal text, where they help, where they hallucinate,
// ethical obligations, confidentiality, and real workflow integration.
export const aiForLegal: Module = {
  slug: "ai-for-legal",
  title: "AI for Legal Work",
  description:
    "Understand how to use AI tools confidently and responsibly in legal practice — drafting, research, document review, and client communication — while navigating the professional-responsibility and confidentiality obligations that make legal AI different from every other domain.",
  emoji: "⚖️",
  gradient: "from-amber-500/20 to-yellow-500/10",
  tagline:
    "Use AI to draft faster, research smarter, and review documents at scale — without crossing the ethical lines that protect your clients and your license.",
  keywords: [
    "AI for lawyers",
    "AI legal research",
    "AI contract review",
    "legal AI tools",
    "AI and attorney ethics",
    "AI document drafting",
    "AI confidentiality legal",
    "AI for paralegals",
  ],
  lessons: [
    {
      slug: "how-llms-read-legal-text",
      title: "How LLMs Read Legal Text",
      blurb: "Why language models are surprisingly good at legal language — and where that advantage ends.",
      xp: 20,
      kind: "quiz",
      content: `# How LLMs Read Legal Text

Large language models are trained on an enormous corpus that includes court
opinions, statutes, regulations, contracts, and law-review articles. That makes
them unusually fluent in legal language — they can parse dense boilerplate,
recognize defined terms, and produce text that *sounds* professionally drafted.

But fluency is not the same as accuracy.

**What LLMs do well with legal text:**

- Recognizing standard clause structures and common deviations
- Summarizing long documents into plain English
- Drafting first-pass versions of routine documents (NDAs, simple agreements)
- Explaining concepts to non-lawyers in accessible language
- Spotting what *might* be missing based on similar document patterns

**Where they fall short:**

- **Jurisdiction specificity.** A clause that is enforceable in one state can
  be void in another. Models generalize; law is local.
- **Recent developments.** Training data has a cutoff. New statutes, amended
  rules, and last month's circuit split are invisible to the model.
- **Hallucinated citations.** Models invent case names, docket numbers, and
  holdings with the same confidence they cite real ones. This is the most
  dangerous failure mode in legal work.
- **Nuance that changes outcomes.** "Reasonable efforts" vs. "best efforts"
  vs. "commercially reasonable efforts" are legally distinct; a model may
  swap them without flagging it.

Think of an LLM as a very well-read paralegal who has never passed a bar exam,
cannot be held to a professional standard, and has no access to Westlaw or
Lexis beyond its training snapshot. Useful — not a substitute for qualified
legal judgment.`,
      questions: [
        {
          prompt:
            "Why is an LLM's fluency with legal language not the same as legal accuracy?",
          options: [
            "Legal language is too complex for any AI to read",
            "Fluency reflects pattern-matching on training text, not verified knowledge of current, jurisdiction-specific law",
            "LLMs only understand plain English, not formal legal style",
          ],
          answer: 1,
          explanation:
            "A model can produce convincing legal prose while stating an outdated rule, citing a made-up case, or applying the wrong jurisdiction's standard. Fluency is a surface feature; accuracy requires verification.",
        },
        {
          prompt:
            "A contract drafter asks an LLM whether a non-compete clause is enforceable. What is the biggest risk in relying on that answer?",
          options: [
            "The model will always refuse to discuss non-competes",
            "Non-compete enforceability varies sharply by state — the model may give a confident answer based on a jurisdiction other than yours",
            "LLMs cannot read contracts at all",
          ],
          answer: 1,
          explanation:
            "Non-compete law is one of the most jurisdiction-specific areas in employment law. States like California void them almost entirely; others enforce them broadly. A model generalizing from its training corpus can easily produce a wrong answer for your specific state.",
        },
        {
          prompt:
            "An LLM cites three cases in support of a legal argument it drafted. What should you do before including those citations in a filing?",
          options: [
            "Use them as-is — the model is trained on legal text so the citations are reliable",
            "Verify each citation in a primary source such as Westlaw or Lexis to confirm it exists and says what the model claims",
            "Delete all citations since AI-generated citations are always fake",
          ],
          answer: 1,
          explanation:
            "Hallucinated citations are the most-documented failure mode in legal AI use. Several attorneys have faced sanctions for filing briefs with fabricated cases. Every AI-generated citation must be verified in a primary source before use.",
        },
      ],
      explanation:
        "LLMs are fluent but not reliable for jurisdiction-specific rules or current law. The hallucinated-citation risk alone makes independent verification non-negotiable for any AI-assisted legal work.",
    },
    {
      slug: "ai-legal-research-limits",
      title: "AI Legal Research: Power and Limits",
      blurb: "Where AI accelerates legal research and where it will get you sanctioned.",
      xp: 22,
      kind: "quiz",
      content: `# AI Legal Research: Power and Limits

AI tools have genuinely changed the speed of legal research — but the change is
uneven across tasks.

**Where AI accelerates research:**

- **Issue spotting.** Feeding a set of facts and asking "what legal issues might
  arise here?" often surfaces angles a junior associate might miss in a first pass.
- **Plain-language summaries.** Turning a 40-page regulatory rule into a
  one-page executive summary is something current models do well.
- **Research scoping.** "What are the main doctrines governing X?" gives a map
  of the territory before you dig into primary sources.
- **Comparative analysis.** Asking how a concept is handled across multiple
  jurisdictions gives a useful starting framework.
- **Drafting research memos.** A first-pass structure and argument skeleton that
  a lawyer then populates with verified citations.

**Where AI research is unreliable — and can harm clients:**

- **Primary law retrieval.** AI tools not connected to a live legal database
  cannot reliably retrieve current statutes, regulations, or cases. Even
  legal-specific AI tools (like Westlaw's AI features or Harvey) should be
  verified; they flag confidence levels for a reason.
- **Shepardizing / KeyCiting.** Whether a case is still good law requires a
  live citator. An LLM cannot tell you a case was overruled last year.
- **Deadline-critical procedural rules.** Local rules, filing deadlines, and
  page limits change. Never rely on AI for these — check the court's current
  local rules directly.
- **Confidential facts in public prompts.** Using a public consumer AI tool to
  research a specific client matter can expose privileged information (see the
  confidentiality lesson).

**The workflow that works:** use AI to build the scaffold, then populate it with
primary sources you have personally verified. AI output is a starting point, not
a citation.`,
      questions: [
        {
          prompt:
            "Which task is a good use of an AI assistant in legal research?",
          options: [
            "Confirming whether a case is still good law before citing it in a brief",
            "Generating an issue-spotting overview of a new fact pattern to guide where to dig deeper",
            "Determining the exact filing deadline for a motion under the court's current local rules",
          ],
          answer: 1,
          explanation:
            "Issue spotting — identifying the range of legal questions a fact pattern raises — is an area where LLMs add genuine value as a first pass. Citator functions and procedural deadlines require live primary sources the model doesn't have.",
        },
        {
          prompt:
            "Why can't a general-purpose LLM tell you whether a case you want to cite is still good law?",
          options: [
            "LLMs are not allowed to discuss court decisions",
            "The model has a training cutoff and no access to a live citator — it cannot know about subsequent overruling, distinguishing, or limiting decisions",
            "Cases are too long for any LLM to process",
          ],
          answer: 1,
          explanation:
            "A model trained before a case was overruled will still cite it as valid authority. Only a live citator tool (Westlaw's KeyCite, Lexis's Shepard's) tracks subsequent history in real time.",
        },
        {
          prompt:
            "A paralegal asks an AI to summarize the differences in non-solicitation enforceability across five states. This is best described as:",
          options: [
            "An improper use of AI — only attorneys may conduct legal research",
            "A reasonable use of AI to build a comparative framework, provided the output is verified against primary sources before any client advice",
            "A final, reliable answer that can be delivered directly to the client",
          ],
          answer: 1,
          explanation:
            "Using AI to map jurisdictional differences is a legitimate research acceleration technique. The output must still be verified — but the AI-generated framework saves hours of initial orientation work.",
        },
      ],
      explanation:
        "AI research tools speed up the scaffold-building phase. Primary-source verification, citator checks, and current procedural rules still require direct access to authoritative databases.",
    },
    {
      slug: "ai-drafting-contracts-documents",
      title: "AI-Assisted Drafting",
      blurb: "Using AI to draft contracts and legal documents faster without losing precision.",
      xp: 22,
      kind: "quiz",
      content: `# AI-Assisted Drafting

Drafting is where AI currently adds the most concrete time value for legal
professionals. A first draft of a non-disclosure agreement, employment offer
letter, or demand letter that used to take 45 minutes can now take 10.

**Effective AI drafting workflow:**

1. **Prime with context.** Tell the model the deal type, parties' roles,
   governing law, and any key business points. The more context, the less
   revision you'll do.
2. **Use your precedents as input.** Many tools let you upload a firm-specific
   template; ask the AI to adapt it rather than generate from scratch. This
   preserves your preferred language and structure.
3. **Ask for the opposing argument.** After drafting a clause, prompt: "What
   argument would opposing counsel make against this clause, and how could it
   be strengthened?" This surfaces weaknesses early.
4. **Review every defined term and cross-reference.** LLMs sometimes introduce
   inconsistent definitions or reference sections that don't exist. A defined-
   term audit is essential before any draft leaves the firm.
5. **Flag what it doesn't know.** Ask: "What information would change this
   draft?" This surfaces gaps in the context you provided.

**Danger zones in AI drafting:**

- **Jurisdiction-specific formalities.** Execution requirements, notarization,
  witness rules, and filing formats vary widely. AI may omit required elements.
- **Regulated document types.** Wills, deeds, court filings, and securities
  disclosures have mandatory form requirements. Treat AI drafts of these as
  raw material only.
- **Representations and warranties.** These are high-stakes and highly
  negotiated. AI will produce plausible language; it won't know your client's
  actual risk tolerance or the deal's specific allocation logic.

**The standard stays the same:** the attorney of record is responsible for
every word in a filed or delivered document, regardless of how it was
drafted.`,
      questions: [
        {
          prompt:
            "What is the most effective way to use AI to draft a contract clause for a specific deal?",
          options: [
            "Ask for 'a standard indemnification clause' without giving any context",
            "Provide the deal type, governing law, parties' roles, and key business points, then review every defined term in the output",
            "Accept the first draft without review since AI legal drafting is highly accurate",
          ],
          answer: 1,
          explanation:
            "Context-rich prompts produce drafts that require less revision. Regardless of how good the prompt is, a defined-term audit and cross-reference check are always required before the draft moves forward.",
        },
        {
          prompt:
            "After AI drafts a limitation-of-liability clause, you ask it: 'What argument would opposing counsel make against this?' This technique is useful because:",
          options: [
            "It turns the AI into your opposing counsel, replacing the need to negotiate",
            "It surfaces potential weaknesses in the clause before the other side does — allowing you to strengthen it proactively",
            "It is an improper use of AI in legal practice",
          ],
          answer: 1,
          explanation:
            "Stress-testing your own drafts by prompting for counter-arguments is a legitimate and effective way to use AI as a drafting partner. It surfaces issues early, when revision is cheap.",
        },
        {
          prompt:
            "An AI drafts a will for a client. Before using it, what must the supervising attorney verify?",
          options: [
            "Nothing — wills are simple documents and AI output is reliable",
            "Jurisdiction-specific execution formalities (witness count, notarization, self-proving affidavit requirements) that the AI may have generalized or omitted",
            "Only that the client's name is spelled correctly",
          ],
          answer: 1,
          explanation:
            "Will execution requirements are strictly jurisdictional and noncompliance can void the document. AI drafts of testamentary instruments require careful verification of every formality the jurisdiction mandates.",
        },
      ],
      explanation:
        "AI drafting cuts time-to-first-draft significantly, but defined-term consistency, jurisdiction-specific formalities, and the attorney's professional responsibility for the final product are unchanged.",
    },
    {
      slug: "ai-document-review",
      title: "AI in Contract and Document Review",
      blurb: "Scaling document review with AI — what it finds, what it misses, and how to stay in control.",
      xp: 23,
      kind: "quiz",
      content: `# AI in Contract and Document Review

Document review — reading stacks of contracts, discovery materials, or due-
diligence files to find what matters — has been one of the most time-consuming
tasks in legal work. AI has changed the economics of it.

**What AI document review does well:**

- **High-volume first-pass triage.** Sorting 2,000 agreements into "contains
  change-of-control clause" vs. "does not" is a task AI handles quickly and
  consistently.
- **Clause extraction and comparison.** Pulling every indemnification or
  limitation-of-liability clause across a contract portfolio and presenting
  them side-by-side.
- **Deviation flagging.** Comparing a contract against a playbook or standard
  form and highlighting terms that differ.
- **PII and privilege identification.** Flagging documents that may contain
  personal data or attorney-client communications for human review.

**Limitations and risks:**

- **False negatives.** A clause buried in an exhibit or drafted in non-standard
  language may not be detected. AI document review is a triage tool, not a
  complete substitute for attorney review of high-stakes documents.
- **Context blindness.** AI can flag that a clause is present; it may not
  understand how it interacts with three other clauses to create a specific
  risk. Clause-in-context analysis still requires a lawyer.
- **Confidence scores are not guarantees.** Legal AI tools often express
  confidence percentages. A 92% confidence that a clause is "market standard"
  means 8 in 100 such assessments will be wrong — at scale, that matters.
- **Model-specific training.** Tools trained primarily on US commercial
  contracts may perform poorly on international agreements, regulated-industry
  documents, or non-standard structures.

**Practical workflow:** use AI to prioritize and triage, then apply attorney
judgment to the flagged items — especially anything high-stakes. Document your
AI-assisted process so clients and opposing parties understand how the review
was conducted.`,
      questions: [
        {
          prompt:
            "Which document review task is the strongest current use case for AI?",
          options: [
            "Determining whether a contract is the product of fraud or duress",
            "Triaging a large portfolio of agreements to flag those containing a specific clause type",
            "Providing a final legal opinion on the enforceability of a disputed term",
          ],
          answer: 1,
          explanation:
            "High-volume, pattern-based triage — 'which of these 800 contracts contains a change-of-control clause?' — is where AI document review delivers reliable speed gains. Fraud analysis and enforceability opinions require attorney judgment.",
        },
        {
          prompt:
            "An AI review tool reports 91% confidence that all material risks in a merger's contract portfolio have been flagged. How should you interpret this?",
          options: [
            "Treat it as complete — 91% confidence means the review is essentially done",
            "Recognize that at scale, 9% misses could represent dozens of material contracts, and apply attorney judgment to high-stakes items regardless of the confidence score",
            "Reject the tool entirely — any uncertainty makes AI document review useless",
          ],
          answer: 1,
          explanation:
            "In a portfolio of 500 contracts, a 9% miss rate could mean 45 unreviewed risky documents. Confidence scores set expectations but do not eliminate the need for attorney review of high-stakes materials.",
        },
        {
          prompt:
            "Why might an AI contract review tool trained on US commercial agreements perform poorly on an international supply chain contract?",
          options: [
            "AI cannot process documents in English from non-US parties",
            "The model's understanding of 'standard' terms is calibrated to US practice — different governing law, Incoterms, and local mandatory provisions may not be in its training distribution",
            "International contracts are always shorter and simpler, so the tool is over-equipped",
          ],
          answer: 1,
          explanation:
            "AI tools are only as good as their training data. A model trained on US M&A and commercial contracts may have limited exposure to CISG provisions, EU data-transfer clauses, or jurisdiction-specific mandatory terms that are routine in international practice.",
        },
      ],
      explanation:
        "AI document review is a triage accelerator, not a replacement for attorney judgment on high-stakes items. Understand confidence scores, training-data scope, and the specific risks of false negatives in your practice area.",
    },
    {
      slug: "confidentiality-and-ethics",
      title: "Confidentiality, Ethics, and Professional Responsibility",
      blurb: "The professional-responsibility rules that govern every AI tool you touch at work.",
      xp: 25,
      kind: "quiz",
      content: `# Confidentiality, Ethics, and Professional Responsibility

Using AI in legal practice is not just a technology decision — it triggers duties
under the rules of professional conduct that govern attorneys.

**The core obligations:**

- **Competence (ABA Model Rule 1.1, comment 8).** The duty of competence
  includes understanding "the benefits and risks associated with relevant
  technology." Ignorance of how AI tools work is not a defense.
- **Confidentiality (ABA Model Rule 1.6).** You must not disclose client
  information without consent. Pasting client facts into a consumer AI tool
  with data-training-on-by-default settings may constitute a disclosure.
- **Supervision (ABA Model Rules 5.1 / 5.3).** Attorneys must supervise
  subordinates and non-lawyer assistants. AI-generated work product is output
  from a non-lawyer tool and requires the same (or greater) review.
- **Candor toward the tribunal (ABA Model Rule 3.3).** Submitting AI-
  hallucinated citations is a violation. The attorney of record is responsible
  for every representation made to a court.

**What this means in practice:**

- **Use enterprise or law-firm-specific AI tools** that do not train on your
  inputs and have a clear data processing agreement — or redact client
  identifiers before using a consumer tool.
- **Understand the tool's data handling.** Where are prompts stored? Are they
  used to train future models? Who can access them?
- **Have a written AI use policy** at the firm level that clients can be
  informed of.
- **Disclose AI use where required.** Several courts have adopted local rules
  requiring disclosure when AI was used to draft filings. Check before filing.

Many state bars have issued guidance or formal opinions on AI. The ABA and
state-level ethics authorities are actively developing updated rules. Staying
current on your jurisdiction's guidance is now a competence obligation, not
optional.`,
      questions: [
        {
          prompt:
            "An associate pastes a client's full contract dispute facts into a free consumer chatbot to get a quick legal memo outline. Under ABA Model Rule 1.6, the concern is:",
          options: [
            "None — AI tools are treated like search engines for ethics purposes",
            "This may constitute a disclosure of confidential client information if the tool stores inputs or uses them for training without appropriate safeguards",
            "Only a concern if the client has specifically asked that AI not be used",
          ],
          answer: 1,
          explanation:
            "Rule 1.6 prohibits disclosure of client information without consent. Consumer AI tools that train on user inputs or retain conversation data may constitute a disclosure. Enterprise tools with appropriate data agreements are the professional standard.",
        },
        {
          prompt:
            "A partner submits a brief to federal court that includes three case citations generated by an AI assistant. The cases do not exist. Which rule is most directly at issue?",
          options: [
            "ABA Model Rule 1.6 (Confidentiality)",
            "ABA Model Rule 3.3 (Candor Toward the Tribunal)",
            "ABA Model Rule 1.4 (Communication)",
          ],
          answer: 1,
          explanation:
            "Rule 3.3 prohibits knowingly making false statements of law to a tribunal. Courts have sanctioned attorneys for filing briefs with hallucinated citations, holding that the obligation to verify before filing applies regardless of how the draft was produced.",
        },
        {
          prompt:
            "Several courts have adopted local rules requiring disclosure when AI was used to draft court filings. An attorney who ignores these rules and files without disclosing may face:",
          options: [
            "No consequences — these rules are advisory, not mandatory",
            "Sanctions, including potential violations of Rule 3.3 and Rule 8.4 depending on the court's reading",
            "Only administrative inconvenience — a simple re-filing with the disclosure cures it",
          ],
          answer: 1,
          explanation:
            "Courts have taken non-disclosure seriously as both a candor issue and, in some readings, a professional-misconduct issue under Rule 8.4. Checking current local rules for AI-disclosure requirements before filing is a basic competence obligation.",
        },
      ],
      explanation:
        "AI use in legal practice triggers confidentiality, competence, supervision, and candor obligations. Enterprise tools with data agreements, citation verification, and awareness of court-specific disclosure rules are the baseline.",
    },
    {
      slug: "ai-client-communication",
      title: "AI in Client Communication and Intake",
      blurb: "Where AI helps you communicate clearly with clients — and where it creates UPL risk.",
      xp: 22,
      kind: "quiz",
      content: `# AI in Client Communication and Intake

AI has practical applications throughout the client-facing side of legal work,
but it also sits close to the boundary of unauthorized practice of law (UPL).

**Legitimate uses for client communication:**

- **Plain-language explanations.** Lawyers can use AI to draft explanations of
  legal concepts for client letters — saving time while improving accessibility.
  The attorney reviews and signs off; the communication is still the attorney's.
- **Intake questionnaires.** AI tools can help design structured intake forms
  that gather the facts needed for a consultation.
- **Meeting summaries.** After a client call, AI transcription and summarization
  tools can produce a first-pass summary for the file.
- **Translation assistance.** AI translation is not a substitute for a certified
  translator in formal proceedings, but it can aid comprehension in informal
  client communications.
- **Document explanation.** Helping a client understand what a document means in
  plain English — delivered under attorney supervision — is part of client service.

**Where UPL and ethical risk enters:**

- **Automated AI chatbots giving legal advice without attorney supervision** are
  a UPL risk if they provide specific legal advice to individuals rather than
  general legal information. The line between "information" and "advice" is
  jurisdiction-specific and often litigated.
- **AI-generated client communications sent without attorney review** create
  supervision problems under Rules 5.1/5.3.
- **Intake tools that assess case merit without attorney review** may cross into
  advice. Screening tools should gather facts; analysis should remain with a
  licensed attorney.
- **Client confidences in AI logs.** Client intake data held in a third-party AI
  platform must be subject to appropriate data security and confidentiality
  protections — check the vendor's agreements.

The practical standard: AI assists the attorney; the attorney remains the
one exercising professional judgment and supervising every client-facing output.`,
      questions: [
        {
          prompt:
            "A law firm deploys an AI chatbot on its website that answers specific questions about whether visitors have viable personal injury claims. The concern is:",
          options: [
            "None — AI chatbots are explicitly exempt from unauthorized practice of law rules",
            "The chatbot may be providing legal advice rather than general legal information, potentially constituting UPL if it is not under attorney supervision",
            "Only a concern if the firm charges for the chatbot service",
          ],
          answer: 1,
          explanation:
            "Providing specific legal advice — as opposed to general legal information — is the practice of law. An AI chatbot assessing whether an individual has a viable claim may cross that line, especially without real-time attorney oversight.",
        },
        {
          prompt:
            "An attorney uses an AI tool to draft a plain-language explanation of a lease clause for a client letter, reviews and edits it, then sends it on firm letterhead. This is:",
          options: [
            "Improper — AI may not assist with client-facing legal communications",
            "Appropriate — the attorney supervised the output, exercised judgment over it, and takes professional responsibility for the final communication",
            "Only appropriate if the client consented to AI use for every communication",
          ],
          answer: 1,
          explanation:
            "Using AI as a drafting aid for client communications is consistent with professional-responsibility rules when the attorney reviews the output and takes responsibility for it. The attorney remains the communicating professional.",
        },
        {
          prompt:
            "Client intake data collected through a third-party AI platform must be evaluated for:",
          options: [
            "Nothing beyond basic GDPR compliance",
            "Data security, confidentiality protections, and whether the vendor's data processing agreement is consistent with the firm's Rule 1.6 obligations",
            "Only whether the AI platform is bar-association certified",
          ],
          answer: 1,
          explanation:
            "Client data in a third-party AI system is client confidential information under Rule 1.6. The firm must verify that the vendor's security and data-use practices are consistent with confidentiality obligations — not just rely on general privacy policies.",
        },
      ],
      explanation:
        "AI can improve client communication efficiency and clarity, but the attorney must supervise all client-facing AI output, and intake or advice tools must stay on the correct side of the UPL line.",
    },
    {
      slug: "building-ai-into-legal-practice",
      title: "Building AI Into Your Legal Practice",
      blurb: "Capstone: a practical framework for adopting AI responsibly at firm and individual level.",
      xp: 25,
      kind: "quiz",
      content: `# Building AI Into Your Legal Practice

You've covered the capability map, the research pitfalls, drafting workflow,
document review at scale, professional-responsibility obligations, and client-
facing risks. This lesson ties it into a practical adoption framework.

**The four-layer framework:**

1. **Governance first.** Before using AI for client work, your firm (or you, as
   a solo) should have answers to: Which tools are approved? What data may be
   input? What disclosure obligations apply? Who is responsible for reviewing
   AI output? Document these decisions.

2. **Tool selection by risk tier.** Not all AI use carries equal risk.
   - *Low risk:* Using AI to draft internal memos, brainstorm research angles,
     explain concepts to yourself.
   - *Medium risk:* Drafting client communications, research memos, or first-
     pass contracts — where attorney review is a clear checkpoint.
   - *High risk:* Court filings, transactional documents that will be signed,
     client advice that drives decisions. AI assists; the attorney owns every word.

3. **Verification workflows.** Build the verification step into the process, not
   as an afterthought. For research: every AI-generated citation goes to a
   primary source before use. For drafts: defined-term audit + cross-reference
   check. For document review: attorney spot-check of a statistical sample of
   AI-flagged and AI-cleared items.

4. **Continuous competence.** AI tools change faster than bar rules. Build a
   habit of reading your state bar's ethics opinions on AI (most are now issuing
   them annually), checking court-specific AI disclosure requirements, and
   revisiting your tool choices as the technology and regulations evolve.

**What good looks like in practice:**

- Faster first drafts that attorneys spend time improving rather than creating
- Research that surfaces more issues in less time, with primary-source backup
- Document review that uses attorney time where judgment matters most
- Client communications that are clearer and faster without reducing quality
- A firm culture where AI is a professional tool, not a shortcut around professional standards

The lawyers who thrive in an AI-augmented practice are those who use the time AI
saves to apply more judgment — not less.`,
      questions: [
        {
          prompt:
            "Before using an AI tool for client work, the most important governance question to answer is:",
          options: [
            "Which AI tool has the most impressive marketing claims",
            "What data may be input, which tools are approved, and who is responsible for reviewing AI output — documented as policy",
            "Whether the AI tool offers a free trial",
          ],
          answer: 1,
          explanation:
            "Governance precedes deployment. Approved tools, data-input rules, review responsibilities, and disclosure obligations should be documented before AI is used in client matters — this is both a risk-management and professional-responsibility baseline.",
        },
        {
          prompt:
            "In a risk-tiered AI adoption framework, which task belongs in the 'high risk' category requiring attorney ownership of every word?",
          options: [
            "Using AI to brainstorm research angles for a new matter",
            "Drafting a brief for filing in federal court or a transaction agreement that will be executed by the parties",
            "Asking AI to explain a concept to help you understand it personally",
          ],
          answer: 1,
          explanation:
            "Court filings and executed transaction documents are high-stakes outputs where errors have direct professional, financial, and legal consequences. AI assists with these; the attorney is fully responsible for the final product.",
        },
        {
          prompt:
            "The best description of what AI should do for a legal professional's workload is:",
          options: [
            "Replace attorney judgment on routine matters to reduce costs",
            "Handle the pattern-based, high-volume, or time-consuming first-pass work so attorneys can apply more judgment on what matters most",
            "Automate client relationships so attorneys can focus exclusively on courtroom work",
          ],
          answer: 1,
          explanation:
            "The value proposition of AI in legal practice is reallocation, not elimination: pattern tasks move to AI so attorney judgment — the irreplaceable professional input — is concentrated where it has the most impact. Replacing judgment is not an appropriate use.",
        },
      ],
      explanation:
        "A governance-first, risk-tiered approach with built-in verification workflows and a commitment to continuous competence is how AI becomes a professional asset rather than a liability in legal practice.",
    },
  ],
};
