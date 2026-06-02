import type { Module } from "./types";

// A free, public-good course that teaches seniors and families how to spot and
// avoid common scams. Every lesson is a short, plain-language explainer followed
// by a few practice questions. No code, no jargon — just safe habits.
export const digitalSafety: Module = {
  slug: "digital-safety",
  title: "Digital Safety: Avoid Scams",
  description:
    "Stay safe online and on the phone by learning to recognize the tricks scammers use. This free course gives you simple, practical habits to protect your money, your accounts, and your peace of mind.",
  emoji: "🛡️",
  gradient: "from-emerald-400/20 to-cyan-500/10",
  tagline:
    "Learn to spot phishing, scam texts, and fraud — a free online safety course for seniors and families.",
  keywords: [
    "how to spot a scam",
    "phishing email signs",
    "scam text messages",
    "online safety for seniors",
    "avoid fraud",
    "is this a scam",
  ],
  free: true,
  lessons: [
    {
      slug: "what-is-phishing",
      title: "What Is Phishing?",
      blurb: "Fake emails that pretend to be your bank or a store you trust.",
      xp: 25,
      kind: "quiz",
      content: `# What Is Phishing?

**Phishing** is when a scammer sends you an email that looks like it comes from a
company you trust — your bank, Amazon, Netflix, the post office, or even a friend.
The goal is to trick you into clicking a link, typing in your password, or giving
away your money or personal details.

These emails are designed to **scare you or rush you**. They might say your account
is locked, a payment failed, or someone tried to log in. The fear makes you act fast,
before you stop to think. That is exactly what the scammer wants.

The good news: real companies do not work this way. Your bank will **never** ask you
to confirm your password or card number by clicking a link in an email. When in doubt,
do not click. Instead, open a new browser window and type the company's website yourself,
or call the number printed on the back of your card or on your paper statement.

**Red flags to watch for:**
- A message that says **"act now"** or **"your account will be closed today"**
- A **generic greeting** like "Dear Customer" instead of your real name
- **Spelling and grammar mistakes**, or a logo that looks slightly off
- A **link or button** that wants you to log in or "verify" your details
- A sender's email address that looks odd (for example, *support@amaz0n-secure.com*)`,
      questions: [
        {
          prompt:
            "You get an email that says: \"URGENT: Your bank account has been locked. Click here to verify your password now.\" What should you do?",
          options: [
            "Click the link quickly so you do not lose access",
            "Do not click. Call the number on the back of your card to check",
            "Reply to the email with your password to unlock it",
          ],
          answer: 1,
          explanation:
            "Real banks never ask you to verify your password through an email link. Contact the bank yourself using the number on your card.",
        },
        {
          prompt: "Which of these is a common warning sign of a phishing email?",
          options: [
            "It greets you by your full, correct name",
            "It uses a generic greeting like \"Dear Customer\" and rushes you to act",
            "It arrives during normal business hours",
          ],
          answer: 1,
          explanation:
            "Generic greetings plus a sense of urgency are classic phishing signs meant to make you act before you think.",
        },
        {
          prompt:
            "The safest way to log in to your bank after getting a suspicious email is to:",
          options: [
            "Click the link in the email — it is faster",
            "Type the bank's website address yourself, or use their official app",
            "Search for the bank and click the first ad that appears",
          ],
          answer: 1,
          explanation:
            "Typing the address yourself (or using the official app) avoids fake links. Ads at the top of search results can be scams too.",
        },
        {
          prompt:
            "A real company that you have an account with will normally:",
          options: [
            "Ask you to email them your password to confirm it is you",
            "Never ask for your full password by email",
            "Threaten to arrest you if you do not reply",
          ],
          answer: 1,
          explanation:
            "Legitimate companies never need your full password by email. A threat like that is a scam.",
        },
      ],
    },
    {
      slug: "scam-text-messages",
      title: "Scam Text Messages",
      blurb: "Fake delivery, bank, and \"you won a prize\" texts on your phone.",
      xp: 25,
      kind: "quiz",
      content: `# Scam Text Messages

Scam text messages (sometimes called **"smishing"** — a scam by SMS text) land
right in your phone's messages. They often pretend to be a **delivery company**
("Your package couldn't be delivered — click to reschedule"), your **bank**
("Did you spend $500? Reply YES or NO"), or a **prize** ("You've won a gift card!").

Just like phishing emails, these texts want you to **tap a link** or **reply with
information**. Once you tap, you may land on a fake website that steals your login,
or you may install something harmful on your phone.

The simplest rule: **do not tap links in texts you weren't expecting.** If you think
a delivery or bank text might be real, check it yourself — open the delivery
company's app, or call your bank using the number on your card. Never use the phone
number or link the text gives you.

**Red flags to watch for:**
- A **link** in a text you didn't ask for
- A message from an **unknown number** about a package, payment, or prize
- Pressure to **reply right away** or "confirm" your details
- A web address that looks strange or is shortened so you can't tell where it goes
- A **prize or refund** you never signed up for`,
      questions: [
        {
          prompt:
            "You get a text: \"USPS: Your package is held. Pay a $1.99 fee here: [link]\" — what is the safest response?",
          options: [
            "Tap the link and pay the small fee — it is only $1.99",
            "Do not tap the link. Track the package on the official carrier's app or website",
            "Reply to the text asking if it is real",
          ],
          answer: 1,
          explanation:
            "Delivery services don't text random fee links. Check any real package through the official app or website instead of tapping the link.",
        },
        {
          prompt:
            "A text from an unknown number says you won a $1,000 gift card and to \"claim it now.\" You should:",
          options: [
            "Claim it before the offer expires",
            "Delete it — you can't win a prize you never entered",
            "Forward it to all your friends so they can win too",
          ],
          answer: 1,
          explanation:
            "Unexpected prizes are a classic scam. If you never entered, there is nothing real to claim.",
        },
        {
          prompt:
            "Your bank really does text you sometimes. A text asks you to \"confirm your account by tapping this link.\" The safest move is:",
          options: [
            "Tap the link since your bank does text you",
            "Ignore the link and call your bank using the number on your card",
            "Reply with your account number to confirm",
          ],
          answer: 1,
          explanation:
            "Even if your bank texts alerts, don't tap links. Reach the bank yourself with the number on your card.",
        },
      ],
    },
    {
      slug: "tech-support-scams",
      title: "Tech-Support Scams",
      blurb: "Fake virus pop-ups and \"Microsoft is calling about your computer.\"",
      xp: 30,
      kind: "quiz",
      content: `# Tech-Support Scams

In a **tech-support scam**, a criminal pretends to be from a big company like
**Microsoft** or **Apple** and claims your computer has a virus or a problem. It might
start with a **scary pop-up** on your screen (often with a loud beep and a phone
number to call), or a **phone call** out of the blue.

They want one of two things: to get **remote access** to your computer (so they can
"fix" it), or to get you to **pay** for fake help — often with gift cards. Once they
have remote access, they can see your files, your passwords, and your banking. They
may even pretend to refund you and then "accidentally" take money instead.

Here is the truth: **Microsoft and Apple will never call you** about a virus, and a
real virus warning never comes with a phone number to call. If you see a scary pop-up,
do not call the number. Close the browser, or simply restart your computer. Never let
a stranger control your computer remotely.

**Red flags to watch for:**
- A **pop-up** that fills the screen, beeps, and shows a "support" phone number
- An **unexpected phone call** claiming to be from Microsoft, Apple, or your "internet company"
- A request to **install software** or let someone **control your screen remotely**
- Being asked to **pay** for help — especially with **gift cards**
- Pressure and fear: "your computer will be damaged if you hang up"`,
      questions: [
        {
          prompt:
            "A full-screen pop-up appears with a loud beep: \"VIRUS DETECTED! Call Microsoft Support now at this number.\" What should you do?",
          options: [
            "Call the number so they can remove the virus",
            "Do not call. Close the browser or restart the computer",
            "Let them connect to your computer to fix it",
          ],
          answer: 1,
          explanation:
            "Real virus warnings never give you a number to call. Close the page or restart — do not call or let anyone connect.",
        },
        {
          prompt:
            "Someone calls and says they are from Microsoft and noticed your computer is infected. The honest fact is:",
          options: [
            "Microsoft monitors home computers and calls when there's a problem",
            "Microsoft does not call people about viruses — this is a scam",
            "You should give them remote access so they can check",
          ],
          answer: 1,
          explanation:
            "Microsoft and Apple do not make unsolicited calls about viruses. Hang up.",
        },
        {
          prompt:
            "A \"tech support\" agent asks you to install a program so they can control your screen and \"fix\" it. You should:",
          options: [
            "Install it — that's how remote help works",
            "Refuse and end the call; never give a stranger control of your computer",
            "Install it only if they sound polite and professional",
          ],
          answer: 1,
          explanation:
            "Giving remote control to a stranger lets them steal your files, passwords, and money. Refuse.",
        },
        {
          prompt:
            "A tech-support caller says you must pay for the fix with gift cards. This tells you:",
          options: [
            "It's a legitimate, common way to pay for repairs",
            "It's almost certainly a scam — real companies don't take gift cards",
            "You should buy the cards but only read them half the numbers",
          ],
          answer: 1,
          explanation:
            "No real company asks for payment in gift cards. That demand alone proves it's a scam.",
        },
      ],
    },
    {
      slug: "phone-and-robocall-scams",
      title: "Phone & Robocall Scams",
      blurb: "IRS, Social Security, Medicare, and \"your grandson is in jail\" calls.",
      xp: 30,
      kind: "quiz",
      content: `# Phone & Robocall Scams

Scammers love the phone because they can **pressure you in the moment**. Common ones
pretend to be the **IRS** or tax office ("you owe money and will be arrested"),
**Social Security** ("your number has been suspended"), **Medicare** ("confirm your
number to keep your benefits"), or a panicked relative — the **"grandparent scam"**
("Grandma, I'm in jail, please send money and don't tell Mom").

These calls are built to make you **afraid or worried** so you act before you think.
A robocall is a recorded message dialing thousands of people at once; if you "press 1,"
a live scammer comes on the line. Caller ID can be **faked**, so even if it shows a
real-looking name or number, you can't trust it.

The safe habit is simple: **hang up.** Then, if you're worried it might be real, look up
the official number yourself — on a paper statement, the back of your card, or the
agency's real website — and call them directly. Real government agencies do **not**
threaten arrest over the phone, and they never ask for payment in **gift cards** or
**wire transfers**.

**Red flags to watch for:**
- A caller who **threatens arrest, fines, or losing your benefits** if you don't pay now
- Pressure to **stay on the line** and not tell anyone
- A request for payment by **gift card, wire transfer, or cash by mail**
- A "relative" in trouble who asks you to **keep it a secret** and send money fast
- Being told to **press 1** to speak to someone`,
      questions: [
        {
          prompt:
            "A caller says they're from the IRS, you owe back taxes, and police are coming unless you pay today with gift cards. You should:",
          options: [
            "Pay right away to avoid arrest",
            "Hang up — the IRS doesn't call to threaten arrest or demand gift cards",
            "Give them your Social Security number to clear it up",
          ],
          answer: 1,
          explanation:
            "The IRS contacts you by mail and never demands gift-card payment or threatens immediate arrest. Hang up.",
        },
        {
          prompt:
            "You get a call: \"Grandma, it's me — I'm in jail and need bail money. Please don't tell Mom.\" The best thing to do is:",
          options: [
            "Send the money quickly so your grandchild isn't stuck",
            "Hang up and call your grandchild or another family member directly to check",
            "Wire the money but ask them to call back later",
          ],
          answer: 1,
          explanation:
            "The grandparent scam relies on panic and secrecy. Hang up and verify by calling your family directly.",
        },
        {
          prompt:
            "Your caller ID shows \"Social Security Administration.\" Can you trust that the call is really from them?",
          options: [
            "Yes — caller ID always shows the true source",
            "No — caller ID can be faked, so verify by calling the official number yourself",
            "Yes, as long as the number has the right area code",
          ],
          answer: 1,
          explanation:
            "Scammers can fake (spoof) caller ID. Always hang up and call the agency back using a number you look up yourself.",
        },
        {
          prompt:
            "A recorded robocall tells you to \"press 1 to speak to an agent about your account.\" The safest choice is:",
          options: [
            "Press 1 to sort it out",
            "Hang up without pressing anything",
            "Press 1 but don't give any real information",
          ],
          answer: 1,
          explanation:
            "Pressing a button confirms your number is active and connects you to a scammer. Just hang up.",
        },
      ],
    },
    {
      slug: "romance-and-friendship-scams",
      title: "Romance & Friendship Scams",
      blurb: "Online sweethearts who never video-call and ask for money.",
      xp: 30,
      kind: "quiz",
      content: `# Romance & Friendship Scams

A **romance scam** starts as a friendship or a new relationship online — through a
dating site, Facebook, or even a "wrong number" text that turns chatty. The other
person seems kind, attentive, and quickly **very affectionate**. Over weeks or months
they build trust. Then, sooner or later, they ask for **money**.

The warning signs are surprisingly consistent. They **always have an excuse** not to
meet or **video-call** in person — they say they're working overseas, on an oil rig,
in the military, or a doctor abroad. They profess strong love quickly. And when a
"crisis" hits — a medical bill, a stuck shipment, a plane ticket home — they ask you
to help, often with **gift cards, wire transfers, or cryptocurrency**.

A genuine partner does not need your money, and a real connection can survive a video
call. If someone you've never met in person asks you for money, that is the moment to
**stop and talk to a trusted friend or family member** before doing anything. It is not
rude to say no.

**Red flags to watch for:**
- They **profess love very fast** but have never met you in person
- They **always have a reason** they can't video-call or meet
- A sudden **emergency** that only your money can solve
- Requests for **gift cards, wire transfers, or crypto**
- They discourage you from **telling family or friends** about them`,
      questions: [
        {
          prompt:
            "You've been chatting online with a romantic partner for two months, but they always have an excuse not to video-call. Now they ask for $2,000 for a medical emergency. You should:",
          options: [
            "Send the money — they need help and you care about them",
            "Refuse, and talk to a trusted friend or family member first",
            "Send half now and the rest after they recover",
          ],
          answer: 1,
          explanation:
            "Refusing to video-call plus an urgent money request are textbook romance-scam signs. Pause and talk to someone you trust.",
        },
        {
          prompt: "Which of these is a strong warning sign of a romance scam?",
          options: [
            "They are happy to video-call and meet your family",
            "They profess deep love quickly but always avoid meeting in person",
            "They live in the same town and you've met for coffee",
          ],
          answer: 1,
          explanation:
            "Fast, intense affection combined with never meeting in person is a hallmark of romance scams.",
        },
        {
          prompt:
            "An online sweetheart asks you to send help as gift card numbers and to keep it between the two of you. This is:",
          options: [
            "A normal, private way for couples to share money",
            "A serious red flag — gift cards and secrecy point to a scam",
            "Fine, as long as the amount is small",
          ],
          answer: 1,
          explanation:
            "Gift cards and a push for secrecy are major scam signals. Real partners don't need anonymous, untraceable payments.",
        },
      ],
    },
    {
      slug: "prize-lottery-too-good-to-be-true",
      title: "Prize, Lottery & \"Too Good to Be True\"",
      blurb: "You can't win a lottery you never entered — and never pay to collect a prize.",
      xp: 25,
      kind: "quiz",
      content: `# Prize, Lottery & "Too Good to Be True"

Few things feel as good as hearing **you've won**. Scammers know this, so they send
emails, texts, calls, and letters saying you've won a **lottery, sweepstakes, or
prize** — a car, cash, a cruise, or a gift card. It feels exciting, and that
excitement is the trap.

Here's the key rule: **you cannot win a lottery or sweepstakes you never entered.**
And no legitimate prize ever requires you to **pay money to receive it.** If someone
says you must first pay "taxes," "fees," "shipping," or "insurance" before they
release your winnings, it is a scam — every time. Real prizes don't work that way.

Another common trick is the **fake check**. They send you a check, tell you to deposit
it and **wire part of it back** or buy gift cards. Days later the check bounces, the
money is gone, and you're on the hook. If an offer feels **too good to be true**, it is.

**Red flags to watch for:**
- You "won" a contest, lottery, or prize **you never entered**
- You must **pay a fee or taxes up front** to collect your winnings
- You're asked to **wire money back** or buy **gift cards** to claim a prize
- A check you're told to **deposit and send part back**
- Pressure to **act fast** before the prize "expires"`,
      questions: [
        {
          prompt:
            "You get a letter: \"Congratulations! You've won $50,000 in our lottery. Just send $300 to cover taxes and fees to release your prize.\" This is:",
          options: [
            "A real prize — taxes are normal on big winnings",
            "A scam — you never pay a fee to receive a legitimate prize",
            "Worth it, since $300 is small compared to $50,000",
          ],
          answer: 1,
          explanation:
            "Real prizes never require an up-front payment. Asking you to pay to collect is a sure sign of a scam.",
        },
        {
          prompt:
            "An email says you won an international lottery. You don't remember entering one. The most likely truth is:",
          options: [
            "You probably entered and forgot",
            "It's a scam — you can't win a lottery you never entered",
            "A friend entered you, so it's real",
          ],
          answer: 1,
          explanation:
            "If you never bought a ticket or entered, there is no real win. Delete it.",
        },
        {
          prompt:
            "Someone sends you a check, says you've won, and asks you to deposit it and wire part of it back. You should:",
          options: [
            "Deposit it and wire the money — you get to keep the rest",
            "Refuse — fake-check scams leave you owing the bank when the check bounces",
            "Deposit it and wait a day before wiring",
          ],
          answer: 1,
          explanation:
            "This is the classic fake-check scam. The check later bounces, and any money you sent is gone for good.",
        },
      ],
    },
    {
      slug: "protect-your-money-and-accounts",
      title: "Protect Your Money & Accounts",
      blurb: "Strong passwords, verification codes you never share, and the gift-card rule.",
      xp: 35,
      kind: "quiz",
      content: `# Protect Your Money & Accounts

A few simple habits stop most scams before they start. The first is a **strong,
unique password** for important accounts (your email and your bank especially). A good
password is **long** and not easy to guess — avoid your name, birthday, or "123456."
Don't reuse the same password everywhere, so that one leak doesn't unlock everything.

Many accounts offer **two-factor authentication** — after your password, they text or
show you a short **verification code** to type in. This adds a strong layer of safety.
The golden rule: **never share that code with anyone.** No real bank, company, or
"support agent" will ever ask you to read them your code. Anyone who does is trying to
break into your account.

Finally, remember how scammers like to be paid. **Gift cards, wire transfers, and
cryptocurrency** are favorites because they're hard to trace and nearly impossible to
get back. If anyone — a "company," a "government office," a "love interest," or "tech
support" — insists on those, stop. And whenever you feel **rushed or pressured**, that
pressure itself is the warning sign. Slow down and check with someone you trust.

**Red flags to watch for:**
- Anyone asking you to **read out a verification code** sent to your phone
- Being told to pay with **gift cards, a wire transfer, or cryptocurrency**
- A demand to **act immediately** with no time to think
- Reusing one simple password across your bank, email, and shopping accounts
- Being told to **keep a payment secret** from your family or bank`,
      questions: [
        {
          prompt:
            "A caller says, \"To verify your identity, I just texted you a 6-digit code — please read it back to me.\" You should:",
          options: [
            "Read the code so they can confirm it's you",
            "Refuse — never share a verification code with anyone",
            "Read only the first three digits to be safe",
          ],
          answer: 1,
          explanation:
            "A verification code is meant only for you. Anyone asking you to read it back is trying to take over your account.",
        },
        {
          prompt: "Which of these makes the strongest, safest password?",
          options: [
            "Your first name and birth year, like Mary1948",
            "A long, unique phrase you don't use anywhere else",
            "123456, because it's easy to remember",
          ],
          answer: 1,
          explanation:
            "Long, unique passwords are far harder to guess or crack, and not reusing them protects your other accounts.",
        },
        {
          prompt:
            "Almost any time a stranger insists you pay with gift cards, it means:",
          options: [
            "They offer a discount for gift cards",
            "It's a scam — gift cards are untraceable and a favorite of fraudsters",
            "It's just an easy, modern way to pay",
          ],
          answer: 1,
          explanation:
            "Legitimate businesses and agencies don't demand gift cards. That request is one of the clearest scam signals.",
        },
        {
          prompt:
            "Someone pressures you to act \"right now\" or lose your money. The pressure itself is:",
          options: [
            "A sign they are trying to help you quickly",
            "A warning sign — slow down and check with someone you trust",
            "Normal for important financial matters",
          ],
          answer: 1,
          explanation:
            "Urgency is a manipulation tactic. Real institutions give you time; scammers don't want you to stop and think.",
        },
      ],
    },
    {
      slug: "spot-the-scam",
      title: "Spot the Scam",
      blurb: "A mixed review — put everything you've learned into practice.",
      xp: 40,
      kind: "quiz",
      content: `# Spot the Scam

You've learned the most common tricks: **phishing emails**, **scam texts**,
**tech-support pop-ups**, **threatening phone calls**, **romance scams**, and
**too-good-to-be-true prizes**. The patterns repeat, which means once you know them,
you can spot them.

Across all of these, the same few habits keep you safe. **Slow down** — scammers need
you to rush. **Don't click links or call numbers** that come to you unexpectedly;
reach companies yourself using a number or website you already trust. **Never share
passwords or verification codes.** And **never pay with gift cards, wire transfers, or
cryptocurrency** to someone who pressures you.

This last lesson is a mixed review. Read each short scenario and choose the safest
response. When in doubt, the safe answer is almost always: **stop, don't pay, and
check with someone you trust.**

**Quick reminders:**
- Unexpected message with a **link** → don't tap it
- **Urgency, threats, or secrecy** → a major red flag
- A request for **gift cards / wire / crypto** → it's a scam
- A code texted to your phone → **never read it to anyone**
- Verify by contacting the company or agency **yourself**`,
      questions: [
        {
          prompt:
            "EMAIL: \"Dear Customer, your Amazon account is on hold. Click here within 24 hours to verify your payment or it will be closed.\" What is this?",
          options: [
            "A normal account notice — better click to be safe",
            "A phishing email — don't click; check your account by typing Amazon's address yourself",
            "A friendly reminder from Amazon",
          ],
          answer: 1,
          explanation:
            "Generic greeting, urgency, and a verify link are phishing signs. Visit the site yourself instead of clicking.",
        },
        {
          prompt:
            "PHONE: A recorded voice says your Social Security number is suspended and you must \"press 1\" immediately. You should:",
          options: [
            "Press 1 to fix it before it's too late",
            "Hang up — Social Security doesn't suspend numbers or make threats like this",
            "Press 1 and give your number to confirm",
          ],
          answer: 1,
          explanation:
            "This is a robocall scam. Social Security numbers aren't 'suspended,' and pressing 1 connects you to a scammer.",
        },
        {
          prompt:
            "TEXT: From an unknown number — \"Your FedEx package needs a $2.99 redelivery fee. Pay here: [link]\" You're not expecting a package. You should:",
          options: [
            "Pay the small fee through the link",
            "Delete it — don't tap unexpected links; check the carrier's official app if unsure",
            "Reply STOP and then tap the link",
          ],
          answer: 1,
          explanation:
            "Carriers don't text random fee links. Delete it, and verify any real delivery through the official app.",
        },
        {
          prompt:
            "ONLINE: A new online partner you've never met says they love you and asks for gift cards to fix a sudden emergency. You should:",
          options: [
            "Buy the gift cards to help someone you love",
            "Refuse and talk to a trusted friend or family member — this is a romance scam",
            "Send one card now and decide about the rest later",
          ],
          answer: 1,
          explanation:
            "Never-met partner plus gift-card emergency is a classic romance scam. Pause and get a second opinion.",
        },
        {
          prompt:
            "POP-UP: Your screen fills with \"VIRUS DETECTED — call Apple Support now\" and a loud beep. The safest action is:",
          options: [
            "Call the number so Apple can remove the virus",
            "Don't call. Close the browser or restart the computer",
            "Let the support agent connect to your computer remotely",
          ],
          answer: 1,
          explanation:
            "Real virus alerts never give a support number. Close the page or restart — never call or grant remote access.",
        },
      ],
    },
  ],
};
