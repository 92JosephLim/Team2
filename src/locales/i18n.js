import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationEn from "./json/en.json";
import TranslationKo from "./json/ko.json";
import TranslationZh from "./json/zh.json";
import TranslationJa from "./json/ja.json";

const resources = {
  en: {
    translations: TranslationEn
  },
  ko: {
    translations: TranslationKo
  },
  zh: {
    translations: TranslationZh
  },
  ja: {
    translations: TranslationJa
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    // 초기 설정 언어
    lng: "ko",
    fallbackLng: "ko",
    debug: true,
    defaultNS: "translations",
    ns: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
