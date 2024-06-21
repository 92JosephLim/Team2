import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/loading/Loading"
import router1 from "./router1"; // webRtc 관련 router
import router2 from "./router2";
import router3 from "./router3";

// 로딩 페이지 만들기
// 첫 로딩 속도 완화 => lazy, suspense 써서 완화하기
const MainPage = lazy(() => import("../pages/MainPage"));
const KakaoRedirect = lazy(() => import("../pages/social/KakoRedirect"));
const FindPassword = lazy(() => import("../pages/findPassword/FindPassword"));

const routes = [
  {
    // main page
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
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
  ...router3,
];

const router = createBrowserRouter(routes);

export default router;