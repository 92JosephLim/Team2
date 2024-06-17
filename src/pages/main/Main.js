import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mainpage.css"; // CSS 파일을 import
import mainback from "../../assets/mainback.jpg";
import pic1 from "../../assets/1.jpg";
import pic2 from "../../assets/2.jpg";
import pic3 from "../../assets/3.jpg";
import pic4 from "../../assets/4.jpg";
import MainSide from "../../animation/MainSide"

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-page">

      <div className="content">
        <img src={mainback} alt="Main BackGround" className="background-image" />
        <div className="left-pane"> {/* 왼쪽 패널 */}
          <div className="profile-grid">
            <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-1">
              <img src={pic1} alt="Emma, 25" />
              <div className="profile-info">
                <p>Emma, 25</p>
              </div>
            </div>
            <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-2">
              <img src={pic2} alt="Sofia, 28" />
              <div className="profile-info">
                <p>Sofia, 28</p>
              </div>
            </div>
            <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-3">
              <img src={pic4} alt="Lily, 28" />
              <div className="profile-info">
                <p>Lily, 28</p>
              </div>
            </div>
            <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-4">
              <img src={pic3} alt="Grace, 30" />
              <div className="profile-info">
                <p>Grace, 30</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
          <div className="vertical-section">
            <MainSide />
            <p className="animate__animated animate__pulse animate__infinite">247,584 건의 매칭이 진행 중이에요...</p>
            <button
              className="start-button flash-border"
              onClick={() => navigate("/video")}
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;










// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Mainpage.css"; // CSS 파일을 import
// import TopNav from "../../components/topnav/TopNav";
// import Footer from "../../components/footer/Footer";
// import MainSide from "../../animation/MainSide";

// function Mainpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page">
//       <TopNav />
//       <div className="content">
//         <div className="left-pane"> {/* 왼쪽 패널 */}
//           <MainSide />
//         </div>
//         <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
//           <div className="vertical-section">
//             <div>2조사이트</div>
//             <p className="animate__animated animate__pulse animate__infinite">247,584 건의 매칭이 진행 중이에요...</p>
//             <button
//               className="start-button flash-border"
//               onClick={() => navigate("/video")}
//             >
//               시작하기
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mainpage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import TopNav from "../../components/topnav/TopNav";
// import Footer from "../../components/footer/Footer";
// import pic1 from "../../assets/1.jpg";
// import pic2 from "../../assets/2.jpg";
// import pic3 from "../../assets/3.jpg";
// import pic4 from "../../assets/4.jpg";

// function Mainpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page flex flex-col text-white">
//       <TopNav />
//       <div className="flex flex-grow relative">
//         <div className="flex flex-grow z-1">
//           <div className="flex-1 flex flex-col justify-center items-center text-center">
//             {/* 왼쪽 패널 */}
//             <div className="profile-grid">
//               <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-1">
//                 <img src={pic1} alt="Emma, 25" />
//                 <div className="profile-info">
//                   <p>Emma, 25</p>
//                 </div>
//               </div>
//               <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-2">
//                 <img src={pic2} alt="Sofia, 28" />
//                 <div className="profile-info">
//                   <p>Sofia, 28</p>
//                 </div>
//               </div>
//               <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-3">
//                 <img src={pic4} alt="Lily, 28" />
//                 <div className="profile-info">
//                   <p>Lily, 28</p>
//                 </div>
//               </div>
//               <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-4">
//                 <img src={pic3} alt="Grace, 30" />
//                 <div className="profile-info">
//                   <p>Grace, 30</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 flex justify-center items-center text-white">
//             <div className="text-center">
//               <div className="text-4xl">2조사이트</div>
//               <p className="animate__animated animate__pulse animate__infinite">
//                 247,584 건의 매칭이 진행 중이에요...
//               </p>
//               <button
//                 className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 onClick={() => navigate("/video")}
//               >
//                 시작하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mainpage;



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