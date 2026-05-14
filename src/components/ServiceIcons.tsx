import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Solid silhouette style with hairline white inner cut-outs.
// Fill comes from currentColor (purple via text-primary). Inner detail uses white.

// Fixer Icon — chunky arrow-block in motion
export const FixerIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Motion ticks behind the block */}
    <rect x="2" y="10" width="5" height="2" rx="1" fill="currentColor" />
    <rect x="2" y="20" width="5" height="2" rx="1" fill="currentColor" />
    {/* Solid arrow-block: rounded rect fused with a wedge tip */}
    <path
      d="M9 8 H21 L28 16 L21 24 H9 A2 2 0 0 1 7 22 V10 A2 2 0 0 1 9 8 Z"
      fill="currentColor"
    />
    {/* Hairline white motion slits cut through the back */}
    <rect x="11" y="13" width="4" height="1.4" rx="0.7" fill="white" />
    <rect x="11" y="17.6" width="4" height="1.4" rx="0.7" fill="white" />
  </svg>
);

// Sparring Icon — two facing solid half-discs with a spark cut out between
export const SparringIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Left filled half-disc */}
    <path d="M11 4 A12 12 0 0 0 11 28 Z" fill="currentColor" />
    {/* Right filled half-disc */}
    <path d="M21 4 A12 12 0 0 1 21 28 Z" fill="currentColor" />
    {/* Hairline white inner curves to suggest depth */}
    <path d="M9 8 A8 8 0 0 0 9 24" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M23 8 A8 8 0 0 1 23 24" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* Spark in the gap */}
    <path d="M16 11 L17.5 15 L16 16 L14.5 15 Z M16 21 L17.5 17 L16 16 L14.5 17 Z" fill="currentColor" />
  </svg>
);

// Map Icon — solid blob tapering into a flowing ribbon ending in a dot
export const MapIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
    {/* Solid tangled blob on the left, resolving into a thick ribbon to the right */}
    <path
      d="M4 12
         C 2 6, 10 4, 11 9
         C 12 13, 6 13, 7 17
         C 8 21, 13 19, 16 18
         L 24 16
         L 24 20
         L 16 22
         C 10 23, 4 22, 4 18
         Z"
      fill="currentColor"
    />
    {/* End dot */}
    <circle cx="27" cy="18" r="2.6" fill="currentColor" />
    {/* Hairline white path tracing through */}
    <path
      d="M7 10 C 9 12, 8 15, 11 15 C 15 15, 18 18, 24 18"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Mirror Icon — solid tilted rounded-square frame with a sparkle cut out of center
export const MirrorIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <g>
    <svg viewBox="0 0 32 32" width={size} height={size} className={className}>
      <g transform="rotate(-8 16 16)">
        {/* Solid frame using even-odd fill: outer rounded square minus inner rounded square */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 8 A3 3 0 0 1 8 5 H24 A3 3 0 0 1 27 8 V24 A3 3 0 0 1 24 27 H8 A3 3 0 0 1 5 24 Z
             M10 11 H22 A1 1 0 0 1 23 12 V20 A1 1 0 0 1 22 21 H10 A1 1 0 0 1 9 20 V12 A1 1 0 0 1 10 11 Z"
          fill="currentColor"
        />
      </g>
      {/* Sparkle cut sitting inside the frame */}
      <path
        d="M16 11 Q16.8 15.2 21 16 Q16.8 16.8 16 21 Q15.2 16.8 11 16 Q15.2 15.2 16 11 Z"
        fill="currentColor"
      />
    </svg>
  </g>
);
