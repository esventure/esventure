import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { artworks } from "@/components/work/CaseArtwork";
import type { CaseStory } from "@/components/work/caseContent";
import { caseMedia } from "@/components/work/caseMedia";
import CaseProof from "@/components/work/CaseProof";

interface CasePageProps {
  slug: string;
}

const CasePage = ({ slug }: CasePageProps) => {
  const { t } = useTranslation();
  const items = t("work.items", { returnObjects: true }) as CaseStory[];
  const index = items.findIndex((item) => item.slug === slug);
  const item = index >= 0 ? items[index] : undefined;
  const next = items.length > 0 && index >= 0 ? items[(index + 1) % items.length] : undefined;
  const Artwork = index >= 0 ? artworks[index] : undefined;
  const media = caseMedia[slug];

  if (!item) {
    return (
      <div className="min-h-screen bg-paper text-paper-foreground font-sans">
        <Navigation />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">Es Venture</p>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-normal">Case not found</h1>
          <Button asChild className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${item.client} - ${item.scope} - Es Venture`}</title>
        <meta name="description" content={item.summary} />
        <link rel="canonical" href={`https://esventure.nl/work/${item.slug}`} />
        <link rel="alternate" hrefLang="nl" href={`https://esventure.nl/work/${item.slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://esventure.nl/work/${item.slug}?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={`https://esventure.nl/work/${item.slug}`} />
        <meta property="og:title" content={`${item.client} - Es Venture`} />
        <meta property="og:description" content={item.summary} />
        <meta property="og:url" content={`https://esventure.nl/work/${item.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://esventure.nl/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://esventure.nl/og-image.jpg" />
        {slug === "dennis-gerrits" && (
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap"
          />
        )}

      </Head>

      <div className="min-h-screen bg-paper text-paper-foreground font-sans">
        <Navigation />
        <main>
          <section className="container mx-auto px-4 pb-12 pt-28 md:pb-16 md:pt-36">
            <Link to="/#work" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-plum transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t("casePage.back")}
            </Link>
            <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coral">{item.label}</p>
                <h1 className="mt-5 max-w-[12ch] font-display text-5xl font-bold leading-none tracking-normal md:text-7xl">
                  {item.title}
                </h1>
                {item.summary && <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-plum/75">{item.summary}</p>}
              </div>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-muted ring-1 ring-plum/10 md:rotate-1">
                {media?.screens[0] ? (
                  <img
                    src={media.screens[0].src}
                    alt={t(`casePage.captions.${media.screens[0].captionKey}`)}
                    className={media.screens[0].ratio === "tall" ? "h-full w-full bg-paper object-contain p-3" : "h-full w-full object-cover object-top"}
                  />
                ) : Artwork ? (
                  <Artwork />
                ) : null}
              </div>
            </div>
          </section>

          <section className="border-y border-plum/10 bg-secondary py-7 text-secondary-foreground">
            <div className="container mx-auto grid gap-5 px-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.client")}</p>
                <p className="mt-1 font-display text-xl font-bold tracking-normal">{item.client}</p>
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.scope")}</p>
                <p className="mt-1 font-display text-xl font-bold tracking-normal">{item.scope}</p>
              </div>
              {item.character && (
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.character")}</p>
                  <p className="mt-1 font-display text-xl font-bold tracking-normal">{item.character}</p>
                </div>
              )}
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="mx-auto max-w-6xl border-l border-plum/20 pl-6 md:pl-10">
              <div className="relative grid gap-5 pb-12 md:grid-cols-[0.7fr_1.3fr] md:gap-12 md:pb-16">
                <span className="absolute -left-[2.4rem] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-coral font-display text-xs font-bold text-coral-foreground md:-left-[3.35rem]">01</span>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-normal md:text-4xl">{t("casePage.needed")}</h2>
                <p className="text-lg leading-relaxed text-plum/78">{item.needed}</p>
              </div>

              <div className="relative grid gap-7 border-t border-plum/10 py-12 md:grid-cols-[0.7fr_1.3fr] md:gap-12 md:py-16">
                <span className="absolute -left-[2.4rem] top-12 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground md:-left-[3.35rem] md:top-16">02</span>
                <div>
                  <h2 className="font-display text-3xl font-bold leading-tight tracking-normal md:text-4xl">{t("casePage.direction")}</h2>
                  <p className="mt-4 text-base leading-relaxed text-plum/75">{item.direction}</p>
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.made")}</p>
                  <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                    {item.made.map((made) => (
                      <li key={made} className="border-t border-plum/15 py-3 text-sm font-medium leading-relaxed text-plum/82">{made}</li>
                    ))}
                  </ul>
                  {item.brandbook && (
                    <div className="mt-7 border-t border-plum/15 pt-6">
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coral">{t("casePage.strategyLabel")}</p>
                      <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{item.brandbook.title}</h3>
                      <p className="mt-3 leading-relaxed text-plum/78">{item.brandbook.foundation}</p>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum/55">{t("casePage.audienceLabel")}</p><p className="mt-2 text-sm leading-relaxed text-plum/75">{item.brandbook.audience}</p></div>
                        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-plum/55">{t("casePage.voiceLabel")}</p><p className="mt-2 text-sm leading-relaxed text-plum/75">{item.brandbook.voice}</p></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative border-t border-plum/10 py-12 md:py-16">
                <span className="absolute -left-[2.4rem] top-12 flex h-7 w-7 items-center justify-center rounded-full bg-secondary font-display text-xs font-bold text-secondary-foreground ring-1 ring-plum/15 md:-left-[3.35rem] md:top-16">03</span>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-normal md:text-4xl">{t("casePage.inUseTitle")}</h2>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-plum/70">{t("casePage.inUseLead")}</p>
                <div className="mt-7">
                  {media ? <CaseProof media={media} client={item.client} /> : <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-muted ring-1 ring-plum/10">{Artwork ? <Artwork /> : null}</div>}
                </div>
              </div>

              <div className="relative grid gap-7 border-t border-plum/10 pt-12 md:grid-cols-[0.7fr_1.3fr] md:gap-12 md:pt-16">
                <span className="absolute -left-[2.4rem] top-12 flex h-7 w-7 items-center justify-center rounded-full bg-coral font-display text-xs font-bold text-coral-foreground md:-left-[3.35rem] md:top-16">04</span>
                <h2 className="font-display text-3xl font-bold leading-tight tracking-normal md:text-4xl">{t("casePage.outcome")}</h2>
                <div>
                  <p className="text-lg leading-relaxed text-plum/78">{item.outcome}</p>
                  <div className="mt-7 border-t border-plum/15 pt-5">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.credits")}</p>
                    <p className="mt-2 text-sm leading-relaxed text-plum/70">{item.credits}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {next && (
            <section className="bg-primary py-12 text-primary-foreground md:py-16">
              <div className="container mx-auto px-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{t("casePage.next")}</p>
                <Link to={`/work/${next.slug}`} className="mt-5 inline-flex max-w-3xl items-end gap-4 font-display text-4xl font-bold leading-tight tracking-normal text-primary-foreground hover:text-secondary md:text-6xl">
                  {next.client}
                  <ArrowRight className="mb-2 h-8 w-8 shrink-0" />
                </Link>
              </div>
            </section>
          )}
        </main>
        <CustomCursor />
      </div>
    </>
  );
};

export default CasePage;
