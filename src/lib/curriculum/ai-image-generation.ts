import type { Module } from "./types";

// Create with AI: Images & Media — practical image-generation literacy for
// everyday creators. No coding required; all quiz/reading lessons. Covers
// how diffusion models work in plain language, prompt craft, iteration,
// AI vision, editing and emerging audio/video, ethics, and real-world uses.
export const aiImageGeneration: Module = {
  slug: "ai-image-generation",
  title: "Create with AI: Images & Media",
  description:
    "Learn to generate, edit, and work with AI-created images — from writing your first text-to-image prompt to understanding the ethics of synthetic media. No design background needed: just clear ideas and the confidence to iterate.",
  emoji: "🎨",
  gradient: "from-pink-500/20 to-rose-500/10",
  tagline:
    "Master AI image generation — write better prompts, iterate like a pro, and create stunning visuals for social media, presentations, and everyday projects.",
  keywords: [
    "AI image generation",
    "text to image AI",
    "how to write image prompts",
    "AI art for beginners",
    "Midjourney prompts",
    "DALL-E tips",
    "AI image editing",
    "AI art ethics",
    "generate images with AI",
    "AI visual content creation",
  ],
  lessons: [
    {
      slug: "how-ai-makes-images",
      title: "How AI Makes Images",
      blurb: "Describe it and it paints it — what's really happening inside a text-to-image model.",
      xp: 20,
      kind: "quiz",
      content: `# How AI Makes Images

Type a sentence, get a picture. It feels like magic — but there's a surprisingly
simple idea underneath it, once you strip away the jargon.

## The basic idea: diffusion

Today's leading image models use a technique called **diffusion**. Here's the
intuition:

1. The model was shown hundreds of millions of image-and-caption pairs. Over time
   it learned which visual patterns correspond to which words and concepts.
2. When you type a prompt, it starts with a field of pure visual noise — like
   static on an old TV — and gradually "sculpts" it, step by step, into an image
   that matches your words.
3. Each step removes a little noise and adds a little meaning, guided by your prompt.
   After dozens of these steps, a coherent image emerges.

Think of it like a sculptor who starts with a block of marble and chips away until
a form appears — except the "marble" is random pixels and the "chisel" is your
description.

## Where to find these tools

You don't need to install anything special. Image generation is built into several
tools you may already use:

- **ChatGPT / DALL-E** (OpenAI) — integrated directly into the chat interface
- **Adobe Firefly** — built into Photoshop and available on the web; trained on
  licensed content, so commercially safe
- **Midjourney** — accessed via a web interface; well known for painterly, high-
  quality aesthetics
- **Gemini** (Google) — image generation built into the chatbot
- **Stable Diffusion / FLUX** — open models you can run locally or via hosted apps
- **Canva AI** — built into the popular design tool

They all accept a text prompt and return one or more images. Quality, style, and
exact behavior differ, but the core experience is the same everywhere.

## What it can and can't do

AI image generation is **extraordinary** at:
- Turning vague creative concepts into visual starting points
- Producing photorealistic scenes, illustrations, and logos in seconds
- Exploring many visual directions quickly before committing

It still struggles with:
- Hands and fingers (a known weak spot, improving fast)
- Precise text rendered inside images (letters often come out garbled)
- Exact spatial layouts ("put the dog to the left of the tree")
- Perfectly consistent characters across multiple images

Knowing the limits helps you set expectations and route around them.`,
      questions: [
        {
          prompt: "How does a diffusion-based image model create an image from your text prompt?",
          options: [
            "It searches a database of pre-made images and returns the closest match",
            "It starts with visual noise and gradually sculpts it into an image guided by your words",
            "It asks a human designer to draw it, then sends you the result",
          ],
          answer: 1,
          explanation:
            "Diffusion models begin with pure noise and iteratively refine it — each step nudged by the prompt — until a coherent image emerges. No database lookup, no human in the loop.",
        },
        {
          prompt: "Which of these is a well-known limitation of current AI image generators?",
          options: [
            "They can only produce black-and-white images",
            "They require you to draw a rough sketch first",
            "They often struggle to render hands accurately and legible text inside images",
          ],
          answer: 2,
          explanation:
            "Hands and in-image text are persistent weak spots. The models are improving, but these are areas where human editing or a different approach often helps.",
        },
        {
          prompt: "Adobe Firefly is notable among AI image tools because it is…",
          options: [
            "The only tool that works on mobile devices",
            "Trained on licensed content, making it a safer choice for commercial use",
            "The only free tool available",
          ],
          answer: 1,
          explanation:
            "Firefly was built on licensed and public-domain content specifically so designers could use outputs commercially without copyright risk — a key differentiator from models trained on scraped web images.",
        },
      ],
      explanation:
        "Diffusion = start with noise, sculpt with your words. Once you picture that mental model, everything else — why prompts matter, why hands go wrong, why text blurs — clicks into place.",
    },
    {
      slug: "writing-great-image-prompts",
      title: "Writing a Great Image Prompt",
      blurb: "Subject + style + composition + lighting + mood — specificity is the whole game.",
      xp: 25,
      kind: "quiz",
      content: `# Writing a Great Image Prompt

Your prompt is the only creative direction the model has. Vague in, vague out.
Specific in, stunning out. Learning to write good image prompts is the single
highest-leverage skill in AI image creation.

## The five ingredients of a strong prompt

Think of each prompt as a painting brief you'd hand to a skilled illustrator:

1. **Subject** — what is the main thing? Be precise.
   *"a red fox"* vs. *"a sleepy red fox curled on a moss-covered log"*

2. **Style / medium** — what visual language should it use?
   Options: *oil painting, watercolor, digital illustration, photorealistic,
   pencil sketch, cinematic still, isometric icon, anime, Art Nouveau…*

3. **Composition** — where is the camera / what's in frame?
   *"close-up portrait"*, *"wide establishing shot"*, *"bird's-eye view"*,
   *"rule of thirds"*, *"centered symmetry"*

4. **Lighting** — this transforms mood more than almost anything else.
   *"golden hour sunlight"*, *"dramatic side lighting"*, *"soft studio light"*,
   *"neon glow"*, *"overcast flat light"*

5. **Mood / atmosphere** — the feeling you want the viewer to walk away with.
   *"peaceful and dreamlike"*, *"tense and cinematic"*, *"whimsical and playful"*

## Comparing weak vs. strong prompts

| Weak | Strong |
|------|--------|
| "a woman" | "portrait of a 30s woman, warm studio lighting, soft focus, film grain, candid expression" |
| "a city" | "aerial view of a futuristic Asian city at night, neon reflections on wet streets, cinematic, moody blue palette" |
| "a cat" | "fluffy tabby cat sitting in a sunlit windowsill, shallow depth of field, cozy autumn afternoon" |

## Tips that consistently help

- **Add an aspect ratio hint** if the tool supports it: *"--ar 16:9"* for widescreen,
  *"--ar 1:1"* for square, *"--ar 9:16"* for a phone screen / social story.
- **Reference a style era or movement**: *"1950s retro poster style"*, *"Bauhaus"*,
  *"impressionist brushwork"*.
- **Stack adjectives deliberately**: each descriptor tilts the result. *"gritty,
  rain-soaked, dystopian"* is a very different image from *"bright, airy, utopian"*.
- **Avoid negatives in your head** — say what you *want*, not what you don't.
  *"clean background"* works better than mentally hoping it won't add clutter.`,
      questions: [
        {
          prompt: "Which element of a prompt has the single biggest impact on the emotional feel of an image?",
          options: [
            "The file format you request",
            "The lighting description (e.g., golden hour, neon glow, soft studio light)",
            "The exact number of adjectives used",
          ],
          answer: 1,
          explanation:
            "Lighting is the mood lever. The same subject in golden-hour sunlight vs. harsh fluorescent light vs. neon glow produces completely different emotional registers.",
        },
        {
          prompt: "You want a vertical image for an Instagram Story. What should you add to your prompt?",
          options: [
            "The word 'vertical' somewhere in the subject description",
            "An aspect ratio parameter like --ar 9:16",
            "A request for a larger file size",
          ],
          answer: 1,
          explanation:
            "Most modern image tools accept an aspect ratio flag or setting. 9:16 is the standard portrait ratio for phone screens and social stories.",
        },
        {
          prompt: "Which is the stronger image prompt?",
          options: [
            "'a mountain'",
            "'snow-capped mountain peak at sunrise, warm alpenglow on the ridgeline, dramatic low-angle shot, photorealistic, wide-angle lens'",
            "'mountain big nice wow'",
          ],
          answer: 1,
          explanation:
            "Subject + lighting + composition + style + mood is the formula. Specific, descriptive language gives the model a clear creative brief instead of a guessing game.",
        },
      ],
      explanation:
        "Every prompt is a creative brief. Subject, style, composition, lighting, mood — nail those five ingredients and you'll consistently produce images you're proud of on the first or second try.",
    },
    {
      slug: "iterating-on-images",
      title: "Iterating on Images",
      blurb: "Variations, tweaks, aspect ratios — how to steer toward exactly what you want.",
      xp: 20,
      kind: "quiz",
      content: `# Iterating on Images

Getting a great image is rarely a one-shot deal. The best creators treat the first
result as a draft and use the model's iteration tools to close in on exactly what
they want. That's not failure — it's the workflow.

## Tools every image generator offers

**Regenerate / Reroll**
Don't like any of the outputs? Ask for more. The same prompt can produce wildly
different results each time because the model starts from a different random seed.
A second or third batch often has the winner.

**Variations**
Found one you mostly like? Generate variations of it — the model keeps the overall
composition and feel while exploring small changes. Great for finding the right
expression on a face, or the right texture on a background.

**Upscale**
Most tools generate at a moderate resolution by default. Upscaling runs an extra
pass to sharpen and add detail. Do this before downloading an image you plan to print
or use large.

**Prompt refinement**
The fastest iteration tool is often just editing your prompt. Identify what's off —
too dark? add *"bright, airy"*. Wrong vibe? swap the mood words. Wrong era? name one.
Small word changes cascade into large visual changes.

## What to do when you're "almost there"

When an image is 80% right, try these before giving up:

- **Describe the delta**: what's wrong? Add or remove specific words that address it.
- **Ask for an alternative view**: *"same scene, but from above"* or *"close-up of just
  the subject"*.
- **Lock what you love**: some tools let you feed an image back in as a starting point
  (image-to-image), which preserves style and composition while letting you nudge.
- **Move post-processing to a real editor**: AI gets you 90% there; a quick crop,
  color grade, or background blur in a regular photo editor finishes the job.

## The mindset shift: direction, not perfection

Expect the process to feel like steering, not ordering. You point the model in a
direction, see where it lands, and steer again. Users who iterate freely — trying
three batches in the time others spend agonizing over the perfect prompt — consistently
get better results faster.`,
      questions: [
        {
          prompt: "You run a prompt and none of the four images are quite right. What's the best next step?",
          options: [
            "Conclude that AI can't make what you want and give up",
            "Regenerate with the same or slightly refined prompt — each batch starts from a different random seed",
            "Wait 24 hours and try again",
          ],
          answer: 1,
          explanation:
            "Randomness is a feature. The same prompt generates meaningfully different results each time, so a second or third batch frequently surfaces the winner without any changes.",
        },
        {
          prompt: "What does the 'upscale' function do in most image generators?",
          options: [
            "It makes the subject bigger within the same canvas",
            "It runs an extra pass to add sharpness and detail, producing a higher-resolution version",
            "It converts the image to a different file format",
          ],
          answer: 1,
          explanation:
            "Upscaling is a detail-enhancement step — not just resizing. It's worth doing before any image you plan to print or display at a large size.",
        },
        {
          prompt: "Which mindset produces the best AI image results?",
          options: [
            "Crafting one perfect prompt and expecting a perfect image on the first try",
            "Treating generation as a steering process — iterate freely, refine as you go",
            "Using the shortest possible prompt to avoid confusing the model",
          ],
          answer: 1,
          explanation:
            "Experienced creators iterate constantly. Three quick batches with prompt tweaks beats one long anxious wait for perfection — and the results are consistently better.",
        },
      ],
      explanation:
        "Regenerate, vary, refine the prompt, and steer. Iteration isn't a fallback — it's the pro workflow for getting images you're genuinely happy with.",
    },
    {
      slug: "ai-can-see",
      title: "AI Can SEE Too",
      blurb: "Upload an image and ask questions — AI can describe, analyze, and read what's in photos.",
      xp: 20,
      kind: "quiz",
      content: `# AI Can SEE Too

The conversation about AI images usually focuses on *generating* them. But modern AI
assistants can also *look at* an image you share and reason about what they see.
This is called **vision** or **multimodal** capability, and it opens up a completely
different set of superpowers.

## What you can do by uploading an image

**Describe and explain**
Drop in a photo and ask: *"What's in this image?"* or *"Describe this to someone who
can't see it."* The AI will narrate the scene, objects, colors, and context in
detail. Useful for accessibility, archiving, or just getting your bearings.

**Extract text from photos (OCR)**
Take a photo of a handwritten note, a printed receipt, a whiteboard, or a sign and
ask the AI to transcribe it. Modern vision models handle messy handwriting and
tilted text surprisingly well.

**Troubleshoot from a photo**
*"Why is my plant's leaves turning yellow?"* — upload a photo. *"What's wrong with
my car's dashboard warning light?"* — show it. The AI can often narrow down likely
causes and suggest next steps, acting like a knowledgeable friend looking over your
shoulder.

**Analyze documents and diagrams**
Upload a chart, a floor plan, a screenshot, or a data table and ask questions about
it: *"Which month had the highest sales?"* or *"What does this graph show about the
trend?"*

**Compare images**
Many tools let you upload two images and ask: *"What's different between these?"* or
*"Which product looks higher quality?"*

## Practical limits to keep in mind

- **Privacy**: the image goes to the AI provider's server. Don't upload photos
  containing sensitive documents, identifying info, or other people without their
  consent.
- **Medical / legal / safety**: AI vision is useful for triage and general guidance,
  but it is not a substitute for a doctor, mechanic, or legal expert.
- **Accuracy**: it can misread text in complex layouts or miss objects in cluttered
  scenes. Verify anything that matters.`,
      questions: [
        {
          prompt: "What does 'vision' capability mean in the context of an AI assistant?",
          options: [
            "The AI can create video in real time",
            "You can upload an image and the AI will analyze, describe, or answer questions about it",
            "The AI has built-in camera access on your device",
          ],
          answer: 1,
          explanation:
            "Vision (or multimodal) means the model can process images you share — reading, describing, and reasoning about what's in them.",
        },
        {
          prompt: "You took a photo of a handwritten receipt and need the total. The best move with a vision-capable AI is to…",
          options: [
            "Type out every line manually and ask the AI to add them up",
            "Upload the photo and ask the AI to read the amounts and find the total",
            "Scan it to PDF first, then email it to yourself",
          ],
          answer: 1,
          explanation:
            "Vision models can read handwriting and extract structured information from photos. Upload and ask is far faster than manual transcription.",
        },
        {
          prompt: "Which is an important privacy consideration when uploading images to an AI tool?",
          options: [
            "The AI will post your photos publicly on social media",
            "The image is sent to the provider's servers — avoid uploading sensitive documents or other people's faces without consent",
            "The AI will permanently delete your original image file",
          ],
          answer: 1,
          explanation:
            "Uploading an image means sharing it with the service. Treat photos of IDs, private documents, or other individuals the same way you'd treat pasting sensitive text — with care.",
        },
      ],
      explanation:
        "AI vision turns your camera into a thinking tool. Describe, transcribe, troubleshoot, and analyze — just be thoughtful about what images you share and with whom.",
    },
    {
      slug: "editing-and-beyond-images",
      title: "Editing & Beyond Images",
      blurb: "Fix, replace, and expand images with AI — plus a plain-language tour of AI audio and video.",
      xp: 22,
      kind: "quiz",
      content: `# Editing & Beyond Images

Generating an image from scratch is just the beginning. AI tools have also become
remarkably powerful at *editing* existing images and at producing entirely different
kinds of media — audio, music, and video.

## AI image editing: inpainting and more

**Inpainting** means painting *inside* an existing image: you circle a region,
describe what you want there, and the AI replaces it while keeping the rest of the
image untouched. Examples:

- Remove an unwanted object from a photo (a cluttered background, a stranger in
  the frame) and fill the gap naturally.
- Replace the sky in a dull outdoor photo with a dramatic sunset.
- Change what someone is wearing in a product or headshot.
- Fix an AI-generated image that's 90% perfect but has a weird hand — circle the
  hand, type *"normal hand"*, regenerate just that area.

**Outpainting / "expand"**
Some tools let you extend a photo *beyond* its original borders — fill in what the
camera didn't capture. Useful for making a portrait-format photo work in landscape.

**Background removal and replacement**
One click in most modern tools. Great for product shots, profile pictures, or
dropping a subject into a completely different scene.

**Style transfer**
Apply the visual style of one image to another: make your photo look like a Van Gogh
painting, or match the color grade of a reference shot.

## AI audio and video: what's emerging

These areas are moving fast. As of 2026, the landscape looks like this:

- **AI voice and speech**: generating realistic spoken audio from text is
  well-established. Tools can clone voice styles and produce narration, podcasts,
  or dubbing at scale. The output is often indistinguishable from a recording.
- **AI music**: several tools can generate background music in any genre from a
  text description (*"upbeat acoustic folk, 90 seconds"*). Useful for content
  creators who need royalty-free tracks quickly.
- **AI video**: generating short video clips from text prompts is possible and
  improving rapidly. Consistency across longer clips, exact character control, and
  realism are still evolving — expect major leaps year over year. Early commercial
  use cases include social media clips, product demos, and animatics.

The same ethics that apply to images apply here — and with even higher stakes, since
realistic synthetic audio and video are more easily mistaken for genuine recordings.`,
      questions: [
        {
          prompt: "What does 'inpainting' let you do in an AI image editor?",
          options: [
            "Generate a brand-new image from scratch",
            "Select a specific region of an existing image and replace it with AI-generated content",
            "Increase the resolution of an entire image",
          ],
          answer: 1,
          explanation:
            "Inpainting lets you surgically edit a part of an image — removing objects, fixing mistakes, or replacing elements — while the rest of the image stays the same.",
        },
        {
          prompt: "Which of these is an accurate description of AI voice generation as of 2026?",
          options: [
            "It can only produce robotic, clearly synthetic voices",
            "It is well-established and can produce realistic spoken audio that is often hard to distinguish from a real recording",
            "It requires a professional recording studio to work",
          ],
          answer: 1,
          explanation:
            "AI voice synthesis is mature technology. Realistic voices from text are available in consumer tools, which is both useful and why disclosure matters.",
        },
        {
          prompt: "What is 'outpainting' (sometimes called 'expand') in AI image tools?",
          options: [
            "Increasing the file size of an image",
            "Extending the image beyond its original borders to fill in what wasn't in the frame",
            "Converting an image from color to black and white",
          ],
          answer: 1,
          explanation:
            "Outpainting lets the AI invent the scene beyond the edge of a photo — handy for changing the aspect ratio or adding context to a tightly cropped shot.",
        },
      ],
      explanation:
        "AI editing goes far beyond generation: inpaint, outpaint, swap backgrounds, transfer styles. And audio/video AI is arriving fast — same creative possibilities, same ethical responsibility.",
    },
    {
      slug: "ethics-and-pitfalls",
      title: "Ethics & Pitfalls",
      blurb: "Deepfakes, consent, copyright, bias — what every AI image creator needs to know.",
      xp: 25,
      kind: "quiz",
      content: `# Ethics & Pitfalls

Creating images with AI is easy enough that it comes with real responsibilities.
The same tools that let you make a breathtaking landscape can also create fake photos
of real people, infringe on artists' work, and spread misinformation at scale.

## Deepfakes and consent

A **deepfake** is a synthetic image or video that realistically depicts a real person
doing or saying something they didn't do or say. Creating deepfakes of real people —
especially without consent — causes genuine harm:

- **Reputation damage**: fake photos placed in false contexts spread as real news.
- **Non-consensual intimate imagery**: creating fake explicit content of real people
  is illegal in many jurisdictions and causes serious personal harm.
- **Fraud and impersonation**: fake audio or video of executives, politicians, or
  family members is used in scams.

**The rule of thumb**: if the real person hasn't consented, don't make it.

## Copyright and ownership questions

Who owns an AI-generated image? The law is still evolving worldwide, but a few
things are clear enough to act on:

- **Style isn't copyrightable, but specific art is.** Asking the AI to "paint in
  the style of Monet" is generally fine. Asking it to reproduce a specific copyrighted
  painting is not.
- **Training data concerns**: many popular models were trained on images scraped from
  the web, including copyrighted works by living artists. This is contested legally
  and ethically. Tools trained on licensed data (like Adobe Firefly) sidestep this.
- **Commercial use rights vary by tool.** Read the terms of service before using
  AI-generated images in products, ads, or for sale.
- **In most jurisdictions, AI-only output isn't automatically protected.** If you
  want to claim copyright, significant human creative input (curation, editing,
  composition decisions) is generally required.

## Disclosure and authenticity

Audiences increasingly deserve to know when an image is AI-generated, especially in:
- News and journalism
- Advertising (rules vary by country and platform)
- Social media posts presented as real events
- Academic or professional submissions

Many platforms now require AI labels. Even where they don't, transparent disclosure
builds trust.

## Bias in generated images

AI image models reflect the biases in their training data. If you prompt for "a
doctor" or "a CEO" without specifying, many models historically defaulted to certain
demographics. This is improving, but worth testing — especially for any content
you're creating for diverse audiences.`,
      questions: [
        {
          prompt: "Creating a realistic fake photo or video of a real person without their consent is problematic because…",
          options: [
            "It uses too much computing power",
            "It can damage their reputation, be used for fraud, or cause serious personal harm — and is illegal in many places",
            "It slows down the AI model for other users",
          ],
          answer: 1,
          explanation:
            "Deepfakes of real people without consent are an active harm — legally, personally, and socially. Consent is the threshold.",
        },
        {
          prompt: "You want to use AI-generated images in a commercial ad campaign. What should you do first?",
          options: [
            "Assume it's fine — any image you create belongs to you",
            "Read the terms of service for the specific tool, since commercial rights vary by platform",
            "Only use images that took more than 10 prompts to create",
          ],
          answer: 1,
          explanation:
            "Commercial rights vary significantly by tool. Some grant full commercial use; others restrict it. Always check the terms before putting AI images in commercial work.",
        },
        {
          prompt: "Asking an AI to generate an image 'in the style of Van Gogh' is generally…",
          options: [
            "Fine, because style itself is not copyrightable",
            "Illegal, because all artistic styles are protected",
            "Only allowed if Van Gogh is still alive",
          ],
          answer: 0,
          explanation:
            "Style — impressionist brushwork, warm palettes, thick paint — is not itself copyrightable. Asking for a specific style is a normal creative prompt. Reproducing a specific protected work verbatim is a different matter.",
        },
      ],
      explanation:
        "Power comes with responsibility. Consent, copyright, disclosure, and bias aren't afterthoughts — they're part of being a thoughtful creator in the AI era.",
    },
    {
      slug: "practical-uses-capstone",
      title: "Practical Uses & Capstone",
      blurb: "Real everyday applications — social posts, mockups, slides, brainstorming — and everything you've learned.",
      xp: 25,
      kind: "quiz",
      content: `# Practical Uses & Capstone

You've covered how AI image generation works, how to prompt it, how to iterate,
how to use AI vision, how to edit, and what to watch out for ethically. Let's
bring it home with real-world applications and a final check-in.

## What people actually use AI images for

**Social media content**
The biggest everyday use case. Generate custom visuals for posts, banners, thumbnails,
and story cards instead of hunting for stock photos. A prompt like *"flat design
illustration of a morning coffee routine, warm pastel palette, square crop"* gets
you a unique image in seconds.

**Presentations and decks**
Swap generic clip art for genuine visual interest. AI can generate custom diagrams,
scene-setting hero images, or concept illustrations that match your exact topic —
no design department required.

**Product and business mockups**
Visualize a product idea before you build it. Generate packaging concepts, website
hero images, or marketing assets to show stakeholders or test on social media before
spending on production.

**Brainstorming and creative exploration**
When you have a vague idea, generate 20 variations in ten minutes and discover
directions you never would have reached by thinking alone. AI images externalize
imagination quickly.

**Personal projects**
Custom birthday card art, personalized gifts, phone wallpapers, home decor prints,
book cover concepts, avatar portraits — anything you'd have paid a designer for or
gone without.

**Accessibility and communication**
Generate diagrams, visual instructions, or explanatory images to support text that's
hard to communicate with words alone.

## The skills you've built

In this module you learned to:

1. Explain how diffusion models turn text into images
2. Write prompts using the subject / style / composition / lighting / mood framework
3. Iterate effectively — regenerate, vary, refine — to reach great results
4. Use AI vision to analyze and extract information from images you already have
5. Apply AI editing tools (inpainting, outpainting, style transfer) to existing images
6. Navigate the ethics: consent, copyright, disclosure, bias
7. Apply all of the above to real everyday creative tasks

The best next step: pick one real use case and try it today. Treat the first attempt
as a learning round, not a final deliverable. The skill grows fast once you start
doing it.`,
      questions: [
        {
          prompt: "A small business owner wants a custom hero image for their website without hiring a designer. What's the best AI image approach?",
          options: [
            "Search Google Images and hope to find something close enough",
            "Write a specific prompt describing the scene, style, and mood — then iterate until it fits the brand",
            "AI images are too low quality for any business use",
          ],
          answer: 1,
          explanation:
            "AI image generation is now a legitimate tool for small-business visual content. A clear prompt and a few rounds of iteration can produce a unique, on-brand hero image in minutes.",
        },
        {
          prompt: "You're brainstorming visual concepts for a new product and have only a vague idea. What's the best use of AI image generation here?",
          options: [
            "Wait until you have a fully defined concept before generating anything",
            "Generate many quick variations from your vague idea to discover directions you wouldn't have thought of otherwise",
            "Commission a designer — AI is only for final production",
          ],
          answer: 1,
          explanation:
            "Brainstorming with AI images is one of the most powerful uses. Generating 20 variations in ten minutes externalizes your fuzzy idea into concrete options you can react to and refine.",
        },
        {
          prompt: "Which combination of skills makes someone genuinely effective at AI image creation?",
          options: [
            "Access to the most expensive AI tool",
            "Clear prompting, confident iteration, ethical awareness, and knowing when to finish in a regular editor",
            "A professional design degree",
          ],
          answer: 1,
          explanation:
            "The combination of craft (prompting, iteration) + judgment (ethics, knowing tools' limits) is what separates effective AI creators from frustrated ones. Expensive tools help only a little; skills help a lot.",
        },
      ],
      explanation:
        "You're ready. Social posts, mockups, decks, brainstorming, personal projects — AI image generation is a practical creative tool for everyday life. Write a clear prompt, iterate freely, and use your judgment. Go make something.",
    },
  ],
};
