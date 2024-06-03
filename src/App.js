import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoMeeting from "./components/VideoMeeting";
import Mainpage from "./components/Mainpage";
import CreateRoom from "./components/CreateRoom";
import RoomList from "./components/RoomList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/video" element={<VideoMeeting />} />
          <Route path="/cr" element={<CreateRoom />} />
          <Route path="/roomList" element={<RoomList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
