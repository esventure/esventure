import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Expand, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
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

interface StepRefs {
  [key: number]: HTMLDivElement | null;
}

const PROJECT_TYPES = [
  "New idea / concept",
  "Existing process that's messy",
  "Tooling / systems / setup",
  "Something else"
];

const URGENCY_OPTIONS = [
  "Just exploring",
  "Soon-ish",
  "This is on fire 🔥"
];

const BUDGET_OPTIONS = [
  "< €1.000",
  "€1.000 – €3.000",
  "€3.000+",
  "No idea yet"
];

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
    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
      selected 
        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20" 
        : "bg-background text-foreground border-border hover:border-primary/40 hover:bg-muted/50"
    }`}
  >
    {children}
  </button>
);

const StepNumber = ({ number, required = true }: { number: number; required?: boolean }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
    required 
      ? 'bg-primary text-primary-foreground' 
      : 'bg-muted text-muted-foreground'
  }`}>
    {number}
  </div>
);

const PlannerForm = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading,
  stepRefs,
  scrollToNextStep
}: { 
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  stepRefs: React.MutableRefObject<StepRefs>;
  scrollToNextStep: (currentStep: number) => void;
}) => {
  const handleSituationBlur = () => {
    if (formData.situation.trim()) scrollToNextStep(1);
  };

  const handleHandoffBlur = () => {
    if (formData.handoff.trim()) scrollToNextStep(2);
  };

  const handleTypeSelect = (type: string) => {
    setFormData({ ...formData, type });
    setTimeout(() => scrollToNextStep(3), 100);
  };

  const handleUrgencySelect = (urgency: string) => {
    setFormData({ ...formData, urgency });
    setTimeout(() => scrollToNextStep(4), 100);
  };

  return (
  <div className="space-y-8">
    {/* 1. What's going on? */}
    <div className="space-y-4" ref={(el) => { stepRefs.current[1] = el; }}>
      <div className="flex items-center gap-3">
        <StepNumber number={1} />
        <Label htmlFor="situation" className="text-lg font-bold block text-foreground font-poppins">
          What's going on?
        </Label>
      </div>
      <Textarea
        id="situation"
        placeholder="E.g. We're launching a new product but nobody knows who's doing what… / Our onboarding flow is confusing and customers keep dropping off… / I have an idea but no clue where to start…"
        value={formData.situation}
        onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
        onBlur={handleSituationBlur}
        className="min-h-[120px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors ml-11"
      />
    </div>

    {/* 2. What do you need me to take off your plate? */}
    <div className="space-y-4" ref={(el) => { stepRefs.current[2] = el; }}>
      <div className="flex items-center gap-3">
        <StepNumber number={2} />
        <Label htmlFor="handoff" className="text-lg font-bold block text-foreground font-poppins">
          What do you need off your plate?
        </Label>
      </div>
      <Textarea
        id="handoff"
        placeholder="E.g. Coordinate testing across teams / Build a clickable prototype / Set up a project management system / Map out our user journey / Just tell me what to prioritise…"
        value={formData.handoff}
        onChange={(e) => setFormData({ ...formData, handoff: e.target.value })}
        onBlur={handleHandoffBlur}
        className="min-h-[120px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors ml-11"
      />
    </div>

    {/* 3. What type of help do you need? */}
    <div className="space-y-4" ref={(el) => { stepRefs.current[3] = el; }}>
      <div className="flex items-center gap-3">
        <StepNumber number={3} />
        <Label className="text-lg font-bold block text-foreground font-poppins">
          What type of help?
        </Label>
      </div>
      <div className="flex flex-wrap gap-2 ml-11">
        {PROJECT_TYPES.map((type) => (
          <SelectButton
            key={type}
            selected={formData.type === type}
            onClick={() => handleTypeSelect(type)}
          >
            {type}
          </SelectButton>
        ))}
      </div>
    </div>

    {/* 4. How urgent is this? */}
    <div className="space-y-4" ref={(el) => { stepRefs.current[4] = el; }}>
      <div className="flex items-center gap-3">
        <StepNumber number={4} />
        <Label className="text-lg font-bold block text-foreground font-poppins">
          How urgent?
        </Label>
      </div>
      <div className="flex flex-wrap gap-2 ml-11">
        {URGENCY_OPTIONS.map((urgency) => (
          <SelectButton
            key={urgency}
            selected={formData.urgency === urgency}
            onClick={() => handleUrgencySelect(urgency)}
          >
            {urgency}
          </SelectButton>
        ))}
      </div>
    </div>

    {/* 5. Anything specific I should know? (optional) */}
    <div className="space-y-4" ref={(el) => { stepRefs.current[5] = el; }}>
      <div className="flex items-center gap-3">
        <StepNumber number={5} required={false} />
        <Label htmlFor="context" className="text-lg font-bold block text-foreground font-poppins">
          Anything else? <span className="font-normal text-muted-foreground text-sm">(optional)</span>
        </Label>
      </div>
      <Textarea
        id="context"
        placeholder="E.g. We use Notion and Slack / Dev team is external / Launch is in 6 weeks / Three departments need to sign off…"
        value={formData.context}
        onChange={(e) => setFormData({ ...formData, context: e.target.value })}
        className="min-h-[100px] resize-none bg-muted/30 border-border/50 focus:border-primary focus:bg-background transition-colors ml-11"
      />
    </div>

    {/* Submit button */}
    <div className="pt-2">
      <Button 
        onClick={onSubmit}
        disabled={isLoading || !formData.situation || !formData.handoff}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full py-7 text-xl font-bold shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 disabled:shadow-none disabled:bg-muted disabled:text-muted-foreground group"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Thinking…
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-6 w-6" />
            Generate my plan
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
      <p className="text-center text-sm text-muted-foreground mt-3">
        Fill in steps 1 & 2 to get started
      </p>
    </div>

    {/* 6. Budget comfort zone (optional) - de-emphasized below button */}
    <div className="pt-4 border-t border-border/50">
      <div className="flex items-center gap-3 mb-3">
        <StepNumber number={6} required={false} />
        <Label className="text-base font-medium block text-muted-foreground">
          Budget comfort zone <span className="font-normal">(optional)</span>
        </Label>
      </div>
      <div className="flex flex-wrap gap-2 ml-11">
        {BUDGET_OPTIONS.map((budget) => (
          <SelectButton
            key={budget}
            selected={formData.budget === budget}
            onClick={() => setFormData({ ...formData, budget })}
          >
            {budget}
          </SelectButton>
        ))}
      </div>
    </div>
  </div>
  );
};

const ResultPanel = ({ 
  result, 
  scrollToContact,
  isLoading = false
}: { 
  result: string | null;
  scrollToContact: () => void;
  isLoading?: boolean;
}) => {
  const SkeletonLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Section header skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-32 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted/80 rounded-full w-full animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-11/12 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
      
      {/* Time & effort skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-28 animate-pulse" style={{ animationDelay: '0.25s' }} />
        <div className="space-y-2">
          <div className="h-4 bg-muted/80 rounded-full w-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '0.35s' }} />
        </div>
      </div>
      
      {/* Next steps skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-24 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="space-y-2 pl-4">
          <div className="h-4 bg-muted/80 rounded-full w-5/6 animate-pulse" style={{ animationDelay: '0.45s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="h-4 bg-muted/80 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '0.55s' }} />
        </div>
      </div>
      
      {/* Cost skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded-full w-36 animate-pulse" style={{ animationDelay: '0.6s' }} />
        <div className="h-4 bg-muted/80 rounded-full w-2/3 animate-pulse" style={{ animationDelay: '0.65s' }} />
      </div>
      
      <p className="text-sm text-muted-foreground italic pt-4">
        Thinking through your project…
      </p>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-2xl p-6 md:p-8 h-full border border-border/30">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLoading ? 'bg-primary/20' : 'bg-secondary/50'}`}>
          <Sparkles className={`w-5 h-5 ${isLoading ? 'text-primary animate-pulse' : 'text-secondary-foreground'}`} />
        </div>
        <h3 className="text-2xl font-bold text-foreground font-poppins">
          {isLoading ? 'Working on your plan…' : "Here's how I'd approach this"}
        </h3>
      </div>
      
      {isLoading ? (
        <SkeletonLoader />
      ) : result ? (
        (() => {
          // Split result by section headers (## emoji) to animate each section
          const sections = result.split(/(?=## [🎯⏱✅🎁💰])/g).filter(s => s.trim());
          
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
              <ol className="space-y-2 mb-4 ml-1 list-none counter-reset-item">{children}</ol>
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
            <div className="max-w-none mb-6 space-y-4">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <ReactMarkdown components={markdownComponents}>
                    {section}
                  </ReactMarkdown>
                </motion.div>
              ))}
              <motion.div 
                className="border-t border-border/50 pt-6 mt-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: sections.length * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <p className="text-sm text-muted-foreground mb-5 italic">
                  This is a first outline, not a formal quote — but it should give you a good feel for how we could work together.
                </p>
                <Button 
                  onClick={scrollToContact}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  Sounds good? Let's talk
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          );
        })()
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <p className="text-foreground/50 max-w-xs">
            Once you describe your situation, I'll outline a rough approach, timing, next steps and a ballpark cost.
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
    budget: ""
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stepRefs = useRef<StepRefs>({});

  const scrollToNextStep = useCallback((currentStep: number) => {
    const getNextIncompleteStep = (): number | null => {
      if (!formData.situation.trim()) return 1;
      if (!formData.handoff.trim()) return 2;
      if (!formData.type) return 3;
      if (!formData.urgency) return 4;
      return null; // All required steps complete
    };

    const nextStep = getNextIncompleteStep();
    if (nextStep && nextStep > currentStep && stepRefs.current[nextStep]) {
      stepRefs.current[nextStep]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [formData]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.situation || !formData.handoff) return;
    
    setIsLoading(true);
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

  const ModalTrigger = isMobile ? SheetTrigger : DialogTrigger;
  const ModalContent = isMobile ? SheetContent : DialogContent;
  const ModalHeader = isMobile ? SheetHeader : DialogHeader;
  const ModalTitle = isMobile ? SheetTitle : DialogTitle;
  const Modal = isMobile ? Sheet : Dialog;

  return (
    <section id="project-planner" className="bg-background py-24 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-medium mb-4">
              Project Planner
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-5 font-poppins">
              See how I'd tackle your project
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-8">
              From first call to action plan in 3–4 weeks. Fill in the form to see what working together could look like.
            </p>
            
            {/* Timeline Stepper */}
            <div className="flex items-center justify-center gap-0 max-w-3xl mx-auto mb-4">
              {[
                { week: "0", label: "First Call", icon: "📞" },
                { week: "1", label: "Discovery", icon: "🔍" },
                { week: "2", label: "Structure", icon: "🗂️" },
                { week: "3", label: "Action Plan", icon: "✅" },
              ].map((step, index, arr) => (
                <div key={index} className="flex items-center">
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-base md:text-lg mb-1.5 hover:bg-primary/20 hover:border-primary/50 transition-colors">
                      {step.icon}
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-foreground/70">Week {step.week}</span>
                    <span className="text-[9px] md:text-[10px] text-foreground/50 hidden sm:block">{step.label}</span>
                  </motion.div>
                  {index < arr.length - 1 && (
                    <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 mx-1 md:mx-2 mt-[-18px]" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mb-1">+ optional Week 4 for implementation support</p>
          </motion.div>

          {/* Desktop: inline form + modal button */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl shadow-foreground/5"
              >
                <PlannerForm 
                  formData={formData} 
                  setFormData={setFormData} 
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  stepRefs={stepRefs}
                  scrollToNextStep={scrollToNextStep}
                />
                {error && (
                  <p className="text-destructive text-sm mt-4">{error}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ResultPanel result={result} scrollToContact={scrollToContact} isLoading={isLoading} />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center mt-10"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full gap-2 border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all">
                    <Expand className="w-4 h-4" />
                    Open as mini-planner
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-poppins">
                      See how I'd tackle your project
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <PlannerForm 
                        formData={formData} 
                        setFormData={setFormData} 
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        stepRefs={stepRefs}
                        scrollToNextStep={scrollToNextStep}
                      />
                      {error && (
                        <p className="text-destructive text-sm mt-4">{error}</p>
                      )}
                    </div>
                    <ResultPanel result={result} scrollToContact={scrollToContact} isLoading={isLoading} />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          {/* Mobile: compact card + sheet */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-xl shadow-foreground/5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-poppins mb-3">Get your project outline</h3>
              <p className="text-foreground/60 mb-6 leading-relaxed">
                Describe your challenge and get a personalized project outline in seconds.
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg font-bold shadow-lg shadow-primary/25 group">
                    Open mini-planner
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[95vh] overflow-y-auto">
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-xl font-bold font-poppins">
                      See how I'd tackle your project
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6">
                    <PlannerForm 
                      formData={formData} 
                      setFormData={setFormData} 
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                      stepRefs={stepRefs}
                      scrollToNextStep={scrollToNextStep}
                    />
                    {error && (
                      <p className="text-destructive text-sm">{error}</p>
                    )}
                    {(result || isLoading) && (
                      <ResultPanel result={result} scrollToContact={scrollToContact} isLoading={isLoading} />
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