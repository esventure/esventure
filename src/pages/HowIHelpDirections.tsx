import React from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServicesBento from "@/components/services/ServicesBento";
import ServicesJourney from "@/components/services/ServicesJourney";
import ServicesWorkbench from "@/components/services/ServicesWorkbench";
import LanguageToggle from "@/components/LanguageToggle";

const directions = [
  {
    name: "Direction 1 - Partner's Toolkit",
    blurb: "Bento grid with a hero tile and prominent line icons.",
    Component: ServicesBento,
  },
  {
    name: "Direction 2 - Journey Path",
    blurb: "Four stops along a connecting path, infographic style.",
    Component: ServicesJourney,
  },
  {
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
      const clamped = Math.max(0, Math.min(directions.length - 1, next));
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

  const current = directions[index];
  const Current = current.Component;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>How I Help - Design Directions | Es Venture</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

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
              disabled={index === 0}
              aria-label="Previous direction"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {directions.map((d, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={d.name}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              disabled={index === directions.length - 1}
              aria-label="Next direction"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir >= 0 ? -80 : 80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(index + 1);
              else if (info.offset.x > 80) go(index - 1);
            }}
          >
            <Current onCta={() => undefined} />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container mx-auto px-4 py-10 text-center text-sm text-muted-foreground">
        Swipe, drag, use the arrow keys or the dots to compare the three directions.
      </footer>
    </div>
  );
};

export default HowIHelpDirections;
