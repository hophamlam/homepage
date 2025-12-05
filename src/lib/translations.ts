/**
 * Translations dictionary cho đa ngôn ngữ
 */
export const translations = {
  en: {
    footer: {
      copyright: "©",
      builtWith: "Built with",
    },
    sideProject: {
      label: "Side project:",
    },
  },
  vi: {
    footer: {
      copyright: "©",
      builtWith: "Được phát triển bằng",
    },
    sideProject: {
      label: "Dự án phụ:",
    },
  },
} as const;

export type Language = keyof typeof translations;

/**
 * Lấy translation theo key và language
 */
export function t(key: string, lang: Language = "en"): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
