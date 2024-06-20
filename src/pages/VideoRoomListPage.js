import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import VideoRoomList from "./webRtc/RoomList";

const VideoRoomListPage = () => {

  return (
    <BasicLayout>
      <VideoRoomList />
    </BasicLayout>
  );
};

export default VideoRoomListPage;
