import React, { Children, isValidElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

interface ProjectPlannerProps {
  /** Called with the generated plan so the enquiry form can send it along. */
  onPlan?: (plan: string) => void;
  /** Called when the reader wants to continue to the enquiry form. */
  onContinue?: () => void;
}

const ROUTE_KEYS = ["brand", "website", "prototype"] as const;

const ProjectPlanner = ({ onPlan, onContinue }: ProjectPlannerProps) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "nl").startsWith("nl") ? "nl" : "en";

  const placeholders = t("plan.placeholders", { returnObjects: true }) as string[];
  const routeLabels = t("plan.routeOptions", { returnObjects: true }) as string[];
  const timingOptions = t("plan.timingOptions", { returnObjects: true }) as string[];
  const budgetOptions = t("plan.budgetOptions", { returnObjects: true }) as string[];

  const [situation, setSituation] = useState("");
  const [routeIndex, setRouteIndex] = useState(-1);
  const [timingIndex, setTimingIndex] = useState(0);
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (situation) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [situation, placeholders.length]);

  useEffect(() => {
    if ((isLoading || result) && resultRef.current) {
      const y = resultRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSubmit = async () => {
    if (!situation.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/project-outline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          situation: situation.trim().slice(0, 3000),
          route: routeIndex >= 0 ? ROUTE_KEYS[routeIndex] : "",
          urgency: timingOptions[timingIndex] ?? "",
          budget: budgetIndex > 0 ? budgetOptions[budgetIndex] : "",
          language: lang,
        }),
      });

      if (!response.ok) throw new Error("plan failed");
      const data = await response.json();
      if (!data.reply) throw new Error("empty plan");
      setResult(data.reply);
      onPlan?.(data.reply);
      analytics.projectPlannerSubmit?.({
        urgency: timingOptions[timingIndex] ?? "",
        budget: budgetIndex > 0 ? budgetOptions[budgetIndex] : "",
      });
    } catch (err) {
      console.error("Project plan failed", err);
      setError(t("plan.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-plum/20 bg-background px-4 py-3 text-base text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

  const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-7 first:mt-0 font-display text-base font-bold tracking-[-0.01em]">{children}</h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="mt-2 text-[15px] leading-relaxed text-plum/80">{children}</p>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => {
      let step = 0;
      const numbered = Children.map(children, (child) => {
        if (isValidElement(child)) {
          step += 1;
          return (
            <li key={step} className="flex items-start gap-3 text-[15px] leading-relaxed text-plum/80">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {step}
              </span>
              <span className="flex-1">{(child.props as { children?: React.ReactNode })?.children}</span>
            </li>
          );
        }
        return child;
      });
      return <ol className="mt-3 list-none space-y-2.5">{numbered}</ol>;
    },
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-plum/80 marker:text-coral">{children}</ul>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-display text-xl font-bold text-foreground">{children}</strong>
    ),
  };

  return (
    <section id="project-planner" className="mt-14">
      <div className="rounded-[1.75rem] border border-plum/12 bg-muted/60 p-6 md:p-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coral">
          {t("plan.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">
          {t("plan.title")}
        </h2>
        <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-plum/75">{t("plan.intro")}</p>

        <div className="mt-8 space-y-7">
          <div className="space-y-2">
            <label htmlFor="plan-situation" className="block text-base font-semibold">
              {t("plan.situationLabel")}
            </label>
            <div className="relative">
              <textarea
                id="plan-situation"
                value={situation}
                maxLength={2000}
                onChange={(e) => setSituation(e.target.value)}
                className={`${fieldClass} min-h-[110px] resize-y`}
              />
              <AnimatePresence mode="wait">
                {!situation && (
                  <motion.span
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute left-4 top-3 text-base text-plum/45"
                  >
                    {placeholders[placeholderIndex]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-base font-semibold">{t("plan.routeLabel")}</legend>
            <div className="flex flex-wrap gap-2">
              {routeLabels.map((label, index) => {
                const selected = routeIndex === index;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRouteIndex(selected ? -1 : index)}
                    className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "border border-plum/25 text-plum/80 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="plan-timing" className="block text-base font-semibold">
                {t("plan.timingLabel")}
              </label>
              <div className="relative">
                <select
                  id="plan-timing"
                  value={timingIndex}
                  onChange={(e) => setTimingIndex(Number(e.target.value))}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  {timingOptions.map((option, index) => (
                    <option key={option} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-plum/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="plan-budget" className="block text-base font-semibold">
                {t("plan.budgetLabel")} <span className="font-normal text-plum/55">{t("plan.optional")}</span>
              </label>
              <div className="relative">
                <select
                  id="plan-budget"
                  value={budgetIndex}
                  onChange={(e) => setBudgetIndex(Number(e.target.value))}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  {budgetOptions.map((option, index) => (
                    <option key={option} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-plum/50" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!situation.trim() || isLoading}
              className="w-full rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-coral hover:text-coral-foreground disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("plan.submitting")}
                </>
              ) : (
                <>
                  {t("plan.submit")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-center text-xs text-plum/60">{t("plan.hint")}</p>
          </div>
        </div>
      </div>

      <div ref={resultRef}>
        {isLoading && (
          <div className="mt-8 flex min-h-[180px] items-center justify-center rounded-[1.75rem] bg-secondary/40 p-8">
            <span className="flex items-center gap-3 text-sm font-medium text-plum/70">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              {t("plan.loading")}
            </span>
          </div>
        )}

        {!isLoading && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-[1.75rem] bg-secondary p-6 text-secondary-foreground md:p-8"
          >
            <ReactMarkdown components={markdownComponents}>{result}</ReactMarkdown>

            <div className="mt-8 space-y-4 border-t border-plum/15 pt-6">
              <p className="text-sm leading-relaxed text-plum/70">{t("plan.note")}</p>
              <Button
                type="button"
                onClick={onContinue}
                className="w-full rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-coral hover:text-coral-foreground"
              >
                {t("plan.continue")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {error && <p className="mt-6 text-sm font-medium text-destructive">{error}</p>}
      </div>
    </section>
  );
};

export default ProjectPlanner;
