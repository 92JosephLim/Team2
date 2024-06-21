import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import pic1 from "../assets/1.jpg";
import pic2 from "../assets/2.jpg";
import pic3 from "../assets/3.jpg";
import pic4 from "../assets/4.jpg";
import pic5 from "../assets/5.jpg";
import pic6 from "../assets/6.jpg";
import pic7 from "../assets/7.jpg";
import pic8 from "../assets/8.jpg";
import pic9 from "../assets/9.jpg";
import pic10 from "../assets/10.jpg";
import pic11 from "../assets/11.jpg";
import pic12 from "../assets/12.jpg";
import pic13 from "../assets/13.jpg";
import pic14 from "../assets/14.jpg";
import pic15 from "../assets/15.jpg";
import pic16 from "../assets/16.jpg";
import pic17 from "../assets/17.jpg";
import pic18 from "../assets/18.jpg";
import pic19 from "../assets/19.jpg";
import pic20 from "../assets/20.jpg";
import pic21 from "../assets/21.jpg";
import pic22 from "../assets/22.jpg";
import pic23 from "../assets/23.jpg";
import pic24 from "../assets/24.jpg";
import pic25 from "../assets/25.jpg";
import pic26 from "../assets/26.jpg";

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Move() {
  const images = [
    pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9,
    pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20,
    pic21, pic22, pic23, pic24, pic25, pic26
  ];
  const shuffledImages1 = shuffle([...images]); // 첫 번째 열의 무작위 배열
  const shuffledImages2 = shuffle([...images]); // 두 번째 열의 무작위 배열
  const shuffledImages3 = shuffle([...images]); // 세 번째 열의 무작위 배열
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const column3Ref = useRef(null);

  useEffect(() => {
    const column1 = column1Ref.current;
    const column2 = column2Ref.current;
    const column3 = column3Ref.current;

    for (let i = 0; i < 90; i++) {
      const img1 = document.createElement("img");
      img1.src = shuffledImages1[i % 26];
      img1.alt = `Image ${i % 26 + 1}`;
      img1.className = "w-40 h-40 object-cover m-1";
      column1.appendChild(img1);

      const img2 = document.createElement("img");
      img2.src = shuffledImages2[i % 26];
      img2.alt = `Image ${i % 26 + 1}`;
      img2.className = "w-40 h-40 object-cover m-1";
      column2.appendChild(img2);

      const img3 = document.createElement("img");
      img3.src = shuffledImages3[i % 26];
      img3.alt = `Image ${i % 26 + 1}`;
      img3.className = "w-40 h-40 object-cover m-1";
      column3.appendChild(img3);
    }

    gsap.to(column1.children, {
      yPercent: -100 * (column1.children.length / 2),
      repeat: -1,
      duration: 240,
      ease: "linear"
    });

    gsap.to(column2.children, {
      yPercent: 100 * (column2.children.length / 2),
      repeat: -1,
      duration: 240,
      ease: "linear"
    });

    gsap.to(column3.children, {
      yPercent: -100 * (column3.children.length / 2),
      repeat: -1,
      duration: 240,
      ease: "linear"
    });

  }, [shuffledImages1, shuffledImages2, shuffledImages3]);

  return (
    <div className="flex justify-center items-center h-full overflow-hidden ">
      <div className="container flex flex-row items-start">
        <div id="column1" ref={column1Ref} className="flex flex-col w-1/3 hidden md:flex"></div>
        <div id="column2" ref={column2Ref} className="flex flex-col w-full md:w-1/3"></div>
        <div id="column3" ref={column3Ref} className="flex flex-col w-1/3 hidden md:flex"></div>
      </div>
    </div>
  );
}

export default Move;
