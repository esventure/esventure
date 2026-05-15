import React from "react";
import { motion } from "framer-motion";

const scenarios = [
  {
    quote: "We've been 'almost done' with this for six months.",
    response: "I move in, find the actual blocker, and ship it.",
  },
  {
    quote: "I'm the founder, the ops person, the support team, and now also the bookkeeper.",
    response: "I take the heaviest things off your plate so you can run the business again.",
  },
  {
    quote: "Our tools don't talk to each other and three people are doing the same thing twice.",
    response: "I map what's actually happening, then fix the plumbing.",
  },
  {
    quote: "We have a Notion full of great ideas and zero of them have shipped.",
    response: "I pick the one that matters and drive it to live.",
  },
  {
    quote: "Nobody owns this, and it's quietly breaking everything.",
    response: "I step in, take it, and run it until it's stable.",
  },
  {
    quote: "Someone left, and now nobody knows how half of it works.",
    response: "I untangle it, document it, and hand it back working.",
  },
];

const differentiators = [
  { bold: "Doesn't just advise, does.", sub: "I roll up my sleeves and get my hands dirty." },
  { bold: "Cuts through the noise.", sub: "I find the real problem, not just the symptoms." },
  { bold: "Delivers results, not reports.", sub: "My goal is to make your problem disappear." },
  { bold: "Your personal force multiplier.", sub: "I give you back time, energy, and peace of mind." },
];

const WhenToCallMe = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4">
            When to Call Me
          </h2>
          <p className="text-lg text-muted-foreground">
            If any of these sound like your week, we should talk.
          </p>
        </motion.div>

        {/* Quiet list — you say / I do */}
        <ul className="divide-y divide-border/60">
          {scenarios.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="py-6 md:py-7"
            >
              <p className="text-xl md:text-2xl text-foreground font-poppins font-medium leading-snug">
                &ldquo;{s.quote}&rdquo;
              </p>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                <span className="text-primary font-bold mr-2">→</span>
                {s.response}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Why Call Me? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-border/60"
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
