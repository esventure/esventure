import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoEV from "@/assets/logo-ev.svg";
import { analytics } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/LanguageToggle";

type NavZone = "hero" | "light" | "dark" | "purple";

interface ZoneStyle {
  bg: string;
  text: string;
  textHover: string;
  logoInvert: boolean;
  buttonBorder: string;
  buttonHover: string;
  mobileBg: string;
  langVariant: "light" | "dark";
}

const zoneStyles: Record<NavZone, ZoneStyle> = {
  hero: {
    bg: "bg-transparent",
    text: "text-primary-foreground/90",
    textHover: "hover:text-secondary",
    logoInvert: true,
    buttonBorder: "border-primary-foreground/60 bg-transparent text-primary-foreground",
    buttonHover: "hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground",
    mobileBg: "bg-primary/95",
    langVariant: "light",
  },
  light: {
    bg: "bg-surface-warm/95 backdrop-blur-md",
    text: "text-surface-warm-foreground/80",
    textHover: "hover:text-primary",
    logoInvert: false,
    buttonBorder: "border-surface-warm-foreground/40 bg-transparent text-surface-warm-foreground",
    buttonHover: "hover:bg-primary hover:text-primary-foreground hover:border-primary",
    mobileBg: "bg-surface-warm/95",
    langVariant: "dark",
  },
  dark: {
    bg: "bg-anchor/95 backdrop-blur-md",
    text: "text-anchor-foreground/80",
    textHover: "hover:text-secondary",
    logoInvert: true,
    buttonBorder: "border-anchor-foreground/40 bg-transparent text-anchor-foreground",
    buttonHover: "hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
    mobileBg: "bg-anchor/95",
    langVariant: "light",
  },
  purple: {
    bg: "bg-primary/95 backdrop-blur-md",
    text: "text-primary-foreground/80",
    textHover: "hover:text-secondary",
    logoInvert: true,
    buttonBorder: "border-primary-foreground/40 bg-transparent text-primary-foreground",
    buttonHover: "hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground",
    mobileBg: "bg-primary/95",
    langVariant: "light",
  },
};

const trackedSections: Array<{ id: string; zone: NavZone }> = [
  { id: "hero", zone: "hero" },
  { id: "when-to-call", zone: "light" },
  { id: "how-i-help", zone: "dark" },
  { id: "sparring", zone: "light" },
  { id: "effect", zone: "light" },
  { id: "about-me", zone: "light" },
  { id: "planner", zone: "light" },
  { id: "contact-cta", zone: "purple" },
  { id: "contact", zone: "purple" },
  { id: "footer", zone: "purple" },
];

const Navigation = () => {
  const { t } = useTranslation();
  const [zone, setZone] = useState<NavZone>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const navHeight = 80;

    const updateZone = () => {
      const scrollY = window.scrollY;
      const probe = scrollY + navHeight + 1;

      let active: NavZone = "hero";
      for (const { id, zone } of trackedSections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (probe >= top && probe < bottom) {
          active = zone;
          break;
        }
      }
      setZone(active);
    };

    window.addEventListener("scroll", updateZone, { passive: true });
    updateZone();
    return () => window.removeEventListener("scroll", updateZone);
  }, []);

  const scrollToSection = (id: string) => {
    analytics.navClick(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: t("nav.whenToCallMe"), id: "when-to-call" },
    { label: t("nav.services"), id: "how-i-help" },
    { label: t("nav.about"), id: "about-me" },
  ];

  const current = zoneStyles[zone];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
          current.bg
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={logoEV}
                alt="Es Venture"
                className={cn(
                  "h-12 transition-all",
                  current.logoInvert && "brightness-0 invert"
                )}
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-base font-semibold transition-colors",
                    current.text,
                    current.textHover
                  )}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("project-planner")}
                variant="ghost"
                className={cn(
                  "rounded-full font-semibold px-5 py-1 text-base transition-colors",
                  current.buttonBorder,
                  current.buttonHover
                )}
              >
                {t("nav.planMyProject")}
              </Button>
              <LanguageToggle variant={current.langVariant} />
            </div>

            {/* Mobile right side */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageToggle variant={current.langVariant} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 transition-colors",
                  current.text,
                  current.textHover
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden backdrop-blur-md transition-all duration-300 overflow-hidden",
            current.mobileBg,
            isMobileMenuOpen ? "max-h-96 border-t border-current opacity-20" : "max-h-0"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "block w-full text-left py-3 transition-colors font-semibold text-lg",
                  current.text,
                  current.textHover
                )}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("project-planner")}
              variant="ghost"
              className={cn(
                "w-full rounded-full bg-transparent font-semibold text-base py-3 transition-colors",
                current.buttonBorder,
                current.buttonHover
              )}
            >
              {t("nav.planMyProject")}
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
