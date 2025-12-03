import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Expand, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormData {
  situation: string;
  goal: string;
  type: string;
  urgency: string;
  budget: string;
}

const PROJECT_TYPES = [
  "New idea / concept",
  "Existing process that's messy",
  "Tooling / systems / setup",
  "Something else"
];

const URGENCY_OPTIONS = [
  "Just exploring",
  "Nice to have soon",
  "This is on fire"
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
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
      selected 
        ? "bg-primary text-primary-foreground border-primary" 
        : "bg-background text-foreground border-border hover:border-primary/50"
    }`}
  >
    {children}
  </button>
);

const PlannerForm = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading 
}: { 
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}) => (
  <div className="space-y-6">
    <div>
      <Label htmlFor="situation" className="text-base font-semibold mb-2 block">
        What's going on right now?
      </Label>
      <Textarea
        id="situation"
        placeholder="What's messy, confusing, stuck or not working the way it should?"
        value={formData.situation}
        onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
        className="min-h-[100px] resize-none"
      />
    </div>

    <div>
      <Label htmlFor="goal" className="text-base font-semibold mb-2 block">
        What do you want to achieve?
      </Label>
      <Textarea
        id="goal"
        placeholder="If this was 'fixed', what would be different?"
        value={formData.goal}
        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
        className="min-h-[100px] resize-none"
      />
    </div>

    <div>
      <Label className="text-base font-semibold mb-3 block">
        What kind of thing is this mostly about?
      </Label>
      <div className="flex flex-wrap gap-2">
        {PROJECT_TYPES.map((type) => (
          <SelectButton
            key={type}
            selected={formData.type === type}
            onClick={() => setFormData({ ...formData, type })}
          >
            {type}
          </SelectButton>
        ))}
      </div>
    </div>

    <div>
      <Label className="text-base font-semibold mb-3 block">
        How urgent is this?
      </Label>
      <div className="flex flex-wrap gap-2">
        {URGENCY_OPTIONS.map((urgency) => (
          <SelectButton
            key={urgency}
            selected={formData.urgency === urgency}
            onClick={() => setFormData({ ...formData, urgency })}
          >
            {urgency}
          </SelectButton>
        ))}
      </div>
    </div>

    <div>
      <Label className="text-base font-semibold mb-3 block">
        Budget comfort zone (optional)
      </Label>
      <div className="flex flex-wrap gap-2">
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

    <Button 
      onClick={onSubmit}
      disabled={isLoading || !formData.situation || !formData.goal}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg font-bold"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Thinking…
        </>
      ) : (
        "Generate my plan"
      )}
    </Button>
  </div>
);

const ResultPanel = ({ 
  result, 
  scrollToContact 
}: { 
  result: string | null;
  scrollToContact: () => void;
}) => (
  <div className="bg-muted/50 rounded-2xl p-6 md:p-8 h-full">
    <h3 className="text-2xl font-bold text-foreground mb-4 font-poppins">
      Here's how I'd approach this
    </h3>
    
    {result ? (
      <>
        <div className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap mb-6">
          {result}
        </div>
        <div className="border-t border-border pt-6 mt-6">
          <p className="text-sm text-muted-foreground mb-4 italic">
            This is a first outline, not a formal quote — but it should give you a good feel for how we could work together.
          </p>
          <Button 
            onClick={scrollToContact}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full font-bold"
          >
            Sounds good? Let's talk
          </Button>
        </div>
      </>
    ) : (
      <p className="text-foreground/60">
        Once you describe your situation, I'll outline a rough approach, timing, next steps and a ballpark cost. No strings attached.
      </p>
    )}
  </div>
);

const ProjectPlanner = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<FormData>({
    situation: "",
    goal: "",
    type: "",
    urgency: "",
    budget: ""
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!formData.situation || !formData.goal) return;
    
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
    <section id="project-planner" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 font-poppins">
              See how I'd tackle your project
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Tell me what's stuck and I'll sketch out how I'd fix it: a rough approach, time & effort, next steps, and a ballpark budget.
            </p>
          </motion.div>

          {/* Desktop: inline form + modal button */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border-2 border-border rounded-2xl p-8"
              >
                <PlannerForm 
                  formData={formData} 
                  setFormData={setFormData} 
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
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
                <ResultPanel result={result} scrollToContact={scrollToContact} />
              </motion.div>
            </div>

            <div className="flex justify-center mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full gap-2">
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
                      />
                      {error && (
                        <p className="text-destructive text-sm mt-4">{error}</p>
                      )}
                    </div>
                    <ResultPanel result={result} scrollToContact={scrollToContact} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Mobile: compact card + sheet */}
          <div className="md:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border-2 border-border rounded-2xl p-6 text-center"
            >
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-foreground/70 mb-6">
                Describe your challenge and get a personalized project outline in seconds.
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg font-bold">
                    Open mini-planner
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
                    />
                    {error && (
                      <p className="text-destructive text-sm">{error}</p>
                    )}
                    {(result || !isLoading) && (
                      <ResultPanel result={result} scrollToContact={scrollToContact} />
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
