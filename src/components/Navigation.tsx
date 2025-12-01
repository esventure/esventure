import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg translate-y-0"
            : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-black text-foreground hover:text-primary transition-colors font-poppins"
            >
              Es Venture
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-foreground/80 hover:text-primary transition-colors font-bold"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                size="sm"
                className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
              >
                Let's talk
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

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden bg-background border-t border-border transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 text-foreground/70 hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
            >
              Let's talk
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
