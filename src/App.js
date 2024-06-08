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
import CustomerService from "./pages/CustomerService";
import Announcement from "./pages/Announcement";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReportFriend from "./pages/mypage/ReportFriend";
import InviteFriend from "./pages/mypage/InviteFriend";
import FriendMain from "./pages/mypage/FriendMain";
import ProfileSettings from "./pages/mypage/ProfileSettings";
import SideNav from "./components/SideNav";

const clientId = "233505782576-acmbig2ssomblm8c8spashbrj6004jdl.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <BrowserRouter>
          <div className="flex">
            <SideNav />
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/video" element={<VideoMeeting />} />
                <Route path="/createroom" element={<CreateRoom />} />
                <Route path="/findroom" element={<RoomList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/findpwd" element={<FindPassword />} />
                <Route path="/report" element={<ReportFriend />} />
                <Route path="/customerService" element={<CustomerService />} />
                <Route path="/announcement" element={<Announcement />} />
                <Route path="/invite" element={<InviteFriend />} />
                <Route path="/friendMain" element={<FriendMain />} />
                <Route path="/profile-settings" element={<ProfileSettings />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
