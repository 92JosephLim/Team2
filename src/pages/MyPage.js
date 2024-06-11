import React, { useState, useEffect } from 'react';
import '../css/MyPage.css';
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import SideNav from '../components/SideNav';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    gender: '',
    profileImage: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const email = localStorage.getItem('email');
      const gender = localStorage.getItem('gender');
      const profileImage = localStorage.getItem('profileImage');
      const phoneNumber = localStorage.getItem('phoneNumber');

      setUserInfo({
        email: email || '', //존재하지 않으면 공백
        gender: gender || '',//존재하지 않으면 공백
        profileImage: profileImage || '',//존재하지 않으면 공백
        phoneNumber: phoneNumber || ''//존재하지 않으면 공백
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-6">
          <section className="profile-info">
            <h2>프로필</h2>
            <div>
              <img src={userInfo.profileImage} alt="Profile" className="profile-image" />
              <p>이메일: {userInfo.email}</p>
              <p>성별: {userInfo.gender}</p>
              <p>전화번호: {userInfo.phoneNumber}</p>
            </div>
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
      <Footer />
    </div>
  );
};

export default MyPage;
