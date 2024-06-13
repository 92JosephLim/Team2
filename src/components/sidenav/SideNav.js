import React, { useState } from "react";
import { Link } from "react-router-dom";
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

function SideNav() {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  const toggleFriendsAccordion = () => {
    setIsFriendsOpen(!isFriendsOpen);
  };
  const { t } = useTranslation();

  return (
    <div className="sideNav w-64 min-h-screen bg-gray-800 text-white">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1">
            <li className="rounded-sm hover:bg-sky-700">
              <Link to="/ProfileSettings" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white">{t("profile")}</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <Link to="#" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white">{t("chatLog")}</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <Link to="#" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white">{t("rtcLog")}</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <div
                className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                onClick={toggleFriendsAccordion}
              >
                <span className="text-white">{t("Friend")}</span>
              </div>
            </li>
            {isFriendsOpen && (
              <ul className="pl-4">
                <li className="rounded-sm hover:bg-sky-700">
                  <Link to="/invite" className="block p-2 rounded-md text-white">
                    {t("addFriend")}
                  </Link>
                </li>
                <li className="rounded-sm hover:bg-sky-700">
                  <Link to="/friendMain" className="block p-2 rounded-md text-white">
                    {t("FriendList")}
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