import React, { useEffect, useState } from "react";
function MainSide() {

  //애니메이션 효과 줄 로고
  const txt = "oH! ourHour TOGTEHR";

  //로고 애니메이션 상태 선언
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  //useEffect로 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setText(text + txt[count]);
      setCount(count + 1);
    }, 100);
    if (count === txt.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  })

  return (
    <div>
      <span className="text-2xl">{text}</span>
    </div>
  )
}

export default MainSide;
// import React, { useEffect, useState } from "react";

// function MainSide() {
//   // 애니메이션 효과 줄 로고
//   const txt = "ourHour TOGTEHR";

//   // 로고 애니메이션 상태 선언
//   const [text, setText] = useState("");
//   const [count, setCount] = useState(0);

//   // useEffect로 애니메이션
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setText((prevText) => prevText + txt[count]);
//       setCount((prevCount) => prevCount + 1);
//     }, 100);
//     if (count === txt.length) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [count, txt]);

//   // 줄 바꿈을 HTML 요소로 변환하여 렌더링
//   const lines = text.split("\n").map((line, index) => (
//     <div key={index}>{line}</div>
//   ));

//   return (
//     <div>
//       <span className="text-9xl">{lines}</span>
//     </div>
//   );
// }

// export default MainSide;


// 이거 ts...
// import React from "react";
// import { Typed } from "react-typed";

// function MainSide() {
//   return (
//     <div>
//       <Typed
//         strings={["oH!", "our-hour TOGETHER"]}
//         typeSpeed={50}
//         backSpeed={25}
//         loop={true}
//         style={{
//           color: "white",
//           fontSize: "80px",
//           display: "flex",
//           justifyContent: "center",
//           marginTop: "30%",
//           alignItems: "center",
//         }} />
//     </div>
//   )
// }

// export default MainSide;
