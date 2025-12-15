import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Danh sách tech stack để hiển thị với logo
 */
const techStack = [
  {
    name: "Astro",
    url: "https://astro.build",
    logo: "/icons/footer/astro.svg",
  },
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    logo: "/icons/footer/shadcnui.svg",
  },
  {
    name: "Cloudflare Pages",
    url: "https://pages.cloudflare.com/",
    logo: "/icons/footer/cloudflarepages.svg",
  },
];

/**
 * Footer component - Footer với tech stack (logo + text), căn giữa
 */
export function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className="py-3 md:py-4 mt-auto">
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Astro</span>
            <span className="text-muted-foreground/50">•</span>
            <span>shadcn/ui</span>
            <span className="text-muted-foreground/50">•</span>
            <span>Cloudflare Pages</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-3 md:py-4 mt-auto">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {techStack.map((tech, index) => (
            <div key={tech.name} className="flex items-center gap-2">
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors group"
              >
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  className={cn(
                    "h-4 w-4 object-contain transition-opacity duration-150",
                    "opacity-60 group-hover:opacity-100",
                    // Dark mode: invert để logo sáng lên
                    "dark:opacity-70 dark:brightness-0 dark:invert dark:contrast-200 dark:group-hover:opacity-100"
                  )}
                />
                <span>{tech.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
