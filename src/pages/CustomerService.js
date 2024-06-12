import React from 'react';
import Question from '../components/Question';
import TopNav from '../components/TopNav';
import MoveButton from '../components/MoveButton';
import Footer from '../components/Footer';
import customerservice from "../locales/customerservice.json";

function CustomerServiceBoard() {
  

  return (
    <>
      <TopNav />
      <div className="aboutContent w-5/6 h-4/6 m-auto pb-10">
        <div className="align-middle p-5">
          <div className="text-6xl font-bold p-5 my-10 font-bold">고객센터</div>
          <div className="grid grid-cols-8 p-5 mb-10 border bg-[#beccde] font-bold text-3xl">
            <div className="col-start-1 col-span-1">순번</div>
            <div className="col-start-2 col-span-6">질문</div>
            <div className="col-start-8 col-span-1">작성일</div>
          </div>
          {customerservice.map((q, index) => ( // JSON 데이터를 사용
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

export default CustomerServiceBoard;
