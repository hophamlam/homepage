import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

/**
 * AppWrapper - Wrapper component để cung cấp Language context
 */
export function AppWrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

