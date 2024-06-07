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
  return (
    <>
      <TopNav />
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex flex-col flex-1">
          <AddFriendTitle />
          {/* 뭐지 왜 searchBar로 컴포넌트 나눴는데 왜 안나와!!! */}
          <div className="searchBar">
            <div className="container mx-auto">
              <form className="p-10">
                <div className="mb-4 flex items-center">
                  <input
                    type="text"
                    className="flex-grow rounded-lg border border-gray-400 p-4"
                    placeholder="닉네임을 입력해주세요"
                  />
                  <button className="ml-2 rounded-lg bg-blue-500 p-5 text-white hover:bg-blue-600">
                    검색
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* 아니 hr 태그 왜 안먹지 */}
          <hr />
          <AddFriendTable />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InviteFriend;
