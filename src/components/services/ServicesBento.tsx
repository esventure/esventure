import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Rocket, MessagesSquare, Workflow, Sparkles, ArrowRight } from "lucide-react";

const icons = [Rocket, MessagesSquare, Workflow, Sparkles];

interface Props {
  onCta?: () => void;
}

const ServicesBento = ({ onCta }: Props) => {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Array<{
    label: string;
    title: string;
    description: string;
  }>;

  const Tile = ({
    i,
    hero = false,
  }: {
    i: number;
    hero?: boolean;
  }) => {
    const s = services[i];
    const Icon = icons[i];
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: i * 0.08 }}
        className={`group relative flex flex-col rounded-3xl border border-border/70 bg-card p-8 md:p-10 transition-colors hover:border-primary/40 ${
          hero ? "md:row-span-2 justify-between" : ""
        }`}
      >
        <div>
          <Icon
            className={`text-primary mb-6 ${hero ? "w-14 h-14" : "w-10 h-10"}`}
            strokeWidth={1.25}
          />
          <span className="block font-poppins text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {s.label}
          </span>
          <h3
            className={`font-poppins font-black text-foreground leading-[1.05] mb-4 ${
              hero ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {s.title}
          </h3>
          <p
            className={`text-foreground/70 leading-relaxed ${
              hero ? "text-lg md:text-xl max-w-md" : "text-base"
            }`}
          >
            {s.description}
          </p>
        </div>
        <div className="mt-8">
          <div className="h-1 w-10 bg-secondary rounded-full transition-all duration-500 group-hover:w-24" />
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-muted/40 py-20 md:py-28">
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

          <div className="grid gap-5 md:grid-cols-2">
            <Tile i={0} hero />
            <div className="grid gap-5">
              <Tile i={1} />
              <Tile i={2} />
            </div>
            <div className="md:col-span-2">
              <Tile i={3} />
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={onCta}
              className="group inline-flex items-center gap-2 font-bold text-primary text-base transition-all hover:gap-3"
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

export default ServicesBento;
