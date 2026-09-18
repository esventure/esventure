import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { artworks } from "./CaseArtwork";
import { caseMedia } from "./caseMedia";
import type { CaseStory } from "./caseContent";
import { cn } from "@/lib/utils";

const accents = [
  { label: "text-coral", rule: "border-coral", bg: "bg-coral", text: "text-coral" },
  { label: "text-coral", rule: "border-coral", bg: "bg-coral", text: "text-coral" },
  { label: "text-coral", rule: "border-coral", bg: "bg-coral", text: "text-coral" },
  { label: "text-primary", rule: "border-primary", bg: "bg-primary", text: "text-primary" },
];

const CaseGrid = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const items = (t("work.items", { returnObjects: true }) as CaseStory[]).filter(
    (item) => item.slug !== "rainforest-alliance"
  );
  const featured = items.slice(0, 3);
  const archive = items.slice(3);

  return (
    <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
      {featured.map((item, i) => {
        const Artwork = artworks[i];
        const media = caseMedia[item.slug];
        const accent = accents[i] ?? accents[0];
        const reverse = i % 2 === 1;

        return (
          <motion.article
            key={item.slug}
            initial={reduce ? undefined : { opacity: 0, y: 22 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group grid gap-8 border-t border-plum-foreground/20 pt-8 md:grid-cols-12 md:gap-10 md:pt-10"
          >
            <Link
              to={`/work/${item.slug}`}
              aria-label={`${item.client} - ${item.title}`}
              className={cn("md:col-span-7", reverse && "md:order-2")}
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-plum-foreground/15 transition-transform duration-500 motion-safe:group-hover:-rotate-1">
                {media?.screens[0] ? (
                  <img
                    src={media.screens[0].src}
                    alt={`${item.client} website`}
                    loading="lazy"
                    className={media.screens[0].ratio === "tall" ? "h-full w-full object-contain p-3" : "h-full w-full object-cover object-top"}
                  />
                ) : (
                  <>
                    {Artwork ? <Artwork /> : null}
                    <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                      <div className="relative h-16 flex-1 overflow-hidden rounded-2xl bg-paper/80 ring-1 ring-paper/40 backdrop-blur-sm">
                        {Artwork ? <Artwork /> : null}
                      </div>
                      <div className={cn("h-16 w-20 rounded-2xl", accent.bg)} />
                    </div>
                  </>
                )}
              </div>
            </Link>

            <div className={cn("flex flex-col justify-end md:col-span-5", reverse && "md:order-1")}>
              <p className={cn("font-sans text-[11px] font-semibold uppercase tracking-[0.2em]", accent.label)}>
                {item.label}
              </p>
              <h3 className="mt-4 max-w-[24ch] font-display text-3xl font-bold leading-tight tracking-normal md:text-5xl">
                {item.cardCopy ?? item.title}
              </h3>
              {item.summary ? (
                <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-plum-foreground/70 md:text-lg">{item.summary}</p>
              ) : null}
              {item.character ? (
                <p className="mt-5 max-w-[38ch] font-display text-xl font-semibold leading-snug text-plum-foreground">
                  {item.character}
                </p>
              ) : null}
              <div className={cn("mt-7 border-t pt-5", accent.rule)}>
                <p className="text-sm text-plum-foreground/60">
                  {item.client} <span className="text-plum-foreground/35">/</span> {item.scope}
                </p>
                <Link
                  to={`/work/${item.slug}`}
                  className={cn(
                    "mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-2 underline-offset-4 transition-all hover:gap-3",
                    accent.text
                  )}
                >
                  {t("work.cue")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        );
      })}

      {archive.length > 0 && (
        <div className="border-t border-plum-foreground/20 pt-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-plum-foreground/55">
            {t("work.archiveTitle")}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {archive.map((item, i) => (
              <Link
                key={item.slug}
                to={`/work/${item.slug}`}
                className="group rounded-[1.5rem] border border-plum-foreground/20 bg-paper p-6 text-paper-foreground transition-colors hover:border-secondary"
              >
                <p className={cn("font-sans text-[11px] font-semibold uppercase tracking-[0.2em]", accents[i + 3]?.label ?? "text-primary")}>
                  {item.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-normal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-plum/70">{item.character}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                  {t("work.cue")}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseGrid;
