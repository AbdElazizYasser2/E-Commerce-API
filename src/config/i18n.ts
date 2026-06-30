import { createInstance } from "i18next";
import * as i18nextMiddleware from "i18next-http-middleware";
import { readFileSync } from "fs";
import { resolve } from "path";

const i18next = createInstance();

const loadJSON = (lang: string, ns: string) => {
  const filePath = resolve(process.cwd(), `src/locales/${lang}/${ns}.json`);
  return JSON.parse(readFileSync(filePath, "utf-8"));
};

i18next.use(i18nextMiddleware.LanguageDetector).init({
  lng: "ar",
  fallbackLng: "ar",
  supportedLngs: ["ar", "en"],
  resources: {
    ar: {
      common: loadJSON("ar", "common"),
      auth: loadJSON("ar", "auth"),
      errors: loadJSON("ar", "errors"),
      user: loadJSON("ar", "user"),
      validation: loadJSON("ar", "validation"),
      wishlist: loadJSON("ar", "wishlist"),
      address: loadJSON("ar", "address"),
      brand: loadJSON("ar", "brand"),
      cart: loadJSON("ar", "cart"),
      category: loadJSON("ar", "category"),
      product: loadJSON("ar", "product"),
      order: loadJSON("ar", "order"),
      payment: loadJSON("ar", "payment"),
      notification: loadJSON("ar", "notification"),
      shippingMethod: loadJSON("ar", "shippingMethod"),
      coupon: loadJSON("ar", "coupon"),
      review: loadJSON("ar", "review"),
      setting: loadJSON("ar", "setting"),
    },
    en: {
      common: loadJSON("en", "common"),
      auth: loadJSON("en", "auth"),
      errors: loadJSON("en", "errors"),
      user: loadJSON("en", "user"),
      validation: loadJSON("en", "validation"),
      wishlist: loadJSON("en", "wishlist"),
      address: loadJSON("en", "address"),
      brand: loadJSON("en", "brand"),
      cart: loadJSON("en", "cart"),
      category: loadJSON("en", "category"),
      product: loadJSON("en", "product"),
      order: loadJSON("en", "order"),
      payment: loadJSON("en", "payment"),
      notification: loadJSON("en", "notification"),
      shippingMethod: loadJSON("en", "shippingMethod"),
      coupon: loadJSON("en", "coupon"),
      review: loadJSON("en", "review"),
      setting: loadJSON("en", "setting"),
    },
  },
  detection: {
    order: ["header"],
    lookupHeader: "accept-language",
  },
});

export default i18next;