import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, ArrowRight, MessageCircle, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";

interface FormData {
  situation: string;
  handoff: string;
  urgency: string;
  budget: string;
}

const URGENCY_OPTIONS = [
  "Just exploring",
  "Soon",
  "Need momentum",
  "It's urgent 🔥",
];

const BUDGET_OPTIONS = [
  { value: "", label: "No idea yet" },
  { value: "< €1.000", label: "< €1.000" },
  { value: "€1.000–€3.000", label: "€1.000–€3.000" },
  { value: "€3.000–€6.000", label: "€3.000–€6.000" },
  { value: "€6.000+", label: "€6.000+" },
];

const UrgencyChip = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
      selected
        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
        : "bg-background text-foreground border-border hover:border-primary/40 hover:bg-muted/50"
    }`}
  >
    {children}
  </button>
);

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
  return (
    <div className="space-y-6">
      {/* 1. What's going on? */}
      <div className="space-y-2">
        <Label htmlFor="situation" className="text-base font-semibold block text-foreground">
          1. What's going on?
        </Label>
        <Textarea
          id="situation"
          placeholder="What's happening right now, what's messy, or what's blocking progress?"
          value={formData.situation}
          onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
          className="min-h-[80px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors text-base"
        />
      </div>

      {/* 2. What do you want me to take off your plate? */}
      <div className="space-y-2">
        <Label htmlFor="handoff" className="text-base font-semibold block text-foreground">
          2. What do you want me to take off your plate?
        </Label>
        <Textarea
          id="handoff"
          placeholder="E.g. prototype something, clean up a workflow, coordinate testing, get a project moving again…"
          value={formData.handoff}
          onChange={(e) => setFormData({ ...formData, handoff: e.target.value })}
          className="min-h-[80px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors text-base"
        />
      </div>

      {/* 3. How urgent is this? */}
      <div className="space-y-3">
        <Label className="text-base font-semibold block text-foreground">
          3. How urgent is this?
        </Label>
        <div className="flex flex-wrap gap-2">
          {URGENCY_OPTIONS.map((urgency) => (
            <UrgencyChip
              key={urgency}
              selected={formData.urgency === urgency}
              onClick={() => setFormData({ ...formData, urgency })}
            >
              {urgency}
            </UrgencyChip>
          ))}
        </div>
      </div>

      {/* Optional: Budget comfort zone */}
      <div className="space-y-2">
        <Label htmlFor="budget" className="text-base font-semibold block text-foreground">
          Budget comfort zone{" "}
          <span className="font-normal text-muted-foreground text-sm">(optional)</span>
        </Label>
        <div className="relative">
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-muted/30 border-2 border-border/50 text-foreground text-sm font-medium appearance-none cursor-pointer focus:border-primary focus:bg-background transition-colors"
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        </div>
        <p className="text-xs text-muted-foreground italic">
          Just to help shape a realistic scope — not a commitment.
        </p>
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !formData.situation || !formData.handoff}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full py-6 text-lg font-bold shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 disabled:shadow-none disabled:bg-muted disabled:text-muted-foreground group"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate my plan
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
  const SkeletonLoader = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-40 animate-pulse" />
        <div className="h-4 bg-muted/80 rounded-full w-full animate-pulse" style={{ animationDelay: "0.1s" }} />
        <div className="h-4 bg-muted/80 rounded-full w-11/12 animate-pulse" style={{ animationDelay: "0.15s" }} />
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-32 animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="h-4 bg-muted/80 rounded-full w-full animate-pulse" style={{ animationDelay: "0.25s" }} />
        <div className="h-4 bg-muted/80 rounded-full w-4/5 animate-pulse" style={{ animationDelay: "0.3s" }} />
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-28 animate-pulse" style={{ animationDelay: "0.35s" }} />
        <div className="h-4 bg-muted/80 rounded-full w-3/4 animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>
      <p className="text-sm text-muted-foreground italic pt-4">Rolling up my sleeves…</p>
    </motion.div>
  );

  const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children || '');
      const isMetric = text.includes('Timeline') || text.includes('Estimated') || text.includes('Ballpark');
      
      return (
        <div className={`${isMetric ? 'mt-4 pt-4 border-t border-border/30' : 'mt-8 first:mt-0'}`}>
          <h4 className={`font-bold text-foreground font-poppins mb-2 ${isMetric ? 'text-sm uppercase tracking-wide text-muted-foreground' : 'text-base'}`}>
            {children}
          </h4>
        </div>
      );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/85 mb-4 leading-[1.7] text-[15px]">{children}</p>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => {
      // Convert children to array and add step numbers
      const childArray = Array.isArray(children) ? children : [children];
      let stepNum = 0;
      
      return (
        <div className="space-y-0 my-4 relative">
          {/* Vertical connector line */}
          <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          {childArray.map((child, index) => {
            if (child && typeof child === 'object' && 'props' in child) {
              stepNum++;
              return (
                <div key={index} className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 z-10 shadow-sm">
                    {stepNum}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-foreground/85 text-[15px] leading-relaxed pt-0.5">{child.props.children}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    },
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2.5 mb-5 mt-3">{children}</ul>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 text-foreground/85 text-[15px] leading-relaxed">
        <span className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
  };

  return (
    <div className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-2xl p-6 md:p-8 h-full border border-border/30">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLoading ? "bg-primary/20" : "bg-secondary/50"}`}>
          <Sparkles className={`w-5 h-5 ${isLoading ? "text-primary animate-pulse" : "text-secondary-foreground"}`} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground font-poppins">
          {isLoading ? "Working on your plan…" : "Here's how I'd tackle this"}
        </h3>
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <ReactMarkdown components={markdownComponents}>{result}</ReactMarkdown>

          <div className="border-t border-border/50 pt-6 mt-6">
            <Button
              onClick={() => window.open("https://calendly.com/esventure", "_blank")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a quick intro call
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              No pressure — just to confirm fit and shape the final scope.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <p className="text-foreground/50 max-w-xs">
            Fill in the form and I'll show you how I'd approach your project, rough timing, and what to expect.
          </p>
        </div>
      )}
    </div>
  );
};

const ProjectPlanner = () => {
  const isMobile = useIsMobile();
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

  useEffect(() => {
    if (isMobile && (isLoading || result) && resultPanelRef.current) {
      setTimeout(() => {
        resultPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [isLoading, result, isMobile]);

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
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error generating plan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="tell-me" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-poppins">
              See how I'd tackle your project
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe what's going on, and I'll show you my approach, timing, and what investment to expect.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
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
              className="text-destructive text-center mt-6"
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
