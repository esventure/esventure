import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Refined silhouette icons — bold mass, hairline white inner cuts, subtle accent shapes.
// Color via currentColor (text-primary). Inner detail uses white.

// Fixer — Hammer with motion accent
export const FixerIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <g transform="rotate(-38 16 16)">
      {/* Head */}
      <path
        d="M5 7.5 Q5 6 6.5 6 H22.5 Q24 6 24 7.5 V12.5 Q24 14 22.5 14 H6.5 Q5 14 5 12.5 Z"
        fill="currentColor"
      />
      {/* Claw notch */}
      <path d="M3.2 8.4 L7 10 L3.2 11.6 Z" fill="white" />
      {/* Shine on head */}
      <rect x="8" y="8" width="9" height="1.2" rx="0.6" fill="white" opacity="0.85" />
      {/* Handle */}
      <path
        d="M14.4 14 H17.6 Q18 14 18 14.6 V29.4 Q18 30 17.4 30 H14.6 Q14 30 14 29.4 V14.6 Q14 14 14.4 14 Z"
        fill="currentColor"
      />
      {/* Grip */}
      <rect x="14.6" y="22.5" width="2.8" height="0.9" rx="0.45" fill="white" />
      <rect x="14.6" y="24.6" width="2.8" height="0.9" rx="0.45" fill="white" />
      <rect x="14.6" y="26.7" width="2.8" height="0.9" rx="0.45" fill="white" />
    </g>
    {/* Impact spark */}
    <circle cx="26" cy="6.5" r="1.4" fill="currentColor" />
    <circle cx="29" cy="9" r="0.8" fill="currentColor" />
  </svg>
);

// Sparring — Clipboard with check
export const SparringIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Clip */}
    <rect x="11.5" y="2.5" width="9" height="4.5" rx="1.4" fill="currentColor" />
    <rect x="13.5" y="3.8" width="5" height="1.4" rx="0.7" fill="white" opacity="0.9" />
    {/* Board */}
    <path
      d="M7 6 H11 Q11 8.5 13 8.5 H19 Q21 8.5 21 6 H25 A2.2 2.2 0 0 1 27.2 8.2 V27.8 A2.2 2.2 0 0 1 25 30 H7 A2.2 2.2 0 0 1 4.8 27.8 V8.2 A2.2 2.2 0 0 1 7 6 Z"
      fill="currentColor"
    />
    {/* Check mark */}
    <path
      d="M9.5 16.5 L12 19 L17 13.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Lines */}
    <rect x="9" y="22" width="14" height="1.4" rx="0.7" fill="white" />
    <rect x="9" y="25.4" width="9" height="1.4" rx="0.7" fill="white" opacity="0.7" />
  </svg>
);

// Map — Flowchart with diamond decision
export const MapIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Connectors */}
    <path d="M9.5 8.5 H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M9.5 23.5 H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M21 12 V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {/* Top-left node */}
    <rect x="2.5" y="5" width="7" height="7" rx="1.6" fill="currentColor" />
    <circle cx="6" cy="8.5" r="1.1" fill="white" />
    {/* Bottom-left node */}
    <rect x="2.5" y="20" width="7" height="7" rx="1.6" fill="currentColor" />
    <circle cx="6" cy="23.5" r="1.1" fill="white" />
    {/* Right diamond (decision) */}
    <path d="M21 6 L27.5 16 L21 26 L14.5 16 Z" fill="currentColor" />
    <circle cx="21" cy="16" r="1.6" fill="white" />
  </svg>
);

// Mirror — Target with arrow
export const MirrorIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Outer ring */}
    <circle cx="14" cy="18" r="12" fill="currentColor" />
    <circle cx="14" cy="18" r="8.5" fill="white" />
    <circle cx="14" cy="18" r="5.5" fill="currentColor" />
    <circle cx="14" cy="18" r="2.5" fill="white" />
    {/* Arrow shaft */}
    <path
      d="M14 18 L26 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M14 18 L26 6"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Arrow head */}
    <path d="M22 4 L28 4 L28 10 Z" fill="currentColor" />
    {/* Bullseye dot */}
    <circle cx="14" cy="18" r="1.1" fill="currentColor" />
  </svg>
);
