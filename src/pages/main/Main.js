import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mainback from "../../assets/mainback.jpg";
import pic1 from "../../assets/1.jpg";
import pic2 from "../../assets/2.jpg";
import pic3 from "../../assets/3.jpg";
import pic4 from "../../assets/4.jpg";
import pic5 from "../../assets/5.jpg";
import pic6 from "../../assets/6.jpg";
import pic7 from "../../assets/7.jpg";
import pic8 from "../../assets/8.jpg";
import pic9 from "../../assets/9.jpg";
import { useTranslation } from "react-i18next";

function Main() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profileImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];

  // 총 36개의 프로필 생성
  const profilesPerPage = 36;

  // 프로필 인덱스 상태
  const [profiles, setProfiles] = useState([]);

  // 프로필 데이터 초기화
  useEffect(() => {
    const initialProfiles = Array.from({ length: profilesPerPage }).map((_, index) => ({
      img: profileImages[index % profileImages.length],
      name: `Profile ${index + 1}`,
    }));
    setProfiles(initialProfiles);
  }, [profileImages]);

  return (
    <div className="flex flex-col min-h-screen bg-customColor text-white overflow-hidden">
      <div className="flex flex-grow relative overflow-hidden">
        <img
          src={mainback}
          alt="Main BackGround"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="flex flex-grow relative z-10 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center text-center overflow-hidden max-h-screen">
            <div className="grid grid-cols-2 gap-4 max-h-screen overflow-hidden">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className={`w-48 h-48 bg-gray-700 rounded overflow-hidden ${index % 2 === 0 ? "animate-scroll-up" : "animate-scroll-down"
                    } profile`}
                >
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-2">
                    <p>{profile.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <p className="animate__animated animate__pulse animate__infinite mt-4 text-black">
              247,584 건의 매칭이 진행 중이에요...
            </p>
            <button
              className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-4 border-transparent animate-border-animation"
              onClick={() => navigate("/video")}
            >
              {t("start")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

