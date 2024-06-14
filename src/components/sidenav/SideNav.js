import React, { useState } from "react";
import { Link } from "react-router-dom";
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { ImBubble2 } from "react-icons/im";


function SideNav() {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  const toggleFriendsAccordion = () => {
    setIsFriendsOpen(!isFriendsOpen);
  };

  return (
    <div className="sideNav w-64 min-h-screen w-1/8 bg-gray-800 text-white">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1">
            <li className="rounded-sm hover:bg-sky-700">
              <Link to="/ProfileSettings" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white"><GoPerson className="inline-block mr-2" />상세 프로필 설정</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <Link to="/messageChat" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white"><ImBubble2 className="inline-block mr-2" />채팅 내역</span>
              </Link>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <div
                className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                onClick={toggleFriendsAccordion}
              >
                <span className="text-white"><GoPeople className="inline-block mr-2" />친구</span>
              </div>
            </li>
            {isFriendsOpen && (
              <ul className="pl-4">
                <li className="rounded-sm hover:bg-sky-700">
                  <Link to="/invite" className="block p-2 rounded-md text-white">
                    친구추가
                  </Link>
                </li>
                <li className="rounded-sm hover:bg-sky-700">
                  <Link to="/friendMain" className="block p-2 rounded-md text-white">
                    친구목록
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
