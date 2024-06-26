import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import RoomSetting from './pages/Settings/RoomSetting'; // RoomSetting 컴포넌트 임포트
import VideoAudioSetting from './pages/Settings/VideoAudioSetting'; // VideoAudioSetting 컴포넌트 임포트
import ChatSetting from './pages/Settings/ChatSetting'; // ChatSetting 컴포넌트 임포트
import OtherSetting from './pages/Settings/OtherSetting'; // OtherSetting 컴포넌트 임포트
import Mainpage from './pages/Mainpage';
import CreateRoom from './pages/CreateRoom';
import RoomList from './pages/RoomList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindPassword from './pages/FindPassword';
import CustomerService from './pages/CustomerService';
import Announcement from './pages/Announcement';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReportFriend from './pages/mypage/ReportFriend';
import InviteFriend from './pages/mypage/InviteFriend';
import FriendMain from './pages/mypage/FriendMain';
import MyPage from './pages/MyPage';
import ProfileSettings from './pages/mypage/ProfileSettings';
import Translation from './components/Translation';
import KakaoRedirect from './pages/social/KakaoRedirect';
import FindPasswordAfter from './pages/findPassword/FindPasswordAfter';
import { AuthProvider } from './pages/social/Authcontext';
import JoinRoom from './pages/JoinRoom';
import MessageChat from './pages/mypage/MessageChat'; // MessageChat 컴포넌트 임포트

const clientId = '233505782576-acmbig2ssomblm8c8spashbrj6004jdl.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/settings/room-setting" element={<RoomSetting />} /> {/* RoomSetting 라우트 추가 */}
              <Route path="/settings/video-audio-setting" element={<VideoAudioSetting />} /> {/* VideoAudioSetting 라우트 추가 */}
              <Route path="/settings/chat-setting" element={<ChatSetting />} /> {/* ChatSetting 라우트 추가 */}
              <Route path="/settings/other-setting" element={<OtherSetting />} /> {/* OtherSetting 라우트 추가 */}
              <Route path="/createroom" element={<CreateRoom />} />
              <Route path="/roomList" element={<RoomList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/findpwd" element={<FindPassword />} />
              <Route path="/report" element={<ReportFriend />} />
              <Route path="/customerService" element={<CustomerService />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/invite" element={<InviteFriend />} />
              <Route path="/friendMain" element={<FriendMain />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/ProfileSettings" element={<ProfileSettings />} />
              <Route path="/translation" element={<Translation />} />
              <Route path="/auth" element={<KakaoRedirect />} />
              <Route path="/joinRoom" element={<JoinRoom />} />
              <Route path="/findPasswordAfter" element={<FindPasswordAfter />} />
              <Route path="/messageChat" element={<MessageChat />} /> {/* MessageChat 라우트 추가 */}
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
