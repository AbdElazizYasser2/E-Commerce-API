import i18next from "../config/i18n.ts";

export const t = (key: string, options?: Record<string, unknown>): string => {
  return i18next.t(key, options);
};