import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ChatRooms from './components/ChatRooms';
import ChatRoom from './components/ChatRoom';

const App = () => {
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/login'); // 회원가입 후 로그인 페이지로 이동
  };

  const handleLogin = () => {
    navigate('/chatrooms'); // 로그인 후 채팅방 목록 페이지로 이동
  };

  const handleEnterRoom = (roomId) => {
    setCurrentRoomId(roomId);
    navigate(`/chatroom/${roomId}`); // 방에 들어갈 때 해당 방 페이지로 이동
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/chatrooms">Chat Rooms</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/chatrooms" element={<ChatRooms onEnterRoom={handleEnterRoom} />} />
        <Route path="/chatroom/:roomId" element={<ChatRoom />} />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
