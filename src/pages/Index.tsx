import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { motion } from "framer-motion";
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-center mb-8 text-foreground">My Services</h2>
            <p className="text-xl md:text-2xl text-center text-foreground/70 mb-20 max-w-3xl mx-auto">
              Short-term, high-impact projects. <span className="text-primary font-bold">Practical, clear and fast</span> — always with a tangible result.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Fix It */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="h-full p-8 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary group flex flex-col">
                <div className="flex flex-col items-center text-center mb-4">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-3xl font-black text-primary-foreground">01</span>
                  </motion.div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-primary hover:bg-primary/20">Project management</Badge>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors">Fix It</h3>
                </div>
                <p className="text-lg text-foreground/70 mb-8 font-medium text-center min-h-[4rem] flex items-center justify-center">
                  When something isn't getting done — I take it, own it, and finish it.
                </p>
                
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-4 text-foreground">When you need this:</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li>• A deliverable keeps slipping</li>
                      <li>• A project is half-done</li>
                      <li>• No clear owner → no progress</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-2xl border-2 border-secondary mt-auto">
                    <h4 className="font-bold text-lg mb-3 text-foreground">What you get:</h4>
                    <p className="text-foreground text-sm font-medium leading-relaxed">
                      A deliverable that finally gets done. More headspace. Progress instead of stress.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Service 2: From Idea to Prototype */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="h-full p-8 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary group flex flex-col">
                <div className="flex flex-col items-center text-center mb-4">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-3xl font-black text-primary-foreground">02</span>
                  </motion.div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-primary hover:bg-primary/20">UX/UI Design</Badge>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors">From Idea to Prototype</h3>
                </div>
                <p className="text-lg text-foreground/70 mb-8 font-medium text-center min-h-[4rem] flex items-center justify-center">
                  From a rough idea → to a clickable prototype you can show, test or pitch.
                </p>
                
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-4 text-foreground">When you need this:</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li>• Your idea only exists in your head</li>
                      <li>• You need something visual</li>
                      <li>• You want clarity before building</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-2xl border-2 border-secondary mt-auto">
                    <h4 className="font-bold text-lg mb-3 text-foreground">What you get:</h4>
                    <p className="text-foreground text-sm font-medium leading-relaxed">
                      A concept that clicks. A prototype that speaks for itself. Direction for next steps.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Service 3: Process, Structure, Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="h-full p-8 border-4 border-primary bg-card shadow-xl hover:shadow-2xl transition-all hover:border-secondary group flex flex-col">
                <div className="flex flex-col items-center text-center mb-4">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-3xl font-black text-primary-foreground">03</span>
                  </motion.div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-primary hover:bg-primary/20">Clarity</Badge>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors">Process, Structure, Overview</h3>
                </div>
                <p className="text-lg text-foreground/70 mb-8 font-medium text-center min-h-[4rem] flex items-center justify-center">
                  For teams who need clarity, alignment and a structure that actually holds.
                </p>
                
                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-4 text-foreground">When you need this:</h4>
                    <ul className="space-y-2 text-foreground/70 text-sm">
                      <li>• Unclear responsibilities</li>
                      <li>• Work not aligned</li>
                      <li>• Processes missing or duplicated</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-2xl border-2 border-secondary mt-auto">
                    <h4 className="font-bold text-lg mb-3 text-foreground">What you get:</h4>
                    <p className="text-foreground text-sm font-medium leading-relaxed">
                      A team on the same page. A project that feels organised. Clarity, direction, flow.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
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
