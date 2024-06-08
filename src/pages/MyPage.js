import React from 'react';
import '../css/MyPage.css';
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import SideNav from '../components/SideNav';

const MyPage = () => {
  return (
    <div className="myPage">
      <TopNav />
      <div className="content">
        <SideNav />
        <main className="main-content">
          <section className="profile-info">
            <h2>프로필</h2>
            <div>
              <p>사용자 이름: @honggildong</p>
              <p>이메일: honggildong@example.com</p>
            </div>
            <div>
              <p>상태: 온라인</p>
              <p>가입일: 2023년 6월 1일</p>
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
    </div >
  );
};

export default MyPage;
