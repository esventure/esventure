import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Refined silhouette icons — bold mass, hairline white inner cuts.
// Color via currentColor (text-primary). Inner detail uses white.

// Fixer — Hammer with motion accent
export const FixerIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <g transform="rotate(-38 16 16)">
      <path
        d="M5 7.5 Q5 6 6.5 6 H22.5 Q24 6 24 7.5 V12.5 Q24 14 22.5 14 H6.5 Q5 14 5 12.5 Z"
        fill="currentColor"
      />
      <path d="M3.2 8.4 L7 10 L3.2 11.6 Z" fill="white" />
      <rect x="8" y="8" width="9" height="1.2" rx="0.6" fill="white" opacity="0.85" />
      <path
        d="M14.4 14 H17.6 Q18 14 18 14.6 V29.4 Q18 30 17.4 30 H14.6 Q14 30 14 29.4 V14.6 Q14 14 14.4 14 Z"
        fill="currentColor"
      />
      <rect x="14.6" y="22.5" width="2.8" height="0.9" rx="0.45" fill="white" />
      <rect x="14.6" y="24.6" width="2.8" height="0.9" rx="0.45" fill="white" />
      <rect x="14.6" y="26.7" width="2.8" height="0.9" rx="0.45" fill="white" />
    </g>
    <circle cx="26" cy="6.5" r="1.4" fill="currentColor" />
    <circle cx="29" cy="9" r="0.8" fill="currentColor" />
  </svg>
);

// Sparring — Two people talking / brainstorming
export const SparringIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Left person — head */}
    <circle cx="9" cy="9" r="3.2" fill="currentColor" />
    {/* Left person — shoulders */}
    <path
      d="M3 22 Q3 16.5 9 16.5 Q15 16.5 15 22 V24 Q15 25 14 25 H4 Q3 25 3 24 Z"
      fill="currentColor"
    />
    {/* Right person — head */}
    <circle cx="23" cy="9" r="3.2" fill="currentColor" />
    {/* Right person — shoulders */}
    <path
      d="M17 22 Q17 16.5 23 16.5 Q29 16.5 29 22 V24 Q29 25 28 25 H18 Q17 25 17 24 Z"
      fill="currentColor"
    />
    {/* Speech bubble between them with spark */}
    <path
      d="M12.5 27 Q12.5 25 14.5 25 H17.5 Q19.5 25 19.5 27 V29 Q19.5 30.5 18 30.5 H17 L15.5 32 L15 30.5 H14.5 Q12.5 30.5 12.5 29 Z"
      fill="white"
    />
    <circle cx="14.6" cy="27.8" r="0.6" fill="currentColor" />
    <circle cx="16" cy="27.8" r="0.6" fill="currentColor" />
    <circle cx="17.4" cy="27.8" r="0.6" fill="currentColor" />
    {/* Idea spark above */}
    <path
      d="M16 1.5 L16.7 3.3 L18.5 4 L16.7 4.7 L16 6.5 L15.3 4.7 L13.5 4 L15.3 3.3 Z"
      fill="currentColor"
    />
  </svg>
);

// Map — Workflow / process flow
export const MapIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Step 1 — circle (start) */}
    <circle cx="6" cy="7" r="3.5" fill="currentColor" />
    <circle cx="6" cy="7" r="1.3" fill="white" />
    {/* Arrow 1 → 2 */}
    <path
      d="M9.8 7 H14.2 M13 5.6 L14.6 7 L13 8.4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Step 2 — rounded rect */}
    <rect x="14.5" y="3.5" width="13" height="7" rx="1.6" fill="currentColor" />
    <rect x="16.5" y="6.4" width="9" height="1.2" rx="0.6" fill="white" />
    {/* Arrow down to diamond */}
    <path
      d="M21 11 V14.2 M19.6 13 L21 14.6 L22.4 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Step 3 — diamond (decision) */}
    <path d="M21 15 L26.5 20 L21 25 L15.5 20 Z" fill="currentColor" />
    <path
      d="M18.5 20 L20.3 21.7 L23.5 18.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Arrow back to step 4 */}
    <path
      d="M15 20 H10 Q8.5 20 8.5 21.5 V25.5 M9.9 24.3 L8.5 25.7 L7.1 24.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Step 4 — final circle */}
    <circle cx="8.5" cy="27.5" r="3" fill="currentColor" />
    <path
      d="M7 27.5 L8.1 28.6 L10 26.5"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Mirror — Painting being painted (canvas + brush)
export const MirrorIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Easel legs */}
    <path
      d="M6 28 L11 12 M22 12 L26 28 M9 22 H22"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Canvas */}
    <rect x="7" y="3" width="18" height="14" rx="1.4" fill="currentColor" />
    {/* Brushstroke arc on canvas */}
    <path
      d="M10 13 Q14 6 18 11 Q21 14 22.5 9"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    {/* Paint dab */}
    <circle cx="22.5" cy="9" r="1.3" fill="white" />
    {/* Brush handle */}
    <path
      d="M24 5 L30 11"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Brush ferrule */}
    <path
      d="M22.6 6.4 L25.6 9.4"
      stroke="white"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Brush tip */}
    <path d="M20.5 8.5 L23.5 11.5 L21.5 13.5 Z" fill="currentColor" />
  </svg>
);
