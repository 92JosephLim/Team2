import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoMeeting from "./pages/VideoMeeting";
import Mainpage from "./pages/Mainpage";
import CreateRoom from "./pages/CreateRoom";
import RoomList from "./pages/RoomList";
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
