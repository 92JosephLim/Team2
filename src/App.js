import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// page import
import Mainpage from "./pages/mainpage/Mainpage";

// webRtc import
import VideoMeeting from "./pages/webRtc/VideoMeeting";
import CreateRoom from "./pages/webRtc/CreateRoom";
import RoomList from "./pages/webRtc/RoomList";
import JoinRoom from "./pages/webRtc/JoinRoom";

// login-signup-findpwd import
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindPassword from "./pages/findPassword/FindPassword";

// mypage import
import MyPage from "./pages/mypage/MyPage";

// mypage-friend import
import ProfileSettings from "./pages/mypage/ProfileSettings"; // 새로 추가한 ProfileSettings 컴포넌트
import SocialProfileSettings from "./pages/mypage/SocialProfileSettings";
import InviteFriend from "./pages/friend/InviteFriend";
import FriendMain from "./pages/friend/FriendMain";

// customerCenter import
import CustomerService from "./pages/customerCenter/CustomerService";
import Announcement from "./pages/customerCenter/Announcement";

// social import
import { GoogleOAuthProvider } from "@react-oauth/google";
import KakaoRedirect from "./pages/social/KakoRedirect";

const clientId = "233505782576-acmbig2ssomblm8c8spashbrj6004jdl.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/video" element={<VideoMeeting />} />
            <Route path="/cr" element={<CreateRoom />} />
            <Route path="/roomlist" element={<RoomList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/findpwd" element={<FindPassword />} />
            <Route path="/customerService" element={<CustomerService />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/invite" element={<InviteFriend />} />
            <Route path="/friendMain" element={<FriendMain />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/ProfileSettings" element={<ProfileSettings />} /> {/* 새 경로 추가 */}
            <Route path="/SocialProfileSettings" element={<SocialProfileSettings />} /> {/* 새 경로 추가 */}
            <Route path="/auth" element={<KakaoRedirect />} />
            <Route path="/joinRoom" element={<JoinRoom />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
