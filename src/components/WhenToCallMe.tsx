import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const scenarios = [
  {
    emoji: "🔥",
    quote: "This project is completely stalled and I don't know why.",
    keyword: "Momentum ⚡",
    response: "Got it. Let's find the friction and get things moving again.",
  },
  {
    emoji: "🧠",
    quote: "I have a million things to do and I can't focus on what's important.",
    keyword: "Clarity 🧠",
    response: "Cool. Let's cut the noise and focus on what actually matters.",
  },
  {
    emoji: "🚀",
    quote: "We have a great idea, but no one to actually build or manage it.",
    keyword: "Ownership 🚀",
    response: "I'll step in and drive this from idea to execution.",
  },
  {
    emoji: "🧩",
    quote: "Our process is a mess and it's slowing everyone down.",
    keyword: "A Fix 🧩",
    response: "Let's untangle it and build a workflow that actually works.",
  },
];

const TypingIndicator = () => (
  <motion.div
    className="flex items-center gap-1.5 px-5 py-3 rounded-2xl rounded-bl-md bg-card border border-border/50 w-fit"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-primary/60"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.div>
);

const WhenToCallMe = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleSelect = (index: number) => {
    if (index === selectedIndex) return;
    setShowResponse(false);
    setIsTyping(false);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    setIsTyping(true);
    setShowResponse(false);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setShowResponse(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? scenarios[selectedIndex] : null;

  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
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
          <p className="text-xl text-muted-foreground">
            You don't need a perfect plan. You just need to know you need help.
          </p>
        </motion.div>

        {/* Chaos Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {scenarios.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              className={`text-left p-6 rounded-3xl border transition-all duration-200 ${
                selectedIndex === i
                  ? "border-primary/40 bg-primary/5 shadow-md shadow-primary/10"
                  : "border-border/50 bg-card shadow-sm hover:shadow-md hover:shadow-primary/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <span className="text-2xl mb-3 block">{s.emoji}</span>
              <p className="text-base text-foreground/80 leading-relaxed">
                "{s.quote}"
              </p>
            </motion.button>
          ))}
        </div>

        {/* Chat Area */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selectedIndex}
              className="space-y-4 min-h-[160px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* User bubble — right aligned */}
              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="max-w-sm px-5 py-3 rounded-2xl rounded-br-md bg-muted text-foreground/80 text-sm">
                  "{selected.quote}"
                </div>
              </motion.div>

              {/* Typing or Response — left aligned */}
              <div className="flex justify-start">
                <AnimatePresence mode="wait">
                  {isTyping ? (
                    <TypingIndicator key="typing" />
                  ) : showResponse ? (
                    <motion.div
                      key="response"
                      className="max-w-sm px-5 py-4 rounded-2xl rounded-bl-md bg-card border-l-4 border-primary/40 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="font-black text-foreground font-poppins text-lg mb-1">
                        {selected.keyword}
                      </p>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        "{selected.response}"
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WhenToCallMe;
