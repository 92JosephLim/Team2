//비밀번호 찾기 페이지
import React from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";

function FindPassword() {
  //이메일 유효성 검사

  // 비밀번호 찾기 다하고 다음 페이지로 넘어가야 함
  // 이메일 유효성 검사 관련 코드 작성하기
  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            {/* 애니메이션 */}
            {/* <img src={teamlogo} alt="this is our team logo" /> */}
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-40">
            <div className="py-8 px-8 rounded-xl">{/* 이거 위치 조금만 더 내리기 */}
              <h1 className="font-medium text-2xl mt-3 text-center">비밀번호 재설정</h1>
              {/* form 태그 POST로 email, password 넘겨주기 */}
              <h5 className="mt-3">다시 사용할 새로운 비밀번호를 입력해주세요.</h5>
              <form action="" className="mt-6">
                <div className="my-5 text-sm">
                  {/* 이메일 유효성 검사 */}
                  <label htmlFor="username" className="block text-black text-left">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full text-2xl"
                    placeholder="새로운 비밀번호를 입력해주세요"
                  />
                </div>
                <div className="my-5 text-sm">
                  {/* 이메일 유효성 검사 */}
                  <label htmlFor="username" className="block text-black text-left">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    name="passwordCheck"
                    id="passwordCheck"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 min-w-full text-2xl"
                    placeholder="비밀번호 확인"
                  />
                </div>
                {/* 변경하기 페이지 누르면 */}
                <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                  변경하기
                </button>
              </form>
              <p className="mt-12 text-xl text-center font-light text-gray-400">
                {" "}
                계정이 있으신가요?{" "}
                <a href="/login" className="text-blue-800 font-semibold">
                  {" "}
                  로그인하기{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FindPassword;