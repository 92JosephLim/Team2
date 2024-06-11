import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "../locales/i18n";

const Translation = () => {

  const { t } = useTranslation();

  const clickHandler = (lang) => {
    i18next.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => clickHandler("ko")}>KO</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => clickHandler("en")}>EN</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => clickHandler("zh")}>ZH</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => clickHandler("ja")}>JA</button>
      <p>{t("hello")}</p>
      <p>{t("name")}</p>
    </div>
  );
};

export default Translation;
