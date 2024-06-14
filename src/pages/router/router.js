import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../../components/loading/Loading"
import router1 from "./router1"; // webRtc 관련 router
import router2 from "./router2";

// 로딩 페이지 만들기
// 첫 로딩 속도 완화 => lazy, suspense 써서 완화하기
const Mainpage = lazy(() => import("../mainpage/Mainpage"));
const Login = lazy(() => import("../login/Login"));
const KakaoRedirect = lazy(() => import("../social/KakoRedirect"));
const Signup = lazy(() => import("../signup/Signup"));
const FindPassword = lazy(() => import("../findPassword/FindPassword"));

const routes = [
  {
    // main page
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Mainpage />
      </Suspense>
    )
  },
  {
    // 로그인
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    )
  },
  {
    // 카카오
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <KakaoRedirect />
      </Suspense>
    )
  },
  {
    // 회원가입
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup />
      </Suspense>
    )
  },
  {
    // 비밀번호 찾기
    path: "/findpwd",
    element: (
      <Suspense fallback={<Loading />}>
        <FindPassword />
      </Suspense>
    )
  },
  ...router1,
  ...router2,
];

const router = createBrowserRouter(routes);

export default router;
// import React, { Suspense, lazy } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import Loading from "../../components/loading/Loading"
// import router1 from "./router1";//webRtc관련 router
// import router2 from "./router2";//이 외 router

// //로딩 페이지 만들기
// //첫 로딩 속도 완화 => lazy, suspense 써서 완화하기. 근데 완화되는지 모르겠음.
// //메인 페이지, 로그인, 회원가입, 비밀번호 찾기 쓰는 곳
// const Mainpage = lazy(() => import("../mainpage/Mainpage"));
// const Login = lazy(() => import("../login/Login"));
// const KakaoRedirect = lazy(() => import("../social/KakoRedirect"));
// const Signup = lazy(() => import("../signup/Signup"));
// const FindPassword = lazy(() => import("../findPassword/FindPassword"));

// const router = createBrowserRouter([

//   {
//     //main page
//     path: "/",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <Mainpage />
//       </Suspense>
//     )
//   },
//   {
//     //로그인
//     path: "/login",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <Login />
//       </Suspense>
//     )
//   },
//   {
//     //카카오
//     path: "/auth",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <KakaoRedirect />
//       </Suspense>
//     )
//   },
//   {
//     //회원가입
//     path: "/signup",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <Signup />
//       </Suspense>
//     )
//   },
//   {
//     //비밀번호 찾기
//     path: "/findpwd",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <FindPassword />
//       </Suspense>
//     )
//   },

//   ...router1,
//   ...router2,

// ]);

// export default router;