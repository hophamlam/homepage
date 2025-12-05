import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/**
 * Language Provider - Quản lý language state và localStorage
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Kiểm tra language từ localStorage hoặc browser preference
    const savedLang = localStorage.getItem("language") as Language | null;
    const browserLang = navigator.language.startsWith("vi") ? "vi" : "en";
    const initialLang = savedLang || browserLang;
    setLanguageState(initialLang);
    document.documentElement.lang = initialLang;
    
    // Listen for language changes from LanguageToggle
    const handleLanguageChange = (e: CustomEvent<{ language: Language }>) => {
      setLanguageState(e.detail.language);
    };
    
    window.addEventListener("languagechange", handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener("languagechange", handleLanguageChange as EventListener);
    };
  }, []);

  /**
   * Set language và lưu vào localStorage
   */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
    }
  };

  // Luôn cung cấp Provider để tránh lỗi khi components sử dụng useLanguage
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook để sử dụng language context
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

