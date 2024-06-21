import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function MainSide({ roomCount }) {
  const txt = "oH! ourHour TOGETHER";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => prevText + txt[count]);
      setCount((prevCount) => prevCount + 1);
    }, 100);

    if (count === txt.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, txt]);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / roomCount));
    const timer = setInterval(() => {
      start += 1;
      setDisplayCount(start);
      if (start === roomCount) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [roomCount]);

  return (
    <div>
      <span className="text-5xl text-black">{text}</span>
      <p className="animate__animated animate__pulse animate__infinite mt-4 text-black">
        현재 {displayCount} 개의 방이 존재해요
      </p>
    </div>
  );
}

MainSide.propTypes = {
  roomCount: PropTypes.number.isRequired,
};

export default MainSide;
