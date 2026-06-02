// Cantrip — the mascot. A tiny inline-SVG arcane familiar (a wizard-hatted
// creature) so we have brand identity with zero asset pipeline. Swap for real
// art later.
export function MascotBoots({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-label="Cantrip the mascot"
      role="img"
    >
      <circle cx="32" cy="36" r="20" fill="#a78bfa" />
      <circle cx="32" cy="36" r="20" fill="url(#g)" fillOpacity="0.4" />
      {/* ears */}
      <path d="M16 22 L21 36 L10 34 Z" fill="#8b5cf6" />
      <path d="M48 22 L43 36 L54 34 Z" fill="#8b5cf6" />
      {/* wizard hat */}
      <path d="M32 1 L45 22 L19 22 Z" fill="#6d28d9" />
      <ellipse cx="32" cy="22" rx="17" ry="3.6" fill="#5b21b6" />
      <path d="M33 4 l1.4 3 3 0.6 -2.2 2.1 0.6 3.1 -2.8-1.5 -2.8 1.5 0.6-3.1 -2.2-2.1 3-0.6 Z" fill="#fde68a" />
      {/* eyes */}
      <circle cx="24" cy="32" r="3.4" fill="#0a0a12" />
      <circle cx="40" cy="32" r="3.4" fill="#0a0a12" />
      <circle cx="25" cy="31" r="1.1" fill="#fff" />
      <circle cx="41" cy="31" r="1.1" fill="#fff" />
      {/* snout */}
      <ellipse cx="32" cy="41" rx="7" ry="5.5" fill="#ede9fe" />
      <circle cx="32" cy="39.5" r="2.2" fill="#0a0a12" />
      <path d="M32 41 L32 45" stroke="#0a0a12" strokeWidth="1.4" />
      <defs>
        <radialGradient id="g" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
