import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? scenarios[selectedIndex] : null;

  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4">
            When to Call Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Sound familiar? Tap one.
          </p>
        </motion.div>

        {/* Visual tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {scenarios.map((s, i) => {
            const isActive = selectedIndex === i;
            return (
              <motion.button
                key={i}
                onClick={() => setSelectedIndex(isActive ? null : i)}
                className={`group aspect-square rounded-2xl border flex flex-col items-center justify-center gap-3 px-4 text-center transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                    : "border-border/60 bg-card hover:border-primary/40 hover:bg-primary/[0.02]"
                }`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <span className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110">
                  {s.emoji}
                </span>
                <span className="font-black text-foreground font-poppins text-sm md:text-base leading-tight">
                  {s.keyword}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel — only when something is selected */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{selected.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground italic mb-3 leading-relaxed">
                      {selected.quote}
                    </p>
                    <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                      {selected.response}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {differentiators.map((d, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-primary font-black text-lg leading-tight shrink-0">→</span>
                <div>
                  <p className="font-bold text-foreground text-sm">{d.bold}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhenToCallMe;
