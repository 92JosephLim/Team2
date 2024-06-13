import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const MyPage = lazy(() => import("../mypage/MyPage"));
const ProfileSettings = lazy(() => import("../mypage/ProfileSettings"));
const SocialProfileSettings = lazy(() => import("../mypage/SocialProfileSettings"));
const CustomerService = lazy(() => import("../customerCenter/CustomerService"));
const Announcement = lazy(() => import("../customerCenter/Announcement"));
const InviteFriend = lazy(() => import("../friend/InviteFriend"));
const FriendMain = lazy(() => import("../friend/FriendMain"));

//이 외 기타 기능 링크
const router2 = createBrowserRouter([

  {
    //mypage
    path: "/mypage",
    element: (
      <Suspense>
        <MyPage />
      </Suspense>
    )
  },
  {
    //mypage
    path: "/ProfileSettings",
    element: (
      <Suspense>
        <ProfileSettings />
      </Suspense>
    )
  },
  {
    //mypage
    path: "/SocialProfileSettings",
    element: (
      <Suspense>
        <SocialProfileSettings />
      </Suspense>
    )
  },
  {
    //customerService
    path: "/customerService",
    element: (
      <Suspense>
        <CustomerService />
      </Suspense>
    )
  },
  {
    //announcement
    path: "/announcement",
    element: (
      <Suspense>
        <Announcement />
      </Suspense>
    )
  },
  {
    //invite
    path: "/invite",
    element: (
      <Suspense>
        <InviteFriend />
      </Suspense>
    )
  },
  {
    //friendMain
    path: "/friendMain",
    element: (
      <Suspense>
        <FriendMain />
      </Suspense>
    )
  },
]);

export default router2;