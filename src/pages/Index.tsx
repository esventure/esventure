import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import Logo from "@/components/Logo";
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
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Section Number */}
            <div className="text-foreground/40 text-sm font-medium mb-8">001.</div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Text */}
              <div className="space-y-10 relative z-10">
                <div className="mb-8">
                  <Logo />
                </div>
                
                <div className="space-y-6">
                  <h1 className="text-7xl md:text-9xl font-black text-foreground tracking-tighter leading-[0.85] uppercase">
                    WHO
                  </h1>
                  <div className="relative">
                    <h2 className="text-5xl md:text-7xl font-script text-foreground leading-tight">
                      Moves Teams
                    </h2>
                    <h2 className="text-5xl md:text-7xl font-script text-foreground leading-tight -mt-4">
                      Forward—
                    </h2>
                    <div className="text-7xl md:text-9xl font-black text-foreground tracking-tighter leading-[0.85] uppercase mt-2">
                      FAST.
                    </div>
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-foreground/70 max-w-lg leading-relaxed">
                  Short-term projects. Clarity. Structure. Momentum.
                </p>
                
                <p className="text-2xl md:text-3xl font-script text-foreground/80">
                  Are you ready to go on an Es Venture?
                </p>
                
                <div className="pt-6">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-7 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all border-2 border-secondary"
                    onClick={scrollToContact}
                  >
                    LET'S TALK
                  </Button>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative lg:absolute lg:right-0 lg:top-32 lg:w-[45%]">
                <div className="relative">
                  {/* Yellow frame */}
                  <div className="absolute -inset-4 border-8 border-primary z-0"></div>
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <img 
                      src={estherYellow} 
                      alt="Esther Woerdman" 
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Es Venture */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { text: "Less noise" },
                { text: "More direction" },
                { text: "Things actually get done" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 border-4 border-secondary flex items-center justify-center">
                    <Check className="w-6 h-6 text-secondary" strokeWidth={4} />
                  </div>
                  <span className="text-2xl md:text-3xl font-black text-secondary uppercase tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Intro */}
      <section className="container mx-auto px-4 py-32 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-foreground/40 text-sm font-medium mb-8">002.</div>
          <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-8">
            WHAT I DO
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-3xl">
            Short-term, <span className="font-script text-4xl md:text-5xl">high-impact</span> projects. 
            <span className="block mt-4">Practical, clear and <span className="text-primary">fast</span> — always with a tangible result.</span>
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-card py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-32">
            {/* Service 1: Fix It */}
            <FadeInOnScroll>
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-8">
                    FIX IT
                  </h2>
            <p className="text-xl text-foreground/70 mb-12 font-medium">
              When something isn't getting done — I take it, own it, and finish it.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-black text-xl mb-5 text-foreground uppercase tracking-wide">When you need this:</h3>
                <ul className="space-y-3 text-foreground/70 text-lg">
                  <li>• A deliverable keeps slipping</li>
                  <li>• A project is half-done</li>
                  <li>• No clear owner → no progress</li>
                  <li>• A critical task keeps getting postponed</li>
                  <li>• You need someone who says: "I'll take this."</li>
                </ul>
              </div>

              <div>
                <h3 className="font-black text-xl mb-5 text-foreground uppercase tracking-wide">What I do:</h3>
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

              <div className="bg-primary p-8 border-4 border-secondary">
                <h3 className="font-black text-xl mb-4 text-secondary uppercase tracking-wide">What you get:</h3>
                <p className="text-secondary text-lg font-bold leading-relaxed">
                  A deliverable that finally gets done.<br />
                  More headspace.<br />
                  Progress instead of stress.
                </p>
              </div>
            </div>
                </div>
              </div>
            </FadeInOnScroll>

          {/* Service 2: From Idea to Prototype */}
          <FadeInOnScroll delay={0.1}>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-8">
                  FROM IDEA TO PROTOTYPE
                </h2>
            <p className="text-xl text-foreground/70 mb-12 font-medium">
              From a rough idea → to a clickable prototype you can show, test or pitch.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-black text-xl mb-5 text-foreground uppercase tracking-wide">When you need this:</h3>
                <ul className="space-y-3 text-foreground/70 text-lg">
                  <li>• Your idea only exists in your head</li>
                  <li>• You need something visual for feedback or pitching</li>
                  <li>• You want clarity before building</li>
                  <li>• You're stuck in the thinking phase</li>
                </ul>
              </div>

              <div>
                <h3 className="font-black text-xl mb-5 text-foreground uppercase tracking-wide">What I do:</h3>
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

              <div className="bg-primary p-8 border-4 border-secondary">
                <h3 className="font-black text-xl mb-4 text-secondary uppercase tracking-wide">What you get:</h3>
                <p className="text-secondary text-lg font-bold leading-relaxed">
                  A concept that clicks.<br />
                  A prototype that speaks for itself.<br />
                  Direction and confidence for next steps.
                </p>
              </div>
            </div>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Service 3: Process, Structure, Overview */}
          <FadeInOnScroll delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.85] mb-8">
                  PROCESS, STRUCTURE, OVERVIEW
                </h2>
            <p className="text-xl text-foreground/70 mb-12 font-medium">
              For teams who need clarity, alignment and a structure that actually holds.
            </p>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-black text-xl mb-5 text-foreground uppercase tracking-wide">When you need this:</h3>
                <ul className="space-y-3 text-foreground/70 text-lg">
                  <li>• Unclear responsibilities</li>
                  <li>• Work is happening, but not together</li>
                  <li>• Processes missing or duplicated</li>
                  <li>• New platforms/workflows need setup</li>
                  <li>• Too many questions, not enough clarity</li>
                </ul>
              </div>

              <div>
                <h3 className="font-black text-xl mb-5 text-foreground uppercase tracking-wide">What I do:</h3>
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

              <div className="bg-primary p-8 border-4 border-secondary">
                <h3 className="font-black text-xl mb-4 text-secondary uppercase tracking-wide">What you get:</h3>
                <p className="text-secondary text-lg font-bold leading-relaxed">
                  A team on the same page.<br />
                  A project that feels organised.<br />
                  A structure that supports progress.<br />
                  Clarity, direction, flow.
                </p>
              </div>
            </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
        </div>
      </section>

      {/* Mini Cases */}
      <section id="projects" className="bg-background py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-foreground/40 text-sm font-medium mb-8">003.</div>
            <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-20">
              RECENT<br/>PROJECTS
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
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
                  <div className="group">
                    <div className="bg-card p-8 border-4 border-secondary hover:border-primary transition-colors">
                      <h3 className="font-black text-2xl mb-4 text-foreground uppercase tracking-tight">{project.title}</h3>
                      <p className="text-foreground/70 text-lg leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="bg-card py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-foreground/40 text-sm font-medium mb-8">004.</div>
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="order-2 lg:order-1">
                <h2 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.9] mb-12">
                  ABOUT<br/>ME
                </h2>
                <div className="text-xl text-foreground leading-relaxed space-y-6">
                  <p className="font-bold text-2xl">
                    Hi, I'm Esther — <span className="font-script text-3xl">product/implementation nerd,</span> UX lover and structure enthusiast.
                  </p>
                  <p>
                    I keep things simple. I move fast. And I make sure projects actually get finished.
                  </p>
                  <p>
                    Teams bring me in when they're stuck, overwhelmed or unsure where to start.
                  </p>
                  <p className="font-black text-2xl">
                    I'm practical, direct and no-nonsense — no 70-page documents, just solutions that work.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  {/* Yellow frame */}
                  <div className="absolute -inset-4 border-8 border-primary"></div>
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img 
                      src={estherBW} 
                      alt="Esther Woerdman - Creative Director" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="bg-primary py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-secondary/60 text-sm font-medium mb-8">005.</div>
            <h2 className="text-6xl md:text-9xl font-black text-secondary uppercase tracking-tighter leading-[0.85] mb-8">
              READY TO GO ON AN
            </h2>
            <h3 className="text-7xl md:text-9xl font-script text-secondary mb-16 -mt-4">
              Es Venture?
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 font-black bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all border-4 border-secondary uppercase"
                onClick={() => window.location.href = 'mailto:hello@esventure.com'}
              >
                <Mail className="mr-3 w-6 h-6" />
                LET'S TALK
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-8 font-black border-4 border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all uppercase bg-transparent"
                onClick={() => window.location.href = 'mailto:hello@esventure.com'}
              >
                SEND AN EMAIL
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-secondary-foreground font-bold text-lg uppercase tracking-wide">© 2025 Es Venture. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
