import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Sparkles, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const PROJECT_TYPES = ["New idea / concept", "Existing process that's messy", "Tooling / systems / setup", "Something else"];
const URGENCY_OPTIONS = ["Just exploring", "Soon-ish", "This is on fire 🔥"];

const SelectButton = ({
  selected,
  onClick,
  children
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 w-full text-left ${
      selected
        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
        : "bg-background text-foreground border-border/50 hover:border-primary/40 hover:bg-muted/50"
    }`}
  >
    {children}
  </button>
);

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex gap-1.5 justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          i < current ? "w-6 bg-primary" : i === current ? "w-6 bg-primary/50" : "w-1.5 bg-muted"
        }`}
      />
    ))}
  </div>
);

const StepWizard = ({
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
  const [step, setStep] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const steps = [
    {
      question: "What's going on?",
      subtitle: "Give me a quick overview of the situation",
      type: "textarea" as const,
      field: "situation" as const,
      placeholder: "E.g. We're launching in 6 weeks but nobody knows who's doing what…",
    },
    {
      question: "What do you need off your plate?",
      subtitle: "What would you hand over to me?",
      type: "textarea" as const,
      field: "handoff" as const,
      placeholder: "E.g. Someone to coordinate testing, build a prototype, clean up the process…",
    },
    {
      question: "What type of help?",
      subtitle: "Pick what fits best",
      type: "select" as const,
      field: "type" as const,
      options: PROJECT_TYPES,
    },
    {
      question: "How urgent is this?",
      subtitle: "No pressure, just want to know the vibe",
      type: "select" as const,
      field: "urgency" as const,
      options: URGENCY_OPTIONS,
    },
  ];

  const totalSteps = steps.length;
  const currentStep = steps[step];
  const canGoNext = currentStep.type === "textarea" 
    ? formData[currentStep.field].trim().length > 0
    : formData[currentStep.field].length > 0;

  useEffect(() => {
    if (currentStep.type === "textarea" && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [step, currentStep.type]);

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSelectOption = (option: string) => {
    setFormData({ ...formData, [currentStep.field]: option });
    // Auto-advance after selection with slight delay
    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      }
    }, 200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="mb-8">
        <ProgressDots current={step} total={totalSteps} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="flex-1"
        >
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground font-poppins mb-2">
              {currentStep.question}
            </h3>
            <p className="text-foreground/60">
              {currentStep.subtitle}
            </p>
          </div>

          {currentStep.type === "textarea" ? (
            <Textarea
              ref={textareaRef}
              placeholder={currentStep.placeholder}
              value={formData[currentStep.field]}
              onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
              className="min-h-[140px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors text-base rounded-xl"
            />
          ) : (
            <div className="space-y-2">
              {currentStep.options?.map((option) => (
                <SelectButton
                  key={option}
                  selected={formData[currentStep.field] === option}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </SelectButton>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="rounded-full px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!canGoNext || isLoading}
          className={`flex-1 rounded-full py-6 font-bold transition-all duration-300 ${
            step === totalSteps - 1
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg shadow-secondary/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Thinking…
            </>
          ) : step === totalSteps - 1 ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate my plan
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const ResultPanel = ({
  result,
  scrollToContact,
  isLoading = false,
  onReset
}: {
  result: string | null;
  scrollToContact: () => void;
  isLoading?: boolean;
  onReset?: () => void;
}) => {
  const SkeletonLoader = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-32 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted/80 rounded-full w-full animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-11/12 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-28 animate-pulse" style={{ animationDelay: '0.25s' }} />
        <div className="space-y-2">
          <div className="h-4 bg-muted/80 rounded-full w-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '0.35s' }} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-24 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="space-y-2 pl-4">
          <div className="h-4 bg-muted/80 rounded-full w-5/6 animate-pulse" style={{ animationDelay: '0.45s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground italic pt-4">
        Thinking through your project…
      </p>
    </motion.div>
  );

  const markdownComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <h4 className="text-xl font-bold text-foreground font-poppins">{children}</h4>
      </div>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <h4 className="text-lg font-bold text-foreground font-poppins">{children}</h4>
      </div>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-base font-bold text-foreground mt-4 mb-2 font-poppins">{children}</h4>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 mb-3 leading-relaxed text-[15px]">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-2 mb-4 ml-1">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-2 mb-4 ml-1 list-none">{children}</ol>
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

  if (isLoading) {
    return (
      <div className="h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-poppins">
            Working on your plan…
          </h3>
        </div>
        <SkeletonLoader />
      </div>
    );
  }

  if (!result) return null;

  const sections = result.split(/(?=## [🎯⏱✅🎁💰])/g).filter(s => s.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-secondary-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground font-poppins">
          Here's how I'd approach this
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <ReactMarkdown components={markdownComponents}>
              {section}
            </ReactMarkdown>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="border-t border-border/50 pt-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: sections.length * 0.15 }}
      >
        <p className="text-sm text-muted-foreground italic">
          This is a first outline, not a formal quote — but it should give you a good feel for how we could work together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={scrollToContact}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 group flex-1"
          >
            Sounds good? Let's talk
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          {onReset && (
            <Button
              variant="outline"
              onClick={onReset}
              className="rounded-full"
            >
              Start over
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
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
    budget: ""
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const resultPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((isLoading || result) && resultPanelRef.current) {
      setTimeout(() => {
        resultPanelRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [isLoading, result]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleSubmit = async () => {
    if (!formData.situation || !formData.handoff) return;
    setIsLoading(true);
    setShowResult(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/project-outline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("I'm getting a lot of requests right now — can you try again in a minute?");
        }
        throw new Error("Something broke on my side — can you try again?");
      }
      const data = await response.json();
      setResult(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something broke on my side — can you try again?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      situation: "",
      handoff: "",
      type: "",
      urgency: "",
      context: "",
      budget: ""
    });
    setResult(null);
    setShowResult(false);
    setError(null);
  };

  return (
    <section id="project-planner" className="bg-background py-24 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium mb-4">
              Tell me what's up
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 font-poppins">
              See how I'd tackle your project
            </h2>
            <p className="text-lg text-foreground/60 max-w-xl mx-auto">
              Answer a few quick questions and get a personalized outline in seconds.
            </p>
          </motion.div>

          {/* Desktop: Two columns */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-foreground/5"
              >
                {showResult && result ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold font-poppins mb-2">Plan generated!</h3>
                    <p className="text-foreground/60 mb-6">Check out the outline on the right →</p>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="rounded-full"
                    >
                      Start a new project
                    </Button>
                  </div>
                ) : (
                  <>
                    <StepWizard
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                    />
                    {error && <p className="text-destructive text-sm mt-4">{error}</p>}
                  </>
                )}
              </motion.div>

              {/* Result side */}
              <motion.div
                ref={resultPanelRef}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl p-8 border border-border/30"
              >
                {showResult ? (
                  <ResultPanel
                    result={result}
                    scrollToContact={scrollToContact}
                    isLoading={isLoading}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <MessageCircle className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-foreground/50 max-w-xs">
                      Answer the questions and I'll show you how I'd approach your project.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Mobile: Sheet-based flow */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-3xl p-6 text-center shadow-xl shadow-foreground/5"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-poppins mb-2">Get your project outline</h3>
              <p className="text-foreground/60 mb-5 leading-relaxed text-sm">
                Describe your challenge and get a personalized outline in seconds.
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-5 text-base font-bold shadow-lg shadow-primary/25 group">
                    Tell me what's up
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] flex flex-col px-0 pb-[env(safe-area-inset-bottom)]">
                  <SheetHeader className="px-5 pt-3 pb-3 border-b border-border/30 flex-shrink-0">
                    <SheetTitle className="text-base font-bold font-poppins">
                      Tell me what's up
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto px-5 py-6">
                    {showResult && (result || isLoading) ? (
                      <ResultPanel
                        result={result}
                        scrollToContact={scrollToContact}
                        isLoading={isLoading}
                        onReset={handleReset}
                      />
                    ) : (
                      <>
                        <StepWizard
                          formData={formData}
                          setFormData={setFormData}
                          onSubmit={handleSubmit}
                          isLoading={isLoading}
                        />
                        {error && <p className="text-destructive text-sm mt-4">{error}</p>}
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlanner;
