import type { Module } from "./types";

// Docker — a conceptual / CLI topic. The in-browser Worker has no Docker daemon,
// shell, or container runtime, so the prose teaches real Docker (images,
// Dockerfiles, the CLI, Compose) while every gradeable task is a pure-JS function
// that *models* the underlying logic — Dockerfile layering, image-ref parsing,
// port maps, Compose config merging — that we can assert on deterministically.
export const docker: Module = {
  slug: "docker",
  title: "Docker",
  description:
    "Package any app — and everything it needs — into a portable container that runs the same everywhere. Learn images, Dockerfiles, the CLI, volumes, and Compose, with the core logic modelled in hands-on, auto-graded exercises.",
  emoji: "🐳",
  gradient: "from-sky-500/20 to-blue-600/10",
  language: "js",
  tagline:
    "Learn Docker: containers vs images, writing a Dockerfile, building & tagging, port mapping, volumes, Docker Compose, and networking — explained clearly with auto-graded exercises.",
  keywords: ["learn docker", "docker tutorial", "dockerfile", "docker compose", "containers"],
  lessons: [
    {
      slug: "what-is-a-container",
      title: "What is a Container?",
      blurb: "Isolated, portable boxes that bundle an app with its dependencies.",
      xp: 25,
      kind: "quiz",
      content: `# What is a Container?

A **container** is a lightweight, isolated box that bundles an application
*together with everything it needs to run* — code, runtime, system libraries, and
settings. Because the box carries its own dependencies, it runs the same on your
laptop, a teammate's machine, and a production server. This is the cure for
"well, it works on **my** machine."

\`\`\`bash
# Run a whole Linux app in one command — no manual setup
docker run nginx
\`\`\`

**Containers vs virtual machines.** A VM virtualises an entire operating system —
each VM ships its own guest OS kernel, so it's heavy (gigabytes) and slow to boot.
A container instead *shares the host's kernel* and isolates only the process and
its filesystem. That makes containers tiny (megabytes) and near-instant to start,
so you can run dozens of them where you'd fit only a couple of VMs.

**Why teams love them:**
- **Consistency** — the same image runs identically everywhere.
- **Isolation** — one container's processes, files, and network are walled off
  from the others.
- **Density & speed** — they share the host kernel, so they're cheap to spin up
  and tear down.

A container is a *running instance*; the read-only template it starts from is
called an **image** — which is the next lesson.`,
      questions: [
        {
          prompt: "What problem do containers most directly solve?",
          options: [
            "Making a website's CSS load faster",
            "\"It works on my machine\" — by bundling the app with all its dependencies so it runs the same everywhere",
            "Automatically writing unit tests for your code",
            "Encrypting data at rest in a database",
          ],
          answer: 1,
          explanation:
            "A container packages the app together with its runtime, libraries, and settings, so the exact same environment runs on every machine — eliminating environment-drift bugs.",
        },
        {
          prompt: "How does a container differ from a full virtual machine?",
          options: [
            "A container ships its own guest operating-system kernel, just like a VM",
            "A container shares the host's kernel and isolates only the process and its filesystem, making it far lighter than a VM",
            "A container can only run on Windows, while a VM runs anywhere",
            "There is no difference — the terms are interchangeable",
          ],
          answer: 1,
          explanation:
            "VMs virtualise an entire OS (their own kernel, gigabytes in size). Containers share the host kernel and isolate just the process, so they're megabytes in size and start almost instantly.",
        },
        {
          prompt: "Which statement about containers is TRUE?",
          options: [
            "Each container needs several gigabytes and minutes to boot, like a VM",
            "Containers are isolated from each other and quick to start because they share the host kernel",
            "Containers can never be moved between machines",
            "A container must run a full desktop environment to work",
          ],
          answer: 1,
          explanation:
            "Containers isolate each app's processes, filesystem, and network, yet stay lightweight and fast because they share the host's kernel rather than booting a whole OS.",
        },
      ],
    },
    {
      slug: "images-vs-containers",
      title: "Images vs Containers",
      blurb: "The read-only template versus the running instance.",
      xp: 25,
      kind: "quiz",
      content: `# Images vs Containers

This is the distinction everything else in Docker builds on.

- An **image** is a read-only *template*: a snapshot of a filesystem plus the
  metadata for how to start it (the default command, environment variables, ports).
  Images are built once and shared (e.g. on Docker Hub).
- A **container** is a *running instance* of an image — like an object created from
  a class, or a process started from a program file.

\`\`\`bash
docker pull node:20        # download an image
docker run node:20 node -v # start a CONTAINER from that image
docker run node:20 node -v # start ANOTHER, fully independent container
\`\`\`

One image can spawn **many** containers, each with its own isolated, writable
layer on top of the shared read-only image. Changes a container makes to its
filesystem live only in that thin writable layer; delete the container and those
changes vanish (unless you used a volume — a later lesson). The underlying image
is never modified.

A useful analogy:

| Programming | Docker     |
|-------------|------------|
| Class       | Image      |
| Object      | Container  |

So "build/pull" produces an **image**; "run" produces a **container**.`,
      questions: [
        {
          prompt: "Which best describes the relationship between an image and a container?",
          options: [
            "An image is the running process; a container is the file on disk",
            "An image is a read-only template; a container is a running instance created from that image",
            "They are two names for the exact same thing",
            "A container is built once and shared; an image is created fresh every run",
          ],
          answer: 1,
          explanation:
            "The image is the immutable template (like a class or a program file). A container is a live, running instance of it (like an object or a process).",
        },
        {
          prompt: "You run `docker run nginx` three times. What happens?",
          options: [
            "The single nginx image is modified three times",
            "Three independent containers are created from the same read-only image, each with its own writable layer",
            "It errors, because an image can only produce one container",
            "Three new images are built from scratch",
          ],
          answer: 1,
          explanation:
            "One image can spawn many containers. Each container gets its own isolated writable layer on top of the shared, never-modified image.",
        },
        {
          prompt: "A running container writes a file, then is deleted. What happens to that file by default?",
          options: [
            "It is permanently saved back into the image",
            "It is lost — the change lived only in the container's writable layer, not the image",
            "It is copied to every other container automatically",
            "It is uploaded to Docker Hub",
          ],
          answer: 1,
          explanation:
            "Writes go to the container's thin writable layer, which is discarded when the container is removed. The base image stays unchanged. To persist data you use a volume.",
        },
      ],
    },
    {
      slug: "writing-a-dockerfile",
      title: "Writing a Dockerfile",
      howToTitle: "write a Dockerfile",
      blurb: "Stack instructions into layers that build an image.",
      xp: 45,
      content: `# Writing a Dockerfile

A **Dockerfile** is a recipe for building an image. Each instruction is applied
*in order*, and most add a new **layer** on top of the previous one.

\`\`\`dockerfile
FROM node:20            # base image to build on
WORKDIR /app            # set the working directory
COPY package.json .     # copy files in
RUN npm install         # run a build step
ENV NODE_ENV production # set an environment variable
EXPOSE 3000             # document the port
CMD ["node", "server.js"]  # the default command when a container starts
\`\`\`

The key mental model: instructions are processed **top to bottom**, and for
settings like \`WORKDIR\`, \`ENV\`, and \`CMD\`, a *later* instruction **overrides** an
earlier one. If you set \`WORKDIR /app\` and then later \`WORKDIR /src\`, the image's
final working directory is \`/src\`. \`ENV\` keys accumulate, but setting the same key
twice keeps the last value. The final \`CMD\` wins.

We can model exactly this layering: fold a list of instructions into the final
image configuration.

## Your task
Write \`buildImage(instructions)\` where \`instructions\` is an array of objects like
\`{ instruction: "WORKDIR", value: "/app" }\`. Process them **in order** and return
the resolved config object:

\`\`\`js
{ workdir, env, cmd }
\`\`\`

- \`workdir\` — the value of the **last** \`WORKDIR\` instruction (default \`"/"\`).
- \`env\` — an object of all \`ENV\` keys. Each \`ENV\` value is a \`"KEY=VALUE"\` string;
  a later \`ENV\` for the same key overrides the earlier one.
- \`cmd\` — the value of the **last** \`CMD\` instruction (default \`null\`).

Ignore any other instruction types (like \`FROM\` or \`RUN\`).`,
      starterCode: `function buildImage(instructions) {
  // fold the instructions in order into { workdir, env, cmd }
}
`,
      solution: `function buildImage(instructions) {
  const config = { workdir: "/", env: {}, cmd: null };
  for (const { instruction, value } of instructions) {
    if (instruction === "WORKDIR") {
      config.workdir = value;
    } else if (instruction === "ENV") {
      const eq = value.indexOf("=");
      const key = value.slice(0, eq);
      const val = value.slice(eq + 1);
      config.env[key] = val;
    } else if (instruction === "CMD") {
      config.cmd = value;
    }
  }
  return config;
}`,
      tests: [
        {
          name: "resolves the last WORKDIR and CMD",
          code: `const out = buildImage([
  { instruction: "FROM", value: "node:20" },
  { instruction: "WORKDIR", value: "/app" },
  { instruction: "WORKDIR", value: "/src" },
  { instruction: "CMD", value: "node server.js" },
]);
assertEquals(out.workdir, "/src");
assertEquals(out.cmd, "node server.js");`,
        },
        {
          name: "accumulates ENV, last value wins per key",
          code: `const out = buildImage([
  { instruction: "ENV", value: "NODE_ENV=development" },
  { instruction: "ENV", value: "PORT=3000" },
  { instruction: "ENV", value: "NODE_ENV=production" },
]);
assertEquals(out.env, { NODE_ENV: "production", PORT: "3000" });`,
        },
        {
          name: "uses defaults when instructions are absent",
          code: `const out = buildImage([
  { instruction: "FROM", value: "alpine" },
  { instruction: "RUN", value: "apk add curl" },
]);
assertEquals(out, { workdir: "/", env: {}, cmd: null });`,
        },
      ],
      explanation: `We fold the instruction list into a single config object, processing top to bottom just like \`docker build\` does. \`WORKDIR\` and \`CMD\` simply overwrite their slot, so the last one naturally wins. \`ENV\` writes into an \`env\` map keyed by name, so a repeated key overrides the earlier value while distinct keys accumulate. Unhandled instructions (\`FROM\`, \`RUN\`) fall through untouched.`,
    },
    {
      slug: "building-and-tagging",
      title: "Building & Tagging",
      howToTitle: "parse a Docker image reference",
      blurb: "Turn a Dockerfile into a named, tagged image.",
      xp: 40,
      content: `# Building & Tagging

You turn a Dockerfile into an image with \`docker build\`, and you give that image
a **name and tag** with \`-t\`:

\`\`\`bash
docker build -t myapp:1.0 .
docker images               # list your images
docker run myapp:1.0        # run it by reference
\`\`\`

An image **reference** has the form \`repository:tag\`. The \`repository\` names the
image (e.g. \`myapp\`, or \`docker.io/library/nginx\`); the \`tag\` is a label for a
specific version (\`1.0\`, \`latest\`, \`alpine\`). If you leave the tag off, Docker
assumes **\`latest\`**:

\`\`\`bash
docker run nginx        # really means nginx:latest
docker run nginx:1.27   # an explicit version tag
\`\`\`

Parsing a reference into its parts is exactly the kind of string logic we can
model and test.

## Your task
Write \`parseImageRef(ref)\` that splits an image reference string into
\`{ repository, tag }\`.

- \`"myapp:1.0"\` → \`{ repository: "myapp", tag: "1.0" }\`
- \`"nginx"\` (no tag) → \`{ repository: "nginx", tag: "latest" }\` (the default tag).

Split on the **last** \`:\` so repositories that include a registry port still work
correctly.`,
      starterCode: `function parseImageRef(ref) {
  // return { repository, tag } — default tag is "latest"
}
`,
      solution: `function parseImageRef(ref) {
  const idx = ref.lastIndexOf(":");
  if (idx === -1) {
    return { repository: ref, tag: "latest" };
  }
  return {
    repository: ref.slice(0, idx),
    tag: ref.slice(idx + 1),
  };
}`,
      tests: [
        {
          name: "splits repository and tag",
          code: `assertEquals(parseImageRef("myapp:1.0"), { repository: "myapp", tag: "1.0" });`,
        },
        {
          name: "defaults missing tag to latest",
          code: `assertEquals(parseImageRef("nginx"), { repository: "nginx", tag: "latest" });`,
        },
        {
          name: "splits on the last colon (registry with port)",
          code: `assertEquals(parseImageRef("localhost:5000/myapp:2.3"), { repository: "localhost:5000/myapp", tag: "2.3" });`,
        },
      ],
      explanation: `Using \`lastIndexOf(":")\` means a registry like \`localhost:5000/myapp:2.3\` splits correctly — the registry port stays inside the repository, and only the final \`:2.3\` becomes the tag. When there's no colon at all we fall back to Docker's implicit \`latest\` tag.`,
    },
    {
      slug: "running-containers-port-mapping",
      title: "Running Containers & Port Mapping",
      howToTitle: "map Docker container ports",
      blurb: "Publish a container's ports to the host with -p.",
      xp: 40,
      content: `# Running Containers & Port Mapping

By default a container's network is isolated — a server listening *inside* the
container isn't reachable from your machine. You **publish** a port with
\`-p host:container\` to bridge them:

\`\`\`bash
# Forward host port 8080 to the container's port 80
docker run -p 8080:80 nginx
# Now http://localhost:8080 reaches nginx inside the container
\`\`\`

The format is \`-p HOST:CONTAINER\`. Traffic that arrives on the **host** port is
forwarded to the **container** port. You can publish several ports by repeating
\`-p\`:

\`\`\`bash
docker run -p 8080:80 -p 5432:5432 myapp
\`\`\`

A common confusion is the order — it's **host first, container second**. We'll
build the lookup that the host uses: "a request came in on host port N — which
container port does it go to?"

## Your task
Write \`buildPortMap(mappings)\` where \`mappings\` is an array of \`"host:container"\`
strings (e.g. \`["8080:80", "5432:5432"]\`). Return an object that maps each **host**
port (as a **number**) to its **container** port (as a **number**):

\`\`\`js
buildPortMap(["8080:80", "5432:5432"])
// → { 8080: 80, 5432: 5432 }
\`\`\``,
      starterCode: `function buildPortMap(mappings) {
  // turn ["host:container", ...] into { host: container } with numeric ports
}
`,
      solution: `function buildPortMap(mappings) {
  const map = {};
  for (const mapping of mappings) {
    const [host, container] = mapping.split(":");
    map[Number(host)] = Number(container);
  }
  return map;
}`,
      tests: [
        {
          name: "maps host ports to container ports",
          code: `assertEquals(buildPortMap(["8080:80", "5432:5432"]), { 8080: 80, 5432: 5432 });`,
        },
        {
          name: "values are numbers, not strings",
          code: `const m = buildPortMap(["3000:3000"]);
assertEquals(m[3000], 3000);
assert(typeof m[3000] === "number", "container port should be a number");`,
        },
        {
          name: "empty list gives an empty map",
          code: `assertEquals(buildPortMap([]), {});`,
        },
      ],
      explanation: `Each \`"host:container"\` string is split on the colon and coerced to numbers so the lookup is keyed by numeric host port. This mirrors how Docker forwards inbound host traffic to the right port inside the container — host first, container second.`,
    },
    {
      slug: "volumes-and-persistence",
      title: "Volumes & Persistence",
      blurb: "Keep data alive after a container is gone.",
      xp: 30,
      kind: "quiz",
      content: `# Volumes & Persistence

A container's filesystem is **ephemeral**: anything written inside it lives in the
container's thin writable layer and disappears when the container is removed. For
a database, that's a disaster. The fix is a **volume** — storage that lives
*outside* the container's lifecycle and is mounted into it.

\`\`\`bash
# Named volume — Docker manages where it lives on disk
docker run -v mydata:/var/lib/postgresql/data postgres

# Bind mount — map a host folder straight into the container
docker run -v /home/me/site:/usr/share/nginx/html nginx
\`\`\`

The \`-v\` flag uses the same \`source:target\` shape as port mapping. There are two
common kinds:
- **Named volumes** (\`mydata:/path\`) — Docker owns and manages the storage. Best
  for databases and app data you want to persist and reuse.
- **Bind mounts** (\`/host/path:/path\`) — a specific host folder is mounted in,
  great for live-editing source code during development.

Because the volume outlives the container, you can delete and recreate the
container — upgrade Postgres, say — and the data is still there, mounted into the
new one.`,
      questions: [
        {
          prompt: "Why would you add a volume to a database container?",
          options: [
            "To make the container start faster",
            "So its data survives even when the container is removed and recreated",
            "To expose the database on a host port",
            "To reduce the size of the base image",
          ],
          answer: 1,
          explanation:
            "A container's writable layer is discarded when the container is removed. A volume stores data outside that lifecycle, so it persists across container restarts, upgrades, and recreation.",
        },
        {
          prompt: "What happens to data written only to a container's own filesystem (no volume) when that container is deleted?",
          options: [
            "It is automatically backed up to Docker Hub",
            "It is lost, because it lived in the container's ephemeral writable layer",
            "It is merged back into the base image",
            "It is moved to another running container",
          ],
          answer: 1,
          explanation:
            "Without a volume, writes go to the container's thin, throwaway writable layer. Removing the container discards that layer and the data with it.",
        },
        {
          prompt: "Which is the best fit for live-editing your source code on the host while a container runs it?",
          options: [
            "A named volume",
            "A bind mount that maps a host folder into the container",
            "Rebuilding the image after every keystroke",
            "Publishing a port with -p",
          ],
          answer: 1,
          explanation:
            "A bind mount maps a specific host directory into the container, so edits you make on the host are immediately visible inside it — ideal for development. Named volumes are better for managed app/database data.",
        },
      ],
    },
    {
      slug: "docker-compose",
      title: "Docker Compose",
      howToTitle: "merge Docker Compose service configs",
      blurb: "Define multi-container apps and layer overrides.",
      xp: 45,
      content: `# Docker Compose

Real apps are *several* containers — a web server, a database, a cache. **Docker
Compose** lets you declare them all in one \`docker-compose.yml\` file and start the
whole stack with one command:

\`\`\`yaml
services:
  web:
    image: myapp:1.0
    ports:
      - "8080:80"
    environment:
      NODE_ENV: production
  db:
    image: postgres:16
    volumes:
      - dbdata:/var/lib/postgresql/data
\`\`\`

\`\`\`bash
docker compose up    # start every service
docker compose down  # stop and remove them
\`\`\`

A powerful pattern is the **override file**. Compose merges a base config with an
override (e.g. \`docker-compose.override.yml\` for local dev) so you can tweak a few
fields without duplicating the whole service. The merge rule: keys in the override
**win**, and keys only in the base are **kept**.

## Your task
Write \`mergeService(base, override)\` that returns a new config where \`override\`'s
keys take precedence over \`base\`'s, and keys present only in \`base\` are preserved.
Do **not** mutate either input.

\`\`\`js
mergeService(
  { image: "myapp:1.0", ports: ["8080:80"], env: "production" },
  { env: "development", restart: "always" }
)
// → { image: "myapp:1.0", ports: ["8080:80"], env: "development", restart: "always" }
\`\`\``,
      starterCode: `function mergeService(base, override) {
  // return a merged config; override wins; don't mutate the inputs
}
`,
      solution: `function mergeService(base, override) {
  return { ...base, ...override };
}`,
      tests: [
        {
          name: "override wins, base-only keys kept",
          code: `assertEquals(
  mergeService(
    { image: "myapp:1.0", ports: ["8080:80"], env: "production" },
    { env: "development", restart: "always" }
  ),
  { image: "myapp:1.0", ports: ["8080:80"], env: "development", restart: "always" }
);`,
        },
        {
          name: "empty override returns base's values",
          code: `assertEquals(
  mergeService({ image: "postgres:16" }, {}),
  { image: "postgres:16" }
);`,
        },
        {
          name: "does not mutate the inputs",
          code: `const base = { env: "production" };
const override = { env: "development" };
mergeService(base, override);
assertEquals(base, { env: "production" });
assertEquals(override, { env: "development" });`,
        },
      ],
      explanation: `Spreading \`base\` first then \`override\` into a fresh object means override keys overwrite matching base keys while base-only keys survive — exactly Compose's override-file merge. Building a new object (rather than assigning onto \`base\`) keeps both inputs untouched.`,
    },
    {
      slug: "networking-and-best-practices",
      title: "Networking & Best Practices",
      blurb: "How containers talk, and how to keep images lean and safe.",
      xp: 30,
      kind: "quiz",
      content: `# Networking & Best Practices

**Networking.** When you run multiple containers with Compose, Docker puts them on
a shared **network** where each service is reachable by its **service name** as a
hostname. Your \`web\` container connects to the database at \`db:5432\` — no IP
addresses, no \`localhost\` (which inside a container means *that container itself*,
not the host).

\`\`\`yaml
services:
  web:
    environment:
      DATABASE_URL: postgres://db:5432/app   # "db" = the service name
  db:
    image: postgres:16
\`\`\`

**Best practices for lean, secure images:**
- **Pin specific tags** (\`node:20\`, not \`node:latest\`) so builds are reproducible.
- **Use small base images** like \`alpine\` variants to shrink size and attack surface.
- **Add a \`.dockerignore\`** so junk like \`node_modules\` and \`.git\` never bloats the
  build context.
- **Order layers by stability** — copy \`package.json\` and install dependencies
  *before* copying the rest of your source, so Docker's layer **cache** can reuse
  the (slow) install step when only your app code changes.
- **Don't run as root** — create and switch to a non-root \`USER\` for safety.
- **Never bake secrets** (passwords, API keys) into an image; pass them at runtime
  via environment variables or secrets.`,
      questions: [
        {
          prompt: "In a Compose project, how does the `web` container reach the `db` container?",
          options: [
            "By using `localhost:5432`",
            "By using the service name as a hostname, e.g. `db:5432`",
            "By hard-coding the host machine's public IP address",
            "Containers cannot communicate with each other",
          ],
          answer: 1,
          explanation:
            "Compose puts services on a shared network where each is addressable by its service name. So `web` connects to `db:5432`. Inside a container, `localhost` refers to that same container, not its neighbours or the host.",
        },
        {
          prompt: "Why copy `package.json` and run install BEFORE copying the rest of your source code in a Dockerfile?",
          options: [
            "It's required syntax; the build fails otherwise",
            "So Docker's layer cache can reuse the slow dependency-install step when only app code changes",
            "It makes the final image run faster at runtime",
            "It encrypts the dependencies",
          ],
          answer: 1,
          explanation:
            "Each instruction is a cached layer. If dependencies are installed in an earlier layer than the source copy, editing your code only invalidates the later layers — Docker reuses the cached install, making rebuilds much faster.",
        },
        {
          prompt: "Which is a Docker image best practice?",
          options: [
            "Always use the `latest` tag for reproducible builds",
            "Bake database passwords directly into the image so they're always available",
            "Use a small base image, pin specific tags, and never store secrets in the image",
            "Run every container as the root user for maximum permissions",
          ],
          answer: 2,
          explanation:
            "Lean, secure images use small pinned base images (not the moving `latest`), keep secrets out of the image (pass them at runtime), and avoid running as root. Baking in secrets and running as root are exactly what to avoid.",
        },
      ],
    },
  ],
};
