import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "default";
}

/**
 * ThemeToggle component - Toggle dark/light mode
 * Có thể dùng ở nhiều vị trí: top nav, footer, hoặc floating
 */
export function ThemeToggle({
  className,
  size = "md",
  variant = "ghost",
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Kiểm tra theme từ localStorage hoặc system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  /**
   * Toggle dark mode
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Size classes
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant={variant}
        size="icon"
        disabled
        className={cn(sizeClasses[size], className)}
        aria-label="Toggle theme"
      >
        <Sun className={iconSizes[size]} />
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        sizeClasses[size],
        "text-foreground hover:text-foreground/80",
        className
      )}
    >
      {theme === "light" ? (
        <Sun className={iconSizes[size]} />
      ) : (
        <Moon className={iconSizes[size]} />
      )}
    </Button>
  );
}
