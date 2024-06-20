import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";



const VideoRoomListPage = lazy(() => import("../pages/VideoRoomListPage"));
const VideoMeetingPage = lazy(() => import("../pages/VideoMeetingPage")); //방목록에서 누르기
const JoinRoom = lazy(() => import("../pages/webRtc/JoinRoom"));

// webRtc 관련 링크
const router1 = [
  {
    // videoMeeting
    path: "/video",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoMeetingPage />
      </Suspense>
    ),
  },
  {
    // 방 목록
    path: "/roomlist",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoRoomListPage />
      </Suspense>
    ),
  },
  {
    // JoinRoom
    path: "/joinRoom",
    element: (
      <Suspense fallback={<Loading />}>
        <JoinRoom />
      </Suspense>
    ),
  },
];

export default router1;
