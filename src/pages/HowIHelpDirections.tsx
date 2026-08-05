import React from "react";
import { Head } from "vite-react-ssg";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServicesBento from "@/components/services/ServicesBento";
import ServicesJourney from "@/components/services/ServicesJourney";
import ServicesWorkbench from "@/components/services/ServicesWorkbench";
import LanguageToggle from "@/components/LanguageToggle";

const directions = [
  {
    short: "Toolkit",
    name: "Direction 1 - Partner's Toolkit",
    blurb: "Bento grid with a hero tile and prominent line icons.",
    Component: ServicesBento,
  },
  {
    short: "Journey",
    name: "Direction 2 - Journey Path",
    blurb: "Four stops along a connecting path, infographic style.",
    Component: ServicesJourney,
  },
  {
    short: "Workbench",
    name: "Direction 3 - Modular Workbench",
    blurb: "Tactile offset cards with accent blocks peeking out.",
    Component: ServicesWorkbench,
  },
];

const HowIHelpDirections = () => {
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState(0);

  const go = React.useCallback((next: number) => {
    setIndex((cur) => {
      const clamped = (next + directions.length) % directions.length;
      setDir(clamped > cur ? 1 : clamped < cur ? -1 : 0);
      return clamped;
    });
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  // Native pointer/touch swipe: horizontal-dominant gestures only, so vertical scroll keeps working.
  const start = React.useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(index + (dx < 0 ? 1 : -1));
    }
  };

  const current = directions[index];
  const Current = current.Component;

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>How I Help - Design Directions | Es Venture</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Control bar */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-poppins font-bold text-foreground text-sm md:text-base truncate">
              {current.name}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{current.blurb}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <LanguageToggle />
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous direction"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next direction"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main
        className="overflow-hidden touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir >= 0 ? -80 : 80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Current onCta={() => undefined} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 rounded-full border border-border bg-background/95 backdrop-blur px-2 py-2 shadow-lg">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous direction"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground transition-colors hover:bg-muted"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {directions.map((d, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                i === index
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {d.short}
            </button>
          ))}
          <button
            onClick={() => go(index + 1)}
            aria-label="Next direction"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground transition-colors hover:bg-muted"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <footer className="container mx-auto px-4 pt-10 pb-28 text-center text-sm text-muted-foreground">
        Swipe horizontally, use the arrow keys, or tap a direction below to compare.
      </footer>
    </div>
  );
};

export default HowIHelpDirections;
