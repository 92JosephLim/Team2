
import React from "react";

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
                    to="/friendMain"
                    className="block p-2 rounded-md text-white"
                  >
                    신고목록
                  </Link>
                </li>
              </ul>
              )}
            {/* <li className="rounded-sm hover:bg-sky-700">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-white">설정</span>
              </a>
            </li> */}
            <li className="rounded-sm">
              <Link to="/ProfileSettings" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>상세 프로필 설정</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to="/chat-history" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>채팅 내역</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to="/video-chat-history" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>화상채팅 내역</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <div className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <div className="dropdown">
                  <button className="dropdown-button">친구</button>
                  <div className="dropdown-content">
                    <Link to="/invite">친구추가</Link>
                    <Link to="/friendMain">친구목록</Link>
                  </div>
                </div>
              </div>
            </li>
            <li className="rounded-sm">
              <Link to="/settings" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>설정</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
