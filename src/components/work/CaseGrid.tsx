import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, X } from "lucide-react";
import { artworks } from "./CaseArtwork";
import { cn } from "@/lib/utils";

interface CaseItem {
  label: string;
  title: string;
  client: string;
  scope: string;
  modalHeading: string;
  summary: string;
}

/** One dominant colour world per case: label / cue / accent tokens. */
const worlds = [
  { label: "text-plum/70", cue: "text-plum", ring: "ring-plum/15" },
  { label: "text-coral", cue: "text-coral", ring: "ring-coral/25" },
  { label: "text-plum/70", cue: "text-plum", ring: "ring-lime/40" },
  { label: "text-primary", cue: "text-primary", ring: "ring-primary/25" },
];

const CaseGrid = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const items = t("work.items", { returnObjects: true }) as CaseItem[];
  const [open, setOpen] = React.useState<number | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const triggerRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  React.useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    const i = open;
    setOpen(null);
    if (i !== null) triggerRefs.current[i]?.focus();
  };

  /* Asymmetric editorial grid: 8/4 lead row, 4/8 second row. */
  const spans = [
    "md:col-span-8 md:row-span-2",
    "md:col-span-4 md:row-span-3",
    "md:col-span-4",
    "md:col-span-8",
  ];
  const ratios = ["aspect-[16/10]", "aspect-[3/4] md:aspect-[3/5]", "aspect-[4/5] md:aspect-[4/3]", "aspect-[16/9]"];

  return (
    <>
      <div className="mt-14 grid gap-5 md:grid-cols-12 md:gap-7">
        {items.map((item, i) => {
          const Artwork = artworks[i];
          const world = worlds[i];
          return (
            <motion.article
              key={item.client}
              initial={reduce ? undefined : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={cn("group flex flex-col", spans[i])}
            >
              <button
                ref={(el) => (triggerRefs.current[i] = el)}
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                aria-label={`${item.client} - ${item.title}`}
                className={cn(
                  "relative w-full overflow-hidden rounded-[1.5rem] ring-1 text-left transition-shadow duration-300 hover:shadow-[0_28px_60px_-32px_hsl(var(--plum)/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  world.ring,
                  ratios[i]
                )}
              >
                <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.03]">
                  <Artwork />
                </div>
              </button>

              <div className="mt-5 flex flex-1 flex-col">
                <p className={cn("font-sans text-[11px] font-semibold uppercase tracking-[0.2em]", world.label)}>
                  {item.label}
                </p>
                <h3 className="mt-3 font-display text-2xl md:text-[1.85rem] font-bold leading-[1.08] tracking-[-0.01em] max-w-[30ch]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-plum/70">
                  {item.client} <span className="text-plum/35">/</span> {item.scope}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className={cn(
                    "mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold underline decoration-2 underline-offset-4 transition-all hover:gap-2.5",
                    world.cue
                  )}
                >
                  {t("work.cue")}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-plum/60 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[1.5rem] bg-paper p-8 text-paper-foreground shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t("work.close", { defaultValue: "Close" })}
              className="absolute right-4 top-4 rounded-full p-2 text-plum/60 transition-colors hover:bg-plum/10 hover:text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {items[open].label}
            </p>
            <h4 id="case-modal-title" className="mt-3 font-display text-2xl font-bold tracking-[-0.01em]">
              {items[open].modalHeading}
            </h4>
            <p className="mt-4 text-base leading-relaxed text-plum/80">{items[open].summary}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-plum/15 pt-5 text-sm">
              <div>
                <dt className="text-plum/50">{t("work.clientLabel")}</dt>
                <dd className="mt-1 font-semibold">{items[open].client}</dd>
              </div>
              <div>
                <dt className="text-plum/50">{t("work.scopeLabel")}</dt>
                <dd className="mt-1 font-semibold">{items[open].scope}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseGrid;
