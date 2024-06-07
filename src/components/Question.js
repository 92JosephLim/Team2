import React, { useState } from 'react';
import PropTypes from 'prop-types';

//props를 받아서 화면에 표시
function Question({ number, question, date, answer }) {
  //질문 클릭하면 답변이 나타나거나 사라지게 함
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <div className="grid grid-cols-8 m-5 cursor-pointer" onClick={toggleOpen}>
        {/* 질문 등록 번호 */}
        <div className="col-start-1 col-span-1">{number}</div>
        {/* 질문 제목 */}
        <div className="col-start-2 col-span-6">{question}</div>
        {/* 작성일 */}
        <div className="col-start-8 col-span-1">{date}</div>
      </div>
      {/* true일 때 답변 나오게 표시 */}
      {isOpen && (
        <div className="m-5 p-5 border-t">
          <div>{answer}</div>
        </div>
      )}
    </div>
  );
}

// 컴포넌트가 받는 props의 타입을 정의, 타입, 필수여부
Question.propTypes = {
  number: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Question;
