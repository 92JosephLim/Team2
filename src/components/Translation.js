import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "../locales/i18";

const Translation = () => {
  const { t } = useTranslation();

  const clickHandler = () => {
    i18next.language === "ko"
      ? i18next.changeLanguage("en")
      : i18next.changeLanguage("ko");
  };


  return (
    <div>
      <button onClick={() => clickHandler("ko")}>KO</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => clickHandler("en")}>EN</button>
      <p>{t("hello")}</p>
      <p>{t("name")}</p>
    </div>
  );
};

export default Translation;
