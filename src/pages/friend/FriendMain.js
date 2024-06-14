import React from "react";
import Footer from "../../components/footer/Footer";
import TopNav from "../../components/topnav/TopNav";
import SideNav from '../../components/sidenav/SideNav';
import FriendTitle from "../../components/friend/FriendTitle";
import axios from "axios";
import { useState, useEffect } from "react";
import { TbMessages } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
// 친구 목록 창 => dm, 친구 삭제 가능
function FriendMain() {
  // 친구목록
  const [friends, setFriends] = useState([]);
  // 내가 보낸 요청
  const [toRequests, setTorequest] = useState([]);
  // 내가 받은 요청
  const [fromRequests, setFromrequest] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/friends/list", {
          params: { email: userEmail },
        });
        setFriends(response.data);
        console.log("친구목록");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userEmail]);

  useEffect(() => {
    const fetchToReq = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/friends/requests/sent", {
          params: { email: userEmail },
        });
        setTorequest(response.data);
        console.log("보낸요청");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    fetchToReq();
  }, [userEmail]);

  useEffect(() => {
    const fetchFromReq = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/friends/requests/received", {
          params: { email: userEmail },
        });
        setFromrequest(response.data);
        console.log("받은요청");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    fetchFromReq();
  }, [userEmail]);

  const openModal = () => {
    // 모달 열기 로직을 여기에 추가합니다.
  };

  const handleAcceptRequest = async (senderEmail) => {
    try {
      await axios.post("http://localhost:8080/api/friends/accept", {
        senderEmail: senderEmail,
        receiverEmail: userEmail,
      });
      setFromrequest(fromRequests.filter((request) => request.fromUser.email !== senderEmail));
      // 수락된 친구를 친구 목록에 추가
      const acceptedRequest = fromRequests.find((request) => request.fromUser.email === senderEmail);
      setFriends([...friends, acceptedRequest.fromUser]);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectRequest = async (senderEmail) => {
    try {
      await axios.post("http://localhost:8080/api/friends/reject", {
        senderEmail: senderEmail,
        receiverEmail: userEmail,
      });
      setFromrequest(fromRequests.filter((request) => request.fromUser.email !== senderEmail));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const handleDeleteFriend = async (friendEmail) => {
    try {
      await axios.post("http://localhost:8080/api/friends/delete", {
        userEmail: userEmail,
        friendEmail: friendEmail,
      });
      setFriends(friends.filter((friend) => friend.email !== friendEmail));
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <>
      <TopNav />
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex flex-col flex-1">
          <FriendTitle />
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-center p-3 px-5">Name</th>
                  <th className="text-center p-3 px-5">Email</th>
                  <th />
                </tr>
                {friends.map((friend) => (
                  <tr key={friend.id} className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">{friend.nickname}</td>
                    <td className="p-3 px-5">{friend.email}</td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        <TbMessages size={24} />
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteFriend(friend.email)}
                      >
                        <RiDeleteBin5Line size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-center p-3 px-5">Name</th>
                  <th className="text-center p-3 px-5">Email</th>
                  <th />
                </tr>
                {toRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">{request.toUser.nickname}</td>
                    <td className="p-3 px-5">{request.toUser.email}</td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        <TbMessages size={24} />
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={openModal}
                      >
                        <RiDeleteBin5Line size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-center p-3 px-5">Name</th>
                  <th className="text-center p-3 px-5">Email</th>
                  <th />
                </tr>
                {fromRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">{request.fromUser.nickname}</td>
                    <td className="p-3 px-5">{request.fromUser.email}</td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleAcceptRequest(request.fromUser.email)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRejectRequest(request.fromUser.email)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FriendMain;

// import React from "react";
// import Footer from "../../components/footer/Footer";
// import TopNav from "../../components/topnav/TopNav";
// import SideNav from '../../components/sidenav/SideNav';
// import FriendTable from "../../components/friend/FriendTable";
// import FriendTitle from "../../components/friend/FriendTitle";
// //친구 목록 창 => dm, 친구 삭제 가능
// function FriendMain() {
//   return (
//     <>
//       <TopNav />
//       <div className="flex min-h-screen">
//         <SideNav />
//         <div className="flex flex-col flex-1">
//           <FriendTitle />
//           <FriendTable />
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default FriendMain;