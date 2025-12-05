import { useEffect, useState } from "react";
import { t } from "@/lib/translations";
import type { Language } from "@/lib/translations";

/**
 * Footer component - Footer với đa ngôn ngữ (độc lập, không cần LanguageProvider)
 */
export function Footer() {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Kiểm tra language từ localStorage hoặc browser preference
    const savedLang = localStorage.getItem("language") as Language | null;
    const browserLang = navigator.language.startsWith("vi") ? "vi" : "en";
    const initialLang = savedLang || browserLang;
    setLanguage(initialLang);

    // Listen for language changes from LanguageToggle
    const handleLanguageChange = (e: CustomEvent<{ language: Language }>) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener("languagechange", handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange as EventListener);
    };
  }, []);

  if (!mounted) {
    return (
      <footer className="py-3 md:py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <p>© {new Date().getFullYear()} hophamlam</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-3 md:py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <p>
              {t("footer.copyright", language)} {new Date().getFullYear()}{" "}
              hophamlam
            </p>
            <span>•</span>
            <span>{t("footer.builtWith", language)}</span>
            <a
              href="https://astro.build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Astro
            </a>
            <span>&</span>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              shadcn/ui
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
