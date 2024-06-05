//회원가입 페이지
import React from "react";
import "../css/Login.css"; // 로그인 페이지 스타일 파일 import
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import teamlogo from "../assets/lizard.jpg";

function Signup() {
  //email, password 유효성 검사 + 핸드폰 번호

  //나중에 navigator 맞게 수정하기
  //시간 되면 컴포넌트로 수정해서 따로 빼기 
  return (
    <>
      <TopNav />
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            {/* 애니메이션 */}
            {/* <img src={teamlogo} alt="this is our team logo" /> */}
          </div>
          <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 mt-5">
            <div className="py-8 px-8 rounded-xl">{/* 이거 위치 조금만 더 내리기 */}
              <h1 className="font-medium text-2xl mt-3 text-center">회원가입</h1>
              {/* form 태그 POST */}
              <form action="" className="mt-6">
                {/* 이메일 */}
                <div className="my-5 text-sm">
                  {/* 이메일 유효성 검사 */}
                  <label htmlFor="email" className="block text-black text-left">
                    Email
                  </label>
                  <div className="flex mt-3">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full"
                      placeholder="Email"
                    />
                    <button className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black">
                      인증번호 전송
                    </button>
                  </div>
                </div>
                {/* 인증번호 */}
                <div className="my-5 text-sm">
                  {/* 인증번호 체크 */}
                  <label htmlFor="emailCheck" className="block text-black text-left">
                    인증
                  </label>
                  <div className="flex mt-3">
                    <input
                      type=""
                      name="emailCheck"
                      id="emailCheck"
                      className="rounded-sm px-4 py-3 focus:outline-none bg-gray-100 w-full"
                      placeholder="인증번호"
                    />
                    <button className="ml-2 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black">
                      인증번호 체크
                    </button>
                  </div>
                </div>
                {/* 비밀번호 */}
                <div className="my-5 text-sm">
                  {/* 비밀번호 유효성 검증 */}
                  <label htmlFor="password" className="block text-black text-left">
                    Password
                  </label>
                  <input
                    type=""
                    name="password"
                    id="password"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="Password"
                  />
                </div>
                {/* 핸드폰 번호 */}
                <div className="my-5 text-sm">
                  {/* 핸드폰 번호 유효성 검사 */}
                  <label htmlFor="phoneNumber" className="block text-black text-left">
                    Phone Number
                  </label>
                  <input
                    type=""
                    name="phoneNumber"
                    id="phoneNumber"
                    className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    placeholder="Phone Number"
                  />
                </div>
                {/* 성별 */}
                <div className="my-5 text-sm">
                  <label htmlFor="gender" className="block text-black text-left">
                    Gender
                  </label>
                  {/* 라디오버튼 가운데 맞춰주기 */}
                  <div className="flex items-center mt-4">
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="none" className="mr-2" defaultChecked />
                      선택안함
                    </label>
                    <label className="inline-flex items-center mr-4">
                      <input type="radio" name="gender" value="male" className="mr-2" />
                      남성
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" />
                      여성
                    </label>
                  </div>
                </div>
                {/* 언어 */}
                <div className="my-5 text-sm">
                  <label htmlFor="language" className="block text-black text-left">
                    Language
                  </label>
                  <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3">
                    <option value="korean">한국어</option>
                    <option value="english">English</option>
                    <option value="japanese">일본어</option>
                    <option value="chinese">중국어</option>
                    <option value="spanish">스페인어</option>
                    <option value="arabic">아랍어</option>
                  </select>
                </div>
                {/* 프로필 사진 */}
                <div className="my-5 text-sm">
                  <label htmlFor="profileImage" className="block text-black text-left">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-3"
                  />
                </div>
                {/* 회원가입 */}
                <button className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                  회원가입
                </button>
              </form>
              {/* 계정이 없는 경우 : 이때 로그인하기 클릭하면 alert 창 또는 모달 창으로 작서하신 정보가 전부 지워집니다. 그래도 로그인하러 가시겠습니까? 띄워주기 */}
              <p className="mt-12 text-xs text-center font-light text-gray-400">
                {" "}
                계정이 생각나셨나요?{" "}
                <a href="/login" className="text-black font-medium">
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
  );
}

export default Signup;
