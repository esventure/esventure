import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import ProjectPlanner from "@/components/ProjectPlanner";
import { motion } from "framer-motion";
import React from "react";
import { Head } from "vite-react-ssg";
import { useTranslation } from "react-i18next";
import { FixerIcon, SparringIcon, MapIcon, MirrorIcon } from "@/components/ServiceIcons";
import WhenToCallMe from "@/components/WhenToCallMe";
import ServicesWorkbench from "@/components/services/ServicesWorkbench";
import CollapsibleSection, { StickyHeaderProvider } from "@/components/CollapsibleSection";
import estherYellow from "@/assets/esther-yellow.jpg";
import estherPhone from "@/assets/esther-phone.jpg";
import estherBw from "@/assets/esther-bw.jpg";
import logoEV from "@/assets/logo-ev.svg";
import vanmoofLogo from "@/assets/clients/vanmoof.png";
import lovensLogo from "@/assets/clients/lovens.png";
import prioticketLogo from "@/assets/clients/prioticket.png";
import rainforestLogo from "@/assets/clients/rainforest-alliance.png";
import attractionworldLogo from "@/assets/clients/attractionworld.png";
import landalLogo from "@/assets/clients/landal.png";
import { analytics } from "@/lib/analytics";

const ScrollDownArrow = () => {
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const nearBottom = docHeight - scrollBottom < 200;
      const scrolledPastHero = window.scrollY > 100;
      setHide(nearBottom || scrolledPastHero);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollBy({ top: 300, behavior: "smooth" })}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
      animate={{
        y: [0, 6, 0],
        opacity: hide ? 0 : 1,
        scale: hide ? 0.8 : 1,
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      style={{ pointerEvents: hide ? "none" : "auto" }}
      aria-label="Scroll down"
    >
      <ChevronDown className="w-6 h-6" />
    </motion.button>
  );
};

const clients = [
  { src: vanmoofLogo, alt: "VanMoof", url: "https://www.vanmoof.com/" },
  { src: lovensLogo, alt: "Lovens", url: "https://lovensbikes.com/en/" },
  { src: prioticketLogo, alt: "Prioticket", url: "https://www.prioticket.com/" },
  { src: rainforestLogo, alt: "Rainforest Alliance", url: "https://www.rainforest-alliance.org/" },
  { src: attractionworldLogo, alt: "Attractionworld", url: "https://www.attractionworldgroup.com/" },
  { src: landalLogo, alt: "Landal", url: "https://www.landal.com/" },
];

const serviceIcons = [FixerIcon, SparringIcon, MapIcon, MirrorIcon];

const Index = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    const cleanup = analytics.initScrollTracking();
    return cleanup;
  }, []);

  const scrollToPlanner = () => {
    analytics.ctaClick("hero_primary");
    document.getElementById("project-planner")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroBullets = t("hero.bullets", { returnObjects: true }) as Array<{ label: string; text: string }>;
  const services = (t("services.items", { returnObjects: true }) as Array<{ label: string; title: string; description: string }>).map(
    (s, i) => ({ ...s, icon: serviceIcons[i] })
  );
  const pillars = t("effect.pillars", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const sparringWalkAway = t("sparring.walkAwayItems", { returnObjects: true }) as string[];
  const aboutParagraphs = t("about.paragraphs", { returnObjects: true }) as string[];

  return (
    <StickyHeaderProvider>
      <Head>
        <title>Es Venture - Wat het ook is, als het digitaal is, regel ik het.</title>
        <meta name="description" content="Van gedurfde nieuwe ideeën tot vastgelopen projecten: Es Venture is de digitale partner voor founders en teams die iemand nodig hebben die het bedenkt, bouwt en oplevert." />
        <link rel="canonical" href="https://esventure.nl/" />
        <meta property="og:title" content="Es Venture - Wat het ook is, als het digitaal is, regel ik het." />
        <meta property="og:description" content="Wat het ook is, als het digitaal is, regel ik het. Denken, bouwen, opleveren - samen." />
        <meta property="og:url" content="https://esventure.nl/" />
        <meta property="og:image" content="https://esventure.nl/og-image.png" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Es Venture",
            "url": "https://esventure.nl",
            "description": "Jouw digitale partner voor denken, bouwen en opleveren - van idee tot live.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Amsterdam",
              "addressCountry": "NL"
            }
          })}
        </script>
      </Head>
      <div className="min-h-screen bg-background">
      <Navigation />

      <main>
      {/* ─── 1. Hero ─── */}
      <CollapsibleSection id="hero" title="👋 Whatever it is - if it's digital, I've got it.">
        <section className="relative overflow-hidden bg-primary min-h-screen flex flex-col">
          <div className="container mx-auto px-4 pt-24 pb-12 md:pt-28 md:pb-16 flex-1 flex items-center">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 max-w-7xl mx-auto items-center w-full">
              <motion.div
                className="flex flex-col justify-center text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground tracking-tight leading-[0.95] font-poppins">
                  {t("hero.titleStart")}{" "}
                  <span className="text-secondary">{t("hero.titleEnd")}</span>{" "}
                  {t("hero.titleAfter")}
                </h1>

                <div className="space-y-4 mt-6">
                  <p className="text-base md:text-lg text-primary-foreground/90 max-w-xl leading-relaxed font-medium">
                    {t("hero.lead")}
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-primary-foreground/85 max-w-xl">
                    {heroBullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-secondary font-black mt-0.5">✓</span>
                        <span><span className="font-bold text-primary-foreground">{b.label}:</span> {b.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all rounded-full shadow-lg"
                    onClick={scrollToPlanner}
                  >
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 font-bold bg-transparent text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground/10 hover:border-primary-foreground rounded-full"
                    onClick={() => {
                      analytics.bookCallClick();
                      window.open("https://calendar.app.google/5GxNAzn7W3FJNMrh8", "_blank");
                    }}
                  >
                    {t("hero.ctaSecondary")}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="relative max-h-[75vh]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="aspect-[3/4] max-h-[75vh] overflow-hidden shadow-2xl mx-auto">
                  <img src={estherYellow} alt="Esther Woerdman" width={900} height={1200} decoding="async" className="w-full h-full object-cover" />
                </div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      </CollapsibleSection>

      {/* ─── 2. When to Call Me ─── */}
      <CollapsibleSection id="when-to-call" title="📞 When to Call Me">
        <WhenToCallMe />
      </CollapsibleSection>

      {/* ─── 3. How I Help ─── */}
      <CollapsibleSection id="how-i-help" title="🛠 How I Help" bgClass="bg-background">
        <ServicesWorkbench onCta={scrollToPlanner} />

      </CollapsibleSection>

      {/* ─── 4. Sparring Partner ─── */}
      <CollapsibleSection id="sparring" title="🧠 Need a sparring partner?">
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 max-w-6xl mx-auto items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary-foreground font-poppins mb-6 leading-[1.05]">
                  {t("sparring.title")}
                </h2>
                <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed mb-8">
                  {t("sparring.body")}
                </p>
                <Button
                  size="lg"
                  className="text-base px-8 py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all rounded-full shadow-lg"
                  onClick={() => {
                    analytics.bookCallClick();
                    window.open("https://calendar.app.google/5GxNAzn7W3FJNMrh8", "_blank");
                  }}
                >
                  {t("sparring.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative"
              >
                <div className="bg-background/60 backdrop-blur-sm border-l-4 border-primary p-8 md:p-10 rounded-r-2xl">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">{t("sparring.walkAwayLabel")}</p>
                  <ul className="space-y-3 text-base md:text-lg text-secondary-foreground">
                    {sparringWalkAway.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-primary font-black">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </CollapsibleSection>

      {/* ─── 5. The Es Venture Effect ─── */}
      <CollapsibleSection id="effect" title="✨ The Es Venture Effect">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-black text-foreground font-poppins mb-4"
              >
                {t("effect.title")}
              </motion.h2>
              <p className="text-xl text-muted-foreground">{t("effect.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 md:gap-6 max-w-5xl mx-auto mb-16">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="md:px-4 md:border-l md:border-border/60 md:first:border-l-0"
                >
                  <div className="text-5xl font-black text-primary/30 font-poppins mb-2 leading-none">0{i + 1}</div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground font-poppins mb-3">{p.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>


            {/* Client logos */}
            <div className="relative overflow-hidden">
              <motion.p
                className="text-sm text-muted-foreground text-center mb-8 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {t("effect.workedWith")}
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
      </CollapsibleSection>

      {/* ─── 6. About Me ─── */}
      <CollapsibleSection id="about" title="👤 About me" bgClass="bg-muted">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-[3/4] overflow-hidden shadow-2xl"
              >
                <img src={estherBw} alt="Esther Woerdman" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-poppins mb-6">
                  {t("about.title")} <span className="text-primary">{t("about.name")}</span>
                </h2>
                <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all rounded-full shadow-lg"
                    onClick={() => {
                      analytics.emailClick();
                      window.location.href = "mailto:esther@esventure.nl";
                    }}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    {t("about.cta")}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </CollapsibleSection>

      {/* ─── 7. Project Planner ─── */}
      <CollapsibleSection id="planner" title="💡 Describe your situation">
        <ProjectPlanner />
      </CollapsibleSection>

      {/* ─── 8. Contact CTA ─── */}
      <CollapsibleSection id="contact-cta" title="🚀 Ready to make something happen?">
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
                  {t("contactCta.titleStart")}<br />
                  <span className="text-secondary">{t("contactCta.titleEnd")}</span>
                </h2>
                <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-lg">
                  {t("contactCta.body")}
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
                    {t("contactCta.ctaEmail")}
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
                    {t("contactCta.ctaCall")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </CollapsibleSection>
      </main>

      {/* ─── 9. Footer ─── */}
      <footer className="bg-foreground py-14">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div>
              <img src={logoEV} alt="Es Venture" className="h-10 brightness-0 invert mb-4" />
              <p className="text-sm text-background/60 leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-background/70 mb-3">{t("footer.getInTouch")}</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:esther@esventure.nl" className="text-background/80 hover:text-secondary transition-colors">
                    esther@esventure.nl
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/estherwoerdman/" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-secondary transition-colors">
                    {t("footer.linkedin")}
                  </a>
                </li>
                <li>
                  <a href="https://calendar.app.google/5GxNAzn7W3FJNMrh8" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-secondary transition-colors">
                    {t("footer.bookCall")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-background/70 mb-3">{t("footer.more")}</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/privacy" className="text-background/80 hover:text-secondary transition-colors">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <a href="https://plaiwrks.com" target="_blank" rel="noopener noreferrer" className="text-background/80 hover:text-secondary transition-colors">
                    {t("footer.plaiwrks")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/10 mt-10 pt-6 text-center">
            <p className="text-xs text-background/70">{t("footer.rights")}</p>
          </div>
        </div>
      </footer>

      {/* Fixed scroll-down arrow */}
      <ScrollDownArrow />
    </div>
    </StickyHeaderProvider>
  );
};

export default Index;
