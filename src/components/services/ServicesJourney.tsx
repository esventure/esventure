import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Rocket, MessagesSquare, Workflow, Sparkles, ArrowRight } from "lucide-react";

const icons = [Rocket, MessagesSquare, Workflow, Sparkles];

interface Props {
  onCta?: () => void;
}

const ServicesJourney = ({ onCta }: Props) => {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Array<{
    label: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-background py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24 max-w-3xl"
          >
            <h2 className="font-poppins text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[0.95] mb-5">
              {t("services.title")}
            </h2>
            <p className="text-lg md:text-2xl text-muted-foreground">{t("services.subtitle")}</p>
          </motion.div>

          {/* Path */}
          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute left-0 right-0 top-10 h-px">
              <div className="absolute inset-0 border-t-2 border-dashed border-border" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
                className="absolute inset-0 border-t-2 border-primary/40"
              />
            </div>
            {/* Mobile vertical line */}
            <div className="md:hidden absolute left-10 top-0 bottom-0 w-px border-l-2 border-dashed border-border" />

            <div className="grid gap-12 md:grid-cols-4 md:gap-8">
              {services.map((s, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                    className="group relative flex md:flex-col gap-6 md:gap-0"
                  >
                    <div className="relative z-10 shrink-0">
                      <div className="w-20 h-20 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
                        <Icon className="w-9 h-9 text-primary" strokeWidth={1.25} />
                      </div>
                      <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary text-secondary-foreground font-poppins text-xs font-black flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>

                    <div className="md:mt-8">
                      <span className="block font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        {s.label}
                      </span>
                      <h3 className="font-poppins text-2xl md:text-[1.6rem] font-black text-foreground leading-tight mb-3">
                        {s.title}
                      </h3>
                      <p className="text-base text-foreground/70 leading-relaxed">{s.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 md:mt-20 flex justify-center">
            <button
              onClick={onCta}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90"
            >
              {t("services.cta")}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesJourney;
