import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import VideoMeeting from "./pages/VideoMeeting";
import Mainpage from "./pages/Mainpage";
import CreateRoom from "./pages/CreateRoom";
import RoomList from "./pages/RoomList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindPassword from "./pages/FindPassword";
import MyPage from "./pages/MyPage"; // MyPage 컴포넌트 import

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/video" element={<VideoMeeting />} />
          <Route path="/createroom" element={<CreateRoom />} />
          <Route path="/findroom" element={<RoomList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findpwd" element={<FindPassword />} />
          <Route path="/mypage" element={<MyPage />} /> {/* MyPage 경로 추가 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
