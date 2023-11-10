import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import trEn from "./locales/en/trans.json";
import trFr from "./locales/fr/trans.json";
import trHd from "./locales/hd/trans.json";
import trMd from "./locales/md/trans.json";
import detector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: trEn,
  },
  fr: {
    translation: trFr,
  },
  hd: {
    translation: trHd,
  },
  md: {
    translation: trMd,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
