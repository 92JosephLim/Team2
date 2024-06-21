import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes를 임포트합니다.
import ProfileCard from '../../components/mypage/ProfileCard';
import BasicLayout from '../../layouts/BasicLayout';

const My = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    gender: '',
    profileImage: '',
    phoneNumber: '',
    nickName:''
  });

  useEffect(() => {
    const loadUserInfo = () => {
      const email = localStorage.getItem('email');
      const gender = localStorage.getItem('gender');
      const profileImage = localStorage.getItem('profileImage');
      const phoneNumber = localStorage.getItem('phoneNumber');
      const nickName = localStorage.getItem('nickName');

      setUserInfo({
        email: email || '',
        gender: gender || '',
        profileImage: profileImage || '',
        phoneNumber: phoneNumber || '',
        nickName: nickName || ''
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

            <ProfileCard userInfo={userInfo} />

  );
};

export default My;
