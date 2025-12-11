import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoEV from "@/assets/logo-ev.svg";
import { analytics } from "@/lib/analytics";

const Navigation = () => {
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
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "About", id: "about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg py-2 translate-y-0"
            : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:opacity-80 transition-opacity"
            >
              <img src={logoEV} alt="Es Venture" className="h-12" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-base font-semibold font-poppins transition-colors",
                    isScrolled
                      ? "text-foreground/80 hover:text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                variant="ghost"
                className="rounded-full border border-primary bg-transparent text-foreground hover:bg-primary/10 hover:text-primary font-semibold px-5 py-1 text-base transition-colors"
              >
                Let's Talk
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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

        <div
          className={cn(
            "md:hidden bg-background/95 backdrop-blur-md border-t border-border transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 text-foreground hover:text-primary transition-colors font-semibold font-poppins text-lg"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              variant="ghost"
              className="w-full rounded-full border border-primary bg-transparent text-foreground hover:bg-primary/10 hover:text-primary font-semibold text-base py-3 transition-colors"
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
