import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import logoDark from "@/assets/logo-dark.jpg";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className={cn(
          "glass-pill rounded-full transition-all duration-500 w-full max-w-xl",
          isScrolled ? "shadow-lg" : ""
        )}
      >
        <div className="flex items-center justify-between px-5 h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logoDark} alt="Logo" className="w-7 h-7 rounded-xl" />
            <span className="font-bold text-base text-gray-800 dark:text-gray-200 tracking-tight">magister1o</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/60 dark:hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              data-testid="button-lang-toggle"
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/60 dark:hover:bg-white/10"
              style={{ background: "var(--pill-bg)", border: "1px solid var(--pill-border)" }}
            >
              {lang.toUpperCase()}
            </button>

            <button
              data-testid="button-theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:bg-white/60 dark:hover:bg-white/10"
              style={{ background: "var(--pill-bg)", border: "1px solid var(--pill-border)" }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 glass-pill rounded-3xl p-5 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium transition-all text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setLang(lang === "ru" ? "en" : "ru")}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 text-gray-600 dark:text-gray-400"
                style={{ background: "var(--pill-bg)", border: "1px solid var(--pill-border)" }}
              >
                {lang.toUpperCase()}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 transition-all duration-200"
                style={{ background: "var(--pill-bg)", border: "1px solid var(--pill-border)" }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
