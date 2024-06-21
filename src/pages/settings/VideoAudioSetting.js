import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const VideoAudioSetting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    videoEnabled: true,
    micEnabled: true,
    speakerEnabled: true,
    micVolume: 50,
    speakerVolume: 50,
    isMicTesting: false,
    isSpeakerTesting: false,
    isVideoTesting: false
  });
  const audioContextRef = useRef(null);
  const micGainNodeRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 설정 저장 핸들러
  const handleSave = () => {
    console.log('Video and audio settings saved');
    navigate('/mypage');
  };

  // 마이크 테스트 핸들러
  const handleMicTestToggle = async () => {
    if (settings.isMicTesting) {
      stopMicTest();
    } else {
      startMicTest();
    }
  };

  const stopMicTest = () => {
    setSettings(prev => ({ ...prev, isMicTesting: false }));
    console.log('Microphone test ended');
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const startMicTest = async () => {
    setSettings(prev => ({ ...prev, isMicTesting: true }));
    console.log('Microphone test started');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const sourceNode = audioCtx.createMediaStreamSource(stream);
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = settings.micVolume / 100;
      sourceNode.connect(gainNode).connect(audioCtx.destination);

      mediaStreamRef.current = stream;
      audioContextRef.current = audioCtx;
      sourceRef.current = sourceNode;
      micGainNodeRef.current = gainNode;
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  useEffect(() => {
    if (micGainNodeRef.current) {
      micGainNodeRef.current.gain.value = settings.micVolume / 100;
    }
  }, [settings.micVolume]);

  // 스피커 테스트 핸들러
  const handleSpeakerTestToggle = () => {
    if (settings.isSpeakerTesting) {
      stopSpeakerTest();
    } else {
      startSpeakerTest();
    }
  };

  const stopSpeakerTest = () => {
    setSettings(prev => ({ ...prev, isSpeakerTesting: false }));
    console.log('Speaker test ended');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const startSpeakerTest = () => {
    setSettings(prev => ({ ...prev, isSpeakerTesting: true }));
    console.log('Speaker test started');
    const testAudio = new Audio('/test-sound.mp3');
    testAudio.volume = settings.speakerVolume / 100;
    testAudio.play();
    audioRef.current = testAudio;

    testAudio.onended = () => {
      stopSpeakerTest();
    };
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.speakerVolume / 100;
    }
  }, [settings.speakerVolume]);

  // 비디오 테스트 핸들러
  const handleVideoTestToggle = async () => {
    if (settings.isVideoTesting) {
      stopVideoTest();
    } else {
      startVideoTest();
    }
  };

  const stopVideoTest = () => {
    setSettings(prev => ({ ...prev, isVideoTesting: false }));
    setIsModalOpen(false);
    console.log('Video test ended');
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startVideoTest = async () => {
    setSettings(prev => ({ ...prev, isVideoTesting: true }));
    setIsModalOpen(true);
    console.log('Video test started');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing video:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 justify-center items-center">
        <div className="container mx-auto p-6 pt-10 bg-white rounded-3xl shadow-2xl max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center">{t("videoSetting")}</h1>
          <div className="w-full max-w-4xl mx-auto">
            <SettingToggle
              label={t("video")}
              onTest={handleVideoTestToggle}
              isTesting={settings.isVideoTesting}
              testLabel={t("webCamTestStart")}
              testEndLabel={t("webCamTestStop")}
            />
            <SettingToggle
              label={t("mic")}
              volume={settings.micVolume}
              onVolumeChange={value => setSettings(prev => ({ ...prev, micVolume: value }))}
              onTest={handleMicTestToggle}
              isTesting={settings.isMicTesting}
              testLabel={t("micTestStart")}
              testEndLabel={t("micTestStop")}
              volumeLabel={t("volumeInput")}
              testingComponent={
                <div className="mt-4 relative">
                  <label className="block text-sm font-medium text-gray-700">{t("micTest")}</label>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gray-900 animate-pulse" style={{ width: '100%' }}></div>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">{t("micProblem")}</p>
                </div>
              }
            />
            <SettingToggle
              label={t("speaker")}
              volume={settings.speakerVolume}
              onVolumeChange={value => setSettings(prev => ({ ...prev, speakerVolume: value }))}
              onTest={handleSpeakerTestToggle}
              isTesting={settings.isSpeakerTesting}
              testLabel={t("speakerTestStart")}
              testEndLabel={t("speakerTestStop")}
              volumeLabel={t("volumeOutput")}
              testingComponent={
                <div className="mt-4 relative">
                  <label className="block text-sm font-medium text-gray-700">{t("speakerTest")}</label>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gray-900 animate-pulse" style={{ width: '100%' }}></div>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">{t("speakerProblem")}</p>
                </div>
              }
            />
            <div className="flex justify-center mt-8">
              <button
                className="ml-4 px-8 py-4 bg-gray-700 text-white text-lg font-semibold rounded-md shadow-md hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                onClick={() => navigate('/mypage')}
              >
                {t("mypage")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl">
            <div className="relative">
              <video ref={videoRef} className="w-full h-auto rounded-md border-2 border-gray-300" autoPlay></video>
              <button
                className="absolute top-2 right-2 px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                onClick={stopVideoTest}
                style={{ whiteSpace: 'nowrap' }}
              >
                {t("webCamTestStop")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingToggle = ({ label, onTest, isTesting, testLabel, testEndLabel, volume, onVolumeChange, volumeLabel, testingComponent }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <label className="text-xl font-semibold">{label}</label>
      <button
        className="ml-4 px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        onClick={onTest}
        style={{ whiteSpace: 'nowrap' }}
      >
        {isTesting ? testEndLabel : testLabel}
      </button>
    </div>
    <div className="flex items-center space-x-4">
      {volumeLabel && <label className="block text-lg font-medium flex-shrink-0">{volumeLabel}</label>}
      {volume !== undefined && (
        <input
          type="range"
          className="w-full"
          value={volume}
          onChange={(e) => onVolumeChange(e.target.value)}
          style={{ accentColor: "black" }}
        />
      )}
    </div>
    {isTesting && testingComponent}
  </div>
);

SettingToggle.propTypes = {
  label: PropTypes.string.isRequired,
  onTest: PropTypes.func.isRequired,
  isTesting: PropTypes.bool.isRequired,
  testLabel: PropTypes.string.isRequired,
  testEndLabel: PropTypes.string.isRequired,
  volume: PropTypes.number,
  onVolumeChange: PropTypes.func,
  volumeLabel: PropTypes.string,
  testingComponent: PropTypes.element
};

export default VideoAudioSetting;
