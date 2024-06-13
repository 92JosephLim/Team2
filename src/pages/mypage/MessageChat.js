import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../../components/TopNav'; // 올바른 경로로 수정
import Footer from '../../components/Footer'; // 올바른 경로로 수정
import SideNav from '../../components/SideNav'; // 올바른 경로로 수정
import trashIcon from '../../assets/trash.jpg'; // 올바른 경로로 수정

const initialChatData = {
  oneToOneChats: [
    { id: 1, name: '김영희', lastMessage: '안녕하세요, 어떠신가요?', time: '오전 10:30' },
    { id: 2, name: '이접수', lastMessage: '프로젝트 세부 사항을 논의해 봅시다.', time: '오전 9:45' },
    { id: 3, name: '박인지', lastMessage: '제가 보낸 파일을 받으셨나요?', time: '오전 8:15' },
    { id: 4, name: '최신 채팅1', lastMessage: '새로운 메시지1', time: '오후 1:30' },
    { id: 5, name: '최신 채팅2', lastMessage: '새로운 메시지2', time: '오후 2:00' },
    { id: 6, name: '추가 채팅3', lastMessage: '더 많은 메시지3', time: '오후 2:30' },
  ],
  groupChats: [
    { id: 7, name: '프로젝트 팀 A', lastMessage: '회의록 공유합니다.', time: '오후 2:30' },
    { id: 8, name: '친구들 모임', lastMessage: '이번 주말에 모임 어때?', time: '오후 4:00' },
    { id: 9, name: '회사 동료들', lastMessage: '다음 주 휴가 일정 공유합니다.', time: '오후 6:15' },
    { id: 10, name: '최신 단체 채팅1', lastMessage: '새로운 메시지1', time: '오후 3:30' },
    { id: 11, name: '최신 단체 채팅2', lastMessage: '새로운 메시지2', time: '오후 4:15' },
    { id: 12, name: '추가 단체 채팅3', lastMessage: '더 많은 메시지3', time: '오후 5:00' },
  ],
};

const getLatestChats = (chats, maxItems) => {
  return chats.slice(-maxItems).reverse();
};

const MessageChat = () => {
  const [chatData, setChatData] = useState(initialChatData);
  const [oneToOneLimit, setOneToOneLimit] = useState(4);
  const [groupChatLimit, setGroupChatLimit] = useState(4);

  const deleteChat = (type, id) => {
    setChatData((prevChatData) => ({
      ...prevChatData,
      [type]: prevChatData[type].filter((chat) => chat.id !== id),
    }));
  };

  const latestOneToOneChats = getLatestChats(chatData.oneToOneChats, oneToOneLimit);
  const latestGroupChats = getLatestChats(chatData.groupChats, groupChatLimit);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-6">
          <section className="mb-40">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex-grow text-center">1:1 채팅 목록</h2>
              {oneToOneLimit < chatData.oneToOneChats.length ? (
                <button
                  onClick={() => setOneToOneLimit(oneToOneLimit + 4)}
                  className="text-blue-500 ml-4"
                >
                  더보기
                </button>
              ) : (
                oneToOneLimit > 4 && (
                  <button
                    onClick={() => setOneToOneLimit(4)}
                    className="text-blue-500 ml-4"
                  >
                    접기
                  </button>
                )
              )}
            </div>
            <ul className="bg-white shadow-md rounded-lg p-4">
              {latestOneToOneChats.map((chat) => (
                <li key={chat.id} className="flex justify-between items-center mb-2 p-2 border-b">
                  <div className="flex justify-between items-center w-full">
                    <span className="block font-bold">{chat.name}</span>
                    <Link to={`/chat/${chat.id}`} className="block text-gray-600 text-center flex-1">
                      {chat.lastMessage}
                    </Link>
                    <span className="text-gray-500 text-sm text-right">{chat.time}</span>
                  </div>
                  <button
                    onClick={() => deleteChat('oneToOneChats', chat.id)}
                    className="ml-4"
                  >
                    <img src={trashIcon} alt="Delete" className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-40">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex-grow text-center">단체 채팅방 목록</h2>
              {groupChatLimit < chatData.groupChats.length ? (
                <button
                  onClick={() => setGroupChatLimit(groupChatLimit + 4)}
                  className="text-blue-500 ml-4"
                >
                  더보기
                </button>
              ) : (
                groupChatLimit > 4 && (
                  <button
                    onClick={() => setGroupChatLimit(4)}
                    className="text-blue-500 ml-4"
                  >
                    접기
                  </button>
                )
              )}
            </div>
            <ul className="bg-white shadow-md rounded-lg p-4">
              {latestGroupChats.map((chat) => (
                <li key={chat.id} className="flex justify-between items-center mb-2 p-2 border-b">
                  <div className="flex justify-between items-center w-full">
                    <span className="block font-bold">{chat.name}</span>
                    <Link to={`/chat/${chat.id}`} className="block text-gray-600 text-center flex-1">
                      {chat.lastMessage}
                    </Link>
                    <span className="text-gray-500 text-sm text-right">{chat.time}</span>
                  </div>
                  <button
                    onClick={() => deleteChat('groupChats', chat.id)}
                    className="ml-4"
                  >
                    <img src={trashIcon} alt="Delete" className="w-5 h-5" />
                  </button>
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
