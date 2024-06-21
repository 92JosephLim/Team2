import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendTitle from "../../components/friend/FriendTitle";
import { useTranslation } from "react-i18next";

function FriendMain() {
  const { t } = useTranslation();
  const [friends, setFriends] = useState([]);
  const [toRequests, setTorequest] = useState([]);
  const [fromRequests, setFromrequest] = useState([]);
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("https://js2.jsflux.co.kr/api/friends/list", {
          params: { email: userEmail },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data);
        console.log("친구목록");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userEmail, token]);

  useEffect(() => {
    const fetchToReq = async () => {
      try {
        const response = await axios.get("https://js2.jsflux.co.kr/api/friends/requests/sent", {
          params: { email: userEmail },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTorequest(response.data);
        console.log("보낸요청");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    fetchToReq();
  }, [userEmail, token]);

  useEffect(() => {
    const fetchFromReq = async () => {
      try {
        const response = await axios.get("https://js2.jsflux.co.kr/api/friends/requests/received", {
          params: { email: userEmail },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFromrequest(response.data);
        console.log("받은요청");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    fetchFromReq();
  }, [userEmail, token]);

  const handleAcceptRequest = async (senderEmail) => {
    try {
      await axios.post(
        "https://js2.jsflux.co.kr/api/friends/accept",
        {
          senderEmail: senderEmail,
          receiverEmail: userEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFromrequest(fromRequests.filter((request) => request.fromUser.email !== senderEmail));
      const acceptedRequest = fromRequests.find((request) => request.fromUser.email === senderEmail);
      setFriends([...friends, acceptedRequest.fromUser]);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectRequest = async (senderEmail) => {
    try {
      await axios.post(
        "https://js2.jsflux.co.kr/api/friends/reject",
        {
          senderEmail: senderEmail,
          receiverEmail: userEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFromrequest(fromRequests.filter((request) => request.fromUser.email !== senderEmail));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const handleDeleteFriend = async (friendEmail) => {
    try {
      await axios.post(
        "https://js2.jsflux.co.kr/api/friends/delete",
        {
          userEmail: userEmail,
          friendEmail: friendEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFriends(friends.filter((friend) => friend.email !== friendEmail));
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-col flex-1">
          {/* 타이틀 */}
          <FriendTitle />
          {/* 친구 목록 테이블 */}
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th />
                </tr>
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <tr key={friend.id} className="border-b hover:bg-orange-100 bg-gray-100">
                      <td className="p-3 px-5">{friend.nickname}</td>
                      <td className="p-3 px-5">{friend.email}</td>
                      <td className="p-3 px-5 flex justify-end">
                        <button
                          type="button"
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleDeleteFriend(friend.email)}
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 px-5 text-center">
                      {t("noFriendList")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* 내가 보낸 요청 테이블 */}
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <h1 className="text-2xl font-bold ml-16">{t("myRq")}</h1>
                <tr className="border-b">
                  <th />
                </tr>
                {toRequests.length > 0 ? (
                  toRequests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-orange-100 bg-gray-100">
                      <td className="p-3 px-5">{request.toUser.nickname}</td>
                      <td className="p-3 px-5">{request.toUser.email}</td>
                      <td className="p-3 px-5 flex justify-end"></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 px-5 text-center">
                      {t("noFriendRq")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* 내가 받은 요청 테이블 */}
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <h1 className="text-2xl font-bold ml-16">{t("myReceiveRq")}</h1>
                <tr className="border-b">
                  <th />
                </tr>
                {fromRequests.length > 0 ? (
                  fromRequests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-orange-100 bg-gray-100">
                      <td className="p-3 px-5">{request.fromUser.nickname}</td>
                      <td className="p-3 px-5">{request.fromUser.email}</td>
                      <td className="p-3 px-5 flex justify-end">
                        <button
                          type="button"
                          className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleAcceptRequest(request.fromUser.email)}
                        >
                          {t("accept")}
                        </button>
                        <button
                          type="button"
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleRejectRequest(request.fromUser.email)}
                        >
                          {t("reject")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 px-5 text-center">
                      {t("noFriendRc")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendMain;
