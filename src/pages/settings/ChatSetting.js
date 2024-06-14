import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topnav/TopNav";
import SideNav from '../../components/sidenav/SideNav';

const ChatSetting = () => {
  const navigate = useNavigate(); // useNavigate 초기화
  const [chatEnabled, setChatEnabled] = useState(true);
  const [chatSaved, setChatSaved] = useState(false);

  const handleSave = () => {
    // 설정 저장 로직
    console.log('Chat settings saved');
    navigate('/mypage'); // 저장 후 MyPage로 이동
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-8">채팅 설정</h1>
          <label className="block mb-6">
            채팅 활성화:
            <input
              type="checkbox"
              className="mt-2"
              checked={chatEnabled}
              onChange={(e) => setChatEnabled(e.target.checked)}
            />
          </label>
          <label className="block mb-6">
            채팅 저장:
            <input
              type="checkbox"
              className="mt-2"
              checked={chatSaved}
              onChange={(e) => setChatSaved(e.target.checked)}
            />
          </label>
          <div className="flex justify-end w-full">
            <button
              className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              저장
            </button>
            <button
              className="ml-4 px-8 py-4 bg-gray-500 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => navigate('/mypage')} // 취소 버튼 클릭 시 MyPage로 이동
            >
              취소
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatSetting;
