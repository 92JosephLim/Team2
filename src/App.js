import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoMeeting from "./components/VideoMeeting";
import Mainpage from "./components/Mainpage";
import RoomList from "./components/RoomList";
import JoinRoom from "./components/JoinRoom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/video" element={<VideoMeeting />} />
          <Route path="/roomList" element={<RoomList />} />
          <Route path="/joinRoom" element={<JoinRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
