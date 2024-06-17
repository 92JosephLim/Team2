import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

const ChatSetting = () => {

  const navigate = useNavigate(); // useNavigate 초기화
  const { t } = useTranslation();

  const [chatEnabled, setChatEnabled] = useState(true);
  const [chatSaved, setChatSaved] = useState(false);

  const handleSave = () => {
    // 설정 저장 로직
    console.log('Chat settings saved');
    navigate('/mypage'); // 저장 후 MyPage로 이동
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-8">{t("chatSetting")}</h1>
          <label className="block mb-6">
            {t("chatActive")}:
            <input
              type="checkbox"
              className="mt-2"
              checked={chatEnabled}
              onChange={(e) => setChatEnabled(e.target.checked)}
            />
          </label>
          <label className="block mb-6">
            {t("chatSave")}:
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
  );
};

export default ChatSetting;
