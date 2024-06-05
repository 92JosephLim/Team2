//비밀번호 찾기 페이지
import React from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import teamlogo from "../assets/lizard.jpg";

function FindPassword() {
  //이메일 유효성 검사

  // 비밀번호 찾기 다하고 다음 페이지로 넘어가야 함ㄷㄷㄷㄷㄷ <= 연휴 동안 이거 생각하기
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
              <h1 className="font-medium text-2xl mt-3 text-center">비밀번호 찾기</h1>
              {/* form 태그 POST로 email, password 넘겨주기 */}
              <h5 className="mt-3">가입하신 이메일 주소를 입력해주세요.<br />이메일 주소로 비밀번호를 재설정할 수 있는 이메일을 보내드립니다. <br /></h5>
              <form action="" className="mt-6">
                <div className="my-5 text-sm">
                  {/* 이메일 유효성 검사 */}
                  <label htmlFor="username" className="block text-black text-left">
                    Email
                  </label>
                  <input
                    type=""
                    name="Eamil"
                    id="Eamil"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="Eamil"
                  />
                </div>
                {/* 인증번호 전송하기 버튼을 누르면 모달창으로 비밀번호 재설정 비밀번호 재설정 메일을 통해 비밀번호를 변경해 주시기 바랍니다. <버튼> 확인 </버튼>을 띄워준다. */}
                {/* 인증번호로 비밀번호 재설정 완료하면 모달창으로 비밀번호 재설정 비밀번호 재설정이 완료되었습니다. 로그인 페이지로 이동합니다. 를 띄워준다. */}
                <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                  인증번호 전송하기
                </button>
              </form>
              {/* 계정이 없는 경우 */}
              <p className="mt-12 text-xs text-center font-light text-gray-400">
                {" "}
                계정이 생각나셨나요?{" "}
                <a href="/login" className="text-black font-medium">
                  {" "}
                  로그인하기{" "}
                </a>
                {" "}
                계정이 없으신가요?{" "}
                <a href="/signup" className="text-black font-medium">
                  {" "}
                  회원가입하기{" "}
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