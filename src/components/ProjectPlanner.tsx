import React, { useState, useRef, useEffect, Children, isValidElement } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import ReactMarkdown from "react-markdown";
import { analytics } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
interface FormData {
  situation: string;
  handoff: string;
  urgency: string;
  budget: string;
}

const SITUATION_PLACEHOLDERS_BY_LANG: Record<string, string[]> = {
  en: [
    "There's a project stuck and no one owns it.",
    "Our process is causing headaches and slowing everyone down.",
    "I have a big idea but no clue where to start.",
    "We keep talking but nothing actually moves forward.",
    "There's a critical gap and no one to fill it.",
    "Deadlines keep slipping and priorities are all over the place.",
    "We built something but it confuses everyone who uses it.",
    "Multiple teams are involved and nobody's aligned.",
    "Things keep falling through the cracks.",
    "I need someone to just take this off my plate and run with it.",
  ],
  nl: [
    "Er ligt een project stil en niemand is eigenaar.",
    "Ons proces zorgt voor kopzorgen en vertraagt iedereen.",
    "Ik heb een groot idee maar geen idee waar te beginnen.",
    "We blijven praten maar er gebeurt niets.",
    "Er is een kritieke gap en niemand om die te vullen.",
    "Deadlines blijven verschuiven en prioriteiten zijn onduidelijk.",
    "We bouwden iets, maar gebruikers raken erin verdwaald.",
    "Meerdere teams zijn betrokken en niemand is gealigneerd.",
    "Dingen blijven tussen wal en schip vallen.",
    "Ik heb iemand nodig die dit van mijn bord pakt en ermee aan de slag gaat.",
  ],
};

const HANDOFF_PLACEHOLDERS_BY_LANG: Record<string, string[]> = {
  en: [
    "Step in and take charge of this project.",
    "Turn my vision into an actionable plan.",
    "Diagnose this issue fast and give me a working fix.",
    "Unblock my team so we can start shipping.",
    "Build me a prototype I can test and pitch.",
    "Figure out what's broken in our process and fix it.",
    "Coordinate this launch and keep everyone aligned.",
    "Create a clear roadmap from this mess of ideas.",
    "Get this project over the finish line.",
    "Help me figure out what to prioritise and how to execute.",
  ],
  nl: [
    "Stap in en neem de leiding over dit project.",
    "Vertaal mijn visie naar een uitvoerbaar plan.",
    "Diagnosticeer dit snel en geef me een werkende fix.",
    "Deblokkeer mijn team zodat we kunnen leveren.",
    "Bouw een prototype dat ik kan testen en pitchen.",
    "Zoek uit wat er kapot is in ons proces en fix het.",
    "Coördineer deze launch en houd iedereen op één lijn.",
    "Maak een heldere roadmap van deze chaos aan ideeën.",
    "Breng dit project over de finish.",
    "Help me bepalen wat prioriteit heeft en hoe we het uitvoeren.",
  ],
};

const BUDGET_OPTION_VALUES = ["", "< €1.000", "€1.000–€3.000", "€3.000–€6.000", "€6.000+"];

// Animated placeholder component
const AnimatedPlaceholder = ({ 
  text, 
  isVisible 
}: { 
  text: string; 
  isVisible: boolean;
}) => {
  if (!isVisible) return null;
  
  return (
    <motion.span
      key={text}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute left-4 top-3 text-muted-foreground/50 text-base pointer-events-none"
    >
      {text}
    </motion.span>
  );
};

const PlannerForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").startsWith("nl") ? "nl" : "en";
  const SITUATION_PLACEHOLDERS = SITUATION_PLACEHOLDERS_BY_LANG[lang];
  const HANDOFF_PLACEHOLDERS = HANDOFF_PLACEHOLDERS_BY_LANG[lang];
  const URGENCY_OPTIONS = t("planner.urgencyOptions", { returnObjects: true }) as string[];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders every 3.5 seconds when fields are empty
  useEffect(() => {
    if (formData.situation || formData.handoff) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SITUATION_PLACEHOLDERS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [formData.situation, formData.handoff, SITUATION_PLACEHOLDERS.length]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* What's going on? */}
      <div className="space-y-2">
        <label htmlFor="situation" className="text-base font-medium text-foreground/80">
          {t("planner.situationLabel")}
        </label>
        <div className="relative">
          <textarea
            id="situation"
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            className="w-full min-h-[80px] md:min-h-[100px] px-4 py-3 bg-background rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none text-foreground text-base transition-all"
          />
          <AnimatePresence mode="wait">
            <AnimatedPlaceholder
              key={placeholderIndex}
              text={SITUATION_PLACEHOLDERS[placeholderIndex]}
              isVisible={!formData.situation}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* What should I take off your plate? */}
      <div className="space-y-2">
        <label htmlFor="handoff" className="text-base font-medium text-foreground/80">
          {t("planner.handoffLabel")}
        </label>
        <div className="relative">
          <textarea
            id="handoff"
            value={formData.handoff}
            onChange={(e) => setFormData({ ...formData, handoff: e.target.value })}
            className="w-full min-h-[80px] md:min-h-[100px] px-4 py-3 bg-background rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none text-foreground text-base transition-all"
          />
          <AnimatePresence mode="wait">
            <AnimatedPlaceholder
              key={placeholderIndex}
              text={HANDOFF_PLACEHOLDERS[placeholderIndex]}
              isVisible={!formData.handoff}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Urgency */}
      <div className="space-y-3">
        <label className="text-base font-medium text-foreground/80">
          {t("planner.urgencyLabel")}
        </label>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
          {URGENCY_OPTIONS.map((urgency) => {
            const isUrgent = urgency.includes("🔥");
            const isSelected = formData.urgency === urgency;

            return (
              <button
                key={urgency}
                type="button"
                onClick={() => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                  }
                  setFormData({ ...formData, urgency });
                }}
                className={`min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  isSelected
                    ? isUrgent
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground border border-primary/30 hover:border-primary hover:text-foreground"
                }`}
              >
                {urgency}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label htmlFor="budget" className="text-base font-medium text-foreground/80">
          {t("planner.budgetLabel")} <span className="text-muted-foreground/60">{t("planner.optional")}</span>
        </label>
        <div className="relative">
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full min-h-[44px] px-4 py-3 pr-10 bg-background rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 text-foreground text-base appearance-none cursor-pointer transition-all"
          >
            {BUDGET_OPTION_VALUES.map((value) => (
              <option key={value} value={value} className="bg-background text-foreground">
                {value === "" ? t("planner.budgetOptions.none") : value}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6 space-y-4">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !formData.situation || !formData.handoff}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full py-6 text-base font-semibold transition-all disabled:opacity-40 group"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("planner.submitting")}
            </>
          ) : (
            <>
              {t("planner.submit")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground/70 text-center">
          {t("planner.submitHint")}
        </p>
      </div>
    </div>
  );
};

const ContactForm = ({ projectPlan }: { projectPlan: string }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            projectPlan,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit");

      setIsSubmitted(true);
      toast.success(t("planner.contact.success"));
    } catch (err) {
      toast.error(t("planner.contact.error"));
      console.error("Contact form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 text-secondary"
      >
        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
          <Check className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium">{t("planner.contact.successInline")}</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder={t("planner.contact.firstName")}
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          required
          className="bg-background border-secondary/30 focus:border-secondary"
        />
        <Input
          placeholder={t("planner.contact.lastName")}
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          required
          className="bg-background border-secondary/30 focus:border-secondary"
        />
      </div>
      <Input
        type="email"
        placeholder={t("planner.contact.email")}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="bg-background border-secondary/30 focus:border-secondary"
      />
      <Input
        type="tel"
        placeholder={t("planner.contact.phone")}
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="bg-background border-secondary/30 focus:border-secondary"
      />
      <Button
        type="submit"
        disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-semibold group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("planner.contact.sending")}
          </>
        ) : (
          <>
            {t("planner.contact.submit")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </Button>
    </form>
  );
};

const ResultPanel = ({
  result,
  isLoading = false,
}: {
  result: string | null;
  isLoading?: boolean;
}) => {
  const { t } = useTranslation();
  const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children || '');
      const isMetric = /Timeline|Estimated|Ballpark|Tijdlijn|Indicatieve|Kostenindicatie|Doorlooptijd/i.test(text);

      return (
        <h4 className={`font-semibold text-foreground mb-2 ${isMetric ? 'text-sm text-muted-foreground mt-6' : 'text-base mt-8 first:mt-0'}`}>
          {children}
        </h4>
      );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 mb-3 leading-relaxed text-[15px]">{children}</p>
    ),
    ol: ({ children }: { children?: React.ReactNode; node?: any }) => {
      let stepNum = 0;
      const numberedChildren = Children.map(children, (child) => {
        if (isValidElement(child)) {
          stepNum++;
          return (
            <li key={stepNum} className="text-foreground/80 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                {stepNum}
              </span>
              <span className="flex-1">{(child.props as any)?.children}</span>
            </li>
          );
        }
        return child;
      });
      return <ol className="space-y-3 my-4 text-[15px] list-none">{numberedChildren}</ol>;
    },
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 my-3 text-[15px] list-disc list-outside pl-5 marker:text-primary">{children}</ul>
    ),
    li: ({ children }: { children?: React.ReactNode; node?: any }) => {
      return <li className="text-foreground/80 leading-relaxed">{children}</li>;
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="text-muted-foreground">{children}</em>
    ),
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl bg-primary/5 border-l-4 border-primary p-8 min-h-[200px] flex items-center justify-center"
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>{t("planner.loading")}</span>
        </div>
      </motion.div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl bg-primary/5 border-l-4 border-primary/30 p-8 min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground/60 text-sm">
          {t("planner.resultPlaceholder")}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-secondary/10 border-l-4 border-secondary p-6 md:p-8"
    >
      <ReactMarkdown components={markdownComponents}>{result}</ReactMarkdown>

      <div className="mt-8 pt-6 border-t border-secondary/20 space-y-4">
        <Button
          onClick={() => {
            analytics.bookCallClick();
            window.open("https://calendar.app.google/5GxNAzn7W3FJNMrh8", "_blank");
          }}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base font-semibold group"
        >
          {t("planner.discussCta")}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
        <p className="text-xs text-muted-foreground/70">
          {t("planner.ballparkNote")}
        </p>
        <ContactForm projectPlan={result} />
      </div>
    </motion.div>
  );
};

const ProjectPlanner = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    situation: "",
    handoff: "",
    urgency: "",
    budget: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultPanelRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    if (resultPanelRef.current) {
      const yOffset = -100;
      const element = resultPanelRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isLoading && resultPanelRef.current) {
      setTimeout(scrollToResults, 150);
    }
  }, [isLoading]);

  const handleSubmit = async () => {
    if (!formData.situation || !formData.handoff) return;

    setIsLoading(true);
    setError(null);

    try {
      const language = (i18n.language || "en").startsWith("nl") ? "nl" : "en";
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/project-outline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ ...formData, language }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await response.json();
      setResult(data.reply);
      analytics.projectPlannerSubmit({ urgency: formData.urgency, budget: formData.budget });
    } catch (err) {
      setError(t("planner.error"));
      console.error("Error generating plan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { label: t("planner.steps.describe"), num: 1 },
    { label: t("planner.steps.handoff"), num: 2 },
    { label: t("planner.steps.details"), num: 3 },
  ];

  return (
    <section id="project-planner" className="py-12 md:py-16 bg-background pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 font-poppins">
              {t("planner.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("planner.subtitle")}
            </p>
            <div className="flex items-center justify-center gap-3">
              {steps.map((step, i) => (
                <React.Fragment key={step.label}>
                  {i > 0 && <div className="w-8 h-px bg-border" />}
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step.num}</span>
                    <span className="text-sm font-medium text-muted-foreground hidden sm:inline">{step.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="rounded-2xl bg-primary/5 p-6 md:p-8">
              <PlannerForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>

            <div ref={resultPanelRef}>
              <ResultPanel result={result} isLoading={isLoading} />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-center mt-6 text-sm"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectPlanner;
