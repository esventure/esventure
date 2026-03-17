import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const COLLAPSED_HEIGHT = 56;

interface CollapsibleSectionProps {
  title: string;
  stickyIndex: number;
  children: React.ReactNode;
  className?: string;
  collapsedBg?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  stickyIndex,
  children,
  className = "",
  collapsedBg = "bg-primary",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const topOffset = stickyIndex * COLLAPSED_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Collapse when the bottom of the section is above the stacking area
      const threshold = topOffset + COLLAPSED_HEIGHT + 20;
      setIsCollapsed(rect.bottom < threshold + 100 && rect.top < topOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topOffset]);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={sectionRef} className="relative">
      {/* Sticky collapsed header */}
      <motion.div
        className={`sticky z-[${30 + stickyIndex}] ${collapsedBg} cursor-pointer border-b border-primary-foreground/10 overflow-hidden`}
        style={{
          top: topOffset,
          zIndex: 30 + stickyIndex,
        }}
        animate={{
          height: isCollapsed ? COLLAPSED_HEIGHT : 0,
          opacity: isCollapsed ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={scrollToSection}
      >
        <div className="h-[56px] flex items-center px-6 md:px-10">
          <p className="text-sm md:text-base font-bold text-primary-foreground font-poppins tracking-wide truncate">
            {title}
          </p>
        </div>
      </motion.div>

      {/* Full section content */}
      <div ref={contentRef} className={className}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
