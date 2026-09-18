import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseMedia } from "./caseMedia";

interface CaseProofProps {
  media: CaseMedia;
  client: string;
}

const CaseProof = ({ media, client }: CaseProofProps) => {
  const { t } = useTranslation();
  const [lead, ...rest] = media.screens;

  return (
    <div className="space-y-14 md:space-y-20">
      {(media.logo || media.palette || media.typefaces) && (
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("casePage.brandLabel")}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {media.logo && (
              <figure
                className="flex flex-col justify-between rounded-[1.5rem] p-6 ring-1 ring-plum/12"
                style={{ backgroundColor: media.logoBg ?? "#ffffff" }}
              >
                <img src={media.logo} alt={`${client} logo`} className="h-24 w-full object-contain object-left" />
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-plum/55">
                  {t("casePage.logoLabel")}
                </figcaption>
              </figure>
            )}

            {media.palette && (
              <div className="rounded-[1.5rem] bg-paper p-6 ring-1 ring-plum/12">
                <div className="flex gap-3">
                  {media.palette.map((swatch) => (
                    <div key={swatch.hex} className="flex-1">
                      <div
                        className="h-20 rounded-xl ring-1 ring-plum/12"
                        style={{ backgroundColor: swatch.hex }}
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-plum/55">
                        {swatch.hex}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-plum/55">
                  {t("casePage.paletteLabel")}
                </p>
              </div>
            )}

            {media.typefaces && (
              <div className="flex flex-col justify-between rounded-[1.5rem] bg-paper p-6 ring-1 ring-plum/12">
                <div className="space-y-4">
                  {media.typefaces.map((face) => (
                    <div key={face.name} className="border-b border-plum/10 pb-3 last:border-0 last:pb-0">
                      <p className={cn("text-2xl leading-tight text-plum", face.className)}>{face.name}</p>
                      <p className="mt-1 text-sm text-plum/60">{t(`casePage.typeUse.${face.useKey}`)}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-plum/55">
                  {t("casePage.typefacesLabel")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {media.brandbook && media.brandbook.length > 0 && (
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("casePage.brandbookLabel")}
          </p>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-plum/72">{t("casePage.brandbookLead")}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {media.brandbook.map((page) => (
              <figure key={page.src}>
                <div className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-plum/12">
                  <img
                    src={page.src}
                    alt={t(`casePage.captions.${page.captionKey}`)}
                    loading="lazy"
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-plum/60">
                  {t(`casePage.captions.${page.captionKey}`)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t("casePage.screensLabel")}
        </p>

        {media.video && (
          <figure className="mx-auto mt-6 max-w-[390px]">
            <div className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-plum/12">
              <video
                src={media.video.src}
                poster={media.video.poster}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={t(`casePage.captions.${media.video.captionKey}`)}
                className="w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-plum/60">
              {t(`casePage.captions.${media.video.captionKey}`)}
            </figcaption>
          </figure>
        )}

        {lead && (
          <figure className={cn("mt-6", lead.ratio === "tall" && "mx-auto max-w-[390px]")}>
            <div className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-plum/12">
              <img src={lead.src} alt={t(`casePage.captions.${lead.captionKey}`)} loading="lazy" className="w-full" />
            </div>
            <figcaption className="mt-3 text-sm text-plum/60">{t(`casePage.captions.${lead.captionKey}`)}</figcaption>
          </figure>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((screen) => (
              <figure key={screen.src}>
                <div
                  className={cn(
                    "overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-plum/12",
                    screen.ratio === "tall" && "mx-auto max-w-[300px]"
                  )}
                >
                  <img
                    src={screen.src}
                    alt={t(`casePage.captions.${screen.captionKey}`)}
                    loading="lazy"
                    className="w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-plum/60">
                  {t(`casePage.captions.${screen.captionKey}`)}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {media.liveUrl && (
          <a
            href={media.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-display text-lg font-bold text-primary underline decoration-2 underline-offset-4 transition-all hover:gap-3 hover:text-plum"
          >
            {media.liveLabel ?? media.liveUrl}
            <ArrowUpRight className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default CaseProof;
