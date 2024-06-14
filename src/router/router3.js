import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const ChatSetting = lazy(() => import("../pages/settings/ChatSetting"));
const OtherSetting = lazy(() => import("../pages/settings/OtherSetting"));
const RoomSetting = lazy(() => import("../pages/settings/RoomSetting"));
const VideoAudioSetting = lazy(() => import("../pages/settings/VideoAudioSetting"));

// 이 외 기타 기능2 링크
const router3 = [
  {
    // ChatSetting
    path: "/settings/ChatSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <ChatSetting />
      </Suspense>
    )
  },
  {
    // OtherSetting
    path: "/settings/OtherSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <OtherSetting />
      </Suspense>
    )
  },
  {
    // RoomSetting
    path: "/settings/RoomSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <RoomSetting />
      </Suspense>
    )
  },
  {
    // VideoAudioSetting
    path: "/settings/VideoAudioSetting",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoAudioSetting />
      </Suspense>
    )
  },
];

export default router3;