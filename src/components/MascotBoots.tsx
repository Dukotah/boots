// Boots — the mascot. A tiny inline-SVG dog so we have brand identity with zero
// asset pipeline. Swap for real art later.
export function MascotBoots({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-label="Boots the mascot"
      role="img"
    >
      <circle cx="32" cy="34" r="22" fill="#a78bfa" />
      <circle cx="32" cy="34" r="22" fill="url(#g)" fillOpacity="0.4" />
      {/* ears */}
      <path d="M14 18 L20 34 L8 32 Z" fill="#8b5cf6" />
      <path d="M50 18 L44 34 L56 32 Z" fill="#8b5cf6" />
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
