import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Mainpage.css"; // CSS 파일을 import
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

function Mainpage() {

  const navigate = useNavigate();

  return (
    <div className="main-page">
      <TopNav />
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
      <Footer />
    </div>
  );
}

export default Mainpage;
