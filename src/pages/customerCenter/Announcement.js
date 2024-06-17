import React from 'react';
import Question from '../../components/customercenter/Question';
import MoveButton from '../../components/buttons/MoveButton';
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

function Announcement() {

  const { t } = useTranslation();

  const questions2 = [
    {
      number: 1,
      question: t("question1"),
      date: "2024/06/05",
      answer: t("answer1")
    },
    {
      number: 2,
      question: t("question2"),
      date: "2024/06/05",
      answer: t("answer2")
    },
    {
      number: 3,
      question: t("question3"),
      date: "2024/06/05",
      answer: t("answer3")
    },
    {
      number: 4,
      question: t("question4"),
      date: "2024/06/05",
      answer: t("answer4")
    },
    {
      number: 5,
      question: t("question5"),
      date: "2024/06/05",
      answer: t("answer5")
    },
    {
      number: 6,
      question: t("question6"),
      date: "2024/06/05",
      answer: t("answer6")
    },
    {
      number: 7,
      question: t("question7"),
      date: "2024/06/05",
      answer: t("answer7")
    },
    {
      number: 8,
      question: t("question8"),
      date: "2024/06/05",
      answer: t("answer8")
    },
  ];

  return (
    <>
      <div className="w-5/6 h-4/6 m-auto pb-10">
        <div className="align-middle p-5">
          <div className="text-6xl p-5 my-10 font-bold">{t("notice")}</div>
          <div className="grid grid-cols-8 p-5 mb-10 border bg-[#beccde] font-bold text-3xl">
            <div className="col-start-1 col-span-1">{t("number")}</div>
            <div className="col-start-2 col-span-6">{t("question")}</div>
            <div className="col-start-8 col-span-1">{t("date")}</div>
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
