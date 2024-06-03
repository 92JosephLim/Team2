// import { useEffect, useState } from "react";
// import { getList } from "../../api/todoApi";
// import useCustomMove from "../../hooks/useCustomMove";

// const initState = {
//   dtoList:[],
//   pageNumList:[],
//   pageRequestDTO: null,
//   prev: false,
//   next: false,
//   totoalCount: 0,
//   prevPage: 0,
//   nextPage: 0,
//   totalPage: 0,
//   current: 0
// }

// const ListComponent = () =>{
//     const {page, size} = useCustomMove()  //현재 경로의 page와 size를 구성하고 API 서버를 호출

//     //serverData는 나중에 사용
//     const [serverData, setServerData] = useState(initState)

//     useEffect(()=>{
//         getList({page, size}).then(data =>{
//             console.log(data)
//             setServerData(data)
//         })
//     }, [page, size])

//     return(
//         <div>
//             Todo List Component
//         </div>
//     );
// }
// export default ListComponent;

//#2. 서버에서 가져온 데이터들을 출력
// import { useEffect, useState } from "react";
// import { getList } from "../../api/todoApi";
// import useCustomMove from "../../hooks/useCustomMove";

// const initState = {
//   dtoList:[],
//   pageNumList:[],
//   pageRequestDTO: null,
//   prev: false,
//   next: false,
//   totoalCount: 0,
//   prevPage: 0,
//   nextPage: 0,
//   totalPage: 0,
//   current: 0
// }

// const ListComponent = () =>{
//     const {page, size} = useCustomMove()  //현재 경로의 page와 size를 구성하고 API 서버를 호출
//     // const {page, size, refresh, moveToList, moveToRead} = useCustomMove() //refresh

//     //serverData는 나중에 사용
//     const [serverData, setServerData] = useState(initState)

//     useEffect(()=>{
//         getList({page, size}).then(data =>{
//             console.log(data)
//             setServerData(data)
//         })
//     }, [page, size])

//     return(
//         <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
  
//         <div className="flex flex-wrap mx-auto justify-center p-6">
    
//           {serverData.dtoList.map(todo =>    
//           <div  key= {todo.tno}  className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md" >  
//             <div className="flex ">
//               <div className="font-extrabold text-base p-2 w-1/12">
//                 {todo.tno}
//               </div>
//               <div className="text-base m-1 p-2 w-8/12 font-extrabold">
//                 {todo.title}
//               </div>
//               <div className="text-base m-1 p-2 w-2/10 font-medium">
//                 {todo.dueDate}
//               </div>
//             </div>
//           </div>
//           )}
//         </div>
    
//       </div>
  
//     );
// }
// export default ListComponent;

//#3. 페이징 처리
import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

import PageComponent from "../common/PageComponent";

const initState = {
  dtoList:[],
  pageNumList:[],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const ListComponent = () =>{
   // const {page, size} = useCustomMove()  //현재 경로의 page와 size를 구성하고 API 서버를 호출
   const {page, size, refresh, moveToList, moveToRead} = useCustomMove() //refresh

    //serverData는 나중에 사용
    const [serverData, setServerData] = useState(initState)

    useEffect(()=>{
        getList({page, size}).then(data =>{
            console.log(data)
            setServerData(data)
        })
    },[page,size, refresh])

    return(
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
  
        <div className="flex flex-wrap mx-auto justify-center p-6">
    
          {serverData.dtoList.map(todo =>    
          <div  key= {todo.tno}  className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"  onClick={() => moveToRead(todo.tno)} >  
            <div className="flex ">
              <div className="font-extrabold text-base p-2 w-1/12">
                {todo.tno}
              </div>
              <div className="text-base m-1 p-2 w-8/12 font-extrabold">
                {todo.title}
              </div>
              <div className="text-base m-1 p-2 w-2/10 font-medium">
                {todo.dueDate}
              </div>
            </div>
          </div>
          )}
        </div>
                
        <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
      </div>
  
    );
}
export default ListComponent;