import axios from "axios";


/*
Hook (기본적으로, )
useState() ㅡ 각개발자들이 
[변수명, set함수명] = useState(초기값)


*/


export const API_SERVER_HOST="http://localhost:8080" //서버연결포트

const prefix = `${API_SERVER_HOST}/api/todo`    //내것은 이것을 씁니다.

//번호얻는 함수getOne 
export const getOne = async (tno) => { //async 이거안에서만 await(기다려줘)라는 것을 쓸 수 있습니다.
    const res = await axios.get(`${prefix}/${tno}`) //그 번호를 조회해서 우리한테 데이터를 넘겨줘
    return (await res).data

}
//async 비동기 처리
export const getList = async(pageParam) => {
    const{page, size} = pageParam

    const res = await axios.get(`${prefix}/list`,{params: {page:page, size:size}})

    return res.data

}


// 추가 --------------------------------
export const postAdd = async (todoObj) => {
    const response = await axios.post(`${prefix}/`, todoObj)
  
  return response.data;
  }
  
  //---- 삭제
  export const deleteOne = async (tno) => {
  
    const response = await axios.delete(`${prefix}/${tno}` )
  
    return response.data
  
  }
  
  //--수정
  export const putOne = async (todo) => {
  
    const response = await axios.put(`${prefix}/${todo.tno}`, todo)
  
    return response.data
  }
  