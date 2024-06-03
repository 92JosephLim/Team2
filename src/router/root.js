// import { createBrowserRouter } from "react-router-dom";
// // createBrowserRouter : 어떤 경로(path)에는 어떤 컴포넌트를 보여 줄 것인지를 결정하는 역할
// //                    경로의 추가는 파라미터로 전달되는 배열의 내용으로 결정

// const root = createBrowserRouter([

// ]);

// export default root;

import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const { createBrowserRouter } = require("react-router-dom");

// Suspense, lazy : 아직 컴포넌트의 처리가 끝나지 않았을 수도 잇고, 
//아직 필요한 순간이 아닐 수도 있음
//그럴때 필요한 순간까지 컴포넌트를 메모리상으로 올리지 않도록 지연로딩을 위해 사용




const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/Append"))

const About = lazy(() => import("../pages/AboutPage"))

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

const Detail = lazy(() => import("../pages/DetailPage"))

const TodoList =  lazy(() => import("../pages/todo/ListPage"))


const root = createBrowserRouter([
    // "" : "/"  MainPage 컴포넌트 보여주기

  {
    path: "",
    element: <Suspense fallback={Loading}><Main/></Suspense>
  },
  {
    path: "about",
    element: <Suspense fallback={Loading}><About/></Suspense>
  },
  {
    path: "detail",
    element: <Suspense fallback={Loading}><Detail/></Suspense>
  },
  {
    path: "todo",
    element: <Suspense fallback={Loading}><TodoIndex/></Suspense>,
    children: todoRouter()
  }


])

export default root;