import React from "react";

// Sticky stacking headers were removed - these are now passthrough wrappers
// kept only to avoid touching every call site.

export const StickyHeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

interface CollapsibleSectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  bgClass?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ id, children }) => (
  <div id={id}>{children}</div>
);

export default CollapsibleSection;
