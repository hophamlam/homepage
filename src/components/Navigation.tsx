import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

export interface NavigationProps {
  className?: string;
  siteTitle?: string;
}

/**
 * Navigation component - Header với site title, language toggle và theme toggle
 * @param siteTitle - Tên site hiển thị bên trái
 */
export function Navigation({ className, siteTitle = "hophamlam" }: NavigationProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto max-w-2xl flex h-14 items-center justify-between px-4">
        <a
          href="/"
          className="text-base md:text-lg font-bold hover:text-primary transition-colors"
        >
          {siteTitle}
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle size="sm" variant="ghost" />
          <ThemeToggle size="sm" variant="ghost" />
        </div>
      </div>
    </nav>
  );
}
