import React, { useState } from "react";
import { TbMessages } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import FriendDelete from "../../components/modal/FriendDelete"; // 올바른 경로 설정


function FriendTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
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
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
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
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
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
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">
                유저1
              </td>
              <td className="p-3 px-5">
                유저1@test.com
              </td>
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
          </tbody>
        </table>
      </div>
      <FriendDelete isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default FriendTable;
