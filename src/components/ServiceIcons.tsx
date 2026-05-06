import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Make It Happen Icon - Target/bullseye (ownership, action, taking charge)
export const MakeItHappenIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="16" cy="16" r="4" fill="currentColor" />
  </svg>
);

// Clear Path Icon - Triangle with dot (clarity, direction, vision taking shape)
export const ClearPathIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
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

// Quick Fix Icon - Upward trending line (fast results, momentum)
export const QuickFixIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <path 
      d="M6 24 L14 14 L20 18 L26 8" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
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

// Build Icon - Browser window with code brackets (web development, shipping)
export const BuildIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="none">
    <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
    <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="3" />
    <path d="M12 17 L9 20 L12 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M20 17 L23 20 L20 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
