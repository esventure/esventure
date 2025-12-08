import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";

interface FormData {
  situation: string;
  handoff: string;
  type: string;
  urgency: string;
  context: string;
  budget: string;
}

const HELP_TYPES = [
  { id: "fix", label: "Fix It", desc: "Momentum + delivery" },
  { id: "prototype", label: "Prototype It", desc: "Idea → Clickable concept" },
  { id: "structure", label: "Structure It", desc: "Process clarity + systems" },
  { id: "unsure", label: "Not sure yet", desc: "" },
];

const URGENCY_OPTIONS = [
  "Just exploring",
  "Want to start soon",
  "Need momentum",
  "It's on fire 🔥",
];

const BUDGET_OPTIONS = [
  "< €1.000",
  "€1.000 – €3.000",
  "€3.000 – €6.000",
  "€6.000+",
  "No idea yet",
];

const PillButton = ({
  selected,
  onClick,
  children,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  description?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border-2 flex flex-col items-center gap-0.5 ${
      selected
        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
        : "bg-background text-foreground border-border hover:border-primary/40 hover:bg-muted/50"
    }`}
  >
    <span>{children}</span>
    {description && (
      <span className={`text-xs ${selected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {description}
      </span>
    )}
  </button>
);

const RadioOption = ({
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
    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left ${
      selected
        ? "bg-primary/10 text-foreground border-2 border-primary"
        : "bg-muted/30 text-foreground border-2 border-transparent hover:bg-muted/50"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
        selected ? "border-primary" : "border-muted-foreground/50"
      }`}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
    </div>
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
      {/* 1. What's the situation? */}
      <div className="space-y-2">
        <Label htmlFor="situation" className="text-base font-semibold block text-foreground">
          1. What's the situation?
        </Label>
        <Textarea
          id="situation"
          placeholder="What's happening, what's messy, or what's blocking progress?"
          value={formData.situation}
          onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
          className="min-h-[100px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors text-base"
        />
      </div>

      {/* 2. What do you want me to take off your plate? */}
      <div className="space-y-2">
        <Label htmlFor="handoff" className="text-base font-semibold block text-foreground">
          2. What do you want me to take off your plate?
        </Label>
        <Textarea
          id="handoff"
          placeholder="E.g. build a prototype, untangle a process, coordinate testing, get a slipping project moving again…"
          value={formData.handoff}
          onChange={(e) => setFormData({ ...formData, handoff: e.target.value })}
          className="min-h-[100px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors text-base"
        />
      </div>

      {/* 3. What type of help do you need? */}
      <div className="space-y-3">
        <Label className="text-base font-semibold block text-foreground">
          3. What type of help do you need?
        </Label>
        <div className="flex flex-wrap gap-2">
          {HELP_TYPES.map((type) => (
            <PillButton
              key={type.id}
              selected={formData.type === type.id}
              onClick={() => setFormData({ ...formData, type: type.id })}
              description={type.desc}
            >
              {type.label}
            </PillButton>
          ))}
        </div>
      </div>

      {/* 4. How urgent is it? */}
      <div className="space-y-3">
        <Label className="text-base font-semibold block text-foreground">
          4. How urgent is it?
        </Label>
        <div className="flex flex-wrap gap-2">
          {URGENCY_OPTIONS.map((urgency) => (
            <PillButton
              key={urgency}
              selected={formData.urgency === urgency}
              onClick={() => setFormData({ ...formData, urgency })}
            >
              {urgency}
            </PillButton>
          ))}
        </div>
      </div>

      {/* 5. Anything else I should know? */}
      <div className="space-y-2">
        <Label htmlFor="context" className="text-base font-semibold block text-foreground">
          5. Anything else I should know?{" "}
          <span className="font-normal text-muted-foreground text-sm">(optional)</span>
        </Label>
        <Textarea
          id="context"
          placeholder="Tools you're using, deadlines, team setup, constraints…"
          value={formData.context}
          onChange={(e) => setFormData({ ...formData, context: e.target.value })}
          className="min-h-[80px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors text-base"
        />
      </div>

      {/* 6. Budget comfort zone */}
      <div className="space-y-3">
        <Label className="text-base font-semibold block text-foreground">
          6. Budget comfort zone{" "}
          <span className="font-normal text-muted-foreground text-sm">(optional)</span>
        </Label>
        <div className="space-y-2">
          {BUDGET_OPTIONS.map((budget) => (
            <RadioOption
              key={budget}
              selected={formData.budget === budget}
              onClick={() => setFormData({ ...formData, budget })}
            >
              {budget}
            </RadioOption>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic">
          This helps me shape a realistic scope — not a commitment.
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
    h2: ({ children }: { children?: React.ReactNode }) => (
      <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
        <h4 className="text-lg font-bold text-foreground font-poppins">{children}</h4>
      </div>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 mb-3 leading-relaxed text-[15px]">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 mb-4 ml-1">{children}</ul>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 text-foreground/80 text-[15px] leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-foreground/70">{children}</em>
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
            <p className="text-sm text-muted-foreground mb-5 italic">
              This isn't a quote — just a sense of what similar projects needed.
            </p>
            <Button
              onClick={() => window.open("https://calendly.com/esventure", "_blank")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a quick intro call
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              No pressure — just to confirm fit and shape the exact scope.
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
    type: "",
    urgency: "",
    context: "",
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
