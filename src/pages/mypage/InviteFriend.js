import React from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import SideNav from "../../components/SideNav";
import AddFriendTitle from "../../components/searchFriend/AddFriendTitle";
import AddFriendTable from "../../components/searchFriend/AddFriendTable";

//친구 추가페이지...
//이거 친구 추가 수락/거절 할건지???
function InviteFriend() {
  //검색 결과 post로 서버에 보내주기
  const searchFriend = (e) => {
    e.preventDefault();
    // 여기에 검색 로직을 추가하세요.
    console.log('검색 실행');
  };
  
  return (
    <>
      <TopNav />
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex flex-col flex-1">
          <AddFriendTitle />
          <div className="searchBar">
            <div className="container mx-auto">
              <form className="p-10" onSubmit={searchFriend}>
                <div className="mb-4 flex items-center">
                  <input
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    // value={value}
                    // onChange={onChange}
                    className="flex-grow rounded-lg border border-gray-400 p-4"
                  />
                  <button className="ml-2 rounded-lg bg-blue-500 p-5 text-white hover:bg-blue-600">
                    검색
                  </button>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <AddFriendTable />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InviteFriend;
