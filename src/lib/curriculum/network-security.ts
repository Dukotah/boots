import type { Module } from "./types";

// Network Security 101 — conceptual, quiz-based intro to how data moves and how
// networks are defended: packets/ports, firewalls, VPNs & encryption in transit,
// public-Wi-Fi risk, and defense in depth. Plain language, no tooling required.
export const networkSecurity: Module = {
  slug: "network-security",
  title: "Network Security 101",
  description:
    "How data travels and how networks stay safe: packets and ports, firewalls, VPNs and encryption in transit, public Wi-Fi risks, and layered defense.",
  emoji: "🌐",
  gradient: "from-cyan-500/20 to-blue-600/10",
  tagline:
    "Learn network security basics: ports and firewalls, VPNs, encryption in transit, public Wi-Fi safety, and defense in depth.",
  keywords: [
    "network security basics",
    "what is a firewall",
    "what is a vpn",
    "ports explained",
    "public wifi safety",
  ],
  free: true,
  lessons: [
    {
      slug: "packets-and-ports",
      title: "Packets, IPs & Ports",
      blurb: "How a message finds the right machine — and the right app.",
      xp: 25,
      kind: "quiz",
      content: `# Packets, IPs & Ports

Data crossing a network is broken into small **packets**. Each packet is
addressed using an **IP address** — like the street address of a machine — so the
network knows *which device* to deliver it to.

But a single device runs many programs at once. **Ports** are numbered doorways
(0–65535) that say *which program* on that device should get the packet. Some
ports are well-known by convention:
- **443** — HTTPS (secure web)
- **80** — HTTP (plain web)
- **22** — SSH (secure remote login)

So an address like \`93.184.216.34:443\` means "the web server on that machine."
Closing ports you don't use shrinks your attack surface — fewer open doors.

**Things to remember:**
- An **IP address** identifies the **device**; a **port** identifies the **program**
- **443 = HTTPS**, **80 = HTTP**, **22 = SSH**
- **Close unused ports** to reduce the ways in`,
      questions: [
        {
          prompt: "An IP address identifies the device. What does a port number identify?",
          options: [
            "The country the device is in",
            "Which program/service on that device should handle the traffic",
            "The speed of the connection",
          ],
          answer: 1,
          explanation:
            "Ports route a packet to the right application on a machine — web server, SSH, mail, and so on.",
        },
        {
          prompt: "Traffic to port 443 is conventionally:",
          options: ["Plain HTTP", "Secure HTTPS web traffic", "Email only"],
          answer: 1,
          explanation:
            "443 is the well-known port for HTTPS. Plain HTTP uses 80; SSH uses 22.",
        },
        {
          prompt: "Why does closing unused ports improve security?",
          options: [
            "It makes the internet faster",
            "Each open port is a possible entry point — fewer open ports means a smaller attack surface",
            "It increases storage space",
          ],
          answer: 1,
          explanation:
            "Open ports expose services that could be attacked. Closing the ones you don't need removes those doors.",
        },
      ],
    },
    {
      slug: "firewalls",
      title: "Firewalls",
      blurb: "A gatekeeper that decides which traffic gets through.",
      xp: 25,
      kind: "quiz",
      content: `# Firewalls

A **firewall** sits between a network (or a device) and the outside world and
**allows or blocks** traffic based on rules — by port, address, or direction. It's
the gatekeeper deciding what's allowed in and out.

The safest rule style is **default-deny**: block everything, then explicitly
allow only what's needed (e.g. "allow inbound 443 to the web server, deny the
rest"). That's the network version of the allowlist idea from web security.

Firewalls aren't a complete defense — they don't stop a user from clicking a
phishing link or an attacker from abusing an *allowed* service. They're **one
layer**, best combined with others.

**Things to remember:**
- A firewall **allows or blocks** traffic by rules (port, address, direction)
- **Default-deny** (block all, allow only what's needed) is safest
- A firewall is **one layer**, not a complete defense`,
      questions: [
        {
          prompt: "A firewall's main job is to:",
          options: [
            "Speed up downloads",
            "Allow or block network traffic according to rules",
            "Store your passwords",
          ],
          answer: 1,
          explanation:
            "Firewalls filter traffic — permitting or denying it based on configured rules.",
        },
        {
          prompt: "The safest firewall posture is:",
          options: [
            "Allow everything, then block problems as they appear",
            "Default-deny: block all traffic, then allow only what's explicitly needed",
            "Turn the firewall off for convenience",
          ],
          answer: 1,
          explanation:
            "Default-deny minimizes exposure — you open only the specific traffic you require, like an allowlist.",
        },
        {
          prompt: "Which is true about firewalls?",
          options: [
            "They block all possible attacks on their own",
            "They're one layer of defense and don't stop phishing or abuse of allowed services",
            "They make antivirus unnecessary",
          ],
          answer: 1,
          explanation:
            "A firewall is valuable but partial. It can't stop a user clicking a malicious link or misuse of a permitted service.",
        },
      ],
    },
    {
      slug: "encryption-in-transit",
      title: "Encryption in Transit & VPNs",
      blurb: "Scramble data on the wire so snoops get gibberish.",
      xp: 30,
      kind: "quiz",
      content: `# Encryption in Transit & VPNs

When data travels a network, anyone positioned along the path could try to read
it. **Encryption in transit** (like HTTPS/TLS) scrambles it so eavesdroppers see
only gibberish, and detects tampering. This is *in transit* — separate from
**encryption at rest**, which protects data **stored** on a disk.

A **VPN** (Virtual Private Network) builds an encrypted tunnel from your device to
a VPN server, so your local network and ISP can't see *what* sites you reach
(they just see traffic to the VPN). It's useful on untrusted networks — but a VPN
is **not** anonymity or magic safety: the VPN provider can see your traffic, and
you still need HTTPS, good passwords, and the rest.

**Things to remember:**
- **In transit** (TLS/HTTPS) protects data **moving**; **at rest** protects data **stored**
- A **VPN** encrypts the tunnel from your device to its server
- A VPN is **not** full anonymity — the provider sees your traffic, and other defenses still matter`,
      questions: [
        {
          prompt: "'Encryption in transit' protects data that is:",
          options: [
            "Stored on a hard drive",
            "Moving across a network between two points",
            "Printed on paper",
          ],
          answer: 1,
          explanation:
            "In-transit encryption (like TLS) protects data while it travels. Data sitting on disk is protected by encryption at rest.",
        },
        {
          prompt: "What does a VPN actually do?",
          options: [
            "Makes you completely anonymous and immune to all attacks",
            "Creates an encrypted tunnel to a VPN server, hiding your traffic from the local network/ISP",
            "Replaces the need for HTTPS and passwords",
          ],
          answer: 1,
          explanation:
            "A VPN encrypts the link to its server. It's not total anonymity — the provider sees your traffic and other defenses still apply.",
        },
        {
          prompt: "Encryption 'at rest' refers to protecting:",
          options: [
            "Data stored on a device or in a database",
            "Data while it's being typed",
            "Data traveling over Wi-Fi",
          ],
          answer: 0,
          explanation:
            "At-rest encryption secures stored data, so a stolen disk or database dump isn't readable without the key.",
        },
      ],
    },
    {
      slug: "public-wifi",
      title: "Public Wi-Fi Risks",
      blurb: "Free coffee-shop Wi-Fi isn't a private connection.",
      xp: 25,
      kind: "quiz",
      content: `# Public Wi-Fi Risks

Open public Wi-Fi (cafés, airports, hotels) is shared and often unencrypted.
Risks include someone on the same network **snooping** unencrypted traffic, and
**"evil twin"** hotspots — a fake network named like the real one to lure you in.

The good news: modern **HTTPS** already encrypts your traffic site-by-site, so
logins to a proper HTTPS site are protected even on open Wi-Fi. To stay safe:
- Stick to **HTTPS** sites (look for the padlock)
- Be wary of a network asking you to **install software** or a "certificate"
- Use a **VPN** on untrusted networks for an extra encrypted layer
- Don't pick a hotspot just because the name *looks* official

**Things to remember:**
- Public Wi-Fi is **shared and often unencrypted** — assume others can be watching
- **HTTPS** protects each site; a **VPN** adds a network-wide encrypted layer
- Beware **"evil twin"** hotspots and prompts to install anything`,
      questions: [
        {
          prompt: "On open public Wi-Fi, your logins to a normal website are:",
          options: [
            "Always exposed, no matter what",
            "Protected if the site uses HTTPS (the padlock), which encrypts that traffic",
            "Only safe if you whisper your password",
          ],
          answer: 1,
          explanation:
            "HTTPS encrypts traffic per-site, so HTTPS logins stay protected even on open Wi-Fi. Plain HTTP would not be.",
        },
        {
          prompt: "An 'evil twin' Wi-Fi attack is:",
          options: [
            "Two routers in one building",
            "A fake hotspot named to look like the real one, to lure you into connecting",
            "A router that's twice as fast",
          ],
          answer: 1,
          explanation:
            "Attackers stand up a lookalike network hoping you connect, so they can intercept or manipulate traffic.",
        },
        {
          prompt: "A reasonable extra precaution on untrusted networks is to:",
          options: [
            "Install whatever software the network pops up",
            "Use a VPN to add an encrypted tunnel, and stick to HTTPS",
            "Turn off the padlock to load pages faster",
          ],
          answer: 1,
          explanation:
            "A VPN plus HTTPS gives layered protection. Never install software a network prompts you to add.",
        },
      ],
    },
    {
      slug: "defense-in-depth",
      title: "Defense in Depth",
      blurb: "No single wall is enough — stack your defenses.",
      xp: 30,
      kind: "quiz",
      content: `# Defense in Depth

The big idea that ties network security together is **defense in depth**: never
rely on one protection. Stack multiple, independent layers so that if one fails,
others still stand. A firewall *and* encryption *and* strong auth *and* patched
software *and* trained users.

Two partner ideas:
- **Least privilege** — give each user, service, and device only the access it
  truly needs, so a compromise can't reach everything.
- **Assume breach** — design as if an attacker *will* get in somewhere, so you
  contain the blast radius (segment networks, monitor, keep backups).

A **DDoS** (Distributed Denial of Service) attack floods a service with junk
traffic to knock it offline; defenses (rate limiting, filtering, scrubbing
services) are themselves just more layers.

**Things to remember:**
- **Defense in depth** = multiple independent layers, so one failure isn't fatal
- **Least privilege** + **assume breach** limit how far an attacker can get
- Security is **layered and ongoing**, never a single switch you flip`,
      questions: [
        {
          prompt: "'Defense in depth' means:",
          options: [
            "Buying the single best security product",
            "Stacking multiple independent layers so one failure doesn't mean total compromise",
            "Hiding the server in a deep basement",
          ],
          answer: 1,
          explanation:
            "Layered, independent defenses ensure that if one control fails, others still protect the system.",
        },
        {
          prompt: "The principle of 'least privilege' says to:",
          options: [
            "Give everyone admin so nothing is blocked",
            "Grant each user/service only the access it genuinely needs",
            "Remove all access from everyone",
          ],
          answer: 1,
          explanation:
            "Least privilege limits the damage of any one compromised account or service by minimizing its reach.",
        },
        {
          prompt: "A DDoS attack tries to:",
          options: [
            "Steal passwords quietly",
            "Overwhelm a service with junk traffic so it can't serve real users",
            "Encrypt your files for ransom",
          ],
          answer: 1,
          explanation:
            "Distributed Denial of Service floods a target to exhaust its capacity and take it offline.",
        },
      ],
    },
  ],
};
