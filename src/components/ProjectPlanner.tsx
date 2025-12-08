import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
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
  return (
    <div className="space-y-8">
      {/* What's going on? */}
      <div className="space-y-2">
        <label htmlFor="situation" className="text-sm font-medium text-muted-foreground">
          What's going on?
        </label>
        <textarea
          id="situation"
          placeholder="What's messy or blocking progress?"
          value={formData.situation}
          onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
          className="w-full min-h-[100px] px-0 py-3 bg-transparent border-0 border-b border-border/60 focus:border-primary focus:outline-none resize-none text-foreground placeholder:text-muted-foreground/50 text-base transition-colors"
        />
      </div>

      {/* What should I take off your plate? */}
      <div className="space-y-2">
        <label htmlFor="handoff" className="text-sm font-medium text-muted-foreground">
          What should I take off your plate?
        </label>
        <textarea
          id="handoff"
          placeholder="Prototype, workflow cleanup, project coordination…"
          value={formData.handoff}
          onChange={(e) => setFormData({ ...formData, handoff: e.target.value })}
          className="w-full min-h-[100px] px-0 py-3 bg-transparent border-0 border-b border-border/60 focus:border-primary focus:outline-none resize-none text-foreground placeholder:text-muted-foreground/50 text-base transition-colors"
        />
      </div>

      {/* Urgency */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">
          How urgent?
        </label>
        <div className="flex flex-wrap gap-2">
          {URGENCY_OPTIONS.map((urgency) => (
            <button
              key={urgency}
              type="button"
              onClick={() => setFormData({ ...formData, urgency })}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                formData.urgency === urgency
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground border border-border/60 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {urgency}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label htmlFor="budget" className="text-sm font-medium text-muted-foreground">
          Budget range <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <select
          id="budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border/60 focus:border-primary focus:outline-none text-foreground text-base appearance-none cursor-pointer transition-colors"
        >
          {BUDGET_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-background text-foreground">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !formData.situation || !formData.handoff}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full py-5 text-base font-semibold transition-all disabled:opacity-40"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Working on it…
            </>
          ) : (
            "Show me the plan"
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
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-2 my-4 text-[15px] text-foreground/80">
        {children}
      </ol>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-1.5 my-3 text-[15px]">{children}</ul>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-foreground/80 leading-relaxed pl-1">
        {children}
      </li>
    ),
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
        className="py-12 text-center"
      >
        <p className="text-muted-foreground">Working on it…</p>
      </motion.div>
    );
  }

  if (!result) {
    return (
      <div className="py-12 text-center">
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
    >
      <ReactMarkdown components={markdownComponents}>{result}</ReactMarkdown>

      <div className="mt-8 pt-6 border-t border-border/30">
        <Button
          onClick={() => window.open("https://calendly.com/esventure", "_blank")}
          variant="outline"
          className="rounded-full font-medium group"
        >
          Book a quick call
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 font-poppins">
              Tell me what's up
            </h2>
            <p className="text-muted-foreground">
              I'll show you how I'd approach it.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form */}
            <div>
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
