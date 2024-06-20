import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings'; // 설정 아이콘 추가

function ProfileCard() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    gender: '',
    profileImage: '',
    phoneNumber: ''
  });
  const [showEditProfile, setShowEditProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = () => {
      const email = localStorage.getItem('email');
      let gender = localStorage.getItem('gender');
      const profileImage = localStorage.getItem('profileImage');
      const phoneNumber = localStorage.getItem('phoneNumber');

      console.log('Profile Image URL:', profileImage); // Debug log

      if (gender === undefined || gender === 'undefined' || gender === null) {
        gender = 'none';
      }

      setUserInfo({
        email: email || '',
        gender: gender || 'none',
        profileImage: profileImage || '',
        phoneNumber: phoneNumber || 'undefined'
      });
    };

    loadUserInfo();

    window.addEventListener('storage', loadUserInfo);

    return () => {
      window.removeEventListener('storage', loadUserInfo);
    };
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber === 'undefined') return '전화번호를 추가해 주세요';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handleProfileSettings = () => {
    const loginType = localStorage.getItem('loginType');
    if (loginType === 'LOCAL') {
      navigate('/profileSettings');
    } else if (loginType === 'KAKAO' || loginType === 'GOOGLE') {
      navigate('/SocialProfileSettings');
    }
  };

  const renderGenderIcon = () => {
    let iconStyle = { fontSize: '24px' };
    switch (userInfo.gender) {
      case 'male':
        iconStyle.color = 'blue';
        return <ManIcon style={iconStyle}/>;
      case 'female':
        iconStyle.color = 'pink';
        return <WomanIcon style={iconStyle}/>;
      case 'none':
      default:
        iconStyle.color = 'black';
        return <ClearIcon style={iconStyle}/>;
    }
  };

  return (
    // 컨테이너 div: 프로필 카드를 중앙에 배치하기 위한 flex 컨테이너
    <div className="flex flex-col items-center justify-center pt-7">

      {/* 진짜 프로필 */}
      <div className="justify-center items-center">
        <div className="container mx-auto max-w-2xl rounded-lg overflow-hidden shadow-lg my-2 bg-white">
          <div className="relative z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))' }}>
            <img
              className="w-full"
              src={userInfo.profileImage}
              alt="Profile"
            />
          </div>
          <div className="relative flex justify-between items-center flex-row px-6 z-50 -mt-10">
            <p className="flex items-center text-gray-400">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>online
            </p>
            <div className="relative">
              <button
                className="p-4 bg-red-600 rounded-full hover:bg-red-500 focus:bg-red-700 transition ease-in duration-200 focus:outline-none"
                onClick={() => setShowEditProfile(!showEditProfile)}
              >
                <SettingsIcon style={{ color: '#FFFFFF', fontSize: '24px' }} />
              </button>
              {showEditProfile && (
                <div className="absolute mt-2 right-0 bg-red-600 border border-red-600 rounded-md shadow-lg p-2 min-w-[150px]">
                  <button
                    className="text-white hover:text-gray-200 w-full text-left"
                    onClick={handleProfileSettings}
                  >
                    프로필 수정
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-grow p-8 text-left">
            <h2 className="mb-4 text-2xl font-semibold leading-snug text-gray-900">
              {t("myInfo")}
            </h2>
            <h3 className="text-lg font-light leading-relaxed">
              {t("email")}: {userInfo.email}
            </h3>
            <h3 className="flex items-center text-lg font-light leading-relaxed">
              {t("gender")}: {renderGenderIcon()}
            </h3>
            <h3 className="text-lg font-light leading-relaxed">
              {t("phoneCall")}: {formatPhoneNumber(userInfo.phoneNumber)}
            </h3>
          </div>
        </div>
      </div>


      {/* /////////////////////////////// */}

                





    </div>
  );
}

export default ProfileCard;
