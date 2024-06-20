import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import 'font-awesome/css/font-awesome.min.css';

function SideNav() {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const { t } = useTranslation();
  const [profileSettingsPath, setProfileSettingsPath] = useState("/ProfileSettings");
  const [profileImage, setProfileImage] = useState("http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg");
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    // 로컬스토리지에서 프로필 이미지와 닉네임 가져오기
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedNickName = localStorage.getItem("nickName");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
    if (storedNickName) {
      setNickName(storedNickName);
    }
  }, []);

  useEffect(() => {
    const loginType = localStorage.getItem("loginType");
    if (loginType === "KAKAO" || loginType === "GOOGLE") {
      setProfileSettingsPath("/socialProfileSettings");
    } else {
      setProfileSettingsPath("/ProfileSettings");
    }
  }, []);

  const toggleFriendsAccordion = () => {
    setIsFriendsOpen(!isFriendsOpen);
  };

  return (
    <div className="min-w-max min-h-screen bg-gray-800 text-white flex-shrink-0">
      <div className="space-y-3">
        {/* 프로필 이미지 */}
        <div className="p-5 bg-gray-800">
          <img
            className="border border-indigo-100 shadow-lg rounded-full"
            src={profileImage}
            alt="Profile"
          />

          {/* 닉네임 */}
          <div className="pt-2 border-t mt-5 w-full text-center text-xl text-white">
            {nickName}
          </div>
        </div>

        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm sm:text-base md:text-lg lg:text-xl">
            <li className="hover:bg-sky-700">
              <Link to={profileSettingsPath} className="flex items-center p-2 space-x-3 rounded-md w-full">
                <span className="text-white">{t("profile")}</span> <i className="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>
              </Link>
            </li>
            <li className="hover:bg-sky-700">
              <div
                className="flex items-center p-2 space-x-3 rounded-md cursor-pointer w-full"
                onClick={toggleFriendsAccordion}
              >
                <span className="text-white">{t("Friend")}</span> <i className="fa fa-user text-gray-600 text-2xl pr-1 pt-1 float-right"></i>
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
              <Link to="/settings/VideoAudioSetting" className="flex items-center p-2 space-x-3 rounded-md w-full">
                <span className="text-white">{t("videoSetting")}</span> <i className="fa fa-microphone text-gray-600 text-2xl pr-1 pt-1 float-right"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
