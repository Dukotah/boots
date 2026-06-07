import type { Module } from "./types";

// Create with AI: Video & Voice — for the general user who wants to produce
// video and audio content with AI tools. All quiz/reading lessons; no coding.
export const aiVideoAndVoice: Module = {
  slug: "ai-video-and-voice",
  title: "Create with AI: Video & Voice",
  description:
    "Go from idea to finished short-form video and polished audio — without a studio. Learn how AI generates, edits, and enhances video and voice; write prompts that actually work; handle music, captions, and upscaling; and navigate the real ethics of voice cloning and deepfakes.",
  emoji: "🎬",
  gradient: "from-rose-500/20 to-orange-500/10",
  tagline:
    "Turn scripts and ideas into real video and audio using AI — and do it responsibly.",
  keywords: [
    "AI video generation",
    "AI voice cloning",
    "AI voiceover",
    "text to video AI",
    "AI video editing",
    "AI music generation",
    "deepfake ethics",
  ],
  lessons: [
    {
      slug: "how-ai-makes-video-and-voice",
      title: "How AI Makes Video & Voice",
      blurb: "Under the hood in plain terms: diffusion, tokens, and why the output looks the way it does.",
      xp: 20,
      kind: "quiz",
      content: `# How AI Makes Video & Voice

To use these tools well, it helps to understand roughly what they're doing — even if
you never touch the code underneath.

## Video generation

Most AI video generators are built on **diffusion models**: they start from pure
visual noise and repeatedly refine it toward something meaningful, guided by your
text description. The model learned what words like "sunset," "slow pan," or "cinematic"
look like by training on enormous libraries of video and image pairs.

The result is short clips — typically 4–16 seconds in a single generation — because
video is far more expensive to compute than still images. What you get is plausible
motion, not a true simulation of physics; you'll notice hands, text, and unusual
objects still trip these models up.

## Voice (text-to-speech and voice cloning)

AI voice systems turn written text into spoken audio. Modern ones are trained on
large banks of human speech and can produce voices that sound natural across tone,
pace, and emotion. **Voice cloning** goes further: given a short sample of a specific
person's voice, some systems can generate new speech that sounds like that person.

The key thing to understand: **neither the video nor the voice "understands" what
it's expressing.** The model has learned statistical patterns of what good output
sounds or looks like — not meaning, intent, or truth.

## Why this matters for creators

- Output quality depends heavily on **how you describe what you want** (your prompt).
- Artifacts, inconsistencies, and errors are normal — plan to review and iterate.
- The gap between "technically possible" and "polished and professional" is still
  closed by human judgment: yours.`,
      questions: [
        {
          prompt: "How do most AI video generators produce their output?",
          options: [
            "They record real footage and speed it up",
            "They start from visual noise and refine it toward your description using a diffusion process",
            "They stitch together clips from a database of licensed footage",
          ],
          answer: 1,
          explanation:
            "Diffusion models iteratively refine noise into coherent video guided by text. They learned patterns from large training sets — not from a licensed clip library.",
        },
        {
          prompt: "Why are AI-generated video clips typically only a few seconds long?",
          options: [
            "Longer videos are copyrighted by studios",
            "Video is computationally expensive; generating even short clips takes significant processing",
            "AI can't understand events that last more than ten seconds",
          ],
          answer: 1,
          explanation:
            "Compute cost scales sharply with duration. Generating coherent, high-quality motion is orders of magnitude more expensive than generating a still image.",
        },
        {
          prompt: "What does 'voice cloning' mean in the context of AI audio tools?",
          options: [
            "Copying a voice from a video game character",
            "Training a model on a sample of someone's voice so it can generate new speech that sounds like them",
            "Recording your voice in multiple accents",
          ],
          answer: 1,
          explanation:
            "Voice cloning uses a short audio sample to capture the characteristics of a specific voice, then synthesizes new speech in that voice — raising serious consent and ethics questions covered later in this course.",
        },
      ],
    },
    {
      slug: "writing-prompts-for-video",
      title: "Writing Prompts That Actually Work",
      blurb: "Good video prompts describe motion, mood, and camera — not just the subject.",
      xp: 20,
      kind: "quiz",
      content: `# Writing Prompts That Actually Work

Prompting a video generator is different from prompting a chatbot. You're not
describing a scene to read — you're describing a scene to *watch*. The gap between
a mediocre and a great result usually comes down to how well your prompt communicates
**visual information**.

## What video prompts need

A strong video prompt addresses four things:

1. **Subject** — who or what is in frame. Be specific: "a middle-aged woman in a
   red rain jacket" beats "a person."
2. **Action / motion** — what's moving and how. "She walks slowly across a wet
   cobblestone street" is far better than "she is outside."
3. **Camera** — angle, movement, lens feel. "Low angle, slow push-in, shallow depth
   of field" tells the model how to frame the scene.
4. **Mood / style** — lighting, color, era, genre. "Overcast golden-hour light,
   muted color palette, slow-motion" gives the model a target aesthetic.

## Common mistakes

- **Too abstract**: "a beautiful moment" gives the model nothing visual to work with.
- **Too crowded**: five complex things at once usually produces chaos. One or two
  strong visual ideas per clip work best.
- **Ignoring motion**: if you don't describe movement, you often get a nearly-static
  clip. AI video still needs to be *told* to move.

## Iteration is the workflow

Your first generation is a draft. Adjust one element at a time — motion, camera,
lighting — and re-generate. Short targeted tweaks teach you what each word does
to the output faster than rewriting the whole prompt each time.`,
      questions: [
        {
          prompt: "Which prompt is most likely to produce a compelling, specific video clip?",
          options: [
            "'A beautiful outdoor scene with good vibes'",
            "'A low-angle slow push-in of an old fishing boat rocking gently on gray morning water, muted blue-green tones, soft overcast light'",
            "'Everything happening at a busy city intersection at rush hour with crowds and cars and bikes and signs'",
          ],
          answer: 1,
          explanation:
            "One focused subject, specific motion, camera direction, and mood gives the model clear visual targets. Abstract prompts under-constrain; overstuffed prompts overwhelm.",
        },
        {
          prompt: "What often happens when you don't describe motion in a video prompt?",
          options: [
            "The model adds exciting random action",
            "You frequently get a nearly static clip with little apparent movement",
            "The generation fails with an error",
          ],
          answer: 1,
          explanation:
            "Video generators need motion described explicitly. Without it, they often produce a clip that looks like a slowly breathing still image.",
        },
        {
          prompt: "What's the most effective way to improve a video generation you're not happy with?",
          options: [
            "Rewrite the entire prompt from scratch each time",
            "Adjust one specific element — motion, camera, lighting — and re-generate to learn what each word does",
            "Submit the same prompt repeatedly until you get lucky",
          ],
          answer: 1,
          explanation:
            "Targeted, incremental changes teach you the model's vocabulary. Wholesale rewrites make it hard to know what caused any improvement.",
        },
      ],
    },
    {
      slug: "ai-voiceover-and-cloning",
      title: "AI Voiceover & Voice Cloning",
      blurb: "Add narration in seconds — and understand the hard consent questions that come with cloning.",
      xp: 25,
      kind: "quiz",
      content: `# AI Voiceover & Voice Cloning

Modern text-to-speech (TTS) tools can turn a script into natural-sounding audio in
seconds. The narrator doesn't exist; the voice was synthesized. For short-form video,
explainers, e-learning, and podcasts, this is a genuine time-saver.

## What text-to-speech is good for

- Voiceover for social content, slides, or explainer videos when you don't want to
  record yourself.
- Rapid prototyping: draft a video's narration before deciding whether to record a
  human voice.
- Consistent, editable narration — change the script, regenerate the audio, no
  retakes.

Most professional TTS tools let you pick from a library of voices with different
accents, genders, and styles. Some let you adjust pace, emphasis, and tone.

## Voice cloning: the bright line

Voice cloning tools can synthesize new speech that sounds like a specific person
given a short sample. The creative applications are real (authors narrating
audiobooks from a few hours of source audio), but so are the serious risks:

- **Consent is non-negotiable.** Cloning a living person's voice without their
  explicit permission is ethically wrong and, in many places, illegal — regardless
  of how you intend to use the output.
- **Your own voice is yours to clone.** Many creators clone themselves for efficiency.
  That's straightforward.
- **Public figures are not fair game by default.** The fact that someone's voice
  appears in public recordings doesn't grant you the right to synthesize new
  speech in their voice.
- **Disclosure.** Even with consent, audiences generally deserve to know when a
  voice is AI-synthesized, especially in journalism, advertising, or public speech.

The rule of thumb: if the real person wouldn't sign off on it in 30 seconds, don't
use their voice.`,
      questions: [
        {
          prompt: "When is it clearly acceptable to use an AI voice cloning tool?",
          options: [
            "Any time the person is famous and their voice is widely available online",
            "When you have the explicit permission of the person whose voice is being cloned",
            "Whenever you're not making money from the content",
          ],
          answer: 1,
          explanation:
            "Consent is the bright line. Fame, public availability, or non-commercial use do not override a person's right to control how their voice is synthesized.",
        },
        {
          prompt: "A creator wants to add AI voiceover to an explainer video. They don't want to record themselves. What's a clean, ethical approach?",
          options: [
            "Clone a well-known broadcaster's voice for authority",
            "Use a voice from the TTS tool's licensed library of synthetic or consented voices",
            "Record a friend without telling them and use it as a clone sample",
          ],
          answer: 1,
          explanation:
            "Licensed synthetic voice libraries are built specifically for this: no consent issues, professional quality, and editable when the script changes.",
        },
        {
          prompt: "Why should AI-synthesized voices generally be disclosed to audiences?",
          options: [
            "It's required by law in every country",
            "Audiences are entitled to know what they're hearing, especially in journalism, advertising, or public speech, to evaluate its authenticity",
            "AI voices always sound robotic so audiences will notice anyway",
          ],
          answer: 1,
          explanation:
            "Modern TTS is indistinguishable from a human voice to most listeners. Disclosure respects audiences' ability to evaluate credibility — not all jurisdictions mandate it, but it's good practice everywhere.",
        },
      ],
    },
    {
      slug: "script-to-short-form-video",
      title: "Script → Short-Form Video",
      blurb: "A practical end-to-end workflow: script, visuals, voiceover, captions, done.",
      xp: 25,
      kind: "quiz",
      content: `# Script → Short-Form Video

The most reliable way to produce consistent, intentional short-form video with AI
is to **work from a script outward**, not from random generation inward. Here's a
workflow that scales from a 30-second social clip to a 5-minute explainer.

## Step 1 — Write the script

Start with words. A 60-second narrated video needs roughly 130–160 words of spoken
content. Use a chatbot to draft, condense, or punch up your copy. Lock the script
before touching any visuals.

## Step 2 — Plan the visual story

Break the script into beats (often sentence by sentence). For each beat, describe
one visual: what the viewer sees while hearing those words. This becomes your
shot list — and your set of video prompts.

## Step 3 — Generate (or source) the visuals

For each beat, either generate a clip with your video prompt, use stock footage,
or record yourself. AI generation is best for abstract concepts, illustrative
b-roll, and scenarios you can't film. It's weakest for anything requiring
consistent characters across many shots.

## Step 4 — Synthesize the voiceover

Paste your final script into a TTS tool and export the audio. Align the audio
timeline in your editor.

## Step 5 — Add captions, music, and polish

Auto-captions are now highly accurate and strongly improve both accessibility and
watch time on muted social feeds. Add a music bed at low volume. Review the whole
piece at 1× speed before exporting.

## The honest reality

AI handles the tedious parts; human judgment handles the important parts. You still
choose what to say, what mood to set, and whether the final product is good.`,
      questions: [
        {
          prompt: "Why is it recommended to lock the script before generating any visuals?",
          options: [
            "AI video generators refuse to work without a script file attached",
            "Visuals should serve the words; changing the script after generating clips wastes a lot of work",
            "The script automatically becomes the video prompt",
          ],
          answer: 1,
          explanation:
            "When the script changes, the visual plan changes. Finalizing the words first means every clip you generate has a clear purpose and a stable place in the timeline.",
        },
        {
          prompt: "Where does AI video generation tend to struggle most in a scripted workflow?",
          options: [
            "Simple illustrative b-roll and abstract concepts",
            "Maintaining consistent character appearance across multiple separate shots",
            "Short clips with no people in them",
          ],
          answer: 1,
          explanation:
            "Consistency across generations is the main weakness today. Each generation is independent; getting the same character to look the same across ten clips requires careful prompting or purpose-built tooling.",
        },
        {
          prompt: "Why have auto-captions become a strong default for short-form video?",
          options: [
            "Captions replace the need for a voiceover track",
            "They improve accessibility and watch time on social platforms where many viewers watch without sound",
            "They are required by all video platforms",
          ],
          answer: 1,
          explanation:
            "A large share of social video is watched on mute. Captions keep viewers engaged and also serve viewers who are deaf or hard of hearing.",
        },
      ],
    },
    {
      slug: "ai-music-and-sound",
      title: "Music & Sound with AI",
      blurb: "Generate a music bed, design sound effects, and understand what you can actually use.",
      xp: 20,
      kind: "quiz",
      content: `# Music & Sound with AI

Audio is half of video, and the right music bed can elevate a clip from competent
to compelling. AI music generators can produce original instrumental tracks — and
the landscape has moved fast enough that the quality is genuinely usable.

## How AI music generation works

These tools let you describe a mood, genre, tempo, and instrumentation — or just
a few words — and generate a full track in seconds. The models were trained on
large audio datasets and generate novel compositions (not remixes of existing songs).

Common options include generating from a text prompt ("upbeat lo-fi hip hop,
study mood, 90 BPM"), selecting from style presets, or extending and editing
sections of a generated track.

## What it's good for

- Background/music beds for social video, explainers, and presentations.
- Rapid mood exploration: try five completely different feels in the time it
  would take to search a stock-music library once.
- Loopable tracks that fit any length without an awkward edit.

## The rights question

AI-generated music created by these tools is typically yours to use in your
content — but **check the terms of service of the specific tool**. Terms vary:
some grant full commercial rights, some require attribution, some restrict monetized
use, and some are updating their policies as the industry and law evolves.

**Never use an AI tool that was clearly trained on copyrighted music without
rights holders' permission to train and distribute.** Beyond the legal risk,
it's ethically inconsistent with how you'd want your own creative work treated.

For sound effects, many of the same tools (and dedicated SFX generators) can
produce custom audio: a specific door creak, a particular rain texture, a
notification chime — without licensing or recording anything yourself.`,
      questions: [
        {
          prompt: "What's a practical advantage of AI music generation over searching a stock-music library?",
          options: [
            "AI music is always higher quality than human-composed music",
            "You can explore many different moods and styles in seconds with text prompts",
            "AI-generated music never requires rights clearance of any kind",
          ],
          answer: 1,
          explanation:
            "Speed of iteration is the real win: generating five mood variations takes seconds, whereas finding five licensable tracks in a stock library takes much longer.",
        },
        {
          prompt: "Before using AI-generated music commercially, what should you always do?",
          options: [
            "Nothing — all AI-generated music is universally free to use",
            "Check the specific tool's terms of service, since commercial rights, attribution requirements, and monetization rules vary by platform",
            "Register the track with a performing rights organization",
          ],
          answer: 1,
          explanation:
            "Terms differ significantly across tools. Some grant broad commercial rights; others restrict monetized use or require attribution. Never assume — always check.",
        },
        {
          prompt: "Why is it worth being cautious about AI music tools that were trained on copyrighted music without rights-holder permission?",
          options: [
            "The audio quality will always be worse",
            "It carries legal risk and is ethically inconsistent with how most creators would want their own work treated",
            "The tracks generated will contain audible watermarks",
          ],
          answer: 1,
          explanation:
            "Training on copyrighted material without permission is actively contested in courts and raises genuine ethical issues. Tools built on properly licensed or freely available data are the safer, more principled choice.",
        },
      ],
    },
    {
      slug: "editing-upscaling-captions",
      title: "Editing, Upscaling & Captions",
      blurb: "AI post-production tools that clean up, sharpen, and caption your footage automatically.",
      xp: 20,
      kind: "quiz",
      content: `# Editing, Upscaling & Captions

Generating a clip is the beginning. Post-production — editing, upscaling, and
captioning — is where raw material becomes a polished deliverable. AI tools have
made each of these steps faster and more accessible.

## AI-assisted editing

Several editing tools use AI to analyze footage and automate tedious decisions:

- **Auto-cutting silence and filler words** — tools that detect and trim "um,"
  "uh," and dead air with a single click, dramatically speeding up talk-head edits.
- **Scene detection and rough cut** — automatically identifying scene changes to
  organize your timeline.
- **B-roll matching** — some tools suggest stock or generated b-roll that matches
  your transcript's topics.

These are assistants, not replacements. You still make the final creative decisions
about pacing, story, and feel.

## Upscaling

AI upscaling improves the resolution and apparent sharpness of lower-quality footage.
It uses learned patterns from high-resolution images to reconstruct detail that
wasn't in the original. It works well as a clean-up step; it can't recover detail
that was never captured, and it can introduce artifacts if pushed too hard.

## Auto-captions

Modern caption generators are significantly more accurate than they were a few years
ago. Workflow:

1. Export your video with a full audio mix.
2. Run it through a captioning tool (many are built into editing software or
   available as standalone web tools).
3. Review the transcript for errors — especially names, technical terms, and
   overlapping speech — and correct them.
4. Style and position the captions for the platform and audience.

Never skip the review step. Auto-captions are highly accurate on clear speech
but can fail on accents, background noise, or domain-specific vocabulary.`,
      questions: [
        {
          prompt: "What does AI 'upscaling' actually do to video footage?",
          options: [
            "It re-records the footage at higher resolution",
            "It uses learned patterns to reconstruct plausible detail and improve the apparent sharpness of lower-resolution video",
            "It adds a blur filter to hide quality issues",
          ],
          answer: 1,
          explanation:
            "Upscaling is reconstruction, not recording. It can meaningfully improve apparent quality but cannot recover detail that was never captured, and over-applying it creates artifacts.",
        },
        {
          prompt: "Why is it important to review auto-generated captions before publishing?",
          options: [
            "Captions are purely decorative and any errors are invisible to viewers",
            "Auto-captions are highly accurate on clear speech but can fail on accents, background noise, and specialized vocabulary",
            "Platforms penalize videos that include captions",
          ],
          answer: 1,
          explanation:
            "Accuracy varies with audio quality and content type. A quick human review catches errors that could mislead, embarrass, or exclude viewers — especially those who rely on captions for accessibility.",
        },
        {
          prompt: "What is an AI 'filler-word removal' tool doing?",
          options: [
            "Re-recording your audio without the filler words",
            "Detecting and trimming 'um,' 'uh,' and silence automatically in your audio or video timeline",
            "Replacing your voice with a synthetic one that doesn't say 'um'",
          ],
          answer: 1,
          explanation:
            "These tools analyze the audio, identify filler words and dead air, and remove or cut those segments in your edit — saving hours of manual listening and slicing.",
        },
      ],
    },
    {
      slug: "ethics-disclosure-deepfakes",
      title: "Ethics, Disclosure & Deepfakes",
      blurb: "Capstone: the hard questions about authenticity, consent, and what you owe your audience.",
      xp: 25,
      kind: "quiz",
      content: `# Ethics, Disclosure & Deepfakes

AI video and voice tools are powerful enough now that the ethical questions aren't
abstract — they come up in ordinary creative work. This lesson doesn't tell you
exactly what to do in every situation, but it gives you a framework for thinking
through the decisions.

## The core principle: authenticity

People who consume your content form beliefs and make decisions based on what they
think is real. The more your content could influence someone's beliefs — news,
advertising, public speech, political messaging — the more important it is to be
clear about what's real and what's synthesized.

## Deepfakes

A "deepfake" is video or audio in which a real person appears to say or do something
they didn't. The term has become associated with harmful uses: nonconsensual intimate
imagery, political disinformation, impersonation fraud.

Creating deepfakes of real people without their consent:

- Is illegal in a growing number of jurisdictions.
- Causes genuine harm to real individuals.
- Undermines trust in authentic media.

The creative space includes satire, parody, and artistic work — but these have real
legal limits (especially in commercial contexts), and "I meant it as a joke" is not
a universal defense.

## Disclosure norms

There's no single global law, but the emerging norm in responsible practice is:

- **Label AI-generated or AI-altered content** when it depicts real people, makes
  factual claims, or is used in advertising or political speech.
- **Don't use AI to impersonate real people** in ways that could deceive.
- **Ask: could a reasonable viewer be meaningfully misled?** If yes, disclose.

## The cumulative effect

The more indistinguishable AI media becomes from real media, the more every creator's
disclosure choices affect public trust in media generally. That's a genuine
responsibility — and an opportunity to set a standard others will follow.`,
      questions: [
        {
          prompt: "In which context is clear AI disclosure most important?",
          options: [
            "A hand-drawn animated short clearly labeled as fiction",
            "An AI-generated video of a real politician saying something they never said, posted without a label",
            "A behind-the-scenes video of your own desk filmed on your phone",
          ],
          answer: 1,
          explanation:
            "The stakes of disclosure scale with the potential to mislead. A realistic video of a real person making statements they didn't make — without a label — is the highest-risk scenario for public harm.",
        },
        {
          prompt: "Is the defense 'I meant it as satire' always sufficient for deepfake content?",
          options: [
            "Yes — satire is always protected expression with no legal risk",
            "No — satire has real legal limits, especially in commercial contexts, and harmful deepfakes can cause legal liability regardless of stated intent",
            "Yes — as long as the video isn't monetized",
          ],
          answer: 1,
          explanation:
            "Satire protections vary by jurisdiction and context. Courts look at whether a reasonable person would recognize it as satire, the harm caused, and the commercial nature of the work. 'I meant it as a joke' is not a blanket shield.",
        },
        {
          prompt: "A practical test before publishing AI-altered video involving a real person is:",
          options: [
            "Checking whether the resolution is high enough to look professional",
            "Asking: could a reasonable viewer be meaningfully misled by this? If yes, add a clear disclosure",
            "Confirming you used a licensed tool to generate it",
          ],
          answer: 1,
          explanation:
            "Deception potential — not technical quality or tool licensing — is what drives the ethical disclosure obligation. The reasonable-viewer test is the most useful single question to ask.",
        },
      ],
    },
  ],
};
