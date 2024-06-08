import React from "react";
import { TbMessages } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";

function AddFriendTable() {
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
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <TbMessages size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <TbMessages size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <TbMessages size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
              {/* dm, delete 버튼 사이즈 키우기 */}
              <td className="p-3 px-5 text-center">
                <button
                  type="button"
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <TbMessages size={24} />
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin5Line size={24} />
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </>
  )
}

export default AddFriendTable;