import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Mainpage.css";
import logo from "../assets/logo.jpeg";

function Mainpage() {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="로고" />
          <span>메인페이지</span>
        </div>
        <nav className="nav">
          <Link to="/video">비디오 채팅</Link>
          <Link to="/roomList">방목록</Link>
          <Link to="/about">얘는 뭐로할까여?</Link>
        </nav>
        <div className="actions">
          <div className="login-options">
            <button className="login-btn">로그인</button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="left-pane">
          <div className="profile-grid">
            <div className="profile">
              <img src="profile1.jpg" alt="Emma, 25" />
              <div className="profile-info">
                <p>Emma, 25</p>
              </div>
            </div>
            <div className="profile">
              <img src="profile2.jpg" alt="Sofia, 28" />
              <div className="profile-info">
                <p>Sofia, 28</p>
              </div>
            </div>
            <div className="profile">
              <img src="profile3.jpg" alt="Lily, 28" />
              <div className="profile-info">
                <p>Lily, 28</p>
              </div>
            </div>
            <div className="profile">
              <img src="profile4.jpg" alt="Grace, 30" />
              <div className="profile-info">
                <p>Grace, 30</p>
              </div>
            </div>
          </div>
        </div>
        <div className="righst-pane">
          <h1>2조사이트</h1>
          <p>247,584 건의 매칭이 진행 중이에요</p>
          <button className="start-button" onClick={() => navigate("/video")}>
            비디오 채팅 시작하기
          </button>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">아자(Azar) 정보</a> |<a href="#blog">블로그</a> |<a href="#usage">사용법</a> |
          <a href="#guidelines">커뮤니티 가이드라인</a> |<a href="#terms">서비스 이용 약관</a> |
          <a href="#privacy">개인정보처리방침</a> |<a href="#youth">청소년 보호 정책</a> |
          <a href="#location">위치 기반 서비스 약관</a> |<a href="#ip">지적 재산권</a> |<a href="#support">고객센터</a> |
          <a href="#cookie-policy">쿠키 정책</a> |<a href="#cookie-settings">쿠키 설정</a>
        </div>
        <div className="footer-info">
          대표: 김린다수아 | 이메일: help@azarlive.com | 주소: 서울시 강남구 영동대로 517 | 사업자 등록번호:
          220-88-75836 | 전자상거래 등록번호: 2019-서울강남-2501
        </div>
        <div className="footer-bottom">
          <p>© 2024 Hyperconnect LLC. All rights reserved.</p>
          <div className="store-buttons">
            <button className="store-button">앱 스토어</button>
            <button className="store-button">구글 플레이</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Mainpage;
