import React, { useContext } from "react";
import newLogo from "../assets/new_logo.png"; // 새로운 로고 이미지 경로
import { Link, useNavigate } from "react-router-dom";
import "../css/TopNav.css"; // 스타일 파일 추가
//다국어 지원모드 추가
import i18next from "../locales/i18n";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";
//authContextimport
import AuthContext from "../pages/social/Authcontext";

function TopNav() {
  const navigate = useNavigate();
  //다국어 지원 모드
  const { t } = useTranslation();

  //AuthContext에서 인증 상태랑 로그아웃 가져오기
  const { user, logout } = useContext(AuthContext);

  // Video Chat 클릭 시 동작할 함수
  const handleVideoChat = () => {
    navigate("/video");
  };

  // mypage 클릭시 동작할 함수
  const handleMyPage = () => {
    navigate("/mypage");
  };

  //클릭시 언어 변경
  const clickHandler = (lang) => {
    i18next.changeLanguage(lang);
  };

  return (
    <header className="header">
      <div className="logo">
        <button className="logo-button">
          <a href="/"><img src={newLogo} alt="New Logo" /></a>
        </button>
      </div>
      <nav className="nav">
        {/* Video Chat 버튼 : 이거 왜 회색 버튼이지? */}
        <button className="nav-button video-chat-btn" onClick={handleVideoChat}>Video Chat</button>
        <Link to="/cr" className="action-link">방만들기</Link>
        <Link to="/roomList" className="action-link">방목록</Link>
        {/* About 드롭다운 */}
        <div className="dropdown">
          {/* About : 고객지원으로 네이밍 변경 */}
          <button className="dropdown-button">About</button>
          <div className="dropdown-content">
            <Link to="/announcement">공지사항</Link>
            <Link to="/customerService">고객센터</Link>
          </div>
        </div>
        {/* 다국어 지원 */}
        <div className="dropdown">
          {/* 다국어 아이콘 */}
          <button className="dropdown-button"><MdOutlineLanguage /></button>
          {/* 한국어/영어 */}
          <div className="dropdown-content">
            <button className="dropdown-content-button" onClick={() => clickHandler("ko")}>KOREAN</button>
            <button className="dropdown-content-button" onClick={() => clickHandler("en")}>ENGLISH</button>
            <button className="dropdown-content-button" onClick={() => clickHandler("zh")}>CHINESE</button>
            <button className="dropdown-content-button" onClick={() => clickHandler("ja")}>JAPANESE</button>
          </div>
        </div>
        <button className="action-button" onClick={handleMyPage}>My Page</button>
        <div className="login-options">
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default TopNav;
