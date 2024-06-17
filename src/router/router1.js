import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const VideoCreation = lazy(() => import("../pages/VideoCreationPage"));
const VideoCreationPage = lazy(() => import("../pages/VideoCreationPage"));
const VideoRoomListPage = lazy(() => import("../pages/VideoRoomListPage"));
const JoinRoom = lazy(() => import("../pages/webRtc/JoinRoom"));

// webRtc 관련 링크
const router1 = [
  {
    // videoMeeting
    path: "/video",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoCreation />
      </Suspense>
    )
  },
  {
    // 방 생성
    path: "/cr",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoCreationPage />
      </Suspense>
    )
  },
  {
    // 방 목록
    path: "/roomlist",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoRoomListPage />
      </Suspense>
    )
  },
  {
    // JoinRoom
    path: "/joinRoom",
    element: (
      <Suspense fallback={<Loading />}>
        <JoinRoom />
      </Suspense>
    )
  },
];

export default router1;