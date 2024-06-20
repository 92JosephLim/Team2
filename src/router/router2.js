import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const My = lazy(() => import("../pages/MyPage"));
const ProfileSettingsPage = lazy(() => import("../pages/ProfileSettingsPage"));
const SocialProfileSettingsPage = lazy(() => import("../pages/SocialProfileSettingsPage"));
const CustomerService = lazy(() => import("../pages/customerCenter/CustomerService"));
const Announcement = lazy(() => import("../pages/customerCenter/Announcement"));
const InviteFriendPage = lazy(() => import("../pages/InviteFriendPage"));
const FriendMainPage = lazy(() => import("../pages/FriendMainPage"));

// 이 외 기타 기능 링크
const router2 = [
  {
    // mypage
    path: "/mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <My />
      </Suspense>
    )
  },
  {
    // profileSettings
    path: "/profileSettings",
    element: (
      <Suspense fallback={<Loading />}>
        <ProfileSettingsPage />
      </Suspense>
    )
  },
  {
    // socialProfileSettings
    path: "/socialProfileSettings",
    element: (
      <Suspense fallback={<Loading />}>
        <SocialProfileSettingsPage />
      </Suspense>
    )
  },
  {
    // customerService
    path: "/customerService",
    element: (
      <Suspense fallback={<Loading />}>
        <CustomerService />
      </Suspense>
    )
  },
  {
    // announcement
    path: "/announcement",
    element: (
      <Suspense fallback={<Loading />}>
        <Announcement />
      </Suspense>
    )
  },
  {
    // invite
    path: "/invite",
    element: (
      <Suspense fallback={<Loading />}>
        <InviteFriendPage />
      </Suspense>
    )
  },
  {
    // friendMain
    path: "/friendMain",
    element: (
      <Suspense fallback={<Loading />}>
        <FriendMainPage />
      </Suspense>
    )
  },
];

export default router2;