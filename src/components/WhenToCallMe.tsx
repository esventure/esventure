import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const scenarios = [
  {
    emoji: "🩹",
    keyword: "The Unfinished Business",
    quote: "That one project that's been dragging on forever, collecting dust, and giving you anxiety.",
    response: "Cut the crap and finish it. I'll dive in, identify the real blockers, and drive it to completion. No more excuses.",
  },
  {
    emoji: "🏔️",
    keyword: "The Overwhelm Avalanche",
    quote: "You're a solo entrepreneur (or a small team) buried under a mountain of tasks, and you can't even see your desk anymore.",
    response: "Clear the path. I'll sort the chaos, prioritize the critical, and take the heaviest loads off your plate so you can breathe (and build).",
  },
  {
    emoji: "🔧",
    keyword: "The Bottleneck Breakdown",
    quote: "Something critical is stuck. A process is broken, a system isn't talking to another, and everything's grinding to a halt.",
    response: "Unclog the pipes. I'll find the choke point, diagnose the problem, and implement a solution that gets things flowing again. Fast.",
  },
  {
    emoji: "⚰️",
    keyword: "The Idea Graveyard",
    quote: "You've got brilliant ideas, but they just sit there, dying a slow death because no one has the bandwidth or know-how to make them real.",
    response: "Resurrect the good stuff. I'll pick the winners, build the roadmap, and personally drive that idea from concept to concrete reality.",
  },
  {
    emoji: "👻",
    keyword: 'The "Who Even Does That?" Gap',
    quote: "There's a crucial role or task that no one's owning, and it's impacting everything.",
    response: "Fill the void. I'll step in, take charge, and ensure that critical piece of the puzzle is handled with precision and accountability.",
  },
  {
    emoji: "🧹",
    keyword: "The Messy Handover",
    quote: "You're transitioning, scaling, or just need someone to make sense of a chaotic situation before it blows up.",
    response: "Bring in the cleanup crew. I'll organize the disarray, document the undocumented, and set up systems so the next person (or you) can hit the ground running.",
  },
];

const differentiators = [
  { bold: "Doesn't just advise, does.", sub: "I roll up my sleeves and get my hands dirty." },
  { bold: "Cuts through the noise.", sub: "I find the real problem, not just the symptoms." },
  { bold: "Delivers results, not reports.", sub: "My goal is to make your problem disappear." },
  { bold: "Your personal force multiplier.", sub: "I give you back time, energy, and peace of mind." },
];

const WhenToCallMe = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile();

  const selected = scenarios[selectedIndex];

  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4">
            When to Call Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            When your project is bleeding time, money, or sanity — you don't need a pep talk. You need a surgeon.
          </p>
        </motion.div>

        {/* Two-column layout (desktop) / single column (mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Scenario list */}
          <div className="flex flex-col gap-2">
            {scenarios.map((s, i) => {
              const isActive = selectedIndex === i;
              return (
                <React.Fragment key={i}>
                  <motion.button
                    onClick={() => setSelectedIndex(i)}
                    className={`text-left w-full px-5 py-4 rounded-2xl border transition-all duration-200 ${
                      isActive
                        ? "border-primary/40 bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border/50 bg-card hover:border-primary/20 hover:bg-primary/[0.02]"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5 shrink-0">{s.emoji}</span>
                      <div className="min-w-0">
                        <p className="font-black text-foreground font-poppins text-sm leading-tight">
                          {s.keyword}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {s.quote}
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  {/* Mobile: inline response */}
                  {isMobile && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 py-4 rounded-2xl bg-primary/5 border border-primary/20 mb-1">
                            <p className="text-sm text-foreground leading-relaxed">
                              {s.response}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right: Response panel (desktop only) */}
          {!isMobile && (
            <div className="sticky top-32 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="rounded-3xl border border-primary/20 bg-primary/5 p-8"
                >
                  <span className="text-4xl block mb-4">{selected.emoji}</span>
                  <h3 className="text-2xl font-black text-foreground font-poppins mb-4">
                    {selected.keyword}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-base">
                    {selected.response}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Why Call Me? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-foreground font-poppins mb-6">
            Why Call Me?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/50 bg-card p-5"
              >
                <p className="font-bold text-foreground text-sm">{d.bold}</p>
                <p className="text-xs text-muted-foreground mt-1">{d.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhenToCallMe;
