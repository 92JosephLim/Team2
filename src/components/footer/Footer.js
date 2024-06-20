import React from "react";
import newLogo from "../../assets/new_logo.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-col lg:flex-row justify-between bg-gray-900 text-white p-1 lg:p-2 relative z-2">
      <div className="footer-left text-left mb-1 lg:mb-0 text-xxxs sm:text-xxs md:text-xs lg:text-sm overflow-x-auto whitespace-nowrap">
        <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
          {t("centralInformationTechnologyTalentDevelopmentInstitute")}
        </div>
        <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
          {t("globalNetworkingThroughVideoCalls")}
        </div>
        <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
          {t("teamLeader")} : {t("name_JosephLim")} | <span className="break-all">ewjwej77@gmail.com</span>
        </div>
        <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
          {t("teamMembers")} : {t("name_MinGonKim")} | min-gon@naver.com, {t("name_WonJungKim")} | gimpo5975@naver.com, {t("name_HyunWooDo")} | alexdo323@naver.com
        </div>
        <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
          {t("name_JiYeonPark")} | qkrwluds7998@gmail.com, {t("name_EuiSungByun")} | qusdml123@gmail.com, {t("name_SooJungHan")} | wow012380@gmail.com
        </div>
      </div>
      <div className="footer-right text-right text-xxxs sm:text-xxs md:text-xs lg:text-sm mt-1 lg:mt-0">
        <div className="flex justify-center lg:justify-end mb-1 lg:mb-0">
          <img src={newLogo} alt="New Logo" className="h-3 lg:h-4" />
        </div>
        <div className="mt-1 lg:mt-2">
          <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
            GitHub | <a href="https://github.com/92JosephLim/Team2" className="underline">https://github.com/92JosephLim/Team2</a>
          </div>
          <div className="mb-1 text-xxxs sm:text-xxs md:text-xs lg:text-sm">
            PPT | <a href="https://www.canva.com/design/DAGHI_MQRzs/-g4uMsGntAcBVR1l3sO6Zg/edit" className="underline">https://www.canva.com/design/DAGHI_MQRzs/-g4uMsGntAcBVR1l3sO6Zg/edit</a>
          </div>
          <div className="text-xxxs sm:text-xxs md:text-xs lg:text-sm">
            YouTube |
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
