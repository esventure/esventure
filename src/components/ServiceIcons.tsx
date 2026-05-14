import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Solid silhouette icons with hairline white inner cuts.
// Color via currentColor (text-primary). Inner detail uses white.

// Fixer — Hammer
export const FixerIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Hammer head (rotated slightly) */}
    <g transform="rotate(-35 16 16)">
      <rect x="4" y="6" width="20" height="8" rx="1.5" fill="currentColor" />
      {/* Claw cut */}
      <path d="M3 9 L7 12 L3 14 Z" fill="white" />
      {/* Handle */}
      <rect x="14" y="14" width="4" height="16" rx="1.2" fill="currentColor" />
      {/* Grip stripes (white cuts) */}
      <rect x="14.4" y="22" width="3.2" height="1" fill="white" />
      <rect x="14.4" y="24.5" width="3.2" height="1" fill="white" />
      <rect x="14.4" y="27" width="3.2" height="1" fill="white" />
    </g>
  </svg>
);

// Sparring — Clipboard (ideas captured, prototyping notes)
export const SparringIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Clip at top */}
    <rect x="12" y="3" width="8" height="4" rx="1" fill="currentColor" />
    {/* Board */}
    <path
      d="M7 6 H11 V8 H21 V6 H25 A2 2 0 0 1 27 8 V28 A2 2 0 0 1 25 30 H7 A2 2 0 0 1 5 28 V8 A2 2 0 0 1 7 6 Z"
      fill="currentColor"
    />
    {/* Lines on the board (white cuts) */}
    <rect x="9" y="14" width="14" height="1.6" rx="0.8" fill="white" />
    <rect x="9" y="18" width="14" height="1.6" rx="0.8" fill="white" />
    <rect x="9" y="22" width="9" height="1.6" rx="0.8" fill="white" />
  </svg>
);

// Map — Flowchart (three connected nodes)
export const MapIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Connector lines */}
    <rect x="9" y="8.4" width="6" height="2" fill="currentColor" />
    <rect x="9" y="21.6" width="6" height="2" fill="currentColor" />
    <rect x="20" y="14.6" width="2" height="2.8" fill="currentColor" />
    {/* Top-left node */}
    <rect x="2" y="5" width="8" height="9" rx="1.5" fill="currentColor" />
    {/* Bottom-left node */}
    <rect x="2" y="18" width="8" height="9" rx="1.5" fill="currentColor" />
    {/* Right node (bigger / outcome) */}
    <rect x="14" y="11.5" width="14" height="9" rx="1.5" fill="currentColor" />
    {/* White center dots inside each node for crispness */}
    <circle cx="6" cy="9.5" r="1.2" fill="white" />
    <circle cx="6" cy="22.5" r="1.2" fill="white" />
    <rect x="17.5" y="15.2" width="7" height="1.6" rx="0.8" fill="white" />
  </svg>
);

// Mirror — Target / Goal (make it yours, on point)
export const MirrorIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Outer ring (solid disc) */}
    <circle cx="16" cy="16" r="13" fill="currentColor" />
    {/* White ring cut */}
    <circle cx="16" cy="16" r="9.5" fill="white" />
    {/* Mid disc */}
    <circle cx="16" cy="16" r="6.5" fill="currentColor" />
    {/* Inner white ring */}
    <circle cx="16" cy="16" r="3.5" fill="white" />
    {/* Bullseye dot */}
    <circle cx="16" cy="16" r="1.8" fill="currentColor" />
  </svg>
);
