import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Zap, Scissors, CheckCircle2, HandHelping } from "lucide-react";

const WhenToCallMe = () => {
  const { t } = useTranslation();
  const triggers = t("whenToCallMe.triggers", { returnObjects: true }) as string[];
  const differentiators = t("whenToCallMe.differentiators", { returnObjects: true }) as string[];
  const symptomLabel = t("whenToCallMe.symptomLabel");

  const diffIcons = [Zap, Scissors, CheckCircle2, HandHelping];
  const diffBg = [
    "bg-primary text-primary-foreground",
    "bg-secondary text-foreground",
    "bg-secondary text-foreground",
    "bg-primary text-primary-foreground",
  ];

  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Symptoms */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins tracking-tight mb-3">
              {t("whenToCallMe.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("whenToCallMe.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/60 border border-border/60 overflow-hidden rounded-2xl">
            {triggers.map((tr, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-card p-8 group hover:bg-muted/40 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">
                  {symptomLabel} {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-foreground font-poppins leading-tight mb-4">
                  {tr}
                </h3>
                <div className="w-8 h-1 bg-secondary group-hover:w-16 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            {t("whenToCallMe.summary")}{" "}
            <span className="font-bold text-foreground border-b-2 border-primary">
              {t("whenToCallMe.summaryEm")}
            </span>
          </motion.p>
        </div>

        {/* Why */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <h3 className="text-3xl md:text-4xl font-black text-foreground font-poppins">
              {t("whenToCallMe.whyTitle")}
            </h3>
            <div className="hidden md:block h-px flex-grow mx-8 bg-border mb-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => {
              const Icon = diffIcons[i % diffIcons.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-start gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border/60"
                >
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${diffBg[i % diffBg.length]}`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <p className="text-base md:text-lg font-bold text-foreground pt-1">{d}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhenToCallMe;
