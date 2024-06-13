import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import we2 from "../assets/we2.jpg";

const server = "https://janus.jsflux.co.kr/janus"; // Janus server URL

function checkTextRoomPlugin() {
  const janusInstance = new Janus({
    server: server,
    success: () => {
      janus.listPlugins({});
    },
  });
}

function CreateRoom() {
  const [janus, setJanus] = useState(null);
  const [sfutest, setSfutest] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState(null);

  const createRoom = () => {
    const janusInstance = new Janus({
      server: server,
      success: () => {
        janusInstance.attach({
          plugin: "janus.plugin.videoroom",
          opaqueId: "videoroomtest-" + Janus.randomString(12),
          success: (pluginHandle) => {
            setSfutest(pluginHandle);
            sendCreateRoomRequest(pluginHandle);
          },
          error: (error) => {
            console.error("Error attaching plugin...", error);
            alert("Error attaching plugin... " + error);
          },
        });
      },
      error: (error) => {
        console.error(error);
        alert("Error creating session... " + error);
      },
      destroyed: () => {
        window.location.reload();
      },
    });

    setJanus(janusInstance);
  };

  const sendCreateRoomRequest = (pluginHandle) => {
    const body = {
      request: "create",
      room: Math.floor(Math.random() * 1000000), // Random room ID
      description: roomName,
      is_private: false,
    };
    pluginHandle.send({
      message: body,
      success: (result) => {
        if (result && result.room) {
          setRoomId(result.room);
          alert(`Room created with ID: ${result.room}`);
        }
      },
      error: (error) => {
        console.error("Error creating room...", error);
        alert("Error creating room... " + error);
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
    <TopNav className="top" />
    <div className=" bg-gray-100 items-center justify-center h-60 flex-grow relative w-full">
    <img src={we2} className="absolute top-0 left-0 w-full h-full object-cover z-0"/>
      <div className="bg-white p-10 mt-10 rounded shadow-md w-full max-w-lg absolute left-1/2 transform -translate-x-1/2">
        <div className="text-2xl font-bold mb-6 text-center">Create a New Room</div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className=" p-2 mb-4 border border-gray-300 rounded"
            style={{ width: '16vw' }}
          />
        </div>
        <div className="flex">
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={createRoom}
        >
          Create Room
        </button>
        <button
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2"
          onClick={checkTextRoomPlugin}
        >
          Check Plugins
        </button>
        </div>
        {roomId && (
          <div className="mt-4 p-4 border border-green-500 text-green-500 rounded">
            <p>Created Room ID: {roomId}</p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default CreateRoom;
