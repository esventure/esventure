import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const scenarios = [
  {
    emoji: "🩹",
    quote: "That one project that's been dragging on forever, collecting dust, and giving you anxiety.",
    keyword: "The Unfinished Business",
    response: "Cut the crap and finish it. I'll dive in, identify the real blockers, and drive it to completion.",
  },
  {
    emoji: "🏔️",
    quote: "You're buried under a mountain of tasks and you can't even see your desk anymore.",
    keyword: "The Overwhelm Avalanche",
    response: "I'll sort the chaos, prioritize the critical, and take the heaviest loads off your plate.",
  },
  {
    emoji: "🔧",
    quote: "Something critical is stuck. A process is broken and everything's grinding to a halt.",
    keyword: "The Bottleneck Breakdown",
    response: "I'll find the choke point, diagnose the problem, and get things flowing again. Fast.",
  },
  {
    emoji: "⚰️",
    quote: "Brilliant ideas just sitting there, dying a slow death because no one has the bandwidth.",
    keyword: "The Idea Graveyard",
    response: "I'll pick the winners, build the roadmap, and drive that idea from concept to reality.",
  },
  {
    emoji: "👻",
    quote: "There's a crucial role or task that no one's owning, and it's impacting everything.",
    keyword: 'The "Who Even Does That?" Gap',
    response: "I'll step in, take charge, and ensure that critical piece is handled with precision.",
  },
  {
    emoji: "🧹",
    quote: "You're transitioning, scaling, or need someone to make sense of chaos before it blows up.",
    keyword: "The Messy Handover",
    response: "I'll organize the disarray, document the undocumented, and set up systems so you can hit the ground running.",
  },
];

const WhenToCallMe = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4">
            When to Call Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When your project is bleeding time, money, or sanity — you don't need a pep talk. You need a fixer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((s, i) => {
            const isSelected = selectedIndex === i;
            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                className={`text-left p-5 rounded-3xl border transition-all duration-200 ${
                  isSelected
                    ? "border-primary/40 bg-primary/5 shadow-md shadow-primary/10"
                    : "border-border/50 bg-card shadow-sm hover:shadow-md hover:shadow-primary/10"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="text-2xl mb-2 block">{s.emoji}</span>
                <p className="text-sm text-foreground/80 leading-relaxed mb-1">
                  "{s.quote}"
                </p>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-primary/20">
                        <p className="font-black text-foreground font-poppins text-sm mb-1">
                          {s.keyword}
                        </p>
                        <p className="text-foreground/70 text-xs leading-relaxed">
                          "{s.response}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhenToCallMe;
