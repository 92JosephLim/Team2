import React from 'react';
import TopNav from '../../components/TopNav'; // 올바른 경로로 수정
import Footer from '../../components/Footer'; // 올바른 경로로 수정
import SideNav from '../../components/SideNav'; // 올바른 경로로 수정

const chatData = {
  oneToOneChats: [
    { name: '김영희', lastMessage: '안녕하세요, 어떠신가요?', time: '오전 10:30' },
    { name: '이접수', lastMessage: '프로젝트 세부 사항을 논의해 봅시다.', time: '오전 9:45' },
    { name: '박인지', lastMessage: '제가 보낸 파일을 받으셨나요?', time: '오전 8:15' },
  ],
  groupChats: [
    { name: '프로젝트 팀 A', lastMessage: '회의록 공유합니다.', time: '오후 2:30' },
    { name: '친구들 모임', lastMessage: '이번 주말에 모임 어때?', time: '오후 4:00' },
    { name: '회사 동료들', lastMessage: '다음 주 휴가 일정 공유합니다.', time: '오후 6:15' },
  ],
};

const MessageChat = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">1:1 채팅 목록</h2>
            <ul className="bg-white shadow-md rounded-lg p-4">
              {chatData.oneToOneChats.map((chat, index) => (
                <li key={index} className="flex justify-between items-center mb-2 p-2 border-b">
                  <div>
                    <span className="block font-bold">{chat.name}</span>
                    <span className="block text-gray-600">{chat.lastMessage}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{chat.time}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">단체 채팅방 목록</h2>
            <ul className="bg-white shadow-md rounded-lg p-4">
              {chatData.groupChats.map((chat, index) => (
                <li key={index} className="flex justify-between items-center mb-2 p-2 border-b">
                  <div>
                    <span className="block font-bold">{chat.name}</span>
                    <span className="block text-gray-600">{chat.lastMessage}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{chat.time}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MessageChat;
