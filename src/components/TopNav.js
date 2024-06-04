import React from "react";
import logo from "../assets/logo.jpeg"; // 로고 이미지 경로
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>예비메인페이지</span>
      </div>
      <nav className="nav">
        <Link to="/video">Video Chat</Link>
        <Link to="/cr">방만들기</Link>
        <Link to="/roomList">방목록</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="actions">
        <button className="action-button">상점</button>
        <button className="action-button">지난 대화 상대</button>
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