import React, { useState } from "react";
import TopNav from "../../components/TopNav"; // TopNav 컴포넌트 임포트
import SideNav from "../../components/SideNav"; // SideNav 컴포넌트 임포트
import Footer from "../../components/Footer"; // Footer 컴포넌트 임포트

const RoomSetting = () => {
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomPassword, setRoomPassword] = useState('');

  const handleSave = () => {
    // Save settings logic here
    console.log('Room settings saved');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-12 text-center">방 설정</h1>
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <label className="block mb-2 text-xl font-semibold text-left">방 제목</label>
              <input
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-8">
              <label className="block mb-2 text-xl font-semibold text-left">방 비밀번호</label>
              <input
                type="password"
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-8">
              <label className="block mb-2 text-xl font-semibold text-left">방 설명</label>
              <textarea
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                style={{ width: '100%', height: '150px' }} // 세로 길이 조절
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSave}
              >
                저장
              </button>
              <button
                className="ml-4 px-8 py-4 bg-gray-500 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => console.log('취소')}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomSetting;
