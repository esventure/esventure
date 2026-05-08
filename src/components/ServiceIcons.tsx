import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Fixer Icon - Block being pushed forward (unstuck, momentum, ownership)
export const FixerIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Motion lines behind */}
    <line x1="3" y1="11" x2="7" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="3" y1="21" x2="7" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* The block */}
    <rect x="9" y="9" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
    {/* Arrow wedge pushing right */}
    <path d="M25 12 L29 16 L25 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// Sparring Icon - Two arcs facing each other with a spark in the middle (dialogue + idea)
export const SparringIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Left arc */}
    <path d="M9 7 Q3 16 9 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Right arc */}
    <path d="M23 7 Q29 16 23 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Spark/diamond in the middle */}
    <path d="M16 11 L20 16 L16 21 L12 16 Z" fill="currentColor" />
  </svg>
);

// Map Icon - Tangled loop resolving into a clean line ending in a dot (chaos to flow)
export const MapIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <path
      d="M5 11 Q5 5 9 7 Q13 9 9 13 Q5 17 11 17 L26 17"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="27" cy="17" r="2.5" fill="currentColor" />
  </svg>
);

// Mirror Icon - Tilted frame with sparkle inside (identity, brand, framing)
export const MirrorIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <g transform="rotate(-8 16 16)">
      <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="3" fill="none" />
    </g>
    {/* Sparkle inside (4-point star) */}
    <path
      d="M16 10 Q17 15 22 16 Q17 17 16 22 Q15 17 10 16 Q15 15 16 10 Z"
      fill="currentColor"
    />
  </svg>
);
