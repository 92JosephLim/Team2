//★설명할려고 존재하는 파일입니다. ★


// import React, {useState} from "react"; //


// //const CountExam = () => { } 
// function CountExam(){
//     const [count, setCount] = useState(0)

//     return(
//         <div>
//             <h1>테스트 {count} 번 클릭</h1>
//             <button onClick={() => setCount(count + 1)}>
//                 Click me
//             </button>
//         </div>
    

// );
// }

// export default CountExam;









//비동기방식에서 useEffect 훅을 사용합니다.
//에픽트훅사용하는 것 : 의도하지 않았는데, 실행되는 경우에 사용합니다.
//잠깐 실행되지 않도록 처리했습니다. (제어하기 위해서)

import React, {useState, useEffect} from "react";

//useEffect(이펙트 함수, 의존성 배열) 
//의존성배열이 변경되면, 이펙트함수가 실행된다.가 중요합니다.

function CounterUseEffect(){
    const [todo, setTodo] = useState(초기값(함수처리))

    useEffect(()=>{
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    }, [tno])

    return(
         <div>
            <h1>테스트 {count} 번 클릭</h1>
             <button onClick={() => setCount(count + 1)}>
                 Click me2
             </button>
       </div>
    );

}

export default CounterUseEffect;

