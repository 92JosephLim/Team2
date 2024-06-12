import React from "react";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topnav/TopNav";
import SideNav from '../../components/sidenav/SideNav';
import FriendTable from "../../components/friend/FriendTable";
import FriendTitle from "../../components/friend/FriendTitle";
//친구 목록 창 => dm, 친구 삭제 가능
function FriendMain() {
  return (
    <>
      <TopNav />
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex flex-col flex-1">
          <FriendTitle />
          <FriendTable />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FriendMain;