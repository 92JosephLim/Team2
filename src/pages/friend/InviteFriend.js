import React, { useState } from "react";
import AddFriendTitle from "../../components/friend/AddFriendTitle";
import axios from "axios";
import { useTranslation } from "react-i18next";

// 친구 추가 페이지
function InviteFriend() {
  const { t } = useTranslation();
  const [nickName, setNickName] = useState(""); // 입력하는 닉네임
  const [results, setResults] = useState([]); // 검색결과
  const [error, setError] = useState(""); // 에러 메시지
  const token = localStorage.getItem("token");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://js2.jsflux.co.kr/api/members/search", { nickName });
      console.log(response.data);
      setResults(response.data);
      setError(""); // 성공 시 에러 메시지 초기화
    } catch (error) {
      // console.error("Error searching member:", error);
      if (error.response && error.response.status === 404) {
        setError("해당 닉네임을 가진 사용자를 찾을 수 없습니다.");
      } else {
        setError("사용자 검색 중 오류가 발생했습니다.");
      }
      setResults([]); // 실패 시 결과 초기화
    }
  };

  const handleAddFriend = async (receiverEmail) => {
    const senderEmail = localStorage.getItem("email"); // 로컬스토리지에서 로그인한 사용자의 이메일 가져오기
    if (!senderEmail) {
      alert("로그인된 사용자 이메일을 찾을 수 없습니다.");
      return;
    }

    if (!token) {
      alert("인증 토큰을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "https://js2.jsflux.co.kr/api/friends/add",
        { senderEmail, receiverEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
          },
        }
      );
      console.log(response.data);
      alert("친구 추가 요청을 보냈습니다.");
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("친구 추가 요청에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-col flex-1">
          <AddFriendTitle />
          <div className="searchBar">
            <div className="container mx-auto">
              <form className="p-10" onSubmit={handleSearch}>
                <div className="mb-4 flex items-center">
                  <input
                    type="text"
                    className="flex-grow rounded-lg border border-gray-400 p-4"
                    placeholder={t("writeNickname")}
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                  <button className="ml-2 rounded-lg bg-blue-500 p-5 text-white hover:bg-blue-600">{t("search")}</button>
                </div>
              </form>
              {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            </div>
          </div>
          <hr />
          <div className="py-4 flex justify-center ml-100">
            <table className="min-w-full text-md bg-white rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-center p-3 px-5">{t("nickname")}</th>
                  <th className="text-center p-3 px-5">{t("email")}</th>
                  <th />
                </tr>
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                      <td className="p-3 px-5">{result.nickName || "N/A"}</td>
                      <td className="p-3 px-5">{result.email}</td>
                      <td className="p-3 px-5 text-center">
                        <button
                          type="button"
                          className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleAddFriend(result.email)}
                        >
                          {t("addFriend")}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b">
                    <td colSpan="3" className="text-center p-3 px-5">
                      {t("searchNotFound")}
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

export default InviteFriend;
