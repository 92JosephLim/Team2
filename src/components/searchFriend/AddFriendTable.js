import React from "react";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function AddFriendTable() {

  // 나중에 백이랑 연동되면
  // 친구 데이터 저장 상태
  // const [friends, setFriends] = useState([]);

  // 서버에서 데이터 get으로 가져오기
  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     try {
  //       const response = await axios.get("서버 엔드포인트 주소");
  //       setFriends(response.data);
  //     } catch (error) {
  //       console.error("Error : ", error);
  //     }
  //   };

  //   fetchFriends();
  // }, []);

  return (
    <>
      <div className="py-4 flex justify-center ml-100">
        <table className="w-11/12 text-md bg-white rounded mb-4">
          <tbody className="grid grid-cols-2">
            <tr className="border-b grid grid-cols-3">
              <th className="text-center p-3 px-5 col-start-1 col-span-1">Name</th>
              <th className="text-center p-3 px-5 col-start-2 col-span-1">Email</th>
              <th className="text-center p-3 px-5 col-start-3 col-span-1">추가 / 삭제</th>
            </tr>
            <tr className="border-b grid grid-cols-3">
              <th className="text-center p-3 px-5 col-start-1 col-span-1">Name</th>
              <th className="text-center p-3 px-5 col-start-2 col-span-1">Email</th>
              <th className="text-center p-3 px-5 col-start-3 col-span-1">추가 / 삭제</th>
            </tr>
            {/* 나중에 백엔드랑 연동되면 map으로 데이터 가져오기 : friends.map(friend => ()으로 반복문 돌리기 */}
            <div className=" border-r-4 border-white">
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5 col-start-1 col-span-1">
                유저1
              </td>
              <td className="p-3 px-5 col-start-2 col-span-1">
                유저1@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center col-start-3 col-span-1">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5 col-start-1 col-span-1">
                유저2
              </td>
              <td className="p-3 px-5 col-start-2 col-span-1">
                유저2@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center col-start-3 col-span-1">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5 col-start-1 col-span-1">
                유저3
              </td>
              <td className="p-3 px-5 col-start-2 col-span-1">
                유저3@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center col-start-3 col-span-1">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5 col-start-1 col-span-1">
                유저4
              </td>
              <td className="p-3 px-5 col-start-2 col-span-1">
                유저4@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center col-start-3 col-span-1">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            </div>
            <div>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5">
                유저5
              </td>
              <td className="p-3 px-5">
                유저5@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5">
                유저6
              </td>
              <td className="p-3 px-5">
                유저6@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5">
                유저7
              </td>
              <td className="p-3 px-5">
                유저7@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100 grid grid-cols-3">
              <td className="p-3 px-5">
                유저8
              </td>
              <td className="p-3 px-5">
                유저8@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaCheck size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            </div>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AddFriendTable;