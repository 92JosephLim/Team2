import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

const VideoAudioSetting = () => {

  const navigate = useNavigate(); // useNavigate 초기화
  const { t } = useTranslation();

  const [videoQuality, setVideoQuality] = useState('High');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [micVolume, setMicVolume] = useState(50);
  const [speakerVolume, setSpeakerVolume] = useState(50);
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [isSpeakerTesting, setIsSpeakerTesting] = useState(false);

  const handleSave = () => {
    // 설정 저장 로직
    console.log('Video and audio settings saved');
    navigate('/mypage'); // 저장 후 MyPage로 이동
  };

  const handleMicTestToggle = () => {
    if (isMicTesting) {
      setIsMicTesting(false);
      console.log('Microphone test ended');
    } else {
      setIsMicTesting(true);
      console.log('Microphone test started');

      // 테스트 과정 시뮬레이션 (옵션)
      setTimeout(() => {
        setIsMicTesting(false);
        console.log('Microphone test ended');
      }, 5000); // 데모를 위해 5초 설정
    }
  };

  const handleSpeakerTestToggle = () => {
    if (isSpeakerTesting) {
      setIsSpeakerTesting(false);
      console.log('Speaker test ended');
    } else {
      setIsSpeakerTesting(true);
      console.log('Speaker test started');

      // 테스트 과정 시뮬레이션 (옵션)
      setTimeout(() => {
        setIsSpeakerTesting(false);
        console.log('Speaker test ended');
      }, 5000); // 데모를 위해 5초 설정
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-8">{t("videoSetting")}</h1>
          <div className="w-full max-w-2xl">
            <div className="mb-6">
              <label className="block mb-2 text-xl font-semibold text-left">{t("videoQuality")}</label>
              <select
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
                value={videoQuality}
                onChange={(e) => setVideoQuality(e.target.value)}
              >
                <option value="High">{t("high")}</option>
                <option value="Medium">{t("middel")}</option>
                <option value="Low">{t("low")}</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="flex items-center text-xl font-semibold">
                {t("video")}
                <input
                  type="checkbox"
                  className="ml-10"
                  checked={videoEnabled}
                  onChange={(e) => setVideoEnabled(e.target.checked)}
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="flex items-center text-xl font-semibold">
                {t("mic")}
                <input
                  type="checkbox"
                  className="ml-10"
                  checked={micEnabled}
                  onChange={(e) => setMicEnabled(e.target.checked)}
                />
              </label>
              <div className="flex items-center mt-4">
                <label className="block text-lg font-medium">{t("volumeInput")}</label>
                <input
                  type="range"
                  className="w-full ml-4 mr-4"
                  value={micVolume}
                  onChange={(e) => setMicVolume(e.target.value)}
                  disabled={!micEnabled}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleMicTestToggle}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {isMicTesting ? '마이크 테스트 종료' : '마이크 테스트'}
                </button>
              </div>
              {isMicTesting && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">{t("micTest")}</label>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{t("micProblem")}</p>
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="flex items-center text-xl font-semibold">
                {t("speaker")}
                <input
                  type="checkbox"
                  className="ml-10"
                  checked={speakerEnabled}
                  onChange={(e) => setSpeakerEnabled(e.target.checked)}
                />
              </label>
              <div className="flex items-center mt-4">
                <label className="block text-lg font-medium">{t("volumeOutput")}</label>
                <input
                  type="range"
                  className="w-full ml-4 mr-4"
                  value={speakerVolume}
                  onChange={(e) => setSpeakerVolume(e.target.value)}
                  disabled={!speakerEnabled}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSpeakerTestToggle}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {isSpeakerTesting ? '스피커 테스트 종료' : '스피커 테스트'}
                </button>
              </div>
              {isSpeakerTesting && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">{t("speakerTest")}</label>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{t("speakerProblem")}</p>
                </div>
              )}
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

export default VideoAudioSetting;