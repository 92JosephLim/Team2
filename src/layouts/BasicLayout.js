import React from "react";
import PropTypes from "prop-types";
import Footer from "../components/footer/Footer";
import Nav from "../components/topnav/TopNav";
import SideNav from "../components/sidenav/SideNav"; // SideNav 컴포넌트 추가
import { useLocation } from "react-router-dom"; // useLocation 훅 추가

const BasicLayout = ({ children }) => {
  const location = useLocation();

  const pathsWithSidebar = [
    "/mypage",
    "/roomList",
    "/ProfileSettings",
    "/SocialProfileSettings",
    "/friendMain",
    "/invite",
    "/settings/ChatSetting",
    "/settings/OtherSetting",
    "/settings/RoomSetting",
    "/settings/VideoAudioSetting"
  ];

  const showSidebar = pathsWithSidebar.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-grow">
        {showSidebar && <SideNav />}
        <main className={`flex-grow bg-[#FFFFFF] ${showSidebar ? "ml-64" : ""}`}>
          {children}
        </main>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

// PropTypes를 사용하여 children prop의 타입 정의
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;