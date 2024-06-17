import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

const RoomSetting = () => {
  const navigate = useNavigate(); // useNavigate 초기화
  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomPassword, setRoomPassword] = useState('');

  const { t } = useTranslation();

  const handleSave = () => {
    // 설정 저장 로직
    console.log('Room settings saved');
    navigate('/mypage'); // 저장 후 MyPage로 이동
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-12 text-center">{t("roomSetting")}</h1>
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <label className="block mb-2 text-xl font-semibold text-left">{t("roomTheme")}</label>
              <input
                type="text"
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-8">
              <label className="block mb-2 text-xl font-semibold text-left">{t("roomPwd")}</label>
              <input
                type="password"
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="mb-8">
              <label className="block mb-2 text-xl font-semibold text-left">{t("roomExplain")}</label>
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
                {t("save")}
              </button>
              <button
                className="ml-4 px-8 py-4 bg-gray-500 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => navigate('/mypage')} // 취소 버튼 클릭 시 MyPage로 이동
              >
                {t("cancle")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSetting;
