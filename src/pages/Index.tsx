import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import estherBW from "@/assets/esther-bw.jpg";
import estherYellow from "@/assets/esther-yellow.jpg";

const Index = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <div className="container mx-auto px-4 pt-20 pb-20 md:pt-32 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8 text-left">
              <h1 className="text-6xl md:text-8xl font-black text-primary-foreground tracking-tight leading-[0.9]">
                I help teams move forward — <span className="text-secondary">fast.</span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-primary-foreground/90">
                Short-term projects. Clarity. Structure. Momentum.
              </p>
              <p className="text-xl md:text-2xl text-primary-foreground/70 font-light italic">
                Are you ready to go on an Es Venture?
              </p>
              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-7 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all rounded-full"
                  onClick={scrollToContact}
                >
                  Let's talk
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={estherYellow} 
                  alt="Esther Woerdman" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Es Venture */}
      <section className="bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { text: "Less noise" },
                { text: "More direction" },
                { text: "Things actually get done" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <Check className="w-8 h-8 text-secondary-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Services */}
      <section id="services" className="container mx-auto px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-8 text-foreground">My Services</h2>
          <p className="text-xl md:text-2xl text-center text-foreground/70 mb-20 max-w-3xl mx-auto">
            Short-term, high-impact projects. <span className="text-primary font-bold">Practical, clear and fast</span> — always with a tangible result.
          </p>
          <div className="space-y-16">
          {/* Service 1: Fix It */}
          <FadeInOnScroll>
            <Card className="p-10 md:p-16 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-black text-primary-foreground">01</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground">Fix It</h3>
            </div>
            <p className="text-xl md:text-2xl text-foreground/70 mb-10 font-medium">
              When something isn't getting done — I take it, own it, and finish it.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-bold text-xl mb-5 text-foreground">When you need this:</h3>
                <ul className="space-y-3 text-foreground/70 text-lg">
                  <li>• A deliverable keeps slipping</li>
                  <li>• A project is half-done</li>
                  <li>• No clear owner → no progress</li>
                  <li>• A critical task keeps getting postponed</li>
                  <li>• You need someone who says: "I'll take this."</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-5 text-foreground">What I do:</h3>
                <div className="space-y-4">
                  {[
                    "Take full ownership",
                    "Get up to speed fast",
                    "Clean up what's messy",
                    "Make decisions where needed",
                    "Build whatever is required",
                    "Push it to the finish line"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4 text-foreground text-lg font-medium">
                      <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={3} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/20 p-8 rounded-2xl border-2 border-secondary">
                <h3 className="font-bold text-xl mb-4 text-foreground">What you get:</h3>
                <p className="text-foreground text-lg font-medium leading-relaxed">
                  A deliverable that finally gets done.<br />
                  More headspace.<br />
                  Progress instead of stress.
                </p>
              </div>
            </div>
          </Card>
          </FadeInOnScroll>

          {/* Service 2: From Idea to Prototype */}
          <FadeInOnScroll delay={0.1}>
            <Card className="p-10 md:p-16 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-black text-primary-foreground">02</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground">From Idea to Prototype</h3>
            </div>
            <p className="text-xl md:text-2xl text-foreground/70 mb-10 font-medium">
              From a rough idea → to a clickable prototype you can show, test or pitch.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-bold text-xl mb-5 text-foreground">When you need this:</h3>
                <ul className="space-y-3 text-foreground/70 text-lg">
                  <li>• Your idea only exists in your head</li>
                  <li>• You need something visual for feedback or pitching</li>
                  <li>• You want clarity before building</li>
                  <li>• You're stuck in the thinking phase</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-5 text-foreground">What I do:</h3>
                <div className="space-y-4">
                  {[
                    "Sharpen the concept",
                    "Map user journey & UX flow",
                    "Build clickable prototype (Figma / Lovable / Webflow)",
                    "Create mini design system",
                    "Optional: content, visuals, microcopy",
                    "Package everything for sharing or testing"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4 text-foreground text-lg font-medium">
                      <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={3} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/20 p-8 rounded-2xl border-2 border-secondary">
                <h3 className="font-bold text-xl mb-4 text-foreground">What you get:</h3>
                <p className="text-foreground text-lg font-medium leading-relaxed">
                  A concept that clicks.<br />
                  A prototype that speaks for itself.<br />
                  Direction and confidence for next steps.
                </p>
              </div>
            </div>
          </Card>
          </FadeInOnScroll>

          {/* Service 3: Process, Structure, Overview */}
          <FadeInOnScroll delay={0.2}>
            <Card className="p-10 md:p-16 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-black text-primary-foreground">03</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-foreground">Process, Structure, Overview</h3>
            </div>
            <p className="text-xl md:text-2xl text-foreground/70 mb-10 font-medium">
              For teams who need clarity, alignment and a structure that actually holds.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-bold text-xl mb-5 text-foreground">When you need this:</h3>
                <ul className="space-y-3 text-foreground/70 text-lg">
                  <li>• Unclear responsibilities</li>
                  <li>• Work is happening, but not together</li>
                  <li>• Processes missing or duplicated</li>
                  <li>• New platforms/workflows need setup</li>
                  <li>• Too many questions, not enough clarity</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-5 text-foreground">What I do:</h3>
                <div className="space-y-4">
                  {[
                    "Map current workflows & gaps",
                    "Clarify scope, roles, responsibilities",
                    "Design workflows and handoffs",
                    "Build templates, dashboards, trackers",
                    "Facilitate alignment (fast, no fluff)",
                    "Set up a structure the team can follow"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4 text-foreground text-lg font-medium">
                      <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={3} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/20 p-8 rounded-2xl border-2 border-secondary">
                <h3 className="font-bold text-xl mb-4 text-foreground">What you get:</h3>
                <p className="text-foreground text-lg font-medium leading-relaxed">
                  A team on the same page.<br />
                  A project that feels organised.<br />
                  A structure that supports progress.<br />
                  Clarity, direction, flow.
                </p>
              </div>
            </div>
          </Card>
          </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Mini Cases */}
      <section id="projects" className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-foreground">Recent Projects</h2>
            <div className="grid md:grid-cols-3 gap-10">
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
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <Card className="p-8 bg-background border-4 border-primary/30 shadow-lg hover:shadow-xl transition-all hover:border-secondary rounded-2xl">
                    <h3 className="font-bold text-2xl mb-4 text-foreground">{project.title}</h3>
                    <p className="text-foreground/70 text-lg leading-relaxed">{project.description}</p>
                  </Card>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-16 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="text-xl text-foreground leading-relaxed space-y-6">
                <p className="font-medium">
                  Hi, I'm Esther — product/implementation nerd, UX lover and structure enthusiast.
                </p>
                <p>
                  I keep things simple. I move fast. And I make sure projects actually get finished.
                </p>
                <p>
                  Teams bring me in when they're stuck, overwhelmed or unsure where to start.
                </p>
                <p className="font-bold">
                  I'm practical, direct and no-nonsense — no 70-page documents, just solutions that work.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={estherBW} 
                  alt="Esther Woerdman - Creative Director" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-primary-foreground">Ready to go on an Es Venture?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-2xl rounded-full"
                onClick={() => window.location.href = 'mailto:hello@esventure.com'}
              >
                <Mail className="mr-3 w-6 h-6" />
                Let's talk
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-8 font-bold border-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all rounded-full"
                onClick={() => window.location.href = 'mailto:hello@esventure.com'}
              >
                Send an email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-background font-medium text-lg">© 2025 Es Venture. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
