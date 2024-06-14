import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const VideoMeeting = lazy(() => import("../pages/webRtc/VideoMeeting"));
const CreateRoom = lazy(() => import("../pages/webRtc/CreateRoom"));
const RoomList = lazy(() => import("../pages/webRtc/RoomList"));
const JoinRoom = lazy(() => import("../pages/webRtc/JoinRoom"));

// webRtc 관련 링크
const router1 = [
  {
    // videoMeeting
    path: "/video",
    element: (
      <Suspense fallback={<Loading />}>
        <VideoMeeting />
      </Suspense>
    )
  },
  {
    // 방 생성
    path: "/cr",
    element: (
      <Suspense fallback={<Loading />}>
        <CreateRoom />
      </Suspense>
    )
  },
  {
    // 방 목록
    path: "/roomlist",
    element: (
      <Suspense fallback={<Loading />}>
        <RoomList />
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