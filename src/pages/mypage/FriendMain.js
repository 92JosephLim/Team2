import React from "react";
import TopNav from "../../components/TopNav";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import FriendTable from "../../components/searchFriend/FriendTable";
import FriendTitle from "../../components/searchFriend/FriendTitle";

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