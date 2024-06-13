import React, { useState } from 'react';
import TopNav from "../../components/TopNav"; // TopNav 컴포넌트 임포트
import SideNav from "../../components/SideNav"; // SideNav 컴포넌트 임포트
import Footer from "../../components/Footer"; // Footer 컴포넌트 임포트

const OtherSetting = () => {
  const [screenShareEnabled, setScreenShareEnabled] = useState(true);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [reactionsEnabled, setReactionsEnabled] = useState(true);

  const handleSave = () => {
    // Save settings logic here
    console.log('Other settings saved');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-8">기타 설정</h1>
          <label className="block mb-6">
            화면 공유:
            <input
              type="checkbox"
              className="mt-2"
              checked={screenShareEnabled}
              onChange={(e) => setScreenShareEnabled(e.target.checked)}
            />
          </label>
          <label className="block mb-6">
            녹화 기능:
            <input
              type="checkbox"
              className="mt-2"
              checked={recordingEnabled}
              onChange={(e) => setRecordingEnabled(e.target.checked)}
            />
          </label>
          <label className="block mb-6">
            반응 기능:
            <input
              type="checkbox"
              className="mt-2"
              checked={reactionsEnabled}
              onChange={(e) => setReactionsEnabled(e.target.checked)}
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
              onClick={() => console.log('취소')}
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

export default OtherSetting;
