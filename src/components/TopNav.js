import React, { useContext } from "react";
import newLogo from "../assets/new_logo.png"; // 새로운 로고 이미지 경로
import { Link, useNavigate } from "react-router-dom";
import "../css/TopNav.css"; // 스타일 파일 추가
// 다국어 지원 모드 추가
import i18next from "../locales/i18n";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage } from "react-icons/md";
//authContextimport
import AuthContext from "../pages/social/Authcontext";

function TopNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  //AuthContext에서 인증 상태랑 로그아웃 가져오기
  // const { user, logout } = useContext(AuthContext);

  // Video Chat 클릭 시 동작할 함수
  const handleVideoChat = () => {
    navigate("/video");
  };

  // My Page 클릭 시 동작할 함수
  const handleMyPage = () => {
    navigate("/mypage");
  };

  // 클릭 시 언어 변경
  const clickHandler = (lang) => {
    i18next.changeLanguage(lang);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  // 로고 클릭 시 메인 페이지로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="top">
      <div className="logo">
        <button className="logo-button" onClick={handleLogoClick}>
          <img src={newLogo} alt="New Logo" />
        </button>
      </div>
      <nav className="nav">
        {/* Video Chat 버튼 */}
        <button className="nav-button video-chat-btn" onClick={handleVideoChat}>Video Chat</button>
        <Link to="/createroom" className="action-link">방만들기</Link>
        <Link to="/roomList" className="action-link">방 목록</Link>
        {/* About 드롭다운 */}
        <div className="dropdown">
          <button className="dropdown-button">About</button>
          <div className="dropdown-content">
            <Link to="/announcement">공지사항</Link>
            <Link to="/customerService">고객센터</Link>
          </div>
        </div>
        {/* 다국어 지원 */}
        <div className="dropdown">
          <button className="dropdown-button"><MdOutlineLanguage /></button>
          <div className="dropdown-content">
            <button className="dropdown-content-button" onClick={() => clickHandler("ko")}>KOREAN</button>
            <button className="dropdown-content-button" onClick={() => clickHandler("en")}>ENGLISH</button>
            <button className="dropdown-content-button" onClick={() => clickHandler("zh")}>CHINESE</button>
            <button className="dropdown-content-button" onClick={() => clickHandler("ja")}>JAPANESE</button>
          </div>
        </div>
        {/* My Page 드롭다운 */}
        <div className="dropdown">
          <button className="dropdown-button" onClick={handleMyPage}>My Page</button>
          <div className="dropdown-content">
            <Link to="/ProfileSettings">상세 프로필 설정</Link>
            <Link to="/messageChat">채팅 내역</Link> {/* 경로 수정 */}
            <Link to="/invite">친구추가</Link>
            <Link to="/friendMain">친구목록</Link>
          </div>
        </div>
        <div className="login-options">
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
