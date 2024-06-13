import React, { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create a New Room</h1>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={createRoom}
        >
          Create Room
        </button>
        <button
          className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mt-2"
          onClick={checkTextRoomPlugin}
        >
          Check Plugins
        </button>
        {roomId && (
          <div className="mt-4 p-4 border border-green-500 text-green-500 rounded">
            <p>Created Room ID: {roomId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRoom;
