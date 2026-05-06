import React, { useRef, useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLLAPSED_HEIGHT = 52;
const NAV_HEIGHT = 72; // h-14 + py-2 ≈ 72px

// ── Context to collect section refs globally ──
interface SectionInfo {
  id: string;
  title: string;
  ref: React.RefObject<HTMLDivElement>;
  bgClass: string;
}

interface StickyContextType {
  register: (info: SectionInfo) => void;
  unregister: (id: string) => void;
}

const StickyContext = createContext<StickyContextType>({
  register: () => {},
  unregister: () => {},
});

// ── Provider: wraps the page, renders fixed headers ──
export const StickyHeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [navVisible, setNavVisible] = useState(false);

  const register = useCallback((info: SectionInfo) => {
    setSections((prev) => {
      if (prev.find((s) => s.id === info.id)) return prev;
      return [...prev, info];
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if nav is visible (it shows after scrollY > 100)
      setNavVisible(window.scrollY > 100);

      const next = new Set<string>();
      sections.forEach((section) => {
        if (!section.ref.current) return;
        const rect = section.ref.current.getBoundingClientRect();
        if (rect.bottom < COLLAPSED_HEIGHT * 2 + (window.scrollY > 100 ? NAV_HEIGHT : 0)) {
          next.add(section.id);
        }
      });
      setCollapsedIds((prev) => {
        if (prev.size === next.size && [...prev].every((id) => next.has(id))) return prev;
        return next;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Keep at most the 3 most recently collapsed bars visible
  const MAX_VISIBLE = 3;
  const allCollapsed = sections.filter((s) => collapsedIds.has(s.id));
  const collapsedSections = allCollapsed.slice(-MAX_VISIBLE);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <StickyContext.Provider value={{ register, unregister }}>
      {children}

      {/* Fixed stacked headers — below the nav */}
      <motion.div
        className="fixed left-0 right-0 z-40 pointer-events-none"
        animate={{ top: navVisible ? NAV_HEIGHT : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {collapsedSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: COLLAPSED_HEIGHT, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`${section.bgClass} pointer-events-auto cursor-pointer border-b border-primary-foreground/10 overflow-hidden`}
              style={{ zIndex: 50 + i }}
              onClick={() => scrollToSection(section.ref)}
            >
              <div
                className="flex items-center px-6 md:px-10"
                style={{ height: COLLAPSED_HEIGHT }}
              >
                <p className="text-sm md:text-base font-bold text-primary-foreground font-poppins tracking-wide truncate">
                  {section.title}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </StickyContext.Provider>
  );
};

// ── Section wrapper: registers itself ──
interface CollapsibleSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bgClass?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  children,
  bgClass = "bg-primary",
}) => {
  const ref = useRef<HTMLDivElement>(null!);
  const { register, unregister } = useContext(StickyContext);

  useEffect(() => {
    register({ id, title, ref, bgClass });
    return () => unregister(id);
  }, [id, title, bgClass, register, unregister]);

  return <div ref={ref}>{children}</div>;
};

export default CollapsibleSection;
