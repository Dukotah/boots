import type { Module } from "./types";

// Local & Open-Source AI — a practical, all-quiz module covering why and how
// to run models locally, the open-weight ecosystem, hardware requirements,
// privacy trade-offs, and when cloud vs local is the right call. Written for
// someone who has heard of Ollama or Llama and wants to understand what
// running AI locally actually means and whether it's worth it.
export const aiLocalModels: Module = {
  slug: "ai-local-models",
  title: "Local & Open-Source AI",
  description:
    "Understand the open-weight AI ecosystem and what it means to run a model on your own hardware. Learn why privacy, cost, and control drive people off the cloud, which models are worth knowing, what hardware you actually need, and when local is — and isn't — the right call.",
  emoji: "🖥️",
  gradient: "from-slate-500/20 to-gray-500/10",
  tagline:
    "Run AI on your own machine — no API key, no cloud, no monthly bill. Learn the open-weight model landscape and how to put it to work.",
  keywords: [
    "local AI",
    "open source AI",
    "run AI locally",
    "Ollama",
    "LLaMA",
    "open weight models",
    "self-hosted AI",
    "private AI",
    "offline AI",
    "Mistral local",
    "llm on cpu",
  ],
  lessons: [
    {
      slug: "cloud-vs-local-ai",
      title: "Cloud vs Local AI",
      blurb: "What 'running locally' actually means and why people choose it.",
      xp: 20,
      kind: "quiz",
      content: `# Cloud vs Local AI

When you use ChatGPT or Claude on the web, your words travel to a data center, a
massive computer runs the model, and the reply comes back over the internet. That's
**cloud AI** — convenient, always up to date, and zero setup.

**Local AI** means the model runs entirely on *your* hardware: your laptop, desktop,
or home server. Your prompt never leaves the machine.

Why does that matter?

- **Privacy.** Medical notes, legal drafts, personal journals — nothing is sent to
  a third-party server. For many individuals and regulated businesses, this is
  non-negotiable.
- **Cost.** After the hardware, electricity is cheap. A model you host yourself has
  no per-query fee.
- **Offline access.** Flights, rural areas, air-gapped workstations — local models
  run anywhere.
- **Customization.** You can fine-tune a local model on your own data without
  sharing that data with anyone.

The trade-offs are real too: setup takes time, your hardware sets a ceiling on model
size and speed, and you are responsible for updates. Cloud models are also simply
more powerful at the frontier — the biggest open models lag the biggest proprietary
ones, though that gap has narrowed dramatically as of 2026.

Choosing local isn't a rejection of the cloud. Many practitioners use both: cloud
for frontier capability, local for privacy-sensitive or high-volume tasks.`,
      questions: [
        {
          prompt:
            "What is the defining characteristic of running an AI model 'locally'?",
          options: [
            "The model runs on the company's servers but charges less",
            "The model runs entirely on your own hardware — your data never leaves your machine",
            "You download the chat interface but the AI still runs in the cloud",
          ],
          answer: 1,
          explanation:
            "Local inference means the weights and the computation live on your device. No internet request is made for the actual AI processing.",
        },
        {
          prompt:
            "Which is a genuine advantage of running a model locally rather than via a cloud API?",
          options: [
            "Local models are always more capable than cloud models",
            "Your prompts and data never leave your machine, giving you strong privacy guarantees",
            "Local models require no hardware investment of any kind",
          ],
          answer: 1,
          explanation:
            "Privacy is the most commonly cited reason to go local. Sensitive data stays on-device, which is valuable for medical, legal, and personal use cases.",
        },
        {
          prompt: "A realistic trade-off of local AI compared to cloud AI is:",
          options: [
            "Local AI is always slower and less capable than the largest cloud frontier models",
            "Local AI requires no maintenance or updates",
            "Local AI gives you free unlimited access to GPT-4-class models",
          ],
          answer: 0,
          explanation:
            "The largest local open-weight models are impressive, but frontier proprietary models still generally lead on benchmarks. The gap has shrunk, but it's real. Local wins on privacy, cost, and offline access — not raw capability at the frontier.",
        },
      ],
    },
    {
      slug: "open-weight-model-landscape",
      title: "The Open-Weight Ecosystem",
      blurb: "Llama, Mistral, Phi, Gemma — who makes them and what they're for.",
      xp: 20,
      kind: "quiz",
      content: `# The Open-Weight Ecosystem

**Open-weight** (also called open-source, though the term is contested) models have
their trained weights released publicly — you can download and run them. This is
different from APIs where the weights stay secret and you only access the model
through a paid endpoint.

A few families worth knowing as of 2026:

- **Llama (Meta)** — the model that sparked the current open ecosystem. Llama 3 and
  its successors come in a range of sizes, from small (fits on a phone) to large
  (requires a workstation). Meta releases them free for most commercial use.
- **Mistral** — a French AI lab producing highly efficient models that punch above
  their weight class. Mistral 7B made headlines for matching much larger models in
  many benchmarks.
- **Phi (Microsoft Research)** — small models trained on high-quality data, designed
  to be capable at 3–7B parameters. Great for edge and mobile.
- **Gemma (Google)** — lightweight models from the Gemini family, designed for
  on-device and research use.
- **Qwen (Alibaba)** — strong multilingual open models, especially for Chinese and
  other Asian languages alongside English.
- **Community fine-tunes** — the open-source community constantly fine-tunes base
  models for specific tasks: coding, roleplay, medical, legal. These live on Hugging
  Face.

**Parameters** are the unit of model size. More parameters = more capability (usually)
but also more RAM and compute needed. Sizes commonly discussed: 3B, 7B, 13B, 34B,
70B+. A 7B model is a practical starting point for most consumer hardware.`,
      questions: [
        {
          prompt: "What does 'open-weight' mean for an AI model?",
          options: [
            "The model is free to use via a cloud API with no restrictions",
            "The trained model weights are publicly released so anyone can download and run them",
            "The model was trained only on open-source code",
          ],
          answer: 1,
          explanation:
            "Open-weight means you get the actual trained parameters — you can run them locally, fine-tune them, and inspect them. Access to the API is a separate question.",
        },
        {
          prompt:
            "Mistral models are particularly known for which characteristic?",
          options: [
            "Being the largest models available — over 500B parameters",
            "Strong performance relative to their parameter count — efficient and punching above their weight",
            "Only running on NVIDIA A100 GPUs",
          ],
          answer: 1,
          explanation:
            "Mistral gained recognition for producing 7B-class models that matched much larger competitors on many benchmarks — efficiency is their hallmark.",
        },
        {
          prompt:
            "You want a model small enough to run on a laptop without a dedicated GPU. Which size range is the practical starting point?",
          options: [
            "7B parameters (roughly 4–6 GB of RAM in quantized form)",
            "70B parameters",
            "500B parameters",
          ],
          answer: 0,
          explanation:
            "A quantized 7B model typically fits in 4–6 GB of RAM and can run at useful speed on a modern CPU. It's the common entry point for local experimentation.",
        },
      ],
    },
    {
      slug: "hardware-requirements",
      title: "Hardware: What Do You Actually Need?",
      blurb: "RAM, GPU, and disk — the real numbers, not the marketing.",
      xp: 25,
      kind: "quiz",
      content: `# Hardware: What Do You Actually Need?

Running a language model is fundamentally a memory problem. The model's weights must
fit in **RAM** (or VRAM if you use a GPU) during inference. Here's how to think
about it practically:

### Model size vs. memory

A model stored in full 16-bit precision needs roughly **2 bytes per parameter**:
- 7B model ≈ 14 GB
- 13B model ≈ 26 GB
- 70B model ≈ 140 GB

Those numbers are too large for most consumer hardware — which is why **quantization**
matters.

### Quantization

Quantization compresses the weights to lower precision (e.g., 4-bit instead of 16-bit),
trading a small amount of accuracy for a large reduction in memory. In practice,
4-bit quantized models are excellent:
- 7B quantized ≈ **4–5 GB RAM**
- 13B quantized ≈ **8–10 GB RAM**
- 70B quantized ≈ **40–45 GB RAM**

### CPU vs. GPU inference

- **GPU (VRAM)** — fastest inference by a large margin. Consumer NVIDIA RTX cards
  with 8–24 GB VRAM are the practical sweet spot. AMD also works with the right stack.
- **CPU (RAM)** — much slower but works. A modern laptop with 16 GB RAM can run a
  7B quantized model — expect 5–20 tokens per second, which is readable but not fast.
- **Apple Silicon (Metal)** — M-series Macs use unified memory, so a 32 GB M3 Pro
  can load a 13B model with good speed. Often the best "no GPU" option.

### Storage

Download the weights once and keep them. A 7B quantized model is roughly 4–5 GB.
A 70B model is 40–45 GB. Fast NVMe storage helps with load time.

The short answer: **16 GB of RAM gets you started; 32 GB gives you comfort; a modern
GPU with 12+ GB VRAM makes it fast.**`,
      questions: [
        {
          prompt:
            "Why is quantization important for running large language models on consumer hardware?",
          options: [
            "It makes the model train faster on new data",
            "It compresses model weights to lower precision, reducing memory requirements dramatically with minimal accuracy loss",
            "It converts the model to run in a web browser without any local compute",
          ],
          answer: 1,
          explanation:
            "Quantization (e.g., 4-bit) shrinks a 7B model from ~14 GB to ~4–5 GB, making it fit in regular laptop RAM. It's the key technique enabling consumer local inference.",
        },
        {
          prompt:
            "You have a Windows laptop with 16 GB RAM and no dedicated GPU. Which local setup is most realistic?",
          options: [
            "Running a quantized 7B model on the CPU at 5–15 tokens per second",
            "Running a 70B model at full precision with fast inference",
            "You cannot run any AI model locally without an NVIDIA GPU",
          ],
          answer: 0,
          explanation:
            "A 4-bit quantized 7B model fits in roughly 4–5 GB of RAM. CPU inference is slow but usable — enough to explore local AI. A GPU isn't required to start.",
        },
        {
          prompt:
            "Why do Apple Silicon Macs (M-series) have an advantage for local AI compared to Intel/AMD laptops with integrated graphics?",
          options: [
            "They use a special AI chip that beats any NVIDIA GPU",
            "They use unified memory, so the same RAM pool is shared by CPU and GPU, allowing larger models to be served at reasonable speed",
            "Apple provides free model weights that only run on macOS",
          ],
          answer: 1,
          explanation:
            "Unified memory means all 32+ GB of RAM is available to the GPU/Neural Engine without copying. That lets an M-series Mac comfortably run 13B models that would require an expensive discrete GPU on other platforms.",
        },
      ],
    },
    {
      slug: "running-models-with-ollama",
      title: "Running Models with Ollama",
      blurb: "Ollama is the easiest on-ramp to local inference — here's how it works.",
      xp: 20,
      kind: "quiz",
      content: `# Running Models with Ollama

**Ollama** is an open-source tool that makes running local LLMs nearly as easy as
installing an app. It handles downloading model weights, model management, and serves
a local HTTP API that matches the shape of popular cloud APIs.

### The core workflow

1. Install Ollama (a single binary for macOS, Linux, or Windows).
2. Pull a model: \`ollama pull llama3\` — it downloads the quantized weights.
3. Chat: \`ollama run llama3\` — starts an interactive session in your terminal.
4. Use the API: Ollama serves a local REST endpoint (by default at
   \`http://localhost:11434\`). Apps can send requests just like they'd call the
   OpenAI API, making it a drop-in replacement for local development.

### What Ollama gives you

- **A model library** — curated quantized models: Llama, Mistral, Phi, Gemma, Qwen,
  and many fine-tunes, all one command away.
- **Automatic GPU detection** — if you have a supported GPU with enough VRAM, Ollama
  uses it automatically. Otherwise, it falls back to CPU.
- **Memory management** — Ollama handles loading and unloading models, keeping the
  last-used model in memory and evicting it when RAM is needed.
- **Multimodal support** — some models (like LLaVA) can accept images; Ollama serves
  these too.

### Alternatives

- **LM Studio** — a GUI desktop app for the same workflow, friendlier for
  non-technical users.
- **llama.cpp** — the underlying engine both Ollama and LM Studio use; powerful,
  CLI-only, more configuration control.
- **Jan** — another cross-platform GUI option with a chat interface built in.

The key insight: Ollama (and its alternatives) abstract away the hard parts. You
don't need to know about GGUF quantization formats or model sharding to get started.`,
      questions: [
        {
          prompt: "After installing Ollama, what command pulls and caches a model?",
          options: [
            "`ollama run llama3` — this both downloads and starts a chat",
            "`ollama pull llama3` — this downloads the weights so they're ready to use",
            "`ollama install llama3` — this installs the model as a system package",
          ],
          answer: 1,
          explanation:
            "`ollama pull <model>` downloads and caches the quantized weights. `ollama run` starts a session (and will pull if not already downloaded), but `pull` is the explicit download step.",
        },
        {
          prompt:
            "Ollama exposes a local HTTP API at `localhost:11434`. What is a key benefit of this?",
          options: [
            "It lets any internet user query your local model remotely by default",
            "Applications written for the OpenAI API can point at Ollama instead, enabling local development without cloud costs",
            "It automatically uploads your model outputs to Hugging Face",
          ],
          answer: 1,
          explanation:
            "Ollama's API is shaped similarly to popular cloud APIs, so tools built for those APIs can be redirected to localhost. This is a major workflow benefit for developers building AI-powered apps.",
        },
        {
          prompt:
            "You have 8 GB of VRAM on your GPU and 32 GB of system RAM. Ollama will:",
          options: [
            "Always refuse to use the GPU because 8 GB isn't enough for any model",
            "Automatically use the GPU for models that fit, and fall back to CPU for those that don't",
            "Always run on CPU regardless of GPU presence",
          ],
          answer: 1,
          explanation:
            "Ollama auto-detects your GPU and uses it when the model fits in VRAM. A quantized 7B model fits in 4–5 GB, so 8 GB VRAM is plenty for those. Larger models fall back to CPU or split across both.",
        },
      ],
    },
    {
      slug: "privacy-and-compliance",
      title: "Privacy, Compliance, and Data Sovereignty",
      blurb: "When 'stays on your machine' is a legal or ethical requirement, not just a preference.",
      xp: 25,
      kind: "quiz",
      content: `# Privacy, Compliance, and Data Sovereignty

For many use cases, local AI isn't about saving money or tinkering — it's the only
legally or ethically acceptable option. Understanding *why* helps you make the
right architecture choice.

### What 'private' actually means locally

When a model runs entirely on your hardware:

- **No data leaves your network.** Prompts, documents, and outputs stay on the machine.
- **No third-party terms apply.** You're not subject to a cloud provider's data
  retention, training opt-outs, or usage policies.
- **No breach surface on the provider side.** If the cloud provider gets breached,
  your data isn't in their training pipeline.

### Regulated industries

Several industries face legal constraints on sending data to cloud AI providers:

- **Healthcare (HIPAA in the US)** — patient records, clinical notes, and diagnoses
  are protected health information. Sending them to a cloud AI generally requires a
  Business Associate Agreement with the provider. Local models sidestep this entirely.
- **Legal** — attorney-client privilege and client confidentiality make lawyers cautious
  about pasting case details into cloud AI tools without explicit client consent.
- **Finance** — non-public material information (MNPI) and customer financial data
  carry strict handling requirements.
- **Government / Defense** — classified or controlled unclassified information (CUI)
  cannot leave approved systems. Air-gapped local models are the only viable path.

### Data sovereignty

Some organizations or countries require that data physically stays within certain
geographic or organizational boundaries. "The model runs on our servers in our country"
is a compliance statement that cloud public APIs cannot always match.

### The honest nuance

Running locally doesn't mean zero risk. The hardware can be stolen, the organization's
network can be breached, and poorly managed model outputs can still leak. Local AI
reduces *one specific risk surface* — third-party cloud access — not all risks.`,
      questions: [
        {
          prompt:
            "A hospital wants to use an LLM to summarize clinical notes. Why might a local model be the safest choice?",
          options: [
            "Local models are always more accurate for medical text",
            "Patient data is protected health information (PHI) — a local model ensures it never leaves the hospital's systems, avoiding complex cloud compliance requirements",
            "Cloud providers are legally prohibited from processing any text",
          ],
          answer: 1,
          explanation:
            "HIPAA requires careful handling of PHI. Keeping inference on-premises means no cloud provider ever sees patient data, which is often the simplest path to compliance.",
        },
        {
          prompt:
            "A defense contractor needs AI assistance on a project involving Controlled Unclassified Information (CUI). What's the appropriate approach?",
          options: [
            "Use the cheapest available cloud API and hope the provider is compliant",
            "Deploy an approved local or air-gapped model inside the secure environment so CUI never traverses a public network",
            "CUI projects can use any publicly available tool as long as the output is not shared",
          ],
          answer: 1,
          explanation:
            "CUI and classified data must stay within approved, controlled environments. Air-gapped local models are often the only option that satisfies handling requirements.",
        },
        {
          prompt:
            "Does running AI locally eliminate all data security risks?",
          options: [
            "Yes — local models are completely immune to breaches",
            "No — local infrastructure can still be breached, hardware stolen, or outputs mishandled; local AI reduces one risk surface, not all of them",
            "Yes, because local models don't store any data at all",
          ],
          answer: 1,
          explanation:
            "Local inference removes the third-party cloud exposure, but the machine itself, the network it's on, and how outputs are handled all remain attack surfaces. Security is defense in depth, not a single control.",
        },
      ],
    },
    {
      slug: "fine-tuning-and-customization",
      title: "Fine-Tuning and Customization",
      blurb: "When a base model isn't enough — how open weights enable custom behavior.",
      xp: 25,
      kind: "quiz",
      content: `# Fine-Tuning and Customization

One of the biggest advantages of open-weight models is that you can *change* them,
not just *use* them. There are a few distinct techniques, each with different costs
and trade-offs.

### Prompt engineering (no training)

The fastest option. You change the **system prompt** or few-shot examples to steer
behavior. No GPU training required. Works for many use cases and should always be
tried first.

### Fine-tuning

Fine-tuning means continuing training on a small dataset of your own examples. The
model updates its weights to better match your desired behavior.

- **When to use it:** specialized vocabulary, consistent tone, domain-specific tasks
  (e.g., medical coding, legal clause extraction), or following a very particular
  format.
- **Cost:** requires a GPU and takes hours to days depending on dataset size and
  model size.
- **Risk:** overfitting — if your dataset is too small or not diverse enough, the
  model can forget its general abilities (called "catastrophic forgetting").

### Parameter-Efficient Fine-Tuning (PEFT) — LoRA

**LoRA** (Low-Rank Adaptation) is the dominant PEFT technique as of 2026. Instead
of updating all billions of weights, LoRA adds small adapter layers and trains only
those. Benefits:

- Much lower GPU memory requirements.
- Training a 7B model with LoRA can run on a single consumer GPU (e.g., 16 GB VRAM).
- The adapter is a small file; you merge it with the base model or load it at runtime.

### RAG vs fine-tuning

**Retrieval-Augmented Generation (RAG)** is often better than fine-tuning for
knowledge problems. Instead of baking facts into weights, you retrieve relevant
documents at query time and include them in the prompt. Benefits: knowledge stays
fresh, no training required, and you can update the knowledge base without retraining.

**Rule of thumb:** use RAG when you need to inject knowledge; use fine-tuning when
you need to change behavior or style.`,
      questions: [
        {
          prompt:
            "You need a local model to always respond in a very specific JSON format for a production pipeline. What should you try first?",
          options: [
            "Immediately launch a full fine-tuning run on thousands of examples",
            "A carefully crafted system prompt with few-shot examples of the desired JSON format",
            "Rewrite the model's source code to hardcode the format",
          ],
          answer: 1,
          explanation:
            "Prompt engineering (system prompts + few-shot examples) is the fastest, cheapest starting point. Fine-tuning is reserved for cases where prompting consistently fails.",
        },
        {
          prompt: "What is LoRA, and why is it popular for fine-tuning local models?",
          options: [
            "A quantization format that reduces model file size for download",
            "A parameter-efficient fine-tuning technique that trains small adapter layers instead of all weights, dramatically reducing GPU memory requirements",
            "A routing protocol that sends prompts to the fastest available GPU",
          ],
          answer: 1,
          explanation:
            "LoRA trains only small adapter matrices rather than billions of base weights. This makes fine-tuning a 7B model feasible on a single consumer GPU instead of requiring a cluster.",
        },
        {
          prompt:
            "Your company has a large internal knowledge base that changes monthly. Should you fine-tune a model on it or use RAG?",
          options: [
            "Fine-tune — baking knowledge into weights is always the most accurate approach",
            "RAG — retrieve relevant documents at query time so the knowledge stays fresh without retraining",
            "Neither — open-weight models cannot access internal documents",
          ],
          answer: 1,
          explanation:
            "RAG is the right tool for evolving knowledge. Fine-tuning knowledge into weights is expensive and goes stale. RAG keeps the model's behavior stable while the knowledge base updates independently.",
        },
      ],
    },
    {
      slug: "local-ai-capstone",
      title: "Putting It Together: When to Go Local",
      blurb: "Capstone — apply the whole course to make the cloud-vs-local call confidently.",
      xp: 25,
      kind: "quiz",
      content: `# Putting It Together: When to Go Local

You've covered the landscape — now let's bring it together into a decision framework
you can actually use.

### When local AI is the right call

- **Sensitive data** — medical, legal, financial, or personal data that cannot leave
  your network.
- **High-volume, low-complexity tasks** — if you're running thousands of classification
  or extraction jobs, a local model has no per-query cost.
- **Offline or air-gapped environments** — field work, secure facilities, unreliable
  connectivity.
- **Customization needs** — you want fine-tuned behavior on proprietary data you can't
  share with a cloud provider.
- **Experimentation and learning** — nothing beats running a model yourself for
  understanding how it works.

### When cloud AI is the right call

- **Frontier capability** — the most complex reasoning, multimodal, agentic tasks
  where the largest cloud models lead.
- **Speed to ship** — cloud APIs require no hardware investment and no ops burden.
  For startups and prototypes, this matters.
- **Infrequent use** — if you need AI occasionally, paying per query beats buying
  hardware.
- **Latest models** — cloud providers ship new capabilities continuously; local
  models require you to actively update.

### The hybrid reality

Most serious practitioners use both. Cloud models for capability-intensive or
latency-sensitive customer-facing tasks; local models for bulk processing, privacy,
or development/testing (to avoid API costs during iteration).

### What you now know

- The meaning of "open-weight" and the major model families (Llama, Mistral, Phi,
  Gemma, Qwen).
- How quantization makes large models fit on consumer hardware.
- How to get started with Ollama and what alternatives exist.
- The privacy, compliance, and data-sovereignty cases for local inference.
- When fine-tuning vs. RAG vs. prompting is the right tool.

The open-weight ecosystem is moving fast. The principle that will stay stable is the
one you now carry: **match the tool to the constraint.** Local when the data can't
move; cloud when capability or speed to market leads.`,
      questions: [
        {
          prompt:
            "A law firm wants to use AI to summarize confidential client contracts. Which approach best addresses their data concerns?",
          options: [
            "Use a public cloud API — attorneys can opt out of training data use",
            "Run a local open-weight model on the firm's own hardware so client data never leaves the network",
            "Only use AI on non-confidential marketing copy and never on legal documents",
          ],
          answer: 1,
          explanation:
            "Attorney-client privilege and confidentiality obligations make a compelling case for local inference. The data never reaches a third party, eliminating a major compliance risk.",
        },
        {
          prompt:
            "A startup wants to add an AI feature to their product by next month. They have no ML engineers and a small budget. What is the most pragmatic choice?",
          options: [
            "Buy server hardware, set up Ollama, and fine-tune a model before launch",
            "Use a cloud API — no hardware investment, no ops burden, and you can swap models as they improve",
            "Wait until local models match frontier cloud quality in every dimension",
          ],
          answer: 1,
          explanation:
            "Cloud APIs are the right starting point for most startups: fast to integrate, no hardware, and access to frontier models. You can always move workloads local later as scale and privacy demands grow.",
        },
        {
          prompt:
            "Which statement best describes how experienced AI practitioners approach the cloud-vs-local decision in 2026?",
          options: [
            "They use only local models because privacy is paramount for all tasks",
            "They use only cloud models because local hardware can never match cloud performance",
            "They use both — cloud for frontier capability and latency-sensitive tasks, local for privacy-sensitive or high-volume workloads",
          ],
          answer: 2,
          explanation:
            "The hybrid approach is the professional norm. Each tool has a domain where it wins. Matching the tool to the constraint — not religious commitment to one side — is the mark of a mature practitioner.",
        },
      ],
      explanation:
        "Local or cloud isn't a binary religion — it's a decision shaped by data sensitivity, budget, capability needs, and ops capacity. You now have the framework to make that call.",
    },
  ],
};
