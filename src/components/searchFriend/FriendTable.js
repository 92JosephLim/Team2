import React from "react";
import { TbMessages } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";

function FriendTable() {
  return (
    <>
      <div className="py-4 flex justify-center ml-100">
        <table className="min-w-full text-md bg-white rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-center p-3 px-5">Name</th>
              <th className="text-center p-3 px-5">Email</th>
              <th />
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                <input
                  type="text"
                  defaultValue="user.name"
                  className="bg-transparent"
                />
              </td>
              <td className="p-3 px-5">
                <input
                  type="text"
                  defaultValue="user.email"
                  className="bg-transparent"
                />
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 flex justify-end">
                <button
                  type="button"
                  className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <TbMessages />
                </button>
                <button
                  type="button"
                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </>
  )
}

export default FriendTable;