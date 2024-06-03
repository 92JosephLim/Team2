// const ListPage = () => {
//     return (
//         <div className="p-4 w-full bg-white">
//             <div className="text-3xl font-extrabold text-orange-500">
//                 Todo 리스트 페이지 (List Page Component)
//             </div>
//         </div>
//     );
// }
// export default ListPage;

//#2. useSearchParams() : 쿼리스트링의 값을 추출
// import { useSearchParams } from "react-router-dom";

// const ListPage = () => {

//     const [queryParams] = useSearchParams()

//     const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
//     const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

//     return (
//         <div className="p-4 w-full bg-white">
//             <div className="text-3xl font-extrabold text-orange-500">
//                 Todo 리스트 페이지 (List Page Component)  {page} 에서 부터 {size} 까지
//             </div>
//         </div>
//     );
// }
// export default ListPage;

//#3. 목록데이터 가져오기 ()
import ListComponent from "../../components/todo/ListComponent";
import ListWeatherComponent from "../../components/todo/ListWeatherComponent";



const ListPage = () => {

  return ( 
        <div className="p-4 w-full  bg-lime-700">
            <div className="text-3xl font-extrabold">
                Todo 리스트 페이지(List Page) Component 
            </div> 
            <ListWeatherComponent />

        </div>
   );
}
 
export default ListPage;
