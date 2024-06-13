import React from 'react';
import Question from '../components/Question';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import MoveButton from '../components/MoveButton';

function Announcement() {
  const questions2 = [
    {
      number: 1,
      question: "화상통화 중 카메라끄고 음소거도 하고 싶습니다.",
      date: "2024/06/05",
      answer: "카메라 끄기와 음소거 방법은 다음과 같습니다...",
    },
    {
      number: 2,
      question: "화상채팅하면서 친구추가하는 방법있나요?",
      date: "2024/06/05",
      answer: "친구추가는 이렇게 하시면 됩니다...",
    },
    {
      number: 3,
      question: "화상통화 중 카메라끄고 음소거도 하고 싶습니다.",
      date: "2024/06/05",
      answer: "화상통화 중 카메라끄고 음소거도 하려면...",
    },
    {
      number: 4,
      question: "화상채팅하면서 친구추가하는 방법있나요?",
      date: "2024/06/05",
      answer: "친구추가는 이렇게 하시면 됩니다...",
    },
    {
      number: 5,
      question: "동네 친구와 소통하고 싶어요~",
      date: "2024/06/05",
      answer: "동네 친구와 소통하려면...",
    },
    {
      number: 6,
      question: "화상통화 중 카메라끄고 음소거도 하고 싶습니다.",
      date: "2024/06/05",
      answer: "화상통화 중 카메라끄고 음소거도 하려면...",
    },
    {
      number: 7,
      question: "화상채팅하면서 친구추가하는 방법있나요?",
      date: "2024/06/05",
      answer: "친구추가는 이렇게 하시면 됩니다...",
    },
    {
      number: 8,
      question: "동네 친구와 소통하고 싶어요~",
      date: "2024/06/05",
      answer: "동네 친구와 소통하려면...",
    },
    {
      number: 9,
      question: "화상통화 중 카메라끄고 음소거도 하고 싶습니다.",
      date: "2024/06/05",
      answer: "화상통화 중 카메라끄고 음소거도 하려면...",
    },
    {
      number: 10,
      question: "화상채팅하면서 친구추가하는 방법있나요?",
      date: "2024/06/05",
      answer: "친구추가는 이렇게 하시면 됩니다...",
    },
    {
      number: 11,
      question: "동네 친구와 소통하고 싶어요~",
      date: "2024/06/05",
      answer: "동네 친구와 소통하려면...",
    },
    {
      number: 12,
      question: "화상통화 중 카메라끄고 음소거도 하고 싶습니다.",
      date: "2024/06/05",
      answer: "화상통화 중 카메라끄고 음소거도 하려면...",
    },
  ];

  return (
    <>
    <TopNav />
    <div className="w-5/6 h-4/6 m-auto pb-10">
      <div className="align-middle p-5 border">
        <div className="text-4xl font-bold p-5 m-5 border">공지사항</div>
        <div className="grid grid-cols-8 p-5 border">
          <div className="col-start-1 col-span-1">순번</div>
          <div className="col-start-2 col-span-6">질문</div>
          <div className="col-start-8 col-span-1">작성일</div>
        </div>
        {questions2.map((q, index) => (
          <Question
            key={index}
            number={q.number}
            question={q.question}
            date={q.date}
            answer={q.answer}
          />
        ))}
    </div>
    <MoveButton />
      </div>
      <Footer />
      </>
  );
}

export default Announcement;
