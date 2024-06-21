import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mainback from "../../assets/mainback.jpg";
import MainSide from "../../animation/MainSide";
import Move from "../../animation/Move";
import LoginModal from "../../components/modal/LoginModal";

function initjanus() {
  return new Promise((resolve, reject) => {
    if (!Janus.isWebrtcSupported()) {
      bootbox.alert("No WebRTC support... ");
      reject(new Error("No WebRTC support"));
      return;
    }

    janus = new Janus({
      server: server,
      success: function () {
        janus.attach({
          plugin: "janus.plugin.videoroom",
          opaqueId: opaqueId,
          success: function (pluginHandle) {
            sfutest = pluginHandle;
            resolve(); // Initialization complete
          },
          error: function (error) {
            reject(error);
          }
        });
      },
      error: function (error) {
        reject(error);
      },
      destroyed: function () {
        reject(new Error("Session destroyed"));
      }
    });
  });
}

function getRoomList() {
  return new Promise((resolve, reject) => {
    var body = { request: "list" };
    sfutest.send({
      message: body,
      success: function (result) {
        if (result && result.list) {
          resolve(result.list);
        } else {
          reject(new Error("Failed to retrieve room list"));
        }
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

function Main() {
  const navigate = useNavigate();
  const [roomCount, setRoomCount] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    initjanus()
      .then(() => getRoomList())
      .then((rooms) => setRoomCount(rooms.length))
      .catch((error) => {
        console.error("Failed to initialize Janus or get room list:", error);
      });
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleStartClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/video");
    } else {
      openLoginModal();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-customColor text-white overflow-hidden">
      <div className="flex flex-grow relative overflow-hidden">
        <img
          src={mainback}
          alt="Main BackGround"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="flex flex-grow relative z-10 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center text-center overflow-hidden max-h-screen">
            <div className="relative w-full md:w-3/4 h-3/4 p-4 rounded-lg">
              <Move /> {/* 프로필 애니메이션을 Move 컴포넌트로 대체 */}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <MainSide roomCount={roomCount} /> {/* roomCount를 전달 */}
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-4 border-transparent animate-border-animation"
              onClick={handleStartClick}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} />
    </div>
  );
}

export default Main;
