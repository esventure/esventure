import { useTranslation } from "react-i18next";

/** Slow ticker strip that signals breadth between two major sections. */
const Marquee = () => {
  const { t } = useTranslation();
  const items = t("marquee.items", { returnObjects: true }) as string[];
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-charcoal py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {loop.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="label-eyebrow text-secondary/90 whitespace-nowrap">{item}</span>
                <span className="mx-6 text-charcoal-foreground/30">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
