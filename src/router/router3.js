import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const ChatSettingPage = lazy(() => import("../pages/ChatSettingPage"));
const OtherSettingPage = lazy(() => import("../pages/OtherSettingPage"));
const VideoAudioSettingPage = lazy(() => import("../pages/VideoAudioSettingPage"));

// 이 외 기타 기능2 링크
const router3 = [
  {
    // ChatSetting
    path: "/settings/ChatSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <ChatSettingPage />
      </Suspense>
    )
  },
  {
    // OtherSetting
    path: "/settings/OtherSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <OtherSettingPage />
      </Suspense>
    )
  },
  {
    // VideoAudioSetting
    path: "/settings/VideoAudioSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoAudioSettingPage />
      </Suspense>
    )
  },
];

export default router3;