import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "./locales/id.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const saved = (localStorage.getItem("app_lang") as "id" | "en" | "zh" | null) ?? "id";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: saved,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
