import React, { useState, useEffect } from 'react';
import './My.css';
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";
import ProfileCard from '../../components/mypage/ProfileCard';

const My = () => {

  const { t } = useTranslation();

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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <section className="profile-info">
            <h2>프로필</h2>
            <ProfileCard userInfo={userInfo} />
          </section>
          <section className="chat-history">
            <h2>채팅 내역</h2>
            <ul>
              <li>김영희: 안녕하세요, 어떠신가요? <span>오전 10:30</span></li>
              <li>이접수: 프로젝트 세부 사항을 논의해 봅시다. <span>오전 9:45</span></li>
              <li>박인지: 제가 보낸 파일을 받으셨나요? <span>오전 8:15</span></li>
            </ul>
          </section>
          <section className="video-chat-history">
            <h2>화상채팅 내역</h2>
            <ul>
              <li>김영희: 화상 통화 시간: 30분 <span>오후 2:30</span></li>
              <li>이접수: 화상 통화 시간: 1시간 <span>오후 4:00</span></li>
              <li>박인지: 화상 통화 시간: 45분 <span>오후 6:15</span></li>
            </ul>
          </section>
          <section className="friends">
            <h2>친구</h2>
            <ul>
              <li>김영희: 온라인</li>
              <li>이접수: 오프라인</li>
              <li>박인지: 온라인</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default My;