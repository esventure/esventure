import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoEV from "@/assets/logo-ev.svg";
import { analytics } from "@/lib/analytics";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/LanguageToggle";

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-charcoal/95 backdrop-blur-md py-2"
            : "bg-transparent py-3"
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
                className="h-12 transition-all brightness-0 invert"
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
                    isScrolled
                      ? "text-charcoal-foreground/80 hover:text-secondary"
                      : "text-primary-foreground/90 hover:text-secondary"
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
                  isScrolled
                    ? "border border-charcoal-foreground/40 bg-transparent text-charcoal-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
                    : "border border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                {t("nav.planMyProject")}
              </Button>
              <LanguageToggle variant="light" />
            </div>

            {/* Mobile right side */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageToggle variant="light" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 transition-colors",
                  isScrolled ? "text-charcoal-foreground hover:text-secondary" : "text-primary-foreground hover:text-secondary"
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
            "md:hidden bg-charcoal/95 backdrop-blur-md transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 border-t border-charcoal-foreground/15" : "max-h-0"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 text-charcoal-foreground hover:text-secondary transition-colors font-semibold text-lg"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("project-planner")}
              variant="ghost"
              className="w-full rounded-full border border-charcoal-foreground/40 bg-transparent text-charcoal-foreground hover:bg-secondary hover:text-secondary-foreground font-semibold text-base py-3 transition-colors"
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
