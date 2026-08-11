import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import CountUpNumber from "@/components/CountUpNumber";

interface Props {
  onCta?: () => void;
}

const ServicesWorkbench = ({ onCta }: Props) => {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Array<{
    label: string;
    title: string;
    description: string;
    outcome?: string;
  }>;

  return (
    <section className="bg-charcoal text-charcoal-foreground section-pad">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16 md:mb-24 max-w-3xl"
          >
            <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.92] mb-6">
              {t("services.title")}
            </h2>
            <p className="text-lg md:text-xl text-charcoal-foreground/70 leading-relaxed">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="border-t border-charcoal-foreground/20">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                className="group relative border-b border-charcoal-foreground/20"
              >
                <div className="relative transition-colors duration-300 group-hover:bg-charcoal-foreground/[0.04] px-2 md:px-6 py-10 md:py-14">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10">
                    <CountUpNumber
                      value={i + 1}
                      className="font-display text-5xl md:text-7xl font-extrabold leading-none text-charcoal-foreground/25 transition-colors duration-300 group-hover:text-secondary md:w-48 lg:w-56 shrink-0"
                    />
                    <div className="flex-1">
                      <span className="label-eyebrow block text-charcoal-foreground/50 mb-3">
                        {s.label}
                      </span>
                      <h3 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.02] tracking-tight inline-block">
                        <span className="relative">
                          {s.title}
                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
                        </span>
                      </h3>
                      <p className="mt-5 max-w-2xl text-sm md:text-base text-charcoal-foreground/65 leading-relaxed">
                        {s.description}
                      </p>
                      {s.outcome && (
                        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 md:motion-safe:group-hover:mt-5">
                          <p className="label-eyebrow text-secondary pt-5 md:pt-0">
                            {t("services.outcomeLabel")} - {s.outcome}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button
              onClick={onCta}
              className="group inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 font-bold text-secondary-foreground transition-all hover:gap-3 hover:bg-secondary/90"
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
