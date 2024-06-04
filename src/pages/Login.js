// Login.js

import React, { useState } from "react";
import logo from "../assets/logo.jpeg"; // 로고 이미지 경로
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이 부분에 로그인 처리 로직을 추가하세요
    console.log("Username:", username);
    console.log("Password:", password);
    // 실제 서버와 통신하여 로그인을 처리하거나 다른 로직을 여기에 추가하세요
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2 className="login-title">로그인 하세요</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      <div className="social-login-options">
        <p>다른 계정으로 로그인하기:</p>
        <button className="social-login-button kakao">카카오</button>
        <button className="social-login-button naver">네이버</button>
        <button className="social-login-button google">구글</button>
      </div>
      <div className="register-link">
        <p>회원이 아니신가요? <a href="/register">회원가입</a></p>
      </div>
    </div>
  );
}

export default Login;
