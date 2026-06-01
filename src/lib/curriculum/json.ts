import type { Module } from "./types";

export const json: Module = {
  slug: "json",
  title: "Working with JSON",
  description:
    "JSON is the universal format for moving data between programs, APIs, and files. Learn to parse JSON text into JavaScript values, build JSON strings, and safely read and transform the data inside.",
  emoji: "📦",
  gradient: "from-amber-400/20 to-orange-500/10",
  tagline: "learn to parse, build, and transform JSON in JavaScript",
  keywords: [
    "javascript json",
    "json parse stringify",
    "work with json",
    "json objects javascript",
  ],
  lessons: [
    {
      slug: "parse-and-read",
      title: "Parse & Read",
      blurb: "Turn a JSON string into an object and read a field.",
      xp: 25,
      content: `# Parse & Read

JSON arrives as text — from a file, an API, or a database. Before you can use it,
you turn that text into a real JavaScript value with \`JSON.parse\`. Once parsed,
you read fields with normal dot or bracket access.

\`\`\`js
const text = '{"name":"Boots","age":3}';
const obj = JSON.parse(text);
obj.name; // "Boots"
obj.age;  // 3
\`\`\`

## Your task
Write a function \`readName\` that takes a JSON string \`text\` describing an object
with a \`name\` field, parses it, and returns the value of \`name\`.`,
      starterCode: `function readName(text) {
  // parse text and return the name field
}
`,
      solution: `function readName(text) {
  const obj = JSON.parse(text);
  return obj.name;
}`,
      tests: [
        {
          name: 'readName(\'{"name":"Boots"}\') === "Boots"',
          code: `assertEquals(readName('{"name":"Boots"}'), "Boots");`,
        },
        {
          name: 'reads name ignoring other fields',
          code: `assertEquals(readName('{"age":3,"name":"Rex"}'), "Rex");`,
        },
        {
          name: 'works with a single-letter name',
          code: `assertEquals(readName('{"name":"A"}'), "A");`,
        },
      ],
    },
    {
      slug: "stringify",
      title: "Stringify",
      blurb: "Convert a JavaScript object into a JSON string.",
      xp: 28,
      content: `# Stringify

The reverse of parsing is \`JSON.stringify\`, which turns a JavaScript value into a
JSON string you can send or save. Keys and string values come out wrapped in
double quotes.

\`\`\`js
const obj = { id: 1, ok: true };
JSON.stringify(obj); // '{"id":1,"ok":true}'
\`\`\`

## Your task
Write a function \`toJson\` that takes a value \`v\` and returns its JSON string
representation.`,
      starterCode: `function toJson(v) {
  // return the JSON string for v
}
`,
      solution: `function toJson(v) {
  return JSON.stringify(v);
}`,
      tests: [
        {
          name: "stringifies an object",
          code: `assertEquals(toJson({ id: 1, ok: true }), '{"id":1,"ok":true}');`,
        },
        {
          name: "stringifies an array",
          code: `assertEquals(toJson([1, 2, 3]), "[1,2,3]");`,
        },
        {
          name: "stringifies a string",
          code: `assertEquals(toJson("hi"), '"hi"');`,
        },
      ],
    },
    {
      slug: "nested-access",
      title: "Nested Access",
      blurb: "Reach into a deeply nested field.",
      xp: 32,
      content: `# Nested Access

Real JSON is often nested: objects inside objects inside arrays. You reach a deep
value by chaining property and index access until you arrive at what you want.

\`\`\`js
const data = { user: { address: { city: "Oslo" } } };
data.user.address.city; // "Oslo"
\`\`\`

## Your task
Write a function \`firstTag\` that takes an object \`obj\` shaped like
\`{ post: { tags: [...] } }\` and returns the **first** element of the \`tags\`
array.`,
      starterCode: `function firstTag(obj) {
  // return the first tag inside obj.post.tags
}
`,
      solution: `function firstTag(obj) {
  return obj.post.tags[0];
}`,
      tests: [
        {
          name: "returns the first tag",
          code: `assertEquals(firstTag({ post: { tags: ["js", "json"] } }), "js");`,
        },
        {
          name: "works with one tag",
          code: `assertEquals(firstTag({ post: { tags: ["solo"] } }), "solo");`,
        },
        {
          name: "works with numeric tags",
          code: `assertEquals(firstTag({ post: { tags: [7, 8, 9] } }), 7);`,
        },
      ],
    },
    {
      slug: "immutable-update",
      title: "Immutable Update",
      blurb: "Return a new object with one field changed.",
      xp: 36,
      content: `# Immutable Update

Often you want to change a field without mutating the original object — this keeps
data predictable. The spread operator \`{ ...obj }\` copies every field into a new
object, and a trailing key overrides just one.

\`\`\`js
const user = { name: "Boots", age: 3 };
const older = { ...user, age: 4 };
older;     // { name: "Boots", age: 4 }
user.age;  // 3 (unchanged)
\`\`\`

## Your task
Write a function \`withName\` that takes an object \`obj\` and a string \`name\`, and
returns a **new** object identical to \`obj\` but with its \`name\` field set to
\`name\`. Do not mutate \`obj\`.`,
      starterCode: `function withName(obj, name) {
  // return a new object with name replaced
}
`,
      solution: `function withName(obj, name) {
  return { ...obj, name: name };
}`,
      tests: [
        {
          name: "returns the updated object",
          code: `assertEquals(withName({ name: "Old", age: 3 }, "New"), { name: "New", age: 3 });`,
        },
        {
          name: "does not mutate the original",
          code: `const o = { name: "Keep", age: 1 }; withName(o, "Changed"); assertEquals(o.name, "Keep");`,
        },
        {
          name: "adds name when missing",
          code: `assertEquals(withName({ age: 9 }, "Added"), { age: 9, name: "Added" });`,
        },
      ],
    },
    {
      slug: "deep-clone",
      title: "Deep Clone",
      blurb: "Copy nested data so the original stays safe.",
      xp: 40,
      content: `# Deep Clone

A spread copy is shallow: nested objects are still shared. To copy every level,
one classic trick is to stringify the value and parse it back — \`JSON.parse(JSON.stringify(x))\`
produces a brand-new structure with no shared references.

\`\`\`js
const original = { list: [1, 2] };
const copy = JSON.parse(JSON.stringify(original));
copy.list.push(3);
copy.list;     // [1, 2, 3]
original.list; // [1, 2] (untouched)
\`\`\`

## Your task
Write a function \`pushCopy\` that takes an object \`obj\` shaped like
\`{ items: [...] }\` and a \`value\`. Deep-clone \`obj\`, push \`value\` onto the
clone's \`items\` array, and return the clone. The original \`obj\` must be
unchanged.`,
      starterCode: `function pushCopy(obj, value) {
  // deep clone obj, push value onto clone.items, return the clone
}
`,
      solution: `function pushCopy(obj, value) {
  const clone = JSON.parse(JSON.stringify(obj));
  clone.items.push(value);
  return clone;
}`,
      tests: [
        {
          name: "clone has the new value",
          code: `assertEquals(pushCopy({ items: [1, 2] }, 3), { items: [1, 2, 3] });`,
        },
        {
          name: "original is unchanged",
          code: `const o = { items: [1, 2] }; pushCopy(o, 3); assertEquals(o, { items: [1, 2] });`,
        },
        {
          name: "works on an empty items array",
          code: `assertEquals(pushCopy({ items: [] }, "x"), { items: ["x"] });`,
        },
      ],
    },
    {
      slug: "transform-array",
      title: "Transform an Array",
      blurb: "Pull one field out of every object in a JSON array.",
      xp: 44,
      content: `# Transform an Array

A common task is reshaping data: given a JSON array of objects, extract just one
field from each. Parse the text, then \`.map\` over the array to pull out the field
you care about.

\`\`\`js
const text = '[{"id":1,"name":"A"},{"id":2,"name":"B"}]';
const rows = JSON.parse(text);
rows.map((r) => r.id); // [1, 2]
\`\`\`

## Your task
Write a function \`pluckNames\` that takes a JSON string \`text\` describing an array
of objects (each with a \`name\` field), parses it, and returns an array of every
object's \`name\`.`,
      starterCode: `function pluckNames(text) {
  // parse text and return an array of each object's name
}
`,
      solution: `function pluckNames(text) {
  const rows = JSON.parse(text);
  return rows.map((r) => r.name);
}`,
      tests: [
        {
          name: "extracts every name",
          code: `assertEquals(pluckNames('[{"name":"A"},{"name":"B"}]'), ["A", "B"]);`,
        },
        {
          name: "ignores other fields",
          code: `assertEquals(pluckNames('[{"id":1,"name":"X"},{"id":2,"name":"Y"}]'), ["X", "Y"]);`,
        },
        {
          name: "returns an empty array for empty input",
          code: `assertEquals(pluckNames("[]"), []);`,
        },
      ],
    },
  ],
};
