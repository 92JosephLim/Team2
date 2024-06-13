import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const VideoMeeting = lazy(() => import("../webRtc/VideoMeeting"));
const CreateRoom = lazy(() => import("../webRtc/CreateRoom"));
const RoomList = lazy(() => import("../webRtc/RoomList"));
const JoinRoom = lazy(() => import("../webRtc/JoinRoom"));

//webRtc 관련 링크
const router1 = createBrowserRouter([

  {
    //videoMeeting
    path: "/video",
    element: (
      <Suspense>
        <VideoMeeting />
      </Suspense>
    )
  },
  {
    //방 생성
    path: "/cr",
    element: (
      <Suspense>
        <CreateRoom />
      </Suspense>
    )
  },
  {
    //방 목록
    path: "/roomlist",
    element: (
      <Suspense>
        <RoomList />
      </Suspense>
    )
  },
  {
    //JoinRoom
    path: "/joinRoom",
    element: (
      <Suspense>
        <JoinRoom />
      </Suspense>
    )
  },
]);

export default router1;