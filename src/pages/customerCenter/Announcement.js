import React from 'react';
import Question from '../../components/customercenter/Question';
import TopNav from "../../components/topnav/TopNav";
import Footer from "../../components/footer/Footer";
import MoveButton from '../../components/buttons/MoveButton';

function Announcement() {
  const questions2 = [
    {
      number: 1,
      question: "다양한 언어 지원",
      date: "2024/06/05",
      answer: "우리 사이트에서는 다양한 언어를 지원합니다. 회원님들은 원하는 언어로 대화를 나눌 수 있습니다."
    },
    {
      number: 2,
      question: "문화 교류 증진",
      date: "2024/06/05",
      answer: "우리 사이트는 문화 교류를 증진시키는 것을 목표로 합니다. 회원님들은 다른 국가와의 친구를 사귈 수 있고, 새로운 문화를 경험할 수 있습니다."
    },
    {
      number: 3,
      question: "안전한 환경 보장",
      date: "2024/06/05",
      answer: "우리는 회원님들의 안전을 최우선으로 생각합니다. 우리 사이트에서는 스팸, 광고, 불법 활동 등을 엄격히 제한하고 있습니다."
    },
    {
      number: 4,
      question: "사용자 지원 서비스",
      date: "2024/06/05",
      answer: "언제든지 사용자 지원 서비스를 통해 문의하실 수 있습니다. 우리의 팀은 회원님들의 의견이나 문제를 해결하기 위해 최선을 다하고 있습니다."
    },
    {
      number: 5,
      question: "실시간 번역 기능",
      date: "2024/06/05",
      answer: "우리 사이트에는 실시간 번역 기능이 있어 언어 장벽을 극복할 수 있습니다. 이 기능을 통해 회원님들은 다른 언어를 구사하는 사람들과도 쉽게 소통할 수 있습니다."
    },
    {
      number: 6,
      question: "프라이버시 보호",
      date: "2024/06/05",
      answer: "우리는 회원님들의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 회원님들의 개인정보는 안전하게 관리되며, 절대적인 신뢰를 보장합니다."
    },
    {
      number: 7,
      question: "품질 향상을 위한 피드백",
      date: "2024/06/05",
      answer: "회원님들의 의견은 저희에게 매우 소중합니다. 언제든지 피드백을 주시면 저희는 더 나은 서비스를 제공하기 위해 노력할 것입니다."
    },
    {
      number: 8,
      question: "차별 없는 환경",
      date: "2024/06/05",
      answer: "우리는 모든 회원들을 환영합니다. 언어, 인종, 성별, 성적 지향 등에 관계없이 모든 회원들을 존중합니다."
    },
  ];

  return (
    <>
      <div className="w-5/6 h-4/6 m-auto pb-10">
        <div className="align-middle p-5">
          <div className="text-6xl p-5 my-10 font-bold">공지사항</div>
          <div className="grid grid-cols-8 p-5 mb-10 border bg-[#beccde] font-bold text-3xl">
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
    </>
  );
}

export default Announcement;
