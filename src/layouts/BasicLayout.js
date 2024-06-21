import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Footer from "../components/footer/Footer";
import Nav from "../components/topnav/TopNav";
import SideNav from "../components/sidenav/SideNav"; // SideNav 컴포넌트 추가
import { useLocation } from "react-router-dom"; // useLocation 훅 추가

const BasicLayout = ({ children }) => {
  const location = useLocation();
  const [hasToken, setHasToken] = useState(false);

  const pathsWithSidebar = [
    "/mypage",
    "/roomList",
    "/ProfileSettings",
    "/socialProfileSettings",
    "/SocialProfileSettings",
    "/friendMain",
    "/invite",
    "/settings/ChatSetting",
    "/settings/OtherSetting",
    "/settings/RoomSetting",
    "/settings/VideoAudioSetting",
    "/video"
  ];

  const showSidebar = pathsWithSidebar.includes(location.pathname) && hasToken;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Nav className="z-50" />
      <div className="flex flex-grow">
        {showSidebar && (
          <div className="hidden lg:block">
            <SideNav />
          </div>
        )}
        <main className="flex-grow ">
          <div className="">{children}</div>
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
