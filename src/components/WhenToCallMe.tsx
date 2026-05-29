import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const WhenToCallMe = () => {
  const { t } = useTranslation();
  const triggers = t("whenToCallMe.triggers", { returnObjects: true }) as string[];
  const differentiators = t("whenToCallMe.differentiators", { returnObjects: true }) as string[];

  return (
    <section id="about" className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-3">
            {t("whenToCallMe.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("whenToCallMe.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {triggers.map((tr, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-2xl border border-border/60 bg-card px-4 py-5 text-center text-sm md:text-base font-medium text-foreground font-poppins"
            >
              {tr}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-base md:text-lg text-muted-foreground"
        >
          {t("whenToCallMe.summary")}{" "}
          <span className="text-foreground font-semibold">{t("whenToCallMe.summaryEm")}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-border/60"
        >
          <h3 className="text-2xl md:text-3xl font-black text-foreground font-poppins mb-6">
            {t("whenToCallMe.whyTitle")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {differentiators.map((d, i) => (
              <span
                key={i}
                className="rounded-full bg-primary/10 text-foreground text-sm md:text-base font-medium px-4 py-2"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhenToCallMe;
