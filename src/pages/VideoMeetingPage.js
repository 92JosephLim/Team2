import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import VideoMeeting from "./webRtc/VideoMeeting";

const VideoRoomListPage = () => {

  return (
    <BasicLayout>
      <VideoMeeting />
    </BasicLayout>
  );
};

export default VideoRoomListPage;
