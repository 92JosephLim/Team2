import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import router1 from "./router1";//webRtc관련 router
import router2 from "./router2";

//로딩 페이지 만들기
//첫 로딩 속도 완화 => lazy, suspense 써서 완화하기. 근데 완화되는지 모르겠음.
//메인 페이지, 로그인, 회원가입, 비밀번호 찾기 쓰는 곳
const Mainpage = lazy(() => import("../mainpage/Mainpage"));
const Login = lazy(() => import("../login/Login"));
const KakaoRedirect = lazy(() => import("../social/KakoRedirect"));
const Signup = lazy(() => import("../signup/Signup"));
const FindPassword = lazy(() => import("../findPassword/FindPassword"));

const router = createBrowserRouter([

  {
    //main page
    path: "/",
    element: (
      <Suspense>
        <Mainpage />
      </Suspense>
    )
  },
  {
    //로그인
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    )
  },
  {
    //카카오
    path: "/auth",
    element: (
      <Suspense>
        <KakaoRedirect />
      </Suspense>
    )
  },
  {
    //회원가입
    path: "/signup",
    element: (
      <Suspense>
        <Signup />
      </Suspense>
    )
  },
  {
    //비밀번호 찾기
    path: "/findpwd",
    element: (
      <Suspense>
        <FindPassword />
      </Suspense>
    )
  },

  ...router1,
  ...router2,

]);

export default router;