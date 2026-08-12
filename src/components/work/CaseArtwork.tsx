/**
 * Art-directed abstract artwork per case.
 *
 * TODO(assets): swap any of these compositions for approved real project
 * visuals (photography, website captures, prototype screens) by dropping the
 * image into `src/assets/cases/` and rendering it here instead of the SVG.
 * The layout does not need to change: each artwork fills its parent card.
 */
import React from "react";

const wrap = "absolute inset-0 h-full w-full";

/** 01 - Dennis Gerrits: sun-yellow field, Amsterdam route lines, map fragments. */
export const ArtworkRoutes = () => (
  <svg className={wrap} viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="640" height="400" fill="hsl(var(--secondary))" />
    <g stroke="hsl(var(--plum))" strokeOpacity="0.28" fill="none" strokeWidth="1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M-40 ${90 + i * 62} C 140 ${30 + i * 58}, 320 ${190 + i * 40}, 700 ${60 + i * 66}`} />
      ))}
    </g>
    <g stroke="hsl(var(--plum))" strokeOpacity="0.5" fill="none" strokeWidth="3">
      <path d="M60 330 L170 250 L300 268 L410 176 L560 200" strokeLinecap="round" />
    </g>
    <g fill="hsl(var(--coral))">
      {[
        [170, 250],
        [300, 268],
        [410, 176],
      ].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r="7" />
      ))}
    </g>
    <rect x="430" y="52" width="150" height="96" fill="hsl(var(--paper))" fillOpacity="0.75" />
    <g stroke="hsl(var(--plum))" strokeOpacity="0.35" strokeWidth="1">
      <path d="M430 84 H580 M430 116 H580 M478 52 V148 M530 52 V148" />
    </g>
    <text x="52" y="112" fill="hsl(var(--plum))" fontSize="86" fontFamily="serif" opacity="0.55">
      *
    </text>
  </svg>
);

/** 02 - Studio Ingrid de Reuver: hot-coral field, contact-sheet rhythm. */
export const ArtworkContactSheet = () => (
  <svg className={wrap} viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="560" fill="hsl(var(--coral))" />
    <g fill="hsl(var(--paper))" fillOpacity="0.16">
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={38 + c * 110} y={54 + r * 122} width="88" height="98" rx="2" />
        ))
      )}
    </g>
    <g stroke="hsl(var(--paper))" strokeOpacity="0.5" strokeWidth="1.5" fill="none">
      <rect x="148" y="176" width="88" height="98" />
      <path d="M148 160 v-14 M236 160 v-14 M148 290 v14 M236 290 v14" />
    </g>
    <g stroke="hsl(var(--plum))" strokeOpacity="0.35" strokeWidth="1">
      <path d="M0 30 H400 M0 530 H400" />
    </g>
    <g fill="hsl(var(--secondary))">
      <circle cx="330" cy="466" r="26" />
    </g>
  </svg>
);

/** 03 - HAP: acid-lime field, neutral device silhouettes (no invented app screens). */
export const ArtworkPrototype = () => (
  <svg className={wrap} viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="320" fill="hsl(var(--lime))" />
    <g stroke="hsl(var(--plum))" strokeOpacity="0.12" strokeWidth="1">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M0 ${52 * i} H400`} />
      ))}
    </g>
    {/* TODO(assets): replace silhouettes with approved HAP prototype screens. */}
    <g>
      <rect x="120" y="46" width="118" height="226" rx="18" fill="hsl(var(--paper))" fillOpacity="0.9" />
      <rect x="132" y="66" width="94" height="10" rx="5" fill="hsl(var(--plum))" fillOpacity="0.2" />
      <rect x="132" y="88" width="94" height="70" rx="8" fill="hsl(var(--primary))" fillOpacity="0.18" />
      <rect x="132" y="170" width="70" height="8" rx="4" fill="hsl(var(--plum))" fillOpacity="0.18" />
      <rect x="132" y="188" width="86" height="8" rx="4" fill="hsl(var(--plum))" fillOpacity="0.12" />
      <rect x="254" y="86" width="94" height="150" rx="14" fill="hsl(var(--primary))" fillOpacity="0.85" />
    </g>
    <g fill="hsl(var(--coral))">
      <circle cx="62" cy="102" r="10" />
      <circle cx="86" cy="146" r="6" />
      <circle cx="52" cy="176" r="7" />
    </g>
  </svg>
);

/** 04 - Rainforest Alliance: electric-violet field, flow diagram fragments. */
export const ArtworkFlow = () => (
  <svg className={wrap} viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="640" height="400" fill="hsl(var(--primary))" />
    <rect x="60" y="60" width="520" height="280" fill="hsl(var(--lilac))" fillOpacity="0.16" />
    <g stroke="hsl(var(--lilac))" strokeOpacity="0.65" strokeWidth="2" fill="none">
      <path d="M110 200 H200 M300 200 H390 M490 200 H560" />
      <path d="M250 168 V110 H390" />
      <path d="M250 232 V292 H440" />
    </g>
    <g fill="none" stroke="hsl(var(--paper))" strokeWidth="2">
      <rect x="200" y="172" width="100" height="56" rx="6" />
      <rect x="390" y="172" width="100" height="56" rx="6" />
      <rect x="390" y="82" width="100" height="56" rx="6" />
      <rect x="440" y="264" width="100" height="56" rx="6" />
    </g>
    <g stroke="hsl(var(--secondary))" strokeWidth="2">
      <path d="M214 190 h34 M214 204 h58" />
      <path d="M404 100 h34" />
    </g>
    <g fill="hsl(var(--lime))">
      <circle cx="110" cy="200" r="9" />
      <circle cx="566" cy="200" r="9" />
    </g>
  </svg>
);

export const artworks: React.FC[] = [ArtworkRoutes, ArtworkContactSheet, ArtworkPrototype, ArtworkFlow];
