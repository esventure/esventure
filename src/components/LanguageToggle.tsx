import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  variant?: "light" | "dark";
  className?: string;
}

const LanguageToggle = ({ variant = "dark", className }: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const current = (i18n.language || "en").startsWith("nl") ? "nl" : "en";

  const change = (lng: "en" | "nl") => {
    if (lng === current) return;
    i18n.changeLanguage(lng);
  };

  const base =
    "px-2 py-0.5 text-xs font-bold rounded-full transition-colors";
  const isLight = variant === "light";

  return (
    <div
      role="group"
      aria-label={t("language.switchTo")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-0.5",
        isLight
          ? "border border-primary-foreground/40"
          : "border border-foreground/20",
        className
      )}
    >
      {(["en", "nl"] as const).map((lng) => {
        const active = current === lng;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => change(lng)}
            aria-pressed={active}
            className={cn(
              base,
              active
                ? isLight
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground"
                : isLight
                  ? "text-primary-foreground/80 hover:text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
            )}
          >
            {t(`language.${lng}`)}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
