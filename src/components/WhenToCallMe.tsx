import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Zap, Scissors, CheckCircle2, HandHelping } from "lucide-react";

const WhenToCallMe = () => {
  const { t } = useTranslation();
  const triggers = t("whenToCallMe.triggers", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const differentiators = t("whenToCallMe.differentiators", { returnObjects: true }) as string[];
  const symptomLabel = t("whenToCallMe.symptomLabel");

  const diffIcons = [Zap, Scissors, CheckCircle2, HandHelping];

  // Art-directed offsets instead of a uniform grid
  const offsets = [
    "md:col-start-1 md:col-span-7",
    "md:col-start-7 md:col-span-6 md:mt-16",
    "md:col-start-2 md:col-span-6 md:mt-10",
    "md:col-start-8 md:col-span-5 md:mt-20",
    "md:col-start-1 md:col-span-6 md:mt-10",
    "md:col-start-7 md:col-span-6 md:mt-20",
  ];

  return (
    <section className="bg-section-yellow text-section-yellow-foreground section-pad">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {/* Scenarios */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-14 md:mb-20 max-w-3xl"
            >
              <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.92] mb-6">
                {t("whenToCallMe.title")}
              </h2>
              <p className="text-lg md:text-xl text-section-yellow-foreground/70 leading-relaxed">
                {t("whenToCallMe.subtitle")}
              </p>
            </motion.div>

            {/* Mobile: horizontal snap scroll. Desktop: staggered editorial grid */}
            <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-12 md:gap-x-8 md:gap-y-0 md:overflow-visible md:px-0 md:pb-0">
              {triggers.map((tr, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: "easeOut" }}
                  className={`group w-[78vw] shrink-0 snap-start md:w-auto ${offsets[i]}`}
                >
                  <div className="h-full border-t border-section-yellow-foreground/20 pt-6">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-display text-3xl md:text-5xl font-extrabold leading-none text-section-yellow-foreground/25 transition-colors duration-300 group-hover:text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="label-eyebrow text-section-yellow-foreground/50">{symptomLabel}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                      {tr.title}
                    </h3>
                    <p className="text-sm md:text-base text-section-yellow-foreground/70 leading-relaxed mb-5">
                      {tr.description}
                    </p>
                    <div className="h-[2px] w-8 bg-primary transition-all duration-300 group-hover:w-20" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-16 md:mt-24 text-lg md:text-2xl text-section-yellow-foreground/70 leading-relaxed max-w-4xl"
            >
              {t("whenToCallMe.summary")}{" "}
              <span className="font-semibold text-section-yellow-foreground">{t("whenToCallMe.summaryEm")}</span>
            </motion.p>
          </div>

          {/* Why */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <h3 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">
                {t("whenToCallMe.whyTitle")}
              </h3>
              <div className="hidden md:block h-px flex-grow ml-10 bg-section-yellow-foreground/20 mb-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {differentiators.map((d, i) => {
                const Icon = diffIcons[i % diffIcons.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group flex items-start gap-5 border-t border-section-yellow-foreground/20 pt-6"
                  >
                    <Icon
                      className="w-6 h-6 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />
                    <p className="font-display text-lg md:text-2xl font-bold leading-snug">{d}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhenToCallMe;
