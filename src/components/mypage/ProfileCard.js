import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";
// SVG 아이콘 정의
const MaleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="blue" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12a4 4 0 100-8 4 4 0 000 8zm5 2v-1a6.003 6.003 0 00-5-5.91V4h2V2H8v2h2v2.09A6.003 6.003 0 005 13v1H2v2h2v7h2v-7h4v7h2v-7h2v-2h-3zm-5-1a4.978 4.978 0 01-3-.75v.75H5v-2h1v-.75A4.978 4.978 0 014 11h2a4.978 4.978 0 01-1 2.25V12h1v2H6v-.75A4.978 4.978 0 015 11h2a4.978 4.978 0 01-1 2.25V12H5v2h1v-.75A4.978 4.978 0 015 11h2a4.978 4.978 0 01-1 2.25V12h1v2H6v-.75z" fill="currentColor"/>
  </svg>
);


const FemaleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm2-6h2v2h-2v2h-2V8H8V6h4V4h2v2zM7 14a6 6 0 0112 0v1h2v2h-2v5h-2v-5H9v5H7v-5H5v-2h2v-1zm2 2h6v2H9v-2z" fill="currentColor"/>
  </svg>
);


const NeutralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
 <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
</svg>
);


function ProfileCard() {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    email: '',
    gender: '',
    profileImage: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = () => {
      const email = localStorage.getItem('email');
      let gender = localStorage.getItem('gender');
      const profileImage = localStorage.getItem('profileImage');
      const phoneNumber = localStorage.getItem('phoneNumber');

      console.log('Profile Image URL:', profileImage); // Debug log

      // gender가 undefined이면 none으로 설정
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

    // Listen for changes in localStorage
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
      navigate('/ProfileSettings');
    } else if (loginType === 'KAKAO' || loginType === 'GOOGLE') {
      navigate('/SocialProfileSettings');
    }
  };

  const renderGenderIcon = () => {
    switch (userInfo.gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'none':
      default:
        return <NeutralIcon />;
    }
  };

  return (
    <div className="flex items-center justify-center pt-7">
      <div className="relative flex flex-col w-full max-w-lg rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-72 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img
            src={userInfo.profileImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8 text-left">
          <h2 className="mb-4 block font-sans text-3xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            내 정보
          </h2>
          <h3 className="block font-sans text-2xl font-light leading-relaxed text-inherit antialiased">
            이메일: {userInfo.email}
          </h3>
          <h3 className="font-sans flex text-2xl font-light leading-relaxed text-inherit antialiased">
            성별: {userInfo.gender} {renderGenderIcon()}
          </h3>
          <h3 className="block font-sans text-2xl font-light leading-relaxed text-inherit antialiased">
            전화번호: {formatPhoneNumber(userInfo.phoneNumber)}
          </h3>
        </div>
        <div className="p-8 pt-0">
          <button
            className="text-xl select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={handleProfileSettings}
          >
            정보 수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
