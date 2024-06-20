import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const VideoAudioSetting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [micVolume, setMicVolume] = useState(50);
  const [speakerVolume, setSpeakerVolume] = useState(50);
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [isSpeakerTesting, setIsSpeakerTesting] = useState(false);
  const [isVideoTesting, setIsVideoTesting] = useState(false);
  const audioContextRef = useRef(null);
  const micGainNodeRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const handleSave = () => {
    console.log('Video and audio settings saved');
    navigate('/mypage');
  };

  const handleMicTestToggle = async () => {
    if (isMicTesting) {
      setIsMicTesting(false);
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
    } else {
      setIsMicTesting(true);
      console.log('Microphone test started');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const sourceNode = audioCtx.createMediaStreamSource(stream);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = micVolume / 100;
        sourceNode.connect(gainNode).connect(audioCtx.destination);

        mediaStreamRef.current = stream;
        audioContextRef.current = audioCtx;
        sourceRef.current = sourceNode;
        micGainNodeRef.current = gainNode;
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    }
  };

  useEffect(() => {
    if (micGainNodeRef.current) {
      micGainNodeRef.current.gain.value = micVolume / 100;
    }
  }, [micVolume]);

  const handleSpeakerTestToggle = () => {
    if (isSpeakerTesting) {
      setIsSpeakerTesting(false);
      console.log('Speaker test ended');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    } else {
      setIsSpeakerTesting(true);
      console.log('Speaker test started');
      const testAudio = new Audio('/test-sound.mp3');
      testAudio.volume = speakerVolume / 100;
      testAudio.play();
      audioRef.current = testAudio;

      testAudio.onended = () => {
        setIsSpeakerTesting(false);
        console.log('Speaker test ended');
        audioRef.current = null;
      };
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = speakerVolume / 100;
    }
  }, [speakerVolume]);

  const handleVideoTestToggle = async () => {
    if (isVideoTesting) {
      setIsVideoTesting(false);
      console.log('Video test ended');
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    } else {
      setIsVideoTesting(true);
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
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="container mx-auto p-6 flex flex-col items-center flex-1">
          <h1 className="text-3xl font-bold mb-8">{t("videoSetting")}</h1>
          <div className="w-full max-w-2xl">
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
              <div className="flex items-center mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleVideoTestToggle}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {isVideoTesting ? '웹캠 테스트 종료' : '웹캠 테스트'}
                </button>
              </div>
              {isVideoTesting && (
                <div className="mt-4">
                  <video ref={videoRef} className="w-full h-auto rounded-md" autoPlay></video>
                  <label className="block text-sm font-medium text-gray-700 mt-2">{t("webCamTest")}</label>
                </div>
              )}
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
                onClick={() => navigate('/mypage')}
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
