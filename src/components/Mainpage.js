import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Mainpage.css"; // CSS 파일을 import
import logo from "../assets/logo.jpeg"; // 로고 이미지 경로

function Mainpage() {
  const navigate = useNavigate();

  return (
    <div className="main-page">
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
            <button className="login-btn">로그인</button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="left-pane">
          <h1>2조사이트</h1>
          <p>247,584 건의 매칭이 진행 중이에요</p>
          <button className="start-button" onClick={() => navigate("/video")}>
            비디오 채팅하기
          </button>
        </div>
        <div className="right-pane">
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
            <div className="profile">
              <img src="profile5.jpg" alt="Abigail, 22" />
              <div className="profile-info">
                <p>Abigail, 22</p>
              </div>
            </div>
            <div className="profile">
              <img src="profile6.jpg" alt="Olivia, 23" />
              <div className="profile-info">
                <p>Olivia, 23</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">About azar</a> |<a href="#blog">Blog</a> |<a href="#usage">아자르 사용법</a> |
          <a href="#guidelines">커뮤니티 가이드라인</a> |<a href="#terms">서비스이용약관</a> |
          <a href="#privacy">개인정보처리방침</a> |<a href="#youth">청소년 보호 정책</a> |
          <a href="#location">위치기반 서비스 약관</a> |<a href="#ip">지식 재산권</a> |<a href="#support">고객센터</a> |
          <a href="#cookie-policy">Cookie Policy</a> |<a href="#cookie-settings">Cookie Settings</a>
        </div>
        <div className="footer-info">
          대표 업무 집행자: 김린다수아 | 이메일: help@azarlive.com | 주소: 서울시 강남구 영동대로 517 | 사업자 등록번호:
          220-88-75836 | Mail-order-sales approval number: 2019-SeoulGangnam-2501
        </div>
        <div className="footer-bottom">
          <p>© 2024 Hyperconnect LLC. All rights reserved.</p>
          <div className="store-buttons">
            <button className="store-button">App Store</button>
            <button className="store-button">Google Play</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Mainpage;
