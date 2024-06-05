//비밀번호 찾기 페이지
import React from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import teamlogo from "../assets/lizard.jpg";

function FindPassword() {
  //이메일 유효성 검사

  return (
    <div className="mainContainer">
      <TopNav />
      <div className="flex min-h-screen bg-white">
        {/* FindPassword화면의 left side, 크기는 50% bg 나중에 애니메이션 보고 필요하면 넣기 */}
        <div className="flex lg:w-1/2">
          {/* team logo 애니메이션 넣은거 컴포넌트로 넣을 예정 */}
          <div className="m-auto">
            <img src={teamlogo} alt="This is my team logo" />
          </div>
        </div>
        {/* FindPassword화면의 right side */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
          <div className="max-w-lg mx-auto bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">비밀번호 찾기</h2>
            <h5>가입하신 이메일 주소를 입력해주세요.<br />이메일 주소로 비밀번호를 재설정할 수 있는 이메일을 보내드립니다. <br /></h5>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="이메일"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
              >
                전송하기
              </button>
              <div className="text-center text-gray-500 mt-4">
                {/* 이거 nav로 할 지 그냥 a 태그로 할 지 고민 a 태그보다 react route dom이 좀 더 부드럽게??넘어가는걸로 아는데 일단 a 태그로 해봄 */}
                <a href="/login" className="text-blue-500 hover:underline">로그인하러가기</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FindPassword;