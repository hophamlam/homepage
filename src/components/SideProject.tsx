import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/translations";
import { ExternalLink } from "lucide-react";

type LocalizedText = {
  en: string;
  vi: string;
};

export interface SideProjectProps {
  title: string;
  url: string;
  description?: LocalizedText;
  className?: string;
}

/**
 * SideProject component - Hiển thị link project gọn, không có label
 * @param title - Tên của project
 * @param url - URL của project
 * @param description - Mô tả ngắn đa ngôn ngữ hiển thị kèm dưới link
 */
export function SideProject({
  title,
  url,
  description,
  className,
}: SideProjectProps) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Đọc language từ localStorage hoặc browser để sync mô tả
    const savedLang = localStorage.getItem("language") as Language | null;
    const browserLang = navigator.language.startsWith("vi") ? "vi" : "en";
    const initialLang = savedLang || browserLang;
    setLanguage(initialLang);

    // Lắng nghe sự kiện toggle language từ LanguageToggle
    const handleLanguageChange = (e: CustomEvent<{ language: Language }>) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener(
      "languagechange",
      handleLanguageChange as EventListener
    );
    return () => {
      window.removeEventListener(
        "languagechange",
        handleLanguageChange as EventListener
      );
    };
  }, []);

  const localizedDescription = description
    ? language === "vi"
      ? description.vi || description.en
      : description.en || description.vi
    : undefined;

  return (
    <Card
      className={cn(
        "border-muted/70 hover:shadow-sm transition-shadow",
        className
      )}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            {title}
          </div>
          {localizedDescription ? (
            <p className="text-xs text-muted-foreground leading-snug">
              {localizedDescription}
            </p>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          aria-label={title}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </a>
    </Card>
  );
}
