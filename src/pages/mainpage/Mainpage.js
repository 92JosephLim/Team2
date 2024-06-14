import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mainpage.css"; // CSS 파일을 import
import TopNav from "../../components/topnav/TopNav";
import Footer from "../../components/footer/Footer";
import mainback from "../../assets/mainback.jpg";

function Mainpage() {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <TopNav />
      <div className="content">
        <img src={mainback} alt="Main BackGround" className="background-image" />
        <div className="left-pane"> {/* 왼쪽 패널 */}
          <div className="profile-grid">
            <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-1">
              <img src="profile1.jpg" alt="Emma, 25" />
              <div className="profile-info">
                <p>Emma, 25</p>
              </div>
            </div>
            <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-2">
              <img src="profile2.jpg" alt="Sofia, 28" />
              <div className="profile-info">
                <p>Sofia, 28</p>
              </div>
            </div>
            <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-3">
              <img src="profile3.jpg" alt="Lily, 28" />
              <div className="profile-info">
                <p>Lily, 28</p>
              </div>
            </div>
            <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-4">
              <img src="profile4.jpg" alt="Grace, 30" />
              <div className="profile-info">
                <p>Grace, 30</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
          <div className="vertical-section">
            <div>2조사이트</div>
            <p className="animate__animated animate__pulse animate__infinite">247,584 건의 매칭이 진행 중이에요...</p>
            <button
              className="start-button flash-border"
              onClick={() => navigate("/video")}
            >
              비디오 채팅하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mainpage;

// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Mainpage.css"; // CSS 파일을 import
// import Footer from "../../components/footer/Footer";
// import TopNav from "../../components/topnav/TopNav";

// function Mainpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page">
//       <TopNav />
//       <div className="content">
//         <div className="left-pane"> {/* 왼쪽 패널 */}
//           <div className="profile-grid">
//             <div className="profile">
//               <img src="profile1.jpg" alt="Emma, 25" />
//               <div className="profile-info">
//                 <p>Emma, 25</p>
//               </div>
//             </div>
//             <div className="profile">
//               <img src="profile2.jpg" alt="Sofia, 28" />
//               <div className="profile-info">
//                 <p>Sofia, 28</p>
//               </div>
//             </div>
//             <div className="profile">
//               <img src="profile3.jpg" alt="Lily, 28" />
//               <div className="profile-info">
//                 <p>Lily, 28</p>
//               </div>
//             </div>
//             <div className="profile">
//               <img src="profile4.jpg" alt="Grace, 30" />
//               <div className="profile-info">
//                 <p>Grace, 30</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
//           <div className="vertical-section">
//             <h1>2조사이트</h1>
//             <p>247,584 건의 매칭이 진행 중이에요...</p>
//             <button className="start-button" onClick={() => navigate("/video")}>
//               비디오 채팅하기
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mainpage;