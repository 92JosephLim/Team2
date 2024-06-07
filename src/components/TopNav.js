import React from "react";
import logo from "../assets/logo.png"; // 로고 이미지 경로
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav">
        <Link to="/video">Video Chat</Link>
        <Link to="/cr">방만들기</Link>
        <Link to="/roomList">방목록</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="actions">
        <button className="action-button">
          <Link to="/announcement">공지사항</Link>
        </button>
        <button className="action-button"><Link to="/customerService">고객센터</Link></button>
        <div className="login-options">
          <i className="fa fa-facebook"></i>
          <i className="fa fa-google"></i>
          <i className="fa fa-apple"></i>
          <Link to="/login" className="login-btn">로그인</Link>
        </div>
      </div>
    </header>
  )
}

export default TopNav;