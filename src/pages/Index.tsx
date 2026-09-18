import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Head } from "vite-react-ssg";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import CaseGrid from "@/components/work/CaseGrid";
import type { CaseServiceRoute, CaseStory } from "@/components/work/caseContent";
import { caseMedia } from "@/components/work/caseMedia";
import { analytics } from "@/lib/analytics";
import estherYellow from "@/assets/esther-yellow.jpg";
import estherBw from "@/assets/esther-bw.jpg";
import logoEV from "@/assets/logo-ev.svg";
import vanmoofLogo from "@/assets/clients/vanmoof.png";
import lovensLogo from "@/assets/clients/lovens.png";
import prioticketLogo from "@/assets/clients/prioticket.png";
import rainforestLogo from "@/assets/clients/rainforest-alliance.png";
import attractionworldLogo from "@/assets/clients/attractionworld.png";
import landalLogo from "@/assets/clients/landal.png";

const BOOKING_URL = "https://calendar.app.google/5GxNAzn7W3FJNMrh8";

const clients = [
  { src: vanmoofLogo, alt: "VanMoof" },
  { src: lovensLogo, alt: "Lovens" },
  { src: prioticketLogo, alt: "Prioticket" },
  { src: rainforestLogo, alt: "Rainforest Alliance" },
  { src: attractionworldLogo, alt: "Attractionworld" },
  { src: landalLogo, alt: "Landal" },
];

const routeParams = ["brand", "website", "prototype"];
const routeCaseSlugs = ["dennis-gerrits", "studio-ingrid-de-reuver", "hap"];

const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>{children}</p>
);

const Index = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [activeFrame, setActiveFrame] = React.useState(0);

  React.useEffect(() => analytics.initScrollTracking(), []);
  React.useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setActiveFrame((current) => (current + 1) % 3), 3200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const workItems = t("work.items", { returnObjects: true }) as CaseStory[];
  const serviceRoutes = t("servicesRoutes.items", { returnObjects: true }) as CaseServiceRoute[];
  const studioParagraphs = t("studio.paragraphs", { returnObjects: true }) as string[];
  const frameCase = workItems[activeFrame];
  const frameScreen = frameCase ? caseMedia[frameCase.slug]?.screens[0] : undefined;
  const frameVideo = frameCase ? caseMedia[frameCase.slug]?.video : undefined;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
  };

  const openBooking = () => {
    analytics.bookCallClick();
    window.open(BOOKING_URL, "_blank", "noopener");
  };

  return (
    <>
      <Head>
        <title>{`${t("hero.titleStart")} - Es Venture`}</title>
        <meta
          name="description"
          content={t("hero.lead")}
        />
        <link rel="canonical" href="https://esventure.nl/" />
        <link rel="alternate" hrefLang="nl" href="https://esventure.nl/" />
        <link rel="alternate" hrefLang="en" href="https://esventure.nl/?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://esventure.nl/" />
        <meta property="og:title" content={`${t("hero.titleStart")} - Es Venture`} />
        <meta property="og:description" content={t("hero.lead")} />
        <meta property="og:url" content="https://esventure.nl/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://esventure.nl/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${t("hero.titleStart")} - Es Venture`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://esventure.nl/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Es Venture",
            url: "https://esventure.nl",
              description: t("hero.lead"),
            founder: { "@type": "Person", name: "Esther Woerdman" },
            sameAs: ["https://www.linkedin.com/in/estherwoerdman/"],
            address: { "@type": "PostalAddress", addressCountry: "NL" },
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-paper text-paper-foreground font-sans">
        <Navigation />

        <main>
          <section id="hero" className="relative overflow-hidden bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-20">
              <div className="grid gap-12 md:grid-cols-[1fr_0.9fr] md:items-end">
                <div className="relative z-10">
                  <Reveal>
                    <Eyebrow className="text-secondary mb-6">{t("hero.eyebrow")}</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h1 className="max-w-[11ch] font-display text-5xl font-bold leading-none tracking-normal md:text-7xl lg:text-8xl">
                      {t("hero.titleStart")}
                      {t("hero.titleHighlight") ? <span className="text-secondary"> {t("hero.titleHighlight")}</span> : null}
                    </h1>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-7 max-w-[42ch] text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
                      {t("hero.lead")}
                    </p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="rounded-full bg-secondary px-8 py-6 text-base font-semibold text-secondary-foreground hover:bg-secondary/90"
                        onClick={() => {
                          analytics.ctaClick("hero_see_work");
                          scrollTo("work");
                        }}
                      >
                        {t("hero.ctaPrimary")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="rounded-full border-2 border-primary-foreground/45 bg-transparent px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      >
                        <Link to="/start-a-project" onClick={() => analytics.ctaClick("hero_start_project")}>
                          {t("hero.ctaSecondary")}
                        </Link>
                      </Button>
                    </div>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-8 max-w-[50ch] text-sm leading-relaxed text-primary-foreground/72">
                      {t("hero.ownership")}
                    </p>
                  </Reveal>
                </div>

                <div className="relative md:self-end">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto max-w-[32rem]"
                  >
                    <div className="overflow-hidden rounded-[2rem] bg-secondary ring-1 ring-primary-foreground/25">
                      <img
                        src={estherYellow}
                        alt={t("hero.portraitAlt")}
                        width={900}
                        height={1200}
                        loading="eager"
                        decoding="async"
                        className="aspect-[4/5] w-full object-cover object-top"
                      />
                    </div>
                    {frameCase ? (
                      <Link
                        to={`/work/${frameCase.slug}`}
                        aria-label={`${frameCase.client}: ${frameCase.cardCopy ?? frameCase.title}`}
                        className="group absolute -bottom-8 -left-4 w-56 rotate-[-5deg] overflow-hidden rounded-[1.5rem] bg-paper shadow-xl ring-1 ring-plum/10 transition-transform duration-300 hover:rotate-[-3deg] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary md:-left-12 md:w-72"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          {frameVideo ? (
                            <motion.video
                              key={frameVideo.src}
                              src={frameVideo.src}
                              poster={frameVideo.poster}
                              autoPlay={!reduce}
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.45 }}
                              className="h-full w-full bg-paper object-contain p-2"
                            />
                          ) : frameScreen ? (
                            <motion.img
                              key={frameScreen.src}
                              src={frameScreen.src}
                              alt=""
                              initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.45 }}
                              className={`h-full w-full ${frameScreen.ratio === "tall" ? "object-contain bg-paper p-2" : "object-cover object-top"}`}
                            />
                          ) : null}
                        </div>
                        <div className="relative z-10 bg-paper p-4">
                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                            {frameCase.client}
                          </p>
                          <p className="mt-1 text-sm font-semibold leading-snug text-plum/82">{frameCase.scope}</p>
                        </div>
                      </Link>
                    ) : null}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>


          <section id="work" className="relative overflow-hidden border-t-8 border-secondary bg-plum py-16 text-plum-foreground md:py-28">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-coral mb-5">{t("work.eyebrow")}</Eyebrow>
                <h2 className="max-w-[16ch] font-display text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                  {t("work.title")}
                </h2>
                <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-plum-foreground/70">{t("work.lead")}</p>
              </Reveal>
              <CaseGrid />
            </div>
          </section>

          <section id="services" className="bg-paper py-20 text-paper-foreground md:py-32">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-primary mb-5">{t("servicesRoutes.eyebrow")}</Eyebrow>
                <h2 className="max-w-[18ch] font-display text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                  {t("servicesRoutes.title")}
                </h2>

              </Reveal>

              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {serviceRoutes.map((route, i) => {
                  const stage = routeParams[i] ?? "brand";
                  const media = caseMedia[routeCaseSlugs[i]];
                  const screen = media?.screens[0];
                  return (
                    <Reveal key={route.title} delay={i * 0.08} className="h-full">
                      <article className="flex h-full flex-col rounded-[1.75rem] border border-plum/15 bg-paper p-6 text-paper-foreground transition-transform duration-300 hover:-translate-y-1 md:p-7">
                        <Link
                          to={`/work/${routeCaseSlugs[i]}`}
                          aria-label={t("work.cue")}
                          className="relative block aspect-[5/3] overflow-hidden rounded-[1.25rem] bg-muted ring-1 ring-plum/10"
                        >
                          {screen ? (
                            <img
                              src={screen.src}
                              alt={t(`caseMedia.captions.${screen.captionKey}`)}
                              loading="lazy"
                              className={
                                screen.ratio === "tall"
                                  ? "h-full w-full bg-paper object-contain p-2"
                                  : "h-full w-full object-cover object-top"
                              }
                            />
                          ) : null}
                        </Link>

                        <h3 className="mt-8 font-display text-3xl font-bold leading-tight tracking-normal">{route.title}</h3>
                        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-primary">{t("servicesRoutes.situationLabel")}</p>
                        <p className="mt-2 text-base leading-relaxed text-plum/74">{route.situation}</p>
                        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary">{t("servicesRoutes.approachLabel")}</p>
                        <p className="mt-2 text-base leading-relaxed text-plum/82">{route.result}</p>
                        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary">{t("servicesRoutes.deliverablesLabel")}</p>
                        <ul className="mt-6 space-y-2 border-t border-plum/12 pt-5">
                          {route.deliverables.map((deliverable) => (
                            <li key={deliverable} className="text-sm leading-relaxed text-plum/72">
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-6 rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-secondary-foreground">
                          {route.example}
                        </p>
                        <Button asChild className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-coral hover:text-coral-foreground">
                          <Link to={`/start-a-project?stage=${stage}`}>{t("servicesRoutes.cta")}</Link>
                        </Button>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="approach" className="bg-secondary text-secondary-foreground py-20 md:py-32">
            <div className="container mx-auto grid gap-10 px-4 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
              <Reveal>
                <h2 className="max-w-[14ch] font-display text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                  {t("usp.title")}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="border-t border-plum/25 pt-7">
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {(t("usp.paragraphs", { returnObjects: true }) as string[]).map((paragraph) => (
                      <div key={paragraph} className="rounded-2xl border border-plum/20 bg-paper p-5">
                        <p className="text-sm leading-relaxed text-plum/80">{paragraph}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

            </div>
          </section>

          <section id="studio" className="bg-paper text-paper-foreground py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="grid max-w-6xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem] bg-secondary">
                    <img
                      src={estherBw}
                      alt={t("studio.portraitAlt")}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-primary/15 mix-blend-multiply" aria-hidden="true" />
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <span aria-hidden="true" className="mb-5 block h-1 w-16 rounded-full bg-coral" />
                  <Eyebrow className="text-primary mb-5">{t("studio.eyebrow")}</Eyebrow>
                  <h2 className="max-w-[18ch] font-display text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                    {t("studio.title")}
                  </h2>
                  <div className="mt-6 max-w-[64ch] space-y-5 text-base leading-relaxed text-plum/80 md:text-lg">
                    {studioParagraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                   <Button asChild className="mt-7 rounded-full bg-primary text-primary-foreground hover:bg-coral hover:text-coral-foreground">
                     <Link to="/start-a-project">{t("studio.link")}</Link>
                   </Button>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="trust" className="bg-paper text-paper-foreground py-16 md:py-24">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-plum/55 text-center">{t("trust.eyebrow")}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
                  {clients.map((client) => (
                    <img
                      key={client.alt}
                      src={client.src}
                      alt={client.alt}
                      loading="lazy"
                      className="mx-auto max-h-9 w-auto max-w-[8rem] opacity-70 grayscale contrast-125 transition-opacity duration-300 hover:opacity-95"
                    />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-10 max-w-[60ch] text-center text-base leading-relaxed text-plum/70 md:text-lg">
                  {t("trust.copy")}
                </p>
              </Reveal>
            </div>
          </section>

          <section id="final-cta" className="bg-coral py-20 text-coral-foreground md:py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <Reveal>
                  <h2 className="font-display text-5xl font-bold leading-none tracking-normal md:text-7xl">
                    {t("finalCta.title")}
                  </h2>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-plum/80 md:text-xl">
                    {t("finalCta.copy")}
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-plum">
                      <Link to="/start-a-project" onClick={() => analytics.ctaClick("final_start_project")}>
                        {t("finalCta.primary")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={openBooking}
                      className="rounded-full border-2 border-plum/40 bg-transparent px-8 py-6 text-base font-semibold text-plum hover:bg-plum hover:text-paper"
                    >
                      {t("finalCta.secondary")}
                    </Button>
                  </div>
                </Reveal>
              </div>

            </div>
          </section>
        </main>

        <footer id="footer" className="border-t border-plum-foreground/15 bg-plum py-14 text-plum-foreground">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <img src={logoEV} alt="Es Venture" className="mb-4 h-10 brightness-0 invert" />
                <p className="max-w-xs text-sm leading-relaxed text-plum-foreground/70">{t("footer.tagline")}</p>
              </div>
              <div>
                <Eyebrow className="text-plum-foreground/50 mb-3">{t("footer.getInTouch")}</Eyebrow>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="mailto:esther@esventure.nl" className="text-plum-foreground/80 hover:text-secondary transition-colors">
                      esther@esventure.nl
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/estherwoerdman/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-plum-foreground/80 hover:text-secondary transition-colors"
                    >
                      {t("footer.linkedin")}
                    </a>
                  </li>
                  <li>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-plum-foreground/80 hover:text-secondary transition-colors">
                      {t("footer.bookCall")}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <Eyebrow className="text-plum-foreground/50 mb-3">{t("footer.more")}</Eyebrow>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/start-a-project" className="text-plum-foreground/80 hover:text-secondary transition-colors">
                      {t("nav.startProject")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-plum-foreground/80 hover:text-secondary transition-colors">
                      {t("footer.privacy")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-plum-foreground/15 pt-6">
              <p className="text-xs text-plum-foreground/70">{t("footer.rights")}</p>
            </div>
          </div>
        </footer>

        <CustomCursor />
      </div>
    </>
  );
};

export default Index;
