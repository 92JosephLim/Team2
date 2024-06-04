// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoMeeting from "./pages/VideoMeeting";
import Mainpage from "./pages/Mainpage";
import CreateRoom from "./pages/CreateRoom";
import RoomList from "./pages/RoomList";
import Login from "./pages/Login"; // 새로 추가한 파일을 import

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/video" element={<VideoMeeting />} />
          <Route path="/cr" element={<CreateRoom />} />
          <Route path="/roomList" element={<RoomList />} />
          <Route path="/login" element={<Login />} /> {/* 로그인 페이지 경로 추가 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
