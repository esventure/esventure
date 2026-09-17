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

      </Head>

      <div className="min-h-screen bg-paper text-paper-foreground font-sans">
        <Navigation />
        <main>
          <section className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24">
            <Link to="/#work" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-plum transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t("casePage.back")}
            </Link>
            <div className="mt-10 grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-end">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coral">{item.label}</p>
                <h1 className="mt-5 max-w-[12ch] font-display text-5xl font-bold leading-none tracking-normal md:text-7xl">
                  {item.title}
                </h1>
                <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-plum/75 md:text-xl">{item.summary}</p>
              </div>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-lilac ring-1 ring-plum/10 md:rotate-1">
                {Artwork ? <Artwork /> : null}
              </div>
            </div>
          </section>

          <section className="bg-lilac text-lilac-foreground py-16 md:py-24">
            <div className="container mx-auto grid gap-8 px-4 md:grid-cols-3">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.client")}</p>
                <p className="mt-3 font-display text-2xl font-bold tracking-normal">{item.client}</p>
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.scope")}</p>
                <p className="mt-3 font-display text-2xl font-bold tracking-normal">{item.scope}</p>
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("casePage.character")}</p>
                <p className="mt-3 font-display text-2xl font-bold tracking-normal">{item.character}</p>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
              <h2 className="font-display text-4xl font-bold leading-tight tracking-normal md:text-5xl">
                {t("casePage.needed")}
              </h2>
              <p className="text-xl leading-relaxed text-plum/78">{item.needed}</p>
            </div>
          </section>

          <section className="border-y border-plum/10 bg-paper py-16 md:py-24">
            <div className="container mx-auto grid gap-12 px-4 md:grid-cols-[0.8fr_1.2fr]">
              <h2 className="font-display text-4xl font-bold leading-tight tracking-normal md:text-5xl">
                {t("casePage.made")}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {item.made.map((made) => (
                  <li key={made} className="rounded-2xl border border-plum/12 bg-lilac/45 p-4 text-base font-medium text-plum/82">
                    {made}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-lilac text-lilac-foreground py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-4xl font-bold leading-tight tracking-normal md:text-5xl">
                {t("casePage.inUseTitle")}
              </h2>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-plum/75">{t("casePage.inUseLead")}</p>
              <div className="mt-10">
                {media ? (
                  <CaseProof media={media} client={item.client} />
                ) : (
                  <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-lilac ring-1 ring-plum/10">
                      {Artwork ? <Artwork /> : null}
                    </div>
                    <div className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-plum/10 md:p-8">
                      <ul className="space-y-3">
                        {item.made.slice(0, 4).map((made) => (
                          <li key={made} className="border-b border-plum/10 pb-3 font-display text-lg font-bold leading-snug text-plum last:border-0 last:pb-0">
                            {made}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-sm leading-relaxed text-plum/60">{t("casePage.inUsePlaceholder")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>


          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coral">{t("casePage.direction")}</p>
                <p className="mt-5 text-lg leading-relaxed text-plum/78">{item.direction}</p>
              </div>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coral">{t("casePage.outcome")}</p>
                <p className="mt-5 text-lg leading-relaxed text-plum/78">{item.outcome}</p>
              </div>
            </div>
            <div className="mt-12 rounded-[1.75rem] bg-secondary p-6 text-secondary-foreground md:p-8">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-plum/65">{t("casePage.credits")}</p>
              <p className="mt-4 text-lg leading-relaxed text-plum/82">{item.credits}</p>
            </div>
          </section>

          {next && (
            <section className="bg-primary text-primary-foreground py-16 md:py-24">
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
