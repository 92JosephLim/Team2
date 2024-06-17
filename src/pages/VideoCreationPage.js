import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import VideoCreation from "./webRtc/CreateRoom";

const VideoCreationPage = () => {

  return (
    <BasicLayout>
      <VideoCreation />
    </BasicLayout>
  );
};

export default VideoCreationPage;
