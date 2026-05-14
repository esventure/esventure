import React from 'react';
import { Wrench, Lightbulb, Workflow, Sparkles } from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
}

// Recognizable, on-point icons (Lucide). Color via currentColor (text-primary).
// Stroke is bold to match the chunky brand feel.

export const FixerIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <Wrench className={className} size={size} strokeWidth={2.25} />
);

export const SparringIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <Lightbulb className={className} size={size} strokeWidth={2.25} />
);

export const MapIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <Workflow className={className} size={size} strokeWidth={2.25} />
);

export const MirrorIcon: React.FC<IconProps> = ({ className = "", size = 32 }) => (
  <Sparkles className={className} size={size} strokeWidth={2.25} />
);
