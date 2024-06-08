// //마이페이지 : 좌측 네비게이션
// SideNav.js
import React, { useState } from "react";
import { Link } from "react-router-dom";


function SideNav() {
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);


  const toggleFriendsAccordion = () => {
    setIsFriendsOpen(!isFriendsOpen);
  };

  return (
    <div className="w-64 flex flex-col min-h-screen p-3 bg-gray-800 text-white">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1">
            <li className="rounded-sm hover:bg-sky-700 ">
              <a href="/ProfileSettings" className="flex items-center p-2 space-x-3 rounded-md ">
                <span className="text-white">상세 프로필 설정</span>
              </a>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white">채팅 내역</span>
              </a>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white">화상채팅 내역</span>
              </a>
            </li>
            <li className="rounded-sm hover:bg-sky-700">
              <div
                className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                onClick={toggleFriendsAccordion}
              >
                <span className="text-white">친구</span>
              </div>
            </li>
            {isFriendsOpen && (
              <ul className="pl-4">
                <li className="rounded-sm hover:bg-sky-700">
                  <Link
                    to="/invite"
                    className="block p-2 rounded-md text-white"
                  >
                    친구추가
                  </Link>
                </li>
                <li className="rounded-sm hover:bg-sky-700">
                  <Link
                    to="/friendMain"
                    className="block p-2 rounded-md text-white"
                  >
                    친구목록
                  </Link>
                </li>
                <li className="rounded-sm hover:bg-sky-700">
                  <Link
                    to="/report"
                    className="block p-2 rounded-md text-white"
                  >
                    신고목록
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
