import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Question({ number, question, date, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <div className="grid grid-cols-8 m-5 cursor-pointer" onClick={toggleOpen}>
        <div className="col-start-1 col-span-1">{number}</div>
        <div className="col-start-2 col-span-6">{question}</div>
        <div className="col-start-8 col-span-1">{date}</div>
      </div>
      {isOpen && (
        <div className="m-5 py-16 border-t">
          <div>{answer}</div>
        </div>
      )}
    </div>
  );
}

Question.propTypes = {
  number: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Question;
