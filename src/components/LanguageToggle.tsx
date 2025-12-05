import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/translations";

export interface LanguageToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "default";
}

/**
 * LanguageToggle component - Toggle giữa các ngôn ngữ
 * Component độc lập, không cần LanguageProvider
 */
export function LanguageToggle({
  className,
  size = "md",
  variant = "ghost",
}: LanguageToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    setMounted(true);
    // Kiểm tra language từ localStorage hoặc browser preference
    const savedLang = localStorage.getItem("language") as Language | null;
    const browserLang = navigator.language.startsWith("vi") ? "vi" : "en";
    const initialLang = savedLang || browserLang;
    setLanguageState(initialLang);
    document.documentElement.lang = initialLang;
    
    // Dispatch custom event để các components khác có thể listen
    window.dispatchEvent(
      new CustomEvent("languagechange", { detail: { language: initialLang } })
    );
  }, []);

  /**
   * Toggle language giữa en và vi
   */
  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "vi" : "en";
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLang);
      document.documentElement.lang = newLang;
      
      // Dispatch custom event để các components khác có thể listen
      window.dispatchEvent(
        new CustomEvent("languagechange", { detail: { language: newLang } })
      );
    }
  };

  // Size classes
  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-10 w-10 text-base",
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant={variant}
        size="icon"
        disabled
        className={cn(sizeClasses[size], className)}
        aria-label="Toggle language"
      >
        EN
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className={cn(
        sizeClasses[size],
        "text-foreground hover:text-foreground/80 font-medium",
        className
      )}
    >
      {language === "en" ? "EN" : "VI"}
    </Button>
  );
}
