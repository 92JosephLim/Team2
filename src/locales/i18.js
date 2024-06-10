import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationEn from "./en.json";
import TranslationKo from "./ko.json";
import TranslationCh from "./ch.json";
import TranslationJp from "./jp.json";

const resources = {
  en: {
    translations: TranslationEn
  },
  ko: {
    translations: TranslationKo
  },
  ch: {
    translations: TranslationCh
  },
  jp: {
    translations: TranslationJp
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
