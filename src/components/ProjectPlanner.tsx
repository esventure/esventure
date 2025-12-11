import React, { useState, useRef, useEffect, Children, isValidElement } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";
import { analytics } from "@/lib/analytics";

interface FormData {
  situation: string;
  handoff: string;
  urgency: string;
  budget: string;
}

const SITUATION_PLACEHOLDERS = [
  "Users drop off during onboarding after step two.",
  "Feature requirements are unclear and scattered across tools.",
  "Teams disagree on the correct user flow.",
  "Our workflow is slow, messy, and unstructured.",
  "Launch is near, but nothing feels aligned yet.",
  "Stakeholders keep changing direction without documentation.",
  "We built a prototype, but it confuses everyone.",
  "Multiple systems interact, but we lack an overview.",
  "Progress stalls because no one owns next steps.",
  "Customer support repeats work due to unclear processes.",
];

const HANDOFF_PLACEHOLDERS = [
  "Create a clear user flow for this feature.",
  "Turn our idea into a clickable prototype.",
  "Map and simplify our full end-to-end process.",
  "Organise requirements into one aligned feature definition.",
  "Coordinate the project and keep everyone aligned.",
  "Document workflows and define roles for the team.",
  "Reshape our prototype into something test-ready.",
  "Translate feedback into one clear design direction.",
  "Build a realistic delivery timeline we can follow.",
  "Structure messy inputs for testing and certification.",
];

const URGENCY_OPTIONS = [
  "Just exploring",
  "Soon",
  "Needs attention",
  "It's urgent 🔥",
];

const BUDGET_OPTIONS = [
  { value: "", label: "No idea yet" },
  { value: "< €1.000", label: "< €1.000" },
  { value: "€1.000–€3.000", label: "€1.000–€3.000" },
  { value: "€3.000–€6.000", label: "€3.000–€6.000" },
  { value: "€6.000+", label: "€6.000+" },
];

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
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders every 3.5 seconds when fields are empty
  useEffect(() => {
    if (formData.situation || formData.handoff) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SITUATION_PLACEHOLDERS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [formData.situation, formData.handoff]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* What's going on? */}
      <div className="space-y-2">
        <label htmlFor="situation" className="text-base font-medium text-foreground/80">
          What's going on?
        </label>
        <textarea
          id="situation"
          placeholder={SITUATION_PLACEHOLDERS[placeholderIndex]}
          value={formData.situation}
          onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
          className="w-full min-h-[80px] md:min-h-[100px] px-4 py-3 bg-background rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none text-foreground placeholder:text-muted-foreground/50 text-base transition-all"
        />
      </div>

      {/* What should I take off your plate? */}
      <div className="space-y-2">
        <label htmlFor="handoff" className="text-base font-medium text-foreground/80">
          What should I take off your plate?
        </label>
        <textarea
          id="handoff"
          placeholder={HANDOFF_PLACEHOLDERS[placeholderIndex]}
          value={formData.handoff}
          onChange={(e) => setFormData({ ...formData, handoff: e.target.value })}
          className="w-full min-h-[80px] md:min-h-[100px] px-4 py-3 bg-background rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none text-foreground placeholder:text-muted-foreground/50 text-base transition-all"
        />
      </div>

      {/* Urgency */}
      <div className="space-y-3">
        <label className="text-base font-medium text-foreground/80">
          How urgent?
        </label>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
          {URGENCY_OPTIONS.map((urgency) => {
            const isUrgent = urgency === "It's urgent 🔥";
            const isSelected = formData.urgency === urgency;
            
            return (
              <button
                key={urgency}
                type="button"
                onClick={() => {
                  // Haptic feedback on mobile
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
          Budget range <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <div className="relative">
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full min-h-[44px] px-4 py-3 pr-10 bg-background rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 text-foreground text-base appearance-none cursor-pointer transition-all"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-background text-foreground">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !formData.situation || !formData.handoff}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full py-6 text-base font-semibold transition-all disabled:opacity-40 group"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Working on it…
            </>
          ) : (
            <>
              Show me the plan
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const ResultPanel = ({
  result,
  isLoading = false,
}: {
  result: string | null;
  isLoading?: boolean;
}) => {
  const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children || '');
      const isMetric = text.includes('Timeline') || text.includes('Estimated') || text.includes('Ballpark');
      
      return (
        <h4 className={`font-semibold text-foreground mb-2 ${isMetric ? 'text-sm text-muted-foreground mt-6' : 'text-base mt-8 first:mt-0'}`}>
          {children}
        </h4>
      );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 mb-3 leading-relaxed text-[15px]">{children}</p>
    ),
    ol: ({ children, node }: { children?: React.ReactNode; node?: any }) => {
      // Track step numbers using a counter and clone elements with index
      let stepNum = 0;
      const numberedChildren = Children.map(children, (child) => {
        if (isValidElement(child)) {
          stepNum++;
          return (
            <li key={stepNum} className="text-foreground/80 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                {stepNum}
              </span>
              <span className="flex-1">{child.props?.children}</span>
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
    li: ({ children, node }: { children?: React.ReactNode; node?: any }) => {
      // This handles ul items - ol items are handled by the ol component above
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
          <span>Working on it…</span>
        </div>
      </motion.div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl bg-primary/5 border-l-4 border-primary/30 p-8 min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground/60 text-sm">
          Your plan will appear here.
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

      <div className="mt-8 pt-6 border-t border-secondary/20">
        <Button
          onClick={() => {
            analytics.bookCallClick();
            window.open("https://calendar.app.google/5GxNAzn7W3FJNMrh8", "_blank");
          }}
          className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-semibold group px-6 py-5 md:py-4"
        >
          Book a quick call
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

const ProjectPlanner = () => {
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
      const yOffset = -100; // Larger offset to show more context above
      const element = resultPanelRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isLoading && resultPanelRef.current) {
      // Scroll immediately when loading starts
      setTimeout(scrollToResults, 150);
    }
  }, [isLoading]);

  const handleSubmit = async () => {
    if (!formData.situation || !formData.handoff) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/project-outline`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await response.json();
      setResult(data.reply);
      analytics.projectPlannerSubmit({ urgency: formData.urgency, budget: formData.budget });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error generating plan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="project-planner" className="py-12 md:py-16 bg-background pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header - centered */}
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-3 font-poppins">
              Tell me what's up
            </h2>
            <p className="text-lg text-muted-foreground">
              I'll show you how I'd approach it.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form with subtle background */}
            <div className="rounded-2xl bg-primary/5 p-6 md:p-8">
              <PlannerForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Right: Results */}
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
