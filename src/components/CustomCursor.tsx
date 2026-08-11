import { useEffect, useRef, useState } from "react";

/**
 * Boutique detail: an 8px yellow dot that follows the pointer and expands
 * to 24px over interactive elements. Desktop pointers only, and skipped
 * entirely for visitors who prefer reduced motion.
 */
const INTERACTIVE = 'a, button, [role="button"], summary, label[for]';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const render = () => {
      raf = 0;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(INTERACTIVE));
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-secondary transition-[width,height,opacity] duration-200 ease-out mix-blend-normal"
      style={{
        width: hovering ? 24 : 8,
        height: hovering ? 24 : 8,
        opacity: visible ? (hovering ? 0.85 : 1) : 0,
      }}
    />
  );
};

export default CustomCursor;
