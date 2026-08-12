import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Head } from "vite-react-ssg";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
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
  { src: vanmoofLogo, alt: "VanMoof", url: "https://www.vanmoof.com/" },
  { src: lovensLogo, alt: "Lovens", url: "https://lovensbikes.com/en/" },
  { src: prioticketLogo, alt: "Prioticket", url: "https://www.prioticket.com/" },
  { src: rainforestLogo, alt: "Rainforest Alliance", url: "https://www.rainforest-alliance.org/" },
  { src: attractionworldLogo, alt: "Attractionworld", url: "https://www.attractionworldgroup.com/" },
  { src: landalLogo, alt: "Landal", url: "https://www.landal.com/" },
];

/** Short upward fade for headlines and blocks. Respects reduced motion. */
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

  React.useEffect(() => analytics.initScrollTracking(), []);

  const whatWeDo = t("whatWeDo.items", { returnObjects: true }) as Array<{
    number: string;
    title: string;
    copy: string;
  }>;
  const startCards = t("start.cards", { returnObjects: true }) as Array<{
    title: string;
    reveal: string;
    cta: string;
  }>;
  const studioParagraphs = t("studio.paragraphs", { returnObjects: true }) as string[];

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
        <title>Es Venture - Creative digital studio by Esther Woerdman</title>
        <meta
          name="description"
          content="Es Venture is Esther Woerdman's small creative digital studio in the Netherlands. Brands, websites and digital experiences, made properly and ready to launch."
        />
        <link rel="canonical" href="https://esventure.nl/" />
        <meta property="og:title" content="Es Venture - Digital work that gets made." />
        <meta
          property="og:description"
          content="A small creative digital studio: brands, websites and digital experiences, made properly and ready to launch."
        />
        <meta property="og:url" content="https://esventure.nl/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Es Venture",
            url: "https://esventure.nl",
            description:
              "Creative digital studio led by Esther Woerdman. Brands, websites and digital experiences, made and ready to launch.",
            founder: { "@type": "Person", name: "Esther Woerdman" },
            address: { "@type": "PostalAddress", addressCountry: "NL" },
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-paper text-paper-foreground font-sans">
        <Navigation />

        <main>
          {/* ─── 1. Hero - Purple ─── */}
          <section id="hero" className="relative overflow-hidden bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-0 md:min-h-screen md:flex md:items-center">
              <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-8 items-center w-full">
                <div className="relative z-10 md:py-24">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 -left-4 select-none font-display text-[7rem] leading-none text-secondary/90 md:text-[9rem]"
                  >
                    *
                  </span>
                  <Reveal>
                    <Eyebrow className="text-secondary mb-6">{t("hero.eyebrow")}</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h1 className="font-display font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(2.75rem,7vw,5.25rem)]">
                      {t("hero.titleStart")}{" "}
                      <span className="text-secondary">{t("hero.titleHighlight")}</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-6 max-w-[38ch] text-lg md:text-xl leading-relaxed text-primary-foreground/90">
                      {t("hero.lead")}
                    </p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="mt-9 flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="rounded-full px-8 py-6 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90"
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
                        className="rounded-full px-8 py-6 text-base font-semibold bg-transparent text-primary-foreground border-2 border-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      >
                        <Link to="/start-a-project" onClick={() => analytics.ctaClick("hero_start_project")}>
                          {t("hero.ctaSecondary")}
                        </Link>
                      </Button>
                    </div>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-8 max-w-[46ch] text-sm leading-relaxed text-primary-foreground/85">
                      {t("hero.ownership")}
                    </p>
                  </Reveal>
                </div>

                <div className="relative md:self-end">
                  <motion.img
                    src={estherYellow}
                    alt="Esther Woerdman, founder of Es Venture"
                    width={900}
                    height={1200}
                    loading="eager"
                    decoding="async"
                    className="w-full object-cover object-top max-h-[60vh] md:max-h-[88vh] md:scale-105 md:origin-bottom"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ─── 2. What we do - Warm Paper ─── */}
          <section id="what-we-do" className="bg-paper text-paper-foreground py-20 md:py-32">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-primary mb-5">{t("whatWeDo.eyebrow")}</Eyebrow>
                <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.6vw,3.5rem)] max-w-[22ch]">
                  {t("whatWeDo.title")}
                </h2>
              </Reveal>

              <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                {whatWeDo.map((item, i) => (
                  <Reveal key={item.number} delay={i * 0.08}>
                    <div className="group h-full border-t-2 border-plum/15 pt-6 transition-colors hover:border-primary">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs font-semibold tracking-[0.2em] text-plum/50">
                          {item.number}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-6 rounded-full bg-secondary transition-all duration-300 md:w-0 md:opacity-0 md:group-hover:w-6 md:group-hover:opacity-100"
                        />
                      </div>
                      <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold tracking-[-0.01em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[34ch] text-base md:text-lg leading-relaxed text-plum/75">
                        {item.copy}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ─── 3. Selected work - Deep Plum ─── */}
          <section id="work" className="bg-plum text-plum-foreground py-20 md:py-32">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-secondary mb-5">{t("work.eyebrow")}</Eyebrow>
                <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.6vw,3.5rem)] max-w-[20ch]">
                  {t("work.title")}
                </h2>
              </Reveal>

              {/* Approved client marks only - no invented case studies. */}
              <div className="mt-14 grid gap-4 md:grid-cols-3 md:auto-rows-[minmax(0,1fr)]">
                {clients.map((client, i) => (
                  <Reveal
                    key={client.alt}
                    delay={i * 0.06}
                    className={i === 0 ? "md:col-span-2" : i === 3 ? "md:col-span-2" : ""}
                  >
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-40 md:h-52 items-center justify-center overflow-hidden rounded-2xl bg-plum-foreground/[0.06] ring-1 ring-plum-foreground/10 transition-colors hover:bg-secondary"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        loading="lazy"
                        className="h-8 md:h-10 w-auto brightness-0 invert opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert-0 group-hover:scale-105"
                      />
                      <span className="absolute bottom-4 right-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-plum opacity-0 transition-opacity group-hover:opacity-100">
                        {client.alt}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Eyebrow className="text-plum-foreground/60">{t("work.workedWith")}</Eyebrow>
                  <span className="text-sm text-secondary">{t("work.note")}</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ─── 4. The studio - Pale Lilac ─── */}
          <section id="studio" className="bg-lilac text-lilac-foreground py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16 items-center max-w-6xl mx-auto">
                <Reveal>
                  <div className="relative overflow-hidden rounded-[2rem]">
                    <img
                      src={estherBw}
                      alt="Esther Woerdman at work"
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" aria-hidden="true" />
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <Eyebrow className="text-primary mb-5">{t("studio.eyebrow")}</Eyebrow>
                  <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.03] text-[clamp(2rem,4.4vw,3.25rem)] max-w-[24ch]">
                    {t("studio.title")}
                  </h2>
                  <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-plum/80 max-w-[65ch]">
                    {studioParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <a
                    href="mailto:esther@esventure.nl"
                    onClick={() => analytics.emailClick()}
                    className="mt-7 inline-flex items-center gap-2 text-base font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4 hover:text-plum transition-colors"
                  >
                    {t("studio.link")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ─── 5. How projects start - Purple ─── */}
          <section id="how-we-start" className="bg-primary text-primary-foreground py-20 md:py-32">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-secondary mb-5">{t("start.eyebrow")}</Eyebrow>
                <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.6vw,3.5rem)]">
                  {t("start.title")}
                </h2>
              </Reveal>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {startCards.map((card, i) => (
                  <Reveal key={card.title} delay={i * 0.08} className="h-full">
                    <div className="flex h-full flex-col rounded-[1.75rem] bg-paper p-7 text-paper-foreground shadow-[0_18px_40px_-24px_hsl(var(--plum)/0.5)] transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="font-display text-2xl md:text-[1.7rem] font-bold tracking-[-0.01em]">
                        {card.title}
                      </h3>
                      <p className="mt-4 flex-1 text-base leading-relaxed text-plum/75">{card.reveal}</p>
                      {i === 1 ? (
                        <Button
                          asChild
                          className="mt-6 w-full rounded-full py-6 text-base font-semibold bg-plum text-paper hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link to="/start-a-project?stage=project">{card.cta}</Link>
                        </Button>
                      ) : (
                        <Button
                          onClick={i === 0 ? openBooking : () => (window.location.href = "mailto:esther@esventure.nl")}
                          className="mt-6 w-full rounded-full py-6 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        >
                          {card.cta}
                        </Button>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ─── 6. Trust - Warm Paper ─── */}
          <section id="trust" className="bg-paper text-paper-foreground py-16 md:py-24">
            <div className="container mx-auto px-4">
              <Reveal>
                <Eyebrow className="text-plum/55 text-center">{t("trust.eyebrow")}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
                  {clients.map((client) => (
                    <img
                      key={client.alt}
                      src={client.src}
                      alt={client.alt}
                      loading="lazy"
                      className="h-7 md:h-9 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-12 max-w-[62ch] text-center text-base md:text-lg leading-relaxed text-plum/75">
                  {t("trust.copy")}
                </p>
              </Reveal>
            </div>
          </section>

          {/* ─── 7. Final CTA - Deep Plum ─── */}
          <section id="final-cta" className="bg-plum text-plum-foreground py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <Reveal>
                  <h2 className="font-display font-bold tracking-[-0.02em] leading-[1.0] text-[clamp(2.25rem,5.4vw,4rem)]">
                    {t("finalCta.title")}
                  </h2>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-6 max-w-[52ch] text-lg md:text-xl leading-relaxed text-plum-foreground/80">
                    {t("finalCta.copy")}
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="mt-9 flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full px-8 py-6 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      <Link to="/start-a-project" onClick={() => analytics.ctaClick("final_start_project")}>
                        {t("finalCta.primary")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={openBooking}
                      className="rounded-full px-8 py-6 text-base font-semibold bg-transparent text-plum-foreground border-2 border-plum-foreground/50 hover:bg-plum-foreground/10 hover:text-plum-foreground"
                    >
                      {t("finalCta.secondary")}
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        {/* ─── Footer ─── */}
        <footer id="footer" className="bg-plum text-plum-foreground border-t border-plum-foreground/15 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <img src={logoEV} alt="Es Venture" className="h-10 brightness-0 invert mb-4" />
                <p className="max-w-xs text-sm leading-relaxed text-plum-foreground/70">
                  {t("hero.eyebrow")}
                </p>
              </div>
              <div>
                <Eyebrow className="text-plum-foreground/50 mb-3">{t("footer.getInTouch")}</Eyebrow>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="mailto:esther@esventure.nl"
                      className="text-plum-foreground/80 hover:text-secondary transition-colors"
                    >
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
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-plum-foreground/80 hover:text-secondary transition-colors"
                    >
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
                  <li>
                    <a
                      href="https://plaiwrks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-plum-foreground/80 hover:text-secondary transition-colors"
                    >
                      {t("footer.plaiwrks")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-14 flex flex-col gap-2 border-t border-plum-foreground/15 pt-6 sm:flex-row sm:justify-between">
              <p className="text-xs text-plum-foreground/70">{t("footer.rights")}</p>
              <p className="text-xs text-plum-foreground/70">{t("footer.legal")}</p>
            </div>
          </div>
        </footer>

        <CustomCursor />
      </div>
    </>
  );
};

export default Index;
