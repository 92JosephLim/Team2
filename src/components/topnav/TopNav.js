import React from "react";
import newLogo from "../../assets/new_logo.png"; // 새로운 로고 이미지 경로
import { Link, useNavigate } from "react-router-dom";
import "../topnav/TopNav.css"; // 스타일 파일 추가
import { MdOutlineLanguage } from "react-icons/md";
// 다국어 지원 모드 추가
import i18next from "../../locales/i18n";
import { useTranslation } from "react-i18next";

function TopNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 로그인 상태 확인
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  // 로고 클릭 시 메인 페이지로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  // Video Chat 클릭 시 동작할 함수
  const handleVideoChat = () => {
    navigate("/video");
  };

  // My Page 클릭 시 동작할 함수
  // const handleMyPage = () => {
  //   navigate("/mypage");
  // };
  // 클릭 시 언어 변경
  const clickHandler = (lang) => {
    i18next.changeLanguage(lang);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('gender');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('loginType');
    localStorage.removeItem('gender');
    localStorage.removeItem('nickName');
    navigate('/');
  };

  // 설정 옵션 클릭 시 동작할 함수
  const handleRoomSettings = () => {
    navigate("/settings/RoomSetting");
  };

  const handleVideoAudioSettings = () => {
    navigate("/settings/VideoAudioSetting");
  };

  const handleChatSettings = () => {
    navigate("/settings/ChatSetting");
  };

  const handleOtherSettings = () => {
    navigate("/settings/OtherSetting");
  };

  return (
    <header className="top">
      <div className="logo">
        <button className="logo-button" onClick={handleLogoClick}>
          <img src={newLogo} alt="New Logo" />
        </button>
      </div>
      <nav className="nav">
        {/* Video Chat 버튼 */}
        {/* <button className="nav-button video-chat-btn" onClick={handleVideoChat}>{t("VideoChat")}</button> */}
        {/* <Link to="/cr" className="action-link">{t("room")}</Link> */}
        <Link to="/roomList" className="action-link">{t("list")}</Link>
        {/* About 드롭다운 */}
        <div className="dropdown">
          {/* About : 고객지원으로 네이밍 변경 */}
          <button className="dropdown-button">{t("About")}</button>
          <div className="dropdown-content">
            <Link to="/announcement">{t("notice")}</Link>
            <Link to="/customerService">{t("customerCenter")}</Link>
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
        {token && (
          <div className="dropdown">
            <button className="action-button">{t("mypage")}</button>
            <div className="dropdown-content">
              <Link to="/ProfileSettings">{t("profile")}</Link>
              <Link to="/messageChat">{t("chatLog")}</Link> {/* 경로 수정 */}
              <Link to="/invite">{t("addFriend")}</Link>
              <Link to="/friendMain">{t("FriendList")}</Link>
            </div>
          </div>
        )}
        {/* 설정 드롭다운 */}
        <div className="dropdown">
          <button className="dropdown-button">Settings</button>
          <div className="dropdown-content">
            <button className="dropdown-content-button" onClick={handleRoomSettings}>{t("roomSetting")}</button>
            <button className="dropdown-content-button" onClick={handleVideoAudioSettings}>{t("videoSetting")}</button>
            <button className="dropdown-content-button" onClick={handleChatSettings}>{t("chatSetting")}</button>
            <button className="dropdown-content-button" onClick={handleOtherSettings}>{t("etcSetting")}</button>
          </div>
        </div>
        {/* 로그인 된 상태에서는 환영 메시지와 로그아웃 버튼 표시 */}
        <div className="login-options">
          {token ? (
            <>
              <span className="mr-4">Welcome, {email}</span>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded-md hover:bg-red-700">{t("logout")}</button>
            </>
          ) : (
            // 로그인되지 않은 상태에서는 로그인 버튼 표시
            <Link to="/login" className="login-btn">{t("login")}</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default TopNav;