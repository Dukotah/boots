import type { Module } from "./types";

// How the Internet Works (for Kids) — a friendly, quiz-based explainer. No code;
// just clear pictures-in-words of networks, browsers/servers, addresses, and how
// a webpage actually gets to your screen. Aimed at curious kids and beginners.
export const internetForKids: Module = {
  slug: "internet-for-kids",
  title: "How the Internet Works (for Kids) 🌍",
  emoji: "🌍",
  gradient: "from-sky-400/20 to-blue-500/10",
  description:
    "Ever wonder how a video gets to your screen? 🌍 This friendly course explains the internet in simple words — computers talking, messages in pieces, and how a webpage arrives.",
  tagline:
    "A kid-friendly guide to how the internet works: networks, browsers and servers, addresses, and how a webpage gets to your screen.",
  keywords: [
    "how the internet works for kids",
    "internet explained for kids",
    "what is a server",
    "how websites work",
    "kids tech course",
  ],
  free: true,
  lessons: [
    {
      slug: "what-is-the-internet",
      title: "What Is the Internet? 🌍",
      blurb: "It's a giant group of computers all connected together.",
      xp: 20,
      kind: "quiz",
      content: `# What Is the Internet? 🌍

The **internet** is a huge number of computers all over the world, connected so
they can **send messages to each other**. Think of it like the world's biggest
group of friends passing notes — except the notes are pictures, videos, games,
and messages, and they travel almost instantly.

No single person owns the whole internet. It's made of millions of computers and
cables (and wireless signals) that agree to share information using the same
**rules** so they can understand each other.

When you watch a video or play an online game, your device is talking to another
computer somewhere else in the world — sometimes very far away!

**Things to remember:**
- The internet is **lots of computers connected together**
- They **send messages** to each other using shared rules
- **No one** owns the whole internet`,
      questions: [
        {
          prompt: "The internet is best described as:",
          options: [
            "One giant computer in space",
            "Many computers around the world connected so they can share messages",
            "A single website",
          ],
          answer: 1,
          explanation:
            "The internet is a worldwide network of connected computers sharing information — not one machine or one site.",
        },
        {
          prompt: "Who owns the entire internet?",
          options: ["One big company", "The government of one country", "No single person or group owns all of it"],
          answer: 2,
          explanation:
            "The internet is made of millions of connected computers and networks. Nobody owns the whole thing.",
        },
        {
          prompt: "When you watch a video online, your device is:",
          options: [
            "Making the video up by itself",
            "Getting the video from another computer somewhere else",
            "Drawing the video with a pencil",
          ],
          answer: 1,
          explanation:
            "Your device requests the video from another computer (a server) and it travels to you over the internet.",
        },
      ],
    },
    {
      slug: "browsers-and-servers",
      title: "Browsers & Servers 🧭",
      blurb: "One computer asks, another computer answers.",
      xp: 20,
      kind: "quiz",
      content: `# Browsers & Servers 🧭

When you visit a website, two computers do a little dance:

- Your **browser** (like Chrome, Safari, or Firefox) is the **asker**. It sends a
  **request**: "Please send me this page!"
- A **server** is a powerful computer that's always on, waiting to **answer**. It
  sends back the page: the words, pictures, and everything else.

This is called **request and response** — your browser asks, the server answers.
It happens every single time you open a page, click a link, or load a game.

So a server isn't scary or magic — it's just a computer whose job is to wait for
requests and send back the right stuff.

**Things to remember:**
- A **browser** is the program that *asks* for web pages
- A **server** is a computer that *answers* with the page
- This back-and-forth is called **request and response**`,
      questions: [
        {
          prompt: "What is a web browser's main job?",
          options: [
            "To store all the world's websites",
            "To ask for web pages and show them to you",
            "To make your computer faster",
          ],
          answer: 1,
          explanation:
            "A browser is the 'asker' — it requests pages and displays them. Chrome, Safari, and Firefox are browsers.",
        },
        {
          prompt: "A 'server' is:",
          options: [
            "A computer that waits for requests and sends back pages",
            "A waiter at a restaurant",
            "The screen you look at",
          ],
          answer: 0,
          explanation:
            "A server is a computer that answers requests by sending back web pages and other data.",
        },
        {
          prompt: "The back-and-forth where your browser asks and the server answers is called:",
          options: ["Up and down", "Request and response", "Stop and go"],
          answer: 1,
          explanation:
            "Browser asks (request), server answers (response). That pattern repeats every time you load something.",
        },
      ],
    },
    {
      slug: "messages-in-pieces",
      title: "Messages Travel in Pieces 📦",
      blurb: "Big things are split into tiny packets and rebuilt at the end.",
      xp: 25,
      kind: "quiz",
      content: `# Messages Travel in Pieces 📦

Here's a cool secret: when something big — like a photo or video — travels across
the internet, it doesn't go all at once. It gets chopped into lots of tiny pieces
called **packets**.

Each packet zips across the internet on its own, maybe taking different paths,
like a bunch of friends all heading to the same party using different streets.
When all the packets arrive at your device, they get **put back together** in the
right order, and *poof* — you see the whole picture.

This is clever because if one little packet gets lost, the internet can just send
that one piece again, instead of starting the whole thing over.

**Things to remember:**
- Big messages are split into small **packets**
- Packets travel separately and are **reassembled** at the end
- If one packet is lost, only **that piece** needs resending`,
      questions: [
        {
          prompt: "When a big photo travels over the internet, it:",
          options: [
            "Goes all in one giant piece",
            "Gets split into small packets that travel and are put back together",
            "Gets emailed to everyone first",
          ],
          answer: 1,
          explanation:
            "Data is broken into packets that travel separately and are reassembled in order when they arrive.",
        },
        {
          prompt: "Why is sending data in packets a smart idea?",
          options: [
            "It uses more electricity",
            "If one packet is lost, only that small piece needs to be sent again",
            "It makes the photo bigger",
          ],
          answer: 1,
          explanation:
            "Splitting into packets means a single lost piece can be resent on its own — no need to restart the whole transfer.",
        },
        {
          prompt: "When all the packets reach your device, they are:",
          options: ["Thrown away", "Put back together in the right order", "Left as a jumble"],
          answer: 1,
          explanation:
            "Your device reassembles the packets in order to rebuild the original photo, video, or message.",
        },
      ],
    },
    {
      slug: "web-addresses",
      title: "Web Addresses 🏠",
      blurb: "Every website has an address, like every house on a street.",
      xp: 25,
      kind: "quiz",
      content: `# Web Addresses 🏠

How does your browser find the *right* computer out of millions? Every device on
the internet has an **address** — a bit like how every house has a street address
so mail can find it. For computers, this is called an **IP address** (a string of
numbers).

But numbers are hard to remember, so we also use **website names** like
\`example.com\`. When you type a name, the internet looks up the matching number
address for you — like looking up a friend's house in a contact list instead of
memorizing their street and number.

The web address you type at the top of the browser is called a **URL**. It tells
the browser exactly which page you want.

**Things to remember:**
- Every device has an **IP address** (a number address), like a house address
- Friendly **names** like \`example.com\` get looked up to find the number
- The address bar holds a **URL** — the web address of the page`,
      questions: [
        {
          prompt: "An IP address is like:",
          options: [
            "A house's street address, so messages can find the right computer",
            "A secret password",
            "The color of a website",
          ],
          answer: 0,
          explanation:
            "An IP address identifies a device on the internet, much like a street address identifies a house.",
        },
        {
          prompt: "Why do we use names like 'example.com' instead of just numbers?",
          options: [
            "Numbers don't work on the internet",
            "Names are much easier for people to remember; the internet looks up the number for us",
            "Names make the internet faster",
          ],
          answer: 1,
          explanation:
            "Friendly names are easy to remember. Behind the scenes, they're looked up and matched to the numeric IP address.",
        },
        {
          prompt: "The web address you type in the bar at the top of the browser is called a:",
          options: ["URL", "USB", "CPU"],
          answer: 0,
          explanation:
            "A URL is the full web address that tells the browser which page to fetch.",
        },
      ],
    },
    {
      slug: "wifi-and-cables",
      title: "Wi-Fi & Cables 📶",
      blurb: "How your device actually connects to the internet.",
      xp: 25,
      kind: "quiz",
      content: `# Wi-Fi & Cables 📶

How does the internet actually *reach* your device? Two main ways:

- **Cables** — real wires (even giant cables under the ocean!) carry internet
  signals between cities and countries. A wire can plug straight into a computer
  too.
- **Wi-Fi** — invisible radio waves that carry the signal a short distance, from
  a box called a **router** to your phone, tablet, or laptop without any wire.

Your home router is like a little post office: the internet arrives (often by
cable), and the router shares it out over Wi-Fi to all your devices. Phones away
from home use **cell towers** instead, which work in a similar wireless way.

So even "wireless" internet is mostly wires for the long-distance part — the Wi-Fi
is just the last little hop to your device.

**Things to remember:**
- The internet travels long distances mostly through **cables** (even undersea!)
- **Wi-Fi** uses radio waves for the short hop from a **router** to your device
- Phones can also connect through **cell towers**`,
      questions: [
        {
          prompt: "Most long-distance internet between cities and countries travels through:",
          options: ["Wi-Fi only", "Cables, including big ones under the ocean", "Magic"],
          answer: 1,
          explanation:
            "Long-distance internet runs largely over cables — including massive undersea cables linking continents.",
        },
        {
          prompt: "Wi-Fi connects your device using:",
          options: ["A wire to the router", "Invisible radio waves from a router", "Sunlight"],
          answer: 1,
          explanation:
            "Wi-Fi uses radio waves to carry the signal wirelessly from the router to your device over a short distance.",
        },
        {
          prompt: "A home router is a bit like:",
          options: [
            "A little post office that shares the internet out to your devices",
            "A TV remote",
            "A type of game",
          ],
          answer: 0,
          explanation:
            "The router takes the incoming internet and shares it out (often over Wi-Fi) to all the devices in your home.",
        },
      ],
    },
  ],
};
