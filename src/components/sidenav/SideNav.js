import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SideNav() {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleFriendsAccordion = () => {
    setIsFriendsOpen(!isFriendsOpen);
  };

  const toggleSettingsAccordion = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="min-w-max min-h-screen bg-gray-800 text-white flex-shrink-0">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm sm:text-base md:text-lg lg:text-xl">
            <li className="hover:bg-sky-700">
              <Link to="/ProfileSettings" className="flex items-center p-2 space-x-3 rounded-md w-full">
                <span className="text-white">{t("profile")}</span>
              </Link>
            </li>
            <li className="hover:bg-sky-700">
              <div
                className="flex items-center p-2 space-x-3 rounded-md cursor-pointer w-full"
                onClick={toggleFriendsAccordion}
              >
                <span className="text-white">{t("Friend")}</span>
              </div>
            </li>
            {isFriendsOpen && (
              <ul className="pl-4">
                <li className="hover:bg-sky-700">
                  <Link to="/invite" className="block p-2 rounded-md text-white w-full">
                    {t("addFriend")}
                  </Link>
                </li>
                <li className="hover:bg-sky-700">
                  <Link to="/friendMain" className="block p-2 rounded-md text-white w-full">
                    {t("FriendList")}
                  </Link>
                </li>
              </ul>
            )}
            <li className="hover:bg-sky-700">
              <div
                className="flex items-center p-2 space-x-3 rounded-md cursor-pointer w-full"
                onClick={toggleSettingsAccordion}
              >
                <span className="text-white">Settings</span>
              </div>
            </li>
            {isSettingsOpen && (
              <ul className="pl-4">
                <li className="hover:bg-sky-700">
                  <Link to="/settings/VideoAudioSetting" className="block p-2 rounded-md text-white w-full">
                    {t("videoSetting")}
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
