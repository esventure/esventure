import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            I help teams move forward — fast.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Short-term projects. Clarity. Structure. Momentum.
          </p>
          <p className="text-lg md:text-xl text-foreground/70 italic">
            Are you ready to go on an Es Venture?
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={scrollToContact}
            >
              Let's talk
            </Button>
          </div>
        </div>
      </section>

      {/* Why Es Venture */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { text: "Less noise" },
                { text: "More direction" },
                { text: "Things actually get done" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-lg font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Intro */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
            Short-term, high-impact projects. Practical, clear and fast — always with a tangible result.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Service 1: Fix It */}
          <Card className="p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fix It</h2>
            <p className="text-lg text-muted-foreground mb-8">
              When something isn't getting done — I take it, own it, and finish it.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">When you need this:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• A deliverable keeps slipping</li>
                  <li>• A project is half-done</li>
                  <li>• No clear owner → no progress</li>
                  <li>• A critical task keeps getting postponed</li>
                  <li>• You need someone who says: "I'll take this."</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">What I do:</h3>
                <div className="space-y-3">
                  {[
                    "Take full ownership",
                    "Get up to speed fast",
                    "Clean up what's messy",
                    "Make decisions where needed",
                    "Build whatever is required",
                    "Push it to the finish line"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-foreground/80">
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">What you get:</h3>
                <p className="text-foreground/80">
                  A deliverable that finally gets done.<br />
                  More headspace.<br />
                  Progress instead of stress.
                </p>
              </div>
            </div>
          </Card>

          {/* Service 2: From Idea to Prototype */}
          <Card className="p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Idea to Prototype</h2>
            <p className="text-lg text-muted-foreground mb-8">
              From a rough idea → to a clickable prototype you can show, test or pitch.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">When you need this:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Your idea only exists in your head</li>
                  <li>• You need something visual for feedback or pitching</li>
                  <li>• You want clarity before building</li>
                  <li>• You're stuck in the thinking phase</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">What I do:</h3>
                <div className="space-y-3">
                  {[
                    "Sharpen the concept",
                    "Map user journey & UX flow",
                    "Build clickable prototype (Figma / Lovable / Webflow)",
                    "Create mini design system",
                    "Optional: content, visuals, microcopy",
                    "Package everything for sharing or testing"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-foreground/80">
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">What you get:</h3>
                <p className="text-foreground/80">
                  A concept that clicks.<br />
                  A prototype that speaks for itself.<br />
                  Direction and confidence for next steps.
                </p>
              </div>
            </div>
          </Card>

          {/* Service 3: Process, Structure, Overview */}
          <Card className="p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Process, Structure, Overview</h2>
            <p className="text-lg text-muted-foreground mb-8">
              For teams who need clarity, alignment and a structure that actually holds.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">When you need this:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Unclear responsibilities</li>
                  <li>• Work is happening, but not together</li>
                  <li>• Processes missing or duplicated</li>
                  <li>• New platforms/workflows need setup</li>
                  <li>• Too many questions, not enough clarity</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">What I do:</h3>
                <div className="space-y-3">
                  {[
                    "Map current workflows & gaps",
                    "Clarify scope, roles, responsibilities",
                    "Design workflows and handoffs",
                    "Build templates, dashboards, trackers",
                    "Facilitate alignment (fast, no fluff)",
                    "Set up a structure the team can follow"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-foreground/80">
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">What you get:</h3>
                <p className="text-foreground/80">
                  A team on the same page.<br />
                  A project that feels organised.<br />
                  A structure that supports progress.<br />
                  Clarity, direction, flow.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Mini Cases */}
      <section id="projects" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Recent Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Rainforest Alliance",
                  description: "Built workflows, dashboards & test processes. The team gained clarity and speed."
                },
                {
                  title: "Creative Studio",
                  description: "Created structure, workflows & simple systems. More overview, more space to grow."
                },
                {
                  title: "Startup Founder",
                  description: "Concept → UX flow → clickable prototype in 1 week. Pitch-ready."
                }
              ].map((project, index) => (
                <Card key={index} className="p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="text-lg text-foreground/80 leading-relaxed space-y-4">
            <p>
              Hi, I'm Esther — product/implementation nerd, UX lover and structure enthusiast.
            </p>
            <p>
              I keep things simple. I move fast. And I make sure projects actually get finished.
            </p>
            <p>
              Teams bring me in when they're stuck, overwhelmed or unsure where to start.
            </p>
            <p>
              I'm practical, direct and no-nonsense — no 70-page documents, just solutions that work.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to go on an Es Venture?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.location.href = 'mailto:hello@esventure.com'}
              >
                <Mail className="mr-2 w-5 h-5" />
                Let's talk
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full"
                onClick={() => window.location.href = 'mailto:hello@esventure.com'}
              >
                Send an email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>© 2025 Es Venture. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
