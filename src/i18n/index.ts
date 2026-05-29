import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "nl"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "esventure_lang",
    },
  });

// Keep <html lang> in sync
const applyHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng.startsWith("nl") ? "nl" : "en";
  }
};
applyHtmlLang(i18n.language || "en");
i18n.on("languageChanged", applyHtmlLang);

export default i18n;
