import React, { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const MyPage = lazy(() => import("../pages/mypage/MyPage"));
const ProfileSettings = lazy(() => import("../pages/mypage/ProfileSettings"));
const SocialProfileSettings = lazy(() => import("../pages/mypage/SocialProfileSettings"));
const CustomerService = lazy(() => import("../pages/customerCenter/CustomerService"));
const Announcement = lazy(() => import("../pages/customerCenter/Announcement"));
const InviteFriend = lazy(() => import("../pages/friend/InviteFriend"));
const FriendMain = lazy(() => import("../pages/friend/FriendMain"));

// 이 외 기타 기능 링크
const router2 = [
  {
    // mypage
    path: "/mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <MyPage />
      </Suspense>
    )
  },
  {
    // profileSettings
    path: "/ProfileSettings",
    element: (
      <Suspense fallback={<Loading />}>
        <ProfileSettings />
      </Suspense>
    )
  },
  {
    // socialProfileSettings
    path: "/SocialProfileSettings",
    element: (
      <Suspense fallback={<Loading />}>
        <SocialProfileSettings />
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
        <InviteFriend />
      </Suspense>
    )
  },
  {
    // friendMain
    path: "/friendMain",
    element: (
      <Suspense fallback={<Loading />}>
        <FriendMain />
      </Suspense>
    )
  },
];

export default router2;