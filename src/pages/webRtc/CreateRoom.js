import React, { useState } from "react";
//import Janus from "janus-gateway"; // Ensure you have imported Janus correctly

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
    // Initialize the session and attach to the VideoRoom plugin
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
    <div>
      <input type="text" placeholder="Enter room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <button className="createroom" onClick={createRoom}>
        방 만들기
      </button>
      <button className="check" onClick={checkTextRoomPlugin}>
        체크
      </button>
      {roomId && (
        <div>
          <p>Created Room ID: {roomId}</p>
        </div>
      )}
    </div>
  );
}

export default CreateRoom;
