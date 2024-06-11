import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileCard() {
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
      const gender = localStorage.getItem('gender');
      const profileImage = localStorage.getItem('profileImage');
      const phoneNumber = localStorage.getItem('phoneNumber');

      console.log('Profile Image URL:', profileImage); // Debug log

      setUserInfo({
        email: email || '',
        gender: gender || '',
        profileImage: profileImage || '',
        phoneNumber: phoneNumber || ''
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
    if (!phoneNumber) return '';
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
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
          <h3 className="block font-sans text-2xl font-light leading-relaxed text-inherit antialiased">
            성별: {userInfo.gender}
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
            onClick={() => navigate('/ProfileSettings')}
          >
            정보 수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
