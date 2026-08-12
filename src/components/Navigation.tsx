import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoEV from "@/assets/logo-ev.svg";
import { analytics } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/LanguageToggle";

type NavZone = "hero" | "paper" | "plum" | "purple";

interface ZoneStyle {
  bg: string;
  text: string;
  textHover: string;
  logoInvert: boolean;
  button: string;
  mobileBg: string;
  langVariant: "light" | "dark";
}

const zoneStyles: Record<NavZone, ZoneStyle> = {
  hero: {
    bg: "bg-transparent",
    text: "text-primary-foreground/90",
    textHover: "hover:text-secondary",
    logoInvert: true,
    button: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border-transparent",
    mobileBg: "bg-primary/95",
    langVariant: "light",
  },
  paper: {
    bg: "bg-paper/95 backdrop-blur-md border-b border-plum/10",
    text: "text-plum/75",
    textHover: "hover:text-primary",
    logoInvert: false,
    button: "bg-plum text-paper hover:bg-primary hover:text-primary-foreground border-transparent",
    mobileBg: "bg-paper/98",
    langVariant: "dark",
  },
  plum: {
    bg: "bg-plum/95 backdrop-blur-md",
    text: "text-plum-foreground/80",
    textHover: "hover:text-secondary",
    logoInvert: true,
    button: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border-transparent",
    mobileBg: "bg-plum/98",
    langVariant: "light",
  },
  purple: {
    bg: "bg-primary/95 backdrop-blur-md",
    text: "text-primary-foreground/85",
    textHover: "hover:text-secondary",
    logoInvert: true,
    button: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border-transparent",
    mobileBg: "bg-primary/98",
    langVariant: "light",
  },
};

const trackedSections: Array<{ id: string; zone: NavZone }> = [
  { id: "hero", zone: "hero" },
  { id: "what-we-do", zone: "paper" },
  { id: "work", zone: "paper" },
  { id: "studio", zone: "paper" },
  { id: "how-we-start", zone: "purple" },
  { id: "trust", zone: "paper" },
  { id: "final-cta", zone: "paper" },
  { id: "footer", zone: "plum" },
];

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [zone, setZone] = useState<NavZone>(isHome ? "hero" : "paper");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setZone("paper");
      return;
    }
    const navHeight = 80;

    const updateZone = () => {
      const probe = window.scrollY + navHeight + 1;
      let active: NavZone = "hero";
      for (const { id, zone } of trackedSections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (probe >= top && probe < top + el.offsetHeight) {
          active = zone;
          break;
        }
      }
      setZone(active);
    };

    window.addEventListener("scroll", updateZone, { passive: true });
    updateZone();
    return () => window.removeEventListener("scroll", updateZone);
  }, [isHome]);

  const goToSection = (id: string) => {
    analytics.navClick(id);
    setIsMobileMenuOpen(false);
    if (!isHome) {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: t("nav.work"), id: "work" },
    { label: t("nav.whatWeDo"), id: "what-we-do" },
    { label: t("nav.studio"), id: "studio" },
  ];

  const current = zoneStyles[zone];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-3",
        current.bg
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link
            to="/"
            onClick={() => isHome && window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:opacity-80 transition-opacity"
            aria-label="Es Venture home"
          >
            <img
              src={logoEV}
              alt="Es Venture"
              className={cn("h-11 transition-all", current.logoInvert && "brightness-0 invert")}
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goToSection(link.id)}
                className={cn("text-[15px] font-medium transition-colors", current.text, current.textHover)}
              >
                {link.label}
              </button>
            ))}
            <Button
              asChild
              className={cn("rounded-full font-semibold px-5 text-[15px] border transition-colors", current.button)}
            >
              <Link to="/start-a-project">{t("nav.startProject")}</Link>
            </Button>
            <LanguageToggle variant={current.langVariant} />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle variant={current.langVariant} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("p-2 transition-colors", current.text, current.textHover)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden backdrop-blur-md transition-all duration-300 overflow-hidden",
          current.mobileBg,
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => goToSection(link.id)}
              className={cn(
                "block w-full text-left py-3 transition-colors font-medium text-lg",
                current.text,
                current.textHover
              )}
            >
              {link.label}
            </button>
          ))}
          <Button
            asChild
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn("w-full rounded-full font-semibold text-base py-3 border transition-colors", current.button)}
          >
            <Link to="/start-a-project">{t("nav.startProject")}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
