import React from 'react';
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';
import SideNav from '../../components/SideNav';

function ReportFriend() {
  //이것도 나중에 서버 연동하기
  return (
    <>
      <TopNav />
      <div className="flex">
        <SideNav />
        <div className="flex-grow text-gray-900 white">
          <div className="p-4 flex">
            <h1 className="text-3xl font-bold">신고 목록</h1>
          </div>
          <div className="px-3 py-4 flex justify-center">
            <table className="w-full text-md bg-white rounded mb-4">
              <thead>
                <tr>
                  <th className="text-center p-3 px-5">Name</th>
                  <th className="text-center p-3 px-5">Email</th>
                  <th className="text-center p-3 px-5">신고 사유</th>
                  <th className="text-center p-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {/* 나중에 서버로 가져올거니까 변수 다시 잡아주기 */}
                {Array(6).fill().map((_, index) => (
                  <tr key={index} className={`border-b hover:bg-orange-100 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
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
                    <td className="p-3 px-5">
                      우우
                    </td>
                    <td className="p-3 px-5 flex justify-end items-center">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-3.5"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-3.5"
                      >
                        Delete
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
  )
}

export default ReportFriend;
