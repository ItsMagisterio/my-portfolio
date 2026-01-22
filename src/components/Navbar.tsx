import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import logoDark from "@/assets/logo-dark.jpg";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Обо мне" },
    { href: "#skills", label: "Навыки" },
    { href: "#projects", label: "Проекты" },
    { href: "/pc-business", label: "ПК Бизнес", isExternal: true, disabled: true },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "liquid-glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img 
              src={logoDark} 
              alt="Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-bold text-lg">magister1o</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.disabled ? undefined : link.href}
                className={cn(
                  "transition-colors text-sm font-medium",
                  link.disabled 
                    ? "text-muted-foreground/40 cursor-not-allowed" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/ItsMagisterio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.disabled ? undefined : link.href}
                  onClick={() => !link.disabled && setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors font-medium",
                    link.disabled 
                      ? "text-muted-foreground/40 cursor-not-allowed" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/ItsMagisterio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium w-fit"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
