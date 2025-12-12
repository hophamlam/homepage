import { useEffect, useState } from "react";

/**
 * Danh sách tech stack để hiển thị
 */
const techStack = [
  { name: "Astro", url: "https://astro.build" },
  { name: "shadcn/ui", url: "https://ui.shadcn.com" },
  { name: "Cloudflare", url: "https://cloudflare.com" },
];

/**
 * Footer component - Footer với tech stack cố định, căn giữa
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Astro</span>
            <span className="text-muted-foreground/50">•</span>
            <span>shadcn/ui</span>
            <span className="text-muted-foreground/50">•</span>
            <span>Cloudflare</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-3 md:py-4 mt-auto">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {techStack.map((tech, index) => (
            <div key={tech.name} className="flex items-center gap-2">
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {tech.name}
              </a>
              {index < techStack.length - 1 && (
                <span className="text-muted-foreground/50">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
