// const AddComponent = () =>{
//     return(
//         <>
//            Add Component
//         </>
//     );
// }
// export default AddComponent;

//#2. 추가(add)
// import { useState } from "react";
// import { postAdd } from "../../api/todoApi";

// const initState = {
//     title:'',
//     writer: '',
//     dueDate: ''
//   }

// const AddComponent = () => {
 
//         const [todo, setTodo] = useState({...initState})
        
//         const handleChangeTodo = (e) => {
//             todo[e.target.name] = e.target.value

//             setTodo({...todo})
//         }

//         const handleClickAdd = () => {

//             //console.log(todo)
//             postAdd(todo)
//             .then(result => {
//                console.log(result)
        
//               // setResult(result.TNO) //결과 데이터 변경 
//                setTodo({...initState})
        
//             }).catch(e => {
//                console.error(e)
//             })
//           }

//         return(
//             <div className = "text-slate-950 border-2 border-sky-200 mt-10 m-2 p-4"> 

//              <div className="flex justify-center">
//                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                  <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
//                  <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
//                     name="title"  type={'text'} value={todo.title}  onChange={handleChangeTodo} >
//                  </input>
//                 </div>
//              </div>
//              <div className="flex justify-center">
//                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                  <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
//                  <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
//                     name="writer" type={'text'} value={todo.writer} onChange={handleChangeTodo} >
//                   </input>
//                </div>  
//              </div>
//              <div className="flex justify-center">
//                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
//                  <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
//                  <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
//                     name="dueDate" type={'date'}  value={todo.dueDate}  onChange={handleChangeTodo} >
//                  </input>
//                </div>
//              </div>
//              <div className="flex justify-end">
//                 <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
//                 <button type="button"  className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "  onClick={handleClickAdd}   >
//                    ADD
//                 </button>
//                </div>
//              </div>
//            </div>

//         );

//   }
//   export default AddComponent;


  //#3. 모달 창 추가
  import { useState } from "react";
  import { postAdd } from "../../api/todoApi";
  import ResultModal from "../common/ResultModal";
  import useCustomMove from "../../hooks/useCustomMove";
  

  const initState = {
      title:'',
      writer: '',
      dueDate: ''
    }
  
  const AddComponent = () => {
   
          const [todo, setTodo] = useState({...initState})
        // 결과 데이터가 있는 경우에는 ResultModal을 보여주기
        const [result, setResult] = useState(null) //결과 상태
        const {moveToList} = useCustomMove() //useCustomMove 활용 
       //

          const handleChangeTodo = (e) => {
              todo[e.target.name] = e.target.value
  
              setTodo({...todo})
          }
  
          const handleClickAdd = () => {
  
              //console.log(todo)
              postAdd(todo)
              .then(result => {
                 console.log(result)
          
                 setResult(result.TNO) //결과 데이터 변경 
                 setTodo({...initState})
          
              }).catch(e => {
                 console.error(e)
              })
            }
  
            // 모달 닫기 처리
            const closeModal = () => {

              setResult(null)
              moveToList()  //moveToList( )호출 
            }
          return(
              <div className = "text-slate-950 border-2 border-sky-200 mt-10 m-2 p-4"> 
                 {/* 모달 처리 부분 */}
              {result ? <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFunction={closeModal}/> : <></>}

               <div className="flex justify-center">
                 <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                   <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                   <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                      name="title"  type={'text'} value={todo.title}  onChange={handleChangeTodo} >
                   </input>
                  </div>
               </div>
               <div className="flex justify-center">
                 <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                   <div className="w-1/5 p-6 text-right font-bold">WRITER</div>
                   <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                      name="writer" type={'text'} value={todo.writer} onChange={handleChangeTodo} >
                    </input>
                 </div>  
               </div>
               <div className="flex justify-center">
                 <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                   <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                   <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md" 
                      name="dueDate" type={'date'}  value={todo.dueDate}  onChange={handleChangeTodo} >
                   </input>
                 </div>
               </div>
               <div className="flex justify-end">
                  <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                  <button type="button"  className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "  onClick={handleClickAdd}   >
                     ADD
                  </button>
                 </div>
               </div>
             </div>
  
          );
  
    }
    export default AddComponent;
  