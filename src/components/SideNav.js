//마이페이지 : 좌측 네비게이션
import React from "react";

function SideNav() {
  return (
    <div className="flex flex-col h-screen p-3 bg-gray-800 text-white shadow">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>프로필</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>채팅 내역</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>화상채팅 내역</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>친구</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                <span>설정</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNav;