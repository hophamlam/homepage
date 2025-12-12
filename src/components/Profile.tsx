import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

export interface ProfileProps {
  name: string;
  title?: string;
  description?: string;
  avatar?: string;
  className?: string;
}

/**
 * Profile component - Minimal profile display
 * @param name - Tên của người dùng
 * @param title - Chức danh/nghề nghiệp (optional)
 * @param description - Mô tả với emoji (optional)
 * @param avatar - URL của avatar image
 */
export function Profile({
  name,
  title,
  description,
  avatar,
  className,
}: ProfileProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700",
        className
      )}
    >
      <Avatar className="h-32 w-32 md:h-48 md:w-48 ring-2 ring-border/50 hover:ring-primary/50 transition-all duration-300">
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback className="text-3xl md:text-4xl">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2 leading-relaxed">
        <h1 className="text-xl md:text-2xl font-bold leading-relaxed">
          {name}
        </h1>
        {title && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {title}
          </p>
        )}
        {description && (
          <p className="text-lg md:text-xl leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
