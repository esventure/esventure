import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Fix It Icon - Bold circle with diagonal spark line (ownership, action)
export const FixItIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main bold circle */}
    <circle cx="16" cy="16" r="8" fill="currentColor" />
    {/* Diagonal spark line */}
    <line 
      x1="22" y1="6" 
      x2="26" y2="10" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
  </svg>
);

// Prototype Icon - Diamond shape (ideas taking form, clarity)
export const PrototypeIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer diamond outline */}
    <rect 
      x="16" y="4" 
      width="17" height="17" 
      transform="rotate(45 16 4)"
      stroke="currentColor" 
      strokeWidth="3"
      fill="none"
      rx="2"
    />
    {/* Inner small diamond */}
    <rect 
      x="16" y="10" 
      width="8.5" height="8.5" 
      transform="rotate(45 16 10)"
      fill="currentColor"
      rx="1"
    />
  </svg>
);

// Process/Improve Icon - Circular refresh arrow (continuous improvement)
export const ImproveIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Circular arc */}
    <path 
      d="M16 6 A10 10 0 1 1 6 16" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
      fill="none"
    />
    {/* Arrow head */}
    <path 
      d="M6 10 L6 16 L12 16" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Alternative variations for user to choose from
export const FixItIconAlt: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Target/bullseye style */}
    <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="16" cy="16" r="4" fill="currentColor" />
  </svg>
);

export const PrototypeIconAlt: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Triangle pointing up */}
    <path 
      d="M16 5 L27 25 L5 25 Z" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="16" cy="18" r="3" fill="currentColor" />
  </svg>
);

export const ImproveIconAlt: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Upward trending line */}
    <path 
      d="M6 24 L14 14 L20 18 L26 8" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Arrow head at end */}
    <path 
      d="M22 8 L26 8 L26 12" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Set 3 - Even more minimal
export const FixItIconMinimal: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Bold checkmark */}
    <path 
      d="M7 17 L13 23 L25 9" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const PrototypeIconMinimal: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Hexagon shape */}
    <path 
      d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ImproveIconMinimal: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    {/* Two stacked horizontal bars with offset */}
    <rect x="6" y="10" width="14" height="4" rx="2" fill="currentColor" />
    <rect x="12" y="18" width="14" height="4" rx="2" fill="currentColor" />
  </svg>
);
