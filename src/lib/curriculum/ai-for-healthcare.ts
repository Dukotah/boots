import type { Module } from "./types";

// AI in Healthcare (for Everyone) — a no-jargon tour of how AI is actually used
// in medicine today: diagnostics, drug discovery, clinical admin, patient safety,
// bias, regulation, and what it means for patients and providers. All quiz/reading
// lessons (no coding). Not free — part of the applied-AI paid track.
export const aiForHealthcare: Module = {
  slug: "ai-for-healthcare",
  title: "AI in Healthcare (for Everyone)",
  description:
    "AI is reshaping medicine — from reading X-rays to flagging drug interactions to cutting paperwork for burned-out clinicians. This course explains what's real, what's coming, and what every patient and healthcare worker should understand about AI in the clinic.",
  emoji: "🩺",
  gradient: "from-red-500/20 to-rose-500/10",
  tagline:
    "Understand how AI is actually used in hospitals, clinics, and drug labs — the real wins, the real risks, and what it means for you as a patient or provider.",
  keywords: [
    "AI in healthcare",
    "AI in medicine",
    "medical AI",
    "AI diagnostics",
    "AI drug discovery",
    "AI clinical decision support",
    "healthcare technology",
  ],
  lessons: [
    {
      slug: "what-ai-in-medicine-actually-means",
      title: "What AI in Medicine Actually Means",
      blurb: "Cut through the hype: what AI can and cannot do in a clinical setting today.",
      xp: 20,
      kind: "quiz",
      content: `# What AI in Medicine Actually Means

When headlines say "AI diagnoses cancer better than doctors," they usually mean a narrow, well-tested model outperformed radiologists on **one specific task** under **controlled conditions**. That is impressive — and it is also a long way from "AI runs the hospital."

Healthcare AI in 2026 falls into a few practical buckets:

- **Perception tasks** — reading images (X-rays, CT scans, retinal photos, pathology slides) and flagging anomalies. This is where AI is strongest, because pattern recognition in pixels is exactly what large neural networks excel at.
- **Prediction tasks** — estimating patient risk (sepsis onset, readmission probability, deterioration) from structured data like vitals and labs.
- **Language tasks** — summarizing notes, drafting discharge letters, extracting data from unstructured text.
- **Administrative tasks** — coding diagnoses (ICD-10), prior-authorization drafts, scheduling optimization.

What AI is **not** doing (yet, in routine care):

- Making final treatment decisions unsupervised.
- Replacing the clinical relationship, physical exam, or informed consent.
- Performing the same across every hospital, scanner brand, or patient population.

The key frame: healthcare AI is a **decision-support tool**, not an autonomous clinician. A doctor or nurse still acts; the AI nudges, flags, and accelerates.`,
      questions: [
        {
          prompt:
            "When a study says an AI model 'outperformed radiologists' at detecting lung nodules, what is the most important caveat to understand?",
          options: [
            "The result was probably fabricated",
            "The comparison was on a specific, controlled dataset — performance may differ on new hospitals, scanner types, or patient populations",
            "Radiologists are now obsolete",
          ],
          answer: 1,
          explanation:
            "Controlled benchmark results don't automatically generalize. A model trained on images from one institution or scanner brand can degrade significantly when deployed elsewhere — a phenomenon called distribution shift.",
        },
        {
          prompt: "Which of these tasks is healthcare AI strongest at today?",
          options: [
            "Making autonomous final treatment decisions",
            "Pattern recognition in medical images: X-rays, CT scans, pathology slides",
            "Replacing the doctor-patient relationship",
          ],
          answer: 1,
          explanation:
            "Image-based perception tasks — flagging anomalies in pixels — align perfectly with how deep learning works. AI in imaging is the most clinically validated area of medical AI.",
        },
        {
          prompt: "What is the most accurate description of how AI fits into clinical care today?",
          options: [
            "Fully autonomous decision-maker that clinicians follow",
            "A decision-support tool that flags and assists — a human still acts and is responsible",
            "A search engine for medical papers",
          ],
          answer: 1,
          explanation:
            "Regulatory frameworks (FDA, CE mark) and clinical workflows treat AI outputs as recommendations, not orders. A licensed clinician remains accountable for the final decision.",
        },
      ],
      explanation:
        "Healthcare AI is real, useful, and narrowly defined — decision support, not autonomous care. Knowing this framing prevents both over-trust and unnecessary fear.",
    },
    {
      slug: "ai-in-medical-imaging",
      title: "AI in Medical Imaging",
      blurb: "How neural networks read X-rays, scans, and slides — and where they fall short.",
      xp: 22,
      kind: "quiz",
      content: `# AI in Medical Imaging

Medical imaging is the most mature domain for clinical AI. Here's why it works well and where the limits are.

**How it works.** A convolutional neural network (or a vision transformer) is trained on hundreds of thousands of labeled scans — "this CT slice has a pulmonary embolism," "this retinal photo shows diabetic retinopathy." After training, it learns to spot the same patterns in new images.

**Regulatory clearance.** In the United States, imaging AI tools must receive FDA 510(k) clearance or De Novo authorization before clinical use. By 2026, hundreds of imaging AI products have been cleared. The EU requires CE marking under the Medical Device Regulation (MDR).

**Real-world deployments:**

- **Diabetic retinopathy screening** — AI reads retinal photos and flags patients needing urgent referral. The FDA cleared IDx-DR (now Digital Diagnostics) in 2018; it's used in primary care offices that lack an on-site ophthalmologist.
- **Chest X-ray triage** — AI flags pneumothorax, consolidation, and other findings so radiologists prioritize the most urgent reads.
- **Mammography CAD** — computer-aided detection assists radiologists spotting breast lesions, though evidence on reducing missed cancers while controlling false positives remains mixed.
- **Pathology slide analysis** — AI identifies cancerous cells in digitized tissue slides, assisting pathologists at scale.

**Key limitations:**

- **Dataset bias** — models trained predominantly on lighter-skinned patients can underperform on darker skin tones (dermatology AI has this problem acutely).
- **Label quality** — a model is only as good as the expert annotations it learned from.
- **Edge cases** — rare conditions, artifact-heavy images, and atypical presentations can fool even high-performing models.
- **Alert fatigue** — if an AI flags too many false positives, clinicians start ignoring it.`,
      questions: [
        {
          prompt:
            "Why does an AI trained on X-rays from one hospital sometimes perform worse at a different hospital?",
          options: [
            "The AI forgets what it learned when moved",
            "Different scanner brands, patient demographics, and image processing pipelines create distribution shift",
            "Hospitals use different colors for X-rays",
          ],
          answer: 1,
          explanation:
            "Distribution shift is one of the central challenges in deploying medical imaging AI. A model learns the statistical patterns of its training environment; a new environment with different equipment or demographics may look statistically different enough to degrade performance.",
        },
        {
          prompt:
            "IDx-DR (now Digital Diagnostics), cleared by the FDA in 2018, is an example of AI used to screen for which condition?",
          options: [
            "Lung cancer on CT scans",
            "Diabetic retinopathy from retinal photos",
            "Breast cancer on mammograms",
          ],
          answer: 1,
          explanation:
            "IDx-DR (now Digital Diagnostics) was the first FDA-authorized AI diagnostic to provide a screening decision without a clinician reviewing the image first. It screens for diabetic retinopathy and can be deployed in primary care settings without an ophthalmologist present.",
        },
        {
          prompt:
            "An imaging AI in a busy emergency department flags so many cases as 'urgent' that radiologists begin ignoring the alerts. This is called:",
          options: [
            "Overfitting",
            "Alert fatigue",
            "Hallucination",
          ],
          answer: 1,
          explanation:
            "Alert fatigue occurs when a system generates so many notifications — especially false positives — that clinicians become desensitized and start bypassing them. It's a real patient-safety risk and a common reason imaging AI tools underperform in practice.",
        },
      ],
      explanation:
        "Medical imaging AI is proven and FDA-cleared for many tasks, but distribution shift, dataset bias, and alert fatigue are real deployment challenges — not just academic concerns.",
    },
    {
      slug: "clinical-decision-support-and-prediction",
      title: "Clinical Decision Support and Risk Prediction",
      blurb: "How AI scans vitals and labs to flag deteriorating patients before the crash.",
      xp: 22,
      kind: "quiz",
      content: `# Clinical Decision Support and Risk Prediction

Beyond imaging, AI is used to watch continuous streams of structured data — vitals, lab results, medication orders, nursing notes — and predict which patients are about to deteriorate.

**Sepsis early warning.** Sepsis kills an estimated 11 million people annually worldwide. The window between early sepsis and septic shock can be hours. AI models monitor the EHR in real time and alert clinicians when a patient's pattern matches early sepsis — sometimes hours before traditional criteria (like the SIRS score) would fire. Epic's Sepsis Prediction model is one of the most widely deployed; independent studies have found its real-world performance highly variable, which is a reminder that validation in your specific population matters.

**Deterioration prediction.** Systems like the National Early Warning Score (NEWS) use rule-based thresholds. AI models add continuous, multivariate signals: subtle changes across dozens of variables that don't individually cross a threshold but together predict deterioration. Google's work on ICU patients and several commercial platforms operate this way.

**Drug interaction and dosing alerts.** Pharmacy AI scans medication orders against a patient's current meds, labs (e.g., kidney function), and allergy record to flag dangerous interactions or out-of-range doses. This is one of the most mature and widely deployed forms of clinical AI, built into most modern pharmacy systems.

**Key concerns:**

- **Black-box opacity** — many prediction models don't explain *why* they fired an alert. Clinicians often can't tell whether to trust a specific alert without understanding its reasoning.
- **Feedback loops** — if the AI changes clinician behavior, the patient outcomes change, which can corrupt future training data.
- **Equity** — a model trained on a hospital that serves a wealthy population may not calibrate correctly for an underserved population with different disease prevalence and access patterns.`,
      questions: [
        {
          prompt:
            "An AI sepsis-prediction model fires an alert. A nurse is skeptical because the patient 'looks fine.' What is the right approach?",
          options: [
            "Ignore the alert — the nurse's clinical judgment always overrides the AI",
            "Follow the alert blindly — the AI is always more accurate than bedside assessment",
            "Use the alert to prompt a structured clinical reassessment, combining AI output with bedside observation",
          ],
          answer: 2,
          explanation:
            "AI alerts are decision-support inputs, not commands. The correct response is to treat an alert as a reason to look more carefully, then apply clinical judgment. Neither ignoring it nor blindly following it is appropriate.",
        },
        {
          prompt:
            "Why is independent validation of a sepsis AI model in your specific hospital important, even if the vendor published strong results?",
          options: [
            "Vendors always lie about their results",
            "Model performance depends on the patient population, EHR setup, and workflows at each site — published results may not transfer",
            "Only FDA-cleared models need validation",
          ],
          answer: 1,
          explanation:
            "Epic's Sepsis Model, for example, was found in independent studies to have highly variable performance across hospitals. Local validation is standard practice before clinical deployment.",
        },
        {
          prompt:
            "Drug interaction checking built into hospital pharmacy systems is an example of:",
          options: [
            "A research prototype not yet used in real care",
            "One of the most mature and widely deployed forms of clinical AI",
            "AI that requires a separate regulatory clearance for every new drug",
          ],
          answer: 1,
          explanation:
            "Automated drug interaction checking has been part of pharmacy software for decades and is now a standard, widely deployed application of clinical decision support — among the oldest practical medical AI.",
        },
      ],
      explanation:
        "Clinical decision support AI — from sepsis alerts to drug checking — is live and widespread, but local validation, equity, and the risk of alert fatigue determine whether it actually improves care.",
    },
    {
      slug: "ai-in-drug-discovery",
      title: "AI in Drug Discovery",
      blurb: "From AlphaFold to generative molecule design — how AI is compressing a 10-year pipeline.",
      xp: 23,
      kind: "quiz",
      content: `# AI in Drug Discovery

Drug discovery is slow, expensive, and risky: it typically takes 10–15 years and over $1 billion to bring a drug from target identification to market approval, with most candidates failing in clinical trials. AI is attacking several stages of that pipeline.

**Protein structure prediction.** DeepMind's AlphaFold (2020–2021) solved a 50-year grand challenge: predicting how a protein folds into its 3-D shape from its amino-acid sequence. Knowing a protein's structure is essential for designing drugs that bind to it. AlphaFold's predictions are now widely used in academia and pharma. In 2024, DeepMind released AlphaFold 3, extending predictions to DNA, RNA, and small molecules.

**Generative molecule design.** Generative AI models can propose entirely new molecules with desired properties — high binding affinity to a target, low toxicity, good solubility — by learning patterns from known compounds. Companies like Insilico Medicine, Exscientia, and Recursion have used these approaches to progress candidates into clinical trials faster than traditional methods.

**Target identification.** AI scans genomic, proteomic, and clinical datasets to identify which proteins or pathways are causally linked to a disease — a step historically requiring years of wet-lab work.

**Clinical trial design and patient matching.** AI reads EHR data to identify patients who meet trial eligibility criteria, cutting recruitment time. It also helps design trials with better endpoints and stratification.

**Caveats:**

- **Early days for outcomes.** As of 2026, most AI-discovered candidates are still in Phase 1 or Phase 2 trials. The ultimate test — approval and real-world efficacy — remains ahead for most.
- **Garbage in, garbage out.** Models trained on biased datasets (e.g., mostly Western European genomes) will make worse predictions for underrepresented populations.
- **Regulatory novelty.** Regulators are still developing frameworks for AI-designed drugs, including traceability and explainability requirements.`,
      questions: [
        {
          prompt: "What problem did DeepMind's AlphaFold primarily solve?",
          options: [
            "Predicting which patients will respond to a drug",
            "Predicting the 3-D folded structure of a protein from its amino-acid sequence",
            "Designing clinical trial randomization schemes",
          ],
          answer: 1,
          explanation:
            "Protein folding — predicting the 3-D shape a protein adopts — was a 50-year grand challenge. AlphaFold's solution transformed structural biology and accelerated structure-based drug design.",
        },
        {
          prompt:
            "A generative AI model proposes a novel molecule with predicted high binding affinity to a cancer target. What is the most important next step?",
          options: [
            "Immediately prescribe it to patients, since AI-generated compounds skip trials",
            "Synthesize and test the molecule in laboratory and animal models before any human use",
            "File it as an approved drug with the FDA",
          ],
          answer: 1,
          explanation:
            "AI prediction is a starting point, not a clinical endpoint. AI-proposed molecules still require synthesis, in-vitro testing, in-vivo studies, and phased clinical trials before any human use.",
        },
        {
          prompt:
            "Why might an AI drug-discovery model trained primarily on Western European genomic data perform worse when applied to diseases more prevalent in sub-Saharan Africa?",
          options: [
            "The model's programming language is different in Africa",
            "Genomic and clinical patterns vary across populations; a model trained on one population may not generalize to another",
            "Drug discovery AI only works for infectious diseases",
          ],
          answer: 1,
          explanation:
            "Training data composition is a fundamental equity issue in AI drug discovery. Models trained on non-diverse datasets may miss disease mechanisms or predict poor efficacy for underrepresented populations.",
        },
      ],
      explanation:
        "AlphaFold and generative molecule design are genuine breakthroughs, but most AI-discovered drugs are still in trials — and dataset diversity is a critical unsolved equity challenge.",
    },
    {
      slug: "ai-and-healthcare-administration",
      title: "AI and Healthcare Administration",
      blurb: "Cutting paperwork, prior-auth, and burnout — the unglamorous AI wins that matter.",
      xp: 20,
      kind: "quiz",
      content: `# AI and Healthcare Administration

Clinician burnout is a crisis. U.S. physicians spend roughly 2 hours on EHR documentation for every 1 hour with patients. Administrative burdens — prior authorizations, coding, billing, note-writing — consume a massive fraction of healthcare costs and clinician energy. AI is attacking these directly.

**Ambient clinical documentation.** AI listens to a patient-clinician conversation (with consent), transcribes it, and automatically drafts a structured clinical note — SOAP format, HPI, assessment, plan — directly into the EHR. Tools like Nuance DAX (Microsoft), Suki, and Abridge are deployed at major health systems. Clinicians report saving 1–3 hours per day, with faster notes and improved satisfaction.

**Medical coding and billing.** ICD-10 and CPT coding requires translating clinical events into a taxonomy of thousands of codes. AI can read a clinical note and suggest the appropriate codes, reducing manual coder time and claim denials.

**Prior authorization.** Prior authorization — insurers requiring approval before certain procedures or medications — is one of the most time-consuming administrative burdens. AI can draft authorization requests by pulling the relevant clinical evidence from the EHR, and some systems can auto-approve straightforward cases using learned patterns.

**Patient communication.** AI drafts responses to patient portal messages (reviewed by a clinician before sending), handles appointment reminders, and answers common questions via chat.

**Important caveats:**

- **Privacy** — ambient documentation involves recording patient conversations. Consent, data storage, and deletion policies must be clear.
- **Error propagation** — if an AI generates an inaccurate note that a busy clinician signs without careful review, the error becomes part of the official record and can affect future care.
- **Equity in automation** — administrative AI benefits are concentrated in well-funded health systems; under-resourced clinics and rural hospitals may not have the budget to adopt these tools.`,
      questions: [
        {
          prompt:
            "Ambient clinical documentation AI (like Nuance DAX) primarily helps clinicians by:",
          options: [
            "Diagnosing patients during the visit",
            "Automatically drafting clinical notes from the recorded conversation, reducing documentation time",
            "Replacing nurses for routine check-ins",
          ],
          answer: 1,
          explanation:
            "Ambient documentation AI transcribes the clinical encounter and generates a structured note (or note draft) for the clinician to review and sign. It targets documentation burden, not diagnosis.",
        },
        {
          prompt:
            "A clinician is using AI-generated note drafts and signs them quickly without careful review. The main risk is:",
          options: [
            "The AI will eventually become sentient",
            "Errors in the AI-generated note become part of the official medical record and can affect future care decisions",
            "The EHR system will slow down",
          ],
          answer: 1,
          explanation:
            "AI-generated documentation must be reviewed, not rubber-stamped. An inaccurate note — wrong medication, wrong diagnosis detail — can propagate through the medical record and harm future care.",
        },
        {
          prompt:
            "Which is a legitimate privacy concern specific to ambient clinical documentation AI?",
          options: [
            "The AI might diagnose the clinician instead of the patient",
            "Recording patient conversations raises questions about consent, data storage, and who can access the recordings",
            "Ambient AI uses too much electricity",
          ],
          answer: 1,
          explanation:
            "Patient encounters contain highly sensitive information. Clear consent processes, strict data storage limits, and explicit deletion policies are essential for ambient documentation to be ethical and legally compliant.",
        },
      ],
      explanation:
        "Administrative AI — ambient notes, coding, prior auth — is one of the most impactful near-term applications, but consent, review discipline, and equitable access are real challenges.",
    },
    {
      slug: "bias-equity-and-regulation",
      title: "Bias, Equity, and Regulation",
      blurb: "How bias gets into medical AI, who it harms, and how regulators are responding.",
      xp: 23,
      kind: "quiz",
      content: `# Bias, Equity, and Regulation

Healthcare AI has the potential to reduce health disparities — or to encode and automate them. Understanding bias and the regulatory landscape is essential for anyone deploying or trusting these tools.

**How bias enters medical AI:**

- **Training data** — if a model learns from a dataset that underrepresents Black, Indigenous, Hispanic, or low-income patients, it learns patterns that fit the majority and may fail the minority. A famous 2019 study (Obermeyer et al., *Science*) found a widely used commercial algorithm systematically underestimated the health needs of Black patients relative to white patients with the same measured health.
- **Label bias** — if the labels used for training reflect historical clinical biases (e.g., undertreated pain in Black patients, over-diagnosis of mental illness in certain groups), the model learns those biases.
- **Proxy variables** — some models use proxies like healthcare cost that correlate with race due to structural inequity, amplifying existing disparities.

**Specific examples:**

- Dermatology AI trained predominantly on lighter skin tones performs worse at detecting skin cancers on darker skin tones.
- Pulse oximeters (not AI, but a related data quality issue) overestimate blood oxygen saturation in patients with darker skin — a hardware bias that feeds misleading data to AI systems.

**Regulatory framework (U.S.):**

- **FDA oversight** — medical AI software that influences clinical decisions must go through FDA review as a Software as a Medical Device (SaMD). The FDA uses a risk-based framework: higher risk (autonomous diagnosis) → more rigorous review.
- **Predetermined Change Control Plans** — because AI models are updated frequently, the FDA allows manufacturers to pre-specify the types of changes they can make without a new submission.
- **Total Product Lifecycle (TPLC)** — regulators increasingly expect post-market monitoring: tracking how AI performs in the real world after approval.

**International:** The EU AI Act (2024) classifies medical AI as "high-risk," requiring conformity assessments, transparency, and human oversight before deployment.`,
      questions: [
        {
          prompt:
            "The Obermeyer et al. (2019) study in *Science* found that a widely used commercial healthcare algorithm systematically underestimated the health needs of Black patients. The root cause was:",
          options: [
            "The algorithm was deliberately programmed to discriminate",
            "The algorithm used healthcare cost as a proxy for health needs, and structural inequity meant Black patients had lower costs despite equal or greater illness",
            "Black patients had genuinely lower health needs",
          ],
          answer: 1,
          explanation:
            "The algorithm used past healthcare spending as a proxy for health need. Because systemic barriers lead to lower healthcare utilization among Black patients, spending was a biased proxy — the model 'saw' Black patients as healthier than equally sick white patients.",
        },
        {
          prompt:
            "Under the FDA's Software as a Medical Device (SaMD) framework, which type of medical AI requires the most rigorous review?",
          options: [
            "AI that schedules appointments",
            "AI that autonomously diagnoses a serious disease with no clinician review",
            "AI that suggests office supply re-orders for a clinic",
          ],
          answer: 1,
          explanation:
            "The FDA's risk-based framework assigns higher scrutiny to AI that drives consequential clinical decisions independently. Scheduling and supply AI are generally not SaMD at all; autonomous high-stakes diagnosis is the highest-risk category.",
        },
        {
          prompt:
            "The EU AI Act (2024) classifies most clinical medical AI as:",
          options: [
            "Prohibited — no medical AI is allowed in the EU",
            "Low risk — no requirements apply",
            "High risk — requiring conformity assessments, transparency, and human oversight",
          ],
          answer: 2,
          explanation:
            "Under the EU AI Act, medical AI used for diagnosis, clinical decision support, or treatment recommendations is classified as high-risk, triggering requirements for rigorous testing, documentation, transparency to users, and meaningful human oversight.",
        },
      ],
      explanation:
        "Bias in medical AI is a documented patient-safety and equity problem, not a theoretical one. Regulatory frameworks are catching up, but ongoing post-market monitoring and diverse training data are the real long-term fixes.",
    },
    {
      slug: "ai-in-healthcare-capstone",
      title: "Capstone: AI in Healthcare — What You Know, What to Watch",
      blurb: "Integrate everything: real benefits, real risks, and how to be a smart participant.",
      xp: 25,
      kind: "quiz",
      content: `# Capstone: AI in Healthcare — What You Know, What to Watch

You've covered the landscape. Let's bring it together with the key principles that should guide anyone — patient, clinician, administrator, or policymaker — engaging with healthcare AI.

**What AI is genuinely delivering today:**

- Faster, more consistent reading of medical images — diabetic retinopathy screening, chest X-ray triage, pathology.
- Early warning for sepsis and patient deterioration.
- Documentation relief through ambient note-writing, saving hours per clinician per day.
- Drug discovery acceleration via protein structure prediction (AlphaFold) and generative molecule design.
- Pharmacy safety through automated drug-interaction checking.

**The consistent risks across every domain:**

1. **Distribution shift** — a model trained in one environment may degrade in another.
2. **Bias and inequity** — undertrained on minority populations, the AI underserves them.
3. **Human oversight gaps** — over-reliance on AI (automation bias) or under-reliance (alert fatigue) both degrade care.
4. **Privacy** — health data is among the most sensitive; its use in AI training and inference demands strong protections.
5. **Regulatory lag** — tools can be deployed faster than evidence of real-world harm accumulates, requiring ongoing post-market surveillance.

**As a patient:**

- You have rights to ask whether AI is involved in your care and to understand how it was used.
- AI tools used in your diagnosis or treatment should be FDA-cleared (U.S.) or CE-marked (EU) as SaMD where they meet the threshold.
- A human clinician remains responsible for your care.

**As a clinician or admin:**

- Demand local validation data before trusting vendor performance claims.
- Review AI-generated documentation before signing.
- Watch for alert fatigue in your team.
- Ensure AI tools have been evaluated for equity in your patient population.

The promise is real. The work to realize it safely is also real — and ongoing.`,
      questions: [
        {
          prompt:
            "A hospital is considering deploying a commercially available sepsis AI model. The vendor's published AUC is 0.85. What is the single most important step before going live?",
          options: [
            "Nothing — an AUC of 0.85 is published and therefore sufficient",
            "Validate the model's performance on the hospital's own patient population before clinical deployment",
            "Ask the vendor if the model uses a neural network",
          ],
          answer: 1,
          explanation:
            "Published performance figures come from the vendor's validation dataset. Real-world performance can differ significantly depending on patient demographics, EHR configuration, and local workflows. Local validation is standard practice and a patient-safety requirement.",
        },
        {
          prompt:
            "A patient is told their mammogram was flagged by AI and they need a follow-up biopsy. They ask: 'Who is responsible for this decision?' The correct answer is:",
          options: [
            "The AI model, which made the decision autonomously",
            "The radiologist who reviewed the AI output and ordered the follow-up — a licensed clinician remains responsible",
            "The hospital's IT department that deployed the AI",
          ],
          answer: 1,
          explanation:
            "AI is a decision-support tool in the current regulatory and clinical framework. The radiologist who reviewed the finding and signed the order is the responsible clinician. AI shifts, but does not eliminate, professional accountability.",
        },
        {
          prompt:
            "Which statement best captures the right attitude toward healthcare AI in 2026?",
          options: [
            "AI has solved medicine — trust it fully and reduce clinical staffing accordingly",
            "AI is too risky — hospitals should avoid it until it is perfect",
            "AI is a powerful, validated tool in specific domains that requires human oversight, equity vigilance, and ongoing post-market monitoring to deliver on its promise safely",
          ],
          answer: 2,
          explanation:
            "That's the entire course in one sentence: real wins, specific domains, human oversight, equity, and ongoing monitoring. Neither uncritical adoption nor blanket rejection is the right posture — informed, supervised deployment is.",
        },
      ],
      explanation:
        "Healthcare AI is improving patient outcomes in real, measurable ways — and creating new risks that require active management. Understanding both sides makes you a better patient, clinician, or decision-maker.",
    },
  ],
};
