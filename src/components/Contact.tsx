import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export interface SocialLink {
  name: string;
  url: string;
  icon?: "github" | "telegram" | "zalo" | "messenger";
}

export interface ContactProps {
  socialLinks?: SocialLink[];
  className?: string;
}

/**
 * Icon component để render SVG từ file với currentColor support
 */
function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <img
      src={`/icons/contacts/${name}.svg`}
      alt={name}
      className={cn("h-8 w-8 md:h-8 md:w-8 text-foreground", className)}
      aria-hidden="true"
    />
  );
}

/**
 * Contact component - Hiển thị social links với custom SVG icons
 * Tất cả icons tự động đổi màu theo theme (dark/light mode)
 * @param socialLinks - Danh sách các social links
 */
export function Contact({ socialLinks = [], className }: ContactProps) {
  /**
   * Render icon dựa trên icon type
   * Tất cả icons đều dùng SVG từ public/icons/
   */
  const renderIcon = (icon?: string) => {
    switch (icon) {
      case "github":
        return <Icon name="github" />;
      case "telegram":
        return <Icon name="telegram" />;
      case "zalo":
        return <Icon name="zalo" />;
      case "messenger":
        return <Icon name="messenger" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150",
        className
      )}
    >
      {socialLinks.map((link, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className="h-12 w-12 md:h-12 md:w-12 text-foreground hover:text-foreground/80"
          asChild
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            title={link.name}
          >
            {renderIcon(link.icon)}
          </a>
        </Button>
      ))}
    </div>
  );
}
