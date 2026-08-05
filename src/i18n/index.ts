import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

const isBrowser = typeof window !== "undefined";

// Always initialise with "nl" so the client's first render matches the
// statically generated HTML. The stored/browser preference is applied after
// hydration (see applyStoredLanguage below).
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    nl: { translation: nl },
  },
  lng: "nl",
  fallbackLng: "en",
  supportedLngs: ["en", "nl"],
  interpolation: { escapeValue: false },
});

// Keep <html lang> in sync
const applyHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng.startsWith("nl") ? "nl" : "en";
  }
};
applyHtmlLang(i18n.language || "nl");
i18n.on("languageChanged", (lng) => {
  applyHtmlLang(lng);
  if (isBrowser) {
    try {
      window.localStorage.setItem("esventure_lang", lng);
    } catch {
      /* ignore */
    }
  }
});

export const applyStoredLanguage = () => {
  if (!isBrowser) return;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem("esventure_lang");
  } catch {
    /* ignore */
  }
  const detected =
    stored ?? (navigator.language?.toLowerCase().startsWith("nl") ? "nl" : "en");
  const next = detected.startsWith("nl") ? "nl" : "en";
  if (next !== i18n.language) i18n.changeLanguage(next);
};

export default i18n;
