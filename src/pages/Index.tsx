import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProjectPlanner from "@/components/ProjectPlanner";
import { motion } from "framer-motion";
import React from "react";
import { MakeItHappenIcon, ClearPathIcon, QuickFixIcon } from "@/components/ServiceIcons";
import estherYellow from "@/assets/esther-yellow.jpg";
import estherPhone from "@/assets/esther-phone.jpg";
import logoEV from "@/assets/logo-ev.svg";
import vanmoofLogo from "@/assets/clients/vanmoof.png";
import lovensLogo from "@/assets/clients/lovens.png";
import prioticketLogo from "@/assets/clients/prioticket.png";
import rainforestLogo from "@/assets/clients/rainforest-alliance.png";
import attractionworldLogo from "@/assets/clients/attractionworld.png";
import { analytics } from "@/lib/analytics";

const clients = [
  { src: vanmoofLogo, alt: "VanMoof", url: "https://www.vanmoof.com/" },
  { src: lovensLogo, alt: "Lovens", url: "https://lovensbikes.com/en/" },
  { src: prioticketLogo, alt: "Prioticket", url: "https://www.prioticket.com/" },
  { src: rainforestLogo, alt: "Rainforest Alliance", url: "https://www.rainforest-alliance.org/" },
  { src: attractionworldLogo, alt: "Attractionworld", url: "https://www.attractionworldgroup.com/" },
];

const scenarios = [
  {
    quote: "This project is completely stalled and I don't know why.",
    need: "Momentum.",
    explanation: "I'll find the friction and get things moving again.",
  },
  {
    quote: "I have a million things to do and I can't focus on what's important.",
    need: "Clarity.",
    explanation: "I'll help you prioritize and then take the big tasks off your plate.",
  },
  {
    quote: "We have a great idea, but no one to actually build or manage it.",
    need: "Ownership.",
    explanation: "I'll step in as your interim lead and drive it from start to finish.",
  },
  {
    quote: "Our process is a mess and it's slowing everyone down.",
    need: "A Fix.",
    explanation: "I'll map it out, find the kinks, and build a workflow that just works.",
  },
];

const services = [
  {
    icon: MakeItHappenIcon,
    label: "The Engine",
    title: "Let's Make It Happen",
    description:
      "When you need pure execution. I step in as your hands-on operator, project lead, or interim manager to drive your most critical initiatives over the finish line.",
  },
  {
    icon: ClearPathIcon,
    label: "The Roadmap",
    title: "Your Clear Path Forward",
    description:
      "When you have a vision but no clear plan. I'll turn your big ideas into a concrete, step-by-step action plan that we can actually execute on.",
  },
  {
    icon: QuickFixIcon,
    label: "The Spark",
    title: "Quick Fixes & Fast Starts",
    description:
      "When you need to get unstuck, fast. I'll diagnose that urgent problem, design a quick solution, or build a prototype to get you immediate momentum.",
  },
];

const Index = () => {
  React.useEffect(() => {
    const cleanup = analytics.initScrollTracking();
    return cleanup;
  }, []);

  const scrollToPlanner = () => {
    analytics.ctaClick("hero_primary");
    document.getElementById("project-planner")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden bg-primary min-h-screen flex flex-col">
        <div className="container mx-auto px-4 pt-12 pb-12 md:pt-16 md:pb-16 flex-1 flex items-center">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col justify-center text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground tracking-tight leading-[0.95] font-poppins">
                Your project's personal{" "}
                <span className="text-secondary">caffeine shot.</span>
              </h1>

              <div className="space-y-4 mt-6 md:mt-8">
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed font-medium">
                  Feeling stuck? Overwhelmed? Got a brilliant idea but no time (or skills) to make it happen? That's where I come in.
                </p>
                <div className="flex items-end gap-3">
                  <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed">
                    I'm Esther, your hands-on partner for turning chaos into clarity and getting things done. No corporate
                    fluff, no endless meetings. Just pure, focused action.
                  </p>
                  <motion.button
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex-shrink-0 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-1"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    aria-label="Scroll down"
                  >
                    <ChevronDown className="w-7 h-7" />
                  </motion.button>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all rounded-full shadow-lg"
                  onClick={scrollToPlanner}
                >
                  Let's Get This Done
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="aspect-[3/4] overflow-hidden shadow-2xl">
                <img src={estherYellow} alt="Esther Woerdman" className="w-full h-full object-cover" />
              </div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      {/* ─── 2. When to Call Me ─── */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4">When to Call Me</h2>
            <p className="text-xl text-muted-foreground">
              You don't need a perfect plan. You just need to know you need help.
            </p>
          </motion.div>

          <div className="space-y-4">
            {scenarios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="grid md:grid-cols-2 gap-4 md:gap-8 p-6 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <p className="text-lg italic text-foreground/80">"{s.quote}"</p>
                <p className="text-lg">
                  <span className="font-black text-primary font-poppins">{s.need}</span>{" "}
                  <span className="text-foreground/70">{s.explanation}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. How I Help ─── */}
      <section id="services" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4">
                How I Help
              </h2>
              <p className="text-xl text-muted-foreground">
                Think of me as your secret weapon. You can deploy me in three key ways.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  >
                    <Card className="h-full p-8 border border-border/50 bg-card shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon size={28} className="text-primary" />
                        </div>
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          {service.label}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground font-poppins">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-base text-foreground/70 text-center leading-relaxed flex-1 mb-6">
                        {service.description}
                      </p>
                      <button
                        onClick={scrollToPlanner}
                        className="text-primary font-semibold text-sm hover:underline inline-flex items-center justify-center gap-1"
                      >
                        See it in action <ArrowRight className="h-4 w-4" />
                      </button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. The Es Venture Effect ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-8">
                The Es Venture Effect
              </h2>
              <blockquote className="text-xl md:text-2xl italic text-foreground/80 leading-relaxed">
                "Esther didn't just manage our project; she breathed life into it. She has this incredible ability to
                simplify the complex and get everyone excited about what's next. A total game-changer."
              </blockquote>
              <p className="mt-6 text-muted-foreground font-poppins">— A happy client</p>
            </motion.div>
          </div>

          {/* Client logos */}
          <div className="relative overflow-hidden">
            <motion.p
              className="text-sm text-muted-foreground text-center mb-8 uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Worked with
            </motion.p>
            <motion.div
              className="flex items-center gap-16 md:gap-24"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...clients, ...clients].map((client, i) => (
                <a
                  key={`${client.alt}-${i}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group/logo"
                >
                  <img
                    src={client.src}
                    alt={client.alt}
                    className="h-8 md:h-10 w-auto grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-400"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 5. Project Planner ─── */}
      <ProjectPlanner />

      {/* ─── 6. Contact CTA ─── */}
      <section id="contact" className="relative overflow-hidden bg-primary min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${estherPhone})`, backgroundPosition: "right 15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground tracking-tight leading-[0.95] font-poppins">
                Ready to make something{" "}
                <span className="text-secondary">happen?</span>
              </h2>
              <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-lg">
                Let's talk about what's on your plate. No pressure, no sales pitch — just a real conversation about how
                I can help you move forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all rounded-full"
                  onClick={() => {
                    analytics.emailClick();
                    window.location.href = "mailto:esther@esventure.nl";
                  }}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send email
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 font-bold bg-transparent text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all rounded-full"
                  onClick={() => {
                    analytics.bookCallClick();
                    window.open("https://calendar.app.google/5GxNAzn7W3FJNMrh8", "_blank");
                  }}
                >
                  Book a call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7. Footer ─── */}
      <footer className="bg-foreground py-12">
        <div className="container mx-auto px-4 flex flex-col items-center gap-6">
          <img src={logoEV} alt="Es Venture" className="h-10 brightness-0 invert" />
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <p className="text-background/70">© 2025 Es Venture. All rights reserved.</p>
            <span className="text-background/40">•</span>
            <Link to="/privacy" className="text-background/70 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <span className="text-background/40">•</span>
            <a
              href="https://plaiwrks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors"
            >
              AI-native projects? Check out Plaiwrks
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
