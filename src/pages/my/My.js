import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes를 임포트합니다.
import ProfileCard from '../../components/mypage/ProfileCard';
import BasicLayout from '../../layouts/BasicLayout';

const My = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    gender: '',
    profileImage: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const loadUserInfo = () => {
      const email = localStorage.getItem('email');
      const gender = localStorage.getItem('gender');
      const profileImage = localStorage.getItem('profileImage');
      const phoneNumber = localStorage.getItem('phoneNumber');

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

  return (

      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="w-full max-w-md p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">프로필</h2>
            <ProfileCard userInfo={userInfo} />
          </section>
        </div>
      </div>

  );
};

export default My;
