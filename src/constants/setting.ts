export const CURRENCY_TYPES = {
  EGP: "EGP",
  USD: "USD",
  SAR: "SAR",
} as const;

export const LANGUAGE_TYPES = {
  AR: "ar",
  EN : "en",
} as const;

export type CurrencyTypes = (typeof CURRENCY_TYPES)[keyof typeof CURRENCY_TYPES];
export type LanguageTypes = (typeof LANGUAGE_TYPES)[keyof typeof LANGUAGE_TYPES];
 