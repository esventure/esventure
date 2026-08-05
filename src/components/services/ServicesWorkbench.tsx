import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Rocket, MessagesSquare, Workflow, Sparkles, ArrowRight } from "lucide-react";

const icons = [Rocket, MessagesSquare, Workflow, Sparkles];
const accents = ["bg-primary", "bg-secondary", "bg-primary", "bg-secondary"];
const tilts = ["-rotate-1", "rotate-1", "rotate-[0.6deg]", "-rotate-[0.8deg]"];

interface Props {
  onCta?: () => void;
}

const ServicesWorkbench = ({ onCta }: Props) => {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Array<{
    label: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-foreground/[0.03] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-20 max-w-3xl"
          >
            <h2 className="font-poppins text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[0.95] mb-5">
              {t("services.title")}
            </h2>
            <p className="text-lg md:text-2xl text-muted-foreground">{t("services.subtitle")}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`group relative ${i % 2 === 1 ? "md:mt-12" : ""}`}
                >
                  {/* Accent block peeking from behind */}
                  <div
                    className={`absolute inset-0 rounded-3xl ${accents[i]} opacity-30 translate-x-1.5 translate-y-1.5 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3`}
                  />
                  <div
                    className={`relative rounded-3xl bg-card border border-border/70 p-8 md:p-10 shadow-sm transition-all duration-300 ${tilts[i]} group-hover:rotate-0 group-hover:shadow-lg`}
                  >
                    <div className="flex items-start gap-5 mb-6">
                      <Icon className="w-12 h-12 text-primary shrink-0" strokeWidth={1.25} />
                      <div className="pt-1">
                        <span className="block font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          {s.label}
                        </span>
                        <h3 className="font-poppins text-2xl md:text-3xl font-black text-foreground leading-tight">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 flex justify-center">
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

export default ServicesWorkbench;
