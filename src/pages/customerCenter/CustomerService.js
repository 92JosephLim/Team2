import React from 'react';
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topnav/TopNav";
import Question from '../../components/customercenter/Question';
import MoveButton from '../../components/buttons/MoveButton';
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

function CustomerServiceBoard() {

  const { t } = useTranslation();

  const questions1 = [
    {
      "number": 1,
      "question": t("q1"),
      "date": "2024/06/05",
      "answer": t("a1")
    },
    {
      "number": 2,
      "question": t("q2"),
      "date": "2024/06/05",
      "answer": t("a2")
    },
    {
      "number": 3,
      "question": t("q3"),
      "date": "2024/06/05",
      "answer": t("a3")
    },
    {
      "number": 4,
      "question": t("q4"),
      "date": "2024/06/05",
      "answer": t("a4")
    },
    {
      "number": 5,
      "question": t("q5"),
      "date": "2024/06/05",
      "answer": t("a5")
    },
    {
      "number": 6,
      "question": t("q6"),
      "date": "2024/06/05",
      "answer": t("a6")
    },
    {
      "number": 7,
      "question": t("q7"),
      "date": "2024/06/05",
      "answer": t("a7")
    },
    {
      "number": 8,
      "question": t("q8"),
      "date": "2024/06/05",
      "answer": t("a8")
    }
  ]

  return (
    <div className='bg-black'>
    <TopNav />
      <div className="w-5/6 h-4/6 m-auto sm:pb-2 md:pb-10">
        <div className="align-middle text-white sm:p-2 md:p-3">
          <div className="sm:text-xl md:text-2xl lg:text-3xl p-5 my-10 font-bold">{t("About")}</div>
          <div className="grid grid-cols-8 p-5 mb-10 border bg-[#13538A] font-bold sm:text-lg md:xl">
            <div className="col-start-1 col-span-1">{t("number")}</div>
            <div className="col-start-2 col-span-6">{t("question")}</div>
            <div className="col-start-8 col-span-1">{t("date")}</div>
          </div>
          {questions1.map((q, index) => (
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
    </div>
  );
}

export default CustomerServiceBoard;
